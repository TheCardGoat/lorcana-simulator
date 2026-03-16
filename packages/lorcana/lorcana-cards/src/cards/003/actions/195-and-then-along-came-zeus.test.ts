import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { forbiddenMountainMaleficentsCastle } from "../locations";
import { andThenAlongCameZeus } from "./195-and-then-along-came-zeus";

describe("And Then Along Came Zeus", () => {
  it("deals 5 damage to the chosen location", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [andThenAlongCameZeus],
      inkwell: andThenAlongCameZeus.cost,
      play: [forbiddenMountainMaleficentsCastle],
    });

    expect(
      testEngine.asPlayerOne().playCard(andThenAlongCameZeus, {
        targets: [forbiddenMountainMaleficentsCastle],
      }).success,
    ).toBe(true);

    expect(testEngine.asServer().getDamage(forbiddenMountainMaleficentsCastle)).toBe(5);
  });
});
