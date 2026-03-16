import type { RuntimeValidationResult } from "#core";
import { createLorcanaLogMessage, type LorcanaMoveDefinition } from "../../types";
import type { LogTargetId } from "../../types/log-messages";
import type { PendingActionEffect, PendingActionResolutionInput } from "../../types";
import { resolveActionEffect } from "./action-effects/composed-effect-resolver";
import { resolveRecordedVanishTargets } from "./action-effects/vanish";
import {
  clearPendingActionChoice,
  finalizeResolvedActionCard,
  mergeActionResolutionInput,
  removePendingActionEffect,
} from "./action-effects/pending-action-effects";
import { flushTriggeredEventsToBag, hasPendingBagItems } from "../effects/triggered-abilities";
import { continuePendingChallengeResolution } from "../moves/core/challenge";
import { continuePendingTurnTransition } from "../moves/turn/pass-turn";
import {
  formatLorcanaPlayerLabel,
  getLorcanaCardName,
  traceLorcanaRuntimeStep,
} from "../../runtime-trace";

type ResolveEffectValidationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"resolveEffect">["validate"]>
>[0];

type ResolveEffectExecutionContext = Parameters<
  LorcanaMoveDefinition<"resolveEffect">["execute"]
>[0];

type ResolveEffectEnumerationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"resolveEffect">["available"]>
>[0];

function normalizeResolveEffectTargets(
  targets: PendingActionResolutionInput["targets"],
): LogTargetId[] | undefined {
  if (typeof targets === "string") {
    return [toLogTargetId(targets)];
  }

  if (Array.isArray(targets)) {
    return targets
      .filter((target): target is string => typeof target === "string")
      .map(toLogTargetId);
  }

  return undefined;
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
  const targets = normalizeResolveEffectTargets(resolutionInput.targets);

  const defaultMessage = (() => {
    switch (pendingEffect.kind) {
      case "discard-choice":
        return createLorcanaLogMessage("lorcana.effect.resolve.discardChoice", {
          ...common,
          targets: targets ?? [],
        });
      case "target-selection":
        return createLorcanaLogMessage("lorcana.effect.resolve.targetSelection", {
          ...common,
          targets: targets ?? [],
        });
      case "choice-selection":
        return createLorcanaLogMessage("lorcana.effect.resolve.choiceSelection", {
          ...common,
          choiceIndex: (resolutionInput.choiceIndex ?? 0) + 1,
        });
      case "optional-selection":
        return createLorcanaLogMessage(
          resolutionInput.resolveOptional === false
            ? "lorcana.effect.resolve.optionalSelection.rejected"
            : "lorcana.effect.resolve.optionalSelection.accepted",
          common,
        );
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
      Array.isArray(record.cards) &&
      record.cards.length > 0 &&
      record.cards.every((cardId) => typeof cardId === "string")
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
    normalized.targets = record.targets as PendingActionResolutionInput["targets"];
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

  const normalizedTargets = normalizeResolveEffectParams(params).targets;
  const hasTargets =
    typeof normalizedTargets === "string" ||
    (Array.isArray(normalizedTargets) && normalizedTargets.length > 0);

  if (
    (pendingEffect.kind === "discard-choice" || pendingEffect.kind === "target-selection") &&
    !hasTargets
  ) {
    return {
      valid: false,
      error: "resolveEffect requires at least one target for this pending effect",
      errorCode: "RESOLVE_EFFECT_TARGETS_REQUIRED",
    };
  }

  if (pendingEffect.kind === "choice-selection" && record.choiceIndex === undefined) {
    return {
      valid: false,
      error: "resolveEffect requires choiceIndex for this pending effect",
      errorCode: "RESOLVE_EFFECT_CHOICE_REQUIRED",
    };
  }

  if (pendingEffect.kind === "optional-selection" && record.resolveOptional === undefined) {
    return {
      valid: false,
      error: "resolveEffect requires resolveOptional for this pending effect",
      errorCode: "RESOLVE_EFFECT_OPTIONAL_REQUIRED",
    };
  }

  if (pendingEffect.kind === "scry-selection" && !Array.isArray(record.destinations)) {
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

    const pendingChoice = ctx.framework.state.ctx.priority.pendingChoice;
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

    const validationResult = validatePendingEffectParams(pendingEffect, ctx.args.params);
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

    const resolutionInput = mergeActionResolutionInput(
      pendingEffect.resolutionInput,
      normalizeResolveEffectParams(ctx.args.params),
    );
    logResolveEffectMessage(ctx, pendingEffect, resolutionInput);

    const result = resolveActionEffect(
      ctx,
      pendingEffect.cardPlayed,
      pendingEffect.effect,
      resolutionInput,
      {
        continuation: pendingEffect.continuation,
      },
    );
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
      resolutionInput,
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
    const pendingChoice = ctx.framework.state.ctx.priority.pendingChoice;
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
  throw new Error(`Unhandled pending effect kind: ${String(value)}`);
}

function toLogTargetId(value: string): LogTargetId {
  return value as LogTargetId;
}
