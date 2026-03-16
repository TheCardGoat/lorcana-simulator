<script lang="ts">
    import type {LorcanaPlayerSide, LorcanaTableSeat} from "@/features/simulator/model/contracts.js";
    import CardBack from "@/design-system/simulator/cards/CardBack.svelte";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import autoAnimate from "@formkit/auto-animate";
    import {createCardAnchorId, createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
    import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";
    import {
        createOptionalDroppable,
        useLorcanaSimulatorDndContext
    } from "@/features/simulator/context/simulator-dnd-context.svelte.js";

  interface InkwellZoneProps {
    isOpponent: boolean;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    onClick?: () => void;
  }

  let {
    isOpponent,
    playerSide,
    seat,
    onClick,
  }: InkwellZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const dnd = useLorcanaSimulatorDndContext();
  const cards = $derived(board.getZoneCards(playerSide, "inkwell"));
  const playerSummary = $derived(board.getPlayerSummary(playerSide));
  const ownerId = $derived(board.getOwnerIdForSide(playerSide));
  const totalCards = $derived(playerSummary?.inkwellCount ?? 0);
  const availableInk = $derived(playerSummary?.availableInk ?? null);
  const isMasked = $derived(board.isZoneMasked(playerSide, "inkwell"));
  const droppable = createOptionalDroppable({
    zone: "inkwell",
    get player() {
      return playerSide;
    },
  });

  const MAX_VISIBLE_HIDDEN_CARDS = 8;
  const effectiveTotal = $derived(Math.max(totalCards, cards.length));
  const hasRevealedCards = $derived(cards.length > 0);
  const visibleRevealedCards = $derived.by(() => cards.slice(-6).reverse());
  const hiddenPlaceholderCount = $derived(
    hasRevealedCards ? 0 : Math.min(effectiveTotal, MAX_VISIBLE_HIDDEN_CARDS),
  );
  const hiddenOverflowCount = $derived(Math.max(0, effectiveTotal - hiddenPlaceholderCount));
  const totalInk = $derived(hasRevealedCards ? cards.length : effectiveTotal);
  const readyInk = $derived.by<number | null>(() => {
    if (!hasRevealedCards) {
      return availableInk;
    }
    return cards.reduce((count, card) => count + (card.readyState === "exerted" ? 0 : 1), 0);
  });
  const inkCounterLabel = $derived.by(() => {
    if (readyInk === null && effectiveTotal > 0) {
      return `?/${effectiveTotal}`;
    }
    return `${readyInk ?? 0}/${totalInk}`;
  });
  const inferredHiddenReadyCount = $derived.by(() => {
    if (hasRevealedCards || availableInk === null) {
      return 0;
    }

    return Math.max(0, Math.min(hiddenPlaceholderCount, availableInk));
  });
  const inferredHiddenExertedCount = $derived.by(() =>
          Math.max(0, hiddenPlaceholderCount - inferredHiddenReadyCount),
  );
  const dropState = $derived(dnd.getZoneDropState("inkwell", playerSide));
  const showDropIndicator = $derived(dropState === "valid" || dropState === "invalid");

</script>

<div
  class="inkwell-container"
    class:inkwell-container--opponent={isOpponent}
    class:inkwell-container--drop-target={dropState !== "none"}
    class:inkwell-container--drop-preview={dropState === "preview"}
    class:inkwell-container--drop-valid={dropState === "valid"}
    class:inkwell-container--drop-invalid={dropState === "invalid"}
    class:inkwell-container--empty={effectiveTotal === 0}
    data-player-seat={seat}
    data-player-side={playerSide}
    data-zone-id="inkwell"
  {@attach droppable.attach}
>
  <!-- Ink Counter Badge -->
  <div class="ink-counter">
    <span class="ink-counter-value">{inkCounterLabel}</span>
  </div>

  <!-- Ink Cards Display -->
  {#if hasRevealedCards}
    <button
      type="button"
      class="inkwell-cards"
      data-board-anchor-id={createZoneAnchorId(playerSide, "inkwell")}
      onclick={onClick}
    >
      <!-- Revealed view from snapshot cards -->
      <div  class="ink-cards-revealed">
        {#each visibleRevealedCards as card (card.cardId)}
          <div
            class="ink-card"
            class:ink-card--exerted={card.readyState === "exerted"}
            data-card-id={card.cardId}
            data-player-seat={seat}
            data-player-id={card.ownerId}
            data-zone-id={card.zoneId}
            data-board-anchor-id={createCardAnchorId(playerSide, "inkwell", card.cardId)}
          >
            {#if card.facePresentation === "faceUp"}
              <LorcanaCard
                {card}
                useContainerSize
                isMasked={isMasked}
                isExerted={card.readyState === "exerted"}
              />
            {:else}
              <CardBack
                {ownerId}
                displayWidth={26}
                displayHeight={36}
                aspectRatio={26 / 36}
                useContainerSize={true}
              />
            {/if}
          </div>
        {/each}
        {#if cards.length > 6}
          <div class="more-ink">+{cards.length - 6}</div>
        {/if}
      </div>

      {#if showDropIndicator}
        <div class="drop-indicator">+</div>
      {/if}
    </button>
  {:else}
    <button
      type="button"
      class="inkwell-cards"
      data-board-anchor-id={createZoneAnchorId(playerSide, "inkwell")}
      onclick={onClick}
    >
      <!-- Normal view: show card backs in horizontal layout -->
      <div  class="ink-cards-stack">
        {#each Array.from({ length: hiddenPlaceholderCount }) as _, index (`ink-hidden-${index}`)}
          {@const isInferredExerted = index < inferredHiddenExertedCount}
          <div
            class="ink-card-back"
            class:ink-card-back--exerted={isInferredExerted}
            style:z-index={hiddenPlaceholderCount - index}
          >
            <CardBack
              {ownerId}
              displayWidth={26}
              displayHeight={36}
              aspectRatio={26 / 36}
              useContainerSize={true}
              isExerted={isInferredExerted}
            />
          </div>
        {/each}
        {#if hiddenOverflowCount > 0}
          <div class="ink-count-more">+{hiddenOverflowCount}</div>
        {/if}
      </div>

      {#if showDropIndicator}
        <div class="drop-indicator">+</div>
      {/if}
    </button>
  {/if}

</div>

<style>
  .inkwell-container {
    /* Color theme */
    --ink-bg: rgba(25, 20, 40, 0.7);
    --ink-border: rgba(130, 100, 180, 0.25);
    --ink-accent: rgba(180, 160, 220, 0.9);

    /* Card dimensions */
    --ink-card-width: var(--zone-card-width, 26px);
    --ink-card-height: var(--zone-card-height, 36px);
    --ink-card-overlap: -12px;
    --ink-revealed-overlap: 10px;
    --ink-exerted-overlap: 22px;
    --ink-stack-height: var(--zone-card-height, 36px);
    --ink-stack-padding: 0px;

    /* Container dimensions */
    --ink-container-min-width: 70px;
    --ink-container-padding: 6px;

    /* Counter dimensions */
    --ink-counter-size: 28px;
    --ink-counter-offset: -6px;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: var(--ink-container-padding);
    background: var(--ink-bg);
    border: 1px solid var(--ink-border);
    border-radius: 8px;
    min-width: var(--ink-container-min-width);
    width: 100%;
    height: 100%;
    min-height: 0;
  }

  .inkwell-container--opponent {
    --ink-bg: rgba(40, 20, 30, 0.6);
    --ink-border: rgba(180, 100, 120, 0.2);
    --ink-accent: rgba(220, 160, 160, 0.8);
  }

  .inkwell-container--empty {
    --ink-bg: rgba(20, 15, 30, 0.4);
    --ink-border: rgba(100, 80, 130, 0.15);
    --ink-accent: rgba(150, 130, 170, 0.5);
  }

  .inkwell-container--drop-target {
    --ink-border: rgba(180, 140, 230, 0.6);
    box-shadow:
      0 0 16px rgba(180, 140, 230, 0.18),
      inset 0 0 14px rgba(180, 140, 230, 0.08);
  }

  .inkwell-container--drop-preview {
    background: rgba(91, 33, 182, 0.08);
    border-style: solid;
  }

  .inkwell-container--drop-valid {
    --ink-border: rgba(56, 189, 139, 0.7);
    box-shadow:
      0 0 20px rgba(56, 189, 139, 0.28),
      inset 0 0 20px rgba(56, 189, 139, 0.15);
    animation: drop-pulse 1s ease-in-out infinite;
  }

  .inkwell-container--drop-invalid {
    --ink-border: rgba(248, 113, 113, 0.7);
    box-shadow:
      0 0 20px rgba(248, 113, 113, 0.28),
      inset 0 0 20px rgba(248, 113, 113, 0.15);
  }

  @keyframes drop-pulse {
    0%, 100% { border-color: rgba(180, 140, 230, 0.4); }
    50% { border-color: rgba(180, 140, 230, 0.8); }
  }

  /* Ink Counter Badge */
  .ink-counter {
    position: absolute;
    top: var(--ink-counter-offset);
    left: var(--ink-counter-offset);
    background: linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%);
    border: 1px solid rgba(100, 150, 200, 0.4);
    border-radius: 50%;
    width: var(--ink-counter-size);
    height: var(--ink-counter-size);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    z-index: 10;
  }

  .ink-counter-value {
    font-size: 0.7rem;
    font-weight: 800;
    color: #e2e8f0;
    font-variant-numeric: tabular-nums;
  }

  /* Ink Cards Stack - Horizontal layout */
  .inkwell-cards {
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    width: 100%;
    flex: 1 1 auto;
    min-height: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    position: relative;
    overflow: visible;
  }

  .ink-cards-stack {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    height: 100%;
    min-height: var(--ink-stack-height);
    padding-left: var(--ink-stack-padding);
  }

  .ink-card-back {
    width: var(--ink-card-width);
    height: var(--ink-card-height);
    margin-left: var(--ink-card-overlap);
    transition: all 150ms ease;
    filter: brightness(0.9);
  }

  .ink-card-back:first-child {
    margin-left: 0;
  }

  .ink-card-back:hover {
    transform: translateY(-3px);
    filter: brightness(1.1);
  }

  .ink-card-back--exerted {
    margin-left: calc(var(--ink-exerted-overlap) * -1);
    z-index: 2;
  }

  .ink-count-more {
    position: absolute;
    right: -5px;
    bottom: 0;
    font-size: 0.6rem;
    font-weight: 700;
    color: rgba(180, 160, 220, 0.9);
    background: rgba(0, 0, 0, 0.6);
    padding: 2px 4px;
    border-radius: 4px;
  }

  /* Revealed Cards View */
  .ink-cards-revealed {
    display: flex;
    gap: 0;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    max-width: 100%;
    min-height: 0;
    padding: 2px;
    overflow: visible;
  }

  .ink-card {
    transition: filter 150ms ease;
    width: var(--zone-card-width, 28px);
    height: var(--zone-card-height, 40px);
    flex: 0 0 auto;
    position: relative;
    overflow: visible;
  }

  .ink-card + .ink-card {
    margin-left: calc(var(--ink-revealed-overlap) * -1);
  }

  .ink-card--exerted {
    filter: brightness(0.6) grayscale(0.4);
    margin-left: calc(var(--ink-exerted-overlap) * -1);
    z-index: 2;
  }

  .more-ink {
    font-size: 0.6rem;
    font-weight: 700;
    color: rgba(180, 160, 220, 0.9);
    padding: 4px 6px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    align-self: flex-end;
    margin-left: 0.25rem;
  }

  /* Drop Indicator */
  .drop-indicator {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: #a855f7;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(168, 85, 247, 0.5);
    animation: bounce 0.5s ease-in-out infinite alternate;
  }

  @keyframes bounce {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
  }

  /* Responsive - override custom properties for smaller screens */
  @media (max-width: 900px) {
    .inkwell-container {
      --ink-container-min-width: 60px;
      --ink-container-padding: 4px;
      --ink-card-overlap: -10px;
      --ink-revealed-overlap: 8px;
      --ink-exerted-overlap: 16px;
      --ink-counter-size: 24px;
      --ink-counter-offset: -4px;
    }

    .ink-counter-value {
      font-size: 0.6rem;
    }
  }

  @media (max-width: 700px) {
    .inkwell-container {
      --ink-card-overlap: -8px;
      --ink-revealed-overlap: 6px;
      --ink-exerted-overlap: 12px;
    }
  }
</style>
