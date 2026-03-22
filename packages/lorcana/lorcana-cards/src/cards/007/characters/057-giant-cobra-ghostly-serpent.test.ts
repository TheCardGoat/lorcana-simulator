import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { giantCobraGhostlySerpent } from "./057-giant-cobra-ghostly-serpent";

const discardFodder = createMockCharacter({
  id: "giant-cobra-discard-fodder",
  name: "Discard Fodder",
  cost: 1,
  strength: 1,
  willpower: 1,
});

describe("Giant Cobra - Ghostly Serpent", () => {
  describe("Vanish", () => {
    it("should have Vanish ability", () => {
      const testEngine = new LorcanaTestEngine({
        play: [giantCobraGhostlySerpent],
      });

      const cardUnderTest = testEngine.getCardModel(giantCobraGhostlySerpent);
      expect(cardUnderTest.hasVanish).toBe(true);
    });
  });

  describe("MYSTERIOUS ADVANTAGE - When you play this character, you may choose and discard a card to gain 2 lore.", () => {
    it("discards a card and gains 2 lore when the optional ability is accepted", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [giantCobraGhostlySerpent, discardFodder],
        inkwell: giantCobraGhostlySerpent.cost,
        deck: 2,
      });

      expect(testEngine.asPlayerOne().playCard(giantCobraGhostlySerpent)).toBeSuccessfulCommand();

      // Accept the optional triggered ability and provide the card to discard
      expect(
        testEngine
          .asPlayerOne()
          .resolveNextBag({ resolveOptional: true, targets: [discardFodder] }),
      ).toBeSuccessfulCommand();

      // The discarded card should be in the discard pile
      expect(testEngine.asPlayerOne().getCardZone(discardFodder)).toBe("discard");

      // Player one should have gained 2 lore
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(2);
    });

    it("does not discard or gain lore when the optional ability is declined", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [giantCobraGhostlySerpent, discardFodder],
        inkwell: giantCobraGhostlySerpent.cost,
        deck: 2,
      });

      expect(testEngine.asPlayerOne().playCard(giantCobraGhostlySerpent)).toBeSuccessfulCommand();

      // Decline the optional triggered ability
      expect(
        testEngine.asPlayerOne().resolveNextBag({ resolveOptional: false }),
      ).toBeSuccessfulCommand();

      // The card should still be in hand
      expect(testEngine.asPlayerOne().getCardZone(discardFodder)).toBe("hand");

      // Player one should have no lore
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
    });
  });
});
