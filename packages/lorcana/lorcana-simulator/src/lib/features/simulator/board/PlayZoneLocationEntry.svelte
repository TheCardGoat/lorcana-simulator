<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import type {
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
    LorcanaZoneId,
    LorcanaTableSeat,
  } from "@/features/simulator/model/contracts.js";
  import {createCardAnchorId} from "@/features/simulator/animations/board-move-animations.js";
  import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import {useLorcanaSidebarPresenter} from "@/features/simulator/context/game-context.svelte.js";

  interface PlayZoneLocationEntryProps {
    location: LorcanaCardSnapshot;
    occupants: LorcanaCardSnapshot[];
    seat: LorcanaTableSeat;
    playerSide: LorcanaPlayerSide;
    zoneId: LorcanaZoneId;
    isMasked: boolean;
    isValidTarget: (cardId: string) => boolean;
    isInvalidTarget: (cardId: string) => boolean;
  }

  let {
    location,
    occupants,
    seat,
    playerSide,
    zoneId,
    isMasked,
    isValidTarget,
    isInvalidTarget,
  }: PlayZoneLocationEntryProps = $props();

  const sidebar = useLorcanaSidebarPresenter();
</script>

<div
  class="card-slot card-slot--location-group"
  style={`--occupant-count:${occupants.length};`}
  data-card-id={location.cardId}
  data-player-seat={seat}
  data-player-id={location.ownerId}
  data-zone-id={location.zoneId}
  data-board-anchor-id={createCardAnchorId(playerSide, zoneId, location.cardId)}
>
  <div class="location-group">
    <div class="location-group__halo" aria-hidden="true"></div>
    <div class="location-group__location-shell">
      <div class="location-group__location-card">
        <LorcanaCard
          card={location}
          useContainerSize
          imageFormat="full"
          hoverShowActions
          isSelected={sidebar.getActionSessionCardState(location.cardId).isSelected}
          {isMasked}
          isPlayable={sidebar.getActionSessionCardState(location.cardId).isSelectable || isValidTarget(location.cardId)}
          isInvalidTarget={sidebar.getActionSessionCardState(location.cardId).isInvalidTarget || isInvalidTarget(location.cardId)}
          isBanishedPreview={sidebar.getChallengePreviewCardState(location.cardId).wouldBeBanished}
          isDrying={location.isDrying ?? false}
          damage={location.damage ?? 0}
        />
      </div>
    </div>

    <div class="location-group__occupants" aria-label={m["sim.playZone.locationOccupantsAria"]({})}>
      {#each occupants as occupant, occupantIndex (occupant.cardId)}
        <div
          class="location-group__occupant-slot"
          class:location-group__occupant-slot--offset={occupantIndex > 0}
          style={`--occupant-index:${occupantIndex};`}
          data-card-id={occupant.cardId}
          data-player-seat={seat}
          data-player-id={occupant.ownerId}
          data-zone-id={occupant.zoneId}
          data-board-anchor-id={createCardAnchorId(playerSide, zoneId, occupant.cardId)}
        >
          <LorcanaCard
            card={occupant}
            useContainerSize
            imageFormat="art_only"
            tagCollapseMode="hover-stack"
            hoverShowActions
            isSelected={sidebar.getActionSessionCardState(occupant.cardId).isSelected}
            {isMasked}
            isPlayable={sidebar.getActionSessionCardState(occupant.cardId).isSelectable || isValidTarget(occupant.cardId)}
            isInvalidTarget={sidebar.getActionSessionCardState(occupant.cardId).isInvalidTarget || isInvalidTarget(occupant.cardId)}
            isBanishedPreview={sidebar.getChallengePreviewCardState(occupant.cardId).wouldBeBanished}
            isExerted={occupant.readyState === "exerted"}
            isDrying={occupant.isDrying ?? false}
            damage={occupant.damage ?? 0}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .card-slot {
    --zone-card-height: calc(var(--zone-card-width) / var(--card-aspect));
    width: var(--zone-card-width);
    height: var(--zone-card-height);
  }

  .card-slot--location-group {
    --location-card-aspect: 0.717;
    --occupant-card-aspect: 1.219;
    --location-card-width: clamp(92px, calc(var(--zone-card-width) * 0.36), 148px);
    --location-card-height: calc(var(--location-card-width) / var(--location-card-aspect));
    --occupant-card-width: clamp(76px, calc(var(--zone-card-width) * 0.5), 90px);
    --occupant-card-height: calc(var(--occupant-card-width) / var(--occupant-card-aspect));
    --location-group-padding-x: clamp(0.5rem, 1.8cqw, 0.8rem);
    --location-group-padding-top: clamp(0.5rem, 1.4cqw, 0.8rem);
    --location-group-padding-bottom: clamp(0.45rem, 1.5cqw, 0.8rem);
    --location-to-occupants-gap: clamp(0.45rem, 1.8cqw, 0.8rem);
    --occupant-overlap: clamp(0.65rem, 3.8cqw, 1rem);
    --occupant-step-width: calc(var(--occupant-card-width) - var(--occupant-overlap));
    --occupant-stack-width: calc(
      var(--occupant-card-width) +
      ((var(--occupant-count, 1) - 1) * var(--occupant-step-width))
    );
    --location-group-width: clamp(
      188px,
      max(
        calc(var(--location-card-height) + (var(--location-group-padding-x) * 2)),
        calc(var(--occupant-stack-width) + (var(--location-group-padding-x) * 2))
      ),
      420px
    );
    --location-group-height: clamp(
      212px,
      calc(
        var(--location-group-padding-top) +
        var(--location-card-width) +
        var(--location-to-occupants-gap) +
        var(--occupant-card-height) +
        var(--location-group-padding-bottom)
      ),
      420px
    );
    width: var(--location-group-width);
    height: var(--location-group-height);
  }

  .location-group {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    padding: clamp(0.35rem, 1.6cqw, 0.75rem);
    border-radius: 1rem;
    background: linear-gradient(180deg, rgba(14, 24, 37, 0.88) 0%, rgba(8, 18, 30, 0.72) 100%);
    border: 1px solid rgba(125, 173, 214, 0.18);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 18px 32px rgba(0, 0, 0, 0.22);
  }

  .location-group__halo {
    position: absolute;
    inset: 0.45rem 0.65rem 1.2rem;
    border-radius: 0.85rem;
    border: 1px dashed rgba(152, 200, 237, 0.18);
    background: radial-gradient(circle at top, rgba(93, 171, 229, 0.14), transparent 58%);
    pointer-events: none;
  }

  .location-group__location-shell {
    position: absolute;
    top: var(--location-group-padding-top);
    left: 50%;
    width: var(--location-card-height);
    height: var(--location-card-width);
    transform: translateX(-50%);
    filter: saturate(1.05);
    overflow: visible;
  }

  .location-group__location-card {
    --zone-card-width: var(--location-card-width);
    --zone-card-height: var(--location-card-height);
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--location-card-width);
    height: var(--location-card-height);
    transform: translate(-50%, -50%) rotate(90deg);
    transform-origin: center;
  }

  .location-group__location-card :global(.card-face) {
    transform-origin: center center;
  }

  .location-group__occupants {
    position: absolute;
    right: var(--location-group-padding-x);
    bottom: var(--location-group-padding-bottom);
    left: var(--location-group-padding-x);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    min-height: var(--occupant-card-height);
    pointer-events: none;
    overflow: visible;
  }

  .location-group__occupant-slot {
    --zone-card-width: var(--occupant-card-width);
    --zone-card-height: var(--occupant-card-height);
    position: relative;
    width: var(--zone-card-width);
    height: var(--zone-card-height);
    pointer-events: auto;
    z-index: calc(10 + var(--occupant-index, 0));
    overflow: visible;
  }

  .location-group__occupant-slot--offset {
    margin-left: calc(var(--occupant-overlap) * -1);
  }

  .location-group__occupant-slot :global(.card-face) {
    transform-origin: center bottom;
  }

  @container play-zone (max-width: 400px) {
    .card-slot--location-group {
      --location-card-width: clamp(84px, 34cqw, 118px);
      --occupant-card-width: clamp(68px, calc(var(--zone-card-width) * 0.5), 82px);
      --location-group-width: clamp(
        170px,
        max(
          72cqw,
          calc(var(--occupant-stack-width) + (var(--location-group-padding-x) * 2))
        ),
        276px
      );
      --location-group-height: clamp(196px, 94cqw, 304px);
    }
  }

  @media (max-width: 640px) {
    .card-slot--location-group {
      --location-group-height: clamp(
        196px,
        calc(var(--occupant-card-height) + var(--location-card-width) + 2.5rem),
        304px
      );
    }

    .location-group {
      border-radius: 0.9rem;
    }
  }
</style>
