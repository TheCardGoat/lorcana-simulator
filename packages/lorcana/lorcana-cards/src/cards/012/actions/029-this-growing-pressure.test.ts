import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { thisGrowingPressure } from "./029-this-growing-pressure";

const opposingCharacter = createMockCharacter({
  id: "this-growing-pressure-opponent",
  name: "Opponent Character",
  cost: 3,
  strength: 2,
  willpower: 4,
});

describe("This Growing Pressure", () => {
  it("can be played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [thisGrowingPressure],
      inkwell: thisGrowingPressure.cost,
      deck: 3,
    });

    expect(testEngine.asPlayerOne().playCard(thisGrowingPressure)).toBeSuccessfulCommand();
  });

  it("gives chosen opposing character cant-challenge and must-quest during their next turn, then draws a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [thisGrowingPressure],
        inkwell: thisGrowingPressure.cost,
        deck: 3,
      },
      {
        play: [opposingCharacter],
        deck: 3,
      },
    );

    const handBefore = testEngine.asPlayerOne().getZonesCardCount().hand;

    expect(
      testEngine.asPlayerOne().playCard(thisGrowingPressure, {
        targets: [opposingCharacter],
      }),
    ).toBeSuccessfulCommand();

    // Played one, drew one — net same size
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(handBefore);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.hasRestriction(opposingCharacter, "cant-challenge")).toBe(true);
    expect(testEngine.hasRestriction(opposingCharacter, "must-quest")).toBe(true);
    expect(testEngine.asPlayerTwo().quest(opposingCharacter)).toBeSuccessfulCommand();
  });
});
