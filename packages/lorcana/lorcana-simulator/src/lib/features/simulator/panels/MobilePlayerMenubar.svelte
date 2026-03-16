<script lang="ts">
  import { Activity, BookOpenText, Clock3, Eye, Settings2, Sparkles, Swords } from "@lucide/svelte";
  import { m } from "$lib/paraglide/messages.js";
  import * as Menubar from "$lib/design-system/primitives/menubar";
  import type {
      LorcanaCardSnapshot,
      LorcanaPlayerSide,
      LorcanaPlayerSummary,
  } from "@/features/simulator/model/contracts.js";

  interface CompactPlayerSummary {
    label: string;
    side: LorcanaPlayerSide;
    summary: LorcanaPlayerSummary | null;
    isActive: boolean;
    isTurnPlayer: boolean;
    hasPriority: boolean;
  }

  interface MobilePlayerMenubarProps {
    seat: "top" | "bottom";
    player: CompactPlayerSummary;
    actionCount?: number;
    pendingCount?: number;
    logCount?: number;
    selectedCard?: LorcanaCardSnapshot | null;
    selectedCardPlayable?: boolean;
    onOpenMoves?: () => void;
    onOpenLog?: () => void;
    onOpenSettings?: () => void;
    onOpenCardPreview?: () => void;
  }

  let {
    seat,
    player,
    actionCount = 0,
    pendingCount = 0,
    logCount = 0,
    selectedCard = null,
    selectedCardPlayable = false,
    onOpenMoves,
    onOpenLog,
    onOpenSettings,
    onOpenCardPreview,
  }: MobilePlayerMenubarProps = $props();

  const loreValue = $derived(player.summary?.lore ?? 0);
  const handCount = $derived(player.summary?.handCount ?? 0);
  const deckCount = $derived(player.summary?.deckCount ?? 0);
  const discardCount = $derived(player.summary?.discardCount ?? 0);
  const inkSummary = $derived(`${player.summary?.availableInk ?? 0}/${player.summary?.inkwellCount ?? 0}`);
  const stateBadges = $derived.by(() => {
    const badges: string[] = [];
    if (player.isActive) {
      badges.push("Active");
    }
    if (player.isTurnPlayer) {
      badges.push("Turn");
    }
    if (player.hasPriority) {
      badges.push("Priority");
    }
    return badges;
  });
  const cardTypeLine = $derived.by(() => {
    if (!selectedCard) {
      return "No card selected";
    }

    const classifications = selectedCard.classifications?.filter(Boolean) ?? [];
    if (classifications.length > 0) {
      return classifications.join(" · ");
    }

    if (!selectedCard.cardType) {
      return "Card";
    }

    return selectedCard.cardType.charAt(0).toUpperCase() + selectedCard.cardType.slice(1);
  });
</script>

<div
        class:rounded-b-2xl={seat === "top"}
        class:rounded-t-2xl={seat === "bottom"}
        class="border border-sky-300/20 bg-slate-950/90 p-1 shadow-[0_14px_36px_rgba(2,6,23,0.36)] backdrop-blur">
  <Menubar.Root class="flex h-auto items-center justify-between gap-1 border-0 bg-transparent p-0 shadow-none">
    <div class="inline-flex min-w-0 items-center gap-2 rounded-xl bg-sky-950/70 px-2.5 py-1.5 text-slate-50 ring-1 ring-inset ring-sky-300/20">
      <span class="text-[0.62rem] font-black uppercase tracking-[0.22em] text-sky-100/70">
        {seat === "top" ? "Opp" : "You"}
      </span>
      <span class="text-base font-black leading-none text-amber-300">{loreValue}</span>
      <span class="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-slate-300/70">
        {m["sim.lore.label"]({})}
      </span>
    </div>

    <div class="flex min-w-0 items-center justify-end gap-1">
      <Menubar.Menu>
        <Menubar.Trigger class="rounded-xl px-2.5 py-1.5 text-[0.75rem] font-semibold text-slate-100">
          Player
        </Menubar.Trigger>
        <Menubar.Content class="w-[16rem] border-sky-300/20 bg-slate-950/96 text-slate-100">
          <div class="space-y-3 p-2">
            <div class="space-y-1">
              <p class="truncate text-sm font-bold text-slate-50">{player.label}</p>
              <p class="text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">{player.side}</p>
            </div>

            {#if stateBadges.length > 0}
              <div class="flex flex-wrap gap-1.5">
                {#each stateBadges as badge (badge)}
                  <span class="inline-flex items-center gap-1 rounded-full bg-sky-400/15 px-2 py-1 text-[0.68rem] font-semibold text-sky-100">
                    <Activity class="size-3.5" />
                    {badge}
                  </span>
                {/each}
              </div>
            {/if}

            <div class="grid grid-cols-2 gap-2 text-xs">
              <div class="rounded-lg bg-slate-900/90 p-2 ring-1 ring-inset ring-slate-700/60">
                <p class="text-slate-400">Hand</p>
                <p class="mt-1 text-sm font-bold text-slate-50">{handCount}</p>
              </div>
              <div class="rounded-lg bg-slate-900/90 p-2 ring-1 ring-inset ring-slate-700/60">
                <p class="text-slate-400">Deck</p>
                <p class="mt-1 text-sm font-bold text-slate-50">{deckCount}</p>
              </div>
              <div class="rounded-lg bg-slate-900/90 p-2 ring-1 ring-inset ring-slate-700/60">
                <p class="text-slate-400">Discard</p>
                <p class="mt-1 text-sm font-bold text-slate-50">{discardCount}</p>
              </div>
              <div class="rounded-lg bg-slate-900/90 p-2 ring-1 ring-inset ring-slate-700/60">
                <p class="text-slate-400">Ink</p>
                <p class="mt-1 text-sm font-bold text-slate-50">{inkSummary}</p>
              </div>
            </div>
          </div>
        </Menubar.Content>
      </Menubar.Menu>

      {#if seat === "top"}
        <Menubar.Menu>
          <Menubar.Trigger class="rounded-xl px-2.5 py-1.5 text-[0.75rem] font-semibold text-slate-100">
            Info
          </Menubar.Trigger>
          <Menubar.Content class="w-[18rem] border-sky-300/20 bg-slate-950/96 text-slate-100">
            <div class="space-y-3 p-2">
              <div class="rounded-xl bg-slate-900/90 p-3 ring-1 ring-inset ring-slate-700/60">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-slate-50">
                      {selectedCard?.label ?? "No card selected"}
                    </p>
                    <p class="mt-1 text-[0.72rem] text-slate-400">{cardTypeLine}</p>
                  </div>
                  {#if selectedCardPlayable}
                    <span class="shrink-0 rounded-full bg-emerald-500/15 px-2 py-1 text-[0.68rem] font-semibold text-emerald-200">
                      Playable
                    </span>
                  {/if}
                </div>
                {#if selectedCard}
                  <div class="mt-2 flex flex-wrap gap-1.5 text-[0.68rem] text-slate-300">
                    <span class="rounded-full bg-slate-800 px-2 py-1">Cost {selectedCard.cost ?? 0}</span>
                    {#if selectedCard.cardType === "character"}
                      <span class="rounded-full bg-slate-800 px-2 py-1">
                        {(selectedCard.strength ?? 0)}/{Math.max(0, (selectedCard.willpower ?? 0) - (selectedCard.damage ?? 0))}
                      </span>
                    {/if}
                  </div>
                {/if}
              </div>
            </div>

            <Menubar.Separator class="bg-slate-700/70" />

            <Menubar.Item onclick={onOpenCardPreview} disabled={!selectedCard}>
              <Eye class="size-4" />
              Open Card Preview
            </Menubar.Item>
            <Menubar.Item onclick={onOpenLog}>
              <BookOpenText class="size-4" />
              Open Event Log
              <span class="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[0.68rem] text-slate-300">{logCount}</span>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      {:else}
        <Menubar.Menu>
          <Menubar.Trigger class="rounded-xl px-2.5 py-1.5 text-[0.75rem] font-semibold text-slate-100">
            Actions
          </Menubar.Trigger>
          <Menubar.Content class="w-[16rem] border-sky-300/20 bg-slate-950/96 text-slate-100">
            <div class="grid grid-cols-2 gap-2 p-2 text-xs">
              <div class="rounded-lg bg-slate-900/90 p-2 ring-1 ring-inset ring-slate-700/60">
                <p class="text-slate-400">Available</p>
                <p class="mt-1 text-sm font-bold text-slate-50">{actionCount}</p>
              </div>
              <div class="rounded-lg bg-slate-900/90 p-2 ring-1 ring-inset ring-slate-700/60">
                <p class="text-slate-400">Pending</p>
                <p class="mt-1 text-sm font-bold text-slate-50">{pendingCount}</p>
              </div>
            </div>

            <Menubar.Separator class="bg-slate-700/70" />

            <Menubar.Item onclick={onOpenMoves}>
              <Swords class="size-4" />
              Open Actions
              <span class="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[0.68rem] text-slate-300">{actionCount}</span>
            </Menubar.Item>
            <Menubar.Item onclick={onOpenLog}>
              <Clock3 class="size-4" />
              Open Event Log
              <span class="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[0.68rem] text-slate-300">{logCount}</span>
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>

        <Menubar.Menu>
          <Menubar.Trigger class="rounded-xl px-2.5 py-1.5 text-[0.75rem] font-semibold text-slate-100">
            More
          </Menubar.Trigger>
          <Menubar.Content class="w-[15rem] border-sky-300/20 bg-slate-950/96 text-slate-100">
            <Menubar.Item onclick={onOpenSettings}>
              <Settings2 class="size-4" />
              Player Settings
            </Menubar.Item>
            <Menubar.Item onclick={onOpenLog}>
              <Sparkles class="size-4" />
              Review Event Log
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Menu>
      {/if}
    </div>
  </Menubar.Root>
</div>
