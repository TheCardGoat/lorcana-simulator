import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { rapunzelsTowerSecludedPrison } from "./033-rapunzels-tower-secluded-prison";

const towerGuest = createMockCharacter({
  id: "tower-guest",
  name: "Tower Guest",
  cost: 2,
  willpower: 4,
});

describe("Rapunzel's Tower - Secluded Prison", () => {
  it("gives characters here +3 willpower", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [rapunzelsTowerSecludedPrison, towerGuest],
      inkwell: rapunzelsTowerSecludedPrison.moveCost,
    });

    expect(
      testEngine.asPlayerOne().moveCharacterToLocation(towerGuest, rapunzelsTowerSecludedPrison)
        .success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getCard(towerGuest)?.willpower).toBe(towerGuest.willpower + 3);
  });
});
