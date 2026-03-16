import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { cleansingRainwater } from "../items";
import { riseOfTheTitans } from "./198-rise-of-the-titans";

describe("Rise of the Titans", () => {
  it("banishes the chosen item", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [riseOfTheTitans],
      inkwell: riseOfTheTitans.cost,
      play: [cleansingRainwater],
    });

    expect(
      testEngine.asPlayerOne().playCard(riseOfTheTitans, {
        targets: [cleansingRainwater],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(cleansingRainwater)).toBe("discard");
  });
});
