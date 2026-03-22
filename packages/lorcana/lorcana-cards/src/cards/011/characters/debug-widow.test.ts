import { describe, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { widowTweedKindlySoul } from "./026-widow-tweed-kindly-soul";
import { todPlayfulKit } from "./090-tod-playful-kit";

describe("DEBUG widow tweed", () => {
  it("debug bag effect structure", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [widowTweedKindlySoul],
      inkwell: widowTweedKindlySoul.cost,
      discard: [todPlayfulKit],
      deck: 2,
    });

    testEngine.asPlayerOne().playCard(widowTweedKindlySoul);

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    console.log("BAG EFFECT FULL:", JSON.stringify(bagEffect, null, 2).slice(0, 1000));
  });
});
