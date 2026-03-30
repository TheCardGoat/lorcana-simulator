import type { CardInstanceId, PlayerId, RuntimeValidationResult } from "#core";
import {
  createLorcanaGameLogEntry,
  createLorcanaLogMessage,
  createLorcanaLogProjection,
  type LorcanaMoveDefinition,
} from "../../types";
import type { PendingActionEffect, PendingActionResolutionInput } from "../../types";
import type { LogTargetId, ScryDestinationEntry } from "../../types/log-messages";
import { resolveActionEffect } from "./action-effects/composed-effect-resolver";
import { isScryEffect, validateScrySelection } from "./action-effects/scry-effect";
import { buildResolutionSelectionContext } from "./action-effects/selection-context";
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
  analyzeEffectTargets,
  buildMissingTargetSelectionError,
  countExplicitTargetSelections,
  hasExplicitTargetSelectionInput,
  validateAndNormalizeTargetSelection,
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
  const inputWithoutTransientSelectionState =
    inputWithoutOptional.targetSelectionResolved !== undefined
      ? {
          ...inputWithoutOptional,
          targetSelectionResolved: undefined,
        }
      : inputWithoutOptional;
  // Clear destinations and scry-specific eventSnapshot fields so that the
  // current effect's resolution choices do not bleed into subsequent continuation
  // steps (e.g. P1 scry destinations and revealedCardIds leaking into the P2
  // scry in a multi-player sequence like Let's Get Dangerous).
  // We preserve the rest of eventSnapshot (e.g. lastEffectTargetCount) since
  // continuation steps like for-each may depend on it.
  const needsClearDestinations = inputWithoutTransientSelectionState.destinations !== undefined;
  const needsClearRevealedCards =
    inputWithoutTransientSelectionState.eventSnapshot?.revealedCardIds !== undefined ||
    inputWithoutTransientSelectionState.eventSnapshot?.revealWindowIds !== undefined;
  const inputWithoutTransientDestinations =
    needsClearDestinations || needsClearRevealedCards
      ? {
          ...inputWithoutTransientSelectionState,
          destinations: undefined,
          ...(needsClearRevealedCards
            ? {
                eventSnapshot: {
                  ...inputWithoutTransientSelectionState.eventSnapshot,
                  revealedCardIds: undefined,
                  revealWindowIds: undefined,
                },
              }
            : {}),
        }
      : inputWithoutTransientSelectionState;

  if (pendingEffect.kind === "target-selection") {
    return promoteCurrentSelectionTargetsToContext(inputWithoutTransientDestinations);
  }

  if (countResolvedTargets(getCurrentSelectionInput(inputWithoutTransientDestinations)) > 0) {
    return promoteCurrentSelectionTargetsToContext(inputWithoutTransientDestinations);
  }

  return clearCurrentSelectionTargets(inputWithoutTransientDestinations);
}

function getScryDestinationLogLabel(zone: string): string {
  switch (zone) {
    case "deck-top":
      return "Top of deck";
    case "deck-bottom":
      return "Bottom of deck";
    case "hand":
      return "Hand";
    case "play":
      return "Play";
    case "inkwell":
      return "Inkwell";
    case "discard":
      return "Discard";
    default:
      return zone;
  }
}

function buildScrySelectionLogDetail(
  ctx: ResolveEffectExecutionContext,
  resolutionInput: PendingActionResolutionInput,
): {
  selection: string[];
  destinations: ScryDestinationEntry[];
  deckTopCards?: CardInstanceId[];
  deckBottomCards?: CardInstanceId[];
  handCards?: CardInstanceId[];
  playCards?: CardInstanceId[];
  inkwellCards?: CardInstanceId[];
  discardCards?: CardInstanceId[];
} {
  if (!Array.isArray(resolutionInput.destinations)) {
    return { selection: [], destinations: [] };
  }

  const detail: {
    selection: string[];
    destinations: ScryDestinationEntry[];
    deckTopCards?: CardInstanceId[];
    deckBottomCards?: CardInstanceId[];
    handCards?: CardInstanceId[];
    playCards?: CardInstanceId[];
    inkwellCards?: CardInstanceId[];
    discardCards?: CardInstanceId[];
  } = { selection: [], destinations: [] };

  for (const destination of resolutionInput.destinations) {
    if (!destination || typeof destination.zone !== "string" || !Array.isArray(destination.cards)) {
      continue;
    }

    const cardIds = destination.cards.filter(
      (cardId): cardId is CardInstanceId => typeof cardId === "string" && cardId.length > 0,
    );
    if (cardIds.length === 0) {
      continue;
    }
    const cardNames = cardIds.map(
      (cardId) => getLorcanaCardName(cardId, ctx.cards.getDefinition) ?? cardId,
    );
    const inkTypes = cardIds.map(
      (cardId) => ctx.cards.getDefinition(cardId)?.inkType as string[] | undefined,
    );

    detail.selection.push(
      `${getScryDestinationLogLabel(destination.zone)}: ${cardNames.join(", ")}`,
    );
    detail.destinations.push({ zone: destination.zone, cardIds, cardNames, inkTypes });
    switch (destination.zone) {
      case "deck-top":
        detail.deckTopCards = cardIds;
        break;
      case "deck-bottom":
        detail.deckBottomCards = cardIds;
        break;
      case "hand":
        detail.handCards = cardIds;
        break;
      case "play":
        detail.playCards = cardIds;
        break;
      case "inkwell":
        detail.inkwellCards = cardIds;
        break;
      case "discard":
        detail.discardCards = cardIds;
        break;
    }
  }

  return detail;
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

  const visibility = { mode: "PUBLIC" as const };
  const category = "action" as const;

  if (pendingEffect.kind === "scry-selection") {
    const selection = buildScrySelectionLogDetail(ctx, resolutionInput);
    const hasSelection = selection.selection.length > 0;
    const scryVisibility = hasSelection
      ? {
          mode: "PUBLIC_WITH_OVERRIDES" as const,
          overrides: {
            [pendingEffect.chooserId]: createLorcanaLogMessage(
              "lorcana.effect.resolve.scrySelection.detail",
              { ...common, ...selection },
            ),
          },
        }
      : visibility;

    // typedEntry uses the detail version so the acting player sees
    // what cards went where. The adapter strips this for other players
    // based on the PUBLIC_WITH_OVERRIDES visibility.
    const typedEntry = hasSelection
      ? createLorcanaGameLogEntry(
          "lorcana.effect.resolve.scrySelection.detail",
          { ...common, ...selection },
          { mode: "PRIVATE", visibleTo: [pendingEffect.chooserId] },
          category,
        )
      : createLorcanaGameLogEntry(
          "lorcana.effect.resolve.scrySelection",
          common,
          visibility,
          category,
        );

    ctx.framework.log({
      category,
      visibility: scryVisibility,
      defaultMessage: createLorcanaLogMessage("lorcana.effect.resolve.scrySelection", common),
      typedEntry,
    });
    return;
  }

  const projection = (() => {
    switch (pendingEffect.kind) {
      case "discard-choice":
        return createLorcanaLogProjection(
          "lorcana.effect.resolve.discardChoice",
          {
            ...common,
            targets: normalizeResolveEffectTargets(getCurrentSelectionInput(resolutionInput)),
          },
          visibility,
          category,
        );
      case "target-selection":
        return createLorcanaLogProjection(
          "lorcana.effect.resolve.targetSelection",
          {
            ...common,
            targets: normalizeResolveEffectTargets(getCurrentSelectionInput(resolutionInput)),
          },
          visibility,
          category,
        );
      case "choice-selection": {
        const revealedCardId = resolutionInput.eventSnapshot?.revealedCardIds?.[0];
        if (revealedCardId) {
          return createLorcanaLogProjection(
            "lorcana.effect.resolve.choiceSelection.withReveal",
            {
              ...common,
              revealedCardId,
              choiceIndex: (resolutionInput.choiceIndex ?? 0) + 1,
            },
            visibility,
            category,
          );
        }
        return createLorcanaLogProjection(
          "lorcana.effect.resolve.choiceSelection",
          {
            ...common,
            choiceIndex: (resolutionInput.choiceIndex ?? 0) + 1,
          },
          visibility,
          category,
        );
      }
      case "optional-selection":
        return resolutionInput.resolveOptional
          ? createLorcanaLogProjection(
              "lorcana.effect.resolve.optionalSelection.accepted",
              common,
              visibility,
              category,
            )
          : createLorcanaLogProjection(
              "lorcana.effect.resolve.optionalSelection.rejected",
              common,
              visibility,
              category,
            );
      case "name-card-selection":
        return createLorcanaLogProjection(
          "lorcana.effect.resolve.nameCardSelection",
          {
            ...common,
            namedCard: resolutionInput.namedCard ?? "",
          },
          visibility,
          category,
        );
      default:
        return assertNever(pendingEffect.kind);
    }
  })();

  ctx.framework.log(projection);
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
  const allowsEmptyTargetResolution = (targetSelectionContext?.minSelections ?? 1) === 0;

  if (pendingEffect.kind === "discard-choice" || pendingEffect.kind === "target-selection") {
    if (!hasExplicitTargets && !allowsEmptyTargetResolution) {
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

    if (hasExplicitTargets) {
      const analysis = analyzeEffectTargets(
        pendingEffect.effect,
        pendingEffect.controllerId,
        ctx,
        pendingEffect.sourceCardId,
        {
          includeDeferredChosenSelections: true,
        },
      );
      const scCardCandidates =
        targetSelectionContext && targetSelectionContext.cardCandidateIds.length > 0
          ? targetSelectionContext.cardCandidateIds
          : undefined;
      const scPlayerCandidates =
        targetSelectionContext && targetSelectionContext.playerCandidateIds.length > 0
          ? targetSelectionContext.playerCandidateIds
          : undefined;
      const targetValidation = validateAndNormalizeTargetSelection(
        normalizedTargets,
        {
          ...analysis,
          cardCandidates: scCardCandidates ?? analysis.cardCandidates,
          playerCandidates: scPlayerCandidates ?? analysis.playerCandidates,
          minSelections: targetSelectionContext?.minSelections ?? analysis.minSelections,
          maxSelections: targetSelectionContext?.maxSelections ?? analysis.maxSelections,
        },
        {
          currentPlayer: pendingEffect.chooserId,
          ctx,
        },
      );
      if (!targetValidation.valid) {
        return targetValidation;
      }
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
    // Check only chooserId: for opponent-choice effects (e.g. Hades), pendingChoice.playerID is
    // the controller (P1) but the chooser may be the opponent (P2). The chooserId is authoritative.
    if (!actorId || actorId !== pendingEffect.chooserId) {
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
    const allowsEmptyTargetResolution =
      pendingEffect.kind === "target-selection" &&
      (pendingEffect.selectionContext?.kind === "target-selection"
        ? pendingEffect.selectionContext.minSelections
        : 1) === 0;
    const didResolveTargetSelectionWithoutTargets =
      allowsEmptyTargetResolution &&
      countResolvedTargets(getCurrentSelectionInput(normalizedParams)) === 0;
    const resolutionInput =
      normalizedParams.currentTargets !== undefined
        ? withCurrentSelectionTargets(
            mergeActionResolutionInput(pendingEffect.resolutionInput, normalizedParams),
            getCurrentSelectionTargets(normalizedParams),
          )
        : mergeActionResolutionInput(pendingEffect.resolutionInput, normalizedParams);
    if (didResolveTargetSelectionWithoutTargets) {
      resolutionInput.targetSelectionResolved = true;
    }
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
        const nextResolutionInput = {
          ...clearCurrentSelectionTargets(pendingEffect.resolutionInput),
        };
        const stagedPendingEffect = createPendingActionEffect(ctx, {
          kind: "target-selection",
          sourceCardId: pendingEffect.sourceCardId,
          controllerId: pendingEffect.controllerId,
          chooserId: pendingEffect.chooserId,
          abilityIndex: pendingEffect.abilityIndex,
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
          resolutionInput: nextResolutionInput,
          selectionContext: buildResolutionSelectionContext({
            origin: "pending-effect",
            requestId: pendingEffect.id,
            sourceCardId: pendingEffect.sourceCardId,
            chooserId: pendingEffect.chooserId,
            cardPlayed: pendingEffect.cardPlayed,
            effect: nextStep,
            resolutionInput: nextResolutionInput,
            ctx,
            originatesFromOptional: resolutionInput.resolveOptional === true,
          }),
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
        sourceAbilityIndex: pendingEffect.abilityIndex,
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
    if (didResolveTargetSelectionWithoutTargets) {
      ctx.framework.log(
        createLorcanaLogProjection(
          "lorcana.effect.cancelled",
          {
            playerId: pendingEffect.chooserId,
            sourceCardId: pendingEffect.sourceCardId,
            cause: "no-valid-targets",
          },
          { mode: "PUBLIC" },
          "action",
        ),
      );
    }

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
      restorePriorityToTurnPlayer(ctx);
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
        sourceAbilityIndex: pendingEffect.abilityIndex,
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
    restorePriorityToTurnPlayer(ctx);
  },

  available: (ctx) => {
    const pendingChoice = ctx.framework.state.priority.pendingChoice;
    if (!pendingChoice) {
      return false;
    }

    // Do NOT restrict by pendingChoice.playerID here: for opponent-choice effects (e.g. Hades),
    // pendingChoice.playerID is the controller (P1) but the chooser is the opponent (P2).
    // The chooserId check below is sufficient to restrict access to the correct player.
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

function restorePriorityToTurnPlayer(ctx: ResolveEffectExecutionContext): void {
  if (
    hasPendingBagItems(ctx) ||
    ctx.framework.state.priority.pendingChoice ||
    (ctx.G.pendingEffects?.length ?? 0) > 0 ||
    ctx.G.pendingTurnTransition ||
    ctx.G.challengeState
  ) {
    return;
  }

  const turnPlayer = resolveTurnPlayerFromCtx(ctx);
  if (!turnPlayer || ctx.framework.state.currentPlayer === turnPlayer) {
    return;
  }

  if (typeof ctx.framework.priority?.setHolder === "function") {
    ctx.framework.priority.setHolder(turnPlayer);
  } else {
    (ctx.framework.state.priority as { holder?: PlayerId }).holder = turnPlayer;
  }
}

function resolveTurnPlayerFromCtx(ctx: ResolveEffectExecutionContext): PlayerId | undefined {
  // Keep this turn-owner derivation in sync with:
  // - runtime-moves/moves/turn/pass-turn.ts:resolveTurnPlayer
  // - runtime-moves/resolution/resolve-bag.ts:resolveTurnPlayerFromCtx
  // - runtime-game/project-board.ts:resolveTurnPlayer
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
