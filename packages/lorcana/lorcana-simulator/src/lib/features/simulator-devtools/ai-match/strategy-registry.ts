import { defaultLoreRaceAutomatedActionStrategy } from "@tcg/lorcana-engine";
import type { AutomatedMatchStrategyOption } from "./types.js";

export const DEFAULT_AUTOMATED_MATCH_STRATEGY_ID = "default-lore-race";

export const AUTOMATED_MATCH_STRATEGIES: readonly AutomatedMatchStrategyOption[] = [
  {
    id: DEFAULT_AUTOMATED_MATCH_STRATEGY_ID,
    label: "Default lore race",
    description: "Uses the current engine heuristics to favor clean lore progress and legal tempo.",
    strategy: defaultLoreRaceAutomatedActionStrategy,
  },
];

export function getAutomatedMatchStrategyOption(
  strategyId: string,
): AutomatedMatchStrategyOption | undefined {
  return AUTOMATED_MATCH_STRATEGIES.find((option) => option.id === strategyId);
}
