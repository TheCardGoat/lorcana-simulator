import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { runMissingCharacterTest } from "./test-helpers";
import { queenOfHeartsSensingWeakness } from "./120-queen-of-hearts-sensing-weakness";

runMissingCharacterTest(queenOfHeartsSensingWeakness);

const challengeTarget = createMockCharacter({
  id: "queen-target",
  name: "Challenge Target",
  cost: 2,
  strength: 1,
  willpower: 3,
});

describe("Queen of Hearts - Sensing Weakness", () => {
  it("triggers when Queen of Hearts herself challenges", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: queenOfHeartsSensingWeakness, isDrying: false }],
        deck: 3,
      },
      {
        play: [{ card: challengeTarget, exerted: true }],
        deck: 3,
      },
    );

    const handBefore = testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count;

    expect(
      testEngine.asPlayerOne().challenge(queenOfHeartsSensingWeakness, challengeTarget),
    ).toBeSuccessfulCommand();

    const bagEffects = testEngine.asPlayerOne().getBagEffects();
    expect(bagEffects.length).toBeGreaterThan(0);
    expect(
      testEngine.asPlayerOne().resolveNextBag({ resolveOptional: true }),
    ).toBeSuccessfulCommand();

    const handAfter = testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count;
    expect(handAfter).toBe(handBefore + 1);
  });
});
