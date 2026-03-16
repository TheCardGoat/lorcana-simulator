<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import PlayArea from "@/features/simulator/board/PlayArea.svelte";
  import {createBoardCharacters} from "@/features/simulator-devtools/test-data/factories.js";

  const characters = createBoardCharacters("playerOne", 4, {
    inkType: ["amber", "sapphire", "emerald", "ruby"],
  });

  const exertedCharacters = createBoardCharacters("playerOne", 2, {
    inkType: ["amber"],
    readyState: "exerted",
  });

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/PlayArea",
    component: PlayArea,
    argTypes: {
      isMasked: { control: "boolean" },
      isOpponent: { control: "boolean" },
      challengeMode: { control: "boolean" },
      dropState: {
        control: { type: "select" },
        options: ["none", "valid", "invalid"],
      },
    },
    args: {
      cards: characters,
      zoneId: "play",
      playerSide: "playerOne",
      isMasked: false,
      isOpponent: false,
      selectedCardId: null,
      challengeMode: false,
      dropState: "none",
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    docs: {
      description: {
        story: "PlayArea is the main zone where characters are placed during gameplay.",
      },
    },
  }}
/>

<Story
  name="Empty"
  args={{
    cards: [],
  }}
  parameters={{
    docs: {
      description: {
        story: "Empty play area shows a placeholder state.",
      },
    },
  }}
/>

<Story
  name="Opponent"
  args={{
    isOpponent: true,
    playerSide: "playerTwo",
  }}
  parameters={{
    docs: {
      description: {
        story: "Opponent play areas use a slightly different color scheme (reddish tint).",
      },
    },
  }}
/>

<Story
  name="Exerted Cards"
  args={{
    cards: exertedCharacters,
  }}
  parameters={{
    docs: {
      description: {
        story: "Exerted cards (tapped/rotated) indicate they've been used this turn.",
      },
    },
  }}
/>

<Story
  name="Drop States"
  parameters={{
    docs: {
      description: {
        story: "PlayArea can indicate valid or invalid drop targets during drag operations.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-row">
      <div class="story-item">
        <PlayArea cards={characters} zoneId="play" playerSide="playerOne" dropState="valid" />
        <p class="story-label">Valid Drop</p>
      </div>
      <div class="story-item">
        <PlayArea cards={characters} zoneId="play" playerSide="playerOne" dropState="invalid" />
        <p class="story-label">Invalid Drop</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Challenge Mode"
  args={{
    isOpponent: true,
    playerSide: "playerTwo",
    challengeMode: true,
    validTargetCardIds: [characters[0]?.cardId],
    invalidTargetCardIds: [characters[2]?.cardId],
  }}
  parameters={{
    docs: {
      description: {
        story: "In challenge mode, opponent cards can be selected as valid/invalid targets.",
      },
    },
  }}
/>

<style>
  .story-row {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
  }

  .story-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .story-label {
    margin: 0;
    font-size: 0.75rem;
    color: #94a3b8;
    text-transform: uppercase;
  }

  :global(.story-item > *) {
    min-height: 150px;
  }
</style>
