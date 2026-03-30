<script lang="ts">
import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";
import { discardEffectsFixture as fixture } from "@/features/simulator-devtools/fixtures/discard-effects.js";

const scenarios = [
  "Play Ursula - Deceiver from hand to reveal Player Two's hand and choose a song for them to discard.",
  "Play Chip - Quick Thinker from hand to force the opponent to choose which card they discard.",
  "Quest with Basil - Undercover Detective to verify random discard from the opponent's hand.",
  "Quest with Geppetto - Skilled Craftsman and choose zero, one, or multiple item cards to discard for lore.",
  "Activate The Wardrobe - Perceptive Friend to test item-only discard as a cost and the follow-up draw.",
  "Quest with Jafar - High Sultan of Lorcana, discard Palace Guard - Spectral Sentry, and confirm the free-play follow-up.",
  "Activate Elsa - Fierce Protector to test a generic discard cost plus an opposing-character target.",
];
</script>

<svelte:head>
  <title>Discard Effects Test</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-slate-950 text-slate-50">
  <section class="border-b border-slate-800 bg-slate-950/95 px-4 py-4 sm:px-6">
    <div class="mx-auto max-w-6xl">
      <h1 class="text-lg font-semibold tracking-tight sm:text-xl">Discard Effects</h1>
      <p class="mt-2 max-w-4xl text-sm text-slate-300">
        This fixture starts from Player One and groups several discard patterns into one board state:
        targeted reveal-and-discard, opponent-chosen discard, random discard, discard as a cost,
        discard any number, and discard with a follow-up payoff.
      </p>
      <ol class="mt-4 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
        {#each scenarios as scenario}
          <li class="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2">
            {scenario}
          </li>
        {/each}
      </ol>
    </div>
  </section>

  <div class="min-h-0 flex-1">
    <LorcanaBrowserHarnessView {fixture} view="playerOne" />
  </div>
</div>
