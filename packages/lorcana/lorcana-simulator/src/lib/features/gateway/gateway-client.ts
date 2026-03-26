/**
 * WebSocket gateway client.
 *
 * Manages connection lifecycle, keepalive ping/pong,
 * latency tracking, and automatic reconnection.
 *
 * Framework-agnostic — reactive state is handled by the
 * Svelte wrapper (gateway-client.svelte.ts).
 */

export type ConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected"
  | "reconnecting";

export interface GatewayClientState {
  status: ConnectionStatus;
  authenticated: boolean;
  connectionId: string | null;
  latencyMs: number | null;
  lastPongTime: string | null;
  reconnectAttempts: number;
  error: string | null;
  /** Number of clients currently connected to the gateway. */
  onlineCount: number;
}

export interface GatewayClientOptions {
  /** WebSocket URL, e.g. ws://localhost:3001/v1/gateway/ws */
  url: string;
  /** Optional short-lived ticket for authentication (appended as ?ticket=<id>). */
  ticket?: string;
  /** Ping interval in ms. Default: 30_000 */
  pingIntervalMs?: number;
  /** Max reconnect attempts before giving up. Default: Infinity */
  maxReconnectAttempts?: number;
  /** Callback fired on every state change. */
  onStateChange?: (state: Readonly<GatewayClientState>) => void;
  /** Callback fired for game messages not handled internally (game_joined, state_update, etc.). */
  onGameMessage?: (msg: { type: string; [key: string]: unknown }) => void;
  /** Called when the WebSocket reaches OPEN (each connect / reconnect). */
  onOpen?: () => void;
}

const INITIAL_RECONNECT_DELAY_MS = 1_000;
const MAX_RECONNECT_DELAY_MS = 30_000;
const DEFAULT_PING_INTERVAL_MS = 30_000;

export class GatewayClient {
  private ws: WebSocket | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private intentionalClose = false;
  private readonly options: Required<
    Omit<GatewayClientOptions, "ticket" | "onGameMessage" | "onOpen">
  > &
    Pick<GatewayClientOptions, "ticket" | "onGameMessage" | "onOpen">;

  private _state: GatewayClientState = {
    status: "idle",
    authenticated: false,
    connectionId: null,
    latencyMs: null,
    lastPongTime: null,
    reconnectAttempts: 0,
    error: null,
    onlineCount: 0,
  };

  constructor(options: GatewayClientOptions) {
    this.options = {
      ticket: undefined,
      pingIntervalMs: DEFAULT_PING_INTERVAL_MS,
      maxReconnectAttempts: Number.POSITIVE_INFINITY,
      onStateChange: () => {},
      onGameMessage: undefined,
      onOpen: undefined,
      ...options,
    };
  }

  get state(): Readonly<GatewayClientState> {
    return this._state;
  }

  /** Send a JSON message over the WebSocket. */
  send(message: object): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  /** Open the WebSocket connection. */
  connect(): void {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }
    this.intentionalClose = false;
    this.updateState({ status: "connecting", error: null });
    this.createSocket();
  }

  /** Close the connection. Does not auto-reconnect. */
  disconnect(): void {
    this.intentionalClose = true;
    this.clearTimers();
    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }
    this.updateState({ status: "disconnected", reconnectAttempts: 0 });
  }

  /** Tear down completely (call on component unmount). */
  destroy(): void {
    this.disconnect();
    this.updateState({ status: "idle" });
  }

  // ─── Private ──────────────────────────────────────────────

  private createSocket(): void {
    // Clear any pending reconnect to prevent concurrent socket creation
    this.clearTimers();

    // Drop prior handshake identity until the next welcome (avoids stale Auth UI on reconnect)
    this.updateState({
      authenticated: false,
      connectionId: null,
      latencyMs: null,
      lastPongTime: null,
    });

    // Append ticket as query parameter for authentication
    let wsUrl = this.options.url;
    if (this.options.ticket) {
      const separator = wsUrl.includes("?") ? "&" : "?";
      wsUrl = `${wsUrl}${separator}ticket=${encodeURIComponent(this.options.ticket)}`;
    }
    const ws = new WebSocket(wsUrl);

    ws.addEventListener("open", () => {
      this.updateState({ status: "connected", reconnectAttempts: 0, error: null });
      this.startPingLoop();
      this.options.onOpen?.();
    });

    ws.addEventListener("message", (event) => {
      this.handleMessage(event.data as string);
    });

    ws.addEventListener("close", () => {
      this.ws = null;
      this.clearPingTimer();
      if (!this.intentionalClose) {
        this.scheduleReconnect();
      }
    });

    ws.addEventListener("error", () => {
      this.updateState({ error: "Connection error" });
    });

    this.ws = ws;
  }

  private handleMessage(raw: string): void {
    let msg: { type: string; [key: string]: unknown };
    try {
      msg = JSON.parse(raw) as { type: string };
    } catch {
      return;
    }

    switch (msg.type) {
      case "welcome": {
        this.updateState({
          authenticated: msg.authenticated as boolean,
          connectionId: msg.connectionId as string,
          onlineCount: 0, // We don't want to expose the actual online count to the client
        });
        break;
      }
      case "stats_update": {
        this.updateState({
          onlineCount: 0, // We don't want to expose the actual online count to the client
        });
        break;
      }
      case "pong": {
        const serverTime = msg.serverTime as string;
        const clientT = msg.t as number | undefined;
        const latencyMs = clientT != null ? Date.now() - clientT : null;
        this.updateState({ latencyMs, lastPongTime: serverTime });
        break;
      }
      case "gateway_error": {
        this.updateState({ error: `${msg.code}: ${msg.message}` });
        break;
      }
      default: {
        this.options.onGameMessage?.(msg);
        break;
      }
    }
  }

  private startPingLoop(): void {
    this.clearPingTimer();
    // Send first ping immediately to get initial latency
    this.sendPing();
    this.pingTimer = setInterval(() => this.sendPing(), this.options.pingIntervalMs);
  }

  private sendPing(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: "ping", t: Date.now() }));
    }
  }

  private scheduleReconnect(): void {
    const attempts = this._state.reconnectAttempts;
    if (attempts >= this.options.maxReconnectAttempts) {
      this.updateState({ status: "disconnected", error: "Max reconnect attempts reached" });
      return;
    }

    // Cap exponent to avoid exceeding Number.MAX_SAFE_INTEGER
    const delay = Math.min(
      INITIAL_RECONNECT_DELAY_MS * 2 ** Math.min(attempts, 30),
      MAX_RECONNECT_DELAY_MS,
    );
    this.updateState({ status: "reconnecting", reconnectAttempts: attempts + 1 });

    this.reconnectTimer = setTimeout(() => {
      this.createSocket();
    }, delay);
  }

  private clearPingTimer(): void {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private clearTimers(): void {
    this.clearPingTimer();
    if (this.reconnectTimer !== null) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private updateState(patch: Partial<GatewayClientState>): void {
    this._state = { ...this._state, ...patch };
    this.options.onStateChange(this._state);
  }
}
