import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import {
  arielOnHumanLegs,
  minnieMouseBelovedPrincess,
  moanaChosenByTheOcean,
  simbaProtectiveCub,
  simbaReturnedKing,
} from "../../001";
import { underTheSea } from "./095-under-the-sea";

describe("Under the Sea", () => {
  it("has the Sing Together keyword ability authored explicitly", () => {
    expect(underTheSea.abilities).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyword: "SingTogether",
          type: "keyword",
          value: 8,
        }),
      ]),
    );
  });

  it("lets the player who played the song choose the order for opposing characters put on the bottom", () => {
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
      testEngine.asPlayerOne().resolveNextPending({
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

  it("can be played via Sing Together 8 by exerting characters with total cost >= 8", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [underTheSea],
        play: [moanaChosenByTheOcean, simbaReturnedKing],
      },
      {
        play: [simbaProtectiveCub, minnieMouseBelovedPrincess],
      },
    );

    const result = testEngine
      .asPlayerOne()
      .playSongTogether(underTheSea, [moanaChosenByTheOcean, simbaReturnedKing]);
    expect(result).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(moanaChosenByTheOcean)).toBe(true);
    expect(testEngine.asPlayerOne().isExerted(simbaReturnedKing)).toBe(true);

    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", "player_two");
    const minnieId = testEngine.findCardInstanceId(
      minnieMouseBelovedPrincess,
      "play",
      "player_two",
    );

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        targets: [simbaId, minnieId],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(minnieMouseBelovedPrincess)).toBe("deck");
  });
});
