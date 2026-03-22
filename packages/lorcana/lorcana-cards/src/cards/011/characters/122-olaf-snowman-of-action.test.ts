import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { olafSnowmanOfAction } from "./122-olaf-snowman-of-action";

describe("Olaf - Snowman of Action", () => {
  // Note: ABOUT TIME! cost reduction (action type ability) may not be fully implemented
  // in the engine. Cost reduction tests will be added once the engine supports
  // the "action" ability type for play-card cost modification.

  describe("CHAOTIC COLLISION", () => {
    it("each opponent loses 2 lore when Olaf is played", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [olafSnowmanOfAction],
          inkwell: olafSnowmanOfAction.cost,
          deck: 5,
        },
        {
          deck: 5,
        },
        {
          startingLore: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 5,
          },
        },
      );

      expect(testEngine.asPlayerOne().playCard(olafSnowmanOfAction)).toBeSuccessfulCommand();

      // Resolve the triggered CHAOTIC COLLISION bag effect
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
        ).toBeSuccessfulCommand();
      }

      // Opponent should have lost 2 lore (5 -> 3)
      expect(testEngine.getLore(PLAYER_TWO)).toBe(3);
    });

    it("opponent lore does not go below 0", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [olafSnowmanOfAction],
          inkwell: olafSnowmanOfAction.cost,
          deck: 5,
        },
        {
          deck: 5,
        },
        {
          startingLore: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 1,
          },
        },
      );

      expect(testEngine.asPlayerOne().playCard(olafSnowmanOfAction)).toBeSuccessfulCommand();

      // Resolve the triggered CHAOTIC COLLISION bag effect
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
        ).toBeSuccessfulCommand();
      }

      // Opponent had 1 lore, loses 2, but should not go below 0
      expect(testEngine.getLore(PLAYER_TWO)).toBe(0);
    });
  });
});
