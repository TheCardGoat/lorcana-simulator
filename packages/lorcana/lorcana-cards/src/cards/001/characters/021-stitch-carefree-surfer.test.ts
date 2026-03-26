import { describe, expect, it } from "bun:test";
import type { ZoneId } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE } from "@tcg/lorcana-engine/testing";
import { minnieMouseAlwaysClassy, simbaProtectiveCub } from ".";
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

    const noTriggerEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stitchCarefreeSurfer],
      inkwell: stitchCarefreeSurfer.cost,
      deck: 2,
      play: [simbaProtectiveCub],
    });

    expect(noTriggerEngine.asPlayerOne().playCard(stitchCarefreeSurfer)).toBeSuccessfulCommand();
    expect(noTriggerEngine.asPlayerOne().getBagCount()).toBe(0);
  });
});
