import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { munchingsAndCrunchings } from "./033-munchings-and-crunchings";

const woundedOpponent = createMockCharacter({
  id: "munchings-wounded-opponent",
  name: "Wounded Opponent",
  cost: 3,
  strength: 3,
  willpower: 5,
});

describe("Munchings and Crunchings", () => {
  it("removes up to 2 damage from a chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [munchingsAndCrunchings],
      },
      {
        play: [woundedOpponent],
      },
    );

    expect(testEngine.asServer().manualSetDamage(woundedOpponent, 3)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().activateAbility(munchingsAndCrunchings, {
        targets: [woundedOpponent],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(munchingsAndCrunchings)).toBe(true);
    expect(testEngine.asPlayerTwo().getDamage(woundedOpponent)).toBe(1);
  });
});
