import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { leviathansLairDangerousGround } from "./136-leviathans-lair-dangerous-ground";

const opponentCharacter = createMockCharacter({
  id: "leviathans-lair-opp-char-1",
  name: "Opponent Character 1",
  cost: 3,
  strength: 2,
  willpower: 3,
});

const opponentCharacter2 = createMockCharacter({
  id: "leviathans-lair-opp-char-2",
  name: "Opponent Character 2",
  cost: 2,
  strength: 1,
  willpower: 2,
});

describe("Leviathan's Lair - Dangerous Ground", () => {
  describe("LOST TO THE DUNES - When this location is banished, each opponent chooses and banishes one of their characters.", () => {
    it("triggers when this location is banished and opponent chooses one of their characters to banish", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [leviathansLairDangerousGround],
        },
        {
          play: [opponentCharacter, opponentCharacter2],
        },
      );

      // Banish the location by setting fatal damage
      expect(
        testEngine
          .asServer()
          .manualSetDamage(leviathansLairDangerousGround, leviathansLairDangerousGround.willpower),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(leviathansLairDangerousGround)).toBe("discard");

      // The "When this location is banished" ability should trigger, and opponent
      // gets a pending effect to choose and banish one of their own characters.
      expect(
        testEngine.asPlayerTwo().resolveNextPending({ targets: [opponentCharacter] }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacter)).toBe("discard");
      expect(testEngine.asPlayerTwo().getCardZone(opponentCharacter2)).toBe("play");
    });

    it("fizzles gracefully when opponent controls no characters", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [leviathansLairDangerousGround],
        },
        {},
      );

      expect(
        testEngine
          .asServer()
          .manualSetDamage(leviathansLairDangerousGround, leviathansLairDangerousGround.willpower),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(leviathansLairDangerousGround)).toBe("discard");
      // Location banished and effect resolved without crashing — nothing to banish.
    });
  });
});
