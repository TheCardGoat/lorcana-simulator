<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CardGrid from "@/features/simulator/board/CardGrid.svelte";
  import {createBoardCharacters} from "@/features/simulator-devtools/test-data/factories.js";

  const fewCards = createBoardCharacters("playerOne", 3, { inkType: ["amber"] });
  const manyCards = createBoardCharacters("playerOne", 8, { inkType: ["sapphire"] });

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/CardGrid",
    component: CardGrid,
    argTypes: {
      isMasked: { control: "boolean" },
      isOpponent: { control: "boolean" },
      challengeMode: { control: "boolean" },
    },
    args: {
      cards: fewCards,
      isMasked: false,
      isOpponent: false,
      selectedCardId: null,
      playableCardIds: [],
      validTargetCardIds: [],
      invalidTargetCardIds: [],
      challengeMode: false,
    },
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story
  name="Empty"
  args={{
    cards: [],
  }}
  parameters={{
    docs: {
      description: {
        story: "CardGrid displays an empty state when there are no cards.",
      },
    },
  }}
/>

<Story
  name="Many Cards"
  args={{
    cards: manyCards,
  }}
  parameters={{
    docs: {
      description: {
        story: "CardGrid wraps cards and centers them within the container.",
      },
    },
  }}
/>

<Story
  name="Masked"
  args={{
    cards: fewCards,
    isMasked: true,
  }}
  parameters={{
    docs: {
      description: {
        story: "When masked, cards display their backs instead of faces (used for opponent's hidden cards).",
      },
    },
  }}
/>

<Story
  name="Opponent View"
  args={{
    cards: fewCards,
    isOpponent: true,
  }}
  parameters={{
    docs: {
      description: {
        story: "Opponent view hides draggability and shows masked cards if applicable.",
      },
    },
  }}
/>

<Story
  name="With Selection"
  args={{
    cards: fewCards,
    selectedCardId: fewCards[1]?.cardId,
  }}
  parameters={{
    docs: {
      description: {
        story: "Selected cards are highlighted with an orange glow and border.",
      },
    },
  }}
/>

<Story
  name="Playable Cards"
  args={{
    cards: fewCards,
    playableCardIds: [fewCards[0]?.cardId, fewCards[2]?.cardId],
  }}
  parameters={{
    docs: {
      description: {
        story: "Playable cards show a green glow and pulse animation.",
      },
    },
  }}
/>

<Story
  name="Challenge Mode"
  args={{
    cards: fewCards,
    challengeMode: true,
    validTargetCardIds: [fewCards[1]?.cardId],
    invalidTargetCardIds: [fewCards[0]?.cardId, fewCards[2]?.cardId],
  }}
  parameters={{
    docs: {
      description: {
        story: "In challenge mode, valid targets glow green and invalid targets glow red.",
      },
    },
  }}
/>

<style>
  :global(.story-container) {
    min-height: 200px;
    padding: 1rem;
    background: rgba(15, 30, 50, 0.4);
    border: 2px dashed rgba(100, 150, 200, 0.15);
    border-radius: 12px;
  }
</style>
