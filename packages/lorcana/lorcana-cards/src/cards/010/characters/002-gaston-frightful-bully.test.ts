import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { gastonFrightfulBully } from "./002-gaston-frightful-bully";

const cardUnderGaston = createMockCharacter({
  id: "gaston-frightful-bully-under-card",
  name: "Under Card",
  cost: 1,
});

const opposingCharacter = createMockCharacter({
  id: "gaston-frightful-bully-opponent",
  name: "Opposing Character",
  cost: 3,
  strength: 2,
  willpower: 4,
});

describe("Gaston - Frightful Bully", () => {
  it("gives a chosen opposing character cant-challenge and must-quest during their next turn when Gaston has a card under him", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: gastonFrightfulBully, isDrying: false, cardsUnder: [cardUnderGaston] }],
        deck: 5,
      },
      {
        play: [opposingCharacter],
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().quest(gastonFrightfulBully)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        targets: [opposingCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.hasRestriction(opposingCharacter, "cant-challenge")).toBe(true);
    expect(testEngine.hasRestriction(opposingCharacter, "must-quest")).toBe(true);
    expect(testEngine.asPlayerTwo().quest(opposingCharacter)).toBeSuccessfulCommand();
  });

  it("does not trigger when Gaston has no card under him", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: gastonFrightfulBully, isDrying: false }],
        deck: 5,
      },
      {
        play: [opposingCharacter],
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().quest(gastonFrightfulBully)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.hasRestriction(opposingCharacter, "cant-challenge")).toBe(false);
    expect(testEngine.hasRestriction(opposingCharacter, "must-quest")).toBe(false);
  });
});
