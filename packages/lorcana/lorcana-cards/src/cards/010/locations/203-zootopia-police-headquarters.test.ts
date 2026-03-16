import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { zootopiaPoliceHeadquarters } from "./203-zootopia-police-headquarters";

const zootopiaDetective = createMockCharacter({
  id: "zootopia-detective",
  name: "Zootopia Detective",
  cost: 2,
});

const zootopiaClue = createMockCharacter({
  id: "zootopia-clue",
  name: "Zootopia Clue",
  cost: 3,
});

describe("Zootopia - Police Headquarters", () => {
  it("lets you draw a card, then choose and discard a card, when you move a character here", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [zootopiaPoliceHeadquarters, zootopiaDetective],
      hand: [zootopiaClue],
      inkwell: zootopiaPoliceHeadquarters.moveCost,
      deck: 2,
    });

    expect(
      testEngine
        .asPlayerOne()
        .moveCharacterToLocation(zootopiaDetective, zootopiaPoliceHeadquarters).success,
    ).toBe(true);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().resolveNextPending({ resolveOptional: true }).success).toBe(
      true,
    );
    expect(testEngine.asPlayerOne().resolveNextPending({ targets: [zootopiaClue] }).success).toBe(
      true,
    );
    expect(testEngine.asPlayerOne().getCardZone(zootopiaClue)).toBe("discard");
  });
});
