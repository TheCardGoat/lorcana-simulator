import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack, mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { goofyKnightForADay } from "../../002";
import { ohanaMeansFamily } from "./032-ohana-means-family";

describe("Ohana Means Family", () => {
  it("removes all damage from your chosen character and draws one card per damage removed", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [ohanaMeansFamily],
      inkwell: ohanaMeansFamily.cost,
      play: [goofyKnightForADay],
      deck: [heiheiBoatSnack, mickeyMouseTrueFriend, simbaProtectiveCub],
    });

    expect(testEngine.asServer().manualSetDamage(goofyKnightForADay, 3)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().playCard(ohanaMeansFamily, {
        targets: [goofyKnightForADay],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getDamage(goofyKnightForADay)).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(3);
  });

  it("draws no cards if character has no damage", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [ohanaMeansFamily],
      inkwell: ohanaMeansFamily.cost,
      play: [goofyKnightForADay],
      deck: [heiheiBoatSnack, mickeyMouseTrueFriend, simbaProtectiveCub],
    });

    expect(
      testEngine.asPlayerOne().playCard(ohanaMeansFamily, {
        targets: [goofyKnightForADay],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getDamage(goofyKnightForADay)).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount().deck).toBe(3);
  });
});
