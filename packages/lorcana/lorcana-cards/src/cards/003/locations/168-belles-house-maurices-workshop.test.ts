import { describe, expect, it } from "bun:test";
import type { ItemCard } from "@tcg/lorcana-types";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { bellesHouseMauricesWorkshop } from "./168-belles-house-maurices-workshop";

const workshopHelper = createMockCharacter({
  id: "workshop-helper",
  name: "Workshop Helper",
  cost: 2,
});

const testItemI18n = {
  en: { name: "Workshop Item" },
  de: { name: "Workshop Item" },
  fr: { name: "Workshop Item" },
  it: { name: "Workshop Item" },
};

const testItem: ItemCard = {
  id: "workshop-item",
  canonicalId: "ci_workshop_item",
  cardType: "item",
  name: "Workshop Item",
  i18n: testItemI18n,
  cost: 1,
  inkType: ["sapphire"],
  inkable: true,
  set: "TST",
  rarity: "common",
  cardNumber: 1,
  abilities: [],
};

describe("Belle's House - Maurice's Workshop", () => {
  it("reduces item costs while you have a character here", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [testItem],
      play: [
        bellesHouseMauricesWorkshop,
        { card: workshopHelper, atLocation: bellesHouseMauricesWorkshop },
      ],
    });

    expect(testEngine.asPlayerOne().canPlayCard(testItem)).toBe(true);
    expect(testEngine.asPlayerOne().playCard(testItem)).toBeSuccessfulCommand();
  });
});
