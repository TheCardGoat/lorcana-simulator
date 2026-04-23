import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { mulanEliteArcher } from "./114-mulan-elite-archer";
import { mulanInjuredSoldier } from "./116-mulan-injured-soldier";
import { nalaUndauntedLioness } from "../../009";

const defender = createMockCharacter({
  id: "mea-defender",
  name: "Cinderella",
  version: "Melody Weaver",
  cost: 4,
  strength: 2,
  willpower: 10,
  lore: 1,
});

const bystander1 = createMockCharacter({
  id: "mea-bystander1",
  name: "Pluto",
  version: "Rescue Dog",
  cost: 3,
  strength: 2,
  willpower: 10,
  lore: 1,
});

const bystander2 = createMockCharacter({
  id: "mea-bystander2",
  name: "Pete",
  version: "Rotten Guy",
  cost: 5,
  strength: 4,
  willpower: 10,
  lore: 1,
});

const attacker = createMockCharacter({
  id: "mea-attacker",
  name: "Attacker",
  version: "Test",
  cost: 3,
  strength: 3,
  willpower: 10,
  lore: 1,
});

const defenderWithResist = createMockCharacter({
  id: "mea-defender-resist",
  name: "Defender",
  version: "With Resist",
  cost: 3,
  strength: 2,
  willpower: 10,
  lore: 1,
  abilities: [
    {
      id: "mea-defender-resist-kw",
      type: "keyword",
      keyword: "Resist",
      value: 1,
      text: "Resist +1",
    },
  ],
});

describe("Mulan - Elite Archer", () => {
  describe("Shift 5", () => {
    it("should have Shift keyword", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [mulanEliteArcher],
      });

      expect(testEngine.hasKeyword(mulanEliteArcher, "Shift")).toBe(true);
    });
  });

  describe("STRAIGHT SHOOTER - When you play this character, if you used Shift to play her, she gets +3 {S} this turn.", () => {
    it("grants +3 strength when played via Shift", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: mulanEliteArcher.cost,
        hand: [mulanEliteArcher],
        play: [mulanInjuredSoldier],
      });

      const shiftTarget = testEngine.findCardInstanceId(mulanInjuredSoldier, "play", "player_one");

      expect(
        testEngine.asPlayerOne().playCard(mulanEliteArcher, {
          cost: {
            cost: "shift",
            shiftTarget,
          },
        }),
      ).toBeSuccessfulCommand();

      // Resolve the triggered ability bag if present
      const bagCount = testEngine.asPlayerOne().getBagCount();
      if (bagCount > 0) {
        testEngine.asPlayerOne().resolvePendingByCard(mulanEliteArcher);
      }

      expect(testEngine.asPlayerOne().getCardStrength(mulanEliteArcher)).toBe(
        mulanEliteArcher.strength + 3,
      );
    });

    it("does NOT trigger when played normally (without Shift)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: mulanEliteArcher.cost,
        hand: [mulanEliteArcher],
      });

      expect(testEngine.asPlayerOne().playCard(mulanEliteArcher)).toBeSuccessfulCommand();

      // No triggered abilities should fire
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

      expect(testEngine.asPlayerOne().getCardStrength(mulanEliteArcher)).toBe(
        mulanEliteArcher.strength,
      );
    });
  });

  describe("TRIPLE SHOT - During your turn, whenever this character deals damage to another character in a challenge, deal the same amount of damage to up to 2 other chosen characters.", () => {
    it("deals damage to up to 2 other chosen characters when challenging", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: mulanEliteArcher, isDrying: false }],
          deck: 1,
        },
        {
          play: [{ card: defender, exerted: true }, { card: bystander1 }, { card: bystander2 }],
          deck: 1,
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(mulanEliteArcher, defender),
      ).toBeSuccessfulCommand();

      // Triple Shot should trigger
      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffects.length).toBeGreaterThan(0);

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(mulanEliteArcher, {
          targets: [bystander1, bystander2],
        }),
      ).toBeSuccessfulCommand();

      // Defender takes challenge damage
      expect(testEngine.asPlayerOne().getDamage(defender)).toBe(mulanEliteArcher.strength);
      // Bystanders take the same amount of damage
      expect(testEngine.asPlayerOne().getDamage(bystander1)).toBe(mulanEliteArcher.strength);
      expect(testEngine.asPlayerOne().getDamage(bystander2)).toBe(mulanEliteArcher.strength);
    });

    it("applies Resist to Triple Shot splash so fully reduced damage does not banish (Nala Undaunted Lioness)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: mulanEliteArcher, isDrying: false }],
          deck: 1,
        },
        {
          play: [{ card: defenderWithResist, exerted: true }, { card: nalaUndauntedLioness }],
          deck: 1,
        },
      );

      // Challenge damage to defender: 2 strength - 1 Resist = 1 dealt; trigger-amount for Triple Shot is 1
      expect(
        testEngine.asPlayerOne().challenge(mulanEliteArcher, defenderWithResist),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(mulanEliteArcher, {
          targets: [nalaUndauntedLioness],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getDamage(nalaUndauntedLioness)).toBe(0);
      expect(testEngine.asPlayerTwo().getCardZone(nalaUndauntedLioness)).toBe("play");
    });

    // Regression: player bug report (bugrepoJ8Xp4ah8RGuk5njLcUQM) — "TRIPLE SHOT can
    // only select (1) target". Confirm the engine accepts 1 target under count.upTo: 2.
    it("accepts exactly 1 target under count.upTo: 2 without requiring 2", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: mulanEliteArcher, isDrying: false }],
          deck: 1,
        },
        {
          play: [{ card: defender, exerted: true }, { card: bystander1 }, { card: bystander2 }],
          deck: 1,
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(mulanEliteArcher, defender),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(mulanEliteArcher, {
          targets: [bystander1],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(bystander1)).toBe(mulanEliteArcher.strength);
      expect(testEngine.asPlayerOne().getDamage(bystander2)).toBe(0);
    });

    it("does NOT trigger during opponent's turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: attacker, isDrying: false }],
          deck: 1,
        },
        {
          play: [{ card: mulanEliteArcher, exerted: true }, { card: bystander1 }],
          deck: 1,
        },
      );

      // Player one challenges Mulan (it's opponent's turn for Mulan)
      expect(
        testEngine.asPlayerOne().challenge(attacker, mulanEliteArcher),
      ).toBeSuccessfulCommand();

      // Triple Shot should NOT trigger because it's not Mulan's controller's turn
      expect(testEngine.asPlayerTwo().getBagCount()).toBe(0);
    });
  });
});
