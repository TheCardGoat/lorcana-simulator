import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { montereyJackHypnotizedByCheese } from "./012-monterey-jack-hypnotized-by-cheese";

const sturdyAlly = createMockCharacter({
  id: "mj-hyp-sturdy-ally",
  name: "Sturdy Ally",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 1,
});

const frailAlly = createMockCharacter({
  id: "mj-hyp-frail-ally",
  name: "Frail Ally",
  cost: 1,
  strength: 1,
  willpower: 3,
  lore: 1,
});

describe("Monterey Jack - Hypnotized by Cheese", () => {
  describe("BREAK THE TRANCE - This character can't quest unless you have a character with 4 {W} or more in play.", () => {
    it("has quest restriction when no character with 4+ willpower is in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: montereyJackHypnotizedByCheese }, frailAlly],
      });

      expect(
        testEngine.asPlayerOne().getCard(montereyJackHypnotizedByCheese)?.hasQuestRestriction,
      ).toBe(true);
    });

    it("lifts quest restriction once a character with 4+ willpower is in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: sturdyAlly.cost,
        hand: [sturdyAlly],
        play: [{ card: montereyJackHypnotizedByCheese }],
      });

      expect(
        testEngine.asPlayerOne().getCard(montereyJackHypnotizedByCheese)?.hasQuestRestriction,
      ).toBe(true);

      expect(testEngine.asPlayerOne().playCard(sturdyAlly)).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().getCard(montereyJackHypnotizedByCheese)?.hasQuestRestriction,
      ).toBe(false);
    });
  });
});
