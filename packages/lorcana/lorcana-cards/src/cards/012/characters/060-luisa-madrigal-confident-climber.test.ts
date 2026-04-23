import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { luisaMadrigalConfidentClimber } from "./060-luisa-madrigal-confident-climber";

const friendlyCharacter = createMockCharacter({
  id: "luisa-test-friendly",
  name: "Friendly Character",
  cost: 2,
  strength: 2,
  willpower: 5,
});

const opposingCharacter = createMockCharacter({
  id: "luisa-test-opposing",
  name: "Opposing Character",
  cost: 3,
  strength: 3,
  willpower: 6,
});

describe("Luisa Madrigal - Confident Climber", () => {
  describe("I CAN TAKE IT - 1 {I} - Move up to 1 damage from chosen character of yours to this character. Then, if this character has 3 or more damage, move all damage from this character to chosen opposing character.", () => {
    it("moves 1 damage from friendly character to self, then moves all damage to opposing character when self has 3+ damage", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [
            { card: luisaMadrigalConfidentClimber, damage: 2 },
            { card: friendlyCharacter, damage: 1 },
          ],
          inkwell: 1,
          deck: 5,
        },
        {
          play: [opposingCharacter],
          deck: 5,
        },
      );

      const friendlyId = testEngine.findCardInstanceId(friendlyCharacter, "play");
      const opposingId = testEngine.findCardInstanceId(opposingCharacter, "play", "player_two");

      const activateResult = testEngine
        .asPlayerOne()
        .activateAbility(luisaMadrigalConfidentClimber);
      expect(activateResult).toBeSuccessfulCommand();

      // Choose friendly character as source of move-damage
      const moveResult = testEngine.asPlayerOne().resolveNextPending({ targets: [friendlyId] });
      expect(moveResult).toBeSuccessfulCommand();

      // Luisa should now have 3 damage (2 + 1), friendly should have 0
      expect(testEngine.asPlayerOne().getDamage(luisaMadrigalConfidentClimber)).toBe(3);
      expect(testEngine.asPlayerOne().getDamage(friendlyCharacter)).toBe(0);

      // The conditional should trigger - choose opposing character for all damage move
      const condResult = testEngine.asPlayerOne().resolveNextPending({ targets: [opposingId] });
      expect(condResult).toBeSuccessfulCommand();

      // All damage should have moved from Luisa to opposing character
      expect(testEngine.asPlayerOne().getDamage(luisaMadrigalConfidentClimber)).toBe(0);
      expect(testEngine.asPlayerTwo().getDamage(opposingCharacter)).toBe(3);
    });

    it("does not move all damage to opposing if self has less than 3 damage", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [
            { card: luisaMadrigalConfidentClimber, damage: 1 },
            { card: friendlyCharacter, damage: 1 },
          ],
          inkwell: 1,
          deck: 5,
        },
        {
          play: [opposingCharacter],
          deck: 5,
        },
      );

      const friendlyId = testEngine.findCardInstanceId(friendlyCharacter, "play");

      expect(
        testEngine.asPlayerOne().activateAbility(luisaMadrigalConfidentClimber),
      ).toBeSuccessfulCommand();

      // Choose friendly character as source
      expect(
        testEngine.asPlayerOne().resolveNextPending({ targets: [friendlyId] }),
      ).toBeSuccessfulCommand();

      // Luisa should have 2 damage (1 + 1) - less than 3, no second move
      expect(testEngine.asPlayerOne().getDamage(luisaMadrigalConfidentClimber)).toBe(2);
      expect(testEngine.asPlayerOne().getDamage(friendlyCharacter)).toBe(0);
      // Opposing character should have no damage since condition was not met
      expect(testEngine.asPlayerTwo().getDamage(opposingCharacter)).toBe(0);
    });

    it("cannot activate without enough ink", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [luisaMadrigalConfidentClimber, { card: friendlyCharacter, damage: 1 }],
          inkwell: 0,
          deck: 5,
        },
        {
          play: [opposingCharacter],
          deck: 5,
        },
      );

      const result = testEngine.asPlayerOne().activateAbility(luisaMadrigalConfidentClimber);
      expect(result.success).toBe(false);
    });
  });
});
