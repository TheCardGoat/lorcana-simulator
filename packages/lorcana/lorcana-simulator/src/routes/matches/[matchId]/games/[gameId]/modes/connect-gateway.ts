import {
  GatewayClientStore,
  createGatewayStore,
} from "@/features/gateway/gateway-client.svelte.js";
import { fetchGatewayTicket, type GatewayTicketResult } from "@/features/gateway/fetch-ticket.js";
import {
  fetchQuickMatchTicket,
  type QuickMatchTicketResult,
} from "@/features/matchmaking/api/quick-match-ticket-api.js";
import { authSession } from "$lib/auth/session.svelte.js";
import { trackEvent } from "$lib/analytics/analytics.js";
import { getGatewayWsUrl } from "$lib/config/public-url-config.js";

const JOIN_TIMEOUT_MS = 10_000;
const GATEWAY_WS_URL = getGatewayWsUrl();

export { fetchQuickMatchTicket, type QuickMatchTicketResult };

export interface AcquiredTicket {
  ticket: string | null;
  authToken: string | null;
  error: string | null;
}

export async function acquirePlayerTicket(params: {
  wsTicket?: string;
  fetchQuickMatchTicket?: () => Promise<QuickMatchTicketResult | null>;
}): Promise<AcquiredTicket> {
  const { wsTicket, fetchQuickMatchTicket } = params;
  if (wsTicket && fetchQuickMatchTicket) {
    const result = await fetchQuickMatchTicket();
    if (!result)
      return { ticket: null, authToken: null, error: "Failed to authenticate for this match." };
    return { ticket: result.ticket, authToken: result.authToken, error: null };
  }
  if (authSession.isAuthenticated) {
    const result = await fetchGatewayTicket();
    if (result) {
      return { ticket: result.ticket, authToken: result.authToken, error: null };
    }
    return { ticket: null, authToken: null, error: null };
  }
  return {
    ticket: null,
    authToken: null,
    error: "Authentication required. Please sign in and try again.",
  };
}

export async function connectAndJoin(params: {
  ticket: string | null;
  authToken?: string | null;
  gameId: string;
  role: "player" | "spectator";
  matchType?: string;
  /** Auth account id when known — optional echo on `join_game` for correlation. */
  userId?: string;
  /** This seat's game profile id when known — optional echo on `join_game`. */
  gameProfileId?: string;
  onMessage: (msg: Record<string, unknown>) => void;
}): Promise<{
  gateway: GatewayClientStore;
  joinedMsg: Record<string, unknown> | null;
  pendingMessages: Record<string, unknown>[];
  error: string | null;
}> {
  const { ticket, authToken, gameId, role, matchType, userId, gameProfileId, onMessage } = params;

  let resolveJoined!: (msg: Record<string, unknown>) => void;
  const joinedPromise = new Promise<Record<string, unknown>>((resolve) => {
    resolveJoined = resolve;
  });

  const pendingMessages: Record<string, unknown>[] = [];
  let joined = false;

  const ERROR_TYPES = new Set(["game_error", "error", "gateway_error"]);

  const gateway = createGatewayStore(
    GATEWAY_WS_URL,
    ticket ?? undefined,
    (msg) => {
      if (msg.type === "game_joined") {
        joined = true;
        resolveJoined(msg as Record<string, unknown>);
        return;
      }
      if (!joined) {
        // Forward pre-join errors immediately so the UI can surface them;
        // buffer everything else until game_joined arrives.
        if (ERROR_TYPES.has(msg.type as string)) {
          onMessage(msg as Record<string, unknown>);
        } else {
          pendingMessages.push(msg as Record<string, unknown>);
        }
        return;
      }
      onMessage(msg as Record<string, unknown>);
    },
    undefined,
    authToken ?? undefined,
    () => authSession.session?.token,
  );

  gateway.connect();

  const connected = await new Promise<boolean>((resolve) => {
    const interval = setInterval(() => {
      if (gateway.connectionId) {
        clearInterval(interval);
        resolve(true);
      }
    }, 50);
    setTimeout(() => {
      clearInterval(interval);
      resolve(!!gateway.connectionId);
    }, JOIN_TIMEOUT_MS);
  });

  if (!connected) {
    gateway.destroy();
    return {
      gateway,
      joinedMsg: null,
      pendingMessages,
      error: "Failed to connect to game server.",
    };
  }

  gateway.send({
    type: "join_game",
    gameId,
    role,
    ...(gameProfileId ? { gameProfileId } : {}),
    ...(userId ? { userId } : {}),
  });
  trackEvent("game_join", {
    mode: role === "spectator" ? "spectator" : matchType === "ranked" ? "ranked" : "practice",
  });

  const joinedMsg = await Promise.race([
    joinedPromise,
    new Promise<null>((resolve) => setTimeout(() => resolve(null), JOIN_TIMEOUT_MS)),
  ]);

  if (!joinedMsg) {
    return { gateway, joinedMsg: null, pendingMessages, error: "Timeout waiting to join game." };
  }

  return { gateway, joinedMsg, pendingMessages, error: null };
}
