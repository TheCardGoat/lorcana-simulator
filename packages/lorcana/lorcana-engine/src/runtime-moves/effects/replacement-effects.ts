import type { CardInstanceId, PlayerId } from "#core";
import type {
  NumericSelfReplacement,
  ReplacementAbilityDefinition,
  ReplacementAbilityKind,
  ReplacementRegistrationKind,
} from "@tcg/lorcana-types";
import type { CardPlayedPayload } from "../../types";
import type {
  ActionResolutionInput,
  PlayCardExecutionContext,
} from "../resolution/action-effects/types";
import {
  evaluateCondition,
  type ConditionEvaluationContext,
} from "../../rules/condition-evaluator";
import { createProjectionState, getEffectiveStrength } from "../../rules/derived-state";
import { isEffectExpired, resolveEffectWindow } from "../../rules/effect-registry";

type ReplacementContext = Pick<PlayCardExecutionContext, "G" | "framework" | "cards">;

function ensureReplacementEffectsState(
  ctx: ReplacementContext,
): ReplacementContext["G"]["replacementEffects"] {
  if (!ctx.G.replacementEffects) {
    ctx.G.replacementEffects = {
      nextSeq: 1,
      registrations: [],
      usageLedger: {
        perTurn: {},
      },
    };
  }

  return ctx.G.replacementEffects;
}

export type ReplacementEvent =
  | {
      kind: "modify-stat";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      targetId: CardInstanceId;
      amount: number;
      stat: "strength" | "willpower" | "lore" | "singer-threshold";
    }
  | {
      kind: "deal-damage";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      targetId: CardInstanceId;
      amount: number;
    }
  | {
      kind: "remove-damage";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      targetId: CardInstanceId;
      amount: number;
    }
  | {
      kind: "challenge-damage";
      eventId: string;
      sourceId: CardInstanceId;
      controllerId: PlayerId;
      attackerId: CardInstanceId;
      defenderId: CardInstanceId;
      targetId: CardInstanceId;
      amount: number;
    }
  | {
      kind: "gain-lore";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      playerId: PlayerId;
      amount: number;
    }
  | {
      kind: "lose-lore";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      playerId: PlayerId;
      amount: number;
    }
  | {
      kind: "zone-change";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      cardId: CardInstanceId;
      playerId: PlayerId;
      fromZone: string;
      toZone: string;
      position?: "top" | "bottom";
    }
  | {
      kind: "discard";
      eventId: string;
      sourceId?: CardInstanceId;
      controllerId: PlayerId;
      /** The player who would discard */
      targetPlayerId: PlayerId;
      /** Number of cards that would be discarded */
      amount: number;
      /** Whether the discard is prevented */
      prevented: boolean;
    };

type ReplacementCandidate = {
  id: string;
  applicationKey: string;
  apply: (event: ReplacementEvent) => ReplacementEvent;
  consume: () => void;
  consumeSibling?: () => void;
};

function getCurrentTurn(ctx: ReplacementContext): number {
  return ctx.framework.state.status.turn ?? 1;
}

function getCardOwnerId(
  ctx: ReplacementContext,
  cardId: CardInstanceId | undefined,
): PlayerId | undefined {
  return cardId ? (ctx.framework.zones.getCardOwner(cardId) as PlayerId | undefined) : undefined;
}

function getCardName(
  ctx: ReplacementContext,
  cardId: CardInstanceId | undefined,
): string | undefined {
  const definition = cardId ? ctx.cards.getDefinition(cardId) : undefined;
  return definition && "name" in definition ? (definition.name as string | undefined) : undefined;
}

function hasClassification(
  ctx: ReplacementContext,
  cardId: CardInstanceId | undefined,
  classification: string,
): boolean {
  const definition = cardId ? ctx.cards.getDefinition(cardId) : undefined;
  const classifications =
    definition && "classifications" in definition
      ? (definition.classifications as string[] | undefined)
      : undefined;
  return Array.isArray(classifications) && classifications.includes(classification);
}

function getCardStrength(ctx: ReplacementContext, cardId: CardInstanceId | undefined): number {
  const definition = cardId ? ctx.cards.getDefinition(cardId) : undefined;
  if (!cardId || !definition) {
    return 0;
  }

  return getEffectiveStrength(
    definition as any,
    createProjectionState(ctx.framework.state, ctx.G),
    cardId,
    (id) => ctx.cards.getDefinition(id) as any,
  );
}

function getUsageKey(turn: number, sourceId: CardInstanceId, abilityKey: string): string {
  return `${turn}:${sourceId}:${abilityKey}`;
}

function incrementUsage(
  ctx: ReplacementContext,
  sourceId: CardInstanceId,
  abilityKey: string,
): void {
  const turn = getCurrentTurn(ctx);
  const usageKey = getUsageKey(turn, sourceId, abilityKey);
  const ledger = ensureReplacementEffectsState(ctx).usageLedger.perTurn;
  ledger[usageKey] = (ledger[usageKey] ?? 0) + 1;
}

function getUsageCount(
  ctx: ReplacementContext,
  sourceId: CardInstanceId,
  abilityKey: string,
): number {
  const turn = getCurrentTurn(ctx);
  return (
    ensureReplacementEffectsState(ctx).usageLedger.perTurn[
      getUsageKey(turn, sourceId, abilityKey)
    ] ?? 0
  );
}

function resolveRegisteredTargetId(
  replacement: ReplacementRegistrationKind,
  cardPlayed: CardPlayedPayload,
  resolutionInput: ActionResolutionInput,
): CardInstanceId | undefined {
  switch (replacement.targetRef) {
    case "source":
      return cardPlayed.cardId;
    case "selected-target":
      return Array.isArray(resolutionInput.targets)
        ? (resolutionInput.targets.find(
            (target): target is CardInstanceId => typeof target === "string",
          ) ?? undefined)
        : typeof resolutionInput.targets === "string"
          ? (resolutionInput.targets as CardInstanceId)
          : undefined;
    case "chosen-card":
      return resolutionInput.eventSnapshot?.chosenCardId as CardInstanceId | undefined;
    case "trigger-subject":
      return resolutionInput.triggerContext?.subjectCardId;
    default:
      return undefined;
  }
}

function appliesNumericSelfReplacement(
  ctx: ReplacementContext,
  replacement: NumericSelfReplacement,
  resolutionInput: ActionResolutionInput,
  _event: ReplacementEvent,
): boolean {
  switch (replacement.condition.type) {
    case "selected-target-name": {
      const selectedTargetId = Array.isArray(resolutionInput.targets)
        ? (resolutionInput.targets.find(
            (target): target is CardInstanceId => typeof target === "string",
          ) ?? undefined)
        : typeof resolutionInput.targets === "string"
          ? (resolutionInput.targets as CardInstanceId)
          : undefined;
      return getCardName(ctx, selectedTargetId) === replacement.condition.name;
    }
    case "trigger-subject-classification":
      return hasClassification(
        ctx,
        resolutionInput.triggerContext?.subjectCardId,
        replacement.condition.classification,
      );
    case "trigger-subject-strength-gte":
      return (
        getCardStrength(ctx, resolutionInput.triggerContext?.subjectCardId) >=
        replacement.condition.value
      );
    default:
      return false;
  }
}

function createNumericSelfReplacementCandidate(
  ctx: ReplacementContext,
  replacement: NumericSelfReplacement | undefined,
  event: ReplacementEvent,
  resolutionInput: ActionResolutionInput,
  cardPlayed: CardPlayedPayload,
  field: "amount" | "modifier",
): ReplacementCandidate | undefined {
  if (!replacement || !appliesNumericSelfReplacement(ctx, replacement, resolutionInput, event)) {
    return undefined;
  }

  const applicationKey =
    replacement.applicationKey ?? `${cardPlayed.cardId}:${field}:${replacement.value}`;
  return {
    id: `${cardPlayed.cardId}:${field}:self`,
    applicationKey,
    apply: (currentEvent) => ({ ...currentEvent, amount: replacement.value }),
    consume: () => undefined,
  };
}

function buildConditionContext(
  ctx: ReplacementContext,
  playerId: PlayerId,
  sourceCardId?: CardInstanceId,
): ConditionEvaluationContext {
  return {
    framework: ctx.framework,
    cards: ctx.cards,
    G: ctx.G,
    playerId,
    sourceCardId,
  };
}

function createPrintedReplacementCandidate(
  ctx: ReplacementContext,
  sourceId: CardInstanceId,
  controllerId: PlayerId,
  ability: ReplacementAbilityDefinition,
  event: ReplacementEvent,
): ReplacementCandidate | undefined {
  // Handle "lose-lore" replacement with "prevent" string replacement
  if (ability.replaces === "lose-lore" && ability.replacement === "prevent") {
    if (event.kind !== "lose-lore" || event.amount <= 0) {
      return undefined;
    }
    // Only applies to the controller (the card owner's lore)
    if (event.playerId !== controllerId) {
      return undefined;
    }
    // Evaluate the condition (e.g. "during opponents' turns")
    if (
      ability.condition &&
      !evaluateCondition(ability.condition, buildConditionContext(ctx, controllerId, sourceId))
    ) {
      return undefined;
    }
    const abilityKey = ability.id ?? "replacement";
    return {
      id: `${sourceId}:${abilityKey}:prevent-lose-lore`,
      applicationKey: `${sourceId}:${abilityKey}:prevent-lose-lore`,
      apply: (currentEvent) => ({ ...currentEvent, amount: 0 }),
      consume: () => undefined,
    };
  }

  // Handle "discard" replacement with "prevent" string replacement
  if (ability.replaces === "discard" && ability.replacement === "prevent") {
    if (event.kind !== "discard" || event.prevented) {
      return undefined;
    }
    // Only applies to the controller (the card owner's discard)
    if (event.targetPlayerId !== controllerId) {
      return undefined;
    }
    // Evaluate the condition (e.g. "during opponents' turns")
    if (
      ability.condition &&
      !evaluateCondition(ability.condition, buildConditionContext(ctx, controllerId, sourceId))
    ) {
      return undefined;
    }
    const abilityKey = ability.id ?? "replacement";
    return {
      id: `${sourceId}:${abilityKey}:prevent-discard`,
      applicationKey: `${sourceId}:${abilityKey}:prevent-discard`,
      apply: (currentEvent) => ({ ...currentEvent, prevented: true }),
      consume: () => undefined,
    };
  }

  const abilityKind = ability.replacement as ReplacementAbilityKind | undefined;
  if (!abilityKind) {
    return undefined;
  }

  if (abilityKind.type === "prevent-remove-damage") {
    if (event.kind !== "remove-damage" || event.amount <= 0) {
      return undefined;
    }
    return {
      id: `${sourceId}:${ability.id ?? "replacement"}:prevent-remove`,
      applicationKey: `${sourceId}:${ability.id ?? "replacement"}:prevent-remove`,
      apply: (currentEvent) => ({ ...currentEvent, amount: 0 }),
      consume: () => undefined,
    };
  }

  if ((event.kind !== "deal-damage" && event.kind !== "challenge-damage") || event.amount <= 0) {
    return undefined;
  }

  if (abilityKind.type === "redirect-damage") {
    if (event.targetId === sourceId) {
      return undefined;
    }

    if (abilityKind.appliesTo !== "your-other-characters") {
      return undefined;
    }

    if (getCardOwnerId(ctx, event.targetId) !== controllerId) {
      return undefined;
    }

    return {
      id: `${sourceId}:${ability.id ?? "replacement"}:redirect`,
      applicationKey: `${sourceId}:${ability.id ?? "replacement"}:redirect`,
      apply: (currentEvent) => ({ ...currentEvent, targetId: sourceId }),
      consume: () => undefined,
    };
  }

  if (abilityKind.type === "prevent-damage") {
    if (abilityKind.appliesTo !== "self" || event.targetId !== sourceId) {
      return undefined;
    }

    if (
      abilityKind.during === "opponents-turn" &&
      ctx.framework.state.currentPlayer === controllerId
    ) {
      return undefined;
    }

    const abilityKey = ability.id ?? "replacement";
    if (
      abilityKind.firstTimeEachTurn === "opponent-turn" &&
      getUsageCount(ctx, sourceId, abilityKey) > 0
    ) {
      return undefined;
    }

    return {
      id: `${sourceId}:${abilityKey}:prevent`,
      applicationKey: `${sourceId}:${abilityKey}:prevent`,
      apply: (currentEvent) => ({ ...currentEvent, amount: 0 }),
      consume: () => {
        if (abilityKind.firstTimeEachTurn === "opponent-turn") {
          incrementUsage(ctx, sourceId, abilityKey);
        }
      },
    };
  }

  return undefined;
}

function createRegisteredReplacementCandidate(
  ctx: ReplacementContext,
  event: ReplacementEvent,
  registration: ReplacementContext["G"]["replacementEffects"]["registrations"][number],
): ReplacementCandidate | undefined {
  const currentTurn = getCurrentTurn(ctx);
  if (currentTurn < registration.startsAtTurn || currentTurn > registration.expiresAtTurn) {
    return undefined;
  }

  const replacement = registration.replacement;
  const eventKinds = replacement.eventKinds as readonly ReplacementEvent["kind"][];
  if (!eventKinds.includes(event.kind)) {
    return undefined;
  }

  if (replacement.type === "prevent-damage") {
    if (event.kind !== "deal-damage" && event.kind !== "challenge-damage") {
      return undefined;
    }
    if (!registration.targetId || event.targetId !== registration.targetId || event.amount <= 0) {
      return undefined;
    }

    return {
      id: registration.id,
      applicationKey:
        replacement.applicationKey ??
        `${registration.sourceId}:${replacement.type}:${registration.targetId}`,
      apply: (currentEvent) => ({ ...currentEvent, amount: 0 }),
      consume: () => {
        if (replacement.consumeOnApply !== false) {
          const replacementEffects = ensureReplacementEffectsState(ctx);
          replacementEffects.registrations = replacementEffects.registrations.filter(
            (entry) => entry.id !== registration.id,
          );
        }
      },
      consumeSibling: () => {
        if (replacement.consumeOnApply !== false) {
          const replacementEffects = ensureReplacementEffectsState(ctx);
          replacementEffects.registrations = replacementEffects.registrations.filter(
            (entry) => entry.id !== registration.id,
          );
        }
      },
    };
  }

  if (replacement.type === "zone-destination") {
    if (event.kind !== "zone-change" || event.toZone !== replacement.toZone) {
      return undefined;
    }
    // When targetId is set, the replacement applies only to that specific card.
    // When targetId is undefined (e.g. registered before the card-to-be-played is known),
    // scope to any card belonging to the registering controller.
    if (registration.targetId && event.cardId !== registration.targetId) {
      return undefined;
    }
    if (!registration.targetId && event.controllerId !== registration.controllerId) {
      return undefined;
    }

    if (
      Array.isArray(replacement.fromZones) &&
      replacement.fromZones.length > 0 &&
      !replacement.fromZones.includes(event.fromZone)
    ) {
      return undefined;
    }

    return {
      id: registration.id,
      applicationKey:
        replacement.applicationKey ??
        `${registration.sourceId}:${replacement.type}:${registration.targetId}`,
      apply: (currentEvent) => ({
        ...currentEvent,
        toZone: replacement.replacementZone,
        position: replacement.replacementPosition,
      }),
      consume: () => {
        if (replacement.consumeOnApply !== false) {
          const replacementEffects = ensureReplacementEffectsState(ctx);
          replacementEffects.registrations = replacementEffects.registrations.filter(
            (entry) => entry.id !== registration.id,
          );
        }
      },
      consumeSibling: () => {
        if (replacement.consumeOnApply !== false) {
          const replacementEffects = ensureReplacementEffectsState(ctx);
          replacementEffects.registrations = replacementEffects.registrations.filter(
            (entry) => entry.id !== registration.id,
          );
        }
      },
    };
  }

  return undefined;
}

export function registerReplacementEffect(
  ctx: ReplacementContext,
  cardPlayed: CardPlayedPayload,
  replacement: ReplacementRegistrationKind,
  duration: unknown,
  resolutionInput: ActionResolutionInput,
): void {
  const currentTurn = getCurrentTurn(ctx);
  const targetId = resolveRegisteredTargetId(replacement, cardPlayed, resolutionInput);
  const { startsAtTurn, expiresAtTurn } = resolveEffectWindow(currentTurn, duration, {
    currentPlayerId: cardPlayed.playerId,
    targetOwnerId: getCardOwnerId(ctx, targetId),
  });

  const replacementEffects = ensureReplacementEffectsState(ctx);
  replacementEffects.registrations.push({
    id: `replacement:${replacementEffects.nextSeq++}`,
    sourceId: cardPlayed.cardId,
    controllerId: cardPlayed.playerId,
    replacement,
    targetId,
    createdAtTurn: currentTurn,
    startsAtTurn,
    expiresAtTurn,
  });
}

export function pruneExpiredReplacementEffects(
  G: ReplacementContext["G"],
  currentTurn: number,
): void {
  if (!G.replacementEffects) {
    G.replacementEffects = {
      nextSeq: 1,
      registrations: [],
      usageLedger: {
        perTurn: {},
      },
    };
  }

  G.replacementEffects.registrations = G.replacementEffects.registrations.filter(
    (entry) => !isEffectExpired(entry, currentTurn),
  );

  const nextLedger: Record<string, number> = {};
  for (const [key, value] of Object.entries(G.replacementEffects.usageLedger.perTurn)) {
    const turn = Number(key.split(":")[0] ?? 0);
    if (Number.isFinite(turn) && turn >= currentTurn - 1) {
      nextLedger[key] = value;
    }
  }
  G.replacementEffects.usageLedger.perTurn = nextLedger;
}

export function applyReplacementEffects<TEvent extends ReplacementEvent>(
  ctx: ReplacementContext,
  event: TEvent,
  options?: {
    selfReplacement?: NumericSelfReplacement;
    selfReplacementField?: "amount" | "modifier";
    cardPlayed?: CardPlayedPayload;
    resolutionInput?: ActionResolutionInput;
  },
): TEvent {
  const replacementEffects = ensureReplacementEffectsState(ctx);
  let currentEvent: TEvent = event;
  const appliedCandidates = new Set<string>();

  while (true) {
    const selfCandidate =
      options?.selfReplacement &&
      options.cardPlayed &&
      options.resolutionInput &&
      createNumericSelfReplacementCandidate(
        ctx,
        options.selfReplacement,
        currentEvent,
        options.resolutionInput,
        options.cardPlayed,
        options.selfReplacementField ?? "amount",
      );

    const printedCandidates = ctx.framework.state.playerIds.flatMap((playerId) => {
      const playCards = ctx.framework.zones.getCards({
        zone: "play",
        playerId,
      }) as CardInstanceId[];
      return playCards.flatMap((cardId) => {
        const definition = ctx.cards.getDefinition(cardId) as
          | { abilities?: ReplacementAbilityDefinition[] }
          | undefined;
        return (definition?.abilities ?? [])
          .filter(
            (ability): ability is ReplacementAbilityDefinition => ability?.type === "replacement",
          )
          .map((ability) =>
            createPrintedReplacementCandidate(ctx, cardId, playerId, ability, currentEvent),
          )
          .filter((candidate): candidate is ReplacementCandidate => Boolean(candidate));
      });
    });
    const registeredCandidates = replacementEffects.registrations
      .map((registration) => createRegisteredReplacementCandidate(ctx, currentEvent, registration))
      .filter((candidate): candidate is ReplacementCandidate => Boolean(candidate));

    const candidates = [
      ...(selfCandidate ? [selfCandidate] : []),
      ...printedCandidates,
      ...registeredCandidates,
    ].filter((candidate) => !appliedCandidates.has(candidate.id));

    if (candidates.length === 0) {
      return currentEvent;
    }

    const chosen = candidates[0]!;
    const duplicateCandidates = candidates.filter(
      (candidate) =>
        candidate.id !== chosen.id && candidate.applicationKey === chosen.applicationKey,
    );

    appliedCandidates.add(chosen.id);
    duplicateCandidates.forEach((candidate) => appliedCandidates.add(candidate.id));
    currentEvent = chosen.apply(currentEvent) as TEvent;
    chosen.consume();
    duplicateCandidates.forEach((candidate) => candidate.consumeSibling?.() ?? candidate.consume());
  }
}
