<script lang="ts">
	import '../lib/app.css';
	import { page } from '$app/state';
	import { configureCoreSimulatorLogging } from '$lib/logtape/logger';
	import { locales, localizeHref } from '$lib/paraglide/runtime';

	configureCoreSimulatorLogging();

	let { children } = $props();
</script>

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
