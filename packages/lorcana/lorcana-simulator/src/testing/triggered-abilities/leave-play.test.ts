import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { olafHelpingHand } from "@tcg/lorcana-cards/cards/010";

describe("WARM HUG - Olaf, Helping Hand - When this character leaves play, you may return chosen character of yours to your hand.", () => {
  // Test cases to cover:
  // 1. Triggers when this character is banished by a game effect
  // 2. Triggers when this character is banished in a challenge
  // 3. Triggers when this character is returned to hand by an opponent's effect
  // 4. Does NOT trigger when an opponent's character leaves play (on: SELF)
  // 5. Trigger is optional ("you may") — player can decline
  // 6. "When" timing means it fires at most once per leave event
  // 7. The returned character can be this character itself if it was returned to hand
  //    (edge case: can you target Olaf if he left play by being bounced? Probably no, he's in hand)
  // 8. Trigger fires even if this character shifted off (leave-play fires on shift-out)

  it.todo("It should trigger when this character leaves play", () => {});
});
