<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import HandFan from "@/features/simulator/board/HandFan.svelte";
  import {createHand} from "@/features/simulator-devtools/test-data/factories.js";

  const playerHand = createHand("playerOne", 5, { inkType: ["amber", "sapphire", "emerald", "ruby", "amethyst"] });
  const largeHand = createHand("playerOne", 10);

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/HandFan",
    component: HandFan,
    argTypes: {
      isMasked: { control: "boolean" },
      isOpponent: { control: "boolean" },
    },
    args: {
      cards: playerHand,
      isMasked: false,
      isOpponent: false,
      selectedCardId: null,
      playableCardIds: [],
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Player Hand"
  parameters={{
    docs: {
      description: {
        story: "Player hand shows cards in a fanned layout at the bottom with hover expansion.",
      },
    },
  }}
/>

<Story
  name="Opponent Hand"
  args={{
    isOpponent: true,
    isMasked: true,
  }}
  parameters={{
    docs: {
      description: {
        story: "Opponent hand shows masked cards (backs only) fanned at the top.",
      },
    },
  }}
/>

<Story
  name="With Hotkeys"
  args={{
  }}
  parameters={{
    docs: {
      description: {
        story: "Hotkey badges (1-9) appear on each card for keyboard selection.",
      },
    },
  }}
/>

<Story
  name="Large Hand"
  args={{
    cards: largeHand,
  }}
  parameters={{
    docs: {
      description: {
        story: "Larger hands are more tightly fanned but still expand on hover.",
      },
    },
  }}
/>

<Story
  name="Empty Hand"
  args={{
    cards: [],
  }}
  parameters={{
    docs: {
      description: {
        story: "Empty hand shows a simple '0 cards' message.",
      },
    },
  }}
/>

<Story
  name="Playable Cards"
  args={{
    playableCardIds: [playerHand[1]?.cardId, playerHand[3]?.cardId],
  }}
  parameters={{
    docs: {
      description: {
        story: "Playable cards in hand display a green glow indicator.",
      },
    },
  }}
/>

<style>
  :global(.story-wrapper) {
    min-height: 200px;
    padding: 2rem;
    background: rgba(15, 30, 50, 0.4);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
