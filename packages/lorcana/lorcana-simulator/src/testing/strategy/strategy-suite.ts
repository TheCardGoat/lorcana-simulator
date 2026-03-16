import { appendFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  AutomatedActionDecisionTrace,
  AutomatedActionFallback,
  AutomatedActionSearchCaps,
  AutomatedActionStrategy,
  PlayerId,
} from "@tcg/lorcana-engine";
import { computeAutomatedActionStateFingerprint } from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import {
  amberAmethystAggressive,
  amberAmethystControl,
  emeraldAmethystInk,
  steelSapphireMidrange,
  type DeckFixture,
} from "../../lib/features/simulator-devtools/deck-fixtures/index.js";
import {
  createFixture,
  type LorcanaSimulatorFixtureInput,
} from "../../lib/features/simulator-devtools/fixtures/fixture-factory.js";
import { configureStrategySuiteLogging } from "./configure-strategy-logging.js";
import {
  createRepeatedStateDeadlockTracker,
  resolveStrategyMatchEndReason,
  type StrategyMatchEndReason,
} from "./deadlock.js";

type StrategyDeck = {
  fixture: DeckFixture;
  id: string;
  strategy?: AutomatedActionStrategy;
};
type StrategyPlayerSlot = "player_one" | "player_two";
type StrategyLoreTotals = Record<StrategyPlayerSlot, number>;

export type StrategyDeckMatchInput = {
  fixture: DeckFixture;
  id?: string;
  strategy?: AutomatedActionStrategy;
};

type StrategyMatchDefinition = {
  id: string;
  playerOne: StrategyDeck;
  playerTwo: StrategyDeck;
  seed: string;
};

export type StrategyMatchSimulationOptions = {
  actionLimit?: number;
  artifactRoot?: string;
  includeGameLogTranscript?: boolean;
  matchId?: string;
  playerOne: StrategyDeckMatchInput;
  playerTwo: StrategyDeckMatchInput;
  repeatThreshold?: number;
  searchCaps?: Partial<AutomatedActionSearchCaps>;
  seed?: string;
  turnLimit?: number;
};

export type StrategyDecisionLogEntry = AutomatedActionDecisionTrace & {
  matchId: string;
  moveNumber: number;
  playerOneDeckId: string;
  playerTwoDeckId: string;
  seed: string;
};

export type StrategyMatchSummary = {
  actions: number;
  artifactPaths: {
    gameRuntime: string;
    strategyDecisions: string;
  };
  deadlock: boolean;
  diagnosticCounts: {
    actorResolution: number;
    total: number;
    unsupported: number;
    validation: number;
  };
  endReason: StrategyMatchEndReason;
  fallbackCounts: Record<AutomatedActionFallback, number>;
  gameEndReason?: string;
  gameLogTranscript?: string[];
  loreTotals: StrategyLoreTotals;
  matchId: string;
  outcome: "terminated" | "winner";
  playerOneDeckId: string;
  playerTwoDeckId: string;
  seed: string;
  turns: number;
  winner?: PlayerId;
};

export type StrategySuiteRunSummary = {
  artifactRoot: string;
  generatedAt: string;
  matches: StrategyMatchSummary[];
};

type StrategyGameLogEntry = ReturnType<
  ReturnType<ReturnType<LorcanaMultiplayerTestEngine["asServer"]>["getRuntime"]>["getGameLog"]
>[number];
type StrategyExecutionTrace = StrategyDecisionLogEntry;

const STRATEGY_ARTIFACT_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../../../.artifacts/strategy/latest",
);
const STRATEGY_SIMULATION_SEARCH_CAPS: Partial<AutomatedActionSearchCaps> = {
  choiceIndices: 16,
  singerCombinations: 32,
  targetCombinationsPerFamily: 48,
  targetPool: 16,
};

const CURATED_V1_DECKS: StrategyDeck[] = [
  { fixture: amberAmethystAggressive, id: "amberAmethystAggressive" },
  { fixture: amberAmethystControl, id: "amberAmethystControl" },
  { fixture: steelSapphireMidrange, id: "steelSapphireMidrange" },
  { fixture: emeraldAmethystInk, id: "emeraldAmethystInk" },
];

function sanitizeMatchSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9-]+/g, "-");
}

function normalizeStrategyDeck(input: StrategyDeckMatchInput): StrategyDeck {
  return {
    fixture: input.fixture,
    id: input.id ?? sanitizeMatchSegment(input.fixture.name),
    strategy: input.strategy,
  };
}

function buildMatchDefinitions(): StrategyMatchDefinition[] {
  const matchDefinitions: StrategyMatchDefinition[] = [];

  for (let index = 0; index < CURATED_V1_DECKS.length; index += 1) {
    for (
      let opponentIndex = index + 1;
      opponentIndex < CURATED_V1_DECKS.length;
      opponentIndex += 1
    ) {
      const leftDeck = CURATED_V1_DECKS[index]!;
      const rightDeck = CURATED_V1_DECKS[opponentIndex]!;
      const forwardId = `${sanitizeMatchSegment(leftDeck.id)}-vs-${sanitizeMatchSegment(rightDeck.id)}-p1`;
      const reverseId = `${sanitizeMatchSegment(rightDeck.id)}-vs-${sanitizeMatchSegment(leftDeck.id)}-p1`;

      matchDefinitions.push({
        id: forwardId,
        playerOne: leftDeck,
        playerTwo: rightDeck,
        seed: `strategy-suite:${forwardId}`,
      });
      matchDefinitions.push({
        id: reverseId,
        playerOne: rightDeck,
        playerTwo: leftDeck,
        seed: `strategy-suite:${reverseId}`,
      });
    }
  }

  return matchDefinitions;
}

function createFixturePlayer(deckText: string): LorcanaSimulatorFixtureInput["playerOne"] {
  return {
    deck: deckText,
  };
}

function buildDecisionEntry(args: {
  match: StrategyMatchDefinition;
  moveNumber: number;
  trace: AutomatedActionDecisionTrace;
}): StrategyDecisionLogEntry {
  const { match, moveNumber, trace } = args;

  return {
    ...trace,
    matchId: match.id,
    moveNumber,
    playerOneDeckId: match.playerOne.id,
    playerTwoDeckId: match.playerTwo.id,
    seed: match.seed,
  };
}

function countFallbacks(
  entries: readonly StrategyDecisionLogEntry[],
): Record<AutomatedActionFallback, number> {
  return entries.reduce<Record<AutomatedActionFallback, number>>(
    (counts, entry) => {
      if (entry.fallbackTaken) {
        counts[entry.fallbackTaken] += 1;
      }

      return counts;
    },
    {
      concede: 0,
      passTurn: 0,
    },
  );
}

function countDiagnostics(entries: readonly StrategyDecisionLogEntry[]) {
  return entries.reduce(
    (counts, entry) => {
      counts.total += entry.diagnostics.length;
      counts.unsupported += entry.unsupportedSkips.length;
      counts.validation += entry.validationSkips.length;
      counts.actorResolution += entry.diagnostics.filter(
        (diagnostic) => diagnostic.kind === "actor-resolution",
      ).length;

      return counts;
    },
    {
      actorResolution: 0,
      total: 0,
      unsupported: 0,
      validation: 0,
    },
  );
}

function ensureLatestArtifactRoot(): void {
  rmSync(STRATEGY_ARTIFACT_ROOT, { force: true, recursive: true });
  mkdirSync(STRATEGY_ARTIFACT_ROOT, { recursive: true });
}

function writeJsonlRecord(path: string, value: object): void {
  appendFileSync(path, `${JSON.stringify(value)}\n`, "utf8");
}

function resolveStrategyPlayerLabel(
  playerId: string | null | undefined,
  match: StrategyMatchDefinition,
): string {
  if (!playerId) {
    return "unknown-player";
  }

  if (playerId === "player_one") {
    return `P1 (${match.playerOne.id})`;
  }

  if (playerId === "player_two") {
    return `P2 (${match.playerTwo.id})`;
  }

  return playerId;
}

function resolveStrategyCardName(
  engine: LorcanaMultiplayerTestEngine,
  cardId: string | null | undefined,
): string | undefined {
  if (!cardId) {
    return undefined;
  }

  const card = engine.getCardDefinition(cardId);
  return card.version ? `${card.name} - ${card.version}` : card.name;
}

function resolveStrategyPlayerId(playerId: string | undefined): PlayerId | undefined {
  if (playerId === "player_one" || playerId === "player_two") {
    return playerId as PlayerId;
  }

  return undefined;
}

function getLoreTotal(loreTotals: StrategyLoreTotals, playerId: PlayerId): number {
  return playerId === "player_one" ? loreTotals.player_one : loreTotals.player_two;
}

function normalizeLoreTotals(loreTotals: Readonly<Record<PlayerId, number>>): StrategyLoreTotals {
  const playerOneId = resolveStrategyPlayerId("player_one");
  const playerTwoId = resolveStrategyPlayerId("player_two");

  if (!playerOneId || !playerTwoId) {
    throw new Error("Unable to resolve strategy player ids");
  }

  return {
    player_one: loreTotals[playerOneId] ?? 0,
    player_two: loreTotals[playerTwoId] ?? 0,
  };
}

function getStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function formatVisibility(entry: StrategyGameLogEntry): string {
  switch (entry.visibility.mode) {
    case "PUBLIC":
      return "public";
    case "PRIVATE":
      return `private:${entry.visibility.visibleTo.join(",")}`;
    case "PUBLIC_WITH_OVERRIDES":
      return "public-with-overrides";
  }

  throw new Error(`Unhandled log visibility mode: ${String(entry.visibility)}`);
}

function getExecutionTraces(
  entries: readonly StrategyDecisionLogEntry[],
): StrategyExecutionTrace[] {
  return entries.filter((entry): entry is StrategyExecutionTrace => entry.kind === "execution");
}

function formatQuestDetail(args: {
  actorLabel: string;
  actorId: PlayerId;
  afterLoreTotals: StrategyLoreTotals;
  beforeLoreTotals: StrategyLoreTotals;
  cardId: string;
  engine: LorcanaMultiplayerTestEngine;
  prefix: string;
}): string {
  const { actorLabel, actorId, afterLoreTotals, beforeLoreTotals, cardId, engine, prefix } = args;
  const cardName = resolveStrategyCardName(engine, cardId) ?? cardId;
  const beforeLore = getLoreTotal(beforeLoreTotals, actorId);
  const afterLore = getLoreTotal(afterLoreTotals, actorId);
  const delta = afterLore - beforeLore;
  return `${prefix} ${actorLabel}: Quested with ${cardName} for ${delta} lore (total: ${afterLore})`;
}

function formatFallbackDetail(args: {
  actorLabel: string;
  move: string;
  prefix: string;
  trace: StrategyExecutionTrace;
}): string | undefined {
  const { actorLabel, move, prefix, trace } = args;
  if (trace.fallbackTaken !== move) {
    return undefined;
  }

  if (move === "passTurn") {
    return `${prefix} ${actorLabel}: Passed turn as fallback after no valid action candidates remained`;
  }

  if (move === "concede") {
    return `${prefix} ${actorLabel}: Conceded as fallback after no valid action candidates remained`;
  }

  return undefined;
}

function formatLoreDeltaDetail(args: {
  actorLabel: string;
  actorId: PlayerId;
  afterLoreTotals: StrategyLoreTotals;
  beforeLoreTotals: StrategyLoreTotals;
  move: string;
  prefix: string;
}): string | undefined {
  const { actorLabel, actorId, afterLoreTotals, beforeLoreTotals, move, prefix } = args;
  const beforeLore = getLoreTotal(beforeLoreTotals, actorId);
  const afterLore = getLoreTotal(afterLoreTotals, actorId);
  const delta = afterLore - beforeLore;

  if (delta <= 0) {
    return undefined;
  }

  return `${prefix} ${actorLabel}: executed ${move} and gained ${delta} lore (total: ${afterLore})`;
}

function formatCandidateActionDetail(args: {
  actorLabel: string;
  actorId: PlayerId;
  afterLoreTotals: StrategyLoreTotals;
  beforeLoreTotals: StrategyLoreTotals;
  engine: LorcanaMultiplayerTestEngine;
  move: string;
  prefix: string;
  trace: StrategyExecutionTrace;
}): string | undefined {
  const { actorLabel, actorId, afterLoreTotals, beforeLoreTotals, engine, move, prefix, trace } =
    args;
  const fallbackDetail = formatFallbackDetail({ actorLabel, move, prefix, trace });
  if (fallbackDetail) {
    return fallbackDetail;
  }

  const candidate = trace.selectedCandidate?.candidate;
  if (!candidate) {
    return undefined;
  }

  if (candidate.family !== move) {
    return undefined;
  }

  if (candidate.family === "quest") {
    return formatQuestDetail({
      actorLabel,
      actorId,
      afterLoreTotals,
      beforeLoreTotals,
      cardId: candidate.cardId,
      engine,
      prefix,
    });
  }

  return formatLoreDeltaDetail({
    actorLabel,
    actorId,
    afterLoreTotals,
    beforeLoreTotals,
    move,
    prefix,
  });
}

function resolveTraceMoveId(trace: StrategyExecutionTrace): string | undefined {
  return trace.fallbackTaken ?? trace.selectedCandidate?.candidate.family;
}

function formatGameLogEntry(args: {
  executionTraces: readonly StrategyExecutionTrace[];
  finalLoreTotals: StrategyLoreTotals;
  engine: LorcanaMultiplayerTestEngine;
  entry: StrategyGameLogEntry;
  match: StrategyMatchDefinition;
  nextExecutionTraceIndex: number;
}): { line: string; nextMoveHistoryCursor: number } {
  const { engine, entry, executionTraces, finalLoreTotals, match, nextExecutionTraceIndex } = args;
  const prefix = `[seq:${entry.seq}] [${entry.category}] [${formatVisibility(entry)}]`;
  const message = entry.defaultMessage;

  if (!message) {
    return {
      line: `${prefix} log entry emitted without default message`,
      nextMoveHistoryCursor: nextExecutionTraceIndex,
    };
  }

  switch (message.key) {
    case "move.executed": {
      const move = typeof message.values.move === "string" ? message.values.move : "unknown-move";
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const resolvedPlayerId = resolveStrategyPlayerId(playerId);
      const actorLabel = resolveStrategyPlayerLabel(playerId, match);
      const executionTrace = executionTraces[nextExecutionTraceIndex];
      const traceMatchesLog =
        Boolean(executionTrace) &&
        resolvedPlayerId === executionTrace?.actorId &&
        move === resolveTraceMoveId(executionTrace);

      if (traceMatchesLog && executionTrace && resolvedPlayerId) {
        const afterLoreTotals = executionTraces[nextExecutionTraceIndex + 1]
          ? normalizeLoreTotals(
              executionTraces[nextExecutionTraceIndex + 1].boardSnapshot.loreTotals,
            )
          : finalLoreTotals;
        const detail = formatCandidateActionDetail({
          actorLabel,
          actorId: resolvedPlayerId,
          afterLoreTotals,
          beforeLoreTotals: normalizeLoreTotals(executionTrace.boardSnapshot.loreTotals),
          engine,
          move,
          prefix,
          trace: executionTrace,
        });

        if (detail) {
          return {
            line: detail,
            nextMoveHistoryCursor: nextExecutionTraceIndex + 1,
          };
        }

        return {
          line: `${prefix} ${actorLabel}: executed ${move}`,
          nextMoveHistoryCursor: nextExecutionTraceIndex + 1,
        };
      }

      return {
        line: `${prefix} ${actorLabel}: executed ${move}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "turn.started": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const turn = typeof message.values.turn === "number" ? message.values.turn : "?";
      const phase = typeof message.values.phase === "string" ? message.values.phase : undefined;
      const actorLabel = resolveStrategyPlayerLabel(playerId, match);
      return {
        line: `${prefix} Turn ${turn} started for ${actorLabel}${phase ? ` (${phase})` : ""}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "priority.passed": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} passed priority`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "game.ended": {
      const winner = typeof message.values.winner === "string" ? message.values.winner : undefined;
      const reason =
        typeof message.values.reason === "string" && message.values.reason.length > 0
          ? message.values.reason
          : "unspecified";
      return {
        line: `${prefix} Game ended. Winner: ${resolveStrategyPlayerLabel(winner, match)}. Reason: ${reason}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "card.moved": {
      const cardId = typeof message.values.cardId === "string" ? message.values.cardId : undefined;
      const fromZone =
        typeof message.values.fromZone === "string" ? message.values.fromZone : "unknown-zone";
      const toZone =
        typeof message.values.toZone === "string" ? message.values.toZone : "unknown-zone";
      const cardName = resolveStrategyCardName(engine, cardId) ?? cardId ?? "unknown-card";
      return {
        line: `${prefix} ${cardName} moved from ${fromZone} to ${toZone}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "cards.drawn": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const count = typeof message.values.count === "number" ? message.values.count : "?";
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} drew ${count} card${count === 1 ? "" : "s"}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.setup.firstPlayerChosen": {
      const chooser =
        typeof message.values.chooser === "string" ? message.values.chooser : undefined;
      const chosen = typeof message.values.chosen === "string" ? message.values.chosen : undefined;
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(chooser, match)} chose ${resolveStrategyPlayerLabel(chosen, match)} to start`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.setup.mulligan.count": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const count = typeof message.values.count === "number" ? message.values.count : 0;
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} mulliganed ${count} card${count === 1 ? "" : "s"}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.setup.mulligan.detail": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const mulliganed = getStringArray(message.values.mulliganed).map(
        (cardId) => resolveStrategyCardName(engine, cardId) ?? cardId,
      );
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} mulliganed: ${mulliganed.join(", ") || "none"}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.setup.done":
      return {
        line: `${prefix} Setup completed`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };

    case "lorcana.ability.activated": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const cardId = typeof message.values.cardId === "string" ? message.values.cardId : undefined;
      const abilityName =
        typeof message.values.abilityName === "string" ? message.values.abilityName : undefined;
      const cardName = resolveStrategyCardName(engine, cardId) ?? cardId ?? "unknown-card";
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} activated ${abilityName ? `${cardName} (${abilityName})` : cardName}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.card.inked": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const cardId = typeof message.values.cardId === "string" ? message.values.cardId : undefined;
      const cardName = resolveStrategyCardName(engine, cardId) ?? cardId ?? "unknown-card";
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} inked ${cardName}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.scry.count": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const count = typeof message.values.count === "number" ? message.values.count : 0;
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} scried ${count} card${count === 1 ? "" : "s"}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    case "lorcana.scry.detail": {
      const playerId =
        typeof message.values.playerId === "string" ? message.values.playerId : undefined;
      const lookedAt = getStringArray(message.values.lookedAt).map(
        (cardId) => resolveStrategyCardName(engine, cardId) ?? cardId,
      );
      return {
        line: `${prefix} ${resolveStrategyPlayerLabel(playerId, match)} looked at: ${lookedAt.join(", ") || "unknown cards"}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
    }

    default:
      return {
        line: `${prefix} ${message.key} ${JSON.stringify(message.values)}`,
        nextMoveHistoryCursor: nextExecutionTraceIndex,
      };
  }
}

function buildGameLogTranscript(
  engine: LorcanaMultiplayerTestEngine,
  decisionEntries: readonly StrategyDecisionLogEntry[],
  finalLoreTotals: StrategyLoreTotals,
  match: StrategyMatchDefinition,
): string[] {
  const executionTraces = getExecutionTraces(decisionEntries);
  let moveHistoryCursor = 0;

  return engine
    .asServer()
    .getRuntime()
    .getGameLog()
    .map((entry) => {
      const formatted = formatGameLogEntry({
        executionTraces,
        finalLoreTotals,
        engine,
        entry,
        match,
        nextExecutionTraceIndex: moveHistoryCursor,
      });
      moveHistoryCursor = formatted.nextMoveHistoryCursor;
      return formatted.line;
    });
}

function createMatchFixture(match: StrategyMatchDefinition) {
  return createFixture({
    description: `Strategy evaluation fixture for ${match.playerOne.id} versus ${match.playerTwo.id}.`,
    id: match.id,
    name: `${match.playerOne.fixture.name} vs ${match.playerTwo.fixture.name}`,
    playerOne: createFixturePlayer(match.playerOne.fixture.cards),
    playerTwo: createFixturePlayer(match.playerTwo.fixture.cards),
    seed: match.seed,
    skipPreGame: false,
  });
}

function getStrategyForActor(
  match: StrategyMatchDefinition,
  actorId: PlayerId | undefined,
): AutomatedActionStrategy | undefined {
  if (actorId === "player_one") {
    return match.playerOne.strategy;
  }

  if (actorId === "player_two") {
    return match.playerTwo.strategy;
  }

  return undefined;
}

function runStrategyMatch(
  match: StrategyMatchDefinition,
  options: {
    actionLimit?: number;
    artifactRoot?: string;
    includeGameLogTranscript?: boolean;
    repeatThreshold?: number;
    searchCaps?: Partial<AutomatedActionSearchCaps>;
    turnLimit?: number;
  } = {},
): StrategyMatchSummary {
  const matchArtifactRoot = join(options.artifactRoot ?? STRATEGY_ARTIFACT_ROOT, match.id);
  mkdirSync(matchArtifactRoot, { recursive: true });

  const strategyDecisionsPath = join(matchArtifactRoot, "strategy-decisions.jsonl");
  const gameRuntimePath = join(matchArtifactRoot, "game-runtime.jsonl");

  writeFileSync(strategyDecisionsPath, "");
  configureStrategySuiteLogging(gameRuntimePath);

  const fixture = createMatchFixture(match);
  const engine = LorcanaMultiplayerTestEngine.createWithFixture(
    fixture.playerOne,
    fixture.playerTwo,
    {
      seed: match.seed,
      skipPreGame: false,
    },
  );

  const decisionEntries: StrategyDecisionLogEntry[] = [];
  const repeatedStateTracker = createRepeatedStateDeadlockTracker(options.repeatThreshold);
  let actionCount = 0;
  let pendingDeadlock = false;

  const traceSink = {
    push(trace: AutomatedActionDecisionTrace) {
      const entry = buildDecisionEntry({
        match,
        moveNumber: decisionEntries.length + 1,
        trace,
      });

      decisionEntries.push(entry);
      writeJsonlRecord(strategyDecisionsPath, entry);
    },
  };

  let endReason: StrategyMatchEndReason | undefined;

  while (!endReason) {
    const server = engine.asServer();
    const winner = server.getWinner();

    endReason = resolveStrategyMatchEndReason({
      actionCount,
      actionLimit: options.actionLimit,
      pendingDeadlock,
      turnLimit: options.turnLimit,
      turnNumber: server.getTurnNumber(),
      winner,
    });

    if (endReason) {
      break;
    }

    const fingerprint = computeAutomatedActionStateFingerprint(server.getState());
    const { actorId } = server.enumerateAutomatedActionsForCurrentActor();
    const strategy = getStrategyForActor(match, actorId);
    const result = server.takeAutomatedActionForCurrentActor({
      searchCaps: options.searchCaps ?? STRATEGY_SIMULATION_SEARCH_CAPS,
      strategy,
      traceSink,
    });
    actionCount += 1;

    const observation = repeatedStateTracker.observe({
      actorId: result.actorId,
      stateFingerprint: fingerprint,
    });
    pendingDeadlock = observation.repeatedStateDeadlock;
  }

  const finalState = engine.asServer().getState();
  const winner = engine.asServer().getWinner();
  const loreTotals = normalizeLoreTotals(finalState.G.lore);
  const gameLogTranscript = options.includeGameLogTranscript
    ? buildGameLogTranscript(engine, decisionEntries, loreTotals, match)
    : undefined;

  return {
    actions: actionCount,
    artifactPaths: {
      gameRuntime: gameRuntimePath,
      strategyDecisions: strategyDecisionsPath,
    },
    deadlock: endReason === "repeated-state-deadlock",
    diagnosticCounts: countDiagnostics(decisionEntries),
    endReason: endReason ?? "winner",
    fallbackCounts: countFallbacks(decisionEntries),
    ...(finalState.ctx.status.reason ? { gameEndReason: finalState.ctx.status.reason } : {}),
    ...(gameLogTranscript ? { gameLogTranscript } : {}),
    loreTotals,
    matchId: match.id,
    outcome: endReason === "winner" ? "winner" : "terminated",
    playerOneDeckId: match.playerOne.id,
    playerTwoDeckId: match.playerTwo.id,
    seed: match.seed,
    turns: engine.asServer().getTurnNumber(),
    ...(winner ? { winner } : {}),
  };
}

export function getStrategyArtifactRoot(): string {
  return STRATEGY_ARTIFACT_ROOT;
}

export function simulateAutomatedDeckMatch(
  options: StrategyMatchSimulationOptions,
): StrategyMatchSummary {
  const playerOne = normalizeStrategyDeck(options.playerOne);
  const playerTwo = normalizeStrategyDeck(options.playerTwo);
  const matchId =
    options.matchId ??
    `${sanitizeMatchSegment(playerOne.id)}-vs-${sanitizeMatchSegment(playerTwo.id)}`;

  return runStrategyMatch(
    {
      id: matchId,
      playerOne,
      playerTwo,
      seed: options.seed ?? `strategy-suite:${matchId}`,
    },
    {
      actionLimit: options.actionLimit,
      artifactRoot: options.artifactRoot,
      includeGameLogTranscript: options.includeGameLogTranscript,
      repeatThreshold: options.repeatThreshold,
      searchCaps: options.searchCaps,
      turnLimit: options.turnLimit,
    },
  );
}

export function runCuratedStrategySuite(): StrategySuiteRunSummary {
  ensureLatestArtifactRoot();

  const matches = buildMatchDefinitions().map((match) => runStrategyMatch(match));
  const summary: StrategySuiteRunSummary = {
    artifactRoot: STRATEGY_ARTIFACT_ROOT,
    generatedAt: new Date().toISOString(),
    matches,
  };

  writeFileSync(
    join(STRATEGY_ARTIFACT_ROOT, "run-summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );

  return summary;
}

export function strategyArtifactsExist(summary: StrategySuiteRunSummary): boolean {
  return summary.matches.every(
    (match) =>
      existsSync(match.artifactPaths.strategyDecisions) &&
      existsSync(match.artifactPaths.gameRuntime),
  );
}
