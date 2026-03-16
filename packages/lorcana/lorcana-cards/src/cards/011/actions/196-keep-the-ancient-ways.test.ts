import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { dragonFire, simbaProtectiveCub } from "../../001";
import { dinglehopper } from "../../001/items";
import { keepTheAncientWays } from "./196-keep-the-ancient-ways";

describe("Keep the Ancient Ways", () => {
  it("stops opponents from playing actions and items until your next turn starts", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [keepTheAncientWays],
        inkwell: keepTheAncientWays.cost,
        deck: [keepTheAncientWays, keepTheAncientWays],
      },
      {
        hand: [dragonFire, dinglehopper, simbaProtectiveCub],
        deck: [dragonFire, dinglehopper],
        inkwell: 10,
      },
    );

    expect(testEngine.asPlayerOne().playCard(keepTheAncientWays)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().hasPlayerRestriction(PLAYER_TWO, "cant-play-actions")).toBe(
      true,
    );
    expect(testEngine.asPlayerOne().hasPlayerRestriction(PLAYER_TWO, "cant-play-items")).toBe(true);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().canPlayCard(dragonFire)).toBe(false);
    expect(testEngine.asPlayerTwo().canPlayCard(dinglehopper)).toBe(false);
    expect(testEngine.asPlayerTwo().playCard(dragonFire).success).toBe(false);
    expect(testEngine.asPlayerTwo().playCard(dinglehopper).success).toBe(false);
    expect(testEngine.asPlayerTwo().playCard(simbaProtectiveCub)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().canPlayCard(dragonFire)).toBe(true);
    expect(testEngine.asPlayerTwo().canPlayCard(dinglehopper)).toBe(true);
    expect(testEngine.asPlayerTwo().playCard(dinglehopper)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerTwo().playCard(dragonFire, { targets: [simbaProtectiveCub] }).success,
    ).toBe(true);
  });
});
