import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { taranMagicallyArmed } from "./044-taran-magically-armed";

const discardCard1 = createMockCharacter({
  id: "taran-discard-card-1",
  name: "Discard Card 1",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

const discardCard2 = createMockCharacter({
  id: "taran-discard-card-2",
  name: "Discard Card 2",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
});

describe("Taran - Magically Armed", () => {
  it("should have Rush keyword", () => {
    const testEngine = new LorcanaTestEngine({
      play: [taranMagicallyArmed],
    });

    const cardModel = testEngine.getCardModel(taranMagicallyArmed);
    expect(cardModel.hasRush).toBe(true);
  });

  describe("WEAKEN THE CAULDRON - When you play this character, put up to 2 cards from chosen player's discard on the bottom of their deck in any order", () => {
    it("should put up to 2 cards from own discard on bottom of own deck", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [taranMagicallyArmed],
        inkwell: taranMagicallyArmed.cost,
        discard: [discardCard1, discardCard2],
        deck: 10,
      });

      const card1Id = testEngine.findCardInstanceId(discardCard1, "discard", PLAYER_ONE);
      const card2Id = testEngine.findCardInstanceId(discardCard2, "discard", PLAYER_ONE);

      expect(testEngine.asPlayerOne().getCardZone(discardCard1)).toBe("discard");
      expect(testEngine.asPlayerOne().getCardZone(discardCard2)).toBe("discard");

      expect(testEngine.asPlayerOne().playCard(taranMagicallyArmed)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
          targets: [card1Id, card2Id],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(discardCard1)).toBe("deck");
      expect(testEngine.asPlayerOne().getCardZone(discardCard2)).toBe("deck");
    });

    it("should put up to 2 cards from opponent's discard on bottom of their deck", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [taranMagicallyArmed],
          inkwell: taranMagicallyArmed.cost,
          deck: 10,
        },
        {
          discard: [discardCard1, discardCard2],
          deck: 10,
        },
      );

      const opponentCard1Id = testEngine.findCardInstanceId(discardCard1, "discard", PLAYER_TWO);
      const opponentCard2Id = testEngine.findCardInstanceId(discardCard2, "discard", PLAYER_TWO);

      expect(testEngine.asPlayerTwo().getCardZone(discardCard1)).toBe("discard");
      expect(testEngine.asPlayerTwo().getCardZone(discardCard2)).toBe("discard");

      expect(testEngine.asPlayerOne().playCard(taranMagicallyArmed)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
          targets: [opponentCard1Id, opponentCard2Id],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerTwo().getCardZone(discardCard1)).toBe("deck");
      expect(testEngine.asPlayerTwo().getCardZone(discardCard2)).toBe("deck");
    });

    it("should be optional in number - can choose fewer than 2 cards", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        hand: [taranMagicallyArmed],
        inkwell: taranMagicallyArmed.cost,
        discard: [discardCard1, discardCard2],
        deck: 10,
      });

      const card1Id = testEngine.findCardInstanceId(discardCard1, "discard", PLAYER_ONE);

      expect(testEngine.asPlayerOne().playCard(taranMagicallyArmed)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
          targets: [card1Id],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(discardCard1)).toBe("deck");
      expect(testEngine.asPlayerOne().getCardZone(discardCard2)).toBe("discard");
    });
  });
});
