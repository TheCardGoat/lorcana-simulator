/**
 * MatchRuntime - Deterministic State Transition Engine
 */

import { enablePatches, setAutoFreeze, type Draft } from "immer";
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
  RuntimeLegalMove,
  RuntimeActorRole,
  MoveValidationContext,
  MoveEnumerationContext,
  MoveExecutionContext,
  GameEndResult,
  CommandFailure,
  CommandResult,
  FilteredMatchView,
  ProjectedLogEntry,
  ViewRoleContext,
  RuntimeLifecycleContext,
  RuntimeBoardProjectionContext,
} from "./match-runtime.types";
import {
  buildValidationContext,
  buildExecutionContext,
  buildLifecycleContext,
} from "./match-runtime.utils";
import { executeCommand } from "./match-runtime.commands";
import { executePriorityPass } from "./match-runtime.priority";
import { initializeMatchState } from "./match-runtime.init";
import { getFilteredView, type QueryContext } from "./match-runtime.queries";
import { validateCommand as validateRuntimeCommand } from "./match-runtime.validation";
import { isMoveAllowedByFlow } from "./match-runtime.flow";
import { canPlayerTakeActions } from "./match-runtime.apis";
import { projectGameLog } from "./match-runtime.logs";
import { getLogger } from "@logtape/logtape";
import type { BaseCardDefinition } from "./card-contracts";

const logger = getLogger(["core-engine", "match-runtime"]);

enablePatches();
setAutoFreeze(true);

export type {
  MatchRuntimeConfig,
  MatchRuntimeConfigWithRuntimeCard,
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
  CardRuntimeReadAPIWithRuntimeCard,
  CardRuntimeAPIWithRuntimeCard,
  FrameworkCardsReadAPI,
  FrameworkCardsWriteAPI,
  FrameworkReadAPI,
  FrameworkWriteAPI,
  FrameworkReadAPIWithRuntimeCard,
  FrameworkWriteAPIWithRuntimeCard,
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
  ViewRoleContext,
  ZoneDefinitions,
  ZoneConfig,
  ZoneMutationAPI,
  ZoneQueryAPI,
} from "./match-runtime.types";
export class MatchRuntime<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
  TBoardView = FilteredMatchView<G>,
> {
  private config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TBoardView>;
  private staticResources: MatchStaticResources<TCardDefinition>;
  private publishedGameEvents: PublishedGameEvent[] = [];
  private gameLog: GameLogEntry[] = [];
  private nextGameEventSeq = 0;
  private nextGameLogSeq = 0;
  private gameEnded = false;
  private gameEndResult?: GameEndResult;

  private state: MatchState<G>;
  private board: TBoardView;

  constructor(
    config: MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TBoardView>,
    init: MatchRuntimeInit<TCardDefinition>,
  ) {
    this.config = config;
    // this.cardsMaps = deepFreeze(init.cardsMaps);
    this.staticResources = createMatchStaticResourcesFromCardsMaps<TCardDefinition>(
      init.cardsMaps,
      init.cardCatalog,
      config.zones,
    );

    const { state, board } = initializeMatchState<
      G,
      Moves,
      TCardDefinition,
      TCardDerived,
      TBoardView
    >({
      config: config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
      players: init.players,
      seed: init.seed,
      matchID: init.matchID,
      gameID: init.gameID,
      staticResources: this.staticResources,
      choosingFirstPlayer: init.choosingFirstPlayer,
    });

    this.state = state;
    this.board = board;
  }

  /**
   * Load a previously serialized state.
   * Used for restoring game state from Redis or replays.
   * We must ensure this runs similar to the constructor,
   * so that the state is fully initialized and ready for use.
   * Before loading the state, we instantiate a new Engine, e.g `new LorcanaEngine(playersInfo, init);`
   * This should be enough to ensure that config, and static resources, are set up correctly.
   */
  loadState(state: MatchState<G>): void {
    this.state = state;
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
    }

    const pendingGameEvents: GameEvent[] = [];

    const execResult = executeCommand(command, playerId, prevStateID, timestamp, {
      state: this.state,
      config: this.config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
      actorRole,
      gameEnded: this.gameEnded,
      currentStateID: this.state.ctx._stateID,
      buildValidationContext: (pid, input, validationMode) =>
        this.buildValidationContext(pid, input, validationMode),
      buildExecutionContext: (draft, pid, input, tracker, emitGameEvent, moveLogSink) =>
        this.buildExecutionContext(draft, pid, input, tracker, emitGameEvent, moveLogSink),
      buildLifecycleContext: (
        draft,
        pid,
        lifecycleGameEnded,
        emitGameEvent,
        tracker,
        moveLogSink,
      ) =>
        this.buildLifecycleContext(
          draft,
          pid,
          lifecycleGameEnded,
          emitGameEvent,
          tracker,
          moveLogSink,
        ),
    });

    this.state = execResult.newState;

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
    };
  }

  grantPriority(playerId: string, timestamp: number): void {
    this.state = grantPriority(this.state, playerId, timestamp);
  }

  passPriority(playerId: string, timestamp: number): CommandResult {
    const passResult = executePriorityPass(playerId, timestamp, {
      state: this.state,
      currentStateID: this.state.ctx._stateID,
    });
    this.state = passResult.newState;
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
    };
  }

  // Queries
  getState(): MatchState<G> {
    return this.state;
  }

  getBoard(): TBoardView {
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

  getRuntimeConfig(): MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived, TBoardView> {
    return this.config;
  }

  getStaticResourceRefs(): StaticResourceRefs {
    return getStaticResourceRefs(this.staticResources);
  }
  getFilteredView(roleCtx: ViewRoleContext): FilteredMatchView<G> {
    return getFilteredView(this.getQueryContext(), roleCtx);
  }

  getProjectedBoardView(
    roleCtx: ViewRoleContext,
    projectionCtx: RuntimeBoardProjectionContext,
  ): TBoardView | undefined {
    if (typeof this.config.projectBoard === "function") {
      return this.config.projectBoard(
        this.getState(),
        roleCtx,
        this.staticResources,
        projectionCtx,
      );
    }

    return undefined;
  }

  enumerateMovesForPlayer(
    playerId: string,
    actorRole: RuntimeActorRole = "player",
  ): RuntimeLegalMove<Moves>[] {
    if (!playerId) {
      return [];
    }

    const legalMoves: RuntimeLegalMove<Moves>[] = [];
    const moveEntries = Object.entries(this.config.moves) as Array<
      [string, MoveDefinition<G, TCardDefinition, MoveInput, unknown, TCardDerived>]
    >;

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
    const enumerationContext = enumerationContextCandidate as unknown as MoveEnumerationContext<
      G,
      TCardDefinition,
      TCardDerived
    >;

    for (const [moveId, moveDef] of moveEntries) {
      if (!moveDef || (actorRole === "player" && moveDef.serverOnly)) {
        continue;
      }
      if (
        !isMoveAllowedByFlow<G, TCardDefinition, TCardDerived>(
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

      legalMoves.push(moveId as keyof Moves & string);
    }

    return legalMoves;
  }

  enumerateMoves(actorRole: RuntimeActorRole = "player"): RuntimeLegalMove<Moves>[] {
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
      config: this.config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
      actorRole,
      gameEnded: this.gameEnded,
      currentStateID: this.state.ctx._stateID,
      buildValidationContext: (pid, input, validationMode) =>
        this.buildValidationContext(pid, input, validationMode),
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

  // Private helpers
  private getQueryContext(): QueryContext<G, Moves, TCardDefinition, TCardDerived> {
    return {
      state: this.state,
      config: this.config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
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
  ): MoveValidationContext<G, TCardDefinition, MoveInput, TCardDerived> {
    return buildValidationContext(
      this.state,
      playerId,
      input,
      this.config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
      this.staticResources,
      this.gameEnded,
      validationMode,
    );
  }
  private buildExecutionContext(
    draft: Draft<MatchState<G>>,
    playerId: string,
    input: MoveInput,
    endGameTracker: { ended: boolean; result?: GameEndResult },
    emitGameEvent: (event: GameEvent) => void,
    moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  ): MoveExecutionContext<G, TCardDefinition, MoveInput, TCardDerived> {
    return buildExecutionContext(
      draft,
      playerId,
      input,
      this.config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
      this.staticResources,
      this.gameEnded,
      emitGameEvent,
      endGameTracker,
      moveLogSink,
    );
  }
  private buildLifecycleContext(
    draft: Draft<MatchState<G>>,
    playerId: string | undefined,
    gameEnded: boolean,
    emitGameEvent: (event: GameEvent) => void,
    endGameTracker: { ended: boolean; result?: GameEndResult },
    moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  ): RuntimeLifecycleContext<G, TCardDefinition, TCardDerived> {
    return buildLifecycleContext(
      draft,
      this.config as unknown as MatchRuntimeConfig<G, Moves, TCardDefinition, TCardDerived>,
      this.staticResources,
      gameEnded,
      emitGameEvent,
      endGameTracker,
      playerId,
      moveLogSink,
    );
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
