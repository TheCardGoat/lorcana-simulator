import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import {
  mickeyMouseTrueFriend,
  moanaChosenByTheOcean,
  simbaProtectiveCub,
  tinkerBellPeterPansAlly,
} from "../../001";
import { goofyKnightForADay } from "../../002";
import { i2i } from "./130-i2i";

describe("I2I", () => {
  it("makes each player draw 2 cards and gain 2 lore on a normal cast", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [i2i],
        inkwell: i2i.cost,
        deck: [moanaChosenByTheOcean, simbaProtectiveCub],
      },
      {
        deck: [goofyKnightForADay, mickeyMouseTrueFriend],
      },
    );

    expect(testEngine.asPlayerOne().playCard(i2i)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getZonesCardCount().hand).toBe(2);
    expect(testEngine.asPlayerTwo().getZonesCardCount().hand).toBe(2);
    expect(testEngine.getLore("player_one")).toBe(2);
    expect(testEngine.getLore("player_two")).toBe(2);
  });

  it("readies the singers and stops them from questing when sung together", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [i2i],
        play: [moanaChosenByTheOcean, tinkerBellPeterPansAlly],
      },
      {
        deck: [goofyKnightForADay, mickeyMouseTrueFriend],
      },
    );

    expect(
      testEngine
        .asPlayerOne()
        .playSongTogether(i2i, [moanaChosenByTheOcean, tinkerBellPeterPansAlly]).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().isExerted(moanaChosenByTheOcean)).toBe(false);
    expect(testEngine.asPlayerOne().isExerted(tinkerBellPeterPansAlly)).toBe(false);
    expect(testEngine.hasRestriction(moanaChosenByTheOcean, "cant-quest")).toBe(true);
    expect(testEngine.hasRestriction(tinkerBellPeterPansAlly, "cant-quest")).toBe(true);
  });
});
