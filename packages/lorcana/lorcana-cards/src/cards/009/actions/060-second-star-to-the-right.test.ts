import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import {
  aladdinPrinceAli,
  arielOnHumanLegs,
  healingGlow,
  simbaProtectiveCub,
  tinkerBellPeterPansAlly,
} from "../../001";
import { secondStarToTheRight } from "./060-second-star-to-the-right";

describe("Second Star to the Right", () => {
  it("lets the chosen player draw 5 cards", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [secondStarToTheRight],
        inkwell: secondStarToTheRight.cost,
      },
      {
        deck: [
          aladdinPrinceAli,
          arielOnHumanLegs,
          healingGlow,
          simbaProtectiveCub,
          tinkerBellPeterPansAlly,
        ],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardForPlayer(secondStarToTheRight, PLAYER_TWO),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getZonesCardCount().hand).toBe(5);
  });
});
