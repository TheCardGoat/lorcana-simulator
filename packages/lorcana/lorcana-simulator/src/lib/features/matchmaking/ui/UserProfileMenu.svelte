<script lang="ts">
	import type { AuthUser } from "@tcg/shared/auth";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuPortal,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from "$lib/design-system/primitives/dropdown-menu";
	import { Button } from "$lib/design-system/primitives/button";
	import { m } from "$lib/i18n/messages.js";
	import { authSession } from "$lib/auth/session.svelte.js";
	import LogOut from "@lucide/svelte/icons/log-out";

	let {
		user,
		onSignedOut,
		signOutInMenu = true,
		triggerClass = "",
		/** Desktop: sign-out lives in parent bar; keep in menu below `lg` only. */
		barSignOut = false,
	}: {
		user: AuthUser;
		onSignedOut?: () => void | Promise<void>;
		signOutInMenu?: boolean;
		triggerClass?: string;
		barSignOut?: boolean;
	} = $props();

	const displayName = $derived(user.displayUsername ?? user.name ?? "Player");
	const avatarUrl = $derived(user.image ?? null);
	const initials = $derived(
		displayName
			.split(/\s+/)
			.filter(Boolean)
			.map((s) => s[0])
			.join("")
			.slice(0, 2)
			.toUpperCase() || "P",
	);

	async function handleSignOut() {
		await authSession.signOut();
		await onSignedOut?.();
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button
				variant="ghost"
				size="sm"
				class="flex h-11 min-h-11 min-w-0 max-w-[14rem] shrink-0 items-center justify-start gap-2.5 rounded-none border-0 bg-transparent px-2 py-0 text-left text-sm font-semibold text-slate-100 shadow-none hover:bg-white/10 hover:text-white sm:max-w-[18rem] {triggerClass}"
				{...props}
			>
				{#if avatarUrl}
					<img
						src={avatarUrl}
						alt=""
						class="size-8 shrink-0 rounded-full object-cover"
					/>
				{:else}
					<span
						class="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-semibold"
					>
						{initials}
					</span>
				{/if}
				<span class="min-w-0 flex-1 truncate pe-1 text-sm font-semibold">{displayName}</span>
			</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuPortal>
		<DropdownMenuContent align="end" class="w-56">
			<DropdownMenuLabel class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium leading-none">{displayName}</p>
					<p class="text-muted-foreground text-xs leading-none">{user.email}</p>
				</div>
			</DropdownMenuLabel>
			{#if signOutInMenu}
				<DropdownMenuSeparator class={barSignOut ? "lg:hidden" : ""} />
				<DropdownMenuItem
					class={barSignOut ? "lg:hidden" : ""}
					onclick={handleSignOut}
				>
					<LogOut class="mr-2 size-4" />
					{m["sim.auth.signOut"]({})}
				</DropdownMenuItem>
			{/if}
		</DropdownMenuContent>
	</DropdownMenuPortal>
</DropdownMenu>
