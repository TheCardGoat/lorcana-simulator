import {
  type CardInstanceId,
  LORCANA_LOG_TRANSLATION_KEYS,
  type LorcanaLogMessage,
  type LorcanaLogMessageKey,
  type LorcanaLogMessageMap,
  type PlayerId,
} from "@tcg/lorcana-engine";
import { getLorcanaLogTemplate, type LorcanaLogLocale } from "@tcg/lorcana-engine/i18n";
import { m } from "$lib/i18n/messages.js";
import { getLocale } from "$lib/paraglide/runtime.js";
import type {
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
  LorcanaSimulatorLocale,
  MoveLogDefaultMessageSnapshot,
  MoveLogEntrySnapshot,
  SimulatorSerializedObject,
  SimulatorSerializedValue,
} from "@/features/simulator/model/contracts.js";

type SimulatorMessageTranslator = (
  inputs?: Record<string, unknown>,
  options?: { locale?: LorcanaSimulatorLocale },
) => string;

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
  | { kind: "card"; text: string; card: LorcanaCardSnapshot }
  | { kind: "player"; text: string; tone: EventLogPlayerTone }
  | { kind: "stat"; text: string }
  | { kind: "icon"; icon: "inkable"; label: string };

export type EventLogBody = {
  marker: EventLogMarkerId;
  segments: EventLogSegment[];
  source: "typed" | "fallback";
  text: string;
};

const LOG_KEYS = new Set<LorcanaLogMessageKey>(
  Object.keys(LORCANA_LOG_TRANSLATION_KEYS) as LorcanaLogMessageKey[],
);

const ENGINE_LOG_LOCALE_BY_SIMULATOR_LOCALE: Record<LorcanaSimulatorLocale, LorcanaLogLocale> = {
  en: "en",
  es: "es",
  de: "de",
  it: "it",
  "pt-br": "pt-br",
};

const MESSAGE_PRIORITY: Record<LorcanaLogMessageKey, number> = {
  "lorcana.setup.firstPlayerChosen": 40,
  "lorcana.setup.mulligan.count": 50,
  "lorcana.setup.mulligan.detail": 60,
  "lorcana.setup.done": 10,
  "lorcana.ability.activated": 80,
  "lorcana.ability.activated.named": 81,
  "lorcana.card.inked": 90,
  "lorcana.scry.count": 55,
  "lorcana.scry.detail": 65,
  "lorcana.move.playCard": 100,
  "lorcana.move.quest": 110,
  "lorcana.move.questWithAll": 120,
  "lorcana.move.challenge": 130,
  "lorcana.move.moveCharacterToLocation": 140,
  "lorcana.move.passTurn": 150,
  "lorcana.move.concede": 160,
  "lorcana.bag.resolve.completed": 200,
  "lorcana.bag.resolve.completed.named": 201,
  "lorcana.bag.resolve.completed.targets": 202,
  "lorcana.bag.resolve.completed.targets.named": 203,
  "lorcana.bag.resolve.skipped": 190,
  "lorcana.bag.resolve.skipped.named": 191,
  "lorcana.bag.resolve.pending": 180,
  "lorcana.bag.resolve.pending.named": 181,
  "lorcana.effect.resolve.discardChoice": 220,
  "lorcana.effect.resolve.targetSelection": 221,
  "lorcana.effect.resolve.choiceSelection": 222,
  "lorcana.effect.resolve.optionalSelection.accepted": 223,
  "lorcana.effect.resolve.optionalSelection.rejected": 224,
  "lorcana.effect.resolve.nameCardSelection": 225,
  "lorcana.effect.resolve.scrySelection": 226,
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
};

const PLAYER_VALUE_KEYS = new Set(["chooser", "chosen", "newPlayer", "playerId", "previousPlayer"]);
const CARD_VALUE_KEYS = new Set([
  "attackerId",
  "cardId",
  "characterId",
  "defenderId",
  "locationId",
  "sourceCardId",
  "sourceId",
  "shiftTargetId",
]);
const CARD_LIST_VALUE_KEYS = new Set(["cardIds", "drawn", "lookedAt", "mulliganed", "singerIds"]);
const TARGET_VALUE_KEYS = new Set(["targets"]);
const STAT_VALUE_KEYS = new Set(["choiceIndex", "count", "inkPaid", "loreGained"]);

const FALLBACK_MESSAGE_BY_MOVE_ID = {
  activateAbility: "sim.eventLog.fallback.activateAbility",
  alterHand: "sim.eventLog.fallback.alterHand",
  chooseWhoGoesFirst: "sim.eventLog.fallback.chooseWhoGoesFirst",
  challenge: "sim.eventLog.fallback.challenge",
  concede: "sim.eventLog.fallback.concede",
  moveCharacterToLocation: "sim.eventLog.fallback.moveCharacterToLocation",
  passTurn: "sim.eventLog.fallback.passTurn",
  playCard: "sim.eventLog.fallback.playCard",
  putCardIntoInkwell: "sim.eventLog.fallback.putCardIntoInkwell",
  quest: "sim.eventLog.fallback.quest",
  questWithAll: "sim.eventLog.fallback.questWithAll",
  undo: "sim.eventLog.fallback.undo",
  sing: "sim.eventLog.fallback.sing",
  singTogether: "sim.eventLog.fallback.singTogether",
  resolveBag: "sim.eventLog.fallback.resolveBag",
  resolveEffect: "sim.eventLog.fallback.resolveEffect",
  manualMoveCard: "sim.eventLog.fallback.manualMoveCard",
  manualExertCard: "sim.eventLog.fallback.manualExertCard",
  manualReadyCard: "sim.eventLog.fallback.manualReadyCard",
  manualDryCard: "sim.eventLog.fallback.manualDryCard",
  manualSetDamage: "sim.eventLog.fallback.manualSetDamage",
  manualSetLore: "sim.eventLog.fallback.manualSetLore",
  manualShuffleDeck: "sim.eventLog.fallback.manualShuffleDeck",
  manualPassTurn: "sim.eventLog.fallback.manualPassTurn",
} as const satisfies Record<MoveLogEntrySnapshot["moveId"], string>;

const MARKER_BY_MOVE_ID: Record<MoveLogEntrySnapshot["moveId"], EventLogMarkerId> = {
  activateAbility: "ability",
  alterHand: "setup",
  chooseWhoGoesFirst: "setup",
  challenge: "challenge",
  concede: "pass",
  moveCharacterToLocation: "move",
  passTurn: "pass",
  playCard: "play",
  putCardIntoInkwell: "ink",
  quest: "quest",
  questWithAll: "quest",
  undo: "pass",
  sing: "play",
  singTogether: "play",
  resolveBag: "ability",
  resolveEffect: "ability",
  manualMoveCard: "move",
  manualExertCard: "move",
  manualReadyCard: "move",
  manualDryCard: "move",
  manualSetDamage: "move",
  manualSetLore: "move",
  manualShuffleDeck: "move",
  manualPassTurn: "move",
};

const VALUE_PARSERS = {
  "lorcana.setup.firstPlayerChosen": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.setup.firstPlayerChosen"] | null => {
    const chooser = getString(values.chooser);
    const chosen = getString(values.chosen);
    return chooser && chosen ? { chooser: toPlayerId(chooser), chosen: toPlayerId(chosen) } : null;
  },
  "lorcana.setup.mulligan.count": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.setup.mulligan.count"] | null => {
    const playerId = getString(values.playerId);
    const count = getNumber(values.count);
    return playerId && count !== null ? { playerId: toPlayerId(playerId), count } : null;
  },
  "lorcana.setup.mulligan.detail": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.setup.mulligan.detail"] | null => {
    const playerId = getString(values.playerId);
    const count = getNumber(values.count);
    const mulliganed = getStringArray(values.mulliganed);
    const drawn = getStringArray(values.drawn);
    return playerId && count !== null && mulliganed && drawn
      ? {
          playerId: toPlayerId(playerId),
          count,
          mulliganed: mulliganed.map(toCardInstanceId),
          drawn: drawn.map(toCardInstanceId),
        }
      : null;
  },
  "lorcana.setup.done": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.setup.done"] | null =>
    Object.keys(values).length === 0 ? {} : null,
  "lorcana.ability.activated": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.ability.activated"] | null => {
    const playerId = getString(values.playerId);
    const cardId = getString(values.cardId);
    return playerId && cardId
      ? { playerId: toPlayerId(playerId), cardId: toCardInstanceId(cardId) }
      : null;
  },
  "lorcana.ability.activated.named": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.ability.activated.named"] | null => {
    const playerId = getString(values.playerId);
    const cardId = getString(values.cardId);
    const abilityName = getString(values.abilityName);
    return playerId && cardId && abilityName
      ? { playerId: toPlayerId(playerId), cardId: toCardInstanceId(cardId), abilityName }
      : null;
  },
  "lorcana.card.inked": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.card.inked"] | null => {
    const playerId = getString(values.playerId);
    const cardId = getString(values.cardId);
    return playerId && cardId
      ? { playerId: toPlayerId(playerId), cardId: toCardInstanceId(cardId) }
      : null;
  },
  "lorcana.scry.count": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.scry.count"] | null => {
    const playerId = getString(values.playerId);
    const count = getNumber(values.count);
    return playerId && count !== null ? { playerId: toPlayerId(playerId), count } : null;
  },
  "lorcana.scry.detail": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.scry.detail"] | null => {
    const playerId = getString(values.playerId);
    const count = getNumber(values.count);
    const lookedAt = getStringArray(values.lookedAt);
    return playerId && count !== null && lookedAt
      ? { playerId: toPlayerId(playerId), count, lookedAt: lookedAt.map(toCardInstanceId) }
      : null;
  },
  "lorcana.move.playCard": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.playCard"] | null => {
    const playerId = getString(values.playerId);
    const cardId = getString(values.cardId);
    return playerId && cardId
      ? { playerId: toPlayerId(playerId), cardId: toCardInstanceId(cardId) }
      : null;
  },
  "lorcana.move.quest": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.quest"] | null => {
    const playerId = getString(values.playerId);
    const cardId = getString(values.cardId);
    const loreGained = getNumber(values.loreGained);
    return playerId && cardId && loreGained !== null
      ? { playerId: toPlayerId(playerId), cardId: toCardInstanceId(cardId), loreGained }
      : null;
  },
  "lorcana.move.questWithAll": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.questWithAll"] | null => {
    const playerId = getString(values.playerId);
    const cardIds = getStringArray(values.cardIds);
    const loreGained = getNumber(values.loreGained);
    const count = getNumber(values.count);
    return playerId && cardIds && loreGained !== null && count !== null
      ? {
          playerId: toPlayerId(playerId),
          cardIds: cardIds.map(toCardInstanceId),
          loreGained,
          count,
        }
      : null;
  },
  "lorcana.move.challenge": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.challenge"] | null => {
    const playerId = getString(values.playerId);
    const attackerId = getString(values.attackerId);
    const defenderId = getString(values.defenderId);
    return playerId && attackerId && defenderId
      ? {
          playerId: toPlayerId(playerId),
          attackerId: toCardInstanceId(attackerId),
          defenderId: toCardInstanceId(defenderId),
        }
      : null;
  },
  "lorcana.move.moveCharacterToLocation": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.moveCharacterToLocation"] | null => {
    const playerId = getString(values.playerId);
    const characterId = getString(values.characterId);
    const locationId = getString(values.locationId);
    return playerId && characterId && locationId
      ? {
          playerId: toPlayerId(playerId),
          characterId: toCardInstanceId(characterId),
          locationId: toCardInstanceId(locationId),
        }
      : null;
  },
  "lorcana.move.passTurn": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.passTurn"] | null => {
    const playerId = getString(values.playerId);
    return playerId ? { playerId: toPlayerId(playerId) } : null;
  },
  "lorcana.move.concede": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.move.concede"] | null => {
    const playerId = getString(values.playerId);
    return playerId ? { playerId: toPlayerId(playerId) } : null;
  },
  "lorcana.bag.resolve.completed": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.completed"] | null => {
    const playerId = getString(values.playerId);
    const sourceId = getString(values.sourceId);
    return playerId && sourceId
      ? { playerId: toPlayerId(playerId), sourceId: toCardInstanceId(sourceId) }
      : null;
  },
  "lorcana.bag.resolve.completed.named": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.completed.named"] | null => {
    const base = VALUE_PARSERS["lorcana.bag.resolve.completed"](values);
    const abilityName = getString(values.abilityName);
    return base && abilityName ? { ...base, abilityName } : null;
  },
  "lorcana.bag.resolve.completed.targets": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.completed.targets"] | null => {
    const base = VALUE_PARSERS["lorcana.bag.resolve.completed"](values);
    const targets = getStringArray(values.targets);
    return base && targets ? { ...base, targets: targets.map(toLogTargetId) } : null;
  },
  "lorcana.bag.resolve.completed.targets.named": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.completed.targets.named"] | null => {
    const base = VALUE_PARSERS["lorcana.bag.resolve.completed.targets"](values);
    const abilityName = getString(values.abilityName);
    return base && abilityName ? { ...base, abilityName } : null;
  },
  "lorcana.bag.resolve.skipped": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.skipped"] | null =>
    VALUE_PARSERS["lorcana.bag.resolve.completed"](values),
  "lorcana.bag.resolve.skipped.named": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.skipped.named"] | null => {
    const base = VALUE_PARSERS["lorcana.bag.resolve.completed"](values);
    const abilityName = getString(values.abilityName);
    return base && abilityName ? { ...base, abilityName } : null;
  },
  "lorcana.bag.resolve.pending": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.pending"] | null =>
    VALUE_PARSERS["lorcana.bag.resolve.completed"](values),
  "lorcana.bag.resolve.pending.named": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.bag.resolve.pending.named"] | null => {
    const base = VALUE_PARSERS["lorcana.bag.resolve.completed"](values);
    const abilityName = getString(values.abilityName);
    return base && abilityName ? { ...base, abilityName } : null;
  },
  "lorcana.effect.resolve.discardChoice": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.discardChoice"] | null => {
    const playerId = getString(values.playerId);
    const sourceCardId = getString(values.sourceCardId);
    const targets = getStringArray(values.targets);
    return playerId && sourceCardId && targets
      ? {
          playerId: toPlayerId(playerId),
          sourceCardId: toCardInstanceId(sourceCardId),
          targets: targets.map(toLogTargetId),
        }
      : null;
  },
  "lorcana.effect.resolve.targetSelection": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.targetSelection"] | null =>
    VALUE_PARSERS["lorcana.effect.resolve.discardChoice"](values),
  "lorcana.effect.resolve.choiceSelection": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.choiceSelection"] | null => {
    const playerId = getString(values.playerId);
    const sourceCardId = getString(values.sourceCardId);
    const choiceIndex = getNumber(values.choiceIndex);
    return playerId && sourceCardId && choiceIndex !== null
      ? {
          playerId: toPlayerId(playerId),
          sourceCardId: toCardInstanceId(sourceCardId),
          choiceIndex,
        }
      : null;
  },
  "lorcana.effect.resolve.optionalSelection.accepted": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.optionalSelection.accepted"] | null => {
    const playerId = getString(values.playerId);
    const sourceCardId = getString(values.sourceCardId);
    return playerId && sourceCardId
      ? { playerId: toPlayerId(playerId), sourceCardId: toCardInstanceId(sourceCardId) }
      : null;
  },
  "lorcana.effect.resolve.optionalSelection.rejected": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.optionalSelection.rejected"] | null =>
    VALUE_PARSERS["lorcana.effect.resolve.optionalSelection.accepted"](values),
  "lorcana.effect.resolve.nameCardSelection": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.nameCardSelection"] | null => {
    const playerId = getString(values.playerId);
    const sourceCardId = getString(values.sourceCardId);
    const namedCard = getString(values.namedCard);
    return playerId && sourceCardId && namedCard
      ? {
          playerId: toPlayerId(playerId),
          sourceCardId: toCardInstanceId(sourceCardId),
          namedCard,
        }
      : null;
  },
  "lorcana.effect.resolve.scrySelection": (
    values: SimulatorSerializedObject,
  ): LorcanaLogMessageMap["lorcana.effect.resolve.scrySelection"] | null => {
    const playerId = getString(values.playerId);
    const sourceCardId = getString(values.sourceCardId);
    return playerId && sourceCardId
      ? { playerId: toPlayerId(playerId), sourceCardId: toCardInstanceId(sourceCardId) }
      : null;
  },
} satisfies {
  [K in LorcanaLogMessageKey]: (
    values: SimulatorSerializedObject,
  ) => LorcanaLogMessageMap[K] | null;
};

export function toTypedLorcanaLogMessage(
  defaultMessage?: MoveLogDefaultMessageSnapshot,
): LorcanaLogMessage | null {
  if (!defaultMessage || !isLorcanaLogMessageKey(defaultMessage.key)) {
    return null;
  }

  const parsedValues = VALUE_PARSERS[defaultMessage.key](defaultMessage.values);
  if (!parsedValues) {
    return null;
  }

  return createTypedLogMessage(defaultMessage.key, parsedValues);
}

export function collectTypedLorcanaMessages(entry: MoveLogEntrySnapshot): LorcanaLogMessage[] {
  const messages: LorcanaLogMessage[] = [];
  const rawRegistry = entry.rawLogRegistry;
  if (!rawRegistry) {
    return messages;
  }

  const matchingMessage = toTypedLorcanaLogMessage(
    rawRegistry.matchingMoveLogEntry?.defaultMessage,
  );
  if (matchingMessage) {
    messages.push(matchingMessage);
  }

  for (const relatedEntry of rawRegistry.relatedLogEntries) {
    const relatedMessage = toTypedLorcanaLogMessage(relatedEntry.defaultMessage);
    if (relatedMessage) {
      messages.push(relatedMessage);
    }
  }

  return messages;
}

export function formatEventLogBody(
  entry: MoveLogEntrySnapshot,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogBody {
  const typedMessages = collectTypedLorcanaMessages(entry);
  const primaryMessage = selectPrimaryMessage(typedMessages);

  if (primaryMessage) {
    const segments = renderTypedLogMessage(entry, primaryMessage, viewerSide, locale);
    return {
      marker: MARKER_BY_LOG_KEY[primaryMessage.key],
      segments,
      source: "typed",
      text: flattenEventLogSegments(segments),
    };
  }

  const segments = buildFallbackSegments(entry, viewerSide, locale);
  return {
    marker: MARKER_BY_MOVE_ID[entry.moveId],
    segments,
    source: "fallback",
    text: flattenEventLogSegments(segments),
  };
}

export function flattenEventLogSegments(segments: readonly EventLogSegment[]): string {
  return segments
    .map((segment) => {
      switch (segment.kind) {
        case "card":
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

function renderTypedLogMessage(
  entry: MoveLogEntrySnapshot,
  message: LorcanaLogMessage,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment[] {
  const cardReferences = createCardLookup(entry.rawLogRegistry?.cardReferences ?? []);
  const template = getLorcanaLogTemplate(message.key, resolveEngineLogLocale(locale));
  const placeholderSegments = buildTemplatePlaceholderSegments(
    entry,
    message,
    cardReferences,
    viewerSide,
    locale,
  );
  const renderedSegments = interpolateTemplateSegments(template, placeholderSegments);

  if (message.key === "lorcana.card.inked") {
    return injectInkableIcon(renderedSegments, cardReferences, message.values.cardId);
  }

  return renderedSegments;
}

function buildTemplatePlaceholderSegments(
  entry: MoveLogEntrySnapshot,
  message: LorcanaLogMessage,
  cardsById: Map<string, LorcanaCardSnapshot>,
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
      cardsById,
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
  cardsById: Map<string, LorcanaCardSnapshot>,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment[] {
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    const items = value.map((item) =>
      createSegmentsForArrayItem(entry, valueKey, item, cardsById, viewerSide, locale),
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
      return [cardSegment(cardsById, value)];
    }
    if (TARGET_VALUE_KEYS.has(valueKey)) {
      return [entitySegment(entry, cardsById, value, viewerSide, locale)];
    }
  }

  return [{ kind: "text", text: String(value) }];
}

function createSegmentsForArrayItem(
  entry: MoveLogEntrySnapshot,
  valueKey: string,
  value: SimulatorSerializedValue,
  cardsById: Map<string, LorcanaCardSnapshot>,
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
    return [cardSegment(cardsById, value)];
  }
  if (TARGET_VALUE_KEYS.has(valueKey)) {
    return [entitySegment(entry, cardsById, value, viewerSide, locale)];
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
  cardsById: Map<string, LorcanaCardSnapshot>,
  cardId: CardInstanceId,
): EventLogSegment[] {
  const card = cardsById.get(cardId);
  if (!card?.inkable) {
    return segments;
  }

  const result: EventLogSegment[] = [];
  let inserted = false;

  for (const segment of segments) {
    if (!inserted && segment.kind === "card" && segment.card.cardId === cardId) {
      result.push({ kind: "icon", icon: "inkable", label: "Inkable" });
      result.push({ kind: "text", text: " " });
      inserted = true;
    }
    result.push(segment);
  }

  return result;
}

function buildFallbackSegments(
  entry: MoveLogEntrySnapshot,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment[] {
  const fallbackMessageKey = FALLBACK_MESSAGE_BY_MOVE_ID[entry.moveId];
  const messages = m as Record<string, SimulatorMessageTranslator>;
  const text = messages[fallbackMessageKey]({}, locale ? { locale } : undefined);

  switch (entry.moveId) {
    case "activateAbility": {
      const params = entry.rawLogRegistry?.move.params;
      const cardId = getString(params?.cardId);
      const abilityName = getString(params?.ability);
      if (cardId && abilityName) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.ability.activated.named", {
            playerId: toPlayerId(entry.rawLogRegistry?.move.playerId ?? "player_one"),
            cardId: toCardInstanceId(cardId),
            abilityName,
          }),
          viewerSide,
          locale,
        );
      }

      if (cardId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.ability.activated", {
            playerId: toPlayerId(entry.rawLogRegistry?.move.playerId ?? "player_one"),
            cardId: toCardInstanceId(cardId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "alterHand": {
      const params = entry.rawLogRegistry?.move.params;
      const playerId = getString(params?.playerId) ?? entry.rawLogRegistry?.move.playerId;
      const cardsToMulligan = getStringArray(params?.cardsToMulligan);
      if (playerId && cardsToMulligan) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.setup.mulligan.count", {
            playerId: toPlayerId(playerId),
            count: cardsToMulligan.length,
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "chooseWhoGoesFirst": {
      const params = entry.rawLogRegistry?.move.params;
      const chooser = entry.rawLogRegistry?.move.playerId;
      const chosen = getString(params?.playerId);
      if (chooser && chosen) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.setup.firstPlayerChosen", {
            chooser: toPlayerId(chooser),
            chosen: toPlayerId(chosen),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "challenge": {
      const params = entry.rawLogRegistry?.move.params;
      const playerId = entry.rawLogRegistry?.move.playerId;
      const attackerId = getString(params?.attackerId);
      const defenderId = getString(params?.defenderId);
      if (playerId && attackerId && defenderId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.move.challenge", {
            playerId: toPlayerId(playerId),
            attackerId: toCardInstanceId(attackerId),
            defenderId: toCardInstanceId(defenderId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "concede": {
      const playerId = entry.rawLogRegistry?.move.playerId;
      if (playerId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.move.concede", {
            playerId: toPlayerId(playerId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "moveCharacterToLocation": {
      const params = entry.rawLogRegistry?.move.params;
      const playerId = entry.rawLogRegistry?.move.playerId;
      const characterId = getString(params?.characterId);
      const locationId = getString(params?.locationId);
      if (playerId && characterId && locationId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.move.moveCharacterToLocation", {
            playerId: toPlayerId(playerId),
            characterId: toCardInstanceId(characterId),
            locationId: toCardInstanceId(locationId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "passTurn": {
      const playerId = entry.rawLogRegistry?.move.playerId;
      if (playerId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.move.passTurn", {
            playerId: toPlayerId(playerId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "playCard": {
      const params = entry.rawLogRegistry?.move.params;
      const playerId = entry.rawLogRegistry?.move.playerId;
      const cardId = getString(params?.cardId);
      if (playerId && cardId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.move.playCard", {
            playerId: toPlayerId(playerId),
            cardId: toCardInstanceId(cardId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "putCardIntoInkwell": {
      const params = entry.rawLogRegistry?.move.params;
      const playerId = entry.rawLogRegistry?.move.playerId;
      const cardId = getString(params?.cardId);
      if (playerId && cardId) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.card.inked", {
            playerId: toPlayerId(playerId),
            cardId: toCardInstanceId(cardId),
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    case "quest": {
      const params = entry.rawLogRegistry?.move.params;
      const playerId = entry.rawLogRegistry?.move.playerId;
      const cardId = getString(params?.cardId);
      const loreGained = resolveCardLore(entry.rawLogRegistry?.cardReferences ?? [], cardId);
      if (playerId && cardId && loreGained !== null) {
        return renderTypedLogMessage(
          entry,
          createTypedLogMessage("lorcana.move.quest", {
            playerId: toPlayerId(playerId),
            cardId: toCardInstanceId(cardId),
            loreGained,
          }),
          viewerSide,
          locale,
        );
      }
      break;
    }
    default: {
      // Exhaustiveness check - unknown move IDs fall through to fallback text
      break;
    }
  }

  return [{ kind: "text", text }];
}

function selectPrimaryMessage(messages: LorcanaLogMessage[]): LorcanaLogMessage | null {
  let bestMessage: LorcanaLogMessage | null = null;
  let bestPriority = -1;

  for (const message of messages) {
    const priority = MESSAGE_PRIORITY[message.key] ?? -1;
    if (priority > bestPriority) {
      bestMessage = message;
      bestPriority = priority;
    }
  }

  return bestMessage;
}

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

function createCardLookup(cards: LorcanaCardSnapshot[]): Map<string, LorcanaCardSnapshot> {
  return new Map(cards.map((card) => [card.cardId, card]));
}

function cardSegment(cardsById: Map<string, LorcanaCardSnapshot>, cardId: string): EventLogSegment {
  const card = cardsById.get(cardId);
  if (!card) {
    return { kind: "text", text: cardId };
  }

  return { kind: "card", text: card.label, card };
}

function entitySegment(
  entry: MoveLogEntrySnapshot,
  cardsById: Map<string, LorcanaCardSnapshot>,
  value: string,
  viewerSide?: LorcanaPlayerSide | null,
  locale?: LorcanaSimulatorLocale,
): EventLogSegment {
  const card = cardsById.get(value);
  if (card) {
    return { kind: "card", text: card.label, card };
  }

  const resolvedSide = resolveSideForPlayerId(entry, value);
  if (resolvedSide) {
    const actor = buildActor(resolvedSide, viewerSide, locale);
    return { kind: "player", text: actor.label, tone: actor.tone };
  }

  return cardSegment(cardsById, value);
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
  const actorPlayerId = entry.rawLogRegistry?.move.playerId;

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

function resolveCardLore(cards: LorcanaCardSnapshot[], cardId: string | null): number | null {
  if (!cardId) {
    return null;
  }

  const matched = cards.find((card) => card.cardId === cardId);
  return typeof matched?.loreValue === "number" ? matched.loreValue : null;
}

function isLorcanaLogMessageKey(key: string): key is LorcanaLogMessageKey {
  return LOG_KEYS.has(key as LorcanaLogMessageKey);
}

function createTypedLogMessage<TKey extends LorcanaLogMessageKey>(
  key: TKey,
  values: LorcanaLogMessageMap[TKey],
): LorcanaLogMessage<TKey> {
  return { key, values } as LorcanaLogMessage<TKey>;
}

function getString(value: SimulatorSerializedValue | undefined): string | null {
  return typeof value === "string" ? value : null;
}

function getNumber(value: SimulatorSerializedValue | undefined): number | null {
  return typeof value === "number" ? value : null;
}

function getStringArray(value: SimulatorSerializedValue | undefined): string[] | null {
  return Array.isArray(value) && value.every((entry) => typeof entry === "string") ? value : null;
}

function toPlayerId(value: string): PlayerId {
  return value as PlayerId;
}

function toCardInstanceId(value: string): CardInstanceId {
  return value as CardInstanceId;
}

function toLogTargetId(value: string): CardInstanceId | PlayerId {
  return value as CardInstanceId | PlayerId;
}
