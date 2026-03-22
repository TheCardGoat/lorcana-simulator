import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { maximusTeamChampion } from "./105-maximus-team-champion";

const strongCharacter = createMockCharacter({
  id: "mock-strong-5",
  name: "Strong Character",
  cost: 5,
  strength: 5,
  willpower: 3,
  lore: 1,
});

const veryStrongCharacter = createMockCharacter({
  id: "mock-strong-10",
  name: "Very Strong Character",
  cost: 8,
  strength: 10,
  willpower: 5,
  lore: 2,
});

const weakCharacter = createMockCharacter({
  id: "mock-weak",
  name: "Weak Character",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

describe("Maximus - Team Champion", () => {
  describe("ROYALLY BIG REWARDS - At the end of your turn, if you have any characters in play with 5 {S} or more, gain 2 lore. If you have any in play with 10 {S} or more, gain 5 lore instead.", () => {
    it("does not trigger when no character has 5 or more strength", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [maximusTeamChampion, weakCharacter],
          inkwell: maximusTeamChampion.cost + weakCharacter.cost,
          deck: 0,
        },
        {
          deck: 0,
        },
      );

      expect(testEngine.asPlayerOne().playCard(maximusTeamChampion)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().playCard(weakCharacter)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
    });

    it("gains 2 lore when a character has 5 or more strength", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [maximusTeamChampion, strongCharacter],
          inkwell: maximusTeamChampion.cost + strongCharacter.cost,
          deck: 0,
        },
        {
          deck: 0,
        },
      );

      expect(testEngine.asPlayerOne().playCard(maximusTeamChampion)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().playCard(strongCharacter)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      const bagCount = testEngine.asPlayerOne().getBagCount();
      if (bagCount > 0) {
        const effects = testEngine.asPlayerOne().getBagEffects();
        for (const effect of effects) {
          testEngine.asPlayerOne().resolveBag(effect.id);
        }
      }

      console.log("BAG COUNT (5+ str):", bagCount);
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(2);
    });

    it("gains 5 lore instead when a character has 10 or more strength", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [maximusTeamChampion, veryStrongCharacter],
          inkwell: maximusTeamChampion.cost + veryStrongCharacter.cost,
          deck: 0,
        },
        {
          deck: 0,
        },
      );

      expect(testEngine.asPlayerOne().playCard(maximusTeamChampion)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().playCard(veryStrongCharacter)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      const bagCount = testEngine.asPlayerOne().getBagCount();
      if (bagCount > 0) {
        const effects = testEngine.asPlayerOne().getBagEffects();
        for (const effect of effects) {
          testEngine.asPlayerOne().resolveBag(effect.id);
        }
      }

      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(5);
    });
  });
});
