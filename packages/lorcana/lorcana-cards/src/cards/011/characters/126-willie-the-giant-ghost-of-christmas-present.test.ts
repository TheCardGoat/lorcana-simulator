import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { willieTheGiantGhostOfChristmasPresent } from "./126-willie-the-giant-ghost-of-christmas-present";

describe("Willie the Giant - Ghost of Christmas Present", () => {
  it("is playable and enters play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [willieTheGiantGhostOfChristmasPresent],
      inkwell: willieTheGiantGhostOfChristmasPresent.cost,
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(willieTheGiantGhostOfChristmasPresent),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(willieTheGiantGhostOfChristmasPresent)).toBe(
      "play",
    );
  });
});
