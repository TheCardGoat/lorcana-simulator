// .agents/skills/lorcana-rules/SKILL.md
// .agents/skills/lorcana-rules/indexes/by-topic/turn-actions.md

import type {
  CardInstanceId,
  MoveEnumerationContext,
  MoveValidationContext,
  PlayerId,
  RuntimeValidationResult,
} from "#core";
import { getLogger } from "@logtape/logtape";
import type { LorcanaCard } from "@tcg/lorcana-types";
import {
  CardPlayedPayload,
  Classification,
  LorcanaG,
  LorcanaMatchState,
  LorcanaMoveDefinition,
  LorcanaRuntimeMoveInputs,
  createLorcanaLogMessage,
} from "../../../types";
import {
  analyzeEffectTargets,
  flattenNormalizedTargetSelection,
  normalizeTargetDescriptor,
  resolveCandidateTargets,
  validateAndNormalizeTargetSelection,
  type ActionTargetResolutionContext,
  type ActionSelectionZone,
} from "../../../targeting/targeting-service";
import {
  getAvailableInk,
  getShiftRules,
  getSingTogetherThreshold,
  getSingerThresholdForInstance,
  getSingerThreshold,
  isReadyAndNotDrying,
  isSongCard,
  payBasicCost,
  resolveShiftTargetCandidates,
  validateBasicCost,
} from "../../rules/play-card-rules";
import { attachShiftStack } from "../../state/shift-stack";
import { resolveActionCardEffects } from "../../resolution/action-effect-resolver";
import type { ActionResolutionInput } from "../../resolution/action-effects/types";
import {
  finalizeResolvedActionCard,
  hasPendingActionEffectResolution,
  moveSuspendedActionCardToLimbo,
  EFFECT_PENDING_ERROR_CODE,
} from "../../resolution/action-effects/pending-action-effects";
import { getEntersWithDamageAmount } from "../../resolution/action-effects/play-card-effect";
import { hasTemporaryPlayerRestriction } from "../../effects/temporary-effects";
import {
  emitTriggeredLorcanaEvent,
  flushTriggeredEventsToBag,
  hasPendingBagItems,
} from "../../effects/triggered-abilities";
import {
  getAppliedCostReductions,
  getPendingCostReductions,
  deriveStrength,
  type CostReductionApplication,
  type DerivedStateContext,
  type PendingCostReduction,
} from "../../../rules/derived-state";
import {
  formatLorcanaCardName,
  formatLorcanaPlayerLabel,
  getLorcanaCardName,
  traceLorcanaRuntimeStep,
} from "../../../runtime-trace";
import { hasBodyguard } from "../../../card-utils";

function entersPlayExerted(cardDef: LorcanaCard): boolean {
  return (cardDef.abilities ?? []).some(
    (ability) =>
      ability.type === "static" &&
      ability.effect.type === "restriction" &&
      ability.effect.restriction === "enters-play-exerted" &&
      ability.effect.target === "SELF",
  );
}

function enumerateSelectionSubsets<T>(
  candidates: readonly T[],
  minSelections: number,
  maxSelections: number,
): T[][] {
  const selections: T[][] = [];
  const boundedMin = Math.max(0, minSelections);
  const boundedMax = Math.max(boundedMin, Math.min(maxSelections, candidates.length));

  const visit = (startIndex: number, current: T[]): void => {
    if (current.length >= boundedMin && current.length <= boundedMax) {
      selections.push([...current]);
    }
    if (current.length === boundedMax) {
      return;
    }

    for (let index = startIndex; index < candidates.length; index += 1) {
      current.push(candidates[index]!);
      visit(index + 1, current);
      current.pop();
    }
  };

  visit(0, []);
  return selections;
}

const logger = getLogger(["lorcana-engine", "play-card"]);

type PlayCardValidationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"playCard">["validate"]>
>[0];

type PlayCardExecutionContext = Parameters<LorcanaMoveDefinition<"playCard">["execute"]>[0];

function getCardDefinitionFromContext(
  ctx: MoveValidationContext<LorcanaG, LorcanaCard>,
  cardId: string,
): LorcanaCard | undefined {
  return ctx.cards.getDefinition(cardId) as LorcanaCard | undefined;
}

function getCardDefinitionForEnumeration(
  cardId: string,
  ctx?: Pick<MoveEnumerationContext<LorcanaG, LorcanaCard>, "framework" | "cards">,
): LorcanaCard | undefined {
  return ctx
    ? ((ctx.cards.getDefinition(cardId) as LorcanaCard | undefined) ?? undefined)
    : undefined;
}

function getControlledCharactersInPlay(
  playCards: readonly string[],
  getCardDefinition: (cardId: string) => LorcanaCard | undefined,
): CardInstanceId[] {
  return playCards.filter(
    (cardId) => getCardDefinition(cardId)?.cardType === "character",
  ) as CardInstanceId[];
}

function normalizeActionTargets(targets: unknown): CardInstanceId[] {
  if (Array.isArray(targets)) {
    return targets.filter((target): target is CardInstanceId => typeof target === "string");
  }
  if (typeof targets === "string") {
    return [targets as CardInstanceId];
  }
  return [];
}

function tracePlayCardValidationFailure(
  ctx: PlayCardValidationContext,
  error: string,
  errorCode: string,
  cardId: CardInstanceId,
  cardDef?: LorcanaCard,
): RuntimeValidationResult {
  if (ctx.validationMode === "final") {
    traceLorcanaRuntimeStep({
      kind: "move.validation.failed",
      moveId: "playCard",
      playerId: ctx.playerId,
      cardId,
      cardName: formatLorcanaCardName(cardDef),
      message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: playCard (${errorCode})`,
      payload: {
        error,
        errorCode,
      },
    });
  }

  return { valid: false, error, errorCode };
}

function tracePlayCardCostSelection(
  ctx: PlayCardExecutionContext,
  cost: LorcanaRuntimeMoveInputs["playCard"]["args"]["cost"],
  cardDef: LorcanaCard,
  details?: {
    shiftTargetId?: CardInstanceId;
    singerIds?: CardInstanceId[];
  },
): void {
  const cardName = formatLorcanaCardName(cardDef) ?? "Unknown Card";
  const resolveCardName = (cardId: CardInstanceId) =>
    getLorcanaCardName(cardId, (instanceId) => ctx.cards.getDefinition(instanceId) as LorcanaCard);

  let message = `Cost mode selected: ${cost} for ${cardName}`;

  if (cost === "shift" && details?.shiftTargetId) {
    const shiftTargetName = resolveCardName(details.shiftTargetId);
    if (shiftTargetName) {
      message = `Cost mode selected: shift onto ${shiftTargetName}`;
    }
  }

  if (cost === "sing" && details?.singerIds?.[0]) {
    const singerName = resolveCardName(details.singerIds[0]);
    if (singerName) {
      message = `Cost mode selected: sing via ${singerName}`;
    }
  }

  if (cost === "singTogether" && details?.singerIds && details.singerIds.length > 0) {
    const singerNames = details.singerIds
      .map((singerId) => resolveCardName(singerId))
      .filter((name): name is string => typeof name === "string");
    if (singerNames.length > 0) {
      message = `Cost mode selected: singTogether via ${singerNames.join(", ")}`;
    }
  }

  traceLorcanaRuntimeStep({
    kind: "move.cost.selected",
    moveId: "playCard",
    playerId: ctx.playerId,
    cardId: ctx.args.cardId,
    cardName,
    message,
    payload: {
      cost,
    },
  });
}

function isValidActionResolutionAmount(value: unknown): boolean {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0;
  }

  if (typeof value === "string") {
    return value.length > 0;
  }

  return typeof value === "object" && value !== null;
}

type BasicPlayCostPayment = Parameters<typeof validateBasicCost>[1];

type TurnMetadataCostReductionRead = {
  pendingCostReductionsByPlayer?: Partial<
    Record<PlayerId, readonly PendingCostReduction[] | PendingCostReduction[]>
  >;
};

type StaticCostReductionContext = Pick<
  MoveValidationContext<LorcanaG, LorcanaCard>,
  "framework" | "cards" | "G"
>;

function computeCostReduction(
  ctx: StaticCostReductionContext,
  turnMetadata: TurnMetadataCostReductionRead,
  playerId: PlayerId,
  cardId: CardInstanceId,
  cardDef: LorcanaCard,
  currentTurn: number,
): CostReductionApplication {
  return getAppliedCostReductions({
    definition: cardDef,
    state: {
      ...ctx.framework.state,
      G: ctx.G,
    } as DerivedStateContext,
    cardInstanceId: cardId,
    ownerID: playerId,
    zoneID: "hand",
    actorPlayerId: playerId,
    getDefinitionByInstanceId: (id) => ctx.cards.getDefinition(id) as LorcanaCard | undefined,
  });
}

function getStandardPlayCardBasicCost(
  cardDef: LorcanaCard,
  costReduction: CostReductionApplication,
): BasicPlayCostPayment {
  return {
    ink: Math.max(0, cardDef.cost - costReduction.reductionAmount),
  };
}

function getShiftPlayCardBasicCost(
  cardDef: LorcanaCard,
  costReduction: CostReductionApplication,
): BasicPlayCostPayment {
  const shiftRules = getShiftRules(cardDef);
  if (!shiftRules || shiftRules.unsupportedReason || typeof shiftRules.inkCost !== "number") {
    return {};
  }

  return {
    ink: Math.max(0, shiftRules.inkCost - costReduction.reductionAmount),
  };
}

function getSingPlayCardBasicCost(
  singer: CardInstanceId,
  singerDef: LorcanaCard | undefined,
): BasicPlayCostPayment {
  return {
    exertCards: [
      {
        cardId: singer,
        cardType: singerDef?.cardType,
        subject: "Singer",
        exhaustedErrorCode: "SINGER_EXERTED",
        dryingErrorCode: "SINGER_DRYING",
      },
    ],
  };
}

function getSingTogetherPlayCardBasicCost(
  singers: readonly CardInstanceId[],
  getCardDefinition: (cardId: CardInstanceId) => LorcanaCard | undefined,
): BasicPlayCostPayment {
  return {
    exertCards: singers.map((singer) => ({
      cardId: singer,
      cardType: getCardDefinition(singer)?.cardType,
      subject: `Singer ${singer}`,
      exhaustedErrorCode: "SINGER_EXERTED",
      dryingErrorCode: "SINGER_DRYING",
    })),
  };
}

function consumeAppliedCostReductions(
  turnMetadata: LorcanaG["turnMetadata"],
  playerId: PlayerId,
  consumeIndexes: number[],
  currentTurn: number,
): void {
  if (!turnMetadata.pendingCostReductionsByPlayer) {
    turnMetadata.pendingCostReductionsByPlayer = {};
  }
  const pendingByPlayer = turnMetadata.pendingCostReductionsByPlayer;
  const currentEntries = getPendingCostReductions(
    { G: { turnMetadata } } as unknown as DerivedStateContext,
    playerId,
  );
  if (currentEntries.length === 0) {
    return;
  }

  const consumeIndexSet = new Set(consumeIndexes);
  pendingByPlayer[playerId] = currentEntries.filter((entry, index) => {
    if (entry.expiresAtTurn < currentTurn) {
      return false;
    }
    if (consumeIndexSet.size > 0 && consumeIndexSet.has(index)) {
      return false;
    }
    return true;
  });
}

function getPlayRestrictionError(
  ctx: MoveValidationContext<LorcanaG, LorcanaCard>,
  playerId: PlayerId,
  cardDef: LorcanaCard,
  currentTurn: number,
): Extract<RuntimeValidationResult, { valid: false }> | undefined {
  const playerRestrictions = ctx.G.temporaryPlayerRestrictions;
  if (hasTemporaryPlayerRestriction(playerRestrictions, playerId, currentTurn, "cant-play")) {
    return {
      valid: false,
      error: "Player cannot play cards due to an active restriction",
      errorCode: "PLAYER_PLAY_RESTRICTED",
    };
  }

  if (
    cardDef.cardType === "action" &&
    hasTemporaryPlayerRestriction(playerRestrictions, playerId, currentTurn, "cant-play-actions")
  ) {
    return {
      valid: false,
      error: "Player cannot play actions due to an active restriction",
      errorCode: "PLAYER_PLAY_RESTRICTED",
    };
  }

  if (
    cardDef.cardType === "item" &&
    hasTemporaryPlayerRestriction(playerRestrictions, playerId, currentTurn, "cant-play-items")
  ) {
    return {
      valid: false,
      error: "Player cannot play items due to an active restriction",
      errorCode: "PLAYER_PLAY_RESTRICTED",
    };
  }

  if (
    cardDef.cardType === "character" &&
    hasTemporaryPlayerRestriction(playerRestrictions, playerId, currentTurn, "cant-play-characters")
  ) {
    return {
      valid: false,
      error: "Player cannot play characters due to an active restriction",
      errorCode: "PLAYER_PLAY_RESTRICTED",
    };
  }

  return undefined;
}

/**
 * Play a card from hand
 */
export const playCard: LorcanaMoveDefinition<"playCard"> = {
  validate: (ctx): RuntimeValidationResult => {
    const params = ctx.args;
    const { cardId } = params;
    const tracedCardId = cardId as CardInstanceId;
    const fail = (
      error: string,
      errorCode: string,
      cardDef?: LorcanaCard,
    ): RuntimeValidationResult =>
      tracePlayCardValidationFailure(ctx, error, errorCode, tracedCardId, cardDef);

    if (hasPendingActionEffectResolution(ctx)) {
      return fail("Cannot play cards while an action effect is pending", EFFECT_PENDING_ERROR_CODE);
    }

    if (hasPendingBagItems(ctx)) {
      return fail("Cannot play cards while bag effects are pending", "BAG_PENDING");
    }

    const currentPlayer = ctx.framework.state.currentPlayer!;
    const isPreflight = ctx.validationMode === "preflight";

    // Check card is in hand.
    const handCards = ctx.framework.zones.getCards({ zone: "hand", playerId: currentPlayer });
    if (!handCards.includes(cardId)) {
      return fail("Card not in hand", "CARD_NOT_IN_HAND");
    }

    const cardDef = getCardDefinitionFromContext(ctx, cardId);
    if (!cardDef) {
      return fail("Card definition not found", "CARD_NOT_FOUND");
    }

    const myPlayCards = ctx.framework.zones.getCards({ zone: "play", playerId: currentPlayer });
    const myCharactersInPlay = getControlledCharactersInPlay(myPlayCards, (instanceId) =>
      getCardDefinitionFromContext(ctx, instanceId),
    );
    const currentTurn = ctx.framework.state.ctx.status.turn ?? 1;
    const playRestrictionError = getPlayRestrictionError(
      ctx,
      currentPlayer as PlayerId,
      cardDef,
      currentTurn,
    );
    if (playRestrictionError) {
      return fail(
        playRestrictionError.error ?? "Card cannot be played right now",
        playRestrictionError.errorCode ?? "PLAY_RESTRICTED",
        cardDef,
      );
    }

    const costReduction = computeCostReduction(
      ctx,
      ctx.G.turnMetadata,
      currentPlayer as PlayerId,
      cardId,
      cardDef,
      currentTurn,
    );
    const reducedCardCost = Math.max(0, cardDef.cost - costReduction.reductionAmount);

    switch (params.cost) {
      case "standard": {
        const costValidation = validateBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer as PlayerId,
          },
          getStandardPlayCardBasicCost(cardDef, costReduction),
        );
        if (!costValidation.valid) {
          return fail(
            costValidation.error ?? "Failed to validate standard cost",
            costValidation.errorCode ?? "INVALID_STANDARD_COST",
            cardDef,
          );
        }
        break;
      }

      case "shift": {
        const shiftTarget = "shiftTarget" in params ? params.shiftTarget : undefined;
        const shiftRules = getShiftRules(cardDef);
        if (!shiftRules) {
          return fail("Card does not have Shift", "NO_SHIFT_ABILITY", cardDef);
        }
        if (shiftRules.unsupportedReason) {
          return fail(shiftRules.unsupportedReason, "UNSUPPORTED_SHIFT_COST", cardDef);
        }
        if (typeof shiftRules.inkCost !== "number") {
          return fail("Shift cost could not be resolved", "INVALID_SHIFT_COST", cardDef);
        }

        const costValidation = validateBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer as PlayerId,
          },
          getShiftPlayCardBasicCost(cardDef, costReduction),
        );
        if (!costValidation.valid) {
          return fail(
            costValidation.error ?? "Failed to validate shift cost",
            costValidation.errorCode ?? "INVALID_SHIFT_COST",
            cardDef,
          );
        }

        if (isPreflight && !shiftTarget) {
          break;
        }
        if (!shiftTarget) {
          return fail("Invalid Shift target", "INVALID_SHIFT_TARGET", cardDef);
        }

        const shiftCandidates = resolveShiftTargetCandidates(
          shiftRules,
          myCharactersInPlay,
          (candidateId) => getCardDefinitionFromContext(ctx, candidateId),
        );
        if (!shiftCandidates.includes(shiftTarget)) {
          return fail("Invalid Shift target", "INVALID_SHIFT_TARGET", cardDef);
        }
        break;
      }

      case "sing": {
        const singer = "singer" in params ? params.singer : undefined;
        if (!isSongCard(cardDef)) {
          return fail("Can only sing song cards", "NOT_A_SONG", cardDef);
        }
        if (isPreflight && !singer) {
          break;
        }
        if (!singer) {
          return fail("Singer not in play", "SINGER_NOT_IN_PLAY", cardDef);
        }
        if (!myCharactersInPlay.includes(singer)) {
          return fail("Singer not in play", "SINGER_NOT_IN_PLAY", cardDef);
        }

        const singerDef = getCardDefinitionFromContext(ctx, singer);
        if (singerDef?.cardType !== "character") {
          return fail("Singer must be a character", "INVALID_SINGER", cardDef);
        }

        const costValidation = validateBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer as PlayerId,
          },
          getSingPlayCardBasicCost(singer, singerDef),
        );
        if (!costValidation.valid) {
          return fail(
            costValidation.error ?? "Failed to validate sing cost",
            costValidation.errorCode ?? "INVALID_SING_COST",
            cardDef,
          );
        }

        const singerThreshold = getSingerThresholdForInstance({
          framework: ctx.framework,
          singerId: singer,
          singerDef,
          getDefinitionByInstanceId: (cardId) => getCardDefinitionFromContext(ctx, cardId),
        });
        if (singerThreshold == null || singerThreshold < cardDef.cost) {
          return fail(
            `Singer threshold ${singerThreshold ?? 0} is below song cost ${cardDef.cost}`,
            "INSUFFICIENT_SINGER_THRESHOLD",
            cardDef,
          );
        }
        break;
      }

      case "singTogether": {
        const singers = "singers" in params ? params.singers : [];
        if (!isSongCard(cardDef)) {
          return fail("Can only sing song cards", "NOT_A_SONG", cardDef);
        }

        const singTogetherThreshold = getSingTogetherThreshold(cardDef);
        if (singTogetherThreshold == null) {
          return fail("Song does not have Sing Together", "NOT_SING_TOGETHER_SONG", cardDef);
        }

        if (isPreflight && (!Array.isArray(singers) || singers.length === 0)) {
          break;
        }
        if (!Array.isArray(singers)) {
          return fail("At least one singer is required", "NO_SINGERS_SELECTED", cardDef);
        }

        if (singers.length === 0) {
          return fail("At least one singer is required", "NO_SINGERS_SELECTED", cardDef);
        }

        const uniqueSingers = new Set(singers);
        if (uniqueSingers.size !== singers.length) {
          return fail("Singers must be unique", "DUPLICATE_SINGERS", cardDef);
        }

        let totalSingerThreshold = 0;
        for (const singer of singers) {
          if (!myCharactersInPlay.includes(singer)) {
            return fail(`Singer ${singer} not in play`, "SINGER_NOT_IN_PLAY", cardDef);
          }

          const singerDef = getCardDefinitionFromContext(ctx, singer);
          if (singerDef?.cardType !== "character") {
            return fail(`Singer ${singer} is not a character`, "INVALID_SINGER", cardDef);
          }

          const singerThreshold = getSingerThresholdForInstance({
            framework: ctx.framework,
            singerId: singer,
            singerDef,
            getDefinitionByInstanceId: (cardId) => getCardDefinitionFromContext(ctx, cardId),
          });
          if (singerThreshold == null) {
            return fail(`Singer ${singer} has no sing threshold`, "INVALID_SINGER", cardDef);
          }

          totalSingerThreshold += singerThreshold;
        }

        const costValidation = validateBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer as PlayerId,
          },
          getSingTogetherPlayCardBasicCost(singers, (cardId) =>
            getCardDefinitionFromContext(ctx, cardId),
          ),
        );
        if (!costValidation.valid) {
          return fail(
            costValidation.error ?? "Failed to validate singTogether cost",
            costValidation.errorCode ?? "INVALID_SING_TOGETHER_COST",
            cardDef,
          );
        }

        if (totalSingerThreshold < singTogetherThreshold) {
          return fail(
            `Singers total ${totalSingerThreshold} but require ${singTogetherThreshold}`,
            "INSUFFICIENT_SING_TOGETHER_TOTAL",
            cardDef,
          );
        }
        break;
      }

      case "free":
        if (reducedCardCost > 0) {
          return fail(
            "Card cannot currently be played for free",
            "FREE_PLAY_NOT_AVAILABLE",
            cardDef,
          );
        }
        break;
    }

    if (cardDef.cardType === "action") {
      if (
        params.preventAutoResolveTriggeredEffects !== undefined &&
        typeof params.preventAutoResolveTriggeredEffects !== "boolean"
      ) {
        return fail(
          "preventAutoResolveTriggeredEffects must be a boolean when provided",
          "INVALID_AUTO_RESOLVE_TRIGGERED_EFFECTS",
          cardDef,
        );
      }

      if (params.amount !== undefined) {
        if (!isValidActionResolutionAmount(params.amount)) {
          return fail(
            "Action amount must be a valid Amount value",
            "INVALID_ACTION_AMOUNT",
            cardDef,
          );
        }
      }

      if (params.namedCard !== undefined) {
        if (typeof params.namedCard !== "string" || params.namedCard.trim().length === 0) {
          return fail(
            "namedCard must be a non-empty string when provided",
            "INVALID_NAMED_CARD",
            cardDef,
          );
        }
      }

      if (params.resolveOptional !== undefined && typeof params.resolveOptional !== "boolean") {
        return fail(
          "resolveOptional must be a boolean when provided",
          "INVALID_OPTIONAL_SELECTION",
          cardDef,
        );
      }

      if (params.choiceIndex !== undefined) {
        if (
          typeof params.choiceIndex !== "number" ||
          !Number.isInteger(params.choiceIndex) ||
          params.choiceIndex < 0
        ) {
          return fail(
            "choiceIndex must be a non-negative integer when provided",
            "INVALID_CHOICE_INDEX",
            cardDef,
          );
        }
      }

      if (params.destinations !== undefined) {
        if (!Array.isArray(params.destinations)) {
          return fail(
            "destinations must be an array when provided",
            "INVALID_ACTION_DESTINATIONS",
            cardDef,
          );
        }

        const hasInvalidDestination = params.destinations.some((destination) => {
          if (!destination || typeof destination !== "object" || Array.isArray(destination)) {
            return true;
          }

          const destinationRecord = destination as Record<string, unknown>;
          const cards = destinationRecord.cards;
          const zone = destinationRecord.zone;
          if (typeof zone !== "string" || zone.length === 0) {
            return true;
          }

          if (typeof cards === "string") {
            return false;
          }

          return !(
            Array.isArray(cards) &&
            cards.length > 0 &&
            cards.every((cardId) => typeof cardId === "string")
          );
        });

        if (hasInvalidDestination) {
          return fail(
            "Each destination must include a zone and at least one card id",
            "INVALID_ACTION_DESTINATIONS",
            cardDef,
          );
        }
      }

      if (params.targets !== undefined) {
        const actionEffects = (cardDef.abilities ?? []).filter(
          (ability) => ability.type === "action",
        );
        const combinedAnalysis = actionEffects.reduce(
          (currentAnalysis, ability) => {
            const analysis = analyzeEffectTargets(
              ability.effect,
              currentPlayer as PlayerId,
              ctx,
              cardId as CardInstanceId,
            );
            return {
              cardCandidates: [
                ...new Set([...currentAnalysis.cardCandidates, ...analysis.cardCandidates]),
              ],
              playerCandidates: [
                ...new Set([...currentAnalysis.playerCandidates, ...analysis.playerCandidates]),
              ],
              allowedZones: [
                ...new Set([...currentAnalysis.allowedZones, ...analysis.allowedZones]),
              ],
              minSelections: Math.max(currentAnalysis.minSelections, analysis.minSelections),
              maxSelections: Math.max(currentAnalysis.maxSelections, analysis.maxSelections),
              requiresExplicitSelection:
                currentAnalysis.requiresExplicitSelection || analysis.requiresExplicitSelection,
              allowsDeferredResolutionWithoutInitialSelection:
                currentAnalysis.allowsDeferredResolutionWithoutInitialSelection ||
                analysis.allowsDeferredResolutionWithoutInitialSelection,
            };
          },
          {
            cardCandidates: [] as CardInstanceId[],
            playerCandidates: [] as PlayerId[],
            allowedZones: [] as ActionSelectionZone[],
            minSelections: 0,
            maxSelections: 0,
            requiresExplicitSelection: false,
            allowsDeferredResolutionWithoutInitialSelection: false,
          },
        );

        const selectionValidation = validateAndNormalizeTargetSelection(
          params.targets,
          combinedAnalysis,
          {
            currentPlayer: currentPlayer as PlayerId,
            ctx,
          },
        );
        if (!selectionValidation.valid) {
          return fail(
            selectionValidation.error ?? "Action target selection is invalid",
            selectionValidation.errorCode ?? "INVALID_ACTION_TARGETS",
            cardDef,
          );
        }
      }
    } else if (params.preventAutoResolveTriggeredEffects !== undefined) {
      return fail(
        "preventAutoResolveTriggeredEffects is only supported when playing an action",
        "INVALID_AUTO_RESOLVE_TRIGGERED_EFFECTS",
        cardDef,
      );
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const params = ctx.args;
    const { cardId, cost } = params;
    const currentPlayer = ctx.framework.state.currentPlayer! as PlayerId;
    const cardDef = ctx.cards.require(cardId).definition as LorcanaCard;
    const cardName = formatLorcanaCardName(cardDef) ?? "Unknown Card";
    const currentTurn = ctx.framework.state.ctx.status.turn ?? 1;
    const costReduction = computeCostReduction(
      ctx,
      ctx.G.turnMetadata,
      currentPlayer,
      cardId,
      cardDef,
      currentTurn,
    );

    let inkPaid = 0;
    let shiftTargetId: CardInstanceId | undefined;
    let singerIds: CardInstanceId[] | undefined;

    traceLorcanaRuntimeStep({
      kind: "move.execution.started",
      moveId: "playCard",
      playerId: currentPlayer,
      cardId,
      cardName,
      message: `${formatLorcanaPlayerLabel(currentPlayer)} executes move: playCard`,
      payload: {
        cost,
      },
    });

    // Costs are paid before the card changes zones.
    switch (cost) {
      case "standard": {
        const payResult = payBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer,
          },
          getStandardPlayCardBasicCost(cardDef, costReduction),
        );
        if (!payResult.success) {
          throw new Error(`Failed to pay play cost: ${payResult.error} (${payResult.errorCode})`);
        }
        inkPaid = payResult.inkPaid;
        break;
      }

      case "shift": {
        shiftTargetId = params.shiftTarget;
        const shiftRules = getShiftRules(cardDef);
        if (!shiftRules || shiftRules.unsupportedReason || typeof shiftRules.inkCost !== "number") {
          throw new Error(
            shiftRules?.unsupportedReason ??
              "Shift execution requires a supported ink-only Shift cost",
          );
        }
        const payResult = payBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer,
          },
          getShiftPlayCardBasicCost(cardDef, costReduction),
        );
        if (!payResult.success) {
          throw new Error(`Failed to pay play cost: ${payResult.error} (${payResult.errorCode})`);
        }
        inkPaid = payResult.inkPaid;
        break;
      }

      case "sing": {
        singerIds = [params.singer];
        const singerDef = ctx.cards.require(params.singer).definition as LorcanaCard | undefined;
        const payResult = payBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer,
          },
          getSingPlayCardBasicCost(params.singer, singerDef),
        );
        if (!payResult.success) {
          throw new Error(`Failed to pay play cost: ${payResult.error} (${payResult.errorCode})`);
        }
        break;
      }

      case "singTogether": {
        singerIds = [...params.singers];
        const payResult = payBasicCost(
          {
            framework: ctx.framework,
            cards: ctx.cards,
            playerId: currentPlayer,
          },
          getSingTogetherPlayCardBasicCost(
            params.singers,
            (cardId) => ctx.cards.require(cardId).definition as LorcanaCard | undefined,
          ),
        );
        if (!payResult.success) {
          throw new Error(`Failed to pay play cost: ${payResult.error} (${payResult.errorCode})`);
        }
        break;
      }

      case "free":
        break;
    }

    tracePlayCardCostSelection(ctx, cost, cardDef, { shiftTargetId, singerIds });

    if (cost === "standard" || cost === "shift") {
      consumeAppliedCostReductions(
        ctx.G.turnMetadata,
        currentPlayer,
        costReduction.consumeIndexes,
        currentTurn,
      );
    }

    const cardPlayedPayload: CardPlayedPayload = {
      playerId: currentPlayer,
      cardId,
      cardType: cardDef.cardType,
      costType: cost,
      ...(cost === "shift" ? { shiftTargetId: params.shiftTarget, usedShift: true } : {}),
      ...(singerIds ? { singerIds } : {}),
      ...(cost === "standard" || cost === "shift" ? { inkPaid } : {}),
    };

    // Cards are always played into play first.
    ctx.framework.zones.moveCard(cardId, { zone: "play", playerId: currentPlayer });
    traceLorcanaRuntimeStep({
      kind: "card.played",
      moveId: "playCard",
      playerId: currentPlayer,
      cardId,
      cardName,
      message: `Card is played: ${cardName}`,
      payload: {
        cardType: cardDef.cardType,
        costType: cost,
      },
    });
    ctx.framework.log({
      category: "action",
      visibility: { mode: "PUBLIC" },
      defaultMessage: createLorcanaLogMessage("lorcana.move.playCard", {
        playerId: currentPlayer,
        cardId,
      }),
    });

    if (cardDef.cardType === "action") {
      const actionEffects = (cardDef.abilities ?? []).filter(
        (ability) => ability.type === "action",
      );
      const combinedAnalysis = actionEffects.reduce(
        (currentAnalysis, ability) => {
          const analysis = analyzeEffectTargets(
            ability.effect,
            currentPlayer,
            ctx,
            cardId as CardInstanceId,
          );
          return {
            cardCandidates: [
              ...new Set([...currentAnalysis.cardCandidates, ...analysis.cardCandidates]),
            ],
            playerCandidates: [
              ...new Set([...currentAnalysis.playerCandidates, ...analysis.playerCandidates]),
            ],
            allowedZones: [...new Set([...currentAnalysis.allowedZones, ...analysis.allowedZones])],
            minSelections: Math.max(currentAnalysis.minSelections, analysis.minSelections),
            maxSelections: Math.max(currentAnalysis.maxSelections, analysis.maxSelections),
            requiresExplicitSelection:
              currentAnalysis.requiresExplicitSelection || analysis.requiresExplicitSelection,
            allowsDeferredResolutionWithoutInitialSelection:
              currentAnalysis.allowsDeferredResolutionWithoutInitialSelection ||
              analysis.allowsDeferredResolutionWithoutInitialSelection,
          };
        },
        {
          cardCandidates: [] as CardInstanceId[],
          playerCandidates: [] as PlayerId[],
          allowedZones: [] as ActionSelectionZone[],
          minSelections: 0,
          maxSelections: 0,
          requiresExplicitSelection: false,
          allowsDeferredResolutionWithoutInitialSelection: false,
        },
      );
      const normalizedSelection = validateAndNormalizeTargetSelection(
        params.targets,
        combinedAnalysis,
        {
          currentPlayer,
          ctx,
        },
      );
      if (!normalizedSelection.valid) {
        throw new Error(
          `Invalid action targets: ${normalizedSelection.error} (${normalizedSelection.errorCode})`,
        );
      }
      const actionDestinations = Array.isArray(params.destinations)
        ? params.destinations.map((destination) => ({
            cards: Array.isArray(destination.cards) ? [...destination.cards] : destination.cards,
            zone: destination.zone,
          }))
        : undefined;
      emitTriggeredLorcanaEvent(ctx, "cardPlayed", cardPlayedPayload, {
        event: "play",
        playerId: currentPlayer,
        subjectCardId: cardId,
      });
      if (singerIds) {
        singerIds.forEach((singerId) =>
          emitTriggeredLorcanaEvent(ctx, "cardPlayed", cardPlayedPayload, {
            event: "sing",
            playerId: currentPlayer,
            subjectCardId: singerId,
            triggerSourceCardId: cardId,
          }),
        );
      }
      traceLorcanaRuntimeStep({
        kind: "effect.resolution.started",
        moveId: "playCard",
        playerId: currentPlayer,
        cardId,
        cardName,
        message: isSongCard(cardDef)
          ? "Song effect begins resolution"
          : "Action effect begins resolution",
      });
      resolveActionCardEffects(ctx, cardPlayedPayload, cardDef, {
        targets: flattenNormalizedTargetSelection(normalizedSelection.selection),
        amount: params.amount as ActionResolutionInput["amount"],
        namedCard: typeof params.namedCard === "string" ? params.namedCard.trim() : undefined,
        choiceIndex: params.choiceIndex,
        preventAutoResolveTriggeredEffects:
          params.preventAutoResolveTriggeredEffects === true ? true : undefined,
        destinations: actionDestinations,
        eventSnapshot: {
          ...params.eventSnapshot,
          autoExertBodyguardOnNestedPlay: params.resolveOptional === true,
        },
        resolveOptional: params.resolveOptional,
      });
      if (hasPendingActionEffectResolution(ctx)) {
        traceLorcanaRuntimeStep({
          kind: "effect.resolution.suspended",
          moveId: "playCard",
          playerId: currentPlayer,
          cardId,
          cardName,
          message: "Action effect is waiting for further resolution",
        });
        moveSuspendedActionCardToLimbo(ctx, cardPlayedPayload);
      } else {
        traceLorcanaRuntimeStep({
          kind: "effect.resolution.completed",
          moveId: "playCard",
          playerId: currentPlayer,
          cardId,
          cardName,
          message: isSongCard(cardDef)
            ? "Song resolution completes"
            : "Action resolution completes",
        });
        finalizeResolvedActionCard(ctx, cardPlayedPayload);
        traceLorcanaRuntimeStep({
          kind: "card.moved",
          moveId: "playCard",
          playerId: currentPlayer,
          cardId,
          cardName,
          message: "Card is moved to discard",
          payload: {
            toZone: "discard",
          },
        });
        flushTriggeredEventsToBag(ctx);
      }
    } else if (cost === "shift") {
      const targetMeta = shiftTargetId ? ctx.cards.require(shiftTargetId).meta : undefined;

      attachShiftStack(ctx, cardId, params.shiftTarget, currentPlayer, targetMeta);
      const shiftedMeta = ctx.cards.require(cardId).meta;
      const entersWithDamage = getEntersWithDamageAmount(cardDef);
      const entersExerted =
        entersPlayExerted(cardDef) || (hasBodyguard(cardDef) && params.resolveOptional === true);
      ctx.cards.setMeta(cardId, {
        ...shiftedMeta,
        state: entersExerted ? "exerted" : shiftedMeta?.state,
        damage: Number(shiftedMeta?.damage ?? 0) + entersWithDamage,
        playedViaShift: true,
        playedCostType: "shift",
      });
    } else if (cardDef.cardType === "character") {
      const entersWithDamage = getEntersWithDamageAmount(cardDef);
      const entersExerted =
        entersPlayExerted(cardDef) || (hasBodyguard(cardDef) && params.resolveOptional === true);
      ctx.cards.setMeta(cardId, {
        state: entersExerted ? "exerted" : "ready",
        damage: entersWithDamage,
        isDrying: true,
        publicFaceState: undefined,
        atLocationId: undefined,
        cardsUnder: undefined,
        stackParentId: undefined,
        playedViaShift: false,
        playedCostType: cost,
      });
    } else {
      ctx.cards.setMeta(cardId, {
        state: entersPlayExerted(cardDef) ? "exerted" : undefined,
        damage: undefined,
        isDrying: undefined,
        publicFaceState: undefined,
        atLocationId: undefined,
        cardsUnder: undefined,
        stackParentId: undefined,
        playedViaShift: false,
        playedCostType: cost,
      });
    }

    ctx.G.turnMetadata.cardsPlayedThisTurn.push(cardId as CardInstanceId);
    if (cost === "shift") {
      ctx.G.turnMetadata.shiftPlayedThisTurn.push(cardId as CardInstanceId);
    }

    if (cardDef.cardType !== "action") {
      emitTriggeredLorcanaEvent(ctx, "cardPlayed", cardPlayedPayload, {
        event: "play",
        playerId: currentPlayer,
        subjectCardId: cardId,
      });
      if (singerIds) {
        singerIds.forEach((singerId) =>
          emitTriggeredLorcanaEvent(ctx, "cardPlayed", cardPlayedPayload, {
            event: "sing",
            playerId: currentPlayer,
            subjectCardId: singerId,
            triggerSourceCardId: cardId,
          }),
        );
      }
      flushTriggeredEventsToBag(ctx);
    }

    traceLorcanaRuntimeStep({
      kind: "move.execution.completed",
      moveId: "playCard",
      playerId: currentPlayer,
      cardId,
      cardName,
      message: "Move completes: playCard",
    });
  },

  available: (ctx) => {
    if (hasPendingActionEffectResolution(ctx) || hasPendingBagItems(ctx)) {
      return false;
    }

    const handCards = ctx.framework.zones.getCards({ zone: "hand", playerId: ctx.playerId });
    const availableInk = getAvailableInk(ctx, ctx.playerId as PlayerId);
    const playCards = ctx.framework.zones.getCards({ zone: "play", playerId: ctx.playerId });

    const myCharactersInPlay = getControlledCharactersInPlay(playCards, (instanceId) =>
      getCardDefinitionForEnumeration(instanceId, ctx),
    );

    const readySingers = myCharactersInPlay.filter((cardId) =>
      isReadyAndNotDrying(ctx.cards.require(cardId).meta),
    );

    for (const handCardId of handCards) {
      const cardDef = getCardDefinitionForEnumeration(handCardId, ctx);
      if (!cardDef) {
        continue;
      }

      const currentTurn = ctx.framework.state.ctx.status.turn ?? 1;
      const costReduction = computeCostReduction(
        ctx,
        ctx.G.turnMetadata,
        ctx.playerId as PlayerId,
        handCardId as CardInstanceId,
        cardDef,
        currentTurn,
      );
      const reducedCardCost = Math.max(0, cardDef.cost - costReduction.reductionAmount);

      if (reducedCardCost === 0 || availableInk >= reducedCardCost) {
        return true;
      }

      const shiftRules = getShiftRules(cardDef);
      if (
        shiftRules &&
        !shiftRules.unsupportedReason &&
        typeof shiftRules.inkCost === "number" &&
        availableInk >= Math.max(0, shiftRules.inkCost - costReduction.reductionAmount)
      ) {
        const shiftCandidates = resolveShiftTargetCandidates(
          shiftRules,
          myCharactersInPlay,
          (candidateId) => getCardDefinitionForEnumeration(candidateId, ctx),
        );
        if (shiftCandidates.length > 0) {
          return true;
        }
      }

      if (!isSongCard(cardDef)) {
        continue;
      }

      const singCandidates = readySingers.filter((candidateId) => {
        const singerDef = getCardDefinitionForEnumeration(candidateId, ctx);
        const singerThreshold = getSingerThresholdForInstance({
          framework: ctx.framework,
          singerId: candidateId,
          singerDef,
          getDefinitionByInstanceId: (cardId) => getCardDefinitionForEnumeration(cardId, ctx),
        });
        return singerThreshold != null && singerThreshold >= cardDef.cost;
      });

      if (singCandidates.length > 0) {
        return true;
      }

      const singTogetherThreshold = getSingTogetherThreshold(cardDef);
      if (singTogetherThreshold != null && readySingers.length > 0) {
        return true;
      }
    }

    return false;
  },
};
