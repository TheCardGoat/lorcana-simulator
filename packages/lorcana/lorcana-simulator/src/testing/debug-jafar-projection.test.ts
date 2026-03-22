import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { jafarKeeperOfSecrets } from "@tcg/lorcana-cards/cards/009";

const inkableCharacter = createMockCharacter({
  id: "inkable-char",
  name: "Inkable Character",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
});

describe("debug jafar projection", () => {
  it("getBagEffects works when Jafar is in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      { play: [jafarKeeperOfSecrets], hand: [inkableCharacter, inkableCharacter], deck: 3 },
      { deck: 3 },
    );

    // This should not error - just a board projection with Jafar in play
    const p2Bag = testEngine.asPlayerTwo().getBagEffects();
    console.log("P2 bag:", p2Bag.length);

    const strength = testEngine.asPlayerOne().getCardStrength(jafarKeeperOfSecrets);
    console.log("Jafar strength:", strength);

    expect(strength).toBe(2);
  });
});
