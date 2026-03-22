import { describe, expect, it } from "bun:test";
import { PLAYER_ONE, LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { weKnowTheWay } from "./061-we-know-the-way";

describe("We Know the Way", () => {
  it("shuffles the chosen discard card back and may play a revealed card with the same name for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [weKnowTheWay],
      inkwell: weKnowTheWay.cost,
      discard: [simbaProtectiveCub],
      deck: [simbaProtectiveCub],
    });

    expect(
      testEngine.asPlayerOne().playCard(weKnowTheWay, {
        targets: [simbaProtectiveCub],
      }),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    expect(testEngine.getCardDefinitionIdsInZone("play", PLAYER_ONE)).toContain(
      simbaProtectiveCub.id,
    );
    expect(testEngine.getCardDefinitionIdsInZone("deck", PLAYER_ONE)).toEqual([
      simbaProtectiveCub.id,
    ]);
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 0, discard: 1, play: 1, deck: 1 });
  });
});
