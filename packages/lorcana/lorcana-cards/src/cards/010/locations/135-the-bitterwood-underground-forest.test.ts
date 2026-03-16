import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { theBitterwoodUndergroundForest } from "./135-the-bitterwood-underground-forest";

const mightyExplorer = createMockCharacter({
  id: "bitterwood-mighty-explorer",
  name: "Mighty Explorer",
  cost: 4,
  strength: 5,
});

describe("The Bitterwood - Underground Forest", () => {
  it("lets you draw a card the first time you move a 5+ strength character here during your turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [theBitterwoodUndergroundForest, mightyExplorer],
      inkwell: theBitterwoodUndergroundForest.moveCost,
      deck: 2,
    });

    expect(
      testEngine
        .asPlayerOne()
        .moveCharacterToLocation(mightyExplorer, theBitterwoodUndergroundForest).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }).success).toBe(
      true,
    );
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(1);
  });
});
