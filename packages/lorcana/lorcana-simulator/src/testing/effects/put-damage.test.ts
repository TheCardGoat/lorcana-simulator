import { describe, it } from "bun:test";

describe("Put Damage - Places damage counters directly (bypasses prevent-damage and Resist)", () => {
  // Effect type(s): put-damage-effect
  //
  // Unlike deal-damage-effect, put-damage bypasses damage prevention and Resist.
  //
  // Test cases to cover:
  // 1. Puts the specified amount of damage on the target character
  // 2. Does NOT trigger prevent-damage replacement effects (unlike deal-damage)
  // 3. Does NOT respect Resist keyword (unlike deal-damage)
  // 4. Banishes character if damage equals or exceeds willpower
  // 5. Works with amountByTarget for distributing damage across multiple targets

  it.todo("should put the specified damage on the target character", () => {});

  it.todo("should NOT trigger prevent-damage replacement effects", () => {});

  it.todo("should NOT reduce damage via Resist keyword", () => {});

  it.todo("should banish character when damage meets or exceeds willpower", () => {});

  it.todo("should distribute damage across targets via amountByTarget", () => {});
});
