<script lang="ts">
  import CardBack from "./CardBack.svelte";

  const ART_ONLY_ASPECT_RATIO = 734 / 602;

  interface DeckStackProps {
    count?: number;
    showCount?: boolean;
    ownerId?: string | null;
  }

  let { count, showCount = true, ownerId = null }: DeckStackProps = $props();

</script>

<div
  class="relative flex items-center justify-center deck-stack"
  style="width: var(--zone-card-width, 40px); height: var(--zone-card-height, 56px);"
>
  <div class="deck-card absolute inset-0">
    <CardBack
      {ownerId}
      displayWidth={49}
      displayHeight={40}
      aspectRatio={ART_ONLY_ASPECT_RATIO}
      useContainerSize={true}
      imageFormat="art_only"
    />
  </div>
  <div class="deck-card absolute inset-0">
    <CardBack
      {ownerId}
      displayWidth={49}
      displayHeight={40}
      aspectRatio={ART_ONLY_ASPECT_RATIO}
      useContainerSize={true}
      imageFormat="art_only"
    />
  </div>
  <div class="deck-card absolute inset-0">
    <CardBack
      {ownerId}
      displayWidth={49}
      displayHeight={40}
      aspectRatio={ART_ONLY_ASPECT_RATIO}
      useContainerSize={true}
      imageFormat="art_only"
    />
  </div>
  {#if showCount && count !== undefined}
    <span class="absolute z-10 text-xs font-extrabold text-slate-200 bg-black/60 px-2 py-[0.2rem] rounded-full min-w-6 text-center">
      {count}
    </span>
  {/if}
</div>

<style>
  /* nth-child selectors for stacked card effect - no Tailwind equivalent */
  .deck-card:nth-child(1) {
    transform: translate(0, 0);
  }

  .deck-card:nth-child(2) {
    transform: translate(2px, -2px);
  }

  .deck-card:nth-child(3) {
    transform: translate(4px, -4px);
  }

  .deck-stack:hover .deck-card:nth-child(1) {
    transform: translate(-1px, 1px);
  }

  .deck-stack:hover .deck-card:nth-child(2) {
    transform: translate(3px, -3px) rotate(-2deg);
  }

  .deck-stack:hover .deck-card:nth-child(3) {
    transform: translate(6px, -6px) rotate(-4deg);
  }
</style>
