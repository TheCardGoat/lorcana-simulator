import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { bigMamaCleverAndCalming } from "./071-big-mama-clever-and-calming";

describe("Big Mama - Clever and Calming", () => {
  it("should have Ward ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [bigMamaCleverAndCalming],
    });

    const cardUnderTest = testEngine.getCardModel(bigMamaCleverAndCalming);
    expect(cardUnderTest.hasWard()).toBe(true);
  });
});
