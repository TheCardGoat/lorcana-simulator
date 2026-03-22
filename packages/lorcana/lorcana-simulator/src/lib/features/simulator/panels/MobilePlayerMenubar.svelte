<script lang="ts">
  import { tick } from "svelte";
  import {
    Activity,
    BookOpenText,
    CircleHelp,
    Eye,
    Flag,
    Hand,
    Layers,
    PaintBucket,
    Settings,
    Swords,
    Trash2,
    X,
    OctagonX,
  } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Dialog from "$lib/design-system/primitives/dialog";
  import * as Drawer from "$lib/components/ui/drawer";
  import { ScrollArea } from "$lib/design-system/primitives/scroll-area";
  import { m } from "$lib/i18n/messages.js";
  import SimulatorSupportActions from "@/features/simulator/support/SimulatorSupportActions.svelte";
  import type {
    ActionAvailableMovesSelectionState,
    ExecutableMoveEntry,
    ExecutableMovePresentationCategoryId,
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
    LorcanaPlayerSummary,
    MoveCategorySummary,
  } from "@/features/simulator/model/contracts.js";
  import { getLoreIconUrl } from "@/features/simulator/model/asset-urls.js";
  import {
    type RevealedBottomControlState,
    type RevealedBottomControlId,
    isBottomControlRevealed,
    revealBottomControl,
    sortBottomSeatMoveSummaries,
  } from "@/features/simulator/panels/mobile-player-menubar.js";
  import { getMoveCategoryIcon } from "@/features/simulator/model/action-icons.js";

  interface CompactPlayerSummary {
    label: string;
    side: LorcanaPlayerSide;
    summary: LorcanaPlayerSummary | null;
    isActive: boolean;
    isTurnPlayer: boolean;
    hasPriority: boolean;
  }

  interface MoveConfirmationState {
    categoryId: ExecutableMovePresentationCategoryId;
    title: string;
    description: string;
    confirmLabel: string;
    tone: "default" | "danger";
  }

  interface MobilePlayerMenubarProps {
    seat: "top" | "bottom";
    player: CompactPlayerSummary;
    actionCount?: number;
    moveSummaries?: MoveCategorySummary[];
    activeMoveCategoryId?: ExecutableMovePresentationCategoryId | null;
    pendingCount?: number;
    hasPendingEffects?: boolean;
    pendingEffectsOpen?: boolean;
    logCount?: number;
    selectedCard?: LorcanaCardSnapshot | null;
    selectedCardPlayable?: boolean;
    canConcede?: boolean;
    onOpenDetails?: () => void;
    onOpenMoves?: () => void;
    onExecuteMoveCategory?: (categoryId: ExecutableMovePresentationCategoryId) => void;
    onOpenLog?: () => void;
    onOpenPendingEffects?: () => void;
    onOpenSettings?: () => void;
    onOpenSupport?: () => void;
    onOpenCardPreview?: () => void;
    onConcede?: () => void;
    onReportPlayer?: () => void;
  }

  let {
    seat,
    player,
    actionCount = 0,
    moveSummaries = [],
    activeMoveCategoryId = null,
    pendingCount = 0,
    hasPendingEffects = false,
    pendingEffectsOpen = false,
    logCount = 0,
    selectedCard = null,
    selectedCardPlayable = false,
    canConcede = false,
    onOpenDetails,
    onOpenMoves,
    onExecuteMoveCategory,
    onOpenLog,
    onOpenPendingEffects,
    onOpenSettings,
    onOpenSupport,
    onOpenCardPreview,
    onConcede,
    onReportPlayer,
  }: MobilePlayerMenubarProps = $props();

  let detailsOpen = $state(false);
  let confirmDialogOpen = $state(false);
  let moveConfirmation = $state<MoveConfirmationState | null>(null);
  let revealedBottomControls = $state<RevealedBottomControlState>(null);

  const loreIconUrl = getLoreIconUrl();
  const loreValue = $derived(player.summary?.lore ?? 0);
  const handCount = $derived(player.summary?.handCount ?? 0);
  const deckCount = $derived(player.summary?.deckCount ?? 0);
  const discardCount = $derived(player.summary?.discardCount ?? 0);
  const inkSummary = $derived(`${player.summary?.availableInk ?? 0}/${player.summary?.inkwellCount ?? 0}`);
  const seatLabel = $derived(seat === "top" ? "opponent" : "player");
  const detailsSide = $derived(seat === "top" ? "top" : "bottom");
  const stateBadges = $derived.by(() => {
    const badges: string[] = [];
    if (player.isActive) {
      badges.push("Active");
    }
    if (player.isTurnPlayer) {
      badges.push("Turn");
    }
    if (player.hasPriority) {
      badges.push("Priority");
    }
    return badges;
  });
  const loreMaskStyle = `mask-image: url("${loreIconUrl}"); -webkit-mask-image: url("${loreIconUrl}");`;
  const confirmationMoveCategoryIds = new Set<ExecutableMovePresentationCategoryId>([
    "concede",
    "pass-turn",
  ]);
  const moveStripBlockedCategoryIds = new Set<ExecutableMovePresentationCategoryId>([
    "concede",
    "pass-turn",
  ]);
  const passTurnSummary = $derived(
    seat === "bottom"
      ? moveSummaries.find((summary) => summary.categoryId === "pass-turn") ?? null
      : null,
  );
  const passTurnAvailable = $derived(passTurnSummary !== null);
  const safeMoveSummaries = $derived.by(() =>
    seat === "bottom"
      ? moveSummaries.filter((summary) => !moveStripBlockedCategoryIds.has(summary.categoryId))
      : moveSummaries,
  );
  const orderedSafeMoveSummaries = $derived.by(() => {
    if (seat !== "bottom") {
      return safeMoveSummaries;
    }

    return sortBottomSeatMoveSummaries(safeMoveSummaries);
  });
  const safeActionCount = $derived(
    seat === "bottom"
      ? Math.max(0, actionCount - Number(passTurnSummary !== null) - Number(canConcede))
      : actionCount,
  );
  const moveButtonSummaries = $derived.by(() =>
    seat === "bottom"
      ? orderedSafeMoveSummaries.map((summary) => ({
          ...summary,
          icon: getMoveCategoryIcon(summary.categoryId),
          isActive: activeMoveCategoryId === summary.categoryId,
          requiresConfirmation: confirmationMoveCategoryIds.has(summary.categoryId),
          showLabel: isBottomControlRevealed(revealedBottomControls, summary.categoryId),
        }))
      : [],
  );
  $effect(() => {
    const categoryId = moveConfirmation?.categoryId;
    if (!categoryId) {
      return;
    }

    if (!moveSummaries.some((summary) => summary.categoryId === categoryId)) {
      moveConfirmation = null;
      confirmDialogOpen = false;
    }
  });

  $effect(() => {
    if (!confirmDialogOpen && moveConfirmation) {
      moveConfirmation = null;
    }
  });

  function openDetails(): void {
    detailsOpen = true;
    onOpenDetails?.();
  }

  function handleSettingsClick(): void {
    detailsOpen = false;
    onOpenSettings?.();
  }

  function handleReportClick(): void {
    detailsOpen = false;
    onReportPlayer?.();
  }

  async function handleConcedeClick(): Promise<void> {
    if (!canConcede) {
      return;
    }

    detailsOpen = false;
    await tick();
    openMoveConfirmation("concede");
  }

  function handlePassTurnClick(): void {
    if (!passTurnAvailable) {
      return;
    }

    markBottomControlAsRevealed("pass-turn");
    openMoveConfirmation("pass-turn");
  }

  function handleMoveCategoryClick(categoryId: ExecutableMovePresentationCategoryId): void {
    markBottomControlAsRevealed(categoryId);

    if (confirmationMoveCategoryIds.has(categoryId)) {
      openMoveConfirmation(categoryId);
      return;
    }

    onExecuteMoveCategory?.(categoryId);
  }

  function handlePendingEffectsClick(): void {
    markBottomControlAsRevealed("pending-effects");
    onOpenPendingEffects?.();
  }

  function markBottomControlAsRevealed(controlId: RevealedBottomControlId): void {
    if (seat !== "bottom") {
      return;
    }

    revealedBottomControls = revealBottomControl(revealedBottomControls, controlId);
  }

  function openMoveConfirmation(categoryId: ExecutableMovePresentationCategoryId): void {
    moveConfirmation =
      categoryId === "concede"
        ? {
            categoryId,
            title: "Concede game?",
            description: "This will immediately end the current match for you.",
            confirmLabel: "Concede",
            tone: "danger",
          }
        : {
            categoryId,
            title: "Pass turn?",
            description: "You will end your turn and give up any remaining actions.",
            confirmLabel: "Pass turn",
            tone: "default",
          };
    confirmDialogOpen = true;
  }

  function closeMoveConfirmation(): void {
    confirmDialogOpen = false;
    moveConfirmation = null;
  }

  function confirmMoveConfirmation(): void {
    const confirmation = moveConfirmation;
    if (!confirmation) {
      return;
    }

    confirmDialogOpen = false;
    moveConfirmation = null;

    if (confirmation.categoryId === "concede" && !onExecuteMoveCategory) {
      detailsOpen = false;
      onConcede?.();
      return;
    }

    onExecuteMoveCategory?.(confirmation.categoryId);
  }

</script>

{#if seat === "bottom"}
  <div class="mobile-menubar-frame mobile-menubar-frame--bottom">
    <div class="mobile-menubar-shell mobile-menubar-shell--bottom" data-testid="mobile-bottom-menubar">
      <div class="mobile-menubar-primary" data-testid="mobile-bottom-primary">
        <Button
          variant="outline"
          size="xs"
          class="lore-chip lore-chip--compact mobile-anchor-button"
          onclick={openDetails}
          aria-label={`Open ${seatLabel} details`}
          data-testid={`mobile-${seat}-lore-chip`}
        >
          <span class="lore-chip__content">
            <span aria-hidden="true" class="lore-chip__icon" style={loreMaskStyle}></span>
            <span class="lore-chip__value">{loreValue}</span>
          </span>
        </Button>
      </div>

      <div
        data-slot="button-group"
        class="mobile-menubar-center"
        data-testid="mobile-bottom-center"
      >
        <div class="mobile-move-strip" aria-label="Available moves" data-testid="mobile-bottom-move-strip">
          {#each moveButtonSummaries as summary (summary.categoryId)}
            {@const Icon = summary.icon}
            <Button
              variant="outline"
              size="icon-sm"
              class={`quick-action mobile-bottom-control${summary.showLabel ? " quick-action--revealed" : " quick-action--icon-only"}${summary.isActive ? " quick-action--primary" : ""}${summary.categoryId === "concede" ? " quick-action--danger" : ""}`}
              onclick={() => handleMoveCategoryClick(summary.categoryId)}
              aria-label={summary.categoryLabel}
              title={summary.categoryLabel}
              data-testid={`mobile-bottom-move-${summary.categoryId}`}
            >
              {#if summary.showLabel}
                <span class="quick-action__label">{summary.categoryLabel}</span>
              {:else}
                <Icon class="size-4" />
              {/if}
              {#if summary.count > 1}
                <span class="quick-action__badge">{summary.count}</span>
              {/if}
            </Button>
          {/each}

          {#if moveButtonSummaries.length === 0 && safeActionCount > 0}
            <Button
              variant="outline"
              size="icon-sm"
              class="quick-action quick-action--icon-only mobile-bottom-control"
              onclick={onOpenMoves}
              aria-label="Open available moves"
              title="Open available moves"
              data-testid="mobile-bottom-move-fallback"
            >
              <Swords class="size-4" />
              <span class="quick-action__badge">{actionCount}</span>
            </Button>
          {/if}
        </div>

        <div class="mobile-menubar-utility" data-testid="mobile-bottom-utility">
          {#if hasPendingEffects}
            <Button
              variant="outline"
              size="icon-sm"
              class={`quick-metric quick-metric--interactive mobile-bottom-control${isBottomControlRevealed(revealedBottomControls, "pending-effects") ? " quick-action--revealed" : " quick-action--icon-only"}`}
              onclick={handlePendingEffectsClick}
              aria-label={`Resolve next pending effect (${pendingCount} queued)`}
              title={`Resolve next pending effect (${pendingCount} queued)`}
              aria-pressed={pendingEffectsOpen}
              data-testid="mobile-bottom-pending-effects"
            >
              {#if isBottomControlRevealed(revealedBottomControls, "pending-effects")}
                <span class="quick-action__label">Effects</span>
              {:else}
                <Activity class="size-4" />
              {/if}
              <span class="quick-action__badge">{pendingCount}</span>
            </Button>
          {/if}
        </div>
      </div>

      <div class="mobile-menubar-secondary" data-testid="mobile-bottom-secondary">
        <Button
          variant="outline"
          size="icon-sm"
          class={`mobile-anchor-button mobile-side-button quick-action mobile-bottom-control${isBottomControlRevealed(revealedBottomControls, "pass-turn") ? " quick-action--revealed" : " quick-action--icon-only"}${passTurnAvailable ? "" : " mobile-side-button--disabled"}`}
          onclick={handlePassTurnClick}
          disabled={!passTurnAvailable}
          aria-label={passTurnAvailable ? "Pass turn" : "Pass turn unavailable"}
          title={passTurnAvailable ? "Pass turn" : "Pass turn unavailable"}
          data-testid="mobile-bottom-pass-turn"
        >
          {#if isBottomControlRevealed(revealedBottomControls, "pass-turn")}
            <span class="quick-action__label">Pass</span>
          {:else}
            <Flag class="size-4" />
          {/if}
        </Button>
      </div>
    </div>
  </div>
{:else}
  <div
    class={`mobile-menubar-frame mobile-menubar-frame--top border border-sky-300/20 p-1.5 bg-slate-950/90 shadow-[0_14px_36px_rgba(2,6,23,0.36)] backdrop-blur${seat === "top" ? " rounded-b-2xl" : ""}`}
  >
    <div class="mobile-menubar-shell">
      <Button
        variant="outline"
        size="xs"
        class="lore-chip lore-chip--compact"
        onclick={openDetails}
        aria-label={`Open ${seatLabel} details`}
        data-testid={`mobile-${seat}-lore-chip`}
      >
        <span class="lore-chip__content">
          <span aria-hidden="true" class="lore-chip__icon" style={loreMaskStyle}></span>
          <span class="lore-chip__value">{loreValue}</span>
        </span>
      </Button>

      <div data-slot="button-group" class="mobile-action-group">
        <Button
          variant="outline"
          size="icon-sm"
          class="quick-action quick-action--icon-only"
          onclick={onOpenCardPreview}
          disabled={!selectedCard}
          aria-label="Open selected card preview"
          title={selectedCard ? selectedCard.label : "No card selected"}
        >
          <Eye class="size-4" />
          {#if selectedCardPlayable}
            <span class="quick-action__badge quick-action__badge--playable">Live</span>
          {/if}
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          class="quick-action quick-action--icon-only"
          onclick={onOpenSupport}
          aria-label={m["sim.player.support.openAria"]({})}
          title={m["sim.player.support.openAria"]({})}
        >
          <CircleHelp class="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          class="quick-action quick-action--icon-only"
          onclick={onOpenSettings}
          aria-label="Open player settings"
          title="Open player settings"
        >
          <Settings class="size-4" />
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          class="quick-action quick-action--icon-only"
          onclick={onOpenLog}
          aria-label="Open event log"
          title="Open event log"
        >
          <BookOpenText class="size-4" />
          <span class="quick-action__badge">{logCount}</span>
        </Button>
      </div>
    </div>
  </div>
{/if}

<Drawer.Root bind:open={detailsOpen} direction={detailsSide} shouldScaleBackground={false}>
  <Drawer.Content class="player-details-sheet border-sky-300/20 bg-slate-950/98 text-slate-100">
    <Drawer.Header class="player-details-sheet__header">
      <div class="flex items-center justify-between gap-3">
        <Drawer.Title class="player-details-sheet__title">{player.label}</Drawer.Title>
        <Drawer.Close class="drawer-close-button" aria-label={`Close ${seatLabel} details`}>
          <X class="size-4" />
        </Drawer.Close>
      </div>
    </Drawer.Header>

    <ScrollArea>
      <div class="space-y-2.5 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div class="rounded-[1rem] bg-slate-900/90 p-2.5 ring-1 ring-inset ring-sky-300/12">
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <span class="mt-0.5 truncate text-[1rem] font-bold leading-tight text-slate-50">
                {player.label}
              </span>
              <span class="mt-0.5 text-[0.64rem] uppercase tracking-[0.16em] text-slate-400">
                {player.side}
              </span>
            </div>

            <div class="flex items-center gap-1.5 rounded-full bg-sky-950/70 px-2.5 py-1.25 ring-1 ring-inset ring-sky-300/18">
              <span class="text-[0.95rem] font-black leading-none text-amber-300">{loreValue}</span>
              <span aria-hidden="true" class="sheet-lore-icon" style={loreMaskStyle}></span>
            </div>
          </div>
        </div>
        {#if seat === "bottom"}
          <div class="grid gap-1.5">
            <button type="button" class="sheet-action-button" onclick={handleSettingsClick}>
              <div class="sheet-action-button__copy">
                <span class="sheet-action-button__label">Player Settings</span>
                <span class="sheet-action-button__meta">Controls, language, previews, and speed</span>
              </div>
              <Settings class="size-4 shrink-0" />
            </button>

            <div class="sheet-support-actions">
              <p class="sheet-support-actions__title">{m["sim.support.title"]({})}</p>
              <p class="sheet-support-actions__description">
                {m["sim.support.description"]({})}
              </p>
              <SimulatorSupportActions surface="sheet" />
            </div>

            <button
              type="button"
              class="sheet-action-button sheet-action-button--danger"
              onclick={handleConcedeClick}
              disabled={!canConcede}
            >
              <div class="sheet-action-button__copy">
                <span class="sheet-action-button__label">Concede</span>
                <span class="sheet-action-button__meta">
                  {canConcede
                    ? "Open a confirmation dialog before conceding."
                    : "Concede is not available right now."}
                </span>
              </div>
              <OctagonX class="size-4 shrink-0" />
            </button>
          </div>
        {:else}
          <button
            type="button"
            class="sheet-action-button sheet-action-button--warning"
            onclick={handleReportClick}
          >
            <div class="sheet-action-button__copy">
              <span class="sheet-action-button__label">Report Player</span>
              <span class="sheet-action-button__meta">Open the current placeholder reporting action.</span>
            </div>
            <Flag class="size-4 shrink-0" />
          </button>
        {/if}
        <div class="grid grid-cols-2 gap-1.5 text-xs">
          <div class="stat-card">
            <p class="stat-card__label">Hand</p>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{handCount}</span>
              <Hand class="size-4" />
            </div>
          </div>
          <div class="stat-card">
            <p class="stat-card__label">Deck</p>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{deckCount}</span>
              <Layers class="size-4" />
            </div>
          </div>
          <div class="stat-card">
            <p class="stat-card__label">Discard</p>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{discardCount}</span>
              <Trash2 class="size-4" />
            </div>
          </div>
          <div class="stat-card">
            <p class="stat-card__label">Ink</p>
            <div class="stat-card__value-row">
              <span class="stat-card__value">{inkSummary}</span>
              <PaintBucket class="size-4" />
            </div>
          </div>
        </div>

      
      </div>
    </ScrollArea>
  </Drawer.Content>
</Drawer.Root>

<Dialog.Root bind:open={confirmDialogOpen}>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content class="mobile-confirm-dialog" showCloseButton={false}>
      <Dialog.Header class="mobile-confirm-dialog__header">
        <Dialog.Title class="mobile-confirm-dialog__title">
          {moveConfirmation?.title ?? "Confirm action"}
        </Dialog.Title>
        <Dialog.Description class="mobile-confirm-dialog__description">
          {moveConfirmation?.description ?? ""}
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer class="mobile-confirm-dialog__footer">
        <Button
          variant="outline"
          class="mobile-confirm-dialog__button"
          onclick={closeMoveConfirmation}
        >
          Cancel
        </Button>
        <Button
          variant={moveConfirmation?.tone === "danger" ? "destructive" : "default"}
          class="mobile-confirm-dialog__button"
          onclick={confirmMoveConfirmation}
        >
          {moveConfirmation?.confirmLabel ?? "Confirm"}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .mobile-menubar-frame {
    padding-left: max(0.5rem, env(safe-area-inset-left));
    padding-right: max(0.5rem, env(safe-area-inset-right));
  }

  .mobile-menubar-shell {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .mobile-menubar-shell--bottom {
    gap: 0.32rem;
  }

  .mobile-menubar-primary,
  .mobile-menubar-secondary {
    flex: 0 0 auto;
  }

  .mobile-menubar-center {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: 0.35rem;
    border-radius: 0.95rem;
    border: 1px solid rgba(125, 211, 252, 0.14);
    background: rgba(15, 23, 42, 0.82);
    padding: 0.18rem 0.22rem;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
  }

  .mobile-menubar-utility {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: flex-end;
    gap: 0.24rem;
    margin-left: auto;
  }

  :global(.lore-chip) {
    min-height: 2.85rem;
    min-width: 4.75rem;
    gap: 0.45rem;
    border: 1px solid rgba(125, 211, 252, 0.24);
    background:
      linear-gradient(180deg, rgba(8, 47, 73, 0.96), rgba(15, 23, 42, 0.96));
    padding: 0.7rem 0.95rem;
    color: #f8fafc;
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      background 160ms ease;
  }

  :global(.lore-chip:hover) {
    border-color: rgba(125, 211, 252, 0.42);
    transform: translateY(-1px);
  }

  :global(.lore-chip--compact) {
    width: auto;
    min-width: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem 0.55rem;
  }

  :global(.mobile-anchor-button) {
    width: auto;
    min-width: 0;
    min-height: 2.85rem;
    border-color: rgba(125, 211, 252, 0.28);
    background:
      linear-gradient(180deg, rgba(8, 47, 73, 0.96), rgba(15, 23, 42, 0.96));
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 10px 22px rgba(2, 6, 23, 0.28);
  }

  .lore-chip__content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.24rem;
    white-space: nowrap;
  }

  .mobile-action-group {
    display: flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    gap: 0.2rem;
    overflow: hidden;
    border-radius: 0.95rem;
    border: 1px solid rgba(125, 211, 252, 0.14);
    background: rgba(15, 23, 42, 0.78);
    padding: 0.2rem;
  }

  :global(.mobile-side-button) {
    width: 3.15rem;
    min-width: 3.15rem;
  }

  :global(.mobile-side-button--disabled) {
    border-color: rgba(148, 163, 184, 0.18);
    background: rgba(15, 23, 42, 0.34);
    color: rgba(148, 163, 184, 0.78);
    opacity: 1;
  }

  .mobile-move-strip {
    display: inline-flex;
    min-width: 0;
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    gap: 0.28rem;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }

  .mobile-move-strip::-webkit-scrollbar {
    display: none;
  }

  .sheet-support-actions {
    display: grid;
    gap: 0.3rem;
    margin-top: 0.2rem;
  }

  .sheet-support-actions__title {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(148, 163, 184, 0.88);
  }

  .sheet-support-actions__description {
    margin: 0;
    font-size: 0.74rem;
    line-height: 1.45;
    color: rgba(191, 219, 254, 0.66);
  }

  .lore-chip__value {
    display: block;
    font-size: 1.1rem;
    font-weight: 900;
    line-height: 1;
    color: #fcd34d;
    text-align: center;
  }

  .lore-chip__icon {
    display: block;
    width: 1.15rem;
    height: 1.15rem;
    flex-shrink: 0;
    background: #fcd34d;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  :global(.quick-action) {
    min-height: 2.5rem;
    gap: 0.45rem;
    position: relative;
    flex-shrink: 0;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(125, 211, 252, 0.16);
    background: transparent;
    padding: 0.55rem 0.8rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: rgba(241, 245, 249, 0.92);
    transition:
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      transform 160ms ease;
  }

  :global(.quick-action:hover:enabled) {
    background: rgba(18, 39, 64, 0.94);
    transform: translateY(-1px);
    border-color: rgba(125, 211, 252, 0.3);
  }

  :global(.quick-action:disabled) {
    opacity: 0.45;
  }

  :global(.quick-action--primary) {
    background:
      linear-gradient(180deg, rgba(14, 116, 144, 0.92), rgba(8, 47, 73, 0.96));
    color: #f8fbff;
    border-color: rgba(125, 211, 252, 0.42);
  }

  :global(.quick-action--danger) {
    border-color: rgba(127, 29, 29, 0.65);
    background: linear-gradient(180deg, rgba(69, 10, 10, 0.76), rgba(28, 25, 23, 0.94));
    color: rgba(254, 226, 226, 0.92);
  }

  :global(.quick-action--danger:hover:enabled) {
    border-color: rgba(153, 27, 27, 0.78);
    background: linear-gradient(180deg, rgba(87, 13, 13, 0.84), rgba(41, 37, 36, 0.98));
  }

  :global(.quick-action--icon-only) {
    min-width: 2.34rem;
    padding: 0;
  }

  :global(.mobile-bottom-control) {
    min-width: 3rem;
    min-height: 3rem;
  }

  :global(.quick-action--revealed) {
    justify-content: center;
    min-width: max-content;
    padding: 0 0.8rem;
  }

  .quick-action__label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    line-height: 1;
  }

  .quick-action__badge {
    position: absolute;
    top: 0.18rem;
    right: 0.18rem;
    display: inline-flex;
    min-width: 1rem;
    min-height: 1rem;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.14);
    padding: 0 0.2rem;
    font-size: 0.58rem;
    font-weight: 800;
    line-height: 1;
  }

  .quick-action__badge--playable {
    background: rgba(16, 185, 129, 0.18);
    color: #bbf7d0;
  }


  :global(.quick-metric) {
    min-height: 2.6rem;
    gap: 0.35rem;
    background: transparent;
    padding: 0;
    font-size: 0.78rem;
    font-weight: 700;
    color: rgba(191, 219, 254, 0.88);
  }

  :global(.quick-metric--interactive) {
    border: 1px solid rgba(125, 211, 252, 0.16);
    transition:
      border-color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  :global(.quick-metric--interactive:hover) {
    border-color: rgba(125, 211, 252, 0.34);
    background: rgba(18, 39, 64, 0.9);
    transform: translateY(-1px);
  }

  :global(.player-details-sheet) {
    max-height: min(62vh, 24rem);
    box-shadow: 0 0 0 1px rgba(125, 211, 252, 0.08), 0 24px 64px rgba(2, 6, 23, 0.72);
    padding-bottom: 0;
  }

  :global(.player-details-sheet__header) {
    gap: 0;
    padding: 0.8rem 0.9rem 0.25rem;
  }

  :global(.player-details-sheet__title) {
    font-size: 0.92rem;
    font-weight: 800;
    color: #f8fafc;
  }


  .stat-card {
    border-radius: 1rem;
    background: rgba(15, 23, 42, 0.9);
    padding: 0.62rem 0.72rem;
    box-shadow: inset 0 0 0 1px rgba(125, 211, 252, 0.08);
  }

  .stat-card__label {
    margin: 0;
    color: rgba(148, 163, 184, 0.9);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.66rem;
    font-weight: 700;
  }

  .stat-card__value-row {
    margin-top: 0.28rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    color: #e2e8f0;
  }

  .stat-card__value {
    font-size: 0.84rem;
    font-weight: 800;
    color: #f8fafc;
  }

  .sheet-action-button {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 0.9rem;
    border-radius: 1rem;
    border: 1px solid rgba(125, 211, 252, 0.12);
    background: rgba(15, 23, 42, 0.92);
    padding: 0.68rem 0.82rem;
    text-align: left;
    color: #f8fafc;
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      background 160ms ease;
  }

  .sheet-action-button:hover:enabled {
    transform: translateY(-1px);
    border-color: rgba(125, 211, 252, 0.28);
    background: rgba(18, 39, 64, 0.96);
  }

  .sheet-action-button:disabled {
    opacity: 0.45;
  }

  .sheet-action-button--danger {
    border-color: rgba(127, 29, 29, 0.45);
    background: linear-gradient(180deg, rgba(69, 10, 10, 0.92), rgba(24, 24, 27, 0.98));
  }

  .sheet-action-button--warning {
    border-color: rgba(251, 191, 36, 0.2);
    background: linear-gradient(180deg, rgba(69, 39, 0, 0.82), rgba(31, 41, 55, 0.96));
  }

  .sheet-action-button__copy {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
  }

  .sheet-action-button__label {
    font-size: 0.8rem;
    font-weight: 800;
    color: #f8fafc;
  }

  .sheet-action-button__meta {
    font-size: 0.64rem;
    color: rgba(191, 219, 254, 0.7);
  }

  .sheet-lore-icon {
    width: 0.95rem;
    height: 0.95rem;
    flex-shrink: 0;
    background: #fcd34d;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.35));
  }

  :global(.mobile-confirm-dialog) {
    max-width: min(22rem, calc(100vw - 1.5rem));
    border-color: rgba(125, 211, 252, 0.18);
    background: linear-gradient(180deg, rgba(11, 19, 32, 0.98), rgba(5, 10, 18, 0.98));
    color: #f8fafc;
    box-shadow: 0 24px 64px rgba(2, 6, 23, 0.72);
  }

  :global(.mobile-confirm-dialog__header) {
    gap: 0.45rem;
    text-align: left;
  }

  :global(.mobile-confirm-dialog__title) {
    font-size: 1rem;
    font-weight: 800;
    color: #f8fafc;
  }

  :global(.mobile-confirm-dialog__description) {
    color: rgba(191, 219, 254, 0.78);
    font-size: 0.8rem;
    line-height: 1.4;
  }

  :global(.mobile-confirm-dialog__footer) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
  }

  :global(.mobile-confirm-dialog__button) {
    min-height: 2.7rem;
    font-weight: 800;
  }

  @media (max-width: 380px) {
    :global(.quick-action--icon-only) {
      min-width: 2.2rem;
    }

    :global(.lore-chip) {
      min-width: 4.2rem;
      padding-inline: 0.82rem;
    }
  }
</style>
