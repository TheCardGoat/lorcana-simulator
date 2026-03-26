import { getGameServerOrigin } from "$lib/config/public-url-config.js";

export interface MatchmakingJoinParams {
  gameProfileId: string;
  deckListId: string;
  format: string;
  mode: string;
  archetypeId?: string;
  bracketId?: string;
}

export interface MatchmakingEntryResponse {
  object: "matchmaking_entry";
  status: "queued";
  queuedAt: number;
  expiresAt: number;
}

export interface MatchmakingStatusResponse {
  object: "matchmaking_status";
  queued: boolean;
  entry?: {
    userId: string;
    gameProfileId: string;
    deckListId: string;
    format: string;
    mode: string;
    archetypeId?: string;
    bracketId?: string;
    queuedAt: number;
    expiresAt: number;
  };
  position?: number;
}

export async function joinMatchmakingQueue(
  params: MatchmakingJoinParams,
): Promise<MatchmakingEntryResponse> {
  const res = await fetch(`${getGameServerOrigin()}/v1/play/matchmaking/join`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      typeof body === "object" && body !== null && "message" in body
        ? String((body as Record<string, unknown>).message)
        : `Failed to join queue: ${res.status}`;
    throw new Error(message);
  }

  return res.json() as Promise<MatchmakingEntryResponse>;
}

export async function leaveMatchmakingQueue(): Promise<void> {
  const res = await fetch(`${getGameServerOrigin()}/v1/play/matchmaking/leave`, {
    method: "DELETE",
    credentials: "include",
  });

  // 204 No Content is success; ignore body
  if (!res.ok && res.status !== 204) {
    throw new Error(`Failed to leave queue: ${res.status}`);
  }
}

export async function getMatchmakingStatus(): Promise<MatchmakingStatusResponse> {
  const res = await fetch(`${getGameServerOrigin()}/v1/play/matchmaking/status`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to get matchmaking status: ${res.status}`);
  }

  return res.json() as Promise<MatchmakingStatusResponse>;
}
