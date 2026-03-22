import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  LorcanaTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { negaduckPublicEnemyNumberOne } from "./116-negaduck-public-enemy-number-one";

const opponentCharacter = createMockCharacter({
  id: "opponent-char",
  name: "Opponent Character",
  strength: 2,
  willpower: 8,
  cost: 3,
});

describe("Negaduck - Public Enemy Number One", () => {
  it("has Shift keyword", () => {
    const testEngine = new LorcanaTestEngine({
      play: [negaduckPublicEnemyNumberOne],
    });

    const cardUnderTest = testEngine.getCardModel(negaduckPublicEnemyNumberOne);
    expect(cardUnderTest.hasShift()).toBe(true);
  });

  it("opponent loses 1 lore and player gains 1 lore when Negaduck challenges", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: negaduckPublicEnemyNumberOne, isDrying: false }],
        deck: 2,
      },
      {
        play: [{ card: opponentCharacter, exerted: true, isDrying: false }],
        deck: 2,
      },
      {
        startingLore: {
          [PLAYER_ONE]: 0,
          [PLAYER_TWO]: 3,
        },
      },
    );

    expect(
      testEngine.asPlayerOne().challenge(negaduckPublicEnemyNumberOne, opponentCharacter),
    ).toBeSuccessfulCommand();

    // P2 should have lost 1 lore (3 -> 2)
    expect(testEngine.getLore(PLAYER_TWO)).toBe(2);
    // P1 should have gained 1 lore (0 -> 1)
    expect(testEngine.getLore(PLAYER_ONE)).toBe(1);
  });
});
