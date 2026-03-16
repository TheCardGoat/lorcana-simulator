import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { snowWhiteWellWisher } from "./025-snow-white-well-wisher";
import { gastonBaritoneBully } from "./008-gaston-baritone-bully";

describe("Snow White - Well Wisher", () => {
  it("WISHES COME TRUE - return character card from discard to hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: snowWhiteWellWisher }],
      discard: [{ card: gastonBaritoneBully }],
    });

    const snowWhiteId = testEngine.findCardInstanceId(snowWhiteWellWisher, "play");
    const gastonDiscardId = testEngine.findCardInstanceId(gastonBaritoneBully, "discard");

    testEngine.asPlayerOne().quest(snowWhiteId);
    testEngine.asPlayerOne().resolveNextBag();

    // Optional trigger
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true });
    }

    // Target (choose card from discard)
    pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ targets: [gastonDiscardId] });
    }

    const gastonZone = testEngine.asPlayerOne().getCardZone(gastonDiscardId);
    expect(gastonZone).toBe("hand");
  });

  it("WISHES COME TRUE - no valid target", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: snowWhiteWellWisher }],
      discard: [],
    });

    const snowWhiteId = testEngine.findCardInstanceId(snowWhiteWellWisher, "play");

    testEngine.asPlayerOne().quest(snowWhiteId);

    // Bag item should be there
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    testEngine.asPlayerOne().resolveNextBag();

    // Optional trigger check
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();

    // If there are no valid targets, does the engine skip the optional prompt?
    // Or does it prompt and then realize there are no targets?
    // Usually if the effect cannot happen (no targets), the ability might fizzle or be skipped.
    // But since it's "optional", maybe it prompts.

    if (pendingChoice) {
      // If it prompts, we can decline.
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: false });
    }

    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });
});
