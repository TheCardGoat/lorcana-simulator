import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { liloMakingAWish } from "../../001";
import { megaraCaptivatingCynic } from "./079-megara-captivating-cynic";

describe("Megara - Captivating Cynic", () => {
  it("lets you discard a card instead of banishing Megara when both branches are legal", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [megaraCaptivatingCynic, liloMakingAWish],
      inkwell: megaraCaptivatingCynic.cost,
    });
    const discardId = testEngine.findCardInstanceId(liloMakingAWish, "hand", "player_one");

    expect(testEngine.asPlayerOne().playCard(megaraCaptivatingCynic)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().resolveNextPending({ choiceIndex: 0 }).success).toBe(true);
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [discardId] }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(megaraCaptivatingCynic)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(liloMakingAWish)).toBe("discard");
  });
});
