<script lang="ts">
  import '../lib/app.css';
  import { afterNavigate, goto } from '$app/navigation';
  import { page } from '$app/state';
  import { onMount } from 'svelte';
  import { authSession } from '$lib/auth/session.svelte.js';
  import { configureCoreSimulatorLogging } from '$lib/logtape/logger';
  import { HttpRequestError } from '$lib/data/transport/http-client.js';
  import { joinDiscordGuild } from '$lib/features/auth/discord-api.js';
  import {
    deLocalizeUrl,
    locales,
    localizeHref,
  } from '$lib/paraglide/runtime.js';
  import * as Tooltip from '$lib/design-system/primitives/tooltip/index.js';
  import { initAnalytics, trackPageView } from '$lib/analytics/analytics.js';
  import {
    QueryClientProvider,
    type QueryClient,
  } from '@tanstack/svelte-query';
  import { createSimulatorQueryClient } from '$lib/data/query-client.js';

  configureCoreSimulatorLogging();

  const DISCORD_JOIN_GUILD_NONCE_KEY = 'discord-join-guild-nonce';

  let { children, data } = $props();
  const queryClient: QueryClient = createSimulatorQueryClient();

  // Hydrate auth session eagerly so SSR renders the authenticated state (not a loading spinner).
  // The $effect.pre re-runs on client-side navigations when layout data changes.
  // svelte-ignore state_referenced_locally
  authSession.hydrateFromServer(data.user ?? null, data.session ?? null);
  // $effect.pre(() => {
  // 	authSession.hydrateFromServer(data.user ?? null, data.session ?? null);
  // });

  onMount(() => {
    initAnalytics();
  });

  afterNavigate(({ to }) => {
    if (to?.url) {
      trackPageView(to.url.pathname, deLocalizeUrl);
    }
  });

  onMount(() => {
    const joinGuild = page.url.searchParams.get('join_guild');
    const joinGuildNonce = page.url.searchParams.get('join_guild_nonce');
    if (joinGuild !== 'true') {
      return;
    }

    const cleanUrl = new URL(page.url);
    cleanUrl.searchParams.delete('join_guild');
    cleanUrl.searchParams.delete('join_guild_nonce');
    void goto(cleanUrl.pathname + cleanUrl.search, { replaceState: true });

    const storedJoinGuildNonce = window.sessionStorage.getItem(
      DISCORD_JOIN_GUILD_NONCE_KEY,
    );
    window.sessionStorage.removeItem(DISCORD_JOIN_GUILD_NONCE_KEY);

    if (
      !joinGuildNonce ||
      !storedJoinGuildNonce ||
      joinGuildNonce !== storedJoinGuildNonce
    ) {
      console.warn('Ignoring Discord guild join callback with invalid nonce');
      return;
    }

    void (async () => {
      try {
        await authSession.fetchSession();
        if (!authSession.isAuthenticated) {
          return;
        }

        try {
          await joinDiscordGuild();
        } catch (error) {
          if (error instanceof HttpRequestError) {
            console.error('Failed to join Discord guild:', error.status);
            return;
          }
          throw error;
        }
      } catch (error) {
        console.error('Error joining Discord guild:', error);
      }
    })();
  });
</script>

<Tooltip.Provider>
  <QueryClientProvider client={queryClient}>
    <div style="display:none">
      {#each locales as locale (locale)}
        <a
          href={localizeHref(page.url.pathname, { locale })}
          data-sveltekit-reload
        >
          {locale}
        </a>
      {/each}
    </div>

    {@render children?.()}
  </QueryClientProvider>
</Tooltip.Provider>
