import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub, tinkerBellPeterPansAlly } from "../../001";
import { underTheSea } from "./097-under-the-sea";

describe("Under the Sea", () => {
  it("puts opposing characters with 2 strength or less on the bottom of their deck", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [underTheSea],
        inkwell: underTheSea.cost,
      },
      {
        play: [simbaProtectiveCub, tinkerBellPeterPansAlly],
      },
    );

    expect(testEngine.asPlayerOne().playCard(underTheSea)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("deck");
    expect(testEngine.asPlayerTwo().getCardZone(tinkerBellPeterPansAlly)).toBe("play");
  });
});
