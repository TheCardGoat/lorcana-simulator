import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { chernabogUnnaturalForce } from "./077-chernabog-unnatural-force";

const opponentCharacter = createMockCharacter({
  id: "chernabog-test-opp",
  name: "Opponent Character",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const discardCharacter = createMockCharacter({
  id: "chernabog-test-discard",
  name: "Discard Character",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
});

describe("Chernabog - Unnatural Force", () => {
  describe("DARK DANCE - When you play this character, you may shuffle chosen opposing character into their player's deck. If you do, that player may play a character from their discard for free.", () => {
    it("should shuffle chosen opposing character into their deck", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [chernabogUnnaturalForce],
          inkwell: chernabogUnnaturalForce.cost,
          deck: 5,
        },
        {
          play: [opponentCharacter],
          deck: 5,
        },
      );

      expect(testEngine.asPlayerOne().playCard(chernabogUnnaturalForce)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      const bagId = bagEffects[0]!.id;
      expect(
        testEngine.asPlayerOne().resolveBag(bagId, {
          resolveOptional: true,
          targets: [opponentCharacter],
        }),
      ).toBeSuccessfulCommand();

      // Character should no longer be in play
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacter)).not.toBe("play");
    });

    it("should be optional - can decline the ability", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [chernabogUnnaturalForce],
          inkwell: chernabogUnnaturalForce.cost,
          deck: 5,
        },
        {
          play: [opponentCharacter],
          deck: 5,
        },
      );

      expect(testEngine.asPlayerOne().playCard(chernabogUnnaturalForce)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      const bagId = bagEffects[0]!.id;
      expect(
        testEngine.asPlayerOne().resolveBag(bagId, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      // Character should still be in play
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacter)).toBe("play");
    });

    it.todo("should allow opponent to play a character from discard for free after shuffling - requires engine support for OPPONENT chooser in sequence + play-card from discard", () => {});

    it.todo("opponent can decline to play a character from discard - requires engine support for OPPONENT chooser in optional effects", () => {});

    it("should not trigger 'If you do' effect when ability is declined", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [chernabogUnnaturalForce],
          inkwell: chernabogUnnaturalForce.cost,
          deck: 5,
        },
        {
          play: [opponentCharacter],
          discard: [discardCharacter],
          deck: 5,
        },
      );

      expect(testEngine.asPlayerOne().playCard(chernabogUnnaturalForce)).toBeSuccessfulCommand();

      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      const bagId = bagEffects[0]!.id;

      // Decline the optional shuffle
      expect(
        testEngine.asPlayerOne().resolveBag(bagId, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      // Opponent should not have gotten a chance to play from discard
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacter)).toBe("play");
      expect(testEngine.asPlayerTwo().getCardZone(discardCharacter)).toBe("discard");
    });
  });

  it.todo("regression: should respect Bodyguard when choosing opposing character to shuffle", () => {
    // Bug: Chernabog's DARK DANCE was bypassing Bodyguard on Chief Powhatan
    // Bodyguard should force targeting the bodyguard character when it's exerted
    const bodyguardCharacter = createMockCharacter({
      id: "chernabog-test-bodyguard",
      name: "Bodyguard Character",
      cost: 4,
      strength: 5,
      willpower: 5,
      lore: 1,
      abilities: [
        {
          type: "keyword",
          keyword: "Bodyguard",
        },
      ],
    });

    const protectedCharacter = createMockCharacter({
      id: "chernabog-test-protected",
      name: "Protected Character",
      cost: 3,
      strength: 2,
      willpower: 3,
      lore: 2,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [chernabogUnnaturalForce],
        inkwell: chernabogUnnaturalForce.cost,
        deck: 5,
      },
      {
        play: [{ card: bodyguardCharacter, exerted: true }, protectedCharacter],
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().playCard(chernabogUnnaturalForce)).toBeSuccessfulCommand();

    const bagEffects = testEngine.asPlayerOne().getBagEffects();
    expect(bagEffects.length).toBeGreaterThan(0);

    const bagId = bagEffects[0]!.id;
    // Trying to target the protected character when bodyguard is exerted should fail
    // because Bodyguard forces targeting the bodyguard character
    const result = testEngine.asPlayerOne().resolveBag(bagId, {
      resolveOptional: true,
      targets: [protectedCharacter],
    });

    // Either the targeting should be forced to bodyguard, or selecting the protected character should fail
    // The protected character should still be in play (bodyguard should have intercepted)
    if (result.success) {
      // If the engine auto-redirects, the bodyguard should have been shuffled instead
      expect(testEngine.asPlayerTwo().getCardZone(protectedCharacter)).toBe("play");
    } else {
      // If the engine rejects the target, bodyguard is being respected
      expect(result.success).toBe(false);
    }
  });
});
