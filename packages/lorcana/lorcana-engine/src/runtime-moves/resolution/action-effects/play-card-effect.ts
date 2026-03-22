import type { CardInstanceId, PlayerId } from "#core";
import type {
  CardSelectionFilter,
  ChosenCardCostMaxCostConstraint,
  PlayCardEffect,
} from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type {
  ActionEffectResolutionOptions,
  ActionResolutionInput,
  PlayCardExecutionContext,
} from "./types";
import { handleUnsupportedActionEffect } from "./unsupported-action-effect";
import { isDiscardZoneKey, recordDiscardExitThisTurn } from "../../state/turn-metrics";
import { resolveTargetPlayerIds } from "./player-target-resolver";
import { addTemporaryKeyword, resolveTemporaryEffectWindow } from "../../effects/temporary-effects";
import {
  emitTriggeredLorcanaEvent,
  flushTriggeredEventsToBag,
  registerAbility,
} from "../../effects/triggered-abilities";
import { resolveActionCardEffects } from "../action-effect-resolver";
import {
  finalizeResolvedActionCard,
  hasPendingActionEffectResolution,
  moveSuspendedActionCardToLimbo,
} from "./pending-action-effects";
import { payBasicCost, validateBasicCost } from "../../rules/play-card-rules";
import {
  clearCurrentSelectionTargets,
  getCombinedSelectionInput,
  getContextSelectionTargets,
  getCurrentSelectionInput,
  getEffectTargetSelectionInput,
} from "./selection-state";

type CardDefinitionLike = {
  actionSubtype?: string;
  abilities?: unknown[];
  cardType?: "character" | "item" | "location" | "action";
  classifications?: string[];
  cost?: number;
  name?: string;
};

type PlayCardFilterLike = CardSelectionFilter;

type PlayCardTypeConstraint = CardDefinitionLike["cardType"] | "song" | "floodborn";

type PlayerTargetLike = Parameters<typeof resolveTargetPlayerIds>[2];

function hasBodyguardKeyword(definition: CardDefinitionLike): boolean {
  return Array.isArray(definition.abilities)
    ? definition.abilities.some(
        (ability) =>
          typeof ability === "object" &&
          ability !== null &&
          "keyword" in ability &&
          (ability as { keyword?: unknown }).keyword === "Bodyguard",
      )
    : false;
}

export function isPlayCardEffect(effect: unknown): effect is PlayCardEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "play-card"
  );
}

function normalizeSelectedTargets(targets: ActionResolutionInput["targets"]): CardInstanceId[] {
  if (!targets) {
    return [];
  }

  if (Array.isArray(targets)) {
    return [
      ...new Set(
        targets.filter((targetId): targetId is CardInstanceId => typeof targetId === "string"),
      ),
    ];
  }

  return typeof targets === "string" ? [targets as CardInstanceId] : [];
}

function isPlayerTargetLike(target: unknown): target is PlayerTargetLike {
  return (
    target === "SELF" ||
    target === "CONTROLLER" ||
    target === "OPPONENT" ||
    target === "OPPONENTS" ||
    target === "EACH_PLAYER" ||
    target === "EACH_OPPONENT" ||
    target === "ALL_PLAYERS" ||
    target === "CHOSEN_PLAYER" ||
    target === "CURRENT_TURN"
  );
}

/**
 * Returns true when the play-card filter relies on runtime context from a prior
 * sequence step (e.g. the cost or identity of a previously chosen card) and
 * therefore requires an explicit player selection from hand rather than
 * auto-selection.  A filter with a static `name` field, by contrast, can
 * unambiguously identify the card to play and does not need explicit selection.
 */
function isContextDependentPlayCardFilter(effect: PlayCardEffect): boolean {
  const filter =
    effect.filter &&
    !Array.isArray(effect.filter) &&
    !("type" in effect.filter && typeof effect.filter.type === "string")
      ? (effect.filter as PlayCardFilterLike)
      : undefined;

  if (!filter) {
    return false;
  }

  // Filters that reference a previously chosen card's cost or identity are context-dependent.
  if (
    filter.maxCost === "chosen-card-cost" ||
    (typeof filter.maxCost === "object" &&
      filter.maxCost !== null &&
      (filter.maxCost as { type?: unknown }).type === "chosen-card-cost") ||
    filter.excludeChosenCard === true ||
    filter.sameNameAsChosenCard === true
  ) {
    return true;
  }

  return false;
}

function resolveSourceCards(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: PlayCardEffect,
  resolutionInput: ActionResolutionInput,
  sourcePlayerId: PlayerId,
  selectedTargets: CardInstanceId[],
): CardInstanceId[] {
  const from = effect.from ?? "hand";
  const hasExplicitTargetSelection = selectedTargets.length > 0;

  if (from === "revealed") {
    const revealedCards =
      (resolutionInput.eventSnapshot?.revealedCardIds as CardInstanceId[] | undefined) ?? [];
    if (hasExplicitTargetSelection) {
      const revealedSet = new Set(revealedCards);
      const selectedRevealed = selectedTargets.filter((cardId) => revealedSet.has(cardId));
      return selectedRevealed;
    }

    return revealedCards;
  }

  if (from === "under-self") {
    const cardsUnder = ctx.cards.require(cardPlayed.cardId).meta?.cardsUnder as
      | CardInstanceId[]
      | undefined;
    const underCards = Array.isArray(cardsUnder) ? [...cardsUnder] : [];
    if (hasExplicitTargetSelection) {
      const underSet = new Set(underCards);
      const selectedUnder = selectedTargets.filter((cardId) => underSet.has(cardId));
      return selectedUnder;
    }

    return underCards;
  }

  if (from === "discard") {
    const cardsInZone = ctx.framework.zones.getCards({
      zone: from,
      playerId: sourcePlayerId,
    }) as CardInstanceId[];
    if (hasExplicitTargetSelection) {
      const zoneSet = new Set(cardsInZone);
      const selectedInZone = selectedTargets.filter((cardId) => zoneSet.has(cardId));
      return selectedInZone;
    }

    return cardsInZone;
  }

  if (from === "deck" || from === "hand") {
    if (from === "hand" && !hasExplicitTargetSelection) {
      // When there are context targets (from prior sequence steps), block auto-play
      // unless the filter unambiguously identifies the card by name. Context-dependent
      // filters (e.g. maxCost: "chosen-card-cost", excludeChosenCard) require the
      // player to make an explicit selection.
      const contextTargets = getContextSelectionTargets(resolutionInput);
      if (contextTargets.length > 0 && isContextDependentPlayCardFilter(effect)) {
        return [];
      }
    }

    const cardsInZone = ctx.framework.zones.getCards({
      zone: from,
      playerId: sourcePlayerId,
    }) as CardInstanceId[];
    if (hasExplicitTargetSelection) {
      const zoneSet = new Set(cardsInZone);
      const selectedInZone = selectedTargets.filter((cardId) => zoneSet.has(cardId));
      return selectedInZone;
    }

    return cardsInZone;
  }

  handleUnsupportedActionEffect("play-card", `Unsupported source "${from}"`);
  return [];
}

function matchesPlayCardTypeConstraint(
  definition: CardDefinitionLike,
  expectedType: PlayCardTypeConstraint | undefined,
): boolean {
  if (!expectedType) {
    return true;
  }

  if (expectedType === "song") {
    return definition.cardType === "action" && definition.actionSubtype === "song";
  }

  if (expectedType === "floodborn") {
    return (definition.classifications ?? []).includes("Floodborn");
  }

  return definition.cardType === expectedType;
}

function resolveFilterMaxCost(
  ctx: PlayCardExecutionContext,
  filter: PlayCardFilterLike | undefined,
  resolutionInput: ActionResolutionInput,
): number | undefined {
  const maxCost = filter?.maxCost;
  if (typeof maxCost === "number") {
    return maxCost;
  }

  if (maxCost === "chosen-card-cost") {
    const chosenCardCost = resolutionInput.eventSnapshot?.chosenCardCost;
    if (typeof chosenCardCost === "number" && Number.isFinite(chosenCardCost)) {
      return chosenCardCost;
    }

    const chosenCardId = resolutionInput.eventSnapshot?.chosenCardId as CardInstanceId | undefined;
    if (!chosenCardId) {
      return undefined;
    }

    const chosenDefinition = ctx.cards.getDefinition(chosenCardId) as
      | CardDefinitionLike
      | undefined;
    return typeof chosenDefinition?.cost === "number" ? chosenDefinition.cost : undefined;
  }

  if (
    !maxCost ||
    typeof maxCost !== "object" ||
    (maxCost as ChosenCardCostMaxCostConstraint).type !== "chosen-card-cost"
  ) {
    return undefined;
  }

  const resolvedChosenCardCost =
    typeof resolutionInput.eventSnapshot?.chosenCardCost === "number" &&
    Number.isFinite(resolutionInput.eventSnapshot.chosenCardCost)
      ? resolutionInput.eventSnapshot.chosenCardCost
      : undefined;
  const offset =
    typeof maxCost.offset === "number" && Number.isFinite(maxCost.offset) ? maxCost.offset : 0;
  if (resolvedChosenCardCost !== undefined) {
    return resolvedChosenCardCost + offset;
  }

  const chosenCardId = resolutionInput.eventSnapshot?.chosenCardId as CardInstanceId | undefined;
  if (!chosenCardId) {
    return undefined;
  }
  const chosenDefinition = ctx.cards.getDefinition(chosenCardId) as CardDefinitionLike | undefined;
  return typeof chosenDefinition?.cost === "number" ? chosenDefinition.cost + offset : undefined;
}

function matchesPlayCardFilter(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  cardId: CardInstanceId,
  definition: CardDefinitionLike,
  filter: PlayCardFilterLike | undefined,
  resolutionInput: ActionResolutionInput,
): boolean {
  if (!filter) {
    return true;
  }

  if (!matchesPlayCardTypeConstraint(definition, filter.cardType)) {
    return false;
  }

  const resolvedMaxCost = resolveFilterMaxCost(ctx, filter, resolutionInput);
  if (typeof resolvedMaxCost === "number") {
    const cost = Number(definition.cost ?? Number.NaN);
    if (!Number.isFinite(cost) || cost > resolvedMaxCost) {
      return false;
    }
  }

  if (typeof filter.classification === "string") {
    const classifications = definition.classifications ?? [];
    if (!classifications.includes(filter.classification)) {
      return false;
    }
  }

  if (typeof filter.name === "string" && definition.name !== filter.name) {
    return false;
  }

  if (filter.sameNameAsSource === true) {
    const sourceDefinition = ctx.cards.getDefinition(cardPlayed.cardId) as
      | CardDefinitionLike
      | undefined;
    if (!sourceDefinition?.name || definition.name !== sourceDefinition.name) {
      return false;
    }
  }

  if (filter.sameNameAsChosenCard === true) {
    const chosenCardId = resolutionInput.eventSnapshot?.chosenCardId as CardInstanceId | undefined;
    if (!chosenCardId) {
      return false;
    }
    const chosenDefinition = ctx.cards.getDefinition(chosenCardId) as
      | CardDefinitionLike
      | undefined;
    if (!chosenDefinition?.name || definition.name !== chosenDefinition.name) {
      return false;
    }
  }

  if (filter.sameInstanceAsSource === true && cardId !== cardPlayed.cardId) {
    return false;
  }

  if (filter.excludeChosenCard === true) {
    const chosenCardId = resolutionInput.eventSnapshot?.chosenCardId as CardInstanceId | undefined;
    if (chosenCardId && chosenCardId === cardId) {
      return false;
    }
  }

  return true;
}

function matchesPlayableCardCriteria(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  cardId: CardInstanceId,
  effect: PlayCardEffect,
  resolutionInput: ActionResolutionInput,
): boolean {
  const definition = ctx.cards.getDefinition(cardId) as CardDefinitionLike | undefined;
  if (!definition) {
    return false;
  }

  if (!matchesPlayCardTypeConstraint(definition, effect.cardType)) {
    return false;
  }

  if (effect.costRestriction) {
    const restriction = effect.costRestriction;
    if (
      typeof restriction !== "object" ||
      restriction === null ||
      !("comparison" in restriction) ||
      !("value" in restriction) ||
      typeof (restriction as { comparison?: unknown }).comparison !== "string" ||
      typeof (restriction as { value?: unknown }).value !== "number"
    ) {
      return false;
    }
    const { comparison, value } = restriction as {
      comparison: string;
      value: number;
    };
    const cardCost = Number(definition.cost ?? Number.NaN);
    if (!Number.isFinite(cardCost)) return false;
    if (comparison === "less-or-equal" && cardCost > value) return false;
    if (comparison === "less-than" && cardCost >= value) return false;
    if (comparison === "equal" && cardCost !== value) return false;
    if (comparison === "greater-than" && cardCost <= value) return false;
    if (comparison === "greater-or-equal" && cardCost < value) return false;
  }

  const filter =
    effect.filter &&
    !Array.isArray(effect.filter) &&
    !("type" in effect.filter && typeof effect.filter.type === "string")
      ? (effect.filter as CardSelectionFilter)
      : undefined;

  return matchesPlayCardFilter(ctx, cardPlayed, cardId, definition, filter, resolutionInput);
}

export function getEntersWithDamageAmount(definition: CardDefinitionLike | undefined): number {
  if (!definition || definition.cardType !== "character" || !Array.isArray(definition.abilities)) {
    return 0;
  }

  return definition.abilities.reduce<number>((total, ability) => {
    if (!ability || typeof ability !== "object" || !("effect" in ability)) {
      return total;
    }

    const effect = (ability as { effect?: unknown }).effect;
    if (!effect || typeof effect !== "object" || Array.isArray(effect)) {
      return total;
    }

    if ((effect as { type?: unknown }).type !== "enters-with-damage") {
      return total;
    }

    const amount = Number((effect as { amount?: unknown }).amount ?? 0);
    return total + (Number.isFinite(amount) ? Math.max(0, amount) : 0);
  }, 0);
}

function initializePlayedCardMeta(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  definition: CardDefinitionLike,
  entersExerted: boolean,
  playedCostType: CardPlayedPayload["costType"],
): void {
  const cardType = definition.cardType;
  if (cardType === "character") {
    ctx.cards.setMeta(cardId, {
      state: entersExerted ? "exerted" : "ready",
      damage: getEntersWithDamageAmount(definition),
      isDrying: true,
      publicFaceState: undefined,
      atLocationId: undefined,
      cardsUnder: undefined,
      stackParentId: undefined,
      playedViaShift: false,
      playedCostType,
    });
    return;
  }

  // resolvePlayCardEffect rejects action cards before this is called, so this
  // branch is intentionally item/location-only and keeps character-only fields unset.
  ctx.cards.setMeta(cardId, {
    state: undefined,
    damage: undefined,
    isDrying: undefined,
    publicFaceState: undefined,
    atLocationId: undefined,
    cardsUnder: undefined,
    stackParentId: undefined,
    playedViaShift: false,
    playedCostType,
  });
}

export function resolvePlayCardEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: PlayCardEffect,
  resolutionInput: ActionResolutionInput,
  options?: ActionEffectResolutionOptions,
): void {
  let didPlayCard = false;

  const costType: CardPlayedPayload["costType"] =
    effect.cost === "free" || effect.free === true ? "free" : "standard";
  if (effect.cost === "reduced") {
    handleUnsupportedActionEffect(
      "play-card",
      "Reduced-cost play-card effects are not supported in this phase",
    );
    return;
  }

  if (effect.reducedBy !== undefined) {
    handleUnsupportedActionEffect(
      "play-card",
      "Reduced-cost play-card effects (reducedBy) are not supported",
    );
    return;
  }

  const currentSelectedTargets = normalizeSelectedTargets(
    getCurrentSelectionInput(resolutionInput),
  );
  const targetPlayerIds = isPlayerTargetLike(effect.target)
    ? resolveTargetPlayerIds(
        ctx,
        cardPlayed,
        effect.target,
        getEffectTargetSelectionInput(effect.target, resolutionInput),
      )
    : [cardPlayed.playerId];
  const resolvedPlayerIds = targetPlayerIds.length > 0 ? targetPlayerIds : [cardPlayed.playerId];

  for (const playerId of resolvedPlayerIds) {
    const sourceCards = resolveSourceCards(
      ctx,
      cardPlayed,
      effect,
      resolutionInput,
      playerId as PlayerId,
      currentSelectedTargets,
    );
    const playableCards = sourceCards.filter((cardId) =>
      matchesPlayableCardCriteria(ctx, cardPlayed, cardId, effect, resolutionInput),
    );
    if (playableCards.length === 0) {
      continue;
    }

    const chosenCardId = playableCards[playableCards.length - 1]!;
    const definition = ctx.cards.getDefinition(chosenCardId) as CardDefinitionLike | undefined;
    const cardType = definition?.cardType;

    if (!cardType) {
      continue;
    }

    const inkCost = costType === "free" ? 0 : Math.max(0, Number(definition.cost ?? 0));
    if (costType !== "free") {
      const costValidation = validateBasicCost(
        {
          framework: ctx.framework,
          cards: ctx.cards,
          playerId,
        },
        { ink: inkCost },
      );
      if (!costValidation.valid) {
        continue;
      }

      const payResult = payBasicCost(
        {
          framework: ctx.framework,
          cards: ctx.cards,
          playerId,
        },
        { ink: inkCost },
      );
      if (!payResult.success) {
        continue;
      }
    }

    const sourceZoneKey = ctx.framework.zones.getCardZone(chosenCardId);

    if (cardType === "action") {
      ctx.framework.zones.moveCard(chosenCardId, {
        zone: "play",
        playerId,
      });
      if (isDiscardZoneKey(sourceZoneKey)) {
        recordDiscardExitThisTurn(ctx);
      }

      const replayedActionPayload: CardPlayedPayload = {
        playerId,
        cardId: chosenCardId,
        cardType: "action",
        costType,
      };

      emitTriggeredLorcanaEvent(ctx, "cardPlayed", replayedActionPayload, {
        event: "play",
        playerId,
        subjectCardId: chosenCardId,
      });
      const nestedActionResolutionInput = clearCurrentSelectionTargets(resolutionInput);
      resolveActionCardEffects(
        ctx,
        replayedActionPayload,
        ctx.cards.getDefinition(chosenCardId) as Extract<
          ReturnType<typeof ctx.cards.getDefinition>,
          { cardType: "action" }
        >,
        {
          ...nestedActionResolutionInput,
        },
      );
      if (hasPendingActionEffectResolution(ctx)) {
        moveSuspendedActionCardToLimbo(ctx, replayedActionPayload);
      } else {
        finalizeResolvedActionCard(ctx, replayedActionPayload);
      }
      didPlayCard = true;
      if (resolutionInput.eventSnapshot) {
        resolutionInput.eventSnapshot.chosenCardId = chosenCardId;
      }
      continue;
    }
    ctx.framework.zones.moveCard(chosenCardId, {
      zone: "play",
      playerId,
    });
    if (isDiscardZoneKey(sourceZoneKey)) {
      recordDiscardExitThisTurn(ctx);
    }

    initializePlayedCardMeta(
      ctx,
      chosenCardId,
      definition,
      effect.entersExerted === true ||
        (cardType === "character" &&
          resolutionInput.eventSnapshot?.autoExertBodyguardOnNestedPlay === true &&
          hasBodyguardKeyword(definition)),
      costType,
    );

    emitTriggeredLorcanaEvent(
      ctx,
      "cardPlayed",
      {
        playerId,
        cardId: chosenCardId,
        cardType,
        costType,
      },
      {
        event: "play",
        playerId,
        subjectCardId: chosenCardId,
      },
    );

    if (cardType === "character" && (effect.grantsRush || effect.banishAtEndOfTurn)) {
      const currentTurn = ctx.framework.state.status.turn ?? 1;
      const { startsAtTurn, expiresAtTurn } = resolveTemporaryEffectWindow(
        currentTurn,
        "this-turn",
      );
      const currentMeta = ctx.cards.require(chosenCardId).meta ?? {};

      let nextMeta = currentMeta;
      if (effect.grantsRush) {
        nextMeta = addTemporaryKeyword(nextMeta, "Rush", expiresAtTurn, undefined, startsAtTurn);
      }

      ctx.cards.patchMeta(chosenCardId, nextMeta);
    }

    if (cardType === "character" && effect.banishAtEndOfTurn) {
      registerAbility(ctx, {
        sourceId: cardPlayed.cardId,
        controllerId: cardPlayed.playerId,
        cardPlayed,
        ability: {
          trigger: {
            event: "end-turn",
            on: "CONTROLLER",
            timing: "at",
          },
          effect: {
            type: "banish",
            target: { ref: "previous-target" },
          },
        },
        lifecycle: {
          kind: "delayed",
          timing: "end-of-turn",
        },
        resolutionInput: {
          ...resolutionInput,
          targets: chosenCardId,
        },
      });
    }

    if (resolutionInput.eventSnapshot) {
      resolutionInput.eventSnapshot.chosenCardId = chosenCardId;
    }
    didPlayCard = true;
  }

  resolutionInput.eventSnapshot ??= {};
  resolutionInput.eventSnapshot.lastEffectPerformed = didPlayCard;
  if (!didPlayCard) {
    delete resolutionInput.eventSnapshot.chosenCardId;
    return;
  }

  if (
    hasPendingActionEffectResolution(ctx) ||
    (options?.continuation?.remainingEffects?.length ?? 0) > 0
  ) {
    return;
  }

  flushTriggeredEventsToBag(ctx);
}

/**
 * Executes an action card that has already been physically moved to the play zone
 * by a scry "play for free" destination. Runs the card's effects and finalizes
 * it to discard (or limbo if suspended), matching the normal action-card play lifecycle.
 */
export function executeScryActionCardPlay(
  ctx: PlayCardExecutionContext,
  actionCardId: CardInstanceId,
  controllerId: PlayerId,
  resolutionInput: ActionResolutionInput,
): void {
  const definition = ctx.cards.getDefinition(actionCardId) as CardDefinitionLike | undefined;
  if (!definition || definition.cardType !== "action") {
    return;
  }

  const actionPayload: CardPlayedPayload = {
    playerId: controllerId,
    cardId: actionCardId,
    cardType: "action",
    costType: "free",
  };

  emitTriggeredLorcanaEvent(ctx, "cardPlayed", actionPayload, {
    event: "play",
    playerId: controllerId,
    subjectCardId: actionCardId,
  });

  const nestedInput = clearCurrentSelectionTargets(resolutionInput);
  resolveActionCardEffects(
    ctx,
    actionPayload,
    definition as Extract<ReturnType<typeof ctx.cards.getDefinition>, { cardType: "action" }>,
    nestedInput,
  );

  if (hasPendingActionEffectResolution(ctx)) {
    moveSuspendedActionCardToLimbo(ctx, actionPayload);
  } else {
    finalizeResolvedActionCard(ctx, actionPayload);
  }
}
