import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, simbaProtectiveCub, tinkerBellPeterPansAlly } from "../../001";
import { youreWelcome } from "./096-youre-welcome";

describe("You're Welcome", () => {
  it("shuffles the chosen permanent into its player's deck and that player draws 2 cards", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [youreWelcome],
        inkwell: youreWelcome.cost,
      },
      {
        deck: [mickeyMouseTrueFriend, tinkerBellPeterPansAlly],
        play: [simbaProtectiveCub],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardTo(youreWelcome, simbaProtectiveCub),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, discard: 1 });
    expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ play: 0, hand: 2, deck: 1 });
  });
});
