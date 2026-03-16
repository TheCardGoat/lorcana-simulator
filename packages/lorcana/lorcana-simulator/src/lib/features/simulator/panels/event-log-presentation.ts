import type { LorcanaPlayerSide, MoveLogEntrySnapshot } from "@/features/simulator/model/contracts.js";
import { m } from "$lib/paraglide/messages.js";
import {
  type EventLogMarkerId,
  type EventLogPlayerTone,
  type EventLogSegment,
  collectTypedLorcanaMessages,
  formatEventLogBody,
  toTypedLorcanaLogMessage,
} from "@/features/simulator/model/event-log-formatting.js";

export type { EventLogMarkerId, EventLogPlayerTone, EventLogSegment };
export { collectTypedLorcanaMessages, toTypedLorcanaLogMessage };

export type EventLogRow =
  | {
      kind: "turn-separator";
      id: string;
      turnNumber: number;
      marker: EventLogMarkerId;
      label: string;
    }
  | {
      kind: "event-row";
      id: string;
      turnNumber: number;
      timestamp: number;
      marker: EventLogMarkerId;
      actor: {
        label: string;
        tone: EventLogPlayerTone;
      };
      segments: EventLogSegment[];
      source: "typed" | "fallback";
    };

export function filterEntriesToLastTurns(
  entries: MoveLogEntrySnapshot[],
  turnCount = 2,
): MoveLogEntrySnapshot[] {
  if (entries.length === 0 || turnCount <= 0) {
    return [];
  }

  const recentTurns = new Set<number>();
  for (let index = entries.length - 1; index >= 0; index -= 1) {
    recentTurns.add(entries[index].turnNumber);
    if (recentTurns.size >= turnCount) {
      break;
    }
  }

  return entries.filter((entry) => recentTurns.has(entry.turnNumber));
}

export function buildEventLogRows(
  entries: MoveLogEntrySnapshot[],
  viewerSide?: LorcanaPlayerSide | null,
): EventLogRow[] {
  const visibleEntries = filterEntriesToLastTurns(entries);
  if (visibleEntries.length === 0) {
    return [];
  }

  const rows: EventLogRow[] = [];
  let currentTurn: number | null = null;

  for (const entry of visibleEntries) {
    if (entry.turnNumber !== currentTurn) {
      currentTurn = entry.turnNumber;
      rows.push({
        kind: "turn-separator",
        id: `turn-${entry.turnNumber}`,
        turnNumber: entry.turnNumber,
        marker: "turn",
        label: `Turn ${entry.turnNumber}`,
      });
    }

    rows.push(buildEventRow(entry, viewerSide));
  }

  return rows;
}

function buildEventRow(
  entry: MoveLogEntrySnapshot,
  viewerSide?: LorcanaPlayerSide | null,
): Extract<EventLogRow, { kind: "event-row" }> {
  const body = formatEventLogBody(entry, viewerSide);

  return {
    kind: "event-row",
    id: entry.id,
    turnNumber: entry.turnNumber,
    timestamp: entry.timestamp,
    marker: body.marker,
    actor: buildActor(entry.actorSide, viewerSide),
    segments: body.segments,
    source: body.source,
  };
}

function buildActor(
  actorSide?: LorcanaPlayerSide | null,
  viewerSide?: LorcanaPlayerSide | null,
): { label: string; tone: EventLogPlayerTone } {
  if (!actorSide) {
    return { label: "System", tone: "system" };
  }

  if (viewerSide && actorSide === viewerSide) {
    return { label: m["sim.player.you"]({}), tone: "self" };
  }

  if (viewerSide && actorSide !== viewerSide) {
    return { label: m["sim.player.opponent"]({}), tone: "opponent" };
  }

  return actorSide === "playerOne"
    ? { label: m["sim.player.side.playerOne"]({}), tone: "playerOne" }
    : { label: m["sim.player.side.playerTwo"]({}), tone: "playerTwo" };
}
