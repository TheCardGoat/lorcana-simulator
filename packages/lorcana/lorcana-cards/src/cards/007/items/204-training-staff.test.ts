import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { trainingStaff } from "./204-training-staff";

const trainedCharacter = createMockCharacter({
  id: "training-staff-trained-character",
  name: "Training Staff Trained Character",
  cost: 2,
});

describe("Training Staff", () => {
  it("gives the chosen character Challenger +2 this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: 1,
      play: [trainingStaff, trainedCharacter],
    });

    expect(
      testEngine.asPlayerOne().activateAbility(trainingStaff, {
        ability: "PRECISION STRIKE",
        targets: [trainedCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toHaveKeyword({
      card: trainedCharacter,
      keyword: "Challenger",
      value: 2,
    });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne()).not.toHaveKeyword({
      card: trainedCharacter,
      keyword: "Challenger",
    });
  });
});
