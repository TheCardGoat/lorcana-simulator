import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { belleBookworm } from "./071-belle-bookworm";
import { theQueenDisguisedPeddler } from "./093-the-queen-disguised-peddler";

describe("The Queen - Disguised Peddler", () => {
  it("discards a chosen character card to gain lore equal to that card's lore", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [belleBookworm],
      play: [theQueenDisguisedPeddler],
      deck: 1,
    });

    expect(
      testEngine.asPlayerOne().activateAbility(theQueenDisguisedPeddler, {
        costs: {
          discardCards: [belleBookworm],
        },
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(belleBookworm)).toBe("discard");
    expect(testEngine.asPlayerOne().getLore("player_one")).toBe(belleBookworm.lore);
  });
});
