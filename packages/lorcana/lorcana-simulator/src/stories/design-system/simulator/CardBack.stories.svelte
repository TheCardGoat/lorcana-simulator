<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CardBack from "$lib/design-system/simulator/cards/CardBack.svelte";

  // Aspect ratios calculated from asset dimensions
  const ASPECT_RATIOS = {
    full: 734 / 1024, // ~0.717
    art_only: 734 / 602, // ~1.219
    art_and_name: 734 / 766, // ~0.958
  };

  const DIMENSIONS = {
    full: { width: 734, height: 1024 },
    art_only: { width: 734, height: 602 },
    art_and_name: { width: 734, height: 766 },
  };

  // Size scale factors (based on full card 734x1024)
  const SIZE_SCALES = {
    tiny: 90 / 734, // ~0.1226 → 90x128 for full
    small: 182 / 734, // ~0.248 → 182x256 for full
    medium: 367 / 734, // 0.5 → 367x512 for full
    large: 182 / 734, // same as small → 182x256 for full
  };

  function getDisplayDimensions(size: "tiny" | "small" | "medium" | "large", imageFormat: "full" | "art_only" | "art_and_name" = "full") {
    const { width, height } = DIMENSIONS[imageFormat];
    const scale = SIZE_SCALES[size];
    return {
      displayWidth: Math.round(width * scale),
      displayHeight: Math.round(height * scale),
    };
  }

  const { Story } = defineMeta({
    title: "Lorcana/Atoms/CardBack",
    component: CardBack,
    argTypes: {
      isPlayable: { control: "boolean" },
      isGhost: { control: "boolean" },
      imageFormat: {
        control: { type: "select" },
        options: ["full", "art_only", "art_and_name"],
      },
    },
    args: {
      ...getDisplayDimensions("medium"),
      aspectRatio: ASPECT_RATIOS.full,
      imageFormat: "full",
      isPlayable: false,
      isGhost: false,
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
        story: "CardBack displays the reverse side of a card with actual card back artwork.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("tiny")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Tiny</p>
      </div>
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("small")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Small</p>
      </div>
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Medium</p>
      </div>
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("large")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Large</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Image Formats"
  parameters={{
    docs: {
      description: {
        story: "CardBack adapts to different image formats, using square artwork for art_only format.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("medium", "full")}
          aspectRatio={ASPECT_RATIOS.full}
          imageFormat="full"
        />
        <p class="story-label">Full (Standard Back)</p>
      </div>
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("medium", "art_only")}
          aspectRatio={ASPECT_RATIOS.art_only}
          imageFormat="art_only"
        />
        <p class="story-label">Art Only (Square Back)</p>
      </div>
      <div class="story-item">
        <CardBack
          {...getDisplayDimensions("medium", "art_and_name")}
          aspectRatio={ASPECT_RATIOS.art_and_name}
          imageFormat="art_and_name"
        />
        <p class="story-label">Art + Name</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Playable"
  args={{
    isPlayable: true,
  }}
  parameters={{
    docs: {
      description: {
        story: "When a masked card is playable, a green pulse indicator appears in the bottom-right corner.",
      },
    },
  }}
/>

<Story
  name="Ghost"
  args={{
    isGhost: true,
  }}
  parameters={{
    docs: {
      description: {
        story: "Ghost cards appear semi-transparent, used for drag previews or placeholder positions.",
      },
    },
  }}
/>

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
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
