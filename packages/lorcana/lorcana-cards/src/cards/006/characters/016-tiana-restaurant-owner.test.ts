import { describe, expect, it } from "bun:test";
import { createMockCharacter, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { tianaRestaurantOwner } from "./016-tiana-restaurant-owner";

const ally = createMockCharacter({
  id: "tiana-restaurant-owner-ally",
  name: "Ally",
  cost: 2,
  strength: 1,
  willpower: 6,
});

const attacker = createMockCharacter({
  id: "tiana-restaurant-owner-attacker",
  name: "Attacker",
  cost: 3,
  strength: 4,
  willpower: 3,
});

describe("Tiana - Restaurant Owner", () => {
  describe("SPECIAL RESERVATION - Whenever a character of yours is challenged while this character is exerted, the challenging character gets -3 {S} this turn unless their player pays 3 {I}.", () => {
    it("should apply -3 strength to the challenging character when Tiana is exerted", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [
            { card: tianaRestaurantOwner, exerted: true },
            { card: ally, exerted: true },
          ],
          deck: 2,
        },
        {
          play: [{ card: attacker, exerted: false, isDrying: false }],
          deck: 2,
        },
      );

      // Pass priority to player two so they can challenge
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().challenge(attacker, ally)).toBeSuccessfulCommand();

      // Resolve Tiana's triggered ability from the bag (owned by player one)
      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      if (bagEffects.length > 0) {
        expect(testEngine.asPlayerOne().resolveBag(bagEffects[0]!.id)).toBeSuccessfulCommand();
      }

      // Attacker should have -3 strength applied (4 - 3 = 1)
      expect(testEngine.asPlayerTwo().getCard(attacker).strength).toBe(attacker.strength - 3);
    });

    it("should NOT apply -3 strength when Tiana is NOT exerted", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [
            { card: tianaRestaurantOwner, exerted: false },
            { card: ally, exerted: true },
          ],
          deck: 2,
        },
        {
          play: [{ card: attacker, exerted: false, isDrying: false }],
          deck: 2,
        },
      );

      // Pass priority to player two so they can challenge
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().challenge(attacker, ally)).toBeSuccessfulCommand();

      // No modifier should be applied since Tiana is not exerted
      expect(testEngine.asPlayerTwo().getCard(attacker).strength).toBe(attacker.strength);
    });
  });
});
