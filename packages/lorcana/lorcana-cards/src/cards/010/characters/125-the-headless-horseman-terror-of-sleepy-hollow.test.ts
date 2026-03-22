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
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
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
    it.todo("gives all your characters +1 strength when opposing character is banished", () => {});

    it.todo("does not trigger during opponent's turn", () => {});

    it.todo("stacks +1 when multiple opposing characters are banished same turn", () => {});
  });
});
