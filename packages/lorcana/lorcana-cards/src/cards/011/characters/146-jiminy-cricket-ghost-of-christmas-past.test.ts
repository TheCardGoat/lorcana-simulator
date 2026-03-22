import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { jiminyCricketGhostOfChristmasPast } from "./146-jiminy-cricket-ghost-of-christmas-past";
import { simbaProtectiveCub } from "../../001";

describe("Jiminy Cricket - Ghost of Christmas Past", () => {
  it("should be able to activate Boost 2", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [jiminyCricketGhostOfChristmasPast],
      deck: 5,
      inkwell: 10,
    });

    const deckBefore = testEngine.asPlayerOne().getZonesCardCount().deck;

    expect(
      testEngine
        .asPlayerOne()
        .activateAbility(jiminyCricketGhostOfChristmasPast, { ability: "Boost" }),
    ).toBeSuccessfulCommand();

    const deckAfter = testEngine.asPlayerOne().getZonesCardCount().deck;
    expect(deckAfter).toBe(deckBefore - 1);
  });

  describe("LOOK INTO YOUR PAST", () => {
    it("trigger fires when Boost puts a card under Jiminy Cricket", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [jiminyCricketGhostOfChristmasPast],
        deck: 5,
        inkwell: 10,
        discard: [simbaProtectiveCub],
      });

      expect(
        testEngine.asPlayerOne().activateAbility(jiminyCricketGhostOfChristmasPast, {
          ability: "Boost",
          preventAutoResolveTriggeredEffects: true,
        }),
      ).toBeSuccessfulCommand();

      // LOOK INTO YOUR PAST should be in the bag
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    });

    it("controller may choose a card from discard to put into inkwell facedown and exerted", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [jiminyCricketGhostOfChristmasPast],
        deck: 5,
        inkwell: 10,
        discard: [simbaProtectiveCub],
      });

      const inkwellBefore = testEngine.asPlayerOne().getZonesCardCount().inkwell;

      expect(
        testEngine.asPlayerOne().activateAbility(jiminyCricketGhostOfChristmasPast, {
          ability: "Boost",
          preventAutoResolveTriggeredEffects: true,
        }),
      ).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();

      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          resolveOptional: true,
          targets: [simbaProtectiveCub],
        }),
      ).toBeSuccessfulCommand();

      const inkwellAfter = testEngine.asPlayerOne().getZonesCardCount().inkwell;
      expect(inkwellAfter).toBe(inkwellBefore + 1);

      // Simba should be in inkwell, not discard
      expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("inkwell");
    });

    it("controller may decline the optional ability", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [jiminyCricketGhostOfChristmasPast],
        deck: 5,
        inkwell: 10,
        discard: [simbaProtectiveCub],
      });

      expect(
        testEngine.asPlayerOne().activateAbility(jiminyCricketGhostOfChristmasPast, {
          ability: "Boost",
          preventAutoResolveTriggeredEffects: true,
        }),
      ).toBeSuccessfulCommand();

      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(bagEffect).toBeDefined();

      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      // Simba should still be in discard
      expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("discard");
    });
  });
});
