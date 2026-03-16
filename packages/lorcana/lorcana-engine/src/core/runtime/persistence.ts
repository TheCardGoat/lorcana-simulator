import type { CommandEnvelope, GameLogEntry, MatchState, PublishedGameEvent } from "./types";
import type { StaticResourceRefs } from "./static-resources";

// =============================================================================
// Persistence Types
// =============================================================================

export interface MatchConfig {
  matchID: string;
  maxPlayers: number;
  allowSpectators: boolean;
  spectatorPolicy: "public" | "private" | "judges-only";
}

export interface CommandLogEntry {
  commandID: string;
  playerID: string;
  command: CommandEnvelope;
  timestamp: number;
  stateID: number;
}

export interface MatchSnapshot {
  matchID: string;
  stateID: number;
  state: MatchState<unknown>;
  timestamp: number;
}

export interface MatchMetadata {
  matchID: string;
  createdAt: number;
  updatedAt: number;
  rulesetHash: string;
  config: MatchConfig;
  playerIDs: string[];
  status: "active" | "completed" | "abandoned";
  winner?: string;
  endReason?: string;
  resourceRefs?: StaticResourceRefs;
}

export interface MatchReplayData {
  matchID: string;
  metadata: MatchMetadata;
  initialState: MatchState<unknown>;
  commandLog: CommandLogEntry[];
  gameEvents: PublishedGameEvent[];
  gameLogEntries: GameLogEntry[];
  finalState?: MatchState<unknown>;
}

export interface ReplayExportOptions {
  role: "player" | "judge";
  playerID?: string;
  includePrivateData?: boolean;
  filterEvents?: (event: PublishedGameEvent) => boolean;
}

export interface AuditLogEntry {
  timestamp: number;
  matchID: string;
  eventType: string;
  playerID?: string;
  details: Record<string, unknown>;
}

// =============================================================================
// Persistence Interface
// =============================================================================

export interface PersistenceAdapter {
  // Snapshots
  saveSnapshot(snapshot: MatchSnapshot): Promise<void>;
  getLatestSnapshot(matchID: string): Promise<MatchSnapshot | null>;
  getSnapshotAtStateID(matchID: string, stateID: number): Promise<MatchSnapshot | null>;

  // Metadata
  saveMetadata(metadata: MatchMetadata): Promise<void>;
  getMetadata(matchID: string): Promise<MatchMetadata | null>;
  listMatches(filters?: MatchListFilters): Promise<MatchMetadata[]>;

  // Command Log
  appendCommand(matchID: string, entry: CommandLogEntry): Promise<void>;
  getCommandLog(matchID: string): Promise<CommandLogEntry[]>;

  // Game Events
  appendGameEvent(matchID: string, event: PublishedGameEvent): Promise<void>;
  getGameEvents(matchID: string): Promise<PublishedGameEvent[]>;
  appendGameLogEntry(matchID: string, entry: GameLogEntry): Promise<void>;
  getGameLogEntries(matchID: string): Promise<GameLogEntry[]>;

  // Replay
  saveReplayData(data: MatchReplayData): Promise<void>;
  getReplayData(matchID: string): Promise<MatchReplayData | null>;

  // Audit Log
  appendAuditLog(entry: AuditLogEntry): Promise<void>;
  getAuditLog(matchID: string): Promise<AuditLogEntry[]>;

  // Cleanup
  deleteMatch(matchID: string): Promise<void>;
}

export interface MatchListFilters {
  status?: "active" | "completed" | "abandoned";
  playerID?: string;
  rulesetHash?: string;
  limit?: number;
  offset?: number;
}

// =============================================================================
// In-Memory Persistence (for testing)
// =============================================================================

export class InMemoryPersistence implements PersistenceAdapter {
  private snapshots: Map<string, MatchSnapshot[]> = new Map();
  private metadata: Map<string, MatchMetadata> = new Map();
  private commandLogs: Map<string, CommandLogEntry[]> = new Map();
  private gameEvents: Map<string, PublishedGameEvent[]> = new Map();
  private gameLogEntries: Map<string, GameLogEntry[]> = new Map();
  private replayData: Map<string, MatchReplayData> = new Map();
  private auditLog: AuditLogEntry[] = [];

  async saveSnapshot(snapshot: MatchSnapshot): Promise<void> {
    const key = snapshot.matchID;
    if (!this.snapshots.has(key)) {
      this.snapshots.set(key, []);
    }
    this.snapshots.get(key)!.push(snapshot);
  }

  async getLatestSnapshot(matchID: string): Promise<MatchSnapshot | null> {
    const snapshots = this.snapshots.get(matchID);
    if (!snapshots || snapshots.length === 0) return null;
    return snapshots[snapshots.length - 1];
  }

  async getSnapshotAtStateID(matchID: string, stateID: number): Promise<MatchSnapshot | null> {
    const snapshots = this.snapshots.get(matchID);
    if (!snapshots) return null;
    return snapshots.find((s) => s.stateID === stateID) || null;
  }

  async saveMetadata(metadata: MatchMetadata): Promise<void> {
    this.metadata.set(metadata.matchID, metadata);
  }

  async getMetadata(matchID: string): Promise<MatchMetadata | null> {
    return this.metadata.get(matchID) || null;
  }

  async listMatches(filters?: MatchListFilters): Promise<MatchMetadata[]> {
    let matches = Array.from(this.metadata.values());

    if (filters?.status) {
      matches = matches.filter((m) => m.status === filters.status);
    }

    if (filters?.playerID) {
      matches = matches.filter((m) => m.playerIDs.includes(filters.playerID!));
    }

    if (filters?.rulesetHash) {
      matches = matches.filter((m) => m.rulesetHash === filters.rulesetHash);
    }

    if (filters?.offset) {
      matches = matches.slice(filters.offset);
    }

    if (filters?.limit) {
      matches = matches.slice(0, filters.limit);
    }

    return matches;
  }

  async appendCommand(matchID: string, entry: CommandLogEntry): Promise<void> {
    if (!this.commandLogs.has(matchID)) {
      this.commandLogs.set(matchID, []);
    }
    this.commandLogs.get(matchID)!.push(entry);
  }

  async getCommandLog(matchID: string): Promise<CommandLogEntry[]> {
    return this.commandLogs.get(matchID) || [];
  }

  async appendGameEvent(matchID: string, event: PublishedGameEvent): Promise<void> {
    if (!this.gameEvents.has(matchID)) {
      this.gameEvents.set(matchID, []);
    }
    this.gameEvents.get(matchID)!.push(event);
  }

  async getGameEvents(matchID: string): Promise<PublishedGameEvent[]> {
    return this.gameEvents.get(matchID) || [];
  }

  async appendGameLogEntry(matchID: string, entry: GameLogEntry): Promise<void> {
    if (!this.gameLogEntries.has(matchID)) {
      this.gameLogEntries.set(matchID, []);
    }
    this.gameLogEntries.get(matchID)!.push(entry);
  }

  async getGameLogEntries(matchID: string): Promise<GameLogEntry[]> {
    return this.gameLogEntries.get(matchID) || [];
  }

  async saveReplayData(data: MatchReplayData): Promise<void> {
    this.replayData.set(data.matchID, data);
  }

  async getReplayData(matchID: string): Promise<MatchReplayData | null> {
    return this.replayData.get(matchID) || null;
  }

  async appendAuditLog(entry: AuditLogEntry): Promise<void> {
    this.auditLog.push(entry);
  }

  async getAuditLog(matchID: string): Promise<AuditLogEntry[]> {
    return this.auditLog.filter((e) => e.matchID === matchID);
  }

  async deleteMatch(matchID: string): Promise<void> {
    this.snapshots.delete(matchID);
    this.metadata.delete(matchID);
    this.commandLogs.delete(matchID);
    this.gameEvents.delete(matchID);
    this.gameLogEntries.delete(matchID);
    this.replayData.delete(matchID);
  }

  // Test utility: clear all data
  clear(): void {
    this.snapshots.clear();
    this.metadata.clear();
    this.commandLogs.clear();
    this.gameEvents.clear();
    this.gameLogEntries.clear();
    this.replayData.clear();
    this.auditLog = [];
  }
}

// =============================================================================
// Persistence Manager
// =============================================================================

export class PersistenceManager {
  private adapter: PersistenceAdapter;

  constructor(adapter: PersistenceAdapter) {
    this.adapter = adapter;
  }

  /**
   * Save a match snapshot.
   */
  async saveSnapshot(matchID: string, state: MatchState<unknown>): Promise<void> {
    await this.adapter.saveSnapshot({
      matchID,
      stateID: state.ctx._stateID,
      state,
      timestamp: Date.now(),
    });
  }

  /**
   * Load the latest snapshot for a match.
   */
  async loadLatestSnapshot(matchID: string): Promise<MatchState<unknown> | null> {
    const snapshot = await this.adapter.getLatestSnapshot(matchID);
    return snapshot?.state || null;
  }

  /**
   * Create or update match metadata.
   */
  async saveMatchMetadata(
    matchID: string,
    rulesetHash: string,
    config: MatchConfig,
    playerIDs: string[],
    resourceRefs?: StaticResourceRefs,
  ): Promise<void> {
    const existing = await this.adapter.getMetadata(matchID);
    const now = Date.now();

    await this.adapter.saveMetadata({
      matchID,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
      rulesetHash,
      config,
      playerIDs,
      status: existing?.status || "active",
      winner: existing?.winner,
      endReason: existing?.endReason,
      resourceRefs: resourceRefs ?? existing?.resourceRefs,
    });
  }

  /**
   * Mark a match as completed.
   */
  async completeMatch(matchID: string, winner?: string, endReason?: string): Promise<void> {
    const metadata = await this.adapter.getMetadata(matchID);
    if (metadata) {
      metadata.status = "completed";
      metadata.updatedAt = Date.now();
      metadata.winner = winner;
      metadata.endReason = endReason;
      await this.adapter.saveMetadata(metadata);
    }
  }

  /**
   * Log an audit event.
   */
  async logAuditEvent(
    matchID: string,
    eventType: string,
    details: Record<string, unknown>,
    playerID?: string,
  ): Promise<void> {
    await this.adapter.appendAuditLog({
      timestamp: Date.now(),
      matchID,
      eventType,
      playerID,
      details,
    });
  }

  /**
   * Export replay data for a match.
   */
  async exportReplay(
    matchID: string,
    options: ReplayExportOptions,
  ): Promise<MatchReplayData | null> {
    const data = await this.adapter.getReplayData(matchID);
    if (!data) return null;

    // Filter based on role
    if (options.role === "player") {
      return this.filterReplayForPlayer(data, options.playerID, options);
    }

    // Judge gets everything
    if (options.role === "judge") {
      return data;
    }

    return data;
  }

  /**
   * Filter replay data for a specific player's perspective.
   */
  private filterReplayForPlayer(
    data: MatchReplayData,
    playerID: string | undefined,
    options: ReplayExportOptions,
  ): MatchReplayData {
    // Clone the data
    const filtered: MatchReplayData = {
      matchID: data.matchID,
      metadata: data.metadata,
      initialState: data.initialState,
      commandLog: data.commandLog,
      gameEvents: data.gameEvents,
      gameLogEntries: data.gameLogEntries,
    };

    // Filter game events if needed
    if (options.filterEvents) {
      filtered.gameEvents = filtered.gameEvents.filter(options.filterEvents);
      const allowedEventSeqs = new Set(filtered.gameEvents.map((event) => event.seq));
      filtered.gameLogEntries = filtered.gameLogEntries.filter((entry) =>
        entry.sourceEventSeqs.some((seq) => allowedEventSeqs.has(seq)),
      );
    }

    filtered.gameLogEntries = filtered.gameLogEntries.flatMap((entry) => {
      switch (entry.visibility.mode) {
        case "PUBLIC":
          return [entry];
        case "PRIVATE":
          return playerID && entry.visibility.visibleTo.includes(playerID) ? [entry] : [];
        case "PUBLIC_WITH_OVERRIDES": {
          const overrideMessage = playerID ? entry.visibility.overrides[playerID] : undefined;
          if (overrideMessage && playerID) {
            return [
              {
                ...entry,
                visibility: {
                  mode: "PRIVATE",
                  visibleTo: [playerID],
                },
                defaultMessage: overrideMessage,
              },
            ];
          }
          return [
            {
              ...entry,
              visibility: {
                mode: "PUBLIC",
              },
              defaultMessage: entry.defaultMessage,
            },
          ];
        }
      }
    });

    // Don't include final state if private data should be excluded
    if (!options.includePrivateData) {
      delete filtered.finalState;
    }

    return filtered;
  }

  /**
   * Get match statistics.
   */
  async getMatchStats(matchID: string): Promise<{
    totalCommands: number;
    totalEvents: number;
    duration?: number;
  } | null> {
    const metadata = await this.adapter.getMetadata(matchID);
    if (!metadata) return null;

    const commandLog = await this.adapter.getCommandLog(matchID);
    const gameEvents = await this.adapter.getGameEvents(matchID);

    return {
      totalCommands: commandLog.length,
      totalEvents: gameEvents.length,
      duration:
        metadata.status === "completed" && metadata.createdAt
          ? metadata.updatedAt - metadata.createdAt
          : undefined,
    };
  }
}
