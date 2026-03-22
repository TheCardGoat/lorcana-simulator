import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { herculesSpectralDemigod } from "./117-hercules-spectral-demigod";

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
});
