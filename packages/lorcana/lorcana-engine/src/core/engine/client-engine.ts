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
  type NetworkMatchData,
  type Player,
  type MatchState,
  MatchRuntime,
  createCardsMapsFromStaticResources,
} from "../runtime";
import { normalizeNetworkView } from "../runtime";
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
}

type InferMoveInputMap<TMoves extends MoveRecord> = RuntimeMoveInputMap<TMoves>;

export class ClientEngine implements GameEngine {
  private transport?: InMemoryTransport;
  // Cached client-facing view only. When `projectBoard` is enabled this is a projected snapshot,
  // not authoritative match state, so `ctx`/`G` reads must go through `runtime.getState()`.
  private localView: FilteredMatchView | null = null;
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
  private matchData?: NetworkMatchData;
  private lastPacketUpdate: EnginePacketUpdate | null = null;
  private debug: boolean;
  private identifier?: string;
  private runtime: MatchRuntime;
  private canUndoState: boolean = false;

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

    if (typeof this.runtimeConfig.projectBoard === "function") {
      this.handleFatalSyncError("Projected board clients require full sync updates");
      return;
    }

    try {
      this.localView = applyPatches(this.localView, message.patchOps as Patch[]);
      this.runtime.loadState(this.localView as unknown as MatchState);
      this.stateID = message.stateID;
      this.canUndoState = message.canUndo;
      this.lastPacketUpdate = {
        processedCommand: message.processedCommand,
        animations: [...message.animations],
        canUndo: message.canUndo,
      };
      this.stateUpdateHandlers.forEach((h) =>
        h(this.localView!, this.stateID, this.lastPacketUpdate),
      );
    } catch (error) {
      this.handleFatalSyncError("Failed to apply patch; requesting full sync", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  private applyFullState(message: UpdateFullMessage | SyncFullMessage): void {
    if ("matchData" in message && message.matchData) {
      this.matchData = message.matchData;
    }
    const normalizedState = normalizeNetworkView(
      message.state as never,
      {
        stateID: message.stateID,
        matchID: message.matchID,
        protocolVersion: message.protocolVersion,
      },
      this.runtimeConfig as unknown as MatchRuntimeConfig,
      this.config.staticResources,
      this.config.role === "player"
        ? { role: "player", playerID: this.config.playerId }
        : { role: "spectator" },
      this.matchData,
    );
    this.runtime.loadState(normalizedState as MatchState);
    this.localView =
      typeof this.runtimeConfig.projectBoard === "function"
        ? guardProjectedViewInDevelopment(
            (message.board ?? this.runtime.getBoard()) as FilteredMatchView,
            this.identifier,
          )
        : (normalizedState as FilteredMatchView);
    this.stateID = message.stateID;
    this.canUndoState = message.canUndo;
    this.lastPacketUpdate =
      "processedCommand" in message
        ? {
            processedCommand: message.processedCommand,
            animations: [...message.animations],
            canUndo: message.canUndo,
          }
        : null;
    this.stateUpdateHandlers.forEach((h) =>
      h(this.localView!, this.stateID, this.lastPacketUpdate),
    );
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

  loadState(state: MatchState): void {
    this.runtime.loadState(state);
    this.stateID = state.ctx._stateID;
  }

  getBoard(): DeepReadonly<FilteredMatchView> {
    return this.runtime.getBoard() as DeepReadonly<FilteredMatchView>;
  }

  getStateID(): number {
    return this.stateID;
  }

  getProjection(): EngineProjectionSnapshot {
    return buildEngineProjectionSnapshot(this.getState() as never, {
      role: this.config.role,
      playerId: this.config.playerId,
    });
  }

  validateMove(moveId: string, input: MoveInput): EngineMoveValidationResult {
    if (!this.connected) return { valid: false, reason: "Not connected", code: "NOT_CONNECTED" };
    if (!this.localView || this.config.role !== "player") {
      return { valid: true, reason: "Validation deferred to server" };
    }

    const command: CommandEnvelope = {
      commandID: `validate-${this.config.playerId}-${Date.now()}`,
      move: moveId,
      input,
    };
    return this.runtime.validateCommand(command, this.config.playerId, this.stateID, "player");
  }

  executeMove(moveId: string, input: MoveInput): EngineMoveExecutionResult {
    if (!this.connected) {
      return { success: false, reason: "Not connected", code: "NOT_CONNECTED" };
    }

    if (!this.transport) {
      logger.warning("Attempting to execute move without transport");
      return { success: false, reason: "Not connected", code: "NOT_CONNECTED" };
    }

    if (this.localView && this.config.role === "player") {
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

    this.transport.send({
      type: "UPDATE_ACTION",
      command,
      prevStateID: this.stateID,
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.getMatchID(),
    });

    const currentTurn = this.runtime.getState().ctx.status.turn;

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
    return this.config.role === "player" && playerId === this.config.playerId && this.canUndoState;
  }

  undo(playerId: string, prevStateID?: number): boolean {
    if (
      !this.connected ||
      !this.transport ||
      this.config.role !== "player" ||
      playerId !== this.config.playerId ||
      !this.canUndoState
    ) {
      return false;
    }

    this.transport.send({
      type: "UNDO_REQUEST",
      prevStateID: prevStateID ?? this.stateID,
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
    this.canUndoState = false;
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
}
