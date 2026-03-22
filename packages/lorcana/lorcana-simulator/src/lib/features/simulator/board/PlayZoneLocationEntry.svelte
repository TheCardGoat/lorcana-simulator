<script lang="ts">
  import type {
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
    LorcanaZoneId,
    LorcanaTableSeat,
  } from "@/features/simulator/model/contracts.js";
  import { createCardAnchorId } from "@/features/simulator/animations/board-move-animations.js";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import { useLorcanaSidebarPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import {
    createOptionalDroppable,
    useLorcanaSimulatorDndContext,
  } from "@/features/simulator/context/simulator-dnd-context.svelte.js";
  import {
    handlePlayZoneLocationEntryDirectSelection,
    isPlayZoneLocationEntryDirectSelectionMode,
  } from "./play-zone-location-entry-interactions.js";

  interface PlayZoneLocationAssociation {
    clusterId: string;
    role: "location" | "occupant";
    clusterSize: number;
    isClusterStart: boolean;
    isClusterEnd: boolean;
  }

  interface PlayZoneLocationEntryProps {
    card: LorcanaCardSnapshot;
    association: PlayZoneLocationAssociation;
    seat: LorcanaTableSeat;
    playerSide: LorcanaPlayerSide;
    zoneId: LorcanaZoneId;
    isMasked: boolean;
    isValidTarget: (cardId: string) => boolean;
    isInvalidTarget: (cardId: string) => boolean;
  }

  let {
    card,
    association,
    seat,
    playerSide,
    zoneId,
    isMasked,
    isValidTarget,
    isInvalidTarget,
  }: PlayZoneLocationEntryProps = $props();

  const sidebar = useLorcanaSidebarPresenter();
  const dnd = useLorcanaSimulatorDndContext();
  const isDirectSelectionMode = $derived(
    isPlayZoneLocationEntryDirectSelectionMode(sidebar.actionSelectionSession),
  );
  const dropState = $derived(
    association.role === "location"
      ? dnd.getLocationDropState(card.cardId, playerSide)
      : dnd.getCardDropState(card.cardId),
  );
  const locationDroppable = createOptionalDroppable({
    get locationId() {
      return card.cardId;
    },
    get player() {
      return playerSide;
    },
    get disabled() {
      return association.role !== "location";
    },
  });

  function handleDirectCardSelection(selectedCard: LorcanaCardSnapshot, event: MouseEvent): void {
    handlePlayZoneLocationEntryDirectSelection({
      card: selectedCard,
      event,
      directSelectionMode: isDirectSelectionMode,
      onSelect: (nextCard) => sidebar.handleActionSessionCardSelection(nextCard),
    });
  }
</script>

{#if association.role === "location"}
  <div
    class="card-slot card-slot--location-related card-slot--location-anchor"
    class:card-slot--cluster-start={association.isClusterStart}
    class:card-slot--cluster-end={association.isClusterEnd}
    class:card-slot--drop-preview={dropState === "preview"}
    class:card-slot--drop-valid={dropState === "valid"}
    class:card-slot--drop-invalid={dropState === "invalid"}
    data-card-id={card.cardId}
    data-card-drop-id={card.cardId}
    data-player-seat={seat}
    data-player-side={playerSide}
    data-player-id={card.ownerId}
    data-zone-id={card.zoneId}
    data-location-cluster-id={association.clusterId}
    data-location-cluster-role={association.role}
    data-board-anchor-id={createCardAnchorId(playerSide, zoneId, card.cardId)}
    {@attach locationDroppable.attach}
  >
    <div class="location-card-shell">
      <div class="location-card-rotate">
        <LorcanaCard
          {card}
          onSelect={(selectedCard, event) => handleDirectCardSelection(selectedCard, event)}
          useContainerSize
          imageFormat="art_and_name"
          hoverShowActions
          isSelected={sidebar.getActionSessionCardState(card.cardId).isSelected}
          {isMasked}
          isPlayable={
            sidebar.getActionSessionCardState(card.cardId).isSelectable || isValidTarget(card.cardId)
          }
          isInvalidTarget={
            sidebar.getActionSessionCardState(card.cardId).isInvalidTarget || isInvalidTarget(card.cardId)
          }
          isBanishedPreview={sidebar.getChallengePreviewCardState(card.cardId).wouldBeBanished}
          isDrying={card.isDrying ?? false}
          damage={card.damage ?? 0}
        />
      </div>
    </div>
  </div>
{:else}
  {@const occupantDraggable = dnd.createOptionalDraggable({
    card,
    disabled: isDirectSelectionMode,
  })}
  <div
    class="card-slot card-slot--location-related card-slot--location-occupant"
    class:card-slot--cluster-start={association.isClusterStart}
    class:card-slot--cluster-end={association.isClusterEnd}
    class:card-slot--drop-preview={dropState === "preview"}
    class:card-slot--drop-valid={dropState === "valid"}
    class:card-slot--drop-invalid={dropState === "invalid"}
    data-card-id={card.cardId}
    data-card-drop-id={card.cardId}
    data-player-seat={seat}
    data-player-side={playerSide}
    data-player-id={card.ownerId}
    data-zone-id={card.zoneId}
    data-location-cluster-id={association.clusterId}
    data-location-cluster-role={association.role}
    data-board-anchor-id={createCardAnchorId(playerSide, zoneId, card.cardId)}
    {@attach occupantDraggable.attach}
  >
    <LorcanaCard
      {card}
      onSelect={(selectedCard, event) => handleDirectCardSelection(selectedCard, event)}
      useContainerSize
      imageFormat="art_and_name"
      hoverShowActions
      isSelected={sidebar.getActionSessionCardState(card.cardId).isSelected}
      {isMasked}
      isPlayable={
        sidebar.getActionSessionCardState(card.cardId).isSelectable || isValidTarget(card.cardId)
      }
      isInvalidTarget={
        sidebar.getActionSessionCardState(card.cardId).isInvalidTarget || isInvalidTarget(card.cardId)
      }
      isBanishedPreview={sidebar.getChallengePreviewCardState(card.cardId).wouldBeBanished}
      isExerted={card.readyState === "exerted"}
      isDrying={card.isDrying ?? false}
      damage={card.damage ?? 0}
    />
  </div>
{/if}

<style>
  .card-slot--location-related {
    position: relative;
    overflow: visible;
    isolation: isolate;
  }

  .card-slot--location-related::before {
    content: "";
    position: absolute;
    inset: -0.22rem -0.28rem;
    z-index: -1;
    border-radius: 0.95rem;
    background:
      linear-gradient(180deg, rgba(40, 65, 98, 0.34), rgba(17, 29, 48, 0.16));
    border: 1px solid rgba(109, 156, 207, 0.16);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .card-slot--location-anchor::before {
    background:
      linear-gradient(180deg, rgba(74, 98, 42, 0.34), rgba(26, 41, 22, 0.18));
    border-color: rgba(165, 203, 120, 0.22);
  }

  .card-slot--location-related:not(.card-slot--cluster-start)::before {
    border-top-left-radius: 0.45rem;
    border-bottom-left-radius: 0.45rem;
    left: -0.4rem;
  }

  .card-slot--location-related:not(.card-slot--cluster-end)::before {
    border-top-right-radius: 0.45rem;
    border-bottom-right-radius: 0.45rem;
    right: -0.4rem;
  }

  .card-slot--location-related.card-slot--drop-valid::before {
    border-color: rgba(56, 189, 139, 0.54);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 0 0 1px rgba(56, 189, 139, 0.22);
  }

  .card-slot--location-related.card-slot--drop-preview::before {
    border-color: rgba(96, 165, 250, 0.42);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 0 0 1px rgba(96, 165, 250, 0.14);
  }

  .card-slot--location-related.card-slot--drop-invalid::before {
    border-color: rgba(248, 113, 113, 0.48);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 0 0 1px rgba(248, 113, 113, 0.16);
  }

  .location-card-shell {
    --location-card-height: calc(var(--zone-card-width) / var(--card-aspect));
    width: var(--location-card-height);
    height: var(--zone-card-width);
    position: relative;
    overflow: visible;
  }

  .location-card-rotate {
    --zone-card-height: var(--location-card-height);
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--zone-card-width);
    height: var(--location-card-height);
    transform: translate(-50%, -50%) rotate(90deg);
  }
</style>
