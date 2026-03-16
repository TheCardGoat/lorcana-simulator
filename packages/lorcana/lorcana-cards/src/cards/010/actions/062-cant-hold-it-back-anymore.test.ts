import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { goofyKnightForADay } from "../../002";
import { simbaProtectiveCub } from "../../001";
import { mowgliManCub } from "../characters/019-mowgli-man-cub";
import { cantHoldItBackAnymore } from "./062-cant-hold-it-back-anymore";

describe("Can't Hold It Back Anymore", () => {
  it("exerts the chosen opposing character and moves all damage to them", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [cantHoldItBackAnymore],
        inkwell: cantHoldItBackAnymore.cost,
        play: [mowgliManCub, simbaProtectiveCub],
      },
      {
        play: [goofyKnightForADay],
      },
    );

    testEngine.asServer().manualSetDamage(mowgliManCub, 1);
    testEngine.asServer().manualSetDamage(simbaProtectiveCub, 2);

    const playResult = testEngine.asPlayerOne().playCard(cantHoldItBackAnymore, {
      targets: [goofyKnightForADay],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().isExerted(goofyKnightForADay)).toBe(true);
    expect(testEngine.asPlayerTwo().getDamage(goofyKnightForADay)).toBe(3);
    expect(testEngine.asPlayerOne().getDamage(mowgliManCub)).toBe(0);
    expect(testEngine.asPlayerOne().getDamage(simbaProtectiveCub)).toBe(0);
  });
});
