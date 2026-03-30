import {
  type CardInstanceId,
  type LorcanaLogMessage,
  type LorcanaLogMessageKey,
  type LorcanaLogMessageMap,
  type MoveLog,
  type MoveOutcomes,
  type PlayerId,
} from "@tcg/lorcana-engine";
import { getLorcanaLogTemplate, type LorcanaLogLocale } from "@tcg/lorcana-engine/i18n";
import { m } from "$lib/i18n/messages.js";
import { getLocale } from "$lib/paraglide/runtime.js";
import type {
  LorcanaPlayerSide,
  LorcanaSimulatorLocale,
  MoveLogEntrySnapshot,
  SimulatorSerializedValue,
} from "@/features/simulator/model/contracts.js";
import { getScryZoneLabel } from "@/features/simulator/model/scry-destinations.js";

export type EventLogPlayerTone = "self" | "opponent" | "playerOne" | "playerTwo" | "system";
export type EventLogMarkerId =
  | "setup"
  | "ability"
  | "ink"
  | "scry"
  | "play"
  | "challenge"
  | "quest"
  | "move"
  | "pass"
  | "turn";

export type EventLogSegment =
  | { kind: "text"; text: string }
  | { kind: "card"; cardId: string; fallbackLabel?: string; fallbackInkType?: string[] }
  | { kind: "player"; text: string; tone: EventLogPlayerTone }
  | { kind: "stat"; text: string }
  | { kind: "icon"; icon: "inkable"; label: string };

export type EventLogBody = {
  marker: EventLogMarkerId;
  segments: EventLogSegment[];
  source: "typed" | "fallback";
  text: string;
};

/**
 * Optional resolver used to populate `fallbackLabel` on card segments at format time and
 * to inject the inkable icon for `lorcana.card.inked` entries.
 * Needed for non-interactive contexts (spectator, devtools) where CardLogToken is not rendered.
 * In the interactive simulator, CardLogToken does live lookup instead.
 */
export type CardReferenceResolver = (
  cardId: string,
) => { label?: string; inkable?: boolean } | null;

const ENGINE_LOG_LOCALE_BY_SIMULATOR_LOCALE: Record<LorcanaSimulatorLocale, LorcanaLogLocale> = {
  en: "en",
  es: "es",
  de: "de",
  it: "it",
  "pt-br": "pt-br",
};

/** Maps new MoveLog.type values to UI markers */
const MOVE_LOG_TYPE_TO_MARKER: Record<string, EventLogMarkerId> = {
  playCard: "play",
  shiftCard: "play",
  singCard: "play",
  challenge: "challenge",
  quest: "quest",
  questWithAll: "quest",
  inkCard: "ink",
  activateAbility: "ability",
  moveToLocation: "move",
  passTurn: "pass",
  concede: "pass",
  alterHand: "setup",
  chooseFirstPlayer: "setup",
  resolveBag: "ability",
  resolveEffect: "ability",
  turnStart: "turn",
  gameEnd: "turn",
};

const MARKER_BY_LOG_KEY: Record<LorcanaLogMessageKey, EventLogMarkerId> = {
  "lorcana.setup.firstPlayerChosen": "setup",
  "lorcana.setup.mulligan.count": "setup",
  "lorcana.setup.mulligan.detail": "setup",
  "lorcana.setup.done": "setup",
  "lorcana.ability.activated": "ability",
  "lorcana.ability.activated.named": "ability",
  "lorcana.card.inked": "ink",
  "lorcana.scry.count": "scry",
  "lorcana.scry.detail": "scry",
  "lorcana.move.playCard": "play",
  "lorcana.move.quest": "quest",
  "lorcana.move.questWithAll": "quest",
  "lorcana.move.challenge": "challenge",
  "lorcana.move.moveCharacterToLocation": "move",
  "lorcana.move.passTurn": "pass",
  "lorcana.move.concede": "pass",
  "lorcana.bag.resolve.completed": "ability",
  "lorcana.bag.resolve.completed.named": "ability",
  "lorcana.bag.resolve.completed.targets": "ability",
  "lorcana.bag.resolve.completed.targets.named": "ability",
  "lorcana.bag.resolve.skipped": "ability",
  "lorcana.bag.resolve.skipped.named": "ability",
  "lorcana.bag.resolve.pending": "ability",
  "lorcana.bag.resolve.pending.named": "ability",
  "lorcana.effect.resolve.discardChoice": "ability",
  "lorcana.effect.resolve.targetSelection": "ability",
  "lorcana.effect.resolve.choiceSelection": "ability",
  "lorcana.effect.resolve.optionalSelection.accepted": "ability",
  "lorcana.effect.resolve.optionalSelection.rejected": "ability",
  "lorcana.effect.resolve.nameCardSelection": "ability",
  "lorcana.effect.resolve.scrySelection": "ability",
  "lorcana.effect.resolve.scrySelection.detail": "ability",
  "lorcana.effect.resolve.revealTopCard": "ability",
  "lorcana.effect.resolve.revealTopCard.autoBottom": "ability",
  "lorcana.effect.resolve.choiceSelection.withReveal": "ability",
  "lorcana.bag.resolve.cancelled": "ability",
  "lorcana.bag.resolve.cancelled.named": "ability",
  "lorcana.effect.cancelled": "ability",
  "lorcana.outcome.combatDamage": "challenge",
  "lorcana.outcome.effectDamage": "challenge",
  "lorcana.outcome.cardBanished": "challenge",
  "lorcana.outcome.cardsDrawn": "ability",
  "lorcana.outcome.cardsDrawn.detail": "ability",
  "lorcana.outcome.cardReturnedToHand": "ability",
  "lorcana.outcome.loreGained": "quest",
  "lorcana.outcome.loreLost": "quest",
  "lorcana.outcome.cardExerted": "ability",
  "lorcana.outcome.cardReadied": "ability",
  "lorcana.outcome.cardsMilled": "ability",
  "lorcana.move.playCard.shift": "play",
  "lorcana.move.playCard.sing": "play",
};

const PLAYER_VALUE_KEYS = new Set([
  "chooser",
  "chosen",
  "newPlayer",
  "playerId",
  "previousPlayer",
  "targetPlayerId",
]);
const CARD_VALUE_KEYS = new Set([
  "attackerId",
  "cardId",
  "characterId",
  "defenderId",
  "locationId",
  "revealedCardId",
  "sourceCardId",
  "sourceId",
  "shiftTargetId",
  "targetId",
]);
const CARD_LIST_VALUE_KEYS = new Set(["cardIds", "drawn", "lookedAt", "mulliganed", "singerIds"]);
const TARGET_VALUE_KEYS = new Set(["targets"]);
const STAT_VALUE_KEYS = new Set([
  "amount",
  "attackerDamage",
  "choiceIndex",
  "count",
  "defenderDamage",
  "inkPaid",
  "loreGained",
]);

// =============================================================================
// Public API
// =============================================================================

export function formatEventLogBody(
  entry: MoveLogEntrySnapshot,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
  resolveCard?: CardReferenceResolver,
): EventLogBody {
  if (!entry.typedLogEntry) {
    return {
      marker: "move",
      segments: [{ kind: "text", text: entry.title || entry.moveId }],
      source: "fallback",
      text: entry.title || entry.moveId,
    };
  }

  const typed = entry.typedLogEntry;
  const typedRaw = typed as Record<string, unknown>;

  // MoveLog entries have flat fields instead of nested { type, values }.
  // Detect by checking for the .values property.
  if (!("values" in typedRaw) || typedRaw.values === undefined) {
    const moveLog = typed as MoveLog;
    const moveType = String(moveLog.type ?? "move");
    const marker = MOVE_LOG_TYPE_TO_MARKER[moveType] ?? "move";
    let segments = renderFlatMoveLog(entry, moveLog, viewerSide, locale, resolveCard);

    if (resolveCard) {
      segments = segments.map((segment) =>
        segment.kind === "card"
          ? {
              ...segment,
              fallbackLabel: resolveCard(segment.cardId)?.label ?? segment.fallbackLabel,
            }
          : segment,
      );
    }

    const text = segments.length > 0 ? flattenEventLogSegments(segments) : entry.title || moveType;
    return {
      marker,
      segments: segments.length > 0 ? segments : [{ kind: "text", text }],
      source: "typed",
      text,
    };
  }

  const typedMessageEntry = typed as Extract<typeof typed, { values: unknown }>;
  const message = {
    key: typedMessageEntry.type,
    values: typedMessageEntry.values,
  } as LorcanaLogMessage;
  let segments = renderTypedLogMessage(entry, message, viewerSide, locale, resolveCard);

  if (resolveCard) {
    segments = segments.map((s) =>
      s.kind === "card"
        ? { ...s, fallbackLabel: resolveCard(s.cardId)?.label ?? s.fallbackLabel }
        : s,
    );
  }

  return {
    marker: MARKER_BY_LOG_KEY[typedMessageEntry.type],
    segments,
    source: "typed",
    text: flattenEventLogSegments(segments),
  };
}

function renderFlatMoveLog(
  entry: MoveLogEntrySnapshot,
  moveLog: MoveLog,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
  resolveCard?: CardReferenceResolver,
): EventLogSegment[] {
  const messages = buildMessagesFromMoveLog(moveLog);
  if (messages.length > 0) {
    return joinSegments(
      messages.map((message) =>
        renderTypedLogMessage(entry, message, viewerSide, locale, resolveCard),
      ),
      " ",
    );
  }

  switch (moveLog.type) {
    case "turnStart":
      return [
        { kind: "text", text: "Turn " },
        { kind: "stat", text: String(moveLog.turn) },
        { kind: "text", text: " started." },
      ];
    case "gameEnd": {
      const segments: EventLogSegment[] = [{ kind: "text", text: "Game ended" }];
      if (moveLog.winnerId) {
        segments.push({ kind: "text", text: ". Winner: " });
        segments.push(playerSegmentForPlayerId(entry, moveLog.winnerId, viewerSide, locale));
      }
      segments.push({ kind: "text", text: "." });
      return segments;
    }
    default:
      return entry.title ? [{ kind: "text", text: entry.title }] : [];
  }
}

function buildMessagesFromMoveLog(moveLog: MoveLog): LorcanaLogMessage[] {
  const messages: LorcanaLogMessage[] = [];

  switch (moveLog.type) {
    case "playCard":
      messages.push(
        createLogMessage("lorcana.move.playCard", {
          playerId: moveLog.playerId,
          cardId: moveLog.cardId,
        }),
      );
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "shiftCard":
      messages.push(
        createLogMessage("lorcana.move.playCard.shift", {
          playerId: moveLog.playerId,
          cardId: moveLog.cardId,
          shiftTargetId: moveLog.shiftTargetId,
        }),
      );
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "singCard":
      messages.push(
        createLogMessage("lorcana.move.playCard.sing", {
          playerId: moveLog.playerId,
          cardId: moveLog.cardId,
          singerIds: moveLog.singerIds,
        }),
      );
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "challenge":
      messages.push(
        createLogMessage("lorcana.move.challenge", {
          playerId: moveLog.playerId,
          attackerId: moveLog.attackerId,
          defenderId: moveLog.defenderId,
        }),
      );
      if (moveLog.damage.attacker > 0 || moveLog.damage.defender > 0) {
        messages.push(
          createLogMessage("lorcana.outcome.combatDamage", {
            playerId: moveLog.playerId,
            attackerId: moveLog.attackerId,
            defenderId: moveLog.defenderId,
            attackerDamage: moveLog.damage.attacker,
            defenderDamage: moveLog.damage.defender,
          }),
        );
      }
      for (const cardId of moveLog.banished) {
        messages.push(
          createLogMessage("lorcana.outcome.cardBanished", {
            playerId: moveLog.playerId,
            cardId,
          }),
        );
      }
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes, {
        skipCombatDamage: true,
        skipBanished: true,
      });
      break;
    case "quest":
      messages.push(
        createLogMessage("lorcana.move.quest", {
          playerId: moveLog.playerId,
          cardId: moveLog.cardId,
          loreGained: moveLog.loreGained,
        }),
      );
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "questWithAll":
      messages.push(
        createLogMessage("lorcana.move.questWithAll", {
          playerId: moveLog.playerId,
          cardIds: moveLog.cardIds,
          loreGained: moveLog.totalLore,
          count: moveLog.cardIds.length,
        }),
      );
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "inkCard":
      messages.push(
        createLogMessage("lorcana.card.inked", {
          playerId: moveLog.playerId,
          cardId: moveLog.cardId,
        }),
      );
      break;
    case "activateAbility":
      messages.push(
        moveLog.abilityName
          ? createLogMessage("lorcana.ability.activated.named", {
              playerId: moveLog.playerId,
              cardId: moveLog.cardId,
              abilityName: moveLog.abilityName,
            })
          : createLogMessage("lorcana.ability.activated", {
              playerId: moveLog.playerId,
              cardId: moveLog.cardId,
            }),
      );
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "moveToLocation":
      messages.push(
        createLogMessage("lorcana.move.moveCharacterToLocation", {
          playerId: moveLog.playerId,
          characterId: moveLog.characterId,
          locationId: moveLog.locationId,
        }),
      );
      break;
    case "passTurn":
      messages.push(createLogMessage("lorcana.move.passTurn", { playerId: moveLog.playerId }));
      break;
    case "concede":
      messages.push(createLogMessage("lorcana.move.concede", { playerId: moveLog.playerId }));
      break;
    case "alterHand":
      messages.push(
        moveLog.mulliganed || moveLog.drawn
          ? createLogMessage("lorcana.setup.mulligan.detail", {
              playerId: moveLog.playerId,
              count: moveLog.count,
              mulliganed: unwrapPrivateField(moveLog.mulliganed) ?? [],
              drawn: unwrapPrivateField(moveLog.drawn) ?? [],
            })
          : createLogMessage("lorcana.setup.mulligan.count", {
              playerId: moveLog.playerId,
              count: moveLog.count,
            }),
      );
      break;
    case "chooseFirstPlayer":
      messages.push(
        createLogMessage("lorcana.setup.firstPlayerChosen", {
          chooser: moveLog.playerId,
          chosen: moveLog.chosenPlayerId,
        }),
      );
      break;
    case "resolveBag":
      messages.push(...buildResolveBagMessages(moveLog));
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "resolveEffect":
      messages.push(...buildResolveEffectMessages(moveLog));
      appendOutcomeMessages(messages, moveLog.playerId, moveLog.outcomes);
      break;
    case "turnStart":
    case "gameEnd":
      break;
  }

  return messages;
}

function appendOutcomeMessages(
  messages: LorcanaLogMessage[],
  actorPlayerId: PlayerId,
  outcomes?: MoveOutcomes,
  options: { skipCombatDamage?: boolean; skipBanished?: boolean } = {},
): void {
  if (!outcomes) {
    return;
  }

  if (outcomes.cardsDrawn) {
    const drawnCards = unwrapPrivateField(outcomes.cardsDrawn.detail);
    messages.push(
      drawnCards && drawnCards.length > 0
        ? createLogMessage("lorcana.outcome.cardsDrawn.detail", {
            playerId: actorPlayerId,
            amount: outcomes.cardsDrawn.amount,
            cardIds: drawnCards,
          })
        : createLogMessage("lorcana.outcome.cardsDrawn", {
            playerId: actorPlayerId,
            amount: outcomes.cardsDrawn.amount,
          }),
    );
  }

  if (!options.skipBanished) {
    for (const cardId of outcomes.cardsBanished ?? []) {
      messages.push(
        createLogMessage("lorcana.outcome.cardBanished", { playerId: actorPlayerId, cardId }),
      );
    }
  }

  for (const damage of outcomes.damageDealt ?? []) {
    if (damage.kind === "combat") {
      if (options.skipCombatDamage) {
        continue;
      }

      messages.push(
        createLogMessage("lorcana.outcome.combatDamage", {
          playerId: actorPlayerId,
          attackerId: damage.sourceId,
          defenderId: damage.targetId,
          attackerDamage: damage.amount,
          defenderDamage: 0,
        }),
      );
      continue;
    }

    messages.push(
      createLogMessage("lorcana.outcome.effectDamage", {
        playerId: actorPlayerId,
        sourceId: damage.sourceId,
        targetId: damage.targetId,
        amount: damage.amount,
      }),
    );
  }

  if (outcomes.loreChanged) {
    messages.push(
      outcomes.loreChanged.operation === "add"
        ? createLogMessage("lorcana.outcome.loreGained", {
            playerId: outcomes.loreChanged.playerId,
            amount: outcomes.loreChanged.amount,
          })
        : createLogMessage("lorcana.outcome.loreLost", {
            playerId: outcomes.loreChanged.playerId,
            amount: outcomes.loreChanged.amount,
          }),
    );
  }

  for (const cardId of outcomes.cardsExerted ?? []) {
    messages.push(
      createLogMessage("lorcana.outcome.cardExerted", { playerId: actorPlayerId, cardId }),
    );
  }

  for (const cardId of outcomes.cardsReadied ?? []) {
    messages.push(
      createLogMessage("lorcana.outcome.cardReadied", { playerId: actorPlayerId, cardId }),
    );
  }

  if (outcomes.cardsMilled) {
    messages.push(
      createLogMessage("lorcana.outcome.cardsMilled", {
        playerId: outcomes.cardsMilled.playerId,
        amount: outcomes.cardsMilled.amount,
      }),
    );
  }

  for (const cardId of outcomes.cardsReturnedToHand ?? []) {
    messages.push(
      createLogMessage("lorcana.outcome.cardReturnedToHand", {
        playerId: actorPlayerId,
        cardId,
      }),
    );
  }
}

function buildResolveBagMessages(
  moveLog: Extract<MoveLog, { type: "resolveBag" }>,
): LorcanaLogMessage[] {
  const messages: LorcanaLogMessage[] = [];
  const commonValues = {
    playerId: moveLog.playerId,
    sourceId: moveLog.sourceCardId,
  };

  switch (moveLog.status) {
    case "completed":
      if (moveLog.resolution?.kind === "targets") {
        messages.push(
          moveLog.abilityName
            ? createLogMessage("lorcana.bag.resolve.completed.targets.named", {
                ...commonValues,
                abilityName: moveLog.abilityName,
                targets: moveLog.resolution.targets,
              })
            : createLogMessage("lorcana.bag.resolve.completed.targets", {
                ...commonValues,
                targets: moveLog.resolution.targets,
              }),
        );
      } else {
        messages.push(
          moveLog.abilityName
            ? createLogMessage("lorcana.bag.resolve.completed.named", {
                ...commonValues,
                abilityName: moveLog.abilityName,
              })
            : createLogMessage("lorcana.bag.resolve.completed", commonValues),
        );
      }
      break;
    case "skipped":
      messages.push(
        moveLog.abilityName
          ? createLogMessage("lorcana.bag.resolve.skipped.named", {
              ...commonValues,
              abilityName: moveLog.abilityName,
            })
          : createLogMessage("lorcana.bag.resolve.skipped", commonValues),
      );
      break;
    case "pending":
      messages.push(
        moveLog.abilityName
          ? createLogMessage("lorcana.bag.resolve.pending.named", {
              ...commonValues,
              abilityName: moveLog.abilityName,
            })
          : createLogMessage("lorcana.bag.resolve.pending", commonValues),
      );
      break;
    case "cancelled":
      messages.push(
        moveLog.abilityName
          ? createLogMessage("lorcana.bag.resolve.cancelled.named", {
              ...commonValues,
              abilityName: moveLog.abilityName,
              cause: moveLog.cancelReason ?? "restriction",
            })
          : createLogMessage("lorcana.bag.resolve.cancelled", {
              ...commonValues,
              cause: moveLog.cancelReason ?? "restriction",
            }),
      );
      break;
  }

  return messages;
}

function buildResolveEffectMessages(
  moveLog: Extract<MoveLog, { type: "resolveEffect" }>,
): LorcanaLogMessage[] {
  const commonValues = {
    playerId: moveLog.playerId,
    sourceCardId: moveLog.sourceCardId,
  };

  switch (moveLog.resolution.kind) {
    case "targetSelection":
      return [
        createLogMessage("lorcana.effect.resolve.targetSelection", {
          ...commonValues,
          targets: moveLog.resolution.targets,
        }),
      ];
    case "discardChoice":
      return [
        createLogMessage("lorcana.effect.resolve.discardChoice", {
          ...commonValues,
          targets: moveLog.resolution.discarded,
        }),
      ];
    case "choiceSelection":
      return moveLog.resolution.revealedCardId
        ? [
            createLogMessage("lorcana.effect.resolve.choiceSelection.withReveal", {
              ...commonValues,
              revealedCardId: moveLog.resolution.revealedCardId,
              choiceIndex: moveLog.resolution.choiceIndex,
            }),
          ]
        : [
            createLogMessage("lorcana.effect.resolve.choiceSelection", {
              ...commonValues,
              choiceIndex: moveLog.resolution.choiceIndex,
            }),
          ];
    case "optionalSelection":
      return [
        createLogMessage(
          moveLog.resolution.accepted
            ? "lorcana.effect.resolve.optionalSelection.accepted"
            : "lorcana.effect.resolve.optionalSelection.rejected",
          commonValues,
        ),
      ];
    case "nameCardSelection":
      return [
        createLogMessage("lorcana.effect.resolve.nameCardSelection", {
          ...commonValues,
          namedCard: moveLog.resolution.namedCard,
        }),
      ];
    case "scrySelection":
      return unwrapPrivateField(moveLog.resolution.detail)?.length
        ? [
            createLogMessage("lorcana.effect.resolve.scrySelection.detail", {
              ...commonValues,
              selection: [],
              destinations: unwrapPrivateField(moveLog.resolution.detail) ?? [],
            }),
          ]
        : [createLogMessage("lorcana.effect.resolve.scrySelection", commonValues)];
    case "revealTopCard":
      return [
        createLogMessage(
          moveLog.resolution.destination === "deck-bottom"
            ? "lorcana.effect.resolve.revealTopCard.autoBottom"
            : "lorcana.effect.resolve.revealTopCard",
          {
            ...commonValues,
            targetPlayerId: moveLog.resolution.targetPlayerId,
            revealedCardId: moveLog.resolution.cardId,
          },
        ),
      ];
    case "cancelled":
      return [
        createLogMessage("lorcana.effect.cancelled", {
          ...commonValues,
          cause: "no-valid-targets",
        }),
      ];
  }
}

function createLogMessage<TKey extends LorcanaLogMessageKey>(
  key: TKey,
  values: LorcanaLogMessageMap[TKey],
): LorcanaLogMessage<TKey> {
  return {
    key,
    values,
  } as LorcanaLogMessage<TKey>;
}

function unwrapPrivateField<T>(value: T | { value: T } | undefined): T | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "object" && "value" in value) {
    return value.value;
  }

  return value;
}

export function flattenEventLogSegments(segments: readonly EventLogSegment[]): string {
  return segments
    .map((segment) => {
      switch (segment.kind) {
        case "card":
          return segment.fallbackLabel ?? segment.cardId;
        case "player":
        case "stat":
        case "text":
          return segment.text;
        case "icon":
          return `[${segment.label}]`;
      }
    })
    .join("");
}

// =============================================================================
// Rendering
// =============================================================================

const BAG_RESOLVE_COMPLETED_KEYS = new Set<LorcanaLogMessageKey>([
  "lorcana.bag.resolve.completed",
  "lorcana.bag.resolve.completed.named",
  "lorcana.bag.resolve.completed.targets",
  "lorcana.bag.resolve.completed.targets.named",
]);

function renderTypedLogMessage(
  entry: MoveLogEntrySnapshot,
  message: LorcanaLogMessage,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
  resolveCard?: CardReferenceResolver,
): EventLogSegment[] {
  if (message.key === "lorcana.effect.resolve.scrySelection.detail") {
    return renderScrySelectionDetailSegments(message, locale);
  }
  const template = getLorcanaLogTemplate(message.key, resolveEngineLogLocale(locale));
  const placeholderSegments = buildTemplatePlaceholderSegments(entry, message, viewerSide, locale);
  const renderedSegments = interpolateTemplateSegments(template, placeholderSegments);

  if (message.key === "lorcana.card.inked" && resolveCard) {
    return injectInkableIcon(renderedSegments, resolveCard, message.values.cardId);
  }

  if (BAG_RESOLVE_COMPLETED_KEYS.has(message.key)) {
    const detailSegments = renderBagResolveDestinationDetail(entry);
    if (detailSegments.length > 0) {
      return [...renderedSegments, { kind: "text", text: " " }, ...detailSegments];
    }
  }

  return renderedSegments;
}

function renderScrySelectionDetailSegments(
  message: Extract<LorcanaLogMessage, { key: "lorcana.effect.resolve.scrySelection.detail" }>,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment[] {
  const template = getLorcanaLogTemplate(message.key, resolveEngineLogLocale(locale));
  const [beforeSelection, afterSelection = ""] = template.split("{selection}");
  const prefixSegments = interpolateTemplateSegments(beforeSelection ?? "", {
    sourceCardId: [cardSegment(message.values.sourceCardId)],
  });

  // Use structured destinations when available (includes pre-resolved card names as fallbacks).
  // Fall back to the legacy per-zone arrays + selection strings for older log entries.
  const structuredDestinations = message.values.destinations;
  const orderedDestinations: Array<{
    zone: string;
    cardIds: CardInstanceId[];
    cardNames: string[];
    inkTypes: (string[] | undefined)[];
  }> = [];

  if (structuredDestinations && structuredDestinations.length > 0) {
    for (const dest of structuredDestinations) {
      if (dest.cardIds.length > 0) {
        orderedDestinations.push({
          zone: dest.zone,
          cardIds: dest.cardIds,
          cardNames: dest.cardNames,
          inkTypes: dest.inkTypes ?? [],
        });
      }
    }
  } else {
    // Legacy path: reconstruct from per-zone arrays ordered by selection strings
    const legacyEntries: Array<{ zone: string; cards?: CardInstanceId[] }> = [
      { zone: "deck-top", cards: message.values.deckTopCards },
      { zone: "deck-bottom", cards: message.values.deckBottomCards },
      { zone: "hand", cards: message.values.handCards },
      { zone: "play", cards: message.values.playCards },
      { zone: "inkwell", cards: message.values.inkwellCards },
      { zone: "discard", cards: message.values.discardCards },
    ];
    const source =
      message.values.selection.length > 0
        ? message.values.selection
            .map((selectionText) => {
              const normalizedLabel = selectionText.split(":")[0]?.trim().toLowerCase();
              return (
                legacyEntries.find(
                  (entry) => getScryZoneLabel(entry.zone).toLowerCase() === normalizedLabel,
                ) ?? null
              );
            })
            .filter((e): e is { zone: string; cards?: CardInstanceId[] } => e !== null)
        : legacyEntries;
    for (const entry of source) {
      if (entry.cards && entry.cards.length > 0) {
        orderedDestinations.push({
          zone: entry.zone,
          cardIds: entry.cards,
          cardNames: [],
          inkTypes: [],
        });
      }
    }
  }

  const renderedSelection = orderedDestinations.flatMap(
    ({ zone, cardIds, cardNames, inkTypes }, destinationIndex) => {
      const segments: EventLogSegment[] = [
        { kind: "text", text: `${getScryZoneLabel(zone)}: ` },
        ...joinSegments(
          cardIds.map((cardId, i) => {
            const fallbackLabel = cardNames[i] ?? cardId;
            const fallbackInkType = inkTypes[i];
            return [
              {
                kind: "card" as const,
                cardId,
                fallbackLabel,
                fallbackInkType,
              },
            ];
          }),
          ", ",
        ),
      ];

      const hasMoreSelections = orderedDestinations
        .slice(destinationIndex + 1)
        .some((entry) => entry.cardIds.length > 0);
      if (hasMoreSelections) {
        segments.push({ kind: "text", text: ", " });
      }

      return segments;
    },
  );

  return [
    ...prefixSegments,
    ...renderedSelection,
    ...interpolateTemplateSegments(afterSelection, {}),
  ];
}

const DESTINATION_ZONE_LABELS: Record<string, string> = {
  hand: "Put into hand",
  "deck-bottom": "Put on bottom of deck",
  "deck-top": "Put on top of deck",
  play: "Put into play",
  discard: "Discarded",
  inkwell: "Put into inkwell",
};

function renderBagResolveDestinationDetail(entry: MoveLogEntrySnapshot): EventLogSegment[] {
  const bagParams = entry.params?.params as
    | { destinations?: Array<{ zone: string; cards?: string[] }> }
    | undefined;

  const destinations = bagParams?.destinations;
  if (!destinations || destinations.length === 0) {
    return [];
  }

  const segments: EventLogSegment[] = [];

  for (const destination of destinations) {
    const cards = destination.cards;
    if (!cards || cards.length === 0) {
      continue;
    }

    const zoneLabel = DESTINATION_ZONE_LABELS[destination.zone] ?? destination.zone;
    const cardSegments = cards.map((cardId) => cardSegment(cardId));

    if (segments.length > 0) {
      segments.push({ kind: "text", text: " " });
    }

    segments.push({ kind: "text", text: `${zoneLabel}: ` });
    segments.push(
      ...joinSegments(
        cardSegments.map((s) => [s]),
        ", ",
      ),
    );
    segments.push({ kind: "text", text: "." });
  }

  return segments;
}

// =============================================================================
// Template interpolation
// =============================================================================

function buildTemplatePlaceholderSegments(
  entry: MoveLogEntrySnapshot,
  message: LorcanaLogMessage,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): Record<string, EventLogSegment[]> {
  const placeholderSegments: Record<string, EventLogSegment[]> = {};
  const valueKeys = Object.keys(message.values) as Array<keyof typeof message.values & string>;

  for (const valueKey of valueKeys) {
    placeholderSegments[valueKey] = createSegmentsForValue(
      entry,
      valueKey,
      message.values[valueKey],
      viewerSide,
      locale,
    );
  }

  return placeholderSegments;
}

function createSegmentsForValue(
  entry: MoveLogEntrySnapshot,
  valueKey: string,
  value: SimulatorSerializedValue | undefined,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment[] {
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    const items = value.map((item) =>
      createSegmentsForArrayItem(entry, valueKey, item, viewerSide, locale),
    );
    return joinSegments(items, ", ");
  }

  if (typeof value === "number" && STAT_VALUE_KEYS.has(valueKey)) {
    return [{ kind: "stat", text: String(value) }];
  }

  if (typeof value === "string") {
    if (PLAYER_VALUE_KEYS.has(valueKey)) {
      return [playerSegmentForPlayerId(entry, value, viewerSide, locale)];
    }
    if (CARD_VALUE_KEYS.has(valueKey)) {
      return [cardSegment(value)];
    }
    if (TARGET_VALUE_KEYS.has(valueKey)) {
      return [entitySegment(entry, value, viewerSide, locale)];
    }
  }

  return [{ kind: "text", text: String(value) }];
}

function createSegmentsForArrayItem(
  entry: MoveLogEntrySnapshot,
  valueKey: string,
  value: SimulatorSerializedValue,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment[] {
  if (typeof value === "number" && STAT_VALUE_KEYS.has(valueKey)) {
    return [{ kind: "stat", text: String(value) }];
  }

  if (typeof value !== "string") {
    return [{ kind: "text", text: String(value) }];
  }

  if (CARD_LIST_VALUE_KEYS.has(valueKey)) {
    return [cardSegment(value)];
  }
  if (TARGET_VALUE_KEYS.has(valueKey)) {
    return [entitySegment(entry, value, viewerSide, locale)];
  }

  return [{ kind: "text", text: value }];
}

function interpolateTemplateSegments(
  template: string,
  placeholderSegments: Record<string, EventLogSegment[]>,
): EventLogSegment[] {
  const segments: EventLogSegment[] = [];
  let cursor = 0;
  const matches = [...template.matchAll(/\{([a-zA-Z0-9_]+)\}/g)];

  for (const match of matches) {
    const placeholder = match[1] ?? "";
    const matchIndex = match.index ?? 0;
    if (matchIndex > cursor) {
      segments.push({ kind: "text", text: template.slice(cursor, matchIndex) });
    }

    segments.push(...(placeholderSegments[placeholder] ?? []));
    cursor = matchIndex + match[0].length;
  }

  if (cursor < template.length) {
    segments.push({ kind: "text", text: template.slice(cursor) });
  }

  return segments;
}

function injectInkableIcon(
  segments: EventLogSegment[],
  resolveCard: CardReferenceResolver,
  cardId: CardInstanceId,
): EventLogSegment[] {
  const cardRef = resolveCard(cardId);
  if (!cardRef?.inkable) {
    return segments;
  }

  const result: EventLogSegment[] = [];
  let inserted = false;

  for (const segment of segments) {
    if (!inserted && segment.kind === "card" && segment.cardId === cardId) {
      result.push({ kind: "icon", icon: "inkable", label: "Inkable" });
      result.push({ kind: "text", text: " " });
      inserted = true;
    }
    result.push(segment);
  }

  return result;
}

// =============================================================================
// Segment helpers
// =============================================================================

function resolveEventLogLocale(locale?: LorcanaSimulatorLocale): LorcanaSimulatorLocale {
  if (locale) {
    return locale;
  }

  const currentLocale = getLocale();
  return currentLocale === "es" ||
    currentLocale === "de" ||
    currentLocale === "it" ||
    currentLocale === "pt-br"
    ? currentLocale
    : "en";
}

function resolveEngineLogLocale(locale?: LorcanaSimulatorLocale): LorcanaLogLocale {
  return ENGINE_LOG_LOCALE_BY_SIMULATOR_LOCALE[resolveEventLogLocale(locale)];
}

function cardSegment(cardId: string): EventLogSegment {
  return { kind: "card", cardId };
}

function entitySegment(
  entry: MoveLogEntrySnapshot,
  value: string,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment {
  const resolvedSide = resolveSideForPlayerId(entry, value);
  if (resolvedSide) {
    const actor = buildActor(resolvedSide, viewerSide, locale);
    return { kind: "player", text: actor.label, tone: actor.tone };
  }

  return cardSegment(value);
}

function playerSegmentForPlayerId(
  entry: MoveLogEntrySnapshot,
  playerId: string,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment {
  const side = resolveSideForPlayerId(entry, playerId);
  const actor = buildActor(side, viewerSide, locale);
  return { kind: "player", text: actor.label, tone: actor.tone };
}

function resolveSideForPlayerId(
  entry: MoveLogEntrySnapshot,
  playerId: string,
): LorcanaPlayerSide | null {
  const actorSide = entry.actorSide;
  const actorPlayerId = entry.playerId;

  if (actorSide && actorPlayerId === playerId) {
    return actorSide;
  }

  if (playerId === "player_one") {
    return "playerOne";
  }

  if (playerId === "player_two") {
    return "playerTwo";
  }

  return null;
}

function buildActor(
  actorSide?: LorcanaPlayerSide | null,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): { label: string; tone: EventLogPlayerTone } {
  const resolvedLocale = resolveEventLogLocale(locale);
  if (!actorSide) {
    return { label: "System", tone: "system" };
  }

  if (viewerSide && actorSide === viewerSide) {
    return { label: m["sim.player.you"]({}, { locale: resolvedLocale }), tone: "self" };
  }

  if (viewerSide && actorSide !== viewerSide) {
    return { label: m["sim.player.opponent"]({}, { locale: resolvedLocale }), tone: "opponent" };
  }

  return actorSide === "playerOne"
    ? {
        label: m["sim.player.side.playerOne"]({}, { locale: resolvedLocale }),
        tone: "playerOne",
      }
    : {
        label: m["sim.player.side.playerTwo"]({}, { locale: resolvedLocale }),
        tone: "playerTwo",
      };
}

function joinSegments(segments: EventLogSegment[][], separator: string): EventLogSegment[] {
  const result: EventLogSegment[] = [];

  segments.forEach((segmentGroup, index) => {
    if (index > 0) {
      result.push({ kind: "text", text: separator });
    }
    result.push(...segmentGroup);
  });

  return result;
}
