import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs, minnieMouseBelovedPrincess, simbaProtectiveCub } from "../../001";
import { underTheSea } from "./095-under-the-sea";

describe("Under the Sea", () => {
  it("puts opposing characters with 2 strength or less on the bottom of their deck in the chosen order", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [underTheSea],
        inkwell: underTheSea.cost,
      },
      {
        play: [simbaProtectiveCub, minnieMouseBelovedPrincess, arielOnHumanLegs],
      },
    );

    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", "player_two");
    const minnieId = testEngine.findCardInstanceId(
      minnieMouseBelovedPrincess,
      "play",
      "player_two",
    );

    expect(testEngine.asPlayerOne().playCard(underTheSea).success).toBe(true);
    expect(
      testEngine.asPlayerTwo().resolveNextPending({
        targets: [minnieId, simbaId],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(minnieMouseBelovedPrincess)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(arielOnHumanLegs)).toBe("play");
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_TWO).slice(0, 2)).toEqual([
      minnieMouseBelovedPrincess.id,
      simbaProtectiveCub.id,
    ]);
  });
});
