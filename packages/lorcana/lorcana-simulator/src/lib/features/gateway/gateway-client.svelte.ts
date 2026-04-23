/**
 *
 * Provides $state-powered reactivity for connection status,
 * latency, and authentication. Manages lifecycle automatically.
 */

import { GatewayClient } from "./gateway-client";
import type { ConnectionStatus, GatewayClientState } from "./gateway-client";
import { trackEvent } from "$lib/analytics/analytics.js";

export type { ConnectionStatus, GatewayClientState };

type GameMessage = { type: string; [key: string]: unknown };

export class GatewayClientStore {
  status: ConnectionStatus = $state("idle");
  authenticated: boolean = $state(false);
  connectionId: string | null = $state(null);
  latencyMs: number | null = $state(null);
  lastPongTime: string | null = $state(null);
  reconnectAttempts: number = $state(0);
  error: string | null = $state(null);
  /** True when the server announced shutdown (deploy) before the socket closed. */
  serverInitiatedClose: boolean = $state(false);

  private client: GatewayClient;
  #previousStatus: ConnectionStatus = "idle";
  #additionalListeners = new Set<(msg: GameMessage) => void>();

  constructor(
    url: string,
    ticket?: string,
    onGameMessage?: (msg: GameMessage) => void,
    onOpen?: () => void,
    token?: string,
    getToken?: () => string | undefined,
  ) {
    this.client = new GatewayClient({
      url,
      ticket,
      token,
      getToken,
      onStateChange: (state) => this.sync(state),
      onGameMessage: (msg) => {
        onGameMessage?.(msg);
        for (const listener of this.#additionalListeners) {
          listener(msg);
        }
      },
      onOpen,
    });
  }

  /**
   * Register an additional game message listener. Returns an unsubscribe function.
   * Used by GatewayTransport to receive state_update/move_rejected alongside
   * the primary onGameMessage callback.
   */
  addGameMessageListener(handler: (msg: GameMessage) => void): () => void {
    this.#additionalListeners.add(handler);
    return () => {
      this.#additionalListeners.delete(handler);
    };
  }

  /** Send a JSON message over the WebSocket. */
  send(message: object): void {
    this.client.send(message);
  }

  connect(): void {
    this.client.connect();
  }

  disconnect(): void {
    this.client.disconnect();
  }

  destroy(): void {
    this.client.destroy();
    if (_instance === this) _instance = null;
  }

  private sync(state: Readonly<GatewayClientState>): void {
    const prevStatus = this.#previousStatus;
    this.#previousStatus = state.status;

    // Track connection transitions
    if (state.status === "connected" && prevStatus !== "connected") {
      if (state.reconnectAttempts > 0) {
        trackEvent("ws_reconnect", { attempts: state.reconnectAttempts });
      } else {
        trackEvent("ws_connect");
      }
    } else if (state.status === "disconnected" && prevStatus === "connected") {
      trackEvent("ws_disconnect", { reason: state.error ? "connection_error" : "closed" });
    }

    this.status = state.status;
    this.authenticated = state.authenticated;
    this.connectionId = state.connectionId;
    this.latencyMs = state.latencyMs;
    this.lastPongTime = state.lastPongTime;
    this.reconnectAttempts = state.reconnectAttempts;
    this.error = state.error;
    this.serverInitiatedClose = state.serverInitiatedClose;
  }
}

// Module-level singleton — at most one active WS connection in the browser.
let _instance: GatewayClientStore | null = null;

/**
 * Create (or replace) the global GatewayClientStore singleton.
 * Any existing live connection is destroyed before the new one is opened.
 */
export function createGatewayStore(
  url: string,
  ticket?: string,
  onGameMessage?: (msg: GameMessage) => void,
  onOpen?: () => void,
  token?: string,
  getToken?: () => string | undefined,
): GatewayClientStore {
  if (_instance) {
    _instance.destroy();
    _instance = null;
  }
  _instance = new GatewayClientStore(url, ticket, onGameMessage, onOpen, token, getToken);
  return _instance;
}

/** Destroy the singleton and clear the reference (call from onDestroy). */
export function destroyGatewayStore(): void {
  _instance?.destroy();
  _instance = null;
}
