import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { dunbrochFamilyTapestry } from "./067-dunbroch-family-tapestry";

const playerOneDiscardedCharacter = createMockCharacter({
  id: "dunbroch-tapestry-p1-char",
  name: "Player One Discarded Character",
  cost: 2,
});

const playerTwoDiscardedCharacter = createMockCharacter({
  id: "dunbroch-tapestry-p2-char",
  name: "Player Two Discarded Character",
  cost: 2,
});

describe("DunBroch Family Tapestry", () => {
  it("TORN APART - enters play exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [dunbrochFamilyTapestry],
      inkwell: dunbrochFamilyTapestry.cost,
      deck: 3,
    });

    expect(testEngine.asPlayerOne().playCard(dunbrochFamilyTapestry)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(dunbrochFamilyTapestry)).toBe("play");
    expect(testEngine.asPlayerOne().isExerted(dunbrochFamilyTapestry)).toBe(true);
  });

  it("MEND THE BOND - each player shuffles all character cards from their discard into their deck", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [dunbrochFamilyTapestry],
        discard: [playerOneDiscardedCharacter],
        deck: 3,
      },
      {
        discard: [playerTwoDiscardedCharacter],
        deck: 3,
      },
    );

    const playerOneInitialDeck = testEngine.asPlayerOne().getZonesCardCount("player_one").deck;
    const playerTwoInitialDeck = testEngine.asPlayerTwo().getZonesCardCount("player_two").deck;

    expect(
      testEngine.asPlayerOne().activateAbility(dunbrochFamilyTapestry),
    ).toBeSuccessfulCommand();

    // The item is banished as part of the cost
    expect(testEngine.asPlayerOne().getCardZone(dunbrochFamilyTapestry)).toBe("discard");

    // Each player's character card is shuffled back into their own deck
    expect(testEngine.asPlayerOne().getCardZone(playerOneDiscardedCharacter)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(playerTwoDiscardedCharacter)).toBe("deck");

    expect(testEngine.asPlayerOne().getZonesCardCount("player_one").deck).toBe(
      playerOneInitialDeck + 1,
    );
    expect(testEngine.asPlayerTwo().getZonesCardCount("player_two").deck).toBe(
      playerTwoInitialDeck + 1,
    );
  });

  it("MEND THE BOND - only shuffles character cards (not other card types) and leaves empty discards alone", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [dunbrochFamilyTapestry],
        discard: [playerOneDiscardedCharacter],
        deck: 3,
      },
      {
        // Opponent has no character cards in discard
        deck: 3,
      },
    );

    const playerOneInitialDeck = testEngine.asPlayerOne().getZonesCardCount("player_one").deck;
    const playerTwoInitialDeck = testEngine.asPlayerTwo().getZonesCardCount("player_two").deck;

    expect(
      testEngine.asPlayerOne().activateAbility(dunbrochFamilyTapestry),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(playerOneDiscardedCharacter)).toBe("deck");
    expect(testEngine.asPlayerOne().getZonesCardCount("player_one").deck).toBe(
      playerOneInitialDeck + 1,
    );

    // Opponent's deck should be unchanged since they had no character cards to shuffle
    expect(testEngine.asPlayerTwo().getZonesCardCount("player_two").deck).toBe(
      playerTwoInitialDeck,
    );
  });
});
