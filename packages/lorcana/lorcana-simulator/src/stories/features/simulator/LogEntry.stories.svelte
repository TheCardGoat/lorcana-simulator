<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LogEntry from "@/features/simulator/panels/LogEntry.svelte";
  import {createLogEntry} from "@/features/simulator-devtools/test-data/factories.js";

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/LogEntry",
    component: LogEntry,
    argTypes: {
      entry: { control: "object" },
    },
    args: {
      entry: createLogEntry("Played a card", {
        detail: "Played Mickey Mouse - Brave Little Tailor for 3 ink",
        actorSide: "playerOne",
        moveId: "playCard",
      }),
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    docs: {
      description: {
        story: "LogEntry displays a single game action with timestamp and optional details.",
      },
    },
  }}
/>

<Story
  name="Simple"
  args={{
    entry: createLogEntry("Passed turn", {
      actorSide: "playerTwo",
      moveId: "passTurn",
    }),
  }}
  parameters={{
    docs: {
      description: {
        story: "Simple entries show only the title and timestamp.",
      },
    },
  }}
/>

<Story
  name="Various Actions"
  parameters={{
    docs: {
      description: {
        story: "Different types of game actions logged during play.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-column">
      <LogEntry entry={createLogEntry("Drew a card", { detail: "Drew Captain Hook - Forceful Duelist", actorSide: "playerOne" })} />
      <LogEntry entry={createLogEntry("Played a card", { detail: "Played Mickey Mouse for 3 ink", actorSide: "playerOne" })} />
      <LogEntry entry={createLogEntry("Quested", { detail: "Ariel quested for 2 lore", actorSide: "playerOne" })} />
      <LogEntry entry={createLogEntry("Challenged", { detail: "Mulan challenged Beast", actorSide: "playerTwo" })} />
      <LogEntry entry={createLogEntry("Put into inkwell", { actorSide: "playerOne" })} />
      <LogEntry entry={createLogEntry("Passed turn", { actorSide: "playerTwo" })} />
    </div>
  {/snippet}
</Story>

<style>
  .story-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    max-width: 350px;
    background: rgba(12, 22, 36, 0.82);
    border: 1px solid rgba(109, 149, 195, 0.3);
    border-radius: 12px;
  }
</style>
