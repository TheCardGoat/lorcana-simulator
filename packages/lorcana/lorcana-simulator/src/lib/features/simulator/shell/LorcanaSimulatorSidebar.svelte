<script lang="ts">
  import { m } from "$lib/paraglide/messages.js";
  import * as Sidebar from "$lib/design-system/primitives/sidebar";
  import {AvailableMovesPanel, EventLogPanel, PlayerInfo} from "@/features/simulator/index.js";
  import PlayerSettingsDialog from "@/features/simulator/dialogs/PlayerSettingsDialog.svelte";
  import {useSimulatorCardContext} from "@/features/simulator/context/simulator-card-context.svelte.js";
  import {useLorcanaSidebarPresenter} from "@/features/simulator/context/game-context.svelte.js";

  const sidebar = useLorcanaSidebarPresenter();
  const simulatorCardContext = useSimulatorCardContext();

  const boardSnapshot = $derived(sidebar.boardSnapshot);
  const topSide = $derived(sidebar.topSide);
  const bottomSide = $derived(sidebar.bottomSide);
  const hasOwnedView = $derived(sidebar.hasOwnedView);
  const headerPlayerData = $derived(sidebar.headerPlayerData);
  const footerPlayerData = $derived(sidebar.footerPlayerData);
  const executableMoves = $derived(sidebar.executableMoves);
  const moveLogEntries = $derived(sidebar.moveLogEntries);
  const ownerSide = $derived(sidebar.ownerSide);
  const activeSide = $derived(sidebar.activeSide);
  const showRawLogRegistryJson = $derived(sidebar.showRawLogRegistryJson);
  const hoveredLogCard = $derived(sidebar.hoveredLogCard);

  $effect(() => {
    simulatorCardContext.setExternalPreviewCard(hoveredLogCard);
  });
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
      />
    {/if}
  </Sidebar.Header>

  <Sidebar.Content class="sidebar-content-body">
    <div class="sidebar-content-stack">
      <EventLogPanel
        entries={moveLogEntries}
        viewerSide={ownerSide}
        {showRawLogRegistryJson}
        onCardHover={sidebar.handleLogCardHover}
        onCardLeave={sidebar.handleLogCardLeave}
      />

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
        onSettingsClick={sidebar.handleOpenPlayerSettings}
      />
    {/if}
  </Sidebar.Footer>

  <Sidebar.Rail />
</Sidebar.Root>

<PlayerSettingsDialog
  bind:open={sidebar.isPlayerSettingsOpen}
  selectedLocale={sidebar.selectedLocale}
  {showRawLogRegistryJson}
  skipActionConfirmation={sidebar.skipActionConfirmation}
  onLocaleSelection={sidebar.handleLocaleSelection}
  onToggleRawLogRegistryJson={sidebar.handleRawLogRegistryToggle}
  onToggleSkipActionConfirmation={sidebar.handleSkipActionConfirmationToggle}
/>

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
    padding: 0.5rem 0.5rem 0.45rem;
    flex-shrink: 0;
  }

  :global(.sidebar-footer-sticky) {
    position: sticky;
    bottom: 0;
    z-index: 10;
    background: rgba(9, 16, 28, 0.92);
    border-top: 1px solid rgba(113, 154, 204, 0.3);
    padding: 0.45rem 0.5rem 0.5rem;
    margin-top: auto;
    flex-shrink: 0;
  }

  :global(.sidebar-content-body) {
    flex: 1;
    min-height: 0;
    padding: 0.45rem 0.5rem 0.55rem;
    overflow: hidden;
  }

  .sidebar-content-stack {
    display: grid;
    grid-template-rows: minmax(10rem, 1fr) minmax(10rem, 1fr);
    gap: 0.45rem;
    height: 100%;
    min-height: 0;
  }
</style>
