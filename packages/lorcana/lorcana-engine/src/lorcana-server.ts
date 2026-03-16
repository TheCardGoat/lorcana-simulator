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
import { resolveServerCurrentActor } from "./automation/actor-resolution";
import {
  enumerateAutomatedActionsWithAdapter,
  takeAutomatedActionWithAdapter,
} from "./automation/planner";
import type {
  AutomatedActionEnumerationOptions,
  AutomatedActionEnumerationResult,
  AutomatedActionExecutionOptions,
  AutomatedActionExecutionResult,
} from "./automation";
import { lorcanaRuntimeConfig } from "./runtime-game";
import type { LorcanaRuntimeCardDerivedMethods } from "./runtime-moves";
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
  cardCatalog: CardCatalog<LorcanaCard>;
  players: Player[];
  cardsMaps: LorcanaCardsMaps;
};

export class LorcanaServer extends LorcanaEngineBase {
  engine: ServerEngine<
    LorcanaG,
    LorcanaCard,
    LorcanaRuntimeCardDerivedMethods,
    LorcanaProjectedBoardView,
    typeof lorcanaRuntimeConfig.moves
  >;

  constructor(init: LorcanaEngineInit) {
    super(init);
    const staticResources = this.getResolvedStaticResources();

    const serverEngineConfig: ServerEngineConfig<
      LorcanaG,
      LorcanaCard,
      LorcanaRuntimeCardDerivedMethods,
      LorcanaProjectedBoardView,
      typeof lorcanaRuntimeConfig.moves
    > = {
      runtimeConfig: lorcanaRuntimeConfig,
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

  getRuntime() {
    return this.engine.getRuntime();
  }

  protected executeMoveViaEngine<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
    ctx: { playerId: string; prevStateID?: number },
  ): CommandResult {
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
      state: structuredClone(this.engine.getState()) as LorcanaMatchState,
      patches: [],
      gameEvents: [],
      logEntries: [],
      processedCommand: commandEnvelope,
      animations: [],
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
    return this.engine.enumerateMovesForPlayer(playerId);
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
              bagItems: structuredClone(
                state.G.triggeredAbilities.bag.items ?? [],
              ) as BagEffectEntry[],
              pendingEffects: structuredClone(
                state.G.pendingEffects ?? [],
              ) as PendingActionEffect[],
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
    const actorResolution = resolveServerCurrentActor({
      state,
      staticResources: this.getResolvedStaticResources(),
    });
    const actorId = actorResolution.actorId;
    const board = actorId ? this.getAutomatedPlanningBoardForPlayer(actorId) : this.getBoard();

    return takeAutomatedActionWithAdapter(
      {
        actorId,
        authoritativeHints: actorId
          ? {
              actorBoard: board,
              bagItems: structuredClone(
                state.G.triggeredAbilities.bag.items ?? [],
              ) as BagEffectEntry[],
              pendingEffects: structuredClone(
                state.G.pendingEffects ?? [],
              ) as PendingActionEffect[],
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
}

export function createLorcanaServerGame(
  playersInfo: { player: Player }[],
  init: LorcanaEngineInit,
): LorcanaServer {
  const players = playersInfo.map((p) => p.player);
  return new LorcanaServer({ ...init, players });
}

export type { LorcanaMatchState };
