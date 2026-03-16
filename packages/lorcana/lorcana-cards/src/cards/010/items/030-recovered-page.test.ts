import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import {
  aladdinPrinceAli,
  healingGlow,
  mickeyMouseTrueFriend,
  simbaProtectiveCub,
} from "../../001";
import { recoveredPage } from "./030-recovered-page";

describe("Recovered Page", () => {
  it("puts a chosen character from the top 4 cards into your hand and bottoms the rest in the chosen order", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [recoveredPage],
      inkwell: recoveredPage.cost,
      deck: [healingGlow, simbaProtectiveCub, aladdinPrinceAli, mickeyMouseTrueFriend],
    });

    expect(testEngine.asPlayerOne().playCard(recoveredPage)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        destinations: [
          {
            zone: "hand",
            cards: [simbaProtectiveCub],
          },
          {
            zone: "deck-bottom",
            cards: [mickeyMouseTrueFriend, healingGlow, aladdinPrinceAli],
          },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(simbaProtectiveCub)).toBe("hand");
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE)).toEqual([
      mickeyMouseTrueFriend.id,
      healingGlow.id,
      aladdinPrinceAli.id,
    ]);
  });
});
