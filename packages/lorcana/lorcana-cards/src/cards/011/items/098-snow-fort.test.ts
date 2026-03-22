import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { snowFort } from "./098-snow-fort";

const fortifiedAlly = createMockCharacter({
  id: "snow-fort-fortified-ally",
  name: "Fortified Ally",
  cost: 2,
  strength: 3,
  willpower: 5,
});

const opponentAttacker = createMockCharacter({
  id: "snow-fort-opponent-attacker",
  name: "Opponent Attacker",
  cost: 2,
  strength: 3,
  willpower: 5,
});

describe("Snow Fort", () => {
  describe("THE HIGH GROUND - Your characters get +1 {S}", () => {
    it("gives your characters +1 strength", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [snowFort, fortifiedAlly],
        deck: 2,
      });

      expect(testEngine.asPlayerOne().getCardStrength(fortifiedAlly)).toBe(4);
    });

    it("does not affect opponent characters", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [snowFort],
          deck: 2,
        },
        {
          play: [opponentAttacker],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerTwo().getCardStrength(opponentAttacker)).toBe(3);
    });
  });

  describe("BARRICADE - During opponents' turns, your characters gain Resist +1", () => {
    it("gives your characters Resist during opponents' turns", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: 2,
          play: [snowFort, fortifiedAlly],
        },
        {
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().hasKeyword(fortifiedAlly, "Resist")).toBe(false);
      expect(testEngine.asPlayerOne().getKeywordValue(fortifiedAlly, "Resist")).toBe(null);

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().hasKeyword(fortifiedAlly, "Resist")).toBe(true);
      expect(testEngine.asPlayerOne().getKeywordValue(fortifiedAlly, "Resist")).toBe(1);

      expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().hasKeyword(fortifiedAlly, "Resist")).toBe(false);
      expect(testEngine.asPlayerOne().getKeywordValue(fortifiedAlly, "Resist")).toBe(null);
    });

    it("reduces challenge damage by 1 during opponent's turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: 2,
          // fortifiedAlly: 3 STR (+1 from Snow Fort = 4), 5 WP
          play: [snowFort, { card: fortifiedAlly, exerted: true }],
        },
        {
          deck: 2,
          // opponentAttacker: 3 STR, 5 WP
          play: [opponentAttacker],
        },
      );

      // Pass player one's turn so it becomes opponent's turn
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // Opponent challenges the exerted fortified ally
      // Attacker deals 3 damage, but Resist +1 reduces it to 2
      const result = testEngine.asPlayerTwo().challenge(opponentAttacker, fortifiedAlly);
      expect(result.success).toBe(true);

      // Fortified ally should take 2 damage (3 STR - 1 Resist = 2)
      expect(testEngine.asPlayerOne().getDamage(fortifiedAlly)).toBe(2);
      // Attacker should take 4 damage (3 base + 1 from Snow Fort's THE HIGH GROUND)
      expect(testEngine.asPlayerTwo().getDamage(opponentAttacker)).toBe(4);
    });

    it("does not reduce challenge damage during your own turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          deck: 2,
          // fortifiedAlly: 3 STR (+1 from Snow Fort = 4), 5 WP
          play: [snowFort, fortifiedAlly],
        },
        {
          deck: 2,
          play: [{ card: opponentAttacker, exerted: true }],
        },
      );

      // Player one challenges the exerted opponent attacker during their own turn
      // No Resist applies since it's player one's turn
      const result = testEngine.asPlayerOne().challenge(fortifiedAlly, opponentAttacker);
      expect(result.success).toBe(true);

      // Fortified ally should take full 3 damage (no Resist on own turn)
      expect(testEngine.asPlayerOne().getDamage(fortifiedAlly)).toBe(3);
      // Opponent attacker should take 4 damage (3 base + 1 from Snow Fort)
      expect(testEngine.asPlayerTwo().getDamage(opponentAttacker)).toBe(4);
    });
  });
});
