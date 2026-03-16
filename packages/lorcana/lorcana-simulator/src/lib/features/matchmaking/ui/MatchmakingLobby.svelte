<script lang="ts">
    import {Badge} from "$lib/design-system/primitives/badge";
    import {Button} from "$lib/design-system/primitives/button";
  import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { m } from "$lib/paraglide/messages.js";
    import {RadioGroup, RadioGroupItem} from "$lib/design-system/primitives/radio-group";
    import {Select} from "$lib/design-system/primitives/select";
    import {Separator} from "$lib/design-system/primitives/separator";
  import { cn } from "$lib/utils.js";
    import {DECK_FIXTURES} from "@/features/simulator-devtools/deck-fixtures/index.js";

  const MATCHMAKING_QUEUES = [
    {
      id: "winterspell-bo1",
      mode: "bo1",
      format: "winterspell",
      livePlayers: 126,
      queuedPlayers: 8,
      estimatedWait: "00:24",
      featured: true,
    },
    {
      id: "winterspell-bo3",
      mode: "bo3",
      format: "winterspell",
      livePlayers: 64,
      queuedPlayers: 3,
      estimatedWait: "01:10",
      featured: false,
    },
    {
      id: "infinity-bo1",
      mode: "bo1",
      format: "infinity",
      livePlayers: 88,
      queuedPlayers: 5,
      estimatedWait: "00:38",
      featured: false,
    },
    {
      id: "infinity-bo3",
      mode: "bo3",
      format: "infinity",
      livePlayers: 41,
      queuedPlayers: 2,
      estimatedWait: "01:42",
      featured: false,
    },
  ] as const;

  const BULLETIN_ITEMS = [
    "sim.matchmaking.bulletin.itemOne",
    "sim.matchmaking.bulletin.itemTwo",
    "sim.matchmaking.bulletin.itemThree",
  ] as const;

  const EYEBROW_CLASS =
    "text-muted-foreground text-xs font-semibold uppercase tracking-[0.24em]";
  const SURFACE_CARD_CLASS =
    "border-white/10 bg-slate-950/72 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.92)] backdrop-blur-sm";
  const LANE_CLASS =
    "overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] shadow-[0_32px_80px_-52px_rgba(2,6,23,0.95)]";
  const LANE_SCROLL_CLASS =
    "space-y-4 px-4 py-5 sm:px-5 xl:h-full xl:overflow-y-auto [scrollbar-color:rgba(148,163,184,0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 hover:[&::-webkit-scrollbar-thumb]:bg-white/25";
  const HERO_MENU_BUTTON_CLASS =
    "rounded-full border border-white/10 bg-black/45 px-4 text-slate-100 shadow-none backdrop-blur-md hover:bg-black/65 hover:text-white";
  const HERO_STAT_CARD_CLASS =
    "rounded-[1.5rem] border border-white/12 bg-slate-950/78 p-4 shadow-[0_24px_48px_-36px_rgba(2,6,23,1)]";

  type MatchmakingQueue = (typeof MATCHMAKING_QUEUES)[number];
  type QueueStatusKind = "idle" | "success" | "warning";
  type QueueFormat = MatchmakingQueue["format"];

  interface DeckOption {
    id: string;
    name: string;
    cardCount: number;
    previewCard: string;
  }

  function createDeckId(name: string, index: number): string {
    const normalized = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return `${normalized.length > 0 ? normalized : "deck"}-${index + 1}`;
  }

  function extractDeckCardCount(deckList: string): number {
    return deckList
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .reduce((total, line) => {
        const quantityToken = line.split(/\s+/, 1)[0];
        const quantity = Number.parseInt(quantityToken ?? "", 10);
        return Number.isNaN(quantity) ? total + 1 : total + quantity;
      }, 0);
  }

  function extractPreviewCard(deckList: string): string {
    const firstLine = deckList
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0);

    return firstLine ?? m["sim.matchmaking.preview.pending"]({});
  }

  function getQueueLabel(queueId: MatchmakingQueue["id"]): string {
    switch (queueId) {
      case "winterspell-bo1":
        return m["sim.matchmaking.queue.winterspell-bo1.label"]({});
      case "winterspell-bo3":
        return m["sim.matchmaking.queue.winterspell-bo3.label"]({});
      case "infinity-bo1":
        return m["sim.matchmaking.queue.infinity-bo1.label"]({});
      case "infinity-bo3":
        return m["sim.matchmaking.queue.infinity-bo3.label"]({});
    }
  }

  function getQueueMode(queueId: MatchmakingQueue["id"]): string {
    switch (queueId) {
      case "winterspell-bo1":
        return m["sim.matchmaking.queue.winterspell-bo1.mode"]({});
      case "winterspell-bo3":
        return m["sim.matchmaking.queue.winterspell-bo3.mode"]({});
      case "infinity-bo1":
        return m["sim.matchmaking.queue.infinity-bo1.mode"]({});
      case "infinity-bo3":
        return m["sim.matchmaking.queue.infinity-bo3.mode"]({});
    }
  }

  function getQueueDescription(queueId: MatchmakingQueue["id"]): string {
    switch (queueId) {
      case "winterspell-bo1":
        return m["sim.matchmaking.queue.winterspell-bo1.description"]({});
      case "winterspell-bo3":
        return m["sim.matchmaking.queue.winterspell-bo3.description"]({});
      case "infinity-bo1":
        return m["sim.matchmaking.queue.infinity-bo1.description"]({});
      case "infinity-bo3":
        return m["sim.matchmaking.queue.infinity-bo3.description"]({});
    }
  }

  function getQueueFormatLabel(format: QueueFormat): string {
    switch (format) {
      case "winterspell":
        return m["sim.matchmaking.format.winterspell"]({});
      case "infinity":
        return m["sim.matchmaking.format.infinity"]({});
    }
  }

  const deckOptions: DeckOption[] = DECK_FIXTURES.map((deck, index) => ({
    id: createDeckId(deck.name, index),
    name: deck.name,
    cardCount: extractDeckCardCount(deck.cards),
    previewCard: extractPreviewCard(deck.cards),
  }));

  let selectedQueueId: MatchmakingQueue["id"] = MATCHMAKING_QUEUES[0].id;
  let selectedDeckId = deckOptions[0]?.id ?? "";
  let queueStatusMessage = "";
  let queueStatusKind: QueueStatusKind = "idle";

  $: selectedQueue =
    MATCHMAKING_QUEUES.find((queue) => queue.id === selectedQueueId) ?? MATCHMAKING_QUEUES[0];
  $: selectedQueueLabel = getQueueLabel(selectedQueue.id);
  $: selectedDeck = deckOptions.find((deck) => deck.id === selectedDeckId) ?? null;
  $: totalLivePlayers = MATCHMAKING_QUEUES.reduce((total, queue) => total + queue.livePlayers, 0);
  $: totalQueuedPlayers = MATCHMAKING_QUEUES.reduce((total, queue) => total + queue.queuedPlayers, 0);
  $: featuredQueueCount = MATCHMAKING_QUEUES.filter((queue) => queue.featured).length;

  function joinQueue(): void {
    if (!selectedDeck) {
      queueStatusKind = "warning";
      queueStatusMessage = m["sim.matchmaking.status.selectDeckWarning"]({});
      return;
    }

    queueStatusKind = "success";
    queueStatusMessage = m["sim.matchmaking.status.queued"]({
      queueLabel: selectedQueueLabel,
      deckName: selectedDeck.name,
    });
  }
</script>

<main class="simulator-dark relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),linear-gradient(180deg,#020617_0%,#020617_46%,#030712_100%)] text-foreground xl:h-screen xl:overflow-hidden">
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.1),transparent_28%)]"
    aria-hidden="true"
  ></div>

  <div class="relative flex min-h-screen w-full flex-col gap-4 xl:h-full xl:min-h-0">
    <section class="relative shrink-0 overflow-hidden border-y border-white/10 bg-slate-950 shadow-[0_40px_120px_-60px_rgba(2,6,23,1)] xl:h-[24svh] xl:max-h-[25svh] xl:min-h-[13.5rem]">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-100"
        style={"background-image: url('/bg/mm-top-backgroud.png')"}
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(2,6,23,0.74)_42%,rgba(2,6,23,0.82)_100%)]"
        aria-hidden="true"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_20%),repeating-linear-gradient(90deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_17.5%)]"
        aria-hidden="true"
      ></div>

      <div class="absolute right-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap justify-end gap-2 sm:right-6 sm:max-w-[calc(100%-3rem)] lg:right-8 lg:max-w-[calc(100%-4rem)]">
        <Badge
          variant="secondary"
          class="rounded-full border border-white/10 bg-black/55 px-3 py-1 text-white shadow-none backdrop-blur-md"
        >
          {m["sim.matchmaking.header.liveStatus"]({ activeGames: totalLivePlayers })}
        </Badge>
        <Button variant="ghost" size="sm" class={HERO_MENU_BUTTON_CLASS}>
          {m["sim.matchmaking.header.utilityDecks"]({})}
        </Button>
        <Button variant="ghost" size="sm" class={HERO_MENU_BUTTON_CLASS}>
          {m["sim.matchmaking.header.utilityQueues"]({})}
        </Button>
        <Button variant="ghost" size="sm" class={HERO_MENU_BUTTON_CLASS}>
          {m["sim.matchmaking.header.utilityNotes"]({})}
        </Button>
      </div>

      <div class="relative grid min-h-[14rem] gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:p-8 xl:h-full xl:min-h-0 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div class="flex max-w-3xl flex-col justify-center gap-3 lg:pr-8">
          <p class={cn(EYEBROW_CLASS, "text-slate-200/80")}>
            {m["sim.matchmaking.header.kicker"]({})}
          </p>
          <h1 class="scroll-m-20 max-w-2xl text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl xl:text-5xl">
            {m["sim.matchmaking.header.title"]({})}
          </h1>
          <p class="max-w-2xl text-sm leading-6 text-slate-200/88 sm:text-base">
            {m["sim.matchmaking.center.description"]({})}
          </p>
        </div>

        <div class="grid content-center gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div class={HERO_STAT_CARD_CLASS}>
            <p class={cn(EYEBROW_CLASS, "text-slate-300/75")}>
              {m["sim.matchmaking.left.queueIntel.playersLabel"]({})}
            </p>
            <p class="mt-2 text-2xl font-semibold tracking-tight text-white">{totalLivePlayers}</p>
            <p class="mt-1 text-xs leading-5 text-slate-200/75">
              {m["sim.matchmaking.right.live.title"]({})}
            </p>
          </div>

          <div class={HERO_STAT_CARD_CLASS}>
            <p class={cn(EYEBROW_CLASS, "text-slate-300/75")}>
              {m["sim.matchmaking.queueCard.queuedPlayers"]({ count: 0 })}
            </p>
            <p class="mt-2 text-2xl font-semibold tracking-tight text-white">{totalQueuedPlayers}</p>
            <p class="mt-1 text-xs leading-5 text-slate-200/75">
              {m["sim.matchmaking.header.utilityQueues"]({})}
            </p>
          </div>

          <div class={HERO_STAT_CARD_CLASS}>
            <p class={cn(EYEBROW_CLASS, "text-slate-300/75")}>
              {m["sim.matchmaking.center.eyebrow"]({})}
            </p>
            <p class="mt-2 text-2xl font-semibold tracking-tight text-white">{featuredQueueCount}</p>
            <p class="mt-1 text-xs leading-5 text-slate-200/75">
              {m["sim.matchmaking.right.community.title"]({})}
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="grid gap-4 px-4 sm:px-6 lg:px-8 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(18rem,1fr)_minmax(28rem,1.15fr)_minmax(18rem,1fr)]">
      <aside class={cn(LANE_CLASS, "xl:min-h-0")}>
        <div class={LANE_SCROLL_CLASS}>
          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.left.queueIntel.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.left.queueIntel.title"]({})}
              </CardTitle>
              <CardDescription class="leading-7">
                {getQueueDescription(selectedQueue.id)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl class="grid grid-cols-2 gap-4 text-sm">
                <div class="space-y-1">
                  <dt class="text-muted-foreground">{m["sim.matchmaking.left.queueIntel.formatLabel"]({})}</dt>
                  <dd class="font-medium">{getQueueFormatLabel(selectedQueue.format)}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-muted-foreground">{m["sim.matchmaking.left.queueIntel.modeLabel"]({})}</dt>
                  <dd class="font-medium">{getQueueMode(selectedQueue.id)}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-muted-foreground">{m["sim.matchmaking.left.queueIntel.waitLabel"]({})}</dt>
                  <dd class="font-medium">{selectedQueue.estimatedWait}</dd>
                </div>
                <div class="space-y-1">
                  <dt class="text-muted-foreground">{m["sim.matchmaking.left.queueIntel.playersLabel"]({})}</dt>
                  <dd class="font-medium">{selectedQueue.livePlayers}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.left.flow.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.left.flow.title"]({})}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol class="ms-6 list-decimal space-y-3 text-sm leading-7 marker:text-muted-foreground">
                <li>{m["sim.matchmaking.left.flow.stepOne"]({})}</li>
                <li>{m["sim.matchmaking.left.flow.stepTwo"]({})}</li>
                <li>{m["sim.matchmaking.left.flow.stepThree"]({})}</li>
              </ol>
            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.left.watch.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.left.watch.title"]({})}
              </CardTitle>
              <CardDescription class="leading-7">
                {m["sim.matchmaking.left.watch.body"]({})}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="secondary" class="w-full">
                {m["sim.matchmaking.left.watch.cta"]({ count: totalLivePlayers })}
              </Button>
            </CardFooter>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.left.prep.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.left.prep.title"]({})}
              </CardTitle>
              <CardDescription class="leading-7">
                {m["sim.matchmaking.left.prep.body"]({})}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </aside>

      <section class={cn(LANE_CLASS, "xl:min-h-0")}>
        <div class={LANE_SCROLL_CLASS}>
          <Card class={cn(SURFACE_CARD_CLASS, "overflow-hidden")}>
            <CardHeader class="border-b border-white/10">
              <div>
                <p class={EYEBROW_CLASS}>{m["sim.matchmaking.center.eyebrow"]({})}</p>
                <CardTitle class="mt-2 scroll-m-20 text-3xl tracking-tight">
                  {m["sim.matchmaking.center.title"]({})}
                </CardTitle>
                <CardDescription class="mt-3 leading-7">
                  {m["sim.matchmaking.center.description"]({})}
                </CardDescription>
              </div>

              <CardAction class="flex flex-wrap gap-2">
                <Badge variant="outline">{getQueueFormatLabel(selectedQueue.format)}</Badge>
                <Badge variant="outline">{getQueueMode(selectedQueue.id)}</Badge>
              </CardAction>
            </CardHeader>

            <CardContent class="space-y-6">
              <div class="space-y-3">
                <div>
                  <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
                    {m["sim.matchmaking.queueSelection.aria"]({})}
                  </h2>
                  <p class="text-muted-foreground mt-2 text-sm leading-7">
                    {m["sim.matchmaking.left.queueIntel.title"]({})}
                  </p>
                </div>

                <RadioGroup
                  bind:value={selectedQueueId}
                  name="matchmaking-queue"
                  aria-label={m["sim.matchmaking.queueSelection.aria"]({})}
                  class="grid gap-4 md:grid-cols-2"
                >
                  {#each MATCHMAKING_QUEUES as queue}
                    <RadioGroupItem
                      value={queue.id}
                      class="size-auto h-full w-full rounded-xl border-white/10 bg-white/5 p-0 text-left shadow-none hover:bg-accent/40 data-[state=checked]:border-primary data-[state=checked]:bg-accent/30 data-[state=checked]:ring-1 data-[state=checked]:ring-primary/30"
                    >
                      {#snippet children({ checked })}
                        <div class="flex h-full flex-col gap-4 p-4">
                          <div class="flex items-start justify-between gap-3">
                            <div class="space-y-2">
                              <div class="flex flex-wrap items-center gap-2">
                                <p class="text-base font-semibold tracking-tight">{getQueueLabel(queue.id)}</p>
                                {#if queue.featured}
                                  <Badge>{m["sim.matchmaking.center.eyebrow"]({})}</Badge>
                                {/if}
                              </div>

                              <p class="text-muted-foreground text-sm leading-6">
                                {getQueueDescription(queue.id)}
                              </p>
                            </div>

                            <div
                              class={cn(
                                "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                                checked
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/40 text-transparent",
                              )}
                            >
                              <span class="size-2 rounded-full bg-current"></span>
                            </div>
                          </div>

                          <div class="flex flex-wrap gap-2">
                            <Badge variant="outline">{getQueueMode(queue.id)}</Badge>
                            <Badge variant="secondary">{getQueueFormatLabel(queue.format)}</Badge>
                          </div>

                          <div class="text-muted-foreground mt-auto flex flex-wrap gap-x-4 gap-y-2 text-xs leading-6">
                            <span>{m["sim.matchmaking.queueCard.livePlayers"]({ count: queue.livePlayers })}</span>
                            <span>{m["sim.matchmaking.queueCard.queuedPlayers"]({ count: queue.queuedPlayers })}</span>
                            <span>{m["sim.matchmaking.queueCard.wait"]({ time: queue.estimatedWait })}</span>
                          </div>
                        </div>
                      {/snippet}
                    </RadioGroupItem>
                  {/each}
                </RadioGroup>
              </div>

              <Separator />

              <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
                <div class="space-y-2">
                  <label class={cn(EYEBROW_CLASS, "block")} for="matchmaking-deck-select">
                    {m["sim.matchmaking.deckSelect.label"]({})}
                  </label>
                  <Select
                    id="matchmaking-deck-select"
                    bind:value={selectedDeckId}
                    disabled={deckOptions.length === 0}
                    class="border-white/10 bg-white/5"
                  >
                    {#if deckOptions.length === 0}
                      <option value="">{m["sim.matchmaking.deckSelect.none"]({})}</option>
                    {:else}
                      {#each deckOptions as deck}
                        <option value={deck.id}>{deck.name}</option>
                      {/each}
                    {/if}
                  </Select>
                </div>

                <div class="rounded-xl border border-white/10 bg-white/5 p-4" aria-live="polite">
                  <p class={EYEBROW_CLASS}>{m["sim.matchmaking.selectedDeck.kicker"]({})}</p>

                  {#if selectedDeck}
                    <h3 class="mt-3 scroll-m-20 text-xl font-semibold tracking-tight">
                      {selectedDeck.name}
                    </h3>
                    <p class="text-muted-foreground mt-2 text-sm leading-6">
                      {m["sim.matchmaking.selectedDeck.cardsLoaded"]({ count: selectedDeck.cardCount })}
                    </p>
                    <p class="text-muted-foreground mt-3 text-sm leading-6">
                      {m["sim.matchmaking.selectedDeck.preview"]({ card: selectedDeck.previewCard })}
                    </p>
                  {:else}
                    <h3 class="mt-3 scroll-m-20 text-xl font-semibold tracking-tight">
                      {m["sim.matchmaking.selectedDeck.noneTitle"]({})}
                    </h3>
                    <p class="text-muted-foreground mt-2 text-sm leading-6">
                      {m["sim.matchmaking.selectedDeck.noneDescription"]({})}
                    </p>
                  {/if}
                </div>
              </div>

              <div class="space-y-3">
                <Button class="h-11 w-full text-base" onclick={joinQueue} disabled={!selectedDeck}>
                  {m["sim.matchmaking.joinButton"]({ queueLabel: selectedQueueLabel })}
                </Button>

                {#if queueStatusMessage}
                  <div
                    class={cn(
                      "rounded-lg border px-4 py-3 text-sm leading-6",
                      queueStatusKind === "success" &&
                        "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
                      queueStatusKind === "warning" &&
                        "border-amber-500/30 bg-amber-500/10 text-amber-200",
                    )}
                    role="status"
                  >
                    {queueStatusMessage}
                  </div>
                {/if}
              </div>
            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.center.footerNote.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.center.footerNote.title"]({})}
              </CardTitle>
              <CardDescription class="leading-7">
                {m["sim.matchmaking.center.footerNote.body"]({})}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <aside class={cn(LANE_CLASS, "xl:min-h-0")}>
        <div class={LANE_SCROLL_CLASS}>
          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.right.live.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.right.live.title"]({})}
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              {#each MATCHMAKING_QUEUES as queue, index}
                <div class="space-y-3">
                  <div class="flex items-center justify-between gap-3">
                    <div class="space-y-1">
                      <p class="font-medium">{getQueueLabel(queue.id)}</p>
                      <p class="text-muted-foreground text-xs">{getQueueMode(queue.id)}</p>
                    </div>
                    <Badge variant="secondary">{queue.livePlayers}</Badge>
                  </div>
                  {#if index < MATCHMAKING_QUEUES.length - 1}
                    <Separator />
                  {/if}
                </div>
              {/each}
            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.right.bulletin.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.right.bulletin.title"]({})}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul class="my-6 ms-6 list-disc space-y-2 text-sm leading-7 marker:text-muted-foreground">
                {#each BULLETIN_ITEMS as item}
                  <li>{m[item]({})}</li>
                {/each}
              </ul>
            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m["sim.matchmaking.right.community.eyebrow"]({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m["sim.matchmaking.right.community.title"]({})}
              </CardTitle>
              <CardDescription class="leading-7">
                {m["sim.matchmaking.right.community.body"]({})}
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
              <Badge variant="outline">{m["sim.matchmaking.right.community.chipOne"]({})}</Badge>
              <Badge variant="outline">{m["sim.matchmaking.right.community.chipTwo"]({})}</Badge>
              <Badge variant="outline">{m["sim.matchmaking.right.community.chipThree"]({})}</Badge>
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>

    <footer class="sticky bottom-0 z-20 h-[100px] w-full shrink-0 border-t border-white/10 bg-slate-950/92 shadow-[0_-24px_60px_-36px_rgba(2,6,23,1)] backdrop-blur-xl">
      <div class="flex h-full w-full flex-col justify-center gap-3 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div class="space-y-1">
          <p class={cn(EYEBROW_CLASS, "text-slate-300/75")}>
            {m["sim.matchmaking.footer.adLabel"]({})}
          </p>
          <p class="text-sm leading-6 text-slate-100">{m["sim.matchmaking.footer.adBody"]({})}</p>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" class="rounded-full bg-white/10 text-white">
            {m["sim.matchmaking.header.liveStatus"]({ activeGames: totalLivePlayers })}
          </Badge>
          <Badge variant="outline" class="rounded-full border-white/15 bg-white/5 text-slate-100">
            {selectedQueueLabel}
          </Badge>
          {#if selectedDeck}
            <Badge variant="outline" class="rounded-full border-white/15 bg-white/5 text-slate-100">
              {selectedDeck.name}
            </Badge>
          {/if}
        </div>
      </div>
    </footer>
  </div>
</main>
