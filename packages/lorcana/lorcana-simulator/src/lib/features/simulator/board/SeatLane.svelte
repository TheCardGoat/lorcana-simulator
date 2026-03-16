<script lang="ts">
    import type {LorcanaPlayerSide, LorcanaTableSeat} from "@/features/simulator/model/contracts.js";
    import type {SimulatorLayoutMode} from "@/features/simulator/model/layout-mode.svelte.js";
  import PlayZone from "./PlayZone.svelte";
    import InkwellZone from "@/features/simulator/board/InkwellZone.svelte";
  import ItemZone from "./ItemZone.svelte";
    import DeckZone from "@/features/simulator/board/DeckZone.svelte";
  import DiscardZone from "./DiscardZone.svelte";
    import {useLorcanaBoardPresenter} from "@/features/simulator/context/game-context.svelte.js";

  interface SeatLaneProps {
    layoutMode?: SimulatorLayoutMode;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    isOpponent: boolean;
    isTurnPlayer: boolean;
    hasPriority: boolean;
    seatPosition: "top" | "bottom";
    onDiscardClick?: () => void;
  }

  let {
    layoutMode = "desktop",
    playerSide,
    seat,
    isOpponent,
    isTurnPlayer,
    hasPriority,
    seatPosition,
    onDiscardClick,
  }: SeatLaneProps = $props();

  const barFirst = $derived(seatPosition === "top");
  const board = useLorcanaBoardPresenter();
  const ownerId = $derived(board.getOwnerIdForSide(playerSide));
  const visualSettings = $derived(board.getPlayerVisualSettings(playerSide));
  const hasItemsInPlay = $derived.by(() =>
    board.getZoneCards(playerSide, "play").some((card) => card.cardType === "item"),
  );
  const useSplitZoneRows = $derived(layoutMode === "mobile" && hasItemsInPlay);
  const splitZoneRowsReversed = $derived(seatPosition === "bottom");
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
          class="seat-playmat"
          data-owner-id={ownerId}
          data-playmat-id={visualSettings.playmat.id}
          data-playmat-src={visualSettings.playmat.src ?? ""}
          style:background-image={visualSettings.playmat.src ? `url(${visualSettings.playmat.src})` : undefined}
  ></div>
  <div
          class="seat-status"
          class:seat-status--top={seatPosition === "top"}
          class:seat-status--bottom={seatPosition === "bottom"}
  >
    {#if isTurnPlayer}
      <span class="seat-chip seat-chip--turn">Turn</span>
    {/if}
    {#if hasPriority}
      <span class="seat-chip seat-chip--priority">Priority</span>
    {/if}
  </div>

  {#if barFirst}
    {#if useSplitZoneRows}
      <div class="zone-row-stack">
        {#if splitZoneRowsReversed}
          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <ItemZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
            <DeckZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>

          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <DiscardZone
                    {isOpponent}
                    {playerSide}
                    {seat}
                    onClick={onDiscardClick}
            />
            <InkwellZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>
        {:else}
          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <DiscardZone
                    {isOpponent}
                    {playerSide}
                    {seat}
                    onClick={onDiscardClick}
            />
            <InkwellZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>

          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <ItemZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
            <DeckZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>
        {/if}
      </div>
    {:else}
      <div
        class="bar-zones flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]"
        class:bar-zones--with-items={hasItemsInPlay}
      >
        <DiscardZone
                {isOpponent}
                {playerSide}
                {seat}
                onClick={onDiscardClick}
        />
        <InkwellZone
                {isOpponent}
                {playerSide}
                {seat}
        />
        {#if hasItemsInPlay}
          <ItemZone
                  {isOpponent}
                  {playerSide}
                  {seat}
          />
        {/if}
        <DeckZone
                {isOpponent}
                {playerSide}
                {seat}
        />
      </div>
    {/if}
  {/if}

  <PlayZone
          zoneId="play"
          {playerSide}
          {seat}
          {isOpponent}
          label=""
          excludeCardTypes={["item"]}
  />

  {#if !barFirst}
    {#if useSplitZoneRows}
      <div class="zone-row-stack">
        {#if splitZoneRowsReversed}
          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <ItemZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
            <DeckZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>

          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <DiscardZone
                    {isOpponent}
                    {playerSide}
                    {seat}
                    onClick={onDiscardClick}
            />
            <InkwellZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>
        {:else}
          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <DiscardZone
                    {isOpponent}
                    {playerSide}
                    {seat}
                    onClick={onDiscardClick}
            />
            <InkwellZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>

          <div class="bar-zones bar-zones--split flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]">
            <ItemZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
            <DeckZone
                    {isOpponent}
                    {playerSide}
                    {seat}
            />
          </div>
        {/if}
      </div>
    {:else}
      <div
        class="bar-zones flex items-stretch justify-between gap-2 bg-slate-900/50 border border-sky-500/15 rounded-[10px]"
        class:bar-zones--with-items={hasItemsInPlay}
      >
        <DiscardZone
                {isOpponent}
                {playerSide}
                {seat}
                onClick={onDiscardClick}
        />
        <InkwellZone
                {isOpponent}
                {playerSide}
                {seat}
        />
        {#if hasItemsInPlay}
          <ItemZone
                  {isOpponent}
                  {playerSide}
                  {seat}
          />
        {/if}
        <DeckZone
                {isOpponent}
                {playerSide}
                {seat}
        />
      </div>
    {/if}
  {/if}
</div>

<style>
  .seat-lane {
    position: relative;
    display: grid;
    gap: 0.55rem;
    padding: 0.7rem 0.6rem 0.6rem;
    border-radius: 18px;
    border: 1px solid rgba(96, 125, 165, 0.16);
    background: linear-gradient(180deg, rgba(8, 17, 30, 0.14) 0%, rgba(8, 17, 30, 0.04) 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    transition: border-color 160ms ease,
    box-shadow 160ms ease,
    background 160ms ease;
    overflow: hidden;
  }

  .seat-playmat {
    position: absolute;
    inset: 0;
    z-index: 0;
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

  .seat-lane > :not(.seat-playmat) {
    position: relative;
    z-index: 1;
  }

  .seat-lane--turn {
    border-color: rgba(238, 194, 106, 0.45);
    background: linear-gradient(180deg, rgba(104, 73, 20, 0.24) 0%, rgba(46, 31, 9, 0.08) 100%),
    linear-gradient(180deg, rgba(8, 17, 30, 0.14) 0%, rgba(8, 17, 30, 0.04) 100%);
    box-shadow: inset 0 0 0 1px rgba(255, 213, 129, 0.08),
    inset 0 1px 0 rgba(255, 248, 220, 0.08);
  }

  .seat-lane--priority {
    border-color: rgba(118, 199, 255, 0.72);
    box-shadow: 0 0 0 1px rgba(118, 199, 255, 0.28),
    0 0 28px rgba(45, 146, 221, 0.22),
    inset 0 0 0 1px rgba(190, 230, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .seat-status {
    position: absolute;
    left: 1rem;
    z-index: 4;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    pointer-events: none;
  }

  .seat-status--top {
    top: -0.5rem;
  }

  .seat-status--bottom {
    bottom: -0.5rem;
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
    container-type: inline-size;
    --zone-card-width: 50px;
    --zone-card-height: calc(var(--zone-card-width) * 1.4);
    --side-zone-width: calc(var(--zone-card-width, 50px) + 1rem);
    display: grid;
    grid-template-columns: var(--side-zone-width) minmax(0, 1fr) minmax(0, 1fr) var(--side-zone-width);
    align-items: stretch;
    width: 100%;
    min-height: 90px;
    padding: 0.35rem;
  }

  .zone-row-stack {
    display: grid;
    gap: 0.55rem;
    width: 100%;
  }

  @container (max-width: 400px) {
    .bar-zones {
      --zone-card-width: 40px;
    }
  }

  .bar-zones :global(.inkwell-container) {
    min-width: 60px;
    max-width: none;
  }

  .bar-zones--with-items :global(.inkwell-container),
  .bar-zones--with-items :global(.item-zone) {
    min-width: 60px;
    max-width: none;
  }

  .bar-zones :global(.item-zone) {
    min-width: 60px;
  }

  .bar-zones :global(.discard-zone),
  .bar-zones :global(.deck-zone) {
    min-width: var(--side-zone-width);
    min-height: var(--zone-card-height, 70px);
  }

  .bar-zones:not(.bar-zones--split) > :global(.discard-zone) {
    grid-column: 1;
  }

  .bar-zones:not(.bar-zones--split) > :global(.inkwell-container) {
    grid-column: 2;
  }

  .bar-zones:not(.bar-zones--split):not(.bar-zones--with-items) > :global(.inkwell-container) {
    grid-column: 2 / 4;
  }

  .bar-zones:not(.bar-zones--split) > :global(.item-zone) {
    grid-column: 3;
  }

  .bar-zones:not(.bar-zones--split) > :global([data-zone-id="deck"]) {
    grid-column: 4;
  }

  .bar-zones--split :global(.inkwell-container),
  .bar-zones--split :global(.item-zone) {
    flex: 1 1 auto;
    min-width: 0;
    max-width: none;
  }

  .bar-zones--split {
    display: flex;
  }

  @media (max-width: 1100px) {
    .seat-status {
      left: 0.8rem;
    }
  }

  .seat-lane[data-layout-mode="tablet"] {
    gap: 0.45rem;
    padding: 0.58rem 0.48rem 0.48rem;
    border-radius: 16px;
  }

  .seat-lane[data-layout-mode="tablet"] .bar-zones {
    --zone-card-width: 44px;
    min-height: 82px;
  }

  .seat-lane[data-layout-mode="mobile"] {
    gap: 0.38rem;
    padding: 0.5rem 0.4rem 0.42rem;
    border-radius: 14px;
  }

  .seat-lane[data-layout-mode="mobile"] .bar-zones {
    --zone-card-width: 38px;
    min-height: 74px;
    padding: 0.25rem;
    gap: 0.25rem;
  }

  .seat-lane[data-layout-mode="mobile"] .zone-row-stack {
    gap: 0.25rem;
  }

  .seat-lane[data-layout-mode="mobile"] .seat-status {
    left: 0.62rem;
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
      --zone-card-width: var(--sim-side-zone-card-width, 50px);
      min-height: calc(var(--zone-card-height) + 1.25rem);
      padding: clamp(0.3rem, 0.8cqh, 0.45rem);
    }
  }
</style>
