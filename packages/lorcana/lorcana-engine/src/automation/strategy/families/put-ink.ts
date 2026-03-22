import type { AutomatedActionCandidate, AutomatedActionPlanningContext } from "../../types";
import type {
  FamilyEvaluation,
  FamilyEvaluator,
  LoreRaceHeuristicPreferences,
} from "../internal-types";
import { countCopiesInHand, getPrintedCost, getPrintedLore } from "../common";

type PutInkCandidate = Extract<AutomatedActionCandidate, { family: "putCardIntoInkwell" }>;

export const evaluatePutInk: FamilyEvaluator<PutInkCandidate> = (
  context,
  candidate,
): FamilyEvaluation => ({
  ranking: {
    inkDuplicateCount: countCopiesInHand(context, context.actorId, candidate.cardId),
    inkPrintedCost: getPrintedCost(context, candidate.cardId),
    inkLore: getPrintedLore(context, candidate.cardId),
  },
});

export function comparePutInk(
  left: FamilyEvaluation["ranking"],
  right: FamilyEvaluation["ranking"],
  preferences: LoreRaceHeuristicPreferences,
): number {
  const duplicateOrder = (right.inkDuplicateCount ?? 0) - (left.inkDuplicateCount ?? 0);
  if (duplicateOrder !== 0) {
    return duplicateOrder;
  }

  const costOrder =
    preferences.inkPrintedCostDirection === "desc"
      ? (right.inkPrintedCost ?? 0) - (left.inkPrintedCost ?? 0)
      : (left.inkPrintedCost ?? 0) - (right.inkPrintedCost ?? 0);
  if (costOrder !== 0) {
    return costOrder;
  }

  return (left.inkLore ?? 0) - (right.inkLore ?? 0);
}
