<script lang="ts">
  import OctagonX from "@lucide/svelte/icons/octagon-x";
  import Undo2 from "@lucide/svelte/icons/undo-2";
  import { Button } from "$lib/design-system/primitives/button";
  import * as Dialog from "$lib/design-system/primitives/dialog";
  import * as Sidebar from "$lib/design-system/primitives/sidebar";
  import { m } from "$lib/i18n/messages.js";
  import { useLorcanaSidebarPresenter } from "@/features/simulator/context/game-context.svelte.js";
  import type { ConfirmableDirectMoveCategoryId } from "@/features/simulator/model/direct-action-state.js";
  import EventLogPanel from "@/features/simulator/panels/EventLogPanel.svelte";
  import PlayerInfo from "@/features/simulator/panels/PlayerInfo.svelte";
  import { useHumanVsAiOrchestrator } from "@/features/simulator-devtools/vs-ai/context.js";
  import AiPlayerControls from "@/features/simulator-devtools/vs-ai/AiPlayerControls.svelte";

  interface LorcanaSimulatorSidebarProps {
    readOnly?: boolean;
    onOpenHotkeys?: () => void;
    onOpenSupport?: () => void;
    supportReminderText?: string | null;
    onDismissSupportReminder?: () => void;
    pendingDirectMoveCategoryId?: ConfirmableDirectMoveCategoryId | null;
    onTriggerUndo?: (() => void) | null;
  }

  let {
    readOnly = false,
    onOpenHotkeys,
    onOpenSupport,
    supportReminderText = null,
    onDismissSupportReminder,
    pendingDirectMoveCategoryId = null,
    onTriggerUndo = null,
  }: LorcanaSimulatorSidebarProps = $props();

  const sidebar = useLorcanaSidebarPresenter();
  const aiOrchestratorStore = useHumanVsAiOrchestrator();

  const boardSnapshot = $derived(sidebar.boardSnapshot);
  const topSide = $derived(sidebar.topSide);
  const bottomSide = $derived(sidebar.bottomSide);
  const hasOwnedView = $derived(sidebar.hasOwnedView);
  const headerPlayerData = $derived(sidebar.headerPlayerData);
  const footerPlayerData = $derived(sidebar.footerPlayerData);
  const moveLogEntries = $derived(sidebar.moveLogEntries);
  const ownerSide = $derived(sidebar.ownerSide);
  const activeSide = $derived(sidebar.activeSide);
  const showRawLogRegistryJson = $derived(sidebar.showRawLogRegistryJson);
  const canUndo = $derived(
    !readOnly && sidebar.moveCategorySummaries.some((summary) => summary.categoryId === "undo"),
  );
  const canConcede = $derived(!readOnly && sidebar.canConcede);
  const undoArmed = $derived(pendingDirectMoveCategoryId === "undo");
  const undoLabel = $derived(
    undoArmed
      ? m["sim.actions.confirmMoveLabel"]({ label: m["sim.actions.label.undo"]({}) })
      : m["sim.actions.label.undo"]({}),
  );
  const concedeLabel = $derived(m["sim.actions.label.concede"]({}));

  let concedeDialogOpen = $state(false);

  function handleUndoClick(): void {
    if (!canUndo) {
      return;
    }

    onTriggerUndo?.();
  }

  function openConcedeDialog(): void {
    if (!canConcede) {
      return;
    }

    concedeDialogOpen = true;
  }

  function closeConcedeDialog(): void {
    concedeDialogOpen = false;
  }

  function confirmConcede(): void {
    concedeDialogOpen = false;
    sidebar.handleMobileConcede();
  }
</script>

<Sidebar.Root collapsible="offcanvas" variant="sidebar" side="left">
  <Sidebar.Header class="sidebar-header-sticky">
    {#if boardSnapshot && headerPlayerData}
      <PlayerInfo
        name={hasOwnedView ? m["sim.player.opponent"]({}) : m["sim.player.side.playerTwo"]({})}
        seat="top"
        side={topSide}
        lore={headerPlayerData.lore}
        deckCount={headerPlayerData.deckCount}
        handCount={headerPlayerData.handCount}
        discardCount={headerPlayerData.discardCount}
        inkwellCount={headerPlayerData.inkwellCount}
        availableInk={headerPlayerData.availableInk}
        isActive={activeSide === topSide}
        isOpponent={hasOwnedView}
        timer={headerPlayerData.timer}
      >
        {#if $aiOrchestratorStore}
          <AiPlayerControls orchestrator={$aiOrchestratorStore} />
        {/if}
      </PlayerInfo>
    {/if}
  </Sidebar.Header>

  <Sidebar.Content class="sidebar-content-body">
    <div class="sidebar-content-stack">
      <EventLogPanel
        entries={moveLogEntries}
        viewerSide={ownerSide}
        {showRawLogRegistryJson}
      />

      <div class="sidebar-action-strip" aria-label={m["sim.sidebar.actions.aria"]({})}>
        <Button
          variant="outline"
          class={`sidebar-action-button sidebar-action-button--undo${undoArmed ? " sidebar-action-button--armed" : ""}`}
          onclick={handleUndoClick}
          disabled={!canUndo}
          aria-label={canUndo ? undoLabel : "Undo unavailable"}
          title={canUndo ? undoLabel : "Undo unavailable"}
        >
          <Undo2 class="size-4" />
          <span>{undoLabel}</span>
        </Button>

        <Button
          variant="outline"
          class="sidebar-action-button sidebar-action-button--concede"
          onclick={openConcedeDialog}
          disabled={!canConcede}
          aria-label={canConcede ? concedeLabel : "Concede unavailable"}
          title={canConcede ? concedeLabel : "Concede unavailable"}
        >
          <OctagonX class="size-4" />
          <span>{concedeLabel}</span>
        </Button>
      </div>
    </div>
  </Sidebar.Content>

  <Sidebar.Footer class="sidebar-footer-sticky">
    {#if boardSnapshot && footerPlayerData}
      <PlayerInfo
        seat="bottom"
        name={hasOwnedView ? m["sim.player.you"]({}) : m["sim.player.side.playerOne"]({})}
        side={bottomSide}
        lore={footerPlayerData.lore}
        deckCount={footerPlayerData.deckCount}
        handCount={footerPlayerData.handCount}
        discardCount={footerPlayerData.discardCount}
        inkwellCount={footerPlayerData.inkwellCount}
        availableInk={footerPlayerData.availableInk}
        isActive={activeSide === bottomSide}
        isOpponent={false}
        showSettings
        showSupport
        timer={footerPlayerData.timer}
        onSettingsClick={sidebar.handleOpenPlayerSettings}
        onSupportClick={onOpenSupport}
        {supportReminderText}
        onDismissSupportReminder={onDismissSupportReminder}
      />
    {/if}
  </Sidebar.Footer>

  <Sidebar.Rail />
</Sidebar.Root>

<Dialog.Root bind:open={concedeDialogOpen}>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content class="sidebar-concede-dialog" showCloseButton={false}>
      <Dialog.Header class="sidebar-concede-dialog__header">
        <Dialog.Title class="sidebar-concede-dialog__title">
          {m["sim.sidebar.concedeDialog.title"]({})}
        </Dialog.Title>
        <Dialog.Description class="sidebar-concede-dialog__description">
          {m["sim.sidebar.concedeDialog.description"]({})}
        </Dialog.Description>
      </Dialog.Header>

      <Dialog.Footer class="sidebar-concede-dialog__footer">
        <Button
          variant="outline"
          class="sidebar-concede-dialog__button"
          onclick={closeConcedeDialog}
        >
          {m["sim.actions.cancel"]({})}
        </Button>
        <Button
          variant="destructive"
          class="sidebar-concede-dialog__button"
          onclick={confirmConcede}
        >
          {m["sim.actions.label.concede"]({})}
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  :global([data-sidebar="sidebar"]) {
    background: rgba(9, 16, 28, 0.92) !important;
    border-right: 1px solid rgba(113, 154, 204, 0.3);
  }

  :global(.sidebar-header-sticky) {
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(9, 16, 28, 0.92);
    border-bottom: 1px solid rgba(113, 154, 204, 0.3);
    padding: 0.35rem 0.4rem;
    flex-shrink: 0;
  }

  :global(.sidebar-footer-sticky) {
    position: sticky;
    bottom: 0;
    z-index: 10;
    background: rgba(9, 16, 28, 0.92);
    border-top: 1px solid rgba(113, 154, 204, 0.3);
    padding: 0.35rem 0.4rem;
    margin-top: auto;
    flex-shrink: 0;
  }

  :global(.sidebar-content-body) {
    flex: 1;
    min-height: 0;
    padding: 0.25rem 0.4rem;
    overflow: hidden;
  }

  .sidebar-content-stack {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    height: 100%;
    min-height: 0;
  }

  .sidebar-content-stack > * {
    min-height: 0;
  }

  .sidebar-content-stack > :first-child {
    flex: 1 1 0;
  }

  .sidebar-action-strip {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    border-top: 1px solid rgba(109, 149, 195, 0.16);
    padding-top: 0.45rem;
  }

  :global(.sidebar-action-button) {
    min-height: 2.4rem;
    justify-content: center;
    gap: 0.45rem;
    border-radius: 0.9rem;
    font-size: 0.78rem;
    font-weight: 800;
  }

  :global(.sidebar-action-button--undo) {
    border-color: rgba(125, 211, 252, 0.22);
    background:
      linear-gradient(180deg, rgba(8, 47, 73, 0.88), rgba(15, 23, 42, 0.96));
    color: #e0f2fe;
  }

  :global(.sidebar-action-button--concede) {
    border-color: rgba(153, 27, 27, 0.42);
    background:
      linear-gradient(180deg, rgba(69, 10, 10, 0.76), rgba(28, 25, 23, 0.94));
    color: #fee2e2;
  }

  :global(.sidebar-action-button--armed) {
    border-color: rgba(251, 191, 36, 0.58);
    box-shadow:
      0 0 0 1px rgba(251, 191, 36, 0.22),
      inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  :global(.sidebar-action-button:disabled) {
    border-color: rgba(148, 163, 184, 0.18);
    background: rgba(15, 23, 42, 0.34);
    color: rgba(148, 163, 184, 0.78);
    opacity: 1;
  }

  :global(.sidebar-concede-dialog) {
    max-width: 24rem;
  }

  :global(.sidebar-concede-dialog__header) {
    gap: 0.45rem;
  }

  :global(.sidebar-concede-dialog__title) {
    font-size: 1rem;
    font-weight: 800;
  }

  :global(.sidebar-concede-dialog__description) {
    color: rgba(71, 85, 105, 1);
  }

  :global(.sidebar-concede-dialog__footer) {
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
  }

  :global(.sidebar-concede-dialog__button) {
    min-width: 7rem;
  }
</style>
