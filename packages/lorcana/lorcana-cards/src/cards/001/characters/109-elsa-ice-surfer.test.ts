import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { annaHeirToArendelle } from "./035-anna-heir-to-arendelle";
import { elsaIceSurfer } from "./109-elsa-ice-surfer";
import { mickeyMouseTrueFriend } from "./012-mickey-mouse-true-friend";

describe("Elsa - Ice Surfer", () => {
  it("readies Elsa and stops her from questing for the rest of the turn when you play Anna", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [annaHeirToArendelle],
      inkwell: annaHeirToArendelle.cost,
      deck: 2,
      play: [{ card: elsaIceSurfer, isDrying: false }],
    });

    testEngine.asServer().manualExertCard(elsaIceSurfer);
    expect(testEngine.asPlayerOne().isExerted(elsaIceSurfer)).toBe(true);

    expect(testEngine.asPlayerOne().playCard(annaHeirToArendelle)).toBeSuccessfulCommand();
    while (testEngine.asPlayerOne().getBagCount() > 0) {
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
    }

    expect(testEngine.asPlayerOne().isExerted(elsaIceSurfer)).toBe(false);
    expect(testEngine.asPlayerOne().getCard(elsaIceSurfer)?.hasQuestRestriction).toBe(true);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCard(elsaIceSurfer)?.hasQuestRestriction).toBe(false);
  });

  it("does not trigger when you play a character that is not named Anna", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [mickeyMouseTrueFriend],
      inkwell: mickeyMouseTrueFriend.cost,
      deck: 2,
      play: [{ card: elsaIceSurfer, isDrying: false }],
    });

    testEngine.asServer().manualExertCard(elsaIceSurfer);

    expect(testEngine.asPlayerOne().playCard(mickeyMouseTrueFriend)).toBeSuccessfulCommand();
    if (testEngine.asPlayerOne().getBagCount() > 0) {
      const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
      expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();
    }

    expect(testEngine.asPlayerOne().isExerted(elsaIceSurfer)).toBe(true);
    expect(testEngine.asPlayerOne().getCard(elsaIceSurfer)?.hasQuestRestriction).toBe(false);
  });
});
