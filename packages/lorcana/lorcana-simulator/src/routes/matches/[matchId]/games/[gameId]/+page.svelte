<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '$lib/design-system/primitives/card';
  import { Button } from '$lib/design-system/primitives/button';
  import { onMount, onDestroy } from 'svelte';
  import { immersiveExperience } from '$lib/features/immersive/immersive-state.svelte.js';
  import LocalMatchMode from './modes/LocalMatchMode.svelte';
  import SpectatorMatchMode from './modes/SpectatorMatchMode.svelte';
  import BotMatchMode from './modes/BotMatchMode.svelte';
  import HumanVsHumanMode from './modes/HumanVsHumanMode.svelte';
  import type { GamePageData } from './+page.server.js';
  import AntiRamp from "@tcg/shared/ads/AntiRamp";

  let { data }: { data: GamePageData } = $props();

  onMount(() => {
    const detachImmersive = immersiveExperience.attach();
    immersiveExperience.activateRouteChrome();
    return () => {
      detachImmersive();
      immersiveExperience.deactivateRouteChrome();
    };
  });

  onDestroy(() => {
    immersiveExperience.deactivateRouteChrome();
  });
</script>

<AntiRamp />
<main class="immersive-app-shell relative h-screen min-h-0 text-slate-100">
  {#if data.mode === 'error'}
    <div class="mx-auto flex h-full max-w-3xl items-center justify-center px-4 py-8">
      <Card class="w-full border-rose-400/20 bg-slate-950/88 text-slate-100">
        <CardHeader>
          <CardTitle>Match failed to load</CardTitle>
          <CardDescription class="text-rose-200">{data.message}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onclick={() => goto('/matchmaking')}>Back to matchmaking</Button>
        </CardContent>
      </Card>
    </div>
  {:else if data.mode === 'local'}
    <LocalMatchMode />
  {:else}
    {#key data.gameId}
      {#if data.spectate}
        <SpectatorMatchMode {data} />
      {:else if data.gameSubMode === 'bot'}
        <BotMatchMode {data} />
      {:else}
        <HumanVsHumanMode {data} />
      {/if}
    {/key}
  {/if}
</main>
