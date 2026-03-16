import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack, simbaProtectiveCub } from "../../001";
import { educationOrElimination } from "./097-education-or-elimination";

describe("Education or Elimination", () => {
  it("draws a card and buffs your chosen character when the first mode is chosen", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [educationOrElimination],
      inkwell: educationOrElimination.cost,
      play: [simbaProtectiveCub],
      deck: [heiheiBoatSnack],
    });

    expect(
      testEngine.asPlayerOne().playCardWithChoice(educationOrElimination, 0, {
        targets: [simbaProtectiveCub],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(heiheiBoatSnack)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardLore(simbaProtectiveCub)).toBe(
      simbaProtectiveCub.lore + 1,
    );
    expect(testEngine.asPlayerOne().getCard(simbaProtectiveCub)?.hasEvasive).toBe(true);
  });

  it("banishes the chosen damaged character when the second mode is chosen", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [educationOrElimination],
        inkwell: educationOrElimination.cost,
      },
      {
        play: [simbaProtectiveCub],
      },
    );

    expect(testEngine.asServer().manualSetDamage(simbaProtectiveCub, 1)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().playCardWithChoice(educationOrElimination, 1, {
        targets: [simbaProtectiveCub],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("discard");
  });
});
