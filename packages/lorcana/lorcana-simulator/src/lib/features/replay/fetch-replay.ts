/**
 * Replay Fetch & Decompress Helpers
 *
 * Fetches compressed replay data from the game server API and decompresses it.
 */

import { getGameServerOrigin } from "$lib/config/public-url-config.js";
import { requestArrayBuffer } from "$lib/data/transport/http-client.js";
import type { GameAnalyticsSummary } from "@/features/simulator/post-game/notes-api.js";

export interface ReplayPlayerInfo {
  id: string;
  displayName: string | null;
  username: string | null;
}

export interface PersistedReplayMetadata {
  totalMoves: number;
  totalTurns: number;
  durationMs?: number;
  createdAt: string;
  completedAt: string;
  winnerId?: string;
  endReason?: string;
  matchType?: string;
  authority?: "server" | "client";
  players?: [ReplayPlayerInfo, ReplayPlayerInfo];
  deckColors?: { player1: string[]; player2: string[] };
  /** Full analytics summary embedded at download time. */
  analytics?: GameAnalyticsSummary;
}

export interface ReplayMoveRecord {
  stateVersion: number;
  turnNumber: number;
  actorId: string;
  moveId: string;
  input?: unknown;
  timestamp: number;
}

export interface PersistedReplayStep {
  patches: unknown[];
  logs: unknown[];
  acceptedMove: ReplayMoveRecord;
}

export interface ReplayChatMessage {
  id: string;
  senderPlayerId: string;
  senderSeat: 0 | 1 | 2;
  kind: "preset" | "text" | "system";
  presetKey?: string;
  text?: string;
  timestamp: number;
}

export interface PersistedReplayData {
  version: 2;
  gameId: string;
  matchId: string;
  gameType: string;
  seed: string;
  playerIds: [string, string];
  cardsMaps: { cardInstances: Record<string, string>; owners: Record<string, string[]> };
  initialState: string;
  steps: PersistedReplayStep[];
  chatMessages?: ReplayChatMessage[];
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
  try {
    return await requestArrayBuffer(url, undefined, `Failed to fetch replay for ${gameId}`);
  } catch (error) {
    console.error("[fetchReplayBlob] fetch failed", { gameId, url, error });
    throw error;
  }
}

/**
 * Decompress a gzipped replay blob into PersistedReplayData.
 * Uses the browser-native DecompressionStream API.
 */
export async function decompressReplayBlob(compressed: ArrayBuffer): Promise<PersistedReplayData> {
  const stream = new Blob([compressed])
    .stream()
    .pipeThrough(new DecompressionStream("gzip") as ReadableWritablePair<Uint8Array, Uint8Array>);

  const decompressed = await new Response(stream).text();
  return JSON.parse(decompressed) as PersistedReplayData;
}
