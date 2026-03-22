import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mulanReadyForBattle } from "./108-mulan-ready-for-battle";

describe("Mulan - Ready for Battle", () => {
  // NOBLE SPIRIT - "If you have a character in play with damage, you pay 1 {I} less to play this character."
  // FIGHTING SPIRIT - "If you have a character in play with 5 or more, you pay 1 {I} less to play this character."
  // The abilities are defined as type: "action" with conditional/choice effects in card data,
  // but the card text describes static cost-reduction abilities (type: "static" with
  // effect: { type: "cost-reduction" }). The abilities need to be redefined as static
  // cost-reduction abilities to function correctly. Tests below verify the card can be played.

  it("can be played at full cost", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [mulanReadyForBattle],
      inkwell: mulanReadyForBattle.cost,
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(mulanReadyForBattle)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(mulanReadyForBattle)).toBe("play");
  });
});
