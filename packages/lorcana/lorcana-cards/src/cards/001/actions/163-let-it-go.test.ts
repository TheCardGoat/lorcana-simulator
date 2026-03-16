import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../characters";
import { letItGo } from "./163-let-it-go";

describe("Let It Go", () => {
  it("puts chosen opposing character into their player's inkwell facedown and exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [letItGo],
        inkwell: letItGo.cost,
      },
      {
        play: [simbaProtectiveCub],
        deck: 1,
      },
    );
    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", "p2");

    const playResult = testEngine.asPlayerOne().playCard(letItGo, {
      targets: [simbaId],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(simbaId)).toEqual("inkwell");
    expect(testEngine.asServer().getCard(simbaId)).toEqual(
      expect.objectContaining({ zone: "inkwell", exerted: true }),
    );
    expect(
      testEngine.getAuthoritativeState().ctx.zones.private.cardMeta[simbaId]?.publicFaceState,
    ).toBe("faceDown");
  });
});
