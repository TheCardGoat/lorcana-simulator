import { describe, expect, it } from "bun:test";

import { dispatchDropIntent, type DropActionGame } from "./simulator-dnd-dispatch.js";

function createDropActionGame(
  overrides: Partial<Parameters<typeof dispatchDropIntent>[0]["game"]> = {},
) {
  return {
    openPlayCardSelection: () => false,
    playCard: () => false,
    ink: () => false,
    shouldOpenPlayCardSelectionOnDrop: () => false,
    canDropHandCardIntoZone: () => false,
    canPlayCardOnTarget: () => false,
    canMoveCharacterToLocation: () => false,
    executeMove: () => false,
    ...overrides,
  };
}

describe("dispatchDropIntent", () => {
  it("opens play selection instead of executing immediately for bodyguard-style play variants", () => {
    const calls: string[] = [];
    const result = dispatchDropIntent({
      cardId: "bodyguard",
      dropIntent: {
        kind: "zone",
        playerSide: "playerOne",
        zoneId: "play",
      },
      draggedCardKind: "hand",
      ownerSide: "playerOne",
      game: createDropActionGame({
        canDropHandCardIntoZone: () => true,
        shouldOpenPlayCardSelectionOnDrop: () => true,
        openPlayCardSelection: () => {
          calls.push("openPlayCardSelection");
          return true;
        },
        playCard: () => {
          calls.push("playCard");
          return true;
        },
      }),
    });

    expect(result).toBe(true);
    expect(calls).toEqual(["openPlayCardSelection"]);
  });

  it("still executes immediate play for single-variant hand drops", () => {
    const calls: string[] = [];
    const result = dispatchDropIntent({
      cardId: "vanilla",
      dropIntent: {
        kind: "zone",
        playerSide: "playerOne",
        zoneId: "play",
      },
      draggedCardKind: "hand",
      ownerSide: "playerOne",
      game: createDropActionGame({
        canDropHandCardIntoZone: () => true,
        playCard: () => {
          calls.push("playCard");
          return true;
        },
      }),
    });

    expect(result).toBe(true);
    expect(calls).toEqual(["playCard"]);
  });

  it("preserves targeted drag behavior by opening play selection with the dropped target", () => {
    const calls: Array<{ kind: string; targetCardId?: string }> = [];
    const result = dispatchDropIntent({
      cardId: "bodyguardAction",
      dropIntent: {
        kind: "card",
        playerSide: "playerOne",
        zoneId: "play",
        targetCardId: "target-card",
      },
      draggedCardKind: "hand-targeted-action",
      ownerSide: "playerOne",
      game: createDropActionGame({
        canPlayCardOnTarget: () => true,
        openPlayCardSelection: (
          _cardId: string,
          options?: Parameters<DropActionGame["openPlayCardSelection"]>[1],
        ) => {
          calls.push({ kind: "openPlayCardSelection", targetCardId: options?.targetCardId });
          return true;
        },
      }),
    });

    expect(result).toBe(true);
    expect(calls).toEqual([{ kind: "openPlayCardSelection", targetCardId: "target-card" }]);
  });
});
