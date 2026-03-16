import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { drFacilierSavvyOpportunist } from "../characters";
import { gruesomeAndGrim } from "./062-gruesome-and-grim";

describe("Gruesome and Grim", () => {
  it("plays a cost 4 or less character for free, gives them Rush, and banishes them at end of turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [gruesomeAndGrim, drFacilierSavvyOpportunist],
        inkwell: gruesomeAndGrim.cost,
        deck: 2,
      },
      {
        deck: 2,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(gruesomeAndGrim, {
        targets: [testEngine.findCardInstanceId(drFacilierSavvyOpportunist, "hand", "p1")],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(drFacilierSavvyOpportunist)).toBe("play");
    expect(testEngine.hasKeyword(drFacilierSavvyOpportunist, "Rush")).toBe(true);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(drFacilierSavvyOpportunist)).toBe("discard");
  });
});
