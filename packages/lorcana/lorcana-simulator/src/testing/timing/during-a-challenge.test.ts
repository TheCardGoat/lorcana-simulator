import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { mushuMajesticDragon } from "@tcg/lorcana-cards/cards/007";

const attacker = createMockCharacter({
  id: "mushu-test-attacker",
  name: "Test Attacker",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
});

const defender = createMockCharacter({
  id: "mushu-test-defender",
  name: "Test Defender",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
});

describe.skip("Mushu - Majestic Dragon", () => {
  describe("INTIMIDATING AND AWE-INSPIRING - Whenever one of your characters challenges, they gain Resist +2 during that challenge.", () => {
    it("grants Resist +2 to a character only during that challenges, reducing damage taken", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [mushuMajesticDragon, attacker],
        },
        {
          play: [{ card: defender, exerted: true }],
        },
      );

      // Attacker (3 str, 3 wp) challenges Defender (3 str, 2 wp)
      // Without Resist: attacker takes 3 damage (banished)
      // With Resist +2: attacker takes 3-2=1 damage (survives)
      expect(testEngine.asPlayerOne().challenge(attacker, defender)).toBeSuccessfulCommand();

      // Resist should only last challenge, it should go away immediately after
      // expect(testEngine.asPlayerOne().getCard(attacker).keywordValues?.resist).toBe(0);
      expect(testEngine.asPlayerOne().getCardZone(attacker)).toBe("play");
      expect(testEngine.asPlayerOne().getCardZone(defender)).toBe("discard");
      expect(testEngine.asPlayerOne().getDamage(attacker)).toBe(1);
    });
  });
});
