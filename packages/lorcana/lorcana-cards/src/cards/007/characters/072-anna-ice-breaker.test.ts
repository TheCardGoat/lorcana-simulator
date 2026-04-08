import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { annaIceBreaker } from "./072-anna-ice-breaker";

const opponentCharacter = createMockCharacter({
  id: "opp-char",
  name: "Opponent Character",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

describe("Anna - Ice Breaker", () => {
  describe("WINTER AMBUSH — When you play this character, chosen opposing character can't ready at the start of their next turn.", () => {
    it("triggers when played and prompts for target selection", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [annaIceBreaker],
          inkwell: annaIceBreaker.cost,
          deck: 2,
        },
        {
          play: [opponentCharacter],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().playCard(annaIceBreaker)).toBeSuccessfulCommand();

      // Triggered ability should be on the stack
      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
    });

    it("applies cant-ready restriction to the chosen opposing character", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [annaIceBreaker],
          inkwell: annaIceBreaker.cost,
          deck: 2,
        },
        {
          play: [{ card: opponentCharacter, exerted: true }],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().playCard(annaIceBreaker)).toBeSuccessfulCommand();

      // Resolve the triggered ability targeting the opponent's character
      expect(
        testEngine
          .asPlayerOne()
          .resolvePendingByCard(annaIceBreaker, { targets: [opponentCharacter] }),
      ).toBeSuccessfulCommand();

      // The opponent character should have the cant-ready restriction
      expect(testEngine.asPlayerTwo()).toHaveRestriction({
        card: opponentCharacter,
        restriction: "cant-ready",
      });

      // Pass player one's turn — at start of player two's turn, the character should NOT ready
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.isExerted(opponentCharacter)).toBe(true);
    });
  });
});
