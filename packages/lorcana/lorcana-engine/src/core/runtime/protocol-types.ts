import type {
  CommandEnvelope,
  GameLogEntry,
  PacketAnimation,
  PublishedGameEvent,
  Role,
} from "./types";
import type { NetworkMatchData } from "./network-state";

// =============================================================================
// Protocol Version
// =============================================================================

export const PROTOCOL_VERSION = 3;

// =============================================================================
// Common Envelope
// =============================================================================

export interface ProtocolEnvelope {
  protocolVersion: number;
  matchID: string;
  role?: Role;
  playerID?: string | null;
  credentials?: string;
  timestampMs?: number;
}

// =============================================================================
// Client -> Server Messages
// =============================================================================

export type ClientMessage = UpdateActionMessage | SyncRequestMessage | AckMessage | ChatMessage;

export interface UpdateActionMessage extends ProtocolEnvelope {
  type: "UPDATE_ACTION";
  prevStateID: number;
  command: CommandEnvelope;
}

export interface SyncRequestMessage extends ProtocolEnvelope {
  type: "SYNC_REQUEST";
  lastKnownStateID?: number;
  lastKnownLogSeq?: number;
}

export interface AckMessage extends ProtocolEnvelope {
  type: "ACK";
  acknowledgedStateID: number;
}

export interface ChatMessage extends ProtocolEnvelope {
  type: "CHAT";
  message: string;
}

// =============================================================================
// Server -> Client Messages
// =============================================================================

export type ServerMessage<TState = unknown, TBoard = unknown> =
  | UpdatePatchMessage
  | UpdateFullMessage<TState, TBoard>
  | SyncFullMessage<TState, TBoard>
  | MatchDataMessage
  | ErrorMessage
  | ChatMessage;

export interface UpdatePatchMessage extends ProtocolEnvelope {
  type: "UPDATE_PATCH";
  prevStateID: number;
  stateID: number;
  patchFormat: "immer" | "rfc6902";
  patchOps: unknown[];
  processedCommand: CommandEnvelope;
  animations: PacketAnimation[];
  deltalogDelta?: unknown[];
  gameEventsDelta?: PublishedGameEvent[];
  logEntriesDelta?: GameLogEntry[];
}

export interface UpdateFullMessage<TState = unknown, TBoard = unknown> extends ProtocolEnvelope {
  type: "UPDATE_FULL";
  stateID: number;
  state: TState;
  board?: TBoard;
  processedCommand: CommandEnvelope;
  animations: PacketAnimation[];
  deltalogDelta?: unknown[];
  gameEventsDelta?: PublishedGameEvent[];
  logEntriesDelta?: GameLogEntry[];
  reason?: "PATCH_DISABLED" | "FILTERING_FALLBACK" | "STALE_STATE";
}

export interface SyncFullMessage<TState = unknown, TBoard = unknown> extends ProtocolEnvelope {
  type: "SYNC_FULL";
  stateID: number;
  state: TState;
  board?: TBoard;
  deltalogDelta?: unknown[];
  gameEventsDelta?: PublishedGameEvent[];
  logEntriesDelta?: GameLogEntry[];
  matchData?: NetworkMatchData;
}

export interface MatchDataMessage extends ProtocolEnvelope {
  type: "MATCH_DATA";
  data: Record<string, unknown>;
}

export type ErrorCode =
  | "STALE_STATE"
  | "AUTH_FAILED"
  | "INVALID_MOVE"
  | "PATCH_APPLY_FAILED"
  | "FORBIDDEN"
  | "MATCH_NOT_FOUND"
  | "PLAYER_NOT_IN_MATCH"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR"
  | "UNKNOWN";

export interface ErrorMessage extends ProtocolEnvelope {
  type: "ERROR";
  code: ErrorCode;
  message: string;
  currentStateID?: number;
  resyncRequired?: boolean;
  details?: Record<string, unknown>;
}

// =============================================================================
// Message Type Guards
// =============================================================================

export function isUpdateActionMessage(msg: unknown): msg is UpdateActionMessage {
  return (
    typeof msg === "object" && msg !== null && (msg as UpdateActionMessage).type === "UPDATE_ACTION"
  );
}

export function isSyncRequestMessage(msg: unknown): msg is SyncRequestMessage {
  return (
    typeof msg === "object" && msg !== null && (msg as SyncRequestMessage).type === "SYNC_REQUEST"
  );
}

export function isUpdatePatchMessage(msg: unknown): msg is UpdatePatchMessage {
  return (
    typeof msg === "object" && msg !== null && (msg as UpdatePatchMessage).type === "UPDATE_PATCH"
  );
}

export function isUpdateFullMessage<TState>(msg: unknown): msg is UpdateFullMessage<TState> {
  return (
    typeof msg === "object" &&
    msg !== null &&
    (msg as UpdateFullMessage<TState>).type === "UPDATE_FULL"
  );
}

export function isSyncFullMessage<TState>(msg: unknown): msg is SyncFullMessage<TState> {
  return (
    typeof msg === "object" && msg !== null && (msg as SyncFullMessage<TState>).type === "SYNC_FULL"
  );
}

export function isErrorMessage(msg: unknown): msg is ErrorMessage {
  return typeof msg === "object" && msg !== null && (msg as ErrorMessage).type === "ERROR";
}

// =============================================================================
// Connection State
// =============================================================================

export type ConnectionState =
  | "CONNECTING"
  | "CONNECTED"
  | "AUTHENTICATING"
  | "SYNCING"
  | "READY"
  | "DISCONNECTED"
  | "RECONNECTING"
  | "ERROR";

// =============================================================================
// Transport Interface
// =============================================================================

export interface Transport {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  send(message: ClientMessage): void;
  onMessage(handler: (message: ServerMessage) => void): void;
  onDisconnect(handler: (reason: string) => void): void;
  onError(handler: (error: Error) => void): void;
  getState(): ConnectionState;
}

// Re-export InMemoryTransport type for engine consumers
export type { InMemoryTransport, InMemoryTransportPair } from "./in-memory-transport";

// =============================================================================
// Validation
// =============================================================================

export interface ProtocolValidationResult {
  valid: boolean;
  error?: string;
  errorCode?: ErrorCode;
}

export function validateProtocolMessage(msg: unknown): ProtocolValidationResult {
  if (typeof msg !== "object" || msg === null) {
    return { valid: false, error: "Message must be an object", errorCode: "UNKNOWN" };
  }

  const typedMsg = msg as ProtocolEnvelope;

  if (typedMsg.protocolVersion !== PROTOCOL_VERSION) {
    return {
      valid: false,
      error: `Invalid protocol version: expected ${PROTOCOL_VERSION}, got ${typedMsg.protocolVersion}`,
      errorCode: "UNKNOWN",
    };
  }

  if (!typedMsg.matchID || typeof typedMsg.matchID !== "string") {
    return { valid: false, error: "Missing or invalid matchID", errorCode: "UNKNOWN" };
  }

  return { valid: true };
}
