import type { LorcanaPlayerSide } from "@/features/simulator/model/contracts.js";

export type SupportedDropZone = "play" | "inkwell" | "hand";
export type DraggedCardKind = "hand" | "hand-targeted-action" | "play-character";

export interface ZoneDropIntent {
  kind: "zone";
  playerSide: LorcanaPlayerSide;
  zoneId: SupportedDropZone;
}

export interface LocationDropIntent {
  kind: "location";
  playerSide: LorcanaPlayerSide;
  zoneId: "play";
  locationId: string;
}

export interface CardDropIntent {
  kind: "card";
  playerSide: LorcanaPlayerSide;
  zoneId: "play";
  targetCardId: string;
}

export type DropIntent = ZoneDropIntent | LocationDropIntent | CardDropIntent;

export interface DropActionGame {
  openPlayCardSelection: (cardId: string, options?: { targetCardId?: string }) => boolean;
  playCard: (cardId: string) => boolean;
  ink: (cardId: string) => boolean;
  shouldOpenPlayCardSelectionOnDrop: (cardId: string) => boolean;
  canDropHandCardIntoZone: (
    cardId: string,
    zoneId: Extract<SupportedDropZone, "play" | "inkwell">,
  ) => boolean;
  canPlayCardOnTarget: (cardId: string, targetCardId: string) => boolean;
  canMoveCharacterToLocation: (characterId: string, locationId: string) => boolean;
  executeMove: (
    moveId: "moveCharacterToLocation",
    params: {
      characterId: string;
      locationId: string;
    },
    options: {
      clearChallengeMode: boolean;
      clearSelection: boolean;
    },
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
  if (!dropIntent || (dropIntent.kind !== "card" && dropIntent.playerSide !== ownerSide)) {
    return false;
  }

  if (dropIntent.kind === "zone") {
    const { zoneId } = dropIntent;
    if (zoneId === "hand") {
      return false;
    }

    if (draggedCardKind === "hand-targeted-action" && zoneId === "play") {
      return game.openPlayCardSelection(cardId);
    }

    if (game.canDropHandCardIntoZone(cardId, zoneId)) {
      if (zoneId === "play") {
        if (game.shouldOpenPlayCardSelectionOnDrop(cardId)) {
          return game.openPlayCardSelection(cardId);
        }

        return game.playCard(cardId);
      }

      return game.ink(cardId);
    }
  }

  if (dropIntent.kind === "card" && draggedCardKind === "hand-targeted-action") {
    return game.canPlayCardOnTarget(cardId, dropIntent.targetCardId)
      ? game.openPlayCardSelection(cardId, { targetCardId: dropIntent.targetCardId })
      : game.openPlayCardSelection(cardId);
  }

  if (
    dropIntent.kind === "location" &&
    draggedCardKind === "play-character" &&
    game.canMoveCharacterToLocation(cardId, dropIntent.locationId)
  ) {
    return game.executeMove(
      "moveCharacterToLocation",
      {
        characterId: cardId,
        locationId: dropIntent.locationId,
      },
      {
        clearChallengeMode: true,
        clearSelection: true,
      },
    );
  }

  return false;
}
