import { describe, expect, it } from "bun:test";
import { LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { darkwingDuckDarkwolfDog } from "./043-darkwing-duck-darkwolf-dog";

describe("Darkwing Duck - Darkwolf Dog", () => {
  it("should have Rush ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [darkwingDuckDarkwolfDog],
    });

    const cardUnderTest = testEngine.getCardModel(darkwingDuckDarkwolfDog);
    expect(cardUnderTest.hasRush).toBe(true);
  });
});
