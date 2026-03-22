<script lang="ts">
  import MatchmakingLobby from "$lib/features/matchmaking/ui/MatchmakingLobby.svelte";
  import ImmersiveStartCard from "$lib/features/matchmaking/ui/ImmersiveStartCard.svelte";
  import { immersiveExperience } from "$lib/features/immersive/immersive-state.svelte.js";
  import { MatchmakingInstallNudgeState } from "$lib/features/matchmaking/state/install-nudge.svelte.js";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte.js";
  import { m } from "$lib/i18n/messages.js";
  import { onDestroy, onMount } from "svelte";

  const PAGE_TITLE = "Lorcana Simulator Matchmaking";
  const isMobile = new IsMobile();
  const installNudge = new MatchmakingInstallNudgeState();
  let ready = $state(false);

  const showImmersiveStart = $derived(
    ready && isMobile.current && !immersiveExperience.hasStartedSession && !immersiveExperience.isStandalone,
  );

  onMount(() => {
    const detach = immersiveExperience.attach();
    const detachInstallNudge = installNudge.attach();
    immersiveExperience.activateRouteChrome();
    ready = true;

    return () => {
      detach();
      detachInstallNudge();
      immersiveExperience.deactivateRouteChrome();
    };
  });

  onDestroy(() => {
    immersiveExperience.deactivateRouteChrome();
  });
</script>

<svelte:head>
  <title>{PAGE_TITLE}</title>
  <meta
    name="description"
    content={m["sim.meta.description"]({})}
  />
  <meta name="theme-color" content="#020617" />
</svelte:head>

<main class="immersive-app-shell simulator-dark min-h-screen min-h-dvh bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),linear-gradient(180deg,#020617_0%,#020617_46%,#030712_100%)]">
  {#if showImmersiveStart}
    <div class="mx-auto w-full max-w-7xl px-3 pb-3 pt-[calc(0.75rem+env(safe-area-inset-top))] sm:px-4">
      <ImmersiveStartCard
        immersive={immersiveExperience}
        {installNudge}
        onStart={() => {
          ready = true;
        }}
      />
    </div>
  {/if}
  <MatchmakingLobby />
</main>
