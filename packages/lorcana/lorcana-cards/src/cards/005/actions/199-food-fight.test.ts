import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { arthurNoviceSparrow } from "../characters";
import { foodFight } from "./199-food-fight";

describe("Food Fight!", () => {
  it("grants your characters a temporary activated ability to deal 1 damage to a chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [foodFight],
        inkwell: 2,
        play: [arthurNoviceSparrow],
      },
      {
        play: [simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().playCard(foodFight)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().hasTemporaryAbility(arthurNoviceSparrow, "food-fight-damage"),
    ).toBe(true);

    expect(
      testEngine.asPlayerOne().activateAbility(arthurNoviceSparrow, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(arthurNoviceSparrow)).toBe(true);
    expect(testEngine.asPlayerTwo()).toHaveDamage({ card: simbaProtectiveCub, value: 1 });
  });
});
