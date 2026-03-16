import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { johnSmithsCompass } from "./033-john-smiths-compass";

const helpfulScout = createMockCharacter({
  id: "john-smiths-compass-helpful-scout",
  name: "Helpful Scout",
  cost: 3,
});

describe("John Smith's Compass", () => {
  it("reveals the top card and lets you put a matching character into your hand when none of your characters challenged", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: [helpfulScout],
        play: [johnSmithsCompass],
      },
      {
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
    while (testEngine.asPlayerOne().getBagCount() > 0) {
      expect(
        testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
      ).toBeSuccessfulCommand();
    }
    expect(
      testEngine.asPlayerOne().resolvePendingEffect(johnSmithsCompass, {
        destinations: [
          {
            zone: "hand",
            cards: [helpfulScout],
          },
        ],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(helpfulScout)).toBe("hand");
    expect(testEngine.asPlayerOne().getCardZone(johnSmithsCompass)).toBe("play");
  });
});
