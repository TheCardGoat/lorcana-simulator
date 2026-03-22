import type { CommandEnvelope, GameLogEntry, MoveInput } from "#core";
import type { EngineMoveHistoryEntry } from "./core/engine/contracts";

export type MoveHistorySourceAuthority = "server" | "client";

export interface AcceptedMoveRecord {
  gameId: string;
  stateVersion: number;
  turnNumber: number;
  actorId: string;
  moveId: string;
  input?: MoveInput;
  processedCommand: CommandEnvelope;
  timestamp: number;
  sourceAuthority: MoveHistorySourceAuthority;
  transitionType?: EngineMoveHistoryEntry["transitionType"];
  newStateID?: number;
  undoneStateID?: number;
  restoredCheckpointStateID?: number;
  undoneMoveId?: string;
}

export interface EngineLogRecord {
  gameId: string;
  stateVersion: number;
  seq: number;
  sourceEventSeqs: number[];
  defaultMessage?: GameLogEntry["defaultMessage"];
  logEntry: GameLogEntry;
  timestamp: number;
  sourceAuthority: MoveHistorySourceAuthority;
}

export function createSyntheticProcessedCommand(
  gameId: string,
  stateVersion: number,
  moveEntry: EngineMoveHistoryEntry,
): CommandEnvelope {
  return {
    commandID: `persisted:${gameId}:${stateVersion}`,
    input: moveEntry.input,
    move: moveEntry.moveId,
  };
}

export function createAcceptedMoveRecord(args: {
  gameId: string;
  stateVersion: number;
  actorId: string;
  moveEntry: EngineMoveHistoryEntry;
  processedCommand?: CommandEnvelope;
  sourceAuthority: MoveHistorySourceAuthority;
}): AcceptedMoveRecord {
  const { actorId, gameId, moveEntry, processedCommand, sourceAuthority, stateVersion } = args;

  return {
    actorId,
    gameId,
    input: moveEntry.input,
    moveId: moveEntry.moveId,
    processedCommand:
      processedCommand ?? createSyntheticProcessedCommand(gameId, stateVersion, moveEntry),
    sourceAuthority,
    stateVersion,
    timestamp: moveEntry.timestamp,
    turnNumber: moveEntry.turnNumber ?? 0,
    transitionType: moveEntry.transitionType,
    newStateID: moveEntry.newStateID,
    undoneStateID: moveEntry.undoneStateID,
    restoredCheckpointStateID: moveEntry.restoredCheckpointStateID,
    undoneMoveId: moveEntry.undoneMoveId,
  };
}

export function createEngineLogRecord(args: {
  gameId: string;
  stateVersion: number;
  logEntry: GameLogEntry;
  sourceAuthority: MoveHistorySourceAuthority;
}): EngineLogRecord {
  const { gameId, logEntry, sourceAuthority, stateVersion } = args;

  return {
    defaultMessage: logEntry.defaultMessage,
    gameId,
    logEntry,
    seq: logEntry.seq,
    sourceAuthority,
    sourceEventSeqs: [...logEntry.sourceEventSeqs],
    stateVersion,
    timestamp: logEntry.timestamp,
  };
}
