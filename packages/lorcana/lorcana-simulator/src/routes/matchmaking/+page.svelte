<script lang="ts">
    import MatchmakingLobby from "$lib/features/matchmaking/ui/MatchmakingLobby.svelte";
  import { m } from "$lib/paraglide/messages.js";

  const PAGE_TITLE = "Lorcana Simulator Matchmaking";
</script>

<svelte:head>
  <title>{PAGE_TITLE}</title>
  <meta
    name="description"
    content={m["sim.meta.description"]({})}
  />
</svelte:head>

<MatchmakingLobby />
