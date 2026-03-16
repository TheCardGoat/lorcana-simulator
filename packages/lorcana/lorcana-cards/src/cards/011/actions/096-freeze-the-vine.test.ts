import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { healingGlow, heiheiBoatSnack, mickeyMouseTrueFriend } from "../../001";
import {
  beastsCastleWinterGardens,
  graveyardOfChristmasFutureLonelyRestingPlace,
} from "../locations";
import { freezeTheVine } from "./096-freeze-the-vine";

describe("Freeze the Vine", () => {
  it("banishes all locations, draws 2 cards, then discards the chosen card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [freezeTheVine, healingGlow],
        inkwell: freezeTheVine.cost,
        play: [beastsCastleWinterGardens],
        deck: [heiheiBoatSnack, mickeyMouseTrueFriend],
      },
      {
        play: [graveyardOfChristmasFutureLonelyRestingPlace],
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(freezeTheVine, {
        targets: [healingGlow],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(beastsCastleWinterGardens)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(graveyardOfChristmasFutureLonelyRestingPlace)).toBe(
      "discard",
    );
    expect(testEngine.asPlayerOne().getCardZone(healingGlow)).toBe("discard");
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(2);
  });
});
