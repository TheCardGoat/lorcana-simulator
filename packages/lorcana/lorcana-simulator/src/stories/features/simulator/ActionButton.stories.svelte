<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import ActionButton from "@/features/simulator/panels/ActionButton.svelte";
  import {createActionCandidate} from "@/features/simulator-devtools/test-data/factories.js";

  const { Story } = defineMeta({
    title: "Lorcana/Molecules/ActionButton",
    component: ActionButton,
    argTypes: {
    action: { control: "object" },
    },
    args: {
      action: createActionCandidate("play-card", "Play Card", true, {}),
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Enabled"
  parameters={{
    docs: {
      description: {
        story: "Enabled actions are clickable and show their hotkey.",
      },
    },
  }}
/>

<Story
  name="Disabled"
  args={{
    action: createActionCandidate("challenge", "Challenge", false, {
      reason: "Character is exerted",
    }),
  }}
  parameters={{
    docs: {
      description: {
        story: "Disabled actions show reduced opacity and display the reason why.",
      },
    },
  }}
/>

<Story
  name="Action Types"
  parameters={{
    docs: {
      description: {
        story: "Common action types used in the game.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-column">
      <ActionButton action={createActionCandidate("play-card", "Play Card", true, {})} />
      <ActionButton action={createActionCandidate("ink-card", "Ink Card", true)} />
      <ActionButton action={createActionCandidate("quest", "Quest", true)} />
      <ActionButton action={createActionCandidate("challenge", "Challenge", true)} />
      <ActionButton action={createActionCandidate("pass-turn", "Pass Turn", true)} />
    </div>
  {/snippet}
</Story>

<Story
  name="Mixed States"
  parameters={{
    docs: {
      description: {
        story: "Actions in a list showing mixed enabled/disabled states.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-column">
      <ActionButton action={createActionCandidate("play-card", "Play Card", true, {})} />
      <ActionButton
        action={createActionCandidate("ink-card", "Ink Card", false, { reason: "Not enough ink" })}
      />
      <ActionButton
        action={createActionCandidate("quest", "Quest", false, { reason: "Character is exerted" })}
      />
      <ActionButton
        action={createActionCandidate("challenge", "Challenge", false, {
          reason: "No valid targets",
        })}
      />
      <ActionButton action={createActionCandidate("pass-turn", "Pass Turn", true)} />
    </div>
  {/snippet}
</Story>

<style>
  .story-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    max-width: 280px;
    background: rgba(12, 22, 36, 0.82);
    border: 1px solid rgba(109, 149, 195, 0.3);
    border-radius: 12px;
  }
</style>
