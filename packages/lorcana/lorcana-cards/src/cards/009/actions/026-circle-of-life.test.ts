import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { circleOfLife } from "./026-circle-of-life";

describe("Circle of Life", () => {
  it("plays a character from your discard for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [circleOfLife],
      inkwell: circleOfLife.cost,
      discard: [simbaProtectiveCub],
    });

    const playResult = testEngine.asPlayerOne().playCard(circleOfLife, {
      targets: [simbaProtectiveCub],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("play");
  });
});
