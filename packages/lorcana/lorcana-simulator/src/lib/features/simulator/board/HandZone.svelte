<script lang="ts">
    import type {
        LorcanaCardSnapshot,
        LorcanaPlayerSide,
        LorcanaTableSeat
    } from "@/features/simulator/model/contracts.js";
  import { m } from "$lib/paraglide/messages.js";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import {createCardAnchorId, createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
    import {
        useLorcanaBoardPresenter,
        useLorcanaSidebarPresenter
    } from "@/features/simulator/context/game-context.svelte.js";
    import {
        useLorcanaSimulatorDndContext,
        createOptionalDraggable
    } from "@/features/simulator/context/simulator-dnd-context.svelte.js";
    import type {SimulatorLayoutMode} from "@/features/simulator/model/layout-mode.svelte.js";

  interface HandZoneProps {
    layoutMode?: SimulatorLayoutMode;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    isOpponent: boolean;
  }

  let {
    layoutMode = "desktop",
    playerSide,
    seat,
    isOpponent,
  }: HandZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const sidebar = useLorcanaSidebarPresenter();
  const dnd = useLorcanaSimulatorDndContext();
  const cards = $derived(board.getZoneCards(playerSide, "hand"));
  const totalCards = $derived(board.getZoneTotalCards(playerSide, "hand"));
  const isMasked = $derived(board.isZoneMasked(playerSide, "hand"));
  const ownerId = $derived(board.getOwnerIdForSide(playerSide));
  const selectedCardIds = $derived(board.selectedCardIds);
  const playableCardIds = $derived(board.playableHandCardIds);

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
</script>

<div
  class="hand-zone"
  class:hand-zone--player-two={playerSide === "playerTwo"}
  data-layout-mode={layoutMode}
  data-player-seat={seat}
  data-zone-id="hand"
  data-testid={`hand-zone-${playerSide}`}
>
  <div
    class="hand-container"
    data-board-anchor-id={createZoneAnchorId(playerSide, "hand")}
  >
    {#if cards.length > 0}
      {#each cards as card, index (card.cardId)}
        {@const rotation = getFanRotation(index, cards.length)}
        {@const playable = isPlayable(card)}
        {@const actionState = sidebar.getActionSessionCardState(card.cardId)}
        {@const isSelected = actionState.isSelected || selectedCardIds.includes(card.cardId)}
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
          <LorcanaCard
            {card}
            size="small"
            useContainerSize
            imageFormat="art_and_name"
            hoverShowActions
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
    width: min(100%, 100%);
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.1rem 0.35rem;
    pointer-events: none;
  }

  .hand-container {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    min-height: var(--hand-container-height);
    position: relative;
    pointer-events: none;
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
    /* Let dnd-kit claim touch gestures on cards instead of the scroll container. */
    touch-action: none;
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

  .hand-zone[data-layout-mode="mobile"] .empty-hand {
    min-height: 4.5rem;
    width: 100%;
  }

  @media (hover: hover) and (pointer: fine) {
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

  .hand-zone[data-layout-mode="tablet"] {
    --zone-card-width: 92px;
    --hand-container-height: calc(var(--zone-card-height) + 0.5rem);
    --hand-card-overlap: -0.78rem;
    --hand-card-overlap-hover: 0.08rem;
    --hover-scale: 1.04;
    --hover-translate-y: -6px;
  }

  .hand-zone--player-two[data-layout-mode="tablet"] {
    --zone-card-width: 84px;
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
    padding: 0 0.55rem;
    scrollbar-width: none;
  }

  .hand-zone[data-layout-mode="mobile"] .hand-container::-webkit-scrollbar {
    display: none;
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
