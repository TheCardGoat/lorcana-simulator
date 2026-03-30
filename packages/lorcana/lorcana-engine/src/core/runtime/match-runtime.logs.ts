/**
 * MatchRuntime logging projection.
 *
 * Converts move handler log entries + domain events into unified MoveLog entries.
 * The legacy GameLogEntry / LogProjector pipeline has been removed.
 */

import type { MatchState, PublishedGameEvent } from "./types";
import type { ProjectedLogEntry } from "./match-runtime.types";
import type { MoveLog } from "../../types/move-log";
import type { PlayerId } from "../types";
import { MoveOutcomeAccumulator } from "../../runtime-game/move-outcome-accumulator";
import { buildMoveLog, buildSystemMoveLog } from "../../runtime-game/move-log-factory";

export interface ProjectGameLogInput {
  publishedGameEvents: PublishedGameEvent[];
  state: MatchState;
  moveLogEntries?: readonly ProjectedLogEntry[];
}

export interface ProjectGameLogOutput {
  /** All MoveLog entries produced by this projection (move + system events). */
  moveLogs: MoveLog[];
}

export function projectGameLog(input: ProjectGameLogInput): ProjectGameLogOutput {
  const { publishedGameEvents, state, moveLogEntries = [] } = input;

  const moveLogs: MoveLog[] = [];
  const accumulator = new MoveOutcomeAccumulator();

  for (const publishedEvent of publishedGameEvents) {
    // Feed every event to the outcome accumulator
    accumulator.accumulate(publishedEvent, { state });

    const ge = publishedEvent.event;

    if (ge.kind === "MOVE_EXECUTED") {
      const outcomes = accumulator.flush();
      const moveLog = buildMoveLog(
        moveLogEntries,
        ge.move,
        ge.playerId as PlayerId,
        publishedEvent.timestamp,
        outcomes,
      );
      if (moveLog) {
        moveLogs.push(moveLog);
      }
    }

    // System events: TURN_STARTED, GAME_ENDED
    if (ge.kind === "TURN_STARTED" || ge.kind === "GAME_ENDED") {
      const systemLog = buildSystemMoveLog(publishedEvent);
      if (systemLog) {
        moveLogs.push(systemLog);
      }
    }
  }

  return { moveLogs };
}
