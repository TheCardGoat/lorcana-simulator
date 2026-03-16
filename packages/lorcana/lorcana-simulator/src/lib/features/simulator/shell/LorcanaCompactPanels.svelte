<script lang="ts">
  import { ClipboardList, ScrollText } from "@lucide/svelte";
  import * as Sheet from "$lib/design-system/primitives/sheet";
  import { m } from "$lib/paraglide/messages.js";
  import {AvailableMovesPanel, EventLogPanel} from "@/features/simulator/index.js";
  import {useSimulatorCardContext} from "@/features/simulator/context/simulator-card-context.svelte.js";
  import {useLorcanaSidebarPresenter} from "@/features/simulator/context/game-context.svelte.js";
  import {getMoveCategoryGroupCount} from "@/features/simulator/model/move-presentation.js";

  type CompactPanelTab = "moves" | "log";

  interface LorcanaCompactPanelsProps {
    open?: boolean;
    activeTab?: CompactPanelTab;
  }

  let {
    open = $bindable(false),
    activeTab = $bindable("moves"),
  }: LorcanaCompactPanelsProps = $props();

  const sidebar = useLorcanaSidebarPresenter();
  const simulatorCardContext = useSimulatorCardContext();

  const executableMoves = $derived(sidebar.executableMoves);
  const availableMoveCategoryCount = $derived(getMoveCategoryGroupCount(executableMoves));
  const moveLogEntries = $derived(sidebar.moveLogEntries);
  const ownerSide = $derived(sidebar.ownerSide);
  const activeSide = $derived(sidebar.activeSide);
  const showRawLogRegistryJson = $derived(sidebar.showRawLogRegistryJson);
  const hoveredLogCard = $derived(sidebar.hoveredLogCard);

  const availableMovesTitle = $derived(m["sim.actions.panel.title"]({}));
  const eventLogTitle = $derived(m["sim.tabletop.eventLog.title"]({}));

  $effect(() => {
    simulatorCardContext.setExternalPreviewCard(hoveredLogCard);
  });
</script>

<Sheet.Root bind:open>
  <Sheet.Content
    side="bottom"
    class="compact-panels-sheet border-sky-400/30 bg-slate-950/96 text-slate-100"
  >
    <Sheet.Header class="compact-panels-header">
      <Sheet.Title class="compact-panels-title">
        {activeTab === "moves" ? availableMovesTitle : eventLogTitle}
      </Sheet.Title>
      <Sheet.Description class="compact-panels-description">
        {m["sim.tabletop.aria"]({})}
      </Sheet.Description>
    </Sheet.Header>

    <div class="compact-panels-tabs" role="tablist" aria-label={m["sim.tabletop.aria"]({})}>
      <button
        type="button"
        role="tab"
        class="compact-tab"
        class:compact-tab--active={activeTab === "moves"}
        aria-selected={activeTab === "moves"}
        onclick={() => (activeTab = "moves")}
      >
        <ClipboardList class="size-4" />
        <span>{availableMovesTitle}</span>
        <span class="compact-tab-badge">{availableMoveCategoryCount}</span>
      </button>

      <button
        type="button"
        role="tab"
        class="compact-tab"
        class:compact-tab--active={activeTab === "log"}
        aria-selected={activeTab === "log"}
        onclick={() => (activeTab = "log")}
      >
        <ScrollText class="size-4" />
        <span>{eventLogTitle}</span>
        <span class="compact-tab-badge">{moveLogEntries.length}</span>
      </button>
    </div>

    <div class="compact-panels-body">
      {#if activeTab === "moves"}
        <AvailableMovesPanel
          moves={executableMoves}
          supplementalActions={sidebar.resolutionActions}
          interactiveSide={ownerSide}
          activeSide={activeSide ?? undefined}
          {showRawLogRegistryJson}
          activePlayerGuidance={sidebar.activePlayerGuidanceController}
          onStartManualMoveSelection={({ id, moves }) =>
            sidebar.startManualCardActionSelection(id, moves)}
          onResetManualMoveSelection={sidebar.cancelManualCardActionSelection}
          onExecuteMove={sidebar.handleAvailableMoveClick}
        />
      {:else}
        <EventLogPanel
          entries={moveLogEntries}
          viewerSide={ownerSide}
          {showRawLogRegistryJson}
          onCardHover={sidebar.handleLogCardHover}
          onCardLeave={sidebar.handleLogCardLeave}
        />
      {/if}
    </div>
  </Sheet.Content>
</Sheet.Root>

<style>
  :global(.compact-panels-sheet) {
    max-height: min(68vh, 38rem);
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    padding: 0;
    overflow: hidden;
    box-shadow: 0 -24px 60px rgba(2, 6, 23, 0.72);
  }

  :global(.compact-panels-sheet [data-slot="sheet-header"]) {
    gap: 0.2rem;
    padding: 1rem 1rem 0.75rem;
  }

  :global(.compact-panels-title) {
    font-size: 0.95rem;
    font-weight: 800;
    color: #eff6ff;
  }

  :global(.compact-panels-description) {
    font-size: 0.72rem;
    color: rgba(191, 219, 254, 0.7);
  }

  .compact-panels-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
    padding: 0 1rem 0.9rem;
  }

  .compact-tab {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 2.75rem;
    border-radius: 999px;
    border: 1px solid rgba(125, 211, 252, 0.18);
    background: rgba(15, 23, 42, 0.86);
    color: rgba(226, 232, 240, 0.86);
    font-size: 0.82rem;
    font-weight: 700;
    transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
  }

  .compact-tab--active {
    border-color: rgba(125, 211, 252, 0.62);
    background: linear-gradient(180deg, rgba(14, 116, 144, 0.9), rgba(8, 47, 73, 0.92));
    color: #f8fbff;
  }

  .compact-tab-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.4rem;
    min-height: 1.4rem;
    padding: 0 0.35rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    font-size: 0.72rem;
    line-height: 1;
  }

  .compact-panels-body {
    min-height: 0;
    max-height: calc(min(68vh, 38rem) - 8.25rem);
    padding: 0 1rem calc(1rem + env(safe-area-inset-bottom));
    overflow-y: auto;
  }

  .compact-panels-body :global(.available-moves-panel),
  .compact-panels-body :global(.event-log) {
    min-height: auto;
  }

  @media (max-width: 767px) {
    :global(.compact-panels-sheet) {
      max-height: min(74vh, 42rem);
    }

    .compact-panels-body {
      max-height: calc(min(74vh, 42rem) - 8.25rem);
    }
  }
</style>
