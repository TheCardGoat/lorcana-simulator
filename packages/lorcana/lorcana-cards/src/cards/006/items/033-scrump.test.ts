import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { scrump } from "./033-scrump";

const stitchedFriend = createMockCharacter({
  id: "scrump-stitched-friend",
  name: "Stitched Friend",
  cost: 2,
  strength: 2,
  willpower: 3,
});

const chosenCharacter = createMockCharacter({
  id: "scrump-chosen-character",
  name: "Chosen Character",
  cost: 3,
  strength: 4,
  willpower: 4,
});

describe("Scrump", () => {
  it("lets you exert one of your characters to give the chosen character -2 strength until your next turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 2,
        play: [scrump, stitchedFriend],
      },
      {
        deck: 2,
        play: [chosenCharacter],
      },
    );
    const baseStrength = testEngine.asPlayerTwo().getCardStrength(chosenCharacter);

    expect(
      testEngine.asPlayerOne().activateAbility(scrump, {
        costs: {
          exertCharacters: [stitchedFriend],
        },
        targets: [chosenCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(stitchedFriend)).toBe(true);
    expect(testEngine.asPlayerTwo().getCardStrength(chosenCharacter)).toBe(baseStrength - 2);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardStrength(chosenCharacter)).toBe(baseStrength);
  });
});
