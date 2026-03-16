import { describe, expect, it } from "bun:test";

import { canDragHandCard } from "@/features/simulator/context/simulator-dnd-context.svelte.js";
import type {
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";

function createCardSnapshot(args: {
  cardId: string;
  ownerSide?: LorcanaPlayerSide;
  zoneId?: LorcanaZoneId;
}): LorcanaCardSnapshot {
  return {
    cardId: args.cardId,
    definitionId: `def-${args.cardId}`,
    isMasked: false,
    label: args.cardId,
    ownerId: "player-id",
    ownerSide: args.ownerSide ?? "playerOne",
    zoneId: args.zoneId ?? "hand",
    facePresentation: "faceUp",
  };
}

describe("simulator dnd", () => {
  it("allows owned hand cards only on that player's turn", () => {
    const card = createCardSnapshot({ cardId: "c1" });

    expect(
      canDragHandCard({
        card,
        playableCardIds: ["c1"],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(true);

    expect(
      canDragHandCard({
        card: createCardSnapshot({ cardId: "c1", ownerSide: "playerTwo" }),
        playableCardIds: ["c1"],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);

    expect(
      canDragHandCard({
        card,
        playableCardIds: ["c1"],
        ownerSide: "playerOne",
        turnSide: "playerTwo",
      }),
    ).toBe(false);
  });

  it("rejects cards that are not in the playable hand card set", () => {
    expect(
      canDragHandCard({
        card: createCardSnapshot({ cardId: "missing" }),
        playableCardIds: [],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);
  });

  it("rejects cards outside the hand", () => {
    expect(
      canDragHandCard({
        card: createCardSnapshot({ cardId: "c1", zoneId: "play" }),
        playableCardIds: ["c1"],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);
  });
});
