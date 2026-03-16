import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { aladdinPrinceAli } from "../../001";
import { megaraSecretKeeper } from "../characters/086-megara-secret-keeper";
import { blessedBagpipes } from "./101-blessed-bagpipes";

describe("Blessed Bagpipes", () => {
  it("may put the top card of your deck under a chosen character with Boost when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: [aladdinPrinceAli],
      hand: [blessedBagpipes],
      inkwell: blessedBagpipes.cost,
      play: [megaraSecretKeeper],
    });
    const storedCardId = testEngine.findCardInstanceId(aladdinPrinceAli, "deck", "p1");

    expect(testEngine.asPlayerOne().playCard(blessedBagpipes)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
        targets: [megaraSecretKeeper],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(blessedBagpipes)).toBe("play");
    expect(testEngine.getCardsUnder(megaraSecretKeeper)).toEqual([storedCardId]);
  });
});
