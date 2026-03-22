import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { clarabelleLightOnHerHooves } from "./084-clarabelle-light-on-her-hooves";

const drawnCards = Array.from({ length: 6 }, (_, index) =>
  createMockCharacter({
    id: `clarabelle-drawn-${index + 1}`,
    name: `Drawn ${index + 1}`,
    cost: 1,
  }),
);

describe("Clarabelle - Light on Her Hooves", () => {
  describe("KEEP IN STEP - At the end of your turn, if chosen opponent has more cards in their hand than you, you may draw cards until you have the same number.", () => {
    it("draws until the controller has the same number of cards in hand as the opponent", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [clarabelleLightOnHerHooves],
          inkwell: clarabelleLightOnHerHooves.cost,
          deck: drawnCards,
        },
        {
          hand: 6,
        },
      );

      expect(testEngine.asPlayerOne().playCard(clarabelleLightOnHerHooves)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
          resolveOptional: true,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 6 });
      for (const card of drawnCards) {
        expect(testEngine.asPlayerOne().getCardZone(card)).toBe("hand");
      }
    });

    it("can decline the optional draw", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [clarabelleLightOnHerHooves],
          inkwell: clarabelleLightOnHerHooves.cost,
          deck: drawnCards,
        },
        {
          hand: 6,
        },
      );

      expect(testEngine.asPlayerOne().playCard(clarabelleLightOnHerHooves)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
          resolveOptional: false,
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, deck: 6 });
      for (const card of drawnCards) {
        expect(testEngine.asPlayerOne().getCardZone(card)).toBe("deck");
      }
    });

    it("does not trigger if the opponent does not have more cards in hand", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [clarabelleLightOnHerHooves],
          inkwell: clarabelleLightOnHerHooves.cost,
          deck: drawnCards,
        },
        {
          hand: [],
          deck: 0,
        },
      );

      expect(testEngine.asPlayerOne().playCard(clarabelleLightOnHerHooves)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
      expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, deck: 6 });
    });
  });
});
