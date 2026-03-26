import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { princeNaveenUkulelePlayer } from "@tcg/lorcana-cards/cards/005";

describe("MUSICIAN - Prince Naveen, Ukulele Player - When you play this character, you may play a song with cost 6 or less for free.", () => {
  // Test cases to cover:
  // 1. Triggers when this character is played from hand
  // 2. Does NOT trigger when opponent plays a character (on: SELF)
  // 3. Song played for free via trigger does not trigger other "when you play a song" effects twice
  // 4. Does NOT trigger when shifted onto (shift is a different event)
  // 5. Trigger is optional ("you may") — player can decline without error
  // 6. Song cost cap (≤6) is enforced — cannot choose a song with cost 7+

  it.todo("It should trigger when this character is played from hand", () => {});
});
