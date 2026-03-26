<script lang="ts">
  import { m } from "$lib/i18n/messages.js";
  import * as Sidebar from "$lib/design-system/primitives/sidebar";
  import EmptyState from "@/design-system/simulator/display/EmptyState.svelte";
  import {AvailableMovesPanel, EventLogPanel, PlayerInfo} from "@/features/simulator/index.js";
  import PlayerSettingsDialog from "@/features/simulator/dialogs/PlayerSettingsDialog.svelte";
  import SimulatorSupportDialog from "@/features/simulator/dialogs/SimulatorSupportDialog.svelte";
  import {useSimulatorCardContext} from "@/features/simulator/context/simulator-card-context.svelte.js";
  import {useLorcanaSidebarPresenter} from "@/features/simulator/context/game-context.svelte.js";
  import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
  import { bugReportContextFromBoard } from "@/features/simulator/support/feedback-api.js";
  import { useHumanVsAiOrchestrator } from "@/features/simulator-devtools/vs-ai/context.js";
  import AiPlayerControls from "@/features/simulator-devtools/vs-ai/AiPlayerControls.svelte";

  interface LorcanaSimulatorSidebarProps {
    readOnly?: boolean;
    onOpenHotkeys?: () => void;
  }

  let { readOnly = false, onOpenHotkeys }: LorcanaSimulatorSidebarProps = $props();

  const sidebar = useLorcanaSidebarPresenter();
  const aiOrchestratorStore = useHumanVsAiOrchestrator();
  const simulatorCardContext = useSimulatorCardContext();

  function handleCardHover(card: LorcanaCardSnapshot): void {
    simulatorCardContext.setExternalPreviewCard(card);
  }

  function handleCardLeave(): void {
    simulatorCardContext.setExternalPreviewCard(null);
  }

  const boardSnapshot = $derived(sidebar.boardSnapshot);
  const topSide = $derived(sidebar.topSide);
  const bottomSide = $derived(sidebar.bottomSide);
  const hasOwnedView = $derived(sidebar.hasOwnedView);
  const headerPlayerData = $derived(sidebar.headerPlayerData);
  const footerPlayerData = $derived(sidebar.footerPlayerData);
  const moveCategorySummaries = $derived(sidebar.moveCategorySummaries);
  const moveLogEntries = $derived(sidebar.moveLogEntries);
  const ownerSide = $derived(sidebar.ownerSide);
  const activeSide = $derived(sidebar.activeSide);
  const showRawLogRegistryJson = $derived(sidebar.showRawLogRegistryJson);
  const availableMovesSelectionState = $derived(sidebar.availableMovesSelectionState);

  const sidebarSelectionState = $derived(
    availableMovesSelectionState?.mode === "resolution-scry" ? null : availableMovesSelectionState,
  );
  let supportDialogOpen = $state(false);

  const bugReportContext = $derived(bugReportContextFromBoard(boardSnapshot));
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

      {#if readOnly}
        <div class="sidebar-readonly-state">
          <p class="sidebar-readonly-title">{m["sim.postGame.actionsLocked"]({})}</p>
          <EmptyState
            icon="🏁"
            label={m["sim.postGame.actionsLockedDetail"]({})}
          />
        </div>
      {:else}
        <AvailableMovesPanel
          summaries={moveCategorySummaries}
          onExpandCategory={sidebar.expandCategoryMoves}
          supplementalActions={sidebar.resolutionActions}
          selectionState={sidebarSelectionState}
          interactiveSide={ownerSide}
          activeSide={activeSide ?? undefined}
          {showRawLogRegistryJson}
          activePlayerGuidance={sidebar.activePlayerGuidanceController}
          cardSnapshots={sidebar.cardSnapshotsById}
          onCardHover={handleCardHover}
          onCardLeave={handleCardLeave}
          onStartManualMoveSelection={({ id, moves }) =>
            sidebar.startManualCardActionSelection(id, moves)}
          onSelectCard={sidebar.handleAvailableMovesSelectionCard}
          onSelectPlayer={sidebar.handleAvailableMovesSelectionPlayer}
          onSelectOption={sidebar.handleAvailableMovesSelectionOption}
          onResolutionNamedCardQueryInput={sidebar.handleAvailableMovesNamedCardQueryInput}
          onSelectNamedCard={sidebar.handleAvailableMovesNamedCardSelection}
          onAssignScryCard={sidebar.handleAvailableMovesScryAssignment}
          onReorderScryCard={sidebar.handleAvailableMovesScryReorder}
          onBackSelection={sidebar.backActionSelectionSession}
          onCancelSelection={sidebar.cancelActionSelectionSession}
          onConfirmSelection={sidebar.confirmActionSelection}
          onResetManualMoveSelection={sidebar.cancelManualCardActionSelection}
          onExecuteMove={sidebar.handleAvailableMoveClick}
          hotkeyMode={sidebar.hotkeyMode}
        />
      {/if}
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
        onSupportClick={() => {
          supportDialogOpen = true;
        }}
      />
    {/if}
  </Sidebar.Footer>

  <Sidebar.Rail />
</Sidebar.Root>

<PlayerSettingsDialog
  bind:open={sidebar.isPlayerSettingsOpen}
  bugReportContext={bugReportContext}
  selectedLocale={sidebar.selectedLocale}
  {showRawLogRegistryJson}
  skipActionConfirmation={sidebar.skipActionConfirmation}
  hotkeyMode={sidebar.hotkeyMode}
  cardPreviewMode={sidebar.cardPreviewMode}
  onLocaleSelection={sidebar.handleLocaleSelection}
  onToggleRawLogRegistryJson={sidebar.handleRawLogRegistryToggle}
  onToggleSkipActionConfirmation={sidebar.handleSkipActionConfirmationToggle}
  onHotkeyModeChange={sidebar.handleHotkeyModeChange}
  onCardPreviewModeChange={sidebar.handleCardPreviewModeChange}
  primaryClickAction={sidebar.primaryClickAction}
  onPrimaryClickActionChange={sidebar.handlePrimaryClickActionChange}
  animationSpeed={sidebar.animationSpeed}
  onAnimationSpeedChange={sidebar.handleAnimationSpeedChange}
  soundVolume={sidebar.soundVolume}
  onSoundVolumeChange={sidebar.handleSoundVolumeChange}
  accessibleMobileControls={sidebar.accessibleMobileControls}
  onToggleAccessibleMobileControls={sidebar.handleAccessibleMobileControlsToggle}
  {onOpenHotkeys}
/>

<SimulatorSupportDialog bind:open={supportDialogOpen} gameContext={bugReportContext} />

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
    display: grid;
    grid-template-rows: minmax(10rem, 1fr) minmax(10rem, 1fr);
    gap: 0.45rem;
    height: 100%;
    min-height: 0;
  }

  .sidebar-content-stack > :nth-child(2) {
    border-top: 1px solid rgba(109, 149, 195, 0.16);
    padding-top: 0.25rem;
  }

  .sidebar-readonly-state {
    display: grid;
    place-items: center;
    gap: 0.4rem;
    min-height: 0;
    padding: 1rem 0.25rem;
    border-top: 1px solid rgba(109, 149, 195, 0.16);
  }

  .sidebar-readonly-title {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 700;
    color: rgba(226, 232, 240, 0.9);
  }
</style>
