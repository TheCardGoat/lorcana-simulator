import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { meekoSkittishScrounger } from "@tcg/lorcana-cards/cards/011";

const handCard = createMockCharacter({
  id: "eot-hand-card",
  name: "Hand Card",
  cost: 2,
  strength: 2,
  willpower: 3,
});

describe("BOTTOMLESS PIT - Meeko, Skittish Scrounger - At the end of your turn, if this character is exerted, choose and discard a card or banish him.", () => {
  it("should trigger at end of turn when this character is exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: meekoSkittishScrounger, isDrying: false }],
      hand: [handCard],
      deck: 2,
    });

    // Quest with Meeko to exert him
    expect(testEngine.asPlayerOne().quest(meekoSkittishScrounger)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().isExerted(meekoSkittishScrounger)).toBe(true);

    // Pass turn triggers end-of-turn
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    // Should have a bag effect for the choice (discard or banish)
    const bagCount = testEngine.asPlayerOne().getBagCount();
    expect(bagCount).toBeGreaterThanOrEqual(1);
  });

  it("should not require a choice when this character is NOT exerted (condition fails)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: meekoSkittishScrounger, isDrying: false }],
      hand: [handCard],
      deck: 2,
    });

    // Don't quest, Meeko stays ready
    expect(testEngine.asPlayerOne().isExerted(meekoSkittishScrounger)).toBe(false);

    // Pass turn - trigger always fires but the conditional check evaluates "if exerted"
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    // The trigger fires but the conditional should evaluate to false (not exerted),
    // so the choice (discard or banish) should be skipped.
    // If a bag was created, auto-resolve it (the conditional should skip the effect).
    testEngine.asPlayerOne().resolveAllBagEffects({ maxIterations: 10 });
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    // Meeko should still be in play
    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("play");
    // Hand card should still be in hand
    expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("hand");
  });

  it("should allow choosing to discard a card (option 1)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: meekoSkittishScrounger, isDrying: false }],
      hand: [handCard],
      deck: 2,
    });

    // Quest to exert Meeko
    expect(testEngine.asPlayerOne().quest(meekoSkittishScrounger)).toBeSuccessfulCommand();

    // Pass turn
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThanOrEqual(1);

    // Choose option 1: discard a card
    expect(
      testEngine
        .asPlayerOne()
        .resolvePendingByCard(testEngine.asPlayerOne().getBagEffects()[0]!.sourceId, {
          choiceIndex: 0,
          targets: [handCard],
        }),
    ).toBeSuccessfulCommand();

    // Hand card should be in discard
    expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("discard");
    // Meeko should still be in play
    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("play");
  });

  it("should allow choosing to banish Meeko (option 2)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: meekoSkittishScrounger, isDrying: false }],
      hand: [handCard],
      deck: 2,
    });

    // Quest to exert
    expect(testEngine.asPlayerOne().quest(meekoSkittishScrounger)).toBeSuccessfulCommand();

    // Pass turn
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThanOrEqual(1);

    // Choose option 2: banish Meeko
    expect(
      testEngine
        .asPlayerOne()
        .resolvePendingByCard(testEngine.asPlayerOne().getBagEffects()[0]!.sourceId, {
          choiceIndex: 1,
        }),
    ).toBeSuccessfulCommand();

    // Meeko should be in discard
    expect(testEngine.asPlayerOne().getCardZone(meekoSkittishScrounger)).toBe("discard");
    // Hand card should still be in hand
    expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("hand");
  });
});
