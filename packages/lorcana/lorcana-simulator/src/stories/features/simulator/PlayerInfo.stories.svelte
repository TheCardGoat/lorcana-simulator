<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import PlayerInfo from "@/features/simulator/panels/PlayerInfo.svelte";

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/PlayerInfo",
    component: PlayerInfo,
    argTypes: {
      name: { control: "text" },
      side: {
        control: { type: "select" },
        options: ["playerOne", "playerTwo"],
      },
      lore: { control: { type: "number", min: 0, max: 20 } },
      deckCount: { control: { type: "number", min: 0, max: 60 } },
      handCount: { control: { type: "number", min: 0, max: 10 } },
      discardCount: { control: { type: "number", min: 0, max: 80 } },
      inkwellCount: { control: { type: "number", min: 0, max: 20 } },
      availableInk: { control: { type: "number", min: 0, max: 20 } },
      isActive: { control: "boolean" },
      isOpponent: { control: "boolean" },
    },
    args: {
      name: "Player One",
      side: "playerOne",
      lore: 8,
      deckCount: 35,
      handCount: 5,
      discardCount: 2,
      inkwellCount: 8,
      availableInk: 6,
      isActive: true,
      isOpponent: false,
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    docs: {
      description: {
      story: "PlayerInfo displays player name, lore, deck, hand, discard, and ink counts.",
      },
    },
  }}
/>

<Story
  name="Inactive"
  args={{
    isActive: false,
  }}
  parameters={{
    docs: {
      description: {
        story: "Inactive players don't show the active indicator border.",
      },
    },
  }}
/>

<Story
  name="Opponent"
  args={{
    name: "Player Two",
    side: "playerTwo",
    isOpponent: true,
    isActive: false,
  }}
  parameters={{
    docs: {
      description: {
        story: "Opponent info uses the 'losing' lore variant and appears slightly muted.",
      },
    },
  }}
/>

<Story
  name="Lore Levels"
  parameters={{
    docs: {
      description: {
        story: "Lore badge shows different colors and progress based on value.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-column">
      <PlayerInfo name="Player One" side="playerOne" lore={2} deckCount={35} handCount={5} discardCount={1} inkwellCount={4} availableInk={3} isActive={false} />
      <PlayerInfo name="Player One" side="playerOne" lore={8} deckCount={35} handCount={5} discardCount={2} inkwellCount={5} availableInk={4} isActive={true} />
      <PlayerInfo name="Player One" side="playerOne" lore={15} deckCount={35} handCount={5} discardCount={3} inkwellCount={6} availableInk={5} isActive={false} />
      <PlayerInfo name="Player One" side="playerOne" lore={20} deckCount={35} handCount={5} discardCount={4} inkwellCount={7} availableInk={4} isActive={true} />
    </div>
  {/snippet}
</Story>

<Story
  name="Low Resources"
  args={{
    deckCount: 5,
    handCount: 1,
    discardCount: 6,
    inkwellCount: 3,
    availableInk: 1,
    lore: 2,
  }}
  parameters={{
    docs: {
      description: {
        story: "Low resource states clearly show critical game situations.",
      },
    },
  }}
/>

<style>
  .story-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    max-width: 300px;
  }
</style>
