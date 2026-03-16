<script lang="ts">
  import type {
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
    LorcanaTableSeat,
    LorcanaZoneId,
  } from "@/features/simulator/model/contracts.js";
  import { m } from "$lib/paraglide/messages.js";
  import {EmptyState, DropIndicator, ZoneLabel} from "@/design-system/simulator/display/index.js";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import PlayZoneLocationEntry from "./PlayZoneLocationEntry.svelte";
  import {createCardAnchorId, createZoneAnchorId} from "@/features/simulator/animations/board-move-animations.js";
  import {
      useLorcanaBoardPresenter,
      useLorcanaSidebarPresenter
  } from "@/features/simulator/context/game-context.svelte.js";
  import {
    createOptionalDroppable,
    useLorcanaSimulatorDndContext,
  } from "@/features/simulator/context/simulator-dnd-context.svelte.js";
  type ZoneDropState = "none" | "valid" | "invalid";
  type PlayZoneEntry =
          | {
    kind: "card";
    card: LorcanaCardSnapshot;
  }
          | {
    kind: "location-group";
    location: LorcanaCardSnapshot;
    occupants: LorcanaCardSnapshot[];
  };

  interface BoardZoneProps {
    zoneId: LorcanaZoneId;
    playerSide: LorcanaPlayerSide;
    seat: LorcanaTableSeat;
    isOpponent: boolean;
    label: string;
    excludeCardTypes?: Array<NonNullable<LorcanaCardSnapshot["cardType"]>>;
  }

  let {
    zoneId,
    playerSide,
    seat,
    isOpponent,
    label,
    excludeCardTypes = [],
  }: BoardZoneProps = $props();

  const board = useLorcanaBoardPresenter();
  const sidebar = useLorcanaSidebarPresenter();
  const dnd = useLorcanaSimulatorDndContext();
  const cards = $derived.by(() =>
    board
      .getZoneCards(playerSide, zoneId)
      .filter((card) => !card.cardType || !excludeCardTypes.includes(card.cardType)),
  );
  const playEntries = $derived.by<PlayZoneEntry[]>(() => {
    const locationIds = new Set(
            cards.filter((card) => card.cardType === "location").map((card) => card.cardId),
    );
    const occupantsByLocation = new Map<string, LorcanaCardSnapshot[]>();

    for (const card of cards) {
      if (card.cardType !== "character" || !card.atLocationId || !locationIds.has(card.atLocationId)) {
        continue;
      }

      const occupants = occupantsByLocation.get(card.atLocationId) ?? [];
      occupants.push(card);
      occupantsByLocation.set(card.atLocationId, occupants);
    }

    const entries = cards.flatMap<PlayZoneEntry>((card) => {
      if (card.cardType === "location") {
        const occupants = occupantsByLocation.get(card.cardId) ?? [];
        return occupants.length > 0
                ? [{kind: "location-group", location: card, occupants}]
                : [{kind: "card", card}];
      }

      if (card.cardType === "character" && card.atLocationId && locationIds.has(card.atLocationId)) {
        return [];
      }

      return [{kind: "card", card}];
    });

    if (seat !== "bottom") {
      return entries;
    }

    const characterEntries: PlayZoneEntry[] = [];
    const locationEntries: PlayZoneEntry[] = [];

    for (const entry of entries) {
      const isLocationEntry =
        entry.kind === "location-group" || entry.card.cardType === "location";

      if (isLocationEntry) {
        locationEntries.push(entry);
      } else {
        characterEntries.push(entry);
      }
    }

    return [...characterEntries, ...locationEntries];
  });
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

  function isValidTarget(cardId: string): boolean {
    return sidebar.getActionSessionCardState(cardId).isSelectable;
  }

  function isInvalidTarget(cardId: string): boolean {
    return sidebar.getActionSessionCardState(cardId).isInvalidTarget;
  }

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
  data-player-seat={seat}
  data-player-side={playerSide}
  data-zone-id={zoneId}
  data-board-anchor-id={createZoneAnchorId(playerSide, zoneId)}
  role="region"
  aria-label={m["sim.playZone.aria"]({ label: zoneLabel, player: playerLabel })}
  {@attach droppable.attach}
>
  <div class="cards-container">
    {#if cards.length === 0}
      <EmptyState />
    {:else}
      <div class="cards-grid">
        {#each playEntries as entry (entry.kind === "location-group" ? entry.location.cardId : entry.card.cardId)}
          {#if entry.kind === "location-group"}
            <PlayZoneLocationEntry
              location={entry.location}
              occupants={entry.occupants}
              {seat}
              {playerSide}
              {zoneId}
              {isMasked}
              {isValidTarget}
              {isInvalidTarget}
            />
          {:else}
            <div
                    class="card-slot"
                    data-card-id={entry.card.cardId}
                    data-player-seat={seat}
                    data-player-id={entry.card.ownerId}
                    data-zone-id={entry.card.zoneId}
                    data-board-anchor-id={createCardAnchorId(playerSide, zoneId, entry.card.cardId)}
            >
              <LorcanaCard
                      card={entry.card}
                      useContainerSize
                      imageFormat="art_and_name"
                      hoverShowActions
                      isSelected={sidebar.getActionSessionCardState(entry.card.cardId).isSelected}
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
    {/if}
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
    --zone-card-width: 180px;
    --zone-card-height: calc(var(--zone-card-width) / var(--card-aspect));

    /* Container context for zone cards */
    container-type: inline-size;
    container-name: play-zone;

    position: relative;
    min-height: calc(var(--zone-card-height) + 2.25rem);
    background: var(--zone-bg);
    border: 2px dashed var(--zone-border);
    border-radius: 12px;
    padding: 0.5rem;
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
    align-items: flex-start;
    justify-content: center;
    min-height: 0;
    overflow: visible;
  }

  .cards-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.5rem;
    width: 100%;
  }

  .card-slot {
    --zone-card-height: calc(var(--zone-card-width) / var(--card-aspect));
    width: var(--zone-card-width);
    height: var(--zone-card-height);
  }

  /* Responsive via container queries */
  @container play-zone (max-width: 400px) {
    .card-slot {
      --zone-card-width: clamp(50px, 30cqw, 100px);
    }
  }

  @container play-zone (min-width: 600px) {
    .card-slot {
      --zone-card-width: clamp(90px, 20cqw, 180px);
    }
  }

  @media (min-width: 1240px) {
    .board-zone {
      --zone-card-width: var(--sim-play-card-width, 180px);
      min-height: calc(var(--zone-card-height) + 2rem);
    }

    .card-slot {
      --zone-card-width: var(--sim-play-card-width, 180px);
    }

    .cards-grid {
      gap: clamp(0.5rem, 1.25cqh, 0.85rem);
    }
  }

  @media (max-width: 640px) {
    .cards-grid {
      gap: 0.45rem;
      padding: 0.35rem;
    }
  }
</style>
