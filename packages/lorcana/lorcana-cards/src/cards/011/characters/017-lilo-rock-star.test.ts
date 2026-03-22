import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { liloRockStar } from "./017-lilo-rock-star";

describe("Lilo - Rock Star", () => {
  it("can be played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [liloRockStar],
      inkwell: liloRockStar.cost,
    });

    expect(testEngine.asPlayerOne().playCard(liloRockStar)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(liloRockStar)).toBe("play");
  });
});
