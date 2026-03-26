import {
  type CardInstanceId,
  type LorcanaLogMessage,
  type LorcanaLogMessageKey,
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
 * Optional resolver used to populate `fallbackLabel` on card segments at format time.
 * Needed for non-interactive contexts (spectator, devtools) where CardLogToken is not rendered.
 * In the interactive simulator, CardLogToken does live lookup instead.
 */
export type CardReferenceResolver = (cardId: string) => { label?: string } | null;

const ENGINE_LOG_LOCALE_BY_SIMULATOR_LOCALE: Record<LorcanaSimulatorLocale, LorcanaLogLocale> = {
  en: "en",
  es: "es",
  de: "de",
  it: "it",
  "pt-br": "pt-br",
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
]);
const CARD_LIST_VALUE_KEYS = new Set(["cardIds", "drawn", "lookedAt", "mulliganed", "singerIds"]);
const TARGET_VALUE_KEYS = new Set(["targets"]);
const STAT_VALUE_KEYS = new Set(["choiceIndex", "count", "inkPaid", "loreGained"]);

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
  const message = {
    key: typed.type,
    values: typed.values,
  } as LorcanaLogMessage;
  let segments = renderTypedLogMessage(entry, message, viewerSide, locale);

  if (resolveCard) {
    segments = segments.map((s) =>
      s.kind === "card"
        ? { ...s, fallbackLabel: resolveCard(s.cardId)?.label ?? s.fallbackLabel }
        : s,
    );
  }

  return {
    marker: MARKER_BY_LOG_KEY[typed.type],
    segments,
    source: "typed",
    text: flattenEventLogSegments(segments),
  };
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
): EventLogSegment[] {
  if (message.key === "lorcana.effect.resolve.scrySelection.detail") {
    return renderScrySelectionDetailSegments(message, locale);
  }
  const template = getLorcanaLogTemplate(message.key, resolveEngineLogLocale(locale));
  const placeholderSegments = buildTemplatePlaceholderSegments(entry, message, viewerSide, locale);
  const renderedSegments = interpolateTemplateSegments(template, placeholderSegments);

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

// Note: inkable icon injection is intentionally removed; CardLogToken handles live card data.

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
