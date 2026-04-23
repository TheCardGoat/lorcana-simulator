import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { meekoSkittishScrounger } from "./046-meeko-skittish-scrounger";

describe("Meeko - Skittish Scrounger", () => {
  it("does not apply BOTTOMLESS PIT when Meeko is ready at end of turn (intervening if: not exerted)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [meekoSkittishScrounger],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().isExerted(meekoSkittishScrounger)).toBe(false);
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    testEngine.asPlayerOne().resolveAllBagEffects({ maxIterations: 10 });

    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("play");
  });

  it("does not even enter the bag when Meeko is ready at end of turn (phantom-trigger regression)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [meekoSkittishScrounger],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().isExerted(meekoSkittishScrounger)).toBe(false);
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });

  it("applies BOTTOMLESS PIT when Meeko is exerted — empty hand resolves with Meeko banished", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [meekoSkittishScrounger],
      hand: [],
      deck: 2,
    });
    testEngine.asServer().manualExertCard(meekoSkittishScrounger);
    expect(testEngine.asPlayerOne().isExerted(meekoSkittishScrounger)).toBe(true);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    testEngine.asPlayerOne().resolveAllBagEffects({ maxIterations: 10 });

    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("discard");
  });
});
