import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { winnieThePoohHunnyPirate } from "./003-winnie-the-pooh-hunny-pirate";

const pirateCharacter = createMockCharacter({
  id: "pirate-char",
  name: "Pirate Character",
  cost: 3,
  classifications: ["Storyborn", "Pirate"],
});

const nonPirateCharacter = createMockCharacter({
  id: "non-pirate-char",
  name: "Non-Pirate Character",
  cost: 3,
  classifications: ["Storyborn", "Hero"],
});

/** Drain all pending bag effects for player one, skipping support targeting. */
function drainBag(testEngine: LorcanaMultiplayerTestEngine) {
  while (testEngine.asPlayerOne().getBagCount() > 0) {
    const [first] = testEngine.asPlayerOne().getBagEffects();
    if (!first) break;
    expect(testEngine.asPlayerOne().resolveBag(first.id)).toBeSuccessfulCommand();
  }
}

describe("Winnie the Pooh - Hunny Pirate", () => {
  it("WE'RE PIRATES, YOU SEE - reduces cost by 1 for the next Pirate character played this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: pirateCharacter.cost - 1, // one less than cost, so only playable with reduction
      hand: [pirateCharacter],
      play: [{ card: winnieThePoohHunnyPirate }],
    });

    // Quest with Winnie the Pooh to trigger ability
    expect(testEngine.asPlayerOne().quest(winnieThePoohHunnyPirate)).toBeSuccessfulCommand();

    // Drain all pending bag effects (Support + WE'RE PIRATES, YOU SEE)
    drainBag(testEngine);

    // Now play the Pirate character - should succeed with the -1 reduction
    expect(testEngine.asPlayerOne().playCard(pirateCharacter)).toBeSuccessfulCommand();

    // Verify pirate is in play
    expect(testEngine.asPlayerOne().getCard(pirateCharacter)).toBeDefined();
  });

  it("WE'RE PIRATES, YOU SEE - does NOT reduce cost for non-Pirate characters", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: nonPirateCharacter.cost - 1, // one less than cost
      hand: [nonPirateCharacter],
      play: [{ card: winnieThePoohHunnyPirate }],
    });

    // Quest with Winnie the Pooh
    expect(testEngine.asPlayerOne().quest(winnieThePoohHunnyPirate)).toBeSuccessfulCommand();

    // Drain bag effects
    drainBag(testEngine);

    // Non-Pirate character should still cost full price (no discount applies)
    expect(testEngine.asPlayerOne().canPlayCard(nonPirateCharacter)).toBe(false);
  });

  it("WE'RE PIRATES, YOU SEE - cost reduction expires at end of turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: pirateCharacter.cost - 1,
      hand: [pirateCharacter],
      play: [{ card: winnieThePoohHunnyPirate }],
    });

    expect(testEngine.asPlayerOne().quest(winnieThePoohHunnyPirate)).toBeSuccessfulCommand();
    drainBag(testEngine);

    expect(testEngine.asPlayerOne().canPlayCard(pirateCharacter)).toBe(true);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    // After passing turns, reduction should be gone
    expect(testEngine.asPlayerOne().canPlayCard(pirateCharacter)).toBe(false);
  });

  it("WE'RE PIRATES, YOU SEE - only discounts the next Pirate character", () => {
    const secondPirate = createMockCharacter({
      id: "second-pirate",
      name: "Second Pirate",
      cost: 3,
      classifications: ["Dreamborn", "Pirate"],
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      // Enough to buy one pirate with -1 reduction (cost-1 = 2), but not the second (cost = 3)
      inkwell: pirateCharacter.cost - 1,
      hand: [pirateCharacter, secondPirate],
      play: [{ card: winnieThePoohHunnyPirate }],
    });

    expect(testEngine.asPlayerOne().quest(winnieThePoohHunnyPirate)).toBeSuccessfulCommand();
    drainBag(testEngine);

    // Play first pirate (uses the discount)
    expect(testEngine.asPlayerOne().playCard(pirateCharacter)).toBeSuccessfulCommand();

    // The second pirate should NOT be discounted (discount is consumed)
    expect(testEngine.asPlayerOne().canPlayCard(secondPirate)).toBe(false);
  });
});
