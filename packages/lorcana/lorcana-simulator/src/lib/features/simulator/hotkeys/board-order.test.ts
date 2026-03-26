import { describe, expect, it } from "bun:test";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import { buildOrderedPlayZoneEntries, getOrderedPlayZoneCards } from "./board-order.js";

function createCard(
  cardId: string,
  label: string,
  overrides: Partial<LorcanaCardSnapshot> = {},
): LorcanaCardSnapshot {
  return {
    cardId,
    definitionId: `def-${cardId}`,
    isMasked: false,
    label,
    ownerId: "player-one",
    ownerSide: "playerOne",
    zoneId: "play",
    facePresentation: "faceUp",
    ...overrides,
  };
}

describe("board-order", () => {
  it("keeps top seat location clusters inline", () => {
    const cards = [
      createCard("location-1", "Location", { cardType: "location" }),
      createCard("character-1", "Occupant", {
        cardType: "character",
        atLocationId: "location-1",
      }),
      createCard("character-2", "Standalone", { cardType: "character" }),
    ];

    const ordered = buildOrderedPlayZoneEntries(cards, "top");

    expect(ordered.map((entry) => entry.card.cardId)).toEqual([
      "location-1",
      "character-1",
      "character-2",
    ]);
    expect(ordered[0]?.association?.role).toBe("location");
    expect(ordered[1]?.association?.role).toBe("occupant");
  });

  it("moves bottom seat location clusters after standalone cards", () => {
    const cards = [
      createCard("location-1", "Location", { cardType: "location" }),
      createCard("character-1", "Occupant", {
        cardType: "character",
        atLocationId: "location-1",
      }),
      createCard("character-2", "Standalone", { cardType: "character" }),
    ];

    const ordered = getOrderedPlayZoneCards(cards, "bottom");

    expect(ordered.map((card) => card.cardId)).toEqual([
      "character-2",
      "location-1",
      "character-1",
    ]);
  });

  it("ignores occupants whose location is not visible", () => {
    const cards = [
      createCard("character-1", "Loose Character", {
        cardType: "character",
        atLocationId: "missing-location",
      }),
    ];

    const ordered = buildOrderedPlayZoneEntries(cards, "bottom");

    expect(ordered).toHaveLength(1);
    expect(ordered[0]?.association).toBeUndefined();
    expect(ordered[0]?.card.cardId).toBe("character-1");
  });
});
