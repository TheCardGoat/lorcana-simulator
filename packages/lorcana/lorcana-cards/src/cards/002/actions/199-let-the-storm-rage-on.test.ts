import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { goofyKnightForADay } from "../../002";
import { letTheStormRageOn } from "./199-let-the-storm-rage-on";

const wardedCharacter = createMockCharacter({
  id: "storm-rage-on-warded-character",
  name: "Warded Character",
  cost: 2,
  strength: 2,
  willpower: 4,
  abilities: [{ id: "storm-rage-on-ward", type: "keyword", keyword: "Ward", text: "Ward" }],
});

describe("Let the Storm Rage On", () => {
  it("deals 2 damage to the chosen character and draws a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letTheStormRageOn],
        inkwell: letTheStormRageOn.cost,
        deck: [simbaProtectiveCub],
      },
      {
        play: [goofyKnightForADay],
      },
    );

    expect(testEngine.asPlayerOne().playCardTo(letTheStormRageOn, goofyKnightForADay).success).toBe(
      true,
    );

    expect(testEngine.asPlayerTwo()).toHaveDamage({ card: goofyKnightForADay, value: 2 });
    expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(1);
  });

  it("draws a card even when the damage step has no legal target", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letTheStormRageOn],
        inkwell: letTheStormRageOn.cost,
        deck: [simbaProtectiveCub],
      },
      {
        play: [wardedCharacter],
      },
    );

    expect(testEngine.asPlayerOne().playCard(letTheStormRageOn)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);
    expect(testEngine.asPlayerOne().resolveNextPending({ targets: [] })).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo()).toHaveDamage({ card: wardedCharacter, value: 0 });
    expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(1);
  });
});
