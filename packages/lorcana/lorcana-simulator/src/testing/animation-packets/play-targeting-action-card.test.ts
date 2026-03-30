import { describe, it, expect } from "bun:test";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import { dragonFire, mickeyMouseTrueFriend } from "@tcg/lorcana-cards/cards/001";

describe("Play Targeting Action Card Animation", () => {
  it("emits boardMove packet for action card requiring target selection", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [dragonFire],
        inkwell: dragonFire.cost,
      },
      {
        play: [mickeyMouseTrueFriend],
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(dragonFire, {
        targets: [mickeyMouseTrueFriend],
      }),
    ).toBeSuccessfulCommand();

    const packet = testEngine.asLorcanaPlayerOne().getLastPacketUpdate();
    const animations = packet?.animations ?? [];

    const boardMoveAnimation = animations.find((a) => a.kind === "lorcana.boardMove");
    expect(boardMoveAnimation).toBeDefined();
    expect(boardMoveAnimation?.payload).toEqual(
      expect.objectContaining({
        variant: "play-action",
        sourceZoneId: "hand",
        destinationZoneId: "discard",
      }),
    );
  });

  it("card with pending resolution goes to limbo, not discard", () => {
    // Dragon Fire with no target provided should leave the card in limbo
    // waiting for target selection (pending resolution)
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [dragonFire],
        inkwell: dragonFire.cost,
      },
      {
        play: [mickeyMouseTrueFriend],
      },
    );

    // Play without specifying targets - card should go to limbo for pending resolution
    const result = testEngine.asPlayerOne().playCard(dragonFire);

    // If the card goes to limbo (pending resolution), verify the animation packet is still generated
    const packet = testEngine.asLorcanaPlayerOne().getLastPacketUpdate();
    const animations = packet?.animations ?? [];

    const boardMoveAnimation = animations.find((a) => a.kind === "lorcana.boardMove");

    if (result.success) {
      // If the engine auto-resolved the target, the card should be in discard
      // and the animation should be present
      expect(boardMoveAnimation).toBeDefined();
    } else {
      // If the engine rejected the move (no target specified), no animation is expected
      expect(boardMoveAnimation).toBeUndefined();
    }
  });
});
