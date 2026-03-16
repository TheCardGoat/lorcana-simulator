import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { healingGlow, simbaProtectiveCub } from "../../001";
import { theBareNecessities } from "./028-the-bare-necessities";

describe("The Bare Necessities", () => {
  it("makes the chosen opponent discard a non-character card of your choice", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theBareNecessities],
        inkwell: theBareNecessities.cost,
      },
      {
        hand: [healingGlow, simbaProtectiveCub],
      },
    );
    const healingGlowId = testEngine.findCardInstanceId(healingGlow, "hand", PLAYER_TWO);

    expect(testEngine.asPlayerOne().playCardForPlayer(theBareNecessities, PLAYER_TWO).success).toBe(
      true,
    );
    expect(testEngine.asPlayerOne().respondWith(healingGlowId)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(healingGlowId)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("hand");
  });
});
