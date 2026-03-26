import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { ramaVigilantFather } from "@tcg/lorcana-cards/cards/010";

describe("VILLAGE GUARDIAN - Rama, Vigilant Father - When you play this character, if you have a character with 5 strength or more in play, you may ready this character.", () => {
  // Effect type(s): conditional
  //
  // Test cases to cover:
  // 1. Then-branch executes when condition evaluates to true
  // 2. Then-branch does NOT execute when condition is false
  // 3. Else-branch (if present) executes when condition is false
  // 4. Condition is evaluated at resolution time, not at definition time
  // 5. Nested conditional: inner condition only evaluated when outer is true
  // 6. conditional wrapping an optional: if true, player still gets to choose

  it.todo("It should execute the then-branch only when the condition is true", () => {});
});
