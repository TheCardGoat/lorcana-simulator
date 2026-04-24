import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { theFamilyScattered } from "./097-the-family-scattered";

const opponentCharacterA = createMockCharacter({
  id: "family-scattered-opp-a",
  name: "Opponent Character A",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const opponentCharacterB = createMockCharacter({
  id: "family-scattered-opp-b",
  name: "Opponent Character B",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
});

const opponentCharacterC = createMockCharacter({
  id: "family-scattered-opp-c",
  name: "Opponent Character C",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
});

describe("The Family Scattered", () => {
  it("opponent returns one character to hand, puts one on bottom of deck, and puts one on top of deck", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theFamilyScattered],
        inkwell: theFamilyScattered.cost,
        deck: 2,
      },
      {
        play: [opponentCharacterA, opponentCharacterB, opponentCharacterC],
        deck: 3,
      },
    );

    expect(testEngine.asPlayerOne().playCard(theFamilyScattered)).toBeSuccessfulCommand();

    // Opponent chooses which of their characters to return to hand
    expect(
      testEngine.asPlayerTwo().resolveNextPending({ targets: [opponentCharacterA] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterA)).toBe("hand");

    // Opponent chooses which of their characters to put on the bottom of their deck
    expect(
      testEngine.asPlayerTwo().resolveNextPending({ targets: [opponentCharacterB] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterB)).toBe("deck");

    // Opponent chooses which of their characters to put on the top of their deck
    expect(
      testEngine.asPlayerTwo().resolveNextPending({ targets: [opponentCharacterC] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(opponentCharacterC)).toBe("deck");
  });
});
