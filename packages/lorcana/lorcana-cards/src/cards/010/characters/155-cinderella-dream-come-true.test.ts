import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { cinderellaDreamComeTrue } from "./155-cinderella-dream-come-true";
import { cinderellaDreamComeTrueEnchanted } from "./236-cinderella-dream-come-true-enchanted";

const princessCharacter = createMockCharacter({
  id: "cinderella-princess",
  name: "Princess Ally",
  cost: 2,
  classifications: ["Storyborn", "Hero", "Princess"],
});

const inkFodder = createMockCharacter({
  id: "cinderella-ink-fodder",
  name: "Ink Fodder",
  cost: 1,
});

const drawnCard = createMockCharacter({
  id: "cinderella-drawn-card",
  name: "Drawn Card",
  cost: 1,
});

describe("Cinderella - Dream Come True", () => {
  describe("WHATEVER YOU WISH FOR - At the end of your turn, if you played a Princess character this turn, you may put a card from your hand into your inkwell facedown to draw a card.", () => {
    it("lets you ink a chosen card from hand facedown and ready, then draw a card", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [princessCharacter, inkFodder],
        play: [cinderellaDreamComeTrue],
        inkwell: princessCharacter.cost,
        deck: [drawnCard],
      });

      expect(testEngine.asPlayerOne().playCard(princessCharacter)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(
        testEngine.asPlayerOne().resolveBag(bagEffect!.id, {
          resolveOptional: true,
          targets: [inkFodder],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCard(inkFodder)).toMatchObject({
        zone: "inkwell",
        exerted: false,
      });
      expect(testEngine.asPlayerOne().getCard(drawnCard).zone).toBe("hand");
      expect(testEngine.asPlayerOne().getCard(princessCharacter).zone).toBe("play");
      expect(testEngine.asPlayerOne().getCard(cinderellaDreamComeTrue).zone).toBe("play");
    });

    it("does not trigger when no Princess was played this turn", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [inkFodder],
        play: [cinderellaDreamComeTrue],
        deck: [drawnCard],
      });

      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    });

    it("triggers when Cinderella herself is played (she is a Princess)", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [cinderellaDreamComeTrue, inkFodder],
        inkwell: cinderellaDreamComeTrue.cost,
        deck: [drawnCard],
      });

      expect(testEngine.asPlayerOne().playCard(cinderellaDreamComeTrue)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    });
  });

  describe("Enchanted version", () => {
    it("has the same abilities as the base card", () => {
      expect(cinderellaDreamComeTrueEnchanted.abilities).toHaveLength(
        cinderellaDreamComeTrue.abilities?.length ?? 0,
      );
      const baseNames = cinderellaDreamComeTrue.abilities?.map((a) => a.name) ?? [];
      const enchantedNames = cinderellaDreamComeTrueEnchanted.abilities?.map((a) => a.name) ?? [];
      expect(enchantedNames).toEqual(baseNames);
    });
  });
});
