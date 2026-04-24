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
  /**
   * When the caller already scoped `cards` to the engine-published
   * `cardCandidateIds`, set this to `true`. The dialog skips its parallel
   * filter evaluation (which lacks engine context such as event snapshots,
   * granted keywords, and trigger references) and treats every input card
   * as a match. Badges and unsupported-filter warnings are still derived
   * from `target` so the operator can read the constraints.
   */
  trustCandidates?: boolean;
}) {
  const {
    cards,
    target,
    viewerSide = null,
    selectedCardIds = [],
    selectedPlayerCount = 0,
    trustCandidates = false,
  } = params;

  let evaluation;
  if (!target) {
    evaluation = { matchedCards: cards, unsupportedFilters: [] };
  } else if (trustCandidates) {
    evaluation = { matchedCards: cards, unsupportedFilters: [] };
  } else {
    evaluation = evaluateCardTargetMatches(cards, target, {
      viewerSide: viewerSide ?? undefined,
    });
  }

  return {
    evaluation,
    badgeModels: target ? describeTargetBadges(target, evaluation.unsupportedFilters) : [],
    orderedCards: evaluation.matchedCards.slice().reverse(),
    selectedCount: selectedCardIds.length + selectedPlayerCount,
  };
}
