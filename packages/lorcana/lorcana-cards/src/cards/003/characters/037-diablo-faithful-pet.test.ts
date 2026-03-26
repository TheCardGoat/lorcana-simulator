import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { diabloFaithfulPet } from "./037-diablo-faithful-pet";

const topCard = createMockCharacter({ id: "diablo-top-card", name: "Top Card", cost: 1 });
const secondCard = createMockCharacter({ id: "diablo-second-card", name: "Second Card", cost: 2 });
const maleficentCard = createMockCharacter({
  id: "diablo-maleficent",
  name: "Maleficent",
  cost: 1,
});

describe("Diablo - Faithful Pet", () => {
  it("LOOKING FOR AURORA - looks at top card and can put it on bottom when a Maleficent character is played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [maleficentCard],
      inkwell: maleficentCard.cost,
      deck: [topCard, secondCard],
      play: [diabloFaithfulPet],
    });

    expect(testEngine.asPlayerOne().playCard(maleficentCard)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        destinations: [
          { zone: "deck-top", cards: [] },
          { zone: "deck-bottom", cards: [secondCard] },
        ],
      }),
    ).toBeSuccessfulCommand();

    // Verify order: topCard on top, secondCard on bottom
    const deckIds = testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE);
    expect(deckIds).toEqual([secondCard.id, topCard.id]);
  });
});
