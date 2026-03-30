<script lang="ts">
    import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
    import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
    import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
    import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
    import type {
        LorcanaCardSnapshot,
        LorcanaPlayerSide,
        LorcanaTableSeat
    } from "@/features/simulator/model/contracts.js";
  import { m } from "$lib/i18n/messages.js";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import HotkeyCardBadge from "@/features/simulator/hotkeys/HotkeyCardBadge.svelte";
    import {createCardAnchorId, createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
    import {
        useLorcanaBoardPresenter,
        useLorcanaSidebarPresenter
    } from "@/features/simulator/context/game-context.svelte.js";
    import { useSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";
    import {
        useLorcanaSimulatorDndContext,
        createOptionalDraggable,
        createOptionalDroppable,
    } from "@/features/simulator/context/simulator-dnd-context.svelte.js";
    import type {SimulatorLayoutMode} from "@/features/simulator/model/layout-mode.svelte.js";

  interface HandZoneProps {
    layoutMode?: SimulatorLayoutMode;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    isOpponent: boolean;
    isTucked?: boolean;
    onToggleTucked?: (() => void) | undefined;
    hotkeyBindings?: Map<string, string>;
  }

  let {
    layoutMode = "desktop",
    playerSide,
    seat,
    isOpponent,
    isTucked = false,
    onToggleTucked,
    hotkeyBindings = new Map(),
  }: HandZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const sidebar = useLorcanaSidebarPresenter();
  const simulatorCardContext = useSimulatorCardContext();
  const dnd = useLorcanaSimulatorDndContext();
  const inFlightCardIds = $derived(board.inFlightCardIds);
  const cards = $derived(board.getZoneCards(playerSide, "hand").filter((card) => !inFlightCardIds.has(card.cardId)));
  const totalCards = $derived(board.getZoneTotalCards(playerSide, "hand"));
  const isMasked = $derived(board.isZoneMasked(playerSide, "hand"));
  const ownerId = $derived(board.getOwnerIdForSide(playerSide));
  const selectedCardIds = $derived(board.selectedCardIds);
  const playableCardIds = $derived(board.playableHandCardIds);
  const handDroppable = createOptionalDroppable({
    zone: "hand",
    get player() {
      return playerSide;
    },
    get disabled() {
      return isOpponent;
    },
  });
  const handDropState = $derived(dnd.getZoneDropState("hand", playerSide));
  const playDropState = $derived(dnd.getZoneDropState("play", playerSide));
  const inkwellDropState = $derived(dnd.getZoneDropState("inkwell", playerSide));
  const showDragTargets = $derived(!isOpponent && dnd.isDraggingHandCard);
  let handContainerEl = $state<HTMLDivElement | null>(null);
  let hiddenCardsToLeft = $state(0);
  let hiddenCardsToRight = $state(0);
  const showMobileHandControls = $derived(layoutMode === "mobile" && !isOpponent && cards.length > 0);
  const showDesktopTuckControl = $derived(
    layoutMode === "desktop" && typeof onToggleTucked === "function",
  );
  const tuckControlLabel = $derived(
    isTucked ? m["sim.hand.show"]({}) : m["sim.hand.hide"]({}),
  );

  function getFanRotation(index: number, total: number): number {
    if (layoutMode === "mobile") {
      return 0;
    }

    if (total <= 1) {
      return 0;
    }

    const maxSpread = isOpponent ? 15 : 10;
    const step = maxSpread / (total - 1);
    const rotation = -maxSpread / 2 + step * index;
    return playerSide === "playerTwo" ? -rotation : rotation;
  }

  function isPlayable(card: LorcanaCardSnapshot): boolean {
    if (isOpponent || isMasked) {
      return false;
    }

    return playableCardIds.includes(card.cardId);
  }

  const MAX_VISIBLE_HIDDEN_CARDS = 10;
  const effectiveTotal = $derived(Math.max(totalCards, cards.length));
  const hiddenPlaceholderCount = $derived(
    cards.length === 0 ? Math.min(effectiveTotal, MAX_VISIBLE_HIDDEN_CARDS) : 0,
  );
  const hiddenOverflowCount = $derived(Math.max(0, effectiveTotal - hiddenPlaceholderCount));

  function getScrollableHandCards(): HTMLElement[] {
    if (!handContainerEl) {
      return [];
    }

    return Array.from(handContainerEl.querySelectorAll<HTMLElement>(".hand-card"));
  }

  function updateHiddenCardsToRight(): void {
    if (layoutMode !== "mobile" || !handContainerEl) {
      hiddenCardsToLeft = 0;
      hiddenCardsToRight = 0;
      return;
    }

    const viewportLeft = handContainerEl.scrollLeft;
    const viewportRight = viewportLeft + handContainerEl.clientWidth;
    const tolerance = 8;
    const handCards = getScrollableHandCards();

    hiddenCardsToLeft = handCards.filter((cardEl) => {
      const cardLeft = cardEl.offsetLeft;
      return cardLeft + tolerance < viewportLeft;
    }).length;
    hiddenCardsToRight = handCards.filter((cardEl) => {
      const cardRight = cardEl.offsetLeft + cardEl.offsetWidth;
      return cardRight - tolerance > viewportRight;
    }).length;
  }

  function getHorizontalScrollStep(): number {
    if (!handContainerEl) {
      return 0;
    }

    const handCards = getScrollableHandCards();
    const firstCard = handCards[0];
    if (!firstCard) {
      return handContainerEl.clientWidth * 0.8;
    }

    const secondCard = handCards[1];
    if (secondCard) {
      return Math.max(secondCard.offsetLeft - firstCard.offsetLeft, firstCard.offsetWidth);
    }

    return firstCard.offsetWidth;
  }

  function scrollHand(direction: "left" | "right"): void {
    if (!handContainerEl) {
      return;
    }

    const step = getHorizontalScrollStep();
    if (step <= 0) {
      return;
    }

    handContainerEl.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  function handleToggleTucked(): void {
    onToggleTucked?.();
  }

  $effect(() => {
    if (layoutMode !== "mobile" || !handContainerEl) {
      hiddenCardsToLeft = 0;
      hiddenCardsToRight = 0;
      return;
    }

    cards.length;
    hiddenPlaceholderCount;

    const container = handContainerEl;
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateHiddenCardsToRight);
    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".hand-card"));

    updateHiddenCardsToRight();
    container.addEventListener("scroll", updateHiddenCardsToRight, { passive: true });
    resizeObserver?.observe(container);

    for (const cardEl of cardElements) {
      resizeObserver?.observe(cardEl);
    }

    return () => {
      container.removeEventListener("scroll", updateHiddenCardsToRight);
      resizeObserver?.disconnect();
    };
  });
</script>

<div
  class="hand-zone"
  class:hand-zone--player-two={playerSide === "playerTwo"}
  class:hand-zone--drop-hover={handDropState === "valid"}
  class:hand-zone--tucked={isTucked}
  data-layout-mode={layoutMode}
  data-player-seat={seat}
  data-player-side={playerSide}
  data-zone-id="hand"
  data-testid={`hand-zone-${playerSide}`}
>
  {#if showDesktopTuckControl}
    <button
      type="button"
      class="hand-tuck-toggle"
      class:hand-tuck-toggle--player-two={playerSide === "playerTwo"}
      aria-label={tuckControlLabel}
      aria-pressed={isTucked}
      data-testid={`hand-tuck-toggle-${playerSide}`}
      onclick={handleToggleTucked}
    >
      <span class="hand-tuck-toggle__label">{tuckControlLabel}</span>
      {#if playerSide === "playerTwo"}
        {#if isTucked}
          <ChevronUpIcon class="size-4" />
        {:else}
          <ChevronDownIcon class="size-4" />
        {/if}
      {:else if isTucked}
        <ChevronDownIcon class="size-4" />
      {:else}
        <ChevronUpIcon class="size-4" />
      {/if}
    </button>
  {/if}

  {#if showDragTargets}
    <div class="hand-drag-targets" aria-hidden="true">
      <div
        class="hand-drag-target hand-drag-target--inkwell"
        class:hand-drag-target--preview={inkwellDropState === "preview"}
        class:hand-drag-target--valid={inkwellDropState === "valid"}
        class:hand-drag-target--invalid={inkwellDropState === "invalid"}
        data-player-side={playerSide}
        data-zone-id="inkwell"
      >
        <span class="hand-drag-target__label">{m["sim.zone.inkwell"]({})}</span>
      </div>

      <div
        class="hand-drag-target hand-drag-target--return"
        class:hand-drag-target--valid={handDropState === "valid"}
        data-player-side={playerSide}
        data-zone-id="hand"
        {@attach handDroppable.attach}
      >
        <span class="hand-drag-target__label">{m["sim.hand.returnToHand"]({})}</span>
      </div>

      <div
        class="hand-drag-target hand-drag-target--play"
        class:hand-drag-target--preview={playDropState === "preview"}
        class:hand-drag-target--valid={playDropState === "valid"}
        class:hand-drag-target--invalid={playDropState === "invalid"}
        data-player-side={playerSide}
        data-zone-id="play"
      >
        <span class="hand-drag-target__label">{m["sim.zone.play"]({})}</span>
      </div>
    </div>
  {/if}

  <div
    class="hand-container"
    bind:this={handContainerEl}
    data-board-anchor-id={createZoneAnchorId(playerSide, "hand")}
    data-board-scroll-sync={layoutMode === "mobile" ? "true" : undefined}
  >
    {#if cards.length > 0}
      {#each cards as card, index (card.cardId)}
        {@const rotation = getFanRotation(index, cards.length)}
        {@const playable = isPlayable(card)}
        {@const actionState = sidebar.getActionSessionCardState(card.cardId)}
        {@const isSelected =
          actionState.isSelected ||
          selectedCardIds.includes(card.cardId) ||
          simulatorCardContext.previewCard?.cardId === card.cardId}
        {@const draggable = createOptionalDraggable({
          card,
          disabled: isOpponent || isMasked || !playable,
        })}

        <div
          class="hand-card"
          class:hand-card--player-two={playerSide === "playerTwo"}
          class:hand-card--dragging={dnd.draggedCardId === card.cardId}
          class:hand-card--playable={playable}
          class:hand-card--selected={isSelected}
          data-card-id={card.cardId}
          data-player-seat={seat}
          data-player-id={card.ownerId}
          data-zone-id={card.zoneId}
          data-board-anchor-id={createCardAnchorId(playerSide, "hand", card.cardId)}
          style:--rotation="{rotation}deg"
          {@attach draggable.attach}
        >
          {#if hotkeyBindings.has(card.cardId)}
            <HotkeyCardBadge hotkey={hotkeyBindings.get(card.cardId)!} />
          {/if}
          <LorcanaCard
            {card}
            size="small"
            useContainerSize
            imageFormat="art_and_name"
            hoverShowActions
            clickOpensHover
            isSelected={isSelected}
            isMasked={isMasked}
            isPlayable={actionState.isSelectable || playable}
            isInvalidTarget={actionState.isInvalidTarget}
            isExerted={card.readyState === "exerted"}
            isDrying={card.isDrying ?? false}
            damage={card.damage ?? 0}
          />
        </div>
      {/each}
    {:else if hiddenPlaceholderCount > 0}
      {#each Array.from({ length: hiddenPlaceholderCount }) as _, index (`hidden-${index}`)}
        {@const rotation = getFanRotation(index, hiddenPlaceholderCount)}
        <div
          class="hand-card hand-card--placeholder"
          class:hand-card--player-two={playerSide === "playerTwo"}
          style:--rotation="{rotation}deg"
          aria-hidden="true"
        >
          <LorcanaCard
            size="small"
            imageFormat="art_and_name"
            isMasked
            useContainerSize
            {ownerId}
          />
        </div>
      {/each}
      {#if hiddenOverflowCount > 0}
        <div class="hand-overflow-badge">+{hiddenOverflowCount}</div>
      {/if}
    {:else}
      <div class="empty-hand">
        <span>{m["sim.hand.count"]({ count: effectiveTotal })}</span>
      </div>
    {/if}
  </div>

  {#if showMobileHandControls}
    <button
      type="button"
      class="mobile-hand-scroll-button mobile-hand-scroll-button--left"
      aria-label={m["sim.hand.scrollLeft"]({})}
      disabled={hiddenCardsToLeft === 0}
      onclick={() => {
        scrollHand("left");
      }}
    >
      <ChevronLeftIcon class="size-4" />
    </button>
  {/if}

  {#if showMobileHandControls}
    <button
      type="button"
      class="mobile-hand-scroll-button mobile-hand-scroll-button--right"
      aria-label={m["sim.hand.scrollRight"]({})}
      disabled={hiddenCardsToRight === 0}
      onclick={() => {
        scrollHand("right");
      }}
    >
      <ChevronRightIcon class="size-4" />
    </button>
  {/if}
</div>

<style>
  .hand-zone {
    --hand-card-aspect: 0.9582;
    --zone-card-width: var(--sim-hand-card-width, 122px);
    --zone-card-height: calc(var(--zone-card-width) / var(--hand-card-aspect));
    --hand-container-height: calc(var(--zone-card-height) + 0.75rem);
    --hand-card-overlap: -1.15rem;
    --hand-card-overlap-hover: 0.2rem;
    --hover-scale: 1.08;
    --hover-translate-y: -10px;

    display: flex;
    position: relative;
    width: min(100%, 100%);
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.1rem 0.35rem;
    pointer-events: none;
  }

  .hand-tuck-toggle {
    position: absolute;
    top: auto;
    right: auto;
    bottom: auto;
    left: 50%;
    z-index: 130;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    gap: 0.35rem;
    width: max-content;
    min-width: max-content;
    height: auto;
    min-height: 0;
    max-height: none;
    padding: 0.36rem 0.82rem;
    border: 1px solid rgba(147, 197, 253, 0.48);
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(18, 32, 57, 0.98), rgba(8, 18, 31, 0.96)),
      rgba(7, 18, 31, 0.96);
    box-shadow:
      0 10px 24px rgba(7, 18, 31, 0.42),
      0 0 0 1px rgba(191, 219, 254, 0.12) inset;
    color: rgba(241, 245, 249, 0.99);
    line-height: 1;
    white-space: nowrap;
    transform: translateX(-50%);
    pointer-events: auto;
    opacity: 0.92;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease,
      background 160ms ease;
  }

  .hand-tuck-toggle__label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .hand-tuck-toggle--player-two {
    top: 0;
    transform: translate(-50%, -35%);
  }

  .hand-zone:not(.hand-zone--player-two) .hand-tuck-toggle {
    bottom: 0;
    transform: translate(-50%, 35%);
  }

  .hand-zone--tucked .hand-tuck-toggle {
    opacity: 1;
    border-color: rgba(191, 219, 254, 0.72);
    box-shadow:
      0 12px 26px rgba(7, 18, 31, 0.48),
      0 0 0 1px rgba(219, 234, 254, 0.22) inset;
  }

  .hand-zone--drop-hover {
    transition: outline 180ms ease, background 180ms ease;
  }

  .hand-drag-targets {
    position: absolute;
    top: -0.55rem;
    bottom: -0.2rem;
    left: 0;
    right: 0;
    padding-inline: clamp(0.25rem, 1.5vw, 1rem);
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: clamp(0.45rem, 1.8vw, 1rem);
    pointer-events: none;
    z-index: 120;
  }

  .hand-zone--player-two .hand-drag-targets {
    top: -0.2rem;
    bottom: -0.55rem;
  }

  .hand-drag-target {
    flex: 0 1 clamp(6.75rem, 20vw, 12rem);
    min-width: 0;
    border: 2px dashed rgba(124, 176, 255, 0.5);
    border-radius: 18px;
    background:
      linear-gradient(180deg, rgba(73, 114, 171, 0.2), rgba(34, 56, 92, 0.08)),
      rgba(11, 24, 39, 0.18);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.03) inset,
      0 10px 28px rgba(7, 18, 31, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    transition:
      border-color 180ms ease,
      background 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease,
      flex-basis 180ms ease;
  }

  .hand-drag-target--return {
    flex-basis: clamp(8.5rem, 24vw, 15.5rem);
  }

  .hand-drag-target--inkwell {
    border-color: rgba(180, 140, 230, 0.54);
    background:
      linear-gradient(180deg, rgba(119, 62, 204, 0.2), rgba(62, 28, 105, 0.08)),
      rgba(22, 14, 39, 0.2);
  }

  .hand-drag-target--play {
    border-color: rgba(94, 234, 212, 0.5);
    background:
      linear-gradient(180deg, rgba(20, 83, 45, 0.18), rgba(6, 78, 59, 0.08)),
      rgba(9, 28, 26, 0.18);
  }

  .hand-drag-target--preview {
    border-style: solid;
    transform: translateY(-1px);
  }

  .hand-drag-target--valid {
    border-color: rgba(147, 197, 253, 0.92);
    background:
      linear-gradient(180deg, rgba(96, 165, 250, 0.24), rgba(30, 64, 175, 0.12)),
      rgba(15, 23, 42, 0.24);
    box-shadow:
      0 0 0 1px rgba(191, 219, 254, 0.12) inset,
      0 0 22px rgba(96, 165, 250, 0.22);
    transform: translateY(-1px) scale(1.01);
  }

  .hand-drag-target--invalid {
    border-color: rgba(248, 113, 113, 0.9);
    background:
      linear-gradient(180deg, rgba(185, 28, 28, 0.22), rgba(127, 29, 29, 0.12)),
      rgba(33, 16, 22, 0.22);
    box-shadow:
      0 0 0 1px rgba(254, 202, 202, 0.1) inset,
      0 0 22px rgba(248, 113, 113, 0.2);
  }

  .hand-drag-target__label {
    pointer-events: none;
    color: rgba(226, 232, 240, 0.88);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 0.18rem 0.5rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.55);
    border: 1px solid rgba(147, 197, 253, 0.18);
    position: relative;
    z-index: 121;
  }

  .hand-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    max-width: 100%;
    min-height: var(--hand-container-height);
    position: relative;
    pointer-events: none;
    z-index: 2;
  }

  .hand-zone--player-two .hand-container {
    align-items: flex-start;
  }

  .hand-card {
    --rotation: 0deg;
    --selected-translate-y: -8px;

    width: var(--zone-card-width);
    height: var(--zone-card-height);
    flex-shrink: 0;
    transform-origin: bottom center;
    transform: rotate(var(--rotation)) scale(1);
    transition:
      transform 220ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      margin 220ms ease-out,
      filter 180ms ease,
      box-shadow 180ms ease;
    margin: 0 var(--hand-card-overlap);
    position: relative;
    cursor: pointer;
    pointer-events: auto;
  }

  .hand-card--placeholder {
    cursor: default;
    pointer-events: none;
  }

  .hand-card--selected {
    z-index: 95;
    transform: rotate(var(--rotation)) translateY(var(--selected-translate-y));
    filter: brightness(1.18) saturate(1.18);
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.85), 0 10px 20px rgba(245, 158, 11, 0.28);
    margin: 0 var(--hand-card-overlap-hover);
  }

  .hand-card--selected::before {
    content: "";
    position: absolute;
    inset: -2px;
    border: 2px solid rgba(245, 158, 11, 0.9);
    border-radius: 12px;
    box-shadow: 0 0 14px rgba(245, 158, 11, 0.42);
    pointer-events: none;
    z-index: 5;
  }

  .hand-card--dragging {
    opacity: 0.3;
  }

  .hand-card--player-two {
    transform-origin: top center;
  }

  .hand-card--player-two.hand-card--selected {
    --selected-translate-y: 8px;
  }

  .hand-overflow-badge {
    align-self: center;
    margin-left: 0.35rem;
    font-size: 0.68rem;
    font-weight: 700;
    color: rgba(220, 230, 244, 0.95);
    background: rgba(7, 18, 31, 0.84);
    border: 1px solid rgba(112, 153, 204, 0.42);
    border-radius: 999px;
    padding: 0.12rem 0.4rem;
    pointer-events: none;
  }

  .empty-hand {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    color: rgba(150, 180, 210, 0.5);
    font-size: 0.75rem;
  }

  .hand-zone[data-layout-mode="mobile"] {
    --zone-card-width: 82px;
    --hand-container-height: calc(var(--zone-card-height) + 0.5rem);
    width: 100%;
    padding: 0;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-container {
    min-height: var(--hand-container-height);
    justify-content: flex-start;
    align-items: center;
    gap: 0.45rem;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
    padding: 0.3rem 0.4rem 0.2rem;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    pointer-events: auto;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-container::-webkit-scrollbar {
    display: none;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-card {
    margin: 0;
    transform: none;
    transform-origin: center center;
    scroll-snap-align: center;
    /* Preserve horizontal swipe-to-scroll while still allowing vertical drag gestures. */
    touch-action: pan-x pinch-zoom;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-card--selected {
    transform: translateY(-4px) scale(1.03);
    margin: 0;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-card--player-two.hand-card--selected {
    transform: translateY(4px) scale(1.03);
  }

  .hand-zone[data-layout-mode="mobile"] .hand-card--playable {
    filter: drop-shadow(0 0 16px rgba(250, 204, 21, 0.46));
  }

  .hand-zone[data-layout-mode="mobile"] .hand-overflow-badge {
    position: sticky;
    right: 0;
    margin-left: 0;
  }

  .mobile-hand-scroll-button {
    display: none;
  }

  .hand-zone[data-layout-mode="mobile"] .empty-hand {
    min-height: 4.5rem;
    width: 100%;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-drag-targets {
    top: -0.3rem;
    bottom: -0.45rem;
    gap: 0.35rem;
    padding-inline: 0.1rem;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-drag-target {
    flex-basis: clamp(5.25rem, 24vw, 7rem);
    border-radius: 14px;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-drag-target--return {
    flex-basis: clamp(7rem, 34vw, 9rem);
  }

  .hand-zone--player-two[data-layout-mode="mobile"] .hand-drag-targets {
    top: -0.1rem;
    bottom: -0.45rem;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-drag-target__label {
    font-size: 0.62rem;
    letter-spacing: 0.05em;
    padding-inline: 0.32rem;
  }

  .hand-zone[data-layout-mode="mobile"] .mobile-hand-scroll-button {
    position: absolute;
    top: 50%;
    z-index: 7;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.9rem;
    height: 3.5rem;
    border-radius: 999px;
    border: 1px solid rgba(124, 176, 255, 0.25);
    background:
      linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(8, 12, 18, 0.94)),
      rgba(7, 18, 31, 0.9);
    box-shadow: 0 8px 18px rgba(7, 18, 31, 0.28);
    color: rgba(226, 232, 240, 0.98);
    transform: translateY(-50%);
    pointer-events: auto;
    touch-action: manipulation;
  }

  .hand-zone[data-layout-mode="mobile"] .mobile-hand-scroll-button--left {
    left: -0.05rem;
  }

  .hand-zone[data-layout-mode="mobile"] .mobile-hand-scroll-button--right {
    right: -0.05rem;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-tuck-toggle {
    display: none;
  }

  .hand-zone[data-layout-mode="mobile"] .mobile-hand-scroll-button:disabled {
    opacity: 0.35;
    box-shadow: none;
  }

  @media (hover: hover) and (pointer: fine) {
    .hand-zone--player-two:hover .hand-tuck-toggle,
    .hand-zone--player-two .hand-tuck-toggle:hover,
    .hand-zone--player-two .hand-tuck-toggle:focus-visible {
      transform: translate(-50%, -42%);
    }

    .hand-zone:not(.hand-zone--player-two):hover .hand-tuck-toggle,
    .hand-zone:not(.hand-zone--player-two) .hand-tuck-toggle:hover,
    .hand-zone:not(.hand-zone--player-two) .hand-tuck-toggle:focus-visible {
      transform: translate(-50%, 42%);
    }

    .hand-tuck-toggle:hover,
    .hand-tuck-toggle:focus-visible {
      border-color: rgba(147, 197, 253, 0.58);
      box-shadow:
        0 12px 26px rgba(7, 18, 31, 0.36),
        0 0 0 1px rgba(191, 219, 254, 0.12) inset;
      background:
        linear-gradient(180deg, rgba(22, 33, 58, 0.96), rgba(8, 18, 31, 0.94)),
        rgba(7, 18, 31, 0.94);
    }

    .hand-card:hover {
      transform: rotate(0deg) scale(var(--hover-scale)) translateY(var(--hover-translate-y));
      z-index: 100;
      margin: 0 var(--hand-card-overlap-hover);
      filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
    }

    .hand-zone--player-two .hand-card:hover {
      transform: rotate(0deg) scale(var(--hover-scale)) translateY(calc(var(--hover-translate-y) * -1));
      filter: drop-shadow(0 -18px 24px rgba(0, 0, 0, 0.48));
    }

    .hand-zone:has(.hand-card:hover) .hand-card:not(:hover) {
      opacity: 0.85;
      filter: brightness(0.9);
    }

    .hand-card--selected:hover {
      transform: rotate(0deg) translateY(var(--selected-translate-y));
    }
  }

  .hand-zone[data-layout-mode="mobile"] {
    --zone-card-width: 76px;
    --hand-container-height: calc(var(--zone-card-height) + 0.4rem);
    --hand-card-overlap: -0.38rem;
    --hand-card-overlap-hover: 0;
    --hover-scale: 1;
    --hover-translate-y: -3px;

    width: 100%;
    padding-inline: 0;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-container {
    justify-content: flex-start;
    overflow-x: auto;
    overflow-y: visible;
    padding: 0 0.7rem;
    scrollbar-width: none;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-container::-webkit-scrollbar {
    display: none;
  }

  .hand-zone[data-layout-mode="desktop"][data-player-seat="bottom"] .hand-container {
    max-width: calc(
      100% - var(--desktop-footer-left-reserve, 0px) - var(--desktop-footer-right-reserve, 0px)
    );
    margin-inline: auto;
  }

  .hand-zone--player-two[data-layout-mode="mobile"] {
    --zone-card-width: 62px;
    --hand-card-overlap: -0.2rem;
  }

  @media (max-width: 420px) {
    .hand-zone[data-layout-mode="mobile"] {
      --zone-card-width: 70px;
    }

    .hand-zone--player-two[data-layout-mode="mobile"] {
      --zone-card-width: 58px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hand-card {
      transition: none;
    }
  }
</style>
