import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { graveyardOfChristmasFutureLonelyRestingPlace } from "./135-graveyard-of-christmas-future-lonely-resting-place";

const graveyardResident = createMockCharacter({
  id: "graveyard-resident",
  name: "Graveyard Resident",
  cost: 2,
});

const topDeckCard = createMockCharacter({
  id: "graveyard-top-deck",
  name: "Graveyard Top Deck",
  cost: 1,
});

describe("Graveyard of Christmas Future - Lonely Resting Place", () => {
  it("is playable as a location", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [graveyardOfChristmasFutureLonelyRestingPlace],
      inkwell: graveyardOfChristmasFutureLonelyRestingPlace.cost,
    });

    expect(
      testEngine.asPlayerOne().playCard(graveyardOfChristmasFutureLonelyRestingPlace),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(graveyardOfChristmasFutureLonelyRestingPlace)).toBe(
      "play",
    );
  });

  it("puts the top card of your deck under it when a character moves here", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [graveyardOfChristmasFutureLonelyRestingPlace, graveyardResident],
      inkwell: graveyardOfChristmasFutureLonelyRestingPlace.moveCost,
      deck: [topDeckCard],
    });

    expect(
      testEngine
        .asPlayerOne()
        .moveCharacterToLocation(graveyardResident, graveyardOfChristmasFutureLonelyRestingPlace),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardsUnder(graveyardOfChristmasFutureLonelyRestingPlace)).toHaveLength(1);
  });

  it("returns all cards from under it to your hand at the start of your turn, then banishes itself", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [graveyardOfChristmasFutureLonelyRestingPlace, graveyardResident],
      deck: 2,
    });

    testEngine.putCardUnder(graveyardOfChristmasFutureLonelyRestingPlace, graveyardResident);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardsUnder(graveyardOfChristmasFutureLonelyRestingPlace)).toHaveLength(0);
    expect(testEngine.asPlayerOne().getCardZone(graveyardResident)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardZone(graveyardOfChristmasFutureLonelyRestingPlace)).toBe(
      "discard",
    );
  });
});
