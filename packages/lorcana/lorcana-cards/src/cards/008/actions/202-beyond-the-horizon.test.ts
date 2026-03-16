import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import {
  mickeyMouseArtfulRogue,
  mickeyMouseDetective,
  mickeyMouseTrueFriend,
  simbaProtectiveCub,
} from "../../001";
import { beyondTheHorizon } from "./202-beyond-the-horizon";

describe.skip("Beyond the Horizon", () => {
  it("makes both players discard their hands and draw 3 cards in the both-players mode", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [beyondTheHorizon, simbaProtectiveCub, mickeyMouseTrueFriend],
        inkwell: beyondTheHorizon.cost,
        deck: [mickeyMouseArtfulRogue, mickeyMouseDetective, simbaProtectiveCub],
      },
      {
        hand: [mickeyMouseArtfulRogue, mickeyMouseDetective],
        deck: [simbaProtectiveCub, mickeyMouseTrueFriend, mickeyMouseArtfulRogue],
      },
    );

    expect(
      testEngine.asPlayerOne().playCardWithChoice(beyondTheHorizon, 3),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 3, discard: 3 });
    expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ hand: 3, discard: 2 });
  });
});
