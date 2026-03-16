import type { CardInstanceId, PlayerId } from "#core";
import type { CardSelectionFilter, ReturnFromDiscardEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types/index";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { recordDiscardExitThisTurn } from "../../state/turn-metrics";
import { resolveTargetPlayerIds } from "./player-target-resolver";

type DiscardCardDefinition = {
  actionSubtype?: string;
  abilities?: {
    type?: string;
    keyword?: string;
  }[];
  cardType?: string;
  classifications?: string[];
  cost?: number;
  name?: string;
};

function getKeywordFilter(
  filter: CardSelectionFilter | undefined,
  effect: ReturnFromDiscardEffect,
): string | undefined {
  // Handle untyped CardSelectionFilter format: { keyword: "Support" }
  if (
    filter &&
    typeof filter === "object" &&
    "keyword" in filter &&
    typeof filter.keyword === "string"
  ) {
    return filter.keyword;
  }

  // Handle typed CardFilter format: { type: "has-keyword", keyword: "Support" }
  const effectFilter = effect.filter;
  if (
    effectFilter &&
    typeof effectFilter === "object" &&
    !Array.isArray(effectFilter) &&
    "type" in effectFilter &&
    effectFilter.type === "has-keyword" &&
    "keyword" in effectFilter &&
    typeof effectFilter.keyword === "string"
  ) {
    return effectFilter.keyword;
  }

  return undefined;
}

function cardHasPrintedKeyword(cardDefinition: DiscardCardDefinition, keyword: string): boolean {
  return (
    Array.isArray(cardDefinition.abilities) &&
    cardDefinition.abilities.some(
      (ability) => ability.type === "keyword" && ability.keyword === keyword,
    )
  );
}

export function isReturnFromDiscardEffect(effect: unknown): effect is ReturnFromDiscardEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "return-from-discard"
  );
}

function resolveSelectedTargets(targets: ActionResolutionInput["targets"]): CardInstanceId[] {
  if (!targets) {
    return [];
  }

  if (Array.isArray(targets)) {
    return [
      ...new Set(targets.filter((target): target is CardInstanceId => typeof target === "string")),
    ];
  }

  return typeof targets === "string" ? [targets as CardInstanceId] : [];
}

function resolveReturnCount(effect: ReturnFromDiscardEffect): number {
  if (typeof effect.count !== "number" || !Number.isFinite(effect.count)) {
    return 1;
  }

  return Math.max(0, Math.floor(effect.count));
}

function matchesReturnFilter(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  effect: ReturnFromDiscardEffect,
): boolean {
  const cardDefinition = ctx.cards.getDefinition(cardId) as DiscardCardDefinition | undefined;
  if (!cardDefinition) {
    return false;
  }

  const filter =
    effect.filter &&
    typeof effect.filter === "object" &&
    !Array.isArray(effect.filter) &&
    !("type" in effect.filter && typeof effect.filter.type === "string")
      ? (effect.filter as CardSelectionFilter)
      : undefined;
  const cardType = filter?.cardType ?? effect.cardType;
  const cardName = filter?.name ?? effect.cardName;

  if (cardType) {
    if (cardType === "song") {
      if (cardDefinition.cardType !== "action" || cardDefinition.actionSubtype !== "song") {
        return false;
      }
    } else if (cardDefinition.cardType !== cardType) {
      return false;
    }
  }

  if (cardName && cardDefinition.name !== cardName) {
    return false;
  }

  if (
    typeof filter?.maxCost === "number" &&
    (!Number.isFinite(cardDefinition.cost) || Number(cardDefinition.cost) > filter.maxCost)
  ) {
    return false;
  }

  if (filter?.classification && !Array.isArray(cardDefinition.classifications)) {
    return false;
  }

  if (filter?.classification && !cardDefinition.classifications?.includes(filter.classification)) {
    return false;
  }

  const keywordFilter = getKeywordFilter(filter, effect);
  if (keywordFilter && !cardHasPrintedKeyword(cardDefinition, keywordFilter)) {
    return false;
  }

  return true;
}

function moveToDestination(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  playerId: PlayerId,
  destination: ReturnFromDiscardEffect["destination"] | undefined,
): void {
  const resolvedDestination = destination ?? "hand";
  switch (resolvedDestination) {
    case "top-of-deck":
      ctx.framework.zones.moveCard(cardId, { zone: "deck", playerId });
      return;
    case "play":
      ctx.framework.zones.moveCard(cardId, { zone: "play", playerId });
      return;
    case "hand":
    default:
      ctx.framework.zones.moveCard(cardId, { zone: "hand", playerId });
  }
}

export function resolveReturnFromDiscardEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ReturnFromDiscardEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const targetPlayerIds = resolveTargetPlayerIds(
    ctx,
    cardPlayed,
    effect.target ?? "CONTROLLER",
    resolutionInput.targets,
  );
  if (targetPlayerIds.length === 0) {
    return;
  }

  const returnCount = resolveReturnCount(effect);
  if (returnCount <= 0) {
    return;
  }

  const candidateCards = targetPlayerIds.flatMap((playerId) =>
    (ctx.framework.zones.getCards({ zone: "discard", playerId }) as CardInstanceId[]).filter(
      (cardId) => matchesReturnFilter(ctx, cardId, effect),
    ),
  );
  if (candidateCards.length === 0) {
    return;
  }

  const candidateSet = new Set(candidateCards);
  const selectedTargets = resolveSelectedTargets(resolutionInput.targets);

  const explicitMatches = selectedTargets.filter((cardId) => candidateSet.has(cardId));
  const maxCardsToReturn = Math.min(returnCount, candidateCards.length);
  if (selectedTargets.length > 0 && explicitMatches.length === 0) {
    return;
  }
  if (explicitMatches.length === 0) {
    // Fail closed when there is ambiguity and no explicit selection was made.
    if (selectedTargets.length === 0 && candidateCards.length > maxCardsToReturn) {
      return;
    }
  }

  const cardsToReturn =
    explicitMatches.length > 0
      ? explicitMatches.slice(0, maxCardsToReturn)
      : candidateCards.slice(0, maxCardsToReturn);

  for (const cardId of cardsToReturn) {
    const ownerId = ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID as
      | PlayerId
      | undefined;
    moveToDestination(ctx, cardId, ownerId ?? cardPlayed.playerId, effect.destination);
  }

  recordDiscardExitThisTurn(ctx, cardsToReturn.length);
}
