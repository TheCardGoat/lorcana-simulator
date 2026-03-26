// LEGACY IMPLEMENTATION: FOR REFERENCE ONLY. AFTER MIGRATION REMOVE THIS!
// (Legacy code removed for brevity)

import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockLocation } from "@tcg/lorcana-engine/testing";
import { theIslandsIPulledFromTheSea } from "./130-the-islands-i-pulled-from-the-sea";

const searchedLocation = createMockLocation({
  id: "tiipfts-searched-location",
  name: "Searched Location",
  cost: 2,
  moveCost: 1,
  willpower: 4,
  lore: 1,
});

describe("The Islands I Pulled from the Sea", () => {
  it.todo("regression: searched location card is placed into hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [theIslandsIPulledFromTheSea],
      inkwell: theIslandsIPulledFromTheSea.cost,
      deck: [searchedLocation],
    });

    expect(
      testEngine.asPlayerOne().playCard(theIslandsIPulledFromTheSea, {
        targets: [searchedLocation],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(searchedLocation)).toBe("hand");
  });
});
