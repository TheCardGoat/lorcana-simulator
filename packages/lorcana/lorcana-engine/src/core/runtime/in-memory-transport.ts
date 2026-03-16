import type { Transport, ClientMessage, ServerMessage, ConnectionState } from "./protocol-types";
import { getLogger } from "@logtape/logtape";
const logger = getLogger(["core-engine", "in-memory-transport"]);

// =============================================================================
// In-Memory Transport
// =============================================================================

export interface InMemoryTransportPair {
  identifier?: string;
  client: InMemoryTransport;
  server: InMemoryTransport;
}

export class InMemoryTransport implements Transport {
  private state: ConnectionState = "DISCONNECTED";
  private pairedTransport: InMemoryTransport | null = null;

  private messageHandler: ((message: ServerMessage) => void) | null = null;
  private disconnectHandler: ((reason: string) => void) | null = null;
  private errorHandler: ((error: Error) => void) | null = null;

  /**
   * Pair this transport with another for bidirectional communication.
   */
  pairWith(other: InMemoryTransport): void {
    this.pairedTransport = other;
    other.pairedTransport = this;
  }

  async connect(): Promise<void> {
    this.state = "CONNECTED";
  }

  async disconnect(skipLog: boolean = true): Promise<void> {
    this.state = "DISCONNECTED";
    this.pairedTransport?.disconnectHandler?.("Remote disconnected");

    if (!skipLog) {
      logger.info("InMemoryTransport Disconnected!");
    }
  }

  send(message: ClientMessage): void {
    if (this.state !== "CONNECTED") {
      this.errorHandler?.(new Error("Not connected"));
      return;
    }

    // Synchronous: call paired transport's handler directly
    this.pairedTransport?.messageHandler?.(message as unknown as ServerMessage);
  }

  onMessage(handler: (message: ServerMessage) => void): void {
    this.messageHandler = handler;
  }

  onDisconnect(handler: (reason: string) => void): void {
    this.disconnectHandler = handler;
  }

  onError(handler: (error: Error) => void): void {
    this.errorHandler = handler;
  }

  getState(): ConnectionState {
    return this.state;
  }

  // =============================================================================
  // Test Utilities
  // =============================================================================

  /**
   * Simulate receiving a message from the remote side.
   * Routes the message to the paired transport's handler.
   * Synchronous - handler is called immediately.
   */
  simulateReceive(message: ServerMessage): void {
    // When called on the server transport, deliver to the paired client transport
    this.pairedTransport?.messageHandler?.(message);
  }

  /**
   * Simulate a disconnect.
   */
  simulateDisconnect(reason: string): void {
    this.state = "DISCONNECTED";
    this.disconnectHandler?.(reason);
  }

  /**
   * Simulate an error.
   */
  simulateError(error: Error): void {
    this.state = "ERROR";
    this.errorHandler?.(error);
  }
}

// =============================================================================
// Transport Pair Factory
// =============================================================================

/**
 * Create a pair of connected in-memory transports.
 * Both transports are immediately set to CONNECTED state.
 */
export function createInMemoryTransportPair(): InMemoryTransportPair {
  const client = new InMemoryTransport();
  const server = new InMemoryTransport();
  client.pairWith(server);

  // Set both to connected immediately since this is for testing
  client.connect();
  server.connect();

  return { client, server };
}
