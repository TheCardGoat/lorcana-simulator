import type { CardInstanceId, DeepReadonly, PlayerId } from "#core";
import type { Condition, LorcanaCardDefinition } from "@tcg/lorcana-types";
import type {
  ChallengeState,
  ContinuousEffectState,
  ContinuousEffectStat,
  LorcanaG,
  StatModifierContinuousEffectInstance,
} from "../../types";

type ContinuousEffectWriteContext = {
  G:
    | {
        continuousEffects?: ContinuousEffectState;
        staticEffectsVersion?: number;
      }
    | undefined;
};

type ContinuousEffectReadContext = {
  G?: {
    continuousEffects?: DeepReadonly<ContinuousEffectState>;
    turnMetadata?: DeepReadonly<Partial<LorcanaG["turnMetadata"]>>;
    challengeState?: DeepReadonly<ChallengeState>;
  };
  ctx?: {
    priority?: {
      holder?: string;
    };
    status?: {
      turn?: number;
    };
    zones?: {
      private?: {
        cardIndex?: Record<
          string,
          | {
              zoneKey?: string;
              ownerID?: string;
              controllerID?: string;
            }
          | undefined
        >;
        cardMeta?: Record<string, { atLocationId?: CardInstanceId } | undefined>;
        zoneCards?: Record<string, readonly string[] | undefined>;
      };
    };
  };
  framework?: {
    state: {
      priority?: {
        holder?: string;
      };
      status?: {
        turn?: number;
      };
      _zonesPrivate?: {
        cardIndex?: Record<
          string,
          | {
              zoneKey?: string;
              ownerID?: string;
              controllerID?: string;
            }
          | undefined
        >;
        cardMeta?: Record<string, { atLocationId?: CardInstanceId } | undefined>;
        zoneCards?: Record<string, readonly string[] | undefined>;
      };
    };
  };
};

type CardZoneKeyEntry = {
  zoneKey?: string;
  ownerID?: string;
  controllerID?: string;
};

function getRuntimeCtx(state: ContinuousEffectReadContext): {
  priority?: { holder?: string };
  status?: { turn?: number };
  zones?: {
    private?: {
      cardIndex?: Record<string, CardZoneKeyEntry | undefined>;
      cardMeta?: Record<string, { atLocationId?: CardInstanceId } | undefined>;
      zoneCards?: Record<string, readonly string[] | undefined>;
    };
  };
} {
  if (state.framework?.state.priority) {
    return {
      priority: state.framework.state.priority,
      status: state.framework.state.status,
      zones: { private: state.framework.state._zonesPrivate },
    };
  }
  return state.ctx ?? {};
}

export type AddStatModifierEffectInput = {
  sourceId: CardInstanceId;
  targetId: CardInstanceId;
  controllerId?: PlayerId;
  stat: ContinuousEffectStat;
  modifier: number;
  condition?: Condition;
  duration: "this-turn" | "until-start-of-next-turn";
  currentTurn: number;
  nonStacking?: boolean;
};

const DEFAULT_CONTINUOUS_EFFECT_STATE: ContinuousEffectState = {
  nextSeq: 1,
  instances: [],
  byTarget: {},
};

function rebuildByTarget(
  instances: readonly StatModifierContinuousEffectInstance[],
): Record<CardInstanceId, StatModifierContinuousEffectInstance[]> {
  const byTarget: Record<CardInstanceId, StatModifierContinuousEffectInstance[]> = {};
  for (const instance of instances) {
    if (!byTarget[instance.targetId]) {
      byTarget[instance.targetId] = [];
    }
    byTarget[instance.targetId].push(instance);
  }
  return byTarget;
}

function getOrCreateContinuousEffectState(
  state: ContinuousEffectWriteContext,
): ContinuousEffectState {
  if (!state.G) {
    return DEFAULT_CONTINUOUS_EFFECT_STATE;
  }

  const current = state.G.continuousEffects;
  if (
    current &&
    typeof current.nextSeq === "number" &&
    Number.isFinite(current.nextSeq) &&
    Array.isArray(current.instances)
  ) {
    // Migrate in-flight states that predate the byTarget index.
    if (!current.byTarget) {
      current.byTarget = rebuildByTarget(current.instances);
    }
    return current;
  }

  const initialized: ContinuousEffectState = {
    nextSeq: 1,
    instances: [],
    byTarget: {},
  };
  state.G.continuousEffects = initialized;
  return initialized;
}

function getContinuousEffectState(state: ContinuousEffectReadContext): ContinuousEffectState {
  if (!state.G) {
    return DEFAULT_CONTINUOUS_EFFECT_STATE;
  }

  const current = state.G.continuousEffects;
  if (
    current &&
    typeof current.nextSeq === "number" &&
    Number.isFinite(current.nextSeq) &&
    Array.isArray(current.instances)
  ) {
    return {
      nextSeq: current.nextSeq,
      instances: [...current.instances],
      byTarget: (current.byTarget ?? rebuildByTarget(current.instances)) as Record<
        CardInstanceId,
        StatModifierContinuousEffectInstance[]
      >,
    };
  }
  return DEFAULT_CONTINUOUS_EFFECT_STATE;
}

function getCardZoneKey(
  state: ContinuousEffectReadContext,
  cardId: CardInstanceId,
): string | undefined {
  const cardIndex = getRuntimeCtx(state).zones?.private?.cardIndex;
  if (!cardIndex) {
    return;
  }
  const entry = cardIndex[cardId];
  if (entry === undefined || entry === null || typeof entry !== "object") {
    return;
  }
  const cardZone = (entry as CardZoneKeyEntry).zoneKey;
  return typeof cardZone === "string" && cardZone.length > 0 ? cardZone : undefined;
}

function isCardInPlay(state: ContinuousEffectReadContext, cardId: CardInstanceId): boolean {
  const zoneKey = getCardZoneKey(state, cardId);
  return zoneKey !== undefined && (zoneKey === "play" || zoneKey.startsWith("play:"));
}

import { resolveEffectWindow, isEffectExpired } from "../../rules/effect-registry";
import {
  evaluateCondition,
  type ConditionEvaluationContext,
} from "../../rules/condition-evaluator";

function isStatModifierEffectActive(
  state: ContinuousEffectReadContext,
  effect: StatModifierContinuousEffectInstance,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): boolean {
  if (!isCardInPlay(state, effect.targetId)) {
    return false;
  }

  const ctx = getRuntimeCtx(state);
  const currentTurn = ctx.status?.turn ?? 1;
  if (effect.expiresAtTurn < currentTurn) {
    return false;
  }

  if (!effect.condition) {
    return true;
  }

  // Resolve controller ID, prefer effect controller, fallback to card controller
  const zoneKey = ctx.zones?.private?.cardIndex?.[effect.targetId]?.zoneKey;
  const cardControllerId = zoneKey?.split(":")[1] as PlayerId | undefined;
  const controllerId = (effect.controllerId ?? cardControllerId) as PlayerId | undefined;

  if (!controllerId) {
    // Cannot evaluate most conditions without a controller context
    return false;
  }

  // Construct evaluation context
  const evaluationContext: ConditionEvaluationContext = {
    framework: {
      state: {
        priority: ctx.priority as ConditionEvaluationContext["framework"]["state"]["priority"],
        status: ctx.status as ConditionEvaluationContext["framework"]["state"]["status"],
        _zonesPrivate: ctx.zones
          ?.private as ConditionEvaluationContext["framework"]["state"]["_zonesPrivate"],
        currentPlayer: ctx.priority?.holder as PlayerId | undefined,
        // We don't have easy access to all player IDs here without scanning cardIndex
        // but let's try to derive it if possible, or leave it empty if not critical for simple conditions
        playerIds: [], // TODO: Improve if needed
      },
      zones: {
        getCards: ({ zone, playerId }: { zone: string; playerId: PlayerId }) => {
          if (zone === "play") {
            const playerZone = ctx.zones?.private?.zoneCards?.[`play:${playerId}`];
            if (playerZone) return playerZone as CardInstanceId[];

            const globalPlay = ctx.zones?.private?.zoneCards?.play;
            if (globalPlay) {
              return globalPlay.filter(
                (id) => ctx.zones?.private?.cardIndex?.[id]?.controllerID === playerId,
              ) as CardInstanceId[];
            }
            return [];
          }
          return (ctx.zones?.private?.zoneCards?.[`${zone}:${playerId}`] ?? []) as CardInstanceId[];
        },
      },
    },
    cards: {
      getDefinition: getDefinitionByInstanceId ?? (() => undefined),
      require: (cardId: CardInstanceId) => ({
        meta: ctx.zones?.private?.cardMeta?.[cardId] ?? {},
      }),
      get: (cardId: CardInstanceId) => ({
        definition: getDefinitionByInstanceId?.(cardId),
      }),
    },
    G: state.G as DeepReadonly<LorcanaG>,
    playerId: controllerId,
    sourceCardId: effect.targetId,
  };

  return evaluateCondition(effect.condition, evaluationContext);
}

export function createEffectId(nextSeq: number): string {
  return `ce_${nextSeq}`;
}

export function addStatModifierEffect(
  state: ContinuousEffectWriteContext,
  input: AddStatModifierEffectInput,
): StatModifierContinuousEffectInstance | undefined {
  if (!Number.isFinite(input.modifier)) {
    return undefined;
  }

  const effects = getOrCreateContinuousEffectState(state);
  if (input.nonStacking) {
    effects.instances = effects.instances.filter(
      (instance) =>
        !(
          instance.kind === "stat-modifier" &&
          instance.sourceId === input.sourceId &&
          instance.targetId === input.targetId &&
          instance.stat === input.stat
        ),
    );
    // Keep byTarget in sync with the filtered instances.
    const bucket = effects.byTarget[input.targetId];
    if (bucket) {
      effects.byTarget[input.targetId] = bucket.filter(
        (instance) => !(instance.sourceId === input.sourceId && instance.stat === input.stat),
      );
    }
  }

  const effectId = createEffectId(effects.nextSeq);
  effects.nextSeq += 1;
  const { expiresAtTurn } = resolveEffectWindow(input.currentTurn, input.duration);

  const created: StatModifierContinuousEffectInstance = {
    id: effectId,
    kind: "stat-modifier",
    sourceId: input.sourceId,
    targetId: input.targetId,
    controllerId: input.controllerId,
    stat: input.stat,
    modifier: input.modifier,
    condition: input.condition,
    duration: input.duration,
    createdAtTurn: input.currentTurn,
    expiresAtTurn,
    nonStacking: input.nonStacking === true ? true : undefined,
  };
  effects.instances.push(created);
  if (!effects.byTarget[created.targetId]) {
    effects.byTarget[created.targetId] = [];
  }
  effects.byTarget[created.targetId].push(created);
  if (state.G) state.G.staticEffectsVersion = (state.G.staticEffectsVersion ?? 0) + 1;
  return created;
}

export function getActiveStatModifierTotal(
  state: ContinuousEffectReadContext,
  cardId: CardInstanceId,
  stat: ContinuousEffectStat,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  const effects = getContinuousEffectState(state);
  const candidates = effects.byTarget[cardId] ?? [];
  return candidates.reduce((total, instance) => {
    if (instance.stat !== stat) {
      return total;
    }
    if (!isStatModifierEffectActive(state, instance, getDefinitionByInstanceId)) {
      return total;
    }
    return total + instance.modifier;
  }, 0);
}

export function cleanupExpiredEffects(
  state: ContinuousEffectWriteContext,
  currentTurn: number,
): void {
  const effects = getOrCreateContinuousEffectState(state);
  const before = effects.instances.length;
  effects.instances = effects.instances.filter((instance) => {
    if (instance.kind !== "stat-modifier") {
      return true;
    }

    return !isEffectExpired(instance, currentTurn);
  });
  effects.byTarget = rebuildByTarget(effects.instances);
  if (state.G && effects.instances.length !== before) {
    state.G.staticEffectsVersion = (state.G.staticEffectsVersion ?? 0) + 1;
  }
}

/**
 * Retarget all continuous effects from one card instance to another.
 * Used during Shift to transfer stat modifiers from the old top card
 * to the new top card in a shift stack.
 */
export function retargetContinuousEffects(
  state: ContinuousEffectWriteContext,
  oldTargetId: CardInstanceId,
  newTargetId: CardInstanceId,
): void {
  const effects = getOrCreateContinuousEffectState(state);
  for (const instance of effects.instances) {
    if (instance.kind === "stat-modifier" && instance.targetId === oldTargetId) {
      instance.targetId = newTargetId;
    }
  }
  effects.byTarget = rebuildByTarget(effects.instances);
  if (state.G) state.G.staticEffectsVersion = (state.G.staticEffectsVersion ?? 0) + 1;
}

export function cleanupDanglingTargetEffects(
  state: ContinuousEffectWriteContext & Omit<ContinuousEffectReadContext, "G">,
): void {
  const effects = getOrCreateContinuousEffectState(state);
  const before = effects.instances.length;
  effects.instances = effects.instances.filter((instance) => {
    if (instance.kind !== "stat-modifier") {
      return true;
    }

    return isCardInPlay(state, instance.targetId);
  });
  effects.byTarget = rebuildByTarget(effects.instances);
  if (state.G && effects.instances.length !== before) {
    state.G.staticEffectsVersion = (state.G.staticEffectsVersion ?? 0) + 1;
  }
}
