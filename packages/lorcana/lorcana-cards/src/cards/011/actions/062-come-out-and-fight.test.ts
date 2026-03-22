import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack, mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { dinglehopper } from "../../001/items";
import { graveyardOfChristmasFutureLonelyRestingPlace } from "../locations/135-graveyard-of-christmas-future-lonely-resting-place";
import { comeOutAndFight } from "./062-come-out-and-fight";

describe("Come Out and Fight!", () => {
  it("moves cards from under a chosen character and draws a card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [comeOutAndFight],
      inkwell: comeOutAndFight.cost,
      play: [simbaProtectiveCub],
      deck: [heiheiBoatSnack, mickeyMouseTrueFriend],
    });

    testEngine.putCardUnder(simbaProtectiveCub, heiheiBoatSnack);

    expect(
      testEngine.asPlayerOne().playCard(comeOutAndFight, {
        targets: [simbaProtectiveCub],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(heiheiBoatSnack)).toBe("deck");
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(1);
  });

  it("moves cards from under a chosen item", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [comeOutAndFight],
      inkwell: comeOutAndFight.cost,
      play: [dinglehopper],
      deck: [heiheiBoatSnack, mickeyMouseTrueFriend],
    });

    testEngine.putCardUnder(dinglehopper, heiheiBoatSnack);

    expect(
      testEngine.asPlayerOne().playCard(comeOutAndFight, {
        targets: [dinglehopper],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(heiheiBoatSnack)).toBe("deck");
    expect(testEngine.asPlayerOne().getCardZone(mickeyMouseTrueFriend)).toBe("hand");
  });

  it("moves cards from under a chosen location", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [comeOutAndFight],
      inkwell: comeOutAndFight.cost,
      play: [graveyardOfChristmasFutureLonelyRestingPlace],
      deck: [heiheiBoatSnack, mickeyMouseTrueFriend],
    });

    testEngine.putCardUnder(graveyardOfChristmasFutureLonelyRestingPlace, heiheiBoatSnack);

    expect(
      testEngine.asPlayerOne().playCard(comeOutAndFight, {
        targets: [graveyardOfChristmasFutureLonelyRestingPlace],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(heiheiBoatSnack)).toBe("deck");
    expect(testEngine.asPlayerOne().getCardZone(mickeyMouseTrueFriend)).toBe("hand");
  });

  it("still draws a card if the chosen card has nothing under it", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [comeOutAndFight],
      inkwell: comeOutAndFight.cost,
      play: [simbaProtectiveCub],
      deck: [heiheiBoatSnack],
    });

    expect(
      testEngine.asPlayerOne().playCard(comeOutAndFight, {
        targets: [simbaProtectiveCub],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(heiheiBoatSnack)).toBe("hand");
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(1);
  });
});
