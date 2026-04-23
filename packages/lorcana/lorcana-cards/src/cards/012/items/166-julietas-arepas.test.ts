import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { julietasArepas } from "./166-julietas-arepas";

const madrigalAlly = createMockCharacter({
  id: "julietas-arepas-madrigal-ally",
  name: "Madrigal Ally",
  cost: 2,
  willpower: 5,
  classifications: ["Storyborn", "Madrigal"],
});

const nonMadrigalAlly = createMockCharacter({
  id: "julietas-arepas-non-madrigal",
  name: "Non-Madrigal Ally",
  cost: 2,
  willpower: 5,
  classifications: ["Storyborn", "Hero"],
});

const damagedAlly = createMockCharacter({
  id: "julietas-arepas-damaged-ally",
  name: "Damaged Ally",
  cost: 2,
  willpower: 5,
});

describe("Julieta's Arepas", () => {
  describe("FLAVORFUL CURE - At the start of your turn, if you have a Madrigal character in play, remove up to 2 damage from chosen character.", () => {
    it("triggers at the start of your turn when you have a Madrigal character and removes up to 2 damage", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [julietasArepas, madrigalAlly, { card: damagedAlly, damage: 3 }],
          deck: 2,
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(julietasArepas, {
          targets: [damagedAlly],
          amount: 2,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne()).toHaveDamage({ card: damagedAlly, value: 1 });
    });

    it("does not remove damage when you do not have a Madrigal character in play", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [julietasArepas, nonMadrigalAlly, { card: damagedAlly, damage: 3 }],
          deck: 2,
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      // Condition fails at resolution, so even if queued, it resolves without effect.
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolvePendingByCard(julietasArepas),
        ).toBeSuccessfulCommand();
      }

      expect(testEngine.asPlayerOne()).toHaveDamage({ card: damagedAlly, value: 3 });
    });
  });

  describe("THAT DID THE TRICK - {E} — If you removed damage from a character this turn, gain 1 lore.", () => {
    it("gains 1 lore when activated after damage was removed this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [julietasArepas, madrigalAlly, { card: damagedAlly, damage: 3 }],
          deck: 2,
        },
        {
          deck: 2,
        },
      );

      // Start of turn: FLAVORFUL CURE removes damage — enables THAT DID THE TRICK condition.
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolvePendingByCard(julietasArepas, {
          targets: [damagedAlly],
          amount: 2,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

      expect(
        testEngine.asPlayerOne().activateAbility(julietasArepas, {
          ability: "THAT DID THE TRICK",
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(1);
    });

    it("does not gain lore when no damage was removed this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [julietasArepas, nonMadrigalAlly],
          deck: 2,
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

      // Drain any pending start-of-turn bag entries before activating.
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolvePendingByCard(julietasArepas),
        ).toBeSuccessfulCommand();
      }

      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

      // Activation should still be possible (condition checked on gain-lore, not on the ability's use).
      // Activation succeeds syntactically; gaining lore depends on the condition.
      testEngine.asPlayerOne().activateAbility(julietasArepas, {
        ability: "THAT DID THE TRICK",
      });

      expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
    });
  });
});
