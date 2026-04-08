import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { herculesSpectralDemigod } from "./117-hercules-spectral-demigod";

const deckCard = createMockCharacter({
  id: "hercules-deck-card",
  name: "Deck Card",
  cost: 1,
});

describe("Hercules - Spectral Demigod", () => {
  it("should have base strength 0 without cards under", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [herculesSpectralDemigod],
    });

    const hercules = testEngine.asPlayerOne().getCard(herculesSpectralDemigod);
    expect(hercules.strength).toBe(0);
  });

  it("should be able to activate Boost 2", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [herculesSpectralDemigod],
      deck: 5,
      inkwell: 10,
    });

    const deckBefore = testEngine.asPlayerOne().getZonesCardCount().deck;

    expect(
      testEngine.asPlayerOne().activateAbility(herculesSpectralDemigod, { ability: "Boost" }),
    ).toBeSuccessfulCommand();

    const deckAfter = testEngine.asPlayerOne().getZonesCardCount().deck;
    expect(deckAfter).toBe(deckBefore - 1);
  });

  describe("SUPERHUMAN STRENGTH", () => {
    it("gets +3 strength when there is a card under him", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [{ card: herculesSpectralDemigod, cardsUnder: [deckCard] }],
      });

      const hercules = testEngine.asPlayerOne().getCard(herculesSpectralDemigod);
      expect(hercules.strength).toBe(3);
    });

    it("does not get +3 strength when there is no card under him", () => {
      const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
        play: [herculesSpectralDemigod],
      });

      const hercules = testEngine.asPlayerOne().getCard(herculesSpectralDemigod);
      expect(hercules.strength).toBe(0);
    });
  });
});
