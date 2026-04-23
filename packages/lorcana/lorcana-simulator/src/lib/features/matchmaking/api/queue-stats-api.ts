import { getGameServerOrigin } from "$lib/config/public-url-config.js";
import { requestJson } from "$lib/data/transport/http-client.js";

export type QueueStatsFormat = "infinity" | "core-constructed" | "early-access";
export type QueueStatsMode = "1" | "3";

export type QueueStatsMatchType = "ranked" | "casual" | "testing";

export interface QueueStatsPartition {
  format: QueueStatsFormat;
  mode: QueueStatsMode;
  matchType: QueueStatsMatchType;
  inQueue: number;
  liveMatches: number;
  placement: number | null;
}

export interface QueueStatsResponse {
  object: "matchmaking_stats";
  partitions: QueueStatsPartition[];
}

export async function fetchQueueStats(): Promise<QueueStatsResponse> {
  return requestJson<QueueStatsResponse>(
    `${getGameServerOrigin()}/v1/play/matchmaking/stats`,
    undefined,
    "Failed to fetch queue stats",
  );
}
