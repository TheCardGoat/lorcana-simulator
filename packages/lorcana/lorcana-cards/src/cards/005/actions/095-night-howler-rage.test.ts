import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, simbaProtectiveCub } from "../../001";
import { nightHowlerRage } from "./095-night-howler-rage";

describe("Night Howler Rage", () => {
  it("draws a card and gives the chosen character Reckless during their next turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [nightHowlerRage],
        inkwell: nightHowlerRage.cost,
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
      {
        deck: [mickeyMouseTrueFriend, mickeyMouseTrueFriend],
        play: [mickeyMouseTrueFriend],
      },
    );

    expect(testEngine.hasKeyword(mickeyMouseTrueFriend, "Reckless")).toBe(false);
    expect(
      testEngine.asPlayerOne().playCardTo(nightHowlerRage, mickeyMouseTrueFriend),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne()).toHaveZoneCounts({ hand: 1, deck: 1, discard: 1 });

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().hasKeyword(mickeyMouseTrueFriend, "Reckless")).toBe(true);

    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().hasKeyword(mickeyMouseTrueFriend, "Reckless")).toBe(false);
  });
});
