import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { jafarKeeperOfSecrets } from "@tcg/lorcana-cards/cards/009";
import { flynnRiderCharmingRogue } from "@tcg/lorcana-cards/cards/001";

const inkableCharacter = createMockCharacter({
  id: "inkable-char",
  name: "Inkable Character",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
});

describe("debug jafar during challenge", () => {
  it("getBagEffects works during challenge declaration with Jafar", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      { play: [jafarKeeperOfSecrets], hand: [inkableCharacter, inkableCharacter], deck: 3 },
      { play: [{ card: flynnRiderCharmingRogue, exerted: true }], deck: 3 },
    );

    // Challenge
    testEngine.asPlayerOne().challenge(jafarKeeperOfSecrets, flynnRiderCharmingRogue);

    // Now try getting bag effects - this should trigger the projection error
    try {
      const p2Bag = testEngine.asPlayerTwo().getBagEffects();
      console.log("P2 bag:", p2Bag.length);
    } catch (e) {
      console.log("P2 getBagEffects error:", (e as Error).message.substring(0, 100));
    }

    // Try server approach
    try {
      const serverBag = testEngine.asServer().getBagEffects();
      console.log("Server bag:", serverBag.length);
    } catch (e) {
      console.log("Server getBagEffects error:", (e as Error).message.substring(0, 100));
    }

    // Try using getAuthoritativeState directly
    const state = testEngine.getAuthoritativeState();
    const bagItems = state.G.triggeredAbilities?.bag?.items ?? [];
    console.log("Direct bag items:", bagItems.length);

    expect(bagItems.length).toBe(1);
  });
});
