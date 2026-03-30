import { resolveTargetBounds } from "./target-resolver";

export type ResolutionRequirementAnalysis = {
  isOptional: boolean;
  requiresExplicitTargetSelection: boolean;
  allowsExplicitEmptyTargetSelection: boolean;
  requiresAmountSelection: boolean;
  canAutoResolve: boolean;
  requiresChoiceSelection: boolean;
  requiresNamedCardSelection: boolean;
  requiresDestinationSelection: boolean;
  requiresOrderedTargetSelection: boolean;
};

type MutableResolutionRequirementAnalysis = Omit<
  ResolutionRequirementAnalysis,
  "allowsExplicitEmptyTargetSelection" | "canAutoResolve"
> & {
  targetSelectionRequirementCount: number;
  allTargetSelectionsAllowEmpty: boolean;
};

type RecordLike = Record<string, unknown>;

function asRecord(value: unknown): RecordLike | undefined {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as RecordLike)
    : undefined;
}

function visitNestedEffects(record: RecordLike, visit: (value: unknown) => void): void {
  visit(record.effect);
  visit(record.then);
  visit(record.else);
  visit(record.ifTrue);
  visit(record.ifFalse);
  visit(record.trueEffect);
  visit(record.falseEffect);

  for (const key of ["effects", "steps", "options", "choices"]) {
    const nested = record[key];
    if (Array.isArray(nested)) {
      for (const entry of nested) {
        visit(entry);
      }
    }
  }
}

function mergeExplicitTargetSelectionRequirement(
  analysis: MutableResolutionRequirementAnalysis,
  allowsEmpty: boolean,
): void {
  analysis.requiresExplicitTargetSelection = true;
  analysis.targetSelectionRequirementCount += 1;
  analysis.allTargetSelectionsAllowEmpty =
    analysis.targetSelectionRequirementCount === 1
      ? allowsEmpty
      : analysis.allTargetSelectionsAllowEmpty && allowsEmpty;
}

function analyzeCardTargetSelectionRequirement(
  analysis: MutableResolutionRequirementAnalysis,
  target: unknown,
): void {
  const descriptor = normalizeTargetDescriptorForRequirements(target);
  if (!descriptor || descriptor.selector !== "chosen") {
    return;
  }

  const { min } = resolveTargetBounds(descriptor.count, descriptor.selector);
  mergeExplicitTargetSelectionRequirement(analysis, min === 0);
}

function normalizeTargetDescriptorForRequirements(target: unknown): {
  selector?: string;
  count?: unknown;
} | null {
  if (!target) {
    return null;
  }

  if (target === "chosen-for-effect") {
    return null;
  }

  if (typeof target === "string") {
    if (
      target === "previous-target" ||
      target === "selected-first" ||
      target === "selected-all" ||
      target === "CARD_OWNER"
    ) {
      return null;
    }

    if (target.startsWith("CHOSEN_")) {
      return {
        selector: "chosen",
        count: 1,
      };
    }

    return null;
  }

  const record = asRecord(target);
  if (!record) {
    return null;
  }

  if (typeof record.ref === "string" || typeof record.reference === "string") {
    return null;
  }

  return {
    selector: typeof record.selector === "string" ? record.selector : undefined,
    count: record.count,
  };
}

function analyzeChosenPlayerRequirement(
  analysis: MutableResolutionRequirementAnalysis,
  value: unknown,
): void {
  if (value === "CHOSEN_PLAYER") {
    mergeExplicitTargetSelectionRequirement(analysis, false);
  }
}

function isOpponentControlledDiscardTarget(target: unknown): boolean {
  // These targets represent opponents who will choose their own discard via
  // pending effects — the controller does not provide explicit targets upfront.
  return (
    target === "EACH_OPPONENT" || target === "EACH_OTHER_PLAYER" || target === "CHOSEN_OPPONENT"
  );
}

function analyzeOperationalTargetSelectionRequirement(
  analysis: MutableResolutionRequirementAnalysis,
  record: RecordLike,
): void {
  if (record.type === "discard") {
    const from = typeof record.from === "string" ? record.from : "hand";
    // When the target is an opponent (EACH_OPPONENT, etc.), discard selection
    // is handled by the opponent via pending effects — the controller does not
    // need to provide explicit targets at resolveBag time.
    if (
      (record.random !== true || record.chosen === true) &&
      from === "hand" &&
      record.amount !== "all" &&
      !isOpponentControlledDiscardTarget(record.target)
    ) {
      mergeExplicitTargetSelectionRequirement(analysis, false);
    }
  }

  if (record.type === "put-into-inkwell") {
    const source = record.source;
    if (
      source === "hand" ||
      source === "discard" ||
      source === "chosen-card-in-play" ||
      source === "chosen-character"
    ) {
      mergeExplicitTargetSelectionRequirement(analysis, false);
    }
  }
}

function analyzeAmountSelectionRequirement(
  analysis: MutableResolutionRequirementAnalysis,
  record: RecordLike,
): void {
  if ((record.type === "remove-damage" || record.type === "move-damage") && record.upTo === true) {
    analysis.requiresAmountSelection = true;
  }
}

export function analyzeResolutionRequirements(
  effectOrAbility: unknown,
): ResolutionRequirementAnalysis {
  const analysis: MutableResolutionRequirementAnalysis = {
    isOptional: false,
    requiresExplicitTargetSelection: false,
    requiresAmountSelection: false,
    requiresChoiceSelection: false,
    requiresNamedCardSelection: false,
    requiresDestinationSelection: false,
    requiresOrderedTargetSelection: false,
    targetSelectionRequirementCount: 0,
    allTargetSelectionsAllowEmpty: false,
  };

  const visit = (value: unknown): void => {
    if (!value) {
      return;
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        visit(entry);
      }
      return;
    }

    const record = asRecord(value);
    if (!record) {
      return;
    }

    if (record.type === "optional") {
      analysis.isOptional = true;
    }

    if (record.type === "choice" || record.type === "or") {
      analysis.requiresChoiceSelection = true;
    }

    if (record.type === "name-a-card") {
      analysis.requiresNamedCardSelection = true;
    }

    if (
      record.type === "scry" &&
      Array.isArray(record.destinations) &&
      record.destinations.length > 0
    ) {
      analysis.requiresDestinationSelection = true;
    }

    if (record.type === "put-on-bottom" && record.ordering === "player-choice") {
      analysis.requiresOrderedTargetSelection = true;
    }

    analyzeChosenPlayerRequirement(analysis, record.target);
    analyzeChosenPlayerRequirement(analysis, record.chooser);

    // When the effect has chosenBy: "opponent" or "TARGET", target selection is
    // deferred to the opponent via pending effects — the controller does not need
    // to provide explicit targets at resolveBag time.
    const defersTargetSelection = record.chosenBy === "opponent" || record.chosenBy === "TARGET";

    if (!defersTargetSelection) {
      for (const key of ["target", "character", "location", "from", "to", "source", "under"]) {
        analyzeCardTargetSelectionRequirement(analysis, record[key]);
      }
    }

    const amountRecord = asRecord(record.amount);
    if (amountRecord?.target !== undefined && !defersTargetSelection) {
      analyzeCardTargetSelectionRequirement(analysis, amountRecord.target);
    }

    analyzeOperationalTargetSelectionRequirement(analysis, record);
    analyzeAmountSelectionRequirement(analysis, record);
    visitNestedEffects(record, visit);
  };

  visit(effectOrAbility);

  const allowsExplicitEmptyTargetSelection =
    analysis.requiresExplicitTargetSelection &&
    analysis.targetSelectionRequirementCount > 0 &&
    analysis.allTargetSelectionsAllowEmpty;

  return {
    isOptional: analysis.isOptional,
    requiresExplicitTargetSelection: analysis.requiresExplicitTargetSelection,
    allowsExplicitEmptyTargetSelection,
    requiresAmountSelection: analysis.requiresAmountSelection,
    requiresChoiceSelection: analysis.requiresChoiceSelection,
    requiresNamedCardSelection: analysis.requiresNamedCardSelection,
    requiresDestinationSelection: analysis.requiresDestinationSelection,
    requiresOrderedTargetSelection: analysis.requiresOrderedTargetSelection,
    canAutoResolve:
      !analysis.isOptional &&
      !analysis.requiresExplicitTargetSelection &&
      !analysis.requiresChoiceSelection &&
      !analysis.requiresNamedCardSelection &&
      !analysis.requiresDestinationSelection &&
      !analysis.requiresOrderedTargetSelection,
  };
}

export function isOptionalResolution(effectOrAbility: unknown): boolean {
  return analyzeResolutionRequirements(effectOrAbility).isOptional;
}

export function requiresExplicitTargetSelection(effectOrAbility: unknown): boolean {
  return analyzeResolutionRequirements(effectOrAbility).requiresExplicitTargetSelection;
}

export function allowsExplicitEmptyTargetSelection(effectOrAbility: unknown): boolean {
  return analyzeResolutionRequirements(effectOrAbility).allowsExplicitEmptyTargetSelection;
}

export function requiresAmountSelection(effectOrAbility: unknown): boolean {
  return analyzeResolutionRequirements(effectOrAbility).requiresAmountSelection;
}

export function canAutoResolve(effectOrAbility: unknown): boolean {
  return analyzeResolutionRequirements(effectOrAbility).canAutoResolve;
}

export function hasExplicitTargetSelectionInput(targets: unknown): boolean {
  return targets !== undefined;
}

export function countExplicitTargetSelections(targets: unknown): number {
  if (typeof targets === "string") {
    return targets.length > 0 ? 1 : 0;
  }

  if (Array.isArray(targets)) {
    return targets.filter(
      (target): target is string => typeof target === "string" && target.length > 0,
    ).length;
  }

  return 0;
}

export function buildMissingTargetSelectionError(
  commandName: "resolveBag" | "resolveEffect",
  effectOrAbility: unknown,
): string {
  const requirements = analyzeResolutionRequirements(effectOrAbility);
  return requirements.allowsExplicitEmptyTargetSelection
    ? `${commandName} requires explicit targets for this effect; pass targets: [] if you are choosing zero targets`
    : `${commandName} requires explicit targets for this effect`;
}
