<script lang="ts">
import {
	ChevronDown,
	ChevronUp,
	Crosshair,
	Expand,
	Shrink,
} from "@lucide/svelte";

import CardImage from "@/design-system/simulator/cards/CardImage.svelte";
import NamedCardSearchInput from "@/features/simulator/panels/NamedCardSearchInput.svelte";
import { maybeUseSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import {
	DEFAULT_PENDING_EFFECTS_VIEW_MODE,
	persistPendingEffectsViewModePreference,
	readPendingEffectsViewModePreference,
	type PendingEffectsViewMode,
} from "@/features/simulator/panels/pending-effects-view-preference.js";
import type {
	GuidanceAction,
	NamedCardSearchState,
} from "@/features/simulator/model/active-player-guidance.js";

export interface PendingEffectsPopoverItem {
	id: string;
	kind: "bag" | "pending";
	title: string;
	subtitle: string;
	detail: string;
	badge: string;
	card: LorcanaCardSnapshot | null;
	isActive?: boolean;
	canResolve?: boolean;
	canAccept?: boolean;
	canReject?: boolean;
	disabledReason?: string;
	primaryActionLabel?: string;
	onResolve?: () => void;
	onPrimaryAction?: () => void;
	onAccept?: () => void;
	onReject?: () => void;
	statusMessage?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	inlineActions?: GuidanceAction[];
	namedCardSearch?: NamedCardSearchState;
}

interface PendingEffectsPopoverProps {
	items: PendingEffectsPopoverItem[];
	open?: boolean;
	canOpenTargetModal?: boolean;
	onOpenTargetModal?: () => void;
	initialDockPosition?: PendingEffectsDockPosition;
}

type ViewMode = PendingEffectsViewMode;
type PendingEffectsDockPosition = "middle" | "top" | "bottom";

let {
	items,
	open = $bindable(false),
	canOpenTargetModal = false,
	onOpenTargetModal,
	initialDockPosition = "middle",
}: PendingEffectsPopoverProps = $props();
const simulatorCardContext = maybeUseSimulatorCardContext();

let viewMode = $state<ViewMode>(DEFAULT_PENDING_EFFECTS_VIEW_MODE);
let dockPosition = $state<PendingEffectsDockPosition>("middle");
let hasHydratedDockPosition = $state(false);

$effect(() => {
	if (!hasHydratedDockPosition) {
		dockPosition = initialDockPosition;
		hasHydratedDockPosition = true;
	}
});
let hasHydratedViewModePreference = $state(false);
let previousItemCount = $state(0);
let previousActionableSignature = $state("");

const itemCount = $derived(items.length);
const bagCount = $derived(items.filter((item) => item.kind === "bag").length);
const pendingCount = $derived(
	items.filter((item) => item.kind === "pending").length,
);
const activeItem = $derived(
	items.find((item) => item.isActive) ?? items[0] ?? null,
);
const actionableSignature = $derived(
	items
		.filter((item) => isActionable(item))
		.map((item) => `${item.id}:${getActionSignature(item)}`)
		.join("|"),
);

$effect(() => {
	if (itemCount === 0) {
		open = false;
		previousItemCount = 0;
		previousActionableSignature = "";
		return;
	}

	if (
		previousItemCount === 0 ||
		(actionableSignature.length > 0 &&
			actionableSignature !== previousActionableSignature)
	) {
		open = true;
	}

	previousItemCount = itemCount;
	previousActionableSignature = actionableSignature;
});

$effect(() => {
	if (hasHydratedViewModePreference || typeof localStorage === "undefined") {
		return;
	}

	viewMode = readPendingEffectsViewModePreference(localStorage);
	hasHydratedViewModePreference = true;
});

$effect(() => {
	if (!hasHydratedViewModePreference || typeof localStorage === "undefined") {
		return;
	}

	persistPendingEffectsViewModePreference(localStorage, viewMode);
});

function isActionable(item: PendingEffectsPopoverItem): boolean {
	return Boolean(
		item.statusMessage ||
			item.onPrimaryAction ||
			(item.canResolve && item.onResolve) ||
			(item.canAccept && item.onAccept) ||
			(item.canReject && item.onReject),
	);
}

function getActionSignature(item: PendingEffectsPopoverItem): string {
	return [
		item.statusMessage ? `status:${item.statusMessage}` : null,
		item.onPrimaryAction ? "primary" : null,
		item.canResolve && item.onResolve ? "resolve" : null,
		item.canAccept && item.onAccept ? "accept" : null,
		item.canReject && item.onReject ? "reject" : null,
	]
		.filter((value): value is string => Boolean(value))
		.join(":");
}

function getActionButtonCount(item: PendingEffectsPopoverItem): number {
	if (item.statusMessage) {
		return (
			(item.inlineActions?.length ?? 0) +
			Number(Boolean(item.onConfirm)) +
			Number(Boolean(item.onCancel))
		);
	}

	return (
		Number(Boolean(item.onPrimaryAction)) +
		Number(Boolean(item.canResolve && item.onResolve)) +
		Number(Boolean(item.canAccept && item.onAccept)) +
		Number(Boolean(item.canReject && item.onReject))
	);
}

function shouldShowCompactStatusMessage(
	item: PendingEffectsPopoverItem,
): boolean {
	return Boolean(item.statusMessage) && getActionButtonCount(item) === 0;
}

function shouldShowCompactDisabledReason(
	item: PendingEffectsPopoverItem,
): boolean {
	return Boolean(item.disabledReason) && getActionButtonCount(item) === 0;
}

function showCompactMeta(): boolean {
	return viewMode === "normal";
}

function handleReminderClick(): void {
	open = !open;
}

function minimizePanel(): void {
	open = false;
}

function toggleViewMode(): void {
	viewMode = viewMode === "normal" ? "compact" : "normal";
}

function toggleDockEdge(): void {
	dockPosition = dockPosition === "top" ? "bottom" : "top";
}

function centerPanel(): void {
	dockPosition = "middle";
}

function movePanelTo(
	position: Exclude<PendingEffectsDockPosition, "middle">,
): void {
	dockPosition = position;
}

function getDockToggleLabel(): string {
	return dockPosition === "top" ? "Bottom" : "Top";
}

function getDockToggleTitle(): string {
	return dockPosition === "top" ? "Move to bottom" : "Move to top";
}

function handleSecondaryDockAction(): void {
	if (dockPosition === "middle") {
		movePanelTo("bottom");
		return;
	}

	centerPanel();
}

function getSecondaryDockLabel(): string {
	return dockPosition === "middle" ? "Bottom" : "Center";
}

function getSecondaryDockTitle(): string {
	return dockPosition === "middle" ? "Move to bottom" : "Center panel";
}

function handleResolve(item: PendingEffectsPopoverItem): void {
	item.onResolve?.();
}

function handlePrimaryAction(item: PendingEffectsPopoverItem): void {
	item.onPrimaryAction?.();
}

function handleAccept(item: PendingEffectsPopoverItem): void {
	item.onAccept?.();
}

function handleReject(item: PendingEffectsPopoverItem): void {
	item.onReject?.();
}

function handleCardPreviewEnter(card: LorcanaCardSnapshot | null): void {
	if (!card?.isMasked) {
		simulatorCardContext?.setExternalPreviewCard(card);
	}
}

function handleCardPreviewLeave(card: LorcanaCardSnapshot | null): void {
	if (
		!card?.isMasked &&
		simulatorCardContext?.previewCard?.cardId === card?.cardId
	) {
		simulatorCardContext?.setExternalPreviewCard(null);
	}
}

function handleOpenGlobalPreview(card: LorcanaCardSnapshot | null): void {
	if (!card?.isMasked) {
		simulatorCardContext?.openGlobalPreview(card);
	}
}
</script>

{#if itemCount > 0}
  <button
    type="button"
    class="pending-effects-reminder"
    data-queue-anchor="reminder"
    data-state={open ? "open" : "closed"}
    onclick={handleReminderClick}
    aria-expanded={open}
    aria-controls="pending-effects-panel"
  >
    <span class="trigger-label">Stack</span>
    <span class="trigger-count">{itemCount}</span>
    <span class="trigger-toggle-indicator" aria-hidden="true">
      {#if open}
        <ChevronUp size={15} strokeWidth={2.4} />
      {:else}
        <ChevronDown size={15} strokeWidth={2.4} />
      {/if}
    </span>
    <span class="trigger-breakdown">{bagCount} bag · {pendingCount} pending</span>
    {#if activeItem}
      <span class="trigger-current">{activeItem.statusMessage ?? activeItem.title}</span>
    {/if}
  </button>

  {#if open}
    <div
      class="pending-effects-panel-anchor"
      data-queue-anchor="panel"
      data-dock-position={dockPosition}
    >
      <section
        id="pending-effects-panel"
        class="pending-effects-panel"
        class:pending-effects-panel--compact={viewMode === "compact"}
        data-view-mode={viewMode}
        data-dock-position={dockPosition}
        aria-label="Pending effects and bag"
      >
        <div
          class="panel-header"
          role="group"
          aria-label="Pending effects header"
        >
          <div class="panel-controls">
            <button
              type="button"
              class="header-chip-button"
              onclick={() =>
                dockPosition === "middle" ? movePanelTo("top") : toggleDockEdge()}
              aria-label={getDockToggleTitle()}
              title={getDockToggleTitle()}
              data-dock-toggle={dockPosition}
            >
              {getDockToggleLabel()}
            </button>
            <button
              type="button"
              class="header-chip-button"
              onclick={handleSecondaryDockAction}
              aria-label={getSecondaryDockTitle()}
              title={getSecondaryDockTitle()}
            >
              {getSecondaryDockLabel()}
            </button>
            {#if canOpenTargetModal && onOpenTargetModal}
              <button
                type="button"
                class="header-icon-button"
                onclick={() => onOpenTargetModal?.()}
                aria-label="Open target selector"
                title="Open target selector"
              >
                <Crosshair size={14} strokeWidth={2.1} />
              </button>
            {/if}
            <button
              type="button"
              class="header-icon-button"
              onclick={toggleViewMode}
              aria-label={viewMode === "normal" ? "Switch to compact view" : "Switch to full view"}
              title={viewMode === "normal" ? "Compact view" : "Full view"}
            >
            {#if viewMode === "normal"}
              <Shrink size={14} strokeWidth={2.1} />
              {:else}
                <Expand size={14} strokeWidth={2.1} />
              {/if}
            </button>
            <button
              type="button"
              class="header-icon-button"
              onclick={minimizePanel}
              aria-label="Minimize pending effects"
              title="Minimize"
            >
              <ChevronDown size={14} strokeWidth={2.1} />
            </button>
          </div>
        </div>

        <div class="item-list">
          {#each items as item (item.id)}
            <article
              class="effect-card"
              class:effect-card--active={item.isActive === true}
              onmouseenter={() => handleCardPreviewEnter(item.card)}
              onmouseleave={() => handleCardPreviewLeave(item.card)}
              onfocusin={() => handleCardPreviewEnter(item.card)}
              onfocusout={() => handleCardPreviewLeave(item.card)}
            >
              <div class="effect-card__media">
                {#if item.card?.set && item.card.cardNumber}
                  <button
                    type="button"
                    class="card-frame card-frame-button"
                    onclick={() => handleOpenGlobalPreview(item.card)}
                    aria-label={`Open full card preview for ${item.title}`}
                    title="Open full card preview"
                  >
                    <CardImage
                      set={item.card.set}
                      number={item.card.cardNumber}
                      crop="art_only"
                      alt={item.title}
                    />
                    <span class="card-preview-handle" aria-hidden="true">
                      <Expand size={12} strokeWidth={2.1} />
                    </span>
                  </button>
                {:else}
                  <div class="card-frame card-frame--placeholder">
                    <span>{item.kind === "bag" ? "Bag" : "Action"}</span>
                  </div>
                {/if}
              </div>

              <div class="effect-card__body">
                {#if showCompactMeta()}
                  <div class="effect-card__header">
                    <span class="effect-badge">{item.badge}</span>
                    {#if item.isActive}
                      <span class="effect-state">Active</span>
                    {/if}
                  </div>
                {/if}

                <h3>{item.title}</h3>
                {#if showCompactMeta()}
                  <p class="effect-subtitle">{item.subtitle}</p>
                  <p class="effect-detail">{item.detail}</p>

                  {#if item.card?.text}
                    <p class="effect-rules">{item.card.text}</p>
                  {/if}

                  {#if item.disabledReason}
                    <p class="effect-disabled-reason">{item.disabledReason}</p>
                  {/if}
                {:else}
                  {#if shouldShowCompactStatusMessage(item)}
                    <p class="effect-status-message effect-status-message--compact">{item.statusMessage}</p>
                  {/if}
                  {#if shouldShowCompactDisabledReason(item)}
                    <p class="effect-disabled-reason effect-disabled-reason--compact">{item.disabledReason}</p>
                  {/if}
                {/if}

                {#if item.namedCardSearch}
                  <div class="effect-named-card-search">
                    <NamedCardSearchInput
                      query={item.namedCardSearch.query}
                      results={item.namedCardSearch.results}
                      oninput={item.namedCardSearch.oninput}
                      onselect={item.namedCardSearch.onselect}
                      compact />
                  </div>
                {/if}
              </div>

              <div
                class="effect-actions"
                data-action-count={getActionButtonCount(item)}
              >
                {#if item.statusMessage}
                  {#if item.inlineActions && item.inlineActions.length > 0}
                    {#each item.inlineActions as action (action.id)}
                      <button
                        type="button"
                        class={`action-button ${action.emphasis ? "action-button--primary" : "action-button--secondary"}`}
                        onclick={action.onClick}
                        disabled={action.disabled}
                      >
                        {action.label}
                      </button>
                    {/each}
                  {/if}
                  {#if !item.onConfirm && (viewMode === "normal" || shouldShowCompactStatusMessage(item))}
                    <span class="effect-status-message">{item.statusMessage}</span>
                  {/if}
                  {#if item.onConfirm}
                    <button
                      type="button"
                      class="action-button action-button--primary"
                      onclick={() => item.onConfirm?.()}
                    >
                      Confirm
                    </button>
                  {/if}
                  {#if item.onCancel}
                    <button
                      type="button"
                      class="action-button action-button--secondary"
                      onclick={() => item.onCancel?.()}
                    >
                      Cancel
                    </button>
                  {/if}
                {:else}
                  {#if item.onPrimaryAction}
                    <button
                      type="button"
                      class="action-button action-button--primary"
                      onclick={() => handlePrimaryAction(item)}
                    >
                      {item.primaryActionLabel ?? "Open"}
                    </button>
                  {/if}
                  {#if item.canResolve && item.onResolve}
                    <button
                      type="button"
                      class="action-button action-button--primary"
                      onclick={() => handleResolve(item)}
                    >
                      Resolve
                    </button>
                  {/if}
                  {#if item.canAccept && item.onAccept}
                    <button
                      type="button"
                      class="action-button action-button--primary"
                      onclick={() => handleAccept(item)}
                    >
                      Accept
                    </button>
                  {/if}
                  {#if item.canReject && item.onReject}
                    <button
                      type="button"
                      class="action-button action-button--secondary"
                      onclick={() => handleReject(item)}
                    >
                      Reject
                    </button>
                  {/if}
                {/if}
              </div>
            </article>
          {/each}
        </div>
      </section>
    </div>
  {/if}
{/if}

<style>
  .pending-effects-reminder {
    position: absolute;
    top: calc(1rem + env(safe-area-inset-top));
    right: 1rem;
    z-index: 210;
    min-width: 11.5rem;
    display: grid;
    grid-template-columns: auto auto;
    gap: 0.15rem 0.7rem;
    align-items: center;
    padding: 0.78rem 0.92rem;
    border-radius: 1rem;
    border: 1px solid rgba(248, 196, 113, 0.42);
    background:
      linear-gradient(135deg, rgba(72, 42, 12, 0.96), rgba(22, 17, 10, 0.94)),
      radial-gradient(circle at top left, rgba(245, 184, 73, 0.28), transparent 55%);
    box-shadow:
      0 16px 36px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 rgba(255, 237, 195, 0.18);
    color: #fff3d6;
    text-align: left;
  }

  .trigger-label {
    font-size: 0.74rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 227, 176, 0.84);
  }

  .trigger-count {
    justify-self: end;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1;
  }

  .trigger-toggle-indicator {
    justify-self: end;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 239, 208, 0.92);
  }

  .trigger-breakdown {
    grid-column: 1 / -1;
    font-size: 0.78rem;
    color: rgba(255, 236, 203, 0.76);
  }

  .trigger-current {
    grid-column: 1 / -1;
    color: rgba(255, 244, 220, 0.92);
    font-size: 0.74rem;
    font-weight: 600;
    line-height: 1.25;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pending-effects-panel-anchor {
    position: absolute;
    right: 1rem;
    z-index: 209;
    pointer-events: none;
  }

  .pending-effects-panel-anchor[data-dock-position="middle"] {
    top: 50%;
  }

  .pending-effects-panel-anchor[data-dock-position="top"] {
    top: calc(6.4rem + env(safe-area-inset-top));
  }

  .pending-effects-panel-anchor[data-dock-position="bottom"] {
    bottom: calc(1rem + env(safe-area-inset-bottom));
  }

  .pending-effects-panel {
    pointer-events: auto;
    width: min(28rem, calc(100vw - 2.25rem));
    max-height: min(72vh, 42rem);
    overflow: auto;
    padding: 1rem;
    border-radius: 1.1rem;
    border: 1px solid rgba(138, 175, 214, 0.26);
    background:
      linear-gradient(180deg, rgba(8, 17, 28, 0.98), rgba(5, 11, 20, 0.97)),
      radial-gradient(circle at top, rgba(98, 184, 255, 0.14), transparent 46%);
    box-shadow:
      0 28px 65px rgba(0, 0, 0, 0.48),
      inset 0 1px 0 rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(14px);
  }

  .pending-effects-panel[data-dock-position="middle"] {
    transform: translateY(-50%);
  }

  .pending-effects-panel--compact {
    width: min(19rem, calc(100vw - 1.5rem));
    padding: 0.72rem;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    gap: 0.65rem;
    align-items: center;
    margin-bottom: 0.7rem;
  }

  .panel-title-block {
    display: flex;
    gap: 0.45rem;
    align-items: center;
    min-width: 0;
  }

  .panel-count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.45rem;
    height: 1.45rem;
    padding: 0 0.38rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 187, 242, 0.28);
    background: rgba(17, 34, 54, 0.78);
    color: #dce9f8;
    font-size: 0.72rem;
    font-weight: 700;
    line-height: 1;
  }

  .panel-controls {
    display: flex;
    gap: 0.35rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .header-chip-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 163, 205, 0.24);
    background: rgba(16, 29, 47, 0.76);
    color: #dce9f8;
    padding: 0.34rem 0.72rem;
    font-size: 0.68rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition:
      border-color 150ms ease,
      background 150ms ease,
      transform 150ms ease,
      opacity 150ms ease;
  }

  .header-icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid rgba(125, 163, 205, 0.24);
    background: rgba(16, 29, 47, 0.76);
    color: #dce9f8;
    border-radius: 999px;
    padding: 0;
    transition:
      border-color 150ms ease,
      background 150ms ease,
      transform 150ms ease;
  }

  .header-chip-button:hover,
  .header-chip-button:focus-visible,
  .header-icon-button:hover,
  .header-icon-button:focus-visible {
    border-color: rgba(153, 191, 232, 0.44);
    background: rgba(22, 39, 62, 0.92);
    transform: translateY(-1px);
    outline: none;
  }

  .header-chip-button:disabled {
    opacity: 0.5;
    transform: none;
  }

  .item-list {
    display: grid;
    gap: 0.8rem;
  }

  .effect-card {
    display: grid;
    grid-template-columns: 4.5rem minmax(0, 1fr) auto;
    align-items: start;
    gap: 0.9rem;
    padding: 0.85rem;
    border-radius: 1rem;
    border: 1px solid rgba(122, 159, 202, 0.18);
    background:
      linear-gradient(180deg, rgba(11, 24, 39, 0.86), rgba(8, 17, 28, 0.86)),
      radial-gradient(circle at top right, rgba(94, 234, 212, 0.08), transparent 38%);
  }

  .effect-card--active {
    border-color: rgba(244, 194, 96, 0.46);
    box-shadow:
      0 0 0 1px rgba(244, 194, 96, 0.12),
      inset 0 1px 0 rgba(255, 229, 181, 0.08);
  }

  .effect-card__media {
    inline-size: 4.5rem;
    block-size: 3.6907rem;
  }

  .card-frame {
    width: 100%;
    height: 100%;
    border-radius: 0.85rem;
    overflow: hidden;
    background: rgba(20, 35, 55, 0.85);
    border: 1px solid rgba(132, 170, 214, 0.18);
  }

  .card-frame-button {
    position: relative;
    display: block;
    padding: 0;
    cursor: pointer;
    transition:
      border-color 140ms ease,
      transform 140ms ease,
      box-shadow 140ms ease;
  }

  .card-frame-button:hover,
  .card-frame-button:focus-visible {
    border-color: rgba(190, 218, 247, 0.44);
    transform: translateY(-1px);
    box-shadow:
      0 0 0 1px rgba(190, 218, 247, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    outline: none;
  }

  .card-frame--placeholder {
    display: grid;
    place-items: center;
    color: rgba(214, 230, 250, 0.72);
    font-size: 0.82rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .card-frame :global(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card-preview-handle {
    position: absolute;
    right: 0.28rem;
    bottom: 0.28rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 999px;
    border: 1px solid rgba(188, 216, 245, 0.38);
    background: rgba(9, 19, 31, 0.82);
    color: #eef6ff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.28);
  }

  .effect-card__body {
    min-width: 0;
  }

  .effect-card__header {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
    align-items: center;
    margin-bottom: 0.35rem;
  }

  .effect-badge,
  .effect-state {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.2rem 0.55rem;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .effect-badge {
    background: rgba(56, 84, 116, 0.52);
    color: rgba(219, 234, 254, 0.9);
  }

  .effect-state {
    background: rgba(102, 72, 18, 0.56);
    color: #ffd88d;
  }

  .effect-card h3 {
    margin: 0;
    font-size: 0.98rem;
    line-height: 1.2;
    color: #f8fbff;
  }

  .effect-subtitle,
  .effect-detail,
  .effect-rules,
  .effect-disabled-reason {
    margin: 0;
  }

  .effect-subtitle {
    margin-top: 0.32rem;
    color: rgba(215, 231, 248, 0.82);
    font-size: 0.74rem;
    font-weight: 600;
  }

  .effect-detail {
    margin-top: 0.25rem;
    color: rgba(180, 206, 234, 0.78);
    font-size: 0.76rem;
    line-height: 1.35;
  }

  .effect-rules {
    margin-top: 0.55rem;
    font-size: 0.78rem;
    line-height: 1.5;
    color: rgba(180, 206, 234, 0.8);
    white-space: pre-wrap;
  }

  .effect-disabled-reason {
    margin-top: 0.48rem;
    color: rgba(246, 182, 182, 0.82);
    font-size: 0.72rem;
    line-height: 1.35;
  }

  .effect-named-card-search {
    margin-top: 0.45rem;
  }

  .effect-actions {
    display: grid;
    gap: 0.55rem;
    min-width: 6.7rem;
  }

  .effect-status-message {
    font-size: 0.76rem;
    color: rgba(248, 196, 113, 0.92);
    font-weight: 600;
    text-align: center;
    line-height: 1.3;
  }

  .effect-status-message--compact {
    margin-top: 0.35rem;
    text-align: left;
    font-size: 0.71rem;
    line-height: 1.25;
  }

  .effect-disabled-reason--compact {
    margin-top: 0.3rem;
    font-size: 0.68rem;
    line-height: 1.25;
  }

  .action-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 2.35rem;
    border-radius: 999px;
    padding: 0.52rem 0.88rem;
    font-size: 0.8rem;
    font-weight: 600;
    transition:
      transform 140ms ease,
      border-color 140ms ease,
      background 140ms ease;
  }

  .action-button:hover,
  .action-button:focus-visible {
    transform: translateY(-1px);
    outline: none;
  }

  .action-button--primary {
    border: 1px solid rgba(247, 197, 110, 0.46);
    background:
      linear-gradient(180deg, rgba(129, 78, 18, 0.96), rgba(92, 55, 12, 0.94)),
      radial-gradient(circle at top, rgba(245, 184, 73, 0.22), transparent 54%);
    color: #fff4dd;
  }

  .action-button--primary:hover,
  .action-button--primary:focus-visible {
    border-color: rgba(247, 197, 110, 0.74);
  }

  .action-button--secondary {
    border: 1px solid rgba(125, 163, 205, 0.26);
    background: rgba(16, 29, 47, 0.84);
    color: #dce9f8;
  }

  .action-button--secondary:hover,
  .action-button--secondary:focus-visible {
    border-color: rgba(153, 191, 232, 0.44);
    background: rgba(22, 39, 62, 0.92);
  }

  .pending-effects-panel--compact .item-list {
    gap: 0.45rem;
  }

  .pending-effects-panel--compact .effect-card {
    grid-template-columns: 3.05rem minmax(0, 1fr);
    gap: 0.55rem;
    padding: 0.56rem;
    border-radius: 0.82rem;
  }

  .pending-effects-panel--compact .effect-card__media {
    inline-size: 3.05rem;
    block-size: 2.5rem;
  }

  .pending-effects-panel--compact .card-frame {
    border-radius: 0.68rem;
  }

  .pending-effects-panel--compact .card-preview-handle {
    right: 0.22rem;
    bottom: 0.22rem;
    width: 1.05rem;
    height: 1.05rem;
  }

  .pending-effects-panel--compact .effect-actions {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    min-width: 0;
    gap: 0.45rem;
    margin-top: 0.18rem;
  }

  .pending-effects-panel--compact .effect-actions[data-action-count="1"] {
    grid-template-columns: minmax(0, 1fr);
  }

  .pending-effects-panel--compact .effect-card h3 {
    font-size: 0.88rem;
    line-height: 1.15;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .pending-effects-panel--compact .effect-card__body {
    align-self: center;
  }

  .pending-effects-panel--compact .action-button {
    min-height: 2.2rem;
    padding: 0.46rem 0.7rem;
    font-size: 0.76rem;
  }

  @media (max-width: 767px) {
    .pending-effects-reminder {
      min-width: 10.5rem;
      padding: 0.72rem 0.82rem;
    }

    .pending-effects-panel-anchor[data-dock-position="top"] {
      top: calc(5.9rem + env(safe-area-inset-top));
    }

    .pending-effects-panel-anchor[data-dock-position="bottom"] {
      bottom: calc(6.25rem + env(safe-area-inset-bottom));
    }

    .pending-effects-panel {
      width: min(23rem, calc(100vw - 1rem));
      max-height: min(68vh, 32rem);
      padding: 0.86rem;
    }

    .pending-effects-panel--compact {
      width: min(17.5rem, calc(100vw - 0.75rem));
      padding: 0.62rem;
    }

    .effect-card {
      grid-template-columns: 3.65rem minmax(0, 1fr);
      gap: 0.72rem;
    }

    .panel-header {
      margin-bottom: 0.58rem;
    }

    .header-chip-button,
    .header-icon-button {
      width: 1.85rem;
      height: 1.85rem;
    }

    .header-chip-button {
      min-height: 1.85rem;
      width: auto;
      padding: 0.3rem 0.58rem;
      font-size: 0.62rem;
    }

    .effect-card__media {
      inline-size: 3.65rem;
      block-size: 2.995rem;
    }

    .effect-actions {
      grid-column: 1 / -1;
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
      min-width: 0;
    }

    .pending-effects-panel--compact .effect-card {
      grid-template-columns: 2.85rem minmax(0, 1fr);
      gap: 0.48rem;
      padding: 0.5rem;
    }

    .pending-effects-panel--compact .effect-card__media {
      inline-size: 2.85rem;
      block-size: 2.34rem;
    }
  }
</style>
