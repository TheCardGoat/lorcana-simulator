<script lang="ts">
  import { onDestroy } from "svelte";
  import type {
    ExecutableMoveEntry,
    ExecutableMovePresentationCategoryId,
    LorcanaPlayerSide,
    ResolutionActionView,
  } from "@/features/simulator/model/contracts.js";
  import {getMoveCategoryEntryCount, sortMoveCategories} from "@/features/simulator/model/move-presentation.js";
  import { m } from "$lib/paraglide/messages.js";
  import type {ActivePlayerGuidanceController} from "@/features/simulator/model/active-player-guidance.js";

  const PANEL_TITLE_ID = "available-moves-panel-title";

  interface AvailableMovesPanelProps {
    moves: ExecutableMoveEntry[];
    interactiveSide?: LorcanaPlayerSide | null;
    activeSide?: LorcanaPlayerSide;
    showRawLogRegistryJson?: boolean;
    supplementalActions?: ResolutionActionView[];
    activePlayerGuidance?: ActivePlayerGuidanceController;
    onStartManualMoveSelection?: (payload: {
      id: ExecutableMovePresentationCategoryId;
      label: string;
      moves: ExecutableMoveEntry[];
    }) => boolean;
    onResetManualMoveSelection?: () => void;
    onExecuteMove?: (move: ExecutableMoveEntry) => void;
  }

  let {
    moves,
    interactiveSide = null,
    activeSide,
    showRawLogRegistryJson = false,
    supplementalActions = [],
    activePlayerGuidance,
    onStartManualMoveSelection,
    onResetManualMoveSelection,
    onExecuteMove,
  }: AvailableMovesPanelProps = $props();

  function hasParams(params: Record<string, unknown> | undefined): boolean {
    return Boolean(params && Object.keys(params).length > 0);
  }

  function isConfirmationMove(move: ExecutableMoveEntry): boolean {
    return move.presentation.categoryId === "pass-turn" || move.presentation.categoryId === "concede";
  }

  function buildConfirmationKey(move: ExecutableMoveEntry): string {
    return `${move.presentation.categoryId}:${move.id}`;
  }

  function getMoveButtonLabel(move: ExecutableMoveEntry): string {
    if (!isAwaitingConfirmation(move)) {
      return move.presentation.kind === "targeted" ? move.presentation.optionLabel : move.label;
    }

    return m["sim.actions.confirmMoveLabel"]({ label: move.label });
  }

  function isAwaitingConfirmation(move: ExecutableMoveEntry): boolean {
    return pendingConfirmationKey === buildConfirmationKey(move);
  }

  function handleMoveClick(move: ExecutableMoveEntry): void {
    if (isConfirmationMove(move)) {
      const confirmationKey = buildConfirmationKey(move);
      if (pendingConfirmationKey !== confirmationKey) {
        pendingConfirmationKey = confirmationKey;
        return;
      }
    }

    pendingConfirmationKey = null;
    onResetManualMoveSelection?.();
    onExecuteMove?.(move);
  }

  interface MoveCategoryGroup {
    id: ExecutableMovePresentationCategoryId;
    label: string;
    moves: ExecutableMoveEntry[];
    count: number;
    isDirect: boolean;
  }

  let selectedCategoryId = $state<ExecutableMovePresentationCategoryId | null>(null);
  let pendingConfirmationKey = $state<string | null>(null);

  const moveCategoryGroups = $derived.by<MoveCategoryGroup[]>(() => {
    const groups = new Map<ExecutableMovePresentationCategoryId, MoveCategoryGroup>();

    for (const move of moves) {
      const existingGroup = groups.get(move.presentation.categoryId);
      if (existingGroup) {
        existingGroup.moves.push(move);
        continue;
      }

      groups.set(move.presentation.categoryId, {
        id: move.presentation.categoryId,
        label: move.presentation.categoryLabel,
        moves: [move],
        count: 0,
        isDirect: move.presentation.kind === "direct",
      });
    }

    const groupedMoves = Array.from(groups.values());
    for (const group of groupedMoves) {
      group.count = getMoveCategoryEntryCount(group.id, group.moves);
    }

    return sortMoveCategories(groupedMoves);
  });

  const selectedCategory = $derived(
    selectedCategoryId
      ? moveCategoryGroups.find((group) => group.id === selectedCategoryId) ?? null
      : null,
  );

  const visibleMoves = $derived(
    selectedCategory?.moves.map((move) => ({
      ...move,
      optionLabel: move.presentation.kind === "targeted" ? move.presentation.optionLabel : move.label,
    })) ?? [],
  );

  const displayCount = $derived(
    supplementalActions.length +
      (selectedCategory ? visibleMoves.length : moveCategoryGroups.length),
  );
  const hasSupplementalActions = $derived(supplementalActions.length > 0);

  $effect(() => {
    if (!selectedCategoryId) {
      return;
    }

    if (!moveCategoryGroups.some((group) => group.id === selectedCategoryId && !group.isDirect)) {
      selectedCategoryId = null;
    }
  });

  $effect(() => {
    if (!pendingConfirmationKey) {
      return;
    }

    const stillAvailable = moves.some(
      (move) => isConfirmationMove(move) && buildConfirmationKey(move) === pendingConfirmationKey,
    );

    if (!stillAvailable) {
      pendingConfirmationKey = null;
    }
  });

  $effect(() => {
    activePlayerGuidance?.setSecondLayerCategory(
            selectedCategory ? selectedCategory.label : null,
    );
  });

  function handleCategoryClick(group: MoveCategoryGroup): void {
    if (group.isDirect) {
      handleMoveClick(group.moves[0]);
      return;
    }

    if (
      onStartManualMoveSelection?.({
        id: group.id,
        label: group.label,
        moves: group.moves,
      })
    ) {
      pendingConfirmationKey = null;
      selectedCategoryId = null;
      return;
    }

    pendingConfirmationKey = null;
    onResetManualMoveSelection?.();
    selectedCategoryId = group.id;
  }

  function handleBackClick(): void {
    selectedCategoryId = null;
    pendingConfirmationKey = null;
    onResetManualMoveSelection?.();
  }

  function handleSupplementalActionClick(action: ResolutionActionView): void {
    pendingConfirmationKey = null;
    onResetManualMoveSelection?.();
    action.onClick();
  }

  onDestroy(() => {
    activePlayerGuidance?.setSecondLayerCategory(null);
  });
</script>

<section class="available-moves-panel" aria-labelledby={PANEL_TITLE_ID}>
  <header class="panel-header">
    <h2 id={PANEL_TITLE_ID}>{m["sim.actions.panel.title"]({})}</h2>
    <span class="move-count">{displayCount}</span>
  </header>

  {#if !interactiveSide}
    <p class="empty-state">{m["sim.actions.empty.noInteractivePlayer"]({})}</p>
  {:else if !hasSupplementalActions && activeSide && activeSide !== interactiveSide}
    <p class="empty-state">{m["sim.actions.empty.waitingTurn"]({})}</p>
  {:else if !hasSupplementalActions && moves.length === 0}
    <p class="empty-state">{m["sim.actions.empty.none"]({})}</p>
  {:else}
    {#if hasSupplementalActions}
      <div class="supplemental-actions" aria-label={m["sim.actions.panel.resolutionAria"]({})}>
        {#each supplementalActions as action (action.id)}
          <button
            type="button"
            class="supplemental-action"
            class:supplemental-action--emphasis={action.emphasis === true}
            onclick={() => handleSupplementalActionClick(action)}
            aria-label={m["sim.actions.executeAria"]({ label: action.label })}
          >
            <span class="supplemental-action__label">{action.label}</span>
            {#if action.detail}
              <span class="supplemental-action__detail">{action.detail}</span>
            {/if}
          </button>
        {/each}
      </div>
    {/if}

    {#if selectedCategory}
      <div class="detail-header">
        <button
          type="button"
          class="back-button"
          onclick={handleBackClick}
          aria-label={m["sim.actions.backToCategories"]({})}
        >
          {m["sim.actions.back"]({})}
        </button>
        <p class="detail-title">{selectedCategory.label}</p>
      </div>

      <ol class="move-list">
        {#each visibleMoves as move (move.id)}
          <li class="move-item">
            <button
              type="button"
              class:move-button--confirming={isAwaitingConfirmation(move)}
              class="move-button"
              onclick={() => handleMoveClick(move)}
              aria-label={m["sim.actions.executeAria"]({ label: getMoveButtonLabel(move) })}
            >
              <p class="move-label">{getMoveButtonLabel(move)}</p>
              {#if isAwaitingConfirmation(move)}
                <p class="move-confirmation-hint">{m["sim.actions.confirmMoveHint"]({})}</p>
              {/if}
              {#if showRawLogRegistryJson}
                <p class="move-id">{move.moveId}</p>
              {/if}
              {#if showRawLogRegistryJson && hasParams(move.params)}
                <p class="move-params">{JSON.stringify(move.params)}</p>
              {/if}
            </button>
          </li>
        {/each}
      </ol>
    {:else}
      <ol class="move-list">
        {#each moveCategoryGroups as group (group.id)}
          <li class="move-item">
            <button
              type="button"
              class:move-button--confirming={group.isDirect && isAwaitingConfirmation(group.moves[0])}
              class="move-button move-button--category"
              onclick={() => handleCategoryClick(group)}
              aria-label={
                group.isDirect
                  ? m["sim.actions.executeAria"]({ label: getMoveButtonLabel(group.moves[0]) })
                  : m["sim.actions.openCategoryAria"]({ label: group.label, count: group.count })
              }
            >
              <div class="move-content">
                <p class="move-label">{group.isDirect ? getMoveButtonLabel(group.moves[0]) : group.label}</p>
                {#if group.isDirect && isAwaitingConfirmation(group.moves[0])}
                  <p class="move-confirmation-hint">{m["sim.actions.confirmMoveHint"]({})}</p>
                {/if}
              </div>
              {#if !group.isDirect}
                <span class="move-meta">{group.count}</span>
              {/if}
            </button>
          </li>
        {/each}
      </ol>
    {/if}
  {/if}
</section>

<style>
  .available-moves-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    padding: 0.15rem 0 0;
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.45rem;
    margin-bottom: 0.3rem;
    padding: 0 0.2rem;
  }

  h2 {
    margin: 0;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #95a8c1;
  }

  .move-count {
    min-width: 1.5rem;
    height: 1.15rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 187, 242, 0.32);
    background: rgba(20, 40, 64, 0.9);
    color: #d4e6fb;
    font-size: 0.68rem;
    font-weight: 700;
    display: grid;
    place-items: center;
  }

  .empty-state {
    margin: 0;
    padding: 0 0.2rem;
    color: #92a6c0;
    font-size: 0.76rem;
    line-height: 1.35;
  }

  .supplemental-actions {
    display: grid;
    gap: 0.45rem;
    margin-bottom: 0.45rem;
    padding: 0 0.2rem;
  }

  .supplemental-action {
    display: grid;
    gap: 0.14rem;
    width: 100%;
    padding: 0.58rem 0.7rem;
    text-align: left;
    border-radius: 0.85rem;
    border: 1px solid rgba(125, 187, 242, 0.24);
    background:
      linear-gradient(180deg, rgba(14, 31, 52, 0.92), rgba(11, 24, 40, 0.88)),
      radial-gradient(circle at top left, rgba(94, 234, 212, 0.08), transparent 46%);
    color: #eff6ff;
    transition:
      border-color 150ms ease,
      background 150ms ease,
      transform 150ms ease;
  }

  .supplemental-action:hover,
  .supplemental-action:focus-visible {
    border-color: rgba(125, 187, 242, 0.48);
    background:
      linear-gradient(180deg, rgba(19, 40, 66, 0.96), rgba(13, 28, 47, 0.92)),
      radial-gradient(circle at top left, rgba(94, 234, 212, 0.12), transparent 46%);
    outline: none;
    transform: translateY(-1px);
  }

  .supplemental-action:focus-visible {
    box-shadow: 0 0 0 2px rgba(125, 187, 242, 0.42);
  }

  .supplemental-action--emphasis {
    border-color: rgba(244, 194, 96, 0.38);
    background:
      linear-gradient(180deg, rgba(72, 43, 12, 0.94), rgba(39, 25, 10, 0.9)),
      radial-gradient(circle at top left, rgba(245, 184, 73, 0.22), transparent 52%);
  }

  .supplemental-action--emphasis:hover,
  .supplemental-action--emphasis:focus-visible {
    border-color: rgba(244, 194, 96, 0.58);
    background:
      linear-gradient(180deg, rgba(89, 52, 15, 0.98), rgba(50, 31, 12, 0.94)),
      radial-gradient(circle at top left, rgba(245, 184, 73, 0.28), transparent 52%);
  }

  .supplemental-action__label {
    font-size: 0.78rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .supplemental-action__detail {
    color: rgba(214, 228, 245, 0.78);
    font-size: 0.68rem;
    line-height: 1.25;
  }

  .move-list {
    list-style: none;
    margin: 0;
    padding: 0 0.2rem;
    display: grid;
    gap: 0;
    min-height: 0;
    flex: 1;
    overflow-y: auto;
    border-top: 1px solid rgba(109, 149, 195, 0.16);
    align-content: start;
  }

  .detail-header {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    margin-bottom: 0.28rem;
    padding: 0 0.2rem;
  }

  .back-button {
    border: 1px solid rgba(109, 149, 195, 0.22);
    background: rgba(15, 30, 49, 0.62);
    color: #d4e6fb;
    border-radius: 999px;
    padding: 0.22rem 0.58rem;
    font-size: 0.68rem;
    font-weight: 700;
    cursor: pointer;
  }

  .back-button:hover,
  .back-button:focus-visible {
    background: rgba(25, 47, 76, 0.85);
    outline: none;
  }

  .back-button:focus-visible {
    box-shadow: 0 0 0 2px rgba(125, 187, 242, 0.5);
  }

  .detail-title {
    margin: 0;
    color: #d7e6f8;
    font-size: 0.76rem;
    font-weight: 700;
    line-height: 1.2;
  }

  .move-item {
    padding: 0;
    border-bottom: 1px solid rgba(109, 149, 195, 0.12);
  }

  .move-item:last-child {
    border-bottom: none;
  }

  .move-button {
    width: 100%;
    text-align: left;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    padding: 0.38rem 0.3rem;
    display: block;
    border-radius: 0.75rem;
  }

  .move-button--category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.45rem;
  }

  .move-button--confirming {
    background: rgba(111, 46, 46, 0.22);
  }

  .move-button:hover,
  .move-button:focus-visible {
    background: rgba(25, 47, 76, 0.56);
    outline: none;
  }

  .move-button--confirming:hover,
  .move-button--confirming:focus-visible {
    background: rgba(135, 56, 56, 0.34);
  }

  .move-button:focus-visible {
    box-shadow: 0 0 0 2px rgba(125, 187, 242, 0.5);
  }

  .move-label {
    margin: 0;
    color: #e4edf8;
    font-size: 0.76rem;
    font-weight: 600;
    line-height: 1.2;
  }

  .move-content {
    min-width: 0;
  }

  .move-confirmation-hint {
    margin: 0.16rem 0 0;
    color: #f7c5c5;
    font-size: 0.68rem;
    line-height: 1.2;
  }

  .move-meta {
    min-width: 1.2rem;
    height: 1.2rem;
    border-radius: 999px;
    background: rgba(28, 58, 90, 0.9);
    color: #cfe1f7;
    font-size: 0.64rem;
    font-weight: 700;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .move-id {
    margin: 0.18rem 0 0;
    color: #93acc9;
    font-size: 0.7rem;
    line-height: 1.2;
    font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
  }

  .move-params {
    margin: 0.18rem 0 0;
    color: #bccce0;
    font-size: 0.68rem;
    line-height: 1.24;
    overflow-wrap: anywhere;
    font-family: "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
      monospace;
  }
</style>
