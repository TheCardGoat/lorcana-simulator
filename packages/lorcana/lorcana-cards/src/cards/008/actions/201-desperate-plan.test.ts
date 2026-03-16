import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseArtfulRogue, mickeyMouseDetective } from "../../001";
import { goofyKnightForADay } from "../../002";
import { mickeyMouseFriendlyFace } from "../../002/characters/013-mickey-mouse-friendly-face";
import { mickeyMouseTrumpeter } from "../../003/characters/182-mickey-mouse-trumpeter";
import { desperatePlan } from "./201-desperate-plan";

describe("Desperate Plan", () => {
  it("draws until you have 3 cards when your hand is empty", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [desperatePlan],
      inkwell: desperatePlan.cost,
      deck: [goofyKnightForADay, goofyKnightForADay, goofyKnightForADay],
    });

    expect(testEngine.asPlayerOne().playCard(desperatePlan)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 3, deck: 0, discard: 1 });
  });

  it("discards the chosen cards and draws that many", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [
        desperatePlan,
        mickeyMouseArtfulRogue,
        mickeyMouseDetective,
        goofyKnightForADay,
        mickeyMouseTrumpeter,
        mickeyMouseFriendlyFace,
      ],
      inkwell: desperatePlan.cost,
      deck: [goofyKnightForADay, goofyKnightForADay, goofyKnightForADay],
    });
    const playerOne = testEngine.asPlayerOne();
    expect(
      playerOne.playCard(desperatePlan, {
        targets: [mickeyMouseArtfulRogue, mickeyMouseDetective, goofyKnightForADay],
      }).success,
    ).toBe(true);

    expect(playerOne.getCardZone(mickeyMouseArtfulRogue)).toBe("discard");
    expect(playerOne.getCardZone(mickeyMouseDetective)).toBe("discard");
    expect(playerOne).toHaveZoneCounts({ hand: 5, deck: 0, discard: 4 });
  });

  it("allows choosing zero cards in the discard branch", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [desperatePlan, mickeyMouseTrumpeter, mickeyMouseFriendlyFace],
      inkwell: desperatePlan.cost,
      deck: [goofyKnightForADay],
    });

    expect(
      testEngine.asPlayerOne().playCard(desperatePlan, { targets: [] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 2, deck: 1, discard: 1 });
  });
});
