import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { beastAggressiveLord } from "./113-beast-aggressive-lord";

const defender = createMockCharacter({
  id: "beast-test-defender",
  name: "Defender",
  cost: 2,
  strength: 2,
  willpower: 5,
  lore: 1,
});

const deckFiller = createMockCharacter({
  id: "beast-deck-filler",
  name: "Deck Filler",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("Beast - Aggressive Lord", () => {
  describe("Boost 2 - keyword ability", () => {
    it("should have the Boost keyword ability", () => {
      const boostAbility = beastAggressiveLord.abilities?.find(
        (a) => a.type === "keyword" && a.keyword === "Boost",
      );
      expect(boostAbility).toBeDefined();
      expect(
        boostAbility?.type === "keyword" && "value" in boostAbility
          ? boostAbility.value
          : undefined,
      ).toBe(2);
    });
  });

  describe("THAT'S MINE - Whenever he challenges another character, if there's a card under this character, each opponent loses 1 lore and you gain 1 lore.", () => {
    it("triggers when Beast challenges with a card under him", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: beastAggressiveLord, cardsUnder: [deckFiller] }],
          deck: 2,
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
        {
          startingLore: {
            player_one: 0,
            player_two: 3,
          },
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(beastAggressiveLord, defender),
      ).toBeSuccessfulCommand();

      // Beast has a card under him, so THAT'S MINE triggers
      // Each opponent loses 1 lore and you gain 1 lore
      const bagCount = testEngine.asPlayerOne().getBagCount();
      if (bagCount > 0) {
        const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
        expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
      }

      expect(testEngine.getLore(PLAYER_TWO)).toBe(2);
      expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
    });

    it("does NOT trigger when Beast challenges WITHOUT a card under him", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [beastAggressiveLord],
          deck: 2,
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
        {
          startingLore: {
            player_one: 0,
            player_two: 3,
          },
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(beastAggressiveLord, defender),
      ).toBeSuccessfulCommand();

      // Beast has no card under him, so THAT'S MINE should NOT trigger
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
      expect(testEngine.getLore(PLAYER_TWO)).toBe(3);
    });
  });
});
