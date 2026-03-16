<script lang="ts">
  import { tick } from "svelte";
  import { ClipboardList, Eye, X } from "@lucide/svelte";
  import { m } from "$lib/paraglide/messages.js";
  import type {LorcanaCardSnapshot, LorcanaPlayerSide} from "@/features/simulator/model/contracts.js";
  import type {ActivePlayerGuidanceItem} from "@/features/simulator/model/active-player-guidance.js";
  import {
    BOARD_CENTER_ANCHOR_ID,
    createCardAnchorId,
    createSeatHandAnchorId,
    measureBoardAnchorRect,
    type BoardAnchorRect,
    type BoardAnchorSnapshot,
    type BoardLocalRect,
  } from "@/features/simulator/animations/board-move-animations.js";
  import HandZone from "@/features/simulator/board/HandZone.svelte";
  import DiscardPileDialog from "@/features/simulator/dialogs/DiscardPileDialog.svelte";
  import ActivePlayerGuidance from "@/features/simulator/panels/ActivePlayerGuidance.svelte";
  import PendingEffectsPopover from "@/features/simulator/panels/PendingEffectsPopover.svelte";
  import ScryResolutionDialog, {
    type ScryResolutionSelection,
  } from "@/features/simulator/dialogs/ScryResolutionDialog.svelte";
  import BoardAnimationLayer from "./BoardAnimationLayer.svelte";
  import ChallengeAimOverlay from "@/features/simulator/board/ChallengeAimOverlay.svelte";
  import MobilePlayerMenubar from "@/features/simulator/panels/MobilePlayerMenubar.svelte";
  import SeatLane from "@/features/simulator/board/SeatLane.svelte";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import {
    useLorcanaBoardPresenter,
    useLorcanaSidebarPresenter,
  } from "@/features/simulator/context/game-context.svelte.js";
  import {useSimulatorCardContext} from "@/features/simulator/context/simulator-card-context.svelte.js";
  import type {SimulatorLayoutMode} from "@/features/simulator/model/layout-mode.svelte.js";
  import type {ScryPendingEffectView} from "@/features/simulator/model/pending-effect-payload.js";

  interface PendingEffectsPopoverItem {
    id: string;
    kind: "bag" | "pending";
    title: string;
    subtitle: string;
    detail: string;
    badge: string;
    card: LorcanaCardSnapshot | null;
    isActive?: boolean;
    canResolve?: boolean;
    canAccept?: boolean;
    canReject?: boolean;
    disabledReason?: string;
    primaryActionLabel?: string;
    onResolve?: () => void;
    onPrimaryAction?: () => void;
    onAccept?: () => void;
    onReject?: () => void;
  }

  interface TabletopBoardProps {
    layoutMode?: SimulatorLayoutMode;
    compactActionCount?: number;
    pendingEffectsPopoverItems?: PendingEffectsPopoverItem[];
    activePlayerGuidance?: ActivePlayerGuidanceItem[];
    scryResolutionOpen?: boolean;
    scryResolutionEffect?: ScryPendingEffectView | null;
    onOpenCompactPanels?: (tab?: "moves" | "log") => void;
    onCloseScryResolution?: () => void;
    onConfirmScryResolution?: (destinations: ScryResolutionSelection[]) => void;
  }

  interface PointerPosition {
    x: number;
    y: number;
  }

  let {
    layoutMode = "desktop",
    compactActionCount = 0,
    pendingEffectsPopoverItems = [],
    activePlayerGuidance = [],
    scryResolutionOpen = false,
    scryResolutionEffect = null,
    onOpenCompactPanels,
    onCloseScryResolution,
    onConfirmScryResolution,
  }: TabletopBoardProps = $props();

  const board = useLorcanaBoardPresenter();
  const sidebar = useLorcanaSidebarPresenter();
  const simulatorCardContext = useSimulatorCardContext();
  const boardSnapshot = $derived(board.boardSnapshot);
  const ownerSide = $derived(board.ownerSide);
  const topSeat = board.topSeat;
  const bottomSeat = board.bottomSeat;

  let tabletopRef: HTMLElement | null = $state(null);
  let boardScrollRef: HTMLElement | null = $state(null);
  let boardRef: HTMLElement | null = $state(null);
  let boardAnchorSnapshot: BoardAnchorSnapshot | null = $state(null);
  let challengePointerClientPosition: PointerPosition | null = $state(null);
  let anchorRevision = 0;
  let measurementRequestId = 0;
  const boardScrollListenerOptions: AddEventListenerOptions = { passive: true };

  const bottomSide = $derived(board.bottomSide);
  const topSide = $derived(board.topSide);
  const hasOwnedView = $derived(board.hasOwnedView);
  const discardCards = $derived(board.discardCards);
  const topHasPriority = $derived(board.topHasPriority);
  const bottomHasPriority = $derived(board.bottomHasPriority);
  const topIsTurnPlayer = $derived(board.topIsTurnPlayer);
  const bottomIsTurnPlayer = $derived(board.bottomIsTurnPlayer);
  const activeSide = $derived(sidebar.activeSide);
  const guidanceAnchor = board.guidanceAnchor;
  const topSummary = $derived(board.getPlayerSummary(topSide));
  const bottomSummary = $derived(board.getPlayerSummary(bottomSide));
  const isCompactLayout = $derived(layoutMode !== "desktop");
  const isMobileLayout = $derived(layoutMode === "mobile");
  const isTabletLayout = $derived(layoutMode === "tablet");
  const selectedCard = $derived.by(() => {
    const selectedCardId = sidebar.actionSelectionSession?.targetCardId ?? sidebar.actionSelectionSession?.sourceCardId ?? null;
    if (!selectedCardId) {
      return null;
    }

    return board.cardSnapshotsById[selectedCardId] ?? null;
  });
  const compactPreviewCard = $derived.by(() => {
    if (!isCompactLayout) {
      return null;
    }

    return selectedCard ?? simulatorCardContext.hoveredCard ?? null;
  });
  const compactPreviewPlayable = $derived.by(() => {
    if (!compactPreviewCard) {
      return false;
    }

    return (
      compactPreviewCard.ownerSide === bottomSide &&
      compactPreviewCard.zoneId === "hand" &&
      board.playableHandCardIds.includes(compactPreviewCard.cardId)
    );
  });
  const selectedCardPlayable = $derived.by(() => {
    if (!selectedCard) {
      return false;
    }

    return (
      selectedCard.ownerSide === bottomSide &&
      selectedCard.zoneId === "hand" &&
      board.playableHandCardIds.includes(selectedCard.cardId)
    );
  });
  const topPlayerLabel = $derived(
    hasOwnedView ? m["sim.player.opponent"]({}) : m["sim.player.side.playerTwo"]({}),
  );
  const bottomPlayerLabel = $derived(
    hasOwnedView ? m["sim.player.you"]({}) : m["sim.player.side.playerOne"]({}),
  );
  const executableMoves = $derived(sidebar.executableMoves);
  const moveLogEntries = $derived(sidebar.moveLogEntries);
  const pendingEffectsCount = $derived(pendingEffectsPopoverItems.length);
  const challengeSelectionSession = $derived(sidebar.actionSelectionSession);
  const isChallengeAimOverlayVisible = $derived(
    layoutMode === "desktop" &&
      challengeSelectionSession?.categoryId === "challenge" &&
      (challengeSelectionSession.phase === "choose-target" ||
        challengeSelectionSession.phase === "confirm"),
  );
  const challengeAttackerCard = $derived.by(() => {
    const attackerId = challengeSelectionSession?.sourceCardId;
    if (!isChallengeAimOverlayVisible || !attackerId) {
      return null;
    }

    return board.cardSnapshotsById[attackerId] ?? null;
  });
  const lockedChallengeTargetCard = $derived.by(() => {
    if (!isChallengeAimOverlayVisible) {
      return null;
    }

    const lockedTargetId = challengeSelectionSession?.targetCardId;
    if (lockedTargetId) {
      return board.cardSnapshotsById[lockedTargetId] ?? null;
    }

    const hoveredCard = simulatorCardContext.hoveredCard;
    if (!hoveredCard) {
      return null;
    }

    return sidebar.getActionSessionCardState(hoveredCard.cardId).isSelectable ? hoveredCard : null;
  });
  const challengeBoardSize = $derived.by(() => {
    const boardRect = boardAnchorSnapshot?.boardRect;
    if (boardRect) {
      return {
        width: boardRect.width,
        height: boardRect.height,
      };
    }

    return {
      width: boardRef?.clientWidth ?? 0,
      height: boardRef?.clientHeight ?? 0,
    };
  });
  const challengePointerPosition = $derived.by(() => {
    if (!challengePointerClientPosition) {
      return null;
    }

    return resolveBoardLocalPoint(
      challengePointerClientPosition.x,
      challengePointerClientPosition.y,
    );
  });
  const challengeSourceAnchorRect = $derived.by(() => {
    if (!challengeAttackerCard) {
      return null;
    }

    return resolveCardAnchorLocalRect(challengeAttackerCard);
  });
  const lockedChallengeTargetRect = $derived.by(() => {
    if (!lockedChallengeTargetCard) {
      return null;
    }

    return resolveCardAnchorLocalRect(lockedChallengeTargetCard);
  });
  const challengeTargetPoint = $derived.by(() => {
    if (lockedChallengeTargetRect) {
      return {
        x: lockedChallengeTargetRect.centerX,
        y: lockedChallengeTargetRect.centerY,
      };
    }

    return challengePointerPosition;
  });
  const challengePreview = $derived.by(() => {
    if (!challengeAttackerCard || !lockedChallengeTargetCard) {
      return null;
    }

    return board.previewChallenge(challengeAttackerCard.cardId, lockedChallengeTargetCard.cardId);
  });

  function getCardTypeLine(card: LorcanaCardSnapshot | null): string {
    if (!card) {
      return "";
    }

    const classifications = card.classifications?.filter((classification) => classification.trim().length > 0) ?? [];
    if (classifications.length > 0) {
      return classifications.join(" · ");
    }

    if (!card.cardType) {
      return "Card";
    }

    return card.cardType.charAt(0).toUpperCase() + card.cardType.slice(1);
  }

  function getCardSnippet(card: LorcanaCardSnapshot | null): string {
    if (!card) {
      return "";
    }

    const structuredEntry = card.textEntries?.find((entry) => entry.description?.trim() || entry.title.trim());
    if (structuredEntry?.description?.trim()) {
      return structuredEntry.description.trim();
    }

    if (structuredEntry?.title.trim()) {
      return structuredEntry.title.trim();
    }

    if (!card.text?.trim()) {
      return "Select a card to keep its details pinned here during play.";
    }

    return card.text.trim().replace(/\s+/g, " ");
  }

  function openCompactPreview(): void {
    if (!compactPreviewCard) {
      return;
    }

    simulatorCardContext.openGlobalPreview(compactPreviewCard);
  }

  function clearCompactPreview(): void {
    sidebar.cancelActionSelectionSession();
  }

  function clearInteractionState(): void {
    if (sidebar.actionSelectionSession) {
      sidebar.cancelActionSelectionSession();
      return;
    }
  }

  function shouldPreserveInteractionState(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) {
      return false;
    }

    return Boolean(
      target.closest(
        [
          "[data-card-id]",
          "button",
          "a",
          "input",
          "select",
          "textarea",
          "[role='button']",
          "[role='dialog']",
          "[data-sidebar]",
          "[data-radix-popper-content-wrapper]",
        ].join(", "),
      ),
    );
  }

  function handleTabletopPointerDown(event: PointerEvent): void {
    if (shouldPreserveInteractionState(event.target)) {
      return;
    }

    clearInteractionState();
  }

  function openPlayerSettings(): void {
    sidebar.handleOpenPlayerSettings();
  }

  async function scheduleAnchorMeasurement(): Promise<void> {
    measurementRequestId += 1;
    const requestId = measurementRequestId;
    await tick();

    requestAnimationFrame(() => {
      if (requestId !== measurementRequestId) {
        return;
      }

      publishAnchorSnapshot();
    });
  }

  function publishAnchorSnapshot(): void {
    if (!tabletopRef || !boardRef) {
      return;
    }

    const boardRect = boardRef.getBoundingClientRect();
    if (boardRect.width <= 0 || boardRect.height <= 0) {
      return;
    }

    const anchors: Record<string, ReturnType<typeof measureBoardAnchorRect>> = {};
    for (const element of tabletopRef.querySelectorAll<HTMLElement>("[data-board-anchor-id]")) {
      const anchorId = element.dataset.boardAnchorId;
      if (!anchorId) {
        continue;
      }

      anchors[anchorId] = measureBoardAnchorRect(element.getBoundingClientRect());
    }

    anchorRevision += 1;
    boardAnchorSnapshot = {
      revision: anchorRevision,
      boardRect: measureBoardAnchorRect(boardRect),
      anchors,
    };
    board.handleBoardAnchorsChange(boardAnchorSnapshot);
  }

  function toBoardLocalRect(anchorRect: BoardAnchorRect, boardRect: BoardAnchorRect): BoardLocalRect {
    return {
      x: anchorRect.left - boardRect.left,
      y: anchorRect.top - boardRect.top,
      width: anchorRect.width,
      height: anchorRect.height,
      centerX: anchorRect.centerX - boardRect.left,
      centerY: anchorRect.centerY - boardRect.top,
    };
  }

  function resolveBoardLocalPoint(clientX: number, clientY: number): PointerPosition | null {
    const boardRect = boardAnchorSnapshot?.boardRect;
    if (!boardRect) {
      return null;
    }

    return {
      x: clientX - boardRect.left,
      y: clientY - boardRect.top,
    };
  }

  function resolveCardAnchorLocalRect(card: LorcanaCardSnapshot): BoardLocalRect | null {
    const boardRect = boardAnchorSnapshot?.boardRect;
    const anchorRect =
      boardAnchorSnapshot?.anchors[createCardAnchorId(card.ownerSide, card.zoneId, card.cardId)];
    if (!boardRect || !anchorRect) {
      return null;
    }

    return toBoardLocalRect(anchorRect, boardRect);
  }

  function handleBoardPointerMove(event: PointerEvent): void {
    if (!isChallengeAimOverlayVisible) {
      return;
    }

    challengePointerClientPosition = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleBoardPointerLeave(): void {
    challengePointerClientPosition = null;
  }

  function formatInkSummary(playerSide: LorcanaPlayerSide): string {
    const summary = board.getPlayerSummary(playerSide);
    if (!summary) {
      return "0/0";
    }

    return `${summary.availableInk ?? 0}/${summary.inkwellCount}`;
  }

  $effect(() => {
    if (!boardSnapshot || !tabletopRef || !boardRef) {
      return;
    }

    scheduleAnchorMeasurement();
  });

  $effect(() => {
    if (!tabletopRef || !boardRef || typeof ResizeObserver === "undefined") {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      scheduleAnchorMeasurement();
    });

    resizeObserver.observe(tabletopRef);
    resizeObserver.observe(boardRef);
    if (boardScrollRef) {
      resizeObserver.observe(boardScrollRef);
      boardScrollRef.addEventListener("scroll", scheduleAnchorMeasurement, boardScrollListenerOptions);
    }
    window.addEventListener("resize", scheduleAnchorMeasurement);

    return () => {
      resizeObserver.disconnect();
      boardScrollRef?.removeEventListener("scroll", scheduleAnchorMeasurement, boardScrollListenerOptions);
      window.removeEventListener("resize", scheduleAnchorMeasurement);
    };
  });

  $effect(() => {
    if (isChallengeAimOverlayVisible) {
      return;
    }

    challengePointerClientPosition = null;
  });
</script>

<div
  class="tabletop-container w-full h-full overflow-hidden relative"
  data-layout-mode={layoutMode}
  role="presentation"
  bind:this={tabletopRef}
  onpointerdown={handleTabletopPointerDown}
>
  <PendingEffectsPopover items={pendingEffectsPopoverItems} />

  <div class="tabletop-shell">
    {#if isMobileLayout}
      <div class="mobile-shell">
        <div class="mobile-shell__topbar">
          <MobilePlayerMenubar
            seat="top"
            player={{
              label: topPlayerLabel,
              side: topSide,
              summary: topSummary,
              isActive: activeSide === topSide,
              isTurnPlayer: topIsTurnPlayer,
              hasPriority: topHasPriority,
            }}
            logCount={moveLogEntries.length}
            selectedCard={selectedCard}
            selectedCardPlayable={selectedCardPlayable}
            onOpenLog={() => onOpenCompactPanels?.("log")}
            onOpenCardPreview={openCompactPreview}
          />
        </div>

        <div class="mobile-shell__hand mobile-shell__hand--top">
          <div
            class="seat-hand-anchor seat-hand-anchor--top"
            data-board-anchor-id={createSeatHandAnchorId(topSide)}
            aria-hidden="true"
          ></div>
          <HandZone
            {layoutMode}
            playerSide={topSide}
            seat={topSeat}
            isOpponent={hasOwnedView}
          />
        </div>

        <div
          class="board-scroll-area board-scroll-area--mobile overflow-x-hidden overflow-y-auto overscroll-contain"
          bind:this={boardScrollRef}
        >
          <div
            class="tabletop-board relative flex gap-2 w-full min-h-full h-fit rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
            bind:this={boardRef}
            role="presentation"
            onpointermove={handleBoardPointerMove}
            onpointerleave={handleBoardPointerLeave}
          >
            <div
              class="board-center-anchor"
              data-board-anchor-id={BOARD_CENTER_ANCHOR_ID}
              aria-hidden="true"
            ></div>

            <div class="main-area flex-1 flex flex-col gap-2 min-w-0 z-[1] overflow-visible">
              <SeatLane
                {layoutMode}
                playerSide={topSide}
                seat={topSeat}
                isOpponent={hasOwnedView}
                isTurnPlayer={topIsTurnPlayer}
                hasPriority={topHasPriority}
                seatPosition="top"
                onDiscardClick={() => board.handleDiscardClick(topSide)}
              />

              <SeatLane
                {layoutMode}
                playerSide={bottomSide}
                seat={bottomSeat}
                isOpponent={false}
                isTurnPlayer={bottomIsTurnPlayer}
                hasPriority={bottomHasPriority}
                seatPosition="bottom"
                onDiscardClick={() => board.handleDiscardClick(bottomSide)}
              />
            </div>

            <ChallengeAimOverlay
              width={challengeBoardSize.width}
              height={challengeBoardSize.height}
              sourceRect={challengeSourceAnchorRect}
              targetPoint={challengeTargetPoint}
              lockedTargetRect={lockedChallengeTargetRect}
              preview={challengePreview}
            />
            <BoardAnimationLayer />
          </div>
        </div>

        <div class="mobile-shell__hand mobile-shell__hand--bottom">
          <div
            class="seat-hand-anchor seat-hand-anchor--bottom"
            data-board-anchor-id={createSeatHandAnchorId(bottomSide)}
            aria-hidden="true"
          ></div>
          <HandZone
            {layoutMode}
            playerSide={bottomSide}
            seat={bottomSeat}
            isOpponent={false}
          />
        </div>

        <div class="mobile-shell__bottombar">
          <MobilePlayerMenubar
            seat="bottom"
            player={{
              label: bottomPlayerLabel,
              side: bottomSide,
              summary: bottomSummary,
              isActive: activeSide === bottomSide,
              isTurnPlayer: bottomIsTurnPlayer,
              hasPriority: bottomHasPriority,
            }}
            actionCount={executableMoves.length}
            pendingCount={pendingEffectsCount}
            logCount={moveLogEntries.length}
            onOpenMoves={() => onOpenCompactPanels?.("moves")}
            onOpenLog={() => onOpenCompactPanels?.("log")}
            onOpenSettings={openPlayerSettings}
          />
        </div>
      </div>
    {:else}
      <div class="board-chrome board-chrome--top">
        {#if isTabletLayout}
          <div class="player-strip player-strip--top">
            <div class="player-strip__identity">
              <span class="player-strip__eyebrow">Top seat</span>
              <span class="player-strip__name">{topPlayerLabel}</span>
            </div>

            <div class="player-strip__score">
              <span class="player-strip__score-value">{topSummary?.lore ?? 0}</span>
              <span class="player-strip__score-label">Lore</span>
            </div>

            <div class="player-strip__stats">
              <span class="player-strip__stat">{formatInkSummary(topSide)} ink</span>
              <span class="player-strip__stat">{topSummary?.handCount ?? 0} hand</span>
              <span class="player-strip__stat">{topSummary?.deckCount ?? 0} deck</span>
              {#if topIsTurnPlayer}
                <span class="player-strip__stat player-strip__stat--turn">Turn</span>
              {/if}
              {#if topHasPriority}
                <span class="player-strip__stat player-strip__stat--priority">Priority</span>
              {/if}
            </div>
          </div>
        {/if}

        <div class="hand-shell hand-shell--top">
          <div
            class="seat-hand-anchor seat-hand-anchor--top"
            data-board-anchor-id={createSeatHandAnchorId(topSide)}
            aria-hidden="true"
          ></div>
          <HandZone
            {layoutMode}
            playerSide={topSide}
            seat={topSeat}
            isOpponent={hasOwnedView}
          />
        </div>
      </div>

      <div
        class="board-scroll-area overflow-x-hidden overflow-y-auto overscroll-contain"
        bind:this={boardScrollRef}
      >
        <div
          class="tabletop-board relative flex gap-2 w-full min-h-full h-fit rounded-xl shadow-[0_25px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
          bind:this={boardRef}
          role="presentation"
          onpointermove={handleBoardPointerMove}
          onpointerleave={handleBoardPointerLeave}
        >
          <div
            class="board-center-anchor"
            data-board-anchor-id={BOARD_CENTER_ANCHOR_ID}
            aria-hidden="true"
          ></div>

          <div class="main-area flex-1 flex flex-col gap-2 min-w-0 z-[1] overflow-visible">
            <SeatLane
              {layoutMode}
              playerSide={topSide}
              seat={topSeat}
              isOpponent={hasOwnedView}
              isTurnPlayer={topIsTurnPlayer}
              hasPriority={topHasPriority}
              seatPosition="top"
              onDiscardClick={() => board.handleDiscardClick(topSide)}
            />

            <SeatLane
              {layoutMode}
              playerSide={bottomSide}
              seat={bottomSeat}
              isOpponent={false}
              isTurnPlayer={bottomIsTurnPlayer}
              hasPriority={bottomHasPriority}
              seatPosition="bottom"
              onDiscardClick={() => board.handleDiscardClick(bottomSide)}
            />
          </div>

          <ChallengeAimOverlay
            width={challengeBoardSize.width}
            height={challengeBoardSize.height}
            sourceRect={challengeSourceAnchorRect}
            targetPoint={challengeTargetPoint}
            lockedTargetRect={lockedChallengeTargetRect}
            preview={challengePreview}
          />
          <BoardAnimationLayer />
        </div>
      </div>

      <div class="board-chrome board-chrome--bottom">
        <div class="hand-shell hand-shell--bottom">
          <div
            class="seat-hand-anchor seat-hand-anchor--bottom"
            data-board-anchor-id={createSeatHandAnchorId(bottomSide)}
            aria-hidden="true"
          ></div>
          <HandZone
            {layoutMode}
            playerSide={bottomSide}
            seat={bottomSeat}
            isOpponent={false}
          />
        </div>

        {#if isTabletLayout && compactPreviewCard}
          <section class="selected-card-dock" aria-label="Selected card details">
            <div class="selected-card-dock__thumb">
              <LorcanaCard
                card={compactPreviewCard}
                size="small"
                useContainerSize
                imageFormat="art_and_name"
                showHoverCard={false}
                isMasked={compactPreviewCard.isMasked}
                isExerted={compactPreviewCard.readyState === "exerted"}
                isDrying={compactPreviewCard.isDrying ?? false}
                damage={compactPreviewCard.damage ?? 0}
              />
            </div>

            <div class="selected-card-dock__content">
              <div class="selected-card-dock__header">
                <div class="selected-card-dock__titles">
                  <p class="selected-card-dock__name">{compactPreviewCard.label}</p>
                  <p class="selected-card-dock__type">{getCardTypeLine(compactPreviewCard)}</p>
                </div>

                <div class="selected-card-dock__badges">
                  <span class="selected-card-dock__badge">Cost {compactPreviewCard.cost ?? 0}</span>
                  {#if compactPreviewCard.cardType === "character"}
                    <span class="selected-card-dock__badge">
                      {(compactPreviewCard.strength ?? 0)}/{Math.max(0, (compactPreviewCard.willpower ?? 0) - (compactPreviewCard.damage ?? 0))}
                    </span>
                  {/if}
                  {#if compactPreviewPlayable}
                    <span class="selected-card-dock__badge selected-card-dock__badge--playable">
                      Playable
                    </span>
                  {/if}
                </div>
              </div>

              <p class="selected-card-dock__text">{getCardSnippet(compactPreviewCard)}</p>
            </div>

            <div class="selected-card-dock__actions">
              <button
                type="button"
                class="selected-card-dock__action"
                onclick={openCompactPreview}
                aria-label="Open full card preview"
              >
                <Eye class="size-4" />
              </button>

              {#if selectedCard}
                <button
                  type="button"
                  class="selected-card-dock__action"
                  onclick={clearCompactPreview}
                  aria-label="Clear selected card"
                >
                  <X class="size-4" />
                </button>
              {/if}
            </div>
          </section>
        {/if}

        {#if isTabletLayout}
          <div class="player-strip player-strip--bottom">
            <div class="player-strip__summary">
              <span class="player-strip__name">{bottomPlayerLabel}</span>
              <span class="player-strip__stat">{bottomSummary?.lore ?? 0} lore</span>
              <span class="player-strip__stat">{formatInkSummary(bottomSide)} ink</span>
              <span class="player-strip__stat">{bottomSummary?.handCount ?? 0} hand</span>
            </div>

            <button
              type="button"
              class="compact-actions-trigger"
              onclick={() => onOpenCompactPanels?.("moves")}
            >
              <ClipboardList class="size-4" />
              <span>{m["sim.actions.panel.title"]({})}</span>
              <span class="compact-actions-trigger__count">{compactActionCount}</span>
            </button>
          </div>
        {/if}
      </div>
    {/if}
  </div>

  <ActivePlayerGuidance items={activePlayerGuidance} anchor={guidanceAnchor} />

  <DiscardPileDialog
    bind:open={() => board.isDiscardDialogOpen, (open) => board.setDiscardDialogOpen(open)}
    cards={discardCards}
    playerSide={board.discardDialogSide ?? "playerOne"}
    viewerSide={ownerSide}
    target={board.discardTarget}
  />

  <ScryResolutionDialog
    bind:open={() => scryResolutionOpen, (open) => {
      if (!open) {
        onCloseScryResolution?.();
      }
    }}
    effect={scryResolutionEffect}
    onClose={onCloseScryResolution}
    onConfirm={onConfirmScryResolution ?? (() => {})}
  />
</div>

<style>
  .tabletop-container {
    --hand-guidance-offset: 3rem;
    --hand-guidance-clearance: 1.65rem;
    --top-hand-screen-offset: -2rem;
    --bottom-hand-screen-offset: 2rem;
    background: radial-gradient(ellipse at 50% 0%, #1a2744 0%, #0f1720 60%, #080c12 100%);
  }

  .tabletop-shell {
    --sim-play-card-width: 180px;
    --sim-hand-card-width: 122px;
    --sim-side-zone-card-width: 50px;

    container-type: size;
    position: relative;
    min-height: 100%;
    height: 100%;
    padding: 0.45rem;
    padding-bottom: calc(0.45rem + env(safe-area-inset-bottom));
  }

  .mobile-shell {
    display: flex;
    height: 100%;
    min-height: 0;
    flex-direction: column;
    gap: 0.35rem;
  }

  .mobile-shell__topbar,
  .mobile-shell__bottombar,
  .mobile-shell__hand {
    position: relative;
    z-index: 2;
    flex-shrink: 0;
  }

  .mobile-shell__topbar {
    position: sticky;
    top: 0;
  }

  .mobile-shell__bottombar {
    position: sticky;
    bottom: 0;
  }

  .mobile-shell__hand {
    display: flex;
    justify-content: center;
    min-width: 0;
    border-radius: 1rem;
    border: 1px solid rgba(125, 211, 252, 0.14);
    background: linear-gradient(180deg, rgba(3, 12, 26, 0.92), rgba(7, 22, 41, 0.88));
    box-shadow: 0 14px 32px rgba(2, 6, 23, 0.26);
  }

  .mobile-shell__hand--top {
    position: sticky;
    top: 0;
  }

  .mobile-shell__hand--bottom {
    position: sticky;
    bottom: 0;
  }

  .board-chrome {
    position: absolute;
    left: 0.45rem;
    right: 0.45rem;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    pointer-events: none;
  }

  .board-chrome--top {
    top: calc(0.45rem + var(--top-hand-screen-offset));
  }

  .board-chrome--bottom {
    bottom: calc(0.45rem + env(safe-area-inset-bottom) - var(--bottom-hand-screen-offset));
  }

  .hand-shell {
    position: relative;
    display: flex;
    justify-content: center;
    min-width: 0;
    pointer-events: none;
  }

  .tabletop-board {
    container-type: size;
    min-width: 100%;
    min-height: 100%;
    background: linear-gradient(180deg, #264a73 0%, #1e3a5f 50%, #1a3252 100%);
  }

  .board-scroll-area {
    position: absolute;
    inset: 0;
    scrollbar-gutter: stable both-edges;
    scrollbar-width: thin;
    scrollbar-color: rgba(143, 211, 255, 0.7) rgba(7, 18, 31, 0.42);
  }

  .board-scroll-area::-webkit-scrollbar {
    width: 12px;
  }

  .board-scroll-area::-webkit-scrollbar-track {
    background: rgba(7, 18, 31, 0.42);
  }

  .board-scroll-area::-webkit-scrollbar-thumb {
    border: 2px solid rgba(7, 18, 31, 0.42);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(143, 211, 255, 0.88) 0%, rgba(67, 156, 220, 0.9) 100%);
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  }

  .board-scroll-area::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, rgba(189, 232, 255, 0.95) 0%, rgba(89, 186, 255, 0.95) 100%);
  }

  .board-scroll-area--mobile {
    position: relative;
    inset: auto;
    flex: 1;
    min-height: 0;
    border: 1px solid rgba(125, 211, 252, 0.14);
    background: linear-gradient(180deg, rgba(38, 74, 115, 0.95) 0%, rgba(30, 58, 95, 0.96) 50%, rgba(26, 50, 82, 0.98) 100%);
    box-shadow:
      0 22px 60px rgba(0, 0, 0, 0.45),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .main-area {
    padding: 0.75rem;
  }

  .tabletop-container[data-layout-mode="tablet"] .tabletop-shell {
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgba(120, 179, 228, 0.2);
    background: linear-gradient(180deg, #264a73 0%, #1e3a5f 50%, #1a3252 100%);
    box-shadow:
      0 25px 80px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .tabletop-container[data-layout-mode="tablet"] .tabletop-board {
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  .seat-hand-anchor,
  .board-center-anchor {
    position: absolute;
    pointer-events: none;
    opacity: 0;
  }

  .seat-hand-anchor {
    width: 90px;
    height: 118px;
    left: 50%;
    transform: translateX(-50%);
  }

  .seat-hand-anchor--top {
    top: 0;
  }

  .seat-hand-anchor--bottom {
    bottom: 0;
  }

  .board-center-anchor {
    width: 92px;
    height: 128px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tabletop-container :global(.card-face:not(.card-face--exerted)) {
    transform: none !important;
  }

  .tabletop-container :global(.card-face.card-face--exerted),
  .tabletop-container :global(.card-back.card-back--exerted) {
    transform: rotate(90deg) !important;
    transform-origin: center center !important;
  }

  .tabletop-container :global(.ink-segment--available),
  .tabletop-container :global(.ink-drop),
  .tabletop-container :global(.drop-indicator),
  .tabletop-container :global(.playable-indicator) {
    animation: none !important;
  }

  .player-strip {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.45rem;
    flex-wrap: nowrap;
    min-width: 0;
    padding: 0.5rem 0.65rem;
    border-radius: 1rem;
    border: 1px solid rgba(125, 211, 252, 0.18);
    background: linear-gradient(180deg, rgba(3, 12, 26, 0.88), rgba(7, 22, 41, 0.82));
    color: #dbeafe;
    box-shadow: 0 14px 35px rgba(2, 6, 23, 0.28);
    pointer-events: auto;
  }

  .player-strip__summary {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-wrap: wrap;
    min-width: 0;
  }

  .player-strip__identity {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 0.08rem;
  }

  .player-strip__eyebrow {
    font-size: 0.54rem;
    font-weight: 800;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(186, 230, 253, 0.72);
  }

  .player-strip__name {
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #f8fbff;
  }

  .player-strip__score {
    display: inline-flex;
    min-width: 2.8rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.05rem;
    padding: 0.3rem 0.5rem;
    border-radius: 0.8rem;
    background: linear-gradient(180deg, rgba(12, 25, 46, 0.95), rgba(8, 17, 32, 0.92));
    border: 1px solid rgba(148, 163, 184, 0.2);
  }

  .player-strip__score-value {
    font-size: 1.02rem;
    font-weight: 900;
    line-height: 1;
    color: #f8fbff;
  }

  .player-strip__score-label {
    font-size: 0.52rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(191, 219, 254, 0.72);
  }

  .player-strip__stats {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.35rem;
    flex-wrap: wrap;
    min-width: 0;
  }

  .player-strip__stat {
    display: inline-flex;
    align-items: center;
    min-height: 1.45rem;
    padding: 0.05rem 0.45rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.9);
    color: rgba(219, 234, 254, 0.84);
    font-size: 0.72rem;
    font-weight: 700;
  }

  .player-strip__stat--turn {
    background: rgba(180, 83, 9, 0.92);
    color: #ffedd5;
  }

  .player-strip__stat--priority {
    background: rgba(8, 145, 178, 0.92);
    color: #ecfeff;
  }

  .selected-card-dock {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.55rem;
    padding: 0.45rem 0.55rem;
    border-radius: 1rem;
    border: 1px solid rgba(125, 211, 252, 0.18);
    background: linear-gradient(180deg, rgba(4, 12, 24, 0.95), rgba(8, 19, 36, 0.92));
    box-shadow: 0 18px 40px rgba(2, 6, 23, 0.32);
    pointer-events: auto;
  }

  .selected-card-dock__thumb {
    --zone-card-width: 4rem;
    --zone-card-height: calc(var(--zone-card-width) / 0.9582);
    width: var(--zone-card-width);
    min-width: var(--zone-card-width);
  }

  .selected-card-dock__content {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 0.35rem;
  }

  .selected-card-dock__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.45rem;
    min-width: 0;
  }

  .selected-card-dock__titles {
    min-width: 0;
  }

  .selected-card-dock__name,
  .selected-card-dock__type,
  .selected-card-dock__text {
    margin: 0;
  }

  .selected-card-dock__name {
    font-size: 0.78rem;
    font-weight: 800;
    color: #f8fbff;
    line-height: 1.15;
  }

  .selected-card-dock__type {
    margin-top: 0.12rem;
    font-size: 0.64rem;
    color: rgba(191, 219, 254, 0.76);
    line-height: 1.2;
  }

  .selected-card-dock__badges {
    display: flex;
    justify-content: flex-end;
    gap: 0.3rem;
    flex-wrap: wrap;
  }

  .selected-card-dock__badge {
    display: inline-flex;
    align-items: center;
    min-height: 1.25rem;
    padding: 0.05rem 0.38rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.92);
    color: rgba(226, 232, 240, 0.94);
    font-size: 0.62rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .selected-card-dock__badge--playable {
    background: rgba(5, 150, 105, 0.92);
    color: #ecfdf5;
  }

  .selected-card-dock__text {
    display: -webkit-box;
    overflow: hidden;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 0.68rem;
    line-height: 1.35;
    color: rgba(226, 232, 240, 0.88);
  }

  .selected-card-dock__actions {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .selected-card-dock__action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    background: rgba(15, 23, 42, 0.96);
    color: #f8fafc;
  }

  .compact-actions-trigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 2.4rem;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 211, 252, 0.28);
    background: linear-gradient(180deg, rgba(8, 145, 178, 0.95), rgba(12, 74, 110, 0.94));
    color: #eff6ff;
    font-size: 0.78rem;
    font-weight: 800;
    box-shadow: 0 12px 24px rgba(2, 132, 199, 0.2);
    pointer-events: auto;
  }

  .compact-actions-trigger__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.35rem;
    min-height: 1.35rem;
    padding: 0 0.32rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    font-size: 0.7rem;
    line-height: 1;
  }

  @media (max-width: 1239px) {
    .tabletop-container {
      --hand-guidance-offset: 2.5rem;
      --hand-guidance-clearance: 1.05rem;
    }

    .tabletop-shell {
      gap: 0.45rem;
      padding: 0.35rem;
      padding-bottom: calc(0.35rem + env(safe-area-inset-bottom));
    }

    .main-area {
      padding: 0.65rem;
    }
  }

  @media (max-width: 767px) {
    .tabletop-container {
      --hand-guidance-offset: 2.2rem;
      --hand-guidance-clearance: 0.8rem;
    }

    .tabletop-shell {
      margin: 0;
      padding: 0;
    }

    .mobile-shell {
      gap: 0.25rem;
    }

    .mobile-shell__hand {
      border-radius: 0.9rem;
    }

    .player-strip {
      padding: 0.4rem 0.5rem;
      border-radius: 0.75rem;
    }

    .player-strip__eyebrow,
    .player-strip__score-label {
      font-size: 0.48rem;
    }

    .player-strip__name {
      font-size: 0.72rem;
    }

    .player-strip__score {
      min-width: 2.5rem;
      padding-inline: 0.42rem;
    }

    .player-strip__score-value {
      font-size: 0.92rem;
    }

    .player-strip__stat {
      font-size: 0.67rem;
    }

    .selected-card-dock {
      gap: 0.45rem;
      padding: 0.38rem 0.45rem;
    }

    .selected-card-dock__thumb {
      --zone-card-width: 3.35rem;
    }

    .selected-card-dock__name {
      font-size: 0.72rem;
    }

    .selected-card-dock__type {
      font-size: 0.6rem;
    }

    .selected-card-dock__text {
      font-size: 0.64rem;
    }

    .selected-card-dock__action {
      width: 1.8rem;
      height: 1.8rem;
    }

    .compact-actions-trigger {
      min-height: 2.15rem;
      padding: 0.35rem 0.68rem;
      font-size: 0.72rem;
    }

    .main-area {
      padding: 0.55rem;
    }
  }

  @media (min-width: 1240px) {
    .tabletop-shell {
      --sim-play-card-width: clamp(160px, min(24cqh, 20cqw), 220px);
      --sim-hand-card-width: clamp(120px, min(18cqh, 13cqw), 170px);
      --sim-side-zone-card-width: clamp(46px, min(8cqh, 5cqw), 72px);
    }
  }
</style>
