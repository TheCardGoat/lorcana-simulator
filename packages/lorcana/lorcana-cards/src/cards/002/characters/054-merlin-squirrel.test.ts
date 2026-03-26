import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { merlinSquirrel } from "./054-merlin-squirrel";

const topCard = createMockCharacter({ id: "merlin-top-card", name: "Top Card", cost: 1 });
const secondCard = createMockCharacter({ id: "merlin-second-card", name: "Second Card", cost: 2 });

describe("Merlin - Squirrel", () => {
  it("LOOK BEFORE YOU LEAP - looks at top card and can put it on bottom when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [merlinSquirrel],
      inkwell: merlinSquirrel.cost,
      deck: [topCard, secondCard],
    });

    expect(testEngine.asPlayerOne().playCard(merlinSquirrel)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(merlinSquirrel)).toBe("play");

    // Resolve the triggered scry ability via bag
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
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
