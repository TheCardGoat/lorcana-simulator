import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { darkwingDuckDrakeMallard } from "./145-darkwing-duck-drake-mallard";

describe("Darkwing Duck - Drake Mallard", () => {
  it("should have Ward ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [darkwingDuckDrakeMallard],
    });

    const cardUnderTest = testEngine.getCardModel(darkwingDuckDrakeMallard);
    expect(cardUnderTest.hasWard()).toBe(true);
  });
});
