import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { meekoSkittishScrounger } from "@tcg/lorcana-cards/cards/011";

describe("SCROUNGER - Meeko, Skittish Scrounger - At the end of your turn, if this character is exerted, choose and discard a card or banish him.", () => {
  // Test cases to cover:
  // 1. Triggers at the end of your turn (when you pass turn)
  // 2. Does NOT trigger at the end of opponent's turn (on: YOU)
  // 3. Condition ("if this character is exerted") evaluated at trigger time
  //    — does NOT fire if character is ready at end of turn
  // 4. Player must choose between discarding or banishing (mandatory, not optional)
  // 5. Banish option: character goes to discard zone
  // 6. Discard option: player discards a card of their choice
  // 7. If player has no cards to discard, must banish the character
  // 8. Trigger fires before the turn actually passes (end-of-turn phase)

  it.todo("It should trigger at the end of your turn when this character is exerted", () => {});
});
