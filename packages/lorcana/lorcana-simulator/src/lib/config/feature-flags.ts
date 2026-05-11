import { env } from "$env/dynamic/public";

export interface FeatureFlags {
  rankedEnabled: boolean;
}

function parseBoolean(value: string | undefined): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes" || normalized === "on";
}

export function getFeatureFlags(): FeatureFlags {
  return {
    rankedEnabled: parseBoolean(env.PUBLIC_RANKED_ENABLED),
  };
}
