<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import LoreBadge from "$lib/design-system/simulator/display/LoreBadge.svelte";

  const { Story } = defineMeta({
    title: "Lorcana/Atoms/LoreBadge",
    component: LoreBadge,
    argTypes: {
      value: {
        control: { type: "number", min: 0, max: 20 },
      },
      max: {
        control: { type: "number", min: 10, max: 30 },
      },
      size: {
        control: { type: "select" },
        options: ["small", "medium", "large"],
      },
      variant: {
        control: { type: "select" },
        options: ["default", "winning", "losing"],
      },
    },
    args: {
      value: 8,
      max: 20,
      size: "medium",
      variant: "default",
    },
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story
  name="Sizes"
  parameters={{
    docs: {
      description: {
        story: "LoreBadge displays the player's lore count with a circular progress indicator.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <LoreBadge value={8} max={20} size="small" />
        <p class="story-label">Small</p>
      </div>
      <div class="story-item">
        <LoreBadge value={8} max={20} size="medium" />
        <p class="story-label">Medium</p>
      </div>
      <div class="story-item">
        <LoreBadge value={8} max={20} size="large" />
        <p class="story-label">Large</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Progress Levels"
  parameters={{
    docs: {
      description: {
        story: "The circular progress ring fills based on the value/max ratio.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <LoreBadge value={0} max={20} />
        <p class="story-label">0 / 20 (Empty)</p>
      </div>
      <div class="story-item">
        <LoreBadge value={5} max={20} />
        <p class="story-label">5 / 20 (25%)</p>
      </div>
      <div class="story-item">
        <LoreBadge value={10} max={20} />
        <p class="story-label">10 / 20 (50%)</p>
      </div>
      <div class="story-item">
        <LoreBadge value={15} max={20} />
        <p class="story-label">15 / 20 (75%)</p>
      </div>
      <div class="story-item">
        <LoreBadge value={20} max={20} />
        <p class="story-label">20 / 20 (Full - Winner!)</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Variants"
  parameters={{
    docs: {
      description: {
        story: "Variants indicate game status: default (gold), winning (green), or losing (red).",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <LoreBadge value={8} max={20} variant="default" />
        <p class="story-label">Default (Gold)</p>
      </div>
      <div class="story-item">
        <LoreBadge value={8} max={20} variant="winning" />
        <p class="story-label">Winning (Green)</p>
      </div>
      <div class="story-item">
        <LoreBadge value={8} max={20} variant="losing" />
        <p class="story-label">Losing (Red)</p>
      </div>
    </div>
  {/snippet}
</Story>

<style>
  .story-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 1rem;
    align-items: flex-start;
  }

  .story-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .story-label {
    margin: 0;
    font-size: 0.75rem;
    color: #94a3b8;
    text-align: center;
  }
</style>
