import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { ratiganVeryLargeMouse } from "./121-ratigan-very-large-mouse";

const weakOpponent = createMockCharacter({
  id: "ratigan-weak-opp",
  name: "Weak Opponent",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const allyToReady = createMockCharacter({
  id: "ratigan-ally",
  name: "Ally To Ready",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

describe("Ratigan - Very Large Mouse", () => {
  describe("THIS IS MY KINGDOM - Play: exert opposing char with 3 Strength or less, ready your char (can't quest)", () => {
    // TODO: Multi-step ability resolution needs investigation - the sequence of bag/pending resolution is unclear
    it.skip("exerts opposing character and readies your character with quest restriction", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: ratiganVeryLargeMouse.cost,
          hand: [ratiganVeryLargeMouse],
          play: [{ card: allyToReady, exerted: true }],
        },
        {
          play: [weakOpponent],
        },
      );

      testEngine.asPlayerOne().playCard(ratiganVeryLargeMouse);

      // Resolve bag effect first
      const bagEffects = testEngine.asPlayerOne().getBagEffects();
      if (bagEffects.length > 0) {
        testEngine.asPlayerOne().resolveBag(bagEffects[0]!.id);
      }

      testEngine.asPlayerOne().resolveNextPending({ targets: [weakOpponent] });
      testEngine.asPlayerOne().resolveNextPending({ targets: [allyToReady] });

      expect(testEngine.isExerted(weakOpponent)).toBe(true);
      expect(testEngine.isExerted(allyToReady)).toBe(false);
      expect(testEngine.hasRestriction(allyToReady, "cant-quest")).toBe(true);
    });
  });

  describe("Regression", () => {
    it("does not block the game when no valid targets on opponent side", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        inkwell: ratiganVeryLargeMouse.cost,
        hand: [ratiganVeryLargeMouse],
      });

      testEngine.asPlayerOne().playCard(ratiganVeryLargeMouse);
      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    });
  });
});
