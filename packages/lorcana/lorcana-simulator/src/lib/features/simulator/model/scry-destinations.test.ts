import { describe, expect, it } from "bun:test";
import {
  canAssignCardToScryDestination,
  getScryDestinationConstraintSummary,
  isScryDestinationManuallyOrdered,
} from "./scry-destinations.js";
import type { LorcanaCardSnapshot } from "./contracts.js";

const baseCard: LorcanaCardSnapshot = {
  cardId: "card-1",
  definitionId: "def-1",
  isMasked: false,
  label: "Reflection",
  ownerId: "player_one",
  ownerSide: "playerOne",
  zoneId: "deck",
  cardType: "action",
  actionSubtype: "song",
  cost: 1,
  facePresentation: "faceUp",
};

describe("scry destination helpers", () => {
  it("evaluates selection filters using card metadata", () => {
    expect(
      canAssignCardToScryDestination(baseCard, {
        id: "song-hand",
        zone: "hand",
        min: 0,
        max: 1,
        remainder: false,
        filters: [{ type: "song" }],
      }),
    ).toBe(true);

    expect(
      canAssignCardToScryDestination(baseCard, {
        id: "character-only",
        zone: "play",
        min: 0,
        max: 1,
        remainder: false,
        filters: [{ type: "card-type", cardType: "character" }],
      }),
    ).toBe(false);
  });

  it("formats destination summaries for the overlay", () => {
    expect(
      getScryDestinationConstraintSummary({
        id: "ink",
        zone: "inkwell",
        min: 1,
        max: 1,
        remainder: false,
        facedown: true,
        exerted: true,
      }),
    ).toContain("facedown, exerted");
  });

  it("only allows manual reorder for player-ordered deck destinations", () => {
    expect(
      isScryDestinationManuallyOrdered({
        id: "top",
        zone: "deck-top",
        min: 0,
        max: null,
        remainder: true,
        ordering: "player-choice",
      }),
    ).toBe(true);

    expect(
      isScryDestinationManuallyOrdered({
        id: "hand",
        zone: "hand",
        min: 0,
        max: 1,
        remainder: false,
      }),
    ).toBe(false);
  });
});
