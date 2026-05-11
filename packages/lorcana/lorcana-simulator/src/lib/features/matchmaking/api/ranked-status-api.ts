import { getApiOrigin } from "$lib/config/public-url-config.js";
import { requestJson } from "$lib/data/transport/http-client.js";
import type { QueueStatsFormat } from "./queue-stats-api.js";

export interface RankedFormatStatus {
  placementsCompleted: number;
  placementsRequired: number;
  mmr: number | null;
  highestMmr: number | null;
  bracket: string | null;
}

export interface RankedStatusResponse {
  object: "ranked_status";
  seasonId: string;
  seasonStartsAt: string;
  seasonEndsAt: string;
  formats: Record<QueueStatsFormat, RankedFormatStatus>;
}

export async function fetchRankedStatus(): Promise<RankedStatusResponse> {
  return requestJson<RankedStatusResponse>(
    `${getApiOrigin()}/v1/match-history/players/me/ranked-status`,
    undefined,
    "Failed to fetch ranked status",
  );
}
