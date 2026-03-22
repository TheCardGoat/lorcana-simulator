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
  import { SpectatorMatchOrchestrator } from "@/features/spectator/spectator-match-orchestrator.svelte.js";
  import type { CardsMaps, LorcanaMatchState } from "@tcg/lorcana-engine";

  let { data } = $props();
  const getGameId = (): string => data.gameId;

  const GATEWAY_WS_URL = getGatewayWsUrl();

  let gateway: GatewayClientStore | null = null;
  let orchestrator = $state<SpectatorMatchOrchestrator | null>(null);
  let loading = $state(true);
  let loadError = $state<string | null>(null);

  async function initSpectatorView(): Promise<void> {
    const gameId = getGameId();
    let gameJoinedResolve: ((msg: { type: string; [key: string]: unknown }) => void) | null = null;
    const gameJoinedPromise = new Promise<{ type: string; [key: string]: unknown }>((resolve) => {
      gameJoinedResolve = resolve;
    });

    gateway = new GatewayClientStore(GATEWAY_WS_URL, undefined, (msg) => {
      if (msg.type === "game_joined") {
        gameJoinedResolve?.(msg);
        return;
      }

      if (msg.type === "state_update") {
        orchestrator?.applyStateUpdate({
          actorId: String(msg.actorId ?? ""),
          moveType: String(msg.moveType ?? ""),
          stateVersion: Number(msg.stateVersion ?? 0),
          patches: Array.isArray(msg.patches) ? msg.patches : [],
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
                defaultMessage?: { key?: string; values?: Record<string, unknown> };
                sourceEventSeqs: number[];
              }>)
            : undefined,
        });
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

    const state = gameJoinedMsg.state as LorcanaMatchState | null;
    const cardsMaps = (gameJoinedMsg.cardsMaps as CardsMaps | undefined) ?? undefined;

    if (!state || !cardsMaps) {
      loadError = "This match cannot be spectated right now.";
      return;
    }

    orchestrator = new SpectatorMatchOrchestrator({
      gateway,
      state,
      cardsMaps,
      recentHistory:
        gameJoinedMsg.recentHistory &&
        typeof gameJoinedMsg.recentHistory === "object" &&
        !Array.isArray(gameJoinedMsg.recentHistory)
          ? (gameJoinedMsg.recentHistory as {
              acceptedMoves: Array<{
                actorId: string;
                moveId: string;
                stateVersion: number;
                timestamp: number;
                turnNumber: number;
                input?: unknown;
              }>;
              engineLogs: Array<{
                defaultMessage?: { key?: string; values?: Record<string, unknown> };
                sourceEventSeqs: number[];
              }>;
            })
          : undefined,
    });
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
