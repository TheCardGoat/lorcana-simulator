import type { ConditionalEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type {
  ActionEffectResolutionOptions,
  ActionResolutionInput,
  ActionResolutionResult,
  PlayCardExecutionContext,
} from "./types";
import { evaluateActionCondition } from "./action-condition-evaluator";

export function isConditionalEffect(effect: unknown): effect is ConditionalEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "conditional"
  );
}

export function resolveConditionalEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ConditionalEffect,
  resolutionInput: ActionResolutionInput,
  resolveNestedEffect: (
    ctx: PlayCardExecutionContext,
    cardPlayed: CardPlayedPayload,
    effect: unknown,
    resolutionInput: ActionResolutionInput,
    options?: ActionEffectResolutionOptions,
  ) => ActionResolutionResult,
  options?: ActionEffectResolutionOptions,
): ActionResolutionResult {
  const conditionMet = evaluateActionCondition(effect.condition, ctx, cardPlayed, resolutionInput);
  const thenEffect = effect.then ?? effect.effect ?? effect.ifTrue;
  const elseEffect = effect.else ?? effect.ifFalse;
  const nextEffect = conditionMet ? thenEffect : elseEffect;

  if (nextEffect) {
    return resolveNestedEffect(ctx, cardPlayed, nextEffect, resolutionInput, options);
  }

  return { status: "resolved" };
}
