import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { ladyFamilyDog } from "./011-lady-family-dog";

const cheapCharacter = createMockCharacter({
  id: "lady-test-cheap",
  name: "Cheap Character",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
});

const expensiveCharacter = createMockCharacter({
  id: "lady-test-expensive",
  name: "Expensive Character",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
});

describe("Lady - Family Dog", () => {
  describe("SOMEONE TO CARE FOR - When you play this character, you may play a character with cost 2 or less for free.", () => {
    it("should allow playing a character with cost 2 or less for free from hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [ladyFamilyDog, cheapCharacter],
        inkwell: ladyFamilyDog.cost,
        deck: 5,
      });

      expect(testEngine.asPlayerOne().playCard(ladyFamilyDog)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      const bagId = bagEffects[0]!.id;
      expect(
        testEngine.asPlayerOne().resolveBag(bagId, {
          resolveOptional: true,
          targets: [cheapCharacter],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(cheapCharacter)).toBe("play");
    });

    it("should be optional - can decline the ability", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [ladyFamilyDog, cheapCharacter],
        inkwell: ladyFamilyDog.cost,
        deck: 5,
      });

      expect(testEngine.asPlayerOne().playCard(ladyFamilyDog)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      const bagId = bagEffects[0]!.id;
      expect(
        testEngine.asPlayerOne().resolveBag(bagId, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(cheapCharacter)).toBe("hand");
    });

    it("should not allow playing a character with cost greater than 2", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [ladyFamilyDog, expensiveCharacter],
        inkwell: ladyFamilyDog.cost,
        deck: 5,
      });

      expect(testEngine.asPlayerOne().playCard(ladyFamilyDog)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      if (bagEffects.length > 0) {
        const bagId = bagEffects[0]!.id;
        testEngine.asPlayerOne().resolveBag(bagId, {
          resolveOptional: true,
          targets: [expensiveCharacter],
        });
      }

      // Expensive character should not have moved to play
      expect(testEngine.asPlayerOne().getCardZone(expensiveCharacter)).not.toBe("play");
    });
  });
});
