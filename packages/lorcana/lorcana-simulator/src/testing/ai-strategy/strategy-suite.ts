import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
  AutomatedActionStrategyOption,
  AutomatedActionDecisionTrace,
  AutomatedActionFallback,
  AutomatedActionSearchCaps,
  AutomatedActionStrategy,
  PlayerId,
} from "@tcg/lorcana-engine";
import {
  AUTOMATED_ACTION_STRATEGIES,
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  computeAutomatedActionStateFingerprint,
} from "@tcg/lorcana-engine";
import { LorcanaMultiplayerTestEngine } from "@tcg/lorcana-engine/testing";
import {
  DECK_FIXTURES,
  type DeckFixture,
} from "../../lib/features/simulator-devtools/deck-fixtures/index.js";
import {
  createFixture,
  type LorcanaSimulatorFixtureInput,
} from "../../lib/features/simulator-devtools/fixtures/fixture-factory.js";
import { configureStrategySuiteLogging } from "./configure-strategy-logging.js";
import {
  createRepeatedStateDeadlockTracker,
  resolveRepeatedStateDeadlockByConceding,
  resolveStrategyMatchEndReason,
  type StrategyMatchEndReason,
} from "./deadlock.js";
import {
  CORE_STRATEGY_BENCHMARK_DECK_IDS,
  FULL_STRATEGY_REGRESSION_DECK_IDS,
  PROMOTED_STRATEGY_BASELINE_ID,
  getStrategyCandidateManifests,
  type StrategyBenchmarkPreset,
  type StrategyCandidateManifest,
} from "./strategy-iteration.js";
export { resolveStrategyBenchmarkPreset } from "./strategy-iteration.js";

type StrategyDeck = {
  fixture: DeckFixture;
  id: string;
  strategy?: AutomatedActionStrategy;
  strategyId: string;
};
type StrategyPlayerSlot = "player_one" | "player_two";
type StrategyLoreTotals = Record<StrategyPlayerSlot, number>;

export type StrategyLabMatchMode = "mirror" | "cross-deck" | "both";

export type StrategyDeckMatchInput = {
  fixture: DeckFixture;
  id?: string;
  strategy?: AutomatedActionStrategy;
  strategyId?: string;
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

export type StrategyLabOptions = {
  artifactRoot?: string;
  baselineStrategyId?: string;
  candidateManifests?: StrategyCandidateManifest[];
  crossDeckGameCount?: number;
  deckIds?: string[];
  gameCount?: number;
  matchMode?: StrategyLabMatchMode;
  mirrorGameCount?: number;
  preset?: StrategyBenchmarkPreset;
  strategyIds?: string[];
};

export type StrategyLabGameCounts = {
  crossDeck: number;
  mirror: number;
};

export type StrategyDecisionLogEntry = AutomatedActionDecisionTrace & {
  matchId: string;
  moveNumber: number;
  playerOneDeckId: string;
  playerOneStrategyId: string;
  playerTwoDeckId: string;
  playerTwoStrategyId: string;
  seed: string;
};

export type StrategyMatchSummary = {
  actions: number;
  artifactPaths: {
    gameRuntime: string;
    strategyDecisions: string;
  };
  deadlockConcedeCount: number;
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
  playerOneStrategyId: string;
  playerTwoDeckId: string;
  playerTwoStrategyId: string;
  seed: string;
  turns: number;
  winner?: PlayerId;
};

export type StrategySuiteRunSummary = {
  artifactRoot: string;
  baselineStrategyId: string;
  candidateManifests: StrategyCandidateManifest[];
  deckIds: string[];
  gameCount: number;
  gameCounts: StrategyLabGameCounts;
  generatedAt: string;
  matches: StrategyMatchSummary[];
  mode: StrategyLabMatchMode | "curated";
  preset?: StrategyBenchmarkPreset;
  strategyIds: string[];
};

export type StrategyLabMatchClassification = "mirror" | "mirror-same-strategy" | "cross-deck";
export type StrategyLabTriageCategory =
  | "over-inking"
  | "missed-challenge"
  | "bad-play-before-quest"
  | "bad-ability-timing"
  | "fallback-churn";

type StrategyFallbackCounts = StrategyMatchSummary["fallbackCounts"];
type StrategyDiagnosticCounts = StrategyMatchSummary["diagnosticCounts"];

export type StrategyLabStrategyRecord = {
  averageActions: number;
  averageTurns: number;
  deadlockConcedeCount: number;
  deadlockGames: number;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  losses: number;
  noWinnerGames: number;
  strategyId: string;
  winRate: number;
  wins: number;
};

export type StrategyLabMirrorDeckRecord = {
  averageActions: number;
  averageTurns: number;
  classification: "mirror" | "mirror-same-strategy";
  deadlockConcedeCount: number;
  deadlockGames: number;
  deckId: string;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  noWinnerGames: number;
  strategyPairId: string;
  strategyPairLabel: string;
  wins: Record<string, number>;
};

export type StrategyLabMirrorStrategyPairRecord = {
  averageActions: number;
  averageTurns: number;
  classification: "mirror" | "mirror-same-strategy";
  deadlockConcedeCount: number;
  deadlockGames: number;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  noWinnerGames: number;
  strategyPairId: string;
  strategyPairLabel: string;
  wins: Record<string, number>;
};

export type StrategyLabCrossDeckDeckRecord = {
  averageActions: number;
  averageTurns: number;
  deadlockConcedeCount: number;
  deadlockGames: number;
  deckId: string;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  losses: number;
  noWinnerGames: number;
  strategyId: string;
  winRate: number;
  wins: number;
};

export type StrategyLabCrossDeckOrderedPairRecord = {
  averageActions: number;
  averageTurns: number;
  deadlockConcedeCount: number;
  deadlockGames: number;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  noWinnerGames: number;
  orderedDeckPairId: string;
  orderedDeckPairLabel: string;
  playerOneDeckId: string;
  playerOneStrategyId: string;
  playerTwoDeckId: string;
  playerTwoStrategyId: string;
  wins: Record<string, number>;
};

export type StrategyLabWorstMatchupRecord = {
  averageActions: number;
  averageTurns: number;
  classification: StrategyLabMatchClassification;
  deadlockConcedeCount: number;
  deadlockGames: number;
  deckId: string;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  label: string;
  losses: number;
  matchIds: string[];
  noWinnerGames: number;
  opponentDeckId: string;
  opponentStrategyId: string;
  strategyId: string;
  winRate: number;
  wins: number;
};

export type StrategyLabDiagnosticHotspotRecord = {
  actorResolution: number;
  label: string;
  perGame: number;
  total: number;
  unsupported: number;
  validation: number;
};

export type StrategyLabInspectionRecommendation = {
  artifactPaths: StrategyMatchSummary["artifactPaths"];
  classification: StrategyLabMatchClassification;
  deckId: string;
  matchId: string;
  opponentDeckId: string;
  opponentStrategyId: string;
  reason: string;
  strategyId: string;
};

export type StrategyLabScoreMetrics = {
  blendedScore: number;
  crossDeckScore: number;
  deadlockFallbackPenalty: number;
  diagnosticPenalty: number;
  fallbackCount: number;
  games: number;
  mirrorScore: number;
  totalDeadlockGames: number;
  totalDiagnostics: number;
};

export type StrategyLabPromotionGateResult = {
  passed: boolean;
  reasons: string[];
};

export type StrategyLabCandidateScorecard = {
  baselineStrategyId: string;
  candidateId: string;
  changedHeuristics: string[];
  deltaVsBaseline?: {
    blendedScore: number;
    crossDeckScore: number;
    deadlockFallbackPenalty: number;
    diagnosticPenalty: number;
    fallbackCount: number;
    mirrorScore: number;
    totalDeadlockGames: number;
    totalDiagnostics: number;
  };
  hypothesis: string;
  notes: string;
  parentStrategyId: string;
  promotionGate: StrategyLabPromotionGateResult;
  score: StrategyLabScoreMetrics;
  status: StrategyCandidateManifest["status"];
};

export type StrategyLabTriageCategoryRecord = {
  category: StrategyLabTriageCategory;
  count: number;
  label: string;
  matchIds: string[];
  recommendations: StrategyLabInspectionRecommendation[];
  summary: string;
};

export type StrategyLabReport = {
  artifactRoot: string;
  baselineStrategyId: string;
  candidateManifests: StrategyCandidateManifest[];
  crossDeck: {
    deckRecords: StrategyLabCrossDeckDeckRecord[];
    orderedPairRecords: StrategyLabCrossDeckOrderedPairRecord[];
    strategyRecords: StrategyLabStrategyRecord[];
  };
  deckIds: string[];
  gameCount: number;
  gameCounts: StrategyLabGameCounts;
  generatedAt: string;
  inspectNext: StrategyLabInspectionRecommendation[];
  matchClassifications: Record<StrategyLabMatchClassification, number>;
  mirror: {
    deckRecords: StrategyLabMirrorDeckRecord[];
    strategyPairRecords: StrategyLabMirrorStrategyPairRecord[];
  };
  mode: StrategyLabMatchMode | "curated";
  overall: {
    averageActions: number;
    averageTurns: number;
    deadlockConcedeCount: number;
    deadlockGames: number;
    diagnosticCounts: StrategyDiagnosticCounts;
    fallbackCounts: StrategyFallbackCounts;
    games: number;
    noWinnerGames: number;
    terminatedGames: number;
    winnerCounts: Record<PlayerId | "no-winner", number>;
  };
  preset?: StrategyBenchmarkPreset;
  scorecards: StrategyLabCandidateScorecard[];
  strategyIds: string[];
  strategyRecords: StrategyLabStrategyRecord[];
  triage: {
    categories: StrategyLabTriageCategoryRecord[];
  };
  worstMatchups: StrategyLabWorstMatchupRecord[];
  diagnostics: {
    byMatchup: StrategyLabDiagnosticHotspotRecord[];
    byStrategy: StrategyLabDiagnosticHotspotRecord[];
  };
};

type StrategyGameLogEntry = ReturnType<
  ReturnType<ReturnType<LorcanaMultiplayerTestEngine["asServer"]>["getRuntime"]>["getGameLog"]
>[number];
type StrategyExecutionTrace = StrategyDecisionLogEntry;
type StrategyParticipantPerspectiveRecord = {
  artifactPaths: StrategyMatchSummary["artifactPaths"];
  classification: StrategyLabMatchClassification;
  deckId: string;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  matchId: string;
  opponentDeckId: string;
  opponentStrategyId: string;
  strategyId: string;
  turns: number;
  actions: number;
  deadlock: boolean;
  deadlockConcedeCount: number;
  outcome: "loss" | "no-winner" | "win";
};
type StrategyScoreAggregate = {
  crossDeckGames: number;
  crossDeckWins: number;
  deadlockGames: number;
  fallbackCount: number;
  games: number;
  mirrorGames: number;
  mirrorWins: number;
  totalDiagnostics: number;
};
type StrategyTriageSignal = {
  category: StrategyLabTriageCategory;
  matchId: string;
};
type StrategyBenchmarkPresetConfig = {
  artifactSegment: string[];
  deckIds: string[];
  matchMode: StrategyLabMatchMode;
  mirrorGameCount: number;
  crossDeckGameCount: number;
};

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
const STRATEGY_TRIAGE_LABELS: Record<StrategyLabTriageCategory, string> = {
  "bad-ability-timing": "Bad ability timing",
  "bad-play-before-quest": "Bad play-before-quest",
  "fallback-churn": "Fallback churn",
  "missed-challenge": "Missed challenge",
  "over-inking": "Over-inking",
};
const STRATEGY_PRESET_CONFIGS: Record<StrategyBenchmarkPreset, StrategyBenchmarkPresetConfig> = {
  candidate: {
    artifactSegment: ["presets", "candidate"],
    crossDeckGameCount: 20,
    deckIds: [...CORE_STRATEGY_BENCHMARK_DECK_IDS],
    matchMode: "both",
    mirrorGameCount: 50,
  },
  promotion: {
    artifactSegment: ["presets", "promotion"],
    crossDeckGameCount: 20,
    deckIds: [...FULL_STRATEGY_REGRESSION_DECK_IDS],
    matchMode: "both",
    mirrorGameCount: 100,
  },
  quick: {
    artifactSegment: ["presets", "quick"],
    crossDeckGameCount: 0,
    deckIds: [...CORE_STRATEGY_BENCHMARK_DECK_IDS],
    matchMode: "mirror",
    mirrorGameCount: 20,
  },
};

function buildStrategySuiteDecks(): StrategyDeck[] {
  return DECK_FIXTURES.map((fixture) => ({
    fixture,
    id: fixture.id,
    strategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  }));
}

function sanitizeMatchSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9-]+/g, "-");
}

function createEmptyFallbackCounts(): StrategyFallbackCounts {
  return {
    concede: 0,
    passTurn: 0,
  };
}

function createEmptyDiagnosticCounts(): StrategyDiagnosticCounts {
  return {
    actorResolution: 0,
    total: 0,
    unsupported: 0,
    validation: 0,
  };
}

function addFallbackCounts(
  target: StrategyFallbackCounts,
  source: Readonly<StrategyFallbackCounts>,
): void {
  target.concede += source.concede;
  target.passTurn += source.passTurn;
}

function addDiagnosticCounts(
  target: StrategyDiagnosticCounts,
  source: Readonly<StrategyDiagnosticCounts>,
): void {
  target.actorResolution += source.actorResolution;
  target.total += source.total;
  target.unsupported += source.unsupported;
  target.validation += source.validation;
}

function roundAverage(total: number, count: number): number {
  return Number((count === 0 ? 0 : total / count).toFixed(2));
}

function roundScore(value: number): number {
  return Number(value.toFixed(4));
}

function sortStrings(values: Iterable<string>): string[] {
  return [...values].sort((left, right) => left.localeCompare(right));
}

export function resolveStrategyBenchmarkPresetConfig(
  preset: StrategyBenchmarkPreset,
): StrategyBenchmarkPresetConfig {
  return STRATEGY_PRESET_CONFIGS[preset];
}

function normalizeGameCount(value: number, fallback: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}

function resolveStrategyLabGameCounts(options: StrategyLabOptions = {}): StrategyLabGameCounts {
  const sharedGameCount = normalizeGameCount(options.gameCount ?? 20, 20);
  const mirror = Math.max(
    0,
    normalizeGameCount(options.mirrorGameCount ?? sharedGameCount, sharedGameCount),
  );
  const crossDeck = Math.max(
    0,
    normalizeGameCount(options.crossDeckGameCount ?? sharedGameCount, sharedGameCount),
  );

  return { crossDeck, mirror };
}

function resolveStrategyLabPresetOptions(options: StrategyLabOptions = {}): StrategyLabOptions {
  if (!options.preset) {
    return options;
  }

  const config = resolveStrategyBenchmarkPresetConfig(options.preset);

  return {
    ...options,
    crossDeckGameCount: options.crossDeckGameCount ?? config.crossDeckGameCount,
    deckIds: options.deckIds && options.deckIds.length > 0 ? options.deckIds : config.deckIds,
    matchMode: options.matchMode ?? config.matchMode,
    mirrorGameCount: options.mirrorGameCount ?? config.mirrorGameCount,
  };
}

function buildStrategyPairIds(
  playerOneStrategyId: string,
  playerTwoStrategyId: string,
): { pairId: string; pairLabel: string } {
  const strategyIds = sortStrings([playerOneStrategyId, playerTwoStrategyId]);

  return {
    pairId: strategyIds.join("__vs__"),
    pairLabel: strategyIds.join(" vs "),
  };
}

function buildOrderedDeckPairId(match: StrategyMatchSummary): string {
  return `${match.playerOneDeckId}__vs__${match.playerTwoDeckId}__${match.playerOneStrategyId}__vs__${match.playerTwoStrategyId}`;
}

function classifyStrategyMatch(match: StrategyMatchSummary): StrategyLabMatchClassification {
  if (match.playerOneDeckId !== match.playerTwoDeckId) {
    return "cross-deck";
  }

  if (match.playerOneStrategyId === match.playerTwoStrategyId) {
    return "mirror-same-strategy";
  }

  return "mirror";
}

function getMatchWinnerLabel(match: StrategyMatchSummary): PlayerId | "no-winner" {
  return match.winner ?? "no-winner";
}

function expandParticipantPerspectiveRecords(
  match: StrategyMatchSummary,
): StrategyParticipantPerspectiveRecord[] {
  return [
    {
      actions: match.actions,
      artifactPaths: match.artifactPaths,
      classification: classifyStrategyMatch(match),
      deadlock: match.deadlock,
      deadlockConcedeCount: match.deadlockConcedeCount,
      deckId: match.playerOneDeckId,
      diagnosticCounts: match.diagnosticCounts,
      fallbackCounts: match.fallbackCounts,
      matchId: match.matchId,
      opponentDeckId: match.playerTwoDeckId,
      opponentStrategyId: match.playerTwoStrategyId,
      outcome:
        match.winner === "player_one"
          ? "win"
          : match.winner === "player_two"
            ? "loss"
            : "no-winner",
      strategyId: match.playerOneStrategyId,
      turns: match.turns,
    },
    {
      actions: match.actions,
      artifactPaths: match.artifactPaths,
      classification: classifyStrategyMatch(match),
      deadlock: match.deadlock,
      deadlockConcedeCount: match.deadlockConcedeCount,
      deckId: match.playerTwoDeckId,
      diagnosticCounts: match.diagnosticCounts,
      fallbackCounts: match.fallbackCounts,
      matchId: match.matchId,
      opponentDeckId: match.playerOneDeckId,
      opponentStrategyId: match.playerOneStrategyId,
      outcome:
        match.winner === "player_two"
          ? "win"
          : match.winner === "player_one"
            ? "loss"
            : "no-winner",
      strategyId: match.playerTwoStrategyId,
      turns: match.turns,
    },
  ];
}

function resolveRunDeckIds(
  matches: readonly StrategyMatchSummary[],
  requestedDeckIds?: readonly string[],
): string[] {
  if (requestedDeckIds && requestedDeckIds.length > 0) {
    return sortStrings(new Set(requestedDeckIds));
  }

  return sortStrings(
    new Set(matches.flatMap((match) => [match.playerOneDeckId, match.playerTwoDeckId])),
  );
}

function resolveRunStrategyIds(
  matches: readonly StrategyMatchSummary[],
  requestedStrategyIds?: readonly string[],
): string[] {
  if (requestedStrategyIds && requestedStrategyIds.length > 0) {
    return sortStrings(new Set(requestedStrategyIds));
  }

  return sortStrings(
    new Set(matches.flatMap((match) => [match.playerOneStrategyId, match.playerTwoStrategyId])),
  );
}

function normalizeStrategyDeck(input: StrategyDeckMatchInput): StrategyDeck {
  return {
    fixture: input.fixture,
    id: input.id ?? input.fixture.id,
    strategy: input.strategy,
    strategyId: input.strategyId ?? input.strategy?.name ?? "default-lore-race",
  };
}

function buildSelectedStrategyOptions(
  strategyIds: readonly string[] = [],
): AutomatedActionStrategyOption[] {
  if (strategyIds.length === 0) {
    return [...AUTOMATED_ACTION_STRATEGIES];
  }

  return AUTOMATED_ACTION_STRATEGIES.filter((option) => strategyIds.includes(option.id));
}

function buildMatchDefinitions(): StrategyMatchDefinition[] {
  const decks = buildStrategySuiteDecks();
  const matchDefinitions: StrategyMatchDefinition[] = [];

  if (decks.length < 2) {
    return matchDefinitions;
  }

  for (let index = 0; index < decks.length; index += 1) {
    const leftDeck = decks[index]!;
    const rightDeck = decks[(index + 1) % decks.length]!;
    const forwardId = `${sanitizeMatchSegment(leftDeck.id)}-vs-${sanitizeMatchSegment(rightDeck.id)}-p1`;
    const reverseId = `${sanitizeMatchSegment(rightDeck.id)}-vs-${sanitizeMatchSegment(leftDeck.id)}-p2`;

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

  return matchDefinitions;
}

export function buildStrategyLabMatchDefinitions(
  options: StrategyLabOptions = {},
): StrategyMatchDefinition[] {
  const resolvedOptions = resolveStrategyLabPresetOptions(options);
  const deckIdFilter = new Set(resolvedOptions.deckIds ?? []);
  const selectedDecks = buildStrategySuiteDecks().filter(
    (deck) => deckIdFilter.size === 0 || deckIdFilter.has(deck.id),
  );
  const strategyOptions = buildSelectedStrategyOptions(resolvedOptions.strategyIds);
  const matchDefinitions: StrategyMatchDefinition[] = [];
  const matchMode = resolvedOptions.matchMode ?? "both";
  const gameCounts = resolveStrategyLabGameCounts(resolvedOptions);

  if ((matchMode === "mirror" || matchMode === "both") && gameCounts.mirror > 0) {
    for (const deck of selectedDecks) {
      for (const playerOneStrategy of strategyOptions) {
        for (const playerTwoStrategy of strategyOptions) {
          if (playerOneStrategy.id === playerTwoStrategy.id) {
            continue;
          }

          for (let gameIndex = 0; gameIndex < gameCounts.mirror; gameIndex += 1) {
            const matchId = `${deck.id}-mirror-${playerOneStrategy.id}-vs-${playerTwoStrategy.id}-${gameIndex}`;
            matchDefinitions.push({
              id: matchId,
              playerOne: {
                fixture: deck.fixture,
                id: deck.id,
                strategy: playerOneStrategy.strategy,
                strategyId: playerOneStrategy.id,
              },
              playerTwo: {
                fixture: deck.fixture,
                id: deck.id,
                strategy: playerTwoStrategy.strategy,
                strategyId: playerTwoStrategy.id,
              },
              seed: `strategy-lab:${matchId}`,
            });
          }
        }
      }
    }
  }

  if ((matchMode === "cross-deck" || matchMode === "both") && gameCounts.crossDeck > 0) {
    for (const strategyOption of strategyOptions) {
      for (const playerOneDeck of selectedDecks) {
        for (const playerTwoDeck of selectedDecks) {
          if (playerOneDeck.id === playerTwoDeck.id) {
            continue;
          }

          for (let gameIndex = 0; gameIndex < gameCounts.crossDeck; gameIndex += 1) {
            const matchId = `${playerOneDeck.id}-vs-${playerTwoDeck.id}-${strategyOption.id}-${gameIndex}`;
            matchDefinitions.push({
              id: matchId,
              playerOne: {
                fixture: playerOneDeck.fixture,
                id: playerOneDeck.id,
                strategy: strategyOption.strategy,
                strategyId: strategyOption.id,
              },
              playerTwo: {
                fixture: playerTwoDeck.fixture,
                id: playerTwoDeck.id,
                strategy: strategyOption.strategy,
                strategyId: strategyOption.id,
              },
              seed: `strategy-lab:${matchId}`,
            });
          }
        }
      }
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
    playerOneStrategyId: match.playerOne.strategyId,
    playerTwoDeckId: match.playerTwo.id,
    playerTwoStrategyId: match.playerTwo.strategyId,
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

function readStrategyDecisionLogEntries(path: string): StrategyDecisionLogEntry[] {
  if (!existsSync(path)) {
    return [];
  }

  const content = readFileSync(path, "utf8").trim();
  if (!content) {
    return [];
  }

  return content
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line) as StrategyDecisionLogEntry);
}

function extractStrategyTriageSignals(
  entries: readonly StrategyDecisionLogEntry[],
): StrategyTriageSignal[] {
  const signals: StrategyTriageSignal[] = [];

  for (const entry of entries) {
    if (entry.kind !== "execution") {
      continue;
    }

    const orderedFamilies = new Set(entry.orderedCandidates.map((candidate) => candidate.family));
    const selectedFamily = entry.selectedCandidate?.family;

    if (entry.fallbackTaken) {
      signals.push({
        category: "fallback-churn",
        matchId: entry.matchId,
      });
    }

    if (selectedFamily === "putCardIntoInkwell" && orderedFamilies.has("playCard")) {
      signals.push({
        category: "over-inking",
        matchId: entry.matchId,
      });
    }

    if (selectedFamily === "quest" && orderedFamilies.has("challenge")) {
      signals.push({
        category: "missed-challenge",
        matchId: entry.matchId,
      });
    }

    if (selectedFamily === "playCard" && orderedFamilies.has("quest")) {
      signals.push({
        category: "bad-play-before-quest",
        matchId: entry.matchId,
      });
    }

    if (
      selectedFamily === "activateAbility" &&
      (entry.diagnostics.length > 0 ||
        entry.validationSkips.length > 0 ||
        entry.unsupportedSkips.length > 0)
    ) {
      signals.push({
        category: "bad-ability-timing",
        matchId: entry.matchId,
      });
    }
  }

  return signals;
}

function ensureArtifactRoot(root: string): void {
  rmSync(root, { force: true, recursive: true });
  mkdirSync(root, { recursive: true });
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
  let deadlockConcedeCount = 0;
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
    const deadlockResolution = resolveRepeatedStateDeadlockByConceding({
      actorId: result.actorId,
      concede: (actorId) => server.concede(actorId),
      observation,
    });

    if (deadlockResolution.conceded) {
      deadlockConcedeCount += 1;
      pendingDeadlock = false;
      continue;
    }

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
    deadlockConcedeCount,
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
    playerOneStrategyId: match.playerOne.strategyId,
    playerTwoDeckId: match.playerTwo.id,
    playerTwoStrategyId: match.playerTwo.strategyId,
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

export function resolveStrategyLabMatchMode(
  value = process.env.STRATEGY_MATCH_MODE,
): StrategyLabMatchMode {
  return value === "mirror" || value === "cross-deck" || value === "both" ? value : "both";
}

export function parseStrategyLabFilter(value = ""): string[] {
  return value
    .split(",")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

export function resolveStrategyLabGameCount(
  value = process.env.STRATEGY_GAME_COUNT,
  fallback = 20,
): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

type MutableParticipantAggregate = {
  deadlockConcedeCount: number;
  deadlockGames: number;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  losses: number;
  noWinnerGames: number;
  totalActions: number;
  totalTurns: number;
  wins: number;
};

type MutableMatchAggregate = {
  deadlockConcedeCount: number;
  deadlockGames: number;
  diagnosticCounts: StrategyDiagnosticCounts;
  fallbackCounts: StrategyFallbackCounts;
  games: number;
  noWinnerGames: number;
  totalActions: number;
  totalTurns: number;
  wins: Record<string, number>;
};

type MutableWorstMatchupAggregate = MutableParticipantAggregate & {
  classification: StrategyLabMatchClassification;
  deckId: string;
  label: string;
  matchIds: string[];
  opponentDeckId: string;
  opponentStrategyId: string;
  sampleMatches: StrategyParticipantPerspectiveRecord[];
  strategyId: string;
};

function createMutableParticipantAggregate(): MutableParticipantAggregate {
  return {
    deadlockConcedeCount: 0,
    deadlockGames: 0,
    diagnosticCounts: createEmptyDiagnosticCounts(),
    fallbackCounts: createEmptyFallbackCounts(),
    games: 0,
    losses: 0,
    noWinnerGames: 0,
    totalActions: 0,
    totalTurns: 0,
    wins: 0,
  };
}

function createMutableMatchAggregate(): MutableMatchAggregate {
  return {
    deadlockConcedeCount: 0,
    deadlockGames: 0,
    diagnosticCounts: createEmptyDiagnosticCounts(),
    fallbackCounts: createEmptyFallbackCounts(),
    games: 0,
    noWinnerGames: 0,
    totalActions: 0,
    totalTurns: 0,
    wins: {},
  };
}

function createStrategyScoreAggregate(): StrategyScoreAggregate {
  return {
    crossDeckGames: 0,
    crossDeckWins: 0,
    deadlockGames: 0,
    fallbackCount: 0,
    games: 0,
    mirrorGames: 0,
    mirrorWins: 0,
    totalDiagnostics: 0,
  };
}

function accumulateParticipantAggregate(
  target: MutableParticipantAggregate,
  record: StrategyParticipantPerspectiveRecord,
): void {
  target.games += 1;
  target.totalActions += record.actions;
  target.totalTurns += record.turns;
  target.deadlockConcedeCount += record.deadlockConcedeCount;
  if (record.deadlock) {
    target.deadlockGames += 1;
  }
  addFallbackCounts(target.fallbackCounts, record.fallbackCounts);
  addDiagnosticCounts(target.diagnosticCounts, record.diagnosticCounts);

  if (record.outcome === "win") {
    target.wins += 1;
  } else if (record.outcome === "loss") {
    target.losses += 1;
  } else {
    target.noWinnerGames += 1;
  }
}

function accumulateMatchAggregate(
  target: MutableMatchAggregate,
  match: StrategyMatchSummary,
  winnerKey?: string,
): void {
  target.games += 1;
  target.totalActions += match.actions;
  target.totalTurns += match.turns;
  target.deadlockConcedeCount += match.deadlockConcedeCount;
  if (match.deadlock) {
    target.deadlockGames += 1;
  }
  addFallbackCounts(target.fallbackCounts, match.fallbackCounts);
  addDiagnosticCounts(target.diagnosticCounts, match.diagnosticCounts);

  if (winnerKey) {
    target.wins[winnerKey] = (target.wins[winnerKey] ?? 0) + 1;
  } else {
    target.noWinnerGames += 1;
  }
}

function accumulateScoreAggregate(
  target: StrategyScoreAggregate,
  record: StrategyParticipantPerspectiveRecord,
): void {
  target.games += 1;
  target.deadlockGames += record.deadlock ? 1 : 0;
  target.fallbackCount += record.fallbackCounts.concede + record.fallbackCounts.passTurn;
  target.totalDiagnostics += record.diagnosticCounts.total;

  if (record.classification === "mirror") {
    target.mirrorGames += 1;
    target.mirrorWins += record.outcome === "win" ? 1 : 0;
  }

  if (record.classification === "cross-deck") {
    target.crossDeckGames += 1;
    target.crossDeckWins += record.outcome === "win" ? 1 : 0;
  }
}

function finalizeScoreAggregate(aggregate: StrategyScoreAggregate): StrategyLabScoreMetrics {
  const deadlockFallbackPenalty =
    aggregate.games === 0
      ? 0
      : (aggregate.deadlockGames + aggregate.fallbackCount) / aggregate.games;
  const diagnosticPenalty =
    aggregate.games === 0 ? 0 : aggregate.totalDiagnostics / aggregate.games;
  const mirrorScore =
    aggregate.mirrorGames === 0 ? 0 : aggregate.mirrorWins / aggregate.mirrorGames;
  const crossDeckScore =
    aggregate.crossDeckGames === 0 ? 0 : aggregate.crossDeckWins / aggregate.crossDeckGames;

  return {
    blendedScore: roundScore(
      0.5 * mirrorScore +
        0.3 * crossDeckScore -
        0.1 * deadlockFallbackPenalty -
        0.1 * diagnosticPenalty,
    ),
    crossDeckScore: roundScore(crossDeckScore),
    deadlockFallbackPenalty: roundScore(deadlockFallbackPenalty),
    diagnosticPenalty: roundScore(diagnosticPenalty),
    fallbackCount: aggregate.fallbackCount,
    games: aggregate.games,
    mirrorScore: roundScore(mirrorScore),
    totalDeadlockGames: aggregate.deadlockGames,
    totalDiagnostics: aggregate.totalDiagnostics,
  };
}

function compareStrategyRecords(
  left: StrategyLabStrategyRecord,
  right: StrategyLabStrategyRecord,
): number {
  return (
    right.winRate - left.winRate ||
    right.wins - left.wins ||
    left.noWinnerGames - right.noWinnerGames ||
    left.strategyId.localeCompare(right.strategyId)
  );
}

function compareMirrorRecords(
  left: StrategyLabMirrorDeckRecord | StrategyLabMirrorStrategyPairRecord,
  right: StrategyLabMirrorDeckRecord | StrategyLabMirrorStrategyPairRecord,
): number {
  return (
    left.classification.localeCompare(right.classification) ||
    left.strategyPairLabel.localeCompare(right.strategyPairLabel)
  );
}

function compareCrossDeckDeckRecords(
  left: StrategyLabCrossDeckDeckRecord,
  right: StrategyLabCrossDeckDeckRecord,
): number {
  return (
    right.winRate - left.winRate ||
    right.wins - left.wins ||
    left.deckId.localeCompare(right.deckId) ||
    left.strategyId.localeCompare(right.strategyId)
  );
}

function compareCrossDeckPairRecords(
  left: StrategyLabCrossDeckOrderedPairRecord,
  right: StrategyLabCrossDeckOrderedPairRecord,
): number {
  return (
    left.orderedDeckPairLabel.localeCompare(right.orderedDeckPairLabel) ||
    left.playerOneStrategyId.localeCompare(right.playerOneStrategyId) ||
    left.playerTwoStrategyId.localeCompare(right.playerTwoStrategyId)
  );
}

function compareWorstMatchups(
  left: StrategyLabWorstMatchupRecord,
  right: StrategyLabWorstMatchupRecord,
): number {
  const leftPressure =
    left.deadlockGames +
    left.deadlockConcedeCount +
    left.fallbackCounts.concede +
    left.fallbackCounts.passTurn;
  const rightPressure =
    right.deadlockGames +
    right.deadlockConcedeCount +
    right.fallbackCounts.concede +
    right.fallbackCounts.passTurn;

  return (
    left.winRate - right.winRate ||
    rightPressure - leftPressure ||
    right.diagnosticCounts.total - left.diagnosticCounts.total ||
    left.label.localeCompare(right.label)
  );
}

function compareDiagnosticHotspots(
  left: StrategyLabDiagnosticHotspotRecord,
  right: StrategyLabDiagnosticHotspotRecord,
): number {
  return (
    right.total - left.total ||
    right.actorResolution - left.actorResolution ||
    right.validation - left.validation ||
    right.unsupported - left.unsupported ||
    left.label.localeCompare(right.label)
  );
}

function compareScorecards(
  left: StrategyLabCandidateScorecard,
  right: StrategyLabCandidateScorecard,
): number {
  return (
    right.score.blendedScore - left.score.blendedScore ||
    right.score.mirrorScore - left.score.mirrorScore ||
    right.score.crossDeckScore - left.score.crossDeckScore ||
    left.candidateId.localeCompare(right.candidateId)
  );
}

function compareTriageCategories(
  left: StrategyLabTriageCategoryRecord,
  right: StrategyLabTriageCategoryRecord,
): number {
  return (
    right.count - left.count ||
    right.matchIds.length - left.matchIds.length ||
    left.label.localeCompare(right.label)
  );
}

function finalizeParticipantAggregate(
  aggregate: MutableParticipantAggregate,
): Omit<StrategyLabStrategyRecord, "strategyId"> {
  return {
    averageActions: roundAverage(aggregate.totalActions, aggregate.games),
    averageTurns: roundAverage(aggregate.totalTurns, aggregate.games),
    deadlockConcedeCount: aggregate.deadlockConcedeCount,
    deadlockGames: aggregate.deadlockGames,
    diagnosticCounts: aggregate.diagnosticCounts,
    fallbackCounts: aggregate.fallbackCounts,
    games: aggregate.games,
    losses: aggregate.losses,
    noWinnerGames: aggregate.noWinnerGames,
    winRate: roundAverage(aggregate.wins, aggregate.games),
    wins: aggregate.wins,
  };
}

function finalizeMatchAggregate(
  aggregate: MutableMatchAggregate,
): Omit<
  StrategyLabMirrorDeckRecord,
  "classification" | "deckId" | "strategyPairId" | "strategyPairLabel"
> {
  return {
    averageActions: roundAverage(aggregate.totalActions, aggregate.games),
    averageTurns: roundAverage(aggregate.totalTurns, aggregate.games),
    deadlockConcedeCount: aggregate.deadlockConcedeCount,
    deadlockGames: aggregate.deadlockGames,
    diagnosticCounts: aggregate.diagnosticCounts,
    fallbackCounts: aggregate.fallbackCounts,
    games: aggregate.games,
    noWinnerGames: aggregate.noWinnerGames,
    wins: aggregate.wins,
  };
}

function formatWinsRecord(record: Record<string, number>): string {
  const entries = Object.entries(record).sort((left, right) => left[0].localeCompare(right[0]));
  return entries.length === 0
    ? "none"
    : entries.map(([key, value]) => `${key}:${value}`).join(", ");
}

function formatFallbackCountsForMarkdown(counts: StrategyFallbackCounts): string {
  return `concede ${counts.concede}, pass ${counts.passTurn}`;
}

function formatDiagnosticCountsForMarkdown(counts: StrategyDiagnosticCounts): string {
  return `total ${counts.total}, actor ${counts.actorResolution}, validation ${counts.validation}, unsupported ${counts.unsupported}`;
}

function buildRecommendationReason(record: StrategyLabWorstMatchupRecord): string {
  const reasons: string[] = [];

  if (record.deadlockGames > 0 || record.deadlockConcedeCount > 0) {
    reasons.push(
      `deadlocks ${record.deadlockGames}, deadlock concedes ${record.deadlockConcedeCount}`,
    );
  }

  if (record.fallbackCounts.concede > 0 || record.fallbackCounts.passTurn > 0) {
    reasons.push(`fallbacks ${formatFallbackCountsForMarkdown(record.fallbackCounts)}`);
  }

  if (record.diagnosticCounts.total > 0) {
    reasons.push(`diagnostics ${formatDiagnosticCountsForMarkdown(record.diagnosticCounts)}`);
  }

  return reasons.join("; ") || "lowest win rate in this run";
}

function buildStrategyPromotionGate(args: {
  baselineScore?: StrategyLabScoreMetrics;
  candidateScore: StrategyLabScoreMetrics;
}): StrategyLabPromotionGateResult {
  const { baselineScore, candidateScore } = args;

  if (!baselineScore || baselineScore.games === 0) {
    return {
      passed: false,
      reasons: ["Baseline strategy was not present in this benchmark run."],
    };
  }

  const reasons: string[] = [];
  const fallbackIncreaseLimit = Math.ceil(baselineScore.fallbackCount * 0.05);
  const diagnosticIncreaseLimit = Math.ceil(baselineScore.totalDiagnostics * 0.05);

  if (candidateScore.blendedScore - baselineScore.blendedScore < 0.02) {
    reasons.push("Blended score did not improve by at least 0.02.");
  }

  if (candidateScore.mirrorScore < baselineScore.mirrorScore - 0.01) {
    reasons.push("Mirror win rate regressed by more than 0.01.");
  }

  if (candidateScore.totalDeadlockGames > baselineScore.totalDeadlockGames) {
    reasons.push("Deadlock games increased.");
  }

  if (candidateScore.fallbackCount > baselineScore.fallbackCount + fallbackIncreaseLimit) {
    reasons.push("Fallback count increased by more than 5%.");
  }

  if (candidateScore.totalDiagnostics > baselineScore.totalDiagnostics + diagnosticIncreaseLimit) {
    reasons.push("Diagnostic count increased by more than 5%.");
  }

  return {
    passed: reasons.length === 0,
    reasons: reasons.length === 0 ? ["Candidate passed the promotion gate."] : reasons,
  };
}

function buildStrategyCandidateScorecards(args: {
  baselineStrategyId: string;
  candidateManifests: readonly StrategyCandidateManifest[];
  participantRecords: readonly StrategyParticipantPerspectiveRecord[];
  summary: StrategySuiteRunSummary;
}): StrategyLabCandidateScorecard[] {
  const { baselineStrategyId, candidateManifests, participantRecords, summary } = args;
  const coreDeckIds = new Set<string>(CORE_STRATEGY_BENCHMARK_DECK_IDS);
  const benchmarkDeckIds = sortStrings(
    new Set(summary.deckIds.filter((deckId) => coreDeckIds.has(deckId))),
  );
  const scoringDeckIds = new Set(
    benchmarkDeckIds.length > 0 ? benchmarkDeckIds : sortStrings(summary.deckIds),
  );

  const buildScoreForStrategy = (strategyId: string): StrategyLabScoreMetrics => {
    const aggregate = createStrategyScoreAggregate();

    for (const record of participantRecords) {
      if (record.strategyId !== strategyId || !scoringDeckIds.has(record.deckId)) {
        continue;
      }

      if (record.classification === "cross-deck" && !scoringDeckIds.has(record.opponentDeckId)) {
        continue;
      }

      accumulateScoreAggregate(aggregate, record);
    }

    return finalizeScoreAggregate(aggregate);
  };

  const baselineScore = buildScoreForStrategy(baselineStrategyId);

  return candidateManifests
    .map((manifest) => {
      const candidateScore = buildScoreForStrategy(manifest.candidateId);

      return {
        baselineStrategyId,
        candidateId: manifest.candidateId,
        changedHeuristics: [...manifest.changedHeuristics],
        deltaVsBaseline:
          baselineScore.games > 0
            ? {
                blendedScore: roundScore(candidateScore.blendedScore - baselineScore.blendedScore),
                crossDeckScore: roundScore(
                  candidateScore.crossDeckScore - baselineScore.crossDeckScore,
                ),
                deadlockFallbackPenalty: roundScore(
                  candidateScore.deadlockFallbackPenalty - baselineScore.deadlockFallbackPenalty,
                ),
                diagnosticPenalty: roundScore(
                  candidateScore.diagnosticPenalty - baselineScore.diagnosticPenalty,
                ),
                fallbackCount: candidateScore.fallbackCount - baselineScore.fallbackCount,
                mirrorScore: roundScore(candidateScore.mirrorScore - baselineScore.mirrorScore),
                totalDeadlockGames:
                  candidateScore.totalDeadlockGames - baselineScore.totalDeadlockGames,
                totalDiagnostics: candidateScore.totalDiagnostics - baselineScore.totalDiagnostics,
              }
            : undefined,
        hypothesis: manifest.hypothesis,
        notes: manifest.notes,
        parentStrategyId: manifest.parentStrategyId,
        promotionGate: buildStrategyPromotionGate({
          baselineScore,
          candidateScore,
        }),
        score: candidateScore,
        status: manifest.status,
      };
    })
    .sort(compareScorecards);
}

function buildStrategyTriageSummary(args: {
  inspectNext: readonly StrategyLabInspectionRecommendation[];
  summary: StrategySuiteRunSummary;
}): { categories: StrategyLabTriageCategoryRecord[] } {
  const recommendationByMatchId = new Map(
    args.inspectNext.map((recommendation) => [recommendation.matchId, recommendation]),
  );
  const signalTotals = new Map<
    StrategyLabTriageCategory,
    { count: number; matchIds: Set<string> }
  >();

  for (const match of args.summary.matches) {
    const entries = readStrategyDecisionLogEntries(match.artifactPaths.strategyDecisions);

    for (const signal of extractStrategyTriageSignals(entries)) {
      const aggregate = signalTotals.get(signal.category) ?? {
        count: 0,
        matchIds: new Set<string>(),
      };
      aggregate.count += 1;
      aggregate.matchIds.add(signal.matchId);
      signalTotals.set(signal.category, aggregate);
    }
  }

  return {
    categories: [...signalTotals.entries()]
      .map(([category, aggregate]) => {
        const matchIds = sortStrings(aggregate.matchIds);
        const recommendations = matchIds
          .map((matchId) => recommendationByMatchId.get(matchId))
          .filter(
            (recommendation): recommendation is StrategyLabInspectionRecommendation =>
              recommendation !== undefined,
          )
          .slice(0, 3);

        return {
          category,
          count: aggregate.count,
          label: STRATEGY_TRIAGE_LABELS[category],
          matchIds,
          recommendations,
          summary: `${STRATEGY_TRIAGE_LABELS[category]} showed up in ${aggregate.count} traced decisions across ${matchIds.length} match${matchIds.length === 1 ? "" : "es"}.`,
        };
      })
      .sort(compareTriageCategories),
  };
}

function buildBenchmarkSummaryMarkdown(report: StrategyLabReport): string {
  const topStrategies = report.strategyRecords.slice(0, 5);
  const topScorecards = report.scorecards.slice(0, 5);
  const triageCategories = report.triage.categories.slice(0, 5);
  const worstMatchups = report.worstMatchups.slice(0, 5);
  const recommendations = report.inspectNext.slice(0, 5);
  const lines = [
    "# Strategy Lab Benchmark Summary",
    "",
    "## Run Metadata",
    `- Generated at: ${report.generatedAt}`,
    `- Preset: ${report.preset ?? "custom"}`,
    `- Mode: ${report.mode}`,
    `- Shared game count fallback: ${report.gameCount}`,
    `- Mirror games per pairing: ${report.gameCounts.mirror}`,
    `- Cross-deck games per pairing: ${report.gameCounts.crossDeck}`,
    `- Total matches: ${report.overall.games}`,
    `- Baseline strategy: ${report.baselineStrategyId}`,
    `- Decks: ${report.deckIds.join(", ") || "none"}`,
    `- Strategies: ${report.strategyIds.join(", ") || "none"}`,
    `- Match classifications: mirror ${report.matchClassifications.mirror}, mirror-same-strategy ${report.matchClassifications["mirror-same-strategy"]}, cross-deck ${report.matchClassifications["cross-deck"]}`,
    "",
    "## Candidate Scorecards",
    "| Candidate | Status | Parent | Blended | Mirror | Cross-Deck | Deadlock/Fallback Penalty | Diagnostic Penalty | Delta Vs Baseline | Gate |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...(topScorecards.length > 0
      ? topScorecards.map(
          (scorecard) =>
            `| ${scorecard.candidateId} | ${scorecard.status} | ${scorecard.parentStrategyId} | ${scorecard.score.blendedScore.toFixed(4)} | ${scorecard.score.mirrorScore.toFixed(4)} | ${scorecard.score.crossDeckScore.toFixed(4)} | ${scorecard.score.deadlockFallbackPenalty.toFixed(4)} | ${scorecard.score.diagnosticPenalty.toFixed(4)} | ${scorecard.deltaVsBaseline?.blendedScore?.toFixed(4) ?? "n/a"} | ${scorecard.promotionGate.passed ? "pass" : "hold"} |`,
        )
      : ["| none | n/a | n/a | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | n/a | hold |"]),
    ...(topScorecards.length > 0
      ? topScorecards.flatMap((scorecard) => [
          `- ${scorecard.candidateId}: ${scorecard.hypothesis}`,
          `- heuristics: ${scorecard.changedHeuristics.join("; ") || "none"}`,
          `- promotion gate: ${scorecard.promotionGate.reasons.join(" ")}`,
        ])
      : []),
    "",
    "## Top Strategies",
    "| Strategy | Win Rate | Wins | Losses | No Winner | Avg Turns | Avg Actions | Deadlocks | Fallbacks |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...(topStrategies.length > 0
      ? topStrategies.map(
          (record) =>
            `| ${record.strategyId} | ${record.winRate.toFixed(2)} | ${record.wins} | ${record.losses} | ${record.noWinnerGames} | ${record.averageTurns.toFixed(2)} | ${record.averageActions.toFixed(2)} | ${record.deadlockGames}/${record.deadlockConcedeCount} | ${formatFallbackCountsForMarkdown(record.fallbackCounts)} |`,
        )
      : ["| none | 0.00 | 0 | 0 | 0 | 0.00 | 0.00 | 0/0 | concede 0, pass 0 |"]),
    "",
    "## Worst Matchups",
    "| Matchup | Win Rate | Games | Losses | Deadlocks | Fallbacks | Diagnostics |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...(worstMatchups.length > 0
      ? worstMatchups.map(
          (record) =>
            `| ${record.label} | ${record.winRate.toFixed(2)} | ${record.games} | ${record.losses} | ${record.deadlockGames}/${record.deadlockConcedeCount} | ${formatFallbackCountsForMarkdown(record.fallbackCounts)} | ${formatDiagnosticCountsForMarkdown(record.diagnosticCounts)} |`,
        )
      : [
          "| none | 0.00 | 0 | 0 | 0/0 | concede 0, pass 0 | total 0, actor 0, validation 0, unsupported 0 |",
        ]),
    "",
    "## Deadlock And Fallback Summary",
    `- Deadlock games: ${report.overall.deadlockGames}`,
    `- Deadlock concedes: ${report.overall.deadlockConcedeCount}`,
    `- Fallbacks: ${formatFallbackCountsForMarkdown(report.overall.fallbackCounts)}`,
    `- Diagnostics: ${formatDiagnosticCountsForMarkdown(report.overall.diagnosticCounts)}`,
    "",
    "## Triage Backlog",
    "| Category | Signals | Matches | Recommended Transcripts |",
    "| --- | --- | --- | --- |",
    ...(triageCategories.length > 0
      ? triageCategories.map(
          (category) =>
            `| ${category.label} | ${category.count} | ${category.matchIds.length} | ${category.recommendations.map((recommendation) => recommendation.matchId).join(", ") || "none"} |`,
        )
      : ["| none | 0 | 0 | none |"]),
    ...(triageCategories.length > 0
      ? triageCategories.map((category) => `- ${category.summary}`)
      : []),
    "",
    "## Suggested Transcripts To Inspect Next",
    ...(recommendations.length > 0
      ? recommendations.flatMap((recommendation) => [
          `- ${recommendation.matchId} (${recommendation.strategyId} on ${recommendation.deckId} vs ${recommendation.opponentStrategyId} on ${recommendation.opponentDeckId}, ${recommendation.classification})`,
          `  reason: ${recommendation.reason}`,
          `  decisions: ${recommendation.artifactPaths.strategyDecisions}`,
          `  runtime: ${recommendation.artifactPaths.gameRuntime}`,
        ])
      : ["- No recommendations generated"]),
  ];

  return `${lines.join("\n")}\n`;
}

export function buildStrategyLabReport(summary: StrategySuiteRunSummary): StrategyLabReport {
  const playerOneWinnerId = resolveStrategyPlayerId("player_one");
  const playerTwoWinnerId = resolveStrategyPlayerId("player_two");

  if (!playerOneWinnerId || !playerTwoWinnerId) {
    throw new Error("Unable to resolve winner ids for strategy lab reporting");
  }

  const matchClassifications: Record<StrategyLabMatchClassification, number> = {
    "cross-deck": 0,
    mirror: 0,
    "mirror-same-strategy": 0,
  };
  const overall = {
    deadlockConcedeCount: 0,
    deadlockGames: 0,
    diagnosticCounts: createEmptyDiagnosticCounts(),
    fallbackCounts: createEmptyFallbackCounts(),
    games: summary.matches.length,
    noWinnerGames: 0,
    terminatedGames: 0,
    totalActions: 0,
    totalTurns: 0,
    winnerCounts: {
      "no-winner": 0,
      [playerOneWinnerId]: 0,
      [playerTwoWinnerId]: 0,
    } satisfies Record<PlayerId | "no-winner", number>,
  };
  const strategyTotals = new Map<string, MutableParticipantAggregate>();
  const crossDeckStrategyTotals = new Map<string, MutableParticipantAggregate>();
  const crossDeckDeckTotals = new Map<string, MutableParticipantAggregate>();
  const mirrorDeckTotals = new Map<
    string,
    MutableMatchAggregate & {
      classification: "mirror" | "mirror-same-strategy";
      deckId: string;
      strategyPairId: string;
      strategyPairLabel: string;
    }
  >();
  const mirrorStrategyPairTotals = new Map<
    string,
    MutableMatchAggregate & {
      classification: "mirror" | "mirror-same-strategy";
      strategyPairId: string;
      strategyPairLabel: string;
    }
  >();
  const crossDeckPairTotals = new Map<
    string,
    MutableMatchAggregate & {
      orderedDeckPairId: string;
      orderedDeckPairLabel: string;
      playerOneDeckId: string;
      playerOneStrategyId: string;
      playerTwoDeckId: string;
      playerTwoStrategyId: string;
    }
  >();
  const worstMatchupTotals = new Map<string, MutableWorstMatchupAggregate>();
  const diagnosticsByStrategy = new Map<
    string,
    { games: number; counts: StrategyDiagnosticCounts; label: string }
  >();
  const diagnosticsByMatchup = new Map<
    string,
    { games: number; counts: StrategyDiagnosticCounts; label: string }
  >();
  const participantRecords: StrategyParticipantPerspectiveRecord[] = [];

  for (const match of summary.matches) {
    const classification = classifyStrategyMatch(match);
    matchClassifications[classification] += 1;
    overall.totalActions += match.actions;
    overall.totalTurns += match.turns;
    overall.deadlockConcedeCount += match.deadlockConcedeCount;
    if (match.deadlock) {
      overall.deadlockGames += 1;
    }
    if (match.outcome === "terminated") {
      overall.terminatedGames += 1;
    }
    addFallbackCounts(overall.fallbackCounts, match.fallbackCounts);
    addDiagnosticCounts(overall.diagnosticCounts, match.diagnosticCounts);
    const winnerLabel = getMatchWinnerLabel(match);
    overall.winnerCounts[winnerLabel] += 1;
    if (winnerLabel === "no-winner") {
      overall.noWinnerGames += 1;
    }

    if (classification !== "cross-deck") {
      const { pairId, pairLabel } = buildStrategyPairIds(
        match.playerOneStrategyId,
        match.playerTwoStrategyId,
      );
      const mirrorDeckKey = `${classification}::${match.playerOneDeckId}::${pairId}`;
      const mirrorDeckRecord = mirrorDeckTotals.get(mirrorDeckKey) ?? {
        ...createMutableMatchAggregate(),
        classification,
        deckId: match.playerOneDeckId,
        strategyPairId: pairId,
        strategyPairLabel: pairLabel,
      };
      accumulateMatchAggregate(
        mirrorDeckRecord,
        match,
        match.winner === "player_one"
          ? match.playerOneStrategyId
          : match.winner === "player_two"
            ? match.playerTwoStrategyId
            : undefined,
      );
      mirrorDeckTotals.set(mirrorDeckKey, mirrorDeckRecord);

      const mirrorPairKey = `${classification}::${pairId}`;
      const mirrorPairRecord = mirrorStrategyPairTotals.get(mirrorPairKey) ?? {
        ...createMutableMatchAggregate(),
        classification,
        strategyPairId: pairId,
        strategyPairLabel: pairLabel,
      };
      accumulateMatchAggregate(
        mirrorPairRecord,
        match,
        match.winner === "player_one"
          ? match.playerOneStrategyId
          : match.winner === "player_two"
            ? match.playerTwoStrategyId
            : undefined,
      );
      mirrorStrategyPairTotals.set(mirrorPairKey, mirrorPairRecord);
    }

    if (classification === "cross-deck") {
      const orderedDeckPairId = buildOrderedDeckPairId(match);
      const orderedDeckPairLabel = `${match.playerOneDeckId} (${match.playerOneStrategyId}) vs ${match.playerTwoDeckId} (${match.playerTwoStrategyId})`;
      const pairRecord = crossDeckPairTotals.get(orderedDeckPairId) ?? {
        ...createMutableMatchAggregate(),
        orderedDeckPairId,
        orderedDeckPairLabel,
        playerOneDeckId: match.playerOneDeckId,
        playerOneStrategyId: match.playerOneStrategyId,
        playerTwoDeckId: match.playerTwoDeckId,
        playerTwoStrategyId: match.playerTwoStrategyId,
      };
      accumulateMatchAggregate(
        pairRecord,
        match,
        match.winner === "player_one"
          ? `${match.playerOneDeckId} (${match.playerOneStrategyId})`
          : match.winner === "player_two"
            ? `${match.playerTwoDeckId} (${match.playerTwoStrategyId})`
            : undefined,
      );
      crossDeckPairTotals.set(orderedDeckPairId, pairRecord);
    }

    for (const participantRecord of expandParticipantPerspectiveRecords(match)) {
      participantRecords.push(participantRecord);
      const strategyRecord =
        strategyTotals.get(participantRecord.strategyId) ?? createMutableParticipantAggregate();
      accumulateParticipantAggregate(strategyRecord, participantRecord);
      strategyTotals.set(participantRecord.strategyId, strategyRecord);

      if (participantRecord.classification === "cross-deck") {
        const crossDeckStrategyRecord =
          crossDeckStrategyTotals.get(participantRecord.strategyId) ??
          createMutableParticipantAggregate();
        accumulateParticipantAggregate(crossDeckStrategyRecord, participantRecord);
        crossDeckStrategyTotals.set(participantRecord.strategyId, crossDeckStrategyRecord);

        const crossDeckDeckKey = `${participantRecord.deckId}::${participantRecord.strategyId}`;
        const crossDeckDeckRecord =
          crossDeckDeckTotals.get(crossDeckDeckKey) ?? createMutableParticipantAggregate();
        accumulateParticipantAggregate(crossDeckDeckRecord, participantRecord);
        crossDeckDeckTotals.set(crossDeckDeckKey, crossDeckDeckRecord);
      }

      const matchupLabel = `${participantRecord.strategyId} on ${participantRecord.deckId} vs ${participantRecord.opponentStrategyId} on ${participantRecord.opponentDeckId}`;
      const worstMatchupKey = [
        participantRecord.classification,
        participantRecord.deckId,
        participantRecord.strategyId,
        participantRecord.opponentDeckId,
        participantRecord.opponentStrategyId,
      ].join("::");
      const worstMatchupRecord = worstMatchupTotals.get(worstMatchupKey) ?? {
        ...createMutableParticipantAggregate(),
        classification: participantRecord.classification,
        deckId: participantRecord.deckId,
        label: matchupLabel,
        matchIds: [],
        opponentDeckId: participantRecord.opponentDeckId,
        opponentStrategyId: participantRecord.opponentStrategyId,
        sampleMatches: [],
        strategyId: participantRecord.strategyId,
      };
      accumulateParticipantAggregate(worstMatchupRecord, participantRecord);
      worstMatchupRecord.matchIds.push(participantRecord.matchId);
      worstMatchupRecord.sampleMatches.push(participantRecord);
      worstMatchupTotals.set(worstMatchupKey, worstMatchupRecord);

      const strategyDiagnosticRecord = diagnosticsByStrategy.get(participantRecord.strategyId) ?? {
        counts: createEmptyDiagnosticCounts(),
        games: 0,
        label: participantRecord.strategyId,
      };
      strategyDiagnosticRecord.games += 1;
      addDiagnosticCounts(strategyDiagnosticRecord.counts, participantRecord.diagnosticCounts);
      diagnosticsByStrategy.set(participantRecord.strategyId, strategyDiagnosticRecord);

      const matchupDiagnosticRecord = diagnosticsByMatchup.get(worstMatchupKey) ?? {
        counts: createEmptyDiagnosticCounts(),
        games: 0,
        label: matchupLabel,
      };
      matchupDiagnosticRecord.games += 1;
      addDiagnosticCounts(matchupDiagnosticRecord.counts, participantRecord.diagnosticCounts);
      diagnosticsByMatchup.set(worstMatchupKey, matchupDiagnosticRecord);
    }
  }

  const strategyRecords = [...strategyTotals.entries()]
    .map(([strategyId, aggregate]) => ({
      strategyId,
      ...finalizeParticipantAggregate(aggregate),
    }))
    .sort(compareStrategyRecords);

  const mirrorDeckRecords = [...mirrorDeckTotals.values()]
    .map((aggregate) => ({
      classification: aggregate.classification,
      deckId: aggregate.deckId,
      strategyPairId: aggregate.strategyPairId,
      strategyPairLabel: aggregate.strategyPairLabel,
      ...finalizeMatchAggregate(aggregate),
    }))
    .sort(
      (left, right) => left.deckId.localeCompare(right.deckId) || compareMirrorRecords(left, right),
    );

  const mirrorStrategyPairRecords = [...mirrorStrategyPairTotals.values()]
    .map((aggregate) => ({
      classification: aggregate.classification,
      strategyPairId: aggregate.strategyPairId,
      strategyPairLabel: aggregate.strategyPairLabel,
      ...finalizeMatchAggregate(aggregate),
    }))
    .sort(compareMirrorRecords);

  const crossDeckDeckRecords = [...crossDeckDeckTotals.entries()]
    .map(([key, aggregate]) => {
      const [deckId, strategyId] = key.split("::");

      if (!deckId || !strategyId) {
        throw new Error(`Invalid cross-deck deck key: ${key}`);
      }

      return {
        deckId,
        strategyId,
        ...finalizeParticipantAggregate(aggregate),
      };
    })
    .sort(compareCrossDeckDeckRecords);

  const crossDeckStrategyRecords = [...crossDeckStrategyTotals.entries()]
    .map(([strategyId, aggregate]) => ({
      strategyId,
      ...finalizeParticipantAggregate(aggregate),
    }))
    .sort(compareStrategyRecords);

  const crossDeckOrderedPairRecords = [...crossDeckPairTotals.values()]
    .map((aggregate) => ({
      orderedDeckPairId: aggregate.orderedDeckPairId,
      orderedDeckPairLabel: aggregate.orderedDeckPairLabel,
      playerOneDeckId: aggregate.playerOneDeckId,
      playerOneStrategyId: aggregate.playerOneStrategyId,
      playerTwoDeckId: aggregate.playerTwoDeckId,
      playerTwoStrategyId: aggregate.playerTwoStrategyId,
      ...finalizeMatchAggregate(aggregate),
    }))
    .sort(compareCrossDeckPairRecords);

  const worstMatchups = [...worstMatchupTotals.values()]
    .map((aggregate) => ({
      classification: aggregate.classification,
      deckId: aggregate.deckId,
      label: aggregate.label,
      matchIds: sortStrings(new Set(aggregate.matchIds)),
      opponentDeckId: aggregate.opponentDeckId,
      opponentStrategyId: aggregate.opponentStrategyId,
      strategyId: aggregate.strategyId,
      ...finalizeParticipantAggregate(aggregate),
    }))
    .sort(compareWorstMatchups);

  const diagnostics = {
    byMatchup: [...diagnosticsByMatchup.values()]
      .map((aggregate) => ({
        actorResolution: aggregate.counts.actorResolution,
        label: aggregate.label,
        perGame: roundAverage(aggregate.counts.total, aggregate.games),
        total: aggregate.counts.total,
        unsupported: aggregate.counts.unsupported,
        validation: aggregate.counts.validation,
      }))
      .sort(compareDiagnosticHotspots),
    byStrategy: [...diagnosticsByStrategy.values()]
      .map((aggregate) => ({
        actorResolution: aggregate.counts.actorResolution,
        label: aggregate.label,
        perGame: roundAverage(aggregate.counts.total, aggregate.games),
        total: aggregate.counts.total,
        unsupported: aggregate.counts.unsupported,
        validation: aggregate.counts.validation,
      }))
      .sort(compareDiagnosticHotspots),
  };

  const inspectNext = worstMatchups.slice(0, 5).flatMap((record) => {
    const aggregate = [...worstMatchupTotals.values()].find(
      (item) =>
        item.classification === record.classification &&
        item.deckId === record.deckId &&
        item.strategyId === record.strategyId &&
        item.opponentDeckId === record.opponentDeckId &&
        item.opponentStrategyId === record.opponentStrategyId,
    );

    if (!aggregate) {
      return [];
    }

    const selectedMatch = [...aggregate.sampleMatches].sort((left, right) => {
      const leftPressure =
        left.deadlockConcedeCount +
        left.fallbackCounts.concede +
        left.fallbackCounts.passTurn +
        left.diagnosticCounts.total;
      const rightPressure =
        right.deadlockConcedeCount +
        right.fallbackCounts.concede +
        right.fallbackCounts.passTurn +
        right.diagnosticCounts.total;

      return rightPressure - leftPressure || left.matchId.localeCompare(right.matchId);
    })[0];

    if (!selectedMatch) {
      return [];
    }

    return [
      {
        artifactPaths: selectedMatch.artifactPaths,
        classification: record.classification,
        deckId: record.deckId,
        matchId: selectedMatch.matchId,
        opponentDeckId: record.opponentDeckId,
        opponentStrategyId: record.opponentStrategyId,
        reason: buildRecommendationReason(record),
        strategyId: record.strategyId,
      },
    ];
  });

  const candidateManifests =
    summary.candidateManifests.length > 0
      ? [...summary.candidateManifests]
      : getStrategyCandidateManifests(summary.strategyIds);
  const scorecards = buildStrategyCandidateScorecards({
    baselineStrategyId: summary.baselineStrategyId,
    candidateManifests,
    participantRecords,
    summary,
  });
  const triage = buildStrategyTriageSummary({
    inspectNext,
    summary,
  });

  return {
    artifactRoot: summary.artifactRoot,
    baselineStrategyId: summary.baselineStrategyId,
    candidateManifests,
    crossDeck: {
      deckRecords: crossDeckDeckRecords,
      orderedPairRecords: crossDeckOrderedPairRecords,
      strategyRecords: crossDeckStrategyRecords,
    },
    deckIds: summary.deckIds,
    gameCount: summary.gameCount,
    gameCounts: summary.gameCounts,
    generatedAt: summary.generatedAt,
    inspectNext,
    matchClassifications,
    mirror: {
      deckRecords: mirrorDeckRecords,
      strategyPairRecords: mirrorStrategyPairRecords,
    },
    mode: summary.mode,
    overall: {
      averageActions: roundAverage(overall.totalActions, overall.games),
      averageTurns: roundAverage(overall.totalTurns, overall.games),
      deadlockConcedeCount: overall.deadlockConcedeCount,
      deadlockGames: overall.deadlockGames,
      diagnosticCounts: overall.diagnosticCounts,
      fallbackCounts: overall.fallbackCounts,
      games: overall.games,
      noWinnerGames: overall.noWinnerGames,
      terminatedGames: overall.terminatedGames,
      winnerCounts: overall.winnerCounts,
    },
    preset: summary.preset,
    scorecards,
    strategyIds: summary.strategyIds,
    strategyRecords,
    triage,
    worstMatchups,
    diagnostics,
  };
}

function writeStrategyRunArtifacts(summary: StrategySuiteRunSummary): StrategyLabReport {
  writeFileSync(
    join(summary.artifactRoot, "run-summary.json"),
    `${JSON.stringify(summary, null, 2)}\n`,
    "utf8",
  );

  const report = buildStrategyLabReport(summary);
  writeFileSync(
    join(summary.artifactRoot, "benchmark-summary.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  writeFileSync(
    join(summary.artifactRoot, "benchmark-summary.md"),
    buildBenchmarkSummaryMarkdown(report),
    "utf8",
  );

  return report;
}

export function runStrategyLab(options: StrategyLabOptions = {}): StrategySuiteRunSummary {
  const resolvedOptions = resolveStrategyLabPresetOptions(options);
  const artifactBaseRoot = resolvedOptions.artifactRoot ?? STRATEGY_ARTIFACT_ROOT;
  const matchMode = resolvedOptions.matchMode ?? "both";
  const artifactRoot = resolvedOptions.preset
    ? join(
        artifactBaseRoot,
        ...resolveStrategyBenchmarkPresetConfig(resolvedOptions.preset).artifactSegment,
      )
    : join(artifactBaseRoot, matchMode);
  ensureArtifactRoot(artifactRoot);

  const matches = buildStrategyLabMatchDefinitions(resolvedOptions).map((match) =>
    runStrategyMatch(match, {
      artifactRoot,
      turnLimit: 60,
    }),
  );
  const gameCounts = resolveStrategyLabGameCounts(resolvedOptions);
  const candidateManifests =
    resolvedOptions.candidateManifests && resolvedOptions.candidateManifests.length > 0
      ? [...resolvedOptions.candidateManifests]
      : getStrategyCandidateManifests(resolveRunStrategyIds(matches, resolvedOptions.strategyIds));
  const summary: StrategySuiteRunSummary = {
    artifactRoot,
    baselineStrategyId: resolvedOptions.baselineStrategyId ?? PROMOTED_STRATEGY_BASELINE_ID,
    candidateManifests,
    deckIds: resolveRunDeckIds(matches, resolvedOptions.deckIds),
    gameCount: Math.max(
      1,
      resolvedOptions.gameCount ?? Math.max(gameCounts.mirror, gameCounts.crossDeck, 1),
    ),
    gameCounts,
    generatedAt: new Date().toISOString(),
    matches,
    mode: matchMode,
    preset: resolvedOptions.preset,
    strategyIds: resolveRunStrategyIds(matches, resolvedOptions.strategyIds),
  };
  writeStrategyRunArtifacts(summary);

  return summary;
}

export function runCuratedStrategySuite(): StrategySuiteRunSummary {
  ensureArtifactRoot(STRATEGY_ARTIFACT_ROOT);

  const matches = buildMatchDefinitions().map((match) => runStrategyMatch(match));
  const summary: StrategySuiteRunSummary = {
    artifactRoot: STRATEGY_ARTIFACT_ROOT,
    baselineStrategyId: PROMOTED_STRATEGY_BASELINE_ID,
    candidateManifests: [],
    deckIds: resolveRunDeckIds(matches),
    gameCount: 1,
    gameCounts: {
      crossDeck: 1,
      mirror: 0,
    },
    generatedAt: new Date().toISOString(),
    matches,
    mode: "curated",
    strategyIds: resolveRunStrategyIds(matches),
  };
  writeStrategyRunArtifacts(summary);

  return summary;
}

export function strategyArtifactsExist(summary: StrategySuiteRunSummary): boolean {
  return summary.matches.every(
    (match) =>
      existsSync(match.artifactPaths.strategyDecisions) &&
      existsSync(match.artifactPaths.gameRuntime),
  );
}
