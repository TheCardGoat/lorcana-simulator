import type {
  CardInstanceId,
  MoveEnumerationContext,
  MoveExecutionContext,
  MoveInput,
  MoveValidationContext,
  PlayerId,
} from "#core";
import {
  hasReturnFromDiscardCandidates,
  isReturnFromDiscardEffect,
} from "../../runtime-moves/resolution/action-effects/return-from-discard-effect";
import { analyzeEffectTargets } from "./target-analysis";
import { analyzeTargetSelectionAvailabilityFromAnalysis } from "./target-availability";
import {
  normalizeTargetDescriptor,
  passesFilter,
  resolveCandidateTargets,
} from "./target-resolver";

export type OptionalSkipContext = Pick<
  MoveValidationContext<MoveInput> | MoveEnumerationContext,
  "framework" | "cards"
>;

// hasReturnFromDiscardCandidates requires FrameworkWriteAPI (from MoveExecutionContext),
// but only reads from it (getCards). Both callers provide the full runtime object at
// runtime — the TypeScript type is just narrowed to a read-only view.
type HasReturnFromDiscardCtx = Pick<MoveExecutionContext<never>, "framework" | "cards">;

/**
 * Returns true if a triggered ability's effect should be silently skipped because
 * its target-requiring step has no valid candidates on the current board.
 *
 * Used at two call sites:
 *  - Trigger-fire time (triggered-abilities/index.ts): suppress bag entries before they are created
 *  - Bag-decision time (lorcana-engine-base.ts): auto-resolve bag entries without prompting the player
 *
 * Both call sites share this implementation so the skip conditions are always identical.
 *
 * Handles three patterns:
 *
 * 1. `optional { effect }` — skip if the inner effect has no valid targets.
 *
 * 2. `optional { sequence { [mandatory-first-step, ...] } }` — skip if the first step of the
 *    inner sequence is a return-from-discard effect with no valid discard candidates, or a discard
 *    effect with filters and no matching hand cards. Other first-step patterns return `false`.
 *
 * 3. `sequence { [mandatory-first-step, ...] }` (no optional wrapper) — skip if the first step
 *    is a return-from-discard with no valid discard candidates. The whole sequence fizzles when
 *    the first step has nothing to act on.
 *
 * Mill sequences are intentionally not skipped here: mill does not require explicit target
 * selection in this helper's analysis model, and resolving as much of the mill as possible is
 * treated as best-effort rather than a reason to suppress the whole effect up front.
 *
 * Effects with owner:"any" targets are excluded from generic analysis: the analysis context
 * may not enumerate both players' cards correctly during opponent action resolution.
 *
 * Note: effects with `chosenBy: "opponent"` are NOT handled here — those are mandatory effects
 * where the opponent picks the target via a pendingEffect. They have `canAutoResolve = true` in
 * `analyzeResolutionRequirements`, so `bagEffectNeedsPlayerDecision` already returns `false` and
 * the bag drains before this helper is ever consulted. See `resolution-requirements.ts`.
 */
export function shouldSkipEffectWithNoValidTargets(
  effect: unknown,
  playerId: PlayerId,
  ctx: OptionalSkipContext,
  sourceCardId?: CardInstanceId,
): boolean {
  const effectRecord = effect as Record<string, unknown> | null | undefined;
  if (!effectRecord || typeof effectRecord !== "object") return false;

  const effectType = effectRecord.type as string | undefined;

  // --- Mandatory sequence whose first step is return-from-discard ---
  // Skip before creating a bag entry that would immediately fizzle.
  if (effectType === "sequence") {
    return shouldSkipMandatoryReturnFromDiscardSequence(effectRecord, playerId, ctx);
  }

  if (effectType !== "optional") return false;

  const innerEffect = effectRecord.effect;
  if (innerEffect == null) return false;
  const innerRecord = innerEffect as Record<string, unknown>;

  // --- optional → return-from-discard (direct) ---
  if (isReturnFromDiscardEffect(innerEffect)) {
    return !hasReturnFromDiscardCandidates(
      ctx as unknown as HasReturnFromDiscardCtx,
      playerId,
      innerEffect,
    );
  }

  // --- optional → sequence ---
  if (innerRecord.type === "sequence") {
    const steps = Array.isArray(innerRecord.steps) ? innerRecord.steps : [];
    const firstStep = steps[0];
    if (!firstStep || typeof firstStep !== "object") return false;

    // Sequence whose first step is return-from-discard
    if (isReturnFromDiscardEffect(firstStep)) {
      return !hasReturnFromDiscardCandidates(
        ctx as unknown as HasReturnFromDiscardCtx,
        playerId,
        firstStep,
      );
    }

    // Sequence whose first step is a discard-from-hand with filters (e.g. STEALTH MODE)
    const firstStepRecord = firstStep as Record<string, unknown>;
    if (firstStepRecord.type === "discard") {
      return shouldSkipDiscardFirstStep(ctx, playerId, firstStepRecord);
    }

    // Other sequence patterns (mill, draw, etc.): do not skip
    return false;
  }

  // --- Generic analysis for non-sequence, non-return-from-discard optionals ---
  // Skip owner:"any" targets — the analysis context may produce false-zero counts during
  // opponent action resolution (both sides' cards may not be visible simultaneously).
  const innerTarget = innerRecord.target as Record<string, unknown> | undefined;
  if ((innerTarget?.owner as string | undefined) === "any") return false;

  const analysis = analyzeEffectTargets(innerEffect, playerId, ctx, sourceCardId);
  const availability = analyzeTargetSelectionAvailabilityFromAnalysis(innerEffect, analysis);

  if (
    availability.requiresExplicitTargetSelection &&
    !availability.allowsExplicitEmptyTargetSelection &&
    availability.candidateCount === 0
  ) {
    return true;
  }

  // Multi-slot effects (e.g. move-damage with `from` + `to`) report an
  // aggregated candidate count: one slot's valid pool can mask another slot's
  // empty pool. If any individual "chosen" slot has zero candidates, accepting
  // the optional cannot produce a legal selection — force the skip so the bag
  // drains instead of opening an unresolvable picker.
  return hasUnfillableChosenSlot(innerEffect, playerId, ctx, sourceCardId);
}

const CHOSEN_SLOT_KEYS = [
  "target",
  "from",
  "to",
  "character",
  "location",
  "source",
  "under",
  "underTarget",
] as const;

function hasUnfillableChosenSlot(
  effect: unknown,
  playerId: PlayerId,
  ctx: OptionalSkipContext,
  sourceCardId?: CardInstanceId,
): boolean {
  if (!effect || typeof effect !== "object") return false;
  const record = effect as Record<string, unknown>;

  for (const key of CHOSEN_SLOT_KEYS) {
    const raw = record[key];
    if (
      raw === undefined ||
      raw === null ||
      raw === "chosen-for-effect" ||
      (typeof raw === "object" &&
        !Array.isArray(raw) &&
        ("ref" in (raw as object) || "reference" in (raw as object)))
    ) {
      continue;
    }
    const descriptor = normalizeTargetDescriptor(raw);
    if (!descriptor || descriptor.selector !== "chosen") {
      continue;
    }
    const candidates = resolveCandidateTargets(
      ctx as Parameters<typeof resolveCandidateTargets>[0],
      descriptor,
      {
        controllerId: playerId,
        sourceCardId,
      },
    );
    if (candidates.length === 0) {
      return true;
    }
  }

  // For choice effects the player picks one option — only skip if ALL options are unfillable.
  // ChoiceEffect supports both `options` and `choices` alias fields.
  const effectType = record.type as string | undefined;
  if (effectType === "choice") {
    const options = [
      ...(Array.isArray(record.options) ? record.options : []),
      ...(Array.isArray(record.choices) ? record.choices : []),
    ];
    if (options.length === 0) return false;
    return options.every(
      (opt) =>
        !opt ||
        typeof opt !== "object" ||
        hasUnfillableChosenSlot(opt, playerId, ctx, sourceCardId),
    );
  }

  const nested: unknown[] = [
    record.effect,
    ...(Array.isArray(record.effects) ? record.effects : []),
    ...(Array.isArray(record.steps) ? record.steps : []),
    ...(Array.isArray(record.options) ? record.options : []),
    ...(Array.isArray(record.choices) ? record.choices : []),
    record.trueEffect,
    record.falseEffect,
    record.ifTrue,
    record.ifFalse,
    record.then,
    record.else,
  ];
  for (const next of nested) {
    if (next && typeof next === "object") {
      if (hasUnfillableChosenSlot(next, playerId, ctx, sourceCardId)) {
        return true;
      }
    }
  }
  return false;
}

function shouldSkipMandatoryReturnFromDiscardSequence(
  sequenceRecord: Record<string, unknown>,
  playerId: PlayerId,
  ctx: OptionalSkipContext,
): boolean {
  const steps = Array.isArray(sequenceRecord.steps) ? sequenceRecord.steps : [];
  const firstStep = steps[0];
  if (!firstStep || typeof firstStep !== "object") return false;
  if (!isReturnFromDiscardEffect(firstStep)) return false;
  return !hasReturnFromDiscardCandidates(
    ctx as unknown as HasReturnFromDiscardCtx,
    playerId,
    firstStep,
  );
}

function shouldSkipDiscardFirstStep(
  ctx: OptionalSkipContext,
  playerId: PlayerId,
  discardStep: Record<string, unknown>,
): boolean {
  const filters = Array.isArray(discardStep.filters) ? discardStep.filters : [];
  // No filters means any hand card is valid — only skip if hand is completely empty
  if (filters.length === 0) return false;

  const handCards = ctx.framework.zones.getCards({
    zone: "hand",
    playerId,
  }) as CardInstanceId[];

  for (const cardId of handCards) {
    const allPass = filters.every(
      (f) =>
        f &&
        typeof f === "object" &&
        passesFilter(
          ctx as Parameters<typeof passesFilter>[0],
          cardId,
          f as Parameters<typeof passesFilter>[2],
          playerId,
        ),
    );
    if (allPass) return false; // at least one valid discard target exists
  }

  return true; // no valid discard targets — suppress the effect
}
