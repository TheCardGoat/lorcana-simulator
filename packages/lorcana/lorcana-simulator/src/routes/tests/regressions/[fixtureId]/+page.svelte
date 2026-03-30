<script lang="ts">
  import type { PageData } from "./$types";
  import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";
  import { LORCANA_REGRESSION_FIXTURES } from "@/features/simulator-devtools/fixtures/regressions";

  let { data }: { data: PageData } = $props();

  const fixture = $derived(LORCANA_REGRESSION_FIXTURES[data.fixtureId]);
</script>

<LorcanaBrowserHarnessView {fixture} view="playerOne" />
