<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import TurnPhasePill from "$lib/design-system/simulator/display/TurnPhasePill.svelte";

  const { Story } = defineMeta({
    title: "Lorcana/Atoms/TurnPhasePill",
    component: TurnPhasePill,
    argTypes: {
      label: { control: "text" },
      variant: {
        control: { type: "select" },
        options: ["default", "active", "p1", "p2"],
      },
    },
    args: {
      label: "TURN 5",
      variant: "default",
    },
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story
  name="Variants"
  parameters={{
    docs: {
      description: {
        story: "TurnPhasePills indicate different game states with color variants.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-row">
      <TurnPhasePill label="TURN 5" variant="default" />
      <TurnPhasePill label="MAIN PHASE" variant="active" />
      <TurnPhasePill label="PLAYER ONE" variant="p1" />
      <TurnPhasePill label="PLAYER TWO" variant="p2" />
    </div>
  {/snippet}
</Story>

<Story
  name="Turn Bar"
  parameters={{
    docs: {
      description: {
        story: "Multiple pills can be combined to create a turn/phase indicator bar.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-bar">
      <TurnPhasePill label="TURN 12" variant="default" />
      <span class="divider">•</span>
      <TurnPhasePill label="MAIN" variant="active" />
      <span class="divider">•</span>
      <TurnPhasePill label="ACTION STEP" variant="active" />
      <span class="divider">•</span>
      <TurnPhasePill label="PLAYER ONE" variant="p1" />
    </div>
  {/snippet}
</Story>

<style>
  .story-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
  }

  .story-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(7, 14, 24, 0.92);
    border: 1px solid rgba(108, 145, 192, 0.32);
    border-radius: 999px;
    width: fit-content;
  }

  .divider {
    color: rgba(148, 163, 184, 0.65);
    font-size: 0.72rem;
  }
</style>
