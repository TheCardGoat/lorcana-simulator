<script lang="ts">
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/design-system/primitives/card";
  import HumanVsAiMatchPage from "@/features/simulator-devtools/vs-ai/HumanVsAiMatchPage.svelte";
  import {
    HUMAN_VS_AI_STORAGE_KEY,
    type HumanVsAiStorage,
  } from "@/features/simulator-devtools/vs-ai/storage.js";
  import type { HumanVsAiMatchConfig } from "@/features/simulator-devtools/vs-ai/types.js";
  import { DECK_FIXTURES } from "@/features/simulator-devtools/deck-fixtures/index.js";
  import { createAutomatedMatchSeed } from "@/features/simulator-devtools/ai-match/config.js";
  import { sanitizeDeckText } from "@/features/simulator-devtools/fixtures/fixture-factory.js";
  import { AUTOMATED_ACTION_STRATEGIES } from "@tcg/lorcana-engine";

  function pickRandom<T>(arr: readonly T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function createUrlDrivenStorage(config: HumanVsAiMatchConfig): HumanVsAiStorage {
    const stored = JSON.stringify(config);
    return {
      getItem: (key) => (key === HUMAN_VS_AI_STORAGE_KEY ? stored : null),
      setItem: () => undefined,
      removeItem: () => undefined,
    };
  }

  function decodeDeckParam(value: string): string | null {
    if (!value) return null;
    try {
      const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
      return atob(base64);
    } catch {
      return null;
    }
  }

  const params = $derived(page.url.searchParams);
  const rawDeckParam = $derived(decodeDeckParam(params.get("deck")?.trim() ?? ""));
  const opponentFixtureIdParam = $derived(params.get("opponentFixtureId")?.trim() ?? "");
  const strategyIdParam = $derived(params.get("strategyId")?.trim() ?? "");

  const sanitized = $derived(rawDeckParam ? sanitizeDeckText(rawDeckParam) : null);
  const deckParam = $derived(sanitized?.sanitizedText ?? "");
  const unknownCards = $derived(sanitized?.unknownCards ?? []);

  const config = $derived.by((): HumanVsAiMatchConfig | null => {
    if (!deckParam) return null;

    const opponentFixture =
      (opponentFixtureIdParam
        ? DECK_FIXTURES.find((f) => f.id === opponentFixtureIdParam)
        : undefined) ?? pickRandom(DECK_FIXTURES);

    const strategy =
      (strategyIdParam
        ? AUTOMATED_ACTION_STRATEGIES.find((s) => s.id === strategyIdParam)
        : undefined) ?? pickRandom(AUTOMATED_ACTION_STRATEGIES);

    if (!opponentFixture || !strategy) return null;

    return {
      playerOneDeckText: deckParam,
      playerTwoDeckText: opponentFixture.cards,
      playerTwoFixtureId: opponentFixture.id,
      strategyId: strategy.id,
      seed: createAutomatedMatchSeed(),
    };
  });

  const storage = $derived(config ? createUrlDrivenStorage(config) : undefined);

  onMount(() => {
    if (unknownCards.length > 0) {
      console.warn("[quick-match] Unrecognized cards skipped:", unknownCards);
      toast.warning("Some cards were not recognized and were skipped", {
        description: unknownCards.join(", "),
        duration: 8000,
      });
    }
  });
</script>

{#if !rawDeckParam}
  {@const hasDeckParam = !!params.get("deck")}
  <div class="grid h-full place-items-center p-8">
    <Card class="w-full max-w-md border-rose-400/20 bg-slate-950/88 text-slate-100">
      <CardHeader>
        <CardTitle>{hasDeckParam ? "Invalid deck encoding" : "Missing deck"}</CardTitle>
        <CardDescription class="text-rose-200">
          {#if hasDeckParam}
            The <code>deck</code> parameter could not be decoded. It must be base64url encoded.
          {:else}
            A <code>deck</code> URL parameter is required to start a quick match.
          {/if}
        </CardDescription>
      </CardHeader>
      <CardContent class="text-sm text-slate-400">
        <p>Encode your deck list with:</p>
        <pre class="mt-1 rounded bg-slate-900 p-2 text-xs">btoa(deckText).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")</pre>
        <p class="mt-3">Optional parameters:</p>
        <ul class="mt-1 list-disc pl-4 text-xs">
          <li><code>opponentFixtureId</code> — one of the preset deck IDs</li>
          <li><code>strategyId</code> — bot strategy ID</li>
        </ul>
      </CardContent>
    </Card>
  </div>
{:else}
  <HumanVsAiMatchPage {storage} setupPath="/sandbox/simulator/vs-ai" />
{/if}
