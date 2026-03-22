import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { angelaNightWarrior } from "./187-angela-night-warrior";
import { lexingtonSmallInStature } from "../../010/characters/183-lexington-small-in-stature";
import { brooklynSecondInCommand } from "../../010/characters/120-brooklyn-second-in-command";

const targetCharacter = createMockCharacter({
  id: "angela-target-char",
  name: "Target Character",
  strength: 2,
  willpower: 4,
  cost: 2,
});

const filler1 = createMockCharacter({
  id: "angela-filler-1",
  name: "Filler 1",
  cost: 1,
});
const filler2 = createMockCharacter({
  id: "angela-filler-2",
  name: "Filler 2",
  cost: 1,
});
const filler3 = createMockCharacter({
  id: "angela-filler-3",
  name: "Filler 3",
  cost: 1,
});

describe("Angela - Night Warrior", () => {
  it("can be placed in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [angelaNightWarrior],
    });

    expect(testEngine.asPlayerOne().getCardZone(angelaNightWarrior)).toBe("play");
  });

  it("has SHADOW POWER and ETERNAL NIGHT ability text defined", () => {
    const texts = angelaNightWarrior.text;
    expect(texts).toHaveLength(2);
    const text0 = texts?.[0];
    const text1 = texts?.[1];
    expect(typeof text0 === "object" && text0 !== null && "title" in text0 ? text0.title : "").toBe(
      "SHADOW POWER",
    );
    expect(typeof text1 === "object" && text1 !== null && "title" in text1 ? text1.title : "").toBe(
      "ETERNAL NIGHT",
    );
  });

  it("has Gargoyle classification for ETERNAL NIGHT synergy", () => {
    expect(angelaNightWarrior.classifications).toContain("Gargoyle");
  });

  it("SHADOW POWER - gives chosen character Challenger +2 and Resist +2 when accepting optional ability", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [angelaNightWarrior],
      inkwell: angelaNightWarrior.cost,
      play: [targetCharacter],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(angelaNightWarrior)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);

    const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
    expect(
      testEngine.asPlayerOne().resolveBag(bagId, {
        resolveOptional: true,
        targets: [targetCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getKeywordValue(targetCharacter, "Challenger")).toBe(2);
    expect(testEngine.getKeywordValue(targetCharacter, "Resist")).toBe(2);
  });

  it("SHADOW POWER - can decline the optional ability", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [angelaNightWarrior],
      inkwell: angelaNightWarrior.cost,
      play: [targetCharacter],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(angelaNightWarrior)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);

    const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
    expect(
      testEngine.asPlayerOne().resolveBag(bagId, {
        resolveOptional: false,
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getKeywordValue(targetCharacter, "Challenger")).toBe(null);
    expect(testEngine.getKeywordValue(targetCharacter, "Resist")).toBe(null);
  });

  it("SHADOW POWER - effects expire at start of your next turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [angelaNightWarrior],
      inkwell: angelaNightWarrior.cost,
      play: [targetCharacter],
      deck: 5,
    });

    expect(testEngine.asPlayerOne().playCard(angelaNightWarrior)).toBeSuccessfulCommand();

    const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
    expect(
      testEngine.asPlayerOne().resolveBag(bagId, {
        resolveOptional: true,
        targets: [targetCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getKeywordValue(targetCharacter, "Challenger")).toBe(2);
    expect(testEngine.getKeywordValue(targetCharacter, "Resist")).toBe(2);

    // Pass turn to opponent and back
    testEngine.asServer().passTurn();
    testEngine.asServer().passTurn();

    // Effects should be removed at start of new turn
    expect(testEngine.getKeywordValue(targetCharacter, "Challenger")).toBe(null);
    expect(testEngine.getKeywordValue(targetCharacter, "Resist")).toBe(null);
  });

  it("SHADOW POWER - effects persist during opponent's turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [angelaNightWarrior],
      inkwell: angelaNightWarrior.cost,
      play: [targetCharacter],
      deck: 5,
    });

    expect(testEngine.asPlayerOne().playCard(angelaNightWarrior)).toBeSuccessfulCommand();

    const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
    expect(
      testEngine.asPlayerOne().resolveBag(bagId, {
        resolveOptional: true,
        targets: [targetCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getKeywordValue(targetCharacter, "Challenger")).toBe(2);
    expect(testEngine.getKeywordValue(targetCharacter, "Resist")).toBe(2);

    // Pass turn to opponent only
    testEngine.asServer().passTurn();

    // Effects should still be active during opponent's turn
    expect(testEngine.getKeywordValue(targetCharacter, "Challenger")).toBe(2);
    expect(testEngine.getKeywordValue(targetCharacter, "Resist")).toBe(2);
  });

  describe("ETERNAL NIGHT - Your Gargoyle characters lose the Stone by Day ability", () => {
    it("should allow Gargoyle to ready when Angela is in play (even with 3+ cards in hand)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [angelaNightWarrior, { card: lexingtonSmallInStature, exerted: true }],
        hand: [filler1, filler2, filler3],
        deck: 5,
      });

      // Skip Angela's optional ability if any bag is pending
      while (testEngine.asPlayerOne().getBagCount() > 0) {
        const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
        testEngine.asPlayerOne().resolveBag(bagId, { resolveOptional: false });
      }

      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(true);

      // Pass turn to opponent and back — ready phase at start of player one's turn
      testEngine.asServer().passTurn();
      testEngine.asServer().passTurn();

      // Lexington should be ready because Angela suppresses Stone by Day
      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(false);
    });

    it("should NOT allow Gargoyle to ready when Angela is NOT in play (with 3+ cards in hand)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: lexingtonSmallInStature, exerted: true }],
        hand: [filler1, filler2, filler3],
        deck: 5,
      });

      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(true);

      // Pass turn to opponent and back
      testEngine.asServer().passTurn();
      testEngine.asServer().passTurn();

      // Lexington should still be exerted (Stone by Day prevents ready)
      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(true);
    });

    it("should only affect owner's Gargoyles, not opponent's", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [angelaNightWarrior, { card: lexingtonSmallInStature, exerted: true }],
          hand: [filler1, filler2, filler3],
          deck: 5,
        },
        {
          play: [{ card: brooklynSecondInCommand, exerted: true }],
          hand: [filler1, filler2, filler3],
          deck: 5,
        },
      );

      // Skip Angela's optional ability if any bag is pending
      while (testEngine.asPlayerOne().getBagCount() > 0) {
        const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
        testEngine.asPlayerOne().resolveBag(bagId, { resolveOptional: false });
      }

      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(true);
      expect(testEngine.isExerted(brooklynSecondInCommand)).toBe(true);

      // Pass turn to opponent and back
      testEngine.asServer().passTurn();
      testEngine.asServer().passTurn();

      // Player's Lexington should ready (Angela suppresses Stone by Day for owner)
      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(false);
      // Opponent's Brooklyn should NOT ready (Angela doesn't affect opponent's Gargoyles)
      expect(testEngine.isExerted(brooklynSecondInCommand)).toBe(true);
    });

    it("should affect all owner's Gargoyles with Stone by Day", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [
          angelaNightWarrior,
          { card: lexingtonSmallInStature, exerted: true },
          { card: brooklynSecondInCommand, exerted: true },
        ],
        hand: [filler1, filler2, filler3],
        deck: 5,
      });

      // Skip Angela's optional ability if any bag is pending
      while (testEngine.asPlayerOne().getBagCount() > 0) {
        const bagId = testEngine.asPlayerOne().getBagEffects()[0]!.id;
        testEngine.asPlayerOne().resolveBag(bagId, { resolveOptional: false });
      }

      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(true);
      expect(testEngine.isExerted(brooklynSecondInCommand)).toBe(true);

      // Pass turn to opponent and back
      testEngine.asServer().passTurn();
      testEngine.asServer().passTurn();

      // Both Gargoyles should ready (Angela suppresses Stone by Day for all owner's Gargoyles)
      expect(testEngine.isExerted(lexingtonSmallInStature)).toBe(false);
      expect(testEngine.isExerted(brooklynSecondInCommand)).toBe(false);
    });
  });
});
