/**
 * Move Log Factory
 *
 * Converts the typed log entries emitted by move handlers (via ctx.framework.log())
 * into unified MoveLog entries. Each move handler still calls ctx.framework.log()
 * with a LorcanaGameLogEntry — this module converts those to the new MoveLog format.
 *
 * System events (TURN_STARTED, GAME_ENDED) are also converted here.
 */

import type { CardInstanceId, LogValue, PlayerId, PublishedGameEvent } from "#core";
import type {
  ActionLogMessageKey,
  LorcanaGameLogEntry,
  ScryDestinationEntry,
} from "../types/log-messages";
import type { ProjectedLogEntry } from "../core/runtime/match-runtime.types";
import { privateField } from "../core/runtime/private-field";
import type {
  MoveLog,
  MoveOutcomes,
  ResolveBagLog,
  ResolveEffectLog,
  EffectResolution,
  BagResolution,
} from "../types/move-log";

/**
 * Build a MoveLog from the move's typed log entries + accumulated outcomes.
 * Returns undefined if the entries can't be converted (should not happen for migrated moves).
 */
export function buildMoveLog(
  moveLogEntries: readonly ProjectedLogEntry[],
  moveId: string,
  playerId: PlayerId,
  timestamp: number,
  outcomes?: MoveOutcomes,
): MoveLog | undefined {
  // Find the primary action entry (the one from ctx.framework.log() in the move handler)
  const actionEntry = moveLogEntries.find(
    (e) => e.typedEntry?.category === "action" && e.typedEntry?.type.startsWith("lorcana."),
  );

  if (!actionEntry?.typedEntry) {
    const lookAtInkwellEntry = moveLogEntries.find(
      (entry) =>
        entry.typedEntry?.type === "lorcana.effect.lookAtInkwell" ||
        entry.typedEntry?.type === "lorcana.effect.lookAtInkwell.detail",
    );
    if (lookAtInkwellEntry?.typedEntry) {
      return convertProjectedEntry(lookAtInkwellEntry, timestamp, outcomes);
    }

    // Fallback: try to build from moveId alone for simple moves
    return buildFromMoveId(moveId, playerId, timestamp, outcomes);
  }

  const moveLog = convertProjectedEntry(actionEntry, timestamp, outcomes);
  const lookedAtInkwell = extractLookAtInkwellDetail(moveLogEntries);
  if (moveLog?.type === "resolveBag" && lookedAtInkwell) {
    return { ...moveLog, lookedAtInkwell };
  }

  // Use the authoritative MOVE_EXECUTED playerId as fallback
  if (moveLog && (!moveLog.playerId || moveLog.playerId === ("" as PlayerId))) {
    return { ...moveLog, playerId };
  }
  return moveLog;
}

function extractLookAtInkwellDetail(
  moveLogEntries: readonly ProjectedLogEntry[],
): ResolveBagLog["lookedAtInkwell"] | undefined {
  const entry = moveLogEntries.find(isLookAtInkwellProjectedEntry);
  if (!entry) {
    return undefined;
  }

  const values = entry.typedEntry.values;
  const count = values.count;

  if (entry.visibility.mode === "PUBLIC_WITH_OVERRIDES") {
    for (const [viewerId, override] of Object.entries(entry.visibility.overrides)) {
      if (override.key === "lorcana.effect.lookAtInkwell.detail") {
        const detailValues = override.values;
        const cardIds = getLogCardInstanceIds(detailValues.cardIds);
        return {
          count: getLogCount(detailValues.count, count),
          cardIds: privateField(cardIds, [viewerId]),
        };
      }
    }
  }

  if (entry.typedEntry.type === "lorcana.effect.lookAtInkwell.detail") {
    const detailValues = entry.typedEntry.values;
    return {
      count: detailValues.cardIds.length,
      cardIds: privateField(detailValues.cardIds, [detailValues.playerId]),
    };
  }

  return {
    count,
  };
}

type LookAtInkwellProjectedEntry = ProjectedLogEntry & {
  typedEntry: Extract<
    LorcanaGameLogEntry,
    { type: "lorcana.effect.lookAtInkwell" | "lorcana.effect.lookAtInkwell.detail" }
  >;
};

function isLookAtInkwellProjectedEntry(
  entry: ProjectedLogEntry,
): entry is LookAtInkwellProjectedEntry {
  return (
    entry.typedEntry?.type === "lorcana.effect.lookAtInkwell" ||
    entry.typedEntry?.type === "lorcana.effect.lookAtInkwell.detail"
  );
}

function getLogCardInstanceIds(value: LogValue | undefined): CardInstanceId[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((cardId): cardId is CardInstanceId => typeof cardId === "string");
}

function getLogCount(value: LogValue | undefined, fallback: number): number {
  return typeof value === "number" ? value : fallback;
}

function convertLookAtInkwellProjectedEntry(
  actionEntry: ProjectedLogEntry,
  timestamp: number,
): MoveLog | undefined {
  if (!isLookAtInkwellProjectedEntry(actionEntry)) {
    return undefined;
  }

  const values = actionEntry.typedEntry.values;
  const playerId = values.playerId;

  if (actionEntry.visibility.mode === "PUBLIC_WITH_OVERRIDES") {
    for (const [viewerId, override] of Object.entries(actionEntry.visibility.overrides)) {
      if (override.key === "lorcana.effect.lookAtInkwell.detail") {
        const detailValues = override.values;
        const cardIds = getLogCardInstanceIds(detailValues.cardIds);
        return {
          type: "lookAtInkwell",
          playerId,
          timestamp,
          count: getLogCount(detailValues.count, values.count),
          cardIds: privateField(cardIds, [viewerId]),
        };
      }
    }
  }

  if (actionEntry.typedEntry.type === "lorcana.effect.lookAtInkwell.detail") {
    const detailValues = actionEntry.typedEntry.values;
    return {
      type: "lookAtInkwell",
      playerId,
      timestamp,
      count: detailValues.cardIds.length,
      cardIds: privateField(detailValues.cardIds, [playerId]),
    };
  }

  return {
    type: "lookAtInkwell",
    playerId,
    timestamp,
    count: values.count,
  };
}

// =============================================================================
// Action key guard — drives exhaustiveness in convertProjectedEntry
// =============================================================================

/**
 * Every ActionLogMessageKey must appear here. satisfies Record<ActionLogMessageKey, true>
 * enforces completeness at compile time: TypeScript errors if any member of
 * ActionLogMessageKey is missing from this object.
 */
const ACTION_LOG_MESSAGE_KEYS = {
  "lorcana.setup.firstPlayerChosen": true,
  "lorcana.setup.mulligan.count": true,
  "lorcana.ability.activated": true,
  "lorcana.ability.activated.named": true,
  "lorcana.ability.activated.named.discardCost": true,
  "lorcana.ability.activated.discardCost": true,
  "lorcana.card.inked": true,
  "lorcana.effect.lookAtInkwell": true,
  "lorcana.effect.lookAtInkwell.detail": true,
  "lorcana.move.playCard": true,
  "lorcana.move.playCard.shift": true,
  "lorcana.move.playCard.sing": true,
  "lorcana.move.quest": true,
  "lorcana.move.questWithAll": true,
  "lorcana.move.challenge": true,
  "lorcana.move.moveCharacterToLocation": true,
  "lorcana.move.passTurn": true,
  "lorcana.move.concede": true,
  "lorcana.move.forfeitGame": true,
  "lorcana.system.turnSkipped": true,
  "lorcana.system.playerDropped": true,
  "lorcana.bag.resolve.completed": true,
  "lorcana.bag.resolve.completed.named": true,
  "lorcana.bag.resolve.completed.targets": true,
  "lorcana.bag.resolve.completed.targets.named": true,
  "lorcana.bag.resolve.skipped": true,
  "lorcana.bag.resolve.skipped.named": true,
  "lorcana.bag.resolve.pending": true,
  "lorcana.bag.resolve.pending.named": true,
  "lorcana.bag.resolve.pending.named.targets": true,
  "lorcana.bag.resolve.cancelled": true,
  "lorcana.bag.resolve.cancelled.named": true,
  "lorcana.effect.cancelled": true,
  "lorcana.effect.resolve.discardChoice": true,
  "lorcana.effect.resolve.targetSelection": true,
  "lorcana.effect.resolve.choiceSelection": true,
  "lorcana.effect.resolve.choiceSelection.withReveal": true,
  "lorcana.effect.resolve.optionalSelection.accepted": true,
  "lorcana.effect.resolve.optionalSelection.accepted.targets": true,
  "lorcana.effect.resolve.optionalSelection.accepted.targets.named": true,
  "lorcana.effect.resolve.optionalSelection.rejected": true,
  "lorcana.effect.resolve.nameCardSelection": true,
  "lorcana.effect.resolve.scrySelection": true,
  "lorcana.effect.resolve.scrySelection.detail": true,
  "lorcana.effect.resolve.revealTopCard": true,
  "lorcana.effect.resolve.revealTopCard.autoBottom": true,
} as const satisfies Record<ActionLogMessageKey, true>;

function isActionLogMessageKey(key: string): key is ActionLogMessageKey {
  return Object.hasOwn(ACTION_LOG_MESSAGE_KEYS, key);
}

function assertNever(key: never): never {
  throw new Error(`Unhandled ActionLogMessageKey: ${String(key)}`);
}

// =============================================================================

/**
 * Build a MoveLog from a system event (TURN_STARTED, GAME_ENDED).
 */
export function buildSystemMoveLog(event: PublishedGameEvent): MoveLog | undefined {
  const ge = event.event;

  if (ge.kind === "TURN_STARTED") {
    const activePlayer = (ge.playerId ?? "") as PlayerId;
    return {
      type: "turnStart",
      playerId: activePlayer,
      timestamp: event.timestamp,
      turn: ge.turn,
      activePlayerId: activePlayer,
    };
  }

  if (ge.kind === "GAME_ENDED") {
    const winnerId = ge.winner ? (ge.winner as PlayerId) : undefined;
    return {
      type: "gameEnd",
      playerId: winnerId ?? ("" as PlayerId),
      timestamp: event.timestamp,
      winnerId,
      reason: ge.reason,
    };
  }

  return undefined;
}

function buildFromMoveId(
  moveId: string,
  playerId: PlayerId,
  timestamp: number,
  outcomes?: MoveOutcomes,
): MoveLog | undefined {
  switch (moveId) {
    case "passTurn":
      return { type: "passTurn", playerId, timestamp };
    case "concede":
      return { type: "concede", playerId, timestamp };
    case "forfeitGame":
      return {
        type: "forfeitGame",
        playerId,
        timestamp,
        winnerId: playerId as PlayerId,
        reason: "",
      };
    default:
      return undefined;
  }
}

function convertProjectedEntry(
  actionEntry: ProjectedLogEntry,
  timestamp: number,
  outcomes?: MoveOutcomes,
): MoveLog | undefined {
  const entry = actionEntry.typedEntry;
  if (!entry) {
    return undefined;
  }
  const t = entry.type;
  if (!isActionLogMessageKey(t)) return undefined;
  const v = entry.values as Record<string, unknown>;
  const playerId = (v.playerId ?? "") as PlayerId;

  switch (t) {
    // ── Simple moves ────────────────────────────────────────
    case "lorcana.effect.lookAtInkwell":
    case "lorcana.effect.lookAtInkwell.detail":
      return convertLookAtInkwellProjectedEntry(actionEntry, timestamp);

    case "lorcana.move.passTurn":
      return { type: "passTurn", playerId, timestamp };

    case "lorcana.move.concede":
      return { type: "concede", playerId, timestamp };

    case "lorcana.move.forfeitGame":
      return {
        type: "forfeitGame",
        playerId: (v.winnerId ?? playerId) as PlayerId,
        timestamp,
        winnerId: v.winnerId as PlayerId,
        reason: (v.reason as string) ?? "",
      };

    case "lorcana.card.inked":
      return {
        type: "inkCard",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        cardName: v.cardName as string | undefined,
      };

    case "lorcana.move.quest":
      return {
        type: "quest",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        loreGained: (v.loreGained as number) ?? 0,
        outcomes,
      };

    case "lorcana.move.questWithAll":
      return {
        type: "questWithAll",
        playerId,
        timestamp,
        cardIds: (v.cardIds as CardInstanceId[]) ?? [],
        totalLore: (v.loreGained as number) ?? 0,
        outcomes,
      };

    case "lorcana.move.moveCharacterToLocation":
      return {
        type: "moveToLocation",
        playerId,
        timestamp,
        characterId: v.characterId as CardInstanceId,
        locationId: v.locationId as CardInstanceId,
      };

    case "lorcana.move.challenge": {
      const attackerId = v.attackerId as CardInstanceId;
      const defenderId = v.defenderId as CardInstanceId;

      // Extract combat damage from outcomes
      const damage = { attacker: 0, defender: 0 };
      const banished: CardInstanceId[] = [];
      if (outcomes?.damageDealt) {
        for (const d of outcomes.damageDealt) {
          if (d.kind === "combat") {
            if (d.sourceId === attackerId) {
              damage.attacker = d.amount;
            } else {
              damage.defender = d.amount;
            }
          }
        }
      }
      if (outcomes?.cardsBanished) {
        banished.push(...outcomes.cardsBanished);
      }

      return {
        type: "challenge",
        playerId,
        timestamp,
        attackerId,
        defenderId,
        damage,
        banished,
        outcomes,
      };
    }

    // ── PlayCard variants ─────────────────────────────────
    case "lorcana.move.playCard":
      return {
        type: "playCard",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        outcomes,
      };

    case "lorcana.move.playCard.shift":
      return {
        type: "shiftCard",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        shiftTargetId: v.shiftTargetId as CardInstanceId,
        ...(typeof v.shiftTargetName === "string" && v.shiftTargetName.length > 0
          ? { shiftTargetName: v.shiftTargetName }
          : {}),
        outcomes,
      };

    case "lorcana.move.playCard.sing":
      return {
        type: "singCard",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        singerIds: (v.singerIds as CardInstanceId[]) ?? [],
        outcomes,
      };

    // ── Ability activation ────────────────────────────────
    case "lorcana.ability.activated":
      return {
        type: "activateAbility",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        outcomes,
      };

    case "lorcana.ability.activated.named":
      return {
        type: "activateAbility",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        abilityName: v.abilityName as string,
        outcomes,
      };

    case "lorcana.ability.activated.named.discardCost":
      return {
        type: "activateAbility",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        abilityName: v.abilityName as string,
        discardCardIds: (v.discardCardIds as CardInstanceId[]) ?? [],
        outcomes,
      };

    case "lorcana.ability.activated.discardCost":
      return {
        type: "activateAbility",
        playerId,
        timestamp,
        cardId: v.cardId as CardInstanceId,
        discardCardIds: (v.discardCardIds as CardInstanceId[]) ?? [],
        outcomes,
      };

    // ── Setup ─────────────────────────────────────────────
    case "lorcana.setup.firstPlayerChosen":
      return {
        type: "chooseFirstPlayer",
        playerId: (v.chooser ?? v.playerId) as PlayerId,
        timestamp,
        chosenPlayerId: v.chosen as PlayerId,
      };

    case "lorcana.setup.mulligan.count":
      return buildAlterHandMoveLog(actionEntry, playerId, timestamp, v);

    // ── Bag resolution ────────────────────────────────────
    case "lorcana.bag.resolve.completed":
    case "lorcana.bag.resolve.completed.named":
    case "lorcana.bag.resolve.completed.targets":
    case "lorcana.bag.resolve.completed.targets.named":
      return buildResolveBagLog("completed", v, timestamp, outcomes);

    case "lorcana.bag.resolve.skipped":
    case "lorcana.bag.resolve.skipped.named":
      return buildResolveBagLog("skipped", v, timestamp, outcomes);

    case "lorcana.bag.resolve.pending":
    case "lorcana.bag.resolve.pending.named":
    case "lorcana.bag.resolve.pending.named.targets":
      return buildResolveBagLog("pending", v, timestamp, outcomes);

    case "lorcana.bag.resolve.cancelled":
    case "lorcana.bag.resolve.cancelled.named":
      return buildResolveBagLog("cancelled", v, timestamp, outcomes);

    // ── Effect resolution ─────────────────────────────────
    case "lorcana.effect.resolve.targetSelection":
      return buildResolveEffectLog(
        {
          kind: "targetSelection",
          targets: (v.targets as Array<CardInstanceId | PlayerId>) ?? [],
          effectType: typeof v.effectType === "string" ? v.effectType : undefined,
        },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.discardChoice":
      return buildResolveEffectLog(
        { kind: "discardChoice", discarded: (v.targets as Array<CardInstanceId | PlayerId>) ?? [] },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.choiceSelection":
      return buildResolveEffectLog(
        {
          kind: "choiceSelection",
          choiceIndex: (v.choiceIndex as number) ?? 0,
          revealedCardId: v.revealedCardId as CardInstanceId | undefined,
        },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.choiceSelection.withReveal":
      return buildResolveEffectLog(
        {
          kind: "choiceSelection",
          choiceIndex: (v.choiceIndex as number) ?? 0,
          revealedCardId: v.revealedCardId as CardInstanceId | undefined,
        },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.optionalSelection.accepted":
      return buildResolveEffectLog(
        { kind: "optionalSelection", accepted: true },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.optionalSelection.accepted.targets":
      return buildResolveEffectLog(
        {
          kind: "optionalSelection",
          accepted: true,
          targets: (v.targets as Array<CardInstanceId | PlayerId>) ?? [],
        },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.optionalSelection.accepted.targets.named":
      return buildResolveEffectLog(
        {
          kind: "optionalSelection",
          accepted: true,
          targets: (v.targets as Array<CardInstanceId | PlayerId>) ?? [],
          abilityName: typeof v.abilityName === "string" ? v.abilityName : undefined,
        },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.optionalSelection.rejected":
      return buildResolveEffectLog(
        { kind: "optionalSelection", accepted: false },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.nameCardSelection":
      return buildResolveEffectLog(
        { kind: "nameCardSelection", namedCard: (v.namedCard as string) ?? "" },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.resolve.scrySelection":
    case "lorcana.effect.resolve.scrySelection.detail":
      return buildResolveScryEffectLog(actionEntry, v, timestamp, outcomes);

    case "lorcana.effect.resolve.revealTopCard":
    case "lorcana.effect.resolve.revealTopCard.autoBottom":
      return buildResolveEffectLog(
        {
          kind: "revealTopCard",
          targetPlayerId: (v.targetPlayerId ?? v.playerId) as PlayerId,
          cardId: v.revealedCardId as CardInstanceId,
          destination: "bottom",
        },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.effect.cancelled":
      return buildResolveEffectLog(
        { kind: "cancelled", cause: (v.cause as string) ?? "no-valid-targets" },
        v,
        timestamp,
        outcomes,
      );

    case "lorcana.system.turnSkipped":
      return {
        type: "turnSkipped",
        playerId: (v.skipperPlayerId ?? playerId) as PlayerId,
        timestamp,
        skipperPlayerId: v.skipperPlayerId as PlayerId,
        stallerPlayerId: v.stallerPlayerId as PlayerId,
      };

    case "lorcana.system.playerDropped":
      return {
        type: "playerDropped",
        playerId: (v.dropperPlayerId ?? playerId) as PlayerId,
        timestamp,
        dropperPlayerId: v.dropperPlayerId as PlayerId,
        droppedPlayerId: v.droppedPlayerId as PlayerId,
        reason: (v.reason as string) ?? "",
      };

    default:
      return assertNever(t);
  }
}

function buildResolveScryEffectLog(
  actionEntry: ProjectedLogEntry,
  values: Record<string, unknown>,
  timestamp: number,
  outcomes?: MoveOutcomes,
): ResolveEffectLog {
  const visibility = actionEntry.visibility;

  if (visibility.mode === "PUBLIC_WITH_OVERRIDES") {
    // The chooser's override message carries the full destination detail.
    // Find the chooser by looking for the override keyed to the detail message.
    for (const [chooserId, override] of Object.entries(visibility.overrides)) {
      if (override.key === "lorcana.effect.resolve.scrySelection.detail") {
        const detailValues = override.values as Record<string, unknown>;
        const destinations = Array.isArray(detailValues.destinations)
          ? (detailValues.destinations as ScryDestinationEntry[])
          : undefined;
        if (destinations) {
          const publicRevealed = destinations.filter((d) => d.revealed === true);
          return buildResolveEffectLog(
            {
              kind: "scrySelection",
              count: (values.count as number) ?? 0,
              detail: privateField(destinations, [chooserId]),
              ...(publicRevealed.length > 0 ? { publicRevealed } : {}),
            },
            values,
            timestamp,
            outcomes,
          );
        }
        break;
      }
    }
  }

  return buildResolveEffectLog(
    { kind: "scrySelection", count: (values.count as number) ?? 0 },
    values,
    timestamp,
    outcomes,
  );
}

function buildAlterHandMoveLog(
  actionEntry: ProjectedLogEntry,
  playerId: PlayerId,
  timestamp: number,
  values: Record<string, unknown>,
): MoveLog {
  const count = (values.count as number) ?? 0;
  const visibility = actionEntry.visibility;

  if (visibility.mode !== "PUBLIC_WITH_OVERRIDES") {
    return {
      type: "alterHand",
      playerId,
      timestamp,
      count,
    };
  }

  const override = visibility.overrides[playerId];
  if (!override || override.key !== "lorcana.setup.mulligan.detail") {
    return {
      type: "alterHand",
      playerId,
      timestamp,
      count,
    };
  }

  const detailValues = override.values as Record<string, unknown>;
  const mulliganed = Array.isArray(detailValues.mulliganed)
    ? privateField(detailValues.mulliganed as CardInstanceId[], [playerId])
    : undefined;
  const drawn = Array.isArray(detailValues.drawn)
    ? privateField(detailValues.drawn as CardInstanceId[], [playerId])
    : undefined;

  return {
    type: "alterHand",
    playerId,
    timestamp,
    count,
    mulliganed,
    drawn,
  };
}

/**
 * If outcomes.cardsInked contains entries with PrivateField-wrapped cardIds,
 * return the single owner those cardIds are visible to. Returns undefined
 * when no private inked entries exist (so resolveBag targets stay public).
 */
function getPrivateCardsInkedOwner(outcomes?: MoveOutcomes): PlayerId | undefined {
  const entries = outcomes?.cardsInked;
  if (!entries) return undefined;
  for (const entry of entries) {
    const cardId = entry.cardId as
      | CardInstanceId
      | { __private: true; value: CardInstanceId; visibleTo: string[] };
    if (
      typeof cardId === "object" &&
      cardId !== null &&
      "__private" in cardId &&
      cardId.__private === true &&
      Array.isArray(cardId.visibleTo) &&
      cardId.visibleTo.length === 1
    ) {
      return cardId.visibleTo[0] as PlayerId;
    }
  }
  return undefined;
}

function buildResolveBagLog(
  status: ResolveBagLog["status"],
  v: Record<string, unknown>,
  timestamp: number,
  outcomes?: MoveOutcomes,
): ResolveBagLog {
  const targets = v.targets as Array<CardInstanceId | PlayerId> | undefined;
  // If the resolution inked a card from a private zone (cardsInked entry has
  // its cardId wrapped as PrivateField), the targets array refers to those
  // same private cards — wrap targets so non-owner viewers see `undefined`
  // and the formatter renders without naming the target.
  const ownerOnlyViewer = getPrivateCardsInkedOwner(outcomes);
  const playerId = (v.playerId ?? "") as PlayerId;
  const visibleTo = ownerOnlyViewer ?? playerId;
  const resolvedTargets = targets && ownerOnlyViewer ? privateField(targets, [visibleTo]) : targets;
  const resolution: BagResolution | undefined = targets
    ? { kind: "targets", targets: resolvedTargets! }
    : status === "completed"
      ? { kind: "noInput" }
      : undefined;

  return {
    type: "resolveBag",
    playerId: (v.playerId ?? "") as PlayerId,
    timestamp,
    sourceCardId: (v.sourceId ?? "") as CardInstanceId,
    abilityName: v.abilityName as string | undefined,
    status,
    cancelReason: v.cause as ResolveBagLog["cancelReason"],
    resolution,
    outcomes,
  };
}

function buildResolveEffectLog(
  resolution: EffectResolution,
  v: Record<string, unknown>,
  timestamp: number,
  outcomes?: MoveOutcomes,
): ResolveEffectLog {
  return {
    type: "resolveEffect",
    playerId: (v.playerId ?? "") as PlayerId,
    timestamp,
    sourceCardId: (v.sourceCardId ?? "") as CardInstanceId,
    resolution,
    outcomes,
  };
}
