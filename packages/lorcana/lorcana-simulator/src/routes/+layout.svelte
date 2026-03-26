<script lang="ts">
	import '../lib/app.css';
	import { page } from '$app/state';
	import { configureCoreSimulatorLogging } from '$lib/logtape/logger';
	import { locales, localizeHref } from '$lib/paraglide/runtime.js';
	import * as Tooltip from '$lib/design-system/primitives/tooltip/index.js';

	configureCoreSimulatorLogging();

	let { children } = $props();
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

export const ssr = false;