import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { theGlassSlipper } from "./044-the-glass-slipper";

const princeCharacter = createMockCharacter({
  id: "glass-slipper-prince",
  name: "Prince Character",
  cost: 2,
  classifications: ["Storyborn", "Prince"],
});

const princessCard = createMockCharacter({
  id: "glass-slipper-princess",
  name: "Princess Card",
  cost: 2,
  classifications: ["Storyborn", "Princess"],
});

describe("The Glass Slipper", () => {
  it("banishes itself and exerts your Prince to find a Princess character card", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: [princessCard],
      play: [theGlassSlipper, { card: princeCharacter, isDrying: false }],
    });

    expect(
      testEngine.asPlayerOne().activateAbility(theGlassSlipper, {
        ability: "SEARCH THE KINGDOM",
        costs: {
          exertCharacters: [princeCharacter],
        },
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(theGlassSlipper)).toBe("discard");
    expect(testEngine.asPlayerOne().isExerted(princeCharacter)).toBe(true);
    expect(testEngine.asPlayerOne().getCardZone(princessCard)).toBe("hand");
  });
});
