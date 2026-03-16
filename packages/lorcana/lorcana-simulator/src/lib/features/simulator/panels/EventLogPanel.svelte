<script lang="ts">
  import { createVirtualizer } from "@tanstack/svelte-virtual";
  import { Bot, Droplets, Eye, Flag, Play, Sparkles, Swords, Undo2 } from "@lucide/svelte";
  import { get } from "svelte/store";
  import { m } from "$lib/paraglide/messages.js";
  import type {
    LorcanaCardSnapshot,
    LorcanaPlayerSide,
    MoveLogEntrySnapshot,
  } from "@/features/simulator/model/contracts.js";
  import {
    buildEventLogRows,
    filterEntriesToLastTurns,
    type EventLogPlayerTone,
    type EventLogRow,
  } from "./event-log-presentation.js";

  interface EventLogPanelProps {
    entries: MoveLogEntrySnapshot[];
    viewerSide?: LorcanaPlayerSide | null;
    showRawLogRegistryJson?: boolean;
    onCardHover?: (card: LorcanaCardSnapshot) => void;
    onCardLeave?: () => void;
  }

  let {
    entries,
    viewerSide = null,
    showRawLogRegistryJson = false,
    onCardHover = () => {},
    onCardLeave = () => {},
  }: EventLogPanelProps = $props();

  let scrollElement = $state<HTMLDivElement | null>(null);
  const browser = typeof window !== "undefined";

  const visibleEntries = $derived(filterEntriesToLastTurns(entries));
  const rows = $derived(buildEventLogRows(entries, viewerSide));
  const entryById = $derived(
    new Map<string, MoveLogEntrySnapshot>(visibleEntries.map((entry) => [entry.id, entry])),
  );

  const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: 0,
    estimateSize: () => 88,
    getScrollElement: () => scrollElement,
    initialRect: { width: 320, height: 720 },
    overscan: 6,
  });

  $effect(() => {
    get(virtualizer).setOptions({
      count: rows.length,
      estimateSize: (index) => estimateRowSize(rows[index], showRawLogRegistryJson),
      getScrollElement: () => scrollElement,
    });
  });

  function estimateRowSize(row: EventLogRow | undefined, debugMode: boolean): number {
    if (!row) {
      return debugMode ? 220 : 88;
    }

    if (row.kind === "turn-separator") {
      return 42;
    }

    return debugMode ? 220 : 88;
  }

  function formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  function stringifyRawEntry(entry: MoveLogEntrySnapshot): string {
    return JSON.stringify(
      {
        id: entry.id,
        timestamp: entry.timestamp,
        turnNumber: entry.turnNumber,
        moveId: entry.moveId,
        actorSide: entry.actorSide ?? null,
        title: entry.title,
        detail: entry.detail ?? null,
        rawLogRegistry: entry.rawLogRegistry ?? null,
      },
      null,
      2,
    );
  }

  function cardTokenClasses(card: LorcanaCardSnapshot): string {
    const ink = card.inkType?.[0]?.toLowerCase() ?? "";
    switch (ink) {
      case "amber":
        return "border-amber-400/45 bg-amber-500/12 text-amber-100";
      case "amethyst":
        return "border-fuchsia-400/45 bg-fuchsia-500/12 text-fuchsia-100";
      case "emerald":
        return "border-emerald-400/45 bg-emerald-500/12 text-emerald-100";
      case "ruby":
        return "border-rose-400/45 bg-rose-500/12 text-rose-100";
      case "sapphire":
        return "border-sky-400/45 bg-sky-500/12 text-sky-100";
      case "steel":
        return "border-slate-300/45 bg-slate-200/12 text-slate-100";
      default:
        return "border-slate-400/35 bg-slate-200/8 text-slate-100";
    }
  }

  function playerChipClasses(tone: EventLogPlayerTone): string {
    switch (tone) {
      case "self":
        return "border-emerald-400/45 bg-emerald-500/12 text-emerald-100";
      case "opponent":
        return "border-rose-400/45 bg-rose-500/12 text-rose-100";
      case "playerOne":
        return "border-sky-400/45 bg-sky-500/12 text-sky-100";
      case "playerTwo":
        return "border-amber-400/45 bg-amber-500/12 text-amber-100";
      case "system":
        return "border-slate-400/35 bg-slate-400/10 text-slate-200";
    }
  }
</script>

<section
  class="flex min-h-[17rem] flex-col overflow-hidden rounded-xl border border-sky-300/20 bg-slate-950/85 shadow-[0_18px_48px_rgba(2,6,23,0.36)]"
  aria-label={m["sim.tabletop.eventLog.aria"]({})}
>
  <header class="flex items-center justify-between gap-3 border-b border-sky-300/10 px-4 py-3">
    <div class="min-w-0">
      <h2 class="truncate text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-300/85">
        {m["sim.tabletop.eventLog.title"]({})}
      </h2>
      <p class="mt-1 text-[0.72rem] text-slate-400">
        {m["sim.tabletop.eventLog.subtitle"]({})}
      </p>
    </div>
    <div
      class="inline-flex shrink-0 items-center rounded-full border border-sky-300/15 bg-sky-300/8 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sky-100/80"
    >
      {visibleEntries.length}
    </div>
  </header>

  {#if rows.length === 0}
    <div class="flex flex-1 items-center justify-center px-4 py-10">
      <p class="max-w-[16rem] text-center text-sm text-slate-400">
        {m["sim.tabletop.eventLog.empty"]({})}
      </p>
    </div>
  {:else}
    {#if browser && $virtualizer.getVirtualItems().length > 0}
      <div bind:this={scrollElement} class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2">
        <div class="relative w-full" style={`height: ${$virtualizer.getTotalSize()}px;`}>
          {#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.key)}
            {@const row = rows[virtualRow.index]}
            {#if row}
              <div
                class="absolute left-0 top-0 w-full px-2 py-1"
                style={`transform: translateY(${virtualRow.start}px);`}
              >
                {#if row.kind === "turn-separator"}
                  <div class="sticky top-0 z-[1]">
                    <div class="flex items-center gap-2 rounded-full bg-slate-950/90 px-1 py-1 backdrop-blur">
                      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-sky-300/30 to-sky-300/10"></div>
                      <div
                        class="inline-flex items-center gap-1.5 rounded-full border border-sky-300/20 bg-slate-900/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky-100/80"
                      >
                        <Flag class="size-3.5" />
                        <span>{row.label}</span>
                      </div>
                      <div class="h-px flex-1 bg-gradient-to-l from-transparent via-sky-300/30 to-sky-300/10"></div>
                    </div>
                  </div>
                {:else}
                  {@const debugEntry = entryById.get(row.id)}
                  <article
                    class="rounded-2xl border border-slate-700/60 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(10,18,32,0.94))] px-3 py-3 shadow-[0_10px_30px_rgba(2,6,23,0.28)]"
                  >
                    <div class="flex items-start gap-3">
                      <div
                        class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-sky-300/18 bg-sky-300/8 text-slate-100"
                        aria-hidden="true"
                      >
                        {#if row.marker === "ink"}
                          <Droplets class="size-4" />
                        {:else if row.marker === "ability"}
                          <Sparkles class="size-4" />
                        {:else if row.marker === "scry"}
                          <Eye class="size-4" />
                        {:else if row.marker === "play"}
                          <Play class="size-4" />
                        {:else if row.marker === "challenge"}
                          <Swords class="size-4" />
                        {:else if row.marker === "pass"}
                          <Undo2 class="size-4" />
                        {:else}
                          <Bot class="size-4" />
                        {/if}
                      </div>

                      <div class="min-w-0 flex-1">
                        <div class="flex items-start justify-between gap-3">
                          <span
                            class={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${playerChipClasses(row.actor.tone)}`}
                          >
                            <span class="h-1.5 w-1.5 rounded-full bg-current opacity-80"></span>
                            <span class="truncate">{row.actor.label}</span>
                          </span>
                          <time class="shrink-0 pt-1 text-[0.7rem] font-medium tabular-nums text-slate-500">
                            {formatTime(row.timestamp)}
                          </time>
                        </div>

                        {#if showRawLogRegistryJson && debugEntry}
                          <div class="mt-2 rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2">
                            <p class="mb-2 text-[0.74rem] font-medium text-slate-200">{debugEntry.title}</p>
                            {#if debugEntry.detail}
                              <p class="mb-2 text-[0.72rem] text-slate-400">{debugEntry.detail}</p>
                            {/if}
                            <pre class="overflow-x-auto whitespace-pre-wrap break-words text-[0.7rem] leading-5 text-slate-300">{stringifyRawEntry(debugEntry)}</pre>
                          </div>
                        {:else}
                          <p class="mt-2 text-[0.84rem] font-medium leading-6 text-slate-100">
                            {#each row.segments as segment}
                              {#if segment.kind === "card"}
                                <button
                                  type="button"
                                  class={`mx-[0.08rem] inline-flex items-center rounded-md border px-1.5 py-0.5 align-baseline text-left text-[0.78rem] font-semibold transition hover:-translate-y-px hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 ${cardTokenClasses(segment.card)}`}
                                  onmouseenter={() => onCardHover(segment.card)}
                                  onmouseleave={onCardLeave}
                                  onfocus={() => onCardHover(segment.card)}
                                  onblur={onCardLeave}
                                >
                                  {segment.text}
                                </button>
                              {:else if segment.kind === "player"}
                                <span
                                  class={`mx-[0.08rem] inline-flex items-center rounded-full border px-1.5 py-0.5 align-baseline text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${playerChipClasses(segment.tone)}`}
                                >
                                  {segment.text}
                                </span>
                              {:else if segment.kind === "stat"}
                                <span class="font-semibold text-sky-100">{segment.text}</span>
                              {:else if segment.kind === "icon"}
                                <span
                                  class="inline-flex translate-y-[0.08rem] align-baseline text-emerald-200"
                                  aria-label={segment.label}
                                  title={segment.label}
                                >
                                  <Droplets class="size-3.5" />
                                </span>
                              {:else}
                                {segment.text}
                              {/if}
                            {/each}
                          </p>
                        {/if}
                      </div>
                    </div>
                  </article>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {:else}
      <div class="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-2">
        {#each rows as row (row.id)}
          <div class="px-2 py-1">
            {#if row.kind === "turn-separator"}
              <div class="flex items-center gap-2 rounded-full bg-slate-950/90 px-1 py-1 backdrop-blur">
                <div class="h-px flex-1 bg-gradient-to-r from-transparent via-sky-300/30 to-sky-300/10"></div>
                <div
                  class="inline-flex items-center gap-1.5 rounded-full border border-sky-300/20 bg-slate-900/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky-100/80"
                >
                  <Flag class="size-3.5" />
                  <span>{row.label}</span>
                </div>
                <div class="h-px flex-1 bg-gradient-to-l from-transparent via-sky-300/30 to-sky-300/10"></div>
              </div>
            {:else}
              {@const debugEntry = entryById.get(row.id)}
              <article
                class="rounded-2xl border border-slate-700/60 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(10,18,32,0.94))] px-3 py-3 shadow-[0_10px_30px_rgba(2,6,23,0.28)]"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-sky-300/18 bg-sky-300/8 text-slate-100"
                    aria-hidden="true"
                  >
                    {#if row.marker === "ink"}
                      <Droplets class="size-4" />
                    {:else if row.marker === "ability"}
                      <Sparkles class="size-4" />
                    {:else if row.marker === "scry"}
                      <Eye class="size-4" />
                    {:else if row.marker === "play"}
                      <Play class="size-4" />
                    {:else if row.marker === "challenge"}
                      <Swords class="size-4" />
                    {:else if row.marker === "pass"}
                      <Undo2 class="size-4" />
                    {:else}
                      <Bot class="size-4" />
                    {/if}
                  </div>

                  <div class="min-w-0 flex-1">
                    <div class="flex items-start justify-between gap-3">
                      <span
                        class={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] ${playerChipClasses(row.actor.tone)}`}
                      >
                        <span class="h-1.5 w-1.5 rounded-full bg-current opacity-80"></span>
                        <span class="truncate">{row.actor.label}</span>
                      </span>
                      <time class="shrink-0 pt-1 text-[0.7rem] font-medium tabular-nums text-slate-500">
                        {formatTime(row.timestamp)}
                      </time>
                    </div>

                    {#if showRawLogRegistryJson && debugEntry}
                      <div class="mt-2 rounded-xl border border-slate-800/80 bg-slate-950/70 px-3 py-2">
                        <p class="mb-2 text-[0.74rem] font-medium text-slate-200">{debugEntry.title}</p>
                        {#if debugEntry.detail}
                          <p class="mb-2 text-[0.72rem] text-slate-400">{debugEntry.detail}</p>
                        {/if}
                        <pre class="overflow-x-auto whitespace-pre-wrap break-words text-[0.7rem] leading-5 text-slate-300">{stringifyRawEntry(debugEntry)}</pre>
                      </div>
                    {:else}
                      <p class="mt-2 text-[0.84rem] font-medium leading-6 text-slate-100">
                        {#each row.segments as segment}
                          {#if segment.kind === "card"}
                            <button
                              type="button"
                              class={`mx-[0.08rem] inline-flex items-center rounded-md border px-1.5 py-0.5 align-baseline text-left text-[0.78rem] font-semibold transition hover:-translate-y-px hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 ${cardTokenClasses(segment.card)}`}
                              onmouseenter={() => onCardHover(segment.card)}
                              onmouseleave={onCardLeave}
                              onfocus={() => onCardHover(segment.card)}
                              onblur={onCardLeave}
                            >
                              {segment.text}
                            </button>
                          {:else if segment.kind === "player"}
                            <span
                              class={`mx-[0.08rem] inline-flex items-center rounded-full border px-1.5 py-0.5 align-baseline text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${playerChipClasses(segment.tone)}`}
                            >
                              {segment.text}
                            </span>
                          {:else if segment.kind === "stat"}
                            <span class="font-semibold text-sky-100">{segment.text}</span>
                          {:else if segment.kind === "icon"}
                            <span
                              class="inline-flex translate-y-[0.08rem] align-baseline text-emerald-200"
                              aria-label={segment.label}
                              title={segment.label}
                            >
                              <Droplets class="size-3.5" />
                            </span>
                          {:else}
                            {segment.text}
                          {/if}
                        {/each}
                      </p>
                    {/if}
                  </div>
                </div>
              </article>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</section>
