<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount, onDestroy } from "svelte";
  import { Button } from "$lib/design-system/primitives/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { LorcanaTabletopSimulator } from "$lib";
  import {
    loadReplayData,
    isReplayStoreAvailable,
  } from "@/features/replay/index.js";
  import { decompressReplayBlob } from "@/features/replay/fetch-replay.js";
  import { ReplayOrchestrator } from "@/features/replay/replay-orchestrator.svelte.js";
  import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    SkipBack,
    SkipForward,
    Play,
    Pause,
  } from "@lucide/svelte";

  let { data } = $props();

  let orchestrator = $state<ReplayOrchestrator | null>(null);
  let loading = $state(true);
  let loadError = $state<string | null>(null);

  const SPEEDS = [
    { label: "0.5×", ms: 1600 },
    { label: "1×", ms: 800 },
    { label: "2×", ms: 400 },
    { label: "4×", ms: 150 },
  ] as const;

  let speedIndex = $state(1); // default 1× (800ms)

  function cycleSpeed(): void {
    speedIndex = (speedIndex + 1) % SPEEDS.length;
    orchestrator?.setSpeed(SPEEDS[speedIndex]?.ms ?? 800);
  }

  onMount(async () => {
    if (!isReplayStoreAvailable()) {
      loadError = "Your browser does not support IndexedDB. Cannot load saved replays.";
      loading = false;
      return;
    }

    try {
      console.log("[ReplayPage] loading gameId:", data.gameId);
      const blob = await loadReplayData(data.gameId);
      console.log("[ReplayPage] blob from IndexedDB:", blob ? `${blob.byteLength} bytes` : "null");

      if (!blob) {
        loadError = "Replay not found in local storage. It may have expired or not been saved.";
        loading = false;
        return;
      }

      const replayData = await decompressReplayBlob(blob);
      console.log("[ReplayPage] decompressed replay", {
        gameId: replayData.gameId,
        playerIds: replayData.playerIds,
        movesCount: (replayData.moves as unknown[]).length,
        hasInitialState: !!replayData.initialState,
        initialStateSnippet: replayData.initialState?.slice(0, 80),
      });

      orchestrator = new ReplayOrchestrator(replayData);
      console.log("[ReplayPage] orchestrator ready", {
        hasPatchData: orchestrator.hasPatchData,
        totalSteps: orchestrator.totalSteps,
      });
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Failed to load replay.";
      console.error("[ReplayPage] Failed to load replay:", error);
    } finally {
      loading = false;
    }
  });

  onDestroy(() => {
    orchestrator?.dispose();
  });
</script>

<main class="relative min-h-screen text-slate-100">
  {#if loading}
    <div class="grid min-h-screen place-items-center px-4 text-slate-400">
      Loading replay...
    </div>
  {:else if loadError}
    <div class="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-8">
      <Card class="w-full border-rose-400/20 bg-slate-950/88 text-slate-100">
        <CardHeader>
          <CardTitle>Replay unavailable</CardTitle>
          <CardDescription class="text-rose-200">{loadError}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onclick={() => goto("/replays")}>Back to replays</Button>
        </CardContent>
      </Card>
    </div>
  {:else if orchestrator}
    <!-- Playback bar -->
    <div class="absolute left-0 right-0 top-3 z-20 flex items-center justify-center gap-2 px-4">
      <!-- Back -->
      <Button
        variant="ghost"
        size="sm"
        class="size-8 shrink-0 rounded-full border border-white/10 bg-slate-950/80 p-0 text-slate-300 backdrop-blur-md hover:text-slate-100"
        onclick={() => goto("/replays")}
        title="Back to replays"
      >
        <ArrowLeft class="size-4" />
      </Button>

      <!-- Main controls pill — always visible, disabled when no patch data -->
      <div class="flex items-center gap-0.5 rounded-full border border-white/10 bg-slate-950/85 px-1.5 py-1 backdrop-blur-md">
        <!-- Go to start -->
        <Button
          variant="ghost"
          size="sm"
          class="size-7 rounded-full p-0 text-slate-400 hover:text-slate-100 disabled:opacity-25"
          disabled={!orchestrator.hasPatchData || orchestrator.currentStep === 0}
          onclick={() => orchestrator?.goToStep(0)}
          title="Go to start"
        >
          <SkipBack class="size-3.5" />
        </Button>

        <!-- Prev turn -->
        <Button
          variant="ghost"
          size="sm"
          class="size-7 rounded-full p-0 text-slate-400 hover:text-slate-100 disabled:opacity-25"
          disabled={!orchestrator.hasPatchData || orchestrator.currentStep === 0}
          onclick={() => orchestrator?.prevTurn()}
          title="Previous turn"
        >
          <ChevronsLeft class="size-3.5" />
        </Button>

        <!-- Prev move -->
        <Button
          variant="ghost"
          size="sm"
          class="size-7 rounded-full p-0 text-slate-400 hover:text-slate-100 disabled:opacity-25"
          disabled={!orchestrator.hasPatchData || orchestrator.currentStep === 0}
          onclick={() => orchestrator?.prevStep()}
          title="Previous move"
        >
          <ChevronLeft class="size-3.5" />
        </Button>

        <!-- Play / Pause -->
        <Button
          variant="ghost"
          size="sm"
          class="size-8 rounded-full p-0 text-slate-100 hover:text-white disabled:opacity-25"
          disabled={!orchestrator.hasPatchData}
          onclick={() => orchestrator?.togglePlay()}
          title={orchestrator.isPlaying ? "Pause" : "Play"}
        >
          {#if orchestrator.isPlaying}
            <Pause class="size-4" />
          {:else}
            <Play class="size-4" />
          {/if}
        </Button>

        <!-- Next move -->
        <Button
          variant="ghost"
          size="sm"
          class="size-7 rounded-full p-0 text-slate-400 hover:text-slate-100 disabled:opacity-25"
          disabled={!orchestrator.hasPatchData || orchestrator.currentStep === orchestrator.totalSteps - 1}
          onclick={() => orchestrator?.nextStep()}
          title="Next move"
        >
          <ChevronRight class="size-3.5" />
        </Button>

        <!-- Next turn -->
        <Button
          variant="ghost"
          size="sm"
          class="size-7 rounded-full p-0 text-slate-400 hover:text-slate-100 disabled:opacity-25"
          disabled={!orchestrator.hasPatchData || orchestrator.currentStep === orchestrator.totalSteps - 1}
          onclick={() => orchestrator?.nextTurn()}
          title="Next turn"
        >
          <ChevronsRight class="size-3.5" />
        </Button>

        <!-- Go to end -->
        <Button
          variant="ghost"
          size="sm"
          class="size-7 rounded-full p-0 text-slate-400 hover:text-slate-100 disabled:opacity-25"
          disabled={!orchestrator.hasPatchData || orchestrator.currentStep === orchestrator.totalSteps - 1}
          onclick={() => orchestrator?.goToStep(orchestrator.totalSteps - 1)}
          title="Go to end"
        >
          <SkipForward class="size-3.5" />
        </Button>
      </div>

      <!-- Position indicator / no-patch notice -->
      <div class="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 backdrop-blur-md">
        {#if orchestrator.hasPatchData}
          <span class="text-xs tabular-nums text-slate-300">
            {#if orchestrator.currentTurn > 0}
              T{orchestrator.currentTurn}<span class="mx-1 text-slate-600">·</span>
            {/if}
            <span class="text-slate-400">{orchestrator.currentStep}</span><span class="text-slate-600">/</span><span class="text-slate-500">{orchestrator.totalSteps - 1}</span>
          </span>
        {:else}
          <span class="text-xs text-slate-500">Step-through not available for practice replays</span>
        {/if}
      </div>

      <!-- Speed control (only useful when patch data exists) -->
      {#if orchestrator.hasPatchData}
        <Button
          variant="ghost"
          size="sm"
          class="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-xs font-medium tabular-nums text-slate-300 backdrop-blur-md hover:text-slate-100"
          onclick={cycleSpeed}
          title="Change playback speed"
        >
          {SPEEDS[speedIndex]?.label ?? "1×"}
        </Button>
      {/if}
    </div>

    <LorcanaTabletopSimulator
      engine={orchestrator.currentEngine}
      readModel={orchestrator.readModel}
      viewerMode="spectator"
    />
  {/if}
</main>
