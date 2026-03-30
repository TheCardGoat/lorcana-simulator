import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { goofyKnightForADay } from "../../002";
import { flitReflectiveHummingbird } from "./039-flit-reflective-hummingbird";

describe("Flit - Reflective Hummingbird", () => {
  describe("LOOK OUT! - When you play this character, move up to 1 damage from chosen character to chosen opposing character.", () => {
    it("moves 1 damage from a friendly character to an opposing character", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [flitReflectiveHummingbird],
          inkwell: flitReflectiveHummingbird.cost,
          play: [{ card: simbaProtectiveCub, damage: 2 }],
        },
        {
          play: [goofyKnightForADay],
        },
      );

      expect(testEngine.asPlayerOne().playCard(flitReflectiveHummingbird)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(flitReflectiveHummingbird, {
          resolveOptional: true,
          targets: [simbaProtectiveCub, goofyKnightForADay],
        }),
      ).toBeSuccessfulCommand();

      // Only 1 damage should be moved (up to 1)
      expect(testEngine.asPlayerOne().getDamage(simbaProtectiveCub)).toBe(1);
      expect(testEngine.asPlayerTwo().getDamage(goofyKnightForADay)).toBe(1);
    });

    it("can decline the optional ability", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [flitReflectiveHummingbird],
          inkwell: flitReflectiveHummingbird.cost,
          play: [{ card: simbaProtectiveCub, damage: 2 }],
        },
        {
          play: [goofyKnightForADay],
        },
      );

      expect(testEngine.asPlayerOne().playCard(flitReflectiveHummingbird)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
      expect(
        testEngine
          .asPlayerOne()
          .resolvePendingByCard(flitReflectiveHummingbird, { resolveOptional: false }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(simbaProtectiveCub)).toBe(2);
      expect(testEngine.asPlayerTwo().getDamage(goofyKnightForADay)).toBe(0);
    });

    it("moves 1 damage even if source has only 1 damage", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [flitReflectiveHummingbird],
          inkwell: flitReflectiveHummingbird.cost,
          play: [{ card: simbaProtectiveCub, damage: 1 }],
        },
        {
          play: [goofyKnightForADay],
        },
      );

      expect(testEngine.asPlayerOne().playCard(flitReflectiveHummingbird)).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(flitReflectiveHummingbird, {
          resolveOptional: true,
          targets: [simbaProtectiveCub, goofyKnightForADay],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getDamage(simbaProtectiveCub)).toBe(0);
      expect(testEngine.asPlayerTwo().getDamage(goofyKnightForADay)).toBe(1);
    });
  });
});
