import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { healingGlow, peterPanNeverLanding } from "../../001";
import { snowballFight } from "./095-snowball-fight";

describe("Snowball Fight", () => {
  it("makes each opponent discard a card and gains lore when you have Evasive", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [snowballFight],
        inkwell: snowballFight.cost,
        play: [peterPanNeverLanding],
      },
      {
        hand: [healingGlow],
      },
    );
    const healingGlowId = testEngine.findCardInstanceId(healingGlow, "hand", PLAYER_TWO);

    expect(testEngine.asPlayerOne().playCard(snowballFight)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().respondWith(healingGlowId)).toBeSuccessfulCommand();

    expect(testEngine.asPlayerTwo().getCardZone(healingGlow)).toBe("discard");
    expect(testEngine.asPlayerOne().getLore("player_one")).toBe(1);
  });
});
