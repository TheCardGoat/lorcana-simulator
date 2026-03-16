/**
 * MatchRuntime Validation
 *
 * Command validation logic.
 */

import type { MatchState, MoveInput } from "./types";
import type {
  MoveDefinition,
  MoveValidationContext,
  RuntimeActorRole,
  RuntimeFlowDefinition,
} from "./match-runtime.types";
import { isMoveAllowedByFlow, getFlowDisallowReason } from "./match-runtime.flow";
import { canPlayerTakeActions } from "./match-runtime.apis";
import { inferQueryPlayerId } from "./match-runtime.utils";
import type { BaseCardDefinition } from "./card-contracts";

export interface ValidationContext<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
> {
  state: MatchState<G>;
  config: { moves: Moves; flow?: RuntimeFlowDefinition<G, TCardDefinition, TCardDerived> };
  actorRole: RuntimeActorRole;
  gameEnded: boolean;
  currentStateID: number;
  buildValidationContext: (
    playerId: string,
    input: MoveInput,
    validationMode: "preflight" | "final",
  ) => MoveValidationContext<G, TCardDefinition, MoveInput, TCardDerived>;
}

export function validateCommand<
  G,
  Moves extends Record<string, MoveDefinition<G, any, any, any, any>>,
  TCardDefinition extends BaseCardDefinition = BaseCardDefinition,
  TCardDerived extends object = {},
>(
  command: { move: string; input?: MoveInput },
  playerId: string,
  prevStateID: number,
  ctx: ValidationContext<G, Moves, TCardDefinition, TCardDerived>,
): {
  valid: boolean;
  reason?: string;
  code?: string;
  moveDef?: MoveDefinition<G, TCardDefinition, any, any, TCardDerived>;
  actingPlayerId?: string;
} {
  const commandInput = command.input;
  if (!commandInput) {
    return {
      valid: false,
      reason: "Move input was not provided",
      code: "MISSING_INPUT",
    };
  }

  if (prevStateID !== ctx.currentStateID) {
    return {
      valid: false,
      reason: "State ID mismatch - client state is stale",
      code: "STALE_STATE",
    };
  }

  if (ctx.gameEnded || ctx.state.ctx.status.gameEnded) {
    return { valid: false, reason: "Game has already ended", code: "GAME_ENDED" };
  }

  const moveDef = ctx.config.moves[command.move as keyof Moves];
  if (!moveDef) {
    return {
      valid: false,
      reason: `Move '${command.move}' not found`,
      code: "MOVE_NOT_FOUND",
    };
  }

  if (moveDef.serverOnly && ctx.actorRole === "player") {
    return {
      valid: false,
      reason: `Move '${command.move}' is server-only`,
      code: "SERVER_ONLY",
    };
  }

  if (
    !isMoveAllowedByFlow<G, TCardDefinition, TCardDerived>(
      ctx.config.flow,
      ctx.state.ctx.status.phase,
      command.move,
      ctx.state.ctx.status.gameSegment,
    )
  ) {
    return {
      valid: false,
      reason: getFlowDisallowReason<G, TCardDefinition, TCardDerived>(
        ctx.config.flow,
        ctx.state.ctx.status.phase,
        command.move,
        ctx.state.ctx.status.gameSegment,
      ),
      code: "FLOW_DISALLOWED",
    };
  }

  if (!moveDef.serverOnly) {
    const actingPlayerId =
      ctx.actorRole === "player"
        ? playerId
        : (inferQueryPlayerId(ctx.state) ?? ctx.state.ctx.playerIds[0]);

    if (!actingPlayerId) {
      return {
        valid: false,
        reason: "Non-server-only moves require an explicit acting player",
        code: "ACTING_PLAYER_REQUIRED",
      };
    }

    if (!moveDef.ignorePriority && !canPlayerTakeActions(ctx.state, actingPlayerId)) {
      return {
        valid: false,
        reason: `Player '${actingPlayerId}' does not currently have priority`,
        code: "NOT_PRIORITY_HOLDER",
      };
    }

    if (!moveDef.validate) {
      return { valid: true, moveDef, actingPlayerId };
    }

    const validationContext = ctx.buildValidationContext(actingPlayerId, commandInput, "final");
    const validation = moveDef.validate(validationContext);
    if (!validation.valid) {
      return {
        valid: false,
        reason: validation.error,
        code: validation.errorCode || "VALIDATION_FAILED",
      };
    }

    return { valid: true, moveDef, actingPlayerId };
  }

  if (!moveDef.validate) {
    return { valid: true, moveDef, actingPlayerId: playerId };
  }

  const validation = moveDef.validate(ctx.buildValidationContext(playerId, commandInput, "final"));
  if (!validation.valid) {
    return {
      valid: false,
      reason: validation.error,
      code: validation.errorCode || "VALIDATION_FAILED",
    };
  }

  return { valid: true, moveDef, actingPlayerId: playerId };
}
