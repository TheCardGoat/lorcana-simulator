import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { theFatesOnlyOneEye } from "./089-the-fates-only-one-eye";

describe("The Fates - Only One Eye", () => {
  // ALL WILL BE SEEN - "When you play this character, look at the top card of each opponent's deck."
  // NOTE: Pattern E - reveals opponent's top card, no player selection. This is an info-only peek.
  // The scry target is EACH_OPPONENT, which is a unique mechanic. Testing that the card plays.

  it("can be played onto the board", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [theFatesOnlyOneEye],
      inkwell: theFatesOnlyOneEye.cost,
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(theFatesOnlyOneEye)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(theFatesOnlyOneEye)).toBe("play");
  });
});
