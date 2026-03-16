import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { chemPurse } from "./119-chem-purse";

const ordinaryPlayedCharacter = createMockCharacter({
  id: "chem-purse-ordinary-play",
  name: "Ordinary Played Character",
  cost: 1,
  strength: 2,
});

describe("Chem Purse", () => {
  it("does not change the strength of a character played normally", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [ordinaryPlayedCharacter],
      inkwell: ordinaryPlayedCharacter.cost,
      play: [chemPurse],
    });

    expect(testEngine.asPlayerOne().playCard(ordinaryPlayedCharacter)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCard(ordinaryPlayedCharacter)?.strength).toBe(
      ordinaryPlayedCharacter.strength,
    );
  });
});
