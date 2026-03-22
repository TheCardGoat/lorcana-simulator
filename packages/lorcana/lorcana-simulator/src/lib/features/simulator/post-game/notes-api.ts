import { getApiOrigin } from "$lib/config/public-url-config.js";

export interface PostGameServerSummary {
  kind: "placeholder";
  message: string;
  generatedAt: string | null;
}

export interface PostGameRecordEnvelope {
  gameId: string;
  matchId: string | null;
  note: string;
  serverSummary: PostGameServerSummary;
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

function isPostGameServerSummary(value: unknown): value is PostGameServerSummary {
  return (
    isRecord(value) &&
    value.kind === "placeholder" &&
    typeof value.message === "string" &&
    (typeof value.generatedAt === "string" || value.generatedAt === null)
  );
}

function parsePostGameRecordEnvelope(payload: unknown): PostGameRecordEnvelope {
  if (
    !isRecord(payload) ||
    typeof payload.gameId !== "string" ||
    (typeof payload.matchId !== "string" && payload.matchId !== null) ||
    typeof payload.note !== "string" ||
    !isPostGameServerSummary(payload.serverSummary)
  ) {
    throw new Error("Received an invalid post-game record payload from the API.");
  }

  return {
    gameId: payload.gameId,
    matchId: payload.matchId,
    note: payload.note,
    serverSummary: payload.serverSummary,
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
