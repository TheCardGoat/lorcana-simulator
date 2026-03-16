import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { tinkerBellPeterPansAlly } from "../../001";
import { moanaChosenByTheOcean } from "../../001/characters/117-moana-chosen-by-the-ocean";
import { oneLastHope } from "./197-one-last-hope";

describe("One Last Hope", () => {
  it("gives a Hero Resist +2 and lets them challenge ready characters this turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [oneLastHope],
      inkwell: oneLastHope.cost,
      play: [moanaChosenByTheOcean],
    });

    expect(
      testEngine.asPlayerOne().playCard(oneLastHope, { targets: [moanaChosenByTheOcean] }).success,
    ).toBe(true);
    expect(testEngine.getKeywordValue(moanaChosenByTheOcean, "Resist")).toBe(2);
    expect(testEngine.hasGrantedAbility(moanaChosenByTheOcean, "can-challenge-ready")).toBe(true);
  });

  it("only gives Resist +2 to a non-Hero", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [oneLastHope],
      inkwell: oneLastHope.cost,
      play: [tinkerBellPeterPansAlly],
    });

    expect(
      testEngine.asPlayerOne().playCard(oneLastHope, { targets: [tinkerBellPeterPansAlly] })
        .success,
    ).toBe(true);
    expect(testEngine.getKeywordValue(tinkerBellPeterPansAlly, "Resist")).toBe(2);
    expect(testEngine.hasGrantedAbility(tinkerBellPeterPansAlly, "can-challenge-ready")).toBe(
      false,
    );
  });
});
