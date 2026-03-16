import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { theMagicFeather } from "./064-the-magic-feather";

describe("The Magic Feather", () => {
  it("returns itself to your hand with GROUNDED 3", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      inkwell: 3,
      play: [theMagicFeather],
    });

    expect(
      testEngine.asPlayerOne().activateAbility(theMagicFeather, {
        ability: "GROUNDED 3",
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(theMagicFeather)).toBe("hand");
  });
});
