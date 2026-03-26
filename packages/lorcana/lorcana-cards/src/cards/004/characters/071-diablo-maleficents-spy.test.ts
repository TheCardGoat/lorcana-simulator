import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { diabloMaleficentsSpy } from "./071-diablo-maleficents-spy";

const opponentCard1 = createMockCharacter({
  id: "diablo-ms-opp-card-1",
  name: "Opponent Card 1",
  cost: 2,
  strength: 2,
  willpower: 2,
});

const opponentCard2 = createMockCharacter({
  id: "diablo-ms-opp-card-2",
  name: "Opponent Card 2",
  cost: 3,
  strength: 3,
  willpower: 3,
});

describe("Diablo - Maleficent's Spy", () => {
  it("can be played for its cost", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [diabloMaleficentsSpy],
        inkwell: diabloMaleficentsSpy.cost,
        deck: 2,
      },
      { deck: 2 },
    );

    expect(testEngine.asPlayerOne().playCard(diabloMaleficentsSpy)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(diabloMaleficentsSpy)).toBe("play");
  });

  describe("SCOUT AHEAD — When you play this character, you may look at each opponent's hand.", () => {
    it("does not affect opponent's hand card count when played", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [diabloMaleficentsSpy],
          inkwell: diabloMaleficentsSpy.cost,
          deck: 2,
        },
        {
          hand: [opponentCard1, opponentCard2],
          deck: 2,
        },
      );

      const opponentHandCountBefore = testEngine.asPlayerTwo().getZonesCardCount().hand;

      expect(testEngine.asPlayerOne().playCard(diabloMaleficentsSpy)).toBeSuccessfulCommand();

      // Opponent should still have the same cards in hand — looking doesn't discard or move them
      expect(testEngine.asPlayerTwo().getZonesCardCount().hand).toBe(opponentHandCountBefore);
    });

    it("Diablo is in play after being played", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
        {
          hand: [diabloMaleficentsSpy],
          inkwell: diabloMaleficentsSpy.cost,
          deck: 2,
        },
        {
          hand: [opponentCard1],
          deck: 2,
        },
      );

      expect(testEngine.asPlayerOne().playCard(diabloMaleficentsSpy)).toBeSuccessfulCommand();
      expect(testEngine.asPlayerOne().getCardZone(diabloMaleficentsSpy)).toBe("play");
    });
  });
});
