<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { LorcanaCardSnapshot } from "$lib/lorcana-simulator";
  import { m } from "$lib/paraglide/messages.js";
  import CardImage from "$lib/design-system/simulator/cards/CardImage.svelte";
  import CardTagStrip from "@/design-system/simulator/cards/CardTagStrip.svelte";
  import {getLorcanaCardTags} from "./card-tags.js";


  type ImageFormat = "full" | "art_only" | "art_and_name";
  type CardSize = "micro" | "tiny" | "small" | "small-plus" | "medium" | "large" | "x-large";

  interface CardFaceProps {
    // Card data
    card?: LorcanaCardSnapshot;

    // Sizing
    displayWidth: number;
    displayHeight: number;
    useContainerSize?: boolean;
    size?: CardSize;
    imageFormat?: ImageFormat;
    aspectRatio: number;

    // Visual states
    isSelected?: boolean;
    isExerted?: boolean;
    isGhost?: boolean;
    isDraggable?: boolean;
    isPlayable?: boolean;
    isInvalidTarget?: boolean;
    isBanishedPreview?: boolean;
    isQuesting?: boolean;
    isDrying?: boolean;
    damage?: number;
    tagCollapseMode?: "none" | "hover-stack";
  }

  let {
    card,
    displayWidth,
    displayHeight,
    useContainerSize = false,
    size = "medium",
    imageFormat = "full",
    aspectRatio,
    isSelected = false,
    isExerted = false,
    isGhost = false,
    isDraggable = false,
    isPlayable = false,
    isInvalidTarget = false,
    isBanishedPreview = false,
    isQuesting = false,
    isDrying = false,
    damage = 0,
    tagCollapseMode = "none",
  }: CardFaceProps = $props();

  // Image loading state
  let imageLoaded = $state(false);
  let imageError = $state(false);
  let isHovering = $state(false);
  const dispatch = createEventDispatcher<{
    pointerenter: { event: MouseEvent };
    pointerleave: void;
    select: { event: MouseEvent };
  }>();

  function getCost(): string {
    if (card?.cost !== undefined) {
      return String(card.cost);
    }
    if (card?.definitionId) {
      const match = card.definitionId.match(/-(\d+)$/);
      return match ? match[1] : "0";
    }
    return "0";
  }

  function getCardLabel(): string {
    return card?.label ?? m["sim.card.unknown"]({});
  }

  function handleMouseEnter(event: MouseEvent) {
    if (!isGhost) {
      isHovering = true;
    }
    dispatch("pointerenter", { event });
  }

  function handleMouseLeave() {
    isHovering = false;
    dispatch("pointerleave");
  }

  function handleClick(event: MouseEvent) {
    dispatch("select", { event });
  }

  function handleImageLoad() {
    imageLoaded = true;
  }

  function handleImageError() {
    imageError = true;
  }

  const cardTags = $derived(card ? getLorcanaCardTags(card) : []);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
        role="button"
        tabindex="0"
  class="card-face"
  class:card-face--selected={isSelected}
  class:card-face--exerted={isExerted}
  class:card-face--ghost={isGhost}
  class:card-face--draggable={isDraggable}
  class:card-face--playable={isPlayable}
  class:card-face--invalid-target={isInvalidTarget}
  class:card-face--questing={isQuesting}
  class:card-face--drying={isDrying}
  class:card-face--damaged={damage > 0}
  style:width={useContainerSize ? "var(--zone-card-width, 90px)" : `${displayWidth}px`}
  style:height={useContainerSize ? "var(--zone-card-height, 128px)" : `${displayHeight}px`}
  style:transform={isHovering && !isGhost ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"}
  data-card-id={card?.cardId}
  data-player-id={card?.ownerId}
  data-zone-id={card?.zoneId}
  onclick={handleClick}
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  aria-label={m["sim.card.ariaLabel"]({ label: getCardLabel(), cost: getCost() })}
>
      <div
        class="card-frame w-full h-full relative overflow-hidden"
        class:rounded-md={size !== "tiny" && size !== "micro"}
        class:rounded-sm={size === "tiny" || size === "micro"}
        class:grayscale={isBanishedPreview}
      >
      <!-- Card Art Area (fills entire card) -->
      <div class="absolute inset-0 flex items-center justify-center">
        {#if card?.set && card?.cardNumber}
          <!-- Real Card Image -->
          <div class="card-image-wrapper absolute inset-0 z-[1]" class:loaded={imageLoaded}>
            <CardImage
              set={card.set}
              number={card.cardNumber}
              crop={imageFormat}
              alt={getCardLabel()}
              class="w-full h-full object-cover rounded-lg"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </div>
        {/if}

        <!-- Placeholder (shown while loading, on error, or when no image) -->
        <div class="art-placeholder w-full h-full flex items-center justify-center p-2 rounded-lg border border-white/5" class:hidden={imageLoaded && !imageError}>
          <div class="flex flex-col items-center justify-center">
            <!-- Center: Card Name -->
            <div class="flex flex-col items-center text-center gap-[0.15rem] px-2">
              {#if getCardLabel().includes(" - ")}
                {@const [name, version] = getCardLabel().split(" - ")}
                <span class="text-[0.65rem] font-bold text-slate-200 leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{name}</span>
                <span class="text-[0.5rem] font-medium text-slate-400 italic leading-tight">{version}</span>
              {:else}
                <span class="text-[0.65rem] font-bold text-slate-200 leading-tight [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">{getCardLabel()}</span>
              {/if}
            </div>
          </div>
        </div>

        <!-- Questing Overlay -->
        {#if isQuesting}
          <div class="questing-overlay absolute inset-0 flex items-center justify-center bg-yellow-400/15 rounded-md">
            <span class="text-1.5rem text-yellow-400 [text-shadow:0_0_10px_rgba(255,215,0,0.8)] animate-quest-icon-spin">✦</span>
          </div>
        {/if}
      </div>

      <!-- Damage Indicator -->
      {#if damage > 0}
        <div class="damage-indicator absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/90 text-white px-2 py-1 rounded-md font-extrabold text-xs shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-damage-pulse z-20">
          <span>-{damage}</span>
        </div>
      {/if}

      {#if cardTags.length > 0}
        <div class="pointer-events-none absolute inset-x-1.5 bottom-1.5 z-20">
          <CardTagStrip
            tags={cardTags}
            maxVisible={4}
            compact
            collapseMode={tagCollapseMode}
            class="justify-start"
          />
        </div>
      {/if}
    </div>

  <!-- Selection Indicator -->
  {#if isSelected}
    <div class="selection-indicator absolute -inset-1 border-2 border-amber-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.6)] pointer-events-none animate-selection-pulse z-20"></div>
  {/if}

  <!-- Playable Glow -->
  {#if isPlayable}
    <div class="playable-glow absolute -inset-0.5 rounded-xl pointer-events-none animate-playable-pulse"></div>
  {/if}

  <!-- Drying Indicator -->
  {#if isDrying}
    <div class="drying-indicator pointer-events-none absolute bottom-[5px] left-[5px] px-1.5 py-[0.1rem] rounded-full bg-slate-400/85 text-slate-900 text-[0.55rem] font-bold tracking-wide uppercase z-10">
      {m["sim.card.drying"]({})}
    </div>
  {/if}
</div>

<style>
  .card-face {
    --card-bg: linear-gradient(135deg, #2a4365 0%, #1a365d 100%);
    --card-border: rgba(100, 150, 200, 0.4);
    --card-glow: rgba(100, 180, 255, 0.3);
    --selected-glow: rgba(245, 158, 11, 0.6);
    --playable-highlight: rgba(250, 204, 21, 0.95);
    --playable-glow: rgba(250, 204, 21, 0.58);
    --questing-glow: rgba(255, 215, 0, 0.4);

    position: relative;
    background: transparent;
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.1s ease-out;
  }

  .card-frame {
    background: var(--card-bg);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition:
      filter 150ms ease-out,
      box-shadow 150ms ease-out,
      border-color 150ms ease-out;
  }

  .card-image-wrapper {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }

  .card-image-wrapper.loaded {
    opacity: 1;
  }

  .art-placeholder {
    background:
      radial-gradient(ellipse at 30% 30%, rgba(100, 180, 255, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 70%, rgba(100, 255, 200, 0.15) 0%, transparent 50%),
      linear-gradient(135deg, rgba(30, 60, 100, 0.5) 0%, rgba(20, 40, 70, 0.5) 100%);
    transition: opacity 0.3s ease-out;
  }

  .art-placeholder.hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* STATE MODIFIERS */

  /* Hover State */
  .card-face:hover:not(.card-face--ghost) .card-frame {
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.4),
      0 0 20px var(--card-glow),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
    border-color: rgba(100, 180, 255, 0.6);
  }

  /* Selected State */
  .card-face--selected .card-frame {
    box-shadow:
      0 8px 25px rgba(0, 0, 0, 0.5),
      0 0 25px var(--selected-glow),
      inset 0 0 0 2px rgba(245, 158, 11, 0.9);
    border-color: #f59e0b;
  }

  /* Exerted State (90° rotation) */
  .card-face--exerted {
    transform: rotate(90deg) !important;
  }

  .card-face--exerted .card-frame {
    border-color: rgba(245, 158, 11, 0.5);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      inset 0 -8px 16px rgba(245, 158, 11, 0.15);
  }

  /* Ghost State */
  .card-face--ghost {
    opacity: 0.5;
    pointer-events: none;
  }

  /* Draggable State */
  .card-face--draggable {
    cursor: grab;
  }

  .card-face--draggable:active {
    cursor: grabbing;
  }

  /* Playable State */
  .card-face--playable .card-frame {
    border-color: var(--playable-highlight);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 15px var(--playable-glow);
  }

  .playable-glow {
    background: linear-gradient(135deg, rgba(250, 204, 21, 0.28), rgba(245, 158, 11, 0.14));
    opacity: 0.78;
  }

  /* Questing State */
  .card-face--questing .card-frame {
    animation: questing-pulse 2s ease-in-out infinite;
  }

  @keyframes questing-pulse {
    0%,
    100% {
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.3),
        0 0 10px var(--questing-glow);
    }
    50% {
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.3),
        0 0 25px var(--questing-glow);
    }
  }

  /* Invalid Target State */
  .card-face--invalid-target .card-frame {
    filter: brightness(0.6) grayscale(0.4);
    border-color: rgba(248, 113, 113, 0.7);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.3),
      0 0 12px rgba(248, 113, 113, 0.45);
  }

  /* Damaged State */
  .card-face--damaged .card-frame {
    border-color: rgba(239, 68, 68, 0.5);
  }

  /* Drying State - requires ::after pseudo-element */
  .card-face--drying .card-frame::after {
    content: "";
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(148, 163, 184, 0.18),
      rgba(148, 163, 184, 0.18) 6px,
      rgba(148, 163, 184, 0.05) 6px,
      rgba(148, 163, 184, 0.05) 12px
    );
    pointer-events: none;
    z-index: 5;
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .card-face,
    .card-image-wrapper,
    .art-placeholder,
    .playable-glow,
    .selection-indicator,
    .questing-overlay span,
    .card-face--questing .card-frame,
    .damage-indicator {
      animation: none !important;
      transition: none !important;
    }
  }
</style>
