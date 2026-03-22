<script lang="ts">
  import { Badge } from "$lib/design-system/primitives/badge";
  import { Button } from "$lib/design-system/primitives/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { Select } from "$lib/design-system/primitives/select";
  import {
    LorcanaTabletopSimulator,
    type LorcanaSimulatorReadModel,
  } from "$lib";
  import { getAutomatedActionStrategyOption, type LorcanaServer } from "@tcg/lorcana-engine";
  import { onMount } from "svelte";
  import {
    AutomatedMatchPlaybackController,
    readStoredAutomatedMatchConfig,
    type AutomatedMatchStorage,
    type AutomatedMatchPlaybackState,
    type AutomatedMatchStatusSnapshot,
  } from "./index.js";
  import { createAutomatedMatchSeed } from "./config.js";

  interface AutomatedMatchViewerPageProps {
    onNavigateToSetup?: (path: string) => Promise<void> | void;
    setupPath?: string;
    storage?: AutomatedMatchStorage;
  }

  const SPEED_OPTIONS = [
    { label: "Fast", value: 250 },
    { label: "Balanced", value: 800 },
    { label: "Slow", value: 1400 },
  ] as const;

  let {
    onNavigateToSetup = () => undefined,
    setupPath = "/sandbox/simulator/ai-match",
    storage,
  }: AutomatedMatchViewerPageProps = $props();

  let controller = $state<
    AutomatedMatchPlaybackController<LorcanaServer, LorcanaSimulatorReadModel> | null
  >(null);
  let loadError = $state<string | null>(null);
  let playbackSnapshot = $state<AutomatedMatchPlaybackState>({
    mode: "idle",
    speedMs: SPEED_OPTIONS[1]!.value,
  });
  let statusSnapshot = $state<AutomatedMatchStatusSnapshot>({
    actionsExecuted: 0,
    turnNumber: 0,
  });
  let playerOneStrategyLabel = $state("Player one strategy");
  let playerTwoStrategyLabel = $state("Player two strategy");

  interface OverlayDragState {
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
  }

  let overlayDrag = $state<OverlayDragState | null>(null);
  let overlayOffset = $state({ x: 0, y: 0 });

  function forceRefresh(): void {
    if (!controller) {
      return;
    }

    playbackSnapshot = controller.getPlaybackState();
    statusSnapshot = controller.getStatusSnapshot();
    playerOneStrategyLabel =
      getAutomatedActionStrategyOption(controller.getConfig().playerOneStrategyId)?.label ??
      "Player one strategy";
    playerTwoStrategyLabel =
      getAutomatedActionStrategyOption(controller.getConfig().playerTwoStrategyId)?.label ??
      "Player two strategy";
  }

  onMount(() => {
    const storedConfig = readStoredAutomatedMatchConfig(storage);
    if (!storedConfig) {
      void onNavigateToSetup(setupPath);
      return;
    }

    try {
      const nextController = new AutomatedMatchPlaybackController<
        LorcanaServer,
        LorcanaSimulatorReadModel
      >({ ...storedConfig, seed: createAutomatedMatchSeed() });
      const unsubscribe = nextController.subscribe(forceRefresh);
      controller = nextController;
      forceRefresh();

      return () => {
        unsubscribe();
        nextController.dispose();
      };
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Unable to initialize automated match.";
    }
  });

  function playerLabel(playerId?: string): string {
    if (playerId === "player_one") {
      return "Player one";
    }

    if (playerId === "player_two") {
      return "Player two";
    }

    return "Unknown";
  }

  function describeLastDecision(playbackState: AutomatedMatchPlaybackState): string {
    const trace = playbackState.lastTrace;
    if (!trace) {
      return "No automated decision has been taken yet.";
    }

    const candidateLabel =
      trace.selectedCandidate?.stableKey ?? trace.orderedCandidates[0]?.stableKey ?? "No candidate";
    const diagnosticCount = trace.diagnostics.length;
    const fallbackLabel = trace.fallbackTaken ? `Fallback: ${trace.fallbackTaken}.` : "";

    return `${candidateLabel}. ${diagnosticCount} diagnostics. ${fallbackLabel}`.trim();
  }

  function playbackLabel(mode: AutomatedMatchPlaybackState["mode"]): string {
    switch (mode) {
      case "running":
        return "Running";
      case "paused":
        return "Paused";
      case "complete":
        return "Complete";
      case "error":
        return "Error";
      default:
        return "Idle";
    }
  }

  function parseSpeedValue(value: string): number {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : SPEED_OPTIONS[1]!.value;
  }

  function startOverlayDrag(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }

    overlayDrag = {
      originX: overlayOffset.x,
      originY: overlayOffset.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function moveOverlayDrag(event: PointerEvent): void {
    if (!overlayDrag || overlayDrag.pointerId !== event.pointerId) {
      return;
    }

    overlayOffset = {
      x: overlayDrag.originX + event.clientX - overlayDrag.startX,
      y: overlayDrag.originY + event.clientY - overlayDrag.startY,
    };
  }

  function stopOverlayDrag(event: PointerEvent): void {
    if (!overlayDrag || overlayDrag.pointerId !== event.pointerId) {
      return;
    }

    overlayDrag = null;
    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
  }
</script>

<main class="relative min-h-screen text-slate-100">
  {#if loadError}
    <div class="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-8">
      <Card class="w-full border-rose-400/20 bg-slate-950/88 text-slate-100">
        <CardHeader>
          <CardTitle>Viewer failed to load</CardTitle>
          <CardDescription class="text-rose-200">{loadError}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onclick={() => onNavigateToSetup(setupPath)}>Back to setup</Button>
        </CardContent>
      </Card>
    </div>
  {:else if controller}
    {@const activeController = controller}

    {#key activeController.getSessionRevision()}
      <LorcanaTabletopSimulator
        engine={activeController.getEngine()}
        readModel={activeController.getReadModel()}
      />
    {/key}

    <section
      class="pointer-events-none fixed left-1/2 top-4 z-20 flex w-full max-w-[58rem] justify-center px-3 sm:px-4"
      style={`transform: translate(calc(-50% + ${overlayOffset.x}px), ${overlayOffset.y}px);`}
    >
      <div class="pointer-events-auto flex w-full flex-col gap-3 rounded-[1.7rem] border border-white/10 bg-slate-950/82 p-3 shadow-[0_20px_60px_-36px_rgba(15,23,42,0.95)] backdrop-blur-md">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-slate-200">
              AI match viewer
            </Badge>
            <Badge variant="secondary" class="rounded-full border border-sky-400/25 bg-sky-400/12 px-3 py-1 text-sky-100">
              {playbackLabel(playbackSnapshot.mode)}
            </Badge>
            <Badge variant="secondary" class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-slate-200">
              Turn {statusSnapshot.turnNumber}
            </Badge>
            <Badge variant="secondary" class="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-slate-200">
              {statusSnapshot.phase ?? "Unknown"}
            </Badge>
            {#if statusSnapshot.winner}
              <Badge variant="secondary" class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-100">
                Winner: {playerLabel(statusSnapshot.winner)}
              </Badge>
            {/if}
          </div>

          <div class="flex items-center justify-between gap-3 lg:justify-end">
            <p class="truncate text-sm font-medium text-slate-200">
              P1: {playerOneStrategyLabel} | P2: {playerTwoStrategyLabel}
            </p>
            <button
              type="button"
              class="cursor-grab rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-300 active:cursor-grabbing"
              aria-label="Drag viewer controls"
              onpointerdown={startOverlayDrag}
              onpointermove={moveOverlayDrag}
              onpointerup={stopOverlayDrag}
              onpointercancel={stopOverlayDrag}
            >
              Drag
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div class="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              class="cursor-pointer rounded-2xl border-white/10 bg-white text-slate-950 hover:bg-slate-100"
              onclick={() => activeController.step()}
              disabled={playbackSnapshot.mode === "running" || playbackSnapshot.mode === "complete" || playbackSnapshot.mode === "error"}
            >
              Next action
            </Button>
            <Button
              class="cursor-pointer rounded-2xl bg-[hsl(47_35%_12%)] text-white hover:bg-[hsl(47_35%_18%)]"
              onclick={() =>
                playbackSnapshot.mode === "running" ? activeController.pause() : activeController.play()}
              disabled={playbackSnapshot.mode === "complete" || playbackSnapshot.mode === "error"}
            >
              {playbackSnapshot.mode === "running" ? "Pause" : "Play"}
            </Button>
            <Button
              variant="ghost"
              class="cursor-pointer rounded-2xl text-white hover:bg-white/10 hover:text-white"
              onclick={() => onNavigateToSetup(setupPath)}
            >
              Restart
            </Button>
          </div>

          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div class="flex min-w-[14rem] items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
              <label class="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-400" for="speed-select">
                Speed
              </label>
              <Select
                      id="speed-select"
                      value={String(playbackSnapshot.speedMs)}
                      class="cursor-pointer border-0 bg-transparent text-right text-base text-slate-100 shadow-none focus-visible:ring-0"
                      onchange={(event) =>
                  activeController.setSpeed(
                    parseSpeedValue((event.currentTarget as HTMLSelectElement).value),
                  )}
              >
                {#each SPEED_OPTIONS as option}
                  <option value={String(option.value)}>{option.label}</option>
                {/each}
              </Select>
            </div>
          </div>
        </div>

        {#if playbackSnapshot.error}
          <div class="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-sm text-rose-100">
            {playbackSnapshot.error}
          </div>
        {/if}
      </div>
    </section>
  {:else}
    <div class="grid min-h-screen place-items-center px-4 text-slate-400">
      Loading automated match viewer…
    </div>
  {/if}
</main>
