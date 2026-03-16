import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, createMockCharacter } from "@tcg/lorcana-engine/testing";
import { snowFort } from "./098-snow-fort";

const fortifiedAlly = createMockCharacter({
  id: "snow-fort-fortified-ally",
  name: "Fortified Ally",
  cost: 2,
  strength: 3,
});

describe("Snow Fort", () => {
  it("gives your characters +1 strength", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [snowFort, fortifiedAlly],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().getCardStrength(fortifiedAlly)).toBe(4);
  });

  it("gives your characters Resist during opponents' turns", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 2,
        play: [snowFort, fortifiedAlly],
      },
      {
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().hasKeyword(fortifiedAlly, "Resist")).toBe(false);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().hasKeyword(fortifiedAlly, "Resist")).toBe(true);

    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().hasKeyword(fortifiedAlly, "Resist")).toBe(false);
  });
});
