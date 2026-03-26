/**
 * MatchRuntime - Deterministic State Transition Engine
 */

import { enablePatches, setAutoFreeze } from "immer";
import type {
  CommandEnvelope,
  GameEvent,
  GameLogEntry,
  MatchState,
  MoveInput,
  PublishedGameEvent,
} from "./types";
import { settleClocks, grantPriority } from "./time-control";
import {
  createMatchStaticResourcesFromCardsMaps,
  getStaticResourceRefs,
  type MatchStaticResources,
  type StaticResourceRefs,
} from "./static-resources";
import type {
  MatchRuntimeConfig,
  MatchRuntimeInit,
  MoveDefinition,
  MoveRecord,
  RuntimeLegalMove,
  RuntimeActorRole,
  MoveValidationContext,
  MoveEnumerationContext,
  GameEndResult,
  CommandFailure,
  CommandResult,
  FilteredMatchView,
  ProjectedLogEntry,
  ViewRoleContext,
  RuntimeBoardProjectionContext,
  RuntimeSnapshot,
} from "./match-runtime.types";
import { buildValidationContext } from "./match-runtime.utils";
import { executeCommand } from "./match-runtime.commands";
import { executePriorityPass } from "./match-runtime.priority";
import { initializeMatchState } from "./match-runtime.init";
import { getFilteredView, type QueryContext } from "./match-runtime.queries";
import { validateCommand as validateRuntimeCommand } from "./match-runtime.validation";
import { isMoveAllowedByFlow } from "./match-runtime.flow";
import { canPlayerTakeActions } from "./match-runtime.apis";
import { projectGameLog } from "./match-runtime.logs";
import { getLogger } from "@logtape/logtape";
import {
  clearStateScopedValueCache,
  createStateScopedValueCache,
  getStateScopedValueCacheStats,
} from "./state-scoped-value-cache";

const logger = getLogger(["core-engine", "match-runtime"]);

enablePatches();
setAutoFreeze(true);

export type {
  MatchRuntimeConfig,
  SetupArgs,
  BoardSetupContext,
  CommandFailure,
  CommandResult,
  CommandSuccess,
  Player,
  DeepReadonly,
  RuntimeStateView,
  MoveInputView,
  EventAPI,
  QueryAPI,
  FrameworkStateSnapshot,
  CardRuntimeReadAPI,
  CardRuntimeAPI,
  FrameworkReadAPI,
  FrameworkWriteAPI,
  GameEndResult,
  LogProjector,
  LogProjectionContext,
  PacketAnimationContext,
  MatchRuntimeInit,
  MoveStateView,
  MoveEnumerationContext,
  MoveExecutionContext,
  MoveDefinition,
  MoveValidationContext,
  MoveContext,
  MoveRecord,
  ProjectedLogEntry,
  RandomAPI,
  RuntimeBoardProjectionContext,
  RuntimeFlowDefinition,
  RuntimePhaseDefinition,
  RuntimeStepDefinition,
  RuntimeTurnDefinition,
  TimeOperationsAPI,
  TimeQueryAPI,
  RuntimeActorRole,
  RuntimeLifecycleContext,
  RuntimeLifecycleHook,
  RuntimeSnapshot,
  ViewRoleContext,
  ZoneDefinitions,
  ZoneConfig,
  ZoneMutationAPI,
  ZoneQueryAPI,
} from "./match-runtime.types";
export class MatchRuntime {
  private config: MatchRuntimeConfig;
  private staticResources: MatchStaticResources;
  private publishedGameEvents: PublishedGameEvent[] = [];
  private gameLog: GameLogEntry[] = [];
  private nextGameEventSeq = 0;
  private nextGameLogSeq = 0;
  private gameEnded = false;
  private gameEndResult?: GameEndResult;

  private state: MatchState;
  private board: FilteredMatchView;
  private cachedEnumeratedMovesStateID = -1;
  private cachedEnumeratedMovesByActor = new Map<string, RuntimeLegalMove<MoveRecord>[]>();
  private runtimeCardCache = createStateScopedValueCache<unknown>();

  constructor(config: MatchRuntimeConfig, init: MatchRuntimeInit) {
    this.config = config;
    // this.cardsMaps = deepFreeze(init.cardsMaps);
    this.staticResources = createMatchStaticResourcesFromCardsMaps(
      init.cardsMaps,
      init.cardCatalog,
      config.zones,
    );

    const { state, board } = initializeMatchState({
      config: config as unknown as MatchRuntimeConfig,
      players: init.players,
      seed: init.seed,
      matchID: init.matchID,
      gameID: init.gameID,
      staticResources: this.staticResources,
      choosingFirstPlayer: init.choosingFirstPlayer,
    });

    this.state = state;
    this.board = board as FilteredMatchView;
  }

  private clearEnumeratedMovesCache(): void {
    this.cachedEnumeratedMovesStateID = -1;
    this.cachedEnumeratedMovesByActor.clear();
  }

  /**
   * Load a previously serialized state.
   * Used for restoring game state from Redis or replays.
   * We must ensure this runs similar to the constructor,
   * so that the state is fully initialized and ready for use.
   * Before loading the state, we instantiate a new Engine, e.g `new LorcanaEngine(playersInfo, init);`
   * This should be enough to ensure that config, and static resources, are set up correctly.
   */
  loadState(state: MatchState): void {
    this.state = state;
    this.clearEnumeratedMovesCache();
    clearStateScopedValueCache(this.runtimeCardCache);
    this.gameEnded = state.ctx.status.gameEnded ?? false;
    this.gameEndResult = state.ctx.status.gameEnded
      ? { winner: state.ctx.status.winner, reason: state.ctx.status.reason ?? "" }
      : undefined;
    this.publishedGameEvents = [];
    this.gameLog = [];
    this.nextGameEventSeq = 0;
    this.nextGameLogSeq = 0;
  }

  processCommand(
    command: CommandEnvelope,
    playerId: string,
    prevStateID: number,
    timestamp: number,
    actorRole: RuntimeActorRole = "judge",
  ): CommandResult {
    if (this.state.ctx.time.mode !== "none") {
      this.state = settleClocks(this.state, timestamp);
      this.clearEnumeratedMovesCache();
    }

    const pendingGameEvents: GameEvent[] = [];

    const execResult = executeCommand(command, playerId, prevStateID, timestamp, {
      state: this.state,
      config: this.config as unknown as MatchRuntimeConfig,
      staticResources: this.staticResources,
      actorRole,
      gameEnded: this.gameEnded,
      currentStateID: this.state.ctx._stateID,
    });

    this.state = execResult.newState;
    this.clearEnumeratedMovesCache();

    if (!execResult.result.success) {
      return execResult.result as CommandFailure;
    }

    pendingGameEvents.push(...execResult.result.pendingGameEvents);
    const publishedGameEvents = this.publishGameEvents(
      pendingGameEvents,
      execResult.newState.ctx._stateID,
      timestamp,
    );

    const moveLogEntries = execResult.result.success ? execResult.result.moveLogEntries : [];
    const projectedLogResult = projectGameLog({
      publishedGameEvents,
      state: execResult.newState,
      moveLogEntries,
      nextGameLogSeq: this.nextGameLogSeq,
      logProjector: this.config.logProjector,
    });

    const logEntries = projectedLogResult.logEntries;
    this.nextGameLogSeq = projectedLogResult.nextGameLogSeq;

    this.publishedGameEvents.push(...publishedGameEvents);
    this.gameLog.push(...logEntries);

    if (execResult.gameEnded) {
      this.gameEnded = true;
      this.gameEndResult = execResult.gameEndResult;
    }

    return {
      success: true,
      stateID: execResult.result.stateID,
      state: execResult.result.state,
      patches: execResult.result.patches,
      gameEvents: publishedGameEvents,
      logEntries,
      processedCommand: command,
      animations: [],
      undoable: execResult.result.undoable,
    };
  }

  grantPriority(playerId: string, timestamp: number): void {
    this.state = grantPriority(this.state, playerId, timestamp);
    this.clearEnumeratedMovesCache();
  }

  passPriority(playerId: string, timestamp: number): CommandResult {
    const passResult = executePriorityPass(playerId, timestamp, {
      state: this.state,
      currentStateID: this.state.ctx._stateID,
    });
    this.state = passResult.newState;
    this.clearEnumeratedMovesCache();
    const gameEvents = this.publishGameEvents(
      passResult.result.pendingGameEvents,
      passResult.newState.ctx._stateID,
      timestamp,
    );
    const projectedLogResult = projectGameLog({
      publishedGameEvents: gameEvents,
      state: passResult.newState,
      nextGameLogSeq: this.nextGameLogSeq,
      logProjector: this.config.logProjector,
    });
    const logEntries = projectedLogResult.logEntries;
    this.nextGameLogSeq = projectedLogResult.nextGameLogSeq;

    this.publishedGameEvents.push(...gameEvents);
    this.gameLog.push(...logEntries);

    return {
      success: true,
      stateID: passResult.result.stateID,
      state: passResult.result.state,
      patches: passResult.result.patches,
      gameEvents,
      logEntries,
      processedCommand: {
        commandID: `priority-pass-${timestamp}`,
        move: "__priorityPass",
      },
      animations: [],
      undoable: false,
    };
  }

  // Queries
  getState(): MatchState {
    return this.state;
  }

  getBoard(): FilteredMatchView {
    return this.board;
  }

  getCurrentStateID(): number {
    return this.state.ctx._stateID;
  }
  hasGameEnded(): boolean {
    return this.gameEnded;
  }
  getGameEndResult(): GameEndResult | undefined {
    return this.gameEndResult;
  }
  getPublishedGameEvents(): PublishedGameEvent[] {
    return [...this.publishedGameEvents];
  }
  getGameLog(): GameLogEntry[] {
    return [...this.gameLog];
  }

  getRuntimeConfig(): MatchRuntimeConfig {
    return this.config;
  }

  getStaticResourceRefs(): StaticResourceRefs {
    return getStaticResourceRefs(this.staticResources);
  }
  getFilteredView(roleCtx: ViewRoleContext): FilteredMatchView {
    return getFilteredView(this.getQueryContext(), roleCtx);
  }

  getProjectedBoardView(
    roleCtx: ViewRoleContext,
    projectionCtx: RuntimeBoardProjectionContext,
  ): FilteredMatchView | undefined {
    if (typeof this.config.projectBoard === "function") {
      return this.config.projectBoard(this.getState(), roleCtx, this.staticResources, {
        ...projectionCtx,
        runtimeCardCache: this.runtimeCardCache,
      });
    }

    return undefined;
  }

  enumerateMovesForPlayer(
    playerId: string,
    actorRole: RuntimeActorRole = "player",
  ): RuntimeLegalMove<MoveRecord>[] {
    if (!playerId) {
      return [];
    }

    const currentStateID = this.state.ctx._stateID;
    if (this.cachedEnumeratedMovesStateID !== currentStateID) {
      this.cachedEnumeratedMovesStateID = currentStateID;
      this.cachedEnumeratedMovesByActor.clear();
    }
    const cacheKey = `${actorRole}:${playerId}`;
    const cachedMoves = this.cachedEnumeratedMovesByActor.get(cacheKey);
    if (cachedMoves) {
      return cachedMoves;
    }

    const legalMoves: RuntimeLegalMove<MoveRecord>[] = [];
    const moveEntries = Object.entries(this.config.moves) as Array<[string, MoveDefinition]>;

    if (this.gameEnded || this.state.ctx.status.gameEnded) {
      return [];
    }

    const emptyInput: MoveInput<Record<string, never>> = { args: {} };
    const baseValidationContext = this.buildValidationContext(playerId, emptyInput, "preflight");
    const enumerationContextCandidate = {
      ...baseValidationContext,
    } as Record<string, unknown>;
    delete enumerationContextCandidate.input;
    delete enumerationContextCandidate.args;
    delete enumerationContextCandidate.params;
    delete enumerationContextCandidate.validationMode;
    const enumerationContext = enumerationContextCandidate as unknown as MoveEnumerationContext;

    for (const [moveId, moveDef] of moveEntries) {
      if (!moveDef || (actorRole === "player" && moveDef.serverOnly)) {
        continue;
      }
      if (
        !isMoveAllowedByFlow(
          this.config.flow,
          this.state.ctx.status.phase,
          moveId,
          this.state.ctx.status.gameSegment,
        )
      ) {
        continue;
      }
      if (
        actorRole !== "judge" &&
        !moveDef.serverOnly &&
        !moveDef.ignorePriority &&
        !canPlayerTakeActions(this.state, playerId)
      ) {
        continue;
      }

      if (typeof moveDef.available === "function" && !moveDef.available(enumerationContext)) {
        continue;
      }

      legalMoves.push(moveId as keyof MoveRecord & string);
    }

    this.cachedEnumeratedMovesByActor.set(cacheKey, legalMoves);
    return legalMoves;
  }

  enumerateMoves(actorRole: RuntimeActorRole = "player"): RuntimeLegalMove<MoveRecord>[] {
    const playerId = this.state.ctx.priority.holder ?? this.state.ctx.playerIds[0];
    if (!playerId) {
      return [];
    }

    return this.enumerateMovesForPlayer(playerId, actorRole);
  }

  validateCommand(
    command: CommandEnvelope,
    playerId: string,
    prevStateID: number = this.state.ctx._stateID,
    actorRole: RuntimeActorRole = "player",
  ): { valid: boolean; reason?: string; code?: string } {
    const result = validateRuntimeCommand(command, playerId, prevStateID, {
      state: this.state,
      config: this.config as unknown as MatchRuntimeConfig,
      staticResources: this.staticResources,
      actorRole,
      gameEnded: this.gameEnded,
      currentStateID: this.state.ctx._stateID,
    });

    if (!result.valid) {
      logger.warning(
        `Command ${command.commandID} from player ${playerId} is invalid: ${result.reason} (code: ${result.code})`,
      );
    }

    return {
      valid: result.valid,
      reason: result.reason,
      code: result.code,
    };
  }

  createRuntimeSnapshot(): RuntimeSnapshot {
    return {
      publishedGameEventsLength: this.publishedGameEvents.length,
      gameLogLength: this.gameLog.length,
      nextGameEventSeq: this.nextGameEventSeq,
      nextGameLogSeq: this.nextGameLogSeq,
      gameEnded: this.gameEnded,
      gameEndResult: this.gameEndResult,
    };
  }

  restoreState(
    state: MatchState,
    snapshot: RuntimeSnapshot,
    options?: {
      preserveHistory?: boolean;
      newStateID?: number;
    },
  ): void {
    const restoredState = structuredClone(state) as MatchState;
    if (typeof options?.newStateID === "number") {
      restoredState.ctx._stateID = options.newStateID;
    }

    this.state = restoredState;
    this.clearEnumeratedMovesCache();
    if (!options?.preserveHistory) {
      this.publishedGameEvents.length = snapshot.publishedGameEventsLength;
      this.gameLog.length = snapshot.gameLogLength;
      this.nextGameEventSeq = snapshot.nextGameEventSeq;
      this.nextGameLogSeq = snapshot.nextGameLogSeq;
    }
    this.gameEnded = snapshot.gameEnded;
    this.gameEndResult = snapshot.gameEndResult;
  }

  appendSyntheticCommand(
    command: CommandEnvelope,
    playerId: string,
    timestamp: number,
  ): {
    gameEvents: PublishedGameEvent[];
    logEntries: GameLogEntry[];
  } {
    const gameEvents = this.publishGameEvents(
      [
        {
          kind: "MOVE_EXECUTED",
          commandId: command.commandID ?? `cmd-${timestamp}`,
          move: command.move,
          playerId,
          inputRedacted: Boolean(command.redactInput),
          input: command.redactInput ? "[REDACTED]" : command.input,
        },
      ],
      this.state.ctx._stateID,
      timestamp,
    );
    const projectedLogResult = projectGameLog({
      publishedGameEvents: gameEvents,
      state: this.state,
      nextGameLogSeq: this.nextGameLogSeq,
      logProjector: this.config.logProjector,
    });

    this.nextGameLogSeq = projectedLogResult.nextGameLogSeq;
    this.publishedGameEvents.push(...gameEvents);
    this.gameLog.push(...projectedLogResult.logEntries);

    return {
      gameEvents,
      logEntries: projectedLogResult.logEntries,
    };
  }

  // Private helpers
  private getQueryContext(): QueryContext {
    return {
      state: this.state,
      config: this.config as unknown as MatchRuntimeConfig,
      staticResources: this.staticResources,
      gameEnded: this.gameEnded,
      gameEvents: this.publishedGameEvents,
      gameLog: this.gameLog,
    };
  }
  private buildValidationContext(
    playerId: string,
    input: MoveInput,
    validationMode: "preflight" | "final" = "final",
  ): MoveValidationContext<MoveInput> {
    return buildValidationContext(
      this.state,
      playerId,
      input,
      this.config as unknown as MatchRuntimeConfig,
      this.staticResources,
      this.gameEnded,
      validationMode,
      this.runtimeCardCache,
    );
  }

  getRuntimeCardCacheStats() {
    return getStateScopedValueCacheStats(this.runtimeCardCache);
  }

  private publishGameEvents(
    gameEvents: GameEvent[],
    stateId: number,
    timestamp: number,
  ): PublishedGameEvent[] {
    return gameEvents.map((event) => ({
      seq: this.nextGameEventSeq++,
      timestamp,
      stateId,
      event,
    }));
  }
}
