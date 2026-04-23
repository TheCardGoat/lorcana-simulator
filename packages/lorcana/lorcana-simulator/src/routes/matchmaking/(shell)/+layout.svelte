<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import SignInDialog from '$lib/features/matchmaking/ui/SignInDialog.svelte';
  import PlayerSettingsDialog from '$lib/features/simulator/dialogs/PlayerSettingsDialog.svelte';
  import AccountSettingsDialog from '$lib/features/matchmaking/ui/AccountSettingsDialog.svelte';
  import MatchmakingLobbyHero from '$lib/features/matchmaking/ui/MatchmakingLobbyHero.svelte';
  import MatchmakingLobbyFooter from '$lib/features/matchmaking/ui/MatchmakingLobbyFooter.svelte';
  import {
    createMatchmakingLobbyController,
    setMatchmakingLobbyContext,
  } from '$lib/features/matchmaking/ui/useMatchmakingLobbyController.svelte.js';
  import { immersiveExperience } from '$lib/features/immersive/immersive-state.svelte.js';

  let {
    children,
  }: { children: import('svelte').Snippet } = $props();

  const controller = createMatchmakingLobbyController();
  setMatchmakingLobbyContext(controller);

  onMount(() => {
    const detach = immersiveExperience.attach();
    immersiveExperience.activateRouteChrome();

    void controller.playerSettings.initialize();
    void controller.playerContext.initialize();

    return () => {
      detach();
      immersiveExperience.deactivateRouteChrome();
    };
  });

  onDestroy(() => {
    immersiveExperience.deactivateRouteChrome();
  });
</script>

<svelte:head>
  <meta name="theme-color" content="#020617" />
</svelte:head>

<main
  class="immersive-app-shell simulator-dark relative h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),linear-gradient(180deg,#020617_0%,#020617_46%,#030712_100%)] text-foreground"
>
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.1),transparent_28%)]"
    aria-hidden="true"
  ></div>

  <div
    class="relative flex h-full w-full flex-col gap-4"
  >
    <MatchmakingLobbyHero
      gateway={controller.gateway}
      activeLane={"queue"}
      mobileTabsEnabled={false}
      hasActiveMatch={false}
      selectionDisabled={controller.deckSelection.selectionDisabled}
      isAuthenticated={controller.auth.isAuthenticated}
      isAuthLoading={controller.auth.isLoading}
      user={controller.auth.user}
      onSelectLane={() => {}}
      onResumeMatch={() => {}}
      onOpenSignIn={() => controller.openSignInDialog()}
      onSignedOut={() => controller.reconnectGatewayAnonymous()}
      onOpenSettings={() => {
        controller.playerSettingsOpen = true;
      }}
      onOpenAccountSettings={() => {
        controller.accountSettingsOpen = true;
      }}
    />

    {@render children()}

    <MatchmakingLobbyFooter />
  </div>

  <SignInDialog bind:open={controller.signInDialogOpen} />
  <PlayerSettingsDialog
    bind:open={controller.playerSettingsOpen}
    selectedLocale={controller.playerSettings.selectedLocale}
    skipActionConfirmation={controller.playerSettings.skipActionConfirmation}
    hotkeyMode={controller.playerSettings.hotkeyMode}
    cardPreviewMode={controller.playerSettings.cardPreviewMode}
    primaryClickAction={controller.playerSettings.primaryClickAction}
    animationSpeed={controller.playerSettings.animationSpeed}
    soundVolume={controller.playerSettings.soundVolume}
    accessibleMobileControls={controller.playerSettings
      .accessibleMobileControls}
    onLocaleSelection={controller.playerSettings.handleLocaleSelection}
    onToggleSkipActionConfirmation={controller.playerSettings
      .handleSkipActionConfirmationToggle}
    onHotkeyModeChange={controller.playerSettings.handleHotkeyModeChange}
    onCardPreviewModeChange={controller.playerSettings
      .handleCardPreviewModeChange}
    onPrimaryClickActionChange={controller.playerSettings
      .handlePrimaryClickActionChange}
    onAnimationSpeedChange={controller.playerSettings
      .handleAnimationSpeedChange}
    onSoundVolumeChange={controller.playerSettings.handleSoundVolumeChange}
    onToggleAccessibleMobileControls={controller.playerSettings
      .handleAccessibleMobileControlsToggle}
    showZoneCounters={controller.playerSettings.showZoneCounters}
    onToggleShowZoneCounters={controller.playerSettings
      .handleShowZoneCountersToggle}
    selectedPlaymat={controller.playerSettings.selectedPlaymat}
    selectedCardBack={controller.playerSettings.selectedCardBack}
    onPlaymatChange={controller.playerSettings.handlePlaymatChange}
    onCardBackChange={controller.playerSettings.handleCardBackChange}
  />
  <AccountSettingsDialog
    bind:open={controller.accountSettingsOpen}
    activeGameProfileId={controller.deckSelection.activeProfile
      ?.gameProfileId ?? null}
  />
</main>
