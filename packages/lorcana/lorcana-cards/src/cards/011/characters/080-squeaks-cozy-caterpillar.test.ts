import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { squeaksCozyCaterpillar } from "./080-squeaks-cozy-caterpillar";

describe("Squeaks - Cozy Caterpillar", () => {
  it("should have Evasive ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [squeaksCozyCaterpillar],
    });

    const cardUnderTest = testEngine.getCardModel(squeaksCozyCaterpillar);
    expect(cardUnderTest.hasEvasive).toBe(true);
  });
});
