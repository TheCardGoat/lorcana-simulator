import type { CardInstanceId, PlayerId } from "#core";
import type {
  PendingActionEffect,
  PendingActionEffectContinuation,
  PendingActionEffectKind,
} from "../../../types";
import type { CardPlayedPayload } from "../../../types";
import type { ActionResolutionInput, PlayCardExecutionContext } from "./types";
import { applyReplacementEffects } from "../../effects/replacement-effects";
import type { ReplacementEvent } from "../../effects/replacement-effects";
import { getLorcanaCardName, traceLorcanaRuntimeStep } from "../../../runtime-trace";

type PendingActionEffectReadableContext = {
  G: {
    pendingEffects?: readonly unknown[];
  };
  framework: {
    state: {
      ctx: {
        priority: {
          pendingChoice?: {
            type?: string;
          };
        };
        zones: {
          private: {
            cardIndex: Record<string, { zoneKey?: string } | undefined>;
          };
        };
      };
    };
    zones: {
      moveCard: PlayCardExecutionContext["framework"]["zones"]["moveCard"];
    };
  };
  cards: Pick<PlayCardExecutionContext["cards"], "clearMeta">;
};

export const EFFECT_PENDING_ERROR_CODE = "EFFECT_PENDING";

type PendingActionEffectParams = {
  kind: PendingActionEffectKind;
  sourceCardId: CardInstanceId;
  controllerId: PlayerId;
  chooserId: PlayerId;
  cardPlayed: CardPlayedPayload;
  effect: unknown;
  continuation?: PendingActionEffectContinuation;
  resolutionInput: ActionResolutionInput;
};

export function cloneActionResolutionInput(
  resolutionInput: ActionResolutionInput,
): ActionResolutionInput {
  const clonedEventSnapshot = resolutionInput.eventSnapshot
    ? {
        ...resolutionInput.eventSnapshot,
        revealedCardIds: Array.isArray(resolutionInput.eventSnapshot.revealedCardIds)
          ? [...resolutionInput.eventSnapshot.revealedCardIds]
          : resolutionInput.eventSnapshot.revealedCardIds,
        revealWindowIds: Array.isArray(resolutionInput.eventSnapshot.revealWindowIds)
          ? [...resolutionInput.eventSnapshot.revealWindowIds]
          : resolutionInput.eventSnapshot.revealWindowIds,
      }
    : undefined;

  return {
    ...resolutionInput,
    targets: Array.isArray(resolutionInput.targets)
      ? ([...resolutionInput.targets] as Array<CardInstanceId | PlayerId>)
      : typeof resolutionInput.targets === "string"
        ? resolutionInput.targets
        : undefined,
    destinations: Array.isArray(resolutionInput.destinations)
      ? resolutionInput.destinations.map((destination) => ({
          zone: destination.zone,
          cards: Array.isArray(destination.cards) ? [...destination.cards] : destination.cards,
        }))
      : undefined,
    eventSnapshot: clonedEventSnapshot,
    triggerContext: resolutionInput.triggerContext
      ? { ...resolutionInput.triggerContext }
      : undefined,
  };
}

function getPendingEffectId(
  ctx: PlayCardExecutionContext,
  sourceCardId: CardInstanceId,
  chooserId: PlayerId,
): string {
  const stateId = ctx.framework.state.ctx._stateID ?? 0;
  const nextIndex = (ctx.G.pendingEffects?.length ?? 0) + 1;
  return `pending-action:${stateId}:${sourceCardId}:${chooserId}:${nextIndex}`;
}

export function createPendingActionEffect(
  ctx: PlayCardExecutionContext,
  params: PendingActionEffectParams,
): PendingActionEffect {
  return {
    id: getPendingEffectId(ctx, params.sourceCardId, params.chooserId),
    type: "action-effect",
    kind: params.kind,
    sourceId: params.sourceCardId,
    sourceCardId: params.sourceCardId,
    controllerId: params.controllerId,
    chooserId: params.chooserId,
    cardPlayed: {
      ...params.cardPlayed,
      singerIds: params.cardPlayed.singerIds ? [...params.cardPlayed.singerIds] : undefined,
    },
    effect: params.effect,
    continuation: params.continuation,
    resolutionInput: cloneActionResolutionInput(params.resolutionInput),
  };
}

export function enqueuePendingActionEffect(
  ctx: PlayCardExecutionContext,
  pendingEffect: PendingActionEffect,
): void {
  const pendingEffects = ctx.G.pendingEffects;
  const existingIndex = pendingEffects.findIndex((entry) => entry.id === pendingEffect.id);
  if (existingIndex >= 0) {
    pendingEffects.splice(existingIndex, 1);
  }
  pendingEffects.push(pendingEffect as (typeof pendingEffects)[number]);

  const priorityState = ctx.framework.state.ctx.priority as {
    pendingChoice?: {
      type: "action-effect";
      playerID: PlayerId;
      requestID: string;
    };
  };
  priorityState.pendingChoice = {
    type: "action-effect",
    playerID: pendingEffect.chooserId,
    requestID: pendingEffect.id,
  };

  traceLorcanaRuntimeStep({
    kind: "effect.pending.queued",
    moveId: "playCard",
    playerId: pendingEffect.chooserId,
    effectId: pendingEffect.id,
    cardId: pendingEffect.sourceCardId,
    cardName: getLorcanaCardName(pendingEffect.sourceCardId, (cardId) =>
      ctx.cards.getDefinition(cardId),
    ),
    message: "Action effect is queued for later resolution",
    payload: {
      pendingKind: pendingEffect.kind,
    },
  });
}

export function clearPendingActionChoice(ctx: PlayCardExecutionContext): void {
  const priorityState = ctx.framework.state.ctx.priority as {
    pendingChoice?: {
      type: "action-effect";
      playerID: PlayerId;
      requestID: string;
    };
  };
  priorityState.pendingChoice = undefined;
}

export function removePendingActionEffect(
  ctx: PlayCardExecutionContext,
  effectId: string,
): PendingActionEffect | undefined {
  const pendingEffects = ctx.G.pendingEffects ?? [];
  const matched = pendingEffects.find((effect) => effect.id === effectId);
  if (!matched) {
    return undefined;
  }

  ctx.G.pendingEffects = pendingEffects.filter((effect) => effect.id !== effectId);
  return matched;
}

export function hasPendingActionEffectResolution(ctx: {
  G: {
    pendingEffects?: readonly unknown[];
  };
  framework: {
    state: {
      ctx: {
        priority: {
          pendingChoice?: {
            type?: string;
          };
        };
      };
    };
  };
}): boolean {
  return (
    (ctx.G.pendingEffects?.length ?? 0) > 0 ||
    ctx.framework.state.ctx.priority.pendingChoice?.type === "action-effect"
  );
}

function getCardZoneKey(
  ctx: Pick<PendingActionEffectReadableContext, "framework">,
  cardId: CardInstanceId,
): string | undefined {
  return ctx.framework.state.ctx.zones.private.cardIndex[cardId]?.zoneKey;
}

export function moveSuspendedActionCardToLimbo(
  ctx: PendingActionEffectReadableContext,
  cardPlayed: CardPlayedPayload,
): void {
  if (cardPlayed.cardType !== "action") {
    return;
  }

  const zoneKey = getCardZoneKey(ctx, cardPlayed.cardId);
  if (typeof zoneKey !== "string" || (!zoneKey.startsWith("play") && zoneKey !== "play")) {
    return;
  }

  ctx.framework.zones.moveCard(cardPlayed.cardId, {
    zone: "limbo",
    playerId: cardPlayed.playerId,
  });
}

export function finalizeResolvedActionCard(
  ctx: PendingActionEffectReadableContext,
  cardPlayed: CardPlayedPayload,
): void {
  if (cardPlayed.cardType !== "action") {
    return;
  }

  const zoneKey = getCardZoneKey(ctx, cardPlayed.cardId);
  if (
    typeof zoneKey !== "string" ||
    (!zoneKey.startsWith("play") &&
      zoneKey !== "play" &&
      !zoneKey.startsWith("limbo") &&
      zoneKey !== "limbo")
  ) {
    return;
  }

  const zoneChangeEvent: Extract<ReplacementEvent, { kind: "zone-change" }> = {
    kind: "zone-change",
    eventId: `zone-change:${cardPlayed.cardId}`,
    sourceId: cardPlayed.cardId,
    controllerId: cardPlayed.playerId,
    cardId: cardPlayed.cardId,
    playerId: cardPlayed.playerId,
    fromZone: zoneKey.startsWith("limbo") ? "limbo" : "play",
    toZone: "discard",
  };
  const replacedEvent = applyReplacementEffects(
    ctx as unknown as Parameters<typeof applyReplacementEffects>[0],
    zoneChangeEvent,
  );

  ctx.framework.zones.moveCard(
    cardPlayed.cardId,
    {
      zone: replacedEvent.toZone,
      playerId: cardPlayed.playerId,
    },
    replacedEvent.toZone === "deck" && replacedEvent.position === "bottom"
      ? { index: 0 }
      : undefined,
  );
  ctx.cards.clearMeta(cardPlayed.cardId);
}

export function mergeActionResolutionInput(
  base: ActionResolutionInput,
  patch: ActionResolutionInput,
): ActionResolutionInput {
  return cloneActionResolutionInput({
    ...base,
    ...patch,
  });
}
