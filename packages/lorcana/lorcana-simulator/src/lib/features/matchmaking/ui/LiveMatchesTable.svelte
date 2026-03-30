<script lang="ts">
  import { Badge } from '$lib/design-system/primitives/badge';
  import { Button } from '$lib/design-system/primitives/button';
  import { m } from "$lib/i18n/messages.js";
  import { getInkSymbolUrl } from '$lib/features/simulator/model/asset-urls.js';
  import Eye from '@lucide/svelte/icons/eye';
  import type { LiveMatchesStore } from '../state/live-matches.svelte.js';

  interface Props {
    store: LiveMatchesStore;
  }

  let { store }: Props = $props();

  const remaining = $derived(store.total - store.matches.length);

  let now = $state(Date.now());
  $effect(() => {
    const interval = setInterval(() => { now = Date.now(); }, 10_000);
    return () => clearInterval(interval);
  });

  function handleShowMore(): void {
    store.showMore();
  }

  function formatScore(p1: number, p2: number): string {
    return `${p1}\u2013${p2}`;
  }

  function formatDuration(createdAt: string, currentTime: number): string {
    const diffMs = currentTime - new Date(createdAt).getTime();
    const minutes = Math.floor(diffMs / 60_000);
    if (minutes < 1) return '<1m';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h${minutes % 60}m`;
  }
</script>

<div class="space-y-3">
  <div class="flex items-center gap-2">
    <span class="relative flex size-2.5">
      <span
        class="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"
      ></span>
      <span class="relative inline-flex size-2.5 rounded-full bg-red-500"
      ></span>
    </span>
    <h3 class="text-sm font-semibold uppercase tracking-widest text-slate-200">
      {m['sim.matchmaking.liveGames.title']({})}
    </h3>
    {#if store.total > 0}
      <Badge
        variant="secondary"
        class="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold text-white shadow-none"
      >
        {store.total}
      </Badge>
    {/if}
  </div>

  {#if store.loading && store.matches.length === 0}
    <div class="space-y-2">
      {#each { length: 3 } as _}
        <div class="h-8 animate-pulse rounded-md bg-white/5"></div>
      {/each}
    </div>
  {:else if store.matches.length === 0}
    <p class="py-4 text-center text-sm text-slate-400">
      {m['sim.matchmaking.liveGames.empty']({})}
    </p>
  {:else}
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr
            class="border-b border-white/10 text-left text-xs font-medium uppercase tracking-wider text-slate-400"
          >
            <th class="pb-2 pr-2">
              {m['sim.matchmaking.liveGames.col.player1']({})}
            </th>
            <th class="pb-2 px-2 text-center">
              {m['sim.matchmaking.liveGames.col.score']({})}
            </th>
            <th class="pb-2 px-2">
              {m['sim.matchmaking.liveGames.col.player2']({})}
            </th>
            <th class="pb-2 px-2 text-center">
              {m['sim.matchmaking.liveGames.col.turn']({})}
            </th>
            <th class="pb-2 px-2 text-center">
              {m['sim.matchmaking.liveGames.col.time']({})}
            </th>
            <th class="pb-2 px-2 text-center">
              {m['sim.matchmaking.liveGames.col.format']({})}
            </th>
            <th class="pb-2 pl-2 text-center">
              {m['sim.matchmaking.liveGames.col.spectate']({})}
            </th>
          </tr>
        </thead>
        <tbody>
          {#each store.matches as match (match.matchId)}
            <tr
              class="border-b border-white/5 transition-colors hover:bg-white/5 {match.currentGameId ? 'cursor-pointer' : ''}"
              onclick={() => { if (match.currentGameId) window.open(`/spectate/${match.currentGameId}`, '_blank'); }}
              role={match.currentGameId ? 'link' : undefined}
            >
              <td class="max-w-[9rem] py-2 pr-2 font-medium text-slate-200">
                <div class="flex items-center gap-1.5 truncate">
                  {#each match.player1Inks as ink}
                    <img
                      src={getInkSymbolUrl(ink)}
                      alt={ink}
                      title={ink}
                      class="size-4 shrink-0"
                    />
                  {/each}
                  <span class="truncate">{match.player1.displayName}</span>
                </div>
              </td>
              <td class="whitespace-nowrap py-2 px-2 text-center font-mono text-xs text-slate-300">
                {formatScore(match.player1Score, match.player2Score)}
              </td>
              <td class="max-w-[9rem] py-2 px-2 font-medium text-slate-200">
                <div class="flex items-center gap-1.5 truncate">
                  {#each match.player2Inks as ink}
                    <img
                      src={getInkSymbolUrl(ink)}
                      alt={ink}
                      title={ink}
                      class="size-4 shrink-0"
                    />
                  {/each}
                  <span class="truncate">{match.player2.displayName}</span>
                </div>
              </td>
              <td class="whitespace-nowrap py-2 px-2 text-center font-mono text-xs text-slate-400">
                {match.turnNumber || '\u2014'}
              </td>
              <td class="whitespace-nowrap py-2 px-2 text-center text-xs text-slate-400">
                {formatDuration(match.createdAt, now)}
              </td>
              <td class="py-2 px-2 text-center">
                <Badge
                  variant="outline"
                  class="border-white/10 px-1.5 py-0 text-[0.6rem] text-slate-400"
                >
                  {match.format === 'best_of_3'
                    ? m['sim.matchmaking.liveGames.formatBo3']({})
                    : m['sim.matchmaking.liveGames.formatBo1']({})}
                </Badge>
              </td>
              <td class="py-2 pl-2 text-center">
                <span class="inline-flex items-center gap-1 px-2 py-1 text-xs {match.currentGameId ? 'text-sky-200' : 'text-slate-500'}">
                  <Eye class="size-3.5" />
                  <span class="tabular-nums">{match.spectatorCount}</span>
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    {#if remaining > 0}
      <Button
        variant="ghost"
        size="sm"
        class="w-full text-xs text-slate-400 hover:text-white"
        onclick={handleShowMore}
      >
        {m['sim.matchmaking.liveGames.showMore']({ count: remaining })}
      </Button>
    {/if}
  {/if}
</div>
