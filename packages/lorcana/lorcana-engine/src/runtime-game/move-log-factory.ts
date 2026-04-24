/**
 * Move Log Factory
 *
 * Converts the typed log entries emitted by move handlers (via ctx.framework.log())
 * into unified MoveLog entries. Each move handler still calls ctx.framework.log()
 * with a LorcanaGameLogEntry — this module converts those to the new MoveLog format.
 *
 * System events (TURN_STARTED, GAME_ENDED) are also converted here.
 */

import type { CardInstanceId, PlayerId, PublishedGameEvent } from "#core";
import type { LorcanaGameLogEntry, ScryDestinationEntry } from "../types/log-messages";
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
    // Fallback: try to build from moveId alone for simple moves
    return buildFromMoveId(moveId, playerId, timestamp, outcomes);
  }

  const moveLog = convertProjectedEntry(actionEntry, timestamp, outcomes);
  // Use the authoritative MOVE_EXECUTED playerId as fallback
  if (moveLog && (!moveLog.playerId || moveLog.playerId === ("" as PlayerId))) {
    return { ...moveLog, playerId };
  }
  return moveLog;
}

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
  const v = entry.values as Record<string, unknown>;
  const playerId = (v.playerId ?? "") as PlayerId;

  switch (t) {
    // ── Simple moves ────────────────────────────────────────
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
        { kind: "targetSelection", targets: (v.targets as Array<CardInstanceId | PlayerId>) ?? [] },
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

    default:
      return undefined;
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
          return buildResolveEffectLog(
            {
              kind: "scrySelection",
              count: (values.count as number) ?? 0,
              detail: privateField(destinations, [chooserId]),
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

function buildResolveBagLog(
  status: ResolveBagLog["status"],
  v: Record<string, unknown>,
  timestamp: number,
  outcomes?: MoveOutcomes,
): ResolveBagLog {
  const targets = v.targets as Array<CardInstanceId | PlayerId> | undefined;
  const resolution: BagResolution | undefined = targets
    ? { kind: "targets", targets }
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
