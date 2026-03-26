<script lang="ts">
  import { Badge } from '$lib/design-system/primitives/badge';
  import { Button } from '$lib/design-system/primitives/button';
  import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '$lib/design-system/primitives/card';
  import { m } from "$lib/i18n/messages.js";
  import { getGatewayWsUrl } from '$lib/config/public-url-config.js';
  import { Select } from '$lib/design-system/primitives/select';
  import { Separator } from '$lib/design-system/primitives/separator';
  import * as Tooltip from '$lib/design-system/primitives/tooltip/index.js';
  import { cn } from '$lib/utils.js';
  import { DECK_FIXTURES } from '@/features/simulator-devtools/deck-fixtures/index.js';
  import { authSession } from '$lib/auth/session.svelte.js';
  import SignInDialog from './SignInDialog.svelte';
  import UserProfileMenu from './UserProfileMenu.svelte';
  import LogIn from '@lucide/svelte/icons/log-in';
  import LogOut from '@lucide/svelte/icons/log-out';
  import Github from '@lucide/svelte/icons/github';
  import { GatewayClientStore } from '@/features/gateway/gateway-client.svelte.js';
  import { fetchGatewayTicket } from '@/features/gateway/fetch-ticket.js';
  import ConnectionStatus from '@/features/gateway/ui/ConnectionStatus.svelte';
  import { onMount, onDestroy } from 'svelte';
  import Bot from '@lucide/svelte/icons/bot';
  import CircleHelp from '@lucide/svelte/icons/circle-help';
  import Loader from '@lucide/svelte/icons/loader-circle';
  import { goto } from '$app/navigation';
  import {
    createPracticeMatch,
    deckTextToHistoricDeck,
  } from '@/features/practice-match/practice-match-api.js';
  import { savePracticeSession } from '@/features/practice-match/practice-match-storage.js';
  import { DEFAULT_AUTOMATED_ACTION_STRATEGY_ID } from '@tcg/lorcana-engine';
  import { createAutomatedMatchSeed } from '@/features/simulator-devtools/ai-match/config.js';
  import { LiveMatchesStore } from '@/features/matchmaking/state/live-matches.svelte.js';
  import LiveMatchesTable from './LiveMatchesTable.svelte';
  import { MatchmakingQueueStore } from '@/features/matchmaking/state/matchmaking-queue.svelte.js';
  import Timer from '@lucide/svelte/icons/timer';
  import CheckCircle from '@lucide/svelte/icons/check-circle-2';
  import AlertCircle from '@lucide/svelte/icons/alert-circle';
  import X from '@lucide/svelte/icons/x';

  const MATCHMAKING_QUEUES = [
    // {
    //   id: "winterspell-bo1",
    //   mode: "bo1",
    //   format: "winterspell",
    //   livePlayers: 126,
    //   queuedPlayers: 8,
    //   estimatedWait: "00:24",
    //   featured: true,
    // },
    // {
    //   id: "winterspell-bo3",
    //   mode: "bo3",
    //   format: "winterspell",
    //   livePlayers: 64,
    //   queuedPlayers: 3,
    //   estimatedWait: "01:10",
    //   featured: false,
    // },
    // {
    //   id: "infinity-bo1",
    //   mode: "bo1",
    //   format: "infinity",
    //   livePlayers: 88,
    //   queuedPlayers: 5,
    //   estimatedWait: "00:38",
    //   featured: false,
    // },
    {
      id: 'infinity-bo3',
      mode: 'bo3',
      format: 'infinity',
      livePlayers: 41,
      queuedPlayers: 2,
      estimatedWait: '01:42',
      featured: false,
    },
  ] as const;

  const BULLETIN_ITEMS = [
    'sim.matchmaking.bulletin.itemOne',
    'sim.matchmaking.bulletin.itemTwo',
    'sim.matchmaking.bulletin.itemThree',
  ] as const;

  const EYEBROW_CLASS =
    'text-muted-foreground text-xs font-semibold uppercase tracking-[0.24em]';
  const SURFACE_CARD_CLASS =
    'border-white/10 bg-slate-950/72 shadow-[0_24px_48px_-32px_rgba(15,23,42,0.92)] backdrop-blur-sm';
  const LANE_CLASS =
    'overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94),rgba(2,6,23,0.98))] shadow-[0_32px_80px_-52px_rgba(2,6,23,0.95)]';
  const LANE_SCROLL_CLASS =
    'space-y-4 px-4 py-5 sm:px-5 xl:h-full xl:overflow-y-auto [scrollbar-color:rgba(148,163,184,0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 hover:[&::-webkit-scrollbar-thumb]:bg-white/25';
  const HERO_NAV_CAPSULE_CLASS =
    'inline-flex max-w-full items-center overflow-x-auto overflow-y-hidden rounded-full border border-white/10 bg-black/50 py-1 shadow-none backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-w-none';
  const HERO_NAV_SEGMENT_BTN =
    'h-11 min-h-11 shrink-0 rounded-none border-0 bg-transparent px-4 text-sm font-semibold text-slate-100 shadow-none hover:bg-white/10 hover:text-white sm:px-5';
  const HERO_NAV_DIVIDER_CLASS =
    'mx-1 h-7 w-px shrink-0 self-center bg-white/25';
  const ENGINE_REPO_URL = 'https://github.com/theCardGoat/lorcana-engine';
  const LORCANA_ENGINE_DISCLAIMER_URL =
    'https://github.com/TheCardGoat/lorcana-engine/blob/main/DISCLAIMER.md';
  const COMMUNITY_DISCORD_URL = 'https://discord.gg/FxxWaJW2rP';
  const DISNEY_LORCANA_OFFICIAL_URL = 'https://www.disneylorcana.com';
  const HERO_STAT_CARD_CLASS =
    'rounded-[1.5rem] border border-white/12 bg-slate-950/78 p-4 shadow-[0_24px_48px_-36px_rgba(2,6,23,1)]';

  type QueueId =
    | 'winterspell-bo1'
    | 'winterspell-bo3'
    | 'infinity-bo1'
    | 'infinity-bo3';
  type QueueMode = 'bo1' | 'bo3';
  type QueueFormat = 'winterspell' | 'infinity';
  type MatchmakingQueue = {
    id: QueueId;
    mode: QueueMode;
    format: QueueFormat;
    livePlayers: number;
    queuedPlayers: number;
    estimatedWait: string;
    featured: boolean;
  };
  interface DeckOption {
    id: string;
    name: string;
    cardCount: number;
  }

  function createDeckId(name: string, index: number): string {
    const normalized = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return `${normalized.length > 0 ? normalized : 'deck'}-${index + 1}`;
  }

  function extractDeckCardCount(deckList: string): number {
    return deckList
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .reduce((total, line) => {
        const quantityToken = line.split(/\s+/, 1)[0];
        const quantity = Number.parseInt(quantityToken ?? '', 10);
        return Number.isNaN(quantity) ? total + 1 : total + quantity;
      }, 0);
  }

  function getQueueLabel(queueId: QueueId): string {
    switch (queueId) {
      case 'winterspell-bo1':
        return m['sim.matchmaking.queue.winterspell-bo1.label']({});
      case 'winterspell-bo3':
        return m['sim.matchmaking.queue.winterspell-bo3.label']({});
      case 'infinity-bo1':
        return m['sim.matchmaking.queue.infinity-bo1.label']({});
      case 'infinity-bo3':
        return m['sim.matchmaking.queue.infinity-bo3.label']({});
    }
  }

  function getQueueMode(queueId: QueueId): string {
    switch (queueId) {
      case 'winterspell-bo1':
        return m['sim.matchmaking.queue.winterspell-bo1.mode']({});
      case 'winterspell-bo3':
        return m['sim.matchmaking.queue.winterspell-bo3.mode']({});
      case 'infinity-bo1':
        return m['sim.matchmaking.queue.infinity-bo1.mode']({});
      case 'infinity-bo3':
        return m['sim.matchmaking.queue.infinity-bo3.mode']({});
    }
  }

  function getQueueDescription(queueId: QueueId): string {
    switch (queueId) {
      case 'winterspell-bo1':
        return m['sim.matchmaking.queue.winterspell-bo1.description']({});
      case 'winterspell-bo3':
        return m['sim.matchmaking.queue.winterspell-bo3.description']({});
      case 'infinity-bo1':
        return m['sim.matchmaking.queue.infinity-bo1.description']({});
      case 'infinity-bo3':
        return m['sim.matchmaking.queue.infinity-bo3.description']({});
    }
  }

  function getQueueFormatLabel(format: QueueFormat): string {
    switch (format) {
      case 'winterspell':
        return m['sim.matchmaking.format.winterspell']({});
      case 'infinity':
        return m['sim.matchmaking.format.infinity']({});
    }
  }

  const deckOptions: DeckOption[] = DECK_FIXTURES.map((deck, index) => ({
    id: createDeckId(deck.name, index),
    name: deck.name,
    cardCount: extractDeckCardCount(deck.cards),
  }));

  let selectedQueueId = $state<MatchmakingQueue['id']>(MATCHMAKING_QUEUES[0].id);
  let selectedDeckId = $state(deckOptions[0]?.id ?? '');
  let signInDialogOpen = $state(false);

  const GATEWAY_WS_URL = getGatewayWsUrl();

  const queueStore = new MatchmakingQueueStore();

  function handleGatewayMessage(msg: { type: string; [key: string]: unknown }): void {
    if (msg.type === 'match_found') {
      const m = msg as unknown as { matchId: string; gameId: string; opponentDisplayName?: string; format: string; mode: string };
      queueStore.handleMatchFound(m);
    } else if (msg.type === 'matchmaking_status') {
      const m = msg as unknown as { queued: boolean; queuedAt?: number; expiresAt?: number; position?: number };
      queueStore.handleStatusUpdate(m);
    } else if (msg.type === 'matchmaking_cancelled') {
      queueStore.handleCancelled((msg.reason as 'timeout' | 'manual') ?? 'manual');
    }
  }

  /** After the socket is OPEN, sync queue UI from the server (reconnect-safe). */
  function requestMatchmakingPollIfQueued(): void {
    if (queueStore.status === 'queued') {
      gateway.send({ type: 'matchmaking_poll' });
    }
  }

  let gateway = $state(
    new GatewayClientStore(GATEWAY_WS_URL, undefined, handleGatewayMessage, requestMatchmakingPollIfQueued),
  );

  onMount(async () => {
    // Check for existing session first
    await authSession.fetchSession();

    // If authenticated, fetch a ticket before connecting and check queue status
    if (authSession.isAuthenticated) {
      const ticket = await fetchGatewayTicket();
      if (ticket) {
        gateway = new GatewayClientStore(
          GATEWAY_WS_URL,
          ticket,
          handleGatewayMessage,
          requestMatchmakingPollIfQueued,
        );
      }
      // Check if already in queue (rejoin detection)
      await queueStore.checkStatus();
    }

    gateway.connect();
    liveMatchesStore.startPolling(20_000);
  });

  onDestroy(() => {
    gateway.destroy();
    liveMatchesStore.destroy();
    queueStore.destroy();
  });

  function reconnectGatewayAnonymous(): void {
    gateway.destroy();
    gateway = new GatewayClientStore(
      GATEWAY_WS_URL,
      undefined,
      handleGatewayMessage,
      requestMatchmakingPollIfQueued,
    );
    gateway.connect();
  }

  const selectedQueue = $derived(
    MATCHMAKING_QUEUES.find((queue) => queue.id === selectedQueueId) ??
      MATCHMAKING_QUEUES[0],
  );
  const selectedDeck = $derived(
    deckOptions.find((deck) => deck.id === selectedDeckId) ?? null,
  );
  const totalLivePlayers = $derived(gateway.onlineCount);

  function openSignInDialog(): void {
    signInDialogOpen = true;
  }

  async function handleHeaderSignOut(): Promise<void> {
    await authSession.signOut();
    reconnectGatewayAnonymous();
  }

  const liveMatchesStore = new LiveMatchesStore();

  let practiceLoading = $state(false);
  let practiceError = $state<string | null>(null);

  // Matchmaking queue state
  let selectedQueueFormat = $state<'infinity' | 'cc-ROF'>('infinity');
  let selectedQueueMode = $state<'1' | '3'>('3');

  function formatQueueTimeElapsed(): string {
    if (!queueStore.queuedAt) return '0:00';
    const elapsedMs = Date.now() - queueStore.queuedAt;
    const totalSecs = Math.floor(elapsedMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  function formatQueueTimeRemaining(): string {
    const totalSecs = Math.floor(queueStore.timeRemainingMs / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }

  async function handleJoinQueue(): Promise<void> {
    if (!authSession.isAuthenticated) {
      openSignInDialog();
      return;
    }
    if (!selectedDeck) {
      return;
    }
    // Use gameProfileId from session user id as a placeholder until profiles are wired
    const gameProfileId = authSession.user?.id ?? '';
    await queueStore.join({
      gameProfileId,
      deckListId: selectedDeckId,
      format: selectedQueueFormat,
      mode: selectedQueueMode,
    });
    if (queueStore.status === 'queued') {
      gateway.send({ type: 'matchmaking_poll' });
    }
  }

  async function handleLeaveQueue(): Promise<void> {
    await queueStore.leave();
  }

  async function startPracticeMatch(): Promise<void> {
    if (!authSession.isAuthenticated) {
      openSignInDialog();
      return;
    }

    if (!selectedDeck) {
      practiceError = 'Please select a deck first.';
      return;
    }

    practiceLoading = true;
    practiceError = null;

    try {
      const deckIndex = deckOptions.findIndex((d) => d.id === selectedDeckId);
      const fixture = DECK_FIXTURES[deckIndex];
      if (!fixture) {
        practiceError = 'Selected deck not found.';
        practiceLoading = false;
        return;
      }

      const playerDeck = await deckTextToHistoricDeck(fixture.cards);
      // Pick a different deck for the bot (next deck, wrapping around)
      const botFixtureIndex = (deckIndex + 1) % DECK_FIXTURES.length;
      const botFixture = DECK_FIXTURES[botFixtureIndex];
      const botDeck = await deckTextToHistoricDeck(botFixture.cards);

      const result = await createPracticeMatch({
        gameType: 'lorcana',
        playerDeck,
        botDeck,
      });

      savePracticeSession({
        matchId: result.matchId,
        gameId: result.gameId,
        playerId: result.playerId,
        botPlayerId: result.botPlayerId,
        deckConfig: {
          playerOneDeckText: fixture.cards,
          playerTwoDeckText: botFixture.cards,
          playerOneFixtureId: fixture.id,
          playerTwoFixtureId: botFixture.id,
          strategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
          seed: createAutomatedMatchSeed(),
        },
      });

      await goto(`/match/${result.gameId}`);
    } catch (error) {
      practiceError =
        error instanceof Error
          ? error.message
          : 'Failed to create practice match.';
    } finally {
      practiceLoading = false;
    }
  }
</script>

<main
  class="immersive-app-shell simulator-dark relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_28%),linear-gradient(180deg,#020617_0%,#020617_46%,#030712_100%)] text-foreground xl:h-screen xl:overflow-hidden"
>
  <div
    class="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_80%_100%,rgba(14,165,233,0.1),transparent_28%)]"
    aria-hidden="true"
  ></div>

  <div
    class="relative flex min-h-screen w-full flex-col gap-4 xl:h-full xl:min-h-0"
  >
    <section
      class="relative shrink-0 overflow-hidden border-y border-white/10 bg-slate-950 shadow-[0_40px_120px_-60px_rgba(2,6,23,1)] xl:h-[24svh] xl:max-h-[25svh] xl:min-h-[13.5rem]"
    >
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

      <div
        class="absolute right-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-wrap items-center justify-end gap-3 sm:right-6 sm:max-w-[calc(100%-3rem)] lg:right-8 lg:max-w-[calc(100%-4rem)]"
      >
        <nav
          class="flex min-w-0 flex-row flex-wrap items-center justify-end gap-3"
          aria-label={m['sim.matchmaking.header.mainNavAria']({})}
        >
          <div class={HERO_NAV_CAPSULE_CLASS}>
            <ConnectionStatus embedded {gateway} />
            {#if totalLivePlayers >= 50}
              <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
              <div
                class="flex h-11 shrink-0 items-center px-3 sm:px-4"
                role="status"
              >
                <Badge
                  variant="secondary"
                  class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white shadow-none"
                >
                  {m['sim.matchmaking.header.liveStatus']({
                    activeGames: totalLivePlayers,
                  })}
                </Badge>
              </div>
            {/if}
            <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
            <Button variant="ghost" size="sm" class={HERO_NAV_SEGMENT_BTN}>
              {m['sim.matchmaking.header.utilityDecks']({})}
            </Button>
            <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
            <Button variant="ghost" size="sm" class={HERO_NAV_SEGMENT_BTN}>
              {m['sim.matchmaking.header.utilityQueues']({})}
            </Button>
            <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
            <Button variant="ghost" size="sm" class={HERO_NAV_SEGMENT_BTN}>
              {m['sim.matchmaking.header.utilityNotes']({})}
            </Button>

            {#if authSession.isAuthenticated && authSession.user}
              <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
              <UserProfileMenu
                user={authSession.user}
                barSignOut={true}
                onSignedOut={reconnectGatewayAnonymous}
              />
              <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
              <Button
                variant="ghost"
                size="sm"
                class={cn(HERO_NAV_SEGMENT_BTN, 'hidden lg:inline-flex')}
                onclick={handleHeaderSignOut}
              >
                <LogOut
                  class="mr-2 size-4 opacity-90"
                  title={m['sim.matchmaking.header.logOut']({})}
                />
              </Button>
            {:else if !authSession.isLoading}
              <span class={HERO_NAV_DIVIDER_CLASS} aria-hidden="true"></span>
              <Button
                variant="ghost"
                size="sm"
                class={HERO_NAV_SEGMENT_BTN}
                onclick={openSignInDialog}
              >
                <LogIn class="mr-2 size-4 shrink-0 opacity-90" />
                {m['sim.auth.signIn.headerButton']({})}
              </Button>
            {/if}
          </div>

          <div
            class="inline-flex h-11 shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-black/50 px-1.5 shadow-none backdrop-blur-md"
            aria-label={m['sim.matchmaking.header.socialNavAria']({})}
          >
            <a
              href={COMMUNITY_DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-100 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={m['sim.matchmaking.header.linkDiscordAria']({})}
            >
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.007-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.074.074 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"
                />
              </svg>
            </a>
            <a
              href={ENGINE_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="flex size-10 shrink-0 items-center justify-center rounded-full text-slate-100 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={m['sim.matchmaking.header.linkGithubAria']({})}
            >
              <Github class="size-5" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>

      <div
        class="relative grid min-h-[14rem] justify-items-start gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:p-8 xl:h-full xl:min-h-0 xl:grid-cols-[minmax(0,1fr)_22rem]"
      >
        <div
          class="flex w-full max-w-3xl flex-col items-start justify-start gap-4 text-center sm:gap-5 lg:flex-row lg:items-center lg:justify-center lg:gap-6"
        >
          <img
            src="/brand/lorcanito-icon.svg"
            width="96"
            height="96"
            alt=""
            class="size-16 shrink-0 rounded-2xl shadow-[0_12px_40px_-20px_rgba(0,0,0,0.75)] sm:size-20 xl:size-24"
            aria-hidden="true"
          />
          <div
            class="flex min-w-0 w-full max-w-2xl flex-col items-start gap-3 text-left"
          >
            <p class={cn(EYEBROW_CLASS, 'text-slate-200/80')}>
              {m['sim.matchmaking.header.kicker']({})}
            </p>
            <h1
              class="scroll-m-20 w-full text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl xl:text-5xl"
            >
              {m['sim.matchmaking.header.title']({})}
            </h1>
            <p
              class="w-full text-pretty text-sm leading-6 text-slate-200/88 sm:text-base"
            >
              {m['sim.matchmaking.header.tagline']({})}
              <span class="ms-1.5 inline-block align-middle sm:ms-2">
                <Tooltip.Root delayDuration={200}>
                  <Tooltip.Trigger>
                    {#snippet child({ props })}
                      <button
                        type="button"
                        class="-my-0.5 inline-flex text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                        aria-label={m[
                          'sim.matchmaking.header.disclaimerHintAria'
                        ]({})}
                        {...props}
                      >
                        <CircleHelp
                          class="size-5 shrink-0 opacity-90 sm:size-[1.35rem]"
                          aria-hidden="true"
                        />
                      </button>
                    {/snippet}
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    side="bottom"
                    align="center"
                    sideOffset={8}
                    class="max-w-[min(22rem,calc(100vw-2rem))] border border-white/15 bg-slate-950/98 px-3 py-2.5 text-left text-xs leading-relaxed text-slate-100 shadow-xl data-[side=bottom]:slide-in-from-top-2"
                  >
                    <p class="text-pretty text-slate-200">
                      {m['sim.matchmaking.header.disclaimerTooltipBody']({})}
                    </p>
                    <a
                      href={LORCANA_ENGINE_DISCLAIMER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-2 inline-flex max-w-full break-all text-sm font-medium text-sky-300 underline underline-offset-2 hover:text-sky-200"
                    >
                      {m['sim.matchmaking.header.disclaimerTooltipLinkLabel'](
                        {},
                      )}
                    </a>
                  </Tooltip.Content>
                </Tooltip.Root>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <div
      class="grid gap-4 px-4 sm:px-6 lg:px-8 xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(18rem,1fr)_minmax(28rem,1.15fr)_minmax(18rem,1fr)]"
    >
      <aside class={cn(LANE_CLASS, 'xl:min-h-0')}>
        <div class={LANE_SCROLL_CLASS}>
          <Card class={SURFACE_CARD_CLASS}>
            <CardContent class="pt-5">
              <LiveMatchesTable
                store={liveMatchesStore}
              />
            </CardContent>
          </Card>
        </div>
      </aside>

      <section class={cn(LANE_CLASS, 'xl:min-h-0')}>
        <div class={LANE_SCROLL_CLASS}>
          <Card
            class={cn(
              SURFACE_CARD_CLASS,
              'overflow-hidden border-amber-500/20',
            )}
          >
            <CardHeader class="border-b border-white/10">
              <div>
                <!-- <p class={EYEBROW_CLASS}>
                  {m['sim.matchmaking.practice.eyebrow']({})}
                </p> -->
                <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                  {m['sim.matchmaking.practice.title']({})}
                </CardTitle>
                <!-- <CardDescription class="mt-2 leading-7">
                  {m['sim.matchmaking.practice.description']({})}
                </CardDescription> -->
              </div>
              <!-- <CardAction>
                <Badge
                  variant="outline"
                  class="border-amber-500/30 text-amber-200"
                >
                  {m['sim.matchmaking.practice.badge']({})}
                </Badge>
              </CardAction> -->
            </CardHeader>

            <CardContent class="space-y-6">
              <div class="rounded-xl border border-sky-400/20 bg-sky-400/10 p-4 text-sm leading-6 text-slate-100">
                <p class={cn(EYEBROW_CLASS, 'text-sky-100/80')}>
                  {m['sim.matchmaking.practice.hybridRoomEyebrow']({})}
                </p>
                <p class="mt-2">
                  {m['sim.matchmaking.practice.hybridRoomDescription']({})}
                </p>
              </div>

              <div class="space-y-2">
                <label
                  class={cn(EYEBROW_CLASS, 'block')}
                  for="practice-deck-select"
                >
                  {m['sim.matchmaking.deckSelect.label']({})}
                </label>
                <Select
                  id="practice-deck-select"
                  bind:value={selectedDeckId}
                  disabled={deckOptions.length === 0}
                  class="border-white/10 bg-white/5"
                >
                  {#if deckOptions.length === 0}
                    <option value=""
                      >{m['sim.matchmaking.deckSelect.none']({})}</option
                    >
                  {:else}
                    {#each deckOptions as deck}
                      <option value={deck.id}>{deck.name}</option>
                    {/each}
                  {/if}
                </Select>
              </div>

              {#if selectedDeck}
                <div
                  class="rounded-xl border border-white/10 bg-white/5 p-4"
                  aria-live="polite"
                >
                  <p class={EYEBROW_CLASS}>
                    {m['sim.matchmaking.selectedDeck.kicker']({})}
                  </p>
                  <h3
                    class="mt-3 scroll-m-20 text-xl font-semibold tracking-tight"
                  >
                    {selectedDeck.name}
                  </h3>
                  <p class="text-muted-foreground mt-2 text-sm leading-6">
                    {m['sim.matchmaking.selectedDeck.cardsLoaded']({
                      count: selectedDeck.cardCount,
                    })}
                  </p>
                </div>
              {/if}

              <div class="space-y-3">
                <Button
                  class="h-11 w-full text-base"
                  disabled={practiceLoading || !selectedDeck}
                  onclick={startPracticeMatch}
                >
                  {#if practiceLoading}
                    <Loader class="mr-2 size-5 animate-spin" />
                    Creating match...
                  {:else if !authSession.isAuthenticated}
                    <LogIn class="mr-2 size-4" />
                    {m['sim.matchmaking.practice.cta']({})}
                  {:else}
                    <Bot class="mr-2 size-5" />
                    {m['sim.matchmaking.practice.cta']({})}
                  {/if}
                </Button>

                {#if practiceError}
                  <div
                    class="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-200"
                    role="alert"
                  >
                    {practiceError}
                  </div>
                {/if}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <aside class={cn(LANE_CLASS, 'xl:min-h-0')}>
        <div class={LANE_SCROLL_CLASS}>
          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>{m['sim.matchmaking.queue.eyebrow']({})}</p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m['sim.matchmaking.queue.title']({})}
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-4">

              {#if queueStore.status === 'blocked'}
                <!-- Active match guard -->
                <div
                  class="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-6 text-amber-200"
                  role="alert"
                >
                  <div class="flex items-start gap-2">
                    <AlertCircle class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <div>
                      <p class="font-semibold text-amber-100">{m['sim.matchmaking.queue.blocked.activeMatch']({})}</p>
                      <p class="mt-1 text-amber-200/80">{queueStore.blockReason}</p>
                    </div>
                  </div>
                </div>

              {:else if queueStore.status === 'match_found'}
                <!-- Match found overlay -->
                <div class="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <CheckCircle class="size-10 text-emerald-400" aria-hidden="true" />
                  <p class="text-lg font-semibold text-emerald-100">{m['sim.matchmaking.queue.matchFound.title']({})}</p>
                  <p class="text-sm text-emerald-200/80">{m['sim.matchmaking.queue.matchFound.subtitle']({})}</p>
                </div>

              {:else if queueStore.status === 'queued'}
                <!-- Waiting in queue -->
                <div class="rounded-xl border border-sky-400/20 bg-sky-400/8 p-4">
                  <div class="flex items-center gap-3">
                    <Loader class="size-5 shrink-0 animate-spin text-sky-300" aria-hidden="true" />
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-semibold text-sky-100">{m['sim.matchmaking.queue.searching']({})}</p>
                      <p class="text-muted-foreground mt-0.5 text-xs">
                        {selectedQueueFormat} · Best of {selectedQueueMode}
                        {#if queueStore.position}
                          · #{queueStore.position} in queue
                        {/if}
                      </p>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center justify-between gap-2 text-xs text-slate-400">
                    <div class="flex items-center gap-1.5">
                      <Timer class="size-3.5" aria-hidden="true" />
                      <span aria-live="polite">{formatQueueTimeElapsed()} elapsed</span>
                    </div>
                    <span aria-live="polite">expires in {formatQueueTimeRemaining()}</span>
                  </div>
                  <!-- Progress bar showing time remaining -->
                  <div class="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      class="h-full rounded-full bg-sky-400/60 transition-all duration-1000"
                      style="width: {Math.max(0, Math.min(100, Math.round((queueStore.timeRemainingMs / 300_000) * 100)))}%"
                    ></div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  class="h-10 w-full border-white/10 bg-transparent text-slate-200 hover:bg-white/5 hover:text-white"
                  onclick={handleLeaveQueue}
                >
                  <X class="mr-2 size-4" />
                  {m['sim.matchmaking.queue.cancel']({})}
                </Button>

              {:else}
                <!-- Idle — show join form -->
                <div class="space-y-3">
                  <div class="space-y-1.5">
                    <label class={cn(EYEBROW_CLASS, 'block')} for="queue-format-select">{m['sim.matchmaking.queue.format.label']({})}</label>
                    <Select
                      id="queue-format-select"
                      bind:value={selectedQueueFormat}
                      class="border-white/10 bg-white/5"
                    >
                      <option value="infinity">{m['sim.matchmaking.queue.format.infinity']({})}</option>
                      <option value="cc-ROF">{m['sim.matchmaking.queue.format.ccROF']({})}</option>
                    </Select>
                  </div>
                  <div class="space-y-1.5">
                    <label class={cn(EYEBROW_CLASS, 'block')} for="queue-mode-select">{m['sim.matchmaking.queue.mode.label']({})}</label>
                    <Select
                      id="queue-mode-select"
                      bind:value={selectedQueueMode}
                      class="border-white/10 bg-white/5"
                    >
                      <option value="3">{m['sim.matchmaking.queue.mode.bo3']({})}</option>
                      <option value="1">{m['sim.matchmaking.queue.mode.bo1']({})}</option>
                    </Select>
                  </div>
                </div>

                {#if queueStore.error}
                  <div
                    class="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                    role="alert"
                  >
                    {queueStore.error}
                  </div>
                {/if}

                <Button
                  class="h-11 w-full text-base"
                  disabled={!selectedDeck || queueStore.status === 'checking'}
                  onclick={handleJoinQueue}
                >
                  {#if queueStore.status === 'checking'}
                    <Loader class="mr-2 size-4 animate-spin" />
                    Checking status…
                  {:else if !authSession.isAuthenticated}
                    <LogIn class="mr-2 size-4" />
                    Sign in to join queue
                  {:else if !selectedDeck}
                    Select a deck first
                  {:else}
                    Find a Match
                  {/if}
                </Button>
              {/if}

            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>
                {m['sim.matchmaking.right.bulletin.eyebrow']({})}
              </p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m['sim.matchmaking.right.bulletin.title']({})}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul
                class="my-6 ms-6 list-disc space-y-2 text-sm leading-7 marker:text-muted-foreground"
              >
                {#each BULLETIN_ITEMS as item}
                  <li>{m[item]({})}</li>
                {/each}
              </ul>
            </CardContent>
          </Card>

          <Card class={SURFACE_CARD_CLASS}>
            <CardHeader>
              <p class={EYEBROW_CLASS}>
                {m['sim.matchmaking.right.community.eyebrow']({})}
              </p>
              <CardTitle class="scroll-m-20 text-2xl tracking-tight">
                {m['sim.matchmaking.right.community.title']({})}
              </CardTitle>
              <CardDescription class="leading-7">
                {m['sim.matchmaking.right.community.body']({})}
              </CardDescription>
            </CardHeader>
            <CardContent class="flex flex-wrap gap-2">
              <Badge variant="outline"
                >{m['sim.matchmaking.right.community.chipOne']({})}</Badge
              >
              <Badge variant="outline"
                >{m['sim.matchmaking.right.community.chipTwo']({})}</Badge
              >
              <Badge variant="outline"
                >{m['sim.matchmaking.right.community.chipThree']({})}</Badge
              >
            </CardContent>
          </Card>
        </div>
      </aside>
    </div>

    <footer
      class="sticky bottom-0 z-20 flex max-h-[100px] min-h-0 w-full shrink-0 flex-col overflow-hidden border-t border-white/10 bg-slate-950/92 shadow-[0_-24px_60px_-36px_rgba(2,6,23,1)] backdrop-blur-xl"
    >
      <div
        class="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-3 py-2 sm:px-6 lg:px-8"
      >
        <div
          class="min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden overscroll-y-contain text-xs leading-snug text-slate-400 [scrollbar-color:rgba(148,163,184,0.45)_transparent] [scrollbar-width:thin] sm:text-[0.8125rem] sm:leading-snug [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/30"
        >
          <p class="text-pretty">
            {m['sim.matchmaking.footer.disclaimerPara1Prefix']({})}
            <a
              href={DISNEY_LORCANA_OFFICIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-sky-300/90 underline underline-offset-2 hover:text-sky-200"
              aria-label={m[
                'sim.matchmaking.footer.disclaimerOfficialSiteAria'
              ]({})}
            >
              {m['sim.matchmaking.footer.disclaimerOfficialSiteLabel']({})}
            </a>.
          </p>
          <p class="text-pretty">
            {m['sim.matchmaking.footer.disclaimerPara2']({})}
          </p>
          <p class="text-pretty">
            {m['sim.matchmaking.footer.disclaimerPara3']({})}
          </p>
        </div>
      </div>
    </footer>
  </div>

  <SignInDialog bind:open={signInDialogOpen} />
</main>
