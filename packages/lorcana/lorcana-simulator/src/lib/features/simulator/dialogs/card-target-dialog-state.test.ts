import { describe, expect, it } from "bun:test";

import { buildCardTargetDialogState } from "./card-target-dialog-state.js";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";

const discardCharacter: LorcanaCardSnapshot = {
  cardId: "discard-character",
  definitionId: "001-001",
  isMasked: false,
  label: "Simba - Returned King",
  ownerId: "player-one",
  ownerSide: "playerOne",
  zoneId: "discard",
  cardType: "character",
  facePresentation: "faceUp",
};

const discardItem: LorcanaCardSnapshot = {
  cardId: "discard-item",
  definitionId: "001-002",
  isMasked: false,
  label: "Maurice's Workshop",
  ownerId: "player-one",
  ownerSide: "playerOne",
  zoneId: "discard",
  cardType: "item",
  facePresentation: "faceUp",
};

describe("buildCardTargetDialogState", () => {
  it("filters cards and generates badges from discard targeting", () => {
    const state = buildCardTargetDialogState({
      cards: [discardCharacter, discardItem],
      viewerSide: "playerOne",
      target: {
        selector: "all",
        owner: "you",
        zones: ["discard"],
        cardType: "character",
      },
    });

    expect(state.badgeModels.map((badge) => badge.label)).toContain("zones: discard");
    expect(state.badgeModels.map((badge) => badge.label)).toContain("cardType: character");
    expect(state.orderedCards.map((card) => card.cardId)).toEqual(["discard-character"]);
  });

  it("tracks the combined selected card and player count for the universal modal footer", () => {
    const state = buildCardTargetDialogState({
      cards: [discardCharacter],
      target: {
        selector: "all",
        owner: "you",
        zones: ["discard"],
      },
      selectedCardIds: [discardCharacter.cardId],
      selectedPlayerCount: 1,
    });

    expect(state.selectedCount).toBe(2);
  });
});
