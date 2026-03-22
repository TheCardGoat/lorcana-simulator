import { describe, expect, it } from "bun:test";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { jetsamUrsulasSpy, simbaProtectiveCub } from "../../001";
import { theHorsemanStrikes } from "./029-the-horseman-strikes";

describe("The Horseman Strikes!", () => {
  it("draws a card and can banish the chosen Evasive character", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theHorsemanStrikes],
        inkwell: theHorsemanStrikes.cost,
        deck: [simbaProtectiveCub],
      },
      {
        play: [jetsamUrsulasSpy],
      },
    );
    const jetsamId = testEngine.findCardInstanceId(jetsamUrsulasSpy, "play", "p2");

    const playResult = testEngine.asPlayerOne().playCard(theHorsemanStrikes, {
      resolveOptional: true,
      targets: [jetsamId],
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(1);
    expect(testEngine.asPlayerTwo().getCardZone(jetsamId)).toBe("discard");
  });

  it("still draws a card when the optional banish is skipped", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theHorsemanStrikes],
        inkwell: theHorsemanStrikes.cost,
        deck: [simbaProtectiveCub],
      },
      {
        play: [jetsamUrsulasSpy],
      },
    );

    const playResult = testEngine.asPlayerOne().playCard(theHorsemanStrikes, {
      resolveOptional: false,
    });

    expect(playResult).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardsInZone("hand", PLAYER_ONE).count).toBe(1);
    expect(testEngine.asPlayerTwo().getCardZone(jetsamUrsulasSpy)).toBe("play");
  });

  it("cannot target a character without Evasive", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [theHorsemanStrikes],
        inkwell: theHorsemanStrikes.cost,
        deck: [simbaProtectiveCub],
      },
      {
        play: [simbaProtectiveCub],
      },
    );
    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", "p2");

    const playResult = testEngine.asPlayerOne().playCard(theHorsemanStrikes, {
      resolveOptional: true,
      targets: [simbaId],
    });

    expect(playResult).not.toBeSuccessfulCommand();
  });
});
