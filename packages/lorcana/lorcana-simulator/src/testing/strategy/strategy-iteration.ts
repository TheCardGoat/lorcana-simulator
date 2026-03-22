import { DEFAULT_AUTOMATED_ACTION_STRATEGY_ID } from "@tcg/lorcana-engine";
import { DECK_FIXTURES } from "../../lib/features/simulator-devtools/deck-fixtures/index.js";

export type StrategyBenchmarkPreset = "quick" | "candidate" | "promotion";

export type StrategyCandidateStatus = "draft" | "candidate" | "promoted" | "rejected";

export type StrategyCandidateManifest = {
  candidateId: string;
  changedHeuristics: string[];
  hypothesis: string;
  notes: string;
  parentStrategyId: string;
  status: StrategyCandidateStatus;
};

export const CORE_STRATEGY_BENCHMARK_DECK_IDS = [
  "amber-amethyst-aggressive",
  "amber-amethyst-control",
  "steel-sapphire-midrange",
  "emerald-amethyst-ink",
] as const;

export const PROMOTED_STRATEGY_BASELINE_ID = DEFAULT_AUTOMATED_ACTION_STRATEGY_ID;

export const FULL_STRATEGY_REGRESSION_DECK_IDS = DECK_FIXTURES.map((fixture) => fixture.id);

export const STRATEGY_CANDIDATE_MANIFESTS: readonly StrategyCandidateManifest[] = [
  {
    candidateId: "board-control-lore-race",
    changedHeuristics: [
      "Prefer banishing challenges over questing when the challenge cuts meaningful opposing lore pressure.",
      "Prefer board-developing plays over inking when the play uses current ink and keeps branching bounded.",
    ],
    hypothesis:
      "Board-control lore racing should gain mirror equity by contesting opposing lore engines earlier without collapsing tempo.",
    notes:
      "Use quick and candidate presets to validate same-deck gains first, then promotion to confirm full-fixture regression safety.",
    parentStrategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
    status: "candidate",
  },
  {
    candidateId: "aggressive-board-control-lore-race",
    changedHeuristics: [
      "Reuse the current self-first and structural mulligan opening choices.",
      "Challenge earlier when the opposing exerted character is worth a favorable or equal value trade.",
      "Allow mutual-banish trades when they remove a higher-value opposing lore engine or board anchor.",
    ],
    hypothesis:
      "An aggressive board-control variant should outperform the current board-control profile in threat-dense mirrors by cashing in more value trades before the opponent snowballs lore.",
    notes:
      "Compare it directly against board-control-lore-race and default-lore-race on the quick preset before widening to promotion coverage.",
    parentStrategyId: "board-control-lore-race",
    status: "draft",
  },
] as const;

export function resolveStrategyBenchmarkPreset(
  value = process.env.STRATEGY_PRESET,
): StrategyBenchmarkPreset | undefined {
  return value === "quick" || value === "candidate" || value === "promotion" ? value : undefined;
}

export function getStrategyCandidateManifest(
  candidateId: string,
): StrategyCandidateManifest | undefined {
  return STRATEGY_CANDIDATE_MANIFESTS.find((manifest) => manifest.candidateId === candidateId);
}

export function getStrategyCandidateManifests(
  strategyIds: readonly string[],
): StrategyCandidateManifest[] {
  const selectedStrategyIds = new Set(strategyIds);

  return STRATEGY_CANDIDATE_MANIFESTS.filter((manifest) =>
    selectedStrategyIds.has(manifest.candidateId),
  );
}
