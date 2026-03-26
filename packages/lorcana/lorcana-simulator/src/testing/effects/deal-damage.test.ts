import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { stampede } from "@tcg/lorcana-cards/cards/001";

describe("STAMPEDE - Deal 2 damage to each opposing character.", () => {
  // Effect type(s): deal-damage, put-damage, take-damage
  //
  // Test cases to cover:
  // 1. Deal N damage to chosen character (damage counters added to character)
  // 2. Banish threshold: character with total damage >= willpower is banished
  // 3. put-damage: places damage directly without triggering the `damage` event (vs deal-damage)
  // 4. take-damage: character receives damage from its own effect
  // 5. amount field: fixed (deal 2) vs dynamic (deal damage equal to this character's strength)
  // 6. deal-damage to multiple targets: each is damaged independently
  // 7. Fires the `damage` trigger event for each character damaged
  // 8. Damage cannot go below 0 on a character that has no existing damage

  it.todo("It should add the specified amount of damage to the chosen character", () => {});
});
