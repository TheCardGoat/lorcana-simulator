<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { Button } from "$lib/design-system/primitives/button";
  import { getGatewayWsUrl } from "$lib/config/public-url-config.js";
  import { LorcanaTabletopSimulator } from "$lib";
  import { onMount, onDestroy } from "svelte";
  import X from "@lucide/svelte/icons/x";
  import { authSession } from "$lib/auth/session.svelte.js";
  import { GatewayClientStore } from "@/features/gateway/gateway-client.svelte.js";
  import { fetchGatewayTicket } from "@/features/gateway/fetch-ticket.js";
  import {
    clearPracticeSession,
    loadPracticeSession,
  } from "@/features/practice-match/practice-match-storage.js";
  import { PracticeMatchOrchestrator } from "@/features/practice-match/practice-match-orchestrator.svelte.js";
  import type {
    PracticeMatchRecentHistory,
    PracticeMatchSnapshot,
  } from "@/features/practice-match/types.js";
  import { createHumanVsAiContext } from "@/features/simulator-devtools/vs-ai/context.js";
  import { immersiveExperience } from "$lib/features/immersive/immersive-state.svelte.js";

  let { data } = $props();
  const getGameId = (): string => data.gameId;
  const aiOrchestratorContext = createHumanVsAiContext();
  const PRACTICE_HINT_DISMISSED_AT_KEY = "lorcana.practice-match.hint-dismissed-at";
  const PRACTICE_HINT_HIDE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

  let practiceOrchestrator = $state<PracticeMatchOrchestrator | null>(null);
  let loadError = $state<string | null>(null);
  let loading = $state(true);
  let showPracticeHint = $state(true);
  let pendingRecentHistory = $state<PracticeMatchRecentHistory | null>(null);

  const GATEWAY_WS_URL = getGatewayWsUrl();

  let gateway: GatewayClientStore | null = null;

  async function initMatch(): Promise<void> {
    const gameId = getGameId();
    const session = loadPracticeSession(gameId);
    if (!session) {
      loadError = "No practice match session found for this game.";
      return;
    }

    await authSession.fetchSession();
    if (!authSession.isAuthenticated) {
      loadError = "Authentication required. Please sign in and try again.";
      return;
    }

    const ticket = await fetchGatewayTicket();
    let gameJoinedResolve: (msg: { type: string; [key: string]: unknown }) => void;
    const gameJoinedPromise = new Promise<{ type: string; [key: string]: unknown }>((resolve) => {
      gameJoinedResolve = resolve;
    });

    gateway = new GatewayClientStore(
      GATEWAY_WS_URL,
      ticket ?? undefined,
      (msg) => {
        if (msg.type === "game_joined") {
          gameJoinedResolve(msg);
          return;
        }

        if (msg.type === "game_recent_history") {
          const history = msg as unknown as PracticeMatchRecentHistory & { gameId: string };
          if (history.gameId !== gameId) {
            return;
          }

          if (practiceOrchestrator) {
            practiceOrchestrator.hydrateRecentHistory({
              acceptedMoves: history.acceptedMoves,
              engineLogs: history.engineLogs,
            });
          } else {
            pendingRecentHistory = {
              acceptedMoves: history.acceptedMoves,
              engineLogs: history.engineLogs,
            };
          }
        }
      },
    );

    const welcomePromise = new Promise<void>((resolve) => {
      const checkInterval = setInterval(() => {
        if (gateway!.connectionId) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 50);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 10_000);
    });

    gateway.connect();
    await welcomePromise;

    if (!gateway.connectionId) {
      loadError = "Failed to connect to game server.";
      return;
    }

    gateway.send({ type: "join_game", gameId, role: "player" });

    const gameJoinedMsg = await Promise.race([
      gameJoinedPromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 10_000)),
    ]);

    if (!gameJoinedMsg) {
      loadError = "Timeout waiting to join game.";
      return;
    }

    const hasState = gameJoinedMsg.state != null;
    const deckConfig = session.deckConfig;

    if (import.meta.env.DEV) {
      console.log("[match-page] game_joined", {
        hasState,
        stateVersion: gameJoinedMsg.stateVersion,
        stateType: gameJoinedMsg.state == null ? "null" : typeof gameJoinedMsg.state,
        stateKeys: gameJoinedMsg.state && typeof gameJoinedMsg.state === "object" ? Object.keys(gameJoinedMsg.state as object) : [],
      });
    }

    if (hasState) {
      const serverState = gameJoinedMsg.state as PracticeMatchSnapshot;

      if (import.meta.env.DEV) {
        console.log("[match-page] restoring from snapshot", {
          hasEngineSnapshot: !!serverState.engineSnapshot,
          hasUndoCheckpoint: !!serverState.engineSnapshot?.undoCheckpoint,
        });
      }

      practiceOrchestrator = new PracticeMatchOrchestrator({
        gameId,
        playerId: session.playerId,
        botPlayerId: session.botPlayerId,
        deckConfig,
        gateway: gateway!,
        restoredSnapshot: serverState,
        restoredVersion: (gameJoinedMsg.stateVersion as number) ?? 0,
        restoredRecentHistory: pendingRecentHistory ?? undefined,
      });
      pendingRecentHistory = null;
    } else {
      practiceOrchestrator = new PracticeMatchOrchestrator({
        gameId,
        playerId: session.playerId,
        botPlayerId: session.botPlayerId,
        deckConfig,
        gateway: gateway!,
      });
    }

    aiOrchestratorContext.set(practiceOrchestrator.orchestrator);
  }

  function hydratePracticeHintVisibility(): void {
    const dismissedAtRaw = localStorage.getItem(PRACTICE_HINT_DISMISSED_AT_KEY);
    if (!dismissedAtRaw) {
      showPracticeHint = true;
      return;
    }

    const dismissedAt = Number.parseInt(dismissedAtRaw, 10);
    if (Number.isNaN(dismissedAt)) {
      localStorage.removeItem(PRACTICE_HINT_DISMISSED_AT_KEY);
      showPracticeHint = true;
      return;
    }

    showPracticeHint = Date.now() - dismissedAt >= PRACTICE_HINT_HIDE_DURATION_MS;
  }

  function dismissPracticeHint(): void {
    localStorage.setItem(PRACTICE_HINT_DISMISSED_AT_KEY, String(Date.now()));
    showPracticeHint = false;
  }

  async function handleReturnToMatchmaking(): Promise<void> {
    clearPracticeSession();
    await goto("/matchmaking");
  }

  onMount(() => {
    const detachImmersive = immersiveExperience.attach();
    immersiveExperience.activateRouteChrome();
    hydratePracticeHintVisibility();

    void (async () => {
      try {
        await initMatch();
      } catch (error) {
        loadError = error instanceof Error ? error.message : "Failed to initialize match.";
      } finally {
        loading = false;
      }
    })();

    return () => {
      detachImmersive();
      immersiveExperience.deactivateRouteChrome();
    };
  });

  onDestroy(() => {
    immersiveExperience.deactivateRouteChrome();
    aiOrchestratorContext.set(null);
    practiceOrchestrator?.dispose();
    gateway?.destroy();
  });
</script>

<main class="immersive-app-shell relative h-screen min-h-0 text-slate-100">
  {#if loading}
    <div class="grid h-full place-items-center px-4 text-slate-400">
      Connecting to match...
    </div>
  {:else if loadError}
    <div class="mx-auto flex h-full max-w-3xl items-center justify-center px-4 py-8">
      <Card class="w-full border-rose-400/20 bg-slate-950/88 text-slate-100">
        <CardHeader>
          <CardTitle>Match failed to load</CardTitle>
          <CardDescription class="text-rose-200">{loadError}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onclick={() => goto("/")}>Back to lobby</Button>
        </CardContent>
      </Card>
    </div>
  {:else if practiceOrchestrator}
    {#if showPracticeHint}
      <div class="pointer-events-none absolute left-0 right-0 top-4 z-20 flex justify-center px-4">
        <div class="pointer-events-auto w-full max-w-xl rounded-2xl border border-sky-400/25 bg-slate-950/88 px-4 py-3 shadow-[0_18px_50px_-30px_rgba(14,165,233,0.85)] backdrop-blur-md">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0 flex-1">
              <p class="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-200/80">
                Practice vs Bot
              </p>
              <p class="mt-1 text-sm leading-6 text-slate-100">
                This practice room syncs through the backend for reconnects, while bot decisions stay on
                this device. AI controls live on the opponent panel, and takeover lets you pilot the bot
                seat manually.
              </p>
            </div>

            <button
              type="button"
              class="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
              aria-label="Dismiss practice match hint for one week"
              onclick={dismissPracticeHint}
            >
              <X class="size-4" />
            </button>
          </div>
        </div>
      </div>
    {/if}

    {#key practiceOrchestrator.orchestrator.sessionRevision}
      <LorcanaTabletopSimulator
        engine={practiceOrchestrator.currentEngine}
        readModel={practiceOrchestrator.readModel}
        postGameGameId={getGameId()}
        onReturnToMatchmaking={handleReturnToMatchmaking}
      />
    {/key}
  {/if}
</main>
