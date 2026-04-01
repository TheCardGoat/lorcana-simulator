import type { CardInstanceId, DeepReadonly, PlayerId } from "#core";
import type {
  ActivatedAbilityDefinition,
  CardSelectionFilter,
  Condition,
  Effect,
  LorcanaCardDefinition,
  VariableAmount,
} from "@tcg/lorcana-types";
import type {
  MaterializedStaticEffect,
  StaticEffectRegistry,
} from "../../rules/static-effect-registry";
import { cardHasName, hasKeyword } from "../../card-utils";
import { normalizeTargetDescriptor, resolveCandidateTargets } from "../../targeting/runtime";
import { compareOperator } from "../../rules/operator-utils";
import type {
  LorcanaG,
  StaticAbilityDefinition,
  TemporaryGrantedAbilityPayload,
} from "../../types";
import { isClassification } from "../../types";

type StaticAbilityState = {
  readonly priority?: {
    readonly holder?: string;
  };
  readonly status?: {
    readonly turn?: number;
    readonly otp?: string;
  };
  readonly _zonesPrivate?: {
    readonly cardIndex?: Record<
      string,
      | {
          readonly zoneKey?: string;
          readonly ownerID?: string;
          readonly controllerID?: string;
        }
      | undefined
    >;
    readonly cardMeta?: Record<
      string,
      | {
          readonly atLocationId?: CardInstanceId;
          readonly state?: string;
          readonly damage?: number;
        }
      | undefined
    >;
    readonly zoneCards?: Record<string, readonly string[] | undefined>;
  };
  /** Public zone summaries — available on both server and client (counts only, no card IDs for hidden zones). */
  readonly _zonesPublic?: {
    readonly zoneSummaries?: Record<string, { readonly count?: number } | undefined>;
  };
  readonly G?: DeepReadonly<{
    readonly lore?: LorcanaG["lore"];
    readonly turnMetadata?: Partial<LorcanaG["turnMetadata"]>;
    readonly challengeState?: LorcanaG["challengeState"];
  }>;
};

// Inline registry accessors — avoids circular runtime import from static-effect-registry.ts
// (that module imports helpers from this module at runtime, so we import only its types)
function registryEffectsForCard(
  registry: StaticEffectRegistry,
  cardId: CardInstanceId,
  kind: MaterializedStaticEffect["kind"],
): MaterializedStaticEffect[] {
  return (registry.byTarget.get(cardId) ?? []).filter((e) => e.kind === kind);
}

function registryEffectsForPlayer(
  registry: StaticEffectRegistry,
  playerId: PlayerId,
  kind: MaterializedStaticEffect["kind"],
): MaterializedStaticEffect[] {
  return (registry.byPlayer.get(playerId) ?? []).filter((e) => e.kind === kind);
}

function matchesCardSelectionFilter(args: {
  definition: LorcanaCardDefinition;
  filter: CardSelectionFilter;
  sourceId?: CardInstanceId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { definition, filter, sourceId, getDefinitionByInstanceId } = args;

  if (typeof filter.classification === "string") {
    if (!(definition.classifications ?? []).includes(filter.classification as never)) {
      return false;
    }
  }

  if (typeof filter.name === "string" && !cardHasName(definition, filter.name)) {
    return false;
  }

  if (typeof filter.cardType === "string") {
    if (filter.cardType === "song") {
      if (!(definition.cardType === "action" && definition.actionSubtype === "song")) {
        return false;
      }
    } else if (definition.cardType !== filter.cardType) {
      return false;
    }
  }

  if (typeof filter.notCardType === "string") {
    if (filter.notCardType === "song") {
      if (definition.cardType === "action" && definition.actionSubtype === "song") {
        return false;
      }
    } else if (definition.cardType === filter.notCardType) {
      return false;
    }
  }

  if (typeof filter.maxCost === "number" && definition.cost > filter.maxCost) {
    return false;
  }

  if (filter.sameNameAsSource === true) {
    if (!sourceId) {
      return false;
    }

    const sourceDefinition = getDefinitionByInstanceId?.(sourceId);
    if (!sourceDefinition?.name || definition.name !== sourceDefinition.name) {
      return false;
    }
  }

  if (filter.sameInstanceAsSource === true && sourceId) {
    return false;
  }

  if (filter.sameNameAsChosenCard === true || filter.excludeChosenCard === true) {
    return false;
  }

  return true;
}

function getTemporaryGrantedActivatedAbilities(args: {
  state: StaticAbilityState;
  cardId: CardInstanceId;
}): Array<{ ability: ActivatedAbilityDefinition; sourceId: CardInstanceId }> {
  const { state, cardId } = args;
  const currentTurn = state.status?.turn ?? 1;
  const meta = state._zonesPrivate?.cardMeta?.[cardId] as
    | {
        readonly temporaryAbilities?: Record<string, number>;
        readonly temporaryAbilityStarts?: Record<string, number>;
        readonly temporaryAbilityPayloads?: Record<string, TemporaryGrantedAbilityPayload>;
      }
    | undefined;
  const temporaryAbilities = meta?.temporaryAbilities;
  if (!temporaryAbilities) {
    return [];
  }

  const grantedAbilities: Array<{
    ability: ActivatedAbilityDefinition;
    sourceId: CardInstanceId;
  }> = [];

  for (const [abilityKey, expiryTurn] of Object.entries(temporaryAbilities)) {
    const startsAtTurn = meta?.temporaryAbilityStarts?.[abilityKey] ?? 1;
    if (
      typeof expiryTurn !== "number" ||
      !Number.isFinite(expiryTurn) ||
      currentTurn < startsAtTurn ||
      currentTurn > expiryTurn
    ) {
      continue;
    }

    const resolvedAbility = resolveTemporaryGrantedActivatedAbility({
      cardId,
      abilityKey,
      payload: meta?.temporaryAbilityPayloads?.[abilityKey],
    });
    if (!resolvedAbility) {
      continue;
    }

    grantedAbilities.push({
      sourceId: cardId,
      ability: resolvedAbility,
    });
  }

  return grantedAbilities;
}

function resolveTemporaryGrantedActivatedAbility(args: {
  cardId: CardInstanceId;
  abilityKey: string;
  payload?: TemporaryGrantedAbilityPayload;
}): ActivatedAbilityDefinition | undefined {
  const { cardId, abilityKey, payload } = args;
  if (isStructuredTemporaryActivatedAbility(payload)) {
    return {
      ...payload,
      id:
        typeof payload.id === "string" && payload.id.length > 0
          ? payload.id
          : `${cardId}-temporary-${abilityKey}`,
    };
  }

  const registryKey =
    typeof payload?.type === "string" && payload.type.length > 0 ? payload.type : abilityKey;
  const abilityFactory = temporaryGrantedActivatedAbilityRegistry[registryKey];

  return abilityFactory?.({ cardId, abilityKey, payload });
}

function isStructuredTemporaryActivatedAbility(
  payload: TemporaryGrantedAbilityPayload | undefined,
): payload is TemporaryGrantedAbilityPayload & ActivatedAbilityDefinition {
  return (
    typeof payload === "object" &&
    payload !== null &&
    !Array.isArray(payload) &&
    payload.type === "activated" &&
    "effect" in payload &&
    typeof payload.effect === "object" &&
    payload.effect !== null
  );
}

const temporaryGrantedActivatedAbilityRegistry: Record<
  string,
  (args: {
    cardId: CardInstanceId;
    abilityKey: string;
    payload?: TemporaryGrantedAbilityPayload;
  }) => ActivatedAbilityDefinition
> = {
  "banish-damaged-when-exerted": ({ cardId, abilityKey }) => ({
    id: `${cardId}-temporary-${abilityKey}`,
    type: "activated",
    cost: { exert: true },
    effect: {
      type: "banish",
      target: {
        selector: "chosen",
        count: 1,
        owner: "any",
        zones: ["play"],
        cardTypes: ["character"],
        filter: [{ type: "status", status: "damaged" }],
      },
    },
    text: "{E} - Banish chosen damaged character.",
  }),
};

function countCardsPlayedThisTurnMatching(args: {
  state: StaticAbilityState;
  predicate: (definition: LorcanaCardDefinition | undefined) => boolean;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): number {
  const { state, predicate, getDefinitionByInstanceId } = args;
  return (state.G?.turnMetadata?.cardsPlayedThisTurn ?? []).reduce((count, cardId) => {
    return predicate(getDefinitionByInstanceId?.(cardId)) ? count + 1 : count;
  }, 0);
}

function getActivePlayerId(state: StaticAbilityState): PlayerId | undefined {
  return state.priority?.holder as PlayerId | undefined;
}

export function getCardZoneKey(
  state: StaticAbilityState,
  cardId: CardInstanceId,
): string | undefined {
  const entry = state._zonesPrivate?.cardIndex?.[cardId];
  const zoneKey = entry?.zoneKey;
  return typeof zoneKey === "string" && zoneKey.length > 0 ? zoneKey : undefined;
}

export function isCardInPlay(state: StaticAbilityState, cardId: CardInstanceId): boolean {
  const zoneKey = getCardZoneKey(state, cardId);
  return zoneKey !== undefined && (zoneKey === "play" || zoneKey.startsWith("play:"));
}

function staticEffectContainsRestriction(args: {
  effect: StaticAbilityDefinition["effect"] | Effect;
  restriction: string;
  target?: "SELF" | "CONTROLLER";
}): boolean {
  const { effect, restriction, target } = args;

  if (effect.type === "restriction") {
    return effect.restriction === restriction && (target === undefined || effect.target === target);
  }

  if (effect.type === "sequence") {
    const steps = effect.steps ?? effect.effects ?? [];
    return steps.some((step) =>
      staticEffectContainsRestriction({ effect: step, restriction, target }),
    );
  }

  if (effect.type === "conditional") {
    const thenEffect = effect.then ?? effect.effect ?? effect.ifTrue;
    const elseEffect = effect.else ?? effect.ifFalse;
    return (
      (thenEffect
        ? staticEffectContainsRestriction({
            effect: thenEffect,
            restriction,
            target,
          })
        : false) ||
      (elseEffect
        ? staticEffectContainsRestriction({
            effect: elseEffect,
            restriction,
            target,
          })
        : false)
    );
  }

  if (effect.type === "optional" && effect.effect) {
    return staticEffectContainsRestriction({
      effect: effect.effect,
      restriction,
      target,
    });
  }

  if (effect.type === "or") {
    const options = effect.options ?? effect.choices ?? [];
    return options.some((option) =>
      staticEffectContainsRestriction({ effect: option, restriction, target }),
    );
  }

  if (effect.type === "for-each" && effect.effect) {
    return staticEffectContainsRestriction({
      effect: effect.effect,
      restriction,
      target,
    });
  }

  return false;
}

function staticEffectAppliesCardRestriction(args: {
  effect: StaticAbilityDefinition["effect"] | Effect;
  restriction: string;
  state: StaticAbilityState;
  sourceId: CardInstanceId;
  targetCardId: CardInstanceId;
  controllerId?: PlayerId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const {
    effect,
    restriction,
    state,
    sourceId,
    targetCardId,
    controllerId,
    getDefinitionByInstanceId,
  } = args;

  if (effect.type === "restriction") {
    return (
      effect.restriction === restriction &&
      matchesStaticAbilityTarget({
        state,
        target: effect.target,
        sourceId,
        targetCardId,
        controllerId,
        getDefinitionByInstanceId,
      })
    );
  }

  if (effect.type === "sequence") {
    const steps = effect.steps ?? effect.effects ?? [];
    return steps.some((step) =>
      staticEffectAppliesCardRestriction({
        effect: step,
        restriction,
        state,
        sourceId,
        targetCardId,
        controllerId,
        getDefinitionByInstanceId,
      }),
    );
  }

  if (effect.type === "conditional") {
    const thenEffect = effect.then ?? effect.effect ?? effect.ifTrue;
    const elseEffect = effect.else ?? effect.ifFalse;
    return (
      (thenEffect
        ? staticEffectAppliesCardRestriction({
            effect: thenEffect,
            restriction,
            state,
            sourceId,
            targetCardId,
            controllerId,
            getDefinitionByInstanceId,
          })
        : false) ||
      (elseEffect
        ? staticEffectAppliesCardRestriction({
            effect: elseEffect,
            restriction,
            state,
            sourceId,
            targetCardId,
            controllerId,
            getDefinitionByInstanceId,
          })
        : false)
    );
  }

  if (effect.type === "optional" && effect.effect) {
    return staticEffectAppliesCardRestriction({
      effect: effect.effect,
      restriction,
      state,
      sourceId,
      targetCardId,
      controllerId,
      getDefinitionByInstanceId,
    });
  }

  if (effect.type === "or") {
    const options = effect.options ?? effect.choices ?? [];
    return options.some((option) =>
      staticEffectAppliesCardRestriction({
        effect: option,
        restriction,
        state,
        sourceId,
        targetCardId,
        controllerId,
        getDefinitionByInstanceId,
      }),
    );
  }

  if (effect.type === "for-each" && effect.effect) {
    return staticEffectAppliesCardRestriction({
      effect: effect.effect,
      restriction,
      state,
      sourceId,
      targetCardId,
      controllerId,
      getDefinitionByInstanceId,
    });
  }

  return false;
}

function staticEffectAppliesPlayerRestriction(args: {
  effect: StaticAbilityDefinition["effect"];
  restriction: string;
  target: "CONTROLLER";
}): boolean {
  return staticEffectContainsRestriction(args);
}

function getStatePlayerIds(state: StaticAbilityState): PlayerId[] {
  const playerIds = new Set<PlayerId>();

  for (const entry of Object.values(state._zonesPrivate?.cardIndex ?? {})) {
    if (!entry || typeof entry !== "object") {
      continue;
    }

    const ownerId = "ownerID" in entry ? (entry.ownerID as PlayerId | undefined) : undefined;
    const controllerId =
      "controllerID" in entry ? (entry.controllerID as PlayerId | undefined) : undefined;

    if (ownerId) {
      playerIds.add(ownerId);
    }
    if (controllerId) {
      playerIds.add(controllerId);
    }
  }

  // Include all players tracked in G.lore (covers opponents with no cards in play)
  for (const playerId of Object.keys(state.G?.lore ?? {})) {
    playerIds.add(playerId as PlayerId);
  }

  const activePlayerId = getActivePlayerId(state);
  if (activePlayerId) {
    playerIds.add(activePlayerId);
  }

  return [...playerIds];
}

function createStaticAbilityTargetContext(args: {
  state: StaticAbilityState;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}) {
  const { state, getDefinitionByInstanceId } = args;

  return {
    disableFilterRegistry: true,
    G: state.G,
    cards: {
      getDefinition: getDefinitionByInstanceId,
      require: (cardId: CardInstanceId) => ({
        meta: state._zonesPrivate?.cardMeta?.[cardId] ?? {},
      }),
    },
    framework: {
      state: {
        priority: state.priority as ConditionEvaluationContext["framework"]["state"]["priority"],
        status: state.status as ConditionEvaluationContext["framework"]["state"]["status"],
        _zonesPrivate:
          state._zonesPrivate as ConditionEvaluationContext["framework"]["state"]["_zonesPrivate"],
        currentPlayer: getActivePlayerId(state),
        playerIds: getStatePlayerIds(state),
      },
      zones: {
        getCards: ({ zone, playerId }: { zone: string; playerId: PlayerId }) => {
          if (zone === "play") {
            const playerZone = state._zonesPrivate?.zoneCards?.[`play:${playerId}`];
            if (playerZone) return playerZone as CardInstanceId[];

            const globalPlay = state._zonesPrivate?.zoneCards?.play;
            if (globalPlay) {
              return globalPlay.filter(
                (id) => state._zonesPrivate?.cardIndex?.[id]?.controllerID === playerId,
              ) as CardInstanceId[];
            }
            return [];
          }
          return (state._zonesPrivate?.zoneCards?.[`${zone}:${playerId}`] ??
            []) as CardInstanceId[];
        },
        getCardZone: (cardId: CardInstanceId) => state._zonesPrivate?.cardIndex?.[cardId]?.zoneKey,
        getCardOwner: (cardId: CardInstanceId) =>
          state._zonesPrivate?.cardIndex?.[cardId]?.controllerID,
      },
    },
  };
}

export function matchesLegacyStaticTarget(args: {
  state: StaticAbilityState;
  target: unknown;
  sourceId: CardInstanceId;
  targetCardId: CardInstanceId;
  controllerId: PlayerId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { state, target, sourceId, targetCardId, controllerId, getDefinitionByInstanceId } = args;
  if (typeof target !== "string") {
    return false;
  }

  const targetDefinition = getDefinitionByInstanceId(targetCardId);
  const targetControllerId = state._zonesPrivate?.cardIndex?.[targetCardId]?.controllerID as
    | PlayerId
    | undefined;
  const sourceLocationId = state._zonesPrivate?.cardMeta?.[sourceId]?.atLocationId as
    | CardInstanceId
    | undefined;
  const targetLocationId = state._zonesPrivate?.cardMeta?.[targetCardId]?.atLocationId as
    | CardInstanceId
    | undefined;

  switch (target) {
    case "SELF":
      return sourceId === targetCardId;
    case "YOUR_CHARACTERS":
      return targetControllerId === controllerId && targetDefinition?.cardType === "character";
    case "YOUR_OTHER_SEVEN_DWARFS_CHARACTERS":
      return (
        targetCardId !== sourceId &&
        targetControllerId === controllerId &&
        targetDefinition?.cardType === "character" &&
        (targetDefinition.classifications ?? []).includes("Seven Dwarfs")
      );
    case "YOUR_OTHER_AMBER_CHARACTERS":
      return (
        targetCardId !== sourceId &&
        targetControllerId === controllerId &&
        targetDefinition?.cardType === "character" &&
        (targetDefinition.inkType ?? []).includes("amber")
      );
    case "YOUR_OTHER_RUBY_CHARACTERS":
      return (
        targetCardId !== sourceId &&
        targetControllerId === controllerId &&
        targetDefinition?.cardType === "character" &&
        (targetDefinition.inkType ?? []).includes("ruby")
      );
    case "YOUR_OTHER_SAPPHIRE_CHARACTERS":
      return (
        targetCardId !== sourceId &&
        targetControllerId === controllerId &&
        targetDefinition?.cardType === "character" &&
        (targetDefinition.inkType ?? []).includes("sapphire")
      );
    case "YOUR_OTHER_EVASIVE_CHARACTERS":
      return (
        targetCardId !== sourceId &&
        targetControllerId === controllerId &&
        targetDefinition?.cardType === "character" &&
        hasKeyword(targetDefinition, "Evasive")
      );
    case "CHARACTERS_HERE":
      return (
        targetDefinition?.cardType === "character" &&
        Boolean(sourceLocationId && targetLocationId && sourceLocationId === targetLocationId)
      );
    default:
      return false;
  }
}

export function matchesStaticAbilityTarget(args: {
  state: StaticAbilityState;
  target: unknown;
  sourceId: CardInstanceId;
  targetCardId: CardInstanceId;
  controllerId?: PlayerId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { state, target, sourceId, targetCardId, controllerId, getDefinitionByInstanceId } = args;
  if (!controllerId || !getDefinitionByInstanceId) {
    return false;
  }

  if (target === "SELF" || target === "THIS_CHARACTER") {
    return sourceId === targetCardId;
  }

  const descriptor = normalizeTargetDescriptor(target);
  if (!descriptor) {
    return matchesLegacyStaticTarget({
      state,
      target,
      sourceId,
      targetCardId,
      controllerId,
      getDefinitionByInstanceId,
    });
  }

  const candidates = resolveCandidateTargets(
    {
      ...createStaticAbilityTargetContext({ state, getDefinitionByInstanceId }),
      playerId: controllerId,
    } as unknown as Parameters<typeof resolveCandidateTargets>[0],
    descriptor,
    {
      controllerId,
      sourceCardId: sourceId,
      strictUnknownFilters: true,
    },
  );

  return candidates.includes(targetCardId);
}

import {
  evaluateCondition,
  type ConditionEvaluationContext,
} from "../../rules/condition-evaluator";

export function evaluateStaticCondition(args: {
  condition: Condition | undefined;
  state: StaticAbilityState;
  controllerId?: PlayerId;
  sourceId?: CardInstanceId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  getCardStrengthByInstanceId?: (cardId: CardInstanceId) => number;
}): boolean {
  const { condition, state, controllerId, sourceId, getDefinitionByInstanceId } = args;

  if (!condition) {
    return true;
  }

  if (!controllerId || !getDefinitionByInstanceId) {
    // Most conditions require a controller and definitions.
    // If we can't provide them, we default to false (safe fail)
    return false;
  }

  const evaluationContext: ConditionEvaluationContext = {
    framework: {
      state: {
        priority: state.priority as ConditionEvaluationContext["framework"]["state"]["priority"],
        status: state.status as ConditionEvaluationContext["framework"]["state"]["status"],
        _zonesPrivate:
          state._zonesPrivate as ConditionEvaluationContext["framework"]["state"]["_zonesPrivate"],
        currentPlayer: getActivePlayerId(state),
        playerIds: getStatePlayerIds(state),
      },
      zones: {
        getCards: ({ zone, playerId }: { zone: string; playerId: PlayerId }) => {
          // Try player-scoped zone first (e.g. "play:player_two", "hand:player_two")
          const scopedKey = `${zone}:${playerId}`;
          const allZones = state._zonesPrivate?.zoneCards as
            | Record<string, readonly string[] | undefined>
            | undefined;
          const scopedCards = allZones?.[scopedKey];
          if (scopedCards !== undefined) {
            return scopedCards as CardInstanceId[];
          }

          // Fall back to a global (unscoped) zone, filtering by owner/controller.
          // Only use this path if the global zone has entries that actually belong to this player.
          const globalCards = allZones?.[zone];
          if (globalCards) {
            const ownerFiltered = globalCards.filter(
              (id) =>
                state._zonesPrivate?.cardIndex?.[id]?.controllerID === playerId ||
                state._zonesPrivate?.cardIndex?.[id]?.ownerID === playerId,
            ) as CardInstanceId[];
            if (ownerFiltered.length > 0) {
              return ownerFiltered;
            }
          }

          // Last resort: use public zone summaries to synthesize a count-only placeholder array.
          // This handles the case where a private zone (e.g. opponent's hand) is filtered out
          // of the client-side state view, but we still need to evaluate a count-based condition.
          // The public zone summary is available on both server and client for all zones.
          const summary = state._zonesPublic?.zoneSummaries?.[scopedKey];
          if (summary !== undefined) {
            const count = summary?.count ?? 0;
            return Array.from(
              { length: count },
              (_, i) => `__summary_${scopedKey}_${i}` as CardInstanceId,
            );
          }

          return [];
        },
        getCardZone: (cardId: CardInstanceId) => state._zonesPrivate?.cardIndex?.[cardId]?.zoneKey,
      },
    },
    cards: {
      getDefinition: getDefinitionByInstanceId,
      require: (cardId: CardInstanceId) => ({
        meta: state._zonesPrivate?.cardMeta?.[cardId] ?? {},
      }),
      get: (cardId: CardInstanceId) => ({
        definition: getDefinitionByInstanceId(cardId),
      }),
    },
    G: state.G as DeepReadonly<LorcanaG>, // Cast assuming G is sufficient if present, or will crash/fail gracefully
    playerId: controllerId,
    sourceCardId: sourceId,
    getCardStrengthByInstanceId: args.getCardStrengthByInstanceId,
    disableFilterRegistry: true,
  };

  return evaluateCondition(condition, evaluationContext);
}

export function hasStaticSelfRestriction(args: {
  state: StaticAbilityState;
  cardId: CardInstanceId;
  restriction: string;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { state, cardId, restriction, getDefinitionByInstanceId } = args;
  if (!isCardInPlay(state, cardId) || !getDefinitionByInstanceId) {
    return false;
  }

  const definition = getDefinitionByInstanceId(cardId);
  if (!definition) {
    return false;
  }

  const controllerId = state._zonesPrivate?.cardIndex?.[cardId]?.controllerID as
    | PlayerId
    | undefined;

  return (definition.abilities ?? []).some(
    (ability) =>
      ability.type === "static" &&
      staticEffectContainsRestriction({
        effect: ability.effect,
        restriction,
        target: "SELF",
      }) &&
      evaluateStaticCondition({
        condition: ability.condition,
        state,
        controllerId,
        sourceId: cardId,
        getDefinitionByInstanceId,
      }),
  );
}

/**
 * Check whether a named ability on a target card is suppressed by a
 * `suppress-ability` static effect from another card in play.
 *
 * @example Angela - Night Warrior: "Your Gargoyle characters lose the Stone by Day ability."
 */
function isAbilitySuppressed(args: {
  state: StaticAbilityState;
  targetCardId: CardInstanceId;
  abilityName: string;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { state, targetCardId, abilityName, getDefinitionByInstanceId } = args;

  for (const suppressorId of Object.keys(
    state._zonesPrivate?.cardIndex ?? {},
  ) as CardInstanceId[]) {
    if (!isCardInPlay(state, suppressorId)) {
      continue;
    }

    const suppressorDef = getDefinitionByInstanceId(suppressorId);
    if (!suppressorDef) {
      continue;
    }

    const controllerId = state._zonesPrivate?.cardIndex?.[suppressorId]?.controllerID as
      | PlayerId
      | undefined;

    for (const ability of suppressorDef.abilities ?? []) {
      if (
        ability.type !== "static" ||
        ability.effect.type !== "suppress-ability" ||
        ability.effect.abilityName !== abilityName
      ) {
        continue;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId,
          sourceId: suppressorId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      if (
        matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId: suppressorId,
          targetCardId,
          controllerId,
          getDefinitionByInstanceId,
        })
      ) {
        return true;
      }
    }
  }

  return false;
}

export function hasStaticCardRestriction(args: {
  state: StaticAbilityState;
  cardId: CardInstanceId;
  restriction: string;
  registry: StaticEffectRegistry;
}): boolean {
  const { registry, cardId, restriction } = args;

  // Suppression is already baked into the registry at build time — no need to re-check.
  return registryEffectsForCard(registry, cardId, "restriction").some(
    (e) => e.payload.restriction === restriction,
  );
}

export function hasStaticChallengerFilteredRestriction(args: {
  state: StaticAbilityState;
  cardId: CardInstanceId;
  attackerId?: CardInstanceId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { state, cardId, attackerId, getDefinitionByInstanceId } = args;
  if (!isCardInPlay(state, cardId) || !getDefinitionByInstanceId) {
    return false;
  }

  const attackerDefinition = attackerId ? getDefinitionByInstanceId(attackerId) : undefined;
  const attackerCost =
    attackerDefinition && typeof attackerDefinition.cost === "number"
      ? attackerDefinition.cost
      : undefined;
  const attackerStrength =
    attackerDefinition &&
    attackerDefinition.cardType === "character" &&
    typeof attackerDefinition.strength === "number"
      ? attackerDefinition.strength
      : undefined;
  const attackerDamage =
    typeof attackerId === "string"
      ? Number(state._zonesPrivate?.cardMeta?.[attackerId]?.damage ?? 0)
      : 0;

  for (const sourceId of Object.keys(state._zonesPrivate?.cardIndex ?? {}) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    const controllerId = state._zonesPrivate?.cardIndex?.[sourceId]?.controllerID as
      | PlayerId
      | undefined;

    const matches = (sourceDefinition.abilities ?? []).some((ability) => {
      if (
        ability.type !== "static" ||
        ability.effect.type !== "restriction" ||
        ability.effect.restriction !== "cant-be-challenged"
      ) {
        return false;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardId,
          controllerId,
          getDefinitionByInstanceId,
        })
      ) {
        return false;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
        })
      ) {
        return false;
      }

      const challengerFilter = ability.effect.challengerFilter;
      if (!challengerFilter) {
        return true;
      }

      switch (challengerFilter.type) {
        case "cost-comparison":
          if (typeof attackerCost !== "number") {
            return false;
          }
          return compareOperator(attackerCost, challengerFilter.operator, challengerFilter.value);
        case "has-classification":
          if (
            !isClassification(challengerFilter.classification) ||
            !Array.isArray(attackerDefinition?.classifications)
          ) {
            return false;
          }

          return attackerDefinition.classifications.includes(challengerFilter.classification);
        case "strength-comparison":
          if (typeof attackerStrength !== "number") {
            return false;
          }
          return compareOperator(
            attackerStrength,
            challengerFilter.operator,
            challengerFilter.value,
          );
        case "is-damaged":
          return attackerDamage > 0;
        default:
          return false;
      }
    });

    if (matches) {
      return true;
    }
  }

  return false;
}

export function resolveStaticVariableAmount(args: {
  amount: VariableAmount | undefined;
  state: StaticAbilityState;
  controllerId?: PlayerId;
  sourceId?: CardInstanceId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): number {
  const { amount, state, controllerId, sourceId, getDefinitionByInstanceId } = args;
  if (!amount) {
    return 0;
  }

  switch (amount.type) {
    case "classification-character-count":
      return Object.keys(state._zonesPrivate?.cardIndex ?? {}).reduce((total, cardId) => {
        const candidateId = cardId as CardInstanceId;
        if (!isCardInPlay(state, candidateId)) {
          return total;
        }

        if (amount.excludeSelf && sourceId && candidateId === sourceId) {
          return total;
        }

        const candidateControllerId = state._zonesPrivate?.cardIndex?.[candidateId]?.controllerID as
          | PlayerId
          | undefined;
        if (amount.controller === "you" && candidateControllerId !== controllerId) {
          return total;
        }
        if (amount.controller === "opponent" && candidateControllerId === controllerId) {
          return total;
        }

        const definition = getDefinitionByInstanceId?.(candidateId);
        if (definition?.cardType !== "character") {
          return total;
        }

        return (definition.classifications ?? []).some(
          (classification) => classification === amount.classification,
        )
          ? total + 1
          : total;
      }, 0);

    case "name-character-count":
      return Object.keys(state._zonesPrivate?.cardIndex ?? {}).reduce((total, cardId) => {
        const candidateId = cardId as CardInstanceId;
        if (!isCardInPlay(state, candidateId)) {
          return total;
        }

        if (amount.excludeSelf && sourceId && candidateId === sourceId) {
          return total;
        }

        const candidateControllerId = state._zonesPrivate?.cardIndex?.[candidateId]?.controllerID as
          | PlayerId
          | undefined;
        if (amount.controller === "you" && candidateControllerId !== controllerId) {
          return total;
        }
        if (amount.controller === "opponent" && candidateControllerId === controllerId) {
          return total;
        }

        const definition = getDefinitionByInstanceId?.(candidateId);
        if (definition?.cardType !== "character") {
          return total;
        }

        return cardHasName(definition, amount.name) ? total + 1 : total;
      }, 0);

    case "filtered-count":
      return Object.keys(state._zonesPrivate?.cardIndex ?? {}).reduce((total, cardId) => {
        const candidateId = cardId as CardInstanceId;
        const zoneKey = getCardZoneKey(state, candidateId);
        const zone = zoneKey?.split(":")[0];
        const scopedZones: readonly string[] = amount.zones?.length ? amount.zones : ["play"];
        if (!zone || !scopedZones.includes(zone)) {
          return total;
        }

        const comparisonPlayerId =
          zone === "play"
            ? (state._zonesPrivate?.cardIndex?.[candidateId]?.controllerID as PlayerId | undefined)
            : (state._zonesPrivate?.cardIndex?.[candidateId]?.ownerID as PlayerId | undefined);
        if (amount.owner === "you" && comparisonPlayerId !== controllerId) {
          return total;
        }
        if (amount.owner === "opponent" && comparisonPlayerId === controllerId) {
          return total;
        }

        if (amount.excludeSelf && sourceId && candidateId === sourceId) {
          return total;
        }

        const definition = getDefinitionByInstanceId?.(candidateId);
        if (!definition) {
          return total;
        }

        const allowedTypes = amount.cardTypes ?? (amount.cardType ? [amount.cardType] : []);
        if (allowedTypes.length > 0 && !allowedTypes.includes(definition.cardType)) {
          return total;
        }

        const matchesFilters = (amount.filters ?? []).every((filter) => {
          if (!("type" in filter)) {
            return matchesCardSelectionFilter({
              definition,
              filter,
              sourceId,
              getDefinitionByInstanceId,
            });
          }

          switch (filter.type) {
            case "same-location-as-source":
              if (!sourceId) {
                return false;
              }
              return (
                (state._zonesPrivate?.cardMeta?.[candidateId]?.atLocationId as
                  | CardInstanceId
                  | undefined) === sourceId
              );
            case "classification":
            case "has-classification":
              return typeof filter.classification === "string"
                ? (definition.classifications ?? []).includes(filter.classification as never)
                : false;
            case "has-name":
              return typeof filter.name === "string" ? cardHasName(definition, filter.name) : false;
            case "exerted":
              return (
                (state._zonesPrivate?.cardMeta?.[candidateId]?.state as string | undefined) ===
                "exerted"
              );
            case "status": {
              const damage = Number(state._zonesPrivate?.cardMeta?.[candidateId]?.damage ?? 0);
              if (filter.status === "damaged") {
                return damage > 0;
              }
              if (filter.status === "undamaged") {
                return damage === 0;
              }
              return false;
            }
            case "song":
              return definition.cardType === "action" && definition.actionSubtype === "song";
            default:
              return false;
          }
        });

        const increment = typeof amount.multiplier === "number" ? amount.multiplier : 1;
        return matchesFilters ? total + increment : total;
      }, 0);
    case "clamp": {
      const resolveOperand = (operand: typeof amount.value): number => {
        if (typeof operand === "number") {
          return operand;
        }
        return resolveStaticVariableAmount({
          amount: operand,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
        });
      };
      const rawValue = resolveOperand(amount.value);
      const maxValue = resolveOperand(amount.max);
      const minValue = amount.min === undefined ? 0 : resolveOperand(amount.min);
      const resolvedMax = Math.max(minValue, maxValue);
      return Math.max(minValue, Math.min(rawValue, resolvedMax));
    }
    case "characters-in-play":
      return Object.keys(state._zonesPrivate?.cardIndex ?? {}).reduce((total, cardId) => {
        const candidateId = cardId as CardInstanceId;
        if (!isCardInPlay(state, candidateId)) {
          return total;
        }

        const candidateControllerId = state._zonesPrivate?.cardIndex?.[candidateId]?.controllerID as
          | PlayerId
          | undefined;
        if (amount.controller === "you" && candidateControllerId !== controllerId) {
          return total;
        }
        if (amount.controller === "opponent" && candidateControllerId === controllerId) {
          return total;
        }

        const definition = getDefinitionByInstanceId?.(candidateId);
        return definition?.cardType === "character" ? total + 1 : total;
      }, 0);
    case "items-in-play":
      return Object.keys(state._zonesPrivate?.cardIndex ?? {}).reduce((total, cardId) => {
        const candidateId = cardId as CardInstanceId;
        if (!isCardInPlay(state, candidateId)) {
          return total;
        }

        const candidateControllerId = state._zonesPrivate?.cardIndex?.[candidateId]?.controllerID as
          | PlayerId
          | undefined;
        if (amount.controller === "you" && candidateControllerId !== controllerId) {
          return total;
        }
        if (amount.controller === "opponent" && candidateControllerId === controllerId) {
          return total;
        }

        const definition = getDefinitionByInstanceId?.(candidateId);
        return definition?.cardType === "item" ? total + 1 : total;
      }, 0);
    case "reducer":
      if (amount.reducer !== "damage") {
        return 0;
      }
      return Object.keys(state._zonesPrivate?.cardIndex ?? {}).reduce((total, cardId) => {
        const candidateId = cardId as CardInstanceId;
        const zoneKey = getCardZoneKey(state, candidateId);
        const zone = zoneKey?.split(":")[0];
        const scopedZones: readonly string[] = amount.zones?.length ? amount.zones : ["play"];
        if (!zone || !scopedZones.includes(zone)) {
          return total;
        }

        const comparisonPlayerId =
          zone === "play"
            ? (state._zonesPrivate?.cardIndex?.[candidateId]?.controllerID as PlayerId | undefined)
            : (state._zonesPrivate?.cardIndex?.[candidateId]?.ownerID as PlayerId | undefined);
        if (amount.owner === "you" && comparisonPlayerId !== controllerId) {
          return total;
        }
        if (amount.owner === "opponent" && comparisonPlayerId === controllerId) {
          return total;
        }

        if (amount.excludeSelf && sourceId && candidateId === sourceId) {
          return total;
        }

        const definition = getDefinitionByInstanceId?.(candidateId);
        if (!definition) {
          return total;
        }

        const allowedTypes = amount.cardTypes ?? (amount.cardType ? [amount.cardType] : []);
        if (allowedTypes.length > 0 && !allowedTypes.includes(definition.cardType)) {
          return total;
        }

        const matchesFilters = (amount.filters ?? []).every((filter) => {
          if (!("type" in filter)) {
            return matchesCardSelectionFilter({
              definition,
              filter,
              sourceId,
              getDefinitionByInstanceId,
            });
          }

          switch (filter.type) {
            case "same-location-as-source":
              if (!sourceId) {
                return false;
              }
              return (
                (state._zonesPrivate?.cardMeta?.[candidateId]?.atLocationId as
                  | CardInstanceId
                  | undefined) === sourceId
              );
            case "classification":
            case "has-classification":
              return typeof filter.classification === "string"
                ? (definition.classifications ?? []).includes(filter.classification as never)
                : false;
            case "has-name":
              return typeof filter.name === "string" ? cardHasName(definition, filter.name) : false;
            case "exerted":
              return (
                (state._zonesPrivate?.cardMeta?.[candidateId]?.state as string | undefined) ===
                "exerted"
              );
            case "damaged":
            case "status": {
              const damage = Number(state._zonesPrivate?.cardMeta?.[candidateId]?.damage ?? 0);
              if (filter.type === "damaged") {
                return damage > 0;
              }
              if (filter.status === "damaged") {
                return damage > 0;
              }
              if (filter.status === "undamaged") {
                return damage === 0;
              }
              return false;
            }
            case "song":
              return definition.cardType === "action" && definition.actionSubtype === "song";
            default:
              return false;
          }
        });

        if (!matchesFilters) {
          return total;
        }

        const damage = Number(state._zonesPrivate?.cardMeta?.[candidateId]?.damage ?? 0);
        return total + damage;
      }, 0);
    case "turn-metric": {
      if (amount.metric !== "banished-in-challenge-count") {
        return 0;
      }
      const counts = state.G?.turnMetadata?.banishedCharactersInChallengeByOwnerThisTurn ?? {};
      const multiplier = typeof amount.multiplier === "number" ? amount.multiplier : 1;
      if (amount.owner === "opponent") {
        // Sum counts for all players that are NOT the controller
        return (
          Object.entries(counts).reduce((total, [playerId, count]) => {
            if (playerId !== controllerId) {
              return total + Number(count ?? 0);
            }
            return total;
          }, 0) * multiplier
        );
      }
      if (amount.owner === "you") {
        return Number(counts[controllerId as string as keyof typeof counts] ?? 0) * multiplier;
      }
      return 0;
    }
    default:
      return 0;
  }
}

export function hasStaticPlayerRestriction(args: {
  state: StaticAbilityState;
  playerId: PlayerId;
  restriction: string;
  registry: StaticEffectRegistry;
}): boolean {
  const { playerId, restriction, registry } = args;

  return registryEffectsForPlayer(registry, playerId, "restriction").some(
    (e) =>
      e.payload.restriction === restriction &&
      (e.payload.playerTarget === "CONTROLLER" || e.payload.playerTarget === "YOU"),
  );
}

/**
 * Check whether an opponent's in-play card has a static ability that restricts
 * the given player (i.e. target is "OPPONENTS") for the specified restriction,
 * and that the ability's conditions are currently met.
 *
 * @example Tiana - Celebrating Princess: "While this character is exerted and
 * you have no cards in your hand, opponents can't play actions."
 */
export function hasOpponentStaticPlayRestriction(args: {
  state: StaticAbilityState;
  playerId: PlayerId;
  restriction: string;
  registry: StaticEffectRegistry;
}): boolean {
  const { playerId, restriction, registry } = args;

  // OPPONENTS restrictions from opponent cards are already routed to byPlayer[playerId]
  // by the registry builder. We just filter by sourceControllerId to confirm it's from an opponent.
  return registryEffectsForPlayer(registry, playerId, "restriction").some(
    (e) =>
      e.payload.restriction === restriction &&
      e.payload.playerTarget === "OPPONENTS" &&
      e.sourceControllerId !== playerId,
  );
}

/**
 * Return the lowest challenge-per-turn limit imposed by any in-play card via a
 * static "challenge-limit" restriction that targets "ALL_PLAYERS", or `null`
 * if no such restriction is active.
 *
 * @example Prince Charming - Protector of the Realm: "Each turn, only one
 * character can challenge."
 */
export function getStaticChallengeLimit(args: { registry: StaticEffectRegistry }): number | null {
  const { registry } = args;

  const limitEffects = registry.global.filter(
    (e) =>
      e.kind === "restriction" &&
      e.payload.restriction === "challenge-limit" &&
      e.payload.playerTarget === "ALL_PLAYERS",
  );
  if (limitEffects.length === 0) return null;
  const limits = limitEffects.map((e) =>
    typeof e.payload.limit === "number" ? e.payload.limit : 1,
  );
  return Math.min(...limits);
}

export function getStaticPropertyModifierTotal(args: {
  state: StaticAbilityState;
  cardId: CardInstanceId;
  property: "singer-threshold";
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  registry: StaticEffectRegistry | undefined;
}): number {
  const { state, cardId, property, registry } = args;

  if (!registry) return 0;
  if (!isCardInPlay(state, cardId)) return 0;
  return (registry.byTarget.get(cardId) ?? [])
    .filter((e) => e.kind === "property-modification" && e.payload.property === property)
    .reduce((sum, e) => sum + (e.payload.value as number), 0);
}

export function getGrantedActivatedAbilities(args: {
  state: StaticAbilityState;
  cardId: CardInstanceId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  registry: StaticEffectRegistry;
}): Array<{ ability: ActivatedAbilityDefinition; sourceId: CardInstanceId }> {
  const { state, cardId, getDefinitionByInstanceId, registry } = args;
  if (!isCardInPlay(state, cardId)) {
    return [];
  }

  const cardDefinition = getDefinitionByInstanceId?.(cardId);
  const granted: Array<{ ability: ActivatedAbilityDefinition; sourceId: CardInstanceId }> = [];

  // Boost keyword abilities from the card's own definition (not static abilities, not in registry)
  for (const ability of cardDefinition?.abilities ?? []) {
    if (
      ability.type === "keyword" &&
      ability.keyword === "Boost" &&
      typeof ability.value === "number" &&
      Number.isFinite(ability.value)
    ) {
      granted.push({
        ability: {
          id: ability.id ?? `${cardId}-boost`,
          name: `Boost ${ability.value}`,
          type: "activated",
          text: ability.text ?? `Boost ${ability.value} {I}`,
          usesPerTurn: 1,
          cost: { ink: ability.value },
          effect: { type: "put-under", source: "top-of-deck", under: "self", facedown: true },
        },
        sourceId: cardId,
      });
    }
  }

  // Static grant-abilities-while-here and grant-ability from registry
  const staticGrants = (registry.byTarget.get(cardId) ?? []).filter(
    (e) => e.kind === "grant-abilities-while-here" || e.kind === "grant-ability",
  );
  for (const e of staticGrants) {
    granted.push({
      ability: e.payload.ability as ActivatedAbilityDefinition,
      sourceId: e.sourceId,
    });
  }

  return [...granted, ...getTemporaryGrantedActivatedAbilities({ state, cardId })];
}

function getStaticCostReductionSourceZones(
  definition: LorcanaCardDefinition,
  ability: StaticAbilityDefinition,
): ("play" | "hand" | "discard" | "inkwell")[] {
  if (ability.sourceZones && ability.sourceZones.length > 0) {
    return ability.sourceZones;
  }

  const normalizedText = ability.text?.toLowerCase() ?? "";
  const selfReferentialPlayText =
    normalizedText.includes(`play this ${definition.cardType}`) ||
    normalizedText.includes("play this card");

  return selfReferentialPlayText ? ["hand"] : ["play"];
}

export function getSelfStaticCostReductionAmount(args: {
  state: StaticAbilityState;
  cardId?: CardInstanceId;
  controllerId?: PlayerId;
  definition: LorcanaCardDefinition;
  sourceZone?: "play" | "hand" | "discard" | "inkwell";
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  getCardStrengthByInstanceId?: (cardId: CardInstanceId) => number;
}): number {
  const {
    state,
    cardId,
    controllerId,
    definition,
    sourceZone,
    getDefinitionByInstanceId,
    getCardStrengthByInstanceId,
  } = args;
  const baseCost = Number(definition.cost ?? 0);

  return (definition.abilities ?? []).reduce((total, ability) => {
    if (ability.type !== "static" || ability.effect.type !== "cost-reduction") {
      return total;
    }

    const activeSourceZones = getStaticCostReductionSourceZones(definition, ability);
    if (!sourceZone || !activeSourceZones.includes(sourceZone)) {
      return total;
    }

    if (
      !evaluateStaticCondition({
        condition: ability.condition,
        state,
        controllerId,
        sourceId: cardId,
        getDefinitionByInstanceId,
        getCardStrengthByInstanceId,
      })
    ) {
      return total;
    }

    const effectAmount =
      ability.effect.amount === "full" || ability.effect.reduction?.ink === "full"
        ? baseCost
        : typeof ability.effect.amount === "number"
          ? ability.effect.amount
          : typeof ability.effect.amount === "object"
            ? resolveStaticVariableAmount({
                amount: ability.effect.amount,
                state,
                controllerId,
                sourceId: cardId,
                getDefinitionByInstanceId,
              })
            : typeof ability.effect.reduction?.ink === "number"
              ? ability.effect.reduction.ink
              : 0;

    return total + Math.max(0, effectAmount);
  }, 0);
}

/**
 * Converts a full match state (with `ctx.zones.private`) to the flattened
 * `StaticAbilityState` shape expected by static ability utility functions.
 *
 * Use this when calling `getGrantedActivatedAbilities` and similar functions
 * from code that holds the full authoritative match state rather than a
 * `FrameworkStateSnapshot`.
 */
export function toStaticAbilityState(matchState: {
  readonly ctx: {
    readonly priority?: { readonly holder?: string };
    readonly status?: { readonly turn?: number };
    readonly zones: {
      readonly private: {
        readonly cardIndex?: Record<string, unknown>;
        readonly cardMeta?: Record<string, unknown>;
        readonly zoneCards?: Record<string, readonly string[] | undefined>;
      };
    };
  };
  readonly G?: unknown;
}): StaticAbilityState {
  return {
    priority: matchState.ctx.priority,
    status: matchState.ctx.status,
    _zonesPrivate: matchState.ctx.zones.private as StaticAbilityState["_zonesPrivate"],
    G: matchState.G as StaticAbilityState["G"],
  };
}
