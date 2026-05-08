<script lang="ts">
import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";
import { beKingUndisputedFixture as fixture } from "@/features/simulator-devtools/fixtures/be-king-undisputed.js";
</script>

<svelte:head>
  <title>Be King Undisputed — opponent chooses banish</title>
</svelte:head>

<LorcanaBrowserHarnessView {fixture} view="playerOne" />
