<script lang="ts">
  import { createVirtualizer } from "@tanstack/svelte-virtual";
  import { Droplets, Flag } from "@lucide/svelte";
  import { get } from "svelte/store";
  import { m } from "$lib/i18n/messages.js";
  import type {
    LorcanaPlayerSide,
    MoveLogEntrySnapshot,
  } from "@/features/simulator/model/contracts.js";
  import CardLogToken from "./CardLogToken.svelte";
  import {
    buildEventLogRows,
    filterEntriesToLastTurns,
    groupEventLogRows,
    type EventLogGroup,
    type EventLogPlayerTone,
  } from "./event-log-presentation.js";
  import { isScrolledNearBottom, shouldAutoScrollOnNewRows } from "./event-log-scroll.js";

  interface EventLogPanelProps {
    entries: MoveLogEntrySnapshot[];
    viewerSide?: LorcanaPlayerSide | null;
    showRawLogRegistryJson?: boolean;
    compact?: boolean;
  }

  let {
    entries,
    viewerSide = null,
    showRawLogRegistryJson = false,
    compact = false,
  }: EventLogPanelProps = $props();

  let scrollElement = $state<HTMLDivElement | null>(null);
  let isPinnedToBottom = $state(true);
  let hasInitializedScroll = $state(false);
  let previousRowCount = $state(0);
  const browser = typeof window !== "undefined";

  const visibleEntries = $derived(filterEntriesToLastTurns(entries));
  const rows = $derived(buildEventLogRows(entries, viewerSide));
  const groups = $derived(groupEventLogRows(rows));
  const entryById = $derived(
    new Map<string, MoveLogEntrySnapshot>(visibleEntries.map((entry) => [entry.id, entry])),
  );

  const virtualizer = createVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: 0,
    estimateSize: () => 60,
    getScrollElement: () => scrollElement,
    initialRect: { width: 320, height: 720 },
    overscan: 6,
  });

  $effect(() => {
    get(virtualizer).setOptions({
      count: groups.length,
      estimateSize: (index) => estimateGroupSize(groups[index], showRawLogRegistryJson),
      getScrollElement: () => scrollElement,
    });
  });

  $effect(() => {
    if (!browser || !scrollElement) {
      previousRowCount = rows.length;
      return;
    }

    if (!hasInitializedScroll) {
      hasInitializedScroll = true;
      previousRowCount = rows.length;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!scrollElement || groups.length === 0) {
            return;
          }

          get(virtualizer).scrollToIndex(groups.length - 1, {
            align: "end",
          });
          scrollElement.scrollTop = scrollElement.scrollHeight;
        });
      });
      return;
    }

    if (!shouldAutoScrollOnNewRows(rows.length, previousRowCount, isPinnedToBottom)) {
      previousRowCount = rows.length;
      return;
    }

    previousRowCount = rows.length;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!scrollElement || groups.length === 0) {
          return;
        }

        get(virtualizer).scrollToIndex(groups.length - 1, {
          align: "end",
        });
        scrollElement.scrollTop = scrollElement.scrollHeight;
      });
    });
  });

  function handleScroll(): void {
    if (!scrollElement) {
      return;
    }

    isPinnedToBottom = isScrolledNearBottom(scrollElement);
  }

  function estimateGroupSize(group: EventLogGroup | undefined, debugMode: boolean): number {
    if (!group) {
      return debugMode ? 200 : 60;
    }

    if (group.kind === "turn-separator") {
      return 36;
    }

    // header (~28px) + rows (~20px each, more in debug)
    return debugMode ? 28 + group.rows.length * 120 : 28 + group.rows.length * 22;
  }

  function measureVirtualRow(node: HTMLDivElement): { update: () => void; destroy: () => void } {
    if (!browser) {
      return {
        update: () => {},
        destroy: () => {},
      };
    }

    const measure = () => {
      get(virtualizer).measureElement(node);
    };

    measure();

    return {
      update: measure,
      destroy: () => {
        get(virtualizer).measureElement(null);
      },
    };
  }

  function stringifyRawEntry(entry: MoveLogEntrySnapshot): string {
    return JSON.stringify(entry, null, 2);
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

  function groupBorderClasses(tone: EventLogPlayerTone): string {
    switch (tone) {
      case "self":
        return "border-emerald-400/55";
      case "opponent":
        return "border-rose-400/55";
      case "playerOne":
        return "border-sky-400/55";
      case "playerTwo":
        return "border-amber-400/55";
      case "system":
        return "border-slate-400/30";
    }
  }

  function groupDotClasses(tone: EventLogPlayerTone): string {
    switch (tone) {
      case "self":
        return "bg-emerald-400/80";
      case "opponent":
        return "bg-rose-400/80";
      case "playerOne":
        return "bg-sky-400/80";
      case "playerTwo":
        return "bg-amber-400/80";
      case "system":
        return "bg-slate-400/60";
    }
  }

  function groupActorTextClasses(tone: EventLogPlayerTone): string {
    switch (tone) {
      case "self":
        return "text-emerald-300/75";
      case "opponent":
        return "text-rose-300/75";
      case "playerOne":
        return "text-sky-300/75";
      case "playerTwo":
        return "text-amber-300/75";
      case "system":
        return "text-slate-400/80";
    }
  }
</script>

<section
  class="event-log flex min-h-0 flex-col overflow-hidden"
  aria-label={m["sim.tabletop.eventLog.aria"]({})}
>
  {#if !compact}
    <header class="mb-[0.3rem] flex items-center justify-between gap-[0.45rem] px-[0.2rem] pt-[0.15rem]">
      <div class="min-w-0">
        <h2 class="truncate text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[#95a8c1]">
          {m["sim.tabletop.eventLog.title"]({})}
        </h2>
      </div>
    </header>
  {/if}

  {#if groups.length === 0}
    <div class="flex flex-1 items-center justify-center px-[0.1rem] py-3">
      <p class="max-w-[14rem] text-center text-[0.82rem] text-slate-400">
        {m["sim.tabletop.eventLog.empty"]({})}
      </p>
    </div>
  {:else}
    {#if browser && $virtualizer.getVirtualItems().length > 0}
      <div
        bind:this={scrollElement}
        class:border-t={!compact}
        class="min-h-0 flex-1 overflow-y-auto overscroll-contain border-[rgba(109,149,195,0.16)] px-[0.1rem] py-0"
        onscroll={handleScroll}
      >
        <div class="relative w-full" style={`height: ${$virtualizer.getTotalSize()}px;`}>
          {#each $virtualizer.getVirtualItems() as virtualRow (virtualRow.key)}
            {@const group = groups[virtualRow.index]}
            {#if group}
              <div
                class="absolute left-0 top-0 w-full py-0.5"
                data-index={virtualRow.index}
                style={`transform: translateY(${virtualRow.start}px);`}
                use:measureVirtualRow
              >
                {#if group.kind === "turn-separator"}
                  <div class="sticky top-0 z-[1] py-1">
                    <div class="flex items-center gap-2 rounded-full bg-slate-950/90 px-1 py-1 backdrop-blur">
                      <div class="h-px flex-1 bg-gradient-to-r from-transparent via-sky-300/30 to-sky-300/10"></div>
                      <div
                        class="inline-flex items-center gap-1.5 rounded-full border border-sky-300/20 bg-slate-900/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky-100/80"
                      >
                        <Flag class="size-3.5" />
                        <span>{group.label}</span>
                      </div>
                      <div class="h-px flex-1 bg-gradient-to-l from-transparent via-sky-300/30 to-sky-300/10"></div>
                    </div>
                  </div>
                {:else}
                  <div class="border-l-2 {groupBorderClasses(group.actor.tone)} py-1.5 pl-3 pr-1">
                    <div class="mb-1 flex items-center gap-1.5">
                      <span class="h-1.5 w-1.5 shrink-0 rounded-full {groupDotClasses(group.actor.tone)}"></span>
                      <span class="text-[0.62rem] font-semibold uppercase tracking-[0.18em] {groupActorTextClasses(group.actor.tone)}">
                        {group.actor.label}
                      </span>
                    </div>

                    {#each group.rows as row}
                      {#if showRawLogRegistryJson}
                        {@const debugEntry = entryById.get(row.id)}
                        {#if debugEntry}
                          <div class="flex gap-2 py-0.5">
                            <span class="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-slate-500/60"></span>
                            <div class="min-w-0 flex-1 rounded border border-slate-800/80 bg-slate-950/70 px-2 py-1.5">
                              <p class="mb-1 text-[0.72rem] font-medium text-slate-200">{debugEntry.title}</p>
                              <pre class="overflow-x-auto whitespace-pre-wrap break-words text-[0.66rem] leading-5 text-slate-300">{stringifyRawEntry(debugEntry)}</pre>
                            </div>
                          </div>
                        {/if}
                      {:else}
                        <div class="flex gap-2 py-[0.1rem]">
                          <span class="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-slate-500/45"></span>
                          <p class="min-w-0 break-words text-[0.82rem] leading-[1.45] text-slate-200">
                            {#each row.segments as segment}
                              {#if segment.kind === "card"}
                                <CardLogToken
                                  cardId={segment.cardId}
                                  fallbackLabel={segment.fallbackLabel}
                                  fallbackInkType={segment.fallbackInkType}
                                />
                              {:else if segment.kind === "player"}
                                <span
                                  class={`mx-[0.06rem] inline-flex items-center rounded-full border px-1.5 py-px align-baseline text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${playerChipClasses(segment.tone)}`}
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
                        </div>
                      {/if}
                    {/each}
                  </div>
                {/if}
              </div>
            {/if}
          {/each}
        </div>
      </div>
    {:else}
      <div
        class:border-t={!compact}
        class="min-h-0 flex-1 overflow-y-auto overscroll-contain border-[rgba(109,149,195,0.16)] px-[0.1rem] py-0"
      >
        {#each groups as group (group.id)}
          <div class="py-0.5">
            {#if group.kind === "turn-separator"}
              <div class="py-1">
                <div class="flex items-center gap-2 rounded-full bg-slate-950/90 px-1 py-1 backdrop-blur">
                  <div class="h-px flex-1 bg-gradient-to-r from-transparent via-sky-300/30 to-sky-300/10"></div>
                  <div
                    class="inline-flex items-center gap-1.5 rounded-full border border-sky-300/20 bg-slate-900/95 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sky-100/80"
                  >
                    <Flag class="size-3.5" />
                    <span>{group.label}</span>
                  </div>
                  <div class="h-px flex-1 bg-gradient-to-l from-transparent via-sky-300/30 to-sky-300/10"></div>
                </div>
              </div>
            {:else}
              <div class="border-l-2 {groupBorderClasses(group.actor.tone)} py-1.5 pl-3 pr-1">
                <div class="mb-1 flex items-center gap-1.5">
                  <span class="h-1.5 w-1.5 shrink-0 rounded-full {groupDotClasses(group.actor.tone)}"></span>
                  <span class="text-[0.62rem] font-semibold uppercase tracking-[0.18em] {groupActorTextClasses(group.actor.tone)}">
                    {group.actor.label}
                  </span>
                </div>

                {#each group.rows as row}
                  {#if showRawLogRegistryJson}
                    {@const debugEntry = entryById.get(row.id)}
                    {#if debugEntry}
                      <div class="flex gap-2 py-0.5">
                        <span class="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-slate-500/60"></span>
                        <div class="min-w-0 flex-1 rounded border border-slate-800/80 bg-slate-950/70 px-2 py-1.5">
                          <p class="mb-1 text-[0.72rem] font-medium text-slate-200">{debugEntry.title}</p>
                          <pre class="overflow-x-auto whitespace-pre-wrap break-words text-[0.66rem] leading-5 text-slate-300">{stringifyRawEntry(debugEntry)}</pre>
                        </div>
                      </div>
                    {/if}
                  {:else}
                    <div class="flex gap-2 py-[0.1rem]">
                      <span class="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-slate-500/45"></span>
                      <p class="min-w-0 break-words text-[0.82rem] leading-[1.45] text-slate-200">
                        {#each row.segments as segment}
                          {#if segment.kind === "card"}
                            <CardLogToken
                              cardId={segment.cardId}
                              fallbackLabel={segment.fallbackLabel}
                              fallbackInkType={segment.fallbackInkType}
                            />
                          {:else if segment.kind === "player"}
                            <span
                              class={`mx-[0.06rem] inline-flex items-center rounded-full border px-1.5 py-px align-baseline text-[0.68rem] font-semibold uppercase tracking-[0.12em] ${playerChipClasses(segment.tone)}`}
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
                    </div>
                  {/if}
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</section>
