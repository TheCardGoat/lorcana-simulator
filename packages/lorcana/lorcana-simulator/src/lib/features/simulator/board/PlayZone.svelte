<script lang="ts">
  import type {
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
    LorcanaTableSeat,
    LorcanaZoneId,
  } from "@/features/simulator/model/contracts.js";
  import type { SimulatorLayoutMode } from "@/features/simulator/model/layout-mode.svelte.js";
  import { m } from "$lib/i18n/messages.js";
  import { EmptyState, DropIndicator } from "@/design-system/simulator/display/index.js";
  import ZoneCounter from "@/design-system/simulator/display/ZoneCounter.svelte";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import HotkeyCardBadge from "@/features/simulator/hotkeys/HotkeyCardBadge.svelte";
  import { buildOrderedPlayZoneEntries } from "@/features/simulator/hotkeys/board-order.js";
  import PlayZoneLocationEntry from "./PlayZoneLocationEntry.svelte";
  import {
    createCardAnchorId,
    createZoneAnchorId,
  } from "@/features/simulator/animations/board-move-animations.js";
  import {
    useLorcanaBoardPresenter,
    useLorcanaSidebarPresenter,
  } from "@/features/simulator/context/game-context.svelte.js";
  import { useSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";
  import {
    createOptionalDroppable,
    useLorcanaSimulatorDndContext,
  } from "@/features/simulator/context/simulator-dnd-context.svelte.js";

  interface PlayZoneAssociation {
    clusterId: string;
    role: "location" | "occupant";
    clusterSize: number;
    isClusterStart: boolean;
    isClusterEnd: boolean;
  }

  interface PlayZoneEntry {
    card: LorcanaCardSnapshot;
    association?: PlayZoneAssociation;
  }

  interface BoardZoneProps {
    layoutMode?: SimulatorLayoutMode;
    zoneId: LorcanaZoneId;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    isOpponent: boolean;
    label: string;
    excludeCardTypes?: Array<NonNullable<LorcanaCardSnapshot["cardType"]>>;
    hotkeyBindings?: Map<string, string>;
  }

  let {
    layoutMode = "desktop",
    zoneId,
    playerSide,
    seat,
    isOpponent,
    label,
    excludeCardTypes = [],
    hotkeyBindings = new Map(),
  }: BoardZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const sidebar = useLorcanaSidebarPresenter();
  const simulatorCardContext = useSimulatorCardContext();
  const dnd = useLorcanaSimulatorDndContext();
  const inFlightCardIds = $derived(board.inFlightCardIds);
  const cards = $derived.by(() =>
    board
      .getZoneCards(playerSide, zoneId)
      .filter((card) => !card.cardType || !excludeCardTypes.includes(card.cardType))
      .filter((card) => !inFlightCardIds.has(card.cardId)),
  );
  const playEntries = $derived.by<PlayZoneEntry[]>(() => buildOrderedPlayZoneEntries(cards, seat));
  const isMasked = $derived(board.isZoneMasked(playerSide, zoneId));
  const challengeMode = $derived(
    sidebar.actionSelectionSession?.categoryId === "challenge" &&
      sidebar.actionSelectionSession.phase !== "choose-source" &&
      board.opponentSide === playerSide,
  );
  const dropState = $derived(dnd.getZoneDropState(zoneId, playerSide));
  const droppable = createOptionalDroppable({
    zone: "play",
    get player() {
      return playerSide;
    },
  });

  const zoneLabel = $derived(label || m["sim.zone.play"]({}));
  const playerLabel = $derived(
    playerSide === "playerOne"
      ? m["sim.player.side.playerOne"]({})
      : m["sim.player.side.playerTwo"]({}),
  );
</script>

<div
  class="board-zone"
  class:board-zone--opponent={isOpponent}
  class:board-zone--drop-preview={dropState === "preview"}
  class:board-zone--drop-valid={dropState === "valid"}
  class:board-zone--drop-invalid={dropState === "invalid"}
  class:board-zone--challenge-mode={challengeMode && isOpponent}
  data-layout-mode={layoutMode}
  data-player-seat={seat}
  data-player-side={playerSide}
  data-zone-id={zoneId}
  data-board-anchor-id={createZoneAnchorId(playerSide, zoneId)}
  role="region"
  aria-label={m["sim.playZone.aria"]({ label: zoneLabel, player: playerLabel })}
  {@attach droppable.attach}
>
  <ZoneCounter
    count={cards.length}
    corner={seat === "bottom" ? "bottom-right" : "top-right"}
    ariaLabel={`${cards.length} cards in ${zoneLabel}`}
  />

  <div class="cards-container">
    <div class="cards-scroll-area" data-board-scroll-sync>
      {#if cards.length === 0}
        <EmptyState />
      {:else}
        <div class="cards-content">
          <div class="cards-grid">
            {#each playEntries as entry (entry.card.cardId)}
              {#if entry.association}
                <PlayZoneLocationEntry
                  card={entry.card}
                  association={entry.association}
                  {seat}
                  {playerSide}
                  {zoneId}
                  {isMasked}
                  hotkey={hotkeyBindings.get(entry.card.cardId)}
                />
              {:else}
                <div
                  class="card-slot"
                  data-card-id={entry.card.cardId}
                  data-player-seat={seat}
                  data-player-side={playerSide}
                  data-player-id={entry.card.ownerId}
                  data-zone-id={entry.card.zoneId}
                  data-board-anchor-id={createCardAnchorId(playerSide, zoneId, entry.card.cardId)}
                >
                  {#if hotkeyBindings.has(entry.card.cardId)}
                    <HotkeyCardBadge hotkey={hotkeyBindings.get(entry.card.cardId)!} />
                  {/if}
                  <LorcanaCard
                    card={entry.card}
                    useContainerSize
                    imageFormat="art_and_name"
                    hoverShowActions
                    isSelected={
                      sidebar.getActionSessionCardState(entry.card.cardId).isSelected ||
                      simulatorCardContext.previewCard?.cardId === entry.card.cardId
                    }
                    isMasked={isMasked}
                    isPlayable={sidebar.getActionSessionCardState(entry.card.cardId).isSelectable}
                    isInvalidTarget={sidebar.getActionSessionCardState(entry.card.cardId).isInvalidTarget}
                    isBanishedPreview={sidebar.getChallengePreviewCardState(entry.card.cardId).wouldBeBanished}
                    isExerted={entry.card.readyState === "exerted"}
                    isDrying={entry.card.isDrying ?? false}
                    damage={entry.card.damage ?? 0}
                  />
                </div>
              {/if}
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>

  {#if dropState === "valid" || dropState === "invalid"}
    <DropIndicator state={dropState} />
  {/if}
</div>

<style>
  .board-zone {
    --zone-bg: rgba(15, 30, 50, 0.4);
    --zone-border: rgba(100, 150, 200, 0.15);
    --card-aspect: 0.9582;
    --play-zone-padding: 0.5rem;
    --play-grid-gap: 0.5rem;
    --play-card-effect-bleed: 1rem;
    --play-scrollbar-size: 10px;
    --play-scrollbar-thumb: rgba(143, 211, 255, 0.65);
    --play-scrollbar-track: rgba(7, 18, 31, 0.36);
    --zone-card-width:
      min(
        var(--sim-play-card-width, 180px),
        calc(
          (
            100cqh
            - (var(--play-zone-padding) * 2)
            - var(--play-grid-gap)
          ) / 2 * var(--card-aspect)
        )
      );
    --zone-card-height: calc(var(--zone-card-width) / var(--card-aspect));

    /* Container context for zone cards */
    container-type: size;
    container-name: play-zone;

    position: relative;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    background: var(--zone-bg);
    border: 2px dashed var(--zone-border);
    border-radius: 12px;
    padding: var(--play-zone-padding);
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: all 200ms ease;
  }

  .board-zone--opponent {
    --zone-bg: rgba(50, 20, 20, 0.25);
    --zone-border: rgba(200, 100, 100, 0.15);
  }

  .board-zone--drop-valid {
    background: rgba(56, 189, 139, 0.12);
    border-color: rgba(56, 189, 139, 0.6);
    border-style: solid;
  }

  .board-zone--drop-preview {
    background: rgba(59, 130, 246, 0.08);
    border-color: rgba(96, 165, 250, 0.42);
    border-style: solid;
  }

  .board-zone--drop-invalid {
    background: rgba(248, 113, 113, 0.12);
    border-color: rgba(248, 113, 113, 0.65);
    border-style: solid;
  }

  .board-zone--challenge-mode {
    box-shadow: inset 0 0 0 1px rgba(250, 204, 21, 0.28);
  }

  .cards-container {
    flex: 1;
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 0;
    min-width: 0;
    overflow: visible;
  }

  .cards-scroll-area {
    flex: 1;
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 0;
    min-width: 0;
    margin: calc(var(--play-card-effect-bleed) * -1);
    padding: var(--play-card-effect-bleed);
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-gutter: stable;
    scrollbar-width: auto;
    scrollbar-color: var(--play-scrollbar-thumb) var(--play-scrollbar-track);
  }

  .cards-scroll-area::-webkit-scrollbar {
    width: var(--play-scrollbar-size);
  }

  .cards-scroll-area::-webkit-scrollbar-track {
    background: var(--play-scrollbar-track);
    border-radius: 999px;
  }

  .cards-scroll-area::-webkit-scrollbar-thumb {
    background: var(--play-scrollbar-thumb);
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  .cards-grid {
    display: grid;
    grid-template-columns:
      repeat(auto-fit, minmax(min(100%, var(--zone-card-width)), var(--zone-card-width)));
    justify-content: center;
    align-content: start;
    gap: var(--play-grid-gap);
    padding: 0 0.5rem 0.5rem;
    width: 100%;
    min-height: min-content;
  }

  .cards-content {
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    min-height: 100%;
  }

  .board-zone[data-player-seat="top"] .cards-content {
    justify-content: flex-end;
  }

  .board-zone[data-player-seat="top"] .cards-grid {
    padding: 0.5rem 0.5rem 0;
  }

  .card-slot {
    --zone-card-height: calc(var(--zone-card-width) / var(--card-aspect));
    position: relative;
    width: var(--zone-card-width);
    height: var(--zone-card-height);
  }

  /* Responsive via container queries */
  @container play-zone (max-width: 400px) {
    .board-zone {
      --play-grid-gap: 0.5rem;
    }

    .card-slot {
      --zone-card-width:
        min(
          clamp(60px, 35cqw, 130px),
          calc(
            (
              100cqh
              - (var(--play-zone-padding) * 2)
              - var(--play-grid-gap)
            ) / 2 * var(--card-aspect)
          )
        );
    }
  }

  @container play-zone (min-width: 600px) {
    .card-slot {
      --zone-card-width:
        min(
          clamp(90px, 20cqw, 180px),
          calc(
            (
              100cqh
              - (var(--play-zone-padding) * 2)
              - var(--play-grid-gap)
            ) / 2 * var(--card-aspect)
          )
        );
    }
  }

  @media (min-width: 1240px) {
    .board-zone {
      --zone-card-width:
        min(
          var(--sim-play-card-width, 180px),
          calc(
            (
              100cqh
              - (var(--play-zone-padding) * 2)
              - var(--play-grid-gap)
            ) / 2 * var(--card-aspect)
          )
        );
      min-height: calc(var(--zone-card-height) + 2rem);
    }

    .cards-grid {
      gap: clamp(0.5rem, 1.25cqh, 0.85rem);
    }
  }

  @media (max-width: 640px) {
    .board-zone {
      --play-grid-gap: 0.6rem;
      --play-scrollbar-size: 14px;
      --play-scrollbar-thumb: rgba(143, 211, 255, 0.85);
      --play-scrollbar-track: rgba(7, 18, 31, 0.52);
    }

    .cards-grid {
      padding: 0.35rem;
    }

    .board-zone[data-layout-mode="mobile"] {
      --zone-card-width: clamp(92px, 28vw, 136px);
      --zone-card-height: calc(var(--zone-card-width) / var(--card-aspect));
    }

    .board-zone[data-layout-mode="mobile"] .cards-scroll-area {
      justify-content: flex-start;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-gutter: auto;
    }

    .board-zone[data-layout-mode="mobile"] .cards-content {
      flex: 0 0 auto;
      width: max-content;
      min-width: 100%;
      min-height: 0;
    }

    .board-zone[data-layout-mode="mobile"] .cards-grid {
      grid-auto-flow: column;
      grid-auto-columns: var(--zone-card-width);
      grid-template-columns: none;
      justify-content: flex-start;
      width: max-content;
      min-width: 100%;
      padding: 0.35rem 0.4rem;
    }
  }
</style>
