import { describe, it } from "bun:test";

describe("Timing: Triggered Ability Ordering", () => {
  // When multiple triggered abilities fire simultaneously, the active player
  // determines the resolution order of their own triggers.
  //
  // Test cases to cover:
  // 1. Multiple simultaneous triggers: active player orders their own triggers
  // 2. Triggers from different cards but same event follow timestamp order
  // 3. Triggered ability that creates another trigger: nested trigger queues after current batch
  // 4. Optional triggers can be declined by the player

  it.todo("should let the active player order simultaneous triggers", () => {});

  it.todo("should resolve same-event triggers from different cards in timestamp order", () => {});

  it.todo("should queue nested triggers after the current batch resolves", () => {});

  it.todo("should allow optional triggers to be declined", () => {});
});
