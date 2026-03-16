import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { dragonFire, mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { letsGetDangerous } from "./198-lets-get-dangerous";

describe("Let's Get Dangerous", () => {
  it("lets the active player play a revealed character for free and bottoms a revealed non-character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letsGetDangerous],
        inkwell: letsGetDangerous.cost,
        deck: [simbaProtectiveCub],
      },
      {
        deck: [dragonFire],
      },
    );

    expect(testEngine.asPlayerOne().playCard(letsGetDangerous)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(letsGetDangerous, {
        choiceIndex: 0,
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("play");
    expect(testEngine.asPlayerTwo().getCardZone(dragonFire)).toBe("deck");
  });

  it("handles mixed choices across both players", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letsGetDangerous],
        inkwell: letsGetDangerous.cost,
        deck: [simbaProtectiveCub],
      },
      {
        deck: [mickeyMouseTrueFriend],
      },
    );

    expect(testEngine.asPlayerOne().playCard(letsGetDangerous)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(letsGetDangerous, {
        choiceIndex: 0,
      }).success,
    ).toBe(true);
    expect(
      testEngine.asPlayerTwo().resolveNextPending({
        choiceIndex: 1,
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("play");
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("deck");
  });
});
