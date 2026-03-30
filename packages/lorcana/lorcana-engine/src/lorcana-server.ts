/**
 * Lorcana Server Runtime
 *
 * Authoritative server-side wrapper around MatchRuntime.
 * All move helpers require explicit player identity.
 */

import {
  type CardCatalog,
  type CommandEnvelope,
  type CommandResult,
  type EngineMoveValidationResult,
  type MatchRuntimeConfig,
  type Player,
  type PlayerId,
  ServerEngine,
  type ServerEngineConfig,
} from "#core";
import type {
  BagEffectEntry,
  LorcanaMatchState,
  LorcanaCard,
  LorcanaG,
  PendingActionEffect,
  LorcanaProjectedBoardView,
  LorcanaRuntimeMoveInputs,
} from "./types";

import { LorcanaEngineBase } from "./lorcana-engine-base";
import type {
  LorcanaServerAuthoritativeSnapshot,
  LorcanaUndoCheckpointSnapshot,
} from "./serialization";
import { resolveServerCurrentActor } from "./automation/actor-resolution";
import { createAutomatedActionRepeatedStateTracker } from "./automation/deadlock";
import { computeAutomatedActionStateFingerprint } from "./automation/decision-trace";
import {
  enumerateAutomatedActionsWithAdapter,
  takeAutomatedActionWithAdapter,
} from "./automation/planner";
import { buildAutomatedActionDeckPlanningMetadata } from "./automation/deck-profile";
import { resolveAutomatedActionStrategyOption } from "./automation/strategy-registry";
import type {
  AutomatedActionEnumerationOptions,
  AutomatedActionEnumerationResult,
  AutomatedActionExecutionOptions,
  AutomatedActionExecutionResult,
  AutomatedActionTraceSink,
  AutomatedActionStrategyOption,
} from "./automation";
import { lorcanaRuntimeConfig } from "./runtime-game";
import { type LorcanaCardsMaps } from "./engine-initialization";

export type LorcanaEngineDeckEntry = {
  cardId: string;
  qty: number;
  cardName?: string;
};

export type LorcanaEnginePlayerInfo = {
  player: Player;
  deck: LorcanaEngineDeckEntry[];
};

export type LorcanaEngineInit = {
  seed: string;
  instanceIdPrefix?: string;
  matchID?: string;
  gameID?: string;
  goingFirst: PlayerId;
  cardCatalog: CardCatalog;
  players: Player[];
  cardsMaps: LorcanaCardsMaps;
  timeControl?: import("#core").TimeControlConfig;
};

export class LorcanaServer extends LorcanaEngineBase {
  engine: ServerEngine;
  #automatedActionBlockedStateTracker = createAutomatedActionRepeatedStateTracker();

  constructor(init: LorcanaEngineInit) {
    super(init);
    const staticResources = this.getResolvedStaticResources();

    const serverEngineConfig: ServerEngineConfig = {
      runtimeConfig: {
        ...(lorcanaRuntimeConfig as unknown as MatchRuntimeConfig),
        timeControl: init.timeControl,
      },
      players: init.players,
      seed: init.seed,
      staticResources: staticResources,
      debugMode: false,
    };

    this.engine = new ServerEngine(serverEngineConfig);
  }

  getClientPlayerId(): string | undefined {
    return undefined;
  }

  acceptConnection(playerId: string, transport: import("#core").InMemoryTransport): void {
    this.engine.acceptConnection(playerId, transport);
  }

  getConnectedPlayerIds(): string[] {
    return this.engine.getConnectedPlayerIds();
  }

  onStateUpdate(handler: (stateID: number) => void): () => void {
    return this.engine.onStateUpdate(handler);
  }

  getRuntime() {
    return this.engine.getRuntime();
  }

  getGameLog() {
    return this.engine.getRuntime().getGameLog();
  }

  getMoveLogHistory() {
    return this.engine.getRuntime().getMoveLogHistory();
  }

  canUndo(playerId: string): boolean {
    return this.engine.canUndo(playerId);
  }

  getUndoCheckpointSnapshot(): LorcanaUndoCheckpointSnapshot | undefined {
    const checkpoint = this.engine.getUndoCheckpointSnapshot();
    return checkpoint
      ? ({
          ...checkpoint,
          state: checkpoint.state,
          runtimeSnapshot: checkpoint.runtimeSnapshot,
        } satisfies LorcanaUndoCheckpointSnapshot)
      : undefined;
  }

  restoreAuthoritativeSnapshot(snapshot: LorcanaServerAuthoritativeSnapshot): void {
    this.engine.restoreAuthoritativeSnapshot({
      state: snapshot.state as LorcanaMatchState,
      ...(snapshot.undoCheckpoint
        ? {
            undoCheckpoint: {
              ...snapshot.undoCheckpoint,
              state: snapshot.undoCheckpoint.state,
              runtimeSnapshot: snapshot.undoCheckpoint.runtimeSnapshot,
            },
          }
        : {}),
    });
    this.#automatedActionBlockedStateTracker.clear();
  }

  override undo(playerId: string, prevStateID?: number): CommandResult {
    const runtime = this.engine.getRuntime();
    const previousGameEventCount = runtime.getPublishedGameEvents().length;
    const previousLogCount = runtime.getGameLog().length;
    const wasAccepted = this.engine.undo(playerId, prevStateID);

    if (!wasAccepted) {
      return {
        success: false,
        error: "Cannot undo right now.",
        errorCode: "UNDO_NOT_AVAILABLE",
        currentStateID: this.getStateID(),
      };
    }

    return {
      success: true,
      stateID: this.getStateID(),
      state: this.engine.getState() as LorcanaMatchState,
      patches: [],
      gameEvents: runtime.getPublishedGameEvents().slice(previousGameEventCount),
      logEntries: [],
      processedCommand: {
        commandID: `undo-${playerId}-${Date.now()}`,
        move: "undo",
      },
      animations: [],
      undoable: false,
      moveLogs: runtime.getMoveLogHistory().slice(previousLogCount),
    };
  }

  protected executeMoveViaEngine<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
    ctx: { playerId: string; prevStateID?: number },
  ): CommandResult {
    const runtime = this.engine.getRuntime();
    const previousGameEventCount = runtime.getPublishedGameEvents().length;
    const previousLogCount = runtime.getGameLog().length;
    const result = this.engine.executeMoveForPlayer(ctx.playerId, moveId as string, input as never);
    if (!result.success) {
      return {
        success: false,
        error: result.reason ?? "Move execution failed",
        errorCode: result.code ?? "EXECUTE_FAILED",
        currentStateID: this.getStateID(),
      };
    }
    const commandEnvelope: CommandEnvelope = {
      commandID: "commandID",
      move: "move",
    };
    const commandResult: CommandResult = {
      success: true,
      stateID: this.getStateID(),
      state: this.engine.getState() as LorcanaMatchState,
      patches: [],
      gameEvents: runtime.getPublishedGameEvents().slice(previousGameEventCount),
      logEntries: [],
      processedCommand: {
        ...commandEnvelope,
        commandID: `server-${ctx.playerId}-${moveId}-${Date.now()}`,
        input,
        move: moveId,
      },
      animations: [],
      undoable: false,
      moveLogs: runtime.getMoveLogHistory().slice(previousLogCount),
    };

    return commandResult;
  }

  protected validateMoveForPlayerViaEngine<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
    ctx: { playerId: string },
  ): EngineMoveValidationResult {
    return this.engine.validateMoveForPlayer(ctx.playerId, moveId as string, input as never);
  }

  protected enumerateMovesForPlayerViaEngine(
    playerId: string,
  ): Array<keyof LorcanaRuntimeMoveInputs & string> {
    return this.engine.enumerateMovesForPlayer(playerId) as Array<
      keyof LorcanaRuntimeMoveInputs & string
    >;
  }

  protected override getAutomatedPlanningBoardForPlayer(
    playerId: PlayerId,
  ): LorcanaProjectedBoardView {
    return (this.engine
      .getRuntime()
      .getProjectedBoardView(
        { role: "player", playerID: playerId },
        { serverTimestamp: Date.now() },
      ) ?? this.getBoard()) as LorcanaProjectedBoardView;
  }

  protected loadStateViaEngine(state: LorcanaMatchState): void {
    this.engine.getRuntime().loadState(state);
    this.#automatedActionBlockedStateTracker.clear();
  }

  public resolveAutomatedActionStrategyForPlayer(
    strategyId: string,
    playerId: PlayerId,
  ): AutomatedActionStrategyOption | undefined {
    const board = this.getAutomatedPlanningBoardForPlayer(playerId);
    const { actorDeckProfile } = buildAutomatedActionDeckPlanningMetadata({
      actorId: playerId,
      board,
      staticResources: this.getResolvedStaticResources(),
    });

    return resolveAutomatedActionStrategyOption({
      actorColorPairId: actorDeckProfile?.colorPairId,
      strategyId,
    });
  }

  public enumerateAutomatedActionsForCurrentActor(
    options: AutomatedActionEnumerationOptions = {},
  ): AutomatedActionEnumerationResult {
    const state = this.getState();
    const actorResolution = resolveServerCurrentActor({
      state,
      staticResources: this.getResolvedStaticResources(),
    });
    const actorId = actorResolution.actorId;
    const board = actorId ? this.getAutomatedPlanningBoardForPlayer(actorId) : this.getBoard();

    return enumerateAutomatedActionsWithAdapter(
      {
        actorId,
        authoritativeHints: actorId
          ? {
              actorBoard: board,
              bagItems: state.G.triggeredAbilities.bag.items ?? ([] as BagEffectEntry[]),
              pendingEffects: state.G.pendingEffects ?? ([] as PendingActionEffect[]),
              state,
            }
          : undefined,
        availableMoveIds: actorId ? this.enumerateMovesForPlayerViaEngine(actorId) : [],
        board,
        concede: (resolvedActorId) =>
          this.executeMoveInputForPlayer("concede", resolvedActorId, {
            args: {
              playerId: resolvedActorId,
            },
          }),
        createErrorResult: (error, errorCode) => this.createErrorResult(error, errorCode),
        createNoopResult: () => this.createNoopResult(),
        executeCandidate: (resolvedActorId, candidate) =>
          this.executeAutomatedActionCandidate(resolvedActorId, candidate),
        getDefinitionByInstanceId: (cardId) =>
          this.getCardDefinitionByInstanceId(cardId) as LorcanaCard,
        passTurn: (resolvedActorId) =>
          this.executeMoveInputForPlayer("passTurn", resolvedActorId, { args: {} }),
        previewChallenge: (attackerId, defenderId) =>
          actorId ? this.previewChallengeForActor(actorId, attackerId, defenderId) : null,
        state,
        staticResources: this.getResolvedStaticResources(),
        validateCandidate: (resolvedActorId, candidate) =>
          this.validateAutomatedActionCandidate(resolvedActorId, candidate),
      },
      options,
      [actorResolution],
    );
  }

  public takeAutomatedActionForCurrentActor(
    options: AutomatedActionExecutionOptions = {},
  ): AutomatedActionExecutionResult {
    const state = this.getState();
    const stateFingerprint = computeAutomatedActionStateFingerprint(state);
    const actorResolution = resolveServerCurrentActor({
      state,
      staticResources: this.getResolvedStaticResources(),
    });
    const actorId = actorResolution.actorId;
    const board = actorId ? this.getAutomatedPlanningBoardForPlayer(actorId) : this.getBoard();
    let latestTrace: Parameters<AutomatedActionTraceSink["push"]>[0] | undefined;
    const traceSink: AutomatedActionTraceSink = {
      push(trace) {
        latestTrace = trace;
      },
    };

    let result = takeAutomatedActionWithAdapter(
      {
        actorId,
        authoritativeHints: actorId
          ? {
              actorBoard: board,
              bagItems: state.G.triggeredAbilities.bag.items ?? ([] as BagEffectEntry[]),
              pendingEffects: state.G.pendingEffects ?? ([] as PendingActionEffect[]),
              state,
            }
          : undefined,
        availableMoveIds: actorId ? this.enumerateMovesForPlayerViaEngine(actorId) : [],
        board,
        concede: (resolvedActorId) =>
          this.executeMoveInputForPlayer("concede", resolvedActorId, {
            args: {
              playerId: resolvedActorId,
            },
          }),
        createErrorResult: (error, errorCode) => this.createErrorResult(error, errorCode),
        createNoopResult: () => this.createNoopResult(),
        executeCandidate: (resolvedActorId, candidate) =>
          this.executeAutomatedActionCandidate(resolvedActorId, candidate),
        getDefinitionByInstanceId: (cardId) =>
          this.getCardDefinitionByInstanceId(cardId) as LorcanaCard,
        passTurn: (resolvedActorId) =>
          this.executeMoveInputForPlayer("passTurn", resolvedActorId, { args: {} }),
        previewChallenge: (attackerId, defenderId) =>
          actorId ? this.previewChallengeForActor(actorId, attackerId, defenderId) : null,
        state,
        staticResources: this.getResolvedStaticResources(),
        validateCandidate: (resolvedActorId, candidate) =>
          this.validateAutomatedActionCandidate(resolvedActorId, candidate),
      },
      {
        ...options,
        traceSink,
      },
      [actorResolution],
    );

    if (result.finalResult.success && result.blocked) {
      const observation = this.#automatedActionBlockedStateTracker.observe({
        actorId: result.actorId,
        stateFingerprint,
      });

      if (observation.repeatedStateDeadlock && result.actorId) {
        const concedeResult = this.executeMoveInputForPlayer("concede", result.actorId, {
          args: {
            playerId: result.actorId,
          },
        });

        result = {
          ...result,
          fallbackTaken: "concede",
          finalResult: concedeResult,
        };
      }
    }

    if (latestTrace) {
      options.traceSink?.push({
        ...latestTrace,
        ...(result.blocked ? { blocked: result.blocked } : {}),
        ...(result.fallbackTaken ? { fallbackTaken: result.fallbackTaken } : {}),
        finalResult: result.finalResult.success
          ? {
              stateId: result.finalResult.stateID,
              success: true,
            }
          : {
              error: result.finalResult.error,
              errorCode: result.finalResult.errorCode,
              stateId: result.finalResult.currentStateID,
              success: false,
            },
      });
    }

    return result;
  }
}

export function createLorcanaServerGame(
  playersInfo: { player: Player }[],
  init: LorcanaEngineInit,
): LorcanaServer {
  const players = playersInfo.map((p) => p.player);
  return new LorcanaServer({ ...init, players });
}

export type { LorcanaMatchState };
