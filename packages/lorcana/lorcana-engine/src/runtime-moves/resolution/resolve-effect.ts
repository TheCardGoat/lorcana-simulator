import type { CardInstanceId, PlayerId, RuntimeValidationResult } from "#core";
import { createLorcanaLogMessage, type LorcanaMoveDefinition } from "../../types";
import type { PendingActionEffect, PendingActionResolutionInput } from "../../types";
import type { LogTargetId } from "../../types/log-messages";
import { resolveActionEffect } from "./action-effects/composed-effect-resolver";
import { isScryEffect, validateScrySelection } from "./action-effects/scry-effect";
import { resolveRecordedVanishTargets } from "./action-effects/vanish";
import {
  clearPendingActionChoice,
  enqueuePendingActionEffect,
  finalizeResolvedActionCard,
  mergeActionResolutionInput,
  removePendingActionEffect,
  createPendingActionEffect,
} from "./action-effects/pending-action-effects";
import { flushTriggeredEventsToBag, hasPendingBagItems } from "../effects/triggered-abilities";
import { continuePendingChallengeResolution } from "../moves/core/challenge";
import { continuePendingTurnTransition } from "../moves/turn/pass-turn";
import {
  formatLorcanaPlayerLabel,
  getLorcanaCardName,
  traceLorcanaRuntimeStep,
} from "../../runtime-trace";
import {
  clearCurrentSelectionTargets,
  getCurrentSelectionInput,
  getCurrentSelectionTargets,
  promoteCurrentSelectionTargetsToContext,
  withCurrentSelectionTargets,
} from "./action-effects/selection-state";
import {
  buildMissingTargetSelectionError,
  countExplicitTargetSelections,
  hasExplicitTargetSelectionInput,
} from "../../targeting/runtime";

type ResolveEffectValidationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"resolveEffect">["validate"]>
>[0];

type ResolveEffectExecutionContext = Parameters<
  LorcanaMoveDefinition<"resolveEffect">["execute"]
>[0];

type ResolveEffectEnumerationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"resolveEffect">["available"]>
>[0];

function toLogTargetId(value: string): LogTargetId {
  return value as LogTargetId;
}

function normalizeResolveEffectTargets(
  targets:
    | PendingActionResolutionInput["currentTargets"]
    | PendingActionResolutionInput["targets"]
    | undefined,
): LogTargetId[] {
  if (typeof targets === "string") {
    return [toLogTargetId(targets)];
  }

  if (Array.isArray(targets)) {
    return targets
      .filter((target): target is string => typeof target === "string")
      .map(toLogTargetId);
  }

  return [];
}

function countResolvedTargets(
  targets:
    | PendingActionResolutionInput["currentTargets"]
    | PendingActionResolutionInput["targets"]
    | undefined,
): number {
  if (typeof targets === "string") {
    return targets.length > 0 ? 1 : 0;
  }

  if (Array.isArray(targets)) {
    return targets.filter(
      (target): target is string => typeof target === "string" && target.length > 0,
    ).length;
  }

  return 0;
}

function countContinuationContextTargets(
  pendingEffect: PendingActionEffect,
  resolutionInput: PendingActionResolutionInput,
): number {
  return pendingEffect.kind === "target-selection"
    ? countResolvedTargets(getCurrentSelectionInput(resolutionInput))
    : 0;
}

function buildContinuationResolutionInput(
  pendingEffect: PendingActionEffect,
  resolutionInput: PendingActionResolutionInput,
): PendingActionResolutionInput {
  // Clear resolveOptional from the continuation input so that an optional
  // acceptance/decline from the current pending effect does not bleed into
  // subsequent optional effects in the continuation sequence.
  const inputWithoutOptional: PendingActionResolutionInput =
    resolutionInput.resolveOptional !== undefined
      ? { ...resolutionInput, resolveOptional: undefined }
      : resolutionInput;

  if (pendingEffect.kind === "target-selection") {
    return promoteCurrentSelectionTargetsToContext(inputWithoutOptional);
  }

  if (countResolvedTargets(getCurrentSelectionInput(inputWithoutOptional)) > 0) {
    return promoteCurrentSelectionTargetsToContext(inputWithoutOptional);
  }

  return clearCurrentSelectionTargets(inputWithoutOptional);
}

function logResolveEffectMessage(
  ctx: ResolveEffectExecutionContext,
  pendingEffect: PendingActionEffect,
  resolutionInput: PendingActionResolutionInput,
): void {
  const common = {
    playerId: pendingEffect.chooserId,
    sourceCardId: pendingEffect.sourceCardId,
  };

  const defaultMessage = (() => {
    switch (pendingEffect.kind) {
      case "discard-choice":
        return createLorcanaLogMessage("lorcana.effect.resolve.discardChoice", {
          ...common,
          targets: normalizeResolveEffectTargets(getCurrentSelectionInput(resolutionInput)),
        });
      case "target-selection":
        return createLorcanaLogMessage("lorcana.effect.resolve.targetSelection", {
          ...common,
          targets: normalizeResolveEffectTargets(getCurrentSelectionInput(resolutionInput)),
        });
      case "choice-selection":
        return createLorcanaLogMessage("lorcana.effect.resolve.choiceSelection", {
          ...common,
          choiceIndex: (resolutionInput.choiceIndex ?? 0) + 1,
        });
      case "optional-selection":
        return resolutionInput.resolveOptional
          ? createLorcanaLogMessage("lorcana.effect.resolve.optionalSelection.accepted", common)
          : createLorcanaLogMessage("lorcana.effect.resolve.optionalSelection.rejected", common);
      case "name-card-selection":
        return createLorcanaLogMessage("lorcana.effect.resolve.nameCardSelection", {
          ...common,
          namedCard: resolutionInput.namedCard ?? "",
        });
      case "scry-selection":
        return createLorcanaLogMessage("lorcana.effect.resolve.scrySelection", common);
      default:
        return assertNever(pendingEffect.kind);
    }
  })();

  ctx.framework.log({
    category: "action",
    visibility: { mode: "PUBLIC" },
    defaultMessage,
  });
}

function isValidActionResolutionAmount(value: unknown): boolean {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0;
  }

  if (typeof value === "string") {
    return value.length > 0;
  }

  return typeof value === "object" && value !== null;
}

function isValidTargetInput(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  if (typeof value === "string") {
    return value.length > 0;
  }

  return Array.isArray(value) && value.every((entry) => typeof entry === "string");
}

function isValidDestinations(value: unknown): boolean {
  if (value === undefined) {
    return true;
  }

  if (!Array.isArray(value)) {
    return false;
  }

  return value.every((destination) => {
    if (!destination || typeof destination !== "object" || Array.isArray(destination)) {
      return false;
    }

    const record = destination as Record<string, unknown>;
    if (typeof record.zone !== "string" || record.zone.length === 0) {
      return false;
    }

    if (typeof record.cards === "string") {
      return record.cards.length > 0;
    }

    return (
      Array.isArray(record.cards) && record.cards.every((cardId) => typeof cardId === "string")
    );
  });
}

function normalizeResolveEffectParams(params: unknown): PendingActionResolutionInput {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return {};
  }

  const record = params as Record<string, unknown>;
  const normalized: PendingActionResolutionInput = {};

  if (record.amount !== undefined) {
    normalized.amount = record.amount as PendingActionResolutionInput["amount"];
  }
  if (typeof record.namedCard === "string" && record.namedCard.trim().length > 0) {
    normalized.namedCard = record.namedCard.trim();
  }

  if (typeof record.choiceIndex === "number" && Number.isInteger(record.choiceIndex)) {
    normalized.choiceIndex = record.choiceIndex;
  }

  if (Array.isArray(record.destinations)) {
    normalized.destinations = record.destinations as PendingActionResolutionInput["destinations"];
  }

  if (typeof record.resolveOptional === "boolean") {
    normalized.resolveOptional = record.resolveOptional;
  }

  if (record.targets !== undefined && isValidTargetInput(record.targets)) {
    normalized.currentTargets = record.targets as PendingActionResolutionInput["currentTargets"];
    normalized.targets = record.targets as PendingActionResolutionInput["targets"];
  }

  if (
    normalized.resolveOptional === undefined &&
    (normalized.choiceIndex !== undefined ||
      normalized.namedCard !== undefined ||
      normalized.destinations !== undefined ||
      normalized.targets !== undefined ||
      normalized.currentTargets !== undefined ||
      normalized.amount !== undefined)
  ) {
    normalized.resolveOptional = true;
  }

  return normalized;
}

function getPendingEffect(
  ctx:
    | ResolveEffectValidationContext
    | ResolveEffectExecutionContext
    | ResolveEffectEnumerationContext,
  effectId: string,
): PendingActionEffect | undefined {
  const pendingEffects = ctx.G.pendingEffects ?? [];
  return pendingEffects.find((effect) => effect.id === effectId) as PendingActionEffect | undefined;
}

function validatePendingEffectParams(
  ctx: ResolveEffectValidationContext,
  pendingEffect: PendingActionEffect,
  params: unknown,
): RuntimeValidationResult {
  if (!params || typeof params !== "object" || Array.isArray(params)) {
    return {
      valid: false,
      error: "resolveEffect params must be an object",
      errorCode: "INVALID_RESOLVE_EFFECT_PARAMS",
    };
  }

  const record = params as Record<string, unknown>;
  if (!isValidTargetInput(record.targets)) {
    return {
      valid: false,
      error: "resolveEffect targets must be a card id or an array of card ids",
      errorCode: "INVALID_RESOLVE_EFFECT_TARGETS",
    };
  }
  if (record.amount !== undefined && !isValidActionResolutionAmount(record.amount)) {
    return {
      valid: false,
      error: "resolveEffect amount must be a valid Amount value",
      errorCode: "INVALID_RESOLVE_EFFECT_AMOUNT",
    };
  }
  if (
    record.choiceIndex !== undefined &&
    (typeof record.choiceIndex !== "number" ||
      !Number.isInteger(record.choiceIndex) ||
      record.choiceIndex < 0)
  ) {
    return {
      valid: false,
      error: "resolveEffect choiceIndex must be a non-negative integer",
      errorCode: "INVALID_RESOLVE_EFFECT_CHOICE_INDEX",
    };
  }
  if (record.resolveOptional !== undefined && typeof record.resolveOptional !== "boolean") {
    return {
      valid: false,
      error: "resolveEffect resolveOptional must be a boolean",
      errorCode: "INVALID_RESOLVE_EFFECT_OPTIONAL",
    };
  }
  if (!isValidDestinations(record.destinations)) {
    return {
      valid: false,
      error: "resolveEffect destinations must be a valid destination array",
      errorCode: "INVALID_RESOLVE_EFFECT_DESTINATIONS",
    };
  }

  const normalizedParams = normalizeResolveEffectParams(params);
  const normalizedTargets = normalizedParams.targets;
  const hasExplicitTargets = hasExplicitTargetSelectionInput(normalizedTargets);
  const explicitTargetCount = countExplicitTargetSelections(normalizedTargets);
  const selectionContext =
    pendingEffect.selectionContext?.kind === pendingEffect.kind
      ? pendingEffect.selectionContext
      : undefined;
  const targetSelectionContext =
    selectionContext?.kind === "discard-choice" || selectionContext?.kind === "target-selection"
      ? selectionContext
      : undefined;

  if (pendingEffect.kind === "discard-choice" || pendingEffect.kind === "target-selection") {
    if (!hasExplicitTargets) {
      return {
        valid: false,
        error: buildMissingTargetSelectionError("resolveEffect", pendingEffect.effect),
        errorCode: "RESOLVE_EFFECT_TARGETS_REQUIRED",
      };
    }

    if ((targetSelectionContext?.minSelections ?? 1) > 0 && explicitTargetCount === 0) {
      return {
        valid: false,
        error: "resolveEffect requires at least 1 explicit target for this pending effect",
        errorCode: "RESOLVE_EFFECT_TARGETS_REQUIRED",
      };
    }
  }

  if (pendingEffect.kind === "choice-selection" && normalizedParams.choiceIndex === undefined) {
    return {
      valid: false,
      error: "resolveEffect requires choiceIndex for this pending effect",
      errorCode: "RESOLVE_EFFECT_CHOICE_REQUIRED",
    };
  }

  if (
    pendingEffect.kind === "optional-selection" &&
    normalizedParams.resolveOptional === undefined
  ) {
    return {
      valid: false,
      error: "resolveEffect requires resolveOptional for this pending effect",
      errorCode: "RESOLVE_EFFECT_OPTIONAL_REQUIRED",
    };
  }

  if (pendingEffect.kind === "scry-selection" && !Array.isArray(normalizedParams.destinations)) {
    return {
      valid: false,
      error: "resolveEffect requires destinations for this pending effect",
      errorCode: "RESOLVE_EFFECT_DESTINATIONS_REQUIRED",
    };
  }

  if (
    pendingEffect.kind === "name-card-selection" &&
    (typeof record.namedCard !== "string" || record.namedCard.trim().length === 0)
  ) {
    return {
      valid: false,
      error: "resolveEffect requires namedCard for this pending effect",
      errorCode: "RESOLVE_EFFECT_NAMED_CARD_REQUIRED",
    };
  }

  if (pendingEffect.kind === "scry-selection" && isScryEffect(pendingEffect.effect)) {
    const normalizedParams = normalizeResolveEffectParams(params);
    const scryValidation = validateScrySelection(
      ctx,
      pendingEffect.cardPlayed,
      pendingEffect.effect,
      {
        destinations: normalizedParams.destinations,
        lookedAtCards: pendingEffect.resolutionInput.eventSnapshot?.revealedCardIds,
        revealWindowIds: pendingEffect.resolutionInput.eventSnapshot?.revealWindowIds,
        scryAmount: pendingEffect.resolutionInput.eventSnapshot?.revealedCardIds?.length,
      },
    );

    if (!scryValidation.valid) {
      return scryValidation;
    }
  }

  return { valid: true };
}

export const resolveEffect: LorcanaMoveDefinition<"resolveEffect"> = {
  ignorePriority: true,

  validate: (ctx): RuntimeValidationResult => {
    const effectId = ctx.args.effectId;
    if (typeof effectId !== "string" || effectId.length === 0) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveEffect",
        playerId: ctx.playerId,
        effectId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveEffect (RESOLVE_EFFECT_ID_REQUIRED)`,
        payload: {
          error: "resolveEffect requires a valid effect id",
          errorCode: "RESOLVE_EFFECT_ID_REQUIRED",
        },
      });
      return {
        valid: false,
        error: "resolveEffect requires a valid effect id",
        errorCode: "RESOLVE_EFFECT_ID_REQUIRED",
      };
    }

    const pendingChoice = ctx.framework.state.priority.pendingChoice;
    if (!pendingChoice || pendingChoice.requestID !== effectId) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveEffect",
        playerId: ctx.playerId,
        effectId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveEffect (RESOLVE_EFFECT_NOT_PENDING)`,
        payload: {
          error: "No matching pending effect is available to resolve",
          errorCode: "RESOLVE_EFFECT_NOT_PENDING",
        },
      });
      return {
        valid: false,
        error: "No matching pending effect is available to resolve",
        errorCode: "RESOLVE_EFFECT_NOT_PENDING",
      };
    }

    const pendingEffect = getPendingEffect(ctx, effectId);
    if (!pendingEffect) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveEffect",
        playerId: ctx.playerId,
        effectId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveEffect (RESOLVE_EFFECT_NOT_FOUND)`,
        payload: {
          error: "Pending effect payload was not found",
          errorCode: "RESOLVE_EFFECT_NOT_FOUND",
        },
      });
      return {
        valid: false,
        error: "Pending effect payload was not found",
        errorCode: "RESOLVE_EFFECT_NOT_FOUND",
      };
    }

    const actorId = ctx.playerId;
    if (!actorId || actorId !== pendingChoice.playerID || actorId !== pendingEffect.chooserId) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveEffect",
        playerId: ctx.playerId,
        effectId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveEffect (RESOLVE_EFFECT_WRONG_PLAYER)`,
        payload: {
          error: "Only the pending chooser may resolve this effect",
          errorCode: "RESOLVE_EFFECT_WRONG_PLAYER",
        },
      });
      return {
        valid: false,
        error: "Only the pending chooser may resolve this effect",
        errorCode: "RESOLVE_EFFECT_WRONG_PLAYER",
      };
    }

    if (ctx.validationMode === "preflight" && ctx.args.params === undefined) {
      return { valid: true };
    }

    const validationResult = validatePendingEffectParams(ctx, pendingEffect, ctx.args.params);
    if (!validationResult.valid) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveEffect",
        playerId: ctx.playerId,
        effectId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveEffect (${validationResult.errorCode ?? "RESOLVE_EFFECT_INVALID"})`,
        payload: {
          error: validationResult.error ?? "resolveEffect validation failed",
          errorCode: validationResult.errorCode ?? "RESOLVE_EFFECT_INVALID",
        },
      });
      return validationResult;
    }

    return validationResult;
  },

  execute: (ctx) => {
    const effectId = ctx.args.effectId;
    const pendingEffect = removePendingActionEffect(ctx, effectId);
    if (!pendingEffect) {
      return;
    }

    const sourceCardName = getLorcanaCardName(pendingEffect.sourceCardId, (cardId) =>
      ctx.cards.getDefinition(cardId),
    );
    traceLorcanaRuntimeStep({
      kind: "effect.resolution.started",
      moveId: "resolveEffect",
      playerId: pendingEffect.chooserId,
      effectId,
      cardId: pendingEffect.sourceCardId,
      cardName: sourceCardName,
      message: "Effect goes to resolution",
    });

    clearPendingActionChoice(ctx);

    const normalizedParams = normalizeResolveEffectParams(ctx.args.params);
    const resolutionInput =
      normalizedParams.currentTargets !== undefined
        ? withCurrentSelectionTargets(
            mergeActionResolutionInput(pendingEffect.resolutionInput, normalizedParams),
            getCurrentSelectionTargets(normalizedParams),
          )
        : mergeActionResolutionInput(pendingEffect.resolutionInput, normalizedParams);
    let replayStagedSequence = pendingEffect.continuation?.stagedSequence;

    if (pendingEffect.continuation?.stagedSequence) {
      const collectedTargets = getCurrentSelectionTargets(resolutionInput);
      const combinedTargets = [
        ...pendingEffect.continuation.stagedSequence.collectedTargets,
        ...collectedTargets,
      ];
      const combinedTargetCounts = [
        ...pendingEffect.continuation.stagedSequence.collectedTargetCounts,
        collectedTargets.length,
      ];
      const [nextStep, ...remainingSteps] =
        pendingEffect.continuation.stagedSequence.remainingSteps;

      if (nextStep) {
        const stagedPendingEffect = createPendingActionEffect(ctx, {
          kind: "target-selection",
          sourceCardId: pendingEffect.sourceCardId,
          controllerId: pendingEffect.controllerId,
          chooserId: pendingEffect.chooserId,
          cardPlayed: pendingEffect.cardPlayed,
          effect: nextStep,
          continuation: {
            ...(pendingEffect.continuation.remainingEffects
              ? { remainingEffects: [...pendingEffect.continuation.remainingEffects] }
              : {}),
            stagedSequence: {
              sequenceEffect: pendingEffect.continuation.stagedSequence.sequenceEffect,
              collectedTargets: combinedTargets,
              collectedTargetCounts: combinedTargetCounts,
              remainingSteps,
            },
          },
          resolutionInput: {
            ...clearCurrentSelectionTargets(pendingEffect.resolutionInput),
          },
        });
        enqueuePendingActionEffect(ctx, stagedPendingEffect);
        logResolveEffectMessage(ctx, pendingEffect, resolutionInput);

        traceLorcanaRuntimeStep({
          kind: "effect.resolution.suspended",
          moveId: "resolveEffect",
          playerId: pendingEffect.chooserId,
          effectId,
          cardId: pendingEffect.sourceCardId,
          cardName: sourceCardName,
          message: "Effect resolution is waiting for further input",
        });
        return;
      }

      resolutionInput.currentTargets = undefined;
      resolutionInput.targets = undefined;
      replayStagedSequence = {
        sequenceEffect: pendingEffect.continuation.stagedSequence.sequenceEffect,
        collectedTargets: combinedTargets,
        collectedTargetCounts: combinedTargetCounts,
        remainingSteps: [],
      };
    }

    const result = resolveActionEffect(
      ctx,
      pendingEffect.cardPlayed,
      replayStagedSequence?.sequenceEffect ?? pendingEffect.effect,
      resolutionInput,
      {
        allowPromptForExistingChosenTargets: true,
        continuation: replayStagedSequence
          ? {
              ...(pendingEffect.continuation?.remainingEffects
                ? { remainingEffects: pendingEffect.continuation.remainingEffects }
                : {}),
              stagedSequence: replayStagedSequence,
            }
          : pendingEffect.continuation,
      },
    );
    logResolveEffectMessage(ctx, pendingEffect, resolutionInput);

    if (result.status === "suspended") {
      traceLorcanaRuntimeStep({
        kind: "effect.resolution.suspended",
        moveId: "resolveEffect",
        playerId: pendingEffect.chooserId,
        effectId,
        cardId: pendingEffect.sourceCardId,
        cardName: sourceCardName,
        message: "Effect resolution is waiting for further input",
      });
      return;
    }

    const remainingEffects = pendingEffect.continuation?.remainingEffects ?? [];
    if (remainingEffects.length === 0) {
      resolveRecordedVanishTargets(ctx, pendingEffect.cardPlayed, resolutionInput);
      finalizeResolvedActionCard(ctx, pendingEffect.cardPlayed);
      traceLorcanaRuntimeStep({
        kind: "effect.resolution.completed",
        moveId: "resolveEffect",
        playerId: pendingEffect.chooserId,
        effectId,
        cardId: pendingEffect.sourceCardId,
        cardName: sourceCardName,
        message: "Effect resolution completes",
      });
      flushTriggeredEventsToBag(ctx);
      if (ctx.G.pendingTurnTransition && !hasPendingBagItems(ctx)) {
        continuePendingTurnTransition(ctx);
      } else if (ctx.G.challengeState && !hasPendingBagItems(ctx)) {
        continuePendingChallengeResolution(ctx);
      }
      return;
    }

    const continuationResult = resolveActionEffect(
      ctx,
      pendingEffect.cardPlayed,
      {
        type: "sequence",
        steps: remainingEffects,
      },
      buildContinuationResolutionInput(pendingEffect, resolutionInput),
      {
        allowPromptForExistingChosenTargets: true,
      },
    );
    if (continuationResult.status === "suspended") {
      traceLorcanaRuntimeStep({
        kind: "effect.resolution.suspended",
        moveId: "resolveEffect",
        playerId: pendingEffect.chooserId,
        effectId,
        cardId: pendingEffect.sourceCardId,
        cardName: sourceCardName,
        message: "Effect resolution is waiting for further input",
      });
      return;
    }

    resolveRecordedVanishTargets(ctx, pendingEffect.cardPlayed, resolutionInput);
    finalizeResolvedActionCard(ctx, pendingEffect.cardPlayed);
    traceLorcanaRuntimeStep({
      kind: "effect.resolution.completed",
      moveId: "resolveEffect",
      playerId: pendingEffect.chooserId,
      effectId,
      cardId: pendingEffect.sourceCardId,
      cardName: sourceCardName,
      message: "Effect resolution completes",
    });
    flushTriggeredEventsToBag(ctx);

    if (ctx.G.pendingTurnTransition && !hasPendingBagItems(ctx)) {
      continuePendingTurnTransition(ctx);
    } else if (ctx.G.challengeState && !hasPendingBagItems(ctx)) {
      continuePendingChallengeResolution(ctx);
    }
  },

  available: (ctx) => {
    const pendingChoice = ctx.framework.state.priority.pendingChoice;
    if (!pendingChoice || ctx.playerId !== pendingChoice.playerID) {
      return false;
    }

    const pendingEffect = getPendingEffect(ctx, pendingChoice.requestID);
    if (!pendingEffect || pendingEffect.chooserId !== ctx.playerId) {
      return false;
    }

    // Note: Target validation for resolveEffect happens internally via validatePendingEffectParams
    // because targets are nested inside params.targets, not at the top level of args.
    // The core engine's target intent system doesn't support nested paths like "params.targets".
    return true;
  },
};

function assertNever(value: never): never {
  throw new Error(`Unhandled pending action effect kind: ${String(value)}`);
}
