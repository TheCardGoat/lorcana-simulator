import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend } from "../../001";
import { madamMimSnake } from "./049-madam-mim-snake";

describe("Madam Mim - Snake", () => {
  it("returns another character of yours to hand when that branch is chosen", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [madamMimSnake],
      inkwell: madamMimSnake.cost,
      play: [mickeyMouseTrueFriend],
    });
    const targetId = testEngine.findCardInstanceId(mickeyMouseTrueFriend, "play", "player_one");

    expect(testEngine.asPlayerOne().playCard(madamMimSnake)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().resolvePendingByCard(madamMimSnake)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().resolveNextPending({ choiceIndex: 1 }).success).toBe(true);
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [targetId] }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(madamMimSnake)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(mickeyMouseTrueFriend)).toBe("hand");
  });
});
