import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { goofyKnightForADay } from "../../002";
import { performanceReview } from "./064-performance-review";

describe("Performance Review", () => {
  it("exerts the chosen ready character of yours and draws cards equal to their lore", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [performanceReview],
      inkwell: performanceReview.cost,
      play: [goofyKnightForADay],
      deck: 5,
    });

    const playResult = testEngine.asPlayerOne().playCard(performanceReview, {
      targets: [goofyKnightForADay],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().isExerted(goofyKnightForADay)).toBe(true);
    expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(4);
  });
});
