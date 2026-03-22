import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { liloMakingAWish, stitchNewDog } from "../../001";
import { liloEscapeArtist } from "../../006";
import { stitchRockStar } from "./003-stitch-rock-star";

describe("Stitch - Rock Star (Set 9 reprint)", () => {
  describe("ADORING FANS — Whenever you play a character with cost 2 or less, you may exert them to draw a card.", () => {
    it("exerts played characters and draws cards for each", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: 2,
          inkwell: stitchNewDog.cost + liloMakingAWish.cost,
          hand: [stitchNewDog, liloMakingAWish],
          play: [stitchRockStar],
        },
        { deck: 2 },
      );

      // Play first cheap character
      expect(testEngine.asPlayerOne().playCard(stitchNewDog)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().resolveNextBag()).toBeSuccessfulCommand();

      expect(testEngine.isExerted(stitchNewDog)).toBe(true);
      expect(testEngine.asPlayerOne().getCardsInZone("deck", PLAYER_ONE).count).toBe(1);

      // Play second cheap character
      expect(testEngine.asPlayerOne().playCard(liloMakingAWish)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().resolveNextBag()).toBeSuccessfulCommand();

      expect(testEngine.isExerted(liloMakingAWish)).toBe(true);
      expect(testEngine.asPlayerOne().getCardsInZone("deck", PLAYER_ONE).count).toBe(0);
    });

    it("does not exert or draw when the optional is declined", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: 2,
          inkwell: stitchNewDog.cost + liloMakingAWish.cost,
          hand: [stitchNewDog, liloMakingAWish],
          play: [stitchRockStar],
        },
        { deck: 2 },
      );

      // Play first cheap character, decline
      expect(testEngine.asPlayerOne().playCard(stitchNewDog)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextBag({ resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.isExerted(stitchNewDog)).toBe(false);
      expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
        expect.objectContaining({ deck: 2, hand: 1, play: 2 }),
      );

      // Play second cheap character, decline
      expect(testEngine.asPlayerOne().playCard(liloMakingAWish)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerOne().resolveNextBag({ resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.isExerted(liloMakingAWish)).toBe(false);
      expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
        expect.objectContaining({ deck: 2, hand: 0, play: 3 }),
      );
    });
  });

  describe("Interaction with Lilo Escape Artist", () => {
    it.todo("should NOT draw a card when Lilo enters play already exerted from discard", () => {});
  });
});
