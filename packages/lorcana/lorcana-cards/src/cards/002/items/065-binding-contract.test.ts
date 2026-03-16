import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { grandDukeAdvisorToTheKing, pigletVerySmallAnimal } from "../characters";
import { bindingContract } from "./065-binding-contract";

describe("Binding Contract", () => {
  it("exerts one of your characters as a cost, then exerts the chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [bindingContract, grandDukeAdvisorToTheKing],
      },
      {
        play: [pigletVerySmallAnimal],
      },
    );

    const result = testEngine.asPlayerOne().activateAbility(bindingContract, {
      costs: {
        exertCharacters: [grandDukeAdvisorToTheKing],
      },
      targets: [pigletVerySmallAnimal],
    });

    expect(result).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().isExerted(bindingContract)).toBe(true);
    expect(testEngine.asPlayerOne().isExerted(grandDukeAdvisorToTheKing)).toBe(true);
    expect(testEngine.asPlayerTwo().isExerted(pigletVerySmallAnimal)).toBe(true);
  });
});
