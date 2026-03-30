<script lang="ts">
  import { goto } from "$app/navigation";
  import { onDestroy, onMount } from "svelte";
  import { Button } from "$lib/design-system/primitives/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { getGatewayWsUrl } from "$lib/config/public-url-config.js";
  import { GatewayClientStore } from "@/features/gateway/gateway-client.svelte.js";
  import { LorcanaTabletopSimulator } from "$lib";
  import {
    SpectatorMatchOrchestrator,
    extractMatchState,
  } from "@/features/spectator/spectator-match-orchestrator.svelte.js";
  import type { CardsMaps, LorcanaMatchState } from "@tcg/lorcana-engine";

  let { data } = $props();
  const getGameId = (): string => data.gameId;

  const GATEWAY_WS_URL = getGatewayWsUrl();

  let gateway: GatewayClientStore | null = null;
  let orchestrator = $state<SpectatorMatchOrchestrator | null>(null);
  let loading = $state(true);
  let loadError = $state<string | null>(null);

  function parseStateUpdatePayload(msg: Record<string, unknown>) {
    return {
      actorId: String(msg.actorId ?? ""),
      moveType: String(msg.moveType ?? ""),
      stateVersion: Number(msg.stateVersion ?? 0),
      patches: Array.isArray(msg.patches) ? msg.patches : [],
      state: msg.state ?? undefined,
      acceptedMove:
        msg.acceptedMove && typeof msg.acceptedMove === "object" && !Array.isArray(msg.acceptedMove)
          ? (msg.acceptedMove as {
              actorId: string;
              moveId: string;
              stateVersion: number;
              timestamp: number;
              turnNumber: number;
              input?: unknown;
            })
          : undefined,
      engineLogs: Array.isArray(msg.engineLogs)
        ? (msg.engineLogs as Array<{
            stateVersion: number;
            log: unknown;
          }>)
        : undefined,
    };
  }

  function initOrchestrator(
    gw: GatewayClientStore,
    state: LorcanaMatchState,
    cardsMaps: CardsMaps,
    recentHistory?: { type: string; [key: string]: unknown },
  ): SpectatorMatchOrchestrator {
    return new SpectatorMatchOrchestrator({
      gateway: gw,
      state,
      cardsMaps,
      recentHistory:
        recentHistory &&
        typeof recentHistory === "object" &&
        !Array.isArray(recentHistory)
          ? (recentHistory as unknown as {
              acceptedMoves: Array<{
                actorId: string;
                moveId: string;
                stateVersion: number;
                timestamp: number;
                turnNumber: number;
                input?: unknown;
              }>;
              engineLogs: Array<{
                stateVersion: number;
                log: unknown;
              }>;
            })
          : undefined,
    });
  }

  async function initSpectatorView(): Promise<void> {
    const gameId = getGameId();
    let gameJoinedResolve: ((msg: { type: string; [key: string]: unknown }) => void) | null = null;
    const gameJoinedPromise = new Promise<{ type: string; [key: string]: unknown }>((resolve) => {
      gameJoinedResolve = resolve;
    });

    // For client-authority games, game_joined may have null state.
    // We queue state_update messages and wait for the first one with full state.
    let deferredStateResolve: ((msg: Record<string, unknown>) => void) | null = null;
    const pendingUpdates: Record<string, unknown>[] = [];

    gateway = new GatewayClientStore(GATEWAY_WS_URL, undefined, (msg) => {
      if (msg.type === "game_joined") {
        gameJoinedResolve?.(msg);
        return;
      }

      if (msg.type === "state_update") {
        if (!orchestrator && deferredStateResolve && msg.state) {
          deferredStateResolve(msg as Record<string, unknown>);
          deferredStateResolve = null;
          return;
        }
        if (!orchestrator) {
          pendingUpdates.push(msg as Record<string, unknown>);
          return;
        }
        orchestrator.applyStateUpdate(parseStateUpdatePayload(msg as Record<string, unknown>));
        return;
      }

      if (msg.type === "error" || msg.type === "gateway_error") {
        loadError = typeof msg.message === "string" ? msg.message : "Unable to spectate this match.";
      }
    });

    gateway.connect();

    const welcomePromise = new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (gateway?.connectionId) {
          clearInterval(interval);
          resolve();
        }
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, 10_000);
    });

    await welcomePromise;

    if (!gateway.connectionId) {
      loadError = "Failed to connect to the game server.";
      return;
    }

    gateway.send({ type: "join_game", gameId, role: "spectator" });

    const gameJoinedMsg = await Promise.race([
      gameJoinedPromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 10_000)),
    ]);

    if (!gameJoinedMsg) {
      loadError = "Timed out while joining the live match.";
      return;
    }

    // Try to extract state from game_joined (works for server-authority
    // and client-authority games where state has already been pushed).
    let state = gameJoinedMsg.state as LorcanaMatchState | null;
    let cardsMaps = (gameJoinedMsg.cardsMaps as CardsMaps | undefined) ?? undefined;

    // For client-authority games, the state may be a PracticeMatchSnapshot
    // with state/cardsMaps nested inside engineSnapshot.
    if (state && !cardsMaps) {
      const extracted = extractMatchState(state);
      if (extracted) {
        state = extracted.state;
        cardsMaps = extracted.cardsMaps;
      }
    }

    // If state is null (client-authority game, player hasn't pushed yet),
    // wait for the first state_update which includes the full state.
    if (!state || !cardsMaps) {
      const deferredPromise = new Promise<Record<string, unknown>>((resolve) => {
        deferredStateResolve = resolve;
      });

      const firstUpdate = await Promise.race([
        deferredPromise,
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 15_000)),
      ]);

      if (!firstUpdate?.state) {
        loadError = "Timed out waiting for match state. The player may not have started yet.";
        return;
      }

      const extracted = extractMatchState(firstUpdate.state);
      if (!extracted) {
        loadError = "Unable to read match state.";
        return;
      }

      state = extracted.state;
      cardsMaps = extracted.cardsMaps;
    }

    orchestrator = initOrchestrator(
      gateway,
      state,
      cardsMaps,
      gameJoinedMsg.recentHistory as { type: string; [key: string]: unknown } | undefined,
    );

    for (const pending of pendingUpdates.splice(0)) {
      orchestrator.applyStateUpdate(parseStateUpdatePayload(pending));
    }
  }

  onMount(async () => {
    try {
      await initSpectatorView();
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Failed to initialize spectator view.";
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    orchestrator?.dispose();
    gateway?.destroy();
  });
</script>

<main class="relative min-h-screen text-slate-100">
  {#if loading}
    <div class="grid min-h-screen place-items-center px-4 text-slate-400">
      Joining live match...
    </div>
  {:else if loadError}
    <div class="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-8">
      <Card class="w-full border-rose-400/20 bg-slate-950/88 text-slate-100">
        <CardHeader>
          <CardTitle>Spectator view unavailable</CardTitle>
          <CardDescription class="text-rose-200">{loadError}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onclick={() => goto("/matchmaking")}>Back to matchmaking</Button>
        </CardContent>
      </Card>
    </div>
  {:else if orchestrator}
    <div class="absolute left-0 right-0 top-3 z-20 flex justify-center px-4">
      <div class="rounded-full border border-sky-400/30 bg-slate-950/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-sky-100 shadow-[0_18px_50px_-30px_rgba(14,165,233,0.85)] backdrop-blur-md">
        Spectating live match
      </div>
    </div>

    <LorcanaTabletopSimulator
      engine={orchestrator.currentEngine}
      readModel={orchestrator.readModel}
      viewerMode="spectator"
    />
  {/if}
</main>
