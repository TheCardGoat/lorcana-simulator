<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import SimulatorSidebar from "@/features/simulator/panels/SimulatorSidebar.svelte";
  import {
    createPlayerState,
    createDefaultActions,
    createSampleLog,
    createCharacterCard,
  } from "@/features/simulator-devtools/test-data/factories.js";

  const playerOne = createPlayerState("playerOne", {
    name: "Player One",
    lore: 8,
    deckCount: 35,
    handCount: 5,
  });

  const playerTwo = createPlayerState("playerTwo", {
    name: "Player Two",
    lore: 12,
    deckCount: 40,
    handCount: 4,
  });

  const sampleCard = createCharacterCard("playerOne", "play", {
    name: "Mickey Mouse",
    cost: 3,
    inkType: ["amber"],
  });

  const { Story } = defineMeta({
    title: "Lorcana/Organisms/SimulatorSidebar",
    component: SimulatorSidebar,
    argTypes: {
      challengeMode: { control: "boolean" },
    },
    args: {
      playerOneName: playerOne.name,
      playerTwoName: playerTwo.name,
      playerOneLore: playerOne.lore,
      playerTwoLore: playerTwo.lore,
      playerOneDeckCount: playerOne.deckCount,
      playerTwoDeckCount: playerTwo.deckCount,
      playerOneHandCount: playerOne.handCount,
      playerTwoHandCount: playerTwo.handCount,
      activeSide: "playerOne",
      interactiveSide: "playerOne",
      selectedCard: sampleCard,
      actionCandidates: createDefaultActions(true),
      challengeMode: false,
      logEntries: createSampleLog(5),
    },
    parameters: {
      layout: "fullscreen",
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  parameters={{
    docs: {
      description: {
        story: "SimulatorSidebar combines player info, card inspector, action buttons, and event log.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerOne"
        interactiveSide="playerOne"
        selectedCard={sampleCard}
        actionCandidates={createDefaultActions(true)}
        logEntries={createSampleLog(5)}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="No Selection"
  parameters={{
    docs: {
      description: {
        story: "When no card is selected, the inspector shows an empty state.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerOne"
        interactiveSide="playerOne"
        selectedCard={null}
        actionCandidates={[]}
        logEntries={createSampleLog(5)}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Challenge Mode"
  parameters={{
    docs: {
      description: {
        story: "Challenge mode shows a banner and highlights the challenge action.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerOne"
        interactiveSide="playerOne"
        selectedCard={sampleCard}
        actionCandidates={createDefaultActions(true).map(a =>
          a.id === "challenge" ? { ...a, enabled: true } : { ...a, enabled: false }
        )}
        challengeMode={true}
        logEntries={createSampleLog(5)}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Opponent Turn"
  parameters={{
    docs: {
      description: {
        story: "When it's the opponent's turn, their player info shows the active indicator.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerTwo"
        interactiveSide="playerOne"
        selectedCard={sampleCard}
        actionCandidates={createDefaultActions(true)}
        logEntries={createSampleLog(5)}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Empty Log"
  parameters={{
    docs: {
      description: {
        story: "Empty event log shows a placeholder message.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerOne"
        interactiveSide="playerOne"
        selectedCard={sampleCard}
        actionCandidates={createDefaultActions(true)}
        logEntries={[]}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Full Log"
  parameters={{
    docs: {
      description: {
        story: "Event log scrolls when there are many entries.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerOne"
        interactiveSide="playerOne"
        selectedCard={sampleCard}
        actionCandidates={createDefaultActions(true)}
        logEntries={createSampleLog(15)}
      />
    </div>
  {/snippet}
</Story>

<Story
  name="Disabled Actions"
  parameters={{
    docs: {
      description: {
        story: "Actions can be disabled with explanatory reasons.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-sidebar">
      <SimulatorSidebar
        playerOneName={playerOne.name}
        playerTwoName={playerTwo.name}
        playerOneLore={playerOne.lore}
        playerTwoLore={playerTwo.lore}
        playerOneDeckCount={playerOne.deckCount}
        playerTwoDeckCount={playerTwo.deckCount}
        playerOneHandCount={playerOne.handCount}
        playerTwoHandCount={playerTwo.handCount}
        activeSide="playerOne"
        interactiveSide="playerOne"
        selectedCard={sampleCard}
        actionCandidates={createDefaultActions(false).map(a => ({
          ...a,
          reason: "Not your turn",
        }))}
        logEntries={createSampleLog(5)}
      />
    </div>
  {/snippet}
</Story>

<style>
  .story-sidebar {
    height: 800px;
    width: 320px;
    background: rgba(9, 16, 28, 0.92);
    border: 1px solid rgba(113, 154, 204, 0.3);
    padding: 0.95rem;
  }
</style>
