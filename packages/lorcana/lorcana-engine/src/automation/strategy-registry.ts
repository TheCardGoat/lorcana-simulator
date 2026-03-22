import {
  aggressiveBoardControlLoreRaceAutomatedActionStrategy,
  boardControlLoreRaceAutomatedActionStrategy,
  defaultLoreRaceAutomatedActionStrategy,
  legacyLoreRaceAutomatedActionStrategy,
} from "./default-strategy";
import type { AutomatedActionStrategy } from "./types";

export interface AutomatedActionStrategyOption {
  id: string;
  label: string;
  description: string;
  strategy: AutomatedActionStrategy;
}

export const DEFAULT_AUTOMATED_ACTION_STRATEGY_ID = "default-lore-race";

export const AUTOMATED_ACTION_STRATEGIES: readonly AutomatedActionStrategyOption[] = [
  {
    id: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
    label: "Default lore race",
    description: "Uses the current engine heuristics to favor clean lore progress and legal tempo.",
    strategy: defaultLoreRaceAutomatedActionStrategy,
  },
  {
    id: "legacy-lore-race",
    label: "Legacy lore race",
    description:
      "Uses the legacy lore-race heuristic ordering for comparison and regression checks.",
    strategy: legacyLoreRaceAutomatedActionStrategy,
  },
  {
    id: "board-control-lore-race",
    label: "Board control lore race",
    description:
      "Pressures lore while trading off tempo to remove opposing quest threats and develop stable permanents.",
    strategy: boardControlLoreRaceAutomatedActionStrategy,
  },
  {
    id: "aggressive-board-control-lore-race",
    label: "Aggressive board control lore race",
    description:
      "Reuses the stable opening plan but pushes harder into value trades and mutual-banish challenges to break opposing boards.",
    strategy: aggressiveBoardControlLoreRaceAutomatedActionStrategy,
  },
];

export function getAutomatedActionStrategyOption(
  strategyId: string,
): AutomatedActionStrategyOption | undefined {
  return AUTOMATED_ACTION_STRATEGIES.find((option) => option.id === strategyId);
}
