import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { beastWolfsbane } from "./070-beast-wolfsbane";
import { simbaProtectiveCub } from "./020-simba-protective-cub";
import { mickeyMouseTrueFriend } from "./012-mickey-mouse-true-friend";

describe("Beast - Wolfsbane", () => {
  it("has Rush and exerts all opposing damaged characters when played", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [beastWolfsbane],
        inkwell: beastWolfsbane.cost,
        deck: 2,
      },
      {
        deck: 2,
        play: [simbaProtectiveCub, mickeyMouseTrueFriend],
      },
    );

    expect(testEngine.asServer().manualSetDamage(simbaProtectiveCub, 1)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().playCard(beastWolfsbane)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCard(beastWolfsbane)?.hasRush).toBe(true);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    expect(testEngine.asPlayerTwo().isExerted(simbaProtectiveCub)).toBe(true);
    expect(testEngine.asPlayerTwo().isExerted(mickeyMouseTrueFriend)).toBe(false);
  });
});
