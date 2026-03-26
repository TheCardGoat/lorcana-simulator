import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs } from "@tcg/lorcana-cards/cards/001";

describe("ARIEL - On Human Legs - This character can't sing songs.", () => {
  // Effect type(s): restriction, restrict (alias)
  //
  // Test cases to cover:
  // 1. restriction: applies a limitation to a card (can't quest, can't challenge, can't sing, etc.)
  // 2. Common restrictions: cant-quest, cant-challenge, cant-sing, cant-exert, cant-be-challenged
  // 3. Restriction is enforced by the move-validation layer (move fails if restricted)
  // 4. Duration: "this turn" (temporary) vs. permanent (printed on card)
  // 5. restrict alias behaves identically to restriction
  // 6. Multiple restrictions stack (character can have cant-sing AND cant-challenge simultaneously)
  // 7. Restriction from an effect vs. restriction from the card's own text: both enforced

  it.todo("It should prevent the target from performing the restricted action", () => {});
});
