import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { sidPhillipsToySurgeon } from "./126-sid-phillips-toy-surgeon";

const ownCharacter = createMockCharacter({
  id: "sid-own-char",
  name: "Own Character",
  cost: 2,
  strength: 2,
  willpower: 3,
  classifications: ["Storyborn", "Ally", "Toy"],
});

const opponentCharacter = createMockCharacter({
  id: "sid-opponent-char",
  name: "Opponent Character",
  cost: 3,
  strength: 3,
  willpower: 4,
});

describe("Sid Phillips - Toy Surgeon", () => {
  it("PLAYTIME'S OVER - banish own character, opponent must banish theirs", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [sidPhillipsToySurgeon],
        play: [ownCharacter],
        inkwell: sidPhillipsToySurgeon.cost,
      },
      {
        play: [opponentCharacter],
        deck: 5,
      },
    );

    expect(testEngine.asPlayerOne().playCard(sidPhillipsToySurgeon)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBeGreaterThan(0);

    // Resolve the optional: banish own character
    expect(
      testEngine.asPlayerOne().resolvePendingByCard(sidPhillipsToySurgeon, {
        resolveOptional: true,
        targets: [ownCharacter],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(ownCharacter)).toBe("discard");

    // The "if you do" conditional creates a pending target-selection for P1
    // to choose which opponent character gets banished
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [opponentCharacter] }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(opponentCharacter)).toBe("discard");
  });
});
