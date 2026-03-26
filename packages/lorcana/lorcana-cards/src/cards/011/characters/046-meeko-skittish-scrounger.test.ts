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

  it("regression: should be banished when exerted and player has no cards in hand to discard", () => {
    // Bug: Meeko was staying on board when the player had no cards to discard.
    // BOTTOMLESS PIT says "choose and discard a card or banish him."
    // If you can't discard (no cards in hand), you must banish him.
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [meekoSkittishScrounger],
      // No cards in hand
    });
    testEngine.asServer().manualExertCard(meekoSkittishScrounger);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    // Resolve the bag effect
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();

    // Try to choose discard option but it should fail (no cards)
    const result = testEngine.asPlayerOne().respondWithChoice(0);

    // Meeko should end up banished regardless since discard is impossible
    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("discard");
  });
});
