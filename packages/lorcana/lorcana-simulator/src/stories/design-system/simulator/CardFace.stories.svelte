<script module lang="ts">
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import CardFace from "$lib/design-system/simulator/cards/CardFace.svelte";
  import {createCharacterCard} from "@/features/simulator-devtools/test-data/factories.js";

  const sampleCard = createCharacterCard("playerOne", "play", {
    name: "Mickey Mouse",
    cost: 3,
    inkType: ["amber"],
    strength: 3,
    willpower: 4,
    loreValue: 2,
    text: "When you play this character, you may draw a card.",
    set: "1",
    cardNumber: 1,
  });

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
    title: "Lorcana/Atoms/CardFace",
    component: CardFace,
    argTypes: {
      size: {
        control: { type: "select" },
        options: ["tiny", "small", "medium", "large"],
      },
      imageFormat: {
        control: { type: "select" },
        options: ["full", "art_only", "art_and_name"],
      },
      damage: {
        control: { type: "number", min: 0, max: 10 },
      },
      isSelected: { control: "boolean" },
      isExerted: { control: "boolean" },
      isGhost: { control: "boolean" },
      isDraggable: { control: "boolean" },
      isPlayable: { control: "boolean" },
      isInvalidTarget: { control: "boolean" },
      isQuesting: { control: "boolean" },
      isDrying: { control: "boolean" },
    },
    args: {
      card: sampleCard,
      size: "medium",
      imageFormat: "full",
      isSelected: false,
      isExerted: false,
      isGhost: false,
      isDraggable: false,
      isPlayable: false,
      isInvalidTarget: false,
      isQuesting: false,
      isDrying: false,
      damage: 0,
    },
    tags: ["autodocs"],
  });
</script>

<Story
  name="Default"
  args={{
    ...getDisplayDimensions("medium"),
    aspectRatio: ASPECT_RATIOS.full,
  }}
/>

<Story
  name="Sizes"
  parameters={{
    docs: {
      description: {
        story: "CardFace component supports four sizes: tiny, small, medium, and large.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="tiny"
          {...getDisplayDimensions("tiny")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Tiny</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="small"
          {...getDisplayDimensions("small")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Small</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Medium</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="large"
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
        story: "CardFace supports different image formats: full (complete card), art_only (just the artwork), and art_and_name (artwork with name banner).",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid">
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          imageFormat="full"
          {...getDisplayDimensions("medium", "full")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Full</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          imageFormat="art_only"
          {...getDisplayDimensions("medium", "art_only")}
          aspectRatio={ASPECT_RATIOS.art_only}
        />
        <p class="story-label">Art Only (Square)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          imageFormat="art_and_name"
          {...getDisplayDimensions("medium", "art_and_name")}
          aspectRatio={ASPECT_RATIOS.art_and_name}
        />
        <p class="story-label">Art + Name</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="States"
  parameters={{
    docs: {
      description: {
        story: "Cards can have various visual states indicating gameplay status.",
      },
    },
  }}
>
  {#snippet children()}
    <div class="story-grid story-grid--vertical">
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isSelected={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Selected (orange glow)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isExerted={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Exerted (90° rotation)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isGhost={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Ghost (semi-transparent)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isPlayable={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Playable (green glow)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isInvalidTarget={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Invalid Target (red glow)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isQuesting={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Questing (golden pulse)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isDrying={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Drying (striped overlay)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          isDraggable={true}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Draggable (grab cursor)</p>
      </div>
      <div class="story-item">
        <CardFace
          card={sampleCard}
          size="medium"
          damage={3}
          {...getDisplayDimensions("medium")}
          aspectRatio={ASPECT_RATIOS.full}
        />
        <p class="story-label">Damaged (-3 badge)</p>
      </div>
    </div>
  {/snippet}
</Story>

<Story
  name="Combined States"
  args={{
    ...getDisplayDimensions("medium"),
    aspectRatio: ASPECT_RATIOS.full,
    isSelected: true,
    isExerted: true,
    damage: 2,
  }}
  parameters={{
    docs: {
      description: {
        story: "Multiple states can be combined for complex card representations.",
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

  .story-grid--vertical {
    flex-direction: column;
    gap: 1.5rem;
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
