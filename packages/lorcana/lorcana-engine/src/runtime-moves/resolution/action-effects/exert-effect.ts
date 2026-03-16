import type { ExertEffect } from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import {
  normalizeSelectedTargets,
  normalizeTargetDescriptor,
  resolveCandidateTargets,
  selectTargets,
} from "../../../targeting/runtime";

export function isExertEffect(effect: unknown): effect is ExertEffect {
  return (
    typeof effect === "object" &&
    effect !== null &&
    "type" in effect &&
    (effect as { type?: unknown }).type === "exert"
  );
}

export function resolveExertEffect(
  ctx: PlayCardExecutionContext,
  cardPlayed: CardPlayedPayload,
  effect: ExertEffect,
  resolutionInput: ActionResolutionInput,
): void {
  const descriptor = normalizeTargetDescriptor(effect.target);
  const selectedTargets = normalizeSelectedTargets(resolutionInput.targets);
  const candidates = resolveCandidateTargets(ctx, cardPlayed, descriptor);
  const targets = selectTargets(candidates, descriptor, selectedTargets);

  for (const targetId of targets) {
    ctx.cards.patchMeta(targetId, { state: "exerted" });
  }
}
