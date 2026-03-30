<script lang="ts">
	import '../lib/app.css';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { authSession } from '$lib/auth/session.svelte.js';
	import { configureCoreSimulatorLogging } from '$lib/logtape/logger';
	import { getApiOrigin } from '$lib/config/public-url-config.js';
	import { locales, localizeHref } from '$lib/paraglide/runtime.js';
	import * as Tooltip from '$lib/design-system/primitives/tooltip/index.js';

	configureCoreSimulatorLogging();

	const DISCORD_JOIN_GUILD_NONCE_KEY = 'discord-join-guild-nonce';

	let { children } = $props();

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

		const storedJoinGuildNonce = window.sessionStorage.getItem(DISCORD_JOIN_GUILD_NONCE_KEY);
		window.sessionStorage.removeItem(DISCORD_JOIN_GUILD_NONCE_KEY);

		if (!joinGuildNonce || !storedJoinGuildNonce || joinGuildNonce !== storedJoinGuildNonce) {
			console.warn('Ignoring Discord guild join callback with invalid nonce');
			return;
		}

		void (async () => {
			try {
				await authSession.fetchSession();
				if (!authSession.isAuthenticated) {
					return;
				}

				const response = await fetch(`${getApiOrigin()}/v1/discord/join-guild`, {
					method: 'POST',
					credentials: 'include',
				});

				if (!response.ok) {
					console.error('Failed to join Discord guild:', response.status);
				}
			} catch (error) {
				console.error('Error joining Discord guild:', error);
			}
		})();
	});
</script>

<Tooltip.Provider>
	<div style="display:none">
		{#each locales as locale}
			<a
				href={localizeHref(page.url.pathname, { locale })}
				data-sveltekit-reload
			>
				{locale}
			</a>
		{/each}
	</div>

	{@render children?.()}
</Tooltip.Provider>
