import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { svenLeapingReindeer } from "./060-sven-leaping-reindeer";

describe("Sven - Leaping Reindeer", () => {
  it("should have Rush ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [svenLeapingReindeer],
    });

    const cardUnderTest = testEngine.getCardModel(svenLeapingReindeer);
    expect(cardUnderTest.hasRush).toBe(true);
  });

  it("should have Challenger 3 ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [svenLeapingReindeer],
    });

    const cardUnderTest = testEngine.getCardModel(svenLeapingReindeer);
    expect(cardUnderTest.hasChallenger).toBe(true);
  });

  it("should have Evasive ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [svenLeapingReindeer],
    });

    const cardUnderTest = testEngine.getCardModel(svenLeapingReindeer);
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
