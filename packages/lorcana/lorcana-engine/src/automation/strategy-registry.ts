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
export const LEGACY_LORE_RACE_STRATEGY_ID = "legacy-lore-race";
export const BOARD_CONTROL_LORE_RACE_STRATEGY_ID = "board-control-lore-race";
export const AGGRESSIVE_BOARD_CONTROL_LORE_RACE_STRATEGY_ID = "aggressive-board-control-lore-race";

export const AUTOMATED_ACTION_STRATEGIES: readonly AutomatedActionStrategyOption[] = [
  {
    id: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
    label: "Default lore race",
    description: "Uses the current engine heuristics to favor clean lore progress and legal tempo.",
    strategy: defaultLoreRaceAutomatedActionStrategy,
  },
  {
    id: LEGACY_LORE_RACE_STRATEGY_ID,
    label: "Legacy lore race",
    description:
      "Uses the legacy lore-race heuristic ordering for comparison and regression checks.",
    strategy: legacyLoreRaceAutomatedActionStrategy,
  },
  {
    id: BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
    label: "Board control lore race",
    description:
      "Pressures lore while trading off tempo to remove opposing quest threats and develop stable permanents.",
    strategy: boardControlLoreRaceAutomatedActionStrategy,
  },
  {
    id: AGGRESSIVE_BOARD_CONTROL_LORE_RACE_STRATEGY_ID,
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
