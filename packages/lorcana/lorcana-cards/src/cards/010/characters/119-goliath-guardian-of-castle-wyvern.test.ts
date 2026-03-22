import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { goliathGuardianOfCastleWyvern } from "./119-goliath-guardian-of-castle-wyvern";

const gargoyleAttacker = createMockCharacter({
  id: "goliath-guardian-gargoyle-attacker",
  name: "Gargoyle Attacker",
  cost: 2,
  strength: 4,
  willpower: 3,
  classifications: ["Storyborn", "Hero", "Gargoyle"],
});

const nonGargoyleAttacker = createMockCharacter({
  id: "goliath-guardian-non-gargoyle-attacker",
  name: "Non-Gargoyle Attacker",
  cost: 2,
  strength: 4,
  willpower: 3,
  classifications: ["Storyborn", "Hero"],
});

const defender = createMockCharacter({
  id: "goliath-guardian-defender",
  name: "Defender",
  cost: 2,
  strength: 1,
  willpower: 2,
});

const handFiller1 = createMockCharacter({
  id: "goliath-guardian-hand-filler-1",
  name: "Hand Filler 1",
  cost: 1,
});

const handFiller2 = createMockCharacter({
  id: "goliath-guardian-hand-filler-2",
  name: "Hand Filler 2",
  cost: 1,
});

const handFiller3 = createMockCharacter({
  id: "goliath-guardian-hand-filler-3",
  name: "Hand Filler 3",
  cost: 1,
});

describe("Goliath - Guardian of Castle Wyvern", () => {
  describe("BE CAREFUL, ALL OF YOU - Whenever one of your Gargoyle characters challenges another character, gain 1 lore.", () => {
    it("gains 1 lore when a Gargoyle character challenges", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [goliathGuardianOfCastleWyvern, gargoyleAttacker],
          deck: 2,
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
        { startingLore: { player_one: 0, player_two: 0 } },
      );

      expect(
        testEngine.asPlayerOne().challenge(gargoyleAttacker, defender),
      ).toBeSuccessfulCommand();

      // Resolve BE CAREFUL, ALL OF YOU bag effect (gain 1 lore)
      const bagCount = testEngine.asPlayerOne().getBagCount();
      if (bagCount > 0) {
        expect(
          testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
        ).toBeSuccessfulCommand();
      }

      expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
    });

    it("does NOT gain lore when a non-Gargoyle character challenges", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [goliathGuardianOfCastleWyvern, nonGargoyleAttacker],
          deck: 2,
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
        { startingLore: { player_one: 0, player_two: 0 } },
      );

      expect(
        testEngine.asPlayerOne().challenge(nonGargoyleAttacker, defender),
      ).toBeSuccessfulCommand();

      // Resolve any bag effects (none expected for lore)
      while (testEngine.asPlayerOne().getBagCount() > 0) {
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id);
      }

      expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
    });

    it("gains 1 lore when Goliath himself challenges (Goliath is a Gargoyle)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [goliathGuardianOfCastleWyvern],
          deck: 2,
        },
        {
          play: [{ card: defender, exerted: true }],
          deck: 2,
        },
        { startingLore: { player_one: 0, player_two: 0 } },
      );

      expect(
        testEngine.asPlayerOne().challenge(goliathGuardianOfCastleWyvern, defender),
      ).toBeSuccessfulCommand();

      // Resolve BE CAREFUL, ALL OF YOU bag effect (gain 1 lore)
      while (testEngine.asPlayerOne().getBagCount() > 0) {
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id);
      }

      expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
    });
  });

  describe("STONE BY DAY - If you have 3 or more cards in your hand, this character can't ready.", () => {
    it("prevents Goliath from readying when controller has 3 or more cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: goliathGuardianOfCastleWyvern, exerted: true }],
          // Start with 3 cards so STONE BY DAY is active at the ready phase
          // (ready happens BEFORE the draw step in turn transition)
          hand: [handFiller1, handFiller2, handFiller3],
          deck: 10,
        },
        {
          deck: 10,
        },
      );

      expect(testEngine.asPlayerOne().isExerted(goliathGuardianOfCastleWyvern)).toBe(true);

      // Pass p1 turn — STONE BY DAY already active (3 cards in hand) at ready phase
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      // Goliath should NOT have readied (3 cards in hand)
      expect(testEngine.asPlayerOne().isExerted(goliathGuardianOfCastleWyvern)).toBe(true);
    });

    it("allows Goliath to ready when controller has fewer than 3 cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: goliathGuardianOfCastleWyvern, exerted: true }],
          hand: [handFiller1],
          deck: 10,
        },
        {
          deck: 10,
        },
      );

      expect(testEngine.asPlayerOne().isExerted(goliathGuardianOfCastleWyvern)).toBe(true);

      // Pass p1 turn — start of p1's next turn draws → hand = 2 → STONE BY DAY NOT active
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      // Goliath should have readied (only 2 cards in hand)
      expect(testEngine.asPlayerOne().isExerted(goliathGuardianOfCastleWyvern)).toBe(false);
    });
  });
});
