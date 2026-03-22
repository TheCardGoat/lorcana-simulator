import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
  PLAYER_ONE,
} from "@tcg/lorcana-engine/testing";
import { peteGhostOfChristmasFuture } from "./154-pete-ghost-of-christmas-future";

const deckCard1 = createMockCharacter({
  id: "pete-deck-card-1",
  name: "Pete Deck Card 1",
  cost: 1,
});

const deckCard2 = createMockCharacter({
  id: "pete-deck-card-2",
  name: "Pete Deck Card 2",
  cost: 1,
});

const deckCard3 = createMockCharacter({
  id: "pete-deck-card-3",
  name: "Pete Deck Card 3",
  cost: 1,
});

describe("Pete - Ghost of Christmas Future", () => {
  it("does not look at any cards when questing with 0 cards under him", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: peteGhostOfChristmasFuture, isDrying: false }],
      deck: 5,
    });

    const handBefore = testEngine.asPlayerOne().getZonesCardCount().hand;
    expect(testEngine.asPlayerOne().quest(peteGhostOfChristmasFuture)).toBeSuccessfulCommand();

    // Ability triggers but with 0 cards under, there is nothing to look at
    if (testEngine.asPlayerOne().getBagCount() > 0) {
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();
    }

    // Hand should be unchanged - no cards picked
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(handBefore);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(peteGhostOfChristmasFuture.lore);
  });

  it("looks at 1 card when questing with 1 card under him", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: peteGhostOfChristmasFuture, isDrying: false }],
      deck: [deckCard1, deckCard2, deckCard3],
      inkwell: 10,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(peteGhostOfChristmasFuture, { ability: "Boost" }),
    ).toBeSuccessfulCommand();
    expect(testEngine.getCardsUnder(peteGhostOfChristmasFuture)).toHaveLength(1);

    expect(testEngine.asPlayerOne().quest(peteGhostOfChristmasFuture)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
  });

  it("looks at 2 cards when questing with 2 cards under him", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: peteGhostOfChristmasFuture, isDrying: false }],
      deck: [deckCard1, deckCard2, deckCard3],
      inkwell: 10,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(peteGhostOfChristmasFuture, { ability: "Boost" }),
    ).toBeSuccessfulCommand();
    testEngine.asPlayerOne().passTurn();
    testEngine.asPlayerTwo().passTurn();
    expect(
      testEngine.asPlayerOne().activateAbility(peteGhostOfChristmasFuture, { ability: "Boost" }),
    ).toBeSuccessfulCommand();
    expect(testEngine.getCardsUnder(peteGhostOfChristmasFuture)).toHaveLength(2);

    expect(testEngine.asPlayerOne().quest(peteGhostOfChristmasFuture)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
  });
});
