<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import EmptyState from "$lib/design-system/simulator/display/EmptyState.svelte";

  const { Story } = defineMeta({
    title: "Lorcana/Atoms/EmptyState",
    component: EmptyState,
    argTypes: {
      label: { control: "text" },
      icon: { control: "text" },
    },
    args: {
      label: "Empty",
      icon: "◦",
    },
    tags: ["autodocs"],
  });
</script>

<Story name="Default" />

<Story
  name="Custom Icons"
  parameters={{
    docs: {
      description: {
        story: "EmptyState can display different icons and labels for various zones.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <EmptyState label="Empty Zone" icon="◦" />
      </div>
      <div class="story-item zone-box">
        <EmptyState label="No Ink" icon="💧" />
      </div>
      <div class="story-item zone-box">
        <EmptyState label="Empty Deck" icon="📚" />
      </div>
      <div class="story-item zone-box">
        <EmptyState label="No Cards" icon="🗑" />
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="In Zone Context"
  parameters={{
    docs: {
      description: {
        story: "EmptyState is typically displayed inside game zones when they have no cards.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="zone-simulation">
      <div class="zone">
        <span class="zone-label">Play Area</span>
        <div class="zone-content">
          <EmptyState label="Empty" icon="◦" />
        </div>
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
  }

  .story-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .zone-box {
    padding: 1rem;
    background: rgba(15, 30, 50, 0.4);
    border: 2px dashed rgba(100, 150, 200, 0.15);
    border-radius: 12px;
    min-width: 120px;
    min-height: 80px;
  }

  .zone-simulation {
    padding: 1rem;
  }

  .zone {
    width: 300px;
    min-height: 120px;
    background: rgba(15, 30, 50, 0.4);
    border: 2px dashed rgba(100, 150, 200, 0.15);
    border-radius: 12px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .zone-label {
    font-size: 0.6rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(150, 180, 210, 0.66);
    margin-bottom: 0.5rem;
  }

  .zone-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
