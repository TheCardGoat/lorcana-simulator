import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
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
  it("POOR SOULS: the attacker resolves the discard during the challenge", () => {
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

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(bagEffect).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
        targets: [handCard],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("discard");
    expect(testEngine.asServer().getState().G.pendingEffects ?? []).toEqual([]);
  });

  it("discarding from the attacker's hand lets challenge resolution continue immediately", () => {
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

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(
      testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
        targets: [handCard],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(handCard)).toBe("discard");
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0 });
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

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id).success).toBe(true);

    expect(testEngine.asServer().getState().G.pendingEffects ?? []).toEqual([]);
    expect(testEngine.asServer().getState().G.challengeState).toBeUndefined();
    expect(testEngine.asPlayerOne().getCardZone(cursedMerfolkUrsulasHandiwork)).toBe("discard");
  });
});
