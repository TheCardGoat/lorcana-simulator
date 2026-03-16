import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { healingDecanter } from "./030-healing-decanter";
import { merlinsCarpetbag } from "./167-merlins-carpetbag";

describe("Merlin's Carpetbag", () => {
  it("returns an item card from your discard to your hand", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      deck: [],
      discard: [healingDecanter],
      inkwell: 1,
      play: [merlinsCarpetbag],
    });

    expect(testEngine.asPlayerOne().activateAbility(merlinsCarpetbag)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(healingDecanter)).toBe("hand");
  });
});
