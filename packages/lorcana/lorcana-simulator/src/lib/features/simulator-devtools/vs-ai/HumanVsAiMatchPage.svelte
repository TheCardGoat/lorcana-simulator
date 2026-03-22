<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/design-system/primitives/card";
  import { Button } from "$lib/design-system/primitives/button";
  import { LorcanaTabletopSimulator } from "$lib";
  import { onMount, onDestroy } from "svelte";
  import { HumanVsAiOrchestrator } from "./human-vs-ai-orchestrator.svelte.js";
  import { readStoredHumanVsAiConfig, type HumanVsAiStorage } from "./storage.js";
  import { setHumanVsAiContext } from "./context.js";
  import { createAutomatedMatchSeed } from "../ai-match/config.js";
  import { VsAiOnboardingState } from "./onboarding.svelte.js";
  import VsAiOnboardingOverlay from "./VsAiOnboardingOverlay.svelte";

  interface HumanVsAiMatchPageProps {
    onNavigateToSetup?: (path: string) => Promise<void> | void;
    setupPath?: string;
    storage?: HumanVsAiStorage;
  }

  let {
    onNavigateToSetup = () => undefined,
    setupPath = "/sandbox/simulator/vs-ai",
    storage,
  }: HumanVsAiMatchPageProps = $props();

  const getStorage = (): HumanVsAiStorage | undefined => storage;

  let orchestrator = $state<HumanVsAiOrchestrator | null>(null);
  let loadError = $state<string | null>(null);
  let shouldRedirect = $state(false);
  const onboarding = new VsAiOnboardingState();

  // Try synchronous init so setContext works during component initialization
  const storedConfig = readStoredHumanVsAiConfig(getStorage());
  if (storedConfig) {
    try {
      orchestrator = new HumanVsAiOrchestrator({ ...storedConfig, seed: createAutomatedMatchSeed() });
    } catch (error) {
      loadError = error instanceof Error ? error.message : "Unable to initialize match.";
    }
  } else {
    shouldRedirect = true;
  }

  // Set context during component init (required by Svelte)
  $effect(() => {
    if (orchestrator) {
      setHumanVsAiContext(orchestrator);
    }
  });

  onMount(() => {
    if (shouldRedirect) {
      void onNavigateToSetup(setupPath);
    }
  });

  onDestroy(() => {
    orchestrator?.dispose();
  });
</script>

<main class="relative min-h-screen text-slate-100">
  {#if loadError}
    <div class="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-4 py-8">
      <Card class="w-full border-rose-400/20 bg-slate-950/88 text-slate-100">
        <CardHeader>
          <CardTitle>Match failed to load</CardTitle>
          <CardDescription class="text-rose-200">{loadError}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onclick={() => onNavigateToSetup(setupPath)}>Back to setup</Button>
        </CardContent>
      </Card>
    </div>
  {:else if orchestrator}
    {#key orchestrator.sessionRevision}
      <LorcanaTabletopSimulator
        engine={orchestrator.currentEngine}
        readModel={orchestrator.readModel}
      />
    {/key}

    <VsAiOnboardingOverlay {onboarding} />
  {:else}
    <div class="grid min-h-screen place-items-center px-4 text-slate-400">
      Loading match...
    </div>
  {/if}
</main>
