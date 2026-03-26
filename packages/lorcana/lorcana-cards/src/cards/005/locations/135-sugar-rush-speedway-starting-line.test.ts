import { describe, expect, it } from "bun:test";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  createMockCharacter,
} from "@tcg/lorcana-engine/testing";
import { rapunzelsTowerSecludedPrison } from "./033-rapunzels-tower-secluded-prison";
import { sugarRushSpeedwayStartingLine } from "./135-sugar-rush-speedway-starting-line";
import { sugarRushSpeedwayFinishLine } from "../../006/locations/035-sugar-rush-speedway-finish-line";

const racer = createMockCharacter({
  id: "starting-line-racer",
  name: "Starting Line Racer",
  cost: 2,
  strength: 2,
  willpower: 3,
});

describe("Sugar Rush Speedway - Starting Line", () => {
  it("exerts a character here, deals 1 damage, and moves them to another location for free", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        sugarRushSpeedwayStartingLine,
        rapunzelsTowerSecludedPrison,
        { card: racer, atLocation: sugarRushSpeedwayStartingLine },
      ],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().activateAbility(sugarRushSpeedwayStartingLine).success).toBe(
      true,
    );
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [racer, rapunzelsTowerSecludedPrison],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCard(racer)?.damage).toBe(1);
    expect(testEngine.asPlayerOne().getCard(racer)?.exerted).toBe(true);
    expect(testEngine.asPlayerOne().getCardLocationId(racer)).toBe(
      testEngine.findCardInstanceId(rapunzelsTowerSecludedPrison, "play", "p1"),
    );
    expect(testEngine.asPlayerOne().activateAbility(sugarRushSpeedwayStartingLine).success).toBe(
      false,
    );
  });

  it("regression: allows free move to Finish Line location", () => {
    const finishLineRacer = createMockCharacter({
      id: "starting-line-finish-racer",
      name: "Finish Line Racer",
      cost: 2,
      strength: 2,
      willpower: 3,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        sugarRushSpeedwayStartingLine,
        sugarRushSpeedwayFinishLine,
        { card: finishLineRacer, atLocation: sugarRushSpeedwayStartingLine },
      ],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().activateAbility(sugarRushSpeedwayStartingLine).success).toBe(
      true,
    );
    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: true,
        targets: [finishLineRacer, sugarRushSpeedwayFinishLine],
      }).success,
    ).toBe(true);

    // The character should have been moved to the Finish Line for free (despite its 6 move cost)
    expect(testEngine.asPlayerOne().getCardLocationId(finishLineRacer)).toBe(
      testEngine.findCardInstanceId(sugarRushSpeedwayFinishLine, "play", "p1"),
    );
  });

  it.todo("regression: should not allow exerted characters to be chosen since exerting is part of cost", () => {
    // Bug: Sugar Rush Speedway was allowing exerted characters to be chosen.
    // Since exerting is part of the cost, the character must be ready to be chosen.
    const exertedRacer = createMockCharacter({
      id: "starting-line-exerted-racer",
      name: "Exerted Racer",
      cost: 2,
      strength: 2,
      willpower: 3,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        sugarRushSpeedwayStartingLine,
        rapunzelsTowerSecludedPrison,
        { card: exertedRacer, atLocation: sugarRushSpeedwayStartingLine, exerted: true },
      ],
      deck: 1,
    });

    expect(testEngine.asPlayerOne().activateAbility(sugarRushSpeedwayStartingLine).success).toBe(
      true,
    );

    // Trying to choose the exerted racer should fail
    const result = testEngine.asPlayerOne().resolveNextPending({
      resolveOptional: true,
      targets: [exertedRacer, rapunzelsTowerSecludedPrison],
    });

    // The exerted character should not be a valid target since exerting is the cost
    expect(result.success).toBe(false);
  });
});
