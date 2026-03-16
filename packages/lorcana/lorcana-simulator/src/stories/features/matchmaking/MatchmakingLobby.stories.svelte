<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import MatchmakingLobby from "$lib/features/matchmaking/ui/MatchmakingLobby.svelte";

  const { Story } = defineMeta({
    title: "Lorcana/Pages/Matchmaking Lobby",
    component: MatchmakingLobby,
    parameters: {
      layout: "fullscreen",
    },
  });
</script>

<Story
  name="Default"
  parameters={{
    docs: {
      description: {
        story: "Interactive matchmaking lobby UI using local deck fixtures for queue and deck selection.",
      },
    },
  }}
>
  {#snippet children()}
    <MatchmakingLobby />
  {/snippet}
</Story>
