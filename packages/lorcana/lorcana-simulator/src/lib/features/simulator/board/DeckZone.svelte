<script lang="ts">
    import type {LorcanaPlayerSide, LorcanaTableSeat} from "@/features/simulator/model/contracts.js";
  import { cn } from "$lib/utils.js";
    import {DeckStack} from "@/design-system/simulator/cards/index.js";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import {createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
    import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";

  interface DeckZoneProps {
    isOpponent: boolean;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    onClick?: () => void;
  }

  let { isOpponent, playerSide, seat, onClick }: DeckZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const count = $derived(board.getDeckCount(playerSide));
  const ownerId = $derived(board.getOwnerIdForSide(playerSide));
  const revealedDeckCard = $derived(board.getRevealedDeckTopCard(playerSide));
</script>

<button
  type="button"
  class={cn(
    "relative flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-150",
    "border-2",
    isOpponent
      ? "bg-zone-opponent-bg border-zone-opponent-border"
      : "bg-zone-bg border-zone-border",
    "hover:-translate-y-0.5 hover:shadow-lg"
  )}
  style="min-width: calc(var(--zone-card-width, 50px) + 1rem); min-height: calc(var(--zone-card-height, 70px) + 1rem);"
  data-player-seat={seat}
  data-zone-id="deck"
  data-board-anchor-id={createZoneAnchorId(playerSide, "deck")}
  onclick={onClick}
>
  <DeckStack {count} {ownerId} />
  {#if revealedDeckCard}
    <div class="revealed-deck-card">
      <div class="revealed-deck-card__card">
        <LorcanaCard card={revealedDeckCard} useContainerSize />
      </div>
      <span class="revealed-deck-card__label">Revealed</span>
    </div>
  {/if}
</button>

<style>
  .revealed-deck-card {
    position: absolute;
    right: calc(100% + 0.4rem);
    top: 50%;
    transform: translateY(-50%);
    width: var(--zone-card-width, 50px);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
    z-index: 10;
    pointer-events: none;
    animation: revealed-card-enter 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  .revealed-deck-card__card {
    width: var(--zone-card-width, 50px);
    height: var(--zone-card-height, 70px);
    border-radius: 4px;
    overflow: hidden;
    box-shadow:
      0 0 0 2px rgba(251, 191, 36, 0.85),
      0 0 14px rgba(251, 191, 36, 0.4),
      0 4px 12px rgba(0, 0, 0, 0.5);
  }

  .revealed-deck-card__label {
    font-size: 0.48rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(251, 191, 36, 0.95);
    background: rgba(0, 0, 0, 0.75);
    padding: 0.1rem 0.35rem;
    border-radius: 999px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    white-space: nowrap;
  }

  @keyframes revealed-card-enter {
    from {
      opacity: 0;
      transform: translateY(-50%) translateX(10px) scale(0.92);
    }
    to {
      opacity: 1;
      transform: translateY(-50%) translateX(0) scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .revealed-deck-card {
      animation: none;
    }
  }
</style>
