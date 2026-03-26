/**
 * MatchRuntime Command Processing
 *
 * Command execution logic — pure function, no class dependencies.
 */

import { produce, type Patch } from "immer";
import type { GameEvent, MatchState, MoveInput } from "./types";
import type {
  MatchRuntimeConfig,
  GameEndResult,
  RuntimeActorRole,
  CommandFailure,
  ProjectedLogEntry,
} from "./match-runtime.types";
import { resolveFlowTransitionsOnDraft, checkGameEndCondition } from "./match-runtime.flow";
import { validateCommand } from "./match-runtime.validation";
import {
  buildExecutionContext as buildExecutionContextFromUtils,
  buildLifecycleContext as buildLifecycleContextFromUtils,
} from "./match-runtime.utils";
import type { MatchStaticResources } from "./static-resources";
import type { BaseCardDefinition } from "./card-contracts";
import { expireReveals } from "./zone-operations";
import type { LorcanaG } from "../../types/runtime-state";

interface InternalCommandSuccess {
  success: true;
  stateID: number;
  state: MatchState;
  patches: Patch[];
  pendingGameEvents: GameEvent[];
  moveLogEntries: ProjectedLogEntry[];
  undoable: boolean;
}

const INFORMATION_REVEALING_EVENT_KINDS: ReadonlySet<string> = new Set([
  "CARDS_DRAWN",
  "CARDS_MILLED",
  "MULLIGAN_PERFORMED",
]);

function isInformationRevealed(events: GameEvent[]): boolean {
  return events.some((event) => INFORMATION_REVEALING_EVENT_KINDS.has(event.kind));
}

export interface CommandExecutionContext {
  state: MatchState;
  config: MatchRuntimeConfig;
  staticResources: MatchStaticResources;
  actorRole: RuntimeActorRole;
  gameEnded: boolean;
  currentStateID: number;
}

export function executeCommand(
  command: {
    commandID?: string;
    move: string;
    input?: MoveInput;
    redactInput?: boolean;
  },
  playerId: string,
  prevStateID: number,
  timestamp: number,
  ctx: CommandExecutionContext,
): {
  result: InternalCommandSuccess | CommandFailure;
  newState: MatchState;
  gameEnded: boolean;
  gameEndResult?: GameEndResult;
} {
  const commandInput = command.input;
  if (!commandInput) {
    return {
      result: {
        success: false,
        error: "Move input was not provided",
        errorCode: "MISSING_INPUT",
        currentStateID: ctx.currentStateID,
      },
      newState: ctx.state,
      gameEnded: ctx.gameEnded,
    };
  }

  // Validate command first
  const validation = validateCommand({ ...command, input: commandInput }, playerId, prevStateID, {
    state: ctx.state,
    config: ctx.config,
    staticResources: ctx.staticResources,
    actorRole: ctx.actorRole,
    gameEnded: ctx.gameEnded,
    currentStateID: ctx.currentStateID,
  });

  if (!validation.valid) {
    return {
      result: {
        success: false,
        error: validation.reason!,
        errorCode: validation.code!,
        currentStateID: ctx.currentStateID,
      },
      newState: ctx.state,
      gameEnded: ctx.gameEnded,
    };
  }

  const moveDef = validation.moveDef!;
  const actingPlayerId = validation.actingPlayerId ?? playerId;

  // Execute move
  let patches: Patch[] = [];
  let newState = ctx.state;
  const pendingGameEvents: GameEvent[] = [];
  const moveLogEntries: ProjectedLogEntry[] = [];

  const endGameTracker = { ended: false, result: undefined as GameEndResult | undefined };

  try {
    newState = produce(
      ctx.state,
      (draft) => {
        const emitGameEvent = (event: GameEvent) => {
          pendingGameEvents.push(event);
        };
        const moveLogSink = (entries: readonly ProjectedLogEntry[]) => {
          moveLogEntries.push(...entries);
        };

        const executionContext = buildExecutionContextFromUtils(
          draft,
          actingPlayerId,
          commandInput,
          ctx.config,
          ctx.staticResources,
          ctx.gameEnded,
          emitGameEvent,
          endGameTracker,
          moveLogSink,
        );

        // Step 5: Execute the move reducer
        moveDef.execute(executionContext);

        // Step 7: Resolve flow events
        resolveFlowTransitionsOnDraft(
          draft,
          ctx.config.flow,
          (draftState, lifecycleGameEnded, lifecyclePlayerId) =>
            buildLifecycleContextFromUtils(
              draftState,
              ctx.config,
              ctx.staticResources,
              lifecycleGameEnded,
              emitGameEvent,
              endGameTracker,
              lifecyclePlayerId,
              moveLogSink,
              undefined, // runtimeCardCache
              true, // useSnapshotForReads: lifecycle hooks only read — no Immer proxy overhead
            ),
        );

        // Step 8: Update clocks for new waiting state
        if (draft.ctx.time.mode !== "none") {
          const priorityHolder = draft.ctx.priority.holder;
          if (priorityHolder) {
            draft.ctx.time.activePlayerID = priorityHolder;
            draft.ctx.time.startedAtMs = timestamp;
            draft.ctx.time.running = true;
            draft.ctx.time.pausedReason = undefined;
          }

          // Dynamic clock bonuses
          if (draft.ctx.time.mode === "dynamic") {
            const actorState = draft.ctx.time.players[actingPlayerId];
            if (actorState) {
              const cap = draft.ctx.time.config.reserveCapMs;

              // Award per-action bonus for every action
              const actionBonusMs = draft.ctx.time.config.perActionBonusMs;
              actorState.actionBonusMsGranted += actionBonusMs;
              actorState.reserveMsRemaining = Math.min(
                cap,
                actorState.reserveMsRemaining + actionBonusMs,
              );

              // Award turn-pass bonus specifically for passTurn
              if (command.move === "passTurn") {
                const turnBonusMs = draft.ctx.time.config.perTurnPassBonusMs;
                actorState.turnPassBonusMsGranted += turnBonusMs;
                actorState.reserveMsRemaining = Math.min(
                  cap,
                  actorState.reserveMsRemaining + turnBonusMs,
                );
              }
            }
          }
        }

        // Step 9: Increment _stateID
        draft.ctx._stateID++;
        expireReveals(draft);

        // Check end game condition
        const endResult = checkGameEndCondition(draft, ctx.config.flow);
        if (endResult) {
          endGameTracker.ended = true;
          endGameTracker.result = endResult;
          draft.ctx.status.gameEnded = true;
          draft.ctx.status.winner = endResult.winner;
          draft.ctx.status.reason = endResult.reason;

          if (draft.ctx.time.mode !== "none") {
            draft.ctx.time.running = false;
            draft.ctx.time.pausedReason = "GAME_ENDED";
          }
        }
      },
      (p) => {
        patches = p;
      },
    );

    pendingGameEvents.unshift({
      kind: "MOVE_EXECUTED",
      commandId: command.commandID ?? `cmd-${timestamp}`,
      move: command.move,
      playerId: actingPlayerId,
      inputRedacted: Boolean(command.redactInput),
      input: command.redactInput ? "[REDACTED]" : commandInput,
    });

    if (endGameTracker.ended && endGameTracker.result) {
      pendingGameEvents.push({
        kind: "GAME_ENDED",
        winner: endGameTracker.result.winner,
        reason: endGameTracker.result.reason,
      });
    }

    return {
      result: {
        success: true,
        stateID: newState.ctx._stateID,
        state: newState,
        patches,
        pendingGameEvents,
        moveLogEntries,
        undoable: !isInformationRevealed(pendingGameEvents),
      },
      newState,
      gameEnded: endGameTracker.ended,
      gameEndResult: endGameTracker.result,
    };
  } catch (error) {
    return {
      result: {
        success: false,
        error: error instanceof Error ? error.message : "Move execution failed",
        errorCode: "EXECUTION_ERROR",
        currentStateID: ctx.currentStateID,
      },
      newState: ctx.state,
      gameEnded: ctx.gameEnded,
    };
  }
}
