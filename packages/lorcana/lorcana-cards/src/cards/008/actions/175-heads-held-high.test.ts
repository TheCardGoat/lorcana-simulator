import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { goofyKnightForADay } from "../../002";
import { headsHeldHigh } from "./175-heads-held-high";

describe("Heads Held High", () => {
  it("removes up to 3 damage from any number of chosen characters and gives all opposing characters -3 strength this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [headsHeldHigh],
        inkwell: headsHeldHigh.cost,
        play: [simbaProtectiveCub, mickeyMouseTrueFriend],
      },
      {
        play: [goofyKnightForADay],
      },
    );
    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", "p1");
    const mickeyId = testEngine.findCardInstanceId(mickeyMouseTrueFriend, "play", "p1");

    testEngine.asServer().manualSetDamage(simbaProtectiveCub, 2);
    testEngine.asServer().manualSetDamage(mickeyMouseTrueFriend, 2);

    expect(
      testEngine.asPlayerOne().playCard(headsHeldHigh, {
        targets: [simbaId, mickeyId],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getDamage(simbaProtectiveCub)).toBe(0);
    expect(testEngine.asPlayerOne().getDamage(mickeyMouseTrueFriend)).toBe(0);
    expect(testEngine.asPlayerTwo().getCardStrength(goofyKnightForADay)).toBe(
      goofyKnightForADay.strength - 3,
    );
  });
});
