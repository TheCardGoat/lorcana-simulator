import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { rapunzelEtherealProtector } from "@tcg/lorcana-cards/cards/011";

describe("LANTERN'S LIGHT - Rapunzel, Ethereal Protector - Whenever this character quests, if there's a card under her, chosen opposing character can't challenge until the start of your next turn.", () => {
  // Test cases to cover:
  // 1. Triggers each time this character quests
  // 2. Fires once per quest action (not multiple times)
  // 3. Does NOT trigger when opponent's character quests (on: SELF)
  // 4. Does NOT trigger when another of your characters quests (on: SELF)
  // 5. Condition ("if there's a card under her") is evaluated at trigger resolution time
  // 6. Effect (can't challenge restriction) persists until start of your next turn
  // 7. Does NOT trigger if the character didn't survive the quest

  it.todo("It should trigger when this character quests", () => {});
});
