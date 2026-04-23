import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { gadgetsGoggles } from "./168-gadgets-goggles";

const topDeckCard = createMockCharacter({
  id: "gadgets-goggles-top",
  name: "Top Deck Card",
  cost: 1,
});

const secondDeckCard = createMockCharacter({
  id: "gadgets-goggles-second",
  name: "Second Deck Card",
  cost: 2,
});

const bottomDeckCard = createMockCharacter({
  id: "gadgets-goggles-bottom",
  name: "Bottom Deck Card",
  cost: 3,
});

describe("Gadget's Goggles", () => {
  it("ENHANCED VISION - looks at the top 2 cards and puts one on top and one on bottom", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: 1,
      play: [gadgetsGoggles],
      deck: [topDeckCard, secondDeckCard, bottomDeckCard],
    });

    expect(testEngine.asPlayerOne().activateAbility(gadgetsGoggles)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        destinations: [
          { zone: "deck-top", cards: [secondDeckCard] },
          { zone: "deck-bottom", cards: [bottomDeckCard] },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE)).toEqual([
      bottomDeckCard.id,
      topDeckCard.id,
      secondDeckCard.id,
    ]);
  });
});
