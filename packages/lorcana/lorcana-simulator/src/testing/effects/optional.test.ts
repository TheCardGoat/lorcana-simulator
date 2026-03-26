import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { jafarDreadnought } from "@tcg/lorcana-cards/cards/002";

describe("JAFAR - Dreadnought - Whenever one of your characters is banished in a challenge, you may draw a card.", () => {
  // Effect type(s): optional
  //
  // Test cases to cover:
  // 1. Player can CHOOSE to apply the effect — accepting resolves it normally
  // 2. Player can DECLINE the effect — declining skips the effect with no consequence
  // 3. Declining a "you may" sets if-you-do context to false (see if-you-do.test.ts)
  // 4. chooser: "controller" — the controller of the card makes the choice (default)
  // 5. chooser: "opponent" — the opponent makes the choice (rare)
  // 6. Optional cost effects: "you may discard X to draw a card" — declining skips both cost and effect
  // 7. Auto-resolve handles optional effects without hanging
  // 8. Multiple optional effects in one sequence: player resolves each independently

  it.todo("It should allow the player to choose whether to apply the effect", () => {});
});
