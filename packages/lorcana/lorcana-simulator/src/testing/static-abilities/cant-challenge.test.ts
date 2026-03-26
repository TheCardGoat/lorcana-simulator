import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { percyPupsicle } from "@tcg/lorcana-cards/cards/011";

describe("ICE BATH - Percy, Pupsicle - This character can't challenge.", () => {
  // Test cases to cover:
  // 1. Percy cannot initiate a challenge against any opposing character
  // 2. Percy can still quest normally
  // 3. Opposing characters CAN challenge Percy
  // 4. Attempting to challenge with Percy returns an error/invalid command
  // 5. Percy can still be the target of effects and abilities
  // 6. Percy can still be exerted via questing or abilities (just not via challenging)

  it.todo("It should prevent this character from challenging opposing characters", () => {});
});
