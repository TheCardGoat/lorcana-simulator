import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { cardSoldiersSpear } from "./134-card-soldiers-spear";

const damagedSoldier = createMockCharacter({
  id: "card-soldiers-spear-damaged-soldier",
  name: "Damaged Soldier",
  cost: 2,
  strength: 2,
  willpower: 3,
});

const healthySoldier = createMockCharacter({
  id: "card-soldiers-spear-healthy-soldier",
  name: "Healthy Soldier",
  cost: 2,
  strength: 2,
  willpower: 3,
});

describe("Card Soldier's Spear", () => {
  it("gives your damaged characters +1 strength", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [cardSoldiersSpear, { card: damagedSoldier, damage: 1 }, healthySoldier],
    });

    expect(testEngine.asPlayerOne().getCardStrength(damagedSoldier)).toBe(3);
    expect(testEngine.asPlayerOne().getCardStrength(healthySoldier)).toBe(2);
  });
});
