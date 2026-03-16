import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { rapunzelsTowerSecludedPrison } from "./033-rapunzels-tower-secluded-prison";
import { sugarRushSpeedwayStartingLine } from "./135-sugar-rush-speedway-starting-line";

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
});
