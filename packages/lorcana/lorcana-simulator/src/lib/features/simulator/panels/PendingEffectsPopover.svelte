<script lang="ts">
  import { ChevronDown, ChevronUp, Grip, Crosshair, Expand, Shrink } from "@lucide/svelte";
  
  import CardImage from "@/design-system/simulator/cards/CardImage.svelte";
  import NamedCardSearchInput from "@/features/simulator/panels/NamedCardSearchInput.svelte";
  import { useSimulatorCardContext } from "@/features/simulator/context/simulator-card-context.svelte.js";
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
  }

  type DragTarget = "panel" | "reminder";
  type ViewMode = PendingEffectsViewMode;
  const SCREEN_MARGIN = 16;
  const DRAG_THRESHOLD = 4;
  const REMINDER_FALLBACK_WIDTH = 208;
  const REMINDER_FALLBACK_HEIGHT = 88;
  const PANEL_FALLBACK_WIDTH = 420;
  const PANEL_FALLBACK_HEIGHT = 360;

  let {
    items,
    open = $bindable(false),
    canOpenTargetModal = false,
    onOpenTargetModal,
  }: PendingEffectsPopoverProps = $props();
  const simulatorCardContext = useSimulatorCardContext();

  let viewMode = $state<ViewMode>(DEFAULT_PENDING_EFFECTS_VIEW_MODE);
  let reminderOffset = $state({ x: 0, y: 0 });
  let panelOffset = $state({ x: 0, y: 0 });
  let reminderRef = $state<HTMLButtonElement | null>(null);
  let panelRef = $state<HTMLElement | null>(null);
  let hasHydratedViewModePreference = $state(false);
  let dragState = $state<{
    origin: { x: number; y: number };
    pointerId: number;
    start: { x: number; y: number };
    target: DragTarget;
  } | null>(null);
  let suppressReminderToggle = $state(false);
  let previousItemCount = $state(0);
  let previousActionableSignature = $state("");

  const itemCount = $derived(items.length);
  const bagCount = $derived(items.filter((item) => item.kind === "bag").length);
  const pendingCount = $derived(items.filter((item) => item.kind === "pending").length);
  const activeItem = $derived(items.find((item) => item.isActive) ?? items[0] ?? null);
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
      (actionableSignature.length > 0 && actionableSignature !== previousActionableSignature)
    ) {
      open = true;
    }

    previousItemCount = itemCount;
    previousActionableSignature = actionableSignature;
  });

  $effect(() => {
    if (!dragState) {
      return;
    }

    const currentDrag = dragState;

    const handlePointerMove = (event: PointerEvent): void => {
      if (event.pointerId !== currentDrag.pointerId) {
        return;
      }

      const nextOffset = clampOffset(currentDrag.target, {
        x: currentDrag.origin.x + (event.clientX - currentDrag.start.x),
        y: currentDrag.origin.y + (event.clientY - currentDrag.start.y),
      });

      if (currentDrag.target === "reminder") {
        reminderOffset = nextOffset;
        suppressReminderToggle =
          suppressReminderToggle ||
          Math.abs(event.clientX - currentDrag.start.x) > DRAG_THRESHOLD ||
          Math.abs(event.clientY - currentDrag.start.y) > DRAG_THRESHOLD;
      } else {
        panelOffset = nextOffset;
      }
    };

    const handlePointerUp = (event: PointerEvent): void => {
      if (event.pointerId !== currentDrag.pointerId) {
        return;
      }

      dragState = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  });

  $effect(() => {
    if (itemCount === 0 || typeof window === "undefined") {
      return;
    }

    const handleResize = (): void => {
      reminderOffset = clampOffset("reminder", reminderOffset);
      if (open) {
        panelOffset = clampOffset("panel", panelOffset);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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

  function getTargetRect(target: DragTarget): DOMRect | null {
    return (target === "reminder" ? reminderRef : panelRef)?.getBoundingClientRect() ?? null;
  }

  function getBasePosition(target: DragTarget, width: number, height: number): { left: number; top: number } {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (target === "reminder") {
      return {
        left: viewportWidth - SCREEN_MARGIN - width,
        top: SCREEN_MARGIN,
      };
    }

    return {
      left: viewportWidth - SCREEN_MARGIN - width,
      top: Math.max(SCREEN_MARGIN, (viewportHeight - height) / 2),
    };
  }

  function clampOffset(target: DragTarget, desiredOffset: { x: number; y: number }): { x: number; y: number } {
    if (typeof window === "undefined") {
      return desiredOffset;
    }

    const rect = getTargetRect(target);
    const width =
      rect?.width ?? (target === "reminder" ? REMINDER_FALLBACK_WIDTH : PANEL_FALLBACK_WIDTH);
    const height =
      rect?.height ?? (target === "reminder" ? REMINDER_FALLBACK_HEIGHT : PANEL_FALLBACK_HEIGHT);
    const base = getBasePosition(target, width, height);
    const maxLeft = Math.max(SCREEN_MARGIN, window.innerWidth - SCREEN_MARGIN - width);
    const maxTop = Math.max(SCREEN_MARGIN, window.innerHeight - SCREEN_MARGIN - height);
    const nextLeft = clamp(base.left + desiredOffset.x, SCREEN_MARGIN, maxLeft);
    const nextTop = clamp(base.top + desiredOffset.y, SCREEN_MARGIN, maxTop);

    return {
      x: Math.round(nextLeft - base.left),
      y: Math.round(nextTop - base.top),
    };
  }

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  function startDrag(target: DragTarget, event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    dragState = {
      target,
      pointerId: event.pointerId,
      start: { x: event.clientX, y: event.clientY },
      origin: target === "reminder" ? { ...reminderOffset } : { ...panelOffset },
    };

    if (target === "reminder") {
      suppressReminderToggle = false;
    }
  }

  function handleReminderClick(): void {
    if (suppressReminderToggle) {
      suppressReminderToggle = false;
      return;
    }

    open = !open;
  }

  function minimizePanel(): void {
    open = false;
  }

  function toggleViewMode(): void {
    viewMode = viewMode === "normal" ? "compact" : "normal";
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
      simulatorCardContext.setExternalPreviewCard(card);
    }
  }

  function handleCardPreviewLeave(card: LorcanaCardSnapshot | null): void {
    if (!card?.isMasked && simulatorCardContext.previewCard?.cardId === card?.cardId) {
      simulatorCardContext.setExternalPreviewCard(null);
    }
  }

  function getPanelOffsetStyle(): string {
    return `transform: translate3d(${panelOffset.x}px, ${panelOffset.y}px, 0);`;
  }

  function getReminderOffsetStyle(): string {
    return `transform: translate3d(${reminderOffset.x}px, ${reminderOffset.y}px, 0);`;
  }
</script>

{#if itemCount > 0}
  <button
    bind:this={reminderRef}
    type="button"
    class="pending-effects-reminder"
    class:pending-effects-reminder--dragging={dragState?.target === "reminder"}
    data-queue-anchor="reminder"
    data-state={open ? "open" : "closed"}
    onclick={handleReminderClick}
    onpointerdown={(event) => startDrag("reminder", event)}
    style={getReminderOffsetStyle()}
    aria-expanded={open}
    aria-controls="pending-effects-panel"
  >
    <span class="drag-indicator drag-indicator--reminder" aria-hidden="true">
      <Grip size={15} strokeWidth={2.2} />
    </span>
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
      style={getPanelOffsetStyle()}
    >
      <section
        bind:this={panelRef}
        id="pending-effects-panel"
        class="pending-effects-panel"
        class:pending-effects-panel--compact={viewMode === "compact"}
        class:pending-effects-panel--dragging={dragState?.target === "panel"}
        data-view-mode={viewMode}
        aria-label="Pending effects and bag"
      >
        <div
          class="panel-header"
          role="group"
          aria-label="Pending effects header"
          onpointerdown={(event) => startDrag("panel", event)}
        >
          <div class="panel-title-block">
            <span class="drag-indicator drag-indicator--panel" aria-hidden="true">
              <Grip size={15} strokeWidth={2.2} />
            </span>
            <h2>Pending effects</h2>
            <span class="panel-count">{itemCount}</span>
          </div>
          <div class="panel-controls">
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
                  <div class="card-frame">
                    <CardImage
                      set={item.card.set}
                      number={item.card.cardNumber}
                      crop="art_only"
                      alt={item.title}
                    />
                  </div>
                {:else}
                  <div class="card-frame card-frame--placeholder">
                    <span>{item.kind === "bag" ? "Bag" : "Action"}</span>
                  </div>
                {/if}
              </div>

              <div class="effect-card__body">
                <div class="effect-card__header">
                  <span class="effect-badge">{item.badge}</span>
                  {#if item.isActive}
                    <span class="effect-state">Active</span>
                  {/if}
                </div>

                <h3>{item.title}</h3>
                <p class="effect-subtitle">{item.subtitle}</p>
                <p class="effect-detail">{item.detail}</p>

                {#if item.card?.text}
                  <p class="effect-rules">{item.card.text}</p>
                {/if}

                {#if item.disabledReason}
                  <p class="effect-disabled-reason">{item.disabledReason}</p>
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

              <div class="effect-actions">
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
                  {#if !item.onConfirm}
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
    top: 1rem;
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
    cursor: grab;
    touch-action: none;
  }

  .drag-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 233, 187, 0.72);
    opacity: 0.9;
  }

  .drag-indicator--reminder {
    grid-row: 1 / span 2;
    align-self: stretch;
    padding-right: 0.18rem;
  }

  .pending-effects-reminder--dragging,
  .pending-effects-panel--dragging .panel-header {
    cursor: grabbing;
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
    top: 50%;
    right: 1rem;
    z-index: 209;
    pointer-events: none;
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
    transform: translateY(-50%);
  }

  .pending-effects-panel--compact {
    width: min(22rem, calc(100vw - 1.75rem));
    padding: 0.82rem;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    gap: 0.65rem;
    align-items: center;
    margin-bottom: 0.7rem;
    cursor: grab;
    touch-action: none;
  }

  .panel-title-block {
    display: grid;
    grid-template-columns: auto 1fr auto;
    column-gap: 0.45rem;
    align-items: center;
    min-width: 0;
  }

  .drag-indicator--panel {
    grid-row: 1 / span 2;
    margin-top: 0.02rem;
    color: rgba(169, 208, 246, 0.66);
  }

  .panel-header h2 {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: #ebf4ff;
    line-height: 1.1;
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

  .header-icon-button:hover,
  .header-icon-button:focus-visible {
    border-color: rgba(153, 191, 232, 0.44);
    background: rgba(22, 39, 62, 0.92);
    transform: translateY(-1px);
    outline: none;
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

  .action-button {
    display: inline-flex;
    justify-content: center;
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
    gap: 0.55rem;
  }

  .pending-effects-panel--compact .effect-card {
    grid-template-columns: 3.55rem minmax(0, 1fr);
    gap: 0.7rem;
    padding: 0.68rem;
  }

  .pending-effects-panel--compact .effect-card__media {
    inline-size: 3.55rem;
    block-size: 2.912rem;
  }

  .pending-effects-panel--compact .effect-actions {
    grid-column: 1 / -1;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    min-width: 0;
  }

  .pending-effects-panel--compact .effect-detail,
  .pending-effects-panel--compact .effect-rules,
  .pending-effects-panel--compact .effect-disabled-reason {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pending-effects-panel--compact .effect-subtitle,
  .pending-effects-panel--compact .effect-detail {
    display: none;
  }

  .pending-effects-panel--compact .effect-detail {
    line-clamp: 2;
    -webkit-line-clamp: 2;
  }

  .pending-effects-panel--compact .effect-rules,
  .pending-effects-panel--compact .effect-disabled-reason {
    line-clamp: 1;
    -webkit-line-clamp: 1;
  }

  @media (max-width: 767px) {
    .pending-effects-reminder {
      min-width: 10.5rem;
      padding: 0.72rem 0.82rem;
    }

    .pending-effects-panel {
      width: min(23rem, calc(100vw - 1rem));
      max-height: min(68vh, 32rem);
      padding: 0.86rem;
    }

    .pending-effects-panel--compact {
      width: min(20rem, calc(100vw - 0.75rem));
    }

    .effect-card {
      grid-template-columns: 3.65rem minmax(0, 1fr);
      gap: 0.72rem;
    }

    .panel-header {
      margin-bottom: 0.58rem;
    }

    .panel-header h2 {
      font-size: 0.92rem;
    }

    .header-icon-button {
      width: 1.85rem;
      height: 1.85rem;
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
  }
</style>
