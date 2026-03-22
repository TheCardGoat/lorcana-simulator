<script lang="ts">
  import { Image } from "@unpic/svelte";
  import {AspectRatio} from "$lib/design-system/primitives/aspect-ratio/index.js";
  import { buildLorcanaAssetUrl } from "$lib/config/public-url-config.js";

  const {
    set,
    number,
    lang = "EN",
    crop = "full",
    alt,
    class: className = "",
    onLoad,
    onError,
  }: {
    set: string | number;
    number: number;
    lang?: string;
    crop?: "full" | "art_only" | "art_and_name";
    alt: string;
    class?: string;
    onLoad?: () => void;
    onError?: () => void;
  } = $props();

  function getPaddedSet(s: string | number): string {
    const setStr = String(s);
    // If it's just a number like "6" or 6, pad it to "006".
    // If it's "set6", we might need to extract the number or just use it if the legacy format allows.
    // Based on the user request:
    // https://cdn.assets.lorcanito.com/assets/images/cards/EN/006/143.webp
    // The set is "006". "set6" in the data maps to this.

    // Check if it starts with "set"
    if (setStr.startsWith("set")) {
      const numPart = setStr.replace("set", "");
      return numPart.padStart(3, "0");
    }

    // Otherwise assume it's a number
    return setStr.padStart(3, "0");
  }

  const imageUrl = $derived.by(() => {
    const paddedSet = getPaddedSet(set);
    const safeLang = lang.toUpperCase();

    // https://r2.tcg.online/public/lorcana/EN/004/128.webp
    // https://r2.tcg.online/public/lorcana/004/art_only/128.webp
    // https://r2.tcg.online/public/lorcana/EN/004/art_and_name/128.webp

    const paddedNumber = String(number).padStart(3, "0");

    switch (crop) {
      case "art_only": {
        return buildLorcanaAssetUrl(`${paddedSet}/art_only/${paddedNumber}.webp`);
      }
      case "art_and_name": {
        return buildLorcanaAssetUrl(`${safeLang}/${paddedSet}/art_and_name/${paddedNumber}.webp`);
      }
      case "full":
      default: {
        return buildLorcanaAssetUrl(`${safeLang}/${paddedSet}/${paddedNumber}.webp`);
      }
    }
  });

  const dimensions = $derived(
    crop === "art_only"
      ? { width: 734, height: 602 }
      : crop === "art_and_name"
        ? { width: 734, height: 766 }
        : { width: 734, height: 1024 },
  );

  const aspectRatio = $derived(dimensions.width / dimensions.height);
</script>

<AspectRatio ratio={aspectRatio} class="w-full h-full">
  <Image
    src={imageUrl}
    {alt}
    width={dimensions.width}
    height={dimensions.height}
    layout="constrained"
    class="object-cover {className}"
    onload={onLoad}
    onerror={onError}
  />
</AspectRatio>

<style>
  :global(img) {
    display: block;
    image-rendering: high-quality;
  }
</style>
