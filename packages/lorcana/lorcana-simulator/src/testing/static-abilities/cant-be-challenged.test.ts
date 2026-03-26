import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { snowWhiteFairestInTheLand } from "@tcg/lorcana-cards/cards/007";

describe("HIDDEN AWAY - Snow White, Fairest in the Land - This character can't be challenged.", () => {
  // Test cases to cover:
  // 1. No opposing character can declare a challenge against Snow White
  // 2. Snow White can still INITIATE challenges against opposing characters
  // 3. Snow White can still be targeted by non-challenge effects (actions, abilities)
  // 4. Effect is removed if Snow White leaves play
  // 5. Snow White can still be damaged by non-challenge effects (e.g., deal-damage abilities)
  // 6. This protection applies regardless of whether Snow White is exerted or ready

  it.todo("It should prevent opposing characters from challenging this character", () => {});
});
