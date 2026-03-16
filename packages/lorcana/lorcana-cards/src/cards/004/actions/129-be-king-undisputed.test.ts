import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs, simbaProtectiveCub } from "../../001";
import { beKingUndisputed } from "./129-be-king-undisputed";

describe("Be King Undisputed", () => {
  it("lets the opponent choose one of their characters to banish", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [beKingUndisputed],
        inkwell: beKingUndisputed.cost,
      },
      {
        play: [simbaProtectiveCub, arielOnHumanLegs],
      },
    );

    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", "player_two");

    expect(testEngine.asPlayerOne().playCard(beKingUndisputed)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().resolveNextPending({ targets: [simbaId] }).success).toBe(true);

    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(arielOnHumanLegs)).toBe("play");
  });
});
