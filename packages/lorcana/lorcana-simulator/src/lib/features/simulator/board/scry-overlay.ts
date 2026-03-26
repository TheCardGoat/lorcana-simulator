import type {
  AvailableMovesSelectionEntry,
  AvailableMovesScryDestinationState,
  ResolutionScryAvailableMovesSelectionState,
} from "@/features/simulator/model/contracts.js";

const SCRYPT_ZONE_DROP_ID_PREFIX = "scry-zone:";
const SCRYPT_CARD_DROP_ID_PREFIX = "scry-card:";
const SCRYPT_DRAG_ID_PREFIX = "scry-drag:";

export interface ScryDropTarget {
  destinationId: string;
  beforeCardId: string | null;
}

export function buildScryZoneDropId(destinationId: string): string {
  return `${SCRYPT_ZONE_DROP_ID_PREFIX}${destinationId}`;
}

export function buildScryCardDropId(destinationId: string, cardId: string): string {
  return `${SCRYPT_CARD_DROP_ID_PREFIX}${destinationId}:${cardId}`;
}

export function buildScryDragId(cardId: string): string {
  return `${SCRYPT_DRAG_ID_PREFIX}${cardId}`;
}

export function parseScryDragId(id: string | null | undefined): string | null {
  if (!id || !id.startsWith(SCRYPT_DRAG_ID_PREFIX)) {
    return null;
  }

  return id.slice(SCRYPT_DRAG_ID_PREFIX.length) || null;
}

export function parseScryDropTarget(id: string | null | undefined): ScryDropTarget | null {
  if (!id) {
    return null;
  }

  if (id.startsWith(SCRYPT_ZONE_DROP_ID_PREFIX)) {
    const destinationId = id.slice(SCRYPT_ZONE_DROP_ID_PREFIX.length);
    return destinationId ? { destinationId, beforeCardId: null } : null;
  }

  if (id.startsWith(SCRYPT_CARD_DROP_ID_PREFIX)) {
    const payload = id.slice(SCRYPT_CARD_DROP_ID_PREFIX.length);
    const separatorIndex = payload.lastIndexOf(":");
    if (separatorIndex <= 0) {
      return null;
    }

    const destinationId = payload.slice(0, separatorIndex);
    const beforeCardId = payload.slice(separatorIndex + 1);
    return destinationId && beforeCardId ? { destinationId, beforeCardId } : null;
  }

  return null;
}

export function findScryDestination(
  selectionState: ResolutionScryAvailableMovesSelectionState,
  destinationId: string,
): AvailableMovesScryDestinationState | null {
  return (
    selectionState.destinations.find((destination) => destination.id === destinationId) ?? null
  );
}

export function findScryEntry(
  selectionState: ResolutionScryAvailableMovesSelectionState,
  cardId: string,
): AvailableMovesSelectionEntry | null {
  return selectionState.entries.find((entry) => entry.cardId === cardId) ?? null;
}

export function findScryCardDestinationId(
  selectionState: ResolutionScryAvailableMovesSelectionState,
  cardId: string,
): string | null {
  for (const destination of selectionState.destinations) {
    if (destination.cards.some((card) => card.cardId === cardId)) {
      return destination.id;
    }
  }

  return null;
}

export function getScryRemainderDestination(
  selectionState: ResolutionScryAvailableMovesSelectionState,
): AvailableMovesScryDestinationState | null {
  return selectionState.destinations.find((destination) => destination.rule.remainder) ?? null;
}

export function getScryDestinationCountLabel(
  destination: AvailableMovesScryDestinationState,
): string {
  const max = destination.rule.max;
  if (max === null) {
    return `${destination.cards.length}`;
  }

  return `${destination.cards.length}/${max}`;
}

export function canAssignScryCardToDestination(
  selectionState: ResolutionScryAvailableMovesSelectionState,
  cardId: string,
  destinationId: string,
): boolean {
  const entry = findScryEntry(selectionState, cardId);
  const destination = findScryDestination(selectionState, destinationId);
  if (!entry?.cardId || !destination) {
    return false;
  }

  if (!entry.availableDestinationIds?.includes(destinationId)) {
    return false;
  }

  const currentDestinationId = findScryCardDestinationId(selectionState, cardId);
  const currentCount = destination.cards.length;
  const adjustedCount = currentDestinationId === destinationId ? currentCount : currentCount + 1;

  return destination.rule.max === null || adjustedCount <= destination.rule.max;
}

export function getScryTapDestination(
  selectionState: ResolutionScryAvailableMovesSelectionState,
  cardId: string,
): string | null {
  const currentDestinationId = findScryCardDestinationId(selectionState, cardId);
  const remainderDestination = getScryRemainderDestination(selectionState);
  if (!currentDestinationId || !remainderDestination) {
    return null;
  }

  if (currentDestinationId !== remainderDestination.id) {
    return canAssignScryCardToDestination(selectionState, cardId, remainderDestination.id)
      ? remainderDestination.id
      : null;
  }

  for (const destination of selectionState.destinations) {
    if (destination.rule.remainder) {
      continue;
    }

    if (canAssignScryCardToDestination(selectionState, cardId, destination.id)) {
      return destination.id;
    }
  }

  return null;
}

/**
 * The engine places deck-top cards by appending in array order, so the LAST card in the array
 * ends up at the actual top (drawn first). Similarly, deck-bottom cards are inserted at index 0,
 * so the LAST card in the array ends up at the actual bottom.
 *
 * To make the display intuitive (left = drawn first for deck-top; left = deepest for deck-bottom),
 * we show ordered destinations in reversed visual order. This function maps a "before card X"
 * from the reversed visual display back to the correct insertion point in the original array.
 *
 * Visual "before X" in a reversed display means "after X" in the original array —
 * so we return the card at indexOf(X) + 1 in the original.
 */
export function mapReversedBeforeCardId(
  destination: AvailableMovesScryDestinationState,
  visualBeforeCardId: string | null,
): string | null {
  if (!destination.orderingEnabled || visualBeforeCardId === null) {
    return visualBeforeCardId;
  }

  const originalCards = destination.cards
    .map((card) => card.cardId)
    .filter((id): id is string => Boolean(id));

  const idx = originalCards.indexOf(visualBeforeCardId);
  if (idx < 0) {
    return null;
  }

  return idx + 1 < originalCards.length ? originalCards[idx + 1] : null;
}

export function getScryDesiredOrder(
  destination: AvailableMovesScryDestinationState,
  draggedCardId: string,
  beforeCardId: string | null,
): string[] | null {
  const remainingCards = destination.cards
    .map((card) => card.cardId)
    .filter((cardId): cardId is string => Boolean(cardId) && cardId !== draggedCardId);
  const insertIndex =
    beforeCardId === null ? remainingCards.length : remainingCards.indexOf(beforeCardId);

  if (insertIndex < 0) {
    return null;
  }

  remainingCards.splice(insertIndex, 0, draggedCardId);
  return remainingCards;
}
