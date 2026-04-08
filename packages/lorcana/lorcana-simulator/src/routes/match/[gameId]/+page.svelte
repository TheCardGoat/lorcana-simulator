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
  import { getApiOrigin, getGatewayWsUrl } from "$lib/config/public-url-config.js";
  import { LorcanaTabletopSimulator } from "$lib";
  import { onMount, onDestroy } from "svelte";
  import X from "@lucide/svelte/icons/x";
  import { authSession } from "$lib/auth/session.svelte.js";
  import { GatewayClientStore } from "@/features/gateway/gateway-client.svelte.js";
  import { fetchGatewayTicket } from "@/features/gateway/fetch-ticket.js";
  import UnauthenticatedPlayerOverlay from "@/features/gateway/ui/UnauthenticatedPlayerOverlay.svelte";
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
  import type { LorcanaPlayerSettingsMap } from "$lib/features/simulator/model/player-visual-settings.js";
  import HumanVsAiMatchPage from "@/features/simulator-devtools/vs-ai/HumanVsAiMatchPage.svelte";
  import {
    HUMAN_VS_AI_STORAGE_KEY,
    saveHumanVsAiConfig,
    type HumanVsAiStorage,
  } from "@/features/simulator-devtools/vs-ai/storage.js";
  import type { HumanVsAiMatchConfig } from "@/features/simulator-devtools/vs-ai/types.js";

  let { data } = $props();
  const getGameId = (): string => data.gameId;
  const isSpectator = data.spectate;
  const aiOrchestratorContext = createHumanVsAiContext();
  const PRACTICE_HINT_DISMISSED_AT_KEY = "lorcana.practice-match.hint-dismissed-at";
  const PRACTICE_HINT_HIDE_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

  let practiceOrchestrator = $state<PracticeMatchOrchestrator | null>(null);
  let loadError = $state<string | null>(null);
  let loading = $state(true);
  /** When gateway fails for a quick-match, fall back to local-only play (no replay). */
  let localFallbackStorage = $state<HumanVsAiStorage | null>(null);
  let showPracticeHint = $state(true);
  let pendingRecentHistory = $state<PracticeMatchRecentHistory | null>(null);
  // Visual settings (card back, playmat) keyed by playerId.
  // Populated from game_joined message at load time. For practice matches,
  // playerId = userId; for ranked matches, playerId = gameProfileId.
  // The server resolves both cases when building playerVisualSettings.
  // Updates are saved via REST (PUT /v1/users/me/visual-settings), not via WebSocket.
  let playerVisualSettings = $state<LorcanaPlayerSettingsMap>({});

  const GATEWAY_WS_URL = getGatewayWsUrl();

  let gateway: GatewayClientStore | null = null;

  async function fetchQuickMatchTicket(matchId: string, playerId: string): Promise<string | null> {
    const url = `${getApiOrigin()}/v1/play/quick-match/ticket`;
    console.log("[match-page] fetching quick-match ticket", { url, matchId, playerId });
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchId, playerId }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        console.error("[match-page] quick-match ticket failed", { status: res.status, body });
        return null;
      }
      const data = (await res.json()) as { ticket: string };
      console.log("[match-page] quick-match ticket received", { ticketLength: data.ticket?.length });
      return data.ticket;
    } catch (err) {
      console.error("[match-page] quick-match ticket error", err);
      return null;
    }
  }

  async function initMatch(): Promise<void> {
    const gameId = getGameId();
    console.log("[match-page] initMatch", { gameId });

    const session = loadPracticeSession(gameId);
    if (!session) {
      console.info("[match-page] no local session, redirecting to spectator view", { gameId });
      await goto(`/spectate/${gameId}`, { replaceState: true });
      return;
    }
    console.log("[match-page] session loaded", {
      matchId: session.matchId,
      playerId: session.playerId,
      hasWsTicket: !!session.wsTicket,
    });

    // For quick-match sessions (guest users), fetch a fresh ticket via the
    // quick-match ticket endpoint. For authenticated sessions, use the
    // standard gateway ticket flow.
    const isQuickMatch = !!session.wsTicket;
    let ticket: string | null = null;

    /** Fall back to local-only play for quick-match sessions when gateway is unavailable. */
    const fallbackDeckConfig = session.deckConfig;
    function fallbackToLocal(reason: string): void {
      console.warn("[match-page] falling back to local-only mode", { reason, serverGameId: getGameId() });
      const config = fallbackDeckConfig;
      // Persist to localStorage so /sandbox/simulator/vs-ai can restore on refresh
      saveHumanVsAiConfig(config);
      // Swap the URL without re-mounting so refresh lands on the vs-ai page instead of retrying the server
      history.replaceState(null, "", "/sandbox/simulator/vs-ai");
      const stored = JSON.stringify(config);
      localFallbackStorage = {
        getItem: (key: string) => (key === HUMAN_VS_AI_STORAGE_KEY ? stored : null),
        setItem: () => undefined,
        removeItem: () => undefined,
      };
    }

    if (isQuickMatch) {
      console.log("[match-page] quick-match session, fetching fresh ticket");
      ticket = await fetchQuickMatchTicket(session.matchId, session.playerId);
      if (!ticket) {
        fallbackToLocal("Failed to fetch quick-match ticket");
        return;
      }
    } else {
      await authSession.fetchSession();
      if (!authSession.isAuthenticated) {
        console.warn("[match-page] auth required but not authenticated");
        loadError = "Authentication required. Please sign in and try again.";
        return;
      }
      ticket = await fetchGatewayTicket();
    }

    console.log("[match-page] ticket resolved", { hasTicket: !!ticket, source: isQuickMatch ? "quick-match" : "api" });
    let gameJoinedResolve: (msg: { type: string; [key: string]: unknown }) => void;
    const gameJoinedPromise = new Promise<{ type: string; [key: string]: unknown }>((resolve) => {
      gameJoinedResolve = resolve;
    });

    let gatewayError: string | null = null;

    gateway = new GatewayClientStore(
      GATEWAY_WS_URL,
      ticket ?? undefined,
      (msg) => {
        console.log("[match-page] gateway message", { type: msg.type, ...("code" in msg ? { code: msg.code } : {}), ...("message" in msg ? { message: msg.message } : {}) });

        if (msg.type === "game_error" || msg.type === "error") {
          gatewayError = `${msg.code ?? "unknown"}: ${msg.message ?? "Unknown error"}`;
          console.error("[match-page] gateway game error", msg);
          return;
        }

        if (msg.type === "game_joined") {
          const joinedSettings = (msg as Record<string, unknown>).playerVisualSettings as
            | LorcanaPlayerSettingsMap
            | undefined;
          if (joinedSettings) {
            playerVisualSettings = { ...joinedSettings };
          }
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
      undefined,
      // Provide a refreshTicket callback so reconnections fetch a fresh ticket
      // rather than reusing the original (now-expired) one — which is what caused
      // the "Authentication Lost" overlay to appear permanently after reconnects.
      isQuickMatch ? undefined : fetchGatewayTicket,
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

    console.log("[match-page] connecting gateway", { wsUrl: GATEWAY_WS_URL });
    gateway.connect();
    await welcomePromise;

    if (!gateway.connectionId) {
      console.error("[match-page] gateway connection failed", {
        wsUrl: GATEWAY_WS_URL,
        status: gateway.status,
      });
      if (isQuickMatch) {
        fallbackToLocal("Gateway connection failed");
        return;
      }
      loadError = `Failed to connect to game server at ${GATEWAY_WS_URL}. Check that the game server is running.`;
      return;
    }

    console.log("[match-page] gateway connected", { connectionId: gateway.connectionId });
    gateway.send({ type: "join_game", gameId, role: "player" });

    const gameJoinedMsg = await Promise.race([
      gameJoinedPromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 10_000)),
    ]);

    if (!gameJoinedMsg) {
      const detail = gatewayError
        ? `Server responded with: ${gatewayError}`
        : `No game_joined response within 10s. Gateway authenticated: ${gateway.authenticated}, error: ${gateway.error ?? "none"}`;
      console.error("[match-page] join_game timeout", {
        gameId,
        gatewayError,
        gatewayAuthenticated: gateway.authenticated,
        gatewayStatus: gateway.status,
        gatewayStateError: gateway.error,
      });
      if (isQuickMatch) {
        fallbackToLocal(`join_game timeout: ${detail}`);
        return;
      }
      loadError = `Timeout waiting to join game. ${detail}`;
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
        if (isSpectator) {
          await goto(`/spectate/${getGameId()}`, { replaceState: true });
          return;
        } else {
          await initMatch();
        }
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
  {:else if localFallbackStorage}
    <HumanVsAiMatchPage storage={localFallbackStorage} setupPath="/sandbox/simulator/vs-ai" serverGameId={getGameId()} />
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
        playerSettings={playerVisualSettings}
        postGameGameId={getGameId()}
        isAuthenticated={authSession.isAuthenticated}
        onReturnToMatchmaking={handleReturnToMatchmaking}
      />
    {/key}

    <!--
      Show the authentication-lost overlay whenever the gateway is connected
      but reports unauthenticated. This covers the case where the session ticket
      expired during a reconnect — the refreshTicket callback will fetch a new
      one on the next reconnect, but if the welcome message still comes back
      unauthenticated (e.g. the session cookie itself expired), we surface a
      clear sign-in prompt instead of silently blocking gameplay (THE-880).
      Not shown for quick-match (anonymous) sessions.
    -->
    {#if gateway && gateway.status === "connected" && !gateway.authenticated && !data.spectate}
      <UnauthenticatedPlayerOverlay callbackPath={`/match/${getGameId()}`} />
    {/if}
  {/if}
</main>
