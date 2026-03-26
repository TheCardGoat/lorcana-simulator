/**
 * MatchRuntime logging projection helpers.
 */

import type {
  GameLogEntry,
  LogMessage,
  LogVisibility,
  MatchState,
  PublishedGameEvent,
} from "./types";
import type { LogProjector, ProjectedLogEntry } from "./match-runtime.types";

export interface ProjectGameLogInput {
  publishedGameEvents: PublishedGameEvent[];
  state: MatchState;
  moveLogEntries?: readonly ProjectedLogEntry[];
  nextGameLogSeq: number;
  logProjector?: LogProjector;
}

export interface ProjectGameLogOutput {
  logEntries: GameLogEntry[];
  nextGameLogSeq: number;
}

export function projectGameLog(input: ProjectGameLogInput): ProjectGameLogOutput {
  const { publishedGameEvents, state, moveLogEntries = [], nextGameLogSeq, logProjector } = input;

  let nextSeq = nextGameLogSeq;
  const logEntries: GameLogEntry[] = [];

  for (const publishedEvent of publishedGameEvents) {
    const projected = createBuiltInLogEntries(publishedEvent);
    const customProjected = logProjector?.(publishedEvent, { state }) ?? [];
    const moveExecutedProjected =
      publishedEvent.event.kind === "MOVE_EXECUTED" ? moveLogEntries : [];

    for (const entry of [...projected, ...customProjected, ...moveExecutedProjected]) {
      const result = createCommittedLogEntry(entry, publishedEvent, nextSeq);
      logEntries.push(result.entry);
      nextSeq = result.nextSeq;
    }
  }

  return {
    logEntries,
    nextGameLogSeq: nextSeq,
  };
}

function createCommittedLogEntry(
  entry: ProjectedLogEntry,
  publishedEvent: PublishedGameEvent,
  sourceSeq: number,
): { entry: GameLogEntry; nextSeq: number } {
  const gameLogEntry: GameLogEntry = {
    id: `log-${publishedEvent.stateId}-${sourceSeq}`,
    seq: sourceSeq,
    timestamp: publishedEvent.timestamp,
    stateId: publishedEvent.stateId,
    sourceEventSeqs: [publishedEvent.seq],
    category: entry.category,
    visibility: entry.visibility,
    defaultMessage: entry.defaultMessage,
    typedEntry: entry.typedEntry,
  };

  return {
    entry: gameLogEntry,
    nextSeq: sourceSeq + 1,
  };
}

function createBuiltInLogEntries(event: PublishedGameEvent): ProjectedLogEntry[] {
  switch (event.event.kind) {
    case "MOVE_EXECUTED":
      return [
        createPublicLogEntry("action", "move.executed", {
          move: event.event.move,
          playerId: event.event.playerId,
        }),
      ];
    case "TURN_STARTED":
      return [
        createPublicLogEntry("system", "turn.started", {
          playerId: event.event.playerId ?? null,
          turn: event.event.turn,
          phase: event.event.phase ?? null,
        }),
      ];
    case "GAME_ENDED":
      return [
        createPublicLogEntry("system", "game.ended", {
          winner: event.event.winner ?? null,
          reason: event.event.reason,
        }),
      ];
    default:
      return [];
  }
}

function createPublicLogEntry(
  category: GameLogEntry["category"],
  key: string,
  values: LogMessage["values"],
): ProjectedLogEntry {
  const visibility: LogVisibility = { mode: "PUBLIC" };
  return {
    category,
    visibility,
    defaultMessage: {
      key,
      values,
    },
  };
}
