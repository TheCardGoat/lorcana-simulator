import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs } from "../characters";
import { motherKnowsBest } from "./095-mother-knows-best";

describe("Mother Knows Best", () => {
  it("returns the chosen character to their player's hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [motherKnowsBest],
        inkwell: motherKnowsBest.cost,
      },
      {
        play: [arielOnHumanLegs],
      },
    );

    const playResult = testEngine.asPlayerOne().playCard(motherKnowsBest, {
      targets: [arielOnHumanLegs],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(arielOnHumanLegs)).toBe("hand");
  });
});
