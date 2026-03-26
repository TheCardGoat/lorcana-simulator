import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { princePhillipSwordsmanOfTheRealm } from "@tcg/lorcana-cards/cards/005";

describe("PRINCE PHILLIP - Swordsman of the Realm - Ready chosen character.", () => {
  // Effect type(s): ready, challenge-ready (variant)
  //
  // Test cases to cover:
  // 1. Ready the chosen character (character transitions from exerted to ready state)
  // 2. A character that is already ready: no-op, no error
  // 3. Fires the `ready` trigger event
  // 4. challenge-ready: readies in a way that the character can immediately challenge (verify if different from regular ready)
  // 5. A character readied via effect can quest, challenge, or sing in the same turn
  // 6. controller filter: ready applies to the correct target (your own or opponent's character)
  // 7. Readying does NOT remove damage from the character

  it.todo("It should put the chosen character into the ready state", () => {});
});
