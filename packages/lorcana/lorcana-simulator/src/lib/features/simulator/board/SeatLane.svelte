<script lang="ts">
import type {
	LorcanaPlayerSide,
	LorcanaTableSeat,
} from "@/features/simulator/model/contracts.js";
import type { SimulatorLayoutMode } from "@/features/simulator/model/layout-mode.svelte.js";
import PlayZone from "./PlayZone.svelte";
import InkwellZone from "@/features/simulator/board/InkwellZone.svelte";
import ItemZone from "./ItemZone.svelte";
import DeckZone from "@/features/simulator/board/DeckZone.svelte";
import DiscardZone from "./DiscardZone.svelte";
import { useLorcanaBoardPresenter } from "@/features/simulator/context/game-context.svelte.js";
import { createLoreBadgeAnchorId } from "@/features/simulator/animations/quest-animations.js";

interface SeatLaneProps {
	layoutMode?: SimulatorLayoutMode;
	playerSide: LorcanaPlayerSide;
	seat: LorcanaTableSeat;
	isOpponent: boolean;
	isTurnPlayer: boolean;
	hasPriority: boolean;
	lore?: number;
	seatPosition: "top" | "bottom";
	onDiscardClick?: () => void;
	onInkwellClick?: () => void;
}

let {
	layoutMode = "desktop",
	playerSide,
	seat,
	isOpponent,
	isTurnPlayer,
	hasPriority,
	lore = 0,
	seatPosition,
	onDiscardClick,
	onInkwellClick,
}: SeatLaneProps = $props();

const board = useLorcanaBoardPresenter();
const ownerId = $derived(board.getOwnerIdForSide(playerSide));
const visualSettings = $derived(board.getPlayerVisualSettings(playerSide));
const hasItemsInPlay = $derived.by(() =>
	board
		.getZoneCards(playerSide, "play")
		.some((card) => card.cardType === "item"),
);
</script>

<div
  class="seat-lane"
  class:seat-lane--top={seatPosition === "top"}
  class:seat-lane--bottom={seatPosition === "bottom"}
  class:seat-lane--turn={isTurnPlayer}
  class:seat-lane--priority={hasPriority}
  data-layout-mode={layoutMode}
>
  <div
    class="seat-badges"
    class:seat-badges--top={seatPosition === "top"}
    class:seat-badges--bottom={seatPosition === "bottom"}
  >
    <span
      class="seat-chip seat-chip--lore"
      data-board-anchor-id={createLoreBadgeAnchorId(playerSide)}
      aria-label={`Lore: ${lore}`}
    >Lore: {lore}</span>
    {#if isTurnPlayer}
      <span class="seat-chip seat-chip--turn">Turn</span>
    {/if}
    {#if hasPriority && !isTurnPlayer}
      <span class="seat-chip seat-chip--priority">Priority</span>
    {/if}
  </div>

  <div
    class="seat-playmat"
    data-owner-id={ownerId}
    data-playmat-id={visualSettings.playmat.id}
    data-playmat-src={visualSettings.playmat.src ?? ""}
    style:background-image={visualSettings.playmat.src ? `url(${visualSettings.playmat.src})` : undefined}
  ></div>

  <div class="seat-lane__section seat-lane__section--bar">
    <div class="bar-zones">
      <div class="bar-zone-shell bar-zone-shell--side bar-zone-shell--discard">
        <DiscardZone
          {isOpponent}
          {playerSide}
          {seat}
          onClick={onDiscardClick}
        />
      </div>

      <div class="bar-zones__center-viewport" data-board-scroll-sync>
        <div class="bar-zones__center-content" class:bar-zones__center-content--with-items={hasItemsInPlay}>
          <div class="bar-zone-shell bar-zone-shell--inkwell">
            <InkwellZone
              {isOpponent}
              {playerSide}
              {seat}
              onCounterClick={onInkwellClick}
              hasItemsInPlay={hasItemsInPlay}
            />
          </div>

          {#if hasItemsInPlay}
            <div class="bar-zone-shell bar-zone-shell--items">
              <ItemZone
                {layoutMode}
                {isOpponent}
                {playerSide}
                {seat}
              />
            </div>
          {/if}
        </div>
      </div>

      <div class="bar-zone-shell bar-zone-shell--side bar-zone-shell--deck">
        <DeckZone
          {isOpponent}
          {playerSide}
          {seat}
        />
      </div>
    </div>
  </div>

  <div class="seat-lane__section seat-lane__section--play">
    <PlayZone
      zoneId="play"
      {playerSide}
      {seat}
      {isOpponent}
      label=""
      excludeCardTypes={["item"]}
    />
  </div>
</div>

<style>
  .seat-lane {
    position: relative;
    display: flex;
    flex: 1 1 0;
    min-height: 0;
    flex-direction: column;
    gap: 0.55rem;
    padding: 0.7rem 0.6rem 0.6rem;
    border-radius: 18px;
    border: 1px solid rgba(96, 125, 165, 0.16);
    background: linear-gradient(180deg, rgba(8, 17, 30, 0.14) 0%, rgba(8, 17, 30, 0.04) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      background 160ms ease;
    overflow: visible;
    isolation: isolate;
  }

  .seat-lane__section {
    position: relative;
    z-index: 1;
    min-width: 0;
  }

  .seat-lane__section--play {
    flex: 1 1 0;
    min-height: 0;
    display: flex;
  }

  .seat-lane--bottom .seat-lane__section--play {
    order: 1;
  }

  .seat-lane--bottom .seat-lane__section--bar {
    order: 2;
  }

  .seat-badges {
    position: absolute;
    left: 0.42rem;
    z-index: 5;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    pointer-events: none;
  }

  .seat-badges--top {
    bottom: 0.42rem;
  }

  .seat-badges--bottom {
    top: 0.42rem;
  }

  .seat-playmat {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: inherit;
    background:
      linear-gradient(180deg, rgba(8, 17, 30, 0.3) 0%, rgba(8, 17, 30, 0.12) 100%),
      radial-gradient(circle at center, rgba(58, 88, 124, 0.16), transparent 70%);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.58;
    pointer-events: none;
  }

  .seat-playmat::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(5, 10, 18, 0.14), rgba(5, 10, 18, 0.24)),
      repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.02) 0,
        rgba(255, 255, 255, 0.02) 2px,
        transparent 2px,
        transparent 14px
      );
  }

  .seat-lane--turn {
    border-color: rgba(238, 194, 106, 0.45);
    background:
      linear-gradient(180deg, rgba(104, 73, 20, 0.24) 0%, rgba(46, 31, 9, 0.08) 100%),
      linear-gradient(180deg, rgba(8, 17, 30, 0.14) 0%, rgba(8, 17, 30, 0.04) 100%);
    box-shadow:
      inset 0 0 0 1px rgba(255, 213, 129, 0.08),
      inset 0 1px 0 rgba(255, 248, 220, 0.08);
  }

  .seat-lane--priority {
    border-color: rgba(118, 199, 255, 0.72);
    box-shadow:
      0 0 0 1px rgba(118, 199, 255, 0.28),
      0 0 28px rgba(45, 146, 221, 0.22),
      inset 0 0 0 1px rgba(190, 230, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .seat-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 1.65rem;
    padding: 0.12rem 0.62rem;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(6, 14, 25, 0.92);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
    color: #eef6ff;
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .seat-chip--lore {
    border-color: rgba(148, 163, 184, 0.4);
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.96) 0%, rgba(15, 23, 42, 0.96) 100%);
    color: #cbd5e1;
    text-shadow: none;
  }

  .seat-chip--turn {
    border-color: rgba(247, 210, 131, 0.7);
    background: linear-gradient(180deg, rgba(128, 87, 20, 0.96) 0%, rgba(94, 56, 11, 0.96) 100%);
    color: #fff1cf;
  }

  .seat-chip--priority {
    border-color: rgba(155, 221, 255, 0.78);
    background: linear-gradient(180deg, rgba(32, 103, 155, 0.96) 0%, rgba(16, 66, 110, 0.96) 100%);
    color: #ebf8ff;
  }

  .seat-lane--priority :global(.board-zone) {
    box-shadow: 0 0 0 1px rgba(118, 199, 255, 0.18);
  }

  .seat-lane--turn :global(.board-zone) {
    background-image: linear-gradient(180deg, rgba(255, 214, 143, 0.04), rgba(255, 214, 143, 0));
  }

  .bar-zones {
    --bar-row-card-aspect: 1.21927;
    --bar-row-card-height: 82px;
    --bar-row-card-width: calc(var(--bar-row-card-height) * var(--bar-row-card-aspect));
    --zone-card-height: var(--bar-row-card-height);
    --zone-card-width: var(--bar-row-card-width);
    --side-zone-width: calc(var(--zone-card-width) + 0.5rem);
    --bar-shell-padding: 0.26rem;
    --bar-shell-radius: 12px;
    display: grid;
    grid-template-columns: var(--side-zone-width) minmax(0, 1fr) var(--side-zone-width);
    align-items: stretch;
    width: 100%;
    height: 90px;
    min-height: 90px;
    max-height: 90px;
    padding: 0.42rem;
    gap: 0.35rem;
    border: 1px solid rgba(103, 147, 192, 0.18);
    border-radius: 14px;
    background:
      linear-gradient(180deg, rgba(8, 18, 31, 0.72) 0%, rgba(7, 14, 24, 0.56) 100%),
      linear-gradient(90deg, rgba(120, 170, 218, 0.05) 0%, rgba(120, 170, 218, 0) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      inset 0 0 0 1px rgba(148, 163, 184, 0.04);
    container-type: inline-size;
  }

  .bar-zone-shell {
    position: relative;
    display: flex;
    min-width: 0;
    min-height: 0;
    padding: var(--bar-shell-padding);
    border-radius: var(--bar-shell-radius);
    border: 1px solid rgba(110, 149, 192, 0.2);
    background:
      linear-gradient(180deg, rgba(14, 27, 45, 0.56) 0%, rgba(10, 18, 31, 0.32) 100%);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  }

  .seat-lane--top .bar-zone-shell {
    background:
      linear-gradient(180deg, rgba(54, 27, 23, 0.54) 0%, rgba(28, 14, 12, 0.34) 100%);
    border-color: rgba(188, 120, 102, 0.2);
  }

  .bar-zone-shell--side {
    align-items: stretch;
    justify-content: stretch;
  }

  .bar-zone-shell--inkwell,
  .bar-zone-shell--items {
    flex: 1 1 0;
  }

  .bar-zone-shell--inkwell {
    padding: 0;
  }

  .bar-zone-shell--items {
    padding: 0;
  }

  .bar-zones__center-viewport {
    min-width: 0;
    min-height: 0;
    overflow: visible;
  }

  .bar-zones__center-content {
    display: flex;
    align-items: stretch;
    gap: 0.35rem;
    min-width: 100%;
    width: 100%;
    height: 100%;
  }

  .bar-zones__center-content--with-items {
    width: 100%;
  }

  @container (max-width: 400px) {
    .bar-zones {
      --bar-row-card-height: 52px;
    }
  }

  .bar-zones :global(.discard-zone) {
    grid-column: 1;
  }

  .bar-zones :global([data-zone-id="deck"]) {
    grid-column: 3;
  }

  .bar-zones :global(.discard-zone),
  .bar-zones :global(.deck-zone) {
    min-width: var(--side-zone-width);
    min-height: var(--zone-card-height, 70px);
  }

  .bar-zones :global(.inkwell-container) {
    min-width: 160px;
  }

  .bar-zones :global(.item-zone) {
    min-width: 132px;
  }

  .bar-zones :global(.inkwell-container),
  .bar-zones :global(.item-zone) {
    height: 100%;
    max-width: none;
    flex: 1 1 0;
    min-width: 0;
  }

  .bar-zone-shell :global(.inkwell-container),
  .bar-zone-shell :global(.item-zone) {
    width: 100%;
    height: 100%;
    --ink-card-width: var(--bar-row-card-width);
    --ink-card-height: var(--bar-row-card-height);
    --ink-card-gap: 0.25rem;
    --item-zone-card-width: var(--bar-row-card-width);
    --item-zone-card-height: var(--bar-row-card-height);
    --item-grid-gap: 0.25rem;
    --item-container-padding: 0;
    padding: 0;
    border: none;
    border-radius: calc(var(--bar-shell-radius) - 2px);
    background: transparent;
    box-shadow: none;
  }

  .bar-zone-shell :global(.discard-zone),
  .bar-zone-shell :global([data-zone-id="deck"]) {
    width: 100%;
    height: 100%;
    min-width: 0 !important;
    min-height: 0 !important;
    padding: 0;
    border: none;
    border-radius: calc(var(--bar-shell-radius) - 2px);
    background: transparent !important;
    box-shadow: none !important;
  }

  .bar-zone-shell :global(.discard-zone:hover),
  .bar-zone-shell :global([data-zone-id="deck"]:hover) {
    transform: none;
  }

  .seat-lane[data-layout-mode="mobile"] {
    gap: 0.38rem;
    padding: 0.5rem 0.4rem 0.42rem;
    border-radius: 14px;
  }

  .seat-lane--top[data-layout-mode="mobile"] {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .seat-lane--bottom[data-layout-mode="mobile"] {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .seat-lane[data-layout-mode="mobile"] .bar-zones {
    --bar-row-card-height: 44px;
    height: 74px;
    min-height: 74px;
    max-height: 74px;
    padding: 0.25rem;
    gap: 0.25rem;
  }

  .seat-lane[data-layout-mode="mobile"] .seat-chip {
    min-height: 1.3rem;
    padding-inline: 0.46rem;
    font-size: 0.56rem;
    letter-spacing: 0.08em;
  }

  @media (max-width: 600px) {
    .seat-lane {
      padding: 0.62rem 0.4rem 0.5rem;
      border-radius: 14px;
    }

    .seat-chip {
      min-height: 1.45rem;
      padding-inline: 0.52rem;
      font-size: 0.6rem;
      letter-spacing: 0.09em;
    }
  }

  @media (min-width: 1240px) {
    .bar-zones {
      --bar-row-card-height: var(--sim-side-zone-card-height, 82px);
      min-height: calc(var(--zone-card-height) + 1.25rem);
      max-height: calc(var(--zone-card-height) + 1.25rem);
      height: calc(var(--zone-card-height) + 1.25rem);
      padding: clamp(0.3rem, 0.8cqh, 0.45rem);
    }
  }
</style>
