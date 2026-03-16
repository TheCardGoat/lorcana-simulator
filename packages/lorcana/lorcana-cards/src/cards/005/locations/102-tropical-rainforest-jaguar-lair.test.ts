import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { tropicalRainforestJaguarLair } from "./102-tropical-rainforest-jaguar-lair";

const damagedOpponent = createMockCharacter({
  id: "jaguar-damaged",
  name: "Damaged Opponent",
  cost: 2,
});
const healthyOpponent = createMockCharacter({
  id: "jaguar-healthy",
  name: "Healthy Opponent",
  cost: 2,
});

describe("Tropical Rainforest - Jaguar Lair", () => {
  it("gives Reckless only to opposing damaged characters", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [tropicalRainforestJaguarLair],
      },
      {
        play: [{ card: damagedOpponent, damage: 1 }, healthyOpponent],
      },
    );

    expect(testEngine.asPlayerTwo().hasKeyword(damagedOpponent, "Reckless")).toBe(true);
    expect(testEngine.asPlayerTwo().hasKeyword(healthyOpponent, "Reckless")).toBe(false);
  });
});
