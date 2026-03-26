import { describe, it } from "bun:test";

describe("Temporary Effects - Effects that expire after a duration", () => {
  // System: temporary-effects
  //
  // Test cases to cover:
  // 1. "this-turn" effects expire at end of the current turn
  // 2. "next-turn" effects expire at end of the next turn
  // 3. Temporary keyword grant is lost when the effect expires

  it.todo("should expire this-turn effects at end of the current turn", () => {});

  it.todo("should expire next-turn effects at end of the next turn", () => {});

  it.todo("should remove temporary keyword grant when effect expires", () => {});
});
