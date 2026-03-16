import type {
  CardInstanceId,
  MoveEnumerationContext,
  MoveExecutionContext,
  MoveValidationContext,
  PlayerId,
} from "#core";
import type {
  BagEffectEntry,
  BufferedTriggeredEvent,
  DelayedTriggerTiming,
  DelayedTriggerWindow,
  LorcanaG,
  PendingActionResolutionInput,
  PendingTriggeredEvent,
  TriggeredEventCandidate,
  TriggerRegistration,
  TriggerRegistrationAbility,
  TriggeredAbilitiesState,
} from "../types";
import type { CardPlayedPayload, LorcanaCard } from "../types";
import type {
  Condition,
  TriggeredAbilityDefinition,
  Trigger,
  TriggerRestriction,
  TriggerSubject,
  TriggerSubjectQuery,
} from "@tcg/lorcana-types";
import { emitLorcanaDomainEvent } from "../types";
import { cloneActionResolutionInput } from "../runtime-moves/resolution/action-effects/pending-action-effects";
import { hasKeyword } from "../card-utils";
import { projectLorcanaCardDerived } from "../projection/card-derived";
import type { DerivedStateContext } from "../rules/derived-state";
import { getLorcanaCardName, traceLorcanaRuntimeStep } from "../runtime-trace";
import { passesFilter } from "../targeting/runtime";

export type TriggerWindow =
  | "challenge-declaration"
  | "after-challenge"
  | "start-of-turn"
  | "end-of-turn";

type TriggerRuntimeContext = Pick<
  MoveExecutionContext<LorcanaG, LorcanaCard>,
  "G" | "framework" | "cards"
>;

type TriggerReadContext =
  | Pick<MoveValidationContext<LorcanaG, LorcanaCard>, "G" | "framework">
  | Pick<MoveEnumerationContext<LorcanaG, LorcanaCard>, "G" | "framework">
  | Pick<MoveExecutionContext<LorcanaG, LorcanaCard>, "G" | "framework">;

type TriggerBagStateContext =
  | Pick<MoveValidationContext<LorcanaG, LorcanaCard>, "G">
  | Pick<MoveEnumerationContext<LorcanaG, LorcanaCard>, "G">
  | Pick<MoveExecutionContext<LorcanaG, LorcanaCard>, "G">;

const EMPTY_TRIGGERED_ABILITIES_STATE: TriggeredAbilitiesState = {
  pendingEvents: [],
  registrations: [],
  bag: {
    nextSeq: 1,
    items: [],
  },
  usageLedger: {
    occurrences: {},
    resolutions: {},
  },
};

type TriggeredEventInput = Omit<PendingTriggeredEvent, "id">;

type TriggerMatchCandidate = {
  abilityId: string;
  controllerId: PlayerId;
  sourceId: CardInstanceId;
  cardPlayed: CardPlayedPayload;
  ability: TriggerRegistrationAbility;
  resolutionInput: PendingActionResolutionInput;
};

type TriggerSourceZone = "play" | "hand" | "discard" | "inkwell";

type RegisterAbilityParams = {
  controllerId: PlayerId;
  sourceId: CardInstanceId;
  cardPlayed: CardPlayedPayload;
  ability: TriggerRegistrationAbility;
  lifecycle:
    | {
        kind: "floating";
        startsAtTurn: number;
        expiresAtTurn: number;
      }
    | {
        kind: "delayed";
        timing: DelayedTriggerTiming;
      };
  resolutionInput: PendingActionResolutionInput;
};

function getTriggeredAbilitiesState(G: LorcanaG): TriggeredAbilitiesState {
  const currentState = G.triggeredAbilities;
  if (currentState) {
    currentState.pendingEvents ??= [];
    currentState.registrations ??= [];
    currentState.bag ??= { nextSeq: 1, items: [] };
    currentState.bag.items ??= [];
    currentState.usageLedger ??= { occurrences: {}, resolutions: {} };
    currentState.usageLedger.occurrences ??= {};
    currentState.usageLedger.resolutions ??= {};
    return currentState;
  }

  G.triggeredAbilities = {
    pendingEvents: [],
    registrations: [],
    bag: {
      nextSeq: 1,
      items: [],
    },
    usageLedger: {
      occurrences: {},
      resolutions: {},
    },
  };

  return G.triggeredAbilities;
}

function getTriggeredAbilitiesStateView(
  G: TriggerReadContext["G"] | TriggerBagStateContext["G"],
): TriggeredAbilitiesState {
  return (
    (G.triggeredAbilities as TriggeredAbilitiesState | undefined) ?? EMPTY_TRIGGERED_ABILITIES_STATE
  );
}

function getCurrentTurn(ctx: Pick<TriggerRuntimeContext, "framework">): number {
  return ctx.framework.state.ctx.status.turn ?? 1;
}

function getCompletedTurnsForPlayer(G: LorcanaG, playerId: PlayerId): number {
  return G.turnsCompletedByPlayer[playerId] ?? 0;
}

function getDelayedDueWindow(timing: DelayedTriggerTiming): DelayedTriggerWindow {
  return timing === "start-of-next-turn" ? "start-of-turn" : "end-of-turn";
}

function getDelayedDuePlayerId(
  ctx: TriggerRuntimeContext,
  timing: DelayedTriggerTiming,
  controllerId: PlayerId,
): PlayerId {
  if (timing === "end-of-turn") {
    return ctx.framework.state.currentPlayer ?? controllerId;
  }

  return controllerId;
}

function getDelayedDueCompletedTurns(
  G: LorcanaG,
  timing: DelayedTriggerTiming,
  duePlayerId: PlayerId,
  controllerId: PlayerId,
): number {
  if (timing === "end-of-turn") {
    return getCompletedTurnsForPlayer(G, duePlayerId);
  }

  return getCompletedTurnsForPlayer(G, controllerId) + 1;
}

function getCardOwnerId(
  ctx: TriggerRuntimeContext,
  cardId: string | undefined,
): PlayerId | undefined {
  if (!cardId) {
    return undefined;
  }

  return ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.ownerID;
}

function getCardType(
  ctx: TriggerRuntimeContext,
  cardId: string | undefined,
): LorcanaCard["cardType"] | undefined {
  if (!cardId) {
    return undefined;
  }

  return ctx.cards.getDefinition(cardId)?.cardType;
}

function normalizeBufferedEvent(raw: string | undefined): BufferedTriggeredEvent | undefined {
  switch (raw) {
    case "play":
      return "play";
    case "sing":
      return "sing";
    case "discard":
      return "discard";
    case "draw":
      return "draw";
    case "quest":
      return "quest";
    case "support":
      return "support";
    case "challenge":
      return "challenge";
    case "challenged":
      return "challenged";
    case "challenged-and-banished":
      return "challenged-and-banished";
    case "move":
      return "move";
    case "banish":
      return "banish";
    case "remove-damage":
      return "remove-damage";
    case "ready":
      return "ready";
    case "banish-in-challenge":
      return "banish-in-challenge";
    case "ink":
    case "inkwell":
    case "put-into-inkwell":
    case "add-to-inkwell":
      return "ink";
    case "start-turn":
    case "start-of-turn":
      return "start-turn";
    case "end-turn":
    case "end-of-turn":
      return "end-turn";
    default:
      return undefined;
  }
}

function getPendingTriggeredEventId(
  ctx: TriggerRuntimeContext,
  event: BufferedTriggeredEvent,
): string {
  const stateId = ctx.framework.state.ctx._stateID ?? 0;
  const nextIndex = getTriggeredAbilitiesState(ctx.G).pendingEvents.length + 1;
  return `trigger-event:${stateId}:${event}:${nextIndex}`;
}

function getTriggerRegistrationId(
  ctx: TriggerRuntimeContext,
  sourceId: CardInstanceId,
  controllerId: PlayerId,
): string {
  const stateId = ctx.framework.state.ctx._stateID ?? 0;
  const nextIndex = getTriggeredAbilitiesState(ctx.G).registrations.length + 1;
  return `trigger-registration:${stateId}:${sourceId}:${controllerId}:${nextIndex}`;
}

function getBagItemId(ctx: TriggerRuntimeContext): string {
  const bag = getTriggeredAbilitiesState(ctx.G).bag;
  return `bag:${ctx.framework.state.ctx._stateID ?? 0}:${bag.nextSeq}`;
}

function buildSourcePayload(ctx: TriggerRuntimeContext, sourceId: string): CardPlayedPayload {
  const definition = ctx.cards.getDefinition(sourceId);
  const playerId = getCardOwnerId(ctx, sourceId);
  if (!definition || !playerId) {
    throw new Error(`Unable to build trigger payload for source '${String(sourceId)}'`);
  }

  return {
    playerId,
    cardId: sourceId as CardInstanceId,
    cardType: definition.cardType,
    costType: "free",
  };
}

function normalizeTriggerSourceZone(zoneKey: string | undefined): TriggerSourceZone | undefined {
  if (!zoneKey) {
    return undefined;
  }

  if (zoneKey === "play" || zoneKey.startsWith("play:")) {
    return "play";
  }
  if (zoneKey === "hand" || zoneKey.startsWith("hand:")) {
    return "hand";
  }
  if (zoneKey === "discard" || zoneKey.startsWith("discard:")) {
    return "discard";
  }
  if (zoneKey === "inkwell" || zoneKey.startsWith("inkwell:")) {
    return "inkwell";
  }

  return undefined;
}

function collectTriggeredCandidatesFromCard(args: {
  ctx: TriggerRuntimeContext;
  sourceId: CardInstanceId;
  controllerId: PlayerId;
  zone: TriggerSourceZone;
}): TriggerMatchCandidate[] {
  const { ctx, sourceId, controllerId, zone } = args;
  const definition = ctx.cards.getDefinition(sourceId);
  if (!definition) {
    return [];
  }

  const triggerAbilities = (definition.abilities ?? []).filter(
    (ability): ability is Extract<typeof ability, { type: "triggered" }> =>
      ability.type === "triggered",
  );
  const meta = ctx.cards.require(sourceId).meta as
    | {
        temporaryAbilities?: Record<string, number>;
        temporaryAbilityStarts?: Record<string, number>;
        temporaryAbilityPayloads?: Record<string, unknown>;
      }
    | undefined;
  const temporaryAbilityEntries = Object.entries(meta?.temporaryAbilities ?? {});

  if (triggerAbilities.length === 0 && temporaryAbilityEntries.length === 0) {
    return [];
  }

  const currentTurn = getCurrentTurn(ctx);
  const sourcePayload = buildSourcePayload(ctx, sourceId);
  const candidates: TriggerMatchCandidate[] = [];

  triggerAbilities.forEach((ability, abilityIndex) => {
    const sourceZones = ability.sourceZones ?? ["play"];
    if (!sourceZones.includes(zone)) {
      return;
    }

    candidates.push({
      abilityId: ability.id ?? `${sourceId}:printed-trigger:${abilityIndex}`,
      controllerId,
      sourceId,
      cardPlayed: sourcePayload,
      ability: {
        id: ability.id,
        name: ability.name,
        trigger: ability.trigger,
        sourceZones: ability.sourceZones,
        condition: ability.condition,
        effect: ability.effect,
      },
      resolutionInput: {},
    });
  });

  for (const [abilityKey, expiryTurn] of temporaryAbilityEntries) {
    if (
      typeof expiryTurn !== "number" ||
      !Number.isFinite(expiryTurn) ||
      currentTurn > expiryTurn
    ) {
      continue;
    }

    const startsAtTurn = meta?.temporaryAbilityStarts?.[abilityKey] ?? 1;
    if (
      typeof startsAtTurn !== "number" ||
      !Number.isFinite(startsAtTurn) ||
      currentTurn < startsAtTurn
    ) {
      continue;
    }

    const payload = meta?.temporaryAbilityPayloads?.[abilityKey] as
      | Partial<TriggeredAbilityDefinition>
      | undefined;
    if (!payload || payload.type !== "triggered" || !payload.trigger || !payload.effect) {
      continue;
    }

    const sourceZones = payload.sourceZones ?? ["play"];
    if (!sourceZones.includes(zone)) {
      continue;
    }

    candidates.push({
      abilityId:
        typeof payload.id === "string" && payload.id.length > 0
          ? payload.id
          : `${sourceId}:temporary-trigger:${abilityKey}`,
      controllerId,
      sourceId,
      cardPlayed: sourcePayload,
      ability: {
        id: payload.id,
        name: payload.name,
        trigger: payload.trigger,
        sourceZones: payload.sourceZones,
        condition: payload.condition,
        effect: payload.effect,
      },
      resolutionInput: {},
    });
  }

  return candidates;
}

function cloneTriggeredEventCandidate(candidate: TriggeredEventCandidate): TriggeredEventCandidate {
  return {
    abilityId: candidate.abilityId,
    controllerId: candidate.controllerId,
    sourceId: candidate.sourceId,
    cardPlayed: {
      ...candidate.cardPlayed,
      singerIds: candidate.cardPlayed.singerIds ? [...candidate.cardPlayed.singerIds] : undefined,
    },
    ability: {
      id: candidate.ability.id,
      name: candidate.ability.name,
      trigger: candidate.ability.trigger,
      sourceZones: candidate.ability.sourceZones,
      condition: candidate.ability.condition,
      effect: candidate.ability.effect,
    },
    resolutionInput: cloneActionResolutionInput(candidate.resolutionInput),
  };
}

export function snapshotTriggeredCandidatesForCard(
  ctx: TriggerRuntimeContext,
  sourceId: CardInstanceId,
): TriggeredEventCandidate[] {
  const controllerId = getCardOwnerId(ctx, sourceId);
  const zone = normalizeTriggerSourceZone(
    ctx.framework.state.ctx.zones.private.cardIndex[sourceId]?.zoneKey,
  );
  if (!controllerId || !zone) {
    return [];
  }

  return collectTriggeredCandidatesFromCard({
    ctx,
    sourceId,
    controllerId,
    zone,
  }).map((candidate) => cloneTriggeredEventCandidate(candidate));
}

function relationMatches(
  activePlayer: PlayerId | undefined,
  controllerId: PlayerId,
  whose: "your" | "opponent",
): boolean {
  if (!activePlayer) {
    return false;
  }

  return whose === "your" ? activePlayer === controllerId : activePlayer !== controllerId;
}

function queryMatchesSubject(
  ctx: TriggerRuntimeContext,
  candidate: TriggerMatchCandidate,
  event: PendingTriggeredEvent,
  subject: TriggerSubjectQuery,
): boolean {
  const subjectCardId = event.subjectCardId;
  if (!subjectCardId) {
    return false;
  }

  const definition = ctx.cards.getDefinition(subjectCardId);
  if (!definition) {
    return false;
  }

  const ownerId = getCardOwnerId(ctx, subjectCardId);
  if (!ownerId) {
    return false;
  }

  if (subject.excludeSelf && subjectCardId === candidate.sourceId) {
    return false;
  }

  if (subject.controller === "you" && ownerId !== candidate.controllerId) {
    return false;
  }
  if (subject.controller === "opponent" && ownerId === candidate.controllerId) {
    return false;
  }

  if (subject.cardType && definition.cardType !== subject.cardType) {
    if (!(subject.cardType === "song" && definition.cardType === "action")) {
      return false;
    }
  }

  if (subject.classification) {
    const snapshotClassifications = event.eventSnapshot?.classificationsBeforeBanish;
    const classifications = Array.isArray(snapshotClassifications)
      ? [...snapshotClassifications]
      : (() => {
          const cardIndexEntry = ctx.framework.state.ctx.zones.private.cardIndex[subjectCardId];
          const projected = projectLorcanaCardDerived({
            definition,
            meta: ctx.cards.require(subjectCardId).meta ?? {},
            state: ctx.framework.state as unknown as DerivedStateContext,
            cardInstanceId: subjectCardId,
            ownerID: ownerId,
            controllerID: (cardIndexEntry?.controllerID as PlayerId | undefined) ?? ownerId,
            zoneID: cardIndexEntry?.zoneKey,
            actorPlayerId: candidate.controllerId,
            getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
          });
          const definitionClassifications =
            "classifications" in definition ? definition.classifications : undefined;
          return projected.classifications ?? definitionClassifications ?? [];
        })();
    if (!classifications.includes(subject.classification)) {
      return false;
    }
  }

  if (subject.name && definition.name !== subject.name) {
    return false;
  }

  if (subject.hasKeyword) {
    const keyword = subject.hasKeyword as Parameters<typeof hasKeyword>[1];
    if (!hasKeyword(definition, keyword)) {
      return false;
    }
  }

  if (Array.isArray(subject.filters) && subject.filters.length > 0) {
    const meta = ctx.cards.require(subjectCardId).meta ?? {};
    for (const filter of subject.filters) {
      if (!filter || typeof filter !== "object" || !("type" in filter)) {
        return false;
      }

      switch (filter.type) {
        case "damaged":
          if (Number(meta.damage ?? 0) <= 0) {
            return false;
          }
          break;
        case "exerted":
          if (meta.state !== "exerted") {
            return false;
          }
          break;
        case "ready":
          if (meta.state === "exerted") {
            return false;
          }
          break;
        case "strength-comparison": {
          const runtimeCard = ctx.cards.require(subjectCardId);
          const baseStrength = definition.cardType === "character" ? definition.strength : 0;
          const projectionState = {
            ctx: ctx.framework.state.ctx,
            G: ctx.G,
          };
          const strength = Number(
            projectLorcanaCardDerived({
              definition,
              meta: runtimeCard.meta,
              state: projectionState,
              cardInstanceId: subjectCardId,
              ownerID: runtimeCard.ownerID as PlayerId,
              controllerID: runtimeCard.controllerID as PlayerId,
              zoneID: runtimeCard.zoneID,
              actorPlayerId: event.playerId,
              getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
            }).strength ??
              baseStrength ??
              0,
          );
          if (typeof filter.value !== "number") {
            return false;
          }
          const comparisonValue = filter.value;
          switch (filter.comparison) {
            case "greater":
            case "greater-than":
            case "more-than":
              if (!(strength > comparisonValue)) {
                return false;
              }
              break;
            case "greater-or-equal":
            case "or-more":
              if (!(strength >= comparisonValue)) {
                return false;
              }
              break;
            case "less":
            case "less-than":
              if (!(strength < comparisonValue)) {
                return false;
              }
              break;
            case "less-or-equal":
            case "or-less":
              if (!(strength <= comparisonValue)) {
                return false;
              }
              break;
            case "not-equal":
              if (strength === comparisonValue) {
                return false;
              }
              break;
            case "equal":
            default:
              if (strength !== comparisonValue) {
                return false;
              }
              break;
          }
          break;
        }
        case "cost-comparison": {
          const cost = Number(definition.cost ?? 0);
          if (typeof filter.value !== "number") {
            return false;
          }
          const comparisonValue = filter.value;
          switch (filter.comparison) {
            case "greater":
            case "greater-than":
            case "more-than":
              if (!(cost > comparisonValue)) {
                return false;
              }
              break;
            case "greater-or-equal":
            case "or-more":
              if (!(cost >= comparisonValue)) {
                return false;
              }
              break;
            case "less":
            case "less-than":
              if (!(cost < comparisonValue)) {
                return false;
              }
              break;
            case "less-or-equal":
            case "or-less":
              if (!(cost <= comparisonValue)) {
                return false;
              }
              break;
            case "not-equal":
              if (cost === comparisonValue) {
                return false;
              }
              break;
            case "equal":
            default:
              if (cost !== comparisonValue) {
                return false;
              }
              break;
          }
          break;
        }
        case "at-location": {
          const expectedLocationId =
            filter.location === "this"
              ? candidate.sourceId
              : typeof filter.location === "string"
                ? (filter.location as CardInstanceId)
                : undefined;
          if (!expectedLocationId || meta.atLocationId !== expectedLocationId) {
            return false;
          }
          break;
        }
        default:
          return false;
      }
    }
  }

  return true;
}

function subjectMatches(
  ctx: TriggerRuntimeContext,
  candidate: TriggerMatchCandidate,
  event: PendingTriggeredEvent,
  subject: TriggerSubject | undefined,
): boolean {
  const subjectCardId = event.subjectCardId;
  const subjectOwnerId = getCardOwnerId(ctx, subjectCardId);
  const subjectCardType = getCardType(ctx, subjectCardId);

  if (!subject) {
    return true;
  }

  if (typeof subject === "object") {
    return queryMatchesSubject(ctx, candidate, event, subject);
  }

  switch (subject) {
    case "SELF":
      return subjectCardId === candidate.sourceId;
    case "YOUR_CHARACTERS":
      return subjectOwnerId === candidate.controllerId && subjectCardType === "character";
    case "YOUR_OTHER_CHARACTERS":
      return (
        subjectOwnerId === candidate.controllerId &&
        subjectCardType === "character" &&
        subjectCardId !== candidate.sourceId
      );
    case "OPPONENT_CHARACTERS":
    case "OPPOSING_CHARACTERS":
      return subjectOwnerId !== undefined && subjectOwnerId !== candidate.controllerId;
    case "OTHER_CHARACTERS":
      return subjectCardType === "character" && subjectCardId !== candidate.sourceId;
    case "ANY_CHARACTER":
      return subjectCardType === "character";
    case "YOUR_ITEMS":
      return subjectOwnerId === candidate.controllerId && subjectCardType === "item";
    case "YOUR_LOCATIONS":
      return subjectOwnerId === candidate.controllerId && subjectCardType === "location";
    case "YOUR_ACTIONS":
    case "YOUR_SONGS":
      return subjectOwnerId === candidate.controllerId && subjectCardType === "action";
    case "CHARACTERS_HERE":
    case "CHARACTER_HERE": {
      const subjectAtLocationId =
        (event.eventSnapshot?.subjectAtLocationId as CardInstanceId | undefined) ??
        (subjectCardId
          ? (ctx.cards.get(subjectCardId)?.meta?.atLocationId as CardInstanceId | undefined)
          : undefined);
      return (
        subjectCardId !== undefined &&
        subjectCardType === "character" &&
        subjectAtLocationId === candidate.sourceId
      );
    }
    case "YOU":
    case "CONTROLLER":
      return event.playerId === candidate.controllerId;
    case "OPPONENT":
      return event.playerId !== undefined && event.playerId !== candidate.controllerId;
    case "ANY_PLAYER":
      return event.playerId !== undefined;
    default:
      return false;
  }
}

function restrictionsMatch(
  ctx: TriggerRuntimeContext,
  candidate: TriggerMatchCandidate,
  trigger: Trigger,
  event: PendingTriggeredEvent,
): boolean {
  const restrictions = trigger.restrictions ?? [];
  if (restrictions.length === 0) {
    return true;
  }

  const activePlayer = ctx.framework.state.currentPlayer;
  return restrictions.every((restriction: TriggerRestriction) => {
    switch (restriction.type) {
      case "during-turn":
        return relationMatches(activePlayer, candidate.controllerId, restriction.whose);
      case "from-location":
        return typeof event.fromZone === "string" && event.fromZone.startsWith("location:");
      case "in-challenge":
        return event.happenedInChallenge === true;
      case "once-per-turn":
      case "first-time-each-turn":
        return true;
      default:
        return false;
    }
  });
}

function challengeParticipantMatches(args: {
  ctx: TriggerRuntimeContext;
  candidate: TriggerMatchCandidate;
  participantCardId?: CardInstanceId;
  participant?: { controller?: string; filters?: readonly unknown[] };
  event: PendingTriggeredEvent;
}): boolean {
  const { ctx, candidate, participantCardId, participant, event } = args;
  if (!participant) {
    return true;
  }

  if (!participantCardId) {
    return false;
  }

  const participantDefinition = ctx.cards.getDefinition(participantCardId);
  if (participantDefinition?.cardType !== "character") {
    return false;
  }

  const participantOwnerId = getCardOwnerId(ctx, participantCardId);
  if (!participantOwnerId) {
    return false;
  }

  if (participant.controller === "you" && participantOwnerId !== candidate.controllerId) {
    return false;
  }
  if (participant.controller === "opponent" && participantOwnerId === candidate.controllerId) {
    return false;
  }

  const filters = Array.isArray(participant.filters) ? participant.filters : [];
  const eventSnapshot = {
    ...(event.eventSnapshot ? { ...event.eventSnapshot } : {}),
    subjectCardId: event.subjectCardId,
    triggerSourceCardId: event.triggerSourceCardId,
    attackerId: event.attackerId,
    defenderId: event.defenderId,
  };

  return filters.every(
    (filter) =>
      filter &&
      typeof filter === "object" &&
      passesFilter(
        ctx as Parameters<typeof passesFilter>[0],
        participantCardId,
        filter as Parameters<typeof passesFilter>[2],
        candidate.controllerId,
        {
          eventSnapshot,
          sourceCardId: candidate.sourceId,
          strictUnknownFilters: true,
        },
      ),
  );
}

function buildTriggeredResolutionInput(
  candidate: TriggerMatchCandidate,
  event: PendingTriggeredEvent,
): PendingActionResolutionInput {
  return {
    ...cloneActionResolutionInput(candidate.resolutionInput),
    ...(event.event === "sing" &&
    event.triggerSourceCardId &&
    candidate.resolutionInput.targets === undefined
      ? { targets: event.triggerSourceCardId }
      : {}),
    eventSnapshot: {
      ...(event.eventSnapshot ? { ...event.eventSnapshot } : {}),
      ...(event.cardPlayed
        ? {
            playedCardSingerCount: Array.isArray(event.cardPlayed.singerIds)
              ? event.cardPlayed.singerIds.length
              : undefined,
            playedCardUsedShift: event.cardPlayed.usedShift === true,
          }
        : {}),
      subjectCardId: event.subjectCardId,
      triggerSourceCardId: event.triggerSourceCardId,
      attackerId: event.attackerId,
      defenderId: event.defenderId,
    },
    triggerContext: {
      playerId: event.playerId,
      subjectCardId: event.subjectCardId,
      triggerSourceCardId: event.triggerSourceCardId,
      attackerId: event.attackerId,
      defenderId: event.defenderId,
    },
  };
}

function evaluateTriggeredAbilityCondition(args: {
  ctx: TriggerRuntimeContext;
  candidate: TriggerMatchCandidate;
  condition: Condition | undefined;
  resolutionInput: PendingActionResolutionInput;
}): boolean {
  const { ctx, candidate, condition, resolutionInput } = args;
  if (!condition) {
    return true;
  }

  switch (condition.type) {
    case "and":
      return condition.conditions.every((entry) =>
        evaluateTriggeredAbilityCondition({
          ctx,
          candidate,
          condition: entry,
          resolutionInput,
        }),
      );
    case "or":
      return condition.conditions.some((entry) =>
        evaluateTriggeredAbilityCondition({
          ctx,
          candidate,
          condition: entry,
          resolutionInput,
        }),
      );
    case "not":
      return !evaluateTriggeredAbilityCondition({
        ctx,
        candidate,
        condition: condition.condition,
        resolutionInput,
      });
    case "during-turn":
    case "turn":
      return relationMatches(
        ctx.framework.state.currentPlayer,
        candidate.controllerId,
        condition.whose,
      );
    case "your-turn":
      return ctx.framework.state.currentPlayer === candidate.controllerId;
    case "exerted": {
      const selectedTargets = Array.isArray(resolutionInput.targets)
        ? resolutionInput.targets
        : resolutionInput.targets
          ? [resolutionInput.targets]
          : [];
      const targetId =
        condition.target === "SELF" || condition.target == null
          ? candidate.sourceId
          : selectedTargets[0];
      if (!targetId) {
        return false;
      }
      return ctx.cards.require(targetId).meta?.state === "exerted";
    }
    default:
      return true;
  }
}

function triggerMatchesEvent(
  ctx: TriggerRuntimeContext,
  candidate: TriggerMatchCandidate,
  event: PendingTriggeredEvent,
): boolean {
  const trigger = candidate.ability.trigger;
  const supportedEvents = [
    trigger.event,
    ...(Array.isArray(trigger.events)
      ? trigger.events
          .map((entry) => (typeof entry === "string" ? entry : entry?.event))
          .filter((entry): entry is string => typeof entry === "string")
      : []),
  ]
    .map((entry) => normalizeBufferedEvent(entry))
    .filter((entry): entry is BufferedTriggeredEvent => Boolean(entry));

  if (supportedEvents.length === 0 || !supportedEvents.includes(event.event)) {
    return false;
  }

  if (!subjectMatches(ctx, candidate, event, trigger.on)) {
    return false;
  }

  if (!restrictionsMatch(ctx, candidate, trigger, event)) {
    return false;
  }

  if (
    !challengeParticipantMatches({
      ctx,
      candidate,
      participantCardId: event.attackerId,
      participant: "attacker" in trigger ? trigger.attacker : undefined,
      event,
    })
  ) {
    return false;
  }

  if (
    !challengeParticipantMatches({
      ctx,
      candidate,
      participantCardId: event.defenderId,
      participant: "defender" in trigger ? trigger.defender : undefined,
      event,
    })
  ) {
    return false;
  }

  return evaluateTriggeredAbilityCondition({
    ctx,
    candidate,
    condition: candidate.ability.condition,
    resolutionInput: buildTriggeredResolutionInput(candidate, event),
  });
}

function shouldDeduplicateDiscardBatch(trigger: Trigger, event: PendingTriggeredEvent): boolean {
  if (event.event !== "discard" || !event.eventSnapshot?.triggerBatchKey) {
    return false;
  }

  switch (trigger.on) {
    case "YOU":
    case "CONTROLLER":
    case "OPPONENT":
    case "ANY_PLAYER":
      return true;
    default:
      return false;
  }
}

function getUsageKey(turn: number, sourceId: CardInstanceId, abilityId: string): string {
  return `${turn}:${sourceId}:${abilityId}`;
}

function recordOccurrence(
  ctx: TriggerRuntimeContext,
  sourceId: CardInstanceId,
  abilityId: string,
): { abilityKey: string; occurrenceIndex: number } {
  const currentTurn = getCurrentTurn(ctx);
  const abilityKey = getUsageKey(currentTurn, sourceId, abilityId);
  const ledger = getTriggeredAbilitiesState(ctx.G).usageLedger.occurrences;
  const occurrenceIndex = (ledger[abilityKey] ?? 0) + 1;
  ledger[abilityKey] = occurrenceIndex;
  return { abilityKey, occurrenceIndex };
}

function enqueueBagEffect(
  ctx: TriggerRuntimeContext,
  entry: Omit<BagEffectEntry, "id" | "type">,
): BagEffectEntry {
  const bag = getTriggeredAbilitiesState(ctx.G).bag;
  const bagEntry: BagEffectEntry = {
    id: getBagItemId(ctx),
    type: "bag-effect",
    ...entry,
  };

  bag.nextSeq += 1;
  bag.items.push(bagEntry);
  traceLorcanaRuntimeStep({
    kind: "bag.effect.queued",
    moveId: "resolveBag",
    playerId: bagEntry.controllerId,
    bagItemId: bagEntry.id,
    cardId: bagEntry.sourceId,
    cardName: getLorcanaCardName(bagEntry.sourceId, (cardId) => ctx.cards.getDefinition(cardId)),
    message: "Bag effect is queued",
    payload: {
      abilityId: bagEntry.abilityId,
      occurrenceIndex: bagEntry.occurrenceIndex,
    },
  });
  return bagEntry;
}

function collectPrintedTriggerCandidates(ctx: TriggerRuntimeContext): TriggerMatchCandidate[] {
  const candidates: TriggerMatchCandidate[] = [];

  for (const playerId of ctx.framework.state.playerIds) {
    const visitedCardIds = new Set<string>();
    const zoneBuckets: Array<"play" | "hand" | "discard" | "inkwell"> = [
      "play",
      "hand",
      "discard",
      "inkwell",
    ];

    for (const zone of zoneBuckets) {
      const cardsInZone = ctx.framework.zones.getCards({ zone, playerId });
      for (const cardId of cardsInZone) {
        if (visitedCardIds.has(cardId)) {
          continue;
        }

        const definition = ctx.cards.getDefinition(cardId);
        if (!definition) {
          continue;
        }

        visitedCardIds.add(cardId);
        candidates.push(
          ...collectTriggeredCandidatesFromCard({
            ctx,
            sourceId: cardId as CardInstanceId,
            controllerId: playerId,
            zone,
          }),
        );
      }
    }
  }

  return candidates;
}

function collectFloatingTriggerCandidates(ctx: TriggerRuntimeContext): TriggerMatchCandidate[] {
  const currentTurn = getCurrentTurn(ctx);
  return getTriggeredAbilitiesState(ctx.G)
    .registrations.filter(
      (entry) =>
        entry.lifecycle.kind === "floating" &&
        currentTurn >= entry.lifecycle.startsAtTurn &&
        currentTurn <= entry.lifecycle.expiresAtTurn,
    )
    .map((entry) => ({
      abilityId: entry.abilityId,
      controllerId: entry.controllerId,
      sourceId: entry.sourceId,
      cardPlayed: {
        ...entry.cardPlayed,
        singerIds: entry.cardPlayed.singerIds ? [...entry.cardPlayed.singerIds] : undefined,
      },
      ability: entry.ability,
      resolutionInput: cloneActionResolutionInput(entry.resolutionInput),
    }));
}

function enqueueMatchedTrigger(
  ctx: TriggerRuntimeContext,
  candidate: TriggerMatchCandidate,
  event: PendingTriggeredEvent,
): BagEffectEntry {
  const { abilityKey, occurrenceIndex } = recordOccurrence(
    ctx,
    candidate.sourceId,
    candidate.abilityId,
  );

  const resolutionInput = buildTriggeredResolutionInput(candidate, event);

  return enqueueBagEffect(ctx, {
    kind: "triggered-ability",
    abilityId: candidate.abilityId,
    abilityKey,
    abilityName: candidate.ability.name,
    controllerId: candidate.controllerId,
    chooserId: candidate.controllerId,
    sourceId: candidate.sourceId,
    cardPlayed: candidate.cardPlayed,
    trigger: candidate.ability.trigger,
    condition: candidate.ability.condition,
    effect: candidate.ability.effect,
    occurrenceIndex,
    resolutionInput,
  });
}

function enqueueDueDelayedRegistrations(
  ctx: TriggerRuntimeContext,
  params: {
    playerId: PlayerId;
    window: DelayedTriggerWindow;
  },
): number {
  const state = getTriggeredAbilitiesState(ctx.G);
  const completedTurns = getCompletedTurnsForPlayer(ctx.G, params.playerId);
  const dueRegistrations = state.registrations.filter(
    (entry) =>
      entry.lifecycle.kind === "delayed" &&
      entry.lifecycle.duePlayerId === params.playerId &&
      entry.lifecycle.dueWindow === params.window &&
      entry.lifecycle.dueCompletedTurns === completedTurns,
  );

  if (dueRegistrations.length === 0) {
    return 0;
  }

  state.registrations = state.registrations.filter(
    (entry) => !dueRegistrations.some((candidate) => candidate.id === entry.id),
  );

  for (const registration of dueRegistrations) {
    const { abilityKey, occurrenceIndex } = recordOccurrence(
      ctx,
      registration.sourceId,
      registration.abilityId,
    );
    enqueueBagEffect(ctx, {
      kind: "triggered-ability",
      abilityId: registration.abilityId,
      abilityKey,
      abilityName: registration.ability.name,
      controllerId: registration.controllerId,
      chooserId: registration.controllerId,
      sourceId: registration.sourceId,
      cardPlayed: {
        ...registration.cardPlayed,
        singerIds: registration.cardPlayed.singerIds
          ? [...registration.cardPlayed.singerIds]
          : undefined,
      },
      trigger: registration.ability.trigger,
      condition: registration.ability.condition,
      effect: registration.ability.effect,
      occurrenceIndex,
      resolutionInput: cloneActionResolutionInput(registration.resolutionInput),
    });
  }

  return dueRegistrations.length;
}

function getTriggerCandidateKey(
  candidate: Pick<TriggerMatchCandidate, "sourceId" | "controllerId" | "abilityId">,
): string {
  return `${candidate.sourceId}:${candidate.controllerId}:${candidate.abilityId}`;
}

export function recordEvent(
  ctx: TriggerRuntimeContext,
  input: TriggeredEventInput,
): PendingTriggeredEvent {
  const state = getTriggeredAbilitiesState(ctx.G);
  const entry: PendingTriggeredEvent = {
    id: getPendingTriggeredEventId(ctx, input.event),
    ...input,
    triggerCandidates: input.triggerCandidates?.map((candidate) =>
      cloneTriggeredEventCandidate(candidate),
    ),
  };

  state.pendingEvents.push(entry);
  return entry;
}

export function openWindow(
  ctx: TriggerRuntimeContext,
  params: {
    window: TriggerWindow;
    playerId?: PlayerId;
    events?: TriggeredEventInput | TriggeredEventInput[];
  },
): void {
  if (params.window === "start-of-turn" && params.playerId) {
    recordEvent(ctx, {
      event: "start-turn",
      playerId: params.playerId,
    });
  }

  if (params.window === "end-of-turn" && params.playerId) {
    recordEvent(ctx, {
      event: "end-turn",
      playerId: params.playerId,
    });
  }

  if (Array.isArray(params.events)) {
    params.events.forEach((entry) => recordEvent(ctx, entry));
    return;
  }

  if (params.events) {
    recordEvent(ctx, params.events);
  }
}

export function emitTriggeredLorcanaEvent<
  TType extends Parameters<typeof emitLorcanaDomainEvent>[1],
>(
  ctx: TriggerRuntimeContext,
  customType: TType,
  data: Parameters<typeof emitLorcanaDomainEvent<TType>>[2],
  triggeredEvent?: TriggeredEventInput | TriggeredEventInput[],
): void {
  emitLorcanaDomainEvent(ctx.framework.events, customType, data);
  const triggeredEventWithPayload = (entry: TriggeredEventInput): TriggeredEventInput => {
    if (customType !== "cardPlayed") {
      return entry;
    }

    const cardPlayed = data as CardPlayedPayload;
    return {
      ...entry,
      cardPlayed: {
        ...cardPlayed,
        singerIds: cardPlayed.singerIds ? [...cardPlayed.singerIds] : undefined,
      },
    };
  };

  if (Array.isArray(triggeredEvent)) {
    triggeredEvent.forEach((entry) => recordEvent(ctx, triggeredEventWithPayload(entry)));
    return;
  }

  if (triggeredEvent) {
    recordEvent(ctx, triggeredEventWithPayload(triggeredEvent));
  }
}

export function registerAbility(
  ctx: TriggerRuntimeContext,
  params: RegisterAbilityParams,
): TriggerRegistration {
  const state = getTriggeredAbilitiesState(ctx.G);
  const registrationId = getTriggerRegistrationId(ctx, params.sourceId, params.controllerId);
  const lifecycle =
    params.lifecycle.kind === "floating"
      ? {
          kind: "floating" as const,
          startsAtTurn: params.lifecycle.startsAtTurn,
          expiresAtTurn: params.lifecycle.expiresAtTurn,
        }
      : (() => {
          const duePlayerId = getDelayedDuePlayerId(
            ctx,
            params.lifecycle.timing,
            params.controllerId,
          );
          return {
            kind: "delayed" as const,
            timing: params.lifecycle.timing,
            dueWindow: getDelayedDueWindow(params.lifecycle.timing),
            duePlayerId,
            dueCompletedTurns: getDelayedDueCompletedTurns(
              ctx.G,
              params.lifecycle.timing,
              duePlayerId,
              params.controllerId,
            ),
          };
        })();

  const entry: TriggerRegistration = {
    id: registrationId,
    abilityId: params.ability.id ?? registrationId,
    sourceId: params.sourceId,
    controllerId: params.controllerId,
    cardPlayed: {
      ...params.cardPlayed,
      singerIds: params.cardPlayed.singerIds ? [...params.cardPlayed.singerIds] : undefined,
    },
    ability: {
      id: params.ability.id,
      name: params.ability.name,
      trigger: params.ability.trigger,
      sourceZones: params.ability.sourceZones,
      condition: params.ability.condition,
      effect: params.ability.effect,
    },
    lifecycle,
    resolutionInput: cloneActionResolutionInput(params.resolutionInput),
  };

  state.registrations.push(entry);
  return entry;
}

export function pruneExpiredTriggerRegistrations(G: LorcanaG, currentTurn: number): void {
  const state = getTriggeredAbilitiesState(G);
  state.registrations = state.registrations.filter(
    (entry) => entry.lifecycle.kind === "delayed" || currentTurn <= entry.lifecycle.expiresAtTurn,
  );
}

export function finalizeResolutionBoundary(
  ctx: TriggerRuntimeContext,
  params?: {
    playerId?: PlayerId;
    window?: DelayedTriggerWindow;
  },
): number {
  const state = getTriggeredAbilitiesState(ctx.G);
  const events = [...state.pendingEvents];
  state.pendingEvents = [];

  let created = 0;
  if (events.length > 0) {
    const boardCandidates = [
      ...collectPrintedTriggerCandidates(ctx),
      ...collectFloatingTriggerCandidates(ctx),
    ];
    const deduplicatedDiscardBatches = new Set<string>();

    for (const event of events) {
      const eventCandidates: TriggerMatchCandidate[] = (event.triggerCandidates ?? []).map(
        (candidate) => cloneTriggeredEventCandidate(candidate),
      );
      const seenCandidates = new Set<string>();
      for (const candidate of [...eventCandidates, ...boardCandidates]) {
        const candidateKey = getTriggerCandidateKey(candidate);
        if (seenCandidates.has(candidateKey)) {
          continue;
        }
        seenCandidates.add(candidateKey);

        if (!triggerMatchesEvent(ctx, candidate, event)) {
          continue;
        }

        if (shouldDeduplicateDiscardBatch(candidate.ability.trigger, event)) {
          const dedupeKey = [
            candidate.sourceId,
            candidate.abilityId,
            event.playerId,
            event.eventSnapshot?.triggerBatchKey,
          ].join(":");
          if (deduplicatedDiscardBatches.has(dedupeKey)) {
            continue;
          }
          deduplicatedDiscardBatches.add(dedupeKey);
        }

        enqueueMatchedTrigger(ctx, candidate, event);
        created += 1;
      }
    }
  }

  if (params?.playerId && params.window) {
    created += enqueueDueDelayedRegistrations(ctx, {
      playerId: params.playerId,
      window: params.window,
    });
  }

  const nextResolver = getNextBagResolver(ctx);
  if (nextResolver) {
    if (typeof ctx.framework.priority?.setHolder === "function") {
      ctx.framework.priority.setHolder(nextResolver);
    } else {
      (
        ctx.framework.state.ctx.priority as {
          holder?: PlayerId;
        }
      ).holder = nextResolver;
    }
  }

  return created;
}

export function canResolveBagEffectByRestrictions(
  ctx: Pick<TriggerRuntimeContext, "G">,
  bagEffect: Pick<BagEffectEntry, "abilityKey" | "occurrenceIndex" | "trigger">,
): boolean {
  const restrictions = bagEffect.trigger?.restrictions ?? [];
  if (restrictions.length === 0) {
    return true;
  }

  if (
    restrictions.some((restriction) => restriction.type === "first-time-each-turn") &&
    bagEffect.occurrenceIndex > 1
  ) {
    return false;
  }

  if (
    restrictions.some((restriction) => restriction.type === "once-per-turn") &&
    (getTriggeredAbilitiesState(ctx.G).usageLedger.resolutions[bagEffect.abilityKey] ?? 0) > 0
  ) {
    return false;
  }

  return true;
}

export function recordBagEffectResolution(
  ctx: Pick<TriggerRuntimeContext, "G">,
  bagEffect: Pick<BagEffectEntry, "abilityKey" | "trigger">,
): void {
  const restrictions = bagEffect.trigger?.restrictions ?? [];
  if (
    !restrictions.some(
      (restriction) =>
        restriction.type === "once-per-turn" || restriction.type === "first-time-each-turn",
    )
  ) {
    return;
  }

  const resolutions = getTriggeredAbilitiesState(ctx.G).usageLedger.resolutions;
  resolutions[bagEffect.abilityKey] = (resolutions[bagEffect.abilityKey] ?? 0) + 1;
}

export function getNextBagResolver(ctx: TriggerReadContext): PlayerId | undefined {
  const bagItems = getTriggeredAbilitiesStateView(ctx.G).bag.items ?? [];
  if (bagItems.length === 0) {
    return undefined;
  }

  const playerOrder = ctx.framework.state.playerIds;
  const lastResolvedPlayerId = getTriggeredAbilitiesStateView(ctx.G).bag.lastResolvedPlayerId;

  if (
    lastResolvedPlayerId &&
    bagItems.some((entry) => entry.controllerId === lastResolvedPlayerId)
  ) {
    return lastResolvedPlayerId;
  }

  const startPlayer =
    lastResolvedPlayerId ?? ctx.framework.state.currentPlayer ?? ctx.framework.state.playerIds[0];
  const startIndex = Math.max(0, playerOrder.indexOf(startPlayer));

  for (let offset = 0; offset < playerOrder.length; offset += 1) {
    const playerId = playerOrder[(startIndex + offset) % playerOrder.length]!;
    if (bagItems.some((entry) => entry.controllerId === playerId)) {
      return playerId;
    }
  }

  return undefined;
}

export function getBagItemsForCurrentResolver(ctx: TriggerReadContext): BagEffectEntry[] {
  const resolver = getNextBagResolver(ctx);
  if (!resolver) {
    return [];
  }

  return (getTriggeredAbilitiesStateView(ctx.G).bag.items ?? []).filter(
    (entry) => entry.controllerId === resolver,
  );
}

export function hasPendingBagItems(ctx: TriggerBagStateContext): boolean {
  return (getTriggeredAbilitiesStateView(ctx.G).bag.items?.length ?? 0) > 0;
}

export function removeBagEffect(
  ctx: Pick<TriggerRuntimeContext, "G">,
  bagId: string,
): BagEffectEntry | undefined {
  const bag = getTriggeredAbilitiesState(ctx.G).bag;
  const index = bag.items.findIndex((entry) => entry.id === bagId);
  if (index < 0) {
    return undefined;
  }

  const [entry] = bag.items.splice(index, 1);
  if (bag.items.length === 0) {
    bag.lastResolvedPlayerId = undefined;
  }
  return entry;
}

export function setLastBagResolver(
  ctx: Pick<TriggerRuntimeContext, "G">,
  playerId: PlayerId,
): void {
  getTriggeredAbilitiesState(ctx.G).bag.lastResolvedPlayerId = playerId;
}

export const queueTriggeredEvent = recordEvent;
export const flushTriggeredEventsToBag = finalizeResolutionBoundary;
