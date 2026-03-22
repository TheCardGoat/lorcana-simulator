import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import {
  mickeyMouseArtfulRogue,
  mickeyMouseDetective,
  mickeyMouseTrueFriend,
  simbaProtectiveCub,
} from "../../001";
import { beyondTheHorizon } from "./202-beyond-the-horizon";

describe("Beyond the Horizon", () => {
  it("makes both players discard their hands and draw 3 cards in the first mode", () => {
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
      testEngine.asPlayerOne().playCardWithChoice(beyondTheHorizon, 0),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 3, discard: 3 });
    expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ hand: 3, discard: 2 });
  });

  it("makes you discard your hand and draw 3 cards in the second mode", () => {
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
      testEngine.asPlayerOne().playCardWithChoice(beyondTheHorizon, 1),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 3, discard: 3 });
    expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ hand: 2, discard: 0 });
  });

  it("makes your opponent discard their hand and draw 3 cards in the third mode", () => {
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
      testEngine.asPlayerOne().playCardWithChoice(beyondTheHorizon, 2),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 2, discard: 1 });
    expect(testEngine.asPlayerTwo()).toHaveZoneCounts({ hand: 3, discard: 2 });
  });
});
