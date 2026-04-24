import { describe, it } from "bun:test";

/**
 * `move-damage` is a slot-aware effect that reads from / writes to two distinct
 * target selections (`from` and `to`). Its behaviour is exercised end-to-end
 * via the simulator integration tests that cover cards like
 * "Belle - Strange but Special" (damage transfer) and
 * "A Whole New World". Per-variant unit coverage for multi-slot selections
 * will land once the slotted-target harness matures; until then, refer to
 * simulator tests for full assertions.
 */
describe("move-damage", () => {
  it.todo("unit: add slot-aware move-damage coverage once the slotted harness exists");
});
