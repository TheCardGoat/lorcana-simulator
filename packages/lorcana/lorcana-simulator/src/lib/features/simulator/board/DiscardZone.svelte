<script lang="ts">
  import { m } from "$lib/i18n/messages.js";
  import { cn } from "$lib/utils.js";
  import * as HoverCard from "$lib/design-system/primitives/hover-card/index.js";
  import type {LorcanaPlayerSide, LorcanaTableSeat} from "@/features/simulator/model/contracts.js";
  import {createCardAnchorId, createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
  import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";

  interface DiscardZoneProps {
    isOpponent: boolean;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    onClick?: () => void;
  }

  let { isOpponent, playerSide, seat, onClick }: DiscardZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const inFlightCardIds = $derived(board.inFlightCardIds);
  const cards = $derived(board.getZoneCards(playerSide, "discard").filter((card) => !inFlightCardIds.has(card.cardId)));
  const isMasked = $derived(board.isZoneMasked(playerSide, "discard"));
  const topCard = $derived(cards.length > 0 ? cards[cards.length - 1] : null);
  const recentCards = $derived(cards.slice(-5).toReversed());
</script>

<HoverCard.Root openDelay={300}>
<HoverCard.Trigger class="block">
<button
  type="button"
  class={cn(
    "discard-zone",
    "flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all duration-150",
    "border-2",
    isOpponent ? "bg-zone-opponent-bg border-zone-opponent-border" : "bg-zone-bg border-zone-border",
    !topCard && "bg-zone-bg/40 border-zone-border/50",
    topCard && "hover:-translate-y-0.5 hover:shadow-lg",
  )}
  style="min-width: var(--zone-card-width, 50px); min-height: var(--zone-card-height, 70px);"
  data-player-seat={seat}
  data-zone-id="discard"
  data-board-anchor-id={createZoneAnchorId(playerSide, "discard")}
  aria-label={m["sim.discard.aria"]({ count: cards.length })}
  onclick={onClick}
>
  {#if topCard}
      <span class="absolute z-20 text-xs font-extrabold text-slate-200 bg-black/60 px-2 py-[0.2rem] rounded-full min-w-6 text-center">
        {cards.length || 0}
      </span>
    <div
      data-card-id={topCard.cardId}
      data-player-seat={seat}
      data-player-id={topCard.ownerId}
      data-zone-id={topCard.zoneId}
      data-board-anchor-id={createCardAnchorId(playerSide, "discard", topCard.cardId)}
    >
      <LorcanaCard
        card={topCard}
        useContainerSize
        imageFormat="art_only"
        isMasked={isMasked}
        showHoverCard={false}
      />
    </div>


  {:else}
    <div class="w-full h-full flex items-center justify-center border-2 border-dashed border-sky-500/20">
      <svg
        class="w-5 h-5 text-sky-500/30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </svg>
    </div>
  {/if}

</button>
</HoverCard.Trigger>
{#if recentCards.length > 0}
  <HoverCard.Content side="top" sideOffset={8} class="w-auto p-0 border-slate-700/80 bg-slate-900/95 backdrop-blur-sm">
    <button type="button" class="block cursor-pointer border-0 bg-transparent p-0 text-left" onclick={onClick}>
      <div class="flex gap-1.5 p-2" style="--zone-card-width: 80px; --zone-card-height: 112px;">
        {#each recentCards as card (card.cardId)}
          <div style="width: 80px; height: 112px;">
            <LorcanaCard card={card} useContainerSize showHoverCard={false} />
          </div>
        {/each}
      </div>
      {#if cards.length > 5}
        <div class="text-xs text-slate-400 text-center pb-1.5">
          +{cards.length - 5} more — click to see all
        </div>
      {/if}
    </button>
  </HoverCard.Content>
{/if}
</HoverCard.Root>

<style>
  .discard-zone {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .discard-zone:focus-visible {
    outline: 2px solid rgba(125, 211, 252, 0.8);
    outline-offset: 2px;
  }

  .discard-hint {
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.56rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 180ms ease;
    color: rgba(226, 232, 240, 0.9);
    pointer-events: none;
  }

  .discard-count {
    position: absolute;
    top: -0.25rem;
    right: -0.25rem;
    background: rgba(8, 145, 178, 0.95);
    color: #ecfeff;
    border: 1px solid rgba(125, 211, 252, 0.75);
    border-radius: 999px;
    width: 1.2rem;
    height: 1.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.58rem;
    font-weight: 700;
    box-shadow: 0 0 0 1px rgba(8, 47, 73, 0.7);
  }
</style>
