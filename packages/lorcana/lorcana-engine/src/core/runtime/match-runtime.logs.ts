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

export interface ProjectGameLogInput<G> {
  publishedGameEvents: PublishedGameEvent[];
  state: MatchState<G>;
  moveLogEntries?: readonly ProjectedLogEntry[];
  nextGameLogSeq: number;
  logProjector?: LogProjector<G>;
}

export interface ProjectGameLogOutput {
  logEntries: GameLogEntry[];
  nextGameLogSeq: number;
}

export function projectGameLog<G>(input: ProjectGameLogInput<G>): ProjectGameLogOutput {
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
    case "PRIORITY_PASSED":
      return [
        createPublicLogEntry("rules", "priority.passed", {
          playerId: event.event.playerId,
        }),
      ];
    case "GAME_ENDED":
      return [
        createPublicLogEntry("system", "game.ended", {
          winner: event.event.winner ?? null,
          reason: event.event.reason,
        }),
      ];
    case "CARD_MOVED":
      return [
        createPublicLogEntry("rules", "card.moved", {
          cardId: event.event.cardId,
          fromZone: event.event.fromZone ?? null,
          toZone: event.event.toZone,
        }),
      ];
    case "CARDS_DRAWN":
      return [
        createPublicLogEntry("rules", "cards.drawn", {
          playerId: event.event.playerId ?? null,
          count: event.event.cardIds.length,
        }),
      ];
    case "CARDS_MILLED":
      return [
        createPublicLogEntry("rules", "cards.milled", {
          playerId: event.event.playerId ?? null,
          count: event.event.cardIds.length,
        }),
      ];
    case "DAMAGE_DEALT":
      return [
        createPublicLogEntry("rules", "damage.dealt", {
          amount: event.event.amount,
          sourceCardId: event.event.sourceCardId ?? null,
          targetCardId: event.event.targetCardId ?? null,
          targetPlayerId: event.event.targetPlayerId ?? null,
        }),
      ];
    case "CARD_DEFEATED":
      return [
        createPublicLogEntry("rules", "card.defeated", {
          cardId: event.event.cardId,
          reason: event.event.reason,
        }),
      ];
    case "TRIGGER_QUEUED":
      return [
        createPublicLogEntry("rules", "trigger.queued", {
          triggerId: event.event.triggerId,
          sourceId: event.event.sourceId,
        }),
      ];
    case "STACK_ITEM_RESOLVED":
      return [
        createPublicLogEntry("rules", "stack.itemResolved", {
          itemId: event.event.itemId,
          itemType: event.event.itemType,
          playerId: event.event.playerId,
        }),
      ];
    case "STATE_BASED_ACTION_APPLIED":
      return [
        createPublicLogEntry("rules", "stateBasedAction.applied", {
          action: event.event.action,
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
