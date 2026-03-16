import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { mothersNecklace } from "./065-mothers-necklace";

const necklaceBearer = createMockCharacter({
  id: "mothers-necklace-bearer",
  name: "Necklace Bearer",
  cost: 2,
});

describe("Mother's Necklace", () => {
  it("gives a chosen character Evasive until the start of your next turn when none of your characters challenged", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 2,
        play: [mothersNecklace, necklaceBearer],
      },
      {
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().hasKeyword(necklaceBearer, "Evasive")).toBe(false);
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [necklaceBearer] }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().hasKeyword(necklaceBearer, "Evasive")).toBe(true);

    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().hasKeyword(necklaceBearer, "Evasive")).toBe(false);
  });
});
