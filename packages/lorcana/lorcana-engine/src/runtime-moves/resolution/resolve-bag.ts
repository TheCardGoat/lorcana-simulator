import type { RuntimeValidationResult } from "#core";
import { createLorcanaLogMessage, type LorcanaMoveDefinition } from "../../types";
import type { LogTargetId } from "../../types/log-messages";
import { continuePendingChallengeResolution } from "../moves/core/challenge";
import { continuePendingTurnTransition } from "../moves/turn/pass-turn";
import { resolveActionEffect } from "./action-effects/composed-effect-resolver";
import type { ActionResolutionInput } from "./action-effects/types";
import { evaluateActionCondition } from "./action-effects/action-condition-evaluator";
import { cloneActionResolutionInput } from "./action-effects/pending-action-effects";
import {
  canResolveBagEffectByRestrictions,
  flushTriggeredEventsToBag,
  getBagItemsForCurrentResolver,
  getNextBagResolver,
  hasPendingBagItems,
  recordBagEffectResolution,
  removeBagEffect,
} from "../effects/triggered-abilities";
import {
  formatLorcanaPlayerLabel,
  getLorcanaCardName,
  traceLorcanaRuntimeStep,
} from "../../runtime-trace";

type ResolveBagValidationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"resolveBag">["validate"]>
>[0];

type ResolveBagExecutionContext = Parameters<LorcanaMoveDefinition<"resolveBag">["execute"]>[0];

type ResolveBagStatus = "completed" | "pending" | "skipped";

function toLogTargetId(value: string): LogTargetId {
  return value as LogTargetId;
}

function normalizeResolveBagTargets(
  targets: ActionResolutionInput["targets"] | undefined,
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

function logResolveBagMessage(
  ctx: ResolveBagExecutionContext,
  bagEffect: NonNullable<ReturnType<typeof getBagEffect>>,
  resolutionInput: ActionResolutionInput,
  status: ResolveBagStatus,
): void {
  const common = {
    playerId: bagEffect.controllerId,
    sourceId: bagEffect.sourceId,
  };
  const abilityName = bagEffect.abilityName?.trim();
  const targets = normalizeResolveBagTargets(resolutionInput.targets);

  const defaultMessage = (() => {
    switch (status) {
      case "completed":
        if (abilityName && targets && targets.length > 0) {
          return createLorcanaLogMessage("lorcana.bag.resolve.completed.targets.named", {
            ...common,
            abilityName,
            targets,
          });
        }
        if (targets && targets.length > 0) {
          return createLorcanaLogMessage("lorcana.bag.resolve.completed.targets", {
            ...common,
            targets,
          });
        }
        if (abilityName) {
          return createLorcanaLogMessage("lorcana.bag.resolve.completed.named", {
            ...common,
            abilityName,
          });
        }
        return createLorcanaLogMessage("lorcana.bag.resolve.completed", common);
      case "pending":
        if (abilityName) {
          return createLorcanaLogMessage("lorcana.bag.resolve.pending.named", {
            ...common,
            abilityName,
          });
        }
        return createLorcanaLogMessage("lorcana.bag.resolve.pending", common);
      case "skipped":
        if (abilityName) {
          return createLorcanaLogMessage("lorcana.bag.resolve.skipped.named", {
            ...common,
            abilityName,
          });
        }
        return createLorcanaLogMessage("lorcana.bag.resolve.skipped", common);
      default:
        return assertNever(status);
    }
  })();

  ctx.framework.log({
    category: "action",
    visibility: { mode: "PUBLIC" },
    defaultMessage,
  });
}

function getBagEffect(
  ctx: ResolveBagValidationContext | ResolveBagExecutionContext,
  bagId: string,
) {
  return (ctx.G.triggeredAbilities.bag.items ?? []).find((entry) => entry.id === bagId);
}

export const resolveBag: LorcanaMoveDefinition<"resolveBag"> = {
  ignorePriority: true,

  validate: (ctx): RuntimeValidationResult => {
    const { bagId } = ctx.args;
    if (typeof bagId !== "string" || bagId.length === 0) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveBag",
        playerId: ctx.playerId,
        bagItemId: bagId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveBag (RESOLVE_BAG_ID_REQUIRED)`,
        payload: {
          error: "resolveBag requires a valid bag id",
          errorCode: "RESOLVE_BAG_ID_REQUIRED",
        },
      });
      return {
        valid: false,
        error: "resolveBag requires a valid bag id",
        errorCode: "RESOLVE_BAG_ID_REQUIRED",
      };
    }

    const bagEffect = getBagEffect(ctx, bagId);
    if (!bagEffect) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveBag",
        playerId: ctx.playerId,
        bagItemId: bagId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveBag (RESOLVE_BAG_NOT_FOUND)`,
        payload: {
          error: "Bag effect was not found",
          errorCode: "RESOLVE_BAG_NOT_FOUND",
        },
      });
      return {
        valid: false,
        error: "Bag effect was not found",
        errorCode: "RESOLVE_BAG_NOT_FOUND",
      };
    }

    const resolver = getNextBagResolver(ctx);
    if (!resolver || resolver !== ctx.playerId || bagEffect.controllerId !== resolver) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveBag",
        playerId: ctx.playerId,
        bagItemId: bagId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveBag (RESOLVE_BAG_WRONG_PLAYER)`,
        payload: {
          error: "Only the active bag resolver may choose this effect",
          errorCode: "RESOLVE_BAG_WRONG_PLAYER",
        },
      });
      return {
        valid: false,
        error: "Only the active bag resolver may choose this effect",
        errorCode: "RESOLVE_BAG_WRONG_PLAYER",
      };
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const { bagId } = ctx.args;
    const bagEffect = removeBagEffect(ctx, bagId);
    if (!bagEffect) {
      throw new Error(`Bag effect '${bagId}' was not found during execution`);
    }

    const sourceCardName = getLorcanaCardName(bagEffect.sourceId, (cardId) =>
      ctx.cards.getDefinition(cardId),
    );
    traceLorcanaRuntimeStep({
      kind: "bag.effect.selected",
      moveId: "resolveBag",
      playerId: bagEffect.controllerId,
      bagItemId: bagId,
      cardId: bagEffect.sourceId,
      cardName: sourceCardName,
      message: "Bag effect selected",
      payload: {
        controllerId: bagEffect.controllerId,
      },
    });

    ctx.G.triggeredAbilities.bag.lastResolvedPlayerId = bagEffect.controllerId;

    const resolutionInput: ActionResolutionInput = {
      ...cloneActionResolutionInput(bagEffect.resolutionInput as ActionResolutionInput),
      ...ctx.args.params,
    } as ActionResolutionInput;
    const shouldAttemptResolution = canResolveBagEffectByRestrictions(ctx, bagEffect);

    if (shouldAttemptResolution) {
      recordBagEffectResolution(ctx, bagEffect);
      const shouldResolve =
        !bagEffect.condition ||
        evaluateActionCondition(bagEffect.condition, ctx, bagEffect.cardPlayed, resolutionInput);
      if (!shouldResolve) {
        traceLorcanaRuntimeStep({
          kind: "bag.effect.skipped",
          moveId: "resolveBag",
          playerId: bagEffect.controllerId,
          bagItemId: bagId,
          cardId: bagEffect.sourceId,
          cardName: sourceCardName,
          message: "Bag effect skipped because its condition was not met",
        });
        logResolveBagMessage(ctx, bagEffect, resolutionInput, "skipped");
        flushTriggeredEventsToBag(ctx);
      } else {
        traceLorcanaRuntimeStep({
          kind: "bag.effect.resolution.started",
          moveId: "resolveBag",
          playerId: bagEffect.controllerId,
          bagItemId: bagId,
          cardId: bagEffect.sourceId,
          cardName: sourceCardName,
          message: "Effect goes to resolution",
        });
        const result = resolveActionEffect(
          ctx,
          bagEffect.cardPlayed,
          bagEffect.effect,
          resolutionInput,
        );
        if (result.status === "suspended") {
          traceLorcanaRuntimeStep({
            kind: "bag.effect.resolution.suspended",
            moveId: "resolveBag",
            playerId: bagEffect.controllerId,
            bagItemId: bagId,
            cardId: bagEffect.sourceId,
            cardName: sourceCardName,
            message: "Bag effect resolution is waiting for further input",
          });
          logResolveBagMessage(ctx, bagEffect, resolutionInput, "pending");
          return;
        }
        traceLorcanaRuntimeStep({
          kind: "bag.effect.resolution.completed",
          moveId: "resolveBag",
          playerId: bagEffect.controllerId,
          bagItemId: bagId,
          cardId: bagEffect.sourceId,
          cardName: sourceCardName,
          message: "Effect resolution completes",
        });
        logResolveBagMessage(ctx, bagEffect, resolutionInput, "completed");
      }
    } else {
      logResolveBagMessage(ctx, bagEffect, resolutionInput, "skipped");
    }

    flushTriggeredEventsToBag(ctx);

    if (!hasPendingBagItems(ctx)) {
      ctx.G.triggeredAbilities.bag.lastResolvedPlayerId = undefined;
      if (
        !ctx.framework.state.ctx.priority.pendingChoice &&
        (ctx.G.pendingEffects?.length ?? 0) === 0
      ) {
        if (ctx.G.pendingTurnTransition) {
          continuePendingTurnTransition(ctx);
        } else if (ctx.G.challengeState) {
          continuePendingChallengeResolution(ctx);
        }
      }
    }
  },

  available: (ctx) => {
    if (ctx.playerId !== getNextBagResolver(ctx)) {
      return false;
    }

    return getBagItemsForCurrentResolver(ctx).length > 0;
  },
};

function assertNever(value: never): never {
  throw new Error(`Unhandled resolve bag status: ${String(value)}`);
}
