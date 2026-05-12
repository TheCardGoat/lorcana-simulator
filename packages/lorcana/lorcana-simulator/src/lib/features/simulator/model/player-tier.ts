import { m } from "$lib/i18n/messages.js";

export type PatronTierId = "tier2" | "tier3" | "tier4" | "tier5";

export interface PatronTierConfig {
  id: PatronTierId;
  name: () => string;
  color: string;
  glow: string;
  borderColor: string;
}

export const patronTierConfigs: Record<PatronTierId, PatronTierConfig> = {
  tier2: {
    id: "tier2",
    name: () => m["patron_tier_supporter"]({}),
    color: "#cd7f32",
    glow: "rgba(205,127,50,0.55)",
    borderColor: "rgba(205,127,50,0.5)",
  },
  tier3: {
    id: "tier3",
    name: () => m["patron_tier_champion"]({}),
    color: "#d4d4d4",
    glow: "rgba(212,212,212,0.5)",
    borderColor: "rgba(212,212,212,0.45)",
  },
  tier4: {
    id: "tier4",
    name: () => m["patron_tier_legend"]({}),
    color: "#ffd700",
    glow: "rgba(255,215,0,0.6)",
    borderColor: "rgba(255,215,0,0.55)",
  },
  tier5: {
    id: "tier5",
    name: () => m["patron_tier_admin"]({}),
    color: "#a855f7",
    glow: "rgba(168,85,247,0.55)",
    borderColor: "rgba(168,85,247,0.5)",
  },
};

export function resolvePatronTierConfig(
  subscriptionTier: string | null | undefined,
): PatronTierConfig | null {
  if (!subscriptionTier) {
    return null;
  }
  return patronTierConfigs[subscriptionTier as PatronTierId] ?? null;
}
