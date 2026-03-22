import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { percyPupsicle } from "./027-percy-pupsicle";

const mockOpponent = createMockCharacter({
  id: "percy-test-opponent",
  name: "Test Opponent",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

describe("Percy - Pupsicle", () => {
  describe("ICE BATH - This character can't challenge", () => {
    it("card model reports canChallenge as false due to static restriction", () => {
      const testEngine = new LorcanaTestEngine({
        play: [percyPupsicle],
      });

      const cardUnderTest = testEngine.getCardModel(percyPupsicle);
      expect(cardUnderTest.canChallenge()).toBe(false);
    });

    it("cannot challenge an exerted opponent character", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [percyPupsicle],
          deck: 2,
        },
        {
          play: [{ card: mockOpponent, exerted: true }],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().canChallenge(percyPupsicle, mockOpponent)).toBe(false);
    });

    it("can be challenged by opponent when exerted", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: percyPupsicle, exerted: true }],
          deck: 2,
        },
        {
          play: [mockOpponent],
          deck: 2,
        },
      );

      // Pass turn so player two has priority and can attempt challenges
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().canChallenge(mockOpponent, percyPupsicle)).toBe(true);
    });
  });
});
