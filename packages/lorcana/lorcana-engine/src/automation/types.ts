import type { Amount } from "@tcg/lorcana-types";

import type { DeepReadonly, CardInstanceId, CommandResult, PlayerId } from "#core";
import type { ChallengePreviewResult, PlayCardCostInput } from "../lorcana-engine-base";
import type {
  BagEffectEntry,
  LorcanaMatchState,
  LorcanaProjectedBoardView,
  PendingActionEffect,
} from "../types";

export type AutomatedActionFamily =
  | "chooseWhoGoesFirst"
  | "alterHand"
  | "resolveBag"
  | "resolveEffect"
  | "putCardIntoInkwell"
  | "playCard"
  | "activateAbility"
  | "quest"
  | "challenge"
  | "moveCharacterToLocation";

export interface AutomatedActionSearchCaps {
  targetPool: number;
  targetCombinationsPerFamily: number;
  choiceIndices: number;
  singerCombinations: number;
  pendingItems: number;
}

export const DEFAULT_AUTOMATED_ACTION_SEARCH_CAPS: AutomatedActionSearchCaps = {
  targetPool: 8,
  targetCombinationsPerFamily: 16,
  choiceIndices: 8,
  singerCombinations: 16,
  pendingItems: 8,
};

export const DEFAULT_AUTOMATED_ACTION_MAX_EXECUTION_FAILURES = 3;

export type AutomatedActionTargetId = CardInstanceId | PlayerId;

export type AutomatedActionCostSelections = {
  banishCharacters?: CardInstanceId[];
  banishItems?: CardInstanceId[];
  discardCards?: CardInstanceId[];
  exertCharacters?: CardInstanceId[];
};

export type AutomatedActionCandidate =
  | {
      family: "chooseWhoGoesFirst";
      firstPlayerId: PlayerId;
    }
  | {
      family: "alterHand";
      cardsToMulligan: CardInstanceId[];
      plan: "keep-all" | "structural-mulligan" | "full-mulligan";
    }
  | {
      family: "resolveBag";
      bagId: string;
      choiceIndex?: number;
      resolveOptional?: boolean;
      targets?: AutomatedActionTargetId[];
    }
  | {
      family: "resolveEffect";
      effectId: string;
      choiceIndex?: number;
      resolveOptional?: boolean;
      targets?: AutomatedActionTargetId[];
    }
  | {
      family: "putCardIntoInkwell";
      cardId: CardInstanceId;
    }
  | {
      family: "playCard";
      cardId: CardInstanceId;
      cost: PlayCardCostInput;
      choiceIndex?: number;
      resolveOptional?: boolean;
      targets?: AutomatedActionTargetId[];
    }
  | {
      family: "activateAbility";
      cardId: CardInstanceId;
      abilityIndex: number;
      choiceIndex?: number;
      costs?: AutomatedActionCostSelections;
      targets?: AutomatedActionTargetId[];
    }
  | {
      family: "quest";
      cardId: CardInstanceId;
    }
  | {
      family: "challenge";
      attackerId: CardInstanceId;
      defenderId: CardInstanceId;
      preview?: ChallengePreviewResult | null;
    }
  | {
      family: "moveCharacterToLocation";
      characterId: CardInstanceId;
      locationId: CardInstanceId;
    };

export type AutomatedActionDiagnostic =
  | {
      kind: "unsupported-shape";
      family: AutomatedActionFamily;
      reason: string;
      sourceCardId?: CardInstanceId;
      abilityIndex?: number;
      bagId?: string;
      effectId?: string;
    }
  | {
      kind: "overflow-skip";
      family: AutomatedActionFamily;
      reason: string;
      cap: number;
      actual: number;
      sourceCardId?: CardInstanceId;
      abilityIndex?: number;
      bagId?: string;
      effectId?: string;
    }
  | {
      kind: "validation-reject";
      family: AutomatedActionFamily;
      reason: string;
      code?: string;
      candidate: AutomatedActionCandidate;
    }
  | {
      kind: "actor-resolution";
      reason: string;
      source:
        | "scoped-player"
        | "pending-effect-chooser"
        | "bag-chooser"
        | "choosing-first-player"
        | "pending-mulligan"
        | "priority-holder"
        | "unresolved";
      actorId?: PlayerId;
    };

export interface AutomatedActionDiagnosticSink {
  push(diagnostic: AutomatedActionDiagnostic): void;
}

export interface AutomatedActionAuthoritativeHints {
  actorBoard: LorcanaProjectedBoardView;
  bagItems: readonly BagEffectEntry[];
  pendingEffects: readonly PendingActionEffect[];
  state: DeepReadonly<LorcanaMatchState>;
}

export interface AutomatedActionPlanningContext {
  actorId: PlayerId;
  authoritativeHints?: AutomatedActionAuthoritativeHints;
  board: LorcanaProjectedBoardView;
  diagnostics: AutomatedActionDiagnosticSink;
  gameSegment?: string;
  phase?: string;
  step?: string | null;
  turnNumber: number;
}

export interface AutomatedActionStrategy {
  name: string;
  rankCandidates(
    context: AutomatedActionPlanningContext,
    candidates: readonly AutomatedActionCandidate[],
  ): AutomatedActionCandidate[];
}

export type AutomatedActionTraceHeuristicValue = boolean | number | string;

export interface AutomatedActionCandidateHeuristic {
  direction: "asc" | "desc" | "preferTrue";
  key: string;
  value: AutomatedActionTraceHeuristicValue;
}

export interface AutomatedActionCandidateSummary {
  candidate: AutomatedActionCandidate;
  family: AutomatedActionFamily;
  heuristics: readonly AutomatedActionCandidateHeuristic[];
  stableKey: string;
}

export interface AutomatedActionBoardSnapshot {
  bagCount: number;
  boardCounts: Readonly<Record<PlayerId, number>>;
  handCounts: Readonly<Record<PlayerId, number>>;
  inkCounts: Readonly<Record<PlayerId, number>>;
  loreTotals: Readonly<Record<PlayerId, number>>;
  pendingEffectCount: number;
  stateFingerprint: string;
}

export interface AutomatedActionDecisionTraceExecutionAttempt {
  candidate: AutomatedActionCandidateSummary;
  error?: string;
  errorCode?: string;
  stateId?: number;
  success: boolean;
}

export interface AutomatedActionDecisionTraceFinalResult {
  error?: string;
  errorCode?: string;
  stateId?: number;
  success: boolean;
}

export interface AutomatedActionDecisionTrace {
  actorId?: PlayerId;
  boardSnapshot: AutomatedActionBoardSnapshot;
  diagnostics: AutomatedActionDiagnostic[];
  executionAttempts: AutomatedActionDecisionTraceExecutionAttempt[];
  fallbackTaken?: AutomatedActionFallback;
  finalResult?: AutomatedActionDecisionTraceFinalResult;
  gameSegment?: string;
  kind: "enumeration" | "execution";
  orderedCandidates: AutomatedActionCandidateSummary[];
  phase?: string;
  selectedCandidate?: AutomatedActionCandidateSummary;
  step?: string | null;
  strategyName: string;
  turnNumber: number;
  unsupportedSkips: Array<
    Extract<AutomatedActionDiagnostic, { kind: "unsupported-shape" } | { kind: "overflow-skip" }>
  >;
  validationSkips: Array<Extract<AutomatedActionDiagnostic, { kind: "validation-reject" }>>;
}

export interface AutomatedActionTraceSink {
  push(trace: AutomatedActionDecisionTrace): void;
}

export interface AutomatedActionEnumerationOptions {
  searchCaps?: Partial<AutomatedActionSearchCaps>;
  strategy?: AutomatedActionStrategy;
  traceSink?: AutomatedActionTraceSink;
}

export interface AutomatedActionExecutionOptions extends AutomatedActionEnumerationOptions {
  maxExecutionFailures?: number;
}

export interface AutomatedActionEnumerationResult {
  actorId?: PlayerId;
  candidates: AutomatedActionCandidate[];
  diagnostics: AutomatedActionDiagnostic[];
  unsupportedSkips: Array<
    Extract<AutomatedActionDiagnostic, { kind: "unsupported-shape" } | { kind: "overflow-skip" }>
  >;
  validationSkips: Array<Extract<AutomatedActionDiagnostic, { kind: "validation-reject" }>>;
}

export interface AutomatedActionExecutionAttempt {
  candidate: AutomatedActionCandidate;
  result: CommandResult;
}

export type AutomatedActionFallback = "passTurn" | "concede";

export interface AutomatedActionExecutionResult {
  actorId?: PlayerId;
  diagnostics: AutomatedActionDiagnostic[];
  executionAttempts: AutomatedActionExecutionAttempt[];
  fallbackTaken?: AutomatedActionFallback;
  finalResult: CommandResult;
  orderedCandidates: AutomatedActionCandidate[];
  selectedCandidate?: AutomatedActionCandidate;
  unsupportedSkips: Array<
    Extract<AutomatedActionDiagnostic, { kind: "unsupported-shape" } | { kind: "overflow-skip" }>
  >;
  validationSkips: Array<Extract<AutomatedActionDiagnostic, { kind: "validation-reject" }>>;
}

export type AutomatedActionResolutionShape = {
  choiceCount: number;
  choiceOptionCount?: number;
  optionalCount: number;
  requiresDestinations: boolean;
  requiresNamedCard: boolean;
  requiresOrderedTargets: boolean;
  usesAmountSelection: boolean;
};

export type AutomatedActionResolutionVariant = {
  choiceIndex?: number;
  resolveOptional?: boolean;
  targets?: AutomatedActionTargetId[];
};

export type AutomatedActionEffectSupport = {
  reason?: string;
  shape: AutomatedActionResolutionShape;
  supported: boolean;
};

export type AutomatedActionAmount = Amount;
