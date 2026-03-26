/**
 * Svelte 5 reactive wrapper for GatewayClient.
 *
 * Provides $state-powered reactivity for connection status,
 * latency, and authentication. Manages lifecycle automatically.
 */

import { GatewayClient } from "./gateway-client";
import type { ConnectionStatus, GatewayClientState } from "./gateway-client";

export type { ConnectionStatus, GatewayClientState };

export class GatewayClientStore {
  status: ConnectionStatus = $state("idle");
  authenticated: boolean = $state(false);
  connectionId: string | null = $state(null);
  latencyMs: number | null = $state(null);
  lastPongTime: string | null = $state(null);
  reconnectAttempts: number = $state(0);
  error: string | null = $state(null);
  onlineCount: number = $state(0);

  private client: GatewayClient;

  constructor(
    url: string,
    ticket?: string,
    onGameMessage?: (msg: { type: string; [key: string]: unknown }) => void,
    onOpen?: () => void,
  ) {
    this.client = new GatewayClient({
      url,
      ticket,
      onStateChange: (state) => this.sync(state),
      onGameMessage,
      onOpen,
    });
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
  }

  private sync(state: Readonly<GatewayClientState>): void {
    this.status = state.status;
    this.authenticated = state.authenticated;
    this.connectionId = state.connectionId;
    this.latencyMs = state.latencyMs;
    this.lastPongTime = state.lastPongTime;
    this.reconnectAttempts = state.reconnectAttempts;
    this.error = state.error;
    this.onlineCount = state.onlineCount;
  }
}
