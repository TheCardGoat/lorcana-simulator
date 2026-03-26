import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { queenOfHeartsCapriciousMonarch } from "@tcg/lorcana-cards/cards/002";

describe("OFF WITH THEIR HEADS! - Queen of Hearts, Capricious Monarch - Whenever an opposing character is banished, you may ready this character.", () => {
  // Test cases to cover:
  // 1. Triggers when an opposing character is banished by a game effect (action, ability)
  // 2. Triggers when an opposing character is banished in a challenge
  //    (banish-in-challenge also fires the base banish event)
  // 3. Does NOT trigger when one of your own characters is banished (on: OPPONENT_CHARACTERS)
  // 4. Does NOT trigger when this character itself is banished
  // 5. Trigger is optional ("you may") — player can decline
  // 6. Triggers once per banished character (e.g. if two opposing chars are banished simultaneously, triggers twice)
  // 7. Does NOT trigger during opponent's turn if there is a "during your turn" restriction

  it.todo("It should trigger when an opposing character is banished", () => {});
});
