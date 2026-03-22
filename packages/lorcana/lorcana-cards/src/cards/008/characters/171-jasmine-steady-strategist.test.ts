import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { jasmineSteadyStrategist } from "./171-jasmine-steady-strategist";

const allyCharacter = createMockCharacter({
  id: "ally-match",
  name: "Ally Match",
  cost: 2,
  classifications: ["Storyborn", "Ally"],
});

const nonMatchA = createMockCharacter({
  id: "non-match-a",
  name: "Non Match A",
  cost: 1,
  classifications: ["Storyborn", "Hero"],
});

const nonMatchB = createMockCharacter({
  id: "non-match-b",
  name: "Non Match B",
  cost: 3,
  classifications: ["Dreamborn", "Villain"],
});

describe("Jasmine - Steady Strategist", () => {
  it("ALWAYS PLANNING - on quest, reveals an Ally character to hand, puts rest on bottom", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: jasmineSteadyStrategist, isDrying: false }],
      deck: [nonMatchA, allyCharacter, nonMatchB],
    });

    expect(testEngine.asPlayerOne().quest(jasmineSteadyStrategist)).toBeSuccessfulCommand();

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(testEngine.asPlayerOne().resolveBag(bagEffect!.id)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        destinations: [
          { zone: "hand", cards: [allyCharacter] },
          { zone: "deck-bottom", cards: [nonMatchB, nonMatchA] },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(allyCharacter)).toBe("hand");
  });
});
