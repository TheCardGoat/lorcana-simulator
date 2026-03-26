<script lang="ts">
  import "../../../app.css";
  import { untrack } from "svelte";
  import { m } from "$lib/i18n/messages.js";
  import { Button } from "$lib/design-system/primitives/button";
  import * as Dialog from "$lib/design-system/primitives/dialog";
  import * as Sidebar from "$lib/design-system/primitives/sidebar";
  import SimulatorHotkeyLayer from "@/features/simulator/hotkeys/SimulatorHotkeyLayer.svelte";
  import SimulatorHotkeysDialog from "@/features/simulator/hotkeys/SimulatorHotkeysDialog.svelte";
  import { buildSimulatorHotkeyDescriptors } from "@/features/simulator/hotkeys/simulator-hotkey-registry.js";
  import {
    HAND_CARD_HOTKEYS,
    OPPONENT_CARD_HOTKEYS,
    PLAY_CARD_HOTKEYS,
  } from "@/features/simulator/hotkeys/hotkey-bindings.js";
  import { getOrderedPlayZoneCards } from "@/features/simulator/hotkeys/board-order.js";
  import { Toaster } from "$lib/design-system/primitives/sonner";
  import { toast } from "svelte-sonner";
  import { DragDropProvider } from "@dnd-kit/svelte";
  import { Feedback, PointerActivationConstraints, PointerSensor } from "@dnd-kit/dom";
  import type { LorcanaEngineBase } from "@tcg/lorcana-engine";
  import type {
    ExecutableMovePresentationCategoryId,
    LorcanaSimulatorReadModel,
    SimulatorMoveError,
  } from "@/features/simulator/model/contracts.js";
  import type { PendingEffectsPopoverItem } from "@/features/simulator/context/game-context.svelte.js";
  import type { LorcanaPlayerSettingsMap } from "@/features/simulator/model/player-visual-settings.js";

  import LorcanaSimulatorSidebar from "./LorcanaSimulatorSidebar.svelte";
  import LorcanaCompactPanels from "./LorcanaCompactPanels.svelte";
  import { setSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";
  import { setLorcanaSimulatorDndContext } from "@/features/simulator/context/simulator-dnd-context.svelte.js";
  import { GlobalCardPreview, TabletopBoard } from "@/features/simulator/index.js";
  import {
    type LorcanaGameContext,
    setLorcanaGameContext,
    useLorcanaBoardPresenter,
    useLorcanaSidebarPresenter,
  } from "@/features/simulator/context/game-context.svelte.js";
  import { SimulatorLayoutModeObserver } from "@/features/simulator/model/layout-mode.svelte.js";
  import PostGameSummaryDialog from "@/features/simulator/post-game/PostGameSummaryDialog.svelte";
  import ConfettiOverlay from "@/features/simulator/board/ConfettiOverlay.svelte";
  import { playSound } from "@/features/simulator/animations/sound-service.js";
  import {
    createInitialPostGameModalState,
    dismissPostGameModal,
    reopenPostGameModal,
    syncPostGameModalState,
  } from "@/features/simulator/post-game/modal-state.js";
  import { buildPostGameSummary } from "@/features/simulator/post-game/summary.js";
  import type { HotkeyMode } from "@/features/simulator/context/game-context.svelte.js";

  interface LorcanaTabletopSimulatorProps {
    engine: LorcanaEngineBase;
    readModel?: Pick<LorcanaSimulatorReadModel, "getMoveLog"> &
      Partial<Pick<LorcanaSimulatorReadModel, "subscribeStateUpdates">>;
    playerSettings?: LorcanaPlayerSettingsMap;
    gameContext?: LorcanaGameContext | null;
    postGameGameId?: string | null;
    onReturnToMatchmaking?: (() => void | Promise<void>) | null;
    viewerMode?: "player" | "spectator";
  }

  let {
    engine,
    readModel,
    playerSettings = {},
    gameContext = $bindable(null),
    postGameGameId = null,
    onReturnToMatchmaking = null,
    viewerMode = "player",
  }: LorcanaTabletopSimulatorProps = $props();
  let sidebarOpen = $state(true);

  const game = setLorcanaGameContext({
    get engine() {
      return engine;
    },
    get readModel() {
      return readModel;
    },
    get playerSettings() {
      return playerSettings;
    },
  });
  gameContext = game;

  const sidebar = useLorcanaSidebarPresenter();
  const board = useLorcanaBoardPresenter();

  const simulatorCardContext = setSimulatorCardContext({
    onMulliganSelectionChange: () => {
      sidebar.pendingMulliganDangerConfirm = null;
    },
  });
  const dndContext = setLorcanaSimulatorDndContext();

  const boardSnapshot = $derived(game.boardSnapshot());
  const moveLogEntries = $derived(game.moveLogEntries());
  const ownerSide = $derived(game.ownerSide());
  const pendingMoveError = $derived(sidebar.pendingMoveError);
  const mobileNotice = $derived(sidebar.mobileNotice);
  const layout = new SimulatorLayoutModeObserver();
  const layoutMode = $derived(layout.current);
  const isCompactLayout = $derived(layout.isCompact);
  const isPostGame = $derived(boardSnapshot?.status === "finished");
  const isSpectator = $derived(viewerMode === "spectator");
  const readOnlyMode = $derived(isPostGame || isSpectator);
  const compactActionCount = $derived(isPostGame ? 0 : sidebar.moveCategoryCount);
  const moveCategorySummaries = $derived(sidebar.moveCategorySummaries);
  const availableMovesSelectionState = $derived(sidebar.availableMovesSelectionState);
  const topSide = $derived(sidebar.topSide);
  const bottomSide = $derived(sidebar.bottomSide);
  const pendingEffectsPopoverItems = $derived.by(() =>
    isPostGame ? ([] as PendingEffectsPopoverItem[]) : sidebar.pendingEffectsPopoverItems,
  );
  const activePlayerGuidance = $derived.by(() =>
    isPostGame ? [] : sidebar.activePlayerGuidance,
  );
  const opponentPlayHotkeyCards = $derived.by(() =>
    getOrderedPlayZoneCards(
      board.getZoneCards(topSide, "play").filter((card) => card.cardType !== "item"),
      "top",
    ).slice(0, OPPONENT_CARD_HOTKEYS.length),
  );
  const ownedPlayHotkeyCards = $derived.by(() =>
    ownerSide
      ? getOrderedPlayZoneCards(
          board.getZoneCards(bottomSide, "play").filter((card) => card.cardType !== "item"),
          "bottom",
        ).slice(0, PLAY_CARD_HOTKEYS.length)
      : [],
  );
  const ownedHandHotkeyCards = $derived.by(() =>
    ownerSide ? board.getZoneCards(bottomSide, "hand").slice(0, HAND_CARD_HOTKEYS.length) : [],
  );
  const finishedGameKey = $derived.by(() =>
    isPostGame && boardSnapshot && postGameGameId
      ? `${postGameGameId}:${boardSnapshot.stateID ?? boardSnapshot.turnNumber}`
      : null,
  );
  const postGameSummary = $derived.by(() => {
    if (!boardSnapshot || !isPostGame || !postGameGameId) {
      return null;
    }

    return buildPostGameSummary({
      board: boardSnapshot,
      entries: moveLogEntries,
      viewerSide: ownerSide,
    });
  });
  // Hand cards overlap nearby drop zones, so we require a bit of movement before
  // starting a drag. Touch keeps a larger threshold to avoid long-press-only drag,
  // while mouse gets a smaller threshold so clicks do not misfire into the inkwell.
  const sensors = [
    PointerSensor.configure({
      activationConstraints(event) {
        if (event.pointerType === "touch") {
          return [new PointerActivationConstraints.Distance({ value: 4 })];
        }

        return [new PointerActivationConstraints.Distance({ value: 2 })];
      },
    }),
  ];
  let lastToastedMoveError = $state<SimulatorMoveError | null>(null);
  let compactPanelsOpen = $state(false);
  let compactPanelsTab = $state<"moves" | "log">("moves");
  let lastMobileNoticeId = $state<number | null>(null);
  let showConfetti = $state(false);
  let postGameModalState = $state(createInitialPostGameModalState());
  let postGameDialogOpen = $state(false);
  let hotkeysDialogOpen = $state(false);
  let pendingDirectMove = $state<{
    id: string;
    label: string;
    categoryId: "pass-turn" | "undo" | "quest-all";
    execute: () => void;
  } | null>(null);

  $effect(() => {
    const nextEngine = engine;
    const nextReadModel = readModel;
    const nextPlayerSettings = playerSettings;

    untrack(() => {
      console.log("[LorcanaTabletopSimulator] Sync");
      game.syncEngine(nextEngine, nextReadModel, nextPlayerSettings);
    });
  });

  $effect(() => {
    if (!isCompactLayout) {
      compactPanelsOpen = false;
      compactPanelsTab = "moves";
    }
  });

  $effect(() => {
    const nextState = syncPostGameModalState(postGameModalState, finishedGameKey);
    if (
      nextState.open === postGameModalState.open &&
      nextState.finishedGameKey === postGameModalState.finishedGameKey &&
      nextState.autoOpenedFinishedGameKey === postGameModalState.autoOpenedFinishedGameKey
    ) {
      return;
    }

    postGameModalState = nextState;
    postGameDialogOpen = nextState.open;
  });

  $effect(() => {
    if (!isPostGame || !postGameSummary) {
      return;
    }

    const result = postGameSummary.outcome.viewerResult;
    if (result === "victory") {
      playSound("victory");
      showConfetti = true;
    } else if (result === "defeat") {
      playSound("defeat");
    }
  });

  $effect(() => {
    if (postGameDialogOpen === postGameModalState.open) {
      return;
    }

    postGameModalState = postGameDialogOpen
      ? reopenPostGameModal(postGameModalState)
      : dismissPostGameModal(postGameModalState);
  });

  $effect(() => {
    if (!pendingMoveError || pendingMoveError === lastToastedMoveError) {
      return;
    }

    lastToastedMoveError = pendingMoveError;

    toast.error(pendingMoveError.rawReason ?? pendingMoveError.message, {
      description:
        pendingMoveError.rawReason && pendingMoveError.rawReason !== pendingMoveError.message
          ? pendingMoveError.message
          : undefined,
    });
  });

  $effect(() => {
    if (!mobileNotice || mobileNotice.id === lastMobileNoticeId) {
      return;
    }

    lastMobileNoticeId = mobileNotice.id;

    if (mobileNotice.tone === "info") {
      toast.info(mobileNotice.message);
      return;
    }

    toast(mobileNotice.message);
  });

  $effect(() => {
    if (!pendingDirectMove) {
      return;
    }

    const queuedMove = pendingDirectMove;
    const directMoveAvailable = moveCategorySummaries.some(
      (summary) => summary.categoryId === queuedMove.categoryId,
    );

    if (!directMoveAvailable) {
      pendingDirectMove = null;
    }
  });

  const hotkeyDescriptors = $derived.by(() =>
    buildSimulatorHotkeyDescriptors({
      moveCategorySummaries,
      selectionState: availableMovesSelectionState,
      pendingDirectMove,
      opponentPlayCards: opponentPlayHotkeyCards,
      ownedPlayCards: ownedPlayHotkeyCards,
      ownedHandCards: ownedHandHotkeyCards,
      canBack: availableMovesSelectionState?.canBack ?? false,
      canCancel:
        Boolean(pendingDirectMove) ||
        Boolean(availableMovesSelectionState?.canCancel) ||
        Boolean(sidebar.actionSelectionSession) ||
        Boolean(sidebar.resolutionSelectionSession),
      canConfirm:
        Boolean(pendingDirectMove) ||
        Boolean(availableMovesSelectionState?.canConfirm) ||
        sidebar.actionSelectionSession?.phase === "confirm",
      openCommandPalette: () => {
        hotkeysDialogOpen = true;
      },
      cancel: handleCancelHotkey,
      back: handleBackHotkey,
      confirm: handleConfirmHotkey,
      runMoveCategory: handleMoveCategoryHotkey,
      inspectCard: (card) => {
        simulatorCardContext.openCardInspect({ card });
      },
      selectCard: (cardId) => {
        sidebar.handleAvailableMovesSelectionCard(cardId);
      },
    }),
  );
  function getVisibleHotkeyDescriptors(
    descriptors: typeof hotkeyDescriptors,
    hotkeyMode: HotkeyMode,
  ) {
    switch (hotkeyMode) {
      case "off":
        return [];
      case "confirm-only":
        return descriptors.filter(
          (descriptor) =>
            descriptor.id === "global-cancel" ||
            descriptor.id === "global-back" ||
            descriptor.id === "global-confirm" ||
            (descriptor.kind === "move" && descriptor.categoryId === "pass-turn"),
        );
      case "on":
      default:
        return descriptors;
    }
  }
  const visibleHotkeyDescriptors = $derived(
    getVisibleHotkeyDescriptors(hotkeyDescriptors, sidebar.hotkeyMode),
  );
  const gameplayHotkeysPaused = $derived(sidebar.isPlayerSettingsOpen);

  export function runAnimation(...args: Parameters<typeof game.runAnimation>): ReturnType<typeof game.runAnimation> {
    return game.runAnimation(...args);
  }

  function openCompactPanels(tab: "moves" | "log" = "moves"): void {
    compactPanelsTab = tab;
    compactPanelsOpen = true;
  }

  function openPostGameSummary(): void {
    postGameModalState = reopenPostGameModal(postGameModalState);
    postGameDialogOpen = true;
  }

  async function handleReturnToMatchmaking(): Promise<void> {
    await onReturnToMatchmaking?.();
  }

  function queueDirectMoveConfirmation(
    categoryId: "pass-turn" | "undo" | "quest-all",
    label: string,
    execute: () => void,
    id: string,
  ): void {
    pendingDirectMove = { id, label, categoryId, execute };
    toast.info(m["sim.actions.confirmMoveLabel"]({ label }), {
      description: m["sim.actions.confirmMoveHotkeyHint"]({}),
    });
  }

  function handleMoveCategoryHotkey(categoryId: ExecutableMovePresentationCategoryId): void {
    const summary = moveCategorySummaries.find((candidate) => candidate.categoryId === categoryId);
    if (!summary) {
      return;
    }

    const moves = sidebar.expandCategoryMoves(summary.categoryId);
    if (moves.length === 0) {
      return;
    }

    if (summary.isDirect) {
      const move = moves[0];
      if (!move) {
        return;
      }

      if (summary.categoryId === "undo" || summary.categoryId === "pass-turn" || summary.categoryId === "quest-all") {
        if (pendingDirectMove?.id === move.id) {
          // Second press of the same move — confirm immediately
          const pending = pendingDirectMove;
          pendingDirectMove = null;
          pending.execute();
          return;
        }
        queueDirectMoveConfirmation(
          summary.categoryId,
          move.label,
          () => sidebar.handleAvailableMoveClick(move),
          move.id,
        );
        return;
      }

      sidebar.handleAvailableMoveClick(move);
      pendingDirectMove = null;
      return;
    }

    sidebar.startManualCardActionSelection(summary.categoryId, moves);
    pendingDirectMove = null;
  }

  function handleCancelHotkey(): void {
    if (hotkeysDialogOpen) {
      hotkeysDialogOpen = false;
      return;
    }

    if (pendingDirectMove) {
      pendingDirectMove = null;
      return;
    }

    sidebar.cancelActionSelectionSession();
  }

  function handleBackHotkey(): void {
    sidebar.backActionSelectionSession();
  }

  function handleConfirmHotkey(): void {
    if (pendingDirectMove) {
      const pendingMove = pendingDirectMove;
      pendingDirectMove = null;
      pendingMove.execute();
      return;
    }

    sidebar.confirmActionSelection();
  }
</script>

<DragDropProvider
        plugins={(defaults) => [...defaults, Feedback.configure({})]}
        {sensors}
        onDragStart={dndContext.handleDragStart}
        onDragMove={dndContext.handleDragMove}
        onDragEnd={dndContext.handleDragEnd}
>
  <Sidebar.Provider bind:open={sidebarOpen}>
    <div class="simulator-dark simulator-v2">
      <SimulatorHotkeyLayer descriptors={visibleHotkeyDescriptors} paused={gameplayHotkeysPaused} />
      <Toaster theme="dark"/>
      {#if !isCompactLayout}
        <LorcanaSimulatorSidebar
          readOnly={readOnlyMode}
          onOpenHotkeys={() => {
            hotkeysDialogOpen = true;
          }}
        />
      {/if}

      {#if !isCompactLayout}
        <Sidebar.Inset aria-label={m["sim.tabletop.aria"]({})}>
          <div class="absolute z-50 cursor-pointer top-1 left-1">
            <Sidebar.Trigger class="cursor-pointer"/>
          </div>

          {#if boardSnapshot}
            <TabletopBoard
              {layoutMode}
              {compactActionCount}
              {pendingEffectsPopoverItems}
              {activePlayerGuidance}
              hotkeyDescriptors={visibleHotkeyDescriptors}
            />
          {:else}
            <div class="loading">{m["sim.tabletop.loading"]({})}</div>
            <span class="loading loading-spinner loading-xl"></span>
          {/if}
        </Sidebar.Inset>
      {:else}
        <main class="compact-inset" aria-label={m["sim.tabletop.aria"]({})}>
          {#if boardSnapshot}
            <TabletopBoard
              {layoutMode}
              {compactActionCount}
              {pendingEffectsPopoverItems}
              {activePlayerGuidance}
              onOpenCompactPanels={openCompactPanels}
              hotkeyDescriptors={visibleHotkeyDescriptors}
            />
          {:else}
            <div class="loading">{m["sim.tabletop.loading"]({})}</div>
            <span class="loading loading-spinner loading-xl"></span>
          {/if}
        </main>
      {/if}

    {#if pendingMoveError}
      <Dialog.Root bind:open={sidebar.showRawErrorDialog}>
        <Dialog.Portal>
          <Dialog.Overlay class="raw-error-overlay" />
          <Dialog.Content class="raw-error-dialog" showCloseButton={false}>
            <Dialog.Title class="raw-error-title">
              {m["sim.errorPanel.rawTitle"]({})}
            </Dialog.Title>
            <Dialog.Description class="raw-error-description">
              {m["sim.errorPanel.rawDescription"]({})}
            </Dialog.Description>

            <pre class="raw-error-payload">{sidebar.formatRawMoveError(pendingMoveError)}</pre>

            <Dialog.Footer class="raw-error-footer">
              <Dialog.Close class="raw-error-close">
                {m["sim.errorPanel.close"]({})}
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    {/if}

      <GlobalCardPreview/>
      <SimulatorHotkeysDialog
        bind:open={hotkeysDialogOpen}
        descriptors={visibleHotkeyDescriptors.filter((descriptor) => descriptor.enabled)}
      />
      {#if isCompactLayout}
        <LorcanaCompactPanels
          bind:open={compactPanelsOpen}
          bind:activeTab={compactPanelsTab}
          readOnly={readOnlyMode}
        />
      {/if}

      {#if postGameGameId && postGameSummary}
        <PostGameSummaryDialog
          bind:open={postGameDialogOpen}
          gameId={postGameGameId}
          summary={postGameSummary}
          onReturnToMatchmaking={handleReturnToMatchmaking}
        />

        {#if !postGameDialogOpen}
          <div class="post-game-launcher">
            <Button class="post-game-launcher__button" onclick={openPostGameSummary}>
              {m["sim.postGame.viewSummary"]({})}
            </Button>
          </div>
        {/if}
      {/if}
      <ConfettiOverlay show={showConfetti} />
    </div>
  </Sidebar.Provider>
</DragDropProvider>

<style>
  :global([data-slot="sidebar-wrapper"]) {
    min-height: 100vh !important;
    min-height: 100dvh !important;
    height: 100vh !important;
    height: 100dvh !important;
    overflow: hidden;
  }

  .simulator-v2 {
    --bg: #070f1b;
    --text-primary: #e5edf7;

    height: 100vh;
    height: 100dvh;
    max-height: 100vh;
    max-height: 100dvh;
    width: 100%;
    display: flex;
    background:
      radial-gradient(circle at 10% -5%, rgba(40, 74, 115, 0.5), transparent 55%),
      radial-gradient(circle at 95% 0%, rgba(32, 78, 70, 0.22), transparent 60%),
      var(--bg);
    font-family: "Trebuchet MS", "Segoe UI", sans-serif;
    overflow: hidden;
  }

  .loading {
    display: grid;
    place-items: center;
    height: 100%;
    color: #cbd9ea;
    font-size: 0.95rem;
  }

  :global([data-sidebar="trigger"]) {
    color: var(--text-primary) !important;
    background: rgba(17, 31, 50, 0.88) !important;
    border: 1px solid rgba(108, 145, 192, 0.28) !important;
  }

  :global([data-sidebar="trigger"]:hover) {
    background: rgba(25, 47, 76, 0.95) !important;
  }

  :global([data-slot="sidebar-inset"]) {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: transparent !important;
  }

  .compact-inset {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    padding: 0.35rem;
    padding-bottom: calc(0.35rem + env(safe-area-inset-bottom));
    overflow: hidden;
  }

  .post-game-launcher {
    position: absolute;
    right: 1rem;
    bottom: calc(1rem + env(safe-area-inset-bottom));
    z-index: 30;
    display: flex;
    justify-content: flex-end;
    pointer-events: none;
  }

  :global(.post-game-launcher__button) {
    pointer-events: auto;
    min-height: 2.9rem;
    border-color: rgba(125, 211, 252, 0.42);
    background:
      linear-gradient(180deg, rgba(14, 116, 144, 0.92), rgba(8, 47, 73, 0.96));
    color: #f8fafc;
    box-shadow: 0 18px 40px rgba(2, 6, 23, 0.42);
  }

  @media (max-width: 767px) {
    .compact-inset {
      margin: 0;
      padding: 0;
    }

    .post-game-launcher {
      right: 0.75rem;
      left: 0.75rem;
      justify-content: stretch;
    }

    :global(.post-game-launcher__button) {
      width: 100%;
    }
  }

  :global(.raw-error-overlay) {
    background: rgba(3, 7, 18, 0.76);
    backdrop-filter: blur(6px);
  }

  :global(.raw-error-dialog) {
    max-width: min(42rem, calc(100vw - 2rem));
    background: linear-gradient(180deg, rgba(10, 18, 31, 0.98), rgba(7, 15, 27, 0.98));
    border-color: rgba(108, 145, 192, 0.28);
    color: #e5edf7;
  }

  :global(.raw-error-title) {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
  }

  :global(.raw-error-description) {
    margin-top: -0.5rem;
    color: rgba(203, 217, 234, 0.8);
  }

  .raw-error-payload {
    margin: 0;
    max-height: min(24rem, 55vh);
    overflow: auto;
    border-radius: 12px;
    border: 1px solid rgba(108, 145, 192, 0.18);
    background: rgba(2, 6, 23, 0.92);
    padding: 0.9rem;
    font-size: 0.78rem;
    line-height: 1.55;
    color: #dbeafe;
    white-space: pre-wrap;
    word-break: break-word;
  }

  :global(.raw-error-footer) {
    margin-top: 0.25rem;
  }

  :global(.raw-error-close) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: 1px solid rgba(108, 145, 192, 0.28);
    background: rgba(17, 31, 50, 0.72);
    padding: 0.55rem 0.9rem;
    color: #e5edf7;
    font-size: 0.88rem;
    transition:
      background 160ms ease,
      border-color 160ms ease;
  }

  :global(.raw-error-close:hover) {
    background: rgba(25, 47, 76, 0.9);
    border-color: rgba(108, 145, 192, 0.4);
  }

</style>
