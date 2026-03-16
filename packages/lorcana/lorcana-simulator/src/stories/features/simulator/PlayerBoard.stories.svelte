<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import PlayerBoard from "@/features/simulator/board/PlayerBoard.svelte";
  import {createPlayerState} from "@/features/simulator-devtools/test-data/factories.js";

  const playerOne = createPlayerState("playerOne", {
    name: "Player One",
    lore: 8,
    handCount: 5,
    playCount: 3,
    inkwellCount: 4,
    discardCount: 2,
    deckCount: 35,
  });

  const playerTwo = createPlayerState("playerTwo", {
    name: "Player Two",
    lore: 12,
    handCount: 4,
    playCount: 2,
    inkwellCount: 5,
    discardCount: 3,
    deckCount: 40,
  });

  const { Story } = defineMeta({
    title: "Lorcana/Organisms/PlayerBoard",
    component: PlayerBoard,
    argTypes: {
      isOpponent: { control: "boolean" },
      isHandMasked: { control: "boolean" },
      challengeMode: { control: "boolean" },
    },
    args: {
      playerSide: "playerOne",
      handCards: playerOne.hand,
      playCards: playerOne.play,
      inkwellCards: playerOne.inkwell,
      discardCards: playerOne.discard,
      deckCount: playerOne.deckCount,
      isOpponent: false,
      isHandMasked: false,
      isPlayMasked: false,
      selectedCardId: null,
      playableCardIds: [],
      validTargetCardIds: [],
      invalidTargetCardIds: [],
      challengeMode: false,
      playAreaDropState: "none",
      inkwellDropState: "none",
    },
    parameters: {
      layout: "fullscreen",
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Player Board"
  parameters={{
    docs: {
      description: {
        story: "PlayerBoard shows a complete player area with hand overlay, play zone, and resource zones.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-board">
      <PlayerBoard
        playerSide="playerOne"
        handCards={playerOne.hand}
        playCards={playerOne.play}
        inkwellCards={playerOne.inkwell}
        discardCards={playerOne.discard}
        deckCount={playerOne.deckCount}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Opponent Board"
  parameters={{
    docs: {
      description: {
        story: "Opponent board shows masked hand and reversed layout (hand at top).",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-board">
      <PlayerBoard
        playerSide="playerTwo"
        handCards={playerTwo.hand}
        playCards={playerTwo.play}
        inkwellCards={playerTwo.inkwell}
        discardCards={playerTwo.discard}
        deckCount={playerTwo.deckCount}
        isOpponent={true}
        isHandMasked={true}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="With Selection"
  parameters={{
    docs: {
      description: {
        story: "Selected cards are highlighted across all zones.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-board">
      <PlayerBoard
        playerSide="playerOne"
        handCards={playerOne.hand}
        playCards={playerOne.play}
        inkwellCards={playerOne.inkwell}
        discardCards={playerOne.discard}
        deckCount={playerOne.deckCount}
        selectedCardId={playerOne.play[1]?.cardId}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Playable Cards"
  parameters={{
    docs: {
      description: {
        story: "Playable cards show green glow in hand.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-board">
      <PlayerBoard
        playerSide="playerOne"
        handCards={playerOne.hand}
        playCards={playerOne.play}
        inkwellCards={playerOne.inkwell}
        discardCards={playerOne.discard}
        deckCount={playerOne.deckCount}
        playableCardIds={[playerOne.hand[1]?.cardId, playerOne.hand[3]?.cardId]}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Drop States"
  parameters={{
    docs: {
      description: {
        story: "Valid drop targets show green highlighting.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-board">
      <PlayerBoard
        playerSide="playerOne"
        handCards={playerOne.hand}
        playCards={playerOne.play}
        inkwellCards={playerOne.inkwell}
        discardCards={playerOne.discard}
        deckCount={playerOne.deckCount}
        playAreaDropState="valid"
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Full Game View"
  parameters={{
    docs: {
      description: {
        story: "Both player boards stacked to simulate a full game view.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-game">
      <PlayerBoard
        playerSide="playerTwo"
        handCards={playerTwo.hand}
        playCards={playerTwo.play}
        inkwellCards={playerTwo.inkwell}
        discardCards={playerTwo.discard}
        deckCount={playerTwo.deckCount}
        isOpponent={true}
        isHandMasked={true}
      />
      <div class="board-divider"></div>
      <PlayerBoard
        playerSide="playerOne"
        handCards={playerOne.hand}
        playCards={playerOne.play}
        inkwellCards={playerOne.inkwell}
        discardCards={playerOne.discard}
        deckCount={playerOne.deckCount}
        playableCardIds={[playerOne.hand[0]?.cardId]}
      />
    </div>
  {/snippet}
</Story>

<style>
  .story-board {
    height: 400px;
    padding: 3rem 1rem;
    background: linear-gradient(180deg, #264a73 0%, #1e3a5f 50%, #1a3252 100%);
    border-radius: 12px;
  }

  .story-game {
    height: 600px;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: linear-gradient(180deg, #1a3252 0%, #264a73 50%, #1a3252 100%);
    border-radius: 12px;
    gap: 1rem;
  }

  .story-game > :global(*) {
    flex: 1;
  }

  .board-divider {
    height: 2px;
    background: rgba(100, 150, 200, 0.2);
    margin: 0.5rem 0;
  }
</style>
