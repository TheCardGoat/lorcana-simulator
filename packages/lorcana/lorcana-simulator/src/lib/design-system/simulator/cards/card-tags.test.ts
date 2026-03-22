import { describe, expect, it } from "bun:test";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import { getLorcanaCardTagGroups, getLorcanaCardTags } from "./card-tags.js";

function createCardSnapshot(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: "card-1",
    definitionId: "def-card-1",
    facePresentation: "faceUp",
    isMasked: false,
    label: "The Queen - Commanding Presence",
    ownerId: "player-one",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType: "character",
    strength: 4,
    baseStrength: 4,
    willpower: 3,
    baseWillpower: 3,
    loreValue: 2,
    baseLoreValue: 2,
    readyState: "ready",
    damage: 0,
    ...overrides,
  };
}

describe("card tags", () => {
  it("separates stat modifiers from generic tags while keeping hover ordering", () => {
    const card = createCardSnapshot({
      isDrying: true,
      damage: 2,
      strength: 8,
      willpower: 1,
      loreValue: 3,
      readyState: "exerted",
      keywords: ["Rush"],
    });

    const groups = getLorcanaCardTagGroups(card);

    expect(groups.statModifiers.map((modifier) => modifier.id)).toEqual([
      "lore-bonus",
      "strength-bonus",
      "willpower-bonus",
    ]);
    expect(groups.statModifiers.map((modifier) => modifier.signedValue)).toEqual([
      "+1",
      "+4",
      "-2",
    ]);
    expect(groups.statModifiers.map((modifier) => modifier.tone)).toEqual([
      "success",
      "success",
      "warning",
    ]);

    expect(groups.tags.map((tag) => tag.id)).toEqual(["fresh-ink", "damage", "exerted", "rush"]);
    expect(getLorcanaCardTags(card).map((tag) => tag.id)).toEqual([
      "fresh-ink",
      "damage",
      "lore-bonus",
      "strength-bonus",
      "willpower-bonus",
      "exerted",
      "rush",
    ]);
  });

  it("omits stat modifiers when values match their base stats", () => {
    const groups = getLorcanaCardTagGroups(
      createCardSnapshot({
        damage: 3,
        readyState: "exerted",
      }),
    );

    expect(groups.statModifiers).toHaveLength(0);
    expect(groups.tags.map((tag) => tag.id)).toEqual(["damage", "exerted"]);
  });
});
