import { describe, expect, it } from "bun:test";
import type {
  EnginePacketUpdate,
  LorcanaProjectedBoardView,
  LorcanaProjectedCard,
  PlayerId,
} from "@tcg/lorcana-engine";
import type {
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaSimulatorMoveId,
  LorcanaZoneId,
  MoveLogEntrySnapshot,
} from "@/features/simulator/model/contracts.js";
import {
  BOARD_CENTER_ANCHOR_ID,
  createCardAnchorId,
  createSeatHandAnchorId,
  createZoneAnchorId,
  deriveQueuedBoardMoveAnimations,
  deriveQueuedBoardMoveAnimationsFromPacket,
  getNewMoveLogEntries,
  resolveQueuedBoardMoveAnimation,
  type BoardAnchorSnapshot,
  type BoardMoveAnimationVariant,
} from "@/features/simulator/animations/board-move-animations.js";

function asPlayerId(value: string): PlayerId {
  return value as PlayerId;
}

function toProjectedZone(zoneId: LorcanaZoneId): LorcanaProjectedCard["zone"] {
  if (zoneId === "deck" || zoneId === "limbo") {
    return "hand";
  }

  return zoneId;
}

const PLAYER_IDS: Record<LorcanaPlayerSide, PlayerId> = {
  playerOne: asPlayerId("player-one-id"),
  playerTwo: asPlayerId("player-two-id"),
};

function createCard(
  cardId: string,
  overrides: Partial<LorcanaCardSnapshot> = {},
): LorcanaCardSnapshot {
  const ownerSide = overrides.ownerSide ?? "playerOne";
  const zoneId = overrides.zoneId ?? "hand";

  return {
    cardId,
    cardNumber: 1,
    cardType: "character",
    cost: 2,
    definitionId: overrides.definitionId ?? `${cardId}-definition`,
    facePresentation: "faceUp",
    isMasked: false,
    label: overrides.label ?? cardId,
    ownerId: PLAYER_IDS[ownerSide],
    ownerSide,
    readyState: "ready",
    zoneId,
    ...overrides,
  };
}

function createZone(
  _side: LorcanaPlayerSide,
  _zoneId: LorcanaZoneId,
  cards: LorcanaCardSnapshot[] = [],
  overrides: { isMasked?: boolean; totalCards?: number; view?: string } = {},
) {
  return {
    cards,
    totalCards: overrides.totalCards ?? cards.length,
    ...overrides,
  };
}

const SNAPSHOT_DISPLAY_CARDS = new WeakMap<
  LorcanaProjectedBoardView,
  Map<string, LorcanaCardSnapshot>
>();

function createSnapshot(
  options: {
    view?: string;
    playerOne?: Partial<Record<LorcanaZoneId, ReturnType<typeof createZone>>>;
    playerTwo?: Partial<Record<LorcanaZoneId, ReturnType<typeof createZone>>>;
  } = {},
): LorcanaProjectedBoardView {
  const cards = new Map<string, LorcanaCardSnapshot>();
  const createPlayerBoard = (
    side: LorcanaPlayerSide,
    zones: Partial<Record<LorcanaZoneId, ReturnType<typeof createZone>>> = {},
  ) => {
    const hand = zones.hand?.cards ?? [];
    const play = zones.play?.cards ?? [];
    const inkwell = zones.inkwell?.cards ?? [];
    const discard = zones.discard?.cards ?? [];

    for (const card of [...hand, ...play, ...inkwell, ...discard]) {
      cards.set(card.cardId, card);
    }

    return {
      canAddCardToInkwell: false,
      lore: 0,
      handCount: zones.hand?.totalCards ?? hand.length,
      deckCount: zones.deck?.totalCards ?? 0,
      hand: hand.map((card) => card.cardId),
      play: play.map((card) => card.cardId),
      inkwell: inkwell.map((card) => card.cardId),
      discard: discard.map((card) => card.cardId),
    };
  };

  const board: LorcanaProjectedBoardView = {
    activeEffects: [],
    cards: Object.fromEntries(
      Array.from(cards.values()).map((card) => [
        card.cardId,
        {
          id: card.cardId,
          ownerId: asPlayerId(card.ownerId),
          zone: toProjectedZone(card.zoneId),
          hidden: card.isMasked || card.facePresentation === "faceDown",
          definitionId: card.definitionId ?? card.cardId,
          fullName: card.label ?? card.cardId,
          exerted: card.readyState === "exerted",
          drying: card.isDrying ?? false,
          damage: card.damage ?? 0,
          strength: card.strength,
          willpower: card.willpower,
          lore: card.loreValue,
          moveCost: card.moveCost,
        },
      ]),
    ),
    choosingFirstPlayer: null,
    gameID: "game-1",
    matchID: "match-1",
    openingTurnPlayer: null,
    pendingEffects: [],
    bagEffects: [],
    pendingMulligan: [],
    phase: "mainPhase",
    playerOrder: [PLAYER_IDS.playerOne, PLAYER_IDS.playerTwo],
    players: {
      [PLAYER_IDS.playerOne]: createPlayerBoard("playerOne", options.playerOne),
      [PLAYER_IDS.playerTwo]: createPlayerBoard("playerTwo", options.playerTwo),
    },
    priorityPlayer: PLAYER_IDS.playerOne,
    reason: null,
    stateID: 1,
    status: "playing",
    step: null,
    timerView: { serverTimestamp: 0 },
    turnNumber: 1,
    turnPlayer: PLAYER_IDS.playerOne,
    winner: null,
  };

  board.cards = Object.fromEntries(
    Array.from(cards.values()).map((card) => [
      card.cardId,
      {
        id: card.cardId,
        ownerId: asPlayerId(card.ownerId),
        zone: toProjectedZone(card.zoneId),
        hidden: card.isMasked || card.facePresentation === "faceDown",
        definitionId: card.definitionId ?? card.cardId,
        fullName: card.label ?? card.cardId,
        exerted: card.readyState === "exerted",
        drying: card.isDrying ?? false,
        damage: card.damage ?? 0,
        strength: card.strength,
        willpower: card.willpower,
        lore: card.loreValue,
        moveCost: card.moveCost,
      },
    ]),
  );

  SNAPSHOT_DISPLAY_CARDS.set(board, cards);
  return board;
}

function createResolver(...snapshots: LorcanaProjectedBoardView[]) {
  return (cardId: string): LorcanaCardSnapshot | null => {
    for (let index = snapshots.length - 1; index >= 0; index -= 1) {
      const snapshot = snapshots[index];
      const match = SNAPSHOT_DISPLAY_CARDS.get(snapshot)?.get(cardId);
      if (match) {
        return match;
      }
    }

    return null;
  };
}

function createMoveLogEntry(options: {
  id: string;
  actorSide?: LorcanaPlayerSide;
  moveId: LorcanaSimulatorMoveId;
  cardId: string;
  timestamp?: number;
}): MoveLogEntrySnapshot {
  const actorSide = options.actorSide ?? "playerOne";

  return {
    actorSide,
    id: options.id,
    moveId: options.moveId,
    rawLogRegistry: {
      move: {
        moveId: options.moveId,
        params: { cardId: options.cardId },
        playerId: PLAYER_IDS[actorSide],
        timestamp: options.timestamp ?? 1,
      },
      relatedLogEntries: [],
    },
    timestamp: options.timestamp ?? 1,
    title: options.moveId,
    turnNumber: 1,
  };
}

function createAnchorSnapshot(
  anchors: BoardAnchorSnapshot["anchors"],
  boardRect: BoardAnchorSnapshot["boardRect"] = {
    left: 100,
    top: 200,
    width: 1000,
    height: 600,
    centerX: 600,
    centerY: 500,
  },
): BoardAnchorSnapshot {
  return {
    anchors,
    boardRect,
    revision: 1,
  };
}

function createPacketUpdate(overrides: Partial<EnginePacketUpdate> = {}): EnginePacketUpdate {
  return {
    processedCommand: {
      commandID: "cmd-1",
      move: "playCard",
    },
    animations: [],
    ...overrides,
  };
}

describe("board move animations", () => {
  it("derives one face-down ink animation from new move log entries", () => {
    const cardId = "ink-card";
    const previousSnapshot = createSnapshot({
      playerOne: {
        hand: createZone("playerOne", "hand", [
          createCard(cardId, { ownerSide: "playerOne", zoneId: "hand" }),
        ]),
      },
    });
    const nextSnapshot = createSnapshot({
      playerOne: {
        inkwell: createZone("playerOne", "inkwell", [
          createCard(cardId, {
            facePresentation: "faceDown",
            ownerSide: "playerOne",
            zoneId: "inkwell",
          }),
        ]),
      },
    });
    const baselineEntry = createMoveLogEntry({
      cardId: "older-card",
      id: "older-log",
      moveId: "passTurn",
      timestamp: 1,
    });
    const inkEntry = createMoveLogEntry({
      cardId,
      id: "ink-log",
      moveId: "putCardIntoInkwell",
      timestamp: 2,
    });

    const newEntries = getNewMoveLogEntries([baselineEntry], [baselineEntry, inkEntry]);
    const animations = deriveQueuedBoardMoveAnimations(
      previousSnapshot,
      nextSnapshot,
      newEntries,
      createResolver(previousSnapshot, nextSnapshot),
    );

    expect(newEntries).toHaveLength(1);
    expect(animations).toHaveLength(1);
    expect(animations[0]?.variant).toBe("ink-faceDown");
    expect(animations[0]?.renderFace).toBe("faceDown");
    expect(animations[0]?.source.primaryId).toBe(createCardAnchorId("playerOne", "hand", cardId));
    expect(animations[0]?.destination.primaryId).toBe(
      createCardAnchorId("playerOne", "inkwell", cardId),
    );
  });

  it("falls back to raw card references when move params omit cardId", () => {
    const cardId = "ink-card";
    const previousSnapshot = createSnapshot({
      playerOne: {
        hand: createZone("playerOne", "hand", [
          createCard(cardId, { ownerSide: "playerOne", zoneId: "hand" }),
        ]),
      },
    });
    const nextSnapshot = createSnapshot({
      playerOne: {
        inkwell: createZone("playerOne", "inkwell", [
          createCard(cardId, {
            facePresentation: "faceDown",
            ownerSide: "playerOne",
            zoneId: "inkwell",
          }),
        ]),
      },
    });
    const inkEntry = createMoveLogEntry({
      cardId,
      id: "ink-log",
      moveId: "putCardIntoInkwell",
      timestamp: 2,
    });

    if (inkEntry.rawLogRegistry) {
      inkEntry.rawLogRegistry.move.params = {};
      inkEntry.rawLogRegistry.cardReferences = [
        createCard(cardId, {
          facePresentation: "faceDown",
          ownerSide: "playerOne",
          zoneId: "inkwell",
        }),
      ];
    }

    const animations = deriveQueuedBoardMoveAnimations(
      previousSnapshot,
      nextSnapshot,
      [inkEntry],
      createResolver(previousSnapshot, nextSnapshot),
    );

    expect(animations).toHaveLength(1);
    expect(animations[0]?.id).toBe(`${inkEntry.id}:ink:${cardId}`);
    expect(animations[0]?.destination.primaryId).toBe(
      createCardAnchorId("playerOne", "inkwell", cardId),
    );
  });

  it("derives queued animations from a server-authored packet", () => {
    const cardId = "action-card";
    const previousSnapshot = createSnapshot({
      playerOne: {
        hand: createZone("playerOne", "hand", [
          createCard(cardId, { cardType: "action", ownerSide: "playerOne", zoneId: "hand" }),
        ]),
      },
    });
    const nextSnapshot = createSnapshot({
      playerOne: {
        discard: createZone("playerOne", "discard", [
          createCard(cardId, { cardType: "action", ownerSide: "playerOne", zoneId: "discard" }),
        ]),
      },
    });

    const animations = deriveQueuedBoardMoveAnimationsFromPacket(
      previousSnapshot,
      nextSnapshot,
      createPacketUpdate({
        processedCommand: {
          commandID: "cmd-play",
          move: "playCard",
        },
        animations: [
          {
            id: "cmd-play:play:action-card",
            kind: "lorcana.boardMove",
            payload: {
              actorPlayerId: PLAYER_IDS.playerOne,
              actorSide: "playerOne",
              cardId,
              destinationZoneId: "discard",
              impactAt: "via",
              renderFace: "faceUp",
              sourceZoneId: "hand",
              variant: "play-action",
              viaAnchorId: BOARD_CENTER_ANCHOR_ID,
            },
          },
        ],
      }),
      createResolver(previousSnapshot, nextSnapshot),
    );

    expect(animations).toHaveLength(1);
    expect(animations[0]?.id).toBe("cmd-play:play:action-card");
    expect(animations[0]?.moveLogId).toBe("cmd-play");
    expect(animations[0]?.variant).toBe("play-action");
    expect(animations[0]?.destination.primaryId).toBe(
      createCardAnchorId("playerOne", "discard", cardId),
    );
  });

  it("does not re-enqueue animations for move log entries already seen", () => {
    const inkEntry = createMoveLogEntry({
      cardId: "ink-card",
      id: "ink-log",
      moveId: "putCardIntoInkwell",
      timestamp: 2,
    });

    expect(getNewMoveLogEntries([inkEntry], [inkEntry])).toEqual([]);
  });

  it("uses the concealed seat anchor when an opponent card leaves a masked hand", () => {
    const cardId = "opponent-character";
    const previousSnapshot = createSnapshot({
      view: "playerOne",
      playerTwo: {
        hand: createZone("playerTwo", "hand", [], {
          isMasked: true,
          totalCards: 1,
        }),
      },
    });
    const nextSnapshot = createSnapshot({
      view: "playerOne",
      playerTwo: {
        play: createZone("playerTwo", "play", [
          createCard(cardId, {
            cardType: "character",
            ownerSide: "playerTwo",
            zoneId: "play",
          }),
        ]),
      },
    });
    const playEntry = createMoveLogEntry({
      actorSide: "playerTwo",
      cardId,
      id: "play-log",
      moveId: "playCard",
      timestamp: 3,
    });

    const animations = deriveQueuedBoardMoveAnimations(
      previousSnapshot,
      nextSnapshot,
      [playEntry],
      createResolver(previousSnapshot, nextSnapshot),
    );

    expect(animations).toHaveLength(1);
    expect(animations[0]?.variant).toBe("play-character");
    expect(animations[0]?.source.primaryId).toBe(createSeatHandAnchorId("playerTwo"));
    expect(animations[0]?.destination.primaryId).toBe(
      createCardAnchorId("playerTwo", "play", cardId),
    );
  });

  it("maps play animations to the correct variant for each card type", () => {
    const cases: Array<{
      cardType: "character" | "item" | "location" | "action";
      expected: BoardMoveAnimationVariant;
      nextZone: "play" | "discard";
    }> = [
      { cardType: "character" as const, expected: "play-character", nextZone: "play" as const },
      { cardType: "item" as const, expected: "play-item", nextZone: "play" as const },
      { cardType: "location" as const, expected: "play-location", nextZone: "play" as const },
      { cardType: "action" as const, expected: "play-action", nextZone: "discard" as const },
    ];

    for (const [index, testCase] of cases.entries()) {
      const cardId = `${testCase.cardType}-card`;
      const previousSnapshot = createSnapshot({
        playerOne: {
          hand: createZone("playerOne", "hand", [
            createCard(cardId, {
              cardType: testCase.cardType,
              ownerSide: "playerOne",
              zoneId: "hand",
            }),
          ]),
        },
      });
      const nextSnapshot = createSnapshot({
        playerOne: {
          [testCase.nextZone]: createZone("playerOne", testCase.nextZone, [
            createCard(cardId, {
              cardType: testCase.cardType,
              ownerSide: "playerOne",
              zoneId: testCase.nextZone,
            }),
          ]),
        },
      });
      const playEntry = createMoveLogEntry({
        cardId,
        id: `play-log-${index}`,
        moveId: "playCard",
        timestamp: index + 10,
      });

      const animation = deriveQueuedBoardMoveAnimations(
        previousSnapshot,
        nextSnapshot,
        [playEntry],
        createResolver(previousSnapshot, nextSnapshot),
      )[0];

      expect(animation?.variant).toBe(testCase.expected);
      expect(animation?.destinationZoneId).toBe(testCase.nextZone);
      if (testCase.cardType === "action") {
        expect(animation?.via?.primaryId).toBe(BOARD_CENTER_ANCHOR_ID);
      }
    }
  });

  it("resolves animations using previous source anchors and next destination anchors", () => {
    const cardId = "action-card";
    const previousSnapshot = createSnapshot({
      playerOne: {
        hand: createZone("playerOne", "hand", [
          createCard(cardId, {
            cardType: "action",
            ownerSide: "playerOne",
            zoneId: "hand",
          }),
        ]),
      },
    });
    const nextSnapshot = createSnapshot({
      playerOne: {
        discard: createZone("playerOne", "discard", [
          createCard(cardId, {
            cardType: "action",
            ownerSide: "playerOne",
            zoneId: "discard",
          }),
        ]),
      },
    });
    const actionEntry = createMoveLogEntry({
      cardId,
      id: "action-log",
      moveId: "playCard",
      timestamp: 99,
    });
    const queuedAnimation = deriveQueuedBoardMoveAnimations(
      previousSnapshot,
      nextSnapshot,
      [actionEntry],
      createResolver(previousSnapshot, nextSnapshot),
    )[0];

    const previousAnchors = createAnchorSnapshot({
      [createCardAnchorId("playerOne", "hand", cardId)]: {
        centerX: 190,
        centerY: 260,
        height: 120,
        left: 150,
        top: 200,
        width: 80,
      },
    });
    const nextAnchors = createAnchorSnapshot({
      [BOARD_CENTER_ANCHOR_ID]: {
        centerX: 620,
        centerY: 430,
        height: 128,
        left: 574,
        top: 366,
        width: 92,
      },
      [createCardAnchorId("playerOne", "discard", cardId)]: {
        centerX: 1035,
        centerY: 325,
        height: 70,
        left: 1010,
        top: 290,
        width: 50,
      },
      [createZoneAnchorId("playerOne", "discard")]: {
        centerX: 1035,
        centerY: 325,
        height: 70,
        left: 1010,
        top: 290,
        width: 50,
      },
    });

    const resolvedAnimation = queuedAnimation
      ? resolveQueuedBoardMoveAnimation(queuedAnimation, previousAnchors, nextAnchors)
      : null;

    expect(resolvedAnimation).not.toBeNull();
    expect(resolvedAnimation?.sourceRect.x).toBe(50);
    expect(resolvedAnimation?.sourceRect.y).toBe(0);
    expect(resolvedAnimation?.viaRect?.centerX).toBe(520);
    expect(resolvedAnimation?.viaRect?.centerY).toBe(230);
    expect(resolvedAnimation?.impactRect.centerX).toBe(520);
    expect(resolvedAnimation?.destinationRect.centerX).toBe(935);
    expect(resolvedAnimation?.destinationRect.centerY).toBe(125);
  });
});
