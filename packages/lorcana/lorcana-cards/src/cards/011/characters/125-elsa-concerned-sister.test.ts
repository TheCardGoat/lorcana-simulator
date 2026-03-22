import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { scroogesCountingHouseEbenezersOffice } from "../locations/134-scrooges-counting-house-ebenezers-office";
import { elsaConcernedSister } from "./125-elsa-concerned-sister";

describe("Elsa - Concerned Sister", () => {
  it("CLEAR THE WAY - plays a location from hand when the ability resolves", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [elsaConcernedSister, scroogesCountingHouseEbenezersOffice],
      inkwell: elsaConcernedSister.cost + scroogesCountingHouseEbenezersOffice.cost,
      deck: 2,
    });

    // CLEAR THE WAY triggers on play; the play-card bag effect auto-resolves
    // (only one location in hand) and plays the location immediately.
    expect(testEngine.asPlayerOne().playCard(elsaConcernedSister)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(elsaConcernedSister)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(scroogesCountingHouseEbenezersOffice)).toBe("play");
  });
});
