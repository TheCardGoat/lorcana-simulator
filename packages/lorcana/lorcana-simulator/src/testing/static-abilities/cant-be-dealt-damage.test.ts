import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { balooOlIronPaws } from "@tcg/lorcana-cards/cards/007";

describe("FIGHT LIKE A BEAR - Baloo, Ol' Iron Paws - Your characters with 7 {S} or more can't be dealt damage.", () => {
  // Test cases to cover:
  // 1. Your characters with exactly 7 strength or more cannot receive any damage
  // 2. Your characters with less than 7 strength CAN still be damaged normally
  // 3. Opponent's characters with 7+ strength are NOT protected (only YOUR characters)
  // 4. If a character's strength is buffed to 7+ mid-game, they immediately become immune to damage
  // 5. If a character's strength drops below 7 (via debuff), they can take damage again immediately
  // 6. Baloo himself has 5 strength — he CAN take damage (he does not meet his own threshold)
  // 7. Challenge damage is also prevented for qualifying characters (not just ability damage)
  // 8. Characters that can't be dealt damage cannot be banished via damage in challenges

  it.todo("It should prevent your characters with 7 or more strength from being dealt damage", () => {});
});
