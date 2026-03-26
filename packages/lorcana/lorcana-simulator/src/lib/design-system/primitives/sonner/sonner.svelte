<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import InfoIcon from "@lucide/svelte/icons/info";
	import Loader2Icon from "@lucide/svelte/icons/loader-2";
	import OctagonXIcon from "@lucide/svelte/icons/octagon-x";
	import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";

	import { Toaster as Sonner, type ToasterProps as SonnerProps } from "svelte-sonner";
	import { mode } from "mode-watcher";

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	class="toaster group"
	style="--normal-bg: rgba(7, 18, 31, 0.96); --normal-text: #e5edf7; --normal-border: rgba(108, 145, 192, 0.3);"
	{...restProps}
	>{#snippet loadingIcon()}
		<Loader2Icon class="size-4 animate-spin" />
	{/snippet}
	{#snippet successIcon()}
		<CircleCheckIcon class="size-4" />
	{/snippet}
	{#snippet errorIcon()}
		<OctagonXIcon class="size-4" />
	{/snippet}
	{#snippet infoIcon()}
		<InfoIcon class="size-4" />
	{/snippet}
	{#snippet warningIcon()}
		<TriangleAlertIcon class="size-4" />
	{/snippet}
</Sonner>

<style>
	:global(.toaster [data-sonner-toaster]) {
		--normal-bg: rgba(7, 18, 31, 0.96);
		--normal-text: #e5edf7;
		--normal-border: rgba(108, 145, 192, 0.3);
	}

	:global(.toaster [data-sonner-toast]) {
		background:
			linear-gradient(180deg, rgba(12, 24, 39, 0.98), rgba(8, 17, 28, 0.98)) !important;
		border: 1px solid rgba(108, 145, 192, 0.3) !important;
		color: #e5edf7 !important;
		box-shadow: 0 18px 42px rgba(2, 8, 18, 0.42) !important;
	}

	:global(.toaster [data-sonner-toast] [data-title]) {
		color: #f8fafc !important;
	}

	:global(.toaster [data-sonner-toast] [data-description]) {
		color: #9fb2c9 !important;
	}
</style>
