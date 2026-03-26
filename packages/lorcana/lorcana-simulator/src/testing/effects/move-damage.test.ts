import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { cheshireCatInexplicable } from "@tcg/lorcana-cards/cards/010";

describe("CHESHIRE CAT - Inexplicable - Move damage counters between characters.", () => {
  // Effect type(s): move-damage, redirect-damage
  //
  // Test cases to cover:
  // 1. Move N damage from one character to another (counters relocated)
  // 2. If source has fewer than N damage, moves all available damage
  // 3. Source character survives if moved damage was its only damage below willpower
  // 4. Target character is banished if total damage after move >= willpower
  // 5. redirect-damage: redirects incoming damage mid-resolution to a different target
  // 6. Does NOT fire the `damage` event on the target (damage is moved, not dealt fresh)
  // 7. Source character loses the moved damage counters

  it.todo("It should move damage counters from one character to another", () => {});
});
