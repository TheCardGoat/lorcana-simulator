import type {
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
} from "@/features/simulator/model/contracts.js";
import {
  describeTargetBadges,
  evaluateCardTargetMatches,
} from "@/features/simulator/model/discard-target-dsl.js";
import type { LorcanaCardTarget } from "@tcg/lorcana-engine";

export function buildCardTargetDialogState(params: {
  cards: LorcanaCardSnapshot[];
  target: LorcanaCardTarget | null;
  viewerSide?: LorcanaPlayerSide | null;
  selectedCardIds?: string[];
  selectedPlayerCount?: number;
}) {
  const {
    cards,
    target,
    viewerSide = null,
    selectedCardIds = [],
    selectedPlayerCount = 0,
  } = params;
  const evaluation = target
    ? evaluateCardTargetMatches(cards, target, {
        viewerSide: viewerSide ?? undefined,
      })
    : {
        matchedCards: cards,
        unsupportedFilters: [],
      };

  return {
    evaluation,
    badgeModels: target ? describeTargetBadges(target, evaluation.unsupportedFilters) : [],
    orderedCards: evaluation.matchedCards.slice().reverse(),
    selectedCount: selectedCardIds.length + selectedPlayerCount,
  };
}
