import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs } from "./001-ariel-on-human-legs";
import { cinderellaGentleAndKind } from "./003-cinderella-gentle-and-kind";
import { mickeyMouseTrueFriend } from "./012-mickey-mouse-true-friend";

describe("Cinderella - Gentle and Kind", () => {
  it("does not remove damage from a non-Princess target", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: 2,
      play: [
        { card: cinderellaGentleAndKind, isDrying: false },
        arielOnHumanLegs,
        mickeyMouseTrueFriend,
      ],
    });

    const nonPrincessId = testEngine.findCardInstanceId(mickeyMouseTrueFriend, "play", PLAYER_ONE);

    expect(testEngine.asServer().manualSetDamage(arielOnHumanLegs, 2)).toBeSuccessfulCommand();
    expect(testEngine.asServer().manualSetDamage(mickeyMouseTrueFriend, 2)).toBeSuccessfulCommand();

    const invalidTargetResult = testEngine.asPlayerOne().activateAbility(cinderellaGentleAndKind, {
      targets: [nonPrincessId],
    });

    expect(invalidTargetResult).toBeSuccessfulCommand();
    expect(testEngine.asServer().getCard(nonPrincessId)?.damage).toBe(2);
  });

  it("removes damage from a chosen Princess character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: 2,
      play: [
        { card: cinderellaGentleAndKind, isDrying: false },
        arielOnHumanLegs,
        mickeyMouseTrueFriend,
      ],
    });
    const princessId = testEngine.findCardInstanceId(arielOnHumanLegs, "play", PLAYER_ONE);

    expect(testEngine.asServer().manualSetDamage(arielOnHumanLegs, 2)).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().activateAbility(cinderellaGentleAndKind, {
        targets: [princessId],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asServer().getCard(princessId)?.damage).toBe(0);
  });
});
