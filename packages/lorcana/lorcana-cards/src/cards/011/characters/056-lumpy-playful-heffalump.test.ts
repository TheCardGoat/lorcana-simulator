import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { lumpyPlayfulHeffalump } from "./056-lumpy-playful-heffalump";

describe("Lumpy - Playful Heffalump", () => {
  it("should have Evasive ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [lumpyPlayfulHeffalump],
    });

    const cardUnderTest = testEngine.getCardModel(lumpyPlayfulHeffalump);
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
