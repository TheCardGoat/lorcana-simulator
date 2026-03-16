import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_TWO } from "@tcg/lorcana-engine/testing";
import { heiheiBoatSnack } from "@tcg/lorcana-cards/cards/001";
import { liloBundledUp } from "./195-lilo-bundled-up";

describe("Lilo - Bundled Up", () => {
  it("prevents only the first damage she would take during each opponent's turn", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: liloBundledUp, exerted: true, isDrying: false }],
      },
      {
        play: [
          { card: heiheiBoatSnack, isDrying: false },
          { card: heiheiBoatSnack, isDrying: false },
        ],
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    const attackers = testEngine
      .getCardInstanceIdsInZone("play", PLAYER_TWO)
      .filter((cardId) => testEngine.getCardDefinitionId(cardId) === heiheiBoatSnack.id);

    expect(
      testEngine.asPlayerTwo().challenge(attackers[0]!, liloBundledUp),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getDamage(liloBundledUp)).toBe(0);
    expect(testEngine.asPlayerOne().getCardZone(liloBundledUp)).toBe("play");

    expect(
      testEngine.asPlayerTwo().challenge(attackers[1]!, liloBundledUp),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getDamage(liloBundledUp)).toBe(1);
    expect(testEngine.asPlayerOne().getCardZone(liloBundledUp)).toBe("play");
  });
});
