import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { arielOnHumanLegs, jetsamUrsulasSpy } from "../characters";
import { smash } from "./200-smash";

describe("Smash", () => {
  it("deals 3 damage to a chosen character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [smash],
        inkwell: smash.cost,
      },
      {
        play: [arielOnHumanLegs],
      },
    );

    testEngine.asPlayerOne().playCard(smash, {
      targets: [arielOnHumanLegs],
    });

    expect(testEngine.asPlayerOne().getDamage(arielOnHumanLegs)).toEqual(3);
  });

  it("banishes an opposing character when damage is lethal", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [smash],
        inkwell: smash.cost,
      },
      {
        play: [jetsamUrsulasSpy],
      },
    );

    testEngine.asPlayerOne().playCard(smash, {
      targets: [jetsamUrsulasSpy],
    });

    expect(testEngine.asPlayerOne().getCardZone(jetsamUrsulasSpy)).toEqual("discard");
  });
});
