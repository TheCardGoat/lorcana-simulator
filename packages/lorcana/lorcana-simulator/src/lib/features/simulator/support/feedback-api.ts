import { getApiOrigin } from "$lib/config/public-url-config.js";
import { requestVoid } from "$lib/data/transport/http-client.js";

// TODO: Keep this type in sync with apps/api/src/db/schema/feedback/bug-reports.ts
// This type should eventually be moved to a shared location or generated from OpenAPI.
export interface BugReportContext {
  gameId?: string;
  playerCount?: number;
  turn?: number;
  platform?: "mobile" | "desktop";
}

/** Minimal projected-board fields used to build bug-report context (matches engine board view). */
export type BugReportBoardSnapshot = {
  gameID: string;
  playerOrder: readonly unknown[];
  turnNumber: number;
};

export function bugReportContextFromBoard(
  board: BugReportBoardSnapshot | null | undefined,
  options?: { platform?: "mobile" | "desktop" },
): BugReportContext | undefined {
  if (!board) return undefined;
  return {
    gameId: board.gameID,
    playerCount: board.playerOrder.length,
    turn: board.turnNumber,
    platform: options?.platform,
  };
}

export async function submitFeedback(params: { message: string; source?: string }): Promise<void> {
  await requestVoid(
    `${getApiOrigin()}/v1/feedback`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: params.message, source: params.source }),
    },
    "Failed to submit feedback",
  );
}

export async function submitBugReport(params: {
  description: string;
  source?: string;
  context?: BugReportContext;
}): Promise<void> {
  await requestVoid(
    `${getApiOrigin()}/v1/feedback/bug-reports`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: params.description,
        source: params.source,
        context: params.context,
      }),
    },
    "Failed to submit bug report",
  );
}

export const PLAYER_REPORT_REASONS = [
  "stalling",
  "abusive_chat",
  "exploit",
  "collusion",
  "inappropriate_name",
  "intentional_disconnect",
  "other",
] as const;

export type PlayerReportReason = (typeof PLAYER_REPORT_REASONS)[number];

export async function submitPlayerReport(params: {
  reportedGameProfileId: string;
  matchId?: string;
  gameId?: string;
  reason: PlayerReportReason;
  details?: string;
}): Promise<void> {
  await requestVoid(
    `${getApiOrigin()}/v1/moderation/player-reports`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportedGameProfileId: params.reportedGameProfileId,
        matchId: params.matchId,
        gameId: params.gameId,
        reason: params.reason,
        details: params.details,
      }),
    },
    "Failed to submit player report",
  );
}
