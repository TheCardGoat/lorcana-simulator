import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { angelExperiment624 } from "./191-angel-experiment-624";
import { angelExperiment624Enchanted } from "./238-angel-experiment-624-enchanted";

const handFodder = createMockCharacter({
  id: "angel-hand-fodder",
  name: "Hand Fodder",
  cost: 1,
});

const targetCharacter = createMockCharacter({
  id: "angel-target",
  name: "Target Character",
  strength: 2,
  willpower: 5,
  cost: 2,
});

const fragileTarget = createMockCharacter({
  id: "angel-fragile-target",
  name: "Fragile Target",
  strength: 1,
  willpower: 2,
  cost: 1,
});

describe("Angel - Experiment 624", () => {
  describe("UNTOUCHABLE - While you have no cards in your hand, this character gains Resist +2", () => {
    it("gains Resist +2 when controller has no cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [angelExperiment624],
        hand: [],
        deck: 5,
      });

      expect(testEngine.asPlayerOne().hasKeyword(angelExperiment624, "Resist")).toBe(true);
      expect(testEngine.asPlayerOne().getKeywordValue(angelExperiment624, "Resist")).toBe(2);
    });

    it("does NOT have Resist +2 when controller has cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [angelExperiment624],
        hand: [handFodder],
        deck: 5,
      });

      expect(testEngine.asPlayerOne().hasKeyword(angelExperiment624, "Resist")).toBe(false);
    });
  });

  describe("GOOD AIM - Once during your turn, you may choose and discard a card to deal 2 damage to chosen character", () => {
    it("deals 2 damage to chosen character when activated with discard cost", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [angelExperiment624],
          hand: [handFodder],
          deck: 5,
        },
        {
          play: [targetCharacter],
          deck: 5,
        },
      );

      // Activate the ability: discard handFodder as cost, target the opponent character
      expect(
        testEngine.asPlayerOne().activateAbility(angelExperiment624, {
          costs: { discardCards: [handFodder] },
          targets: [targetCharacter],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getDamage(targetCharacter)).toBe(2);
      expect(testEngine.asPlayerOne().getCardZone(handFodder)).toBe("discard");
    });

    it("requires discarding a card as cost", () => {
      // With no cards in hand, the ability cannot be activated
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [angelExperiment624],
          hand: [],
          deck: 5,
        },
        {
          play: [targetCharacter],
          deck: 5,
        },
      );

      const result = testEngine.asPlayerOne().activateAbility(angelExperiment624, {
        costs: { discardCards: [] },
        targets: [targetCharacter],
      });
      expect(result.success).toBe(false);
    });

    it("can banish character if damage exceeds willpower", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [angelExperiment624],
          hand: [handFodder],
          deck: 5,
        },
        {
          play: [fragileTarget],
          deck: 5,
        },
      );

      expect(
        testEngine.asPlayerOne().activateAbility(angelExperiment624, {
          costs: { discardCards: [handFodder] },
          targets: [fragileTarget],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getCardZone(fragileTarget)).toBe("discard");
    });

    it("cannot be activated twice in the same turn (once per turn)", () => {
      const handFodder2 = createMockCharacter({
        id: "angel-hand-fodder-2",
        name: "Hand Fodder 2",
        cost: 1,
      });

      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [angelExperiment624],
          hand: [handFodder, handFodder2],
          deck: 5,
        },
        {
          play: [targetCharacter],
          deck: 5,
        },
      );

      // First activation succeeds
      expect(
        testEngine.asPlayerOne().activateAbility(angelExperiment624, {
          costs: { discardCards: [handFodder] },
          targets: [targetCharacter],
        }),
      ).toBeSuccessfulCommand();

      // Second activation in the same turn should fail
      const result = testEngine.asPlayerOne().activateAbility(angelExperiment624, {
        costs: { discardCards: [handFodder2] },
        targets: [targetCharacter],
      });
      expect(result.success).toBe(false);
    });
  });

  describe("Enchanted version", () => {
    it("has the same abilities as the base card", () => {
      expect(angelExperiment624Enchanted.abilities).toHaveLength(
        angelExperiment624.abilities?.length ?? 0,
      );
      const baseNames = angelExperiment624.abilities?.map((a) => a.name) ?? [];
      const enchantedNames = angelExperiment624Enchanted.abilities?.map((a) => a.name) ?? [];
      expect(enchantedNames).toEqual(baseNames);
    });
  });
});
