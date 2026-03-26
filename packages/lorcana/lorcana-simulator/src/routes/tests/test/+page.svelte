<script lang="ts">
  import { page } from "$app/state";
  import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";
  import { resolveBrowserRouteState } from "@/features/simulator-devtools/harness/browser-route";

  const routeState = $derived.by(() => resolveBrowserRouteState(page.url));
</script>

<LorcanaBrowserHarnessView
  browserTransport={routeState.browserTransport}
  fixture={routeState.fixture}
  fixtureId={routeState.fixtureId}
  view={routeState.view}
/>
