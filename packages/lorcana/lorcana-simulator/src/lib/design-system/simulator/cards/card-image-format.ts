export type ImageFormat = "full" | "art_only" | "art_and_name";

export const CARD_IMAGE_DIMENSIONS: Record<ImageFormat, { width: number; height: number }> = {
  full: { width: 734, height: 1024 },
  art_only: { width: 734, height: 602 },
  art_and_name: { width: 734, height: 766 },
};

export const CARD_IMAGE_ASPECT_RATIOS: Record<ImageFormat, number> = {
  full: CARD_IMAGE_DIMENSIONS.full.width / CARD_IMAGE_DIMENSIONS.full.height,
  art_only: CARD_IMAGE_DIMENSIONS.art_only.width / CARD_IMAGE_DIMENSIONS.art_only.height,
  art_and_name:
    CARD_IMAGE_DIMENSIONS.art_and_name.width / CARD_IMAGE_DIMENSIONS.art_and_name.height,
};
