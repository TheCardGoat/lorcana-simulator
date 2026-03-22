import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { theBlackCauldron } from "./032-the-black-cauldron";

const raisedSoldier = createMockCharacter({
  id: "black-cauldron-raised-soldier",
  name: "Raised Soldier",
  cost: 2,
  strength: 2,
  willpower: 2,
});

describe("The Black Cauldron", () => {
  it("THE CAULDRON CALLS - puts a character from your discard under this item", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      discard: [raisedSoldier],
      inkwell: 1,
      play: [theBlackCauldron],
    });

    expect(
      testEngine.asPlayerOne().activateAbility(theBlackCauldron, {
        ability: "THE CAULDRON CALLS",
        targets: [raisedSoldier],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().isExerted(theBlackCauldron)).toBe(true);
    expect(testEngine.getCardsUnder(theBlackCauldron)).toHaveLength(1);
    expect(testEngine.asPlayerOne().getCardZone(raisedSoldier)).toBe("limbo");
  });

  it("RISE AND JOIN ME! - allows playing characters from under the cauldron this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: raisedSoldier.cost + 1,
      play: [theBlackCauldron, raisedSoldier],
      deck: 1,
    });

    testEngine.putCardUnder(theBlackCauldron, raisedSoldier);
    expect(testEngine.getCardsUnder(theBlackCauldron)).toHaveLength(1);

    expect(
      testEngine.asPlayerOne().activateAbility(theBlackCauldron, {
        ability: "RISE AND JOIN ME!",
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().playCard(raisedSoldier)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(raisedSoldier)).toBe("play");
    expect(testEngine.getCardsUnder(theBlackCauldron)).toHaveLength(0);
  });
});
