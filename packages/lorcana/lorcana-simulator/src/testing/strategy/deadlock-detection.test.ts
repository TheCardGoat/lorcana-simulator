import { describe, expect, it } from "bun:test";
import { PLAYER_ONE, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { createRepeatedStateDeadlockTracker, resolveStrategyMatchEndReason } from "./deadlock.js";

describe("strategy deadlock detection", () => {
  it("stops a match when the same actor sees the same state three times", () => {
    const tracker = createRepeatedStateDeadlockTracker();

    expect(
      tracker.observe({
        actorId: PLAYER_ONE,
        stateFingerprint: "repeat-state",
      }).repeatedStateDeadlock,
    ).toBe(false);
    expect(
      tracker.observe({
        actorId: PLAYER_TWO,
        stateFingerprint: "different-state",
      }).repeatedStateDeadlock,
    ).toBe(false);

    tracker.observe({
      actorId: PLAYER_ONE,
      stateFingerprint: "repeat-state",
    });

    const repeatedState = tracker.observe({
      actorId: PLAYER_ONE,
      stateFingerprint: "repeat-state",
    });

    expect(repeatedState.repeatedStateDeadlock).toBe(true);
    expect(
      resolveStrategyMatchEndReason({
        actionCount: 4,
        pendingDeadlock: repeatedState.repeatedStateDeadlock,
        turnNumber: 2,
      }),
    ).toBe("repeated-state-deadlock");
  });
});
