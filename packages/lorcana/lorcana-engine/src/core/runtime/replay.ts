/**
 * Replay System
 *
 * Phase 6 of PLAN.md: Persistence, Replay, Audit, and Auth
 *
 * Provides replay functionality for matches with role-based filtering.
 */

import type {
  GameLogEntry,
  MatchState,
  PublishedGameEvent,
  SanitizedCommandEnvelope,
} from "./types";
import type { CommandLogEntry, MatchReplayData, ReplayExportOptions } from "./persistence";
import {
  getStaticResourceRefs,
  type MatchStaticResources,
  type StaticResourceRefs,
} from "./static-resources";
import { MatchRuntime } from "./match-runtime";
import { StateSanitizer } from "./security";
import type { BaseCardDefinition } from "./card-contracts";

// =============================================================================
// Replay Types
// =============================================================================

export interface ReplayState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  currentState?: MatchState<unknown>;
  speed: number;
}

export interface ReplayStep {
  step: number;
  stateID: number;
  timestamp: number;
  state: MatchState<unknown>;
  command?: CommandLogEntry;
  events: PublishedGameEvent[];
  logEntries: GameLogEntry[];
}

export interface ReplayExport {
  format: "json" | "compressed";
  data: string;
  metadata: {
    matchID: string;
    version: string;
    exportedAt: number;
    totalSteps: number;
  };
}

export interface FilteredCommandLogEntry extends Omit<CommandLogEntry, "command"> {
  command: SanitizedCommandEnvelope;
}

export interface FilteredMatchReplayData extends Omit<MatchReplayData, "commandLog"> {
  commandLog: FilteredCommandLogEntry[];
}

export interface ReplayEngineOptions {
  /**
   * External resources used to resolve runtime cards during replay inspection.
   * If replay metadata includes resourceRefs, refs are validated against this object.
   */
  staticResources?: MatchStaticResources<BaseCardDefinition>;
  /**
   * Optional explicit refs if the caller doesn't want to pass the full resources object.
   */
  resourceRefs?: StaticResourceRefs;
  /**
   * If true, require refs even when replay metadata does not include them.
   */
  requireResourceRefs?: boolean;
}

// =============================================================================
// Replay Engine
// =============================================================================

export class ReplayEngine {
  private replayData: MatchReplayData;
  private steps: ReplayStep[] = [];
  private currentState: MatchState<unknown>;
  private currentStep = 0;

  constructor(replayData: MatchReplayData, options: ReplayEngineOptions = {}) {
    ReplayEngine.assertRequiredResources(replayData, options);
    this.replayData = replayData;
    this.currentState = JSON.parse(JSON.stringify(replayData.initialState));
    this.buildSteps();
  }

  private static assertRequiredResources(
    replayData: MatchReplayData,
    options: ReplayEngineOptions,
  ): void {
    const expected = replayData.metadata.resourceRefs;
    const provided =
      options.resourceRefs ??
      (options.staticResources ? getStaticResourceRefs(options.staticResources) : undefined);

    if (!expected) {
      if (options.requireResourceRefs) {
        throw new Error("REPLAY_RESOURCE_REFS_MISSING: replay metadata has no resourceRefs");
      }
      return;
    }

    if (!provided) {
      throw new Error(
        "REPLAY_RESOURCES_REQUIRED: replay metadata requires external card resources but none were provided",
      );
    }

    if (provided.cardsCatalogRef !== expected.cardsCatalogRef) {
      throw new Error(
        `REPLAY_RESOURCE_REF_MISMATCH: cardsCatalogRef expected '${expected.cardsCatalogRef}' got '${provided.cardsCatalogRef}'`,
      );
    }

    if (provided.cardInstancesRef !== expected.cardInstancesRef) {
      throw new Error(
        `REPLAY_RESOURCE_REF_MISMATCH: cardInstancesRef expected '${expected.cardInstancesRef}' got '${provided.cardInstancesRef}'`,
      );
    }
  }

  /**
   * Build replay steps from command log.
   */
  private buildSteps(): void {
    this.steps = [];

    // Initial state is step 0
    this.steps.push({
      step: 0,
      stateID: this.currentState.ctx._stateID,
      timestamp: this.replayData.metadata.createdAt,
      state: JSON.parse(JSON.stringify(this.currentState)),
      events: [],
      logEntries: [],
    });

    // Build steps from command log
    for (let i = 0; i < this.replayData.commandLog.length; i++) {
      const command = this.replayData.commandLog[i];
      const events = this.replayData.gameEvents.filter(
        (e) =>
          e.timestamp >= command.timestamp &&
          e.timestamp < (this.replayData.commandLog[i + 1]?.timestamp || Infinity),
      );
      const logEntries = this.replayData.gameLogEntries.filter((entry) =>
        entry.sourceEventSeqs.some((seq) => events.some((event) => event.seq === seq)),
      );

      this.steps.push({
        step: i + 1,
        stateID: command.stateID,
        timestamp: command.timestamp,
        state: this.currentState, // Placeholder - would be computed
        command,
        events,
        logEntries,
      });
    }
  }

  /**
   * Get total number of steps.
   */
  getTotalSteps(): number {
    return this.steps.length;
  }

  /**
   * Get current step.
   */
  getCurrentStep(): number {
    return this.currentStep;
  }

  /**
   * Get step at index.
   */
  getStep(index: number): ReplayStep | undefined {
    return this.steps[index];
  }

  /**
   * Get all steps.
   */
  getAllSteps(): ReplayStep[] {
    return this.steps;
  }

  /**
   * Jump to a specific step.
   */
  jumpToStep(step: number): ReplayStep | undefined {
    if (step < 0 || step >= this.steps.length) {
      return undefined;
    }
    this.currentStep = step;
    return this.steps[step];
  }

  /**
   * Go to next step.
   */
  nextStep(): ReplayStep | undefined {
    return this.jumpToStep(this.currentStep + 1);
  }

  /**
   * Go to previous step.
   */
  previousStep(): ReplayStep | undefined {
    return this.jumpToStep(this.currentStep - 1);
  }

  /**
   * Get replay metadata.
   */
  getMetadata(): MatchReplayData["metadata"] {
    return this.replayData.metadata;
  }

  /**
   * Export replay to JSON.
   */
  exportToJSON(): string {
    return JSON.stringify(
      {
        version: "1.0.0",
        exportedAt: Date.now(),
        data: this.replayData,
      },
      null,
      2,
    );
  }

  /**
   * Get events at a specific step.
   */
  getEventsAtStep(step: number): PublishedGameEvent[] {
    const replayStep = this.steps[step];
    return replayStep?.events || [];
  }

  /**
   * Get projected log entries at a specific step.
   */
  getLogEntriesAtStep(step: number): GameLogEntry[] {
    const replayStep = this.steps[step];
    return replayStep?.logEntries || [];
  }

  /**
   * Get command at a specific step.
   */
  getCommandAtStep(step: number): CommandLogEntry | undefined {
    const replayStep = this.steps[step];
    return replayStep?.command;
  }
}

// =============================================================================
// Replay Builder
// =============================================================================

export interface ReplayBuilderConfig {
  matchID: string;
  rulesetHash: string;
  config: MatchReplayData["metadata"]["config"];
  playerIDs: string[];
  resourceRefs?: StaticResourceRefs;
}

export class ReplayBuilder {
  private config: ReplayBuilderConfig;
  private initialState?: MatchState<unknown>;
  private commandLog: CommandLogEntry[] = [];
  private gameEvents: PublishedGameEvent[] = [];
  private gameLogEntries: GameLogEntry[] = [];
  private finalState?: MatchState<unknown>;

  constructor(config: ReplayBuilderConfig) {
    this.config = config;
  }

  /**
   * Set the initial state.
   */
  setInitialState(state: MatchState<unknown>): this {
    this.initialState = JSON.parse(JSON.stringify(state));
    return this;
  }

  /**
   * Add a command to the log.
   */
  addCommand(entry: CommandLogEntry): this {
    this.commandLog.push(entry);
    return this;
  }

  /**
   * Add a published game event.
   */
  addGameEvent(event: PublishedGameEvent): this {
    this.gameEvents.push(event);
    return this;
  }

  /**
   * Add a projected game log entry.
   */
  addGameLogEntry(entry: GameLogEntry): this {
    this.gameLogEntries.push(entry);
    return this;
  }

  /**
   * Set the final state.
   */
  setFinalState(state: MatchState<unknown>): this {
    this.finalState = JSON.parse(JSON.stringify(state));
    return this;
  }

  /**
   * Build the replay data.
   */
  build(): MatchReplayData {
    if (!this.initialState) {
      throw new Error("Initial state is required");
    }

    return {
      matchID: this.config.matchID,
      metadata: {
        matchID: this.config.matchID,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        rulesetHash: this.config.rulesetHash,
        config: this.config.config,
        playerIDs: this.config.playerIDs,
        status: this.finalState ? "completed" : "active",
        resourceRefs: this.config.resourceRefs,
      },
      initialState: this.initialState,
      commandLog: this.commandLog,
      gameEvents: this.gameEvents,
      gameLogEntries: this.gameLogEntries,
      finalState: this.finalState,
    };
  }
}

// =============================================================================
// Replay Exporter
// =============================================================================

export class ReplayExporter {
  /**
   * Export replay to JSON format.
   */
  static toJSON(replayData: MatchReplayData): ReplayExport {
    return {
      format: "json",
      data: JSON.stringify(replayData),
      metadata: {
        matchID: replayData.matchID,
        version: "1.0.0",
        exportedAt: Date.now(),
        totalSteps: replayData.commandLog.length + 1,
      },
    };
  }

  /**
   * Export replay to compressed format (base64 encoded JSON for now).
   */
  static toCompressed(replayData: MatchReplayData): ReplayExport {
    const json = JSON.stringify(replayData);
    // In a real implementation, this would use actual compression
    // For now, we just base64 encode it
    const compressed =
      typeof Buffer !== "undefined" ? Buffer.from(json).toString("base64") : btoa(json);

    return {
      format: "compressed",
      data: compressed,
      metadata: {
        matchID: replayData.matchID,
        version: "1.0.0",
        exportedAt: Date.now(),
        totalSteps: replayData.commandLog.length + 1,
      },
    };
  }

  /**
   * Import replay from JSON format.
   */
  static fromJSON(data: string): MatchReplayData {
    return JSON.parse(data);
  }

  /**
   * Import replay JSON and immediately construct a ReplayEngine.
   * This ensures external resource refs are enforced at replay load time.
   */
  static createEngineFromJSON(data: string, options?: ReplayEngineOptions): ReplayEngine {
    return new ReplayEngine(ReplayExporter.fromJSON(data), options);
  }

  /**
   * Import replay from compressed format.
   */
  static fromCompressed(data: string): MatchReplayData {
    const json =
      typeof Buffer !== "undefined" ? Buffer.from(data, "base64").toString() : atob(data);
    return JSON.parse(json);
  }

  /**
   * Import compressed replay data and immediately construct a ReplayEngine.
   * This ensures external resource refs are enforced at replay load time.
   */
  static createEngineFromCompressed(data: string, options?: ReplayEngineOptions): ReplayEngine {
    return new ReplayEngine(ReplayExporter.fromCompressed(data), options);
  }

  /**
   * Filter replay data for a specific role.
   */
  static filterForRole(
    replayData: MatchReplayData,
    role: "player" | "judge",
    playerID?: string,
  ): MatchReplayData | FilteredMatchReplayData {
    if (role === "judge") {
      return replayData;
    }

    // For player view, filter sensitive information
    const filtered: FilteredMatchReplayData = {
      matchID: replayData.matchID,
      metadata: replayData.metadata,
      initialState: replayData.initialState,
      commandLog: replayData.commandLog.map((cmd) => ({
        ...cmd,
        command: StateSanitizer.sanitizeCommand(cmd.command),
      })),
      gameEvents: replayData.gameEvents,
      gameLogEntries: ReplayExporter.filterLogEntriesForPlayer(replayData.gameLogEntries, playerID),
    };

    // Remove RNG state from states
    if (filtered.initialState) {
      filtered.initialState = ReplayExporter.sanitizeState(filtered.initialState);
    }

    if (filtered.finalState) {
      filtered.finalState = ReplayExporter.sanitizeState(filtered.finalState);
    }

    return filtered;
  }

  /**
   * Sanitize state by removing sensitive information.
   */
  private static sanitizeState(state: MatchState<unknown>): MatchState<unknown> {
    const sanitized = JSON.parse(JSON.stringify(state));

    // Remove RNG state
    if (sanitized.ctx.random) {
      sanitized.ctx.random.state = null;
    }

    return sanitized;
  }

  private static filterLogEntriesForPlayer(
    logEntries: GameLogEntry[],
    playerID?: string,
  ): GameLogEntry[] {
    return logEntries.flatMap((entry) => {
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
  }
}

// =============================================================================
// Replay Validator
// =============================================================================

export interface ReplayValidationResult {
  valid: boolean;
  errors: string[];
}

export class ReplayValidator {
  /**
   * Validate replay data integrity.
   */
  static validate(replayData: MatchReplayData): ReplayValidationResult {
    const errors: string[] = [];

    // Check required fields
    if (!replayData.matchID) {
      errors.push("Missing matchID");
    }

    if (!replayData.metadata) {
      errors.push("Missing metadata");
    }

    if (!replayData.initialState) {
      errors.push("Missing initialState");
    }

    if (!replayData.commandLog) {
      errors.push("Missing commandLog");
    }

    if (!replayData.gameEvents) {
      errors.push("Missing gameEvents");
    }

    if (!replayData.gameLogEntries) {
      errors.push("Missing gameLogEntries");
    }

    // Validate state consistency
    if (replayData.initialState && replayData.commandLog.length > 0) {
      const firstCommand = replayData.commandLog[0];
      if (firstCommand.stateID !== replayData.initialState.ctx._stateID + 1) {
        errors.push("Command log doesn't start from initial state");
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Check if replay can be deterministically reconstructed.
   */
  static canReconstruct(replayData: MatchReplayData): boolean {
    return (
      replayData.initialState !== undefined &&
      replayData.commandLog.length > 0 &&
      replayData.metadata?.rulesetHash !== undefined
    );
  }
}
