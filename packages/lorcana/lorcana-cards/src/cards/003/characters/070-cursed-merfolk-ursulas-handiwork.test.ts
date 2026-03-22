import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { cursedMerfolkUrsulasHandiwork } from "./070-cursed-merfolk-ursulas-handiwork";

const attacker = createMockCharacter({
  id: "cursed-merfolk-attacker",
  name: "Attacker",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
});

const handCard = createMockCharacter({
  id: "cursed-merfolk-hand-card",
  name: "Hand Card",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("Cursed Merfolk - Ursula's Handiwork", () => {
  it("POOR SOULS: when challenged, each opponent chooses and discards a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: attacker, isDrying: false }],
        hand: [handCard],
        deck: 1,
      },
      {
        play: [{ card: cursedMerfolkUrsulasHandiwork, exerted: true }],
        deck: 1,
      },
    );

    expect(
      testEngine.asPlayerOne().challenge(attacker, cursedMerfolkUrsulasHandiwork),
    ).toBeSuccessfulCommand();

    // The challenged trigger fires, creating a bag effect for player_two
    expect(testEngine.asPlayerTwo().getBagCount()).toBe(1);

    const bagEffects = testEngine.asPlayerTwo().getBagEffects();
    expect(testEngine.asPlayerTwo().resolveBag(bagEffects[0]!.id).success).toBe(true);

    // After bag resolution, a discard-choice pending effect should target player_one
    expect(testEngine.asServer().getState().G.pendingEffects).toEqual([
      expect.objectContaining({
        kind: "discard-choice",
        chooserId: "player_one",
      }),
    ]);
  });

  it("opponent discards a card and challenge completes afterward", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: attacker, isDrying: false }],
        hand: [handCard],
        deck: 1,
      },
      {
        play: [{ card: cursedMerfolkUrsulasHandiwork, exerted: true }],
        deck: 1,
      },
    );

    expect(
      testEngine.asPlayerOne().challenge(attacker, cursedMerfolkUrsulasHandiwork),
    ).toBeSuccessfulCommand();

    // Resolve bag
    const bagEffects = testEngine.asPlayerTwo().getBagEffects();
    expect(testEngine.asPlayerTwo().resolveBag(bagEffects[0]!.id).success).toBe(true);

    // Player one resolves the discard choice
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(cursedMerfolkUrsulasHandiwork, {
        targets: [handCard],
      }),
    ).toBeSuccessfulCommand();

    // Hand card should be discarded
    expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("discard");
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0 });

    // Challenge should complete and Cursed Merfolk should be banished
    expect(testEngine.asServer().getState().G.challengeState).toBeUndefined();
    expect(testEngine.asPlayerOne().getCardZone(cursedMerfolkUrsulasHandiwork)).toBe("discard");
  });

  it("auto-resolves discard when no opponent has cards to discard", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: attacker, isDrying: false }],
        deck: 1,
      },
      {
        play: [{ card: cursedMerfolkUrsulasHandiwork, exerted: true }],
        deck: 1,
      },
    );

    expect(
      testEngine.asPlayerOne().challenge(attacker, cursedMerfolkUrsulasHandiwork),
    ).toBeSuccessfulCommand();

    // Bag effect should still be created
    expect(testEngine.asPlayerTwo().getBagCount()).toBe(1);

    const bagEffects = testEngine.asPlayerTwo().getBagEffects();
    expect(testEngine.asPlayerTwo().resolveBag(bagEffects[0]!.id).success).toBe(true);

    // Since player_one has no cards in hand, discard effect auto-resolves
    expect(testEngine.asServer().getState().G.pendingEffects ?? []).toEqual([]);

    // Challenge completes fully
    expect(testEngine.asServer().getState().G.challengeState).toBeUndefined();
    expect(testEngine.asPlayerOne().getCardZone(cursedMerfolkUrsulasHandiwork)).toBe("discard");
  });
});
