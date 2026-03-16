import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs, simbaProtectiveCub } from "../../001";
import { isabelaMadrigalInTheMoment } from "../../007";
import { restoringTheHeart } from "./039-restoring-the-heart";
import { theFamilyMadrigal } from "./040-the-family-madrigal";
import { thisIsMyFamily } from "./081-this-is-my-family";

describe("The Family Madrigal", () => {
  it("puts up to 1 Madrigal character and up to 1 song into your hand and keeps the rest on top in order", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [theFamilyMadrigal],
      inkwell: theFamilyMadrigal.cost,
      deck: [
        arielOnHumanLegs,
        thisIsMyFamily,
        isabelaMadrigalInTheMoment,
        simbaProtectiveCub,
        restoringTheHeart,
      ],
    });

    expect(
      testEngine.asPlayerOne().playCard(theFamilyMadrigal, {
        destinations: [
          {
            zone: "hand",
            cards: [isabelaMadrigalInTheMoment],
          },
          {
            zone: "hand",
            cards: [thisIsMyFamily],
          },
          {
            zone: "deck-top",
            cards: [simbaProtectiveCub, restoringTheHeart, arielOnHumanLegs],
          },
        ],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(isabelaMadrigalInTheMoment)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardZone(thisIsMyFamily)).toBe("hand");
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE).slice(0, 3)).toEqual([
      simbaProtectiveCub.id,
      restoringTheHeart.id,
      arielOnHumanLegs.id,
    ]);
  });

  it("creates a pending scry selection when destinations are not provided up front", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [theFamilyMadrigal],
      inkwell: theFamilyMadrigal.cost,
      deck: [
        arielOnHumanLegs,
        thisIsMyFamily,
        isabelaMadrigalInTheMoment,
        simbaProtectiveCub,
        restoringTheHeart,
      ],
    });

    expect(testEngine.asPlayerOne().playCard(theFamilyMadrigal).success).toBe(true);
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);
    expect(testEngine.asPlayerOne().getPendingEffects()[0]).toEqual(
      expect.objectContaining({
        type: "scry-selection",
      }),
    );
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(theFamilyMadrigal, {
        destinations: [
          {
            zone: "hand",
            cards: [isabelaMadrigalInTheMoment],
          },
          {
            zone: "hand",
            cards: [thisIsMyFamily],
          },
          {
            zone: "deck-top",
            cards: [simbaProtectiveCub, restoringTheHeart, arielOnHumanLegs],
          },
        ],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().getCardZone(isabelaMadrigalInTheMoment)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardZone(thisIsMyFamily)).toBe("hand");
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE).slice(0, 3)).toEqual([
      simbaProtectiveCub.id,
      restoringTheHeart.id,
      arielOnHumanLegs.id,
    ]);
  });
});
