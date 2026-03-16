import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { sleepyNoddingOff } from "./021-sleepy-nodding-off";

describe("Sleepy - Nodding Off", () => {
  it("YAWN! - Enters play exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [{ card: sleepyNoddingOff }],
      inkwell: Array.from({ length: 5 }).map(() => ({ card: sleepyNoddingOff })),
    });

    const sleepyId = testEngine.findCardInstanceId(sleepyNoddingOff, "hand");

    // Play Sleepy
    testEngine.asPlayerOne().playCard(sleepyId);

    // Sleepy should be in play and exerted
    const sleepy = testEngine.asServer().getCard(sleepyId);
    expect(sleepy.zone).toBe("play");
    expect(sleepy.exerted).toBe(true);
  });
});
