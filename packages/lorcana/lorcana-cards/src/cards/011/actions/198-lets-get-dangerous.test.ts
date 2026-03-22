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

  it("puts a non-character card on the bottom of deck", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letsGetDangerous],
        inkwell: letsGetDangerous.cost,
        deck: [dragonFire],
      },
      {
        deck: [],
      },
    );

    expect(testEngine.asPlayerOne().playCard(letsGetDangerous)).toBeSuccessfulCommand();

    // Non-character cards are automatically put on bottom (no choice needed)
    expect(testEngine.asPlayerOne().getCardZone(dragonFire)).toBe("deck");
    expect(testEngine.asPlayerOne().getCardZone(letsGetDangerous)).toBe("discard");
  });

  it("allows player to decline playing a revealed character (put on bottom)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letsGetDangerous],
        inkwell: letsGetDangerous.cost,
        deck: [simbaProtectiveCub],
      },
      {
        deck: [],
      },
    );

    expect(testEngine.asPlayerOne().playCard(letsGetDangerous)).toBeSuccessfulCommand();

    // Choose to put on bottom instead of playing (choiceIndex: 1)
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(letsGetDangerous, {
        choiceIndex: 1,
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("deck");
    expect(testEngine.asPlayerOne().getCardZone(letsGetDangerous)).toBe("discard");
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

  it("both players reveal characters and play them", () => {
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

    // Player one plays their revealed character
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(letsGetDangerous, {
        choiceIndex: 0,
      }).success,
    ).toBe(true);

    // Player two also plays their revealed character
    expect(
      testEngine.asPlayerTwo().resolveNextPending({
        choiceIndex: 0,
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("play");
    expect(testEngine.asPlayerTwo().getCardZone(mickeyMouseTrueFriend)).toBe("play");
  });

  it.todo("card moved to hand before modal resolution (play mode) should not be played", () => {});

  it.todo("card moved to hand before modal resolution (bottom mode) should not move it", () => {});
});
