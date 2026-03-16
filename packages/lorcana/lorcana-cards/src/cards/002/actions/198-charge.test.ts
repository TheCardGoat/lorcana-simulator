import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { goofyKnightForADay } from "../../002";
import { charge } from "./198-charge";

describe("Charge!", () => {
  it("gives the chosen character Challenger +2 and Resist +2 this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [charge],
      inkwell: charge.cost,
      play: [goofyKnightForADay],
    });

    expect(testEngine.asPlayerOne().playCardTo(charge, goofyKnightForADay)).toBeSuccessfulCommand();

    expect(testEngine.getKeywordValue(goofyKnightForADay, "Challenger")).toBe(2);
    expect(testEngine.getKeywordValue(goofyKnightForADay, "Resist")).toBe(2);
  });
});
