<script lang="ts">
    import * as Dialog from "$lib/design-system/primitives/dialog";
    import LorcanaCard from "@/design-system/simulator/cards/LorcanaCard.svelte";
    import type {
        ScryDestinationRuleView,
        ScryPendingEffectView
    } from "@/features/simulator/model/pending-effect-payload.js";

  export interface ScryResolutionSelection {
    zone: string;
    cards: string[];
  }

  interface DestinationPanelView {
    rule: ScryDestinationRuleView;
    title: string;
    helperText: string;
    counterText: string;
    accentClass: string;
    ordered: boolean;
    cards: NonNullable<ScryPendingEffectView["revealedCards"]>;
  }

  interface ScryResolutionDialogProps {
    open?: boolean;
    effect: ScryPendingEffectView | null;
    onConfirm: (destinations: ScryResolutionSelection[]) => void;
    onClose?: () => void;
  }

  let {
    open = $bindable(false),
    effect: pendingEffect,
    onConfirm,
    onClose,
  }: ScryResolutionDialogProps = $props();

  let assignedRuleIdByCardId = $state<Record<string, string | null>>({});
  let orderedCardIdsByRuleId = $state<Record<string, string[]>>({});
  let initializedForEffectId = $state<string | null>(null);
  let currentlyDraggedCardId = $state<string | null>(null);

  const cardsById = $derived.by(() => {
    const map = new Map<string, ScryPendingEffectView["revealedCards"][number]>();
    for (const card of pendingEffect?.revealedCards ?? []) {
      map.set(card.cardId, card);
    }
    return map;
  });

  const duplicateZoneCounts = $derived.by(() => {
    const counts = new Map<string, number>();
    for (const rule of pendingEffect?.destinationRules ?? []) {
      counts.set(rule.zone, (counts.get(rule.zone) ?? 0) + 1);
    }
    return counts;
  });

  function createEmptyAssignments(nextEffect: ScryPendingEffectView): {
    assignedRuleIdByCardId: Record<string, string | null>;
    orderedCardIdsByRuleId: Record<string, string[]>;
  } {
    return {
      assignedRuleIdByCardId: Object.fromEntries(
        nextEffect.revealedCardIds.map((cardId) => [cardId, null]),
      ) as Record<string, string | null>,
      orderedCardIdsByRuleId: Object.fromEntries(
        nextEffect.destinationRules.map((rule) => [rule.id, []]),
      ) as Record<string, string[]>,
    };
  }

  $effect(() => {
    if (!open || !pendingEffect) {
      initializedForEffectId = null;
      return;
    }

    if (initializedForEffectId === pendingEffect.effectId) {
      return;
    }

    const emptyAssignments = createEmptyAssignments(pendingEffect);
    assignedRuleIdByCardId = emptyAssignments.assignedRuleIdByCardId;
    orderedCardIdsByRuleId = emptyAssignments.orderedCardIdsByRuleId;
    initializedForEffectId = pendingEffect.effectId;
  });

  function getZoneTitle(zone: string): string {
    switch (zone) {
      case "hand":
        return "Keep in hand";
      case "deck-bottom":
        return "Put on bottom";
      case "deck-top":
        return "Put back on top";
      case "discard":
        return "Discard";
      case "inkwell":
        return "Put into inkwell";
      case "play":
        return "Play now";
      default:
        return zone.replace(/-/g, " ");
    }
  }

  function getZoneHelperText(zone: string): string {
    switch (zone) {
      case "hand":
        return "These cards go to your hand now.";
      case "deck-bottom":
        return "These cards return to the bottom in this order.";
      case "deck-top":
        return "These cards return to the top in this order.";
      case "discard":
        return "These cards move to the discard pile.";
      case "inkwell":
        return "These cards move into your inkwell.";
      case "play":
        return "These cards enter play from the reveal.";
      default:
        return "Assign cards here to resolve the effect.";
    }
  }

  function formatRuleCounter(rule: ScryDestinationRuleView, count: number): string {
    if (rule.remainder) {
      return `${count} remainder`;
    }

    if (rule.max !== null) {
      return `${count} of ${rule.max}`;
    }

    return `${count} assigned`;
  }

  function isOrderedRule(rule: ScryDestinationRuleView): boolean {
    return rule.zone === "deck-bottom" || rule.zone === "deck-top";
  }

  const destinationPanels = $derived.by<DestinationPanelView[]>(() => {
    if (!pendingEffect) {
      return [];
    }

    const zoneIndexByZone = new Map<string, number>();
    return pendingEffect.destinationRules.map((rule) => {
      const zoneOccurrence = (zoneIndexByZone.get(rule.zone) ?? 0) + 1;
      zoneIndexByZone.set(rule.zone, zoneOccurrence);
      const duplicateCount = duplicateZoneCounts.get(rule.zone) ?? 1;
      const title = duplicateCount > 1 ? `${getZoneTitle(rule.zone)} ${zoneOccurrence}` : getZoneTitle(rule.zone);
      const orderedCardIds = orderedCardIdsByRuleId[rule.id] ?? [];

      return {
        rule,
        title,
        helperText: getZoneHelperText(rule.zone),
        counterText: formatRuleCounter(rule, orderedCardIds.length),
        accentClass:
          rule.zone === "hand"
            ? "destination-panel--hand"
            : rule.zone === "deck-bottom"
              ? "destination-panel--bottom"
              : rule.zone === "deck-top"
                ? "destination-panel--top"
                : "destination-panel--neutral",
        ordered: isOrderedRule(rule),
        cards: orderedCardIds
          .map((cardId) => cardsById.get(cardId) ?? null)
          .filter((card): card is ScryPendingEffectView["revealedCards"][number] => card !== null),
      };
    });
  });

  const confirmDisabled = $derived.by(() => {
    if (!pendingEffect) {
      return true;
    }

    for (const cardId of pendingEffect.revealedCardIds) {
      if (!assignedRuleIdByCardId[cardId]) {
        return true;
      }
    }

    for (const rule of pendingEffect.destinationRules) {
      const count = orderedCardIdsByRuleId[rule.id]?.length ?? 0;
      if (count < rule.min) {
        return true;
      }
      if (rule.max !== null && count > rule.max) {
        return true;
      }
    }

    return false;
  });

  function getRuleById(ruleId: string | null | undefined): ScryDestinationRuleView | null {
    if (!ruleId || !pendingEffect) {
      return null;
    }

    return pendingEffect.destinationRules.find((rule) => rule.id === ruleId) ?? null;
  }

  function getRuleCards(ruleId: string): string[] {
    return [...(orderedCardIdsByRuleId[ruleId] ?? [])];
  }

  function removeCardFromCurrentRule(cardId: string): void {
    const currentRuleId = assignedRuleIdByCardId[cardId];
    if (!currentRuleId) {
      return;
    }

    orderedCardIdsByRuleId = {
      ...orderedCardIdsByRuleId,
      [currentRuleId]: getRuleCards(currentRuleId).filter((entry) => entry !== cardId),
    };
  }

  function assignCardToRule(cardId: string, ruleId: string, beforeCardId?: string): void {
    const rule = getRuleById(ruleId);
    if (!rule) {
      return;
    }

    const currentRuleId = assignedRuleIdByCardId[cardId];
    const nextCards = getRuleCards(ruleId).filter((entry) => entry !== cardId);
    const nextIndex =
      beforeCardId && nextCards.includes(beforeCardId) ? nextCards.indexOf(beforeCardId) : nextCards.length;
    nextCards.splice(nextIndex, 0, cardId);

    if (rule.max !== null && currentRuleId !== ruleId && nextCards.length > rule.max) {
      return;
    }

    removeCardFromCurrentRule(cardId);
    orderedCardIdsByRuleId = {
      ...orderedCardIdsByRuleId,
      [ruleId]: nextCards,
    };
    assignedRuleIdByCardId = {
      ...assignedRuleIdByCardId,
      [cardId]: ruleId,
    };
  }

  function unassignCard(cardId: string): void {
    removeCardFromCurrentRule(cardId);
    assignedRuleIdByCardId = {
      ...assignedRuleIdByCardId,
      [cardId]: null,
    };
  }

  function getSuggestedRule(cardId: string): ScryDestinationRuleView | null {
    if (!pendingEffect) {
      return null;
    }

    const currentRuleId = assignedRuleIdByCardId[cardId];
    if (currentRuleId) {
      return getRuleById(currentRuleId);
    }

    for (const rule of pendingEffect.destinationRules) {
      const currentCount = orderedCardIdsByRuleId[rule.id]?.length ?? 0;
      if (rule.max === null || currentCount < rule.max) {
        return rule;
      }
    }

    return pendingEffect.destinationRules[0] ?? null;
  }

  function moveCardWithinRule(ruleId: string, cardId: string, delta: -1 | 1): void {
    const nextCards = getRuleCards(ruleId);
    const currentIndex = nextCards.indexOf(cardId);
    if (currentIndex < 0) {
      return;
    }

    const nextIndex = currentIndex + delta;
    if (nextIndex < 0 || nextIndex >= nextCards.length) {
      return;
    }

    nextCards.splice(currentIndex, 1);
    nextCards.splice(nextIndex, 0, cardId);
    orderedCardIdsByRuleId = {
      ...orderedCardIdsByRuleId,
      [ruleId]: nextCards,
    };
  }

  function buildSummary(nextEffect: ScryPendingEffectView): string {
    const parts = nextEffect.destinationRules.map((rule) => {
      if (rule.remainder) {
        return rule.zone === "deck-bottom"
          ? "put the rest on the bottom of your deck"
          : rule.zone === "deck-top"
            ? "put the rest on top of your deck"
            : `put the rest into ${getZoneTitle(rule.zone).toLowerCase().replace(/^keep /, "")}`;
      }

      if (rule.max !== null) {
        if (rule.zone === "hand") {
          return `put ${rule.max} ${rule.max === 1 ? "card" : "cards"} into your hand`;
        }
        if (rule.zone === "deck-bottom") {
          return `put ${rule.max} ${rule.max === 1 ? "card" : "cards"} on the bottom of your deck`;
        }
        if (rule.zone === "deck-top") {
          return `put ${rule.max} ${rule.max === 1 ? "card" : "cards"} on top of your deck`;
        }
      }

      return `assign cards to ${getZoneTitle(rule.zone).toLowerCase()}`;
    });

    return `Look at the top ${nextEffect.amount} cards, then ${parts.join(", then ")}.`;
  }

  function getCardStatusLabel(cardId: string): string {
    const rule = getRuleById(assignedRuleIdByCardId[cardId]);
    return rule ? getZoneTitle(rule.zone) : "Unassigned";
  }

  function handleDialogOpenChange(nextOpen: boolean): void {
    if (nextOpen) {
      return;
    }

    open = false;
    onClose?.();
  }

  function handleConfirmClick(): void {
    if (!pendingEffect || confirmDisabled) {
      return;
    }

    onConfirm(
      pendingEffect.destinationRules.map((rule) => ({
        zone: rule.zone,
        cards: [...(orderedCardIdsByRuleId[rule.id] ?? [])],
      })),
    );
  }

  function resolveDropIntentFromPoint(clientX: number, clientY: number): {
    ruleId: string;
    beforeCardId?: string;
  } | null {
    const elements = document.elementsFromPoint(clientX, clientY);

    for (const element of elements) {
      if (!(element instanceof HTMLElement)) {
        continue;
      }

      const cardElement = element.closest<HTMLElement>("[data-scry-order-card-id]");
      const ruleElement = element.closest<HTMLElement>("[data-scry-rule-id]");

      if (cardElement?.dataset.scryOrderCardId && ruleElement?.dataset.scryRuleId) {
        const cards = getRuleCards(ruleElement.dataset.scryRuleId);
        const hoveredCardId = cardElement.dataset.scryOrderCardId;
        const hoveredIndex = cards.indexOf(hoveredCardId);
        const rect = cardElement.getBoundingClientRect();
        const insertionIndex = clientY <= rect.top + rect.height / 2 ? hoveredIndex : hoveredIndex + 1;

        return {
          ruleId: ruleElement.dataset.scryRuleId,
          beforeCardId: cards[insertionIndex],
        };
      }

      if (ruleElement?.dataset.scryRuleId) {
        return { ruleId: ruleElement.dataset.scryRuleId };
      }
    }

    return null;
  }

</script>

<Dialog.Root bind:open onOpenChange={handleDialogOpenChange}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
    />
    <Dialog.Content
      class="fixed left-1/2 top-1/2 z-50 flex h-[min(92vh,880px)] w-[min(96vw,1180px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[1.75rem] border border-slate-500/35 bg-slate-950/96 p-0 text-slate-50 shadow-[0_32px_120px_rgba(0,0,0,0.65)]"
      showCloseButton={false}
    >
      {#if pendingEffect}
        <Dialog.Title class="sr-only">Resolve scry effect</Dialog.Title>
        <Dialog.Description class="sr-only">
          Arrange revealed cards into their destinations, then confirm the resolution.
        </Dialog.Description>

        <header class="scry-header">
          <div class="scry-header__copy">
            <p class="scry-eyebrow">Pending resolution</p>
            <h2>{pendingEffect.sourceCard?.label ?? "Scry effect"}</h2>
            <p class="scry-summary">{buildSummary(pendingEffect)}</p>
          </div>
          <div class="scry-header__actions">
            <button type="button" class="header-button" onclick={() => handleDialogOpenChange(false)}>
              Close
            </button>
            <button
              type="button"
              class="header-button header-button--primary"
              onclick={handleConfirmClick}
              disabled={confirmDisabled}
            >
              Confirm arrangement
            </button>
          </div>
        </header>

        <section class="revealed-section">
          <div class="section-heading">
            <div>
              <p class="section-kicker">Revealed cards</p>
              <h3>Choose where each card goes</h3>
            </div>
            <p class="section-caption">
              Click a card to send it to the next legal destination, or drag it into a panel.
            </p>
          </div>

          <div class="revealed-rail" aria-live="polite">
            {#each pendingEffect.revealedCards as card (card.cardId)}
              {@const suggestedRule = getSuggestedRule(card.cardId)}
              {@const assignedRuleId = assignedRuleIdByCardId[card.cardId]}
              <article class="revealed-card" class:revealed-card--assigned={assignedRuleId !== null}>
                <div class="revealed-card__frame">
                  {#if assignedRuleId === null}
                    <div
                      class="scry-draggable-card"
                      data-scry-card-id={card.cardId}
                      aria-label={`Drag ${card.label}`}
                    >
                      <LorcanaCard card={card} size="small-plus" showHoverCard={false} />
                    </div>
                  {:else}
                    <LorcanaCard card={card} size="small-plus" showHoverCard={false} />
                  {/if}
                </div>

                <div class="revealed-card__body">
                  <div class="revealed-card__meta">
                    <h4>{card.label}</h4>
                    <span class="status-pill" class:status-pill--assigned={assignedRuleId !== null}>
                      {getCardStatusLabel(card.cardId)}
                    </span>
                  </div>

                  <div class="revealed-card__actions">
                    {#if assignedRuleId === null && suggestedRule}
                      <button
                        type="button"
                        class="mini-button mini-button--primary"
                        onclick={() => assignCardToRule(card.cardId, suggestedRule.id)}
                      >
                        {getZoneTitle(suggestedRule.zone)}
                      </button>
                    {/if}
                    {#if assignedRuleId !== null}
                      <button
                        type="button"
                        class="mini-button"
                        onclick={() => unassignCard(card.cardId)}
                      >
                        Return
                      </button>
                    {/if}
                  </div>
                </div>
              </article>
            {/each}
          </div>
        </section>

        <section class="destinations-section">
          {#each destinationPanels as panel (panel.rule.id)}
            <section
              class={`destination-panel ${panel.accentClass}`}
              data-scry-rule-id={panel.rule.id}
            >
              <header class="destination-panel__header">
                <div>
                  <p class="section-kicker">{panel.counterText}</p>
                  <h3>{panel.title}</h3>
                  <p class="destination-panel__helper">{panel.helperText}</p>
                </div>
              </header>

              <div class="destination-panel__body">
                {#if panel.cards.length === 0}
                  <p class="destination-empty">
                    {currentlyDraggedCardId ? "Drop a card here" : "No cards assigned yet."}
                  </p>
                {:else}
                  <div class="destination-card-list">
                    {#each panel.cards as card, index (card.cardId)}
                      <article
                        class="destination-card"
                        data-scry-order-card-id={card.cardId}
                      >
                        <div
                          class="scry-draggable-card destination-card__visual"
                          data-scry-card-id={card.cardId}
                          aria-label={`Drag ${card.label}`}
                        >
                          <LorcanaCard card={card} size="small" showHoverCard={false} />
                        </div>

                        <div class="destination-card__content">
                          <div class="destination-card__title-row">
                            <div>
                              <p class="destination-card__index">
                                {#if panel.ordered}
                                  {panel.rule.zone === "deck-bottom"
                                    ? `Bottom ${index + 1}`
                                    : `Top ${index + 1}`}
                                {:else}
                                  Selected
                                {/if}
                              </p>
                              <h4>{card.label}</h4>
                            </div>
                            <button
                              type="button"
                              class="mini-button"
                              onclick={() => unassignCard(card.cardId)}
                            >
                              Return
                            </button>
                          </div>

                          {#if panel.ordered}
                            <div class="destination-card__reorder">
                              <button
                                type="button"
                                class="mini-button"
                                onclick={() => moveCardWithinRule(panel.rule.id, card.cardId, -1)}
                                disabled={index === 0}
                              >
                                Move up
                              </button>
                              <button
                                type="button"
                                class="mini-button"
                                onclick={() => moveCardWithinRule(panel.rule.id, card.cardId, 1)}
                                disabled={index === panel.cards.length - 1}
                              >
                                Move down
                              </button>
                            </div>
                          {/if}
                        </div>
                      </article>
                    {/each}
                  </div>
                {/if}
              </div>
            </section>
          {/each}
        </section>
      {/if}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .scry-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    padding: 1.4rem 1.5rem 1.2rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.16);
    background:
      radial-gradient(circle at top left, rgba(245, 189, 95, 0.14), transparent 38%),
      radial-gradient(circle at top right, rgba(56, 189, 248, 0.12), transparent 42%),
      linear-gradient(180deg, rgba(15, 23, 42, 0.96), rgba(2, 6, 23, 0.98));
  }

  .scry-header__copy h2,
  .section-heading h3,
  .destination-panel__header h3,
  .revealed-card__meta h4,
  .destination-card__title-row h4 {
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
  }

  .scry-eyebrow,
  .section-kicker,
  .destination-card__index {
    margin: 0 0 0.25rem;
    color: rgba(226, 232, 240, 0.68);
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .scry-summary,
  .section-caption,
  .destination-panel__helper {
    margin: 0.35rem 0 0;
    color: rgba(203, 213, 225, 0.85);
    line-height: 1.5;
    font-size: 0.92rem;
  }

  .scry-header__actions {
    display: flex;
    gap: 0.75rem;
    align-items: start;
  }

  .header-button,
  .mini-button {
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: rgba(15, 23, 42, 0.6);
    color: #f8fafc;
    padding: 0.55rem 0.95rem;
    font-size: 0.78rem;
    font-weight: 600;
    transition:
      transform 140ms ease,
      background 140ms ease,
      border-color 140ms ease,
      opacity 140ms ease;
  }

  .header-button:hover,
  .mini-button:hover {
    transform: translateY(-1px);
  }

  .header-button:disabled,
  .mini-button:disabled {
    opacity: 0.45;
    transform: none;
  }

  .header-button--primary,
  .mini-button--primary {
    border-color: rgba(244, 196, 96, 0.5);
    background: linear-gradient(180deg, rgba(145, 97, 24, 0.92), rgba(107, 62, 11, 0.92));
    color: #fff4d8;
  }

  .revealed-section {
    padding: 1.25rem 1.5rem 0.75rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  }

  .section-heading {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: end;
  }

  .revealed-rail {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.9rem;
    margin-top: 1rem;
  }

  .revealed-card,
  .destination-panel {
    border-radius: 1.35rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    overflow: hidden;
  }

  .revealed-card {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: 0.9rem;
    padding: 0.9rem;
    background:
      linear-gradient(180deg, rgba(15, 23, 42, 0.88), rgba(2, 6, 23, 0.84)),
      radial-gradient(circle at top right, rgba(125, 211, 252, 0.12), transparent 36%);
  }

  .revealed-card--assigned {
    border-color: rgba(244, 196, 96, 0.28);
  }

  .revealed-card__frame {
    display: flex;
    align-items: start;
    justify-content: center;
  }

  .revealed-card__body,
  .destination-card__content {
    display: grid;
    gap: 0.65rem;
    align-content: start;
    min-width: 0;
  }

  .revealed-card__meta {
    display: grid;
    gap: 0.45rem;
  }

  .revealed-card__actions,
  .destination-card__reorder {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .status-pill {
    display: inline-flex;
    width: fit-content;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.24);
    background: rgba(15, 23, 42, 0.46);
    color: rgba(226, 232, 240, 0.86);
    padding: 0.22rem 0.58rem;
    font-size: 0.72rem;
    letter-spacing: 0.04em;
  }

  .status-pill--assigned {
    border-color: rgba(244, 196, 96, 0.36);
    color: #fde7b0;
  }

  .destinations-section {
    flex: 1;
    min-height: 0;
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    padding: 1rem 1.5rem 1.5rem;
  }

  .destination-panel {
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    min-height: 18rem;
    background:
      linear-gradient(180deg, rgba(15, 23, 42, 0.84), rgba(2, 6, 23, 0.9)),
      radial-gradient(circle at top, rgba(96, 165, 250, 0.12), transparent 42%);
  }

  .destination-panel--hand {
    border-color: rgba(244, 196, 96, 0.32);
    background:
      radial-gradient(circle at top left, rgba(245, 196, 104, 0.18), transparent 34%),
      linear-gradient(180deg, rgba(42, 27, 7, 0.78), rgba(12, 9, 6, 0.92));
  }

  .destination-panel--bottom {
    border-color: rgba(96, 165, 250, 0.32);
    background:
      radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 36%),
      linear-gradient(180deg, rgba(10, 24, 42, 0.82), rgba(3, 9, 20, 0.94));
  }

  .destination-panel--top {
    border-color: rgba(94, 234, 212, 0.24);
    background:
      radial-gradient(circle at top left, rgba(45, 212, 191, 0.14), transparent 34%),
      linear-gradient(180deg, rgba(8, 33, 39, 0.82), rgba(4, 13, 18, 0.94));
  }

  .destination-panel__header {
    padding: 1rem 1rem 0.75rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  }

  .destination-panel__body {
    padding: 0.9rem 1rem 1rem;
    min-height: 0;
  }

  .destination-card-list {
    display: grid;
    gap: 0.7rem;
  }

  .destination-card {
    display: grid;
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 0.8rem;
    align-items: start;
    padding: 0.75rem;
    border-radius: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.16);
    background: rgba(15, 23, 42, 0.52);
  }

  .destination-card__visual {
    width: fit-content;
  }

  .destination-card__title-row {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
    align-items: start;
  }

  .destination-empty {
    margin: 0;
    min-height: 100%;
    display: grid;
    place-items: center;
    text-align: center;
    color: rgba(203, 213, 225, 0.72);
    border: 1px dashed rgba(148, 163, 184, 0.2);
    border-radius: 1rem;
    padding: 2rem 1rem;
  }

  .scry-draggable-card {
    width: fit-content;
    cursor: grab;
  }

  .scry-draggable-card--dragging {
    cursor: grabbing;
    z-index: 3;
    filter: drop-shadow(0 20px 24px rgba(15, 23, 42, 0.45));
  }

  @media (max-width: 820px) {
    .scry-header,
    .section-heading {
      grid-template-columns: 1fr;
    }

    .scry-header__actions {
      flex-wrap: wrap;
    }

    .revealed-card,
    .destination-card {
      grid-template-columns: 1fr;
    }

    .revealed-card__frame,
    .destination-card__visual {
      justify-content: start;
    }
  }
</style>
