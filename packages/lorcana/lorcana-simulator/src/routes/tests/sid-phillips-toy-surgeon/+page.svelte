<script lang="ts">
import LorcanaBrowserHarnessView from "@/features/simulator-devtools/harness/LorcanaBrowserHarnessView.svelte";
import { sidPhillipsToySurgeonFixture as fixture } from "@/features/simulator-devtools/fixtures/sid-phillips-toy-surgeon.js";
</script>

<svelte:head>
  <title>Sid Phillips - Toy Surgeon — PLAYTIME'S OVER + DOUBLE PRIZES!</title>
</svelte:head>

<LorcanaBrowserHarnessView {fixture} view="playerOne" />
