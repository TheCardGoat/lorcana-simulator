import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { owlLogicalLecturer, rabbitReluctantHost } from "../characters";
import { gumboPot } from "./167-gumbo-pot";

describe("Gumbo Pot", () => {
  it("removes 1 damage from up to 2 chosen characters", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [gumboPot, rabbitReluctantHost, owlLogicalLecturer],
    });

    testEngine.asServer().manualSetDamage(rabbitReluctantHost, 1);
    testEngine.asServer().manualSetDamage(owlLogicalLecturer, 1);

    const result = testEngine.asPlayerOne().activateAbility(gumboPot, {
      targets: [rabbitReluctantHost, owlLogicalLecturer],
    });

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getDamage(rabbitReluctantHost)).toBe(0);
    expect(testEngine.asPlayerOne().getDamage(owlLogicalLecturer)).toBe(0);
  });

  it("can remove 1 damage from only 1 chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [gumboPot, rabbitReluctantHost, owlLogicalLecturer],
    });

    testEngine.asServer().manualSetDamage(rabbitReluctantHost, 1);
    testEngine.asServer().manualSetDamage(owlLogicalLecturer, 1);

    const result = testEngine.asPlayerOne().activateAbility(gumboPot, {
      targets: [rabbitReluctantHost],
    });

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getDamage(rabbitReluctantHost)).toBe(0);
    expect(testEngine.asPlayerOne().getDamage(owlLogicalLecturer)).toBe(1);
  });
});
