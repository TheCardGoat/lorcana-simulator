import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { rhinoPowerHamster } from "./030-rhino-power-hamster";

describe("Rhino - Power Hamster", () => {
  it("has Shift 2 keyword", () => {
    const shiftAbility = rhinoPowerHamster.abilities?.find(
      (a) => "keyword" in a && a.keyword === "Shift",
    );
    expect(shiftAbility).toBeDefined();
  });

  describe("EPIC BALL OF AWESOME - While this character has no damage, he gains Resist +2.", () => {
    it("should have Resist when undamaged", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [rhinoPowerHamster],
        deck: 5,
      });

      expect(testEngine.asPlayerOne().hasKeyword(rhinoPowerHamster, "Resist")).toBe(true);
    });
  });
});
