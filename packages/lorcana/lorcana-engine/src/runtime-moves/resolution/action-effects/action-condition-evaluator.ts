import type { Condition } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import {
  evaluateCondition,
  type ConditionEvaluationContext,
} from "../../../rules/condition-evaluator";

export function evaluateActionCondition(
  condition: Condition | undefined,
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  resolutionInput: ActionResolutionInput,
): boolean {
  if (!condition) {
    return true;
  }

  const evaluationContext: ConditionEvaluationContext = {
    framework: ctx.framework as any,
    cards: ctx.cards as any,
    G: ctx.G,
    playerId: cardPlayed.playerId,
    sourceCardId: cardPlayed.cardId,
    cardPlayed,
    resolutionInput,
  };

  return evaluateCondition(condition, evaluationContext);
}
