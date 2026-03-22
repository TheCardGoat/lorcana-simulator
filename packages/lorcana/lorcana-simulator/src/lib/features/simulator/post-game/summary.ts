import type { LorcanaLogMessage } from "@tcg/lorcana-engine";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";
import {
  getAvailableInkForSide,
  getOwnerIdForSide,
  getSideForOwnerId,
  getZoneCardIds,
  type LorcanaPlayerSide,
  type MoveLogDefaultMessageSnapshot,
  type MoveLogEntrySnapshot,
  type SimulatorSerializedObject,
} from "@/features/simulator/model/contracts.js";
import {
  collectTypedLorcanaMessages,
  formatEventLogBody,
} from "@/features/simulator/model/event-log-formatting.js";
import type {
  PostGameActionCounters,
  PostGameActorTone,
  PostGameForensicEntry,
  PostGameHighlight,
  PostGameSpotlightAbility,
  PostGameSpotlightCard,
  PostGameSummary,
} from "./types.js";

type CardReferenceMeta = {
  cardId: string;
  label: string;
  ownerSide: LorcanaPlayerSide | null;
  loreValue: number | null;
};

type MutableCardAggregate = {
  cardId: string;
  label: string;
  ownerSide: LorcanaPlayerSide | null;
  value: number;
  detail: string;
};

type MutableAbilityAggregate = {
  label: string;
  cardId: string | null;
  cardLabel: string | null;
  ownerSide: LorcanaPlayerSide | null;
  count: number;
};

export interface BuildPostGameSummaryInput {
  board: LorcanaProjectedBoardView;
  entries: MoveLogEntrySnapshot[];
  viewerSide?: LorcanaPlayerSide | null;
}

const PLAYER_SIDES: LorcanaPlayerSide[] = ["playerOne", "playerTwo"];

export function buildPostGameSummary(input: BuildPostGameSummaryInput): PostGameSummary {
  const viewerSide = input.viewerSide ?? null;
  const board = input.board;
  const cardReferenceMap = buildCardReferenceMap(board, input.entries);
  const countersBySide = {
    playerOne: createEmptyCounters(),
    playerTwo: createEmptyCounters(),
  } satisfies Record<LorcanaPlayerSide, PostGameActionCounters>;
  const loreContributors = new Map<string, MutableCardAggregate>();
  const playedCards = new Map<string, MutableCardAggregate>();
  const challengedCards = new Map<string, MutableCardAggregate>();
  const triggeredAbilities = new Map<string, MutableAbilityAggregate>();
  const highlights: PostGameHighlight[] = [];
  const forensics: PostGameForensicEntry[] = [];

  let firstChallengeHighlight: PostGameHighlight | null = null;
  let firstQuestHighlight: PostGameHighlight | null = null;
  let concedeHighlight: PostGameHighlight | null = null;

  for (const entry of input.entries) {
    const actorSide = resolveEntryActorSide(board, entry);
    const body = formatEventLogBody(entry, viewerSide);
    const typedMessages = collectTypedLorcanaMessages(entry);

    forensics.push({
      id: entry.id,
      turnNumber: entry.turnNumber,
      timestamp: entry.timestamp,
      moveId: entry.moveId,
      actorSide,
      actorTone: resolveActorTone(actorSide, viewerSide),
      text: body.text,
      source: body.source,
      typedMessages: typedMessages.map((message) => ({
        key: message.key,
        text: renderTypedMessageText(entry, message, viewerSide),
      })),
      cardReferences: (entry.rawLogRegistry?.cardReferences ?? []).map((card) => ({
        cardId: card.cardId,
        label: card.label,
        ownerSide: card.ownerSide,
      })),
    });

    if (!actorSide) {
      continue;
    }

    const counters = countersBySide[actorSide];
    switch (entry.moveId) {
      case "playCard": {
        counters.cardsPlayed += 1;
        const cardId = getStringValue(entry.rawLogRegistry?.move.params, "cardId");
        if (cardId) {
          incrementCardAggregate(
            playedCards,
            resolveCardAggregate(cardReferenceMap, cardId, actorSide, "Played"),
          );
        }
        break;
      }
      case "putCardIntoInkwell":
        counters.inked += 1;
        break;
      case "quest": {
        counters.quests += 1;
        applyLoreContribution(entry, actorSide, cardReferenceMap, loreContributors);
        if (!firstQuestHighlight) {
          firstQuestHighlight = {
            id: `highlight:${entry.id}:quest`,
            title: "Quest pressure started",
            detail: body.text,
            turnNumber: entry.turnNumber,
            actorSide,
          };
        }
        break;
      }
      case "questWithAll": {
        counters.quests += 1;
        applyLoreContribution(entry, actorSide, cardReferenceMap, loreContributors);
        if (!firstQuestHighlight) {
          firstQuestHighlight = {
            id: `highlight:${entry.id}:quest-all`,
            title: "Board-wide quest swing",
            detail: body.text,
            turnNumber: entry.turnNumber,
            actorSide,
          };
        }
        break;
      }
      case "challenge": {
        counters.challengeInitiations += 1;
        const attackerId = getStringValue(entry.rawLogRegistry?.move.params, "attackerId");
        const defenderId = getStringValue(entry.rawLogRegistry?.move.params, "defenderId");
        if (attackerId) {
          incrementCardAggregate(
            challengedCards,
            resolveCardAggregate(cardReferenceMap, attackerId, actorSide, "Challenge involvement"),
          );
        }
        if (defenderId) {
          incrementCardAggregate(
            challengedCards,
            resolveCardAggregate(
              cardReferenceMap,
              defenderId,
              actorSide === "playerOne" ? "playerTwo" : "playerOne",
              "Challenge involvement",
            ),
          );
        }
        if (!firstChallengeHighlight) {
          firstChallengeHighlight = {
            id: `highlight:${entry.id}:challenge`,
            title: "First challenge landed",
            detail: body.text,
            turnNumber: entry.turnNumber,
            actorSide,
          };
        }
        break;
      }
      case "moveCharacterToLocation":
        counters.movesToLocations += 1;
        break;
      case "activateAbility":
        counters.abilityActivations += 1;
        applyAbilityContribution(entry, actorSide, cardReferenceMap, triggeredAbilities);
        break;
      case "resolveBag":
      case "resolveEffect":
        counters.effectResolutions += 1;
        applyAbilityContribution(entry, actorSide, cardReferenceMap, triggeredAbilities);
        break;
      case "passTurn":
        counters.passes += 1;
        break;
      case "concede":
        counters.concedes += 1;
        concedeHighlight = {
          id: `highlight:${entry.id}:concede`,
          title: "The game ended by concession",
          detail: body.text,
          emphasis: true,
          turnNumber: entry.turnNumber,
          actorSide,
        };
        break;
      default:
        break;
    }
  }

  const outcome = buildOutcomeSummary(board, viewerSide);
  const outcomeTitle =
    outcome.viewerResult === "victory"
      ? "Victory secured"
      : outcome.viewerResult === "defeat"
        ? "Match slipped away"
        : "Match complete";
  const outcomeDetail =
    board.reason ??
    (outcome.winnerSide
      ? `${sideToLabel(outcome.winnerSide, viewerSide)} won on turn ${board.turnNumber}.`
      : `The game finished on turn ${board.turnNumber}.`);

  highlights.push({
    id: "highlight:outcome",
    title: outcomeTitle,
    detail: outcomeDetail,
    emphasis: true,
    turnNumber: board.turnNumber,
    actorSide: outcome.winnerSide,
  });

  if (concedeHighlight) {
    highlights.push(concedeHighlight);
  }
  if (firstQuestHighlight) {
    highlights.push(firstQuestHighlight);
  }
  if (firstChallengeHighlight) {
    highlights.push(firstChallengeHighlight);
  }

  const topLoreContributors = rankCardAggregates(loreContributors, "Lore generated");
  const mostPlayedCards = rankCardAggregates(playedCards, "Times played");
  const mostInvolvedChallengeCards = rankCardAggregates(challengedCards, "Challenges");
  const mostTriggeredAbilities = rankAbilityAggregates(triggeredAbilities);

  if (topLoreContributors[0]) {
    highlights.push({
      id: "highlight:top-lore-contributor",
      title: "Top lore contributor",
      detail: `${topLoreContributors[0].label} generated ${topLoreContributors[0].value} lore across the game.`,
      actorSide: topLoreContributors[0].ownerSide,
    });
  }
  if (mostPlayedCards[0]) {
    highlights.push({
      id: "highlight:most-played-card",
      title: "Most repeated play pattern",
      detail: `${mostPlayedCards[0].label} was played ${mostPlayedCards[0].value} time${mostPlayedCards[0].value === 1 ? "" : "s"}.`,
      actorSide: mostPlayedCards[0].ownerSide,
    });
  }

  return {
    board,
    outcome,
    players: {
      playerOne: buildPlayerBoardSummary(board, "playerOne"),
      playerTwo: buildPlayerBoardSummary(board, "playerTwo"),
    },
    countersBySide,
    topLoreContributors,
    mostPlayedCards,
    mostInvolvedChallengeCards,
    mostTriggeredAbilities,
    highlights: highlights.slice(0, 6),
    forensics,
    totalLogEntries: input.entries.length,
  };
}

function createEmptyCounters(): PostGameActionCounters {
  return {
    cardsPlayed: 0,
    inked: 0,
    quests: 0,
    challengeInitiations: 0,
    movesToLocations: 0,
    abilityActivations: 0,
    effectResolutions: 0,
    passes: 0,
    concedes: 0,
  };
}

function buildPlayerBoardSummary(board: LorcanaProjectedBoardView, side: LorcanaPlayerSide) {
  const ownerId = getOwnerIdForSide(board, side);
  const projected = ownerId ? board.players[ownerId] : null;
  const playCardIds = getZoneCardIds(board, side, "play");
  let readyCount = 0;
  let exertedCount = 0;

  for (const cardId of playCardIds) {
    if (board.cards[cardId]?.exerted) {
      exertedCount += 1;
    } else {
      readyCount += 1;
    }
  }

  return {
    side,
    lore: projected?.lore ?? 0,
    deckCount: projected?.deckCount ?? 0,
    handCount: projected?.handCount ?? 0,
    discardCount: projected?.discard.length ?? 0,
    inkwellCount: projected?.inkwell.length ?? 0,
    availableInk: getAvailableInkForSide(board, side),
    boardCount: playCardIds.length,
    readyCount,
    exertedCount,
  };
}

function buildOutcomeSummary(
  board: LorcanaProjectedBoardView,
  viewerSide: LorcanaPlayerSide | null,
) {
  const winnerSide = resolveWinnerSide(board);
  const loserSide =
    winnerSide === "playerOne" ? "playerTwo" : winnerSide === "playerTwo" ? "playerOne" : null;

  return {
    winnerSide,
    loserSide,
    reason: board.reason,
    finalTurnNumber: board.turnNumber,
    viewerSide,
    viewerResult:
      winnerSide && viewerSide
        ? winnerSide === viewerSide
          ? "victory"
          : "defeat"
        : viewerSide
          ? "unknown"
          : "spectator",
  } as const;
}

function resolveWinnerSide(board: LorcanaProjectedBoardView): LorcanaPlayerSide | null {
  if (typeof board.winner !== "string") {
    return null;
  }

  if (board.winner === "player_one") {
    return "playerOne";
  }

  if (board.winner === "player_two") {
    return "playerTwo";
  }

  return getSideForOwnerId(board, board.winner);
}

function buildCardReferenceMap(
  board: LorcanaProjectedBoardView,
  entries: MoveLogEntrySnapshot[],
): Map<string, CardReferenceMeta> {
  const cards = new Map<string, CardReferenceMeta>();

  for (const entry of entries) {
    for (const card of entry.rawLogRegistry?.cardReferences ?? []) {
      if (!cards.has(card.cardId)) {
        cards.set(card.cardId, {
          cardId: card.cardId,
          label: card.label,
          ownerSide: card.ownerSide,
          loreValue: card.loreValue ?? null,
        });
      }
    }
  }

  for (const side of PLAYER_SIDES) {
    for (const cardId of getZoneCardIds(board, side, "play")) {
      if (!cards.has(cardId)) {
        cards.set(cardId, {
          cardId,
          label: cardId,
          ownerSide: side,
          loreValue: board.cards[cardId]?.lore ?? null,
        });
      }
    }
  }

  return cards;
}

function resolveEntryActorSide(
  board: LorcanaProjectedBoardView,
  entry: MoveLogEntrySnapshot,
): LorcanaPlayerSide | null {
  if (entry.actorSide) {
    return entry.actorSide;
  }

  const rawPlayerId = entry.rawLogRegistry?.move.playerId;
  if (!rawPlayerId) {
    return null;
  }

  if (rawPlayerId === "player_one") {
    return "playerOne";
  }

  if (rawPlayerId === "player_two") {
    return "playerTwo";
  }

  return getSideForOwnerId(board, rawPlayerId);
}

function resolveActorTone(
  actorSide: LorcanaPlayerSide | null,
  viewerSide: LorcanaPlayerSide | null,
): PostGameActorTone {
  if (!actorSide) {
    return "system";
  }

  if (viewerSide && actorSide === viewerSide) {
    return "self";
  }

  if (viewerSide && actorSide !== viewerSide) {
    return "opponent";
  }

  return actorSide;
}

function renderTypedMessageText(
  entry: MoveLogEntrySnapshot,
  message: LorcanaLogMessage,
  viewerSide: LorcanaPlayerSide | null,
): string {
  const syntheticEntry: MoveLogEntrySnapshot = {
    ...entry,
    rawLogRegistry: {
      move: entry.rawLogRegistry?.move ?? {
        moveId: entry.moveId,
        params: entry.rawLogRegistry?.move.params,
        playerId: entry.rawLogRegistry?.move.playerId ?? "player_one",
        timestamp: entry.timestamp,
      },
      matchingMoveLogEntry: {
        sourceEventSeqs: [],
        defaultMessage: {
          key: message.key,
          values: message.values as unknown as SimulatorSerializedObject,
        } satisfies MoveLogDefaultMessageSnapshot,
      },
      relatedLogEntries: [],
      cardReferences: entry.rawLogRegistry?.cardReferences ?? [],
    },
  };

  return formatEventLogBody(syntheticEntry, viewerSide).text;
}

function resolveCardAggregate(
  cardReferenceMap: Map<string, CardReferenceMeta>,
  cardId: string,
  ownerSide: LorcanaPlayerSide | null,
  detail: string,
): MutableCardAggregate {
  const card = cardReferenceMap.get(cardId);

  return {
    cardId,
    label: card?.label ?? cardId,
    ownerSide: card?.ownerSide ?? ownerSide,
    value: 1,
    detail,
  };
}

function incrementCardAggregate(
  store: Map<string, MutableCardAggregate>,
  aggregate: MutableCardAggregate,
  incrementBy = 1,
): void {
  const existing = store.get(aggregate.cardId);
  if (existing) {
    existing.value += incrementBy;
    return;
  }

  store.set(aggregate.cardId, {
    ...aggregate,
    value: incrementBy,
  });
}

function applyLoreContribution(
  entry: MoveLogEntrySnapshot,
  actorSide: LorcanaPlayerSide,
  cardReferenceMap: Map<string, CardReferenceMeta>,
  store: Map<string, MutableCardAggregate>,
): void {
  const params = entry.rawLogRegistry?.move.params;

  if (entry.moveId === "quest") {
    const cardId = getStringValue(params, "cardId");
    if (!cardId) {
      return;
    }

    const loreGained = getNumericValueFromMessages(entry, "loreGained") ?? 0;
    incrementCardAggregate(
      store,
      resolveCardAggregate(cardReferenceMap, cardId, actorSide, "Lore generated"),
      Math.max(1, loreGained),
    );
    return;
  }

  if (entry.moveId !== "questWithAll") {
    return;
  }

  const cardIds = getStringArrayValue(params, "cardIds");
  if (cardIds.length === 0) {
    return;
  }

  const totalLore = getNumericValueFromMessages(entry, "loreGained") ?? cardIds.length;
  const knownLoreTotal = cardIds.reduce((sum, cardId) => {
    return sum + Math.max(0, cardReferenceMap.get(cardId)?.loreValue ?? 0);
  }, 0);

  const fallbackLore =
    knownLoreTotal > 0 ? null : Math.max(1, Math.floor(totalLore / Math.max(1, cardIds.length)));

  for (const [index, cardId] of cardIds.entries()) {
    const knownLore = cardReferenceMap.get(cardId)?.loreValue ?? null;
    const contribution =
      knownLore !== null && knownLore > 0
        ? knownLore
        : fallbackLore !== null
          ? fallbackLore
          : index === 0
            ? Math.max(1, totalLore - knownLoreTotal)
            : 1;

    incrementCardAggregate(
      store,
      resolveCardAggregate(cardReferenceMap, cardId, actorSide, "Lore generated"),
      Math.max(1, contribution),
    );
  }
}

function applyAbilityContribution(
  entry: MoveLogEntrySnapshot,
  actorSide: LorcanaPlayerSide,
  cardReferenceMap: Map<string, CardReferenceMeta>,
  store: Map<string, MutableAbilityAggregate>,
): void {
  const typedMessages = collectTypedLorcanaMessages(entry);
  let recorded = false;

  for (const message of typedMessages) {
    const abilityName =
      "abilityName" in message.values && typeof message.values.abilityName === "string"
        ? message.values.abilityName
        : null;
    const sourceCardId =
      ("cardId" in message.values && typeof message.values.cardId === "string"
        ? message.values.cardId
        : null) ??
      ("sourceId" in message.values && typeof message.values.sourceId === "string"
        ? message.values.sourceId
        : null) ??
      ("sourceCardId" in message.values && typeof message.values.sourceCardId === "string"
        ? message.values.sourceCardId
        : null);

    if (!abilityName && !sourceCardId) {
      continue;
    }

    const card = sourceCardId ? cardReferenceMap.get(sourceCardId) : null;
    const label = abilityName ?? card?.label ?? "Unnamed effect";
    const key = `${sourceCardId ?? "no-card"}:${label}`;
    const existing = store.get(key);

    if (existing) {
      existing.count += 1;
    } else {
      store.set(key, {
        label,
        cardId: sourceCardId,
        cardLabel: card?.label ?? null,
        ownerSide: card?.ownerSide ?? actorSide,
        count: 1,
      });
    }
    recorded = true;
  }

  if (recorded) {
    return;
  }

  if (entry.moveId !== "activateAbility") {
    return;
  }

  const sourceCardId = getStringValue(entry.rawLogRegistry?.move.params, "cardId");
  if (!sourceCardId) {
    return;
  }

  const card = cardReferenceMap.get(sourceCardId);
  const key = `${sourceCardId}:Activated ability`;
  const existing = store.get(key);
  if (existing) {
    existing.count += 1;
    return;
  }

  store.set(key, {
    label: "Activated ability",
    cardId: sourceCardId,
    cardLabel: card?.label ?? null,
    ownerSide: card?.ownerSide ?? actorSide,
    count: 1,
  });
}

function rankCardAggregates(
  store: Map<string, MutableCardAggregate>,
  detailLabel: string,
): PostGameSpotlightCard[] {
  return [...store.values()]
    .sort((left, right) => {
      if (right.value !== left.value) {
        return right.value - left.value;
      }
      return left.label.localeCompare(right.label);
    })
    .slice(0, 5)
    .map((entry) => ({
      id: entry.cardId,
      cardId: entry.cardId,
      label: entry.label,
      ownerSide: entry.ownerSide,
      value: entry.value,
      detail: `${detailLabel}: ${entry.value}`,
    }));
}

function rankAbilityAggregates(
  store: Map<string, MutableAbilityAggregate>,
): PostGameSpotlightAbility[] {
  return [...store.entries()]
    .sort(([, left], [, right]) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }
      return left.label.localeCompare(right.label);
    })
    .slice(0, 5)
    .map(([id, entry]) => ({
      id,
      label: entry.label,
      cardId: entry.cardId,
      cardLabel: entry.cardLabel,
      ownerSide: entry.ownerSide,
      count: entry.count,
    }));
}

function getNumericValueFromMessages(entry: MoveLogEntrySnapshot, key: string): number | null {
  const typedMessages = collectTypedLorcanaMessages(entry);

  for (const message of typedMessages) {
    const candidate = message.values[key as keyof typeof message.values];
    if (typeof candidate === "number") {
      return candidate;
    }
  }

  const raw = entry.rawLogRegistry?.move.params?.[key];
  return typeof raw === "number" ? raw : null;
}

function getStringValue(values: SimulatorSerializedObject | undefined, key: string): string | null {
  const candidate = values?.[key];
  return typeof candidate === "string" ? candidate : null;
}

function getStringArrayValue(values: SimulatorSerializedObject | undefined, key: string): string[] {
  const candidate = values?.[key];
  if (!Array.isArray(candidate)) {
    return [];
  }

  return candidate.filter((value): value is string => typeof value === "string");
}

function sideToLabel(side: LorcanaPlayerSide, viewerSide: LorcanaPlayerSide | null): string {
  if (viewerSide && side === viewerSide) {
    return "You";
  }

  if (viewerSide && side !== viewerSide) {
    return "Opponent";
  }

  return side === "playerOne" ? "Player One" : "Player Two";
}
