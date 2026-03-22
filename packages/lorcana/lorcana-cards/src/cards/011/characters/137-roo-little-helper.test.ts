import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { rooLittleHelper } from "./137-roo-little-helper";

describe("Roo - Little Helper", () => {
  it("is playable and enters play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [rooLittleHelper],
      inkwell: rooLittleHelper.cost,
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(rooLittleHelper)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(rooLittleHelper)).toBe("play");
  });
});
