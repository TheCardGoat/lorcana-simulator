import { afterEach, describe, expect, it } from "bun:test";
import {
  createPlayerId,
  type CardInstanceId,
  type LorcanaProjectedBoardView,
} from "@tcg/lorcana-engine";
import { m } from "$lib/i18n/messages.js";

import { LorcanaSidebarPresenter } from "@/features/simulator/presenters/sidebar-presenter.svelte.js";
import type { LorcanaGameContextValue } from "@/features/simulator/context/game-context.svelte.js";
import { DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS } from "@/features/simulator/model/player-visual-settings.js";
import { createLogEntry } from "@/features/simulator-devtools/test-data/factories.js";
import { createCardSnapshot } from "@/features/simulator-devtools/test-data/factories.js";
import type {
  CardActionView,
  ExecutableMoveEntry,
  LorcanaSimulatorMoveParams,
} from "@/features/simulator/model/contracts.js";

class MemoryStorage implements Storage {
  #entries = new Map<string, string>();

  get length(): number {
    return this.#entries.size;
  }

  clear(): void {
    this.#entries.clear();
  }

  getItem(key: string): string | null {
    return this.#entries.get(key) ?? null;
  }

  key(index: number): string | null {
    return [...this.#entries.keys()][index] ?? null;
  }

  removeItem(key: string): void {
    this.#entries.delete(key);
  }

  setItem(key: string, value: string): void {
    this.#entries.set(key, value);
  }
}

function getStubSourceCardId(move: ExecutableMoveEntry): string | null {
  const params = move.params as Record<string, unknown>;
  if (typeof params.cardId === "string") return params.cardId;
  if (typeof params.attackerId === "string") return params.attackerId;
  if (typeof params.characterId === "string") return params.characterId;
  return null;
}

function createGameContextStub(
  overrides: Partial<LorcanaGameContextValue> = {},
): LorcanaGameContextValue {
  const executableMovesFn = overrides.executableMoves ?? (() => []);
  return {
    boardSnapshot: () => null,
    cardSnapshotsById: () => ({}),
    getPlayerSummary: () => null,
    executableMoves: executableMovesFn,
    moveCategorySummaries: () => [],
    moveCategoryCount: () => 0,
    expandCardMoves: (cardId: string) =>
      executableMovesFn().filter((move) => getStubSourceCardId(move) === cardId),
    expandCategoryMoves: (categoryId: string) =>
      executableMovesFn().filter((move) => move.presentation.categoryId === categoryId),
    challengeReadyCardIds: () => [],
    moveLogEntries: () => [],
    pendingResolutionMoves: () => [],
    playableHandCardIds: () => [],
    validChallengeTargetIds: () => [],
    invalidChallengeTargetReasons: () => ({}),
    ownerSide: () => null,
    pregameActiveSide: () => null,
    pregamePhase: () => null,
    canActInPregame: () => false,
    statusMessage: () => "",
    selectedCardId: () => null,
    selectedMulliganCardIds: () => [],
    pendingErrorReason: () => null,
    pendingMoveError: () => null,
    pendingResolutionAutoOpenStateId: () => null,
    challengeSourceCardId: () => null,
    challengeMode: () => false,
    animations: () => [],
    questAnimations: () => [],
    challengeAnimations: () => [],
    overlayAnnouncements: () => [],
    cardEffectAnimations: () => [],
    animationSpeed: () => "normal" as const,
    setAnimationSpeed: () => {},
    soundVolume: () => 50,
    setSoundVolume: () => {},
    previewChallenge: () => null,
    executeMove: () => false,
    playCard: () => false,
    ink: () => false,
    canDragCharacterToLocation: () => false,
    canMoveCharacterToLocation: () => false,
    canDropHandCardIntoZone: () => false,
    usesTargetedPlayCardDrag: () => false,
    handleBoardAnchorsChange: () => {},
    getOwnerIdForSide: () => null,
    getPlayerVisualSettings: () => DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS,
    getPlayerVisualSettingsByOwnerId: () => DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS,
    setSelectedCardId: () => {},
    setSelectedMulliganCardIds: () => {},
    setChallengeSourceCardId: () => {},
    setPendingError: () => {},
    setStatusMessage: () => {},
    handleLocaleChanged: () => {},
    runAnimation: () => false,
    runQuestAnimation: () => false,
    runChallengeAnimation: () => false,
    ...overrides,
  } as LorcanaGameContextValue;
}

const originalLocalStorage = globalThis.localStorage;

afterEach(() => {
  if (originalLocalStorage) {
    globalThis.localStorage = originalLocalStorage;
    return;
  }

  Reflect.deleteProperty(globalThis, "localStorage");
});

describe("LorcanaSidebarPresenter", () => {
  const playerOneId = createPlayerId("player_one");
  const playerTwoId = createPlayerId("player_two");

  function createExecutableMove(move: ExecutableMoveEntry): ExecutableMoveEntry {
    return move;
  }

  function createBoardWithBagEffect(payload: unknown): LorcanaProjectedBoardView {
    return {
      gameID: "game-1",
      matchID: "match-1",
      stateID: 1,
      playerOrder: [playerOneId, playerTwoId],
      turnPlayer: playerOneId,
      priorityPlayer: playerOneId,
      turnNumber: 1,
      phase: "mainPhase",
      gameSegment: "main",
      pendingMulligan: [],
      choosingFirstPlayer: null,
      status: "playing",
      winner: null,
      reason: null,
      timerView: {
        serverTimestamp: 0,
        players: {},
      },
      activeEffects: [],
      pendingEffects: [],
      bagEffects: [
        {
          id: "bag-1",
          type: "triggered",
          controllerId: playerOneId,
          chooserId: playerOneId,
          sourceId: "card-1",
          payload,
        },
      ],
      cards: {},
      players: {
        player_one: {
          canAddCardToInkwell: false,
          lore: 0,
          deckCount: 50,
          handCount: 0,
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
        },
        player_two: {
          canAddCardToInkwell: false,
          lore: 0,
          deckCount: 50,
          handCount: 0,
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
        },
      },
    };
  }

  function createBoardWithPendingEffect(payload: unknown): LorcanaProjectedBoardView {
    return {
      gameID: "game-1",
      matchID: "match-1",
      stateID: 1,
      playerOrder: [playerOneId, playerTwoId],
      turnPlayer: playerOneId,
      priorityPlayer: playerOneId,
      turnNumber: 1,
      phase: "mainPhase",
      gameSegment: "main",
      pendingMulligan: [],
      choosingFirstPlayer: null,
      status: "playing",
      winner: null,
      reason: null,
      timerView: {
        serverTimestamp: 0,
        players: {},
      },
      activeEffects: [],
      pendingChoice: {
        type: "action-effect",
        playerID: playerOneId,
        requestID: "pending-1",
      },
      pendingEffects: [
        {
          id: "pending-1",
          type: "action-effect",
          sourceId: "card-1",
          payload,
        },
      ],
      bagEffects: [],
      cards: {},
      players: {
        player_one: {
          canAddCardToInkwell: false,
          lore: 0,
          deckCount: 50,
          handCount: 0,
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
        },
        player_two: {
          canAddCardToInkwell: false,
          lore: 0,
          deckCount: 50,
          handCount: 0,
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
        },
      },
    };
  }

  it("exposes move log entries from the game context", () => {
    const entries = [createLogEntry("Played Stitch")];
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        moveLogEntries: () => entries,
      }),
    );

    expect(presenter.moveLogEntries).toEqual(entries);
  });

  it("initializes the raw-log toggle from localStorage", () => {
    const storage = new MemoryStorage();
    storage.setItem("lorcana.simulator.rawLogRegistryJson", "true");
    globalThis.localStorage = storage;

    const presenter = new LorcanaSidebarPresenter(createGameContextStub());
    presenter.initializeLocale();

    expect(presenter.showRawLogRegistryJson).toBe(true);
  });

  it("persists raw-log toggle changes back to localStorage", () => {
    const storage = new MemoryStorage();
    globalThis.localStorage = storage;

    const presenter = new LorcanaSidebarPresenter(createGameContextStub());
    presenter.handleRawLogRegistryToggle(true);

    expect(presenter.showRawLogRegistryJson).toBe(true);
    expect(storage.getItem("lorcana.simulator.rawLogRegistryJson")).toBe("true");
  });

  it("initializes sound volume from localStorage", () => {
    const storage = new MemoryStorage();
    storage.setItem("lorcana.simulator.soundVolume", "75");
    globalThis.localStorage = storage;

    const forwarded: number[] = [];
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        setSoundVolume: (v: number) => {
          forwarded.push(v);
        },
      }),
    );
    presenter.initializeLocale();

    expect(presenter.soundVolume).toBe(75);
    expect(forwarded).toEqual([75]);
  });

  it("clamps and persists sound volume changes to localStorage", () => {
    const storage = new MemoryStorage();
    globalThis.localStorage = storage;

    const forwarded: number[] = [];
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        setSoundVolume: (v: number) => {
          forwarded.push(v);
        },
      }),
    );

    presenter.handleSoundVolumeChange(120);
    expect(presenter.soundVolume).toBe(100);
    expect(forwarded).toEqual([100]);
    expect(storage.getItem("lorcana.simulator.soundVolume")).toBe("100");

    presenter.handleSoundVolumeChange(-10);
    expect(presenter.soundVolume).toBe(0);
    expect(forwarded).toEqual([100, 0]);
    expect(storage.getItem("lorcana.simulator.soundVolume")).toBe("0");
  });

  it("ignores invalid stored sound volume values", () => {
    const storage = new MemoryStorage();
    storage.setItem("lorcana.simulator.soundVolume", "notanumber");
    globalThis.localStorage = storage;

    const presenter = new LorcanaSidebarPresenter(createGameContextStub());
    presenter.initializeLocale();

    expect(presenter.soundVolume).toBe(50);
  });

  it("opens optional bag effects in the sidebar and submits the selected branch", () => {
    const executedMoves: Array<{
      moveId: string;
      params: Record<string, unknown>;
      options: { clearChallengeMode?: boolean; clearSelection?: boolean; status?: string };
    }> = [];
    const card = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Maleficent - Sorceress",
      type: "character",
    });
    const board = createBoardWithBagEffect({
      id: "bag-1",
      sourceId: "card-1",
      sourceCardId: "card-1",
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "triggered-ability",
      effect: {
        type: "draw",
        target: "CONTROLLER",
        amount: 1,
      },
    });
    board.bagEffects = [
      {
        ...board.bagEffects[0]!,
        selectionContext: {
          origin: "bag",
          requestId: "bag-1",
          kind: "optional-selection",
          sourceCardId: "card-1" as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "resolveOptional",
          acceptLabel: "Accept",
          rejectLabel: "Decline",
        },
      },
    ];

    const presenterWithSelection = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [card.cardId]: card,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
        executeMove: (moveId, params, options) => {
          executedMoves.push({
            moveId,
            params: params as Record<string, unknown>,
            options: {
              clearChallengeMode: options?.clearChallengeMode,
              clearSelection: options?.clearSelection,
              status: options?.status,
            },
          });
          return true;
        },
      }),
    );

    const [item] = presenterWithSelection.pendingEffectsPopoverItems;
    expect(item).toMatchObject({
      canResolve: false,
      canAccept: true,
      canReject: true,
    });

    item?.onAccept?.();

    expect(executedMoves).toEqual([
      {
        moveId: "resolveBag",
        params: {
          bagId: "bag-1",
          params: {
            resolveOptional: true,
          },
        },
        options: {
          clearChallengeMode: false,
          clearSelection: false,
          status: "Accepted bag effect",
        },
      },
    ]);
  });

  it("shows inline accept and decline actions for auto-opened optional pending effects", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Maleficent - Sorceress",
      type: "character",
    });
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCard.cardId as CardInstanceId,
      sourceCardId: sourceCard.cardId as CardInstanceId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "optional-selection",
      effect: {
        type: "draw",
        target: "CONTROLLER",
        amount: 1,
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "optional-selection",
          sourceCardId: sourceCard.cardId as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "resolveOptional",
          acceptLabel: "Accept",
          rejectLabel: "Decline",
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    presenter.syncAutoOpenPendingResolution();

    const [item] = presenter.pendingEffectsPopoverItems;
    expect(item?.statusMessage).toBe("Deciding whether to resolve...");
    expect(item?.inlineActions?.map((action) => action.label)).toEqual(["Accept", "Decline"]);

    item?.inlineActions?.[0]?.onClick();

    expect(presenter.availableMovesSelectionState).toMatchObject({
      mode: "resolution-optional",
      entries: [
        {
          moveId: "accept",
          label: "Accept",
          selected: true,
        },
        {
          moveId: "reject",
          label: "Decline",
          selected: false,
        },
      ],
    });

    expect(presenter.activePlayerGuidance).toContainEqual({
      id: "resolution-optional-inline",
      message: "This effect can be accepted or declined directly from the simulator.",
      actions: expect.any(Array),
      mode: "default",
      order: 2,
    });
  });

  it("starts an inline resolution session for bag target selection and submits the chosen target", () => {
    const executedMoves: Array<{
      moveId: string;
      params: Record<string, unknown>;
      options: { clearChallengeMode?: boolean; clearSelection?: boolean; status?: string };
    }> = [];
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithBagEffect({
      id: "bag-1",
      sourceId: sourceCardId,
      sourceCardId: sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "triggered",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.bagEffects = [
      {
        ...board.bagEffects[0]!,
        selectionContext: {
          origin: "bag",
          requestId: "bag-1",
          kind: "target-selection",
          sourceCardId: sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCardId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
        executeMove: (moveId, params, options) => {
          executedMoves.push({
            moveId,
            params: params as Record<string, unknown>,
            options: {
              clearChallengeMode: options?.clearChallengeMode,
              clearSelection: options?.clearSelection,
              status: options?.status,
            },
          });
          return true;
        },
      }),
    );

    const [item] = presenter.pendingEffectsPopoverItems;
    item?.onResolve?.();

    expect(executedMoves).toEqual([]);
    expect(presenter.resolutionSelectionSession?.context.kind).toBe("target-selection");
    expect(presenter.availableMovesSelectionState).toMatchObject({
      mode: "resolution-target",
      entries: [
        {
          cardId: targetCard.cardId,
          label: targetCard.label,
          selected: false,
        },
      ],
    });
    expect(presenter.selectableActionSessionCardIds).toEqual([targetCard.cardId]);

    expect(presenter.handleActionSessionCardSelection(targetCard)).toBe(true);
    expect(presenter.availableMovesSelectionState).toMatchObject({
      mode: "resolution-target",
      entries: [
        {
          cardId: targetCard.cardId,
          selected: true,
        },
      ],
    });
    expect(presenter.canConfirmResolutionSelection).toBe(true);
    expect(presenter.confirmActionSelection()).toBe(true);

    expect(executedMoves).toEqual([
      {
        moveId: "resolveBag",
        params: {
          bagId: "bag-1",
          params: {
            targets: [targetCard.cardId],
          },
        },
        options: {
          clearChallengeMode: false,
          clearSelection: false,
          status: "Resolved effect input",
        },
      },
    ]);
  });

  it("shows 'Arrange cards' as primary action for scry-selection pending effects", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Merlin - Goat",
      type: "character",
    });
    const revealedCard = createCardSnapshot("playerOne", "deck", {
      id: "revealed-1",
      name: "Mickey Mouse - Brave Little Tailor",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const revealedCardId = revealedCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "scry-selection",
      effect: {
        type: "scry",
        amount: 1,
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "scry-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "destinations",
          amount: 1,
          revealedCardIds: [revealedCardId],
          destinationRules: [
            { id: "top", zone: "top", min: 0, max: null, remainder: true },
            { id: "bottom", zone: "bottom", min: 0, max: null, remainder: false },
          ],
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [revealedCard.cardId]: revealedCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
      }),
    );

    const [item] = presenter.pendingEffectsPopoverItems;
    expect(item).toBeDefined();
    expect(item?.primaryActionLabel).toBe(m["sim.actions.label.arrangeCards"]({}));
    expect(item?.onPrimaryAction).toBeDefined();
    // Scry effects should NOT have onResolve (they use onPrimaryAction instead)
    expect(item?.onResolve).toBeUndefined();
  });

  it("auto-opens the single pending resolution selection after a card play", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "target-selection",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "target-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCardId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    expect(presenter.resolutionSelectionSession).toBeNull();

    presenter.syncAutoOpenPendingResolution();

    expect(presenter.resolutionSelectionSession?.context.kind).toBe("target-selection");
    expect(presenter.selectableActionSessionCardIds).toEqual([targetCard.cardId]);
  });

  it("auto-opens the single optional pending resolution into the sidebar", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Maleficent - Sorceress",
      type: "character",
    });
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCard.cardId as CardInstanceId,
      sourceCardId: sourceCard.cardId as CardInstanceId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "optional-selection",
      effect: {
        type: "draw",
        target: "CONTROLLER",
        amount: 1,
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "optional-selection",
          sourceCardId: sourceCard.cardId as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "resolveOptional",
          acceptLabel: "Accept",
          rejectLabel: "Decline",
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    presenter.syncAutoOpenPendingResolution();

    expect(presenter.availableMovesSelectionState).toMatchObject({
      mode: "resolution-optional",
      entries: [
        { moveId: "accept", label: "Accept" },
        { moveId: "reject", label: "Decline" },
      ],
    });
  });

  it("lists pending choice alternatives in the sidebar and submits the chosen branch", () => {
    const executedMoves: Array<Record<string, unknown>> = [];
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "The Queen - Commanding Presence",
      type: "character",
    });
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCard.cardId as CardInstanceId,
      sourceCardId: sourceCard.cardId as CardInstanceId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "choice-selection",
      effect: {
        type: "custom",
      },
    });
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "choice-selection",
          sourceCardId: sourceCard.cardId as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "choiceIndex",
          options: [
            { index: 0, label: "Ready chosen character", legal: true },
            { index: 1, label: "Deal 2 damage", legal: false },
          ],
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        executeMove: (_moveId, params) => {
          executedMoves.push(params as Record<string, unknown>);
          return true;
        },
      }),
    );

    presenter.handleResolvePendingEffect({
      id: "resolveEffect:pending-1",
      moveId: "resolveEffect",
      params: { effectId: "pending-1" },
    });

    expect(presenter.availableMovesSelectionState).toMatchObject({
      mode: "resolution-choice",
      entries: [
        { moveId: "0", label: "Ready chosen character", disabled: false },
        { moveId: "1", label: "Deal 2 damage", disabled: true },
      ],
    });

    expect(presenter.handleAvailableMovesSelectionOption("1")).toBe(false);
    expect(presenter.handleAvailableMovesSelectionOption("0")).toBe(true);
    expect(presenter.confirmActionSelection()).toBe(true);
    expect(executedMoves).toEqual([
      {
        effectId: "pending-1",
        params: {
          choiceIndex: 0,
        },
      },
    ]);
  });

  it("updates named-card search and submits the selected card name", () => {
    const executedMoves: Array<Record<string, unknown>> = [];
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Chernabog's Followers - Creatures of Evil",
      type: "character",
    });
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCard.cardId as CardInstanceId,
      sourceCardId: sourceCard.cardId as CardInstanceId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "name-card-selection",
      effect: {
        type: "custom",
      },
    });
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "name-card-selection",
          sourceCardId: sourceCard.cardId as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "namedCard",
          searchMode: "lorcana-catalog",
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        executeMove: (_moveId, params) => {
          executedMoves.push(params as Record<string, unknown>);
          return true;
        },
      }),
    );

    presenter.handleResolvePendingEffect({
      id: "resolveEffect:pending-1",
      moveId: "resolveEffect",
      params: { effectId: "pending-1" },
    });
    presenter.handleAvailableMovesNamedCardQueryInput("elsa");

    const selectionState = presenter.availableMovesSelectionState;
    expect(selectionState?.mode).toBe("resolution-name-card");
    expect(selectionState?.entries.length).toBeGreaterThan(0);

    const firstResult =
      selectionState?.mode === "resolution-name-card" ? selectionState.entries[0] : null;
    expect(firstResult?.kind).toBe("named-card");
    expect(firstResult?.moveId).toBeTruthy();

    expect(
      firstResult?.moveId
        ? presenter.handleAvailableMovesNamedCardSelection(firstResult.moveId)
        : false,
    ).toBe(true);
    expect(presenter.confirmActionSelection()).toBe(true);

    expect(executedMoves).toEqual([
      {
        effectId: "pending-1",
        params: {
          namedCard: firstResult?.moveId,
        },
      },
    ]);
  });

  it("keeps board and sidebar target selection in sync", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const board = createBoardWithBagEffect({
      id: "bag-1",
      sourceId: sourceCard.cardId as CardInstanceId,
      sourceCardId: sourceCard.cardId as CardInstanceId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "triggered-ability",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.bagEffects = [
      {
        ...board.bagEffects[0]!,
        selectionContext: {
          origin: "bag",
          requestId: "bag-1",
          kind: "target-selection",
          sourceCardId: sourceCard.cardId as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCard.cardId as CardInstanceId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
      }),
    );

    presenter.handleResolveBag({
      id: "resolveBag:bag-1",
      moveId: "resolveBag",
      params: { bagId: "bag-1" },
    });

    expect(presenter.handleAvailableMovesSelectionCard(targetCard.cardId)).toBe(true);
    expect(presenter.selectedActionSessionCardIds).toEqual([targetCard.cardId]);

    expect(presenter.handleActionSessionCardSelection(targetCard)).toBe(true);
    expect(presenter.selectedActionSessionCardIds).toEqual([]);
  });

  it("tracks scry assignment and submits ordered destinations", () => {
    const executedMoves: Array<Record<string, unknown>> = [];
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Ariel - Spectacular Singer",
      type: "character",
    });
    const firstCard = createCardSnapshot("playerOne", "deck", {
      id: "reveal-1",
      name: "Elsa - Ice Surfer",
      type: "character",
    });
    const secondCard = createCardSnapshot("playerOne", "deck", {
      id: "reveal-2",
      name: "Anna - Braving the Storm",
      type: "character",
    });
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCard.cardId as CardInstanceId,
      sourceCardId: sourceCard.cardId as CardInstanceId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "scry-selection",
      effect: {
        type: "custom",
      },
    });
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "scry-selection",
          sourceCardId: sourceCard.cardId as CardInstanceId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "destinations",
          amount: 2,
          revealedCardIds: [
            firstCard.cardId as CardInstanceId,
            secondCard.cardId as CardInstanceId,
          ],
          destinationRules: [
            { id: "top", zone: "top", min: 0, max: null, remainder: false },
            { id: "bottom", zone: "bottom", min: 0, max: null, remainder: true },
          ],
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [firstCard.cardId]: firstCard,
          [secondCard.cardId]: secondCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        executeMove: (_moveId, params) => {
          executedMoves.push(params as Record<string, unknown>);
          return true;
        },
      }),
    );

    presenter.handleResolvePendingEffect({
      id: "resolveEffect:pending-1",
      moveId: "resolveEffect",
      params: { effectId: "pending-1" },
    });

    expect(presenter.availableMovesSelectionState).toMatchObject({
      mode: "resolution-scry",
      destinations: [{ zone: "top" }, { zone: "bottom" }],
    });

    expect(presenter.handleAvailableMovesScryAssignment(firstCard.cardId, "bottom")).toBe(true);
    expect(presenter.handleAvailableMovesScryAssignment(secondCard.cardId, "bottom")).toBe(true);
    expect(presenter.handleAvailableMovesScryReorder("bottom", secondCard.cardId, "up")).toBe(true);
    expect(presenter.confirmActionSelection()).toBe(true);

    expect(executedMoves).toEqual([
      {
        effectId: "pending-1",
        params: {
          destinations: [
            { zone: "top", cards: [] },
            { zone: "bottom", cards: [secondCard.cardId, firstCard.cardId] },
          ],
        },
      },
    ]);
  });

  it("auto-opens the single bag resolution selection after a card play", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithBagEffect({
      id: "bag-1",
      sourceId: sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "triggered-ability",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.stateID = 12;
    board.bagEffects = [
      {
        ...board.bagEffects[0]!,
        selectionContext: {
          origin: "bag",
          requestId: "bag-1",
          kind: "target-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCardId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    expect(presenter.resolutionSelectionSession).toBeNull();

    presenter.syncAutoOpenPendingResolution();

    expect(presenter.resolutionSelectionSession?.context.kind).toBe("target-selection");
    expect(presenter.selectableActionSessionCardIds).toEqual([targetCard.cardId]);
  });

  it("does not auto-open when multiple queued resolution items exist", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "optional-selection",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.stateID = 12;
    // Remove pendingChoice so the mandatory active-effect path is not triggered
    board.pendingChoice = undefined;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "optional-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "resolveOptional",
          acceptLabel: "Yes",
          rejectLabel: "No",
        },
      },
    ];
    board.bagEffects = [
      {
        id: "bag-1",
        type: "triggered",
        controllerId: playerOneId,
        chooserId: playerOneId,
        sourceId: sourceCardId,
        payload: {
          id: "bag-1",
          sourceId: sourceCardId,
          controllerId: "player_one",
          chooserId: "player_one",
          kind: "triggered-ability",
          effect: {
            type: "ready",
            target: "CHOSEN_CHARACTER",
          },
        },
        selectionContext: {
          origin: "bag",
          requestId: "bag-1",
          kind: "optional-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "resolveOptional",
          acceptLabel: "Yes",
          rejectLabel: "No",
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    presenter.syncAutoOpenPendingResolution();

    expect(presenter.resolutionSelectionSession).toBeNull();
  });

  it("does not reopen the same auto-opened pending selection after cancel", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "target-selection",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "target-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCardId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    presenter.syncAutoOpenPendingResolution();
    expect(presenter.resolutionSelectionSession?.context.kind).toBe("target-selection");

    presenter.cancelResolutionSelectionSession();
    presenter.syncAutoOpenPendingResolution();

    expect(presenter.resolutionSelectionSession).toBeNull();
  });

  it("auto-opens scry-selection even when multiple effects are queued", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Merlin - Goat",
      type: "character",
    });
    const revealedCard = createCardSnapshot("playerOne", "deck", {
      id: "revealed-1",
      name: "Mickey Mouse - Brave Little Tailor",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const revealedCardId = revealedCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "scry-selection",
      effect: {
        type: "scry",
        amount: 1,
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "scry-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "destinations",
          amount: 1,
          revealedCardIds: [revealedCardId],
          destinationRules: [
            { id: "top", zone: "top", min: 0, max: null, remainder: true },
            { id: "bottom", zone: "bottom", min: 0, max: null, remainder: false },
          ],
        },
      },
    ];
    // Add a bag effect so queuedResolutionCount > 1
    board.bagEffects = [
      {
        id: "bag-1",
        type: "triggered",
        controllerId: playerOneId,
        chooserId: playerOneId,
        sourceId: sourceCardId,
        payload: {},
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [revealedCard.cardId]: revealedCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
        pendingResolutionAutoOpenStateId: () => 12,
      }),
    );

    expect(presenter.resolutionSelectionSession).toBeNull();

    presenter.syncAutoOpenPendingResolution();

    expect(presenter.resolutionSelectionSession?.context.kind).toBe("scry-selection");
  });

  it("auto-opens scry-selection even without matching autoOpenStateId", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Merlin - Goat",
      type: "character",
    });
    const revealedCard = createCardSnapshot("playerOne", "deck", {
      id: "revealed-1",
      name: "Mickey Mouse - Brave Little Tailor",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const revealedCardId = revealedCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "scry-selection",
      effect: {
        type: "scry",
        amount: 1,
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "scry-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "destinations",
          amount: 1,
          revealedCardIds: [revealedCardId],
          destinationRules: [
            { id: "top", zone: "top", min: 0, max: null, remainder: true },
            { id: "bottom", zone: "bottom", min: 0, max: null, remainder: false },
          ],
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [revealedCard.cardId]: revealedCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
        ],
        // autoOpenStateId does NOT match board.stateID
        pendingResolutionAutoOpenStateId: () => 99,
      }),
    );

    expect(presenter.resolutionSelectionSession).toBeNull();

    presenter.syncAutoOpenPendingResolution();

    // Scry-selection should still auto-open regardless of stateID mismatch
    expect(presenter.resolutionSelectionSession?.context.kind).toBe("scry-selection");
  });

  it("guides manual ink selection through card pick and confirm", () => {
    const inkCard = createCardSnapshot("playerOne", "hand", {
      id: "ink-card",
      name: "Develop Your Brain",
      type: "action",
    });
    const selectedCardIds: Array<string | null> = [];
    const executedMoves: Array<{
      moveId: string;
      params: LorcanaSimulatorMoveParams["putCardIntoInkwell"];
      options: { clearChallengeMode?: boolean; clearSelection?: boolean; status?: string };
    }> = [];
    const inkMove: ExecutableMoveEntry = {
      id: "putCardIntoInkwell:ink-card",
      label: inkCard.label,
      moveId: "putCardIntoInkwell",
      params: { cardId: inkCard.cardId },
      presentation: {
        kind: "targeted",
        categoryId: "ink-card",
        categoryLabel: "Ink",
        optionLabel: inkCard.label,
      },
    };

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        cardSnapshotsById: () => ({
          [inkCard.cardId]: inkCard,
        }),
        setSelectedCardId: (nextSelectedCardId) => {
          selectedCardIds.push(nextSelectedCardId);
        },
        executeMove: (moveId, params, options) => {
          if (moveId !== "putCardIntoInkwell") {
            return false;
          }

          executedMoves.push({
            moveId,
            params: params as LorcanaSimulatorMoveParams["putCardIntoInkwell"],
            options: {
              clearChallengeMode: options?.clearChallengeMode,
              clearSelection: options?.clearSelection,
              status: options?.status,
            },
          });
          return true;
        },
      }),
    );

    expect(presenter.startManualCardActionSelection("ink-card", [inkMove])).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe("Select a card to ink.");
    expect(presenter.isCardSelectableForManualAction(inkCard)).toBe(true);

    expect(presenter.handleManualCardActionSelection(inkCard)).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      "Confirm Ink. You can skip confirmations in Settings.",
    );

    expect(presenter.confirmManualCardActionSelection()).toBe(true);
    expect(selectedCardIds.at(-1)).toBeNull();
    expect(selectedCardIds).toContain(inkCard.cardId);
    expect(executedMoves).toEqual([
      {
        moveId: "putCardIntoInkwell",
        params: { cardId: inkCard.cardId },
        options: {
          clearChallengeMode: true,
          clearSelection: true,
          status: inkCard.label,
        },
      },
    ]);
    expect(presenter.actionSelectionSession).toBeNull();
  });

  it("guides challenge through source, target, and confirm phases", () => {
    const attacker = createCardSnapshot("playerOne", "play", {
      id: "attacker-card",
      name: "Maui - Hero to All",
      type: "character",
    });
    const defender = createCardSnapshot("playerTwo", "play", {
      id: "defender-card",
      name: "Elsa - Snow Queen",
      type: "character",
    });
    const executedMoves: Array<LorcanaSimulatorMoveParams["challenge"]> = [];
    const challengeMove: ExecutableMoveEntry = {
      id: "challenge:attacker:defender",
      label: "Challenge",
      moveId: "challenge",
      params: {
        attackerId: attacker.cardId,
        defenderId: defender.cardId,
      },
      presentation: {
        kind: "targeted",
        categoryId: "challenge",
        categoryLabel: "Challenge",
        optionLabel: `${attacker.label} -> ${defender.label}`,
      },
    };

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        cardSnapshotsById: () => ({
          [attacker.cardId]: attacker,
          [defender.cardId]: defender,
        }),
        ownerSide: () => "playerOne",
        boardSnapshot: () =>
          ({
            stateID: 1,
          }) as never,
        executeMove: (moveId, params) => {
          if (moveId !== "challenge") {
            return false;
          }

          executedMoves.push(params as LorcanaSimulatorMoveParams["challenge"]);
          return true;
        },
      }),
    );

    expect(presenter.startActionSelectionSession("challenge", [challengeMove])).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      "Select a character to challenge with.",
    );
    expect(presenter.isCardSelectableForActionSession(attacker)).toBe(true);
    expect(presenter.availableMovesSelectionState).toMatchObject({
      categoryId: "challenge",
      phase: "choose-source",
      sourceCardId: null,
      targetCardId: null,
      canBack: false,
      canConfirm: false,
      entries: [
        {
          kind: "card",
          cardId: attacker.cardId,
          label: attacker.label,
        },
      ],
    });

    expect(presenter.handleAvailableMovesSelectionCard(attacker.cardId)).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      `Select the opposing character for ${attacker.label} to challenge.`,
    );
    expect(presenter.availableMovesSelectionState).toMatchObject({
      categoryId: "challenge",
      phase: "choose-target",
      sourceCardId: attacker.cardId,
      sourceLabel: attacker.label,
      targetCardId: null,
      canBack: true,
      canConfirm: false,
      entries: [
        {
          kind: "card",
          cardId: defender.cardId,
          label: defender.label,
        },
      ],
    });

    expect(presenter.handleActionSessionCardSelection(defender)).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      `Confirm Challenge. You can skip confirmations in Settings.\nChallenge ${attacker.label} -> ${defender.label}`,
    );
    expect(presenter.availableMovesSelectionState).toMatchObject({
      categoryId: "challenge",
      phase: "confirm",
      sourceCardId: attacker.cardId,
      sourceLabel: attacker.label,
      targetCardId: defender.cardId,
      targetLabel: defender.label,
      selectedMoveId: challengeMove.id,
      selectedMoveLabel: `${attacker.label} -> ${defender.label}`,
      canBack: true,
      canConfirm: true,
      entries: [],
    });

    expect(presenter.confirmActionSelection()).toBe(true);
    expect(executedMoves).toEqual([
      {
        attackerId: attacker.cardId,
        defenderId: defender.cardId,
      },
    ]);
  });

  it("surfaces lethal challenge preview state for the selected attacker and defender", () => {
    const attacker = createCardSnapshot("playerOne", "play", {
      id: "attacker-card",
      name: "Maui - Hero to All",
      type: "character",
    });
    const defender = createCardSnapshot("playerTwo", "play", {
      id: "defender-card",
      name: "Elsa - Snow Queen",
      type: "character",
    });
    const challengeMove: ExecutableMoveEntry = {
      id: "challenge:attacker:defender",
      label: "Challenge",
      moveId: "challenge",
      params: {
        attackerId: attacker.cardId,
        defenderId: defender.cardId,
      },
      presentation: {
        kind: "targeted",
        categoryId: "challenge",
        categoryLabel: "Challenge",
        optionLabel: `${attacker.label} -> ${defender.label}`,
      },
    };

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        cardSnapshotsById: () => ({
          [attacker.cardId]: attacker,
          [defender.cardId]: defender,
        }),
        ownerSide: () => "playerOne",
        boardSnapshot: () =>
          ({
            stateID: 1,
          }) as never,
        previewChallenge: () => ({
          attackerId: attacker.cardId as never,
          defenderId: defender.cardId as never,
          defenderKind: "character",
          attackerCurrentDamage: 0,
          defenderCurrentDamage: 0,
          attackerNextDamage: 5,
          defenderNextDamage: 4,
          attackerWillpower: 4,
          defenderWillpower: 4,
          attackerDamageDealt: 4,
          defenderDamageDealt: 5,
          attackerWouldBeBanished: true,
          defenderWouldBeBanished: true,
        }),
      }),
    );

    expect(presenter.startActionSelectionSession("challenge", [challengeMove])).toBe(true);
    expect(presenter.handleActionSessionCardSelection(attacker)).toBe(true);
    expect(presenter.handleActionSessionCardSelection(defender)).toBe(true);

    expect(presenter.getChallengePreviewCardState(attacker.cardId)).toEqual({
      wouldBeBanished: true,
    });
    expect(presenter.getChallengePreviewCardState(defender.cardId)).toEqual({
      wouldBeBanished: true,
    });
    expect(presenter.getChallengePreviewCardState("other-card")).toEqual({
      wouldBeBanished: false,
    });
  });

  it("surfaces the specific invalid challenge reason for blocked targets", () => {
    const attacker = createCardSnapshot("playerOne", "play", {
      id: "attacker-card",
      name: "Moana - Determined Explorer",
      type: "character",
    });
    const validDefender = createCardSnapshot("playerTwo", "play", {
      id: "valid-defender",
      name: "Camilo Madrigal - Center Stage",
      type: "character",
    });
    const blockedDefender = createCardSnapshot("playerTwo", "play", {
      id: "blocked-defender",
      name: "Alma Madrigal - Accepting Grandmother",
      type: "character",
    });
    const pendingErrors: Array<string | null> = [];
    const challengeMove: ExecutableMoveEntry = {
      id: "challenge:attacker:valid",
      label: "Challenge",
      moveId: "challenge",
      params: {
        attackerId: attacker.cardId,
        defenderId: validDefender.cardId,
      },
      presentation: {
        kind: "targeted",
        categoryId: "challenge",
        categoryLabel: "Challenge",
        optionLabel: `${attacker.label} -> ${validDefender.label}`,
      },
    };

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () =>
          ({
            stateID: 1,
          }) as never,
        cardSnapshotsById: () => ({
          [attacker.cardId]: attacker,
          [validDefender.cardId]: validDefender,
          [blockedDefender.cardId]: blockedDefender,
        }),
        ownerSide: () => "playerOne",
        invalidChallengeTargetReasons: () => ({
          [blockedDefender.cardId]: "Another Bodyguard must be challenged first.",
        }),
        setPendingError: (reason) => {
          pendingErrors.push(reason);
        },
      }),
    );

    expect(presenter.startActionSelectionSession("challenge", [challengeMove])).toBe(true);
    expect(presenter.handleActionSessionCardSelection(attacker)).toBe(true);
    expect(presenter.getActionSessionCardReason(blockedDefender.cardId)).toBe(
      "Another Bodyguard must be challenged first.",
    );
    expect(presenter.handleActionSessionCardSelection(blockedDefender)).toBe(false);
    expect(pendingErrors.at(-1)).toBe("Another Bodyguard must be challenged first.");
  });

  it("executes single-card actions immediately when confirmation is disabled", () => {
    const storage = new MemoryStorage();
    globalThis.localStorage = storage;

    const inkCard = createCardSnapshot("playerOne", "hand", {
      id: "ink-card",
      name: "Develop Your Brain",
      type: "action",
    });
    const executedMoves: Array<LorcanaSimulatorMoveParams["putCardIntoInkwell"]> = [];
    const inkMove: ExecutableMoveEntry = {
      id: "putCardIntoInkwell:ink-card",
      label: inkCard.label,
      moveId: "putCardIntoInkwell",
      params: { cardId: inkCard.cardId },
      presentation: {
        kind: "targeted",
        categoryId: "ink-card",
        categoryLabel: "Ink",
        optionLabel: inkCard.label,
      },
    };

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        cardSnapshotsById: () => ({
          [inkCard.cardId]: inkCard,
        }),
        executeMove: (moveId, params) => {
          if (moveId !== "putCardIntoInkwell") {
            return false;
          }

          executedMoves.push(params as LorcanaSimulatorMoveParams["putCardIntoInkwell"]);
          return true;
        },
      }),
    );

    presenter.handleSkipActionConfirmationToggle(true);

    expect(storage.getItem("lorcana.simulator.skipActionConfirmation")).toBe("true");
    expect(presenter.startActionSelectionSession("ink-card", [inkMove])).toBe(true);
    expect(presenter.handleActionSessionCardSelection(inkCard)).toBe(true);
    expect(executedMoves).toEqual([{ cardId: inkCard.cardId }]);
    expect(presenter.actionSelectionSession).toBeNull();
  });

  it("builds card-scoped hover actions with enabled and disabled entries", () => {
    const card = {
      ...createCardSnapshot("playerOne", "play", {
        id: "goofy",
        name: "Goofy - Musketeer",
        type: "character",
        loreValue: 2,
      }),
      textEntries: [{ title: "{E} Pay Attention", description: "Draw a card." }],
    };
    const executableMoves: ExecutableMoveEntry[] = [
      createExecutableMove({
        id: "quest:goofy",
        label: "Goofy - Musketeer",
        moveId: "quest",
        params: { cardId: card.cardId },
        presentation: {
          kind: "targeted",
          categoryId: "quest",
          categoryLabel: "Quest",
          optionLabel: "Goofy - Musketeer",
        },
      }),
      createExecutableMove({
        id: "activateAbility:goofy:0",
        label: "Goofy - Musketeer: {E} Pay Attention",
        moveId: "activateAbility",
        params: { cardId: card.cardId, abilityIndex: 0 },
        presentation: {
          kind: "targeted",
          categoryId: "activate-ability",
          categoryLabel: "Activate Ability",
          optionLabel: "Goofy - Musketeer: {E} Pay Attention",
        },
      }),
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        executableMoves: () => executableMoves,
        challengeReadyCardIds: () => [],
      }),
    );

    expect(presenter.getCardActionViews(card)).toEqual([
      {
        id: `quest:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "quest",
        label: "Quest for 2 lore",
        enabled: true,
        moves: [executableMoves[0]!],
      },
      {
        id: `disabled:challenge:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "challenge",
        label: "Challenge",
        enabled: false,
        reason: "No legal challenge targets right now.",
        moves: [],
      },
      {
        id: `disabled:move-to-location:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "move-to-location",
        label: "Move to Location",
        enabled: false,
        reason: "No legal locations to move to right now.",
        moves: [],
      },
      {
        id: `activate-ability:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "activate-ability",
        label: "Activate Ability",
        detail: "1 ability",
        enabled: true,
        moves: [executableMoves[1]!],
      },
    ]);
  });

  it("groups activated abilities into a single source-first hover action", () => {
    const card = {
      ...createCardSnapshot("playerOne", "play", {
        id: "cinderella",
        name: "Cinderella - Ballroom Sensation",
        type: "character",
      }),
      textEntries: [
        { title: "Singer 6", description: "This character can sing songs with cost 6 or less." },
        { title: "Challenger +2", description: "Gets +2 strength while challenging." },
        { title: "{E} Encore", description: "Draw a card." },
      ],
    };
    const executableMoves: ExecutableMoveEntry[] = [
      createExecutableMove({
        id: "activateAbility:cinderella:2",
        label: "Cinderella - Ballroom Sensation: {E} Encore",
        moveId: "activateAbility",
        params: { cardId: card.cardId, abilityIndex: 2 },
        presentation: {
          kind: "targeted",
          categoryId: "activate-ability",
          categoryLabel: "Activate Ability",
          optionLabel: "Cinderella - Ballroom Sensation: {E} Encore",
        },
      }),
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        executableMoves: () => executableMoves,
      }),
    );

    expect(presenter.getCardActionViews(card)).toEqual([
      {
        id: `disabled:quest:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "quest",
        label: "Quest for 1 lore",
        enabled: false,
        reason: "This character cannot quest right now.",
        moves: [],
      },
      {
        id: `disabled:challenge:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "challenge",
        label: "Challenge",
        enabled: false,
        reason: "No legal challenge targets right now.",
        moves: [],
      },
      {
        id: `disabled:move-to-location:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "move-to-location",
        label: "Move to Location",
        enabled: false,
        reason: "No legal locations to move to right now.",
        moves: [],
      },
      {
        id: `activate-ability:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "activate-ability",
        label: "Activate Ability",
        detail: "1 ability",
        enabled: true,
        moves: [executableMoves[0]!],
      },
    ]);
  });

  it("executes direct hover-card actions through the existing move pipeline", () => {
    const card = createCardSnapshot("playerOne", "play", {
      id: "simba",
      name: "Simba - Returned King",
      type: "character",
      loreValue: 3,
    });
    const executedMoves: Array<{
      moveId: string;
      params: Record<string, unknown>;
      options: { clearChallengeMode?: boolean; clearSelection?: boolean; status?: string };
    }> = [];
    const questMove = createExecutableMove({
      id: "quest:simba",
      label: "Quest with Simba",
      moveId: "quest",
      params: { cardId: card.cardId },
      presentation: {
        kind: "targeted",
        categoryId: "quest",
        categoryLabel: "Quest",
        optionLabel: "Simba - Returned King",
      },
    });

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        executableMoves: () => [questMove],
        challengeReadyCardIds: () => [],
        executeMove: (moveId, params, options) => {
          executedMoves.push({
            moveId,
            params: params as Record<string, unknown>,
            options: {
              clearChallengeMode: options?.clearChallengeMode,
              clearSelection: options?.clearSelection,
              status: options?.status,
            },
          });
          return true;
        },
      }),
    );

    const action = presenter.getCardActionViews(card)[0] as CardActionView;

    expect(presenter.handleCardActionClick(action)).toBe(true);
    expect(executedMoves).toEqual([
      {
        moveId: "quest",
        params: { cardId: card.cardId },
        options: {
          clearChallengeMode: true,
          clearSelection: true,
          status: "Quest with Simba",
        },
      },
    ]);
  });

  it("starts challenge mode from the hover-card action with the source card preselected", () => {
    const attacker = createCardSnapshot("playerOne", "play", {
      id: "attacker-card",
      name: "Maui - Hero to All",
      type: "character",
    });
    const defender = createCardSnapshot("playerTwo", "play", {
      id: "defender-card",
      name: "Elsa - Snow Queen",
      type: "character",
    });
    const selectedCardIds: Array<string | null> = [];
    const statusMessages: string[] = [];
    const challengeMove = createExecutableMove({
      id: "challenge:attacker:defender",
      label: "Challenge",
      moveId: "challenge",
      params: {
        attackerId: attacker.cardId,
        defenderId: defender.cardId,
      },
      presentation: {
        kind: "targeted",
        categoryId: "challenge",
        categoryLabel: "Challenge",
        optionLabel: `${attacker.label} -> ${defender.label}`,
      },
    });

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        executableMoves: () => [challengeMove],
        challengeReadyCardIds: () => [attacker.cardId],
        cardSnapshotsById: () => ({
          [attacker.cardId]: attacker,
          [defender.cardId]: defender,
        }),
        setSelectedCardId: (nextSelectedCardId) => {
          selectedCardIds.push(nextSelectedCardId);
        },
        setChallengeSourceCardId: () => {},
        setPendingError: () => {},
        setStatusMessage: (nextStatusMessage) => {
          statusMessages.push(nextStatusMessage);
        },
      }),
    );

    const action = presenter
      .getCardActionViews(attacker)
      .find((candidate) => candidate.categoryId === "challenge");

    expect(action?.enabled).toBe(true);
    expect(action && presenter.handleCardActionClick(action)).toBe(true);
    expect(presenter.actionSelectionSession?.phase).toBe("choose-target");
    expect(presenter.actionSelectionSession?.sourceCardId).toBe(attacker.cardId);
    expect(selectedCardIds).toEqual([attacker.cardId]);
    expect(statusMessages).toEqual([
      `Select the opposing character for ${attacker.label} to challenge.`,
    ]);
  });

  it("starts activate-ability from the hover-card action with the source card preselected", () => {
    const card = {
      ...createCardSnapshot("playerOne", "play", {
        id: "goofy",
        name: "Goofy - Musketeer",
        type: "character",
      }),
      textEntries: [
        { title: "{E} First Ability", description: "Do the first thing." },
        { title: "{E} Second Ability", description: "Do the second thing." },
      ],
    };
    const selectedCardIds: Array<string | null> = [];
    const statusMessages: string[] = [];
    const firstAbilityMove = createExecutableMove({
      id: "activateAbility:goofy:0",
      label: "Goofy - Musketeer: {E} First Ability",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 0 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Goofy - Musketeer: {E} First Ability",
      },
    });
    const secondAbilityMove = createExecutableMove({
      id: "activateAbility:goofy:1",
      label: "Goofy - Musketeer: {E} Second Ability",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 1 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Goofy - Musketeer: {E} Second Ability",
      },
    });

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        executableMoves: () => [firstAbilityMove, secondAbilityMove],
        cardSnapshotsById: () => ({
          [card.cardId]: card,
        }),
        setSelectedCardId: (nextSelectedCardId) => {
          selectedCardIds.push(nextSelectedCardId);
        },
        setPendingError: () => {},
        setStatusMessage: (nextStatusMessage) => {
          statusMessages.push(nextStatusMessage);
        },
      }),
    );

    const action = presenter
      .getCardActionViews(card)
      .find((candidate) => candidate.categoryId === "activate-ability");

    expect(action?.enabled).toBe(true);
    expect(action && presenter.handleCardActionClick(action)).toBe(true);
    expect(presenter.actionSelectionSession?.phase).toBe("choose-option");
    expect(presenter.actionSelectionSession?.sourceCardId).toBe(card.cardId);
    expect(selectedCardIds).toEqual([card.cardId]);
    expect(statusMessages).toEqual([`Choose an ability for ${card.label}.`]);
  });

  it("shows activate-ability choices from the action session guidance", () => {
    const storage = new MemoryStorage();
    globalThis.localStorage = storage;

    const card = createCardSnapshot("playerOne", "play", {
      id: "goofy",
      name: "Goofy - Musketeer",
      type: "character",
    });
    const executedMoves: Array<LorcanaSimulatorMoveParams["activateAbility"]> = [];
    const firstAbilityMove = createExecutableMove({
      id: "activateAbility:goofy:0",
      label: "Goofy - Musketeer: {E} First Ability",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 0 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Goofy - Musketeer: {E} First Ability",
      },
    });
    const secondAbilityMove = createExecutableMove({
      id: "activateAbility:goofy:1",
      label: "Goofy - Musketeer: {E} Second Ability",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 1 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Goofy - Musketeer: {E} Second Ability",
      },
    });

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        cardSnapshotsById: () => ({
          [card.cardId]: {
            ...card,
            textEntries: [
              { title: "{E} First Ability", description: "Do the first thing." },
              { title: "{E} Second Ability", description: "Do the second thing." },
            ],
          },
        }),
        executeMove: (moveId, params) => {
          if (moveId !== "activateAbility") {
            return false;
          }

          executedMoves.push(params as LorcanaSimulatorMoveParams["activateAbility"]);
          return true;
        },
      }),
    );

    expect(
      presenter.startActionSelectionSession("activate-ability", [
        firstAbilityMove,
        secondAbilityMove,
      ]),
    ).toBe(true);

    let guidance = presenter.activePlayerGuidance[0];
    expect(guidance?.message).toBe("Select a card to activate.");
    expect(guidance?.actions.map((action) => action.label)).toEqual(["Cancel"]);
    expect(presenter.availableMovesSelectionState).toMatchObject({
      categoryId: "activate-ability",
      phase: "choose-source",
      sourceCardId: null,
      entries: [
        {
          kind: "card",
          cardId: card.cardId,
          label: card.label,
        },
      ],
    });

    expect(presenter.handleAvailableMovesSelectionCard(card.cardId)).toBe(true);

    guidance = presenter.activePlayerGuidance[0];
    expect(guidance?.actions.map((action) => action.label)).toEqual([
      "Back",
      "Goofy - Musketeer: {E} First Ability",
      "Goofy - Musketeer: {E} Second Ability",
      "Cancel",
    ]);
    expect(presenter.availableMovesSelectionState).toMatchObject({
      categoryId: "activate-ability",
      phase: "choose-option",
      sourceCardId: card.cardId,
      sourceLabel: card.label,
      entries: [
        {
          kind: "option",
          moveId: firstAbilityMove.id,
          label: "Goofy - Musketeer: {E} First Ability",
        },
        {
          kind: "option",
          moveId: secondAbilityMove.id,
          label: "Goofy - Musketeer: {E} Second Ability",
        },
      ],
    });

    expect(presenter.handleAvailableMovesSelectionOption(secondAbilityMove.id)).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      "Confirm Goofy - Musketeer: {E} Second Ability. You can skip confirmations in Settings.",
    );
    expect(presenter.availableMovesSelectionState).toMatchObject({
      categoryId: "activate-ability",
      phase: "confirm",
      sourceCardId: card.cardId,
      sourceLabel: card.label,
      selectedMoveId: secondAbilityMove.id,
      selectedMoveLabel: "Goofy - Musketeer: {E} Second Ability",
      canConfirm: true,
    });

    presenter.backActionSelectionSession();
    guidance = presenter.activePlayerGuidance[0];
    expect(guidance?.message).toBe("Choose an ability for Goofy - Musketeer.");
    expect(presenter.activePlayerGuidance[0]?.actions.map((action) => action.label)).toEqual([
      "Back",
      "Goofy - Musketeer: {E} First Ability",
      "Goofy - Musketeer: {E} Second Ability",
      "Cancel",
    ]);

    expect(presenter.handleAvailableMovesSelectionOption(secondAbilityMove.id)).toBe(true);
    expect(presenter.confirmActionSelection()).toBe(true);
    expect(executedMoves).toEqual([{ cardId: card.cardId, abilityIndex: 1 }]);
  });

  it("executes a card ability from card id and ability index only", () => {
    const card = createCardSnapshot("playerOne", "play", {
      id: "goofy",
      name: "Goofy - Musketeer",
      type: "character",
    });
    const executedMoves: Array<LorcanaSimulatorMoveParams["activateAbility"]> = [];
    const firstAbilityMove = createExecutableMove({
      id: "activateAbility:goofy:0",
      label: "Goofy - Musketeer: {E} First Ability",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 0 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Goofy - Musketeer: {E} First Ability",
      },
    });
    const secondAbilityMove = createExecutableMove({
      id: "activateAbility:goofy:1",
      label: "Goofy - Musketeer: {E} Second Ability",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 1 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Goofy - Musketeer: {E} Second Ability",
      },
    });

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        ownerSide: () => "playerOne",
        cardSnapshotsById: () => ({
          [card.cardId]: {
            ...card,
            textEntries: [
              { title: "{E} First Ability", description: "Do the first thing." },
              { title: "{E} Second Ability", description: "Do the second thing." },
            ],
          },
        }),
        executableMoves: () => [firstAbilityMove, secondAbilityMove],
        executeMove: (moveId, params) => {
          if (moveId !== "activateAbility") {
            return false;
          }

          executedMoves.push(params as LorcanaSimulatorMoveParams["activateAbility"]);
          return true;
        },
      }),
    );

    expect(presenter.handleCardAbilityByIndex(card.cardId, 1)).toBe(true);
    expect(presenter.actionSelectionSession?.phase).toBe("choose-option");
    expect(presenter.actionSelectionSession?.sourceCardId).toBe(card.cardId);

    // skipConfirmation is true for handleCardAbilityByIndex, so selecting
    // an option executes the move immediately without requiring confirmation
    expect(presenter.selectActionSelectionOption(secondAbilityMove.id)).toBe(true);
    expect(executedMoves).toEqual([{ cardId: card.cardId, abilityIndex: 1 }]);
    expect(presenter.handleCardAbilityByIndex(card.cardId, 2)).toBe(false);
  });

  it("shows statusMessage and onCancel on the matching popover item during an active resolution session", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithBagEffect({
      id: "bag-1",
      sourceId: sourceCardId,
      sourceCardId: sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "triggered-ability",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.bagEffects = [
      {
        ...board.bagEffects[0]!,
        selectionContext: {
          origin: "bag",
          requestId: "bag-1",
          kind: "target-selection",
          sourceCardId: sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCardId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
      }),
    );

    // Before session: item should be resolvable
    const itemBefore = presenter.pendingEffectsPopoverItems[0];
    expect(itemBefore?.canResolve).toBe(true);
    expect(itemBefore?.statusMessage).toBeUndefined();

    // Start session
    itemBefore?.onResolve?.();
    expect(presenter.resolutionSelectionSession?.context.kind).toBe("target-selection");

    // During session (no target selected yet): statusMessage shown, no confirm
    const itemDuring = presenter.pendingEffectsPopoverItems[0];
    expect(itemDuring?.canResolve).toBe(false);
    expect(itemDuring?.statusMessage).toBe("Selecting targets...");
    expect(itemDuring?.onCancel).toBeDefined();
    expect(itemDuring?.onConfirm).toBeUndefined();
    expect(itemDuring?.onResolve).toBeUndefined();

    // Select a target — confirm should now appear
    const targetSnapshot = presenter.pendingEffectsPopoverItems[0]; // re-read to check confirm
    expect(presenter.handleActionSessionCardSelection(targetCard)).toBe(true);
    const itemWithTarget = presenter.pendingEffectsPopoverItems[0];
    expect(itemWithTarget?.statusMessage).toBe("Selecting targets (1 selected)...");
    expect(itemWithTarget?.onConfirm).toBeDefined();

    // Cancel session: item should revert
    itemWithTarget?.onCancel?.();
    expect(presenter.resolutionSelectionSession).toBeNull();

    const itemAfter = presenter.pendingEffectsPopoverItems[0];
    expect(itemAfter?.canResolve).toBe(true);
    expect(itemAfter?.statusMessage).toBeUndefined();
  });

  it("does not affect non-matching popover items during an active resolution session", () => {
    const sourceCard = createCardSnapshot("playerOne", "play", {
      id: "card-1",
      name: "Rapunzel - Gifted with Healing",
      type: "character",
    });
    const targetCard = createCardSnapshot("playerTwo", "play", {
      id: "target-1",
      name: "Isabela Madrigal - Golden Child",
      type: "character",
    });
    const sourceCardId = sourceCard.cardId as CardInstanceId;
    const targetCardId = targetCard.cardId as CardInstanceId;
    const board = createBoardWithPendingEffect({
      id: "pending-1",
      sourceId: sourceCardId,
      sourceCardId,
      controllerId: "player_one",
      chooserId: "player_one",
      kind: "target-selection",
      effect: {
        type: "ready",
        target: "CHOSEN_CHARACTER",
      },
    });
    board.stateID = 12;
    board.pendingEffects = [
      {
        ...board.pendingEffects[0]!,
        selectionContext: {
          origin: "pending-effect",
          requestId: "pending-1",
          kind: "target-selection",
          sourceCardId,
          chooserId: playerOneId,
          currentSelection: {},
          submitField: "targets",
          targetDsl: [
            {
              selector: "chosen",
              count: 1,
              zones: ["play"],
              cardTypes: ["character"],
            },
          ],
          cardCandidateIds: [targetCardId],
          playerCandidateIds: [],
          allowedZones: ["play"],
          minSelections: 1,
          maxSelections: 1,
          ordered: false,
        },
      },
    ];
    // Add a bag effect that should NOT be affected by the pending effect's session
    board.bagEffects = [
      {
        id: "bag-1",
        type: "triggered",
        controllerId: playerOneId,
        chooserId: playerOneId,
        sourceId: sourceCardId,
        payload: {
          id: "bag-1",
          sourceId: sourceCardId,
          controllerId: "player_one",
          chooserId: "player_one",
          kind: "triggered-ability",
          effect: { type: "draw", target: "CONTROLLER", amount: 1 },
        },
      },
    ];

    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () => board,
        cardSnapshotsById: () => ({
          [sourceCard.cardId]: sourceCard,
          [targetCard.cardId]: targetCard,
        }),
        pendingResolutionMoves: () => [
          {
            id: "resolveEffect:pending-1",
            moveId: "resolveEffect",
            params: { effectId: "pending-1" },
          },
          {
            id: "resolveBag:bag-1",
            moveId: "resolveBag",
            params: { bagId: "bag-1" },
          },
        ],
      }),
    );

    // Start session on the pending effect
    presenter.handleResolvePendingEffect({
      id: "resolveEffect:pending-1",
      moveId: "resolveEffect",
      params: { effectId: "pending-1" },
    });

    const items = presenter.pendingEffectsPopoverItems;
    const pendingItem = items.find((i) => i.id === "pending:pending-1");
    const bagItem = items.find((i) => i.id === "bag:bag-1");

    // Pending item should be in session state
    expect(pendingItem?.statusMessage).toBe("Selecting targets...");
    expect(pendingItem?.canResolve).toBe(false);

    // Bag item should be unaffected
    expect(bagItem?.statusMessage).toBeUndefined();
    expect(bagItem?.canResolve).toBe(true);
  });
});
