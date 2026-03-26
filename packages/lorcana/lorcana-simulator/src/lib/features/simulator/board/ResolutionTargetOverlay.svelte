<script lang="ts">
import MapPinnedIcon from "@lucide/svelte/icons/map-pinned";
import MoveDiagonalIcon from "@lucide/svelte/icons/move-diagonal";

import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
import {
  maybeUseSimulatorCardContext,
  type SimulatorCardContextValue,
} from "@/features/simulator/context/simulator-card-context.svelte.js";
import type {
  LorcanaCardSnapshot,
  ResolutionTargetAvailableMovesSelectionState,
} from "@/features/simulator/model/contracts.js";

interface ResolutionTargetOverlayProps {
  selectionState: ResolutionTargetAvailableMovesSelectionState;
  cardSnapshots?: Record<string, LorcanaCardSnapshot>;
  onSelectCard?: (cardId: string) => boolean;
  onSelectSlot?: (slotIndex: number) => boolean;
  onConfirm?: () => boolean;
  onDismiss?: () => void;
}

let {
  selectionState,
  cardSnapshots = {},
  onSelectCard,
  onSelectSlot,
  onConfirm,
  onDismiss,
}: ResolutionTargetOverlayProps = $props();

const simulatorCardContextFallback: Pick<
  SimulatorCardContextValue,
  "previewCard" | "setExternalPreviewCard"
> = {
  previewCard: null,
  setExternalPreviewCard: () => {},
};
const simulatorCardContext =
  maybeUseSimulatorCardContext() ?? simulatorCardContextFallback;

const resolvedSourceCard = $derived(
  selectionState.sourceCardId ? (cardSnapshots[selectionState.sourceCardId] ?? null) : null,
);

function getCard(cardId: string | null | undefined): LorcanaCardSnapshot | null {
  return cardId ? (cardSnapshots[cardId] ?? null) : null;
}

function handleCardPreviewEnter(card: LorcanaCardSnapshot | null): void {
  if (!card?.isMasked) {
    simulatorCardContext.setExternalPreviewCard(card);
  }
}

function handleCardPreviewLeave(card: LorcanaCardSnapshot | null): void {
  if (
    card &&
    !card.isMasked &&
    simulatorCardContext.previewCard?.cardId === card.cardId
  ) {
    simulatorCardContext.setExternalPreviewCard(null);
  }
}

</script>

<section class="target-overlay" data-testid="resolution-target-overlay" data-effect-type={selectionState.effectType ?? undefined}>
  <header class="target-overlay__header">
    <div class="target-overlay__header-copy">
      <div class="target-overlay__eyebrow">
        {#if selectionState.effectType === "move-to-location"}
          <MapPinnedIcon class="size-4" />
        {:else}
          <MoveDiagonalIcon class="size-4" />
        {/if}
        <span>{selectionState.categoryLabel}</span>
      </div>
      <h2 class="target-overlay__title">{selectionState.title}</h2>
      <p class="target-overlay__message">{selectionState.message}</p>
    </div>

    {#if resolvedSourceCard}
      <div class="target-overlay__source">
        <LorcanaCard
          card={resolvedSourceCard}
          size="small"
          isMasked={resolvedSourceCard.isMasked}
          interactionMeta={{
            cardId: resolvedSourceCard.cardId,
            ownerSide: resolvedSourceCard.ownerSide,
            zoneId: resolvedSourceCard.zoneId,
            selectionGroup: "resolution-target-overlay-source",
            selectionMode: "none",
            selectable: false,
          }}
        />
      </div>
    {/if}
  </header>

  <div class="target-overlay__slots">
    {#each selectionState.slots as slot, index (slot.id)}
      {@const selectedCard = getCard(slot.targetCardId)}
      <section
        class="target-slot"
        class:target-slot--active={selectionState.activeSlotIndex === index}
        data-active={selectionState.activeSlotIndex === index ? "true" : "false"}
      >
        <div class="target-slot__header">
          <div>
            <p class="target-slot__label">{slot.label}</p>
            <p class="target-slot__detail">
              {#if slot.locked}
                Locked in
              {:else if slot.targetId}
                Selected
              {:else}
                Waiting for selection
              {/if}
            </p>
          </div>

          {#if slot.locked}
            <span class="target-slot__badge">Locked</span>
          {:else if slot.targetId}
            <div class="target-slot__header-actions">
              <span class="target-slot__badge target-slot__badge--selected">Selected</span>
              <button
                type="button"
                class="target-slot__edit"
                onclick={() => onSelectSlot?.(index)}
              >
                Edit selection
              </button>
            </div>
          {:else}
            <button
              type="button"
              class="target-slot__edit"
              onclick={() => onSelectSlot?.(index)}
            >
              Choose now
            </button>
          {/if}
        </div>

        {#if selectedCard}
          <div
            class="target-slot__card"
            role="presentation"
            onmouseenter={() => handleCardPreviewEnter(selectedCard)}
            onmouseleave={() => handleCardPreviewLeave(selectedCard)}
          >
            <LorcanaCard
              card={selectedCard}
              size="small"
              isSelected={selectionState.activeSlotIndex === index}
              isMasked={selectedCard.isMasked}
              interactionMeta={{
                cardId: selectedCard.cardId,
                ownerSide: selectedCard.ownerSide,
                zoneId: selectedCard.zoneId,
                selectionGroup: "resolution-target-overlay-slot",
                selectionMode: "none",
                selectable: false,
              }}
            />
          </div>
        {:else}
          <div class="target-slot__placeholder">
            <span>{slot.cardType === "location" ? "Choose a location" : "Choose a character"}</span>
          </div>
        {/if}
      </section>
    {/each}
  </div>

  <section class="target-overlay__candidates">
    <div class="target-overlay__candidate-header">
      <h3>Available targets</h3>
      {#if selectionState.activeSlotIndex !== null}
        <span>
          Step {selectionState.activeSlotIndex + 1} of {selectionState.slots.length}
        </span>
      {/if}
    </div>

    <div class="target-overlay__candidate-grid">
      {#each selectionState.candidateEntries as entry (entry.id)}
        {@const candidateCard = entry.kind === "card" && entry.cardId ? getCard(entry.cardId) : null}
        {#if candidateCard}
          <button
            type="button"
            class="target-overlay__candidate-button"
            class:target-overlay__candidate-button--selected={entry.selected}
            onclick={() => onSelectCard?.(candidateCard.cardId)}
            onmouseenter={() => handleCardPreviewEnter(candidateCard)}
            onmouseleave={() => handleCardPreviewLeave(candidateCard)}
            data-testid={`resolution-target-candidate:${candidateCard.cardId}`}
          >
            <LorcanaCard
              card={candidateCard}
              size="small"
              isSelected={entry.selected}
              isMasked={candidateCard.isMasked}
              interactionMeta={{
                cardId: candidateCard.cardId,
                ownerSide: candidateCard.ownerSide,
                zoneId: candidateCard.zoneId,
                selectionGroup: "resolution-target-overlay-candidates",
                selectionMode: "none",
                selectable: true,
              }}
            />
            <span class="target-overlay__candidate-label">{entry.label}</span>
          </button>
        {/if}
      {/each}
    </div>
  </section>

  <footer class="target-overlay__footer">
    <button type="button" class="target-overlay__button target-overlay__button--ghost" onclick={onDismiss}>
      Cancel
    </button>
    <button
      type="button"
      class="target-overlay__button target-overlay__button--primary"
      onclick={onConfirm}
      disabled={!selectionState.canConfirm}
    >
      Confirm
    </button>
  </footer>
</section>

<style>
  .target-overlay {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    z-index: 20;
    display: grid;
    width: min(92vw, 60rem);
    gap: 1rem;
    transform: translateX(-50%);
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.75rem;
    background:
      linear-gradient(180deg, rgba(9, 14, 27, 0.96), rgba(6, 9, 19, 0.98));
    box-shadow: 0 24px 80px rgba(2, 6, 23, 0.45);
    padding: 1rem;
    backdrop-filter: blur(18px);
  }

  .target-overlay__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: flex-start;
  }

  .target-overlay__header-copy {
    display: grid;
    gap: 0.4rem;
  }

  .target-overlay__eyebrow {
    display: inline-flex;
    gap: 0.45rem;
    align-items: center;
    color: rgba(191, 219, 254, 0.82);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .target-overlay__title {
    margin: 0;
    color: #f8fafc;
    font-size: 1.15rem;
    font-weight: 800;
  }

  .target-overlay__message {
    margin: 0;
    color: rgba(191, 219, 254, 0.8);
    font-size: 0.94rem;
  }

  .target-overlay__source {
    flex: none;
  }

  .target-overlay__slots {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.9rem;
  }

  .target-slot {
    display: grid;
    gap: 0.75rem;
    padding: 0.9rem;
    border-radius: 1.25rem;
    border: 1px solid rgba(71, 85, 105, 0.6);
    background: rgba(15, 23, 42, 0.64);
    text-align: left;
  }

  .target-slot--active {
    border-color: rgba(125, 211, 252, 0.7);
    background: linear-gradient(180deg, rgba(8, 47, 73, 0.74), rgba(15, 23, 42, 0.86));
    box-shadow: inset 0 0 0 1px rgba(186, 230, 253, 0.12);
  }

  .target-slot__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .target-slot__header-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .target-slot__label {
    margin: 0;
    color: #f8fafc;
    font-size: 0.95rem;
    font-weight: 800;
  }

  .target-slot__detail {
    margin: 0.25rem 0 0;
    color: rgba(191, 219, 254, 0.72);
    font-size: 0.8rem;
  }

  .target-slot__badge {
    border-radius: 999px;
    padding: 0.28rem 0.65rem;
    background: rgba(71, 85, 105, 0.55);
    color: #e2e8f0;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .target-slot__badge--selected {
    background: rgba(14, 116, 144, 0.72);
    color: #f0f9ff;
  }

  .target-slot__edit {
    border-radius: 999px;
    border: 1px solid rgba(125, 211, 252, 0.3);
    background: rgba(15, 23, 42, 0.85);
    color: #e2e8f0;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.35rem 0.7rem;
  }

  .target-slot__card,
  .target-slot__placeholder {
    min-height: 8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background: rgba(2, 6, 23, 0.42);
  }

  .target-slot__placeholder {
    border: 1px dashed rgba(148, 163, 184, 0.25);
    color: rgba(148, 163, 184, 0.9);
    font-size: 0.84rem;
    font-weight: 600;
  }

  .target-overlay__candidates {
    display: grid;
    gap: 0.75rem;
  }

  .target-overlay__candidate-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    color: rgba(191, 219, 254, 0.78);
    font-size: 0.8rem;
  }

  .target-overlay__candidate-header h3 {
    margin: 0;
    color: #f8fafc;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .target-overlay__candidate-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 0.85rem;
    max-height: min(34vh, 18rem);
    overflow-y: auto;
  }

  .target-overlay__candidate-button {
    display: grid;
    gap: 0.45rem;
    justify-items: center;
    padding: 0.55rem;
    border: 1px solid rgba(71, 85, 105, 0.55);
    border-radius: 1.15rem;
    background: rgba(15, 23, 42, 0.65);
    transition:
      transform 150ms ease,
      border-color 150ms ease,
      background 150ms ease;
  }

  .target-overlay__candidate-button:hover {
    transform: translateY(-1px);
    border-color: rgba(125, 211, 252, 0.55);
  }

  .target-overlay__candidate-button--selected {
    border-color: rgba(125, 211, 252, 0.8);
    background: linear-gradient(180deg, rgba(14, 116, 144, 0.72), rgba(15, 23, 42, 0.82));
  }

  .target-overlay__candidate-label {
    color: #e2e8f0;
    font-size: 0.8rem;
    font-weight: 700;
    text-align: center;
  }

  .target-overlay__footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .target-overlay__button {
    border-radius: 999px;
    padding: 0.7rem 1.15rem;
    font-weight: 800;
    border: 1px solid rgba(125, 211, 252, 0.35);
  }

  .target-overlay__button--ghost {
    background: rgba(15, 23, 42, 0.74);
    color: #e2e8f0;
  }

  .target-overlay__button--primary {
    background: linear-gradient(180deg, rgba(14, 116, 144, 0.96), rgba(8, 47, 73, 0.96));
    color: #f8fafc;
  }

  .target-overlay__button:disabled {
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    .target-overlay {
      width: min(96vw, 32rem);
      bottom: 0.5rem;
      padding: 0.85rem;
    }

    .target-overlay__slots {
      grid-template-columns: 1fr;
    }
  }
</style>
