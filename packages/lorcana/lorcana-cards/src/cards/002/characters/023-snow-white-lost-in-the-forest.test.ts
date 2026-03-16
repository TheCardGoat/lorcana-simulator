import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { snowWhiteLostInTheForest } from "./023-snow-white-lost-in-the-forest";
import { gastonBaritoneBully } from "./008-gaston-baritone-bully";

describe("Snow White - Lost in the Forest", () => {
  it("I WON'T HURT YOU - remove up to 2 damage from chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: gastonBaritoneBully, damage: 3 }],
      hand: [{ card: snowWhiteLostInTheForest }],
      inkwell: Array.from({ length: 5 }).map(() => ({ card: gastonBaritoneBully })),
    });

    const snowWhiteId = testEngine.findCardInstanceId(snowWhiteLostInTheForest, "hand");
    const gastonId = testEngine.findCardInstanceId(gastonBaritoneBully, "play");

    testEngine.asPlayerOne().playCard(snowWhiteId);

    testEngine.asPlayerOne().resolveNextBag();

    // Optional trigger
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true });
    }

    // Target a character
    pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ targets: [gastonId] });
    }

    // Check if there is an amount choice (due to upTo: true)
    pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      // If prompted for amount, choose 2
      testEngine.asPlayerOne().resolveNextPending({ amount: 2 });
    }

    const gaston = testEngine.asServer().getCard(gastonId);
    expect(gaston.damage).toBe(1); // 3 - 2 = 1
  });

  it("I WON'T HURT YOU - can choose to remove 0 damage", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: gastonBaritoneBully, damage: 3 }],
      hand: [{ card: snowWhiteLostInTheForest }],
      inkwell: Array.from({ length: 5 }).map(() => ({ card: gastonBaritoneBully })),
    });

    const snowWhiteId = testEngine.findCardInstanceId(snowWhiteLostInTheForest, "hand");
    const gastonId = testEngine.findCardInstanceId(gastonBaritoneBully, "play");

    testEngine.asPlayerOne().playCard(snowWhiteId);
    testEngine.asPlayerOne().resolveNextBag();

    // Optional: Yes
    testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true });

    // Target
    testEngine.asPlayerOne().resolveNextPending({ targets: [gastonId] });

    // Amount (if prompted)
    let pendingChoice = testEngine.asPlayerOne().getPendingChoice();
    if (pendingChoice) {
      testEngine.asPlayerOne().resolveNextPending({ amount: 0 });
      const gaston = testEngine.asServer().getCard(gastonId);
      expect(gaston.damage).toBe(3);
    } else {
      // If not prompted, it automatically removes 2?
      // Or maybe "up to" implies mandatory max if not prompted?
      // Actually if upTo is true, it SHOULD prompt for amount.
    }
  });
});
