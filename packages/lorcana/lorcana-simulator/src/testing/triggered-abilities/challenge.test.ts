import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { princePhillipSwordsmanOfTheRealm } from "@tcg/lorcana-cards/cards/005";

describe("DRAGON SLAYER - Prince Phillip, Swordsman of the Realm - Whenever he challenges a damaged character, ready this character after the challenge.", () => {
  // Test cases to cover:
  // 1. Triggers when this character initiates a challenge against a damaged defender
  // 2. Does NOT trigger when this character challenges an undamaged character
  //    (condition: defender must be damaged)
  // 3. Does NOT trigger when opponent's character challenges (on: SELF)
  // 4. Does NOT trigger when this character is the defender being challenged
  // 5. Character is readied after the challenge resolves (even if the defender survives)
  // 6. Character is readied even if this character is banished in the challenge (mutual kill)
  // 7. Repeated challenge is possible in the same turn if readied by trigger

  it.todo("It should trigger when this character challenges a damaged character", () => {});
});
