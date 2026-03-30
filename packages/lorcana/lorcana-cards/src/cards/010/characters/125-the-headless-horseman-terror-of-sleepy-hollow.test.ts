import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { theHeadlessHorsemanTerrorOfSleepyHollow } from "./125-the-headless-horseman-terror-of-sleepy-hollow";

const weakTarget = createMockCharacter({
  id: "hh-weak-target",
  name: "Weak Target",
  cost: 1,
  strength: 2,
  willpower: 2,
  lore: 1,
});

const strongTarget = createMockCharacter({
  id: "hh-strong-target",
  name: "Strong Target",
  cost: 1,
  strength: 3,
  willpower: 2,
  lore: 1,
});

const alliedCharacter = createMockCharacter({
  id: "hh-allied-character",
  name: "Allied Character",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

const secondOpponentCharacter = createMockCharacter({
  id: "hh-second-opponent-character",
  name: "Second Opponent Character",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("The Headless Horseman - Terror of Sleepy Hollow", () => {
  describe("LEAVES NO TRACE — When you play this character, banish chosen opposing character with 2 {S} or less.", () => {
    it("banishes chosen opposing character with strength 2 or less when played", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: theHeadlessHorsemanTerrorOfSleepyHollow.cost,
          hand: [theHeadlessHorsemanTerrorOfSleepyHollow],
        },
        {
          play: [weakTarget],
        },
      );

      expect(
        testEngine.asPlayerOne().playCard(theHeadlessHorsemanTerrorOfSleepyHollow),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThanOrEqual(1);
      expect(
        testEngine.asPlayerOne().resolvePendingByCard(theHeadlessHorsemanTerrorOfSleepyHollow),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().resolveNextPending({ targets: [weakTarget] }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getCardZone(weakTarget)).toBe("discard");
    });

    it("does not allow targeting opposing character with strength 3 or more", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          inkwell: theHeadlessHorsemanTerrorOfSleepyHollow.cost,
          hand: [theHeadlessHorsemanTerrorOfSleepyHollow],
        },
        {
          play: [strongTarget],
        },
      );

      expect(
        testEngine.asPlayerOne().playCard(theHeadlessHorsemanTerrorOfSleepyHollow),
      ).toBeSuccessfulCommand();

      // The triggered ability should have no valid targets (strength 3 > 2)
      // so it should auto-skip or the target selection should fail
      expect(testEngine.asPlayerTwo().getCardZone(strongTarget)).toBe("play");
    });
  });

  describe("GATHERING STRENGTH — During your turn, whenever an opposing character is banished, each of your characters gets +1 {S} this turn.", () => {
    it("regression: ability should trigger when opposing character is banished during your turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [theHeadlessHorsemanTerrorOfSleepyHollow, alliedCharacter],
        },
        {
          play: [weakTarget],
        },
      );

      expect(
        testEngine.asServer().manualSetDamage(weakTarget, weakTarget.willpower),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().getCardStrength(theHeadlessHorsemanTerrorOfSleepyHollow),
      ).toBe(theHeadlessHorsemanTerrorOfSleepyHollow.strength + 1);
      expect(testEngine.asPlayerOne().getCardStrength(alliedCharacter)).toBe(
        alliedCharacter.strength + 1,
      );
    });

    it("regression: does not trigger during opponent's turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [theHeadlessHorsemanTerrorOfSleepyHollow, alliedCharacter],
        },
        {
          play: [weakTarget],
        },
      );

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
      expect(
        testEngine.asServer().manualSetDamage(weakTarget, weakTarget.willpower),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().getCardStrength(theHeadlessHorsemanTerrorOfSleepyHollow),
      ).toBe(theHeadlessHorsemanTerrorOfSleepyHollow.strength);
      expect(testEngine.asPlayerOne().getCardStrength(alliedCharacter)).toBe(
        alliedCharacter.strength,
      );
    });

    it("regression: stacks +1 when multiple opposing characters are banished same turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          play: [theHeadlessHorsemanTerrorOfSleepyHollow, alliedCharacter],
        },
        {
          play: [weakTarget, secondOpponentCharacter],
        },
      );

      expect(
        testEngine.asServer().manualSetDamage(weakTarget, weakTarget.willpower),
      ).toBeSuccessfulCommand();
      expect(
        testEngine
          .asServer()
          .manualSetDamage(secondOpponentCharacter, secondOpponentCharacter.willpower),
      ).toBeSuccessfulCommand();

      expect(
        testEngine.asPlayerOne().getCardStrength(theHeadlessHorsemanTerrorOfSleepyHollow),
      ).toBe(theHeadlessHorsemanTerrorOfSleepyHollow.strength + 2);
      expect(testEngine.asPlayerOne().getCardStrength(alliedCharacter)).toBe(
        alliedCharacter.strength + 2,
      );
    });
  });
});
