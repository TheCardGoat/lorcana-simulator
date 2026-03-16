import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { trainingGroundsImpossiblePillar } from "./136-training-grounds-impossible-pillar";

const pillarStudent = createMockCharacter({
  id: "pillar-student",
  name: "Pillar Student",
  cost: 2,
  strength: 2,
});

describe("Training Grounds - Impossible Pillar", () => {
  it("spends 1 ink to give a character here +1 strength this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        trainingGroundsImpossiblePillar,
        { card: pillarStudent, atLocation: trainingGroundsImpossiblePillar },
      ],
      inkwell: 1,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(trainingGroundsImpossiblePillar, {
        targets: [pillarStudent],
      }).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getCard(pillarStudent)?.strength).toBe(
      pillarStudent.strength + 1,
    );
  });
});
