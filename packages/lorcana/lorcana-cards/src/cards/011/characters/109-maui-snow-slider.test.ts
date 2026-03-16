import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { mauiSnowSlider } from "./109-maui-snow-slider";

describe("Maui - Snow Slider", () => {
  it("should have Rush ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [mauiSnowSlider],
    });

    const cardUnderTest = testEngine.getCardModel(mauiSnowSlider);
    expect(cardUnderTest.hasRush).toBe(true);
  });
});
