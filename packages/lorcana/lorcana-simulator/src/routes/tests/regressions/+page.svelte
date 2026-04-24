<script lang="ts">
  import { LORCANA_REGRESSION_FIXTURE_LIST } from "@/features/simulator-devtools/fixtures/regressions";
  import { buildRegressionFixtureTestRouteHref } from "@/features/simulator-devtools/routes/test-routes.js";

  const regressionLinks = LORCANA_REGRESSION_FIXTURE_LIST.map((fixture) => ({
    href: buildRegressionFixtureTestRouteHref(fixture.id),
    id: fixture.id,
    name: fixture.name,
    description: fixture.description,
  }));
</script>

<svelte:head>
  <title>Regression Fixtures</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100">
  <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
    <header class="space-y-3">
      <p class="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
        Simulator Regression Reports
      </p>
      <div class="space-y-2">
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Saved Regression Fixtures
        </h1>
        <p class="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
          Reported issues live here as reproducible simulator setups. Each case should keep a saved
          fixture, a focused regression test, and the eventual fix.
        </p>
      </div>
    </header>

    <section class="grid gap-4 lg:grid-cols-3">
      <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <h2 class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">1. Save</h2>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          Add a fixture under
          <span class="font-mono text-slate-200">packages/lorcana/lorcana-simulator/src/lib/features/simulator-devtools/fixtures/regressions/&lt;slug&gt;.ts</span> and add it to regressionFixtureRegistry <span class="font-mono text-slate-200">packages/lorcana/lorcana-simulator/src/lib/features/simulator-devtools/fixtures/regressions/index.ts</span>.
        </p>
      </div>
      <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <h2 class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">2. Test</h2>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          Add a matching test under
          <span class="font-mono text-slate-200">packages/lorcana/lorcana-simulator/src/testing/regressions/&lt;slug&gt;.test.ts</span>.
        </p>
      </div>
      <div class="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <h2 class="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">3. Fix</h2>
        <p class="mt-2 text-sm leading-6 text-slate-300">
          Fix the runtime gap, keep the repro fixture, and use the saved route for quick manual
          validation.
        </p>
      </div>
    </section>

    <section class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-white sm:text-xl">Regression Cases</h2>
        <span class="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
          {regressionLinks.length} cases
        </span>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        {#each regressionLinks as regression}
          <a
            href={regression.href}
            class="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-cyan-400/60 hover:bg-slate-900"
          >
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1">
                  <h3 class="text-base font-semibold text-white">{regression.name}</h3>
                  <p class="font-mono text-xs text-slate-400">{regression.id}</p>
                </div>
                <span class="text-cyan-300 transition group-hover:translate-x-0.5">-></span>
              </div>
              <p class="text-sm text-slate-300">{regression.description}</p>
              <p class="font-mono text-xs text-slate-400">{regression.href}</p>
            </div>
          </a>
        {/each}
      </div>
    </section>
  </div>
</div>
