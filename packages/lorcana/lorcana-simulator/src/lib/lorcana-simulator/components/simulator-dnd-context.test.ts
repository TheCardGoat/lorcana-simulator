import { describe, expect, it, mock } from "bun:test";

import {
  canDragHandCard,
  canDragMoveToLocationCard,
  canDragSimulatorCard,
  canDropCharacterAtLocation,
  createCardDropZoneId,
  createLocationDropZoneId,
  createZoneDropZoneId,
  dispatchDropIntent,
  resolveDropIntentFromElements,
  resolveDropIntentFromTargetId,
} from "@/features/simulator/context/simulator-dnd-context.svelte.js";
import type {
  ExecutableMoveEntry,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaZoneId,
} from "@/features/simulator/model/contracts.js";

class FakeDropElement {
  dataset: {
    cardDropId?: string;
    locationDropId?: string;
    playerSide?: string;
    zoneId?: string;
  };
  parent: FakeDropElement | null;

  constructor(
    dataset: {
      cardDropId?: string;
      locationDropId?: string;
      playerSide?: string;
      zoneId?: string;
    } = {},
    parent: FakeDropElement | null = null,
  ) {
    this.dataset = dataset;
    this.parent = parent;
  }

  closest(selector: string): FakeDropElement | null {
    let current: FakeDropElement | null = this;
    while (current) {
      if (
        selector === "[data-card-drop-id][data-player-side][data-zone-id]" &&
        current.dataset.cardDropId &&
        current.dataset.playerSide &&
        current.dataset.zoneId
      ) {
        return current;
      }

      if (
        selector === "[data-location-drop-id][data-player-side]" &&
        current.dataset.locationDropId &&
        current.dataset.playerSide
      ) {
        return current;
      }

      if (
        selector === "[data-zone-id][data-player-side]" &&
        current.dataset.zoneId &&
        current.dataset.playerSide
      ) {
        return current;
      }

      current = current.parent;
    }

    return null;
  }
}

function createCardSnapshot(args: {
  cardId: string;
  ownerSide?: LorcanaPlayerSide;
  zoneId?: LorcanaZoneId;
  cardType?: LorcanaCardSnapshot["cardType"];
}): LorcanaCardSnapshot {
  return {
    cardId: args.cardId,
    definitionId: `def-${args.cardId}`,
    isMasked: false,
    label: args.cardId,
    ownerId: "player-id",
    ownerSide: args.ownerSide ?? "playerOne",
    zoneId: args.zoneId ?? "hand",
    cardType: args.cardType,
    facePresentation: "faceUp",
  };
}

function createMoveToLocationMove(args: {
  characterId: string;
  locationId: string;
}): ExecutableMoveEntry {
  return {
    id: `moveCharacterToLocation:${args.characterId}:${args.locationId}`,
    label: `${args.characterId} -> ${args.locationId}`,
    moveId: "moveCharacterToLocation",
    params: {
      characterId: args.characterId,
      locationId: args.locationId,
    },
    presentation: {
      kind: "targeted",
      categoryId: "move-to-location",
      categoryLabel: "Move to Location",
      optionLabel: `${args.characterId} -> ${args.locationId}`,
    },
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

  it("rejects hand-dragging cards outside the hand", () => {
    expect(
      canDragHandCard({
        card: createCardSnapshot({ cardId: "c1", zoneId: "play" }),
        playableCardIds: ["c1"],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);
  });

  it("allows owned play-zone characters with legal move-to-location targets", () => {
    const card = createCardSnapshot({
      cardId: "simba",
      zoneId: "play",
      cardType: "character",
    });
    const executableMoves = [
      createMoveToLocationMove({ characterId: "simba", locationId: "pride-lands" }),
    ];

    expect(
      canDragMoveToLocationCard({
        card,
        executableMoves,
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(true);

    expect(
      canDragSimulatorCard({
        card,
        executableMoves,
        playableCardIds: [],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(true);
  });

  it("rejects move-to-location dragging for illegal play cards", () => {
    const executableMoves = [
      createMoveToLocationMove({ characterId: "simba", locationId: "pride-lands" }),
    ];

    expect(
      canDragMoveToLocationCard({
        card: createCardSnapshot({
          cardId: "item-1",
          zoneId: "play",
          cardType: "item",
        }),
        executableMoves,
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);

    expect(
      canDragMoveToLocationCard({
        card: createCardSnapshot({
          cardId: "simba",
          zoneId: "play",
          cardType: "character",
          ownerSide: "playerTwo",
        }),
        executableMoves,
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);

    expect(
      canDragMoveToLocationCard({
        card: createCardSnapshot({
          cardId: "simba",
          zoneId: "play",
          cardType: "character",
        }),
        executableMoves: [],
        ownerSide: "playerOne",
        turnSide: "playerOne",
      }),
    ).toBe(false);
  });

  it("matches legal character-location pairs from executable moves", () => {
    const executableMoves = [
      createMoveToLocationMove({ characterId: "simba", locationId: "pride-lands" }),
      createMoveToLocationMove({ characterId: "simba", locationId: "motunui" }),
    ];

    expect(
      canDropCharacterAtLocation({
        characterId: "simba",
        locationId: "pride-lands",
        executableMoves,
      }),
    ).toBe(true);

    expect(
      canDropCharacterAtLocation({
        characterId: "nala",
        locationId: "pride-lands",
        executableMoves,
      }),
    ).toBe(false);
  });

  it("parses zone and location drop ids", () => {
    expect(resolveDropIntentFromTargetId(createZoneDropZoneId("play", "playerOne"))).toEqual({
      kind: "zone",
      playerSide: "playerOne",
      zoneId: "play",
    });

    expect(
      resolveDropIntentFromTargetId(createLocationDropZoneId("pride-lands", "playerOne")),
    ).toEqual({
      kind: "location",
      playerSide: "playerOne",
      zoneId: "play",
      locationId: "pride-lands",
    });

    expect(resolveDropIntentFromTargetId(createCardDropZoneId("target-1", "playerTwo"))).toEqual({
      kind: "card",
      playerSide: "playerTwo",
      zoneId: "play",
      targetCardId: "target-1",
    });
  });

  it("prefers location-target metadata over the parent play zone for play-character cards", () => {
    const zone = new FakeDropElement({
      zoneId: "play",
      playerSide: "playerOne",
    });
    const location = new FakeDropElement(
      {
        locationDropId: "pride-lands",
        playerSide: "playerOne",
      },
      zone,
    );
    const content = new FakeDropElement({}, location);

    expect(
      resolveDropIntentFromElements({
        elements: [content, zone],
        ownerSide: "playerOne",
        draggedCardKind: "play-character",
      }),
    ).toEqual({
      kind: "location",
      playerSide: "playerOne",
      zoneId: "play",
      locationId: "pride-lands",
    });
  });

  it("prefers zone fallback over location for hand cards to prevent drops being ignored", () => {
    const zone = new FakeDropElement({
      zoneId: "play",
      playerSide: "playerOne",
    });
    const location = new FakeDropElement(
      {
        locationDropId: "pride-lands",
        playerSide: "playerOne",
      },
      zone,
    );
    const content = new FakeDropElement({}, location);

    // Hand cards should get zone fallback, not location intent
    // This prevents hand cards from being "dropped on the floor" when hovering over locations
    expect(
      resolveDropIntentFromElements({
        elements: [content, zone],
        ownerSide: "playerOne",
        draggedCardKind: "hand",
      }),
    ).toEqual({
      kind: "zone",
      playerSide: "playerOne",
      zoneId: "play",
    });

    // Same for null/undefined draggedCardKind
    expect(
      resolveDropIntentFromElements({
        elements: [content, zone],
        ownerSide: "playerOne",
        draggedCardKind: null,
      }),
    ).toEqual({
      kind: "zone",
      playerSide: "playerOne",
      zoneId: "play",
    });
  });

  it("prefers card targets over the parent play zone for targeted hand actions", () => {
    const zone = new FakeDropElement({
      zoneId: "play",
      playerSide: "playerOne",
    });
    const card = new FakeDropElement(
      {
        cardDropId: "target-1",
        playerSide: "playerTwo",
        zoneId: "play",
      },
      zone,
    );
    const content = new FakeDropElement({}, card);

    expect(
      resolveDropIntentFromElements({
        elements: [content, zone],
        ownerSide: "playerOne",
        draggedCardKind: "hand-targeted-action",
      }),
    ).toEqual({
      kind: "card",
      playerSide: "playerTwo",
      zoneId: "play",
      targetCardId: "target-1",
    });
  });

  it("dispatches direct move-to-location drops through executeMove", () => {
    const openPlayCardSelection = mock(() => true);
    const playCard = mock(() => true);
    const ink = mock(() => true);
    const canDropHandCardIntoZone = mock(() => false);
    const canPlayCardOnTarget = mock(() => false);
    const canMoveCharacterToLocation = mock(
      (characterId: string, locationId: string) =>
        characterId === "simba" && locationId === "pride-lands",
    );
    const executeMove = mock(() => true);

    expect(
      dispatchDropIntent({
        cardId: "simba",
        dropIntent: {
          kind: "location",
          playerSide: "playerOne",
          zoneId: "play",
          locationId: "pride-lands",
        },
        draggedCardKind: "play-character",
        ownerSide: "playerOne",
        game: {
          openPlayCardSelection,
          playCard,
          ink,
          canDropHandCardIntoZone,
          canPlayCardOnTarget,
          canMoveCharacterToLocation,
          executeMove,
        },
      }),
    ).toBe(true);

    expect(executeMove).toHaveBeenCalledWith(
      "moveCharacterToLocation",
      {
        characterId: "simba",
        locationId: "pride-lands",
      },
      {
        clearChallengeMode: true,
        clearSelection: true,
      },
    );
    expect(playCard).not.toHaveBeenCalled();
    expect(ink).not.toHaveBeenCalled();
    expect(openPlayCardSelection).not.toHaveBeenCalled();
  });

  it("ignores illegal direct location drops", () => {
    const openPlayCardSelection = mock(() => true);
    const playCard = mock(() => true);
    const ink = mock(() => true);
    const canDropHandCardIntoZone = mock(() => false);
    const canPlayCardOnTarget = mock(() => false);
    const canMoveCharacterToLocation = mock(() => false);
    const executeMove = mock(() => true);

    expect(
      dispatchDropIntent({
        cardId: "simba",
        dropIntent: {
          kind: "location",
          playerSide: "playerOne",
          zoneId: "play",
          locationId: "forbidden-peak",
        },
        draggedCardKind: "play-character",
        ownerSide: "playerOne",
        game: {
          openPlayCardSelection,
          playCard,
          ink,
          canDropHandCardIntoZone,
          canPlayCardOnTarget,
          canMoveCharacterToLocation,
          executeMove,
        },
      }),
    ).toBe(false);

    expect(executeMove).not.toHaveBeenCalled();
    expect(openPlayCardSelection).not.toHaveBeenCalled();
  });

  it("dispatches hand drops based on canDropHandCardIntoZone rather than dragged kind", () => {
    const openPlayCardSelection = mock(() => true);
    const playCard = mock(() => true);
    const ink = mock(() => true);
    const canDropHandCardIntoZone = mock(
      (_cardId: string, zoneId: "play" | "inkwell") => zoneId === "play",
    );
    const canPlayCardOnTarget = mock(() => false);
    const canMoveCharacterToLocation = mock(() => false);
    const executeMove = mock(() => true);

    expect(
      dispatchDropIntent({
        cardId: "hand-card",
        dropIntent: {
          kind: "zone",
          playerSide: "playerOne",
          zoneId: "play",
        },
        draggedCardKind: null,
        ownerSide: "playerOne",
        game: {
          openPlayCardSelection,
          playCard,
          ink,
          canDropHandCardIntoZone,
          canPlayCardOnTarget,
          canMoveCharacterToLocation,
          executeMove,
        },
      }),
    ).toBe(true);

    expect(playCard).toHaveBeenCalledWith("hand-card");
    expect(ink).not.toHaveBeenCalled();
    expect(executeMove).not.toHaveBeenCalled();
    expect(openPlayCardSelection).not.toHaveBeenCalled();
  });

  it("opens targeted play-card selection with the dropped target when the target is legal", () => {
    const openPlayCardSelection = mock(() => true);
    const playCard = mock(() => true);
    const ink = mock(() => true);
    const canDropHandCardIntoZone = mock(() => false);
    const canPlayCardOnTarget = mock(() => true);
    const canMoveCharacterToLocation = mock(() => false);
    const executeMove = mock(() => true);

    expect(
      dispatchDropIntent({
        cardId: "smash",
        dropIntent: {
          kind: "card",
          playerSide: "playerTwo",
          zoneId: "play",
          targetCardId: "target-1",
        },
        draggedCardKind: "hand-targeted-action",
        ownerSide: "playerOne",
        game: {
          openPlayCardSelection,
          playCard,
          ink,
          canDropHandCardIntoZone,
          canPlayCardOnTarget,
          canMoveCharacterToLocation,
          executeMove,
        },
      }),
    ).toBe(true);

    expect(openPlayCardSelection).toHaveBeenCalledWith("smash", { targetCardId: "target-1" });
    expect(playCard).not.toHaveBeenCalled();
    expect(ink).not.toHaveBeenCalled();
  });

  it("falls back to the normal play flow when a targeted card drop is illegal", () => {
    const openPlayCardSelection = mock(() => true);
    const playCard = mock(() => true);
    const ink = mock(() => true);
    const canDropHandCardIntoZone = mock(() => false);
    const canPlayCardOnTarget = mock(() => false);
    const canMoveCharacterToLocation = mock(() => false);
    const executeMove = mock(() => true);

    expect(
      dispatchDropIntent({
        cardId: "smash",
        dropIntent: {
          kind: "card",
          playerSide: "playerTwo",
          zoneId: "play",
          targetCardId: "warded",
        },
        draggedCardKind: "hand-targeted-action",
        ownerSide: "playerOne",
        game: {
          openPlayCardSelection,
          playCard,
          ink,
          canDropHandCardIntoZone,
          canPlayCardOnTarget,
          canMoveCharacterToLocation,
          executeMove,
        },
      }),
    ).toBe(true);

    expect(openPlayCardSelection).toHaveBeenCalledWith("smash");
    expect(playCard).not.toHaveBeenCalled();
  });

  it("opens the normal play flow on bare play-zone drops for targeted hand actions", () => {
    const openPlayCardSelection = mock(() => true);
    const playCard = mock(() => true);
    const ink = mock(() => true);
    const canDropHandCardIntoZone = mock(() => true);
    const canPlayCardOnTarget = mock(() => false);
    const canMoveCharacterToLocation = mock(() => false);
    const executeMove = mock(() => true);

    expect(
      dispatchDropIntent({
        cardId: "smash",
        dropIntent: {
          kind: "zone",
          playerSide: "playerOne",
          zoneId: "play",
        },
        draggedCardKind: "hand-targeted-action",
        ownerSide: "playerOne",
        game: {
          openPlayCardSelection,
          playCard,
          ink,
          canDropHandCardIntoZone,
          canPlayCardOnTarget,
          canMoveCharacterToLocation,
          executeMove,
        },
      }),
    ).toBe(true);

    expect(openPlayCardSelection).toHaveBeenCalledWith("smash");
    expect(playCard).not.toHaveBeenCalled();
  });
});
