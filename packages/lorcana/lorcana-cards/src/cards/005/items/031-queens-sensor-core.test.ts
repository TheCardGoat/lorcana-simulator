import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { queensSensorCore } from "./031-queens-sensor-core";

const royalHeir = createMockCharacter({
  id: "queens-sensor-core-royal-heir",
  name: "Royal Heir",
  cost: 2,
  classifications: ["Storyborn", "Princess"],
});

describe("Queen's Sensor Core", () => {
  it("is still marked blocked while SYMBOL OF NOBILITY lacks working runtime support", () => {
    expect(queensSensorCore.missingImplementation).toBe(true);
    expect(queensSensorCore.missingTests).toBe(true);
  });

  it("reveals the top card and lets you put a Princess or Queen character card into your hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: [royalHeir],
      inkwell: 2,
      play: [queensSensorCore],
    });

    expect(
      testEngine.asPlayerOne().activateAbility(queensSensorCore, {
        ability: "ROYAL SEARCH",
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(queensSensorCore, {
        destinations: [
          {
            zone: "hand",
            cards: [royalHeir],
          },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(royalHeir)).toBe("hand");
  });
});
