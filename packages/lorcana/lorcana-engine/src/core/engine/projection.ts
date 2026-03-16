import type { FilteredMatchView, MatchState } from "../runtime";
import type { ZoneConfig } from "../runtime/match-runtime.types";
import type {
  EngineActiveEffectProjection,
  EngineActorContext,
  EngineBoardProjection,
  EnginePendingEffectProjection,
  EngineProjectionSnapshot,
} from "./contracts";

type ProjectableState<G> = MatchState<G> | FilteredMatchView<G>;
type ProjectionCardMeta = Record<string, unknown>;
type ProjectionCardMetaStore = Record<string, ProjectionCardMeta>;
type ProjectionCardIndexEntry = {
  zoneKey: string;
  index?: number;
  ownerID: string;
  controllerID: string;
};
type ProjectionZoneDefs = Record<
  string,
  {
    id: string;
    name: string;
    visibility: "public" | "private" | "secret";
    ordered: boolean;
    ownerScoped: boolean;
    faceDown?: boolean;
    maxSize?: number;
  }
>;
type ProjectionZoneSummaries = Record<string, { count: number }>;
type ProjectionPrivateZones = {
  zoneCards: Record<string, string[]>;
  cardIndex: Record<string, ProjectionCardIndexEntry>;
  cardMeta: ProjectionCardMetaStore;
};
type ProjectionGameShape<
  TContinuousEffect = unknown,
  TActiveEffect = unknown,
  TPendingEffect = unknown,
  TPendingCostReduction = unknown,
> = {
  continuousEffects?: { instances?: readonly TContinuousEffect[] };
  activeEffects?: readonly TActiveEffect[];
  pendingEffects?: readonly TPendingEffect[];
  turnMetadata?: {
    pendingCostReductionsByPlayer?: Partial<Record<string, readonly TPendingCostReduction[]>>;
  };
};
type ProjectionStackStorage<TStackItem> = {
  _stackStorage?: {
    items: readonly TStackItem[];
  };
};
type EffectDescriptor = {
  id?: string;
  kind?: string;
  type?: string;
  sourceId?: string;
  sourceCardId?: string;
};
type PendingChoicePayload = NonNullable<MatchState<unknown>["ctx"]["priority"]["pendingChoice"]>;

const EMPTY_PRIVATE_ZONES: ProjectionPrivateZones = {
  zoneCards: {},
  cardIndex: {},
  cardMeta: {},
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function toEffectDescriptor(value: unknown): EffectDescriptor | undefined {
  if (!isRecord(value)) {
    return undefined;
  }
  return value as EffectDescriptor;
}

function toZoneConfig(zoneId: string, zoneDef?: ProjectionZoneDefs[string]): ZoneConfig {
  if (!zoneDef) {
    return {
      id: zoneId,
      name: zoneId,
      visibility: "private",
      ordered: false,
      ownerScoped: false,
    };
  }

  return {
    id: zoneDef.id,
    name: zoneDef.name,
    visibility: zoneDef.visibility,
    ordered: zoneDef.ordered,
    ownerScoped: zoneDef.ownerScoped,
    faceDown: zoneDef.faceDown,
    maxSize: zoneDef.maxSize,
  };
}

function getStateZones<G>(state: ProjectableState<G>): {
  zoneDefs: ProjectionZoneDefs;
  zoneSummaries: ProjectionZoneSummaries;
  zoneCards: ProjectionPrivateZones["zoneCards"];
  cardIndex: ProjectionPrivateZones["cardIndex"];
  cardMeta: ProjectionPrivateZones["cardMeta"];
} {
  const zones = state.ctx.zones as {
    zoneDefs: ProjectionZoneDefs;
    public: { zoneSummaries: ProjectionZoneSummaries };
    private?: ProjectionPrivateZones;
  };
  const privateZones = zones.private ?? EMPTY_PRIVATE_ZONES;
  return {
    zoneDefs: zones.zoneDefs,
    zoneSummaries: zones.public.zoneSummaries,
    zoneCards: privateZones.zoneCards,
    cardIndex: privateZones.cardIndex,
    cardMeta: privateZones.cardMeta,
  };
}

export function buildEngineBoardProjection<G>(
  state: ProjectableState<G>,
  options?: { resolveDefinitionId?: (cardId: string) => string | undefined },
): EngineBoardProjection {
  const { zoneDefs, zoneSummaries, zoneCards, cardIndex, cardMeta } = getStateZones(state);
  const board: EngineBoardProjection = { cards: {}, zones: {} };
  const zoneIds = new Set<string>([
    ...Object.keys(zoneDefs),
    ...Object.keys(zoneSummaries),
    ...Object.keys(zoneCards),
  ]);

  for (const indexEntry of Object.values(cardIndex)) {
    const zoneKey = indexEntry.zoneKey;
    if (zoneKey.length > 0) {
      zoneIds.add(zoneKey);
    }
  }

  for (const zoneId of zoneIds) {
    const summary = zoneSummaries[zoneId];
    const visibleCards = zoneCards[zoneId] ?? [];
    board.zones[zoneId] = {
      zoneId,
      config: toZoneConfig(zoneId, zoneDefs[zoneId]),
      cards: [...visibleCards],
      count: typeof summary?.count === "number" ? summary.count : visibleCards.length,
    };
  }

  for (const [cardId, indexEntry] of Object.entries(cardIndex)) {
    const zoneId = indexEntry.zoneKey || "unknown";
    const zone = board.zones[zoneId] ?? {
      zoneId,
      config: toZoneConfig(zoneId, zoneDefs[zoneId]),
      cards: [],
      count: 0,
    };

    const zoneDef = zone.config;
    const hasExplicitVisibleCards = Object.prototype.hasOwnProperty.call(zoneCards, zoneId);
    const shouldBackfillFromCardIndex =
      zoneDef.visibility !== "private" || !hasExplicitVisibleCards;

    if (shouldBackfillFromCardIndex && !zone.cards.includes(cardId)) {
      zone.cards.push(cardId);
    }

    const summary = zoneSummaries[zoneId];
    if (typeof summary?.count !== "number") {
      zone.count = zone.cards.length;
    }
    board.zones[zoneId] = zone;

    const cardProjection = {
      instanceId: cardId,
      zoneId,
      definitionId: options?.resolveDefinitionId?.(cardId) ?? cardId,
      ownerId: indexEntry.ownerID,
      controllerId: indexEntry.controllerID,
      zoneIndex: typeof indexEntry.index === "number" ? indexEntry.index : undefined,
      meta: cardMeta[cardId],
    };
    board.cards[cardId] = cardProjection;
  }

  for (const zone of Object.values(board.zones)) {
    if (!zone.config.ordered || zone.cards.length <= 1) {
      continue;
    }

    zone.cards.sort((left, right) => {
      const leftIndex = board.cards[left]?.zoneIndex ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = board.cards[right]?.zoneIndex ?? Number.MAX_SAFE_INTEGER;
      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }
      return left.localeCompare(right);
    });
  }

  return board;
}

function effectIdFromRecord(record: EffectDescriptor | undefined, fallback: string): string {
  const id = record?.id;
  return typeof id === "string" && id.length > 0 ? id : fallback;
}

function effectTypeFromRecord(record: EffectDescriptor | undefined, fallback: string): string {
  if (typeof record?.kind === "string" && record.kind.length > 0) {
    return record.kind;
  }
  if (typeof record?.type === "string" && record.type.length > 0) {
    return record.type;
  }
  return fallback;
}

export function extractActiveEffects<
  G,
  TContinuousEffect = G extends {
    continuousEffects?: { instances?: readonly (infer TInferredContinuousEffect)[] };
  }
    ? TInferredContinuousEffect
    : never,
  TActiveEffect = G extends { activeEffects?: readonly (infer TInferredActiveEffect)[] }
    ? TInferredActiveEffect
    : never,
>(state: ProjectableState<G>): EngineActiveEffectProjection<TContinuousEffect | TActiveEffect>[] {
  const game = state.G as G & ProjectionGameShape<TContinuousEffect, TActiveEffect>;

  const effects: EngineActiveEffectProjection<TContinuousEffect | TActiveEffect>[] = [];
  const continuousInstances = game.continuousEffects?.instances ?? [];

  for (let index = 0; index < continuousInstances.length; index++) {
    const effect = continuousInstances[index];
    const effectRecord = toEffectDescriptor(effect);
    effects.push({
      id: effectIdFromRecord(effectRecord, `continuous:${index}`),
      type: effectTypeFromRecord(effectRecord, "continuous"),
      sourceId: typeof effectRecord?.sourceId === "string" ? effectRecord.sourceId : undefined,
      payload: effect,
    });
  }

  const activeEffects = game.activeEffects ?? [];
  for (let index = 0; index < activeEffects.length; index++) {
    const effect = activeEffects[index];
    const effectRecord = toEffectDescriptor(effect);
    effects.push({
      id: effectIdFromRecord(effectRecord, `active:${index}`),
      type: effectTypeFromRecord(effectRecord, "active"),
      sourceId: typeof effectRecord?.sourceId === "string" ? effectRecord.sourceId : undefined,
      payload: effect,
    });
  }

  return effects;
}

export function extractPendingEffects<
  G,
  TStackItem = unknown,
  TPendingEffect = G extends { pendingEffects?: readonly (infer TInferredPendingEffect)[] }
    ? TInferredPendingEffect
    : never,
  TPendingCostReduction = G extends {
    turnMetadata?: {
      pendingCostReductionsByPlayer?: Partial<
        Record<string, readonly (infer TInferredPendingCostReduction)[]>
      >;
    };
  }
    ? TInferredPendingCostReduction
    : never,
>(
  state: ProjectableState<G>,
): EnginePendingEffectProjection<
  PendingChoicePayload | TStackItem | TPendingEffect | TPendingCostReduction
>[] {
  const pendingEffects: EnginePendingEffectProjection<
    PendingChoicePayload | TStackItem | TPendingEffect | TPendingCostReduction
  >[] = [];

  const pendingChoice = state.ctx.priority.pendingChoice;
  if (pendingChoice) {
    pendingEffects.push({
      id: effectIdFromRecord(pendingChoice, "priority:pending-choice"),
      type: effectTypeFromRecord(pendingChoice, "pending-choice"),
      source: "priority",
      sourceId: pendingChoice.playerID,
      payload: pendingChoice,
    });
  }

  const ctx = state.ctx as typeof state.ctx & ProjectionStackStorage<TStackItem>;
  const stackItems = ctx._stackStorage?.items ?? [];
  for (let index = 0; index < stackItems.length; index++) {
    const item = stackItems[index];
    const itemRecord = toEffectDescriptor(item);
    pendingEffects.push({
      id: effectIdFromRecord(itemRecord, `stack:${index}`),
      type: effectTypeFromRecord(itemRecord, "stack"),
      source: "stack",
      sourceId: typeof itemRecord?.sourceCardId === "string" ? itemRecord.sourceCardId : undefined,
      payload: item,
    });
  }

  const game = state.G as G &
    ProjectionGameShape<never, never, TPendingEffect, TPendingCostReduction>;
  const gamePendingEffects = game.pendingEffects ?? [];
  for (let index = 0; index < gamePendingEffects.length; index++) {
    const effect = gamePendingEffects[index];
    const effectRecord = toEffectDescriptor(effect);
    pendingEffects.push({
      id: effectIdFromRecord(effectRecord, `pending:${index}`),
      type: effectTypeFromRecord(effectRecord, "pending"),
      source: "game",
      sourceId: typeof effectRecord?.sourceId === "string" ? effectRecord.sourceId : undefined,
      payload: effect,
    });
  }

  const pendingCostReductionsByPlayer = game.turnMetadata?.pendingCostReductionsByPlayer;
  if (pendingCostReductionsByPlayer) {
    for (const [playerId, rawEntries] of Object.entries(pendingCostReductionsByPlayer)) {
      if (!Array.isArray(rawEntries)) {
        continue;
      }
      for (let index = 0; index < rawEntries.length; index++) {
        const entry = rawEntries[index];
        pendingEffects.push({
          id: `pending-cost:${playerId}:${index}`,
          type: "cost-reduction",
          source: "game",
          sourceId: playerId,
          payload: entry,
        });
      }
    }
  }

  return pendingEffects;
}

export function buildEngineProjectionSnapshot<
  G,
  TContinuousEffect = G extends {
    continuousEffects?: { instances?: readonly (infer TInferredContinuousEffect)[] };
  }
    ? TInferredContinuousEffect
    : never,
  TActiveEffect = G extends { activeEffects?: readonly (infer TInferredActiveEffect)[] }
    ? TInferredActiveEffect
    : never,
  TStackItem = unknown,
  TPendingEffect = G extends { pendingEffects?: readonly (infer TInferredPendingEffect)[] }
    ? TInferredPendingEffect
    : never,
  TPendingCostReduction = G extends {
    turnMetadata?: {
      pendingCostReductionsByPlayer?: Partial<
        Record<string, readonly (infer TInferredPendingCostReduction)[]>
      >;
    };
  }
    ? TInferredPendingCostReduction
    : never,
>(
  state: ProjectableState<G>,
  actorContext: EngineActorContext,
  options?: { resolveDefinitionId?: (cardId: string) => string | undefined },
): EngineProjectionSnapshot<
  EngineBoardProjection,
  EngineActiveEffectProjection<TContinuousEffect | TActiveEffect>,
  EnginePendingEffectProjection<
    PendingChoicePayload | TStackItem | TPendingEffect | TPendingCostReduction
  >
> {
  return {
    stateID: state.ctx._stateID,
    actor: actorContext,
    activeEffects: extractActiveEffects(state),
    pendingEffects: extractPendingEffects(state),
    board: buildEngineBoardProjection(state, options),
  };
}
