import { getApiOrigin } from "$lib/config/public-url-config.js";
import type {
  AcceptedMoveRecord,
  EngineLogRecord,
  LorcanaProjectedBoardView,
} from "@tcg/lorcana-engine";

export interface PostGamePlayerIdentity {
  id: string;
  side: "playerOne" | "playerTwo";
  displayName: string | null;
  username: string | null;
  mmr: number | null;
}

export interface PostGameCanonicalData {
  source: "redis" | "persisted_replay";
  gameId: string;
  matchId: string;
  status: "completed" | "abandoned";
  winnerId: string | null;
  reason: string | null;
  createdAt: string;
  completedAt: string;
  durationMs: number;
  authority: "server" | "client" | null;
  matchType: "ranked" | "casual" | "practice_vs_bot" | null;
  players: [PostGamePlayerIdentity, PostGamePlayerIdentity];
  board: LorcanaProjectedBoardView;
  acceptedMoves: AcceptedMoveRecord[];
  engineLogs: EngineLogRecord[];
}

export interface PostGameRecordEnvelope {
  gameId: string;
  matchId: string | null;
  note: string;
  postGame: PostGameCanonicalData | null;
}

export interface SavePostGameNoteParams {
  gameId: string;
  note: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseErrorMessage(payload: unknown): string | null {
  if (!isRecord(payload)) {
    return null;
  }

  if ("error" in payload && isRecord(payload.error) && typeof payload.error.message === "string") {
    return payload.error.message;
  }

  if (typeof payload.message === "string") {
    return payload.message;
  }

  return null;
}

function isPostGamePlayerIdentity(value: unknown): value is PostGamePlayerIdentity {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    (value.side === "playerOne" || value.side === "playerTwo") &&
    (typeof value.displayName === "string" || value.displayName === null) &&
    (typeof value.username === "string" || value.username === null) &&
    (typeof value.mmr === "number" || value.mmr === null)
  );
}

function isPostGameCanonicalData(value: unknown): value is PostGameCanonicalData {
  return (
    isRecord(value) &&
    (value.source === "redis" || value.source === "persisted_replay") &&
    typeof value.gameId === "string" &&
    typeof value.matchId === "string" &&
    (value.status === "completed" || value.status === "abandoned") &&
    (typeof value.winnerId === "string" || value.winnerId === null) &&
    (typeof value.reason === "string" || value.reason === null) &&
    typeof value.createdAt === "string" &&
    typeof value.completedAt === "string" &&
    typeof value.durationMs === "number" &&
    (value.authority === "server" || value.authority === "client" || value.authority === null) &&
    (value.matchType === "ranked" ||
      value.matchType === "casual" ||
      value.matchType === "practice_vs_bot" ||
      value.matchType === null) &&
    Array.isArray(value.players) &&
    value.players.length === 2 &&
    value.players.every(isPostGamePlayerIdentity) &&
    isRecord(value.board) &&
    Array.isArray(value.acceptedMoves) &&
    Array.isArray(value.engineLogs)
  );
}

function parsePostGameRecordEnvelope(payload: unknown): PostGameRecordEnvelope {
  if (
    !isRecord(payload) ||
    typeof payload.gameId !== "string" ||
    (typeof payload.matchId !== "string" && payload.matchId !== null) ||
    typeof payload.note !== "string" ||
    !(payload.postGame === null || isPostGameCanonicalData(payload.postGame))
  ) {
    throw new Error("Received an invalid post-game record payload from the API.");
  }

  return {
    gameId: payload.gameId,
    matchId: payload.matchId,
    note: payload.note,
    postGame: payload.postGame,
  };
}

export async function fetchPostGameRecord(gameId: string): Promise<PostGameRecordEnvelope> {
  const response = await fetch(`${getApiOrigin()}/v1/match-history/games/${gameId}/post-game`, {
    credentials: "include",
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      parseErrorMessage(payload) ?? `Failed to load post-game record (${response.status}).`,
    );
  }

  return parsePostGameRecordEnvelope(await response.json());
}

export async function savePostGameNote(
  params: SavePostGameNoteParams,
): Promise<PostGameRecordEnvelope> {
  const response = await fetch(`${getApiOrigin()}/v1/match-history/games/${params.gameId}/notes`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note: params.note }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(parseErrorMessage(payload) ?? `Failed to save notes (${response.status}).`);
  }

  return parsePostGameRecordEnvelope(await response.json());
}
