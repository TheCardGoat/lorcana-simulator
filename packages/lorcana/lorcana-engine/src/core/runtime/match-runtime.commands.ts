/**
 * MatchRuntime Command Processing
 *
 * Command execution logic.
 */

import { produce, type Patch, type Draft } from "immer";
import type { GameEvent, MatchState, MoveInput } from "./types";
import type {
  MoveDefinition,
  GameEndResult,
  RuntimeLifecycleContext,
  MoveValidationContext,
  MoveExecutionContext,
  RuntimeActorRole,
  RuntimeFlowDefinition,
  CommandFailure,
  ProjectedLogEntry,
} from "./match-runtime.types";
import { resolveFlowTransitionsOnDraft, checkGameEndCondition } from "./match-runtime.flow";
import { validateCommand } from "./match-runtime.validation";
import type { BaseCardDefinition } from "./card-contracts";
import { expireReveals } from "./zone-operations";

interface InternalCommandSuccess<G> {
  success: true;
  stateID: number;
  state: MatchState<G>;
  patches: Patch[];
  pendingGameEvents: GameEvent[];
  moveLogEntries: ProjectedLogEntry[];
}

export interface CommandExecutionContext<
  G,
  Moves,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
> {
  state: MatchState<G>;
  config: {
    moves: Moves;
    flow?: RuntimeFlowDefinition<G, TCardDefinition, TCardDerived>;
  };
  actorRole: RuntimeActorRole;
  gameEnded: boolean;
  currentStateID: number;
  buildValidationContext: (
    playerId: string,
    input: MoveInput,
    validationMode: "preflight" | "final",
  ) => MoveValidationContext<G, TCardDefinition, MoveInput, TCardDerived>;
  buildExecutionContext: (
    draft: Draft<MatchState<G>>,
    playerId: string,
    input: MoveInput,
    endGameTracker: { ended: boolean; result?: GameEndResult },
    emitGameEvent: (event: GameEvent) => void,
    moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  ) => MoveExecutionContext<G, TCardDefinition, MoveInput, TCardDerived>;
  buildLifecycleContext: (
    draft: Draft<MatchState<G>>,
    playerId: string | undefined,
    gameEnded: boolean,
    emitGameEvent: (event: GameEvent) => void,
    endGameTracker: { ended: boolean; result?: GameEndResult },
    moveLogSink?: (entries: readonly ProjectedLogEntry[]) => void,
  ) => RuntimeLifecycleContext<G, TCardDefinition, TCardDerived>;
}

export function executeCommand<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition,
  TCardDerived extends object = {},
>(
  command: {
    commandID?: string;
    move: string;
    input?: MoveInput;
    redactInput?: boolean;
  },
  playerId: string,
  prevStateID: number,
  timestamp: number,
  ctx: CommandExecutionContext<G, Moves, TCardDefinition, TCardDerived>,
): {
  result: InternalCommandSuccess<G> | CommandFailure;
  newState: MatchState<G>;
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
    actorRole: ctx.actorRole,
    gameEnded: ctx.gameEnded,
    currentStateID: ctx.currentStateID,
    buildValidationContext: ctx.buildValidationContext,
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
        const executionContext = ctx.buildExecutionContext(
          draft,
          actingPlayerId,
          commandInput,
          endGameTracker,
          (event) => {
            pendingGameEvents.push(event);
          },
          (entries) => {
            moveLogEntries.push(...entries);
          },
        );

        // Step 5: Execute the move reducer
        moveDef.execute(executionContext);

        // Step 7: Resolve flow events
        resolveFlowTransitionsOnDraft(
          draft,
          ctx.config.flow,
          (draftState, lifecycleGameEnded, lifecyclePlayerId) =>
            ctx.buildLifecycleContext(
              draftState,
              lifecyclePlayerId,
              lifecycleGameEnded,
              (event) => {
                pendingGameEvents.push(event);
              },
              endGameTracker,
              (entries) => {
                moveLogEntries.push(...entries);
              },
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
