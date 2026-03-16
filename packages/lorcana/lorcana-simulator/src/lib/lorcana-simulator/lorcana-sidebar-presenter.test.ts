import { afterEach, describe, expect, it } from "bun:test";
import { createPlayerId, type LorcanaProjectedBoardView } from "@tcg/lorcana-engine";

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

function createGameContextStub(
  overrides: Partial<LorcanaGameContextValue> = {},
): LorcanaGameContextValue {
  return {
    boardSnapshot: () => null,
    cardSnapshotsById: () => ({}),
    getPlayerSummary: () => null,
    executableMoves: () => [],
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
    challengeSourceCardId: () => null,
    challengeMode: () => false,
    animations: () => [],
    previewChallenge: () => null,
    executeMove: () => false,
    playCard: () => false,
    ink: () => false,
    canDropHandCardIntoZone: () => false,
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
    ...overrides,
  };
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
          lore: 0,
          deckCount: 50,
          handCount: 0,
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
        },
        player_two: {
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

  it("offers accept and reject directly on optional bag effects", () => {
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
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () =>
          createBoardWithBagEffect({
            id: "bag-1",
            sourceId: "card-1",
            sourceCardId: "card-1",
            controllerId: "player_one",
            chooserId: "player_one",
            kind: "triggered",
            effect: {
              type: "optional",
              effect: {
                type: "draw",
                target: "CONTROLLER",
                amount: 1,
              },
            },
          }),
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

    const [item] = presenter.pendingEffectsPopoverItems;
    expect(item).toMatchObject({
      canResolve: false,
      canAccept: true,
      canReject: true,
    });

    item?.onAccept?.();
    item?.onReject?.();

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
      {
        moveId: "resolveBag",
        params: {
          bagId: "bag-1",
          params: {
            resolveOptional: false,
          },
        },
        options: {
          clearChallengeMode: false,
          clearSelection: false,
          status: "Rejected bag effect",
        },
      },
    ]);
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

    expect(presenter.handleActionSessionCardSelection(attacker)).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      `Select the opposing character for ${attacker.label} to challenge.`,
    );

    expect(presenter.handleActionSessionCardSelection(defender)).toBe(true);
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      `Confirm Challenge. You can skip confirmations in Settings.\nChallenge ${attacker.label} -> ${defender.label}`,
    );

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

    expect(presenter.handleActionSessionCardSelection(card)).toBe(true);

    guidance = presenter.activePlayerGuidance[0];
    expect(guidance?.actions.map((action) => action.label)).toEqual([
      "Back",
      "Goofy - Musketeer: {E} First Ability",
      "Goofy - Musketeer: {E} Second Ability",
      "Cancel",
    ]);

    guidance?.actions[2]?.onClick();
    expect(presenter.activePlayerGuidance[0]?.message).toBe(
      "Confirm Goofy - Musketeer: {E} Second Ability. You can skip confirmations in Settings.",
    );

    presenter.backActionSelectionSession();
    guidance = presenter.activePlayerGuidance[0];
    expect(guidance?.message).toBe("Choose an ability for Goofy - Musketeer.");
    expect(presenter.activePlayerGuidance[0]?.actions.map((action) => action.label)).toEqual([
      "Back",
      "Goofy - Musketeer: {E} First Ability",
      "Goofy - Musketeer: {E} Second Ability",
      "Cancel",
    ]);

    guidance?.actions[2]?.onClick();
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

    expect(presenter.selectActionSelectionOption(secondAbilityMove.id)).toBe(true);
    expect(presenter.confirmActionSelection()).toBe(true);
    expect(executedMoves).toEqual([{ cardId: card.cardId, abilityIndex: 1 }]);
    expect(presenter.handleCardAbilityByIndex(card.cardId, 2)).toBe(false);
  });
});
