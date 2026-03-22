import { describe, expect, it } from "bun:test";
import type { LorcanaGameContextValue } from "@/features/simulator/context/game-context.svelte.js";
import { LorcanaSidebarPresenter } from "@/features/simulator/context/game-context.svelte.js";
import { DEFAULT_LORCANA_PLAYER_VISUAL_SETTINGS } from "@/features/simulator/model/player-visual-settings.js";
import type { ExecutableMoveEntry } from "@/features/simulator/model/contracts.js";

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
    expandCardMoves: () => [],
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
    animationSpeed: () => "normal",
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

function createConcedeMove(): ExecutableMoveEntry {
  return {
    id: "concede-1",
    label: "Concede",
    moveId: "concede",
    params: {},
    presentation: {
      kind: "direct",
      categoryId: "concede",
      categoryLabel: "Concede",
    },
  };
}

function createResolveEffectMove(): ExecutableMoveEntry {
  return {
    id: "resolve-effect-1",
    label: "Resolve effect",
    moveId: "resolveEffect",
    params: {
      effectId: "effect-1",
    },
    presentation: {
      kind: "direct",
      categoryId: "unknown",
      categoryLabel: "Resolve effect",
    },
  };
}

describe("LorcanaSidebarPresenter mobile actions", () => {
  it("keeps guidance at the bottom by default and resets it between presenter instances", () => {
    const firstPresenter = new LorcanaSidebarPresenter(createGameContextStub());

    expect(firstPresenter.guidancePosition).toBe("bottom");

    firstPresenter.handleGuidancePositionToggle();
    expect(firstPresenter.guidancePosition).toBe("top");

    const secondPresenter = new LorcanaSidebarPresenter(createGameContextStub());
    expect(secondPresenter.guidancePosition).toBe("bottom");
  });

  it("executes concede through the legal move entry", () => {
    const move = createConcedeMove();
    const executed: Array<{ moveId: string; params: Record<string, never> }> = [];
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        executableMoves: () => [move],
        moveCategorySummaries: () => [
          {
            categoryId: "concede",
            categoryLabel: "Concede",
            sourceCardIds: [],
            count: 1,
            isDirect: true,
          },
        ],
        executeMove: (moveId, params) => {
          executed.push({ moveId, params: params as Record<string, never> });
          return true;
        },
      }),
    );

    expect(presenter.canConcede).toBe(true);
    expect(presenter.handleMobileConcede()).toBe(true);
    expect(executed).toEqual([{ moveId: "concede", params: {} }]);
  });

  it("publishes a stub notice when reporting a player from mobile", () => {
    const statuses: string[] = [];
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        setStatusMessage: (message) => {
          statuses.push(message);
        },
      }),
    );

    presenter.handleMobileReportPlayer();

    expect(presenter.mobileNotice?.message).toBe("Player reporting is not available yet.");
    expect(statuses.at(-1)).toBe("Player reporting is not available yet.");
  });

  it("advances to the next pending effect action", () => {
    const resolved: string[] = [];
    const resolveMove = createResolveEffectMove();
    const presenter = new LorcanaSidebarPresenter(
      createGameContextStub({
        boardSnapshot: () =>
          ({
            pendingChoice: { requestID: "effect-1" },
            pendingEffects: [
              {
                id: "effect-1",
                payload: {},
                sourceId: null,
                selectionContext: null,
              },
            ],
            bagEffects: [],
          }) as never,
        pendingResolutionMoves: () => [
          {
            id: "pending-resolution-1",
            moveId: "resolveEffect",
            params: resolveMove.params as { effectId: string },
          },
        ],
        executeMove: (moveId) => {
          resolved.push(moveId);
          return true;
        },
      }),
    );

    expect(presenter.hasPendingEffects).toBe(true);
    expect(presenter.canAdvancePendingEffects).toBe(true);
    expect(presenter.handleAdvancePendingEffects()).toBe(true);
    expect(resolved).toEqual(["resolveEffect"]);
  });
});
