import type { LorcanaPlayerSide } from "@/features/simulator/model/contracts.js";

export type SupportedDropZone = "play" | "inkwell" | "hand";
export type DraggedCardKind = "hand";

export interface ZoneDropIntent {
  kind: "zone";
  playerSide: LorcanaPlayerSide;
  zoneId: SupportedDropZone;
}

export type DropIntent = ZoneDropIntent;

export interface DropActionGame {
  openPlayCardSelection: (cardId: string) => boolean;
  playCard: (cardId: string) => boolean;
  ink: (cardId: string) => boolean;
  shouldOpenPlayCardSelectionOnDrop: (cardId: string) => boolean;
  canDropHandCardIntoZone: (
    cardId: string,
    zoneId: Extract<SupportedDropZone, "play" | "inkwell">,
  ) => boolean;
}

export function dispatchDropIntent(args: {
  cardId: string;
  dropIntent: DropIntent | null;
  draggedCardKind: DraggedCardKind | null;
  ownerSide: LorcanaPlayerSide | null;
  game: DropActionGame;
}): boolean {
  const { cardId, dropIntent, draggedCardKind, ownerSide, game } = args;
  if (!dropIntent || dropIntent.playerSide !== ownerSide || draggedCardKind !== "hand") {
    return false;
  }

  const { zoneId } = dropIntent;
  if (zoneId === "hand") {
    return false;
  }

  if (!game.canDropHandCardIntoZone(cardId, zoneId)) {
    return false;
  }

  if (zoneId === "play") {
    if (game.shouldOpenPlayCardSelectionOnDrop(cardId)) {
      return game.openPlayCardSelection(cardId);
    }

    return game.playCard(cardId);
  }

  return game.ink(cardId);
}
