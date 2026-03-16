import { describe, expect, it } from "bun:test";
import type { CommandFailure } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { meekoSkittishScrounger } from "./046-meeko-skittish-scrounger";

describe("Meeko - Skittish Scrounger", () => {
  it("forces the banish branch when Meeko is exerted and you have no card to discard", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [meekoSkittishScrounger],
    });
    testEngine.asServer().manualExertCard(meekoSkittishScrounger);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();

    const result = testEngine.asPlayerOne().respondWithChoice(0) as CommandFailure;

    expect(result.success).toBe(false);
    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("discard");
  });
});
