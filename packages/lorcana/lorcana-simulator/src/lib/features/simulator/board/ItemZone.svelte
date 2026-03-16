<script lang="ts">
    import type {LorcanaPlayerSide, LorcanaTableSeat} from "@/features/simulator/model/contracts.js";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import {createCardAnchorId} from "@/features/simulator/animations/board-move-animations.js";
    import {
        useLorcanaBoardPresenter,
        useLorcanaSidebarPresenter
    } from "@/features/simulator/context/game-context.svelte.js";

  interface ItemZoneProps {
    isOpponent: boolean;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
  }

  let {isOpponent, playerSide, seat}: ItemZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const sidebar = useLorcanaSidebarPresenter();
  const items = $derived.by(() =>
          board.getZoneCards(playerSide, "play").filter((card) => card.cardType === "item"),
  );
</script>

<div
        class="item-zone"
        class:item-zone--opponent={isOpponent}
        data-player-seat={seat}
        data-player-side={playerSide}
>
  <div class="item-counter">
    <span class="item-counter-value">{items.length}</span>
  </div>

  <div class="item-zone-cards">
    <div class="item-cards">
      {#each items as card (card.cardId)}
        <div
                class="item-card"
                class:item-card--exerted={card.readyState === "exerted"}
                data-card-id={card.cardId}
                data-player-seat={seat}
                data-player-id={card.ownerId}
                data-zone-id={card.zoneId}
                data-board-anchor-id={createCardAnchorId(playerSide, "play", card.cardId)}
        >
          <LorcanaCard
                  {card}
                  useContainerSize
                  imageFormat="art_only"
                  hoverShowActions
                  isMasked={false}
                  isSelected={sidebar.getActionSessionCardState(card.cardId).isSelected}
                  isPlayable={sidebar.getActionSessionCardState(card.cardId).isSelectable}
                  isInvalidTarget={sidebar.getActionSessionCardState(card.cardId).isInvalidTarget}
                  isExerted={card.readyState === "exerted"}
                  damage={card.damage ?? 0}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .item-zone {
    --item-bg: rgba(34, 28, 16, 0.72);
    --item-border: rgba(205, 164, 79, 0.28);
    --item-accent: rgba(243, 210, 129, 0.92);
    --item-container-padding: 6px;
    --item-counter-size: 28px;
    --item-counter-offset: -6px;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: var(--item-container-padding);
    width: 100%;
    height: 100%;
    min-width: 70px;
    min-height: 0;
    background: linear-gradient(180deg, rgba(58, 44, 18, 0.78) 0%, rgba(28, 21, 10, 0.9) 100%);
    border: 1px solid var(--item-border);
    border-radius: 8px;
  }

  .item-zone--opponent {
    --item-bg: rgba(62, 28, 22, 0.72);
    --item-border: rgba(224, 141, 115, 0.24);
    --item-accent: rgba(249, 197, 170, 0.88);

    background: linear-gradient(180deg, rgba(74, 34, 27, 0.78) 0%, rgba(34, 16, 13, 0.9) 100%);
  }

  .item-counter {
    position: absolute;
    top: var(--item-counter-offset);
    right: var(--item-counter-offset);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--item-counter-size);
    height: var(--item-counter-size);
    border: 1px solid rgba(255, 234, 179, 0.3);
    border-radius: 999px;
    background: linear-gradient(135deg, rgba(107, 76, 18, 0.98) 0%, rgba(70, 50, 11, 0.98) 100%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  }

  .item-counter-value {
    color: #fff2d1;
    font-size: 0.7rem;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .item-zone-cards {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    background: transparent;
    border: none;
    padding: 0;
    position: relative;
      overflow: visible;
  }

  .item-cards {
    display: flex;
    flex-wrap: nowrap;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    align-items: stretch;
    justify-content: flex-end;
      gap: 0;
    width: 100%;
    height: 100%;
    padding: 2px;
    overflow-x: auto;
      overflow-y: visible;
    scrollbar-width: thin;
    scrollbar-color: rgba(243, 210, 129, 0.55) rgba(0, 0, 0, 0.18);
  }

  .item-card {
    --zone-card-width: 100%;
    --zone-card-height: 100%;

    height: 100%;
    aspect-ratio: 734 / 602;
    flex: 0 0 auto;
    transition: filter 150ms ease;
      position: relative;
      overflow: visible;
  }

  .item-card + .item-card {
      margin-left: -1rem;
  }

  .item-card :global(a[data-slot="hover-card-trigger"]) {
    display: block;
    width: 100%;
    height: 100%;
  }

  .item-card--exerted {
    filter: brightness(0.6) grayscale(0.4);
      margin-left: -2.4rem;
      z-index: 2;
  }

  .item-cards::-webkit-scrollbar {
    height: 8px;
  }

  .item-cards::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.18);
    border-radius: 999px;
  }

  .item-cards::-webkit-scrollbar-thumb {
    background: rgba(243, 210, 129, 0.55);
    border-radius: 999px;
  }

  @media (max-width: 900px) {
    .item-zone {
      --item-container-padding: 4px;
      --item-counter-size: 24px;
      --item-counter-offset: -4px;

      min-width: 60px;
    }

    .item-counter {
      width: var(--item-counter-size);
      height: var(--item-counter-size);
    }

    .item-counter-value {
      font-size: 0.6rem;
    }

      .item-card + .item-card {
          margin-left: -0.75rem;
      }

      .item-card--exerted {
          margin-left: -1.75rem;
      }
  }
</style>
