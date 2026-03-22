import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { tinkerBellGiantFairy } from "./193-tinker-bell-giant-fairy";

const opponentCharacter = createMockCharacter({
  id: "tink-opponent",
  name: "Opponent Character",
  cost: 2,
  willpower: 5,
  strength: 2,
});

const opponentCharacter2 = createMockCharacter({
  id: "tink-opponent-2",
  name: "Opponent Character 2",
  cost: 2,
  willpower: 3,
  strength: 1,
});

describe("Tinker Bell - Giant Fairy", () => {
  describe("ROCK THE BOAT - When you play this character, deal 1 damage to each opposing character.", () => {
    it("deals 1 damage to all opposing characters when played", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [tinkerBellGiantFairy],
          inkwell: tinkerBellGiantFairy.cost,
        },
        {
          play: [opponentCharacter, opponentCharacter2],
        },
      );

      expect(testEngine.asPlayerOne().playCard(tinkerBellGiantFairy)).toBeSuccessfulCommand();

      // Both opponent characters should have taken 1 damage
      expect(testEngine.asPlayerTwo().getDamage(opponentCharacter)).toBe(1);
      expect(testEngine.asPlayerTwo().getDamage(opponentCharacter2)).toBe(1);
    });

    it("does not deal damage to own characters", () => {
      const ownCharacter = createMockCharacter({
        id: "tink-own",
        name: "Own Character",
        cost: 1,
        willpower: 3,
      });

      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [tinkerBellGiantFairy],
          play: [ownCharacter],
          inkwell: tinkerBellGiantFairy.cost,
        },
        {
          play: [opponentCharacter],
        },
      );

      expect(testEngine.asPlayerOne().playCard(tinkerBellGiantFairy)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(ownCharacter)).toBe(0);
      expect(testEngine.asPlayerTwo().getDamage(opponentCharacter)).toBe(1);
    });
  });

  describe("PUNY PIRATE! - During your turn, whenever this character banishes another character in a challenge, you may deal 2 damage to chosen opposing character.", () => {
    it("triggers when Tinker Bell banishes in a challenge", () => {
      const weakOpponent = createMockCharacter({
        id: "tink-weak",
        name: "Weak Opponent",
        cost: 1,
        willpower: 1,
        strength: 1,
      });

      const bystander = createMockCharacter({
        id: "tink-bystander",
        name: "Bystander",
        cost: 2,
        willpower: 5,
      });

      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [tinkerBellGiantFairy],
        },
        {
          play: [{ card: weakOpponent, exerted: true }, bystander],
        },
      );

      expect(
        testEngine.asPlayerOne().challenge(tinkerBellGiantFairy, weakOpponent),
      ).toBeSuccessfulCommand();

      // Should have a bag effect for the optional 2 damage
      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
    });
  });
});
