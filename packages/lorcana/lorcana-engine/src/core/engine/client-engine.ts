/**
 * Responsibility: client-side synchronized view of authoritative match state.
 * Receives full/patch updates from `ServerEngine`, applies them locally, and forwards
 * player commands to the server. This class is never authoritative for rule validity.
 *
 * Docs:
 * - ../../docs/ENGINE_SIMPLIFICATION_PLAN.md
 */

import { applyPatches, type Patch } from "immer";
import { getLogger } from "@logtape/logtape";
import {
  type FilteredMatchView,
  type CommandEnvelope,
  type DeepReadonly,
  type MatchRuntimeConfig,
  type MatchStaticResources,
  type MoveInput,
  type Player,
  type MatchState,
  MatchRuntime,
  createCardsMapsFromStaticResources,
} from "../runtime";
import type {
  InMemoryTransport,
  ServerMessage,
  UpdatePatchMessage,
  UpdateFullMessage,
  SyncFullMessage,
} from "../runtime/protocol-types";
import {
  PROTOCOL_VERSION,
  isUpdatePatchMessage,
  isUpdateFullMessage,
  isSyncFullMessage,
  isErrorMessage,
} from "../runtime/protocol-types";
import type {
  EngineProjectionSnapshot,
  GameEngine,
  EngineActorContext,
  EnginePacketUpdate,
  EngineViewUpdateMetadata,
  EngineMoveValidationResult,
  EngineMoveExecutionResult,
  EngineMoveHistoryEntry,
} from "./contracts";
import { buildEngineProjectionSnapshot } from "./projection";
const logger = getLogger(["core-engine", "client-engine"]);
const PROJECTED_VIEW_AUTHORITATIVE_KEYS = new Set<PropertyKey>(["ctx", "G"]);

function isDevelopmentEnvironment(): boolean {
  return process.env.NODE_ENV !== "production";
}

function guardProjectedViewInDevelopment<T>(view: T, identifier?: string): T {
  if (!isDevelopmentEnvironment() || view === null || typeof view !== "object") {
    return view;
  }

  return new Proxy(view as object, {
    get(target, property, receiver) {
      if (PROJECTED_VIEW_AUTHORITATIVE_KEYS.has(property)) {
        const engineLabel = identifier ? ` '${identifier}'` : "";
        throw new Error(
          `ClientEngine${engineLabel} localView is a projected board snapshot. ` +
            `Do not access '${String(property)}' on localView; use getState() or runtime state for authoritative data.`,
        );
      }

      return Reflect.get(target, property, receiver);
    },
  }) as T;
}

import type { MoveRecord, RuntimeMoveInputMap } from "../runtime/match-runtime.types";

export interface ClientEngineConfig {
  playerId: string;
  transport?: InMemoryTransport;
  role: "player" | "spectator";
  runtimeConfig: MatchRuntimeConfig;
  staticResources: MatchStaticResources;
  debugMode?: boolean;
  identifier?: string;
  players: Player[];
  seed?: string;
  /**
   * Skip optimistic state computation. Set to true for sync transports where the server
   * responds synchronously within the same `transport.send()` call — the optimistic state
   * would be built and immediately overwritten by the confirmed state, wasting ~29% CPU.
   */
  skipOptimisticState?: boolean;
}

type InferMoveInputMap<TMoves extends MoveRecord> = RuntimeMoveInputMap<TMoves>;
type ProjectionMode = "eager" | "lazy";

export class ClientEngine implements GameEngine {
  private transport?: InMemoryTransport;
  // Cached client-facing visible view. This is always a projected/filtered snapshot and is
  // never treated as authoritative state.
  private localView: FilteredMatchView | null = null;
  private confirmedState: MatchState | null = null;
  private undoCheckpointState: MatchState | null = null;
  private stateID: number = 0;
  private stateUpdateHandlers: Array<
    (state: FilteredMatchView, stateID: number, packet: EnginePacketUpdate | null) => void
  > = [];
  private moveHistory: EngineMoveHistoryEntry[] = [];
  private config: ClientEngineConfig;
  // Consolidated runtime config with proper typing (single cast point)
  private readonly runtimeConfig: MatchRuntimeConfig;
  private connected: boolean = false;
  private commandCounter: number = 0;
  private lastPacketUpdate: EnginePacketUpdate | null = null;
  private debug: boolean;
  private identifier?: string;
  private runtime: MatchRuntime;
  private canUndoState: boolean = false;
  private projectionMode: ProjectionMode = "eager";
  private projectionDirty: boolean = false;
  private viewRevision: number = 0;
  private viewUpdateMetadata: EngineViewUpdateMetadata = {
    sourceAuthority: "server",
    phase: "confirmed",
  };
  private optimisticState: {
    command: CommandEnvelope;
    state: MatchState;
    view: FilteredMatchView;
  } | null = null;

  constructor(config: ClientEngineConfig) {
    this.debug = config.debugMode ?? false;
    this.identifier = config.identifier;
    this.config = config;
    this.runtimeConfig = config.runtimeConfig;
    this.runtime = new MatchRuntime(config.runtimeConfig, {
      players: config.players,
      seed: config.seed,
      cardsMaps: createCardsMapsFromStaticResources(config.staticResources),
      cardCatalog: config.staticResources.cards,
    });

    if (config.transport) {
      this.setTransport(config.transport);
    }
  }

  setTransport(transport: InMemoryTransport): void {
    if (this.transport) {
      logger.warning("Transport already set on ClientEngine; ignoring new transport");
      return;
    }

    this.transport = transport;
    this.setupTransportHandlers();
  }

  // TODO: Replace by BoardProjection
  private setupTransportHandlers(): void {
    this.transport?.onMessage((message) => {
      const typedMessage = message as ServerMessage;

      if (this.debug) {
        logger.debug(`[${this.identifier}] Received ${message.type} message from server.`, {
          message,
        });
      }

      if (isUpdatePatchMessage(typedMessage)) {
        this.applyPatch(typedMessage);
      } else if (isUpdateFullMessage(typedMessage)) {
        this.applyFullState(typedMessage);
      } else if (isSyncFullMessage(typedMessage)) {
        this.applyFullState(typedMessage);
      } else if (isErrorMessage(typedMessage)) {
        this.handleFatalSyncError(`Authoritative command rejected (${typedMessage.code})`, {
          code: typedMessage.code,
          message: typedMessage.message,
        });
      }
    });
  }

  private applyPatch(message: UpdatePatchMessage): void {
    if (!this.localView) {
      return;
    }

    if (this.config.role === "player" || typeof this.runtimeConfig.projectBoard === "function") {
      this.handleFatalSyncError("Player clients require full authoritative state sync updates");
      return;
    }

    try {
      this.localView = applyPatches(this.localView, message.patchOps as Patch[]);
      this.runtime.loadState(this.localView as unknown as MatchState);
      this.confirmedState = this.localView as unknown as MatchState;
      this.stateID = message.stateID;
      this.canUndoState = message.canUndo;
      this.undoCheckpointState = null;
      this.lastPacketUpdate = {
        processedCommand: message.processedCommand,
        animations: [...message.animations],
        canUndo: message.canUndo,
      };
      this.optimisticState = null;
      this.emitVisibleStateUpdate(this.lastPacketUpdate, {
        sourceAuthority: "server",
        commandID: message.processedCommand.commandID,
        phase: "confirmed",
      });
    } catch (error) {
      this.handleFatalSyncError("Failed to apply patch; requesting full sync", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private applyFullState(message: UpdateFullMessage | SyncFullMessage): void {
    const previousConfirmedState = this.confirmedState
      ? (structuredClone(this.confirmedState) as MatchState)
      : null;
    const pendingOptimisticCommandID = this.optimisticState?.command.commandID;
    const authoritativeState = structuredClone(message.state) as MatchState;

    this.confirmedState = authoritativeState;
    this.runtime.loadState(authoritativeState);
    if (this.projectionMode === "eager") {
      this.localView = this.buildVisibleViewFromRuntime(
        this.runtime,
        authoritativeState,
        Date.now(),
      );
      this.projectionDirty = false;
    } else {
      this.projectionDirty = true;
    }
    this.stateID = message.stateID;
    this.canUndoState = message.canUndo;
    this.undoCheckpointState =
      this.config.role === "player" && message.canUndo && previousConfirmedState
        ? previousConfirmedState
        : null;
    this.lastPacketUpdate =
      "processedCommand" in message
        ? {
            processedCommand: message.processedCommand,
            animations: [...message.animations],
            canUndo: message.canUndo,
          }
        : null;
    const processedCommandID = this.lastPacketUpdate?.processedCommand.commandID;
    const phase =
      pendingOptimisticCommandID && pendingOptimisticCommandID !== processedCommandID
        ? "rejected"
        : "confirmed";
    this.optimisticState = null;
    if (this.projectionMode === "eager") {
      this.emitVisibleStateUpdate(this.lastPacketUpdate, {
        sourceAuthority: "server",
        commandID: pendingOptimisticCommandID ?? processedCommandID,
        phase,
      });
    }
  }

  private requestSync(): void {
    if (!this.connected || !this.transport) {
      return;
    }

    this.transport.send({
      type: "SYNC_REQUEST",
      lastKnownStateID: this.stateID,
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.getMatchID(),
    });
  }

  private handleFatalSyncError(message: string, details?: Record<string, unknown>): void {
    logger.fatal(`${message}; forcing resync`, details);
    if (this.optimisticState) {
      const rejectedCommandID = this.optimisticState.command.commandID;
      this.optimisticState = null;
      // Restore the main runtime to the confirmed state since we loaded
      // the optimistic state into it during executeMove/undo.
      if (this.confirmedState) {
        this.runtime.loadState(structuredClone(this.confirmedState) as MatchState);
      }
      this.emitVisibleStateUpdate(this.lastPacketUpdate, {
        sourceAuthority: "server",
        commandID: rejectedCommandID,
        phase: "rejected",
      });
    }
    this.requestSync();
  }

  /**
   * Synchronously connect and wait for initial state sync.
   * In sync mode with InMemoryTransport, the state is set immediately after send().
   */
  connectSync(): void {
    if (!this.transport) {
      logger.warning("Attempting to connect ClientEngine without transport");
      return;
    }

    this.transport.connect();
    this.connected = true;
    this.transport.send({
      type: "SYNC_REQUEST",
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.getMatchID(),
    });
    // In sync mode, localView is set immediately via the synchronous message handler
  }

  async connect(): Promise<void> {
    this.connectSync();
    // Wait for localView to be set (immediate in sync mode)
    if (this.localView !== null) {
      return;
    }
    // Fallback polling for async transports
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        clearInterval(intervalId);
        reject(new Error("Sync timeout"));
      }, 5000);
      const intervalId = setInterval(() => {
        if (this.localView !== null) {
          clearTimeout(timeout);
          clearInterval(intervalId);
          resolve();
        }
      }, 10);
    });
  }

  async disconnect(skipLogs?: boolean): Promise<void> {
    if (!this.transport) {
      return;
    }
    this.connected = false;
    await this.transport.disconnect(skipLogs);
  }

  onStateUpdate(
    handler: (state: FilteredMatchView, stateID: number, packet: EnginePacketUpdate | null) => void,
  ): () => void {
    this.stateUpdateHandlers.push(handler);
    return () => {
      const index = this.stateUpdateHandlers.indexOf(handler);
      if (index !== -1) this.stateUpdateHandlers.splice(index, 1);
    };
  }

  getState(): DeepReadonly<MatchState> {
    return this.runtime.getState() as DeepReadonly<MatchState>;
  }

  setProjectionMode(mode: ProjectionMode): void {
    this.projectionMode = mode;
  }

  loadState(state: MatchState): void {
    this.runtime.loadState(state);
    this.confirmedState = structuredClone(state) as MatchState;
    if (this.projectionMode === "eager") {
      this.localView = this.buildVisibleViewFromRuntime(this.runtime, state, Date.now());
      this.projectionDirty = false;
    } else {
      this.projectionDirty = true;
    }
    this.stateID = state.ctx._stateID;
    this.undoCheckpointState = null;
  }

  getBoard(): DeepReadonly<FilteredMatchView> {
    if (!this.optimisticState && (this.localView === null || this.projectionDirty)) {
      this.localView = this.buildVisibleViewFromRuntime(
        this.runtime,
        this.runtime.getState(),
        Date.now(),
      );
      this.projectionDirty = false;
    }

    const visibleView =
      this.optimisticState?.view ??
      this.localView ??
      this.buildVisibleViewFromRuntime(this.runtime, this.runtime.getState(), Date.now());
    return visibleView as DeepReadonly<FilteredMatchView>;
  }

  getStateID(): number {
    if (this.optimisticState) {
      return this.runtime.getCurrentStateID();
    }
    return this.stateID;
  }

  getViewRevision(): number {
    return this.viewRevision;
  }

  getViewUpdateMetadata(): EngineViewUpdateMetadata {
    return { ...this.viewUpdateMetadata };
  }

  getProjection(): EngineProjectionSnapshot {
    return buildEngineProjectionSnapshot(this.getState() as never, {
      role: this.config.role,
      playerId: this.config.playerId,
    });
  }

  validateMove(moveId: string, input: MoveInput): EngineMoveValidationResult {
    if (!this.connected) return { valid: false, reason: "Not connected", code: "NOT_CONNECTED" };
    if (!this.confirmedState || this.config.role !== "player") {
      return { valid: true, reason: "Validation deferred to server" };
    }

    const command: CommandEnvelope = {
      commandID: `validate-${this.config.playerId}-${Date.now()}`,
      move: moveId,
      input,
    };
    // Use runtime.getCurrentStateID() rather than this.stateID so validation reflects
    // the actual loaded state (optimistic or confirmed) without a false STALE_STATE
    // rejection. The executeMove guard keeps execution blocked while an optimistic
    // command is pending; validation here answers "is this move game-valid?"
    // independently of whether execution is currently allowed.
    return this.runtime.validateCommand(
      command,
      this.config.playerId,
      this.runtime.getCurrentStateID(),
      "player",
      { logInvalid: false },
    );
  }

  executeMove(moveId: string, input: MoveInput): EngineMoveExecutionResult {
    if (!this.connected) {
      return { success: false, reason: "Not connected", code: "NOT_CONNECTED" };
    }

    if (!this.transport) {
      logger.warning("Attempting to execute move without transport");
      return { success: false, reason: "Not connected", code: "NOT_CONNECTED" };
    }

    if (this.optimisticState) {
      return {
        success: false,
        reason: "A previous optimistic command is still awaiting authoritative reconciliation",
        code: "OPTIMISTIC_MOVE_PENDING",
      };
    }

    if (this.confirmedState && this.config.role === "player") {
      const validation = this.validateMove(moveId, input);
      if (!validation.valid) {
        return {
          success: false,
          reason: validation.reason ?? "Move validation failed",
          code: validation.code ?? "INVALID_MOVE",
        };
      }
    }

    this.commandCounter++;
    const command: CommandEnvelope = {
      commandID: `cmd-${this.config.playerId}-${Date.now()}-${this.commandCounter}`,
      move: moveId,
      input,
    };

    // Capture turn number before loading optimistic state into the runtime
    const currentTurn = this.runtime.getState().ctx.status.turn;

    if (this.config.role === "player" && !this.config.skipOptimisticState) {
      const optimisticResult = this.buildOptimisticState(command);
      if (optimisticResult.kind === "error") {
        return optimisticResult.result;
      }

      this.optimisticState = {
        command,
        state: optimisticResult.state,
        view: optimisticResult.view,
      };
      // Load optimistic state into the main runtime so that enumerateMoves()
      // and getAvailableMoves() return post-move legal moves during the
      // optimistic phase, keeping them consistent with the optimistic board view.
      this.runtime.loadState(optimisticResult.state);
      this.emitVisibleStateUpdate(this.lastPacketUpdate, {
        sourceAuthority: "client",
        commandID: command.commandID,
        phase: "optimistic",
      });
    }

    this.transport.send({
      type: "UPDATE_ACTION",
      command,
      prevStateID: this.stateID,
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.getMatchID(),
    });

    this.moveHistory.push({
      moveId,
      input,
      playerId: this.config.playerId,
      role: this.config.role,
      timestamp: Date.now(),
      stateID: this.stateID,
      turnNumber: currentTurn,
      transitionType: "move",
    });

    return { success: true };
  }

  enumerateMoves(): Array<keyof InferMoveInputMap<MoveRecord> & string> {
    if (this.config.role !== "player") {
      return [];
    }

    return this.runtime.enumerateMovesForPlayer(this.config.playerId, "player") as Array<
      keyof InferMoveInputMap<MoveRecord> & string
    >;
  }

  enumerateMovesForPlayer(playerId: string): Array<keyof InferMoveInputMap<MoveRecord> & string> {
    if (this.config.role !== "player" || playerId !== this.config.playerId) {
      return [];
    }

    return this.runtime.enumerateMovesForPlayer(playerId, "player") as Array<
      keyof InferMoveInputMap<MoveRecord> & string
    >;
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return limit && limit > 0 ? this.moveHistory.slice(-limit) : [...this.moveHistory];
  }

  canUndo(playerId: string): boolean {
    return (
      !this.optimisticState &&
      this.config.role === "player" &&
      playerId === this.config.playerId &&
      this.canUndoState
    );
  }

  undo(playerId: string, prevStateID?: number): boolean {
    if (
      !this.connected ||
      !this.transport ||
      this.config.role !== "player" ||
      playerId !== this.config.playerId ||
      !this.canUndoState ||
      this.optimisticState ||
      !this.undoCheckpointState
    ) {
      return false;
    }

    this.commandCounter++;
    const command: CommandEnvelope = {
      commandID: `undo-${this.config.playerId}-${Date.now()}-${this.commandCounter}`,
      move: "undo",
    };
    if (!this.config.skipOptimisticState) {
      const optimisticUndoState = structuredClone(this.undoCheckpointState) as MatchState;
      const undoRuntime = new MatchRuntime(this.runtimeConfig, {
        players: this.config.players,
        seed: this.config.seed,
        cardsMaps: createCardsMapsFromStaticResources(this.config.staticResources),
        cardCatalog: this.config.staticResources.cards,
      });
      undoRuntime.loadState(optimisticUndoState);
      this.optimisticState = {
        command,
        state: optimisticUndoState,
        view: this.buildVisibleViewFromRuntime(undoRuntime, optimisticUndoState, Date.now()),
      };
      this.runtime.loadState(optimisticUndoState);
      this.emitVisibleStateUpdate(this.lastPacketUpdate, {
        sourceAuthority: "client",
        commandID: command.commandID,
        phase: "optimistic",
      });
    }

    this.transport.send({
      type: "UNDO_REQUEST",
      prevStateID: prevStateID ?? this.stateID,
      commandID: command.commandID,
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.getMatchID(),
      playerID: this.config.playerId,
    });

    return true;
  }

  getActorContext(): EngineActorContext {
    return { role: this.config.role, playerId: this.config.playerId };
  }

  async dispose(skipLogs?: boolean): Promise<void> {
    await this.disconnect(skipLogs);
    this.stateUpdateHandlers = [];
    this.localView = null;
    this.confirmedState = null;
    this.canUndoState = false;
    this.undoCheckpointState = null;
    this.optimisticState = null;
  }

  isSynced(): boolean {
    return this.connected && this.localView !== null;
  }

  getPlayerId(): string {
    return this.config.playerId;
  }

  getRole(): "player" | "spectator" {
    return this.config.role;
  }

  getLastPacketUpdate(): EnginePacketUpdate | null {
    return this.lastPacketUpdate
      ? {
          processedCommand: this.lastPacketUpdate.processedCommand,
          animations: [...this.lastPacketUpdate.animations],
          canUndo: this.lastPacketUpdate.canUndo,
        }
      : null;
  }

  private getMatchID(): string {
    return this.runtime.getState().ctx.matchID;
  }

  private emitVisibleStateUpdate(
    packet: EnginePacketUpdate | null,
    metadata: EngineViewUpdateMetadata,
  ): void {
    const visibleView = this.getBoard() as FilteredMatchView;
    this.viewRevision += 1;
    this.viewUpdateMetadata = metadata;
    this.stateUpdateHandlers.forEach((handler) => handler(visibleView, this.stateID, packet));
  }

  private buildOptimisticState(
    command: CommandEnvelope,
  ):
    | { kind: "success"; state: MatchState; view: FilteredMatchView }
    | { kind: "error"; result: EngineMoveExecutionResult } {
    if (!this.confirmedState) {
      return {
        kind: "error",
        result: {
          success: false,
          reason: "No confirmed state is available for local execution",
          code: "STATE_NOT_SYNCED",
        },
      };
    }

    try {
      const sandboxRuntime = new MatchRuntime(this.runtimeConfig, {
        players: this.config.players,
        seed: this.config.seed,
        cardsMaps: createCardsMapsFromStaticResources(this.config.staticResources),
        cardCatalog: this.config.staticResources.cards,
      });
      const confirmedState = structuredClone(this.confirmedState) as MatchState;
      sandboxRuntime.loadState(confirmedState);
      const result = sandboxRuntime.processCommand(
        command,
        this.config.playerId,
        this.stateID,
        Date.now(),
        "player",
      );

      if (!result.success) {
        return {
          kind: "error",
          result: {
            success: false,
            reason: result.error || "Local command execution failed",
            code: "INVALID_MOVE",
          },
        };
      }

      return {
        kind: "success",
        state: structuredClone(result.state) as MatchState,
        view: this.buildVisibleViewFromRuntime(sandboxRuntime, result.state, Date.now()),
      };
    } catch (error) {
      logger.warning("Failed to build optimistic state", {
        error: error instanceof Error ? error.message : String(error),
        move: command.move,
      });
      return {
        kind: "error",
        result: {
          success: false,
          reason: "Local command execution failed",
          code: "LOCAL_EXECUTION_FAILED",
        },
      };
    }
  }

  private buildVisibleViewFromRuntime(
    runtime: MatchRuntime,
    state: MatchState,
    timestamp: number,
  ): FilteredMatchView {
    const roleContext =
      this.config.role === "player"
        ? { role: "player" as const, playerID: this.config.playerId }
        : { role: "spectator" as const };

    const projectedView = runtime.getProjectedBoardView(roleContext, {
      serverTimestamp: timestamp,
    });
    const visibleView = projectedView ?? runtime.getFilteredView(roleContext);
    return guardProjectedViewInDevelopment(visibleView as FilteredMatchView, this.identifier);
  }
}
