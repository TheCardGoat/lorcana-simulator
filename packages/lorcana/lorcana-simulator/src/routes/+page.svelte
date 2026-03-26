<script lang="ts">
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Dev Routes</title>
</svelte:head>

<div class="min-h-screen bg-slate-950 text-slate-100">
  <div class="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
    <header class="space-y-3">
      <p class="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300">
        Development
      </p>
      <div class="space-y-2">
        <h1 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Dev Routes
        </h1>
        <p class="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
          Quick navigation to development and testing routes in the simulator.
        </p>
      </div>
    </header>

    <section class="space-y-4">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-white sm:text-xl">Direct Links</h2>
        <span class="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs text-slate-300">
          {data.routeLinks.length} routes
        </span>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {#each data.routeLinks as route}
          <a
            href={route.href}
            class="group rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition hover:border-cyan-400/60 hover:bg-slate-900"
          >
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-base font-semibold text-white">{route.label}</h3>
                <span class="text-cyan-300 transition group-hover:translate-x-0.5">-></span>
              </div>
              <p class="text-sm text-slate-300">{route.description}</p>
              <p class="font-mono text-xs text-slate-400">{route.href}</p>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-white sm:text-xl">Parameterized Routes</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        {#each data.routePatterns as route}
          <div class="rounded-2xl border border-dashed border-slate-800 bg-slate-900/50 p-4">
            <div class="space-y-2">
              <p class="font-mono text-sm text-cyan-300">{route.pattern}</p>
              <p class="text-sm text-slate-300">{route.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>
