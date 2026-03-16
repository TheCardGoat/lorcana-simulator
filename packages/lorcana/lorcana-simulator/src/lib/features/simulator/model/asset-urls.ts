/**
 * Asset URL helpers for Lorcana card skeleton UI.
 * All assets are served from the TCG Online CDN.
 */

const ASSET_BASE = "https://r2.tcg.online/public/lorcana/simulator";

/**
 * Get the URL for an ink symbol SVG.
 * @param ink - The ink type (e.g., "amber", "ruby", "sapphire")
 */
export function getInkSymbolUrl(ink: string): string {
  return `${ASSET_BASE}/inks/${ink.toLowerCase()}.svg`;
}

/**
 * Get the URL for a rarity icon.
 * @param rarity - The rarity type (e.g., "common", "legendary")
 */
export function getRarityIconUrl(rarity: string): string {
  // Convert super_rare to super-rare for URL
  const normalizedRarity = rarity.toLowerCase().replace(/_/g, "-");
  return `${ASSET_BASE}/rarity/${normalizedRarity}.webp`;
}

/**
 * Get the URL for a stat icon.
 * @param stat - The stat type ("strength" or "defense")
 */
export function getStatIconUrl(stat: "strength" | "defense"): string {
  return `${ASSET_BASE}/symbols/${stat}.svg`;
}

/**
 * Get the URL for the cost/ink icon.
 */
export function getCostIconUrl(): string {
  return `${ASSET_BASE}/symbols/ink-cost.svg`;
}
