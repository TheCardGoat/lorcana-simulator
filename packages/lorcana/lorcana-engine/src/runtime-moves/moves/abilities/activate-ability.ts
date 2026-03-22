import type { CardInstanceId, PlayerId, RuntimeValidationResult } from "#core";
import type {
  ActivatedAbilityDefinition,
  LorcanaCard,
  LorcanaCardMeta,
  LorcanaMoveDefinition,
} from "../../../types";
import { createLorcanaLogMessage } from "../../../types";
import {
  analyzeEffectTargets,
  analyzeTargetSelectionAvailabilityFromAnalysis,
  flattenNormalizedTargetSelection,
  validateAndNormalizeTargetSelection,
} from "../../../targeting/runtime";
import { moveCardOutOfPlayWithStack } from "../../state/shift-stack";
import {
  EFFECT_PENDING_ERROR_CODE,
  hasPendingActionEffectResolution,
} from "../../resolution/action-effects/pending-action-effects";
import { resolveActionEffect } from "../../resolution/action-effects/composed-effect-resolver";
import type { ActionResolutionInput } from "../../resolution/action-effects/types";
import { payBasicCost, validateBasicCost } from "../../rules/play-card-rules";
import {
  emitTriggeredLorcanaEvent,
  flushTriggeredEventsToBag,
  hasPendingBagItems,
  queueTriggeredEvent,
  snapshotTriggeredCandidatesForCard,
} from "../../effects/triggered-abilities";
import { emitBeChosenEvents } from "../../effects/be-chosen";
import { recordBanishedCharacterThisTurn } from "../../state/turn-metrics";
import { getGrantedActivatedAbilities } from "../../rules/static-ability-utils";
import { getKeywordsBeforeBanish } from "../../shared/banish-snapshot";
import {
  evaluateCondition,
  type ConditionEvaluationContext,
} from "../../../rules/condition-evaluator";

type ActivatedAbilityValidationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"activateAbility">["validate"]>
>[0];
type ActivatedAbilityReadableContext =
  | ActivatedAbilityValidationContext
  | Parameters<LorcanaMoveDefinition<"activateAbility">["execute"]>[0];

function getCardDefinitionFromContext(
  ctx: {
    cards: {
      getDefinition: (cardId: string) => unknown;
    };
  },
  cardId: string,
): LorcanaCard | undefined {
  return ctx.cards.getDefinition(cardId) as LorcanaCard | undefined;
}

function getControlledCardsInPlay(
  ctx: ActivatedAbilityReadableContext,
  playerId: PlayerId,
): readonly string[] {
  return ctx.framework.zones.getCards({ zone: "play", playerId });
}

function getActivatedAbilitiesForCard(
  ctx: ActivatedAbilityReadableContext,
  cardId: CardInstanceId,
  cardDef: LorcanaCard,
): ActivatedAbilityDefinition[] {
  const printedAbilities = (cardDef.abilities ?? []).filter(
    (ability): ability is ActivatedAbilityDefinition => ability.type === "activated",
  );
  const grantedAbilities = getGrantedActivatedAbilities({
    state: ctx.framework.state,
    cardId,
    getDefinitionByInstanceId: (instanceId) => getCardDefinitionFromContext(ctx, instanceId),
  }).map((entry) => entry.ability);

  return [...printedAbilities, ...grantedAbilities];
}

function getActivatedAbilityByIndex(
  ctx: ActivatedAbilityReadableContext,
  cardId: CardInstanceId,
  cardDef: LorcanaCard,
  abilityIndex: number | undefined,
): ActivatedAbilityDefinition | undefined {
  if (!Number.isInteger(abilityIndex) || abilityIndex === undefined || abilityIndex < 0) {
    return undefined;
  }

  return getActivatedAbilitiesForCard(ctx, cardId, cardDef)[abilityIndex];
}

function getUsesPerTurn(ability: ActivatedAbilityDefinition): number | undefined {
  const rawUsesPerTurn = (ability as { usesPerTurn?: unknown }).usesPerTurn;
  if (typeof rawUsesPerTurn === "number" && Number.isFinite(rawUsesPerTurn)) {
    return rawUsesPerTurn;
  }
  const restrictions = (ability as { restrictions?: readonly { type: string }[] }).restrictions;
  if (restrictions?.some((r) => r.type === "once-per-turn")) {
    return 1;
  }
  return undefined;
}

function getAbilityUsageCount(
  meta: LorcanaCardMeta | undefined,
  abilityId: string,
  currentTurn: number,
): number {
  const recordedTurn = meta?.activatedAbilityUseTurns?.[abilityId];
  if (recordedTurn !== currentTurn) {
    return 0;
  }

  return meta?.activatedAbilityUses?.[abilityId] ?? 0;
}

function createFailure(
  error: string,
  errorCode: string,
): Extract<RuntimeValidationResult, { valid: false }> {
  return {
    valid: false,
    error,
    errorCode,
  };
}

function getRequestedExertCharacterCosts(ctx: ActivatedAbilityReadableContext): CardInstanceId[] {
  const requestedCosts = ctx.args.costs?.exertCharacters;
  if (!Array.isArray(requestedCosts)) {
    return [];
  }

  return requestedCosts.filter((cardId): cardId is CardInstanceId => typeof cardId === "string");
}

function getRequestedExertItemCosts(ctx: ActivatedAbilityReadableContext): CardInstanceId[] {
  const requestedCosts = ctx.args.costs?.exertItems;
  if (!Array.isArray(requestedCosts)) {
    return [];
  }

  return requestedCosts.filter((cardId): cardId is CardInstanceId => typeof cardId === "string");
}

function getRequiredExertItemCostCount(ability: ActivatedAbilityDefinition): number {
  const cost = ability.cost ?? {};
  if (typeof cost.exertItems === "number" && Number.isFinite(cost.exertItems)) {
    return Math.max(0, Math.floor(cost.exertItems));
  }
  return 0;
}

function getEligibleExertItemCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
): CardInstanceId[] {
  return getControlledCardsInPlay(ctx, currentPlayer).filter((cardId) => {
    const definition = getCardDefinitionFromContext(ctx, cardId);
    if (!definition || definition.cardType !== "item") {
      return false;
    }
    const cardMeta = ctx.cards.require(cardId).meta as LorcanaCardMeta | undefined;
    return cardMeta?.state !== "exerted";
  }) as CardInstanceId[];
}

function validateExertItemCostSelections(
  ctx: ActivatedAbilityValidationContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): RuntimeValidationResult {
  const requiredCount = getRequiredExertItemCostCount(ability);
  const requestedCosts = getRequestedExertItemCosts(ctx);

  if (requiredCount === 0) {
    if (requestedCosts.length > 0) {
      return createFailure(
        "Ability does not use exerted item costs",
        "ABILITY_COST_SELECTION_UNEXPECTED",
      );
    }
    return { valid: true };
  }

  const eligibleCosts = getEligibleExertItemCostCards(ctx, currentPlayer);
  if (eligibleCosts.length < requiredCount) {
    return createFailure(
      "Not enough eligible items in play to pay the exert cost",
      "ABILITY_COST_SELECTION_UNAVAILABLE",
    );
  }

  if (requestedCosts.length === 0) {
    if (eligibleCosts.length > requiredCount) {
      return createFailure(
        `Ability requires ${requiredCount} exert item cost selection${requiredCount === 1 ? "" : "s"}`,
        "ABILITY_COST_SELECTION_MISSING",
      );
    }
    return { valid: true };
  }

  if (requestedCosts.length !== requiredCount) {
    return createFailure(
      `Ability requires ${requiredCount} exert item cost selection${requiredCount === 1 ? "" : "s"}`,
      "ABILITY_COST_SELECTION_MISMATCH",
    );
  }

  if (new Set(requestedCosts).size !== requestedCosts.length) {
    return createFailure("Exerted item costs must be unique", "ABILITY_COST_SELECTION_DUPLICATE");
  }

  const eligibleSet = new Set(eligibleCosts);
  for (const cardId of requestedCosts) {
    if (!eligibleSet.has(cardId)) {
      return createFailure(
        "Exerted item cost must be one of your ready items in play",
        "ABILITY_COST_CARD_INVALID",
      );
    }
  }

  return { valid: true };
}

function resolveExertItemCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): CardInstanceId[] {
  const requestedCosts = getRequestedExertItemCosts(ctx);
  if (requestedCosts.length > 0) {
    return requestedCosts;
  }

  const requiredCount = getRequiredExertItemCostCount(ability);
  if (requiredCount === 0) {
    return [];
  }

  return getEligibleExertItemCostCards(ctx, currentPlayer).slice(0, requiredCount);
}

function getRequestedBanishItemCosts(ctx: ActivatedAbilityReadableContext): CardInstanceId[] {
  const requestedCosts = ctx.args.costs?.banishItems;
  if (!Array.isArray(requestedCosts)) {
    return [];
  }

  return requestedCosts.filter((cardId): cardId is CardInstanceId => typeof cardId === "string");
}

function getRequestedBanishCharacterCosts(ctx: ActivatedAbilityReadableContext): CardInstanceId[] {
  const requestedCosts = ctx.args.costs?.banishCharacters;
  if (!Array.isArray(requestedCosts)) {
    return [];
  }

  return requestedCosts.filter((cardId): cardId is CardInstanceId => typeof cardId === "string");
}

function getRequiredExertCharacterCostCount(ability: ActivatedAbilityDefinition): number {
  const cost = ability.cost ?? {};
  if (typeof cost.exertCharacters === "number" && Number.isFinite(cost.exertCharacters)) {
    return Math.max(0, Math.floor(cost.exertCharacters));
  }

  return cost.exertCharacter ? 1 : 0;
}

function getRequiredBanishItemCostCount(ability: ActivatedAbilityDefinition): number {
  const banishItem = ability.cost?.banishItem;
  if (typeof banishItem === "number") {
    return Math.max(0, Math.floor(banishItem));
  }
  return banishItem ? 1 : 0;
}

function getRequiredBanishCharacterCostCount(ability: ActivatedAbilityDefinition): number {
  return ability.cost?.banishCharacter ? 1 : 0;
}

function getRequestedDiscardCardCosts(ctx: ActivatedAbilityReadableContext): CardInstanceId[] {
  const requestedCosts = ctx.args.costs?.discardCards;
  if (!Array.isArray(requestedCosts)) {
    return [];
  }

  return requestedCosts.filter((cardId): cardId is CardInstanceId => typeof cardId === "string");
}

function getEligibleBanishItemCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
): CardInstanceId[] {
  return getControlledCardsInPlay(ctx, currentPlayer).filter((cardId) => {
    const definition = getCardDefinitionFromContext(ctx, cardId);
    return definition?.cardType === "item";
  }) as CardInstanceId[];
}

function getEligibleBanishCharacterCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
  sourceCardId?: CardInstanceId,
): CardInstanceId[] {
  return getControlledCardsInPlay(ctx, currentPlayer).filter((cardId) => {
    if (
      ability.cost?.banishCharacterTarget === "another" &&
      sourceCardId &&
      cardId === sourceCardId
    ) {
      return false;
    }
    const definition = getCardDefinitionFromContext(ctx, cardId);
    return definition?.cardType === "character";
  }) as CardInstanceId[];
}

function resolveBanishItemCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): CardInstanceId[] {
  const requestedCosts = getRequestedBanishItemCosts(ctx);
  if (requestedCosts.length > 0) {
    return requestedCosts;
  }

  const requiredCount = getRequiredBanishItemCostCount(ability);
  if (requiredCount === 0) {
    return [];
  }

  return getEligibleBanishItemCostCards(ctx, currentPlayer).slice(0, requiredCount);
}

function resolveBanishCharacterCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
  sourceCardId?: CardInstanceId,
): CardInstanceId[] {
  const requestedCosts = getRequestedBanishCharacterCosts(ctx);
  if (requestedCosts.length > 0) {
    return requestedCosts;
  }

  const requiredCount = getRequiredBanishCharacterCostCount(ability);
  if (requiredCount === 0) {
    return [];
  }

  return getEligibleBanishCharacterCostCards(ctx, currentPlayer, ability, sourceCardId).slice(
    0,
    requiredCount,
  );
}

function getRequiredDiscardCardCostCount(ability: ActivatedAbilityDefinition): number {
  const cost = ability.cost ?? {};
  const rawCount =
    typeof cost.discardCards === "number"
      ? cost.discardCards
      : typeof cost.discardCard === "number"
        ? cost.discardCard
        : typeof cost.discard?.amount === "number"
          ? cost.discard.amount
          : 0;

  return Number.isFinite(rawCount) && rawCount > 0 ? Math.floor(rawCount) : 0;
}

function getDiscardCardTypeRequirement(
  ability: ActivatedAbilityDefinition,
): "character" | "item" | "location" | "action" | "song" | undefined {
  const cost = ability.cost ?? {};
  const discardCardType =
    typeof cost.discardCardType === "string"
      ? cost.discardCardType
      : typeof cost.discard?.cardType === "string"
        ? cost.discard.cardType
        : undefined;

  return discardCardType === "song" ||
    discardCardType === "character" ||
    discardCardType === "item" ||
    discardCardType === "location" ||
    discardCardType === "action"
    ? discardCardType
    : undefined;
}

function getDiscardCardNameRequirement(ability: ActivatedAbilityDefinition): string | undefined {
  const discardCardName = ability.cost?.discardCardName;
  return typeof discardCardName === "string" && discardCardName.length > 0
    ? discardCardName
    : undefined;
}

function matchesDiscardCostRequirements(
  definition: LorcanaCard | undefined,
  ability: ActivatedAbilityDefinition,
): boolean {
  if (!definition) {
    return false;
  }

  const requiredCardType = getDiscardCardTypeRequirement(ability);
  if (requiredCardType === "song") {
    if (
      definition.cardType !== "action" ||
      (definition as { actionSubtype?: unknown }).actionSubtype !== "song"
    ) {
      return false;
    }
  } else if (requiredCardType && definition.cardType !== requiredCardType) {
    return false;
  }

  const requiredName = getDiscardCardNameRequirement(ability);
  if (requiredName && definition.name !== requiredName) {
    return false;
  }

  return true;
}

function getEligibleDiscardCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): CardInstanceId[] {
  return (
    ctx.framework.zones.getCards({
      zone: "hand",
      playerId: currentPlayer,
    }) as CardInstanceId[]
  ).filter((cardId) =>
    matchesDiscardCostRequirements(getCardDefinitionFromContext(ctx, cardId), ability),
  );
}

function resolveDiscardCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): CardInstanceId[] {
  const requestedCosts = getRequestedDiscardCardCosts(ctx);
  if (requestedCosts.length > 0) {
    return requestedCosts;
  }

  const requiredCount = getRequiredDiscardCardCostCount(ability);
  if (requiredCount === 0) {
    return [];
  }

  return getEligibleDiscardCostCards(ctx, currentPlayer, ability).slice(0, requiredCount);
}

function validateBanishItemCostSelections(
  ctx: ActivatedAbilityValidationContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): RuntimeValidationResult {
  const requiredCount = getRequiredBanishItemCostCount(ability);
  const requestedCosts = getRequestedBanishItemCosts(ctx);

  if (requiredCount === 0) {
    if (requestedCosts.length > 0) {
      return createFailure(
        "Ability does not use banished item costs",
        "ABILITY_COST_SELECTION_UNEXPECTED",
      );
    }

    return { valid: true };
  }

  const eligibleCosts = getEligibleBanishItemCostCards(ctx, currentPlayer);
  if (eligibleCosts.length < requiredCount) {
    return createFailure(
      "Not enough eligible items in play to pay the banish cost",
      "ABILITY_COST_SELECTION_UNAVAILABLE",
    );
  }

  if (requestedCosts.length === 0) {
    if (eligibleCosts.length > requiredCount) {
      return createFailure(
        `Ability requires ${requiredCount} banish item cost selection${requiredCount === 1 ? "" : "s"}`,
        "ABILITY_COST_SELECTION_MISSING",
      );
    }

    return { valid: true };
  }

  if (requestedCosts.length !== requiredCount) {
    return createFailure(
      `Ability requires ${requiredCount} banish item cost selection${requiredCount === 1 ? "" : "s"}`,
      "ABILITY_COST_SELECTION_MISMATCH",
    );
  }

  if (new Set(requestedCosts).size !== requestedCosts.length) {
    return createFailure("Banished item costs must be unique", "ABILITY_COST_SELECTION_DUPLICATE");
  }

  const eligibleSet = new Set(eligibleCosts);
  for (const cardId of requestedCosts) {
    if (!eligibleSet.has(cardId)) {
      return createFailure(
        "Banished item cost must be one of your items in play",
        "ABILITY_COST_CARD_INVALID",
      );
    }
  }

  return { valid: true };
}

function validateBanishCharacterCostSelections(
  ctx: ActivatedAbilityValidationContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
  sourceCardId?: CardInstanceId,
): RuntimeValidationResult {
  const requiredCount = getRequiredBanishCharacterCostCount(ability);
  const requestedCosts = getRequestedBanishCharacterCosts(ctx);

  if (requiredCount === 0) {
    if (requestedCosts.length > 0) {
      return createFailure(
        "Ability does not use banished character costs",
        "ABILITY_COST_SELECTION_UNEXPECTED",
      );
    }

    return { valid: true };
  }

  const eligibleCosts = getEligibleBanishCharacterCostCards(
    ctx,
    currentPlayer,
    ability,
    sourceCardId,
  );
  if (eligibleCosts.length < requiredCount) {
    return createFailure(
      "Not enough eligible characters in play to pay the banish cost",
      "ABILITY_COST_SELECTION_UNAVAILABLE",
    );
  }

  if (requestedCosts.length === 0) {
    if (eligibleCosts.length > requiredCount) {
      return createFailure(
        `Ability requires ${requiredCount} banish character cost selection${requiredCount === 1 ? "" : "s"}`,
        "ABILITY_COST_SELECTION_MISSING",
      );
    }

    return { valid: true };
  }

  if (requestedCosts.length !== requiredCount) {
    return createFailure(
      `Ability requires ${requiredCount} banish character cost selection${requiredCount === 1 ? "" : "s"}`,
      "ABILITY_COST_SELECTION_MISMATCH",
    );
  }

  if (new Set(requestedCosts).size !== requestedCosts.length) {
    return createFailure(
      "Banished character costs must be unique",
      "ABILITY_COST_SELECTION_DUPLICATE",
    );
  }

  const eligibleSet = new Set(eligibleCosts);
  for (const cardId of requestedCosts) {
    if (!eligibleSet.has(cardId)) {
      return createFailure(
        "Banished character cost must be one of your characters in play",
        "ABILITY_COST_CARD_INVALID",
      );
    }
  }

  return { valid: true };
}

function validateExertCharacterCostSelections(
  ctx: ActivatedAbilityValidationContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): RuntimeValidationResult {
  const requiredCount = getRequiredExertCharacterCostCount(ability);
  const requestedCosts = getRequestedExertCharacterCosts(ctx);

  if (requiredCount === 0) {
    if (requestedCosts.length > 0) {
      return createFailure(
        "Ability does not use additional exerted character costs",
        "ABILITY_COST_SELECTION_UNEXPECTED",
      );
    }
    return { valid: true };
  }

  if (requestedCosts.length !== requiredCount) {
    return createFailure(
      `Ability requires ${requiredCount} exerted character cost selection${requiredCount === 1 ? "" : "s"}`,
      "ABILITY_COST_SELECTION_MISMATCH",
    );
  }

  if (new Set(requestedCosts).size !== requestedCosts.length) {
    return createFailure(
      "Additional exerted character costs must be unique",
      "ABILITY_COST_SELECTION_DUPLICATE",
    );
  }

  const controlledCardsInPlay = new Set(getControlledCardsInPlay(ctx, currentPlayer));
  for (const cardId of requestedCosts) {
    if (!controlledCardsInPlay.has(cardId)) {
      return createFailure(
        "Additional exerted character cost must be one of your characters in play",
        "ABILITY_COST_CARD_NOT_CONTROLLED",
      );
    }

    const costCardDef = getCardDefinitionFromContext(ctx, cardId);
    if (!costCardDef || costCardDef.cardType !== "character") {
      return createFailure(
        "Additional exerted character cost must be a character",
        "ABILITY_COST_CARD_TYPE_INVALID",
      );
    }

    // Check classification restriction if specified
    const requiredClassification = ability.cost?.exertCharactersClassification;
    if (requiredClassification) {
      const classifications = (costCardDef as { classifications?: string[] }).classifications ?? [];
      if (!classifications.includes(requiredClassification)) {
        return createFailure(
          `Exerted character cost must have the ${requiredClassification} classification`,
          "ABILITY_COST_CARD_CLASSIFICATION_INVALID",
        );
      }
    }

    // Check that the character is ready to be exerted
    const costCardMeta = ctx.cards.require(cardId).meta as LorcanaCardMeta | undefined;
    if (costCardMeta?.state === "exerted") {
      return createFailure(
        "Additional exerted character cost must be ready (not exerted)",
        "ABILITY_COST_CARD_NOT_READY",
      );
    }
  }

  return { valid: true };
}

function validateDiscardCardCostSelections(
  ctx: ActivatedAbilityValidationContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): RuntimeValidationResult {
  const requiredCount = getRequiredDiscardCardCostCount(ability);
  const requestedCosts = getRequestedDiscardCardCosts(ctx);

  if (requiredCount === 0) {
    if (requestedCosts.length > 0) {
      return createFailure(
        "Ability does not use discarded card costs",
        "ABILITY_COST_SELECTION_UNEXPECTED",
      );
    }
    return { valid: true };
  }

  const eligibleCosts = getEligibleDiscardCostCards(ctx, currentPlayer, ability);
  if (eligibleCosts.length < requiredCount) {
    return createFailure(
      "Not enough eligible cards in hand to pay the discard cost",
      "ABILITY_COST_SELECTION_UNAVAILABLE",
    );
  }

  if (requestedCosts.length === 0) {
    if (eligibleCosts.length > requiredCount) {
      return createFailure(
        `Ability requires ${requiredCount} discard cost selection${requiredCount === 1 ? "" : "s"}`,
        "ABILITY_COST_SELECTION_MISSING",
      );
    }
    return { valid: true };
  }

  if (requestedCosts.length !== requiredCount) {
    return createFailure(
      `Ability requires ${requiredCount} discard cost selection${requiredCount === 1 ? "" : "s"}`,
      "ABILITY_COST_SELECTION_MISMATCH",
    );
  }

  if (new Set(requestedCosts).size !== requestedCosts.length) {
    return createFailure("Discarded card costs must be unique", "ABILITY_COST_SELECTION_DUPLICATE");
  }

  const eligibleSet = new Set(eligibleCosts);
  for (const cardId of requestedCosts) {
    if (!eligibleSet.has(cardId)) {
      return createFailure(
        "Discarded card cost must be an eligible card from your hand",
        "ABILITY_COST_CARD_INVALID",
      );
    }
  }

  return { valid: true };
}

function buildExertCostCards(
  ctx: ActivatedAbilityReadableContext,
  sourceCardId: CardInstanceId,
  sourceCardDef: LorcanaCard,
  ability: ActivatedAbilityDefinition,
): {
  cardId: CardInstanceId;
  cardType?: string;
  subject?: string;
}[] {
  const cost = ability.cost ?? {};
  const exertCards: {
    cardId: CardInstanceId;
    cardType?: string;
    subject?: string;
  }[] = [];

  if (cost.exert) {
    exertCards.push({
      cardId: sourceCardId,
      cardType: sourceCardDef.cardType,
      subject: "Source card",
    });
  }

  for (const cardId of getRequestedExertCharacterCosts(ctx)) {
    const costCardDef = getCardDefinitionFromContext(ctx, cardId);
    exertCards.push({
      cardId,
      cardType: costCardDef?.cardType,
      subject: "Character cost",
    });
  }

  return exertCards;
}

function buildExertItemCostCards(
  ctx: ActivatedAbilityReadableContext,
  currentPlayer: PlayerId,
  ability: ActivatedAbilityDefinition,
): CardInstanceId[] {
  return resolveExertItemCostCards(ctx, currentPlayer, ability);
}

function validateAbilityTargeting(
  ctx: ActivatedAbilityValidationContext,
  cardId: CardInstanceId,
  ability: ActivatedAbilityDefinition,
): RuntimeValidationResult {
  const currentPlayer = ctx.framework.state.currentPlayer as PlayerId | undefined;
  if (!currentPlayer) {
    return createFailure("No active player", "PLAYER_CONTEXT_MISSING");
  }

  const analysis = analyzeEffectTargets(ability.effect, currentPlayer, ctx, cardId);
  const selectionValidation = validateAndNormalizeTargetSelection(ctx.args.targets, analysis, {
    currentPlayer,
    ctx,
  });
  if (!selectionValidation.valid && selectionValidation.errorCode === "TOO_FEW_TARGETS") {
    analyzeTargetSelectionAvailabilityFromAnalysis(ability.effect, analysis);
    return validateAndNormalizeTargetSelection(
      ctx.args.targets,
      {
        ...analysis,
        minSelections: 0,
      },
      {
        currentPlayer,
        ctx,
      },
    );
  }
  if (!selectionValidation.valid) {
    return selectionValidation;
  }

  return { valid: true };
}

export const activateAbility: LorcanaMoveDefinition<"activateAbility"> = {
  validate: (ctx): RuntimeValidationResult => {
    if (hasPendingActionEffectResolution(ctx)) {
      return createFailure(
        "Cannot activate abilities while an action effect is pending",
        EFFECT_PENDING_ERROR_CODE,
      );
    }

    if (hasPendingBagItems(ctx)) {
      return createFailure(
        "Cannot activate abilities while bag effects are pending",
        "BAG_PENDING",
      );
    }

    const { cardId, abilityIndex } = ctx.args;
    const currentPlayer = ctx.framework.state.currentPlayer as PlayerId | undefined;
    if (!currentPlayer) {
      return createFailure("No active player", "PLAYER_CONTEXT_MISSING");
    }

    const controlledCardsInPlay = getControlledCardsInPlay(ctx, currentPlayer);
    if (!controlledCardsInPlay.includes(cardId)) {
      return createFailure(
        "Card is not in your play zone",
        "ABILITY_CARD_NOT_CONTROLLED_OR_NOT_IN_PLAY",
      );
    }

    const cardDef = getCardDefinitionFromContext(ctx, cardId);
    if (!cardDef) {
      return createFailure("Card definition not found", "CARD_NOT_FOUND");
    }

    const ability = getActivatedAbilityByIndex(
      ctx,
      cardId as CardInstanceId,
      cardDef,
      abilityIndex,
    );
    if (!ability) {
      return createFailure("Activated ability not found", "ABILITY_NOT_FOUND");
    }

    if (ability.condition !== undefined) {
      const conditionCtx: ConditionEvaluationContext = {
        framework: {
          state: {
            priority: ctx.framework.state.priority,
            status: ctx.framework.state.status,
            playerIds: ctx.framework.state.playerIds,
            currentPlayer: currentPlayer,
          },
          zones: {
            getCards: (query: { zone: string; playerId: PlayerId }) =>
              ctx.framework.zones.getCards(query) as unknown as readonly CardInstanceId[],
          },
        },
        cards: {
          getDefinition: ctx.cards.getDefinition,
          require: ctx.cards.require,
        },
        G: ctx.G,
        playerId: currentPlayer,
        sourceCardId: cardId as CardInstanceId,
      };
      const conditionMet = evaluateCondition(ability.condition, conditionCtx);
      if (!conditionMet) {
        return createFailure("Ability condition not met", "ABILITY_CONDITION_NOT_MET");
      }
    }

    const cardMeta = (ctx.cards.require(cardId).meta ?? {}) as LorcanaCardMeta;
    const cost = ability.cost ?? {};

    const exertCharacterCostValidation = validateExertCharacterCostSelections(
      ctx,
      currentPlayer,
      ability,
    );
    if (!exertCharacterCostValidation.valid) {
      return exertCharacterCostValidation;
    }

    const exertItemCostValidation = validateExertItemCostSelections(ctx, currentPlayer, ability);
    if (!exertItemCostValidation.valid) {
      return exertItemCostValidation;
    }

    const banishItemCostValidation = validateBanishItemCostSelections(ctx, currentPlayer, ability);
    if (!banishItemCostValidation.valid) {
      return banishItemCostValidation;
    }

    const banishCharacterCostValidation = validateBanishCharacterCostSelections(
      ctx,
      currentPlayer,
      ability,
      cardId as CardInstanceId,
    );
    if (!banishCharacterCostValidation.valid) {
      return banishCharacterCostValidation;
    }

    const discardCardCostValidation = validateDiscardCardCostSelections(
      ctx,
      currentPlayer,
      ability,
    );
    if (!discardCardCostValidation.valid) {
      return discardCardCostValidation;
    }

    const costValidation = validateBasicCost(
      {
        framework: ctx.framework,
        cards: ctx.cards,
        playerId: currentPlayer,
      },
      {
        ink: cost.ink,
        exertCards: buildExertCostCards(ctx, cardId as CardInstanceId, cardDef, ability),
      },
    );
    if (!costValidation.valid) {
      return costValidation;
    }

    const usesPerTurn = getUsesPerTurn(ability);
    if (usesPerTurn !== undefined) {
      const currentTurn = ctx.framework.state.status.turn ?? 1;
      const usageCount = getAbilityUsageCount(
        cardMeta,
        ability.id ?? `ability-${abilityIndex}`,
        currentTurn,
      );
      if (usageCount >= usesPerTurn) {
        return createFailure(
          "Ability has already been used the maximum times this turn",
          "ABILITY_USES_EXHAUSTED",
        );
      }
    }

    return validateAbilityTargeting(ctx, cardId as CardInstanceId, ability);
  },

  execute: (ctx) => {
    const { cardId, abilityIndex, targets } = ctx.args;
    const currentPlayer = (ctx.framework.state.currentPlayer ??
      ctx.playerId ??
      ctx.framework.state.priority.holder) as PlayerId | undefined;

    if (!currentPlayer) {
      throw new Error("activateAbility execution requires an active player");
    }

    const cardDef = getCardDefinitionFromContext(ctx, cardId);
    if (!cardDef) {
      throw new Error(`Card definition not found for '${cardId}'`);
    }

    const ability = getActivatedAbilityByIndex(
      ctx,
      cardId as CardInstanceId,
      cardDef,
      abilityIndex,
    );
    if (!ability) {
      throw new Error(`Activated ability not found for '${cardId}'`);
    }

    const cost = ability.cost ?? {};
    const currentMeta = (ctx.cards.require(cardId).meta ?? {}) as LorcanaCardMeta;
    const banishItemCostCards = resolveBanishItemCostCards(ctx, currentPlayer, ability);
    const banishCharacterCostCards = resolveBanishCharacterCostCards(
      ctx,
      currentPlayer,
      ability,
      cardId as CardInstanceId,
    );
    const discardCostCards = resolveDiscardCostCards(ctx, currentPlayer, ability);

    const exertItemCostCards = buildExertItemCostCards(ctx, currentPlayer, ability);

    // Pay basic costs (ink and exert)
    const allExertCards = [
      ...buildExertCostCards(ctx, cardId as CardInstanceId, cardDef, ability),
      ...exertItemCostCards.map((itemCardId) => ({
        cardId: itemCardId,
        cardType: getCardDefinitionFromContext(ctx, itemCardId)?.cardType,
        subject: "Item cost",
      })),
    ];
    const payResult = payBasicCost(
      {
        framework: ctx.framework,
        cards: ctx.cards,
        playerId: currentPlayer,
      },
      {
        ink: cost.ink,
        exertCards: allExertCards,
      },
    );
    if (!payResult.success) {
      throw new Error(`Failed to pay ability cost: ${payResult.error} (${payResult.errorCode})`);
    }

    if (discardCostCards.length > 0) {
      const triggerBatchKey = discardCostCards.join("|");
      for (const discardCardId of discardCostCards) {
        ctx.framework.zones.moveCard(discardCardId, {
          zone: "discard",
          playerId: currentPlayer,
        });
        queueTriggeredEvent(ctx, {
          event: "discard",
          playerId: currentPlayer,
          subjectCardId: discardCardId,
          triggerSourceCardId: discardCardId,
          eventSnapshot: {
            triggerAmount: discardCostCards.length,
            triggerBatchKey,
          },
        });
      }
    }

    for (const banishItemCardId of banishItemCostCards) {
      const costCardMeta = (ctx.cards.require(banishItemCardId).meta ?? {}) as LorcanaCardMeta;
      const subjectAtLocationId = costCardMeta.atLocationId as CardInstanceId | undefined;
      const keywordsBeforeBanish = getKeywordsBeforeBanish(ctx, banishItemCardId, currentPlayer);
      const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, banishItemCardId);
      moveCardOutOfPlayWithStack(ctx, banishItemCardId, {
        zone: "discard",
        playerId: currentPlayer,
      });
      emitTriggeredLorcanaEvent(
        ctx,
        "cardBanished",
        {
          cardId: banishItemCardId,
          sourceId: cardId as CardInstanceId,
          snapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
          reason: "activated ability cost",
        },
        {
          event: "banish",
          playerId: currentPlayer,
          subjectCardId: banishItemCardId,
          triggerSourceCardId: banishItemCardId,
          triggerCandidates,
          eventSnapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
        },
      );
    }

    for (const banishCharacterCardId of banishCharacterCostCards) {
      const costCardMeta = (ctx.cards.require(banishCharacterCardId).meta ?? {}) as LorcanaCardMeta;
      const subjectAtLocationId = costCardMeta.atLocationId as CardInstanceId | undefined;
      const keywordsBeforeBanish = getKeywordsBeforeBanish(
        ctx,
        banishCharacterCardId,
        currentPlayer,
      );
      const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, banishCharacterCardId);
      moveCardOutOfPlayWithStack(ctx, banishCharacterCardId, {
        zone: "discard",
        playerId: currentPlayer,
      });
      emitTriggeredLorcanaEvent(
        ctx,
        "cardBanished",
        {
          cardId: banishCharacterCardId,
          sourceId: cardId as CardInstanceId,
          snapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
          reason: "activated ability cost",
        },
        {
          event: "banish",
          playerId: currentPlayer,
          subjectCardId: banishCharacterCardId,
          triggerSourceCardId: banishCharacterCardId,
          triggerCandidates,
          eventSnapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
        },
      );
      recordBanishedCharacterThisTurn(ctx, banishCharacterCardId);
    }

    const currentTurn = ctx.framework.state.status.turn ?? 1;
    const abilityId = ability.id ?? `ability-${abilityIndex}`;
    const usageCount = getAbilityUsageCount(currentMeta, abilityId, currentTurn) + 1;

    // Pay banish self cost
    if (cost.banishSelf) {
      const currentCardMeta = ctx.cards.require(cardId as CardInstanceId).meta ?? {};
      const subjectAtLocationId = currentCardMeta.atLocationId as CardInstanceId | undefined;
      const keywordsBeforeBanish = getKeywordsBeforeBanish(
        ctx,
        cardId as CardInstanceId,
        currentPlayer,
      );
      const triggerCandidates = snapshotTriggeredCandidatesForCard(ctx, cardId as CardInstanceId);
      moveCardOutOfPlayWithStack(ctx, cardId as CardInstanceId, {
        zone: "discard",
        playerId: currentPlayer,
      });
      emitTriggeredLorcanaEvent(
        ctx,
        "cardBanished",
        {
          cardId: cardId as CardInstanceId,
          sourceId: cardId as CardInstanceId,
          snapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
          reason: "activated ability cost",
        },
        {
          event: "banish",
          playerId: currentPlayer,
          subjectCardId: cardId as CardInstanceId,
          triggerSourceCardId: cardId as CardInstanceId,
          triggerCandidates,
          eventSnapshot: {
            keywordsBeforeBanish,
            subjectAtLocationId,
          },
        },
      );
      recordBanishedCharacterThisTurn(ctx, cardId as CardInstanceId);
    } else {
      ctx.cards.patchMeta(cardId, {
        activatedAbilityUses: {
          ...currentMeta.activatedAbilityUses,
          [abilityId]: usageCount,
        },
        activatedAbilityUseTurns: {
          ...currentMeta.activatedAbilityUseTurns,
          [abilityId]: currentTurn,
        },
      });
    }

    const source = {
      playerId: currentPlayer,
      cardId: cardId as CardInstanceId,
      cardType: cardDef.cardType,
      costType: "free" as const,
      inkPaid: payResult.inkPaid > 0 ? payResult.inkPaid : undefined,
    };

    // Emit ability activated event and log entry
    emitTriggeredLorcanaEvent(ctx, "abilityActivated", {
      playerId: currentPlayer,
      cardId: cardId as CardInstanceId,
      abilityName: ability.name,
      abilityIndex: abilityIndex ?? 0,
      inkPaid: payResult.inkPaid > 0 ? payResult.inkPaid : undefined,
    });
    ctx.framework.log({
      category: "action",
      visibility: { mode: "PUBLIC" },
      defaultMessage: ability.name
        ? createLorcanaLogMessage("lorcana.ability.activated.named", {
            playerId: currentPlayer,
            cardId: cardId as CardInstanceId,
            abilityName: ability.name,
          })
        : createLorcanaLogMessage("lorcana.ability.activated", {
            playerId: currentPlayer,
            cardId: cardId as CardInstanceId,
          }),
    });

    const analysis = analyzeEffectTargets(
      ability.effect,
      currentPlayer,
      ctx,
      cardId as CardInstanceId,
    );
    const normalizedSelection = validateAndNormalizeTargetSelection(targets, analysis, {
      currentPlayer,
      ctx,
    });
    const finalSelection =
      !normalizedSelection.valid && normalizedSelection.errorCode === "TOO_FEW_TARGETS"
        ? (() => {
            analyzeTargetSelectionAvailabilityFromAnalysis(ability.effect, analysis);
            return validateAndNormalizeTargetSelection(
              targets,
              {
                ...analysis,
                minSelections: 0,
              },
              {
                currentPlayer,
                ctx,
              },
            );
          })()
        : normalizedSelection;
    if (!finalSelection.valid) {
      throw new Error(
        `Invalid ability targets: ${finalSelection.error} (${finalSelection.errorCode})`,
      );
    }

    const resolutionInput: ActionResolutionInput = {};
    const flattenedTargets = flattenNormalizedTargetSelection(finalSelection.selection);
    if (flattenedTargets) {
      resolutionInput.targets = flattenedTargets;
    }
    if (banishCharacterCostCards.length > 0) {
      resolutionInput.eventSnapshot = {
        ...resolutionInput.eventSnapshot,
        chosenCardId: banishCharacterCostCards[0],
      };
    }
    if (discardCostCards.length > 0) {
      resolutionInput.eventSnapshot = {
        ...resolutionInput.eventSnapshot,
        discardedCardIds: discardCostCards,
      };
    }
    if (ctx.args.choiceIndex !== undefined) {
      resolutionInput.choiceIndex = ctx.args.choiceIndex;
    }

    // Emit be-chosen events for targets of this activated ability
    emitBeChosenEvents(ctx, source, resolutionInput);

    const result = resolveActionEffect(ctx, source, ability.effect, resolutionInput, {
      allowPromptForExistingChosenTargets: true,
    });
    if (result.status === "suspended") {
      return;
    }

    if (ability.name?.startsWith("Boost")) {
      queueTriggeredEvent(ctx, {
        event: "boost",
        playerId: currentPlayer,
        subjectCardId: cardId as CardInstanceId,
        triggerSourceCardId: cardId as CardInstanceId,
      });
    }

    flushTriggeredEventsToBag(ctx);

    if (cost.exert) {
      emitTriggeredLorcanaEvent(ctx, "cardExerted", {
        cardId: cardId as CardInstanceId,
        source: ability.name ?? ability.text ?? "activated ability",
      });
    }
  },
};
