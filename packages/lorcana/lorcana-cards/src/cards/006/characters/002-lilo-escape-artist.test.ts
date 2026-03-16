import { describe, expect, it } from "bun:test";
import { CANONICAL_PLAYER_ONE } from "@tcg/core/testing";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { simbaProtectiveCub } from "../../001";
import { liloRockStar } from "../../011";
import { liloEscapeArtist } from "./002-lilo-escape-artist";

describe("Lilo - Escape Artist", () => {
  it("can be played from discard at the start of your turn and enters play exerted", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        discard: [liloEscapeArtist],
        inkwell: liloEscapeArtist.cost,
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
      {
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(testEngine.asPlayerOne().getAvailableInk(CANONICAL_PLAYER_ONE)).toBe(
      liloEscapeArtist.cost,
    );
    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
      }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(liloEscapeArtist)).toBe("play");
    expect(testEngine.asPlayerOne().isExerted(liloEscapeArtist)).toBe(true);
    expect(testEngine.asPlayerOne().getAvailableInk(CANONICAL_PLAYER_ONE)).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        play: 1,
        discard: 0,
      }),
    );
  });

  it("creates one trigger per copy in your discard", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        discard: [liloEscapeArtist, liloEscapeArtist],
        inkwell: liloEscapeArtist.cost * 2,
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
      {
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
    expect(testEngine.asPlayerOne().getAvailableInk(CANONICAL_PLAYER_ONE)).toBe(
      liloEscapeArtist.cost * 2,
    );

    const [firstBagEffect, secondBagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(
      testEngine.asPlayerOne().resolveBag(firstBagEffect!.id, { resolveOptional: true }).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getAvailableInk(CANONICAL_PLAYER_ONE)).toBe(
      liloEscapeArtist.cost,
    );
    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        play: 1,
        discard: 1,
      }),
    );

    expect(
      testEngine.asPlayerOne().resolveBag(secondBagEffect!.id, { resolveOptional: true }).success,
    ).toBe(true);
    expect(testEngine.asPlayerOne().getAvailableInk(CANONICAL_PLAYER_ONE)).toBe(0);
    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        play: 2,
        discard: 0,
      }),
    );
  });

  it("replays the triggering Escape Artist copy instead of another Lilo in discard", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        discard: [liloEscapeArtist, liloRockStar],
        inkwell: liloEscapeArtist.cost,
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
      {
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(
      testEngine.asPlayerOne().resolveBag(bagEffect!.id, { resolveOptional: true }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getCardZone(liloEscapeArtist)).toBe("play");
    expect(testEngine.asPlayerOne().getCardZone(liloRockStar)).toBe("discard");
  });

  it("does not resolve if you cannot pay her cost", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        discard: [liloEscapeArtist],
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
      {
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();

    const [bagEffect] = testEngine.asPlayerOne().getBagEffects();
    expect(
      testEngine.asPlayerOne().resolveBag(bagEffect!.id, { resolveOptional: true }).success,
    ).toBe(true);

    expect(testEngine.asPlayerOne().getAvailableInk(CANONICAL_PLAYER_ONE)).toBe(0);
    expect(testEngine.asPlayerOne().getCardZone(liloEscapeArtist)).toBe("discard");
    expect(testEngine.asPlayerOne().getZonesCardCount()).toEqual(
      expect.objectContaining({
        play: 0,
        discard: 1,
      }),
    );
  });

  it("does not trigger while already in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [liloEscapeArtist],
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
      {
        deck: [simbaProtectiveCub, simbaProtectiveCub],
      },
    );

    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getCardZone(liloEscapeArtist)).toBe("play");
  });
});
