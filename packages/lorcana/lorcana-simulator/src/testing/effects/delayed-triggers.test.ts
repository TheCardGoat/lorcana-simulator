import { describe, it } from "bun:test";

describe("Delayed Triggers - Triggers that fire at a future time", () => {
  // System: delayed-triggers
  //
  // Test cases to cover:
  // 1. Delayed trigger fires at start of next turn
  // 2. Delayed trigger fires at end of turn
  // 3. Delayed trigger does not fire if source leaves play (if one-shot)
  // 4. Multiple delayed triggers resolve in registration order

  it.todo("should fire delayed trigger at start of next turn", () => {});

  it.todo("should fire delayed trigger at end of turn", () => {});

  it.todo("should not fire one-shot delayed trigger if source left play", () => {});

  it.todo("should resolve multiple delayed triggers in registration order", () => {});
});
