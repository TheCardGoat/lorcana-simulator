import type { MatchChatController } from "@/features/match-chat/match-chat-controller.svelte.js";
import type { OpponentPresenceTracker } from "@/features/gateway/opponent-presence.svelte.js";
import type { OpponentAfkTracker } from "@/features/gateway/opponent-afk.svelte.js";
import type { ChatMessage } from "@tcg/shared";

export interface RecentHistory {
  acceptedMoves: Array<{
    actorId: string;
    moveId: string;
    stateVersion: number;
    timestamp: number;
    turnNumber: number;
    input?: unknown;
  }>;
  engineLogs: Array<{
    stateVersion: number;
    log: unknown;
  }>;
}

export interface LiveMovePayload {
  acceptedMove: RecentHistory["acceptedMoves"][number] | undefined;
  engineLogs: RecentHistory["engineLogs"] | undefined;
  /** Full post-move state snapshot */
  state?: unknown;
  /** JSON patches — provided in state_update */
  patches?: unknown[];
  /** Card instance mapping — provided in state_update for client-authority games */
  cardsMaps?: unknown;
}

export interface ProposalPayload {
  gameId: string;
  matchId: string;
  actionType: string;
  senderPlayerId: string;
  deadline: number;
}

export interface ProposalResolvedPayload {
  gameId: string;
  matchId: string;
  actionType: string;
  resolution: "accepted" | "declined" | "failed";
}

export interface MessageRouterRefs {
  gameId: string;
  getChatController: () => MatchChatController | null;
  getPresenceTracker?: () => OpponentPresenceTracker | null;
  getAfkTracker?: () => OpponentAfkTracker | null;
  /** Filter function for presence_change and player_activity — return true to handle the event. */
  presenceFilter?: (playerId: string) => boolean;
  onError: (msg: Record<string, unknown>) => void;
  onRecentHistory: (history: RecentHistory & { gameId: string }) => void;
  /**
   * Called for move_accepted and state_update with a parsed payload.
   * Includes a constructed `acceptedMove` built from the packet fields.
   * When provided, these message types are NOT forwarded to onUnhandled.
   */
  onLiveMove?: (payload: LiveMovePayload) => void;
  /** Called when the opponent sends a bilateral consent proposal (e.g. undo). */
  onProposalReceived?: (proposal: ProposalPayload) => void;
  /** Called when a pending proposal is accepted, declined, or failed. */
  onProposalResolved?: (proposal: ProposalResolvedPayload) => void;
  /** Called for messages not handled by the router. */
  onUnhandled?: (msg: Record<string, unknown>) => void;
}

/**
 * Construct an acceptedMove entry from raw WS packet fields.
 *
 * - For move_accepted: pass actorId from msg.actorId directly.
 * - For state_update: actorId is absent at the top level — callers should
 *   extract it from engineLogs (log.playerId where log.type === moveType).
 * - turnNumber: if any engineLog has type "turnStart", the move occurred on
 *   the previous turn (turnStart.turn - 1); otherwise use state.ctx.status.turn.
 */
export function buildAcceptedMove(
  actorId: string | undefined,
  moveType: string | undefined,
  stateVersion: number | undefined,
  engineLogs: RecentHistory["engineLogs"] | undefined,
  state: unknown,
): RecentHistory["acceptedMoves"][number] | undefined {
  if (!actorId || !moveType || stateVersion === undefined) return undefined;
  const timestamp =
    (engineLogs?.[0] as { timestamp?: number } | undefined)?.timestamp ?? Date.now();
  const turnStartLog = engineLogs?.find(
    (e) => (e.log as { type?: string } | null)?.type === "turnStart",
  );
  const turnNumber = turnStartLog
    ? (turnStartLog.log as { turn: number }).turn - 1
    : ((state as { ctx?: { status?: { turn?: number } } } | null)?.ctx?.status?.turn ?? 1);
  return { actorId, moveId: moveType, stateVersion, timestamp, turnNumber };
}

const ERROR_TYPES = new Set(["game_error", "error", "gateway_error"]);

export function createMessageRouter(
  refs: MessageRouterRefs,
): (msg: Record<string, unknown>) => void {
  return (msg) => {
    if (ERROR_TYPES.has(msg.type as string)) {
      const gid = typeof msg.gameId === "string" ? msg.gameId : undefined;
      if (gid && gid !== refs.gameId) return;
      refs.onError(msg);
      return;
    }

    if (msg.type === "game_recent_history") {
      const history = msg as { gameId: string; acceptedMoves: unknown[]; engineLogs: unknown[] };
      if (history.gameId !== refs.gameId) return;
      refs.onRecentHistory(history as RecentHistory & { gameId: string });
      return;
    }

    if (msg.type === "move_accepted" && refs.onLiveMove) {
      const engineLogs = Array.isArray(msg.engineLogs)
        ? (msg.engineLogs as RecentHistory["engineLogs"])
        : undefined;
      const acceptedMove = buildAcceptedMove(
        typeof msg.actorId === "string" ? msg.actorId : undefined,
        typeof msg.moveType === "string" ? msg.moveType : undefined,
        typeof msg.stateVersion === "number" ? msg.stateVersion : undefined,
        engineLogs,
        msg.state,
      );
      refs.onLiveMove({ acceptedMove, engineLogs, state: msg.state });
      return;
    }

    if (msg.type === "state_update" && refs.onLiveMove) {
      const engineLogs = Array.isArray(msg.engineLogs)
        ? (msg.engineLogs as RecentHistory["engineLogs"])
        : undefined;
      const moveType = typeof msg.moveType === "string" ? msg.moveType : undefined;
      // state_update has no top-level actorId — extract from the matching engineLog.
      // Engine log types don't always match the WS moveType (e.g. "inkCard" vs
      // "putCardIntoInkwell"), so fall back to the first log that carries a playerId.
      const moveLog = engineLogs?.find(
        (e) => (e.log as { type?: string } | null)?.type === moveType,
      );
      const actorId = (() => {
        const fromMatch = (moveLog?.log as { playerId?: string } | null)?.playerId;
        if (typeof fromMatch === "string") return fromMatch;
        for (const entry of engineLogs ?? []) {
          const pid = (entry.log as { playerId?: string } | null)?.playerId;
          if (typeof pid === "string") return pid;
        }
        return undefined;
      })();
      const acceptedMove = buildAcceptedMove(
        actorId,
        moveType,
        typeof msg.stateVersion === "number" ? msg.stateVersion : undefined,
        engineLogs,
        msg.state,
      );
      refs.onLiveMove({
        acceptedMove,
        engineLogs,
        state: msg.state,
        patches: Array.isArray(msg.patches) ? msg.patches : undefined,
        cardsMaps: msg.cardsMaps && typeof msg.cardsMaps === "object" ? msg.cardsMaps : undefined,
      });
      return;
    }

    if (msg.type === "game_chat_history") {
      const chat = refs.getChatController();
      if (chat) {
        chat.hydrateHistory(
          String(msg.matchId ?? ""),
          Array.isArray(msg.messages) ? (msg.messages as ChatMessage[]) : [],
          { freeTextEnabled: msg.freeTextEnabled === true },
        );
      }
      return;
    }

    if (msg.type === "chat_message") {
      const chat = refs.getChatController();
      if (chat && msg.message) {
        chat.receiveMessage(String(msg.matchId ?? ""), msg.message as ChatMessage);
      }
      return;
    }

    if (msg.type === "presence_change") {
      const pid = String(msg.playerId ?? "");
      if (!pid) return;
      const shouldHandle = refs.presenceFilter ? refs.presenceFilter(pid) : true;
      if (shouldHandle) {
        refs
          .getPresenceTracker?.()
          ?.handlePresenceChange(
            msg.status as "connected" | "disconnected",
            msg.disconnectedAt as string | undefined,
          );
      }
      return;
    }

    if (msg.type === "player_activity") {
      const pid = String(msg.playerId ?? "");
      if (!pid) return;
      const shouldHandle = refs.presenceFilter ? refs.presenceFilter(pid) : true;
      if (shouldHandle) {
        refs.getAfkTracker?.()?.handleActivityUpdate({
          isAfk: Boolean(msg.isAfk),
          idle: Boolean(msg.idle),
          tabVisible: msg.tabVisible !== false,
        });
      }
      return;
    }

    if (msg.type === "proposal_received" && refs.onProposalReceived) {
      const gid = typeof msg.gameId === "string" ? msg.gameId : undefined;
      if (gid && gid !== refs.gameId) return;
      refs.onProposalReceived({
        gameId: String(msg.gameId ?? ""),
        matchId: String(msg.matchId ?? ""),
        actionType: String(msg.actionType ?? ""),
        senderPlayerId: String(msg.senderPlayerId ?? ""),
        deadline: typeof msg.deadline === "number" ? msg.deadline : 0,
      });
      return;
    }

    if (
      (msg.type === "proposal_resolved" || msg.type === "proposal_expired") &&
      refs.onProposalResolved
    ) {
      const gid = typeof msg.gameId === "string" ? msg.gameId : undefined;
      if (gid && gid !== refs.gameId) return;
      refs.onProposalResolved({
        gameId: String(msg.gameId ?? ""),
        matchId: String(msg.matchId ?? ""),
        actionType: String(msg.actionType ?? ""),
        resolution:
          msg.type === "proposal_expired"
            ? "declined"
            : ((msg.resolution as "accepted" | "declined" | "failed") ?? "failed"),
      });
      return;
    }

    if (msg.type === "timeout_notification") {
      // Clock timeout state is derived client-side from the projected ClockSnapshot
      // plus the shared reactive `now` tick (see clock-ticker.svelte.ts and
      // deriveClockView in @tcg/lorcana-engine). The server-pushed notification
      // is redundant for UI affordances and is intentionally ignored here.
      return;
    }

    refs.onUnhandled?.(msg);
  };
}
