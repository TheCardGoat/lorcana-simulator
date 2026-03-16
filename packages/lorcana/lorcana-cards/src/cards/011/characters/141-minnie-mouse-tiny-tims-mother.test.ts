import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { minnieMouseTinyTimsMother } from "./141-minnie-mouse-tiny-tims-mother";

describe("Minnie Mouse - Tiny Tim's Mother", () => {
  it("should have Support ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [minnieMouseTinyTimsMother],
    });

    const cardUnderTest = testEngine.getCardModel(minnieMouseTinyTimsMother);
    expect(cardUnderTest.hasSupport()).toBe(true);
  });
});
