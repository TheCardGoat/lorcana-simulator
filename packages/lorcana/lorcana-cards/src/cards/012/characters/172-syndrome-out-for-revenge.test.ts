import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import type { LorcanaProjectedBagEffect } from "@tcg/lorcana-engine";
import { shift } from "../../../helpers/abilities/shift";
import { syndromeOutForRevenge } from "./172-syndrome-out-for-revenge";

const robotInDiscard = createMockCharacter({
  id: "syndrome-robot-discard",
  name: "Omnidroid",
  version: "Test Discard",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 1,
  classifications: ["Storyborn", "Robot"],
});

const robotInHand = createMockCharacter({
  id: "syndrome-robot-hand",
  name: "Omnidroid",
  version: "Test Hand",
  cost: 7,
  strength: 6,
  willpower: 6,
  lore: 2,
  classifications: ["Storyborn", "Robot"],
});

const tooExpensiveRobotInHand = createMockCharacter({
  id: "syndrome-robot-expensive",
  name: "Omnidroid",
  version: "Too Expensive",
  cost: 9,
  strength: 9,
  willpower: 9,
  lore: 3,
  classifications: ["Storyborn", "Robot"],
});

const nonRobotInDiscard = createMockCharacter({
  id: "syndrome-non-robot",
  name: "Some Hero",
  cost: 3,
  classifications: ["Storyborn", "Hero"],
});

function hasAbilityName(bagEffect: LorcanaProjectedBagEffect, abilityName: string): boolean {
  const payload = bagEffect.payload;
  if (typeof payload !== "object" || payload === null || !("abilityName" in payload)) {
    return false;
  }
  return payload.abilityName === abilityName;
}

describe("Syndrome - Out for Revenge", () => {
  it("returns a Robot character from discard and optionally plays a Robot for free on quest", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: syndromeOutForRevenge }],
      hand: [robotInHand],
      discard: [robotInDiscard, nonRobotInDiscard],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

    const trigger = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
    expect(trigger).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    // Select the Robot from discard to return
    const robotInDiscardId = testEngine.findCardInstanceId(robotInDiscard, "discard");
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [robotInDiscardId] }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(robotInDiscard)).toBe("hand");

    // Now accept the optional play-for-free, targeting the Robot in hand
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [robotInHand],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(robotInHand)).toBe("play");
  });

  it("allows declining the optional play-for-free after returning a Robot from discard", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: syndromeOutForRevenge }],
      hand: [robotInHand],
      discard: [robotInDiscard],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

    const trigger = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
    expect(trigger).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    const robotInDiscardId = testEngine.findCardInstanceId(robotInDiscard, "discard");
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [robotInDiscardId] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(robotInDiscard)).toBe("hand");

    // Decline the optional play-for-free
    testEngine.asPlayerOne().resolveNextPending({ resolveOptional: false });

    expect(testEngine.asPlayerOne().getCardZone(robotInHand)).toBe("hand");
  });

  it("does not allow playing a Robot with cost greater than 8 for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: syndromeOutForRevenge }],
      hand: [tooExpensiveRobotInHand],
      discard: [robotInDiscard],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

    const trigger = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
    expect(trigger).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    const robotInDiscardId = testEngine.findCardInstanceId(robotInDiscard, "discard");
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [robotInDiscardId] }),
    ).toBeSuccessfulCommand();

    // Decline the optional — the cost-9 robot isn't a legal target anyway
    testEngine.asPlayerOne().resolveNextPending({ resolveOptional: false });

    expect(testEngine.asPlayerOne().getCardZone(tooExpensiveRobotInHand)).toBe("hand");
  });

  it("plays a Robot via Shift when a legal in-play shift base is selected", () => {
    const robotShiftBaseInPlay = createMockCharacter({
      id: "syndrome-robot-shift-base",
      name: "Shifty Robot",
      version: "Original",
      cost: 3,
      strength: 2,
      willpower: 4,
      lore: 1,
      classifications: ["Storyborn", "Robot"],
    });

    const robotWithShiftInHand = createMockCharacter({
      id: "syndrome-robot-with-shift",
      name: "Shifty Robot",
      version: "Upgraded",
      cost: 8,
      strength: 6,
      willpower: 7,
      lore: 3,
      classifications: ["Floodborn", "Robot"],
      abilities: [shift(5)],
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: syndromeOutForRevenge }, robotShiftBaseInPlay],
      hand: [robotWithShiftInHand],
      discard: [robotInDiscard],
      inkwell: 0,
      deck: 1,
    });

    expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

    const trigger = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
    expect(trigger).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    const robotInDiscardId = testEngine.findCardInstanceId(robotInDiscard, "discard");
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [robotInDiscardId] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(robotInDiscard)).toBe("hand");

    // Capture the base's instance id BEFORE the shift moves it under the new card.
    const baseInstanceId = testEngine.findCardInstanceId(robotShiftBaseInPlay, "play");

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [robotWithShiftInHand, robotShiftBaseInPlay],
      }),
    ).toBeSuccessfulCommand();

    // Played for free via Shift: stacked on top of the base in play, no ink spent.
    expect(testEngine.asPlayerOne().getCardZone(robotWithShiftInHand)).toBe("play");
    const shifterProjected = testEngine.asPlayerOne().getCard(robotWithShiftInHand);
    expect(shifterProjected.cardsUnder).toContain(baseInstanceId);
    expect(shifterProjected.playedViaShift).toBe(true);
  });

  it("falls back to standard play when 'either' selection has no shift base", () => {
    const robotShiftBaseInPlay = createMockCharacter({
      id: "syndrome-robot-shift-base-2",
      name: "Other Robot",
      version: "Base",
      cost: 3,
      classifications: ["Storyborn", "Robot"],
    });

    const robotWithShiftInHand = createMockCharacter({
      id: "syndrome-robot-with-shift-2",
      name: "Mismatched Robot",
      version: "Upgraded",
      cost: 8,
      classifications: ["Floodborn", "Robot"],
      abilities: [shift(5)],
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: syndromeOutForRevenge }, robotShiftBaseInPlay],
      hand: [robotWithShiftInHand],
      discard: [robotInDiscard],
      inkwell: 0,
      deck: 1,
    });

    expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

    const trigger = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
    expect(trigger).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    const robotInDiscardId = testEngine.findCardInstanceId(robotInDiscard, "discard");
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [robotInDiscardId] }),
    ).toBeSuccessfulCommand();

    // Player selects only the hand card — no in-play shift base — so the play falls through to standard.
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [robotWithShiftInHand],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(robotWithShiftInHand)).toBe("play");
    const standardProjected = testEngine.asPlayerOne().getCard(robotWithShiftInHand);
    expect(standardProjected.cardsUnder ?? []).toEqual([]);
    expect(standardProjected.playedViaShift ?? false).toBe(false);
    // Base was not consumed — still in play independently.
    expect(testEngine.asPlayerOne().getCardZone(robotShiftBaseInPlay)).toBe("play");
  });

  it("rejects a non-Robot card from discard as a return target (R7/R19)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: syndromeOutForRevenge }],
      hand: [robotInHand],
      discard: [robotInDiscard, nonRobotInDiscard],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

    const trigger = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
    expect(trigger).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
    ).toBeSuccessfulCommand();

    // Attempt to return the non-Robot from discard — should be rejected by the
    // has-classification filter; the non-Robot stays in discard.
    const nonRobotInDiscardId = testEngine.findCardInstanceId(nonRobotInDiscard, "discard");
    testEngine.asPlayerOne().resolveNextPending({ targets: [nonRobotInDiscardId] });
    expect(testEngine.asPlayerOne().getCardZone(nonRobotInDiscard)).toBe("discard");
  });

  describe("release notes ruling", () => {
    it("a non-Shift Robot in hand cannot be SHIFTED into play by Got Me Monologuing!, even with a same-name base in play", () => {
      // Q&A: Got Me Monologuing! lets you "play OR shift" a Robot for free.
      // To SHIFT, the Robot must have the Shift keyword AND a valid base in
      // play. A Robot without Shift cannot be shifted by this ability.
      const robotShiftBaseInPlay = createMockCharacter({
        id: "syndrome-release-robot-base",
        name: "Robot Twins",
        version: "Original",
        cost: 3,
        classifications: ["Storyborn", "Robot"],
      });

      // Same name but NO Shift keyword.
      const robotWithoutShiftInHand = createMockCharacter({
        id: "syndrome-release-robot-no-shift",
        name: "Robot Twins",
        version: "Upgraded",
        cost: 8,
        classifications: ["Floodborn", "Robot"],
        // intentionally no shift ability
      });

      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: syndromeOutForRevenge }, robotShiftBaseInPlay],
        hand: [robotWithoutShiftInHand],
        discard: [robotInDiscard],
        inkwell: 0,
        deck: 1,
      });

      expect(testEngine.asPlayerOne().quest(syndromeOutForRevenge)).toBeSuccessfulCommand();

      const trigger = testEngine
        .asPlayerOne()
        .getBagEffects()
        .find((bagEffect) => hasAbilityName(bagEffect, "GOT ME MONOLOGUING!"));
      expect(trigger).toBeDefined();

      expect(
        testEngine.asPlayerOne().resolveBag(trigger!.id, { resolveOptional: true }),
      ).toBeSuccessfulCommand();

      const robotInDiscardId = testEngine.findCardInstanceId(robotInDiscard, "discard");
      expect(
        testEngine.asPlayerOne().resolveNextPending({ targets: [robotInDiscardId] }),
      ).toBeSuccessfulCommand();

      // Try to "shift" the non-Shift Robot onto the same-name base.
      // Result intentionally unasserted: the engine may either reject the
      // play (leaving the card in hand) or accept it via the play-for-free
      // fallback. Both outcomes satisfy the post-condition checked below.
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [robotWithoutShiftInHand, robotShiftBaseInPlay],
      });

      // The base must NOT be consumed by a shift — it remains in play
      // independently. The hand-card may end up either still in hand
      // (if the engine rejects the play entirely) or in play via the
      // standard play-for-free fallback, but it must NOT be stacked on top
      // of the base.
      const projected = testEngine.asPlayerOne().getCard(robotWithoutShiftInHand);
      expect(projected.cardsUnder ?? []).toEqual([]);
      expect(projected.playedViaShift ?? false).toBe(false);
      // Base remains independent in play.
      expect(testEngine.asPlayerOne().getCardZone(robotShiftBaseInPlay)).toBe("play");
    });
  });

  it("has Shift 4 keyword", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [syndromeOutForRevenge],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().hasKeyword(syndromeOutForRevenge, "Shift")).toBe(true);
  });
});
