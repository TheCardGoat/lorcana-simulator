import type { CardInstanceId, DeepReadonly, PlayerId, FrameworkStateSnapshot } from "#core";
import type { ModifyStatEffect, StatFloorEffect } from "@tcg/lorcana-types";
import { cardHasName, getKeywordValue as getBaseKeywordValue } from "../card-utils";
export { cardHasName };
import type { PlayCardExecutionContext } from "../runtime-moves/resolution/action-effects/types";
import { getActiveStatModifierTotal } from "../runtime-moves/effects/continuous-effects";
import { resolveVariableAmount } from "../runtime-moves/shared/amount/resolve-variable-amount";
import {
  evaluateStaticCondition as _evaluateStaticCondition,
  getSelfStaticCostReductionAmount as _getSelfStaticCostReductionAmount,
  hasStaticCardRestriction as _hasStaticCardRestriction,
  hasStaticSelfRestriction as _hasStaticSelfRestriction,
  isCardInPlay as _isCardInPlay,
  matchesStaticAbilityTarget as _matchesStaticAbilityTarget,
  resolveStaticVariableAmount as _resolveStaticVariableAmount,
} from "../runtime-moves/rules/static-ability-utils";
import { getTurnActionInkLimit } from "../runtime-moves/state/turn-action-ink";
import {
  getTemporaryKeywordValue,
  hasTemporaryKeyword,
  hasTemporaryRestriction,
} from "../runtime-moves/effects/temporary-effects";
import type { Classification, LorcanaCardDefinition, LorcanaCardMeta, LorcanaG } from "../types";

export type DerivedStateContext = {
  readonly ctx: {
    readonly priority?: {
      readonly holder?: string;
    };
    readonly status?: {
      readonly turn?: number;
    };
    readonly zones?: {
      readonly private?: {
        readonly cardIndex?: Record<
          string,
          | {
              readonly zoneKey?: string;
              readonly ownerID?: string;
              readonly controllerID?: string;
            }
          | undefined
        >;
        readonly cardMeta?: Record<string, DeepReadonly<LorcanaCardMeta> | undefined>;
        readonly zoneCards?: Record<string, readonly string[] | undefined>;
      };
    };
  };
  readonly G:
    | DeepReadonly<{
        readonly lore?: LorcanaG["lore"];
        readonly continuousEffects?: LorcanaG["continuousEffects"];
        readonly turnMetadata?: Partial<LorcanaG["turnMetadata"]>;
        readonly challengeState?: LorcanaG["challengeState"];
      }>
    | undefined;
};

/**
 * Converts a FrameworkStateSnapshot + G into a DerivedStateContext.
 * Use this at call sites that previously spread `{ ...framework.state, G }`.
 */
export function createProjectionState(
  snapshot: FrameworkStateSnapshot,
  G: DerivedStateContext["G"],
): DerivedStateContext {
  return {
    ctx: {
      priority: snapshot.priority,
      status: snapshot.status,
      zones: { private: snapshot._zonesPrivate },
    },
    G,
  };
}

/**
 * Flattens a DerivedStateContext into the shape expected by StaticAbilityState
 * (i.e. the FrameworkStateSnapshot-like flat layout with priority, status, _zonesPrivate).
 */
function flattenDerivedState(state: DerivedStateContext) {
  return {
    priority: state.ctx.priority,
    status: state.ctx.status,
    _zonesPrivate: state.ctx.zones?.private,
    G: state.G,
  };
}

// Local wrappers that adapt DerivedStateContext → StaticAbilityState (flat shape)
function isCardInPlay(state: DerivedStateContext, cardId: CardInstanceId): boolean {
  return _isCardInPlay(flattenDerivedState(state), cardId);
}

function evaluateStaticCondition(
  args: Omit<Parameters<typeof _evaluateStaticCondition>[0], "state"> & {
    state: DerivedStateContext;
  },
): boolean {
  return _evaluateStaticCondition({
    ...args,
    state: flattenDerivedState(args.state),
  });
}

function matchesStaticAbilityTarget(
  args: Omit<Parameters<typeof _matchesStaticAbilityTarget>[0], "state"> & {
    state: DerivedStateContext;
  },
): boolean {
  return _matchesStaticAbilityTarget({
    ...args,
    state: flattenDerivedState(args.state),
  });
}

function resolveStaticVariableAmount(
  args: Omit<Parameters<typeof _resolveStaticVariableAmount>[0], "state"> & {
    state: DerivedStateContext;
  },
): number {
  return _resolveStaticVariableAmount({
    ...args,
    state: flattenDerivedState(args.state),
  });
}

function getSelfStaticCostReductionAmount(
  args: Omit<Parameters<typeof _getSelfStaticCostReductionAmount>[0], "state"> & {
    state: DerivedStateContext;
  },
): number {
  return _getSelfStaticCostReductionAmount({
    ...args,
    state: flattenDerivedState(args.state),
  });
}

function hasStaticSelfRestriction(
  args: Omit<Parameters<typeof _hasStaticSelfRestriction>[0], "state"> & {
    state: DerivedStateContext;
  },
): boolean {
  return _hasStaticSelfRestriction({
    ...args,
    state: flattenDerivedState(args.state),
  });
}

function normalizeNumber(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toProjectionCardMeta(
  meta: DeepReadonly<LorcanaCardMeta> | undefined,
): LorcanaCardMeta | undefined {
  if (!meta) {
    return undefined;
  }

  return {
    ...meta,
    cardsUnder: meta.cardsUnder ? [...meta.cardsUnder] : undefined,
    replacementAbilities: meta.replacementAbilities ? [...meta.replacementAbilities] : undefined,
  };
}

function getDerivedStrengthForStaticCondition(args: {
  state: DerivedStateContext;
  actorPlayerId?: PlayerId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): (cardId: CardInstanceId) => number {
  const { state, getDefinitionByInstanceId } = args;

  return (cardId: CardInstanceId) => {
    const definition = getDefinitionByInstanceId?.(cardId);
    return deriveStrength(definition, state, cardId, getDefinitionByInstanceId);
  };
}

function createProjectionAmountContext(args: {
  state: DerivedStateContext;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}) {
  const { state, getDefinitionByInstanceId } = args;

  return {
    G: {
      lore: {},
      turnMetadata: state.G?.turnMetadata,
    },
    cards: {
      getDefinition: getDefinitionByInstanceId,
      require: (cardId: CardInstanceId) => ({
        meta: state.ctx.zones?.private?.cardMeta?.[cardId] ?? {},
      }),
    },
    framework: {
      state: {
        priority: state.ctx.priority,
        status: state.ctx.status,
        _zonesPrivate: state.ctx.zones?.private,
        currentPlayer: state.ctx.priority?.holder as PlayerId | undefined,
        playerIds: getProjectionPlayerIds(state),
      },
      zones: {
        getCards: ({ zone, playerId }: { zone: string; playerId: PlayerId }) =>
          (state.ctx.zones?.private?.zoneCards?.[`${zone}:${playerId}`] ?? []) as CardInstanceId[],
        getCardCount: ({ zone, playerId }: { zone: string; playerId: PlayerId }) =>
          (state.ctx.zones?.private?.zoneCards?.[`${zone}:${playerId}`] ?? []).length,
      },
    },
  };
}

function getProjectionPlayerIds(state: DerivedStateContext): PlayerId[] {
  const playerIds = new Set<PlayerId>();

  for (const playerId of (state.ctx as { playerIds?: PlayerId[] }).playerIds ?? []) {
    if (typeof playerId === "string" && playerId.length > 0) {
      playerIds.add(playerId as PlayerId);
    }
  }

  for (const entry of Object.values(state.ctx.zones?.private?.cardIndex ?? {})) {
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

  const activePlayerId = state.ctx.priority?.holder as PlayerId | undefined;
  if (activePlayerId) {
    playerIds.add(activePlayerId);
  }

  return [...playerIds];
}

function resolveStaticStatModifierAmount(args: {
  state: DerivedStateContext;
  effect: ModifyStatEffect;
  sourceId: CardInstanceId;
  targetId: CardInstanceId;
  controllerId?: PlayerId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): number {
  const { state, effect, sourceId, targetId, controllerId, getDefinitionByInstanceId } = args;

  if (typeof effect.modifier === "number" && Number.isFinite(effect.modifier)) {
    return effect.modifier;
  }

  if (!effect.modifier || typeof effect.modifier !== "object") {
    return 0;
  }

  const resolved = resolveVariableAmount(effect.modifier, {
    ctx: createProjectionAmountContext({
      state,
      getDefinitionByInstanceId,
    }) as unknown as PlayCardExecutionContext,
    controllerId,
    sourceId,
    targets: [targetId],
  });

  if (resolved.mode === "per-target") {
    return normalizeNumber(resolved.perTarget?.[targetId]);
  }

  return normalizeNumber(resolved.value);
}

function resolveStaticStatFloorMinimum(args: {
  definition: LorcanaCardDefinition | undefined;
  effect: StatFloorEffect;
}): number {
  const { definition, effect } = args;
  if (effect.minimum === "printed") {
    switch (effect.stat) {
      case "strength":
        return normalizeNumber(definition?.strength);
      case "lore":
        return normalizeNumber(definition?.lore);
      case "willpower":
        return normalizeNumber(definition?.willpower);
      default:
        return 0;
    }
  }

  return normalizeNumber(effect.minimum);
}

function matchesLegacyStaticStatTarget(args: {
  state: DerivedStateContext;
  target: unknown;
  sourceId: CardInstanceId;
  targetCardId: CardInstanceId;
  getDefinitionByInstanceId: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { state, target, sourceId, targetCardId, getDefinitionByInstanceId } = args;
  const targetDefinition = getDefinitionByInstanceId(targetCardId);
  const sourceControllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
    | PlayerId
    | undefined;
  const targetControllerId = state.ctx.zones?.private?.cardIndex?.[targetCardId]?.controllerID as
    | PlayerId
    | undefined;
  const targetAtLocationId = state.ctx.zones?.private?.cardMeta?.[targetCardId]?.atLocationId as
    | CardInstanceId
    | undefined;

  switch (target) {
    case "SELF":
      return sourceId === targetCardId;
    case "CHARACTERS_HERE":
      return targetDefinition?.cardType === "character" && targetAtLocationId === sourceId;
    case "YOUR_LOCATIONS":
      return targetDefinition?.cardType === "location" && targetControllerId === sourceControllerId;
    case "YOUR_OTHER_SEVEN_DWARFS_CHARACTERS":
      return (
        sourceId !== targetCardId &&
        targetDefinition?.cardType === "character" &&
        targetControllerId === sourceControllerId &&
        (targetDefinition.classifications ?? []).includes("Seven Dwarfs")
      );
    default:
      return false;
  }
}

function getStaticStatModifierTotal(args: {
  state: DerivedStateContext;
  cardInstanceId?: CardInstanceId;
  stat: "strength" | "willpower" | "lore";
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): number {
  const { state, cardInstanceId, stat, getDefinitionByInstanceId } = args;
  if (!cardInstanceId || !getDefinitionByInstanceId) {
    return 0;
  }

  if (!isCardInPlay(state, cardInstanceId)) {
    return 0;
  }

  const cardIndex = state.ctx.zones?.private?.cardIndex;
  if (!cardIndex) {
    return 0;
  }

  let total = 0;
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    getDefinitionByInstanceId,
  });

  for (const sourceId of Object.keys(cardIndex) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static") {
        continue;
      }

      // Unwrap conditional effects to find modify-stat inside
      let modifyStatEffect: ModifyStatEffect | undefined;
      let extraCondition: Parameters<typeof evaluateStaticCondition>[0]["condition"];

      if (ability.effect?.type === "modify-stat") {
        modifyStatEffect = ability.effect as ModifyStatEffect;
      } else if (
        ability.effect?.type === "conditional" &&
        (ability.effect as { then?: { type?: string } }).then?.type === "modify-stat"
      ) {
        const conditional = ability.effect as {
          condition?: Parameters<typeof evaluateStaticCondition>[0]["condition"];
          then: ModifyStatEffect;
        };
        modifyStatEffect = conditional.then;
        extraCondition = conditional.condition;
      }

      if (!modifyStatEffect) {
        continue;
      }

      if (modifyStatEffect.stat !== stat) {
        continue;
      }

      const controllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
        | PlayerId
        | undefined;

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      // Evaluate the condition from the conditional wrapper
      if (
        extraCondition &&
        !evaluateStaticCondition({
          condition: extraCondition,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: modifyStatEffect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: modifyStatEffect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      total += resolveStaticStatModifierAmount({
        state,
        effect: modifyStatEffect,
        sourceId,
        targetId: cardInstanceId,
        controllerId,
        getDefinitionByInstanceId,
      });
    }
  }

  return total;
}

export function getStaticStatModifierSources(args: {
  state: DerivedStateContext;
  cardInstanceId?: CardInstanceId;
  stat: "strength" | "willpower" | "lore";
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): Array<{
  stat: string;
  amount: number;
  sourceId: CardInstanceId;
  sourceDefinitionId?: string;
}> {
  const { state, cardInstanceId, stat, getDefinitionByInstanceId } = args;
  if (!cardInstanceId || !getDefinitionByInstanceId || !isCardInPlay(state, cardInstanceId)) {
    return [];
  }

  const cardIndex = state.ctx.zones?.private?.cardIndex;
  if (!cardIndex) {
    return [];
  }

  const sources: Array<{
    stat: string;
    amount: number;
    sourceId: CardInstanceId;
    sourceDefinitionId?: string;
  }> = [];
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    getDefinitionByInstanceId,
  });

  for (const sourceId of Object.keys(cardIndex) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static") {
        continue;
      }

      // Unwrap conditional effects to find modify-stat inside
      let modifyStatEffect: ModifyStatEffect | undefined;
      let extraCondition: Parameters<typeof evaluateStaticCondition>[0]["condition"];

      if (ability.effect?.type === "modify-stat") {
        modifyStatEffect = ability.effect as ModifyStatEffect;
      } else if (
        ability.effect?.type === "conditional" &&
        (ability.effect as { then?: { type?: string } }).then?.type === "modify-stat"
      ) {
        const conditional = ability.effect as {
          condition?: Parameters<typeof evaluateStaticCondition>[0]["condition"];
          then: ModifyStatEffect;
        };
        modifyStatEffect = conditional.then;
        extraCondition = conditional.condition;
      }

      if (!modifyStatEffect) {
        continue;
      }

      if (modifyStatEffect.stat !== stat) {
        continue;
      }

      const controllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
        | PlayerId
        | undefined;

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        extraCondition &&
        !evaluateStaticCondition({
          condition: extraCondition,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: modifyStatEffect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: modifyStatEffect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      const amount = resolveStaticStatModifierAmount({
        state,
        effect: modifyStatEffect,
        sourceId,
        targetId: cardInstanceId,
        controllerId,
        getDefinitionByInstanceId,
      });

      if (amount !== 0) {
        sources.push({
          stat,
          amount,
          sourceId,
          sourceDefinitionId: sourceDefinition.id,
        });
      }
    }
  }

  return sources;
}

function getStaticStatFloor(args: {
  state: DerivedStateContext;
  cardInstanceId?: CardInstanceId;
  stat: "strength" | "willpower" | "lore";
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): number | undefined {
  const { state, cardInstanceId, stat, getDefinitionByInstanceId } = args;
  if (!cardInstanceId || !getDefinitionByInstanceId) {
    return undefined;
  }

  if (!isCardInPlay(state, cardInstanceId)) {
    return undefined;
  }

  const cardIndex = state.ctx.zones?.private?.cardIndex;
  if (!cardIndex) {
    return undefined;
  }

  const targetDefinition = getDefinitionByInstanceId(cardInstanceId);
  let minimum: number | undefined;
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    getDefinitionByInstanceId,
  });

  for (const sourceId of Object.keys(cardIndex) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "stat-floor") {
        continue;
      }

      if (ability.effect.stat !== stat) {
        continue;
      }

      const controllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
        | PlayerId
        | undefined;
      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      const floor = resolveStaticStatFloorMinimum({
        definition: targetDefinition,
        effect: ability.effect,
      });
      minimum = minimum === undefined ? floor : Math.max(minimum, floor);
    }
  }

  return minimum;
}

function applyStaticStatFloor(value: number, floor: number | undefined): number {
  if (floor === undefined) {
    return value;
  }

  return Math.max(value, floor);
}

export function clampCharacteristicForRules(value: number): number {
  return Math.max(0, normalizeNumber(value));
}

export function getEffectiveLore(
  definition: LorcanaCardDefinition | undefined,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  return clampCharacteristicForRules(
    deriveLore(definition, state, cardInstanceId, getDefinitionByInstanceId),
  );
}

export function deriveLore(
  definition: LorcanaCardDefinition | undefined,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  const baseLore = normalizeNumber(definition?.lore);

  if (!definition || !cardInstanceId) {
    return baseLore;
  }

  const modifier =
    getActiveStatModifierTotal(state, cardInstanceId, "lore", getDefinitionByInstanceId) +
    getStaticStatModifierTotal({
      state,
      cardInstanceId,
      stat: "lore",
      getDefinitionByInstanceId,
    });
  return applyStaticStatFloor(
    baseLore + modifier,
    getStaticStatFloor({
      state,
      cardInstanceId,
      stat: "lore",
      getDefinitionByInstanceId,
    }),
  );
}

export function deriveCanBePutInInkwell(args: {
  definition?: LorcanaCardDefinition;
  ownerID?: PlayerId;
  zoneID?: string;
  state: DerivedStateContext;
  actorPlayerId?: PlayerId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): boolean {
  const { definition, ownerID, zoneID, state, actorPlayerId, getDefinitionByInstanceId } = args;
  if (!definition || !ownerID || !zoneID || !actorPlayerId) {
    return false;
  }

  const cardIndex = state.ctx.zones?.private?.cardIndex;
  if (!cardIndex) {
    return false;
  }

  const normalizedZone = zoneID.split(":")[0];
  const inkedThisTurn = state.G?.turnMetadata?.inkedThisTurn ?? [];
  const inkLimit = getTurnActionInkLimit({
    state: {
      ctx: {
        priority: {
          holder: state.ctx.priority?.holder,
        },
        zones: {
          private: {
            cardIndex,
          },
        },
      },
      G: {
        turnMetadata: {
          inkedThisTurn: state.G?.turnMetadata?.inkedThisTurn ?? [],
          additionalInkwellActions: state.G?.turnMetadata?.additionalInkwellActions,
        },
      },
    },
    getDefinitionByInstanceId,
    playerId: actorPlayerId,
  });
  if (inkedThisTurn.length >= inkLimit) {
    return false;
  }

  if (ownerID !== actorPlayerId) {
    return false;
  }

  const isInHand = normalizedZone === "hand";
  const isInDiscard = normalizedZone === "discard";

  if (!isInHand && !isInDiscard) {
    return false;
  }

  // Check if any active static ability in play grants inkability for this zone
  const allPlayCards = Object.entries(state.ctx.zones?.private?.cardIndex ?? {}).filter(
    ([, entry]) => {
      const zone = entry?.zoneKey?.split(":")[0];
      return zone === "play" && entry?.controllerID === actorPlayerId;
    },
  );

  if (isInDiscard) {
    // Cards in discard can only be inked if a static grants discard inkability
    // AND the card is normally inkable
    if (!definition.inkable) {
      return false;
    }
    for (const [sourceId] of allPlayCards) {
      const sourceDef = getDefinitionByInstanceId?.(sourceId as CardInstanceId);
      if (!sourceDef) continue;
      for (const ability of sourceDef.abilities ?? []) {
        if (
          ability.type !== "static" ||
          (ability.effect as { type?: string }).type !== "grant-discard-inkability"
        ) {
          continue;
        }
        const activeSourceZones = ability.sourceZones ?? ["play"];
        if (!activeSourceZones.includes("play")) {
          continue;
        }
        if (
          !evaluateStaticCondition({
            condition: ability.condition,
            state,
            controllerId: actorPlayerId,
            sourceId: sourceId as CardInstanceId,
            getDefinitionByInstanceId,
          })
        ) {
          continue;
        }
        return true;
      }
    }
    return false;
  }

  // Hand zone: card is inkable by default or via grant-hand-inkability
  if (definition.inkable) {
    return true;
  }

  for (const [sourceId] of allPlayCards) {
    const sourceDef = getDefinitionByInstanceId?.(sourceId as CardInstanceId);
    if (!sourceDef) continue;
    for (const ability of sourceDef.abilities ?? []) {
      if (
        ability.type !== "static" ||
        (ability.effect as { type?: string }).type !== "grant-hand-inkability"
      ) {
        continue;
      }
      const activeSourceZones = ability.sourceZones ?? ["play"];
      if (!activeSourceZones.includes("play")) {
        continue;
      }
      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId: actorPlayerId,
          sourceId: sourceId as CardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }
      return true;
    }
  }

  return false;
}

export function getEffectiveStrength(
  definition: LorcanaCardDefinition | undefined,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  return clampCharacteristicForRules(
    deriveStrength(definition, state, cardInstanceId, getDefinitionByInstanceId),
  );
}

export function deriveStrength(
  definition: LorcanaCardDefinition | undefined,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  if (!definition || definition.cardType !== "character" || !cardInstanceId) {
    return 0;
  }

  const baseStrength = normalizeNumber(definition.strength);
  const modifier =
    getActiveStatModifierTotal(state, cardInstanceId, "strength", getDefinitionByInstanceId) +
    getStaticStatModifierTotal({
      state,
      cardInstanceId,
      stat: "strength",
      getDefinitionByInstanceId,
    });
  return applyStaticStatFloor(
    baseStrength + modifier,
    getStaticStatFloor({
      state,
      cardInstanceId,
      stat: "strength",
      getDefinitionByInstanceId,
    }),
  );
}

export function getEffectiveWillpower(
  definition: LorcanaCardDefinition | undefined,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  return clampCharacteristicForRules(
    deriveWillpower(definition, state, cardInstanceId, getDefinitionByInstanceId),
  );
}

export function deriveWillpower(
  definition: LorcanaCardDefinition | undefined,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): number {
  if (!definition || !cardInstanceId) {
    return 0;
  }

  if (definition.cardType === "action" || definition.cardType === "item") {
    return 0;
  }

  const baseWillpower = normalizeNumber(definition.willpower);
  const modifier =
    getActiveStatModifierTotal(state, cardInstanceId, "willpower", getDefinitionByInstanceId) +
    getStaticStatModifierTotal({
      state,
      cardInstanceId,
      stat: "willpower",
      getDefinitionByInstanceId,
    });
  const derivedWillpower = applyStaticStatFloor(
    baseWillpower + modifier,
    getStaticStatFloor({
      state,
      cardInstanceId,
      stat: "willpower",
      getDefinitionByInstanceId,
    }),
  );

  return definition.cardType === "location" ? Math.max(0, derivedWillpower) : derivedWillpower;
}

export type PendingCostReduction = {
  amount: number;
  cardType?: "character" | "item" | "location" | "action" | "song";
  classification?: Classification | Classification[] | readonly Classification[];
  expiresAtTurn: number;
  consumeOnUse: boolean;
};

function isPendingCostReduction(value: unknown): value is PendingCostReduction {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const reduction = value as Record<string, unknown>;
  return (
    typeof reduction.amount === "number" &&
    Number.isFinite(reduction.amount) &&
    reduction.amount >= 0 &&
    typeof reduction.expiresAtTurn === "number" &&
    Number.isFinite(reduction.expiresAtTurn) &&
    reduction.expiresAtTurn >= 0
  );
}

function matchesCostReductionCardType(
  definition: LorcanaCardDefinition,
  targetCardType: PendingCostReduction["cardType"],
): boolean {
  if (!targetCardType) {
    return true;
  }

  if (targetCardType === "song") {
    return definition.cardType === "action" && definition.actionSubtype === "song";
  }

  return definition.cardType === targetCardType;
}

function matchesCostReductionClassification(
  definition: LorcanaCardDefinition,
  classification: PendingCostReduction["classification"],
): boolean {
  if (!classification) {
    return true;
  }

  if (definition.cardType !== "character") {
    return false;
  }

  const cardClassifications = definition.classifications ?? [];
  if (Array.isArray(classification)) {
    return classification.some((c) => cardClassifications.includes(c));
  }

  return typeof classification === "string" && cardClassifications.includes(classification);
}

function matchesCostReductionName(
  definition: LorcanaCardDefinition,
  name: string | undefined,
): boolean {
  if (!name) {
    return true;
  }

  return cardHasName(definition, name);
}

export function getPendingCostReductions(
  state: DerivedStateContext,
  playerId: PlayerId,
): PendingCostReduction[] {
  if (!state.G) {
    return [];
  }

  const pendingByPlayer = state.G.turnMetadata?.pendingCostReductionsByPlayer;
  if (!pendingByPlayer || typeof pendingByPlayer !== "object") {
    return [];
  }

  const rawEntries = pendingByPlayer[playerId];
  if (!Array.isArray(rawEntries)) {
    return [];
  }

  return rawEntries.filter(isPendingCostReduction);
}

function getStaticCostReductionAmount(args: {
  state: DerivedStateContext;
  playerId: PlayerId;
  definition: LorcanaCardDefinition;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  playMethod?: "shift" | "standard";
}): number {
  const { state, playerId, definition, getDefinitionByInstanceId, playMethod } = args;
  if (!getDefinitionByInstanceId) {
    return 0;
  }

  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    actorPlayerId: playerId,
    getDefinitionByInstanceId,
  });
  let total = 0;

  for (const cardId of Object.keys(state.ctx.zones?.private?.cardIndex ?? {}) as CardInstanceId[]) {
    if (!isCardInPlay(state, cardId)) {
      continue;
    }

    const controllerId = state.ctx.zones?.private?.cardIndex?.[cardId]?.controllerID as
      | PlayerId
      | undefined;
    if (controllerId !== playerId) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(cardId);
    if (!sourceDefinition) {
      continue;
    }

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "cost-reduction") {
        continue;
      }

      const activeSourceZones = ability.sourceZones ?? ["play"];
      if (!activeSourceZones.includes("play")) {
        continue;
      }

      // If the effect is restricted to a specific play method, skip when the
      // current play method does not match (or when no play method is provided
      // and the effect requires a specific one).
      const effectPlayMethod = (ability.effect as { playMethod?: string }).playMethod;
      if (effectPlayMethod !== undefined) {
        if (!playMethod || playMethod !== effectPlayMethod) {
          continue;
        }
      }

      if (!matchesCostReductionCardType(definition, ability.effect.cardType)) {
        continue;
      }

      if (!matchesCostReductionClassification(definition, ability.effect.classification)) {
        continue;
      }

      if (ability.effect.cardName && definition.name !== ability.effect.cardName) {
        continue;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId: playerId,
          sourceId: cardId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      const baseCost = Number(definition.cost ?? 0);
      const amount =
        ability.effect.amount === "full" || ability.effect.reduction?.ink === "full"
          ? baseCost
          : typeof ability.effect.amount === "number"
            ? ability.effect.amount
            : typeof ability.effect.amount === "object"
              ? resolveStaticVariableAmount({
                  amount: ability.effect.amount,
                  state,
                  controllerId: playerId,
                  sourceId: cardId,
                  getDefinitionByInstanceId,
                })
              : typeof ability.effect.reduction?.ink === "number"
                ? ability.effect.reduction.ink
                : 0;
      total += Math.max(0, amount);
    }
  }

  return total;
}

/**
 * Sum up static cost-increase amounts from ALL in-play cards (any player).
 * Used for effects like "Each player pays N more to play actions or items."
 */
export function getStaticCostIncreaseAmount(args: {
  state: DerivedStateContext;
  definition: LorcanaCardDefinition;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): number {
  const { state, definition, getDefinitionByInstanceId } = args;
  if (!getDefinitionByInstanceId) {
    return 0;
  }

  let total = 0;

  for (const cardId of Object.keys(state.ctx.zones?.private?.cardIndex ?? {}) as CardInstanceId[]) {
    if (!isCardInPlay(state, cardId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(cardId);
    if (!sourceDefinition) {
      continue;
    }

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "cost-increase") {
        continue;
      }

      const activeSourceZones = ability.sourceZones ?? ["play"];
      if (!activeSourceZones.includes("play")) {
        continue;
      }

      const increaseEffect = ability.effect;
      const cardTypes = increaseEffect.cardType;
      if (cardTypes !== undefined) {
        const types = Array.isArray(cardTypes) ? cardTypes : [cardTypes];
        const isSong =
          definition.cardType === "action" &&
          "actionSubtype" in definition &&
          definition.actionSubtype === "song";
        const matches = types.some((t) => {
          if (t === "song") return isSong;
          return definition.cardType === t;
        });
        if (!matches) {
          continue;
        }
      }

      const amount = typeof increaseEffect.amount === "number" ? increaseEffect.amount : 0;
      total += Math.max(0, amount);
    }
  }

  return total;
}

export type CostReductionApplication = {
  reductionAmount: number;
  consumeIndexes: number[];
};

export function getAppliedCostReductions(args: {
  definition?: LorcanaCardDefinition;
  state: DerivedStateContext;
  cardInstanceId?: CardInstanceId;
  ownerID?: PlayerId;
  zoneID?: string;
  actorPlayerId?: PlayerId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  playMethod?: "shift" | "standard";
}): CostReductionApplication {
  const {
    definition,
    state,
    cardInstanceId,
    ownerID,
    zoneID,
    actorPlayerId,
    getDefinitionByInstanceId,
    playMethod,
  } = args;

  if (!definition) {
    return { reductionAmount: 0, consumeIndexes: [] };
  }

  const normalizedZone = zoneID?.split(":")[0];
  if (!actorPlayerId || ownerID !== actorPlayerId || normalizedZone !== "hand") {
    return { reductionAmount: 0, consumeIndexes: [] };
  }

  const currentTurn = state.ctx.status?.turn ?? 1;
  const pendingReductions = getPendingCostReductions(state, actorPlayerId);
  let pendingAmount = 0;
  const consumeIndexes: number[] = [];

  pendingReductions.forEach((reduction, index) => {
    if (reduction.expiresAtTurn < currentTurn) {
      return;
    }
    if (!matchesCostReductionCardType(definition, reduction.cardType)) {
      return;
    }
    if (!matchesCostReductionClassification(definition, reduction.classification)) {
      return;
    }
    pendingAmount += reduction.amount;
    if (reduction.consumeOnUse) {
      consumeIndexes.push(index);
    }
  });

  const staticReduction = getStaticCostReductionAmount({
    state,
    playerId: actorPlayerId,
    definition,
    getDefinitionByInstanceId,
    playMethod,
  });
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    actorPlayerId,
    getDefinitionByInstanceId,
  });
  const selfStaticReduction = getSelfStaticCostReductionAmount({
    state,
    cardId: cardInstanceId,
    controllerId: actorPlayerId,
    definition,
    sourceZone: normalizedZone as "play" | "hand" | "discard" | "inkwell" | undefined,
    getDefinitionByInstanceId,
    getCardStrengthByInstanceId,
  });

  return {
    reductionAmount: pendingAmount + staticReduction + selfStaticReduction,
    consumeIndexes,
  };
}

export function derivePlayCost(args: {
  definition?: LorcanaCardDefinition;
  state: DerivedStateContext;
  cardInstanceId?: CardInstanceId;
  ownerID?: PlayerId;
  zoneID?: string;
  actorPlayerId?: PlayerId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
  playMethod?: "shift" | "standard";
}): number {
  const { definition } = args;
  const baseCost = normalizeNumber(definition?.cost);
  if (!definition) {
    return baseCost;
  }

  const application = getAppliedCostReductions(args);
  const increaseAmount = getStaticCostIncreaseAmount({
    ...args,
    definition,
  });
  return Math.max(0, baseCost - application.reductionAmount + increaseAmount);
}

function isSourceInPlayForProjection(state: DerivedStateContext, sourceId: string): boolean {
  const zoneKey = state.ctx.zones?.private?.cardIndex?.[sourceId]?.zoneKey;
  return typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"));
}

export function getActiveTemporaryKeywordNames(
  meta: LorcanaCardMeta | undefined,
  currentTurn: number,
  state?: DerivedStateContext,
): string[] {
  const rawKeywords = meta?.temporaryKeywords;
  if (!rawKeywords || typeof rawKeywords !== "object" || Array.isArray(rawKeywords)) {
    return [];
  }

  const isSourceInPlay = state
    ? (sourceId: string) => isSourceInPlayForProjection(state, sourceId)
    : undefined;

  const names = Object.keys(rawKeywords).filter((keyword) =>
    hasTemporaryKeyword(
      meta,
      currentTurn,
      keyword,
      isSourceInPlay ? { isSourceInPlay } : undefined,
    ),
  );
  names.sort((left, right) => left.localeCompare(right));
  return names;
}

export function getActiveStaticSelfKeywordGrants(args: {
  definition: LorcanaCardDefinition | undefined;
  state: DerivedStateContext;
  controllerId?: PlayerId;
  zoneID?: string;
  cardInstanceId?: CardInstanceId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): { keywords: string[]; values: Record<string, number> } {
  const { definition, state, controllerId, zoneID, cardInstanceId, getDefinitionByInstanceId } =
    args;
  const normalizedZone = zoneID?.split(":")[0];
  if (!definition || normalizedZone !== "play") {
    return { keywords: [], values: {} };
  }
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    actorPlayerId: controllerId,
    getDefinitionByInstanceId,
  });

  const keywords: string[] = [];
  const values: Record<string, number> = {};

  for (const ability of definition.abilities ?? []) {
    if (ability.type !== "static" || ability.effect?.type !== "gain-keyword") {
      continue;
    }

    if (ability.effect.target !== "SELF") {
      continue;
    }

    if (
      !evaluateStaticCondition({
        condition: ability.condition,
        state,
        controllerId,
        sourceId: cardInstanceId,
        getDefinitionByInstanceId,
        getCardStrengthByInstanceId,
      })
    ) {
      continue;
    }

    const keyword =
      typeof ability.effect.keyword === "string" && ability.effect.keyword.trim().length > 0
        ? ability.effect.keyword.trim()
        : undefined;
    if (!keyword) {
      continue;
    }

    keywords.push(keyword);

    if (typeof ability.effect.value === "number" && Number.isFinite(ability.effect.value)) {
      const amount = ability.effect.value;
      if (amount > 0) {
        values[keyword] = (values[keyword] ?? 0) + amount;
      }
    } else if (typeof ability.effect.value === "object" && ability.effect.value !== null) {
      const resolvedAmount = resolveStaticVariableAmount({
        amount: ability.effect.value,
        state,
        controllerId,
        sourceId: cardInstanceId,
        getDefinitionByInstanceId,
      });
      if (resolvedAmount > 0) {
        values[keyword] = (values[keyword] ?? 0) + resolvedAmount;
      }
    }
  }

  keywords.sort((left, right) => left.localeCompare(right));
  return { keywords, values };
}

export function getActiveStaticKeywordGrants(args: {
  definition: LorcanaCardDefinition | undefined;
  state: DerivedStateContext;
  controllerId?: PlayerId;
  zoneID?: string;
  cardInstanceId?: CardInstanceId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): { keywords: string[]; values: Record<string, number> } {
  const { definition, state, controllerId, zoneID, cardInstanceId, getDefinitionByInstanceId } =
    args;
  const normalizedZone = zoneID?.split(":")[0];
  if (!definition || normalizedZone !== "play" || !cardInstanceId || !getDefinitionByInstanceId) {
    return { keywords: [], values: {} };
  }

  const keywords: string[] = [];
  const values: Record<string, number> = {};
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    actorPlayerId: controllerId,
    getDefinitionByInstanceId,
  });

  for (const sourceId of Object.keys(
    state.ctx.zones?.private?.cardIndex ?? {},
  ) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    const sourceControllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
      | PlayerId
      | undefined;

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "gain-keyword") {
        continue;
      }

      if (ability.effect.target === "SELF") {
        continue;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId: sourceControllerId ?? controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId: sourceControllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      const keyword =
        typeof ability.effect.keyword === "string" && ability.effect.keyword.trim().length > 0
          ? ability.effect.keyword.trim()
          : undefined;
      if (!keyword) {
        continue;
      }

      keywords.push(keyword);
      if (typeof ability.effect.value === "number" && Number.isFinite(ability.effect.value)) {
        const amount = ability.effect.value;
        if (amount > 0) {
          values[keyword] = (values[keyword] ?? 0) + amount;
        }
      } else if (typeof ability.effect.value === "object" && ability.effect.value !== null) {
        const resolvedAmount = resolveStaticVariableAmount({
          amount: ability.effect.value,
          state,
          controllerId: sourceControllerId ?? controllerId,
          sourceId,
          getDefinitionByInstanceId,
        });
        if (resolvedAmount > 0) {
          values[keyword] = (values[keyword] ?? 0) + resolvedAmount;
        }
      }
    }
  }

  keywords.sort((left, right) => left.localeCompare(right));
  return { keywords, values };
}

export function getActiveStaticKeywordLosses(args: {
  definition: LorcanaCardDefinition | undefined;
  state: DerivedStateContext;
  controllerId?: PlayerId;
  zoneID?: string;
  cardInstanceId?: CardInstanceId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): string[] {
  const { definition, state, controllerId, zoneID, cardInstanceId, getDefinitionByInstanceId } =
    args;
  const normalizedZone = zoneID?.split(":")[0];
  if (!definition || normalizedZone !== "play" || !cardInstanceId || !getDefinitionByInstanceId) {
    return [];
  }

  const keywords = new Set<string>();
  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    actorPlayerId: controllerId,
    getDefinitionByInstanceId,
  });

  for (const sourceId of Object.keys(
    state.ctx.zones?.private?.cardIndex ?? {},
  ) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    const sourceControllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
      | PlayerId
      | undefined;

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "lose-keyword") {
        continue;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId: sourceControllerId ?? controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId: sourceControllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      const keyword =
        typeof ability.effect.keyword === "string" && ability.effect.keyword.trim().length > 0
          ? ability.effect.keyword.trim()
          : undefined;
      if (keyword) {
        keywords.add(keyword);
      }
    }
  }

  return [...keywords].sort((left, right) => left.localeCompare(right));
}

export function getActiveStaticKeywordGrantSources(args: {
  definition: LorcanaCardDefinition | undefined;
  state: DerivedStateContext;
  controllerId?: PlayerId;
  zoneID?: string;
  cardInstanceId?: CardInstanceId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): Array<{
  keyword: string;
  sourceId: CardInstanceId;
  sourceDefinitionId?: string;
}> {
  const { definition, state, controllerId, zoneID, cardInstanceId, getDefinitionByInstanceId } =
    args;
  const normalizedZone = zoneID?.split(":")[0];
  if (!definition || normalizedZone !== "play" || !cardInstanceId || !getDefinitionByInstanceId) {
    return [];
  }

  const sources: Array<{
    keyword: string;
    sourceId: CardInstanceId;
    sourceDefinitionId?: string;
  }> = [];

  for (const sourceId of Object.keys(
    state.ctx.zones?.private?.cardIndex ?? {},
  ) as CardInstanceId[]) {
    if (sourceId === cardInstanceId || !isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    const sourceControllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
      | PlayerId
      | undefined;

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "gain-keyword") {
        continue;
      }

      if (ability.effect.target === "SELF") {
        continue;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId: sourceControllerId ?? controllerId,
          sourceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId: sourceControllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      const keyword =
        typeof ability.effect.keyword === "string" && ability.effect.keyword.trim().length > 0
          ? ability.effect.keyword.trim()
          : undefined;
      if (!keyword) {
        continue;
      }

      sources.push({
        keyword,
        sourceId,
        sourceDefinitionId: sourceDefinition.id,
      });
    }
  }

  return sources;
}

export function getActiveStaticClassificationGrants(args: {
  definition: LorcanaCardDefinition | undefined;
  state: DerivedStateContext;
  controllerId?: PlayerId;
  zoneID?: string;
  cardInstanceId?: CardInstanceId;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): string[] {
  const { definition, state, controllerId, zoneID, cardInstanceId, getDefinitionByInstanceId } =
    args;
  const normalizedZone = zoneID?.split(":")[0];
  if (!definition || normalizedZone !== "play" || !cardInstanceId || !getDefinitionByInstanceId) {
    return [];
  }

  const getCardStrengthByInstanceId = getDerivedStrengthForStaticCondition({
    state,
    actorPlayerId: controllerId,
    getDefinitionByInstanceId,
  });
  const classifications: string[] = [];
  const activeTemporaryClassifications = getActiveTemporaryMap(
    state.ctx.zones?.private?.cardMeta?.[cardInstanceId]?.temporaryClassifications,
    state.ctx.zones?.private?.cardMeta?.[cardInstanceId]?.temporaryClassificationStarts,
    state.ctx.status?.turn ?? 1,
  );
  if (activeTemporaryClassifications) {
    classifications.push(...Object.keys(activeTemporaryClassifications));
  }

  for (const sourceId of Object.keys(
    state.ctx.zones?.private?.cardIndex ?? {},
  ) as CardInstanceId[]) {
    if (!isCardInPlay(state, sourceId)) {
      continue;
    }

    const sourceDefinition = getDefinitionByInstanceId(sourceId);
    if (!sourceDefinition) {
      continue;
    }

    const sourceControllerId = state.ctx.zones?.private?.cardIndex?.[sourceId]?.controllerID as
      | PlayerId
      | undefined;

    for (const ability of sourceDefinition.abilities ?? []) {
      if (ability.type !== "static" || ability.effect?.type !== "property-modification") {
        continue;
      }
      if (ability.effect.property !== "classification" || ability.effect.operation !== "add") {
        continue;
      }

      if (
        !evaluateStaticCondition({
          condition: ability.condition,
          state,
          controllerId: sourceControllerId ?? controllerId,
          sourceId,
          getDefinitionByInstanceId,
          getCardStrengthByInstanceId,
        })
      ) {
        continue;
      }

      if (
        !matchesStaticAbilityTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          controllerId: sourceControllerId,
          getDefinitionByInstanceId,
        }) &&
        !matchesLegacyStaticStatTarget({
          state,
          target: ability.effect.target,
          sourceId,
          targetCardId: cardInstanceId,
          getDefinitionByInstanceId,
        })
      ) {
        continue;
      }

      const classification =
        typeof ability.effect.value === "string" && ability.effect.value.trim().length > 0
          ? ability.effect.value.trim()
          : undefined;
      if (classification) {
        classifications.push(classification);
      }
    }
  }

  return [...new Set(classifications)].sort((left, right) => left.localeCompare(right));
}

export function getActiveTemporaryMap(
  effectMap: Record<string, number> | undefined,
  startMap: Record<string, number> | undefined,
  currentTurn: number,
): Record<string, number> | undefined {
  if (!effectMap || typeof effectMap !== "object") {
    return undefined;
  }

  const activeEntries = Object.entries(effectMap).filter(([key, expiryTurn]) => {
    if (typeof expiryTurn !== "number" || !Number.isFinite(expiryTurn)) {
      return false;
    }

    const startTurn = startMap?.[key];
    const normalizedStart =
      typeof startTurn === "number" && Number.isFinite(startTurn) ? startTurn : 1;
    return currentTurn >= normalizedStart && currentTurn <= expiryTurn;
  });

  return activeEntries.length > 0 ? Object.fromEntries(activeEntries) : undefined;
}

export function getDerivedHasQuestRestriction(
  meta: LorcanaCardMeta | undefined,
  currentTurn: number,
  state: DerivedStateContext,
  cardInstanceId?: CardInstanceId,
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined,
): boolean {
  if (
    hasTemporaryRestriction(meta, currentTurn, "cant-quest", {
      isSourceInPlay: (sourceId) => isSourceInPlayForProjection(state, sourceId),
    })
  ) {
    return true;
  }

  if (cardInstanceId && getDefinitionByInstanceId) {
    if (
      hasStaticSelfRestriction({
        state,
        cardId: cardInstanceId,
        restriction: "cant-quest",
        getDefinitionByInstanceId,
      })
    ) {
      return true;
    }

    return _hasStaticCardRestriction({
      state: flattenDerivedState(state),
      cardId: cardInstanceId,
      restriction: "cant-quest",
      getDefinitionByInstanceId,
    });
  }

  return false;
}
