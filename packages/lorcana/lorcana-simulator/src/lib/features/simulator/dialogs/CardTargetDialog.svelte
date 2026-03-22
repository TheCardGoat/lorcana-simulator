<script lang="ts">
    import * as Dialog from "$lib/design-system/primitives/dialog";
  import { m } from "$lib/i18n/messages.js";
  import type {
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
  } from "@/features/simulator/model/contracts.js";
    import {evaluateCardTargetMatches, describeTargetBadges} from "@/features/simulator/model/discard-target-dsl.js";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
  import type { LorcanaCardTarget } from "@tcg/lorcana-engine";

  interface CardTargetDialogProps {
    open?: boolean;
    cards: LorcanaCardSnapshot[];
    playerSide: LorcanaPlayerSide;
    viewerSide?: LorcanaPlayerSide | null;
    target: LorcanaCardTarget;
    selectable?: boolean;
    selectedCardIds?: string[];
    titleText?: string;
    emptyAllText?: string;
    emptyNoMatchText?: string;
    closeButtonLabel?: string;
    closeButtonAriaLabel?: string;
    summaryFormatter?: (
      matchCount: number,
      totalCount: number,
      playerLabel: string,
      target: LorcanaCardTarget,
    ) => string;
  }

  let {
    open = $bindable(false),
    cards,
    playerSide,
    viewerSide = null,
    target,
    selectable = false,
    selectedCardIds = [],
    titleText,
    emptyAllText = m["sim.target.emptyAll"]({}),
    emptyNoMatchText = m["sim.target.emptyNoMatch"]({}),
    closeButtonLabel = m["sim.target.close"]({}),
    closeButtonAriaLabel = m["sim.target.closeAria"]({}),
    summaryFormatter = (matchCount, totalCount, playerLabel, _target) =>
      m["sim.target.summary"]({ matchCount, totalCount, playerLabel }),
  }: CardTargetDialogProps = $props();

  const playerLabel = $derived(
    playerSide === "playerOne" ? m["sim.player.side.playerOne"]({}) : m["sim.player.side.playerTwo"]({}),
  );

  const evaluation = $derived(
    evaluateCardTargetMatches(cards, target, {
      viewerSide: viewerSide ?? undefined,
    }),
  );

  const badgeModels = $derived(describeTargetBadges(target, evaluation.unsupportedFilters));
  const orderedCards = $derived(evaluation.matchedCards.slice().reverse());
  const headerSummary = $derived(
    summaryFormatter(orderedCards.length, cards.length, playerLabel, target),
  );
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
    />
    <Dialog.Content
      class="fixed z-50 left-1/2 top-1/2 w-[min(92vw,1024px)] h-[min(88vh,720px)] -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-600/70 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-3 overflow-hidden"
      showCloseButton={false}
    >
      <Dialog.Title class="sr-only">
        {titleText ?? m["sim.target.dialog.title"]({ playerLabel })}
      </Dialog.Title>
      <Dialog.Description class="sr-only">
        {m["sim.target.dialog.description"]({
          title: titleText ?? m["sim.target.dialog.title"]({ playerLabel }),
          matchCount: orderedCards.length,
          totalCount: cards.length,
        })}
      </Dialog.Description>

      <header class="dialog-header">
        <div>
          <h2>{titleText ?? m["sim.target.dialog.header"]({ playerLabel })}</h2>
          <p>{headerSummary}</p>
        </div>
        <Dialog.Close class="close-button" aria-label={closeButtonAriaLabel}>
          <span aria-hidden="true" class="close-button__icon">
            <svg viewBox="0 0 16 16" focusable="false">
              <path
                d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z"
              />
            </svg>
          </span>
          <span>{closeButtonLabel}</span>
        </Dialog.Close>
      </header>

      {#if badgeModels.length > 0}
        <div class="badge-strip" role="list" aria-label={m["sim.target.constraints.aria"]({})}>
          {#each badgeModels as badge (badge.id)}
            <span
              class="badge"
              class:badge--warning={badge.variant === "warning"}
              role="listitem"
            >
              {badge.label}
            </span>
          {/each}
        </div>
      {/if}

      <section class="dialog-content" aria-live="polite">
        {#if cards.length === 0}
          <p class="empty-state">{emptyAllText}</p>
        {:else if orderedCards.length === 0}
          <p class="empty-state">{emptyNoMatchText}</p>
        {:else}
          <div class="card-grid">
            {#each orderedCards as card (card.cardId)}
              {@const isSelected = selectedCardIds.includes(card.cardId)}
              <button
                type="button"
                class="card-button"
                class:card-button--selected={isSelected}
                aria-label={selectable
                  ? m["sim.target.toggleSelectionAria"]({ cardLabel: card.label })
                  : m["sim.target.inspectAria"]({ cardLabel: card.label })}
              >
                <LorcanaCard
                  {card}
                  isSelected={isSelected}
                  isMasked={card.isMasked}
                  size="small"
                  interactionMeta={{
                    cardId: card.cardId,
                    ownerSide: card.ownerSide,
                    zoneId: card.zoneId,
                    selectionGroup: "target-dialog",
                    selectionMode: selectable ? "multi" : "none",
                    selectable,
                  }}
                />
              </button>
            {/each}
          </div>
        {/if}
      </section>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .dialog-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .dialog-header h2 {
    margin: 0;
    font-size: 1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #f8fafc;
  }

  .dialog-header p {
    margin: 0.3rem 0 0;
    color: #94a3b8;
    font-size: 0.85rem;
  }

  :global(.close-button) {
    --close-border: rgba(148, 163, 184, 0.26);
    --close-bg: linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.58));
    --close-text: #e2e8f0;
    --close-icon: #bfdbfe;
    display: inline-grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 0.55rem;
    border: 1px solid var(--close-border);
    border-radius: 999px;
    background: var(--close-bg);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 10px 24px rgba(2, 6, 23, 0.28);
    color: var(--close-text);
    padding: 0.42rem 0.8rem 0.42rem 0.5rem;
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    line-height: 1;
    transition:
      transform 160ms ease,
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      box-shadow 160ms ease;
  }

  :global(.close-button:hover) {
    border-color: rgba(125, 211, 252, 0.5);
    background:
      linear-gradient(180deg, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.74));
    color: #f8fafc;
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 16px 30px rgba(2, 6, 23, 0.35);
  }

  :global(.close-button:focus-visible) {
    outline: 2px solid rgba(125, 211, 252, 0.9);
    outline-offset: 2px;
  }

  .close-button__icon {
    display: inline-grid;
    place-items: center;
    width: 1.45rem;
    height: 1.45rem;
    border-radius: 999px;
    background: rgba(37, 99, 235, 0.16);
    color: var(--close-icon);
    box-shadow: inset 0 0 0 1px rgba(191, 219, 254, 0.14);
    flex-shrink: 0;
  }

  .close-button__icon svg {
    width: 0.85rem;
    height: 0.85rem;
    fill: currentColor;
  }

  .badge-strip {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.25rem;
  }

  .badge {
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    background: rgba(15, 23, 42, 0.45);
    color: #dbeafe;
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
    line-height: 1.1;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  .badge--warning {
    border-color: rgba(251, 146, 60, 0.45);
    background: rgba(127, 29, 29, 0.4);
    color: #fed7aa;
  }

  .dialog-content {
    position: relative;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    border-radius: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.16);
    background:
      radial-gradient(ellipse at top, rgba(30, 64, 175, 0.24), rgba(15, 23, 42, 0.65));
    padding: 0.75rem;
  }

  .empty-state {
    color: #cbd5e1;
    margin: 0;
    text-align: center;
    padding: 1rem 0.5rem;
    font-size: 0.9rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 0.65rem;
    align-items: start;
  }

  .card-button {
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    border-radius: 0.5rem;
    transition: transform 180ms ease;
  }

  .card-button:hover,
  .card-button:focus-visible {
    transform: translateY(-3px);
  }

  .card-button--selected {
    outline: 2px solid rgba(59, 130, 246, 0.9);
  }

  @media (max-width: 700px) {
    .dialog-content {
      border-radius: 0.6rem;
      padding: 0.6rem;
    }

    .card-grid {
      gap: 0.5rem;
      grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
    }
  }

  @media (max-width: 480px) {
    .card-grid {
      grid-template-columns: repeat(auto-fill, minmax(68px, 1fr));
    }
  }
</style>
