import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack, simbaProtectiveCub } from "../../001";
import { grabYourBow } from "./131-grab-your-bow";

describe("Grab Your Bow", () => {
  it("banishes up to 2 chosen characters with 2 strength or less", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [grabYourBow],
        inkwell: grabYourBow.cost,
      },
      {
        play: [heiheiBoatSnack, simbaProtectiveCub],
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(grabYourBow, {
        targets: [heiheiBoatSnack, simbaProtectiveCub],
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerTwo().getCardZone(heiheiBoatSnack)).toBe("discard");
    expect(testEngine.asPlayerTwo().getCardZone(simbaProtectiveCub)).toBe("discard");
  });
});
