/**
 * Replay Fetch & Decompress Helpers
 *
 * Fetches compressed replay data from the game server API and decompresses it.
 */

import { getGameServerOrigin } from "$lib/config/public-url-config.js";

export interface PersistedReplayMetadata {
  totalMoves: number;
  totalTurns: number;
  createdAt: string;
  completedAt: string;
  winnerId?: string;
}

export interface PersistedReplayMove {
  stateVersion: number;
  acceptedMove: unknown;
  patches: unknown[];
  state?: unknown;
  engineLogs: unknown[];
}

export interface PersistedReplayData {
  version: 1;
  gameId: string;
  matchId: string;
  gameType: string;
  seed: string;
  playerIds: [string, string];
  initialState: string;
  moves: PersistedReplayMove[];
  metadata: PersistedReplayMetadata;
}

/**
 * Fetch the compressed replay blob from the API.
 * Uses the /data endpoint which returns gzipped JSON directly (or redirects to S3).
 */
export async function fetchReplayBlob(gameId: string): Promise<ArrayBuffer> {
  const origin = getGameServerOrigin();
  const url = `${origin}/v1/play/replays/${encodeURIComponent(gameId)}/data`;
  console.debug("[fetchReplayBlob] fetching", { gameId, url });
  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    console.error("[fetchReplayBlob] fetch failed", { gameId, url, status: response.status });
    throw new Error(`Failed to fetch replay for ${gameId}: ${response.status}`);
  }

  return response.arrayBuffer();
}

/**
 * Decompress a gzipped replay blob into PersistedReplayData.
 * Uses the browser-native DecompressionStream API.
 */
export async function decompressReplayBlob(compressed: ArrayBuffer): Promise<PersistedReplayData> {
  const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("gzip"));

  const decompressed = await new Response(stream).text();
  return JSON.parse(decompressed) as PersistedReplayData;
}
