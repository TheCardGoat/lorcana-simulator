import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { woodyJungleGuide } from "./015-woody-jungle-guide";

const toyCharacter = createMockCharacter({
  id: "woody-toy-char",
  name: "Toy Character",
  cost: 2,
  strength: 2,
  willpower: 3,
  classifications: ["Storyborn", "Ally", "Toy"],
});

describe("Woody - Jungle Guide", () => {
  it("EVERYONE GATHER 'ROUND - other Toy characters get +1 willpower", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [woodyJungleGuide, toyCharacter],
        deck: 5,
      },
      {
        deck: 5,
      },
    );

    const toyId = testEngine.findCardInstanceId(toyCharacter, "play");
    expect(testEngine.asServer().getCard(toyId).willpower).toBe(toyCharacter.willpower + 1);
  });
});
