import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { bibbidiBobbidiBoo } from "./096-bibbidi-bobbidi-boo";
import { hypnotize } from "./098-hypnotize";

describe("Hypnotize", () => {
  it("makes each opponent discard a chosen card and then draws a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [hypnotize],
        inkwell: hypnotize.cost,
        deck: [simbaProtectiveCub],
      },
      {
        hand: [bibbidiBobbidiBoo],
      },
    );
    const discardId = testEngine.findCardInstanceId(bibbidiBobbidiBoo, "hand", "p2");

    expect(testEngine.asPlayerOne().playCard(hypnotize)).toBeSuccessfulCommand();
    const effectId = testEngine.asServer().getState().ctx.priority.pendingChoice?.requestID;
    expect(
      effectId
        ? testEngine.asPlayerTwo().resolveEffect(effectId, { targets: [discardId] }).success
        : false,
    ).toBe(true);

    expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ hand: 0, discard: 1 });
    expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(1);
  });
});
