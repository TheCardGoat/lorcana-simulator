import { getGameServerOrigin } from "$lib/config/public-url-config.js";

export interface LiveMatchPlayer {
  id: string;
  displayName: string;
}

export interface LiveMatchEntry {
  matchId: string;
  currentGameId: string | undefined;
  player1: LiveMatchPlayer;
  player2: LiveMatchPlayer;
  player1Score: number;
  player2Score: number;
  player1Inks: string[];
  player2Inks: string[];
  turnNumber: number;
  format: "best_of_1" | "best_of_3";
  matchType: string;
  createdAt: string;
  spectatorCount: number;
}

export interface LiveMatchListResponse {
  object: "live_match_list";
  matches: LiveMatchEntry[];
  total: number;
}

export async function fetchLiveMatches(limit = 25): Promise<LiveMatchListResponse> {
  const url = new URL(`${getGameServerOrigin()}/v1/play/matches/live`);
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), {
    credentials: "include",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable body)");
    throw new Error(`Failed to fetch live matches: ${res.status} — ${body}`);
  }

  return res.json() as Promise<LiveMatchListResponse>;
}
