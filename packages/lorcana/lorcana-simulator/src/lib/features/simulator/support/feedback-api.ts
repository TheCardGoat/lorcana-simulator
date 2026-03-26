import { getApiOrigin } from "$lib/config/public-url-config.js";

// TODO: Keep this type in sync with apps/api/src/db/schema/feedback/bug-reports.ts
// This type should eventually be moved to a shared location or generated from OpenAPI.
export interface BugReportContext {
  gameId?: string;
  playerCount?: number;
  turn?: number;
}

/** Minimal projected-board fields used to build bug-report context (matches engine board view). */
export type BugReportBoardSnapshot = {
  gameID: string;
  playerOrder: readonly unknown[];
  turnNumber: number;
};

export function bugReportContextFromBoard(
  board: BugReportBoardSnapshot | null | undefined,
): BugReportContext | undefined {
  if (!board) return undefined;
  return {
    gameId: board.gameID,
    playerCount: board.playerOrder.length,
    turn: board.turnNumber,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseErrorMessage(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  if ("error" in payload && isRecord(payload.error) && typeof payload.error.message === "string") {
    return payload.error.message;
  }

  if (typeof payload.message === "string") return payload.message;

  return null;
}

export async function submitFeedback(params: { message: string; source?: string }): Promise<void> {
  const response = await fetch(`${getApiOrigin()}/v1/feedback`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: params.message, source: params.source }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      parseErrorMessage(payload) ?? `Failed to submit feedback (${response.status}).`,
    );
  }
}

export async function submitBugReport(params: {
  description: string;
  source?: string;
  context?: BugReportContext;
}): Promise<void> {
  const response = await fetch(`${getApiOrigin()}/v1/feedback/bug-reports`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: params.description,
      source: params.source,
      context: params.context,
    }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(
      parseErrorMessage(payload) ?? `Failed to submit bug report (${response.status}).`,
    );
  }
}
