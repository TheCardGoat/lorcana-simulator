import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, LorcanaTestEngine } from "@tcg/lorcana-engine/testing";
import { sarabiProtectingThePride } from "./012-sarabi-protecting-the-pride";

describe("Sarabi - Protecting the Pride", () => {
  it("should have FEARSOME SNARL activated ability", () => {
    const testEngine = new LorcanaTestEngine({
      play: [sarabiProtectingThePride],
    });

    const cardModel = testEngine.getCardModel(sarabiProtectingThePride);
    expect(cardModel.hasAbility).toBe(true);
  });

  it("can be played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [sarabiProtectingThePride],
      inkwell: sarabiProtectingThePride.cost,
    });

    expect(testEngine.asPlayerOne().playCard(sarabiProtectingThePride)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(sarabiProtectingThePride)).toBe("play");
  });
});
