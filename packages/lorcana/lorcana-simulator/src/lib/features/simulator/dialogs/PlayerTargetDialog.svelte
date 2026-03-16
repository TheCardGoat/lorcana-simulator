<script lang="ts">
    import * as Dialog from "$lib/design-system/primitives/dialog";
    import type {LorcanaPlayerSide} from "@/features/simulator/model/contracts.js";

  type LorcanaPlayerTarget = {
    selector: "you" | "opponent" | "each-opponent" | "each-player" | "chosen";
    count?: number;
  };

  interface PlayerTargetDialogProps {
    open?: boolean;
    target: LorcanaPlayerTarget;
    viewerSide?: LorcanaPlayerSide | null;
    selectable?: boolean;
    selectedPlayerSides?: LorcanaPlayerSide[];
    onPlayerToggle?: (playerSide: LorcanaPlayerSide) => void;
    titleText?: string;
    emptyAllText?: string;
    emptyNoMatchText?: string;
    closeButtonLabel?: string;
    closeButtonAriaLabel?: string;
    summaryFormatter?: (
      matchCount: number,
      totalCount: number,
      targetLabel: string,
      target: LorcanaPlayerTarget,
    ) => string;
  }

  const playerLabel = (side: LorcanaPlayerSide): string =>
    side === "playerOne" ? "Player One" : "Player Two";

  let {
    open = $bindable(false),
    target,
    viewerSide = null,
    selectable = false,
    selectedPlayerSides = [],
    onPlayerToggle,
    titleText,
    emptyAllText = "No players available.",
    emptyNoMatchText = "No players match current target.",
    closeButtonLabel = "Close",
    closeButtonAriaLabel,
    summaryFormatter = (matchCount, totalCount, _targetLabel, _target) =>
      `${matchCount} / ${totalCount} matches for targets`,
  }: PlayerTargetDialogProps = $props();

  const allPlayers: readonly LorcanaPlayerSide[] = ["playerOne", "playerTwo"];

  const opponentSide = $derived<LorcanaPlayerSide | null>(
    viewerSide === "playerOne" ? "playerTwo"
      : viewerSide === "playerTwo"
        ? "playerOne"
        : null,
  );

  const targetPlayers = $derived.by(() => {
    if (target.selector === "you") {
      return viewerSide ? [viewerSide] : [];
    }

    if (target.selector === "opponent" || target.selector === "each-opponent") {
      return opponentSide ? [opponentSide] : [];
    }

    return [...allPlayers];
  });

  const selectedPlayers = $derived(
    selectedPlayerSides.filter((side) => targetPlayers.includes(side)),
  );

  const selectionLimit = $derived(target.count ?? 1);
  const allowSelection = $derived(target.selector === "chosen" && selectable);
  const hasReachedSelectionLimit = $derived(
    target.selector === "chosen" &&
      selectionLimit > 0 &&
      selectedPlayers.length >= selectionLimit,
  );

  const targetBadges = $derived(
    [
      { id: "selector", label: `selector: ${target.selector}` },
      ...(target.count === undefined ? [] : [{ id: "count", label: `count: ${target.count}` }]),
    ],
  );

  const summaryCount = $derived(
    target.selector === "chosen" ? selectedPlayers.length : targetPlayers.length,
  );
  const headerSummary = $derived(
    summaryFormatter(summaryCount, targetPlayers.length, "players", target),
  );

  const displayedPlayers = $derived(
    targetPlayers.map((side) => ({
      side,
      isSelected: target.selector === "chosen" && selectedPlayers.includes(side),
      isDisabled:
        !allowSelection
          ? true
          : selectedPlayers.includes(side)
            ? false
            : hasReachedSelectionLimit,
    })),
  );

  const noPlayersAvailable = $derived(targetPlayers.length === 0);
  const unresolvedRelativeTarget = $derived(
    (target.selector === "you" || target.selector === "opponent" || target.selector === "each-opponent")
      && viewerSide === null,
  );
  const emptyMessage = $derived(unresolvedRelativeTarget ? emptyAllText : emptyNoMatchText);
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in"
    />
    <Dialog.Content
      class="fixed z-50 left-1/2 top-1/2 w-[min(92vw,640px)] h-[min(72vh,520px)] -translate-x-1/2 -translate-y-1/2 bg-slate-900/95 border border-slate-600/70 rounded-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-3 overflow-hidden"
      showCloseButton={false}
    >
      <Dialog.Title class="sr-only">
        {titleText ?? "Player target"}
      </Dialog.Title>
      <Dialog.Description class="sr-only">
        {titleText ?? "Player target"} with {summaryCount} matching players of {targetPlayers.length} total.
      </Dialog.Description>

      <header class="dialog-header">
        <div>
          <h2>{titleText ?? "Player target"}</h2>
          <p>{headerSummary}</p>
        </div>
        <Dialog.Close aria-label={closeButtonAriaLabel ?? closeButtonLabel}>
          {closeButtonLabel}
        </Dialog.Close>
      </header>

      {#if targetBadges.length > 0}
        <div class="badge-strip" role="list" aria-label="Target constraints">
          {#each targetBadges as badge (badge.id)}
            <span
              class="badge"
              role="listitem"
            >
              {badge.label}
            </span>
          {/each}
        </div>
      {/if}

      <section class="dialog-content" aria-live="polite">
        {#if noPlayersAvailable}
          <p class="empty-state">{emptyMessage}</p>
        {:else}
          <div class="player-grid">
            {#each displayedPlayers as player (player.side)}
              <button
                type="button"
                class="player-button"
                class:player-button--selected={player.isSelected}
                class:player-button--disabled={player.isDisabled}
                disabled={player.isDisabled || !allowSelection}
                aria-label={`${allowSelection ? "Toggle selection for" : "Inspect"} ${playerLabel(player.side)}`}
                onclick={() => {
                  if (!allowSelection) {
                    return;
                  }
                  onPlayerToggle?.(player.side);
                }}>
                <p class="player-button__label">{playerLabel(player.side)}</p>
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

  .player-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.65rem;
    align-items: stretch;
  }

  .player-button {
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(15, 23, 42, 0.5);
    color: #e2e8f0;
    border-radius: 0.75rem;
    padding: 0.75rem;
    text-align: left;
    cursor: pointer;
    transition: border-color 180ms ease, background 180ms ease, transform 180ms ease;
  }

  .player-button:hover:not(:disabled),
  .player-button:focus-visible:not(:disabled) {
    border-color: rgba(125, 187, 242, 0.7);
    background: rgba(30, 41, 59, 0.85);
    transform: translateY(-1px);
    outline: none;
  }

  .player-button--selected {
    border-color: rgba(59, 130, 246, 0.9);
    background: rgba(30, 64, 175, 0.45);
  }

  .player-button--disabled,
  .player-button:disabled {
    cursor: not-allowed;
    opacity: 0.72;
  }

  .player-button__label {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  @media (max-width: 700px) {
    .dialog-content {
      border-radius: 0.6rem;
      padding: 0.6rem;
    }

    .player-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
