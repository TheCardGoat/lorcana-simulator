import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { gwythaintSavageHunter } from "./037-gwythaint-savage-hunter";

const nonEvasiveAttacker = createMockCharacter({
  id: "gwythaint-non-evasive-attacker",
  name: "Non-Evasive Attacker",
  cost: 2,
  strength: 2,
  willpower: 3,
});

const evasiveAttacker = createMockCharacter({
  id: "gwythaint-evasive-attacker",
  name: "Evasive Attacker",
  cost: 2,
  strength: 2,
  willpower: 3,
  abilities: [
    {
      id: "gwythaint-evasive-attacker-kw",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
  ],
});

const readyOpponentA = createMockCharacter({
  id: "gwythaint-ready-opponent-a",
  name: "Ready Opponent A",
  cost: 2,
  strength: 2,
  willpower: 2,
});

const readyOpponentB = createMockCharacter({
  id: "gwythaint-ready-opponent-b",
  name: "Ready Opponent B",
  cost: 3,
  strength: 3,
  willpower: 3,
});

const exertedOpponent = createMockCharacter({
  id: "gwythaint-exerted-opponent",
  name: "Exerted Opponent",
  cost: 2,
  strength: 1,
  willpower: 4,
});

describe("Gwythaint - Savage Hunter", () => {
  it("cannot be challenged by non-Evasive characters, but can be challenged by Evasive ones", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: gwythaintSavageHunter, exerted: true }],
        deck: 1,
      },
      {
        play: [nonEvasiveAttacker, evasiveAttacker],
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().canChallenge(nonEvasiveAttacker, gwythaintSavageHunter)).toBe(
      false,
    );
    expect(testEngine.asPlayerTwo().canChallenge(evasiveAttacker, gwythaintSavageHunter)).toBe(
      true,
    );
  });

  describe("SWOOPING STRIKE", () => {
    it("makes each opponent choose and exert one of their ready characters after Gwythaint quests", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: gwythaintSavageHunter, isDrying: false }],
          deck: 1,
        },
        {
          play: [readyOpponentA, readyOpponentB],
          deck: 1,
        },
      );

      expect(testEngine.asPlayerOne().quest(gwythaintSavageHunter)).toBeSuccessfulCommand();
      expect(
        testEngine.asPlayerTwo().resolveNextPending({ targets: [readyOpponentA] }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().isExerted(readyOpponentA)).toBe(true);
      expect(testEngine.asPlayerTwo().isExerted(readyOpponentB)).toBe(false);
    });

    it("does not prompt an opponent that has no ready characters to choose", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: gwythaintSavageHunter, isDrying: false }],
          deck: 1,
        },
        {
          play: [{ card: exertedOpponent, exerted: true }],
          deck: 1,
        },
      );

      expect(testEngine.asPlayerOne().quest(gwythaintSavageHunter)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getPendingEffects()).toHaveLength(0);
      expect(testEngine.asPlayerTwo().isExerted(exertedOpponent)).toBe(true);
    });
  });
});
