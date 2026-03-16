import type { ScryDestination, ScryEffect } from "@tcg/lorcana-types";
import type { CardInstanceId, PlayerId } from "#core";
import type { CardPlayedPayload } from "../../../types/index";
import type { PlayCardExecutionContext } from "./types";

export type ScryDestinationSelection = {
  zone: string;
  cards: CardInstanceId[];
};

type ResolvedScryEffectInput = {
  scryAmount?: number;
  destinations?: { zone: string; cards: CardInstanceId | CardInstanceId[] }[];
  selectedPlayerIds?: PlayerId[];
  lookedAtCards?: readonly CardInstanceId[];
  revealWindowIds?: readonly string[];
};

export function resolveScryDeckPlayerId(
  cardPlayed: CardPlayedPayload,
  selectedPlayerIds?: PlayerId[],
): PlayerId {
  return selectedPlayerIds && selectedPlayerIds.length > 0
    ? selectedPlayerIds[0]!
    : cardPlayed.playerId;
}

export function getScryLookedAtCards(
  ctx: PlayCardExecutionContext,
  deckPlayerId: PlayerId,
  amount?: number,
): CardInstanceId[] {
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return [];
  }

  const deckCards = ctx.framework.zones.getCards({
    zone: "deck",
    playerId: deckPlayerId,
  }) as CardInstanceId[];

  return deckCards.slice(0, Math.min(amount, deckCards.length));
}

function normalizeDestinationCards(cards: unknown): CardInstanceId[] {
  if (Array.isArray(cards)) {
    return cards
      .filter((cardId) => typeof cardId === "string")
      .map((cardId) => cardId as CardInstanceId);
  }

  return typeof cards === "string" ? [cards as CardInstanceId] : [];
}

export function isScryEffect(effect: unknown): effect is ScryEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "scry"
  );
}

function normalizeActionDestinationSelections(
  destinations: ResolvedScryEffectInput["destinations"],
): ScryDestinationSelection[] {
  if (!Array.isArray(destinations)) {
    return [];
  }

  return destinations
    .map((destination) => {
      if (!destination || typeof destination !== "object" || Array.isArray(destination)) {
        return undefined;
      }

      const destinationRecord = destination as Record<string, unknown>;
      const zone = destinationRecord.zone;
      const cards = destinationRecord.cards;
      if (typeof zone !== "string" || zone.length === 0) {
        return undefined;
      }

      const normalizedCards = normalizeDestinationCards(cards);
      if (normalizedCards.length === 0) {
        return undefined;
      }

      return {
        cards: normalizedCards,
        zone,
      };
    })
    .filter((selection): selection is ScryDestinationSelection => Boolean(selection));
}

function normalizeScryFilters(filters: unknown): Record<string, unknown>[] {
  if (Array.isArray(filters)) {
    return filters.filter((entry): entry is Record<string, unknown> =>
      Boolean(entry && typeof entry === "object"),
    );
  }

  if (filters && typeof filters === "object") {
    return [filters as Record<string, unknown>];
  }

  return [];
}

function passesScryFilter(
  ctx: PlayCardExecutionContext,
  cardId: CardInstanceId,
  destination: ScryDestination,
): boolean {
  const filters = normalizeScryFilters(destination.filters ?? destination.filter);
  if (filters.length === 0) {
    return true;
  }

  const cardDefinition = ctx.cards.getDefinition(cardId) as
    | ({ cardType?: string; actionSubtype?: string } & Record<string, unknown>)
    | undefined;

  return filters.every((filter) => {
    const filterType = String(filter.type ?? "");
    const cardType = cardDefinition?.cardType;
    switch (filterType) {
      case "card-type":
        return typeof filter.cardType === "string" && cardType === (filter.cardType as string);
      case "classification": {
        if (typeof filter.classification !== "string") {
          return false;
        }

        const classifications = Array.isArray(cardDefinition?.classifications)
          ? (cardDefinition.classifications as unknown[])
          : [];
        return classifications.includes(filter.classification);
      }
      case "song":
        return cardDefinition?.cardType === "action" && cardDefinition?.actionSubtype === "song";
      default:
        return true;
    }
  });
}

function moveDestinationCards(
  cardsForDestination: CardInstanceId[],
  destination: ScryDestination,
  zonePlayerId: string,
  ctx: PlayCardExecutionContext,
): void {
  switch (destination.zone) {
    case "hand":
      for (const cardId of cardsForDestination) {
        ctx.framework.zones.moveCard(cardId, { playerId: zonePlayerId, zone: "hand" });
      }
      break;
    case "deck-bottom": {
      for (const cardId of cardsForDestination) {
        ctx.framework.zones.moveCard(cardId, { playerId: zonePlayerId, zone: "deck" });
      }
      break;
    }
    case "deck-top":
      for (const cardId of cardsForDestination) {
        ctx.framework.zones.moveCard(cardId, { playerId: zonePlayerId, zone: "deck" });
      }
      break;
    case "discard":
      for (const cardId of cardsForDestination) {
        ctx.framework.zones.moveCard(cardId, { playerId: zonePlayerId, zone: "discard" });
      }
      break;
    case "inkwell":
      for (const cardId of cardsForDestination) {
        ctx.framework.zones.moveCard(cardId, { playerId: zonePlayerId, zone: "inkwell" });
        ctx.cards.patchMeta(cardId, {
          publicFaceState: destination.facedown === false ? "faceUp" : "faceDown",
          state: destination.exerted === false ? "ready" : "exerted",
        });
      }
      break;
    case "play":
      for (const cardId of cardsForDestination) {
        ctx.framework.zones.moveCard(cardId, { playerId: zonePlayerId, zone: "play" });
      }
      break;
  }
}

export function resolveScryEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ScryEffect,
  resolvedInput: ResolvedScryEffectInput,
): void {
  const amount =
    typeof resolvedInput.scryAmount === "number" &&
    Number.isFinite(resolvedInput.scryAmount) &&
    resolvedInput.scryAmount > 0
      ? resolvedInput.scryAmount
      : undefined;
  if (!amount) {
    return;
  }

  const deckPlayerId = resolveScryDeckPlayerId(cardPlayed, resolvedInput.selectedPlayerIds);
  const lookedAtCards =
    resolvedInput.lookedAtCards && resolvedInput.lookedAtCards.length > 0
      ? [...resolvedInput.lookedAtCards]
      : getScryLookedAtCards(ctx, deckPlayerId, amount);
  const revealIds = Array.isArray(resolvedInput.revealWindowIds)
    ? [...resolvedInput.revealWindowIds]
    : [];
  if (lookedAtCards.length > 0) {
    if (revealIds.length === 0) {
      revealIds.push(ctx.framework.zones.reveal(lookedAtCards, [cardPlayed.playerId]));
    }
  }

  const opponentIds = ctx.framework.state.playerIds.filter(
    (playerId) => playerId !== cardPlayed.playerId,
  );
  if (lookedAtCards.length === 0) {
    return;
  }

  const destinationSelections = normalizeActionDestinationSelections(resolvedInput.destinations);
  const selectedByZone = new Map<string, CardInstanceId[][]>();
  for (const selection of destinationSelections) {
    const queued = selectedByZone.get(selection.zone) ?? [];
    queued.push(selection.cards);
    selectedByZone.set(selection.zone, queued);
  }

  const selectedCards = new Set<CardInstanceId>();
  const validLookedCards = new Set<CardInstanceId>(lookedAtCards);
  const destinations = effect.destinations ?? [];

  for (const destination of destinations as ScryDestination[]) {
    const maxCards =
      typeof destination.max === "number" &&
      Number.isFinite(destination.max) &&
      destination.max >= 0
        ? destination.max
        : Number.POSITIVE_INFINITY;
    const queuedSelections = selectedByZone.get(destination.zone) ?? [];
    const requestedSelection = queuedSelections.length > 0 ? queuedSelections.shift()! : [];
    const requestedCards = requestedSelection
      .filter((cardId) => validLookedCards.has(cardId) && !selectedCards.has(cardId))
      .filter((cardId) => passesScryFilter(ctx, cardId, destination))
      .slice(0, maxCards);

    let cardsForDestination = [...requestedCards];
    for (const cardId of requestedCards) {
      selectedCards.add(cardId);
    }

    if (destination.remainder) {
      const remainderCards = lookedAtCards
        .filter((cardId) => !selectedCards.has(cardId))
        .filter((cardId) => passesScryFilter(ctx, cardId, destination));
      const remainingSlots = Number.isFinite(maxCards)
        ? Math.max(0, maxCards - cardsForDestination.length)
        : remainderCards.length;
      const addedFromRemainder = remainderCards.slice(0, remainingSlots);
      cardsForDestination = [...cardsForDestination, ...addedFromRemainder];
      for (const cardId of addedFromRemainder) {
        selectedCards.add(cardId);
      }
    }

    if (destination.reveal && cardsForDestination.length > 0 && opponentIds.length > 0) {
      revealIds.push(ctx.framework.zones.reveal(cardsForDestination, opponentIds));
    }

    moveDestinationCards(cardsForDestination, destination, deckPlayerId, ctx);
  }

  for (const revealId of revealIds) {
    ctx.framework.zones.clearReveal(revealId);
  }
}
