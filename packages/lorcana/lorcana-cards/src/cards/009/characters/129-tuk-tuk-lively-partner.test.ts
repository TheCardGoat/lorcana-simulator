import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  createMockLocation,
} from "@tcg/lorcana-engine/testing";
import { tukTukLivelyPartner } from "./129-tuk-tuk-lively-partner";

const otherCharacter = createMockCharacter({
  id: "tuk-tuk-test-other-character",
  name: "Other Character",
  cost: 2,
  strength: 3,
  willpower: 3,
});

const testLocation = createMockLocation({
  id: "tuk-tuk-test-location",
  name: "Test Location",
  cost: 2,
  moveCost: 1,
  willpower: 6,
  lore: 1,
});

describe("Tuk Tuk - Lively Partner (Set 9)", () => {
  it("has Evasive keyword", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [tukTukLivelyPartner],
    });

    expect(testEngine.asPlayerOne().hasKeyword(tukTukLivelyPartner, "Evasive")).toBe(true);
  });

  describe("ON A ROLL - When you play this character, you may move him and one of your other characters to the same location for free. If you do, the other character gets +2 {S} this turn.", () => {
    it("moves Tuk Tuk and the chosen other character to the same location for free, and grants the other character +2 strength this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: tukTukLivelyPartner.cost,
        hand: [tukTukLivelyPartner],
        play: [otherCharacter, testLocation],
      });

      // Play Tuk Tuk
      expect(testEngine.asPlayerOne().playCard(tukTukLivelyPartner)).toBeSuccessfulCommand();

      // Resolve the optional ON A ROLL bag effect, choosing the other character and the location
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();

      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          targets: [otherCharacter, testLocation],
        }),
      ).toBeSuccessfulCommand();

      // Both Tuk Tuk and the other character should now be at the location
      expect(testEngine.asPlayerOne().getCard(tukTukLivelyPartner).atLocationId).toBeDefined();
      expect(testEngine.asPlayerOne().getCard(otherCharacter).atLocationId).toBeDefined();
      expect(testEngine.asPlayerOne().getCard(tukTukLivelyPartner).atLocationId).toBe(
        testEngine.asPlayerOne().getCard(otherCharacter).atLocationId,
      );

      // The other character should have +2 strength this turn
      expect(testEngine.asPlayerOne().getCardStrength(otherCharacter)).toBe(
        otherCharacter.strength + 2,
      );

      // Tuk Tuk should NOT get the +2 strength buff
      expect(testEngine.asPlayerOne().getCardStrength(tukTukLivelyPartner)).toBe(
        tukTukLivelyPartner.strength,
      );
    });

    it("the +2 strength buff expires at the start of next turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: tukTukLivelyPartner.cost,
          hand: [tukTukLivelyPartner],
          play: [otherCharacter, testLocation],
          deck: 1,
        },
        {
          deck: 1,
        },
      );

      expect(testEngine.asPlayerOne().playCard(tukTukLivelyPartner)).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          targets: [otherCharacter, testLocation],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardStrength(otherCharacter)).toBe(
        otherCharacter.strength + 2,
      );

      // Pass turns
      testEngine.asPlayerOne().passTurn();
      testEngine.asPlayerTwo().passTurn();

      // The buff should have expired
      expect(testEngine.asPlayerOne().getCardStrength(otherCharacter)).toBe(
        otherCharacter.strength,
      );
    });

    it("is optional - can be declined without moving anyone", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: tukTukLivelyPartner.cost,
        hand: [tukTukLivelyPartner],
        play: [otherCharacter, testLocation],
      });

      expect(testEngine.asPlayerOne().playCard(tukTukLivelyPartner)).toBeSuccessfulCommand();

      // Decline the optional ability (resolve with no targets)
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();

      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

      // Nobody should be at the location
      expect(testEngine.asPlayerOne().getCard(tukTukLivelyPartner).atLocationId).toBeUndefined();
      expect(testEngine.asPlayerOne().getCard(otherCharacter).atLocationId).toBeUndefined();

      // No strength buff
      expect(testEngine.asPlayerOne().getCardStrength(otherCharacter)).toBe(
        otherCharacter.strength,
      );
    });
  });
});
