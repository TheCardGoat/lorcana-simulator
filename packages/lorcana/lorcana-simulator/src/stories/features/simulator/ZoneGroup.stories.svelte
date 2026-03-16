<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import ZoneGroup from "@/features/simulator/board/ZoneGroup.svelte";
  import {createDiscard, createInkwell} from "@/features/simulator-devtools/test-data/factories.js";

  const sampleDiscard = createDiscard("playerOne", 3);
  const sampleInkwell = createInkwell("playerOne", 5);

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/ZoneGroup",
    component: ZoneGroup,
    argTypes: {
      deckCount: { control: { type: "number", min: 0, max: 60 } },
      isOpponent: { control: "boolean" },
      isMasked: { control: "boolean" },
    },
    args: {
      deckCount: 40,
      discardCards: sampleDiscard,
      inkwellCards: sampleInkwell,
      isOpponent: false,
      isMasked: false,
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    docs: {
      description: {
        story: "ZoneGroup combines Deck, Discard, and Inkwell zones in a horizontal bar layout.",
      },
    },
  }}
/>

<Story
  name="Empty Zones"
  args={{
    deckCount: 0,
    discardCards: [],
    inkwellCards: [],
  }}
  parameters={{
    docs: {
      description: {
        story: "Empty zones display appropriate placeholder states.",
      },
    },
  }}
/>

<Story
  name="Large Deck"
  args={{
    deckCount: 60,
  }}
  parameters={{
    docs: {
      description: {
        story: "Deck shows card count overlay on the stacked card backs.",
      },
    },
  }}
/>

<Story
  name="Large Inkwell"
  args={{
    inkwellCards: createInkwell("playerOne", 12),
  }}
  parameters={{
    docs: {
      description: {
        story: "Large inkwells show the last 5 cards with a '+N' indicator for overflow.",
      },
    },
  }}
/>

<Story
  name="Opponent"
  args={{
    isOpponent: true,
    isMasked: true,
  }}
  parameters={{
    docs: {
      description: {
        story: "Opponent zone group shows masked cards and hides click interactions.",
      },
    },
  }}
/>

<style>
  :global(.story-container) {
    min-width: 400px;
    padding: 1rem;
    background: rgba(15, 30, 50, 0.4);
    border-radius: 12px;
  }
</style>
