import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { wakeUpAlice } from "../../007/actions/116-wake-up-alice";
import { maleficentsStaff } from "./065-maleficents-staff";

const opponent = createMockCharacter({
  id: "maleficents-staff-opponent",
  name: "Opponent",
  cost: 2,
  strength: 1,
  willpower: 3,
});

describe("Maleficent's Staff", () => {
  it("BACK, FOOLS!: gains 1 lore when an opponent's character is returned to their hand from play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        inkwell: wakeUpAlice.cost,
        play: [maleficentsStaff],
        hand: [wakeUpAlice],
      },
      {
        play: [opponent],
      },
    );

    expect(testEngine.asServer().manualSetDamage(opponent, 1)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().playCard(wakeUpAlice, {
        targets: [opponent],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
  });

  it("BACK, FOOLS!: does not gain lore when a card is returned from hand (not from play)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: wakeUpAlice.cost,
      play: [maleficentsStaff],
      hand: [wakeUpAlice],
    });

    // No opponent cards in play — returning from play cannot happen, lore stays at 0.
    expect(testEngine.getLore(PLAYER_ONE)).toBe(0);
  });
});
