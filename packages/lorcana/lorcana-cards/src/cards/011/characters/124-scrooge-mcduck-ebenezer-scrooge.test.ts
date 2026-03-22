import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { scroogeMcduckEbenezerScrooge } from "./124-scrooge-mcduck-ebenezer-scrooge";

describe("Scrooge McDuck - Ebenezer Scrooge", () => {
  describe("PAYMENT DUE", () => {
    it("opponent loses 1 lore when Scrooge quests", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: scroogeMcduckEbenezerScrooge, isDrying: false }],
          deck: 5,
        },
        {
          deck: 5,
        },
        {
          startingLore: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 3,
          },
        },
      );

      expect(testEngine.asPlayerOne().quest(scroogeMcduckEbenezerScrooge)).toBeSuccessfulCommand();

      // Resolve the triggered PAYMENT DUE bag effect
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
        ).toBeSuccessfulCommand();
      }

      // P2 should have lost 1 lore (3 -> 2)
      expect(testEngine.getLore(PLAYER_TWO)).toBe(2);

      // P1 should have gained quest lore (1)
      expect(testEngine.getLore(PLAYER_ONE)).toBe(scroogeMcduckEbenezerScrooge.lore);
    });

    it("opponent does not lose lore when at 0", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [{ card: scroogeMcduckEbenezerScrooge, isDrying: false }],
          deck: 5,
        },
        {
          deck: 5,
        },
        {
          startingLore: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 0,
          },
        },
      );

      expect(testEngine.asPlayerOne().quest(scroogeMcduckEbenezerScrooge)).toBeSuccessfulCommand();

      // Resolve the triggered PAYMENT DUE bag effect
      if (testEngine.asPlayerOne().getBagCount() > 0) {
        expect(
          testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
        ).toBeSuccessfulCommand();
      }

      // P2 had 0 lore, stays at 0
      expect(testEngine.getLore(PLAYER_TWO)).toBe(0);
    });

    // Note: The "for-each lore-lost" draw effect is defined in the ability data but
    // the for-each counter for lore-lost may not be fully implemented in the engine.
    // Draw tests will be added once the for-each lore-lost counter is supported.
  });

  describe("FORECLOSURE", () => {
    it("gains 1 lore at end of turn if opponent has 0 lore", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [scroogeMcduckEbenezerScrooge],
          deck: 5,
        },
        {
          deck: 5,
        },
        {
          startingLore: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 0,
          },
        },
      );

      // Pass P1 turn - FORECLOSURE should trigger at end of turn
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // P1 should have gained 1 lore from FORECLOSURE
      expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
    });

    it("does not gain lore at end of turn if opponent has lore", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [scroogeMcduckEbenezerScrooge],
          deck: 5,
        },
        {
          deck: 5,
        },
        {
          startingLore: {
            [PLAYER_ONE]: 0,
            [PLAYER_TWO]: 5,
          },
        },
      );

      // Pass P1 turn
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      // P1 should not have gained lore from FORECLOSURE
      expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
    });
  });
});
