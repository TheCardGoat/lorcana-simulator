import type {
  AutomatedActionCandidate,
  AutomatedActionCandidateSummary,
  AutomatedActionPlanningContext,
} from "../types";

export type ChallengePriorityMode = "default" | "board-control" | "aggressive-board-control";

export type LoreRaceHeuristicPreferences = {
  challengePriorityMode: ChallengePriorityMode;
  inkPrintedCostDirection: "asc" | "desc";
  preferSimplePermanentDevelopment: boolean;
  playCardNetCostDirection: "asc" | "desc";
};

export type DetailedCandidateSummary = AutomatedActionCandidateSummary & {
  ranking: {
    abilityComplexity?: number;
    challengeAttackerSurvives?: boolean;
    challengeAttackerLore?: number;
    challengeAttackerValue?: number;
    challengeDefenderLore?: number;
    challengeDefenderValue?: number;
    challengeDefenderWouldBeBanished?: boolean;
    challengeLoreSwing?: number;
    challengeMeaningfulThreat?: boolean;
    challengePriorityBoost?: boolean;
    challengeRemovesBlocker?: boolean;
    challengeRemovesQuestThreat?: boolean;
    challengeTradeValueDelta?: number;
    familyOrder: number;
    inkDuplicateCount?: number;
    inkLore?: number;
    inkPrintedCost?: number;
    keepAllPreferred?: boolean;
    planOrder?: number;
    playCardComplexity?: number;
    playCardNetCost?: number;
    printedLore?: number;
    simpleDevelopmentPlay?: boolean;
    selfFirst?: boolean;
  };
};

export type FamilyEvaluation = {
  ranking: Partial<DetailedCandidateSummary["ranking"]>;
};

export type FamilyEvaluator<TCandidate extends AutomatedActionCandidate> = (
  context: AutomatedActionPlanningContext,
  candidate: TCandidate,
  preferences: LoreRaceHeuristicPreferences,
) => FamilyEvaluation;
