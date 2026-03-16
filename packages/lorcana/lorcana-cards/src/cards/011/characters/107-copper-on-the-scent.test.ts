import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { copperOnTheScent } from "./107-copper-on-the-scent";

describe("Copper - On the Scent", () => {
  it("should have Rush ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [copperOnTheScent],
    });

    const cardUnderTest = testEngine.getCardModel(copperOnTheScent);
    expect(cardUnderTest.hasRush).toBe(true);
  });

  it("should have Reckless ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [copperOnTheScent],
    });

    const cardUnderTest = testEngine.getCardModel(copperOnTheScent);
    expect(cardUnderTest.hasReckless()).toBe(true);
  });
});
