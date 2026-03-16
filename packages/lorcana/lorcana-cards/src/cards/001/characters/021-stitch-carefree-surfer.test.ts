import { describe, expect, it } from "bun:test";
import type { ZoneId } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { mickeyMouseTrueFriend, minnieMouseAlwaysClassy, simbaProtectiveCub } from ".";
import { stitchCarefreeSurfer } from "./021-stitch-carefree-surfer";

describe("Stitch - Carefree Surfer", () => {
  it("checks Ohana when the bag effect resolves", () => {
    const noDrawEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stitchCarefreeSurfer],
      inkwell: stitchCarefreeSurfer.cost,
      deck: 2,
      play: [simbaProtectiveCub, minnieMouseAlwaysClassy],
    });

    expect(noDrawEngine.asPlayerOne().playCard(stitchCarefreeSurfer)).toBeSuccessfulCommand();
    expect(noDrawEngine.asPlayerOne().getBagCount()).toBe(1);

    const minnieId = noDrawEngine.findCardInstanceId(minnieMouseAlwaysClassy, "play", PLAYER_ONE);
    expect(
      noDrawEngine.asServer().manualMoveCard(minnieId, `discard:${PLAYER_ONE}` as ZoneId).success,
    ).toBe(true);
    expect(
      noDrawEngine.asPlayerOne().resolveBag(noDrawEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
      }).success,
    ).toBe(true);
    expect(noDrawEngine.asPlayerOne().getZonesCardCount().hand).toBe(0);

    const drawEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stitchCarefreeSurfer, minnieMouseAlwaysClassy],
      inkwell: stitchCarefreeSurfer.cost,
      deck: 2,
      play: [simbaProtectiveCub],
    });

    expect(drawEngine.asPlayerOne().playCard(stitchCarefreeSurfer)).toBeSuccessfulCommand();
    expect(drawEngine.asPlayerOne().getBagCount()).toBe(1);

    const minnieInHandId = drawEngine.findCardInstanceId(
      minnieMouseAlwaysClassy,
      "hand",
      PLAYER_ONE,
    );
    expect(
      drawEngine.asServer().manualMoveCard(minnieInHandId, `play:${PLAYER_ONE}` as ZoneId).success,
    ).toBe(true);
    expect(
      drawEngine.asPlayerOne().resolveBag(drawEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
      }).success,
    ).toBe(true);
    expect(drawEngine.asPlayerOne().getZonesCardCount().hand).toBe(2);
  });
});
