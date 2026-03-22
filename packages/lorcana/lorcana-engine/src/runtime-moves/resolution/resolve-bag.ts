import type { CardInstanceId, PlayerId, RuntimeValidationResult } from "#core";
import type { PendingActionResolutionInput } from "../../types";
import { createLorcanaLogMessage, type LorcanaMoveDefinition } from "../../types";
import type { LogTargetId } from "../../types/log-messages";
import { continuePendingChallengeResolution } from "../moves/core/challenge";
import { continuePendingTurnTransition } from "../moves/turn/pass-turn";
import { resolveActionEffect } from "./action-effects/composed-effect-resolver";
import type { ActionResolutionInput } from "./action-effects/types";
import { evaluateActionCondition } from "./action-effects/action-condition-evaluator";
import { cloneActionResolutionInput } from "./action-effects/pending-action-effects";
import { buildResolutionSelectionContext } from "./action-effects/selection-context";
import {
  getCurrentSelectionInput,
  type SelectionTarget,
  withCurrentSelectionTargets,
} from "./action-effects/selection-state";
import {
  canResolveBagEffectByRestrictions,
  flushTriggeredEventsToBag,
  getBagItemsForCurrentResolver,
  getNextBagResolver,
  hasPendingBagItems,
  recordBagEffectResolution,
  removeBagEffect,
  updateBagEffectResolutionInput,
} from "../effects/triggered-abilities";
import {
  formatLorcanaPlayerLabel,
  getLorcanaCardName,
  traceLorcanaRuntimeStep,
} from "../../runtime-trace";
import {
  analyzeEffectTargets,
  analyzeTargetSelectionAvailabilityFromAnalysis,
  analyzeResolutionRequirements,
  countExplicitTargetSelections,
  hasExplicitTargetSelectionInput,
  validateAndNormalizeTargetSelection,
} from "../../targeting/runtime";

type ResolveBagValidationContext = Parameters<
  NonNullable<LorcanaMoveDefinition<"resolveBag">["validate"]>
>[0];

type ResolveBagExecutionContext = Parameters<LorcanaMoveDefinition<"resolveBag">["execute"]>[0];

type ResolveBagStatus = "completed" | "pending" | "skipped";

function toLogTargetId(value: string): LogTargetId {
  return value as LogTargetId;
}

function normalizeResolveBagTargets(
  targets: ActionResolutionInput["currentTargets"] | ActionResolutionInput["targets"] | undefined,
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
  const targets = normalizeResolveBagTargets(getCurrentSelectionInput(resolutionInput));

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

/**
 * If the effect is a `conditional` effect, evaluate the condition using the
 * stored event snapshot and return the branch that will actually be executed
 * (then-branch if condition passes, else-branch if not). This allows the caller
 * to analyse resolution requirements only against the branch that will run,
 * preventing spurious "targets required" errors when the condition fails and no
 * targets are needed.
 *
 * For any other effect shape the original effect is returned unchanged.
 */
function resolveConditionalEffectBranch(
  effect: unknown,
  ctx: Parameters<typeof evaluateActionCondition>[1],
  cardPlayed: Parameters<typeof evaluateActionCondition>[2],
  resolutionInput: Parameters<typeof evaluateActionCondition>[3],
): unknown {
  if (
    typeof effect !== "object" ||
    effect === null ||
    (effect as Record<string, unknown>).type !== "conditional"
  ) {
    return effect;
  }

  const conditional = effect as Record<string, unknown>;
  const condition = conditional.condition as Parameters<typeof evaluateActionCondition>[0];
  const conditionMet = evaluateActionCondition(condition, ctx, cardPlayed, resolutionInput);

  const thenBranch = conditional.then ?? conditional.effect ?? conditional.ifTrue;
  const elseBranch = conditional.else ?? conditional.ifFalse;
  return conditionMet ? thenBranch : elseBranch;
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

    const params = ctx.args.params;
    // For conditional effects, we must evaluate the condition before determining
    // resolution requirements. The branches of a conditional are only reachable
    // when the condition passes; requiring targets for the then-branch when the
    // condition will fail is incorrect and blocks auto-resolution.
    const effectForRequirements = resolveConditionalEffectBranch(
      bagEffect.effect,
      ctx as unknown as Parameters<typeof evaluateActionCondition>[1],
      {
        ...bagEffect.cardPlayed,
        singerIds: bagEffect.cardPlayed.singerIds ? [...bagEffect.cardPlayed.singerIds] : undefined,
      },
      cloneActionResolutionInput(bagEffect.resolutionInput as ActionResolutionInput),
    );
    const requirements = analyzeResolutionRequirements(effectForRequirements);
    const explicitTargets = params?.targets;
    const hasExplicitTargets = hasExplicitTargetSelectionInput(explicitTargets);
    const explicitTargetCount = countExplicitTargetSelections(explicitTargets);
    const sourceCardDefinition = ctx.cards.getDefinition(bagEffect.sourceId as CardInstanceId);
    const selectionResolutionInput: PendingActionResolutionInput = {
      targets: explicitTargets as PendingActionResolutionInput["targets"],
      currentTargets: explicitTargets as PendingActionResolutionInput["currentTargets"],
      resolveOptional: params?.resolveOptional,
      choiceIndex: params?.choiceIndex,
      namedCard: params?.namedCard,
      destinations: params?.destinations as PendingActionResolutionInput["destinations"],
    };
    const bagSelectionContext = buildResolutionSelectionContext({
      origin: "bag",
      requestId: bagEffect.id,
      sourceCardId: bagEffect.sourceId as CardInstanceId,
      chooserId: bagEffect.controllerId as PlayerId,
      cardPlayed: {
        cardId: bagEffect.sourceId as CardInstanceId,
        cardType: sourceCardDefinition?.cardType ?? "character",
        costType: "free",
        playerId: bagEffect.controllerId as PlayerId,
      },
      effect: bagEffect.effect,
      resolutionInput: selectionResolutionInput,
      ctx,
    });
    const isDecliningOptional = requirements.isOptional && params?.resolveOptional === false;
    const controllerId = bagEffect.controllerId as PlayerId;
    const targetAnalysis = analyzeEffectTargets(
      bagEffect.effect,
      controllerId,
      ctx,
      bagEffect.sourceId as CardInstanceId,
    );
    const currentSelectionAnalysis =
      bagSelectionContext?.kind === "target-selection" ||
      bagSelectionContext?.kind === "discard-choice"
        ? {
            ...targetAnalysis,
            minSelections: bagSelectionContext.minSelections,
            maxSelections: bagSelectionContext.maxSelections,
            ordered: bagSelectionContext.ordered,
          }
        : targetAnalysis;
    const targetAvailability = analyzeTargetSelectionAvailabilityFromAnalysis(
      bagEffect.effect,
      currentSelectionAnalysis,
    );
    if (
      requirements.requiresExplicitTargetSelection &&
      !requirements.allowsExplicitEmptyTargetSelection &&
      hasExplicitTargets &&
      explicitTargetCount === 0 &&
      !isDecliningOptional
    ) {
      traceLorcanaRuntimeStep({
        kind: "move.validation.failed",
        moveId: "resolveBag",
        playerId: ctx.playerId,
        bagItemId: bagId,
        message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveBag (RESOLVE_BAG_TARGETS_REQUIRED)`,
        payload: {
          error: "resolveBag requires at least 1 explicit target for this effect",
          errorCode: "RESOLVE_BAG_TARGETS_REQUIRED",
        },
      });
      return {
        valid: false,
        error: "resolveBag requires at least 1 explicit target for this effect",
        errorCode: "RESOLVE_BAG_TARGETS_REQUIRED",
      };
    }

    // When bagSelectionContext is undefined, the provided targets are destined for
    // a nested inner step (e.g. the first step of an optional→sequence). The
    // full-effect targetAnalysis would incorrectly require targets for ALL steps.
    // Relax the minimum count to just the explicit target count, but still
    // validate each target's legality so invalid targets (wrong classification,
    // Ward restriction, strength filter, etc.) are still rejected.
    const relaxTargetCount = bagSelectionContext === undefined;
    const selectionAnalysisForValidation = relaxTargetCount
      ? { ...currentSelectionAnalysis, minSelections: explicitTargetCount }
      : currentSelectionAnalysis;
    if (hasExplicitTargets && explicitTargets !== undefined) {
      const selectionValidation = validateAndNormalizeTargetSelection(
        explicitTargets,
        selectionAnalysisForValidation,
        {
          currentPlayer: controllerId,
          ctx,
        },
      );
      const normalizedSelection =
        !selectionValidation.valid &&
        selectionValidation.errorCode === "TOO_FEW_TARGETS" &&
        targetAvailability.shouldAutoRejectForNoValidTargets
          ? validateAndNormalizeTargetSelection(
              explicitTargets,
              {
                ...currentSelectionAnalysis,
                minSelections: 0,
              },
              {
                currentPlayer: controllerId,
                ctx,
              },
            )
          : selectionValidation;
      if (!normalizedSelection.valid) {
        traceLorcanaRuntimeStep({
          kind: "move.validation.failed",
          moveId: "resolveBag",
          playerId: ctx.playerId,
          bagItemId: bagId,
          message: `${formatLorcanaPlayerLabel(ctx.playerId)} cannot execute move: resolveBag (${normalizedSelection.errorCode ?? "INVALID_BAG_TARGETS"})`,
          payload: {
            error: normalizedSelection.error ?? "Bag effect target selection is invalid",
            errorCode: normalizedSelection.errorCode ?? "INVALID_BAG_TARGETS",
          },
        });
        return {
          valid: false,
          error: normalizedSelection.error ?? "Bag effect target selection is invalid",
          errorCode: normalizedSelection.errorCode ?? "INVALID_BAG_TARGETS",
        };
      }
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const { bagId } = ctx.args;

    // Multi-step resolution: check if this is a partial input that advances the
    // selection state (e.g. accepting an optional effect that still needs target
    // selection). If so, update the bag item's resolutionInput and return early
    // so the next board projection presents the next selection context.
    // Multi-step resolution: when the caller provides partial selection input
    // (e.g. only resolveOptional without targets, or only choiceIndex), check
    // whether the effect still needs more selection steps. If so, update the bag
    // item's resolutionInput in place and return early so the next board projection
    // presents the next selection context.
    // Only enter this path when:
    //  1. Targets are NOT provided (direct target submission uses the full path)
    //  2. At least one intermediate selection field IS provided
    const params = ctx.args.params;
    const hasProvidedTargets = params?.targets !== undefined;
    const hasIntermediateInput =
      typeof params?.resolveOptional === "boolean" ||
      typeof params?.choiceIndex === "number" ||
      typeof params?.namedCard === "string" ||
      params?.destinations !== undefined;
    const bagEntry = !hasProvidedTargets && hasIntermediateInput ? getBagEffect(ctx, bagId) : null;
    if (bagEntry && params) {
      const mergedResolutionInput: PendingActionResolutionInput = {
        ...(bagEntry.resolutionInput as PendingActionResolutionInput),
      };
      if (typeof params.resolveOptional === "boolean") {
        mergedResolutionInput.resolveOptional = params.resolveOptional;
      }
      if (typeof params.choiceIndex === "number") {
        mergedResolutionInput.choiceIndex = params.choiceIndex;
      }
      if (typeof params.namedCard === "string") {
        mergedResolutionInput.namedCard = params.namedCard;
      }
      if (params.destinations !== undefined) {
        mergedResolutionInput.destinations =
          params.destinations as PendingActionResolutionInput["destinations"];
      }
      const nextSelectionContext = buildResolutionSelectionContext({
        origin: "bag",
        requestId: bagEntry.id,
        sourceCardId: bagEntry.sourceId as CardInstanceId,
        chooserId: bagEntry.chooserId as PlayerId,
        cardPlayed: bagEntry.cardPlayed,
        effect: bagEntry.effect,
        resolutionInput: mergedResolutionInput,
        ctx,
      });

      // Only advance if the effect truly requires explicit target selection AND
      // the optional decision (if any) has NOT yet been made. Once resolveOptional
      // is committed (true), the bag must execute immediately so the effect resolver
      // can create pending effects for any required target selection. Advancing bag
      // state after accepting an optional breaks the pending-effect target flow used
      // by most triggered abilities (e.g. "you may remove damage from chosen character").
      // A top-level decision has been made when:
      // - resolveOptional was set to true (optional accepted), or
      // - choiceIndex was provided (choice/or effect resolved)
      // In either case, execute the bag immediately so the effect resolver
      // can create pending effects for any remaining target selection.
      const isAcceptingOptional = mergedResolutionInput.resolveOptional === true;
      const hasResolvedChoice = typeof mergedResolutionInput.choiceIndex === "number";
      const mergedRequirements = analyzeResolutionRequirements(bagEntry.effect);
      const shouldAdvance =
        nextSelectionContext &&
        mergedRequirements.requiresExplicitTargetSelection &&
        !isAcceptingOptional &&
        !hasResolvedChoice;
      if (shouldAdvance) {
        // There's still more input needed — advance the bag item's state
        // without executing the effect.
        updateBagEffectResolutionInput(ctx, bagId, mergedResolutionInput);
        traceLorcanaRuntimeStep({
          kind: "bag.effect.resolution.advanced",
          moveId: "resolveBag",
          playerId: bagEntry.controllerId,
          bagItemId: bagId,
          cardId: bagEntry.sourceId,
          cardName: getLorcanaCardName(bagEntry.sourceId, (cardId) =>
            ctx.cards.getDefinition(cardId),
          ),
          message: "Bag effect selection advanced to next step",
        });
        return;
      }
    }

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

    // When executing a bag effect for an optional triggered ability, treat any
    // non-explicit-decline as acceptance. The player chose to call resolveBag
    // (rather than decline), so absence of resolveOptional = implicit accept.
    // Only explicit resolveOptional: false declines the optional.
    const effectRequirements = analyzeResolutionRequirements(bagEffect.effect);
    if (effectRequirements.isOptional && resolutionInput.resolveOptional !== false) {
      (resolutionInput as Record<string, unknown>).resolveOptional = true;
    }

    const paramsWithPlayerTargets = ctx.args.params as typeof ctx.args.params & {
      playerTargets?: SelectionTarget | SelectionTarget[];
    };
    const cardTargets: SelectionTarget[] =
      ctx.args.params?.targets !== undefined
        ? Array.isArray(ctx.args.params.targets)
          ? ctx.args.params.targets.filter(
              (target): target is SelectionTarget => typeof target === "string",
            )
          : typeof ctx.args.params.targets === "string"
            ? [ctx.args.params.targets]
            : []
        : [];
    const playerTargets: SelectionTarget[] = Array.isArray(paramsWithPlayerTargets?.playerTargets)
      ? paramsWithPlayerTargets.playerTargets.filter(
          (target): target is SelectionTarget => typeof target === "string",
        )
      : typeof paramsWithPlayerTargets?.playerTargets === "string"
        ? [paramsWithPlayerTargets.playerTargets]
        : [];
    const allTargets = [...cardTargets, ...playerTargets];
    if (allTargets.length > 0) {
      const nextResolutionInput = withCurrentSelectionTargets(resolutionInput, allTargets);
      Object.assign(resolutionInput, nextResolutionInput);
    }
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
          {
            allowPromptForExistingChosenTargets: true,
          },
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
        !ctx.framework.state.priority.pendingChoice &&
        (ctx.G.pendingEffects?.length ?? 0) === 0
      ) {
        if (ctx.G.pendingTurnTransition) {
          continuePendingTurnTransition(ctx);
        } else if (ctx.G.challengeState) {
          continuePendingChallengeResolution(ctx);
          // After challenge resolution completes, challengeState may have been cleared.
          // If so (and no new bag items were enqueued), restore priority to the turn
          // player so that the active player can continue taking actions.
          if (
            !ctx.G.challengeState &&
            !hasPendingBagItems(ctx) &&
            !ctx.framework.state.priority.pendingChoice &&
            (ctx.G.pendingEffects?.length ?? 0) === 0
          ) {
            const turnPlayer = resolveTurnPlayerFromCtx(ctx);
            if (turnPlayer && ctx.framework.state.currentPlayer !== turnPlayer) {
              if (typeof ctx.framework.priority?.setHolder === "function") {
                ctx.framework.priority.setHolder(turnPlayer);
              } else {
                (ctx.framework.state.priority as { holder?: PlayerId }).holder = turnPlayer;
              }
            }
          }
        } else {
          // Bag resolved mid-turn (no pending transition or challenge).
          // Priority may have been temporarily transferred to the bag controller
          // for resolution.  Restore it to the actual turn player so that
          // subsequent triggered-ability restriction checks (e.g. "during an
          // opponent's turn") evaluate against the correct active player.
          const turnPlayer = resolveTurnPlayerFromCtx(ctx);
          if (turnPlayer && ctx.framework.state.currentPlayer !== turnPlayer) {
            if (typeof ctx.framework.priority?.setHolder === "function") {
              ctx.framework.priority.setHolder(turnPlayer);
            } else {
              (ctx.framework.state.priority as { holder?: PlayerId }).holder = turnPlayer;
            }
          }
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

/**
 * Derive the active turn player from engine state.
 *
 * The turn player is determined by the OTP (on-the-play) designation and the
 * total number of completed turns across all players.  This mirrors the logic
 * used in the projection layer (`resolveTurnPlayer` in project-board.ts) so
 * that priority can be restored to the correct player after bag resolution
 * without requiring an extra field in `G`.
 */
function resolveTurnPlayerFromCtx(ctx: ResolveBagExecutionContext): PlayerId | undefined {
  const otp = ctx.framework.state.status.otp as PlayerId | undefined;
  if (!otp) {
    return ctx.framework.state.currentPlayer as PlayerId | undefined;
  }

  const playerIds = ctx.framework.state.playerIds;
  const turnsCompleted = (ctx.G.turnsCompletedByPlayer ?? {}) as Record<string, number>;
  const totalCompletedTurns = Object.values(turnsCompleted).reduce(
    (sum, count) => sum + (count ?? 0),
    0,
  );

  if (totalCompletedTurns === 0) {
    return otp;
  }

  const otpIndex = playerIds.findIndex((p) => p === otp);
  if (otpIndex < 0 || playerIds.length === 0) {
    return otp;
  }

  const offset = totalCompletedTurns % playerIds.length;
  return playerIds[(otpIndex + offset) % playerIds.length] as PlayerId;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled resolve bag status: ${String(value)}`);
}
