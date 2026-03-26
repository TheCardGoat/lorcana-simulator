/**
 * Responsibility: authoritative runtime host and state distributor.
 * Owns command validation/execution against `MatchRuntime` and broadcasts
 * authoritative state updates to connected clients.
 *
 * Docs:
 * - ../../docs/ENGINE_SIMPLIFICATION_PLAN.md
 */

import {
  MatchRuntime,
  createCardsMapsFromStaticResources,
  type DeepReadonly,
  type MatchRuntimeConfig,
  type MatchState,
  type FilteredMatchView,
  type CommandEnvelope,
  type CommandResult,
  type MoveInput,
  type MatchStaticResources,
  type RuntimeActorRole,
  type RuntimeSnapshot,
} from "../runtime";
import type { Player } from "../runtime/match-runtime.types";
import type {
  InMemoryTransport,
  ClientMessage,
  UpdateFullMessage,
  SyncFullMessage,
  ErrorMessage,
} from "../runtime/protocol-types";
import {
  PROTOCOL_VERSION,
  isUpdateActionMessage,
  isSyncRequestMessage,
  isUndoRequestMessage,
} from "../runtime/protocol-types";
import type {
  EngineProjectionSnapshot,
  GameEngine,
  EngineActorContext,
  EngineMoveValidationResult,
  EngineMoveExecutionResult,
  EngineMoveHistoryEntry,
} from "./contracts";
import { getLogger } from "@logtape/logtape";

const logger = getLogger(["core-engine", "server-engine"]);

import type { MoveRecord, RuntimeMoveInputMap } from "../runtime/match-runtime.types";

type InferMoveInputMap<TMoves extends MoveRecord> = RuntimeMoveInputMap<TMoves>;

export interface ServerEngineConfig {
  runtimeConfig: MatchRuntimeConfig;
  players: Player[];
  seed?: string;
  staticResources: MatchStaticResources;
  debugMode?: boolean;
}

export interface StateSnapshot {
  stateID: number;
  state: MatchState;
  timestamp: number;
  transitionType?: "move" | "undo";
  undoneStateID?: number;
  restoredCheckpointStateID?: number;
  undoneMoveId?: string;
}

export interface UndoCheckpoint {
  stateID: number;
  playerId: string;
  state: MatchState;
  runtimeSnapshot: RuntimeSnapshot;
  undoneStateID: number;
  undoneMoveId?: string;
}

export class ServerEngine implements GameEngine {
  private runtime: MatchRuntime;
  private transports: Map<string, InMemoryTransport> = new Map();
  private stateHistory: StateSnapshot[] = [];
  private moveHistory: EngineMoveHistoryEntry[] = [];
  private stateUpdateHandlers: Array<(stateID: number) => void> = [];
  private debug: boolean = false;
  private staticResources: MatchStaticResources;
  private undoCheckpoint: UndoCheckpoint | null = null;

  constructor(config: ServerEngineConfig) {
    this.debug = config.debugMode ?? false;
    this.staticResources = config.staticResources;
    this.runtime = new MatchRuntime(config.runtimeConfig, {
      players: config.players,
      seed: config.seed,
      //TODO: We could pass both `cardsMaps` and `cardCatalog` from constructuror
      cardsMaps: createCardsMapsFromStaticResources(config.staticResources),
      cardCatalog: config.staticResources.cards,
    });

    this.stateHistory.push({
      stateID: 0,
      state: this.runtime.getState(),
      timestamp: Date.now(),
    });
  }

  private resolveAuthoritativeActorPlayerId(): string {
    const state = this.runtime.getState();
    return state.ctx.priority.holder ?? state.ctx.playerIds[0] ?? "";
  }

  acceptConnection(playerId: string, transport: InMemoryTransport): void {
    this.transports.set(playerId, transport);

    transport.onMessage((message) => {
      this.handleClientMessage(playerId, message as ClientMessage);
    });

    this.sendFullSync(playerId);
  }

  private handleClientMessage(playerId: string, message: ClientMessage): void {
    if (isUpdateActionMessage(message)) {
      const currentStateID = this.runtime.getCurrentStateID();
      if (message.prevStateID !== currentStateID) {
        this.sendError(playerId, "STALE_STATE", `Expected state ${currentStateID}`, true);
        return;
      }

      if (this.debug) {
        logger.debug(
          `Received command from player ${playerId}: ${message.command.move} with input:`,
          { input: message.command.input },
        );
      }

      const previousState = this.runtime.getState();
      const previousStateID = this.runtime.getCurrentStateID();
      const runtimeSnapshotBeforeMove = this.runtime.createRuntimeSnapshot();
      const result = this.runtime.processCommand(
        message.command,
        playerId,
        message.prevStateID,
        Date.now(),
        "player",
      );

      if (result.success) {
        const processedResult = this.withPacketAnimations(
          result,
          previousState,
          message.command,
          playerId,
          "player",
        );
        const newStateID = this.runtime.getCurrentStateID();
        const newState = this.runtime.getState();
        this.stateHistory.push({
          stateID: newStateID,
          state: newState,
          timestamp: Date.now(),
          transitionType: "move",
        });
        this.moveHistory.push({
          moveId: message.command.move,
          input: message.command.input,
          playerId,
          role: "player",
          timestamp: Date.now(),
          stateID: newStateID,
          // Attribute the move to the turn it was issued in, even if the move
          // itself advances the game to the next turn before history is stored.
          turnNumber: previousState.ctx.status.turn,
          transitionType: "move",
          newStateID: newStateID,
        });

        // Undo checkpoint management
        const hasTurnStarted = result.gameEvents.some((e) => e.event.kind === "TURN_STARTED");
        if (hasTurnStarted) {
          this.undoCheckpoint = null;
        } else if (result.undoable) {
          this.undoCheckpoint = {
            stateID: previousStateID,
            playerId,
            state: previousState,
            runtimeSnapshot: runtimeSnapshotBeforeMove,
            undoneStateID: newStateID,
            undoneMoveId: message.command.move,
          };
        } else {
          this.undoCheckpoint = null;
        }

        this.broadcastStateUpdate(processedResult, newStateID);
      } else {
        this.sendError(playerId, "INVALID_MOVE", result.error || "Command failed", false);
      }
    } else if (isUndoRequestMessage(message)) {
      this.undo(playerId, message.prevStateID, message.commandID);
    } else if (isSyncRequestMessage(message)) {
      this.sendFullSync(playerId);
    }
  }

  private broadcastStateUpdate(
    result: Extract<CommandResult, { success: true }>,
    stateID: number,
  ): void {
    const fullState = this.runtime.getState();
    const command = result.processedCommand;
    const animations = result.animations;

    for (const [playerId, transport] of this.transports) {
      const message: UpdateFullMessage = {
        type: "UPDATE_FULL",
        reason: "PATCH_DISABLED",
        stateID,
        canUndo: this.canUndoForRecipient(playerId),
        protocolVersion: PROTOCOL_VERSION,
        matchID: fullState.ctx.matchID,
        processedCommand: command,
        animations,
        state: fullState,
      };
      if (this.debug) {
        logger.debug(
          `Broadcasting full state update to player ${playerId} (stateID: ${stateID}):`,
          {
            message,
            command,
          },
        );
      }

      transport.simulateReceive(message);
    }

    this.notifyStateUpdate(stateID);
  }

  private sendFullSync(playerId: string): void {
    const transport = this.transports.get(playerId);
    if (!transport) return;
    const fullState = this.runtime.getState();

    const message: SyncFullMessage = {
      type: "SYNC_FULL",
      stateID: fullState.ctx._stateID,
      canUndo: this.canUndoForRecipient(playerId),
      state: fullState,
      protocolVersion: PROTOCOL_VERSION,
      matchID: fullState.ctx.matchID,
      matchData: {
        gameID: fullState.ctx.gameID,
        rulesetHash: fullState.ctx.rulesetHash,
        playerIds: [...fullState.ctx.playerIds],
      },
    };

    transport.simulateReceive(message);
  }

  private canUndoForRecipient(playerId: string): boolean {
    return playerId === "spectator" ? false : this.canUndo(playerId);
  }

  private sendError(
    playerId: string,
    code: ErrorMessage["code"],
    message: string,
    resyncRequired: boolean,
  ): void {
    const transport = this.transports.get(playerId);
    if (!transport) return;
    transport.simulateReceive({
      type: "ERROR",
      code,
      message,
      resyncRequired,
      currentStateID: this.runtime.getCurrentStateID(),
      protocolVersion: PROTOCOL_VERSION,
      matchID: this.runtime.getState().ctx.matchID,
    } as ErrorMessage);
  }

  canUndo(playerId: string): boolean {
    return this.undoCheckpoint !== null && this.undoCheckpoint.playerId === playerId;
  }

  undo(playerId: string, prevStateID?: number, commandID?: string): boolean {
    if (typeof prevStateID === "number" && prevStateID !== this.runtime.getCurrentStateID()) {
      this.sendError(
        playerId,
        "STALE_STATE",
        `Expected state ${this.runtime.getCurrentStateID()}`,
        true,
      );
      return false;
    }

    if (!this.canUndo(playerId)) {
      this.sendError(
        playerId,
        "INVALID_MOVE",
        "Cannot undo: no undoable checkpoint available",
        false,
      );
      return false;
    }

    const checkpoint = this.undoCheckpoint!;
    const previousState = this.runtime.getState();
    const previousStateID = this.runtime.getCurrentStateID();
    const timestamp = Date.now();
    const nextStateID = previousStateID + 1;
    const undoCommand: CommandEnvelope = {
      commandID: commandID ?? `undo-${playerId}-${timestamp}`,
      move: "undo",
    };

    this.runtime.restoreState(checkpoint.state, checkpoint.runtimeSnapshot, {
      preserveHistory: true,
      newStateID: nextStateID,
    });
    const { gameEvents, logEntries } = this.runtime.appendSyntheticCommand(
      undoCommand,
      playerId,
      timestamp,
    );
    const restoredState = this.runtime.getState();

    this.undoCheckpoint = null;
    this.stateHistory.push({
      stateID: nextStateID,
      state: restoredState,
      timestamp,
      transitionType: "undo",
      undoneStateID: checkpoint.undoneStateID,
      restoredCheckpointStateID: checkpoint.stateID,
      undoneMoveId: checkpoint.undoneMoveId,
    });
    this.moveHistory.push({
      moveId: "undo",
      playerId,
      role: "player",
      timestamp,
      stateID: nextStateID,
      turnNumber: restoredState.ctx.status.turn,
      transitionType: "undo",
      newStateID: nextStateID,
      undoneStateID: checkpoint.undoneStateID,
      restoredCheckpointStateID: checkpoint.stateID,
      undoneMoveId: checkpoint.undoneMoveId,
    });

    const result = this.withPacketAnimations(
      {
        success: true,
        stateID: nextStateID,
        state: restoredState,
        patches: [],
        gameEvents,
        logEntries,
        processedCommand: undoCommand,
        animations: [],
        undoable: false,
      },
      previousState,
      undoCommand,
      playerId,
      "player",
    );

    this.broadcastStateUpdate(result, nextStateID);

    return true;
  }

  getState(): DeepReadonly<MatchState> {
    return this.runtime.getState() as DeepReadonly<MatchState>;
  }

  getStateID(): number {
    return this.runtime.getCurrentStateID();
  }

  getBoard(): DeepReadonly<FilteredMatchView> {
    return this.runtime.getProjectedBoardView(
      { role: "judge" },
      { serverTimestamp: Date.now() },
    ) as DeepReadonly<FilteredMatchView>;
  }

  validateMove<K extends keyof InferMoveInputMap<MoveRecord> & string>(
    moveId: K,
    input: InferMoveInputMap<MoveRecord>[K],
  ): EngineMoveValidationResult;
  validateMove(moveId: string, input: MoveInput): EngineMoveValidationResult;
  validateMove(moveId: string, input: MoveInput): EngineMoveValidationResult {
    return this.validateMoveForPlayer(
      this.resolveAuthoritativeActorPlayerId(),
      moveId,
      input,
      "judge",
    );
  }

  validateMoveForPlayer<K extends keyof InferMoveInputMap<MoveRecord> & string>(
    playerId: string,
    moveId: K,
    input: InferMoveInputMap<MoveRecord>[K],
    actorRole?: RuntimeActorRole,
  ): EngineMoveValidationResult;
  validateMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole?: RuntimeActorRole,
  ): EngineMoveValidationResult;
  validateMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole: RuntimeActorRole = "player",
  ): EngineMoveValidationResult {
    const command: CommandEnvelope = {
      commandID: `validate-${Date.now()}`,
      move: moveId as keyof InferMoveInputMap<MoveRecord> & string,
      input,
    };
    return this.runtime.validateCommand(
      command,
      playerId,
      this.runtime.getCurrentStateID(),
      actorRole,
    );
  }

  executeMove<K extends keyof InferMoveInputMap<MoveRecord> & string>(
    moveId: K,
    input: InferMoveInputMap<MoveRecord>[K],
  ): EngineMoveExecutionResult;
  executeMove(moveId: string, input: MoveInput): EngineMoveExecutionResult;
  executeMove(moveId: string, input: MoveInput): EngineMoveExecutionResult {
    return this.executeMoveForPlayer(
      this.resolveAuthoritativeActorPlayerId(),
      moveId,
      input,
      "judge",
    );
  }

  executeMoveForPlayer<K extends keyof InferMoveInputMap<MoveRecord> & string>(
    playerId: string,
    moveId: K,
    input: InferMoveInputMap<MoveRecord>[K],
    actorRole?: RuntimeActorRole,
  ): EngineMoveExecutionResult;
  executeMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole?: RuntimeActorRole,
  ): EngineMoveExecutionResult;
  executeMoveForPlayer(
    playerId: string,
    moveId: string,
    input: MoveInput,
    actorRole: RuntimeActorRole = "player",
  ): EngineMoveExecutionResult {
    const command: CommandEnvelope = {
      commandID: `server-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      move: moveId as keyof InferMoveInputMap<MoveRecord> & string,
      input,
    };
    const previousState = this.runtime.getState();
    const result = this.runtime.processCommand(
      command,
      playerId,
      this.runtime.getCurrentStateID(),
      Date.now(),
      actorRole,
    );

    if (result.success) {
      const newStateID = this.runtime.getCurrentStateID();
      const processedResult = this.withPacketAnimations(
        result,
        previousState,
        command,
        playerId,
        actorRole,
      );
      this.broadcastStateUpdate(processedResult, newStateID);

      if (actorRole === "player") {
        this.moveHistory.push({
          moveId,
          input,
          playerId,
          role: "player",
          timestamp: Date.now(),
          stateID: newStateID,
          // Attribute the move to the turn it was issued in, even if the move
          // itself advances the game to the next turn before history is stored.
          turnNumber: previousState.ctx.status.turn,
          transitionType: "move",
          newStateID: newStateID,
        });
      }

      // Clear undo checkpoint for non-protocol moves so it doesn't go stale
      this.undoCheckpoint = null;

      return { success: true };
    }

    // TODO: Reply to sender with the error.
    return { success: false, reason: result.error, code: result.errorCode };
  }

  enumerateMoves(): Array<keyof InferMoveInputMap<MoveRecord> & string> {
    const playerId = this.resolveAuthoritativeActorPlayerId();
    if (!playerId) {
      return [];
    }

    return this.runtime.enumerateMovesForPlayer(playerId, "judge") as Array<
      keyof InferMoveInputMap<MoveRecord> & string
    >;
  }

  enumerateMovesForPlayer(playerId: string): Array<keyof InferMoveInputMap<MoveRecord> & string> {
    return this.runtime.enumerateMovesForPlayer(playerId, "player") as Array<
      keyof InferMoveInputMap<MoveRecord> & string
    >;
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return limit && limit > 0 ? this.moveHistory.slice(-limit) : [...this.moveHistory];
  }

  getActorContext(): EngineActorContext {
    return { role: "judge" };
  }

  onStateUpdate(handler: (stateID: number) => void): () => void {
    this.stateUpdateHandlers.push(handler);
    return () => {
      const index = this.stateUpdateHandlers.indexOf(handler);
      if (index !== -1) {
        this.stateUpdateHandlers.splice(index, 1);
      }
    };
  }

  async dispose(skipLogs?: boolean): Promise<void> {
    for (const transport of this.transports.values()) {
      await transport.disconnect(skipLogs);
    }
    this.transports.clear();
  }

  getRuntime(): MatchRuntime {
    return this.runtime;
  }

  getConnectedPlayerIds(): string[] {
    return Array.from(this.transports.keys());
  }

  getUndoCheckpointSnapshot(): UndoCheckpoint | null {
    return this.undoCheckpoint ? (structuredClone(this.undoCheckpoint) as UndoCheckpoint) : null;
  }

  restoreUndoCheckpointSnapshot(checkpoint: UndoCheckpoint | null): void {
    this.undoCheckpoint = checkpoint ? (structuredClone(checkpoint) as UndoCheckpoint) : null;
  }

  restoreAuthoritativeSnapshot(snapshot: {
    state: MatchState;
    undoCheckpoint?: UndoCheckpoint;
  }): void {
    this.runtime.loadState(snapshot.state);
    this.stateHistory = [
      {
        stateID: snapshot.state.ctx._stateID,
        state: this.runtime.getState(),
        timestamp: Date.now(),
      },
    ];
    this.moveHistory = [];
    this.undoCheckpoint = snapshot.undoCheckpoint
      ? (structuredClone(snapshot.undoCheckpoint) as UndoCheckpoint)
      : null;

    for (const connectedPlayerId of this.transports.keys()) {
      this.sendFullSync(connectedPlayerId);
    }

    this.notifyStateUpdate(this.runtime.getCurrentStateID());
  }

  private withPacketAnimations(
    result: Extract<CommandResult, { success: true }>,
    previousState: MatchState,
    command: CommandEnvelope,
    playerId: string,
    role: "player" | "judge",
  ): Extract<CommandResult, { success: true }> {
    return {
      ...result,
      processedCommand: command,
      animations: this.derivePacketAnimations(
        previousState,
        this.runtime.getState(),
        command,
        playerId,
        role,
      ),
    };
  }

  private derivePacketAnimations(
    previousState: MatchState,
    nextState: MatchState,
    command: CommandEnvelope,
    playerId: string,
    role: "player" | "judge",
  ) {
    const derivePacketAnimations = this.runtime.getRuntimeConfig().derivePacketAnimations;

    if (typeof derivePacketAnimations !== "function") {
      logger.warn("derivePacketAnimations is not a function; not deriving animations.");
      return [];
    }

    return [
      ...derivePacketAnimations({
        command,
        playerId,
        role,
        previousState,
        nextState,
        staticResources: this.staticResources,
      }),
    ];
  }

  private notifyStateUpdate(stateID: number): void {
    for (const handler of this.stateUpdateHandlers) {
      handler(stateID);
    }
  }
}
