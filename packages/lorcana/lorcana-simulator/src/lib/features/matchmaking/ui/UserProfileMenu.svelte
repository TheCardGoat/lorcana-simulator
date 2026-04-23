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
	import Settings from "@lucide/svelte/icons/settings";
	import UserCog from "@lucide/svelte/icons/user-cog";

	let {
		user,
		onSignedOut,
		onOpenSettings,
		onOpenAccountSettings,
		signOutInMenu = true,
		settingsInMenu = false,
		triggerClass = "",
	}: {
		user: AuthUser;
		onSignedOut?: () => void | Promise<void>;
		onOpenSettings?: () => void;
		onOpenAccountSettings?: () => void;
		signOutInMenu?: boolean;
		settingsInMenu?: boolean;
		triggerClass?: string;
	} = $props();

	const displayName = $derived(user.displayUsername ?? user.name ?? "Player");

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
				class="flex h-11 min-h-11 min-w-0 max-w-[15rem] shrink-0 items-center justify-start gap-2.5 rounded-none border-0 bg-transparent px-2 py-0 text-left text-sm font-semibold text-slate-100 shadow-none hover:bg-white/10 hover:text-white sm:max-w-[18rem] {triggerClass}"
				{...props}
			>
				<span class="min-w-0 flex-1 pe-1">
					<span class="block truncate text-sm font-semibold">{displayName}</span>
				</span>
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
			{#if settingsInMenu}
				<DropdownMenuSeparator />
				<DropdownMenuItem onclick={onOpenSettings}>
					<Settings class="mr-2 size-4" />
					{m["sim.settings.title"]({})}
				</DropdownMenuItem>
				<DropdownMenuItem onclick={onOpenAccountSettings}>
					<UserCog class="mr-2 size-4" />
					{m["sim.accountSettings.title"]({})}
				</DropdownMenuItem>
			{/if}
			{#if signOutInMenu}
				<DropdownMenuSeparator />
				<DropdownMenuItem onclick={handleSignOut}>
					<LogOut class="mr-2 size-4" />
					{m["sim.auth.signOut"]({})}
				</DropdownMenuItem>
			{/if}
		</DropdownMenuContent>
	</DropdownMenuPortal>
</DropdownMenu>
