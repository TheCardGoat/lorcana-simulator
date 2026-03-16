/**
 * Lorcana Engine Base Abstract Class
 *
 * Shared base class for LorcanaClient and LorcanaServer.
 * Provides abstract method declarations and shared utility methods.
 */

import {
  type CommandResult,
  type DeepReadonly,
  type EngineActiveEffectProjection,
  type EngineActorContext,
  type EnginePendingEffectProjection,
  type CardInstanceId,
  type PlayerId,
  type MatchState,
  type GameEngine,
  type CardCatalog,
  type MatchStaticResources,
  type Player,
  type EngineMoveHistoryEntry,
  type EngineMoveValidationResult,
  asCardInstanceIds,
  type ZoneId,
  asPlayerIdOptional,
} from "#core";
import type { CommandFailure } from "#core";
import type { Effect } from "@tcg/lorcana-types";
import type {
  ActivatedAbilityDefinition,
  BagEffectEntry,
  CardInput,
  PendingActionEffect,
  LorcanaCard,
  LorcanaCardDefinition,
  LorcanaG,
  LorcanaMatchState,
  LorcanaMoveComposeResult,
  LorcanaMoveRequestValidation,
  LorcanaProjectedBagEffect,
  LorcanaProjectedBoardView,
  LorcanaProjectedCard,
  LorcanaProjectedPendingChoice,
  LorcanaRuntimeMoveInputs,
  LorcanaRuntimeMoveParams,
  LorcanaStaticCard,
  SetupMoveId,
} from "./types";
import { isClassification } from "./types";
import { FALLBACK_LORCANA_CARD, FALLBACK_LORCANA_PROJECTED_CARD } from "./fallback-card-definition";
import { resolveCardInstanceIdFromInput } from "./card-input-resolver";
import { restoreProjectedCard } from "./projection/card-derived";
import {
  type LorcanaBaseEngineParams,
  initializeLorcanaEngineBase,
  normalizeBoardPlayerId,
} from "./engine-initialization";
import { type PlayCardCostInput, normalizePlayCardCost } from "./lorcana-engine-normalization";
import { getGrantedActivatedAbilities } from "./runtime-moves/rules/static-ability-utils";
import { buildValidationContext } from "./core/runtime/match-runtime.utils";
import { lorcanaRuntimeConfig } from "./runtime-game";
import { computeChallengeDamageResult } from "./runtime-moves/rules/challenge-rules";
import { analyzeEffectTargets } from "./targeting/targeting-service";
import { getNextBagResolver } from "./runtime-moves/effects/triggered-abilities";
import {
  enumerateAutomatedActionsWithAdapter,
  takeAutomatedActionWithAdapter,
} from "./automation/planner";
import { buildAutomatedActionMoveRequest } from "./automation/move-adapter";
import type {
  AutomatedActionCandidate,
  AutomatedActionDiagnostic,
  AutomatedActionEnumerationOptions,
  AutomatedActionEnumerationResult,
  AutomatedActionExecutionOptions,
  AutomatedActionExecutionResult,
} from "./automation";
import type { DynamicAmountEventSnapshot } from "./types/domain-events";

type CardRef = CardInput;
type ZoneCounts = Record<"hand" | "deck" | "play" | "inkwell" | "discard", number>;
type ManualActingPlayerPreference = "active-first" | "scoped-first";
export type ResolutionExecutionOptions = {
  targets?: CardInput[];
  amount?: number;
  namedCard?: string;
  resolveOptional?: boolean;
  choiceIndex?: number;
  destinations?: PlayCardDestinationInput[];
};
export type PlayCardExecutionOptions = ResolutionExecutionOptions & {
  cost?: PlayCardCostInput;
  playerTargets?: PlayerId | PlayerId[];
  returnProcessedMove?: boolean;
  preventAutoResolveTriggeredEffects?: boolean;
  eventSnapshot?: DynamicAmountEventSnapshot;
};
export type PlayCardDestinationInput = {
  zone: string;
  cards: CardInput | CardInput[];
};
export type ActivateAbilityExecutionOptions = {
  ability?: string;
  abilityIndex?: number;
  targets?: CardInput[];
  choiceIndex?: number;
  costs?: {
    banishCharacters?: CardInput[];
    banishItems?: CardInput[];
    exertCharacters?: CardInput[];
    discardCards?: CardInput[];
  };
};
export type { PlayCardCostInput } from "./lorcana-engine-normalization";

export interface ChallengePreviewResult {
  attackerId: CardInstanceId;
  defenderId: CardInstanceId;
  defenderKind: "character" | "location";
  attackerCurrentDamage: number;
  defenderCurrentDamage: number;
  attackerNextDamage: number;
  defenderNextDamage: number;
  attackerWillpower: number;
  defenderWillpower: number;
  attackerDamageDealt: number;
  defenderDamageDealt: number;
  attackerWouldBeBanished: boolean;
  defenderWouldBeBanished: boolean;
}

type AutoResolveInspectionNode = {
  type?: unknown;
  effect?: unknown;
  then?: unknown;
  else?: unknown;
  ifTrue?: unknown;
  ifFalse?: unknown;
  trueEffect?: unknown;
  falseEffect?: unknown;
  effects?: unknown[];
  steps?: unknown[];
  options?: unknown[];
  choices?: unknown[];
  destinations?: unknown[];
  ordering?: unknown;
};

type AutoResolveDecisionShape = {
  hasOptionalDecision: boolean;
  hasChoiceDecision: boolean;
  needsNamedCard: boolean;
  needsDestinations: boolean;
  requiresOrderedTargets: boolean;
};

function inspectAutoResolveDecisionShape(effect: Effect | undefined): AutoResolveDecisionShape {
  const shape: AutoResolveDecisionShape = {
    hasOptionalDecision: false,
    hasChoiceDecision: false,
    needsNamedCard: false,
    needsDestinations: false,
    requiresOrderedTargets: false,
  };

  const visit = (current: unknown): void => {
    if (!current || typeof current !== "object" || Array.isArray(current)) {
      return;
    }

    const node = current as AutoResolveInspectionNode;
    switch (node.type) {
      case "optional":
        shape.hasOptionalDecision = true;
        break;
      case "choice":
      case "or":
        shape.hasChoiceDecision = true;
        break;
      case "name-a-card":
        shape.needsNamedCard = true;
        break;
      case "scry":
        if ((node.destinations?.length ?? 0) > 0) {
          shape.needsDestinations = true;
        }
        break;
      case "put-on-bottom":
        if (node.ordering === "player-choice") {
          shape.requiresOrderedTargets = true;
        }
        break;
    }

    const nestedEffects = [
      node.effect,
      node.then,
      node.else,
      node.ifTrue,
      node.ifFalse,
      node.trueEffect,
      node.falseEffect,
      ...(node.effects ?? []),
      ...(node.steps ?? []),
      ...(node.options ?? []),
      ...(node.choices ?? []),
    ];
    for (const nestedEffect of nestedEffects) {
      visit(nestedEffect);
    }
  };

  visit(effect);
  return shape;
}

function normalizeResolutionTargets(
  targets: BagEffectEntry["resolutionInput"]["targets"],
): Array<CardInstanceId | PlayerId> {
  if (Array.isArray(targets)) {
    return [...targets];
  }

  return typeof targets === "string" ? [targets] : [];
}

export abstract class LorcanaEngineBase {
  abstract engine: GameEngine<
    LorcanaMatchState,
    LorcanaProjectedBoardView,
    LorcanaRuntimeMoveInputs
  >;
  protected players: Player[];
  protected cardInstanceToDefinitionId: Map<string, string>;
  protected cardCatalog: CardCatalog<LorcanaCard>;
  staticResources: MatchStaticResources<LorcanaCard>;

  protected constructor(init: LorcanaBaseEngineParams) {
    const initialized = initializeLorcanaEngineBase(init);
    this.players = initialized.players;
    this.staticResources = initialized.staticResources;
    this.cardInstanceToDefinitionId = initialized.cardInstanceToDefinitionId;
    this.cardCatalog = initialized.cardCatalog;
  }

  // ============================================================================
  // Abstract Methods - Must be implemented by subclasses
  // ============================================================================
  abstract getClientPlayerId(): string | undefined;

  public turnActions() {
    // 4.1.3. The active player can take the following turn actions during their turn: ink a card, play a card, use a card’s activated ability, quest, challenge, and move a character to a location.
    return [];
  }

  protected executeMoveViaEngine<K extends keyof LorcanaRuntimeMoveInputs & string>(
    _moveId: K,
    _input: LorcanaRuntimeMoveInputs[K],
    _ctx: { playerId: string; prevStateID?: number },
  ): CommandResult | undefined {
    return undefined;
  }

  protected validateMoveForPlayerViaEngine<K extends keyof LorcanaRuntimeMoveInputs & string>(
    _moveId: K,
    _input: LorcanaRuntimeMoveInputs[K],
    _ctx: { playerId: string },
  ): EngineMoveValidationResult | undefined {
    return undefined;
  }

  protected enumerateMovesForPlayerViaEngine(
    playerId: string,
  ): Array<keyof LorcanaRuntimeMoveInputs & string> {
    void playerId;
    return this.enumerateMoves();
  }

  protected getResolvedStaticResources(): MatchStaticResources<LorcanaCard> {
    return this.staticResources;
  }

  protected getAutomatedPlanningBoardForPlayer(_playerId: PlayerId): LorcanaProjectedBoardView {
    return this.getBoard();
  }

  protected loadStateViaEngine(_state: MatchState<LorcanaG>): void {
    throw new Error("loadState is not supported by this engine implementation");
  }

  private shouldSkipImmediateAutoBagDrain<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
  ): boolean {
    if (moveId === "playCard") {
      return (
        (input as LorcanaRuntimeMoveInputs["playCard"]).args.preventAutoResolveTriggeredEffects ===
        true
      );
    }

    if (moveId === "resolveEffect") {
      const effectId = (input as LorcanaRuntimeMoveInputs["resolveEffect"]).args.effectId;
      const pendingEffect = (this.getState().G.pendingEffects ?? []).find(
        (effect) => effect.id === effectId,
      );
      return pendingEffect?.resolutionInput.preventAutoResolveTriggeredEffects === true;
    }

    return false;
  }

  private bagEffectNeedsPlayerDecision(bagEffect: BagEffectEntry, playerId: PlayerId): boolean {
    const shape = inspectAutoResolveDecisionShape(bagEffect.effect as Effect | undefined);
    if (
      shape.hasOptionalDecision &&
      typeof bagEffect.resolutionInput.resolveOptional !== "boolean"
    ) {
      return true;
    }
    if (shape.hasChoiceDecision && typeof bagEffect.resolutionInput.choiceIndex !== "number") {
      return true;
    }
    if (
      shape.needsNamedCard &&
      (typeof bagEffect.resolutionInput.namedCard !== "string" ||
        bagEffect.resolutionInput.namedCard.trim().length === 0)
    ) {
      return true;
    }
    if (shape.needsDestinations && (bagEffect.resolutionInput.destinations?.length ?? 0) === 0) {
      return true;
    }
    if (shape.requiresOrderedTargets) {
      return true;
    }

    const validationContext = buildValidationContext(
      this.getState() as LorcanaMatchState,
      playerId,
      { args: {} } as LorcanaRuntimeMoveInputs["passTurn"],
      lorcanaRuntimeConfig,
      this.getResolvedStaticResources(),
      !!this.getState().ctx.status.gameEnded,
      "preflight",
    );
    const analysis = analyzeEffectTargets(
      bagEffect.effect as Effect,
      playerId,
      validationContext,
      bagEffect.sourceId,
    );
    const availableSelectionCount =
      analysis.cardCandidates.length + analysis.playerCandidates.length;
    const hasPreselectedTargets =
      normalizeResolutionTargets(bagEffect.resolutionInput.targets).length > 0;

    return (
      analysis.requiresExplicitSelection && availableSelectionCount > 0 && !hasPreselectedTargets
    );
  }

  private getAutoResolvableBagId(playerId: string): string | undefined {
    const state = this.getState();
    if (state.ctx.status.gameEnded) {
      return undefined;
    }
    if ((state.G.pendingEffects?.length ?? 0) > 0) {
      return undefined;
    }
    if (state.ctx.priority.pendingChoice?.type === "action-effect") {
      return undefined;
    }

    const validationContext = buildValidationContext(
      state as LorcanaMatchState,
      playerId,
      { args: {} } as LorcanaRuntimeMoveInputs["passTurn"],
      lorcanaRuntimeConfig,
      this.getResolvedStaticResources(),
      !!state.ctx.status.gameEnded,
      "preflight",
    );
    if (getNextBagResolver(validationContext) !== playerId) {
      return undefined;
    }

    const playerBagEffects = this.getBagEffects().filter(
      (bagEffect) => bagEffect.controllerId === playerId,
    );
    if (playerBagEffects.length !== 1) {
      return undefined;
    }

    const bagEntry = playerBagEffects[0]?.payload as BagEffectEntry | undefined;
    if (!bagEntry) {
      return undefined;
    }
    if (this.bagEffectNeedsPlayerDecision(bagEntry, playerId as PlayerId)) {
      return undefined;
    }

    return bagEntry.id;
  }

  private autoResolveDeterministicBagEffects(
    playerId: string,
    initialResult: CommandResult,
  ): CommandResult {
    let currentResult = initialResult;
    let attempts = 0;
    const maxAutoResolveAttempts = 25;

    while (attempts < maxAutoResolveAttempts) {
      attempts += 1;
      const state = this.getState();
      const validationContext = buildValidationContext(
        state as LorcanaMatchState,
        playerId,
        { args: {} } as LorcanaRuntimeMoveInputs["passTurn"],
        lorcanaRuntimeConfig,
        this.getResolvedStaticResources(),
        !!state.ctx.status.gameEnded,
        "preflight",
      );
      const nextResolver = getNextBagResolver(validationContext);
      const bagId = nextResolver ? this.getAutoResolvableBagId(nextResolver) : undefined;
      const scopedPlayerId = this.getScopedPlayerId();
      if (!nextResolver || !bagId || (scopedPlayerId && nextResolver !== scopedPlayerId)) {
        return currentResult;
      }

      const autoResult = this.executeMoveInputForPlayer(
        "resolveBag",
        nextResolver,
        {
          args: {
            bagId,
          },
        },
        undefined,
        { skipAutoBagDrain: true },
      );
      if (!autoResult.success) {
        console.error(`Auto-resolving bag effect '${bagId}' failed`, autoResult);
        return currentResult;
      }

      currentResult = autoResult;
    }

    console.error(
      `Stopped auto-resolving deterministic bag effects after ${maxAutoResolveAttempts} attempts for player '${playerId}' to prevent an infinite loop.`,
    );
    return currentResult;
  }

  protected validateMoveForPlayer<K extends keyof LorcanaRuntimeMoveInputs & string>(
    playerId: string,
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
  ): EngineMoveValidationResult {
    const engineResult = this.validateMoveForPlayerViaEngine(moveId, input, { playerId });
    if (engineResult) {
      return engineResult;
    }

    const scopedPlayerId = this.getScopedPlayerId();
    if (scopedPlayerId && scopedPlayerId !== playerId) {
      return {
        valid: false,
        reason: "This engine instance is scoped to a different player",
        code: "PLAYER_SCOPE_MISMATCH",
      };
    }

    return this.engine.validateMove(moveId, input);
  }

  protected executeMoveInputForPlayer<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    playerId: string,
    input: LorcanaRuntimeMoveInputs[K],
    prevStateID?: number,
    options: { skipAutoBagDrain?: boolean } = {},
  ): CommandResult {
    const engineResult = this.executeMoveViaEngine(moveId, input, { playerId, prevStateID });
    const skipAutoBagDrain =
      options.skipAutoBagDrain || this.shouldSkipImmediateAutoBagDrain(moveId, input);

    const maybeAutoDrain = (result: CommandResult): CommandResult =>
      !result.success || skipAutoBagDrain
        ? result
        : this.autoResolveDeterministicBagEffects(playerId, result);

    if (engineResult) {
      return maybeAutoDrain(engineResult);
    }

    try {
      const result = this.engine.executeMove(moveId, input);

      if (!result.success) {
        return {
          success: false,
          error:
            "reason" in result && result.reason ? String(result.reason) : "Move execution failed",
          errorCode: "code" in result && result.code ? String(result.code) : "EXECUTE_FAILED",
          currentStateID: this.getStateID(),
        };
      }

      return maybeAutoDrain(result as CommandResult);
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        errorCode: "EXECUTE_FAILED",
        currentStateID: this.getStateID(),
      };
    }
  }

  protected validateAutomatedActionCandidate(
    actorId: PlayerId,
    candidate: AutomatedActionCandidate,
  ): EngineMoveValidationResult {
    const request = buildAutomatedActionMoveRequest(
      actorId,
      candidate,
      this.getState().ctx.playerIds as PlayerId[],
    );
    return this.validateMoveForPlayer(
      actorId,
      request.moveId,
      request.input as LorcanaRuntimeMoveInputs[typeof request.moveId],
    );
  }

  protected executeAutomatedActionCandidate(
    actorId: PlayerId,
    candidate: AutomatedActionCandidate,
  ): CommandResult {
    const request = buildAutomatedActionMoveRequest(
      actorId,
      candidate,
      this.getState().ctx.playerIds as PlayerId[],
    );
    return this.executeMoveInputForPlayer(
      request.moveId,
      actorId,
      request.input as LorcanaRuntimeMoveInputs[typeof request.moveId],
    );
  }

  private createScopedAutomationDiagnostics(
    actorId: PlayerId | undefined,
  ): AutomatedActionDiagnostic[] {
    return actorId
      ? [
          {
            kind: "actor-resolution",
            source: "scoped-player",
            actorId,
            reason: "Resolved automated action actor from the scoped player engine",
          },
        ]
      : [
          {
            kind: "actor-resolution",
            source: "unresolved",
            reason: "Automated player actions require a player-scoped engine surface",
          },
        ];
  }

  public enumerateAutomatedActions(
    options: AutomatedActionEnumerationOptions = {},
  ): AutomatedActionEnumerationResult {
    const actorId = this.getScopedPlayerId() as PlayerId | undefined;
    const board = actorId ? this.getAutomatedPlanningBoardForPlayer(actorId) : this.getBoard();

    return enumerateAutomatedActionsWithAdapter(
      {
        actorId,
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
        previewChallenge: (attackerId, defenderId) => this.previewChallenge(attackerId, defenderId),
        state: this.getState(),
        staticResources: this.getResolvedStaticResources(),
        validateCandidate: (resolvedActorId, candidate) =>
          this.validateAutomatedActionCandidate(resolvedActorId, candidate),
      },
      options,
      this.createScopedAutomationDiagnostics(actorId),
    );
  }

  public takeAutomatedAction(
    options: AutomatedActionExecutionOptions = {},
  ): AutomatedActionExecutionResult {
    const actorId = this.getScopedPlayerId() as PlayerId | undefined;
    const board = actorId ? this.getAutomatedPlanningBoardForPlayer(actorId) : this.getBoard();

    return takeAutomatedActionWithAdapter(
      {
        actorId,
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
        previewChallenge: (attackerId, defenderId) => this.previewChallenge(attackerId, defenderId),
        state: this.getState(),
        staticResources: this.getResolvedStaticResources(),
        validateCandidate: (resolvedActorId, candidate) =>
          this.validateAutomatedActionCandidate(resolvedActorId, candidate),
      },
      options,
      this.createScopedAutomationDiagnostics(actorId),
    );
  }
  /**
   * Execute a move with the given parameters.
   */
  private executeMove<K extends keyof LorcanaRuntimeMoveParams & string>(
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
  ): CommandResult;
  private executeMove<K extends keyof LorcanaRuntimeMoveParams & string>(
    moveId: K,
    playerId: string,
    params: LorcanaRuntimeMoveParams[K],
    prevStateID?: number,
  ): CommandResult;
  private executeMove<K extends keyof LorcanaRuntimeMoveParams & string>(
    moveId: K,
    playerOrInput: string | LorcanaRuntimeMoveInputs[K],
    paramsOrPrevStateID?: LorcanaRuntimeMoveParams[K] | number,
    prevStateID?: number,
  ): CommandResult {
    let playerId: string;
    let input: LorcanaRuntimeMoveInputs[K];
    if (typeof playerOrInput === "string") {
      playerId = playerOrInput;
      try {
        input = this.composeMoveInput(
          moveId,
          playerId,
          paramsOrPrevStateID as LorcanaRuntimeMoveParams[K],
        );
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to compose move input",
          errorCode: "MOVE_INPUT_COMPOSE_FAILED",
          currentStateID: this.getStateID(),
        };
      }
    } else {
      input = playerOrInput;
      playerId = this.getClientPlayerId() ?? String(this.getActivePlayer() ?? "");
      if (!playerId) {
        return {
          success: false,
          error: `Unable to execute move '${moveId}': missing player context`,
          errorCode: "MISSING_PLAYER_CONTEXT",
          currentStateID: this.getStateID(),
        };
      }
      if (typeof paramsOrPrevStateID === "number") {
        prevStateID = paramsOrPrevStateID;
      }
    }

    return this.executeMoveInputForPlayer(moveId, playerId, input, prevStateID);
  }

  private composeMoveInput<K extends keyof LorcanaRuntimeMoveParams>(
    moveId: K,
    playerId: string,
    params: LorcanaRuntimeMoveParams[K],
  ): LorcanaRuntimeMoveInputs[K] {
    void moveId;
    void playerId;
    return { args: params } as LorcanaRuntimeMoveInputs[K];
  }

  // ============================================================================
  // Shared Utility Methods
  // ============================================================================

  dispose(): void | Promise<void> {
    return this.engine.dispose();
  }

  getMoveHistory(limit?: number): EngineMoveHistoryEntry[] {
    return this.engine.getMoveHistory(limit);
  }

  validateMove<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    input: LorcanaRuntimeMoveInputs[K],
  ): EngineMoveValidationResult {
    return this.engine.validateMove(moveId, input);
  }

  getState(): DeepReadonly<LorcanaMatchState> {
    return this.engine.getState() as DeepReadonly<LorcanaMatchState>;
  }

  getBoard(): LorcanaProjectedBoardView {
    return this.engine.getBoard() as LorcanaProjectedBoardView;
  }

  getGameState(): DeepReadonly<LorcanaG> {
    return this.engine.getState().G as DeepReadonly<LorcanaG>;
  }

  getAuthoritativeState(): DeepReadonly<LorcanaMatchState> {
    return this.engine.getState() as DeepReadonly<LorcanaMatchState>;
  }

  getStateID(): number {
    return this.engine.getStateID();
  }

  getActiveEffects(): EngineActiveEffectProjection[] {
    return this.getBoard().activeEffects ?? [];
  }

  getPendingEffects(): EnginePendingEffectProjection[] {
    return this.getBoard().pendingEffects ?? [];
  }

  getPendingChoice(): LorcanaProjectedPendingChoice | undefined {
    return this.getBoard().pendingChoice;
  }

  getBagEffects(): LorcanaProjectedBagEffect[] {
    return this.getBoard().bagEffects ?? [];
  }

  getBagCount(): number {
    return this.getBagEffects().length;
  }

  /**
   * Create a card resolution error result.
   */
  protected createCardResolutionError(action: string, reason: string): CommandResult {
    const trimmedReason = reason.trim();
    const errorCode =
      trimmedReason.startsWith("CARD_SELECTOR_REQUIRED") || trimmedReason.startsWith("Static card")
        ? "CARD_SELECTOR_REQUIRED"
        : trimmedReason.startsWith("CARD_SELECTOR_AMBIGUOUS")
          ? "CARD_SELECTOR_AMBIGUOUS"
          : "CARD_RESOLVE_FAILED";

    return {
      success: false,
      error: `${action}: ${reason}`,
      errorCode,
      currentStateID: this.getStateID(),
    };
  }

  setup(prevStateID?: number): void {
    void prevStateID;
  }

  hasGameEnded(): boolean {
    return !!this.engine.getBoard().winner;
  }

  getGameEndResult() {
    // TODO THIS IS NOT QUITE RIGHT
    return this.engine.getBoard().winner;
  }

  getLore(playerId: string | PlayerId): number {
    const board: LorcanaProjectedBoardView = this.getBoard();
    return board.players?.[String(playerId)]?.lore || 0;
  }

  getAvailableInk(playerId: string | PlayerId): number {
    const board = this.getBoard();
    const normalizedPlayerId = normalizeBoardPlayerId(String(playerId), board.playerOrder);
    if (!normalizedPlayerId) {
      return 0;
    }

    const playerBoard = board.players?.[normalizedPlayerId];
    if (!playerBoard) {
      return 0;
    }

    return playerBoard.inkwell.reduce((available, cardId) => {
      const projectedCard = board.cards[cardId];
      return projectedCard?.exerted ? available : available + 1;
    }, 0);
  }

  getTotalInk(playerId: string | PlayerId): number {
    const board = this.getBoard();
    const normalizedPlayerId = normalizeBoardPlayerId(String(playerId), board.playerOrder);
    if (!normalizedPlayerId) {
      return 0;
    }

    return board.players?.[normalizedPlayerId]?.inkwell.length ?? 0;
  }

  isExerted(cardId: CardRef): boolean {
    const resolvedCardId = this.resolveCardId(cardId);
    if (!resolvedCardId) {
      return false;
    }
    const projected = this.getCardByInstance(resolvedCardId);
    if (typeof projected?.exerted === "boolean") {
      return projected.exerted;
    }
    return false;
  }

  isDrying(cardId: CardRef): boolean {
    const resolvedCardId = this.resolveCardId(cardId);
    if (!resolvedCardId) {
      return false;
    }
    const projected = this.getCardByInstance(resolvedCardId);
    if (typeof projected?.drying === "boolean") {
      return projected.drying;
    }
    return false;
  }

  getDamage(cardId: CardRef): number {
    const resolvedCardId = this.resolveCardId(cardId);
    if (!resolvedCardId) {
      return 0;
    }
    const projected = this.getCardByInstance(resolvedCardId);
    if (typeof projected?.damage === "number") {
      return projected.damage;
    }
    return 0;
  }

  getCurrentPhase(): string | undefined {
    return this.getBoard().phase;
  }

  getCurrentStep(): string | null | undefined {
    const challengeStage = this.getState().G.challengeState?.stage;
    if (challengeStage === "declaration") {
      return "challengeDeclaration";
    }
    if (challengeStage === "damage" || challengeStage === "post-damage") {
      return "challengeDamage";
    }

    return this.getBoard().step;
  }

  getGameSegment(): string | undefined {
    return this.getBoard().gameSegment;
  }

  getOpeningTurnPlayer(): PlayerId | undefined {
    return this.getBoard().openingTurnPlayer ?? undefined;
  }

  getPendingMulliganPlayers(): PlayerId[] {
    return [...(this.getBoard().pendingMulligan ?? [])];
  }

  getChoosingFirstPlayer(): PlayerId | undefined {
    return this.getBoard().choosingFirstPlayer ?? undefined;
  }

  getTurnNumber(): number {
    return this.getBoard().turnNumber ?? 1;
  }

  getActivePlayer(): PlayerId | undefined {
    return this.getBoard().priorityPlayer ?? undefined;
  }

  isGameOver(): boolean {
    return this.hasGameEnded();
  }

  getWinner(): PlayerId | undefined {
    const winner = this.getBoard().winner;
    return typeof winner === "string" ? (winner as PlayerId) : undefined;
  }

  chooseFirstPlayer(firstPlayerId: string, prevStateID?: number): CommandResult;
  chooseFirstPlayer(
    choosingPlayerId: string,
    firstPlayerId: string,
    prevStateID?: number,
  ): CommandResult;
  chooseFirstPlayer(
    playerIdOrFirstPlayerId: string,
    firstPlayerIdOrPrevStateID?: string | number,
    prevStateID?: number,
  ): CommandResult {
    let choosingPlayerId = playerIdOrFirstPlayerId;
    let firstPlayerId = firstPlayerIdOrPrevStateID;
    let resolvedPrevStateID = prevStateID;

    if (typeof firstPlayerIdOrPrevStateID !== "string") {
      const scopedPlayerId = this.getScopedPlayerId();
      if (!scopedPlayerId) {
        return this.createErrorResult(
          "chooseFirstPlayer requires a player id when used from a non-player-scoped engine.",
          "PLAYER_ID_REQUIRED",
        );
      }

      choosingPlayerId = scopedPlayerId;
      firstPlayerId = playerIdOrFirstPlayerId;
      resolvedPrevStateID = firstPlayerIdOrPrevStateID;
    }

    return this.executeMove(
      "chooseWhoGoesFirst",
      choosingPlayerId,
      { playerId: firstPlayerId as PlayerId },
      resolvedPrevStateID,
    );
  }

  playCardByInstance(
    playerId: string,
    cardId: CardInstanceId,
    cost: LorcanaRuntimeMoveParams["playCard"]["cost"] = "standard",
    costParams?: Omit<LorcanaRuntimeMoveParams["playCard"], "cardId" | "cost">,
    prevStateID?: number,
    opts?: { returnProcessedMove?: boolean },
  ): CommandResult {
    return this.executeMove(
      "playCard",
      playerId,
      {
        cardId,
        cost,
        ...costParams,
        returnProcessedMove: opts?.returnProcessedMove,
      } as LorcanaRuntimeMoveParams["playCard"],
      prevStateID,
    );
  }

  questByInstance(playerId: string, cardId: CardInstanceId, prevStateID?: number): CommandResult {
    return this.executeMove("quest", playerId, { cardId }, prevStateID);
  }

  challengeByInstance(
    playerId: string,
    attackerId: CardInstanceId,
    defenderId: CardInstanceId,
    prevStateID?: number,
  ): CommandResult {
    return this.executeMove(
      "challenge",
      playerId,
      {
        attackerId,
        defenderId,
      },
      prevStateID,
    );
  }

  moveCharacterToLocationByInstance(
    playerId: string,
    characterId: CardInstanceId,
    locationId: CardInstanceId,
    prevStateID?: number,
  ): CommandResult {
    return this.executeMove(
      "moveCharacterToLocation",
      playerId,
      {
        characterId,
        locationId,
      },
      prevStateID,
    );
  }

  putIntoInkwellByInstance(
    playerId: string,
    cardId: CardInstanceId,
    prevStateID?: number,
  ): CommandResult {
    return this.executeMove("putCardIntoInkwell", playerId, { cardId }, prevStateID);
  }

  passTurn(prevStateID?: number): CommandResult;
  passTurn(playerId: string, prevStateID?: number): CommandResult;
  passTurn(playerIdOrPrevStateID?: string | number, prevStateID?: number): CommandResult {
    const playerId =
      typeof playerIdOrPrevStateID === "string"
        ? playerIdOrPrevStateID
        : (this.getScopedPlayerId() ?? String(this.getActivePlayer() ?? ""));
    const resolvedPrevStateID =
      typeof playerIdOrPrevStateID === "number" ? playerIdOrPrevStateID : prevStateID;

    if (!playerId) {
      return this.createErrorResult(
        "passTurn requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }

    return this.executeMove(
      "passTurn",
      playerId,
      {} as LorcanaRuntimeMoveParams["passTurn"],
      resolvedPrevStateID,
    );
  }

  questWithAll(): CommandResult;
  questWithAll(playerId: string): CommandResult;
  questWithAll(playerId?: string): CommandResult {
    const resolvedPlayerId =
      playerId ?? this.getScopedPlayerId() ?? String(this.getActivePlayer() ?? "");
    if (!resolvedPlayerId) {
      return this.createErrorResult(
        "questWithAll requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }
    return this.executeMove(
      "questWithAll",
      resolvedPlayerId,
      {} as LorcanaRuntimeMoveParams["questWithAll"],
    );
  }

  concede(playerId: string, prevStateID?: number): CommandResult {
    return this.executeMove("concede", playerId, { playerId: playerId as PlayerId }, prevStateID);
  }

  mulliganByInstance(
    playerId: string,
    cardsToMulligan: CardInstanceId[],
    prevStateID?: number,
  ): CommandResult {
    return this.executeMove(
      "alterHand",
      playerId,
      {
        playerId: playerId as PlayerId,
        cardsToMulligan,
      },
      prevStateID,
    );
  }

  enumerateMoves(): Array<keyof LorcanaRuntimeMoveInputs & string> {
    return this.engine.enumerateMoves();
  }

  loadState(state: MatchState<LorcanaG>): void {
    this.loadStateViaEngine(state);
  }

  getActorContext(): EngineActorContext {
    return { role: "judge" };
  }

  getCardsInZone(zone: string, player: string): { count: number; cards: LorcanaProjectedCard[] } {
    const normalized = normalizeBoardPlayerId(player, this.getBoard().playerOrder);
    if (!normalized) {
      return { count: 0, cards: [] };
    }

    const playerBoard = this.getBoard().players[normalized];
    if (!playerBoard) {
      return { count: 0, cards: [] };
    }

    if (zone === "deck") {
      return { count: playerBoard.deckCount, cards: [] };
    }

    const projectedCards = this.selectZoneCards(normalized, zone);
    const cards = projectedCards.map((projectedCard) =>
      restoreProjectedCard({
        projected: projectedCard,
        definition: this.getCardDefinitionByInstanceId(projectedCard.id as CardInstanceId),
      }),
    );

    const count =
      zone === "hand"
        ? playerBoard.handCount
        : zone === "play"
          ? playerBoard.play.length
          : zone === "inkwell"
            ? playerBoard.inkwell.length
            : zone === "discard"
              ? playerBoard.discard.length
              : projectedCards.length;

    return { count, cards };
  }

  getCardByInstance(input: CardInput, _playerId?: string): LorcanaProjectedCard {
    const cardInstanceId = this.resolveCardId(input);

    if (!cardInstanceId) {
      return FALLBACK_LORCANA_PROJECTED_CARD;
    }

    const projected: LorcanaProjectedCard = this.getBoard().cards[cardInstanceId];
    const definition: LorcanaCardDefinition = this.getCardDefinitionByInstanceId(cardInstanceId);

    return restoreProjectedCard({
      projected,
      definition,
    });
  }

  getDerivedStrengthForCard(card: CardRef): number {
    const resolvedCardId = this.resolveCardId(card);
    if (!resolvedCardId) {
      return 0;
    }
    return this.getCardByInstance(resolvedCardId).strength || 0;
  }

  getDerivedWillpowerForCard(card: CardRef): number {
    const resolvedCardId = this.resolveCardId(card);
    if (!resolvedCardId) {
      return 0;
    }
    return this.getCardByInstance(resolvedCardId).willpower || 0;
  }

  getCardStrength(card: CardRef): number {
    return this.getDerivedStrengthForCard(card);
  }

  protected generateCommandID(): string {
    return `cmd-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  protected getCardDefinitionByInstanceId(cardId: CardInstanceId): LorcanaCardDefinition {
    const definitionId = this.cardInstanceToDefinitionId.get(cardId);

    if (!definitionId) {
      return FALLBACK_LORCANA_CARD;
    }

    return this.cardCatalog.get(definitionId) || FALLBACK_LORCANA_CARD;
  }

  protected resolveCardId(card: CardRef, actorPlayerId?: PlayerId): CardInstanceId | undefined {
    try {
      return resolveCardInstanceIdFromInput({
        input: card,
        state: this.getState() as LorcanaMatchState,
        cards: this.getBoard().cards,
        actorPlayerId,
        getDefinitionByInstanceId: (cardId) => this.getCardDefinitionByInstanceId(cardId),
      });
    } catch {
      return undefined;
    }
  }

  canChallenge(attacker: CardInput, defender: CardInput): boolean {
    const resolvedAttackerId = this.resolveCardId(attacker);
    const resolvedDefenderId = this.resolveCardId(defender);
    if (!resolvedAttackerId || !resolvedDefenderId) {
      return false;
    }

    return this.validateMove("challenge", {
      args: {
        attackerId: resolvedAttackerId,
        defenderId: resolvedDefenderId,
      },
    }).valid;
  }

  protected previewChallengeForActor(
    actorId: PlayerId,
    attackerId: CardInstanceId,
    defenderId: CardInstanceId,
  ): ChallengePreviewResult | null {
    const moveInput = {
      args: {
        attackerId,
        defenderId,
      },
    } satisfies LorcanaRuntimeMoveInputs["challenge"];

    const validation = this.validateMoveForPlayer(actorId, "challenge", moveInput);
    if (!validation.valid) {
      return null;
    }

    const previewContext = buildValidationContext(
      this.getState() as LorcanaMatchState,
      String(actorId),
      moveInput,
      lorcanaRuntimeConfig,
      this.getResolvedStaticResources(),
      this.hasGameEnded(),
    );
    const result = computeChallengeDamageResult(previewContext, attackerId, defenderId);

    return {
      attackerId,
      defenderId,
      defenderKind: result.defenderDefinition.cardType,
      attackerCurrentDamage: result.attackerCurrentDamage,
      defenderCurrentDamage: result.defenderCurrentDamage,
      attackerNextDamage: result.attackerNextDamage,
      defenderNextDamage: result.defenderNextDamage,
      attackerWillpower: result.attackerWillpower,
      defenderWillpower: result.defenderWillpower,
      attackerDamageDealt: result.attackerToDefenderDamage,
      defenderDamageDealt: result.defenderToAttackerDamage,
      attackerWouldBeBanished: result.attackerLethal,
      defenderWouldBeBanished: result.defenderLethal,
    };
  }

  previewChallenge(attacker: CardInput, defender: CardInput): ChallengePreviewResult | null {
    const scopedPlayerId = this.getScopedPlayerId();
    const activePlayerId = this.getActivePlayer();
    const resolvedAttackerId = this.resolveCardId(attacker, activePlayerId);
    const resolvedDefenderId = this.resolveCardId(defender, activePlayerId);

    if (!resolvedAttackerId || !resolvedDefenderId) {
      return null;
    }

    const actingPlayerId =
      scopedPlayerId ??
      this.getState().ctx.zones.private.cardIndex[resolvedAttackerId]?.controllerID ??
      activePlayerId;
    if (!actingPlayerId) {
      return null;
    }

    return this.previewChallengeForActor(
      actingPlayerId as PlayerId,
      resolvedAttackerId,
      resolvedDefenderId,
    );
  }

  manualMoveCard(
    cardId: CardInstanceId,
    targetZoneId: ZoneId,
    position?: "top" | "bottom" | number,
  ): CommandResult {
    return this.executeManualMoveForResolvedCard("manualMoveCard", cardId, (resolvedCardId) => ({
      cardId: resolvedCardId,
      targetZoneId,
      position,
    }));
  }

  protected executeManualMoveForActingPlayer<K extends keyof LorcanaRuntimeMoveParams & string>(
    moveId: K,
    params: LorcanaRuntimeMoveParams[K],
    options: { playerPreference?: ManualActingPlayerPreference } = {},
  ): CommandResult {
    return this.executeManualMoveWithResolvedActingPlayer(moveId, (playerId) =>
      this.executeMove(moveId, playerId, params),
    );
  }

  protected executeManualMoveForResolvedCard<K extends keyof LorcanaRuntimeMoveParams & string>(
    moveId: K,
    cardInput: CardInput,
    createParams: (cardId: CardInstanceId) => LorcanaRuntimeMoveParams[K],
    options: { playerPreference?: ManualActingPlayerPreference } = {},
  ): CommandResult {
    return this.executeManualMoveWithResolvedActingPlayer(
      moveId,
      (playerId) => {
        const resolvedCardId = this.resolveCardId(cardInput);
        if (!resolvedCardId) {
          return this.createCardResolutionError(moveId, "Could not resolve card input");
        }

        return this.executeMove(moveId, playerId, createParams(resolvedCardId));
      },
      options,
    );
  }

  private executeManualMoveWithResolvedActingPlayer(
    moveId: string,
    execute: (playerId: string) => CommandResult,
    options: { playerPreference?: ManualActingPlayerPreference } = {},
  ): CommandResult {
    const playerId = this.resolveManualActingPlayer(options.playerPreference);
    if (!playerId) {
      return this.createErrorResult(
        `${moveId} requires a player id when used from a non-player-scoped engine.`,
        "PLAYER_ID_REQUIRED",
      );
    }

    return execute(playerId);
  }

  manualExertCard(cardInput: CardInput): CommandResult {
    return this.executeManualMoveForResolvedCard(
      "manualExertCard",
      cardInput,
      (cardId) => ({ cardId }),
      { playerPreference: "active-first" },
    );
  }

  manualReadyCard(cardId: CardInstanceId): CommandResult {
    return this.executeManualMoveForResolvedCard("manualReadyCard", cardId, (resolvedCardId) => ({
      cardId: resolvedCardId,
    }));
  }

  manualDryCard(cardId: CardInstanceId): CommandResult {
    return this.executeManualMoveForResolvedCard("manualDryCard", cardId, (resolvedCardId) => ({
      cardId: resolvedCardId,
    }));
  }

  manualSetDamage(card: CardInput, damage: number): CommandResult {
    return this.executeManualMoveForResolvedCard(
      "manualSetDamage",
      card,
      (cardId) => ({ cardId, damage }),
      { playerPreference: "active-first" },
    );
  }

  protected resolveManualActingPlayer(
    preference: ManualActingPlayerPreference = "scoped-first",
  ): string {
    const scopedPlayerId = this.getScopedPlayerId() ?? "";
    const activePlayerId = String(this.getActivePlayer() ?? "");

    if (preference === "active-first") {
      return activePlayerId || scopedPlayerId;
    }

    return scopedPlayerId || activePlayerId;
  }

  protected composeMoveByFixedArgs<K extends keyof LorcanaRuntimeMoveInputs & string>(
    moveId: K,
    args: Record<string, unknown>,
  ): LorcanaRuntimeMoveInputs[K];
  protected composeMoveByFixedArgs(
    moveId: string,
    args: Record<string, unknown>,
  ): LorcanaRuntimeMoveInputs[keyof LorcanaRuntimeMoveInputs] {
    void moveId;
    return {
      args,
    } as LorcanaRuntimeMoveInputs[keyof LorcanaRuntimeMoveInputs];
  }

  manualSetLore(playerId: PlayerId, amount: number): CommandResult {
    return this.executeManualMoveForActingPlayer(
      "manualSetLore",
      { playerId, amount },
      { playerPreference: "active-first" },
    );
  }

  manualShuffleDeck(playerId: PlayerId): CommandResult {
    return this.executeManualMoveForActingPlayer("manualShuffleDeck", { playerId });
  }

  manualPassTurn(): CommandResult {
    return this.executeManualMoveForActingPlayer("manualPassTurn", {});
  }

  get playerId(): string {
    return this.getClientPlayerId() ?? "";
  }

  private getScopedPlayerId(): string | undefined {
    const playerId = this.getClientPlayerId();
    return typeof playerId === "string" && playerId.length > 0 ? playerId : undefined;
  }

  getZonesCardCount(playerId: string | PlayerId = this.getClientPlayerId() ?? ""): ZoneCounts {
    const normalized = String(playerId);
    return {
      hand: this.getCardsInZone("hand", normalized).count,
      deck: this.getCardsInZone("deck", normalized).count,
      play: this.getCardsInZone("play", normalized).count,
      inkwell: this.getCardsInZone("inkwell", normalized).count,
      discard: this.getCardsInZone("discard", normalized).count,
    };
  }

  private getPendingActionPayload(pendingEffect: EnginePendingEffectProjection):
    | {
        id?: string;
        sourceCardId?: string;
        sourceId?: string;
        chooserId?: string;
      }
    | undefined {
    const payload = pendingEffect.payload;
    if (!payload || typeof payload !== "object") {
      return undefined;
    }

    return payload as {
      id?: string;
      sourceCardId?: string;
      sourceId?: string;
      chooserId?: string;
    };
  }

  // TODO: Implement this
  validateMoveRequest(
    moveId: string,
    params: Record<string, unknown> = {},
  ): LorcanaMoveRequestValidation {
    return {
      valid: true,
      reason: "",
    };
  }

  resolvePendingEffect(cardInput: CardInput, opts: ResolutionExecutionOptions = {}): CommandResult {
    const resolvedCardId = this.resolveCardId(cardInput);
    if (!resolvedCardId) {
      return this.createErrorResult(
        "No pending effect found for this card.",
        "RESOLVE_PENDING_EFFECT_UNAVAILABLE",
      );
    }

    const matchingPendingEffects = this.getPendingEffects().filter((pendingEffect) => {
      const payload = this.getPendingActionPayload(pendingEffect);
      return payload?.sourceCardId === resolvedCardId || payload?.sourceId === resolvedCardId;
    });
    if (matchingPendingEffects.length === 0) {
      return this.createErrorResult(
        "No pending effect found for this card.",
        "RESOLVE_PENDING_EFFECT_UNAVAILABLE",
      );
    }
    if (matchingPendingEffects.length > 1) {
      return this.createErrorResult(
        "Multiple pending effects match this card; resolve by effect id instead.",
        "RESOLVE_PENDING_EFFECT_AMBIGUOUS",
      );
    }

    return this.resolveEffect(matchingPendingEffects[0]!.id, opts);
  }

  resolveNextPending(opts: ResolutionExecutionOptions = {}): CommandResult {
    const playerId = asPlayerIdOptional(this.getClientPlayerId());
    if (!playerId) {
      return this.createErrorResult(
        "resolveNextPending requires a player-scoped client.",
        "RESOLVE_PENDING_EFFECT_UNAVAILABLE",
      );
    }

    const matchingPendingEffects = this.getPendingEffects().filter((pendingEffect) => {
      const payload = this.getPendingActionPayload(pendingEffect);
      return pendingEffect.source !== "priority" && payload?.chooserId === playerId;
    });

    if (matchingPendingEffects.length === 0) {
      return this.createErrorResult(
        "No pending effect is waiting for this player.",
        "RESOLVE_PENDING_EFFECT_UNAVAILABLE",
      );
    }

    if (matchingPendingEffects.length > 1) {
      return this.createErrorResult(
        "Multiple pending effects are waiting for this player; resolve by effect id instead.",
        "RESOLVE_PENDING_EFFECT_AMBIGUOUS",
      );
    }

    return this.resolveEffect(matchingPendingEffects[0]!.id, opts);
  }

  resolveOnlyBag(opts: ResolutionExecutionOptions = {}) {
    const [bagEffect] = this.getBagEffects();

    if (!bagEffect || !bagEffect.id) {
      const failure: CommandFailure = {
        success: false,
        error: "Bag Efect Not Found",
        errorCode: "EFFECT_NOT_FOUND",
        currentStateID: this.getStateID(),
      };

      return failure;
    }

    return this.resolveBag(bagEffect.id, opts);
  }

  resolveBag(bagId: string, opts: ResolutionExecutionOptions = {}): CommandResult {
    if (typeof bagId !== "string" || bagId.length === 0) {
      return this.createErrorResult(
        "resolveBag requires a valid bag id.",
        "RESOLVE_BAG_ID_REQUIRED",
      );
    }

    let resolvedTargets: CardInstanceId[] | undefined;
    if (opts.targets !== undefined) {
      try {
        resolvedTargets = this.resolveCardInputs(opts.targets);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error ? error.message : "Failed to resolve resolveBag targets",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    const params: Record<string, unknown> = {};
    if (typeof opts.amount === "number") {
      params.amount = opts.amount;
    }
    if (typeof opts.namedCard === "string" && opts.namedCard.trim().length > 0) {
      params.namedCard = opts.namedCard.trim();
    }
    if (typeof opts.choiceIndex === "number") {
      params.choiceIndex = opts.choiceIndex;
    }
    if (typeof opts.resolveOptional === "boolean") {
      params.resolveOptional = opts.resolveOptional;
    }

    if (!this.enumerateMoves().includes("resolveBag")) {
      return this.createErrorResult(
        "resolveBag is not currently available.",
        "RESOLVE_BAG_UNAVAILABLE",
      );
    }

    const input: LorcanaRuntimeMoveInputs["resolveBag"] = {
      args: {
        bagId,
        params: {
          ...params,
          ...(resolvedTargets ? { targets: resolvedTargets } : {}),
        },
      },
    };

    return this.executeMove("resolveBag", input);
  }

  resolveNextBag(opts: ResolutionExecutionOptions = {}): CommandResult {
    const playerId = asPlayerIdOptional(this.getClientPlayerId());
    if (!playerId) {
      return this.createErrorResult(
        "resolveNextBag requires a player-scoped client.",
        "RESOLVE_BAG_UNAVAILABLE",
      );
    }

    const matchingBagEffects = this.getBagEffects().filter(
      (bagEffect) => bagEffect.controllerId === playerId,
    );
    if (matchingBagEffects.length === 0) {
      return this.createErrorResult(
        "No bag effect is waiting for this player.",
        "RESOLVE_BAG_UNAVAILABLE",
      );
    }

    if (matchingBagEffects.length > 1) {
      return this.createErrorResult(
        "Multiple bag effects are waiting for this player; resolve by bag id instead.",
        "RESOLVE_BAG_AMBIGUOUS",
      );
    }

    return this.resolveBag(matchingBagEffects[0]!.id, opts);
  }

  respondWith(...targets: CardInput[]): CommandResult {
    return targets.length > 0 ? this.resolveNextPending({ targets }) : this.resolveNextPending();
  }

  respondWithChoice(choiceIndex: number): CommandResult {
    return this.resolveNextPending({ choiceIndex });
  }

  playCardTo(card: CardInput, ...targets: CardInput[]): CommandResult {
    return this.playCard(card, { targets });
  }

  playCardForPlayer(
    card: CardInput,
    playerId: PlayerId,
    opts: Omit<PlayCardExecutionOptions, "targets" | "playerTargets"> = {},
  ): CommandResult {
    const cardId = this.resolveCardId(card);
    if (!cardId) {
      return this.createCardResolutionError("playCardForPlayer", "Could not resolve card input");
    }

    const resolvedCost = this.resolvePlayCardCostInput(opts.cost ?? "standard");
    const costString = typeof resolvedCost === "object" ? resolvedCost.cost : resolvedCost;

    return this.playCardByInstance(
      this.getScopedPlayerId() ?? String(this.getActivePlayer() ?? ""),
      cardId,
      costString as LorcanaRuntimeMoveParams["playCard"]["cost"],
      {
        ...(typeof resolvedCost === "object" ? resolvedCost : {}),
        amount: opts.amount,
        resolveOptional: opts.resolveOptional,
        choiceIndex: opts.choiceIndex,
        destinations: opts.destinations as LorcanaRuntimeMoveParams["playCard"]["destinations"],
        preventAutoResolveTriggeredEffects: opts.preventAutoResolveTriggeredEffects,
        playerTargets: playerId,
        // Runtime currently resolves player choices via `targets` for backward compatibility.
        targets: [playerId as unknown as CardInstanceId],
      },
    );
  }

  playCardWithChoice(
    card: CardInput,
    choiceIndex: number,
    opts: Omit<PlayCardExecutionOptions, "choiceIndex"> = {},
  ): CommandResult {
    return this.playCard(card, { ...opts, choiceIndex });
  }

  playCardOptional(
    card: CardInput,
    resolveOptional: boolean,
    opts: Omit<PlayCardExecutionOptions, "resolveOptional"> = {},
  ): CommandResult {
    return this.playCard(card, { ...opts, resolveOptional });
  }

  playCardWithDestinations(
    card: CardInput,
    ...destinations: PlayCardDestinationInput[]
  ): CommandResult {
    return this.playCard(card, { destinations });
  }

  singSong(card: CardInput, singer: CardInput): CommandResult {
    return this.playCard(card, { cost: { cost: "sing", singer: singer as CardInstanceId } });
  }

  playSongTogether(card: CardInput, singers: CardInput[]): CommandResult {
    return this.playCard(card, {
      cost: { cost: "singTogether", singers: singers as CardInstanceId[] },
    });
  }

  canPlayCard(
    cardInput: CardInput,
    opts: PlayCardExecutionOptions = {
      cost: "standard",
    },
  ): boolean {
    const {
      cost = "standard",
      amount,
      resolveOptional,
      choiceIndex,
      destinations,
      playerTargets,
      preventAutoResolveTriggeredEffects,
    } = opts;
    const resolvedCost = this.resolvePlayCardCostInput(cost);
    const playableCardId = this.resolvePlayableCardId(cardInput, resolvedCost);
    if (!playableCardId) {
      return false;
    }

    let resolvedTargets: CardInstanceId[] | undefined;
    if (opts.targets !== undefined) {
      try {
        resolvedTargets = this.resolveCardInputs(opts.targets);
      } catch {
        return false;
      }
    }

    const resolvedDestinations: LorcanaRuntimeMoveParams["playCard"]["destinations"] =
      destinations && destinations.length > 0
        ? destinations.reduce<NonNullable<LorcanaRuntimeMoveParams["playCard"]["destinations"]>>(
            (acc, destination) => {
              const requestedCards = Array.isArray(destination.cards)
                ? destination.cards
                : [destination.cards];

              try {
                const resolvedCards = this.resolveCardInputs(requestedCards);

                if (resolvedCards.length > 0) {
                  acc.push({
                    cards: resolvedCards,
                    zone: destination.zone,
                  });
                }
              } catch {
                return acc;
              }

              return acc;
            },
            [],
          )
        : undefined;

    const args = normalizePlayCardCost(playableCardId, resolvedCost, {
      amount,
      choiceIndex,
      destinations: resolvedDestinations,
      resolveOptional,
      targets: resolvedTargets,
      playerTargets,
      preventAutoResolveTriggeredEffects,
    }) as unknown as Record<string, unknown>;

    const moveInput = this.composeMoveByFixedArgs("playCard", args);
    return this.validateMove("playCard", moveInput as LorcanaRuntimeMoveInputs["playCard"]).valid;
  }

  protected resolveCardInputs(inputs: CardInput[]): CardInstanceId[] {
    return inputs.map((input) => this.requireCardId(input));
  }

  private resolvePlayableCardId(
    cardInput: CardInput | LorcanaStaticCard,
    cost: PlayCardCostInput = "standard",
  ): CardInstanceId | undefined {
    void cost;
    const resolvedCardId = this.resolveCardId(cardInput);
    if (!resolvedCardId) {
      return undefined;
    }
    return resolvedCardId;
  }

  private resolvePlayCardCostInput(cost: PlayCardCostInput): PlayCardCostInput {
    if (typeof cost !== "object") {
      return cost;
    }

    switch (cost.cost) {
      case "shift": {
        const shiftTarget = this.resolveCardId(cost.shiftTarget);
        return shiftTarget ? { ...cost, shiftTarget } : cost;
      }
      case "sing": {
        const singer = this.resolveCardId(cost.singer);
        return singer ? { ...cost, singer } : cost;
      }
      case "singTogether": {
        const singers = cost.singers
          .map((singer) => this.resolveCardId(singer))
          .filter((singer): singer is CardInstanceId => Boolean(singer));
        return singers.length === cost.singers.length ? { ...cost, singers } : cost;
      }
      default:
        return cost;
    }
  }

  protected createErrorResult(error: string, errorCode: string = "CLIENT_ERROR"): CommandResult {
    return {
      success: false,
      error,
      errorCode,
      currentStateID: this.getStateID(),
    };
  }

  getCardZone(card: CardInput): string | undefined {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return undefined;
    }

    const projectedZone = this.getCardByInstance(cardInstanceId).zone;
    if (typeof projectedZone === "string" && projectedZone.length > 0) {
      return projectedZone;
    }

    const zoneKey = this.getState().ctx.zones.private.cardIndex[cardInstanceId]?.zoneKey;
    if (typeof zoneKey !== "string" || zoneKey.length === 0) {
      return undefined;
    }

    return zoneKey.includes(":") ? zoneKey.split(":", 1)[0] : zoneKey;
  }

  getCard(card: CardInput): LorcanaProjectedCard {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return FALLBACK_LORCANA_PROJECTED_CARD;
    }

    return this.getCardByInstance(cardInstanceId);
  }

  getCardsUnder(card: CardInput): CardInstanceId[] {
    return [];
  }

  protected findActivatedAbility(
    cardId: CardInstanceId,
    ability?: string,
  ): { ability: ActivatedAbilityDefinition; abilityIndex: number } | null {
    const definition = this.getCardDefinitionByInstanceId(cardId);
    const printedAbilities = (definition.abilities ?? []).filter(
      (entry): entry is ActivatedAbilityDefinition => entry.type === "activated",
    );
    const grantedAbilities = getGrantedActivatedAbilities({
      state: this.getAuthoritativeState(),
      cardId,
      getDefinitionByInstanceId: (instanceId) => this.getCardDefinitionByInstanceId(instanceId),
    }).map((entry) => entry.ability);
    const activatedAbilities = [...printedAbilities, ...grantedAbilities].map(
      (entry, abilityIndex) => ({
        ability: entry,
        abilityIndex,
      }),
    );

    if (activatedAbilities.length === 0) {
      return null;
    }

    const normalizedAbility = ability?.trim();
    if (!normalizedAbility) {
      return activatedAbilities.length === 1 ? activatedAbilities[0] : null;
    }

    const nameMatch = activatedAbilities.find((entry) => entry.ability.name === normalizedAbility);
    if (nameMatch) {
      return nameMatch;
    }

    const titleMatch = activatedAbilities.find((entry) => {
      const rawTitle = (entry.ability as { title?: unknown }).title;
      return typeof rawTitle === "string" && rawTitle === normalizedAbility;
    });
    if (titleMatch) {
      return titleMatch;
    }

    const textMatch = activatedAbilities.find((entry) => entry.ability.text === normalizedAbility);
    if (textMatch) {
      return textMatch;
    }

    const textPrefixMatch = activatedAbilities.find(
      (entry) =>
        typeof entry.ability.text === "string" && entry.ability.text.startsWith(normalizedAbility),
    );
    if (textPrefixMatch) {
      return textPrefixMatch;
    }

    return null;
  }

  protected findActivatedAbilityByIndex(
    cardId: CardInstanceId,
    abilityIndex: number,
  ): { ability: ActivatedAbilityDefinition; abilityIndex: number } | null {
    const definition = this.getCardDefinitionByInstanceId(cardId);
    const printedAbilities = (definition.abilities ?? []).filter(
      (entry): entry is ActivatedAbilityDefinition => entry.type === "activated",
    );
    const grantedAbilities = getGrantedActivatedAbilities({
      state: this.getAuthoritativeState(),
      cardId,
      getDefinitionByInstanceId: (instanceId) => this.getCardDefinitionByInstanceId(instanceId),
    }).map((entry) => entry.ability);
    const activatedAbilities = [...printedAbilities, ...grantedAbilities].map(
      (entry, resolvedAbilityIndex) => ({
        ability: entry,
        abilityIndex: resolvedAbilityIndex,
      }),
    );

    return activatedAbilities[abilityIndex] ?? null;
  }

  isCardUnder(parent: CardInput, child: CardInput): boolean {
    const childId = this.resolveCardId(child);
    if (!childId) {
      return false;
    }

    return this.getCardsUnder(parent).includes(childId);
  }

  getCardLore(card: CardInput): number {
    return this.getCard(card)?.lore ?? 0;
  }

  getCardsUnderCount(card: CardInput): number {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return 0;
    }

    const projected = this.getCard(cardInstanceId);
    return Array.isArray(projected.cardsUnder) ? projected.cardsUnder.length : 0;
  }

  getCardLocationId(card: CardInput): CardInstanceId | undefined {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return undefined;
    }

    return this.getCard(cardInstanceId).atLocationId;
  }

  hasKeyword(card: CardInput, keyword: string): boolean {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return false;
    }

    const projected = this.getCardByInstance(cardInstanceId);
    if (projected.keywords?.includes(keyword)) {
      return true;
    }
    if (keyword === "Challenger") {
      return (projected.keywordValues?.challenger ?? 0) > 0;
    }
    if (keyword === "Resist") {
      return (projected.keywordValues?.resist ?? 0) > 0;
    }

    const definition = this.getCardDefinitionByInstanceId(cardInstanceId);
    return (
      definition?.abilities?.some(
        (ability) => ability.type === "keyword" && ability.keyword === keyword,
      ) ?? false
    );
  }

  getKeywordValue(card: CardInput, keyword: "Challenger" | "Resist"): number | null {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return null;
    }

    const keywordValues = this.getCardByInstance(cardInstanceId).keywordValues;
    if (!keywordValues) {
      return null;
    }

    const value =
      keyword === "Challenger"
        ? (keywordValues.challenger ?? null)
        : (keywordValues.resist ?? null);

    if (typeof value !== "number" || value <= 0) {
      return null;
    }

    return value;
  }

  hasTemporaryAbility(card: CardInput, ability: string): boolean {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return false;
    }

    const projected = this.getCard(cardInstanceId) as
      | { temporaryAbilities?: Record<string, number> }
      | undefined;
    return typeof projected?.temporaryAbilities?.[ability] === "number";
  }

  hasTemporaryRestriction(card: CardInput, restriction: string): boolean {
    const cardInstanceId = this.resolveCardId(card);
    if (!cardInstanceId) {
      return false;
    }

    const projected = this.getCard(cardInstanceId) as
      | { temporaryRestrictions?: Record<string, number> }
      | undefined;
    return typeof projected?.temporaryRestrictions?.[restriction] === "number";
  }

  hasPlayerRestriction(playerId: string | PlayerId, restriction: string): boolean {
    const currentTurn = this.getTurnNumber();
    const expiryTurn =
      this.getBoard().temporaryPlayerRestrictions?.[String(playerId)]?.[restriction];
    return typeof expiryTurn === "number" && expiryTurn >= currentTurn;
  }

  protected requireCardId(cardInput: CardInput | LorcanaStaticCard): CardInstanceId {
    const id = this.resolveCardId(cardInput);
    if (!id) {
      throw new Error(`Card not found: ${cardInput}`);
    }

    return id as CardInstanceId;
  }

  private findProjectedCardById(cardId: CardInstanceId): LorcanaProjectedCard | undefined {
    return this.getBoard().cards[String(cardId)];
  }

  private selectZoneCards(owner: string, zone: string): LorcanaProjectedCard[] {
    const ownerId =
      owner === "you"
        ? (this.getClientPlayerId() ?? owner)
        : owner === "opponent"
          ? (this.getBoard().playerOrder.find(
              (playerId) => playerId !== this.getClientPlayerId(),
            ) ?? owner)
          : owner;
    const playerBoard = this.getBoard().players[ownerId];
    if (!playerBoard) {
      return [];
    }

    switch (zone) {
      case "hand":
        return playerBoard.hand
          .map((cardId) => this.getBoard().cards[String(cardId)])
          .filter((card): card is LorcanaProjectedCard => Boolean(card));
      case "play":
        return playerBoard.play
          .map((cardId) => this.getBoard().cards[String(cardId)])
          .filter((card): card is LorcanaProjectedCard => Boolean(card));
      case "inkwell":
        return playerBoard.inkwell
          .map((cardId) => this.getBoard().cards[String(cardId)])
          .filter((card): card is LorcanaProjectedCard => Boolean(card));
      case "discard":
        return playerBoard.discard
          .map((cardId) => this.getBoard().cards[String(cardId)])
          .filter((card): card is LorcanaProjectedCard => Boolean(card));
      default:
        return [];
    }
  }

  private getPendingActionEffectRecord(
    effectId: string,
  ): DeepReadonly<PendingActionEffect> | undefined {
    return this.getState().G.pendingEffects.find((effect) => effect.id === effectId);
  }

  private resolveOrRequiredSelectionCount(count: unknown): number {
    if (typeof count === "number" && Number.isFinite(count)) {
      return Math.max(0, Math.floor(count));
    }

    return 1;
  }

  private getOrTargetPlayerIds(target: unknown, controllerId: string): string[] {
    const playerOrder = this.getBoard().playerOrder;
    switch (target) {
      case "OPPONENT":
      case "OPPONENTS":
      case "EACH_OPPONENT":
        return playerOrder.filter((playerId) => playerId !== controllerId);
      case "EACH_PLAYER":
      case "ALL_PLAYERS":
        return [...playerOrder];
      case "CONTROLLER":
      case "CURRENT_TURN":
      default:
        return [controllerId];
    }
  }

  private isProjectedOrOptionLegal(
    effect: unknown,
    controllerId: string,
    sourceCardId: string,
  ): boolean {
    if (!effect || typeof effect !== "object") {
      return false;
    }

    const effectRecord = effect as Record<string, unknown>;
    const effectType = effectRecord.type;

    if (effectType === "sequence") {
      const nestedEffects = Array.isArray(effectRecord.steps)
        ? effectRecord.steps
        : Array.isArray(effectRecord.effects)
          ? effectRecord.effects
          : [];
      const firstNestedEffect = nestedEffects[0];
      return firstNestedEffect
        ? this.isProjectedOrOptionLegal(firstNestedEffect, controllerId, sourceCardId)
        : false;
    }

    if (effectType === "discard") {
      const requiredCount =
        effectRecord.amount === "all"
          ? 1
          : this.resolveOrRequiredSelectionCount(effectRecord.amount);
      const filter =
        effectRecord.filter && typeof effectRecord.filter === "object"
          ? (effectRecord.filter as Record<string, unknown>)
          : undefined;
      const sourceZone = typeof effectRecord.from === "string" ? effectRecord.from : "hand";

      return this.getOrTargetPlayerIds(effectRecord.target, controllerId).every((playerId) => {
        const candidates = this.selectZoneCards(playerId, sourceZone).filter((card) => {
          const definition = this.getCardDefinitionByInstanceId(card.id as CardInstanceId);
          const cardType = typeof filter?.cardType === "string" ? filter.cardType : undefined;
          const notCardType =
            typeof filter?.notCardType === "string" ? filter.notCardType : undefined;
          const classification =
            typeof filter?.classification === "string" && isClassification(filter.classification)
              ? filter.classification
              : undefined;
          const maxCost = typeof filter?.maxCost === "number" ? filter.maxCost : undefined;

          if (cardType && definition.cardType !== cardType) {
            return false;
          }
          if (notCardType && definition.cardType === notCardType) {
            return false;
          }
          if (classification && !(definition.classifications ?? []).includes(classification)) {
            return false;
          }
          if (typeof maxCost === "number" && typeof definition.cost === "number") {
            return definition.cost <= maxCost;
          }

          return true;
        });

        return candidates.length >= requiredCount;
      });
    }

    if (effectType === "return-to-hand") {
      const target =
        effectRecord.target && typeof effectRecord.target === "object"
          ? (effectRecord.target as Record<string, unknown>)
          : undefined;
      if (!target || target.selector !== "chosen") {
        return false;
      }

      const requiredCount = this.resolveOrRequiredSelectionCount(target.count);
      const owner =
        target.owner === "you" || target.owner === "opponent" || target.owner === "any"
          ? target.owner
          : "any";
      const playerIds =
        owner === "you"
          ? [controllerId]
          : owner === "opponent"
            ? this.getBoard().playerOrder.filter((playerId) => playerId !== controllerId)
            : this.getBoard().playerOrder;
      const cardTypes = Array.isArray(target.cardTypes)
        ? target.cardTypes.filter((cardType): cardType is string => typeof cardType === "string")
        : [];
      const excludeSelf = target.excludeSelf === true;

      const candidates = playerIds
        .flatMap((playerId) => this.selectZoneCards(playerId, "play"))
        .filter((card) => !excludeSelf || String(card.id) !== sourceCardId)
        .filter((card) => {
          const definition = this.getCardDefinitionByInstanceId(card.id as CardInstanceId);
          return cardTypes.length === 0 || cardTypes.includes(definition.cardType);
        });

      return candidates.length >= requiredCount;
    }

    if (effectType === "banish") {
      const target = effectRecord.target;
      const isSelfTarget =
        target === "SELF" ||
        target === "THIS_CHARACTER" ||
        target === "THIS_ITEM" ||
        target === "THIS_LOCATION" ||
        (typeof target === "object" &&
          target !== null &&
          (((target as Record<string, unknown>).ref === "self" &&
            (target as Record<string, unknown>).selector === undefined) ||
            (target as Record<string, unknown>).selector === "self"));
      if (!isSelfTarget) {
        return false;
      }

      const zone = this.getCardZone(sourceCardId as CardInput);
      return zone === "play" || zone === "limbo";
    }

    return true;
  }

  private getForcedOrSelection(effectId: string, requestedChoiceIndex: number): number | undefined {
    const pendingEffect = this.getPendingActionEffectRecord(effectId);
    if (
      pendingEffect?.kind !== "choice-selection" ||
      !pendingEffect.cardPlayed?.playerId ||
      !pendingEffect.cardPlayed.cardId ||
      !pendingEffect.effect ||
      typeof pendingEffect.effect !== "object"
    ) {
      return undefined;
    }

    const effectRecord = pendingEffect.effect as Record<string, unknown>;
    if (effectRecord.type !== "or") {
      return undefined;
    }

    const options = Array.isArray(effectRecord.options)
      ? effectRecord.options
      : Array.isArray(effectRecord.choices)
        ? effectRecord.choices
        : [];
    if (options.length === 0) {
      return undefined;
    }

    const normalizedRequestedIndex = Math.min(requestedChoiceIndex, options.length - 1);
    const legalIndices = options.flatMap((option, index) =>
      this.isProjectedOrOptionLegal(
        option,
        pendingEffect.cardPlayed!.playerId!,
        pendingEffect.cardPlayed!.cardId!,
      )
        ? [index]
        : [],
    );

    return legalIndices.length === 1 && legalIndices[0] !== normalizedRequestedIndex
      ? legalIndices[0]
      : undefined;
  }

  resolveEffect(effectId: string, opts: ResolutionExecutionOptions = {}): CommandResult {
    if (typeof effectId !== "string" || effectId.length === 0) {
      return this.createErrorResult(
        "resolveEffect requires a valid effect id.",
        "RESOLVE_EFFECT_ID_REQUIRED",
      );
    }

    let resolvedTargets: CardInstanceId[] | undefined;
    if (opts.targets !== undefined) {
      try {
        resolvedTargets = this.resolveCardInputs(opts.targets);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error ? error.message : "Failed to resolve resolveEffect targets",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    const resolvedDestinations: LorcanaRuntimeMoveParams["playCard"]["destinations"] =
      Array.isArray(opts.destinations) && opts.destinations.length > 0
        ? opts.destinations.reduce<
            NonNullable<LorcanaRuntimeMoveParams["playCard"]["destinations"]>
          >((acc, destination) => {
            const requestedCards = Array.isArray(destination.cards)
              ? destination.cards
              : [destination.cards];
            let resolvedCards: CardInstanceId[] = [];
            try {
              resolvedCards = this.resolveCardInputs(requestedCards);
            } catch {
              resolvedCards = [];
            }

            if (resolvedCards.length > 0) {
              acc.push({
                cards: resolvedCards,
                zone: destination.zone,
              });
            }

            return acc;
          }, [])
        : undefined;

    const params: Record<string, unknown> = {};
    if (typeof opts.amount === "number") {
      params.amount = opts.amount;
    }
    if (typeof opts.namedCard === "string" && opts.namedCard.trim().length > 0) {
      params.namedCard = opts.namedCard.trim();
    }
    if (typeof opts.choiceIndex === "number") {
      params.choiceIndex = opts.choiceIndex;
    }
    if (typeof opts.resolveOptional === "boolean") {
      params.resolveOptional = opts.resolveOptional;
    }
    if (resolvedDestinations && resolvedDestinations.length > 0) {
      params.destinations = resolvedDestinations;
    }

    // Build args - only effectId is needed to match the intent
    // targets are passed in params, not at the top level
    if (!this.enumerateMoves().includes("resolveEffect")) {
      return this.createErrorResult(
        "resolveEffect is not currently available.",
        "RESOLVE_EFFECT_UNAVAILABLE",
      );
    }

    // Build the final args - the resolveEffect move expects:
    // { effectId, params: { resolveOptional?, targets?, ... } }
    // Note: We explicitly construct args rather than spreading matchingMove.args
    // to avoid including any unintended fields at the top level
    const input: LorcanaRuntimeMoveInputs["resolveEffect"] = {
      args: {
        effectId,
        params: {
          ...params,
          ...(resolvedTargets ? { targets: resolvedTargets } : {}),
        },
      },
    };

    const forcedChoiceIndex =
      typeof opts.choiceIndex === "number"
        ? this.getForcedOrSelection(effectId, opts.choiceIndex)
        : undefined;
    if (typeof forcedChoiceIndex === "number") {
      (input.args.params as Record<string, unknown>).choiceIndex = forcedChoiceIndex;
    }

    const result = this.executeMove("resolveEffect", input);
    if (!result.success) {
      return result;
    }

    if (typeof forcedChoiceIndex === "number") {
      return {
        success: false,
        error: "The selected branch is not legal; the only legal branch was resolved instead.",
        errorCode: "FORCED_OR_BRANCH",
        currentStateID: this.getStateID(),
      };
    }

    return result;
  }

  /**
   * Convenience method to play a card.
   * @param playerId - The player executing the move
   * @param card - The card to play (CardInput)
   * @param opts - Optional play parameters
   * @returns CommandResult
   */
  playCard(card: CardInput, opts?: PlayCardExecutionOptions): CommandResult;
  playCard(playerId: string, card: CardInput, opts?: PlayCardExecutionOptions): CommandResult;
  playCard(
    playerIdOrCard: string | CardInput,
    cardOrOpts?: CardInput | PlayCardExecutionOptions,
    opts?: PlayCardExecutionOptions,
  ): CommandResult {
    const scopedPlayerId = this.getScopedPlayerId();
    const isScopedCall =
      scopedPlayerId !== undefined &&
      (cardOrOpts === undefined ||
        (typeof cardOrOpts === "object" && cardOrOpts !== null && !Array.isArray(cardOrOpts)));

    const playerId = isScopedCall ? scopedPlayerId : playerIdOrCard;
    const card = (isScopedCall ? playerIdOrCard : cardOrOpts) as CardInput | undefined;
    const resolvedOpts = (isScopedCall ? cardOrOpts : opts) as PlayCardExecutionOptions | undefined;

    if (!card) {
      return this.createErrorResult("playCard requires a card input.", "CARD_INPUT_REQUIRED");
    }

    const cardId = this.resolveCardId(card);
    if (!cardId) {
      return this.createCardResolutionError("playCard", "Could not resolve card input");
    }
    const resolvedCost = this.resolvePlayCardCostInput(resolvedOpts?.cost ?? "standard");
    // Extract the simple cost string from PlayCardCostInput
    const costString = typeof resolvedCost === "object" ? resolvedCost.cost : resolvedCost;

    // Resolve targets from CardInput[] to CardInstanceId[]
    let resolvedTargets: CardInstanceId[] | undefined;
    if (resolvedOpts?.targets !== undefined) {
      try {
        resolvedTargets = this.resolveCardInputs(resolvedOpts.targets);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error ? error.message : "Failed to resolve playCard targets",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    // Resolve destinations if provided
    const resolvedDestinations: LorcanaRuntimeMoveParams["playCard"]["destinations"] =
      Array.isArray(resolvedOpts?.destinations) && resolvedOpts.destinations.length > 0
        ? resolvedOpts.destinations.reduce<
            NonNullable<LorcanaRuntimeMoveParams["playCard"]["destinations"]>
          >((acc, destination) => {
            const requestedCards = Array.isArray(destination.cards)
              ? destination.cards
              : [destination.cards];
            let resolvedCards: CardInstanceId[] = [];
            try {
              resolvedCards = this.resolveCardInputs(requestedCards);
            } catch {
              resolvedCards = [];
            }

            if (resolvedCards.length > 0) {
              acc.push({
                cards: resolvedCards,
                zone: destination.zone,
              });
            }

            return acc;
          }, [])
        : undefined;

    const costParams: Omit<LorcanaRuntimeMoveParams["playCard"], "cardId" | "cost"> = {
      ...(typeof resolvedCost === "object" ? resolvedCost : {}),
      ...(resolvedTargets !== undefined ? { targets: resolvedTargets } : {}),
      ...(resolvedOpts?.playerTargets !== undefined
        ? { playerTargets: resolvedOpts.playerTargets }
        : {}),
      ...(resolvedOpts?.amount !== undefined ? { amount: resolvedOpts.amount } : {}),
      ...(resolvedOpts?.resolveOptional !== undefined
        ? { resolveOptional: resolvedOpts.resolveOptional }
        : {}),
      ...(resolvedOpts?.choiceIndex !== undefined ? { choiceIndex: resolvedOpts.choiceIndex } : {}),
      ...(resolvedDestinations !== undefined ? { destinations: resolvedDestinations } : {}),
      ...(resolvedOpts?.preventAutoResolveTriggeredEffects !== undefined
        ? {
            preventAutoResolveTriggeredEffects: resolvedOpts.preventAutoResolveTriggeredEffects,
          }
        : {}),
      eventSnapshot: {
        ...resolvedOpts?.eventSnapshot,
        autoExertBodyguardOnNestedPlay:
          resolvedOpts?.resolveOptional === true ||
          resolvedOpts?.eventSnapshot?.autoExertBodyguardOnNestedPlay === true,
      },
    };

    return this.playCardByInstance(
      String(playerId),
      cardId,
      costString as LorcanaRuntimeMoveParams["playCard"]["cost"],
      costParams,
      undefined,
      {
        returnProcessedMove: resolvedOpts?.returnProcessedMove,
      },
    );
  }

  /**
   * Convenience method to quest with a character.
   * @param playerId - The player executing the move
   * @param card - The character to quest with (CardInput)
   * @returns CommandResult
   */
  quest(card: CardInput): CommandResult;
  quest(playerId: string, card: CardInput): CommandResult;
  quest(playerIdOrCard: string | CardInput, card?: CardInput): CommandResult {
    const playerId = card === undefined ? this.getScopedPlayerId() : playerIdOrCard;
    const resolvedCard = (card === undefined ? playerIdOrCard : card) as CardInput;

    if (!playerId) {
      return this.createErrorResult(
        "quest requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }

    const cardId = this.resolveCardId(resolvedCard);
    if (!cardId) {
      return this.createCardResolutionError("quest", "Could not resolve card input");
    }
    return this.questByInstance(String(playerId), cardId);
  }

  /**
   * Convenience method to challenge with a character.
   * @param playerId - The player executing the move
   * @param attacker - The attacking character (CardInput)
   * @param defender - The defending character (CardInput)
   * @returns CommandResult
   */
  challenge(attacker: CardInput, defender: CardInput): CommandResult;
  challenge(playerId: string, attacker: CardInput, defender: CardInput): CommandResult;
  challenge(
    playerIdOrAttacker: string | CardInput,
    attackerOrDefender: CardInput,
    defender?: CardInput,
  ): CommandResult {
    const playerId = defender === undefined ? this.getScopedPlayerId() : playerIdOrAttacker;
    const attacker = (
      defender === undefined ? playerIdOrAttacker : attackerOrDefender
    ) as CardInput;
    const resolvedDefender = (defender === undefined ? attackerOrDefender : defender) as CardInput;

    if (!playerId) {
      return this.createErrorResult(
        "challenge requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }

    const attackerId = this.resolveCardId(attacker);
    const defenderId = this.resolveCardId(resolvedDefender);
    if (!attackerId || !defenderId) {
      return this.createCardResolutionError("challenge", "Could not resolve card input");
    }
    return this.challengeByInstance(String(playerId), attackerId, defenderId);
  }

  moveCharacterToLocation(character: CardInput, location: CardInput): CommandResult;
  moveCharacterToLocation(
    playerId: string,
    character: CardInput,
    location: CardInput,
  ): CommandResult;
  moveCharacterToLocation(
    playerIdOrCharacter: string | CardInput,
    characterOrLocation: CardInput,
    location?: CardInput,
  ): CommandResult {
    const playerId = location === undefined ? this.getScopedPlayerId() : playerIdOrCharacter;
    const character = (
      location === undefined ? playerIdOrCharacter : characterOrLocation
    ) as CardInput;
    const resolvedLocation = (location === undefined ? characterOrLocation : location) as CardInput;

    if (!playerId) {
      return this.createErrorResult(
        "moveCharacterToLocation requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }

    const characterId = this.resolveCardId(character);
    const locationId = this.resolveCardId(resolvedLocation);
    if (!characterId || !locationId) {
      return this.createCardResolutionError(
        "moveCharacterToLocation",
        "Could not resolve card input",
      );
    }

    return this.moveCharacterToLocationByInstance(String(playerId), characterId, locationId);
  }

  /**
   * Convenience method to put a card into the inkwell.
   * @param playerId - The player executing the move
   * @param card - The card to put into inkwell (CardInput)
   * @returns CommandResult
   */
  putIntoInkwell(playerId: string, card: CardInput): CommandResult {
    const cardId = this.resolveCardId(card);
    if (!cardId) {
      return this.createCardResolutionError("putIntoInkwell", "Could not resolve card input");
    }
    return this.putIntoInkwellByInstance(playerId, cardId);
  }

  /**
   * Convenience method to mulligan cards.
   * @param playerId - The player executing the move
   * @param cards - The cards to mulligan (CardInput[])
   * @returns CommandResult
   */
  mulligan(cards: CardInput[]): CommandResult;
  mulligan(playerId: string, cards: CardInput[]): CommandResult;
  mulligan(playerIdOrCards: string | CardInput[], cards?: CardInput[]): CommandResult {
    const playerId = Array.isArray(playerIdOrCards) ? this.getScopedPlayerId() : playerIdOrCards;
    const resolvedCards = (Array.isArray(playerIdOrCards) ? playerIdOrCards : cards) ?? [];

    if (!playerId) {
      return this.createErrorResult(
        "mulligan requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }

    const cardIds = resolvedCards
      .map((c) => this.resolveCardId(c))
      .filter((id): id is CardInstanceId => Boolean(id));
    if (cardIds.length !== resolvedCards.length) {
      return this.createCardResolutionError("mulligan", "Could not resolve some card inputs");
    }
    return this.mulliganByInstance(playerId, cardIds);
  }

  /**
   * Convenience method to add ink (put a card into inkwell).
   * Alias for putIntoInkwell.
   * @param playerId - The player executing the move
   * @param card - The card to ink (CardInput)
   * @returns CommandResult
   */
  ink(card: CardInput): CommandResult;
  ink(playerId: string, card: CardInput): CommandResult;
  ink(playerIdOrCard: string | CardInput, card?: CardInput): CommandResult {
    if (card === undefined) {
      const playerId = this.getScopedPlayerId();
      if (!playerId) {
        return this.createErrorResult(
          "ink requires a player id when used from a non-player-scoped engine.",
          "PLAYER_ID_REQUIRED",
        );
      }
      return this.putIntoInkwell(playerId, playerIdOrCard as CardInput);
    }

    return this.putIntoInkwell(String(playerIdOrCard), card);
  }

  activateAbility(
    playerId: string,
    card: CardInput,
    ability?: string | ActivateAbilityExecutionOptions,
  ): CommandResult;
  activateAbility(
    card: CardInput,
    ability?: string | ActivateAbilityExecutionOptions,
  ): CommandResult;
  activateAbility(
    playerIdOrCard: string | CardInput,
    cardOrAbility?: CardInput | string | ActivateAbilityExecutionOptions,
    ability?: string | ActivateAbilityExecutionOptions,
  ): CommandResult {
    const scopedCall =
      cardOrAbility === undefined ||
      (typeof cardOrAbility === "string" &&
        ability === undefined &&
        this.resolveCardId(playerIdOrCard as CardInput) !== undefined) ||
      (typeof cardOrAbility === "object" &&
        cardOrAbility !== null &&
        !Array.isArray(cardOrAbility) &&
        ("ability" in cardOrAbility ||
          "abilityIndex" in cardOrAbility ||
          "targets" in cardOrAbility ||
          "choiceIndex" in cardOrAbility ||
          "costs" in cardOrAbility));

    const playerId = scopedCall ? this.getScopedPlayerId() : String(playerIdOrCard);
    const card = (scopedCall ? playerIdOrCard : cardOrAbility) as CardInput;
    const resolvedAbility = (scopedCall ? cardOrAbility : ability) as
      | string
      | ActivateAbilityExecutionOptions
      | undefined;

    return this.activateAbilityInternal(playerId, card, resolvedAbility);
  }

  private activateAbilityInternal(
    playerId: string | undefined,
    card: CardInput,
    ability?: string | ActivateAbilityExecutionOptions,
  ): CommandResult {
    const cardId = this.resolveCardId(card);
    if (!cardId) {
      return this.createCardResolutionError("activateAbility", "Could not resolve card input");
    }

    if (!playerId) {
      return this.createErrorResult(
        "activateAbility requires a player id when used from a non-player-scoped engine.",
        "PLAYER_ID_REQUIRED",
      );
    }

    const resolvedOptions =
      typeof ability === "string" || ability === undefined ? { ability } : ability;

    const resolvedAbility =
      typeof resolvedOptions.abilityIndex === "number"
        ? this.findActivatedAbilityByIndex(cardId, resolvedOptions.abilityIndex)
        : this.findActivatedAbility(cardId, resolvedOptions.ability);
    if (!resolvedAbility) {
      return this.createErrorResult(
        typeof resolvedOptions.abilityIndex === "number"
          ? `Activated ability not found at index ${resolvedOptions.abilityIndex}`
          : `Activated ability not found${resolvedOptions.ability ? `: ${resolvedOptions.ability}` : ""}`,
        "ABILITY_NOT_FOUND",
      );
    }

    let resolvedTargets: CardInstanceId[] | undefined;
    if (resolvedOptions.targets !== undefined) {
      try {
        resolvedTargets = this.resolveCardInputs(resolvedOptions.targets);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error ? error.message : "Failed to resolve activateAbility targets",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    let resolvedExertCharacterCosts: CardInstanceId[] | undefined;
    if (resolvedOptions.costs?.exertCharacters !== undefined) {
      try {
        resolvedExertCharacterCosts = this.resolveCardInputs(resolvedOptions.costs.exertCharacters);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error
            ? error.message
            : "Failed to resolve activateAbility exert-character costs",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    let resolvedDiscardCardCosts: CardInstanceId[] | undefined;
    if (resolvedOptions.costs?.discardCards !== undefined) {
      try {
        resolvedDiscardCardCosts = this.resolveCardInputs(resolvedOptions.costs.discardCards);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error
            ? error.message
            : "Failed to resolve activateAbility discard-card costs",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    let resolvedBanishItemCosts: CardInstanceId[] | undefined;
    if (resolvedOptions.costs?.banishItems !== undefined) {
      try {
        resolvedBanishItemCosts = this.resolveCardInputs(resolvedOptions.costs.banishItems);
      } catch (error) {
        return this.createErrorResult(
          error instanceof Error
            ? error.message
            : "Failed to resolve activateAbility banish-item costs",
          "CARD_RESOLVE_FAILED",
        );
      }
    }

    return this.executeMove("activateAbility", playerId, {
      cardId,
      abilityIndex: resolvedAbility.abilityIndex,
      ...(resolvedTargets !== undefined ? { targets: resolvedTargets } : {}),
      ...(resolvedOptions.choiceIndex !== undefined
        ? { choiceIndex: resolvedOptions.choiceIndex }
        : {}),
      ...(resolvedBanishItemCosts !== undefined ||
      resolvedExertCharacterCosts !== undefined ||
      resolvedDiscardCardCosts !== undefined
        ? {
            costs: {
              ...(resolvedBanishItemCosts !== undefined
                ? { banishItems: resolvedBanishItemCosts }
                : {}),
              ...(resolvedExertCharacterCosts !== undefined
                ? { exertCharacters: resolvedExertCharacterCosts }
                : {}),
              ...(resolvedDiscardCardCosts !== undefined
                ? { discardCards: resolvedDiscardCardCosts }
                : {}),
            },
          }
        : {}),
    });
  }

  private isSetupMove(moveId: string): moveId is SetupMoveId {
    return moveId === "chooseWhoGoesFirst" || moveId === "alterHand";
  }

  private composeSetupMoveRequest(
    moveId: SetupMoveId,
    params: Record<string, unknown>,
  ): LorcanaMoveComposeResult {
    try {
      if (moveId === "chooseWhoGoesFirst") {
        const firstPlayerId = this.resolveFirstPlayerId(params);
        if (!firstPlayerId) {
          return {
            success: false,
            moveId,
            reason: "chooseWhoGoesFirst requires a target playerId or side.",
          };
        }

        return {
          success: true,
          moveId,
          input: {
            args: { playerId: firstPlayerId },
          } as LorcanaRuntimeMoveInputs[keyof LorcanaRuntimeMoveInputs],
        };
      }

      const cardsToMulligan = this.resolveCardsToMulligan(params);
      if (!cardsToMulligan) {
        return {
          success: false,
          moveId,
          reason: "alterHand requires cardsToMulligan to be an array of card ids.",
        };
      }

      return {
        success: true,
        moveId,
        input: {
          args: { cardsToMulligan },
        } as LorcanaRuntimeMoveInputs[keyof LorcanaRuntimeMoveInputs],
      };
    } catch (error) {
      return {
        success: false,
        moveId,
        reason: error instanceof Error ? error.message : "Failed to compose setup move input.",
      };
    }
  }

  private resolveCardsToMulligan(params: Record<string, unknown>): CardInstanceId[] | null {
    const rawCards = params.cardsToMulligan;
    if (rawCards === undefined) {
      return [];
    }
    if (!Array.isArray(rawCards) || !rawCards.every((cardId) => typeof cardId === "string")) {
      return null;
    }
    return asCardInstanceIds(rawCards);
  }

  private resolveFirstPlayerId(params: Record<string, unknown>): string | null {
    const maybeSide = params.side ?? params.firstPlayerSide;
    if (maybeSide === "playerOne" || maybeSide === "playerTwo") {
      return maybeSide === "playerOne" ? "player_one" : "player_two";
    }

    return typeof params.playerId === "string" && params.playerId.length > 0
      ? params.playerId
      : null;
  }
}
