import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { goofyKnightForADay } from "../../002";
import { pullTheLever } from "./080-pull-the-lever";
import { wrongLever } from "./116-wrong-lever";

describe("Wrong Lever!", () => {
  it("returns the chosen character to hand in the first mode", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [wrongLever],
        inkwell: wrongLever.cost,
      },
      {
        play: [goofyKnightForADay],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardWithChoice(wrongLever, 0, { targets: [goofyKnightForADay] })
        .success,
    ).toBe(true);
    expect(testEngine.asPlayerTwo().getCardZone(goofyKnightForADay)).toBe("hand");
  });

  it("puts Pull the Lever! on the bottom of your deck before resolving the follow-up target selection", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [wrongLever],
        inkwell: wrongLever.cost,
        discard: [pullTheLever],
      },
      {
        play: [goofyKnightForADay],
        deck: [simbaProtectiveCub],
      },
    );
    const playerOne = testEngine.asPlayerOne();
    const goofyId = testEngine.findCardInstanceId(goofyKnightForADay, "play", "p2");

    expect(playerOne.playCardWithChoice(wrongLever, 1).success).toBe(true);
    expect(playerOne.resolveNextPending({ targets: [goofyId] }).success).toBe(true);

    expect(playerOne.getCardZone(pullTheLever)).toBe("deck");
  });
});
