import type {
  ResolutionSelectionContext,
  TargetResolutionSelectionContext,
} from "@tcg/lorcana-engine";
import type { GuidanceInlineReference } from "@/features/simulator/model/active-player-guidance.js";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";

export interface ResolutionCopyBundle {
  referenceLabel: string | null;
  subtitle: string;
  detailMessage: string;
  promptMessage: string;
  promptInlineReference: GuidanceInlineReference | null;
  sessionStatusMessage: string;
  optionalContinuationLabel: string | null;
}

interface BuildResolutionCopyBundleParams {
  kind: ResolutionSelectionContext["kind"];
  sourceCard?: LorcanaCardSnapshot | null;
  explicitReferenceLabel?: string | null;
  effectTitle?: string | null;
  abilityIndex?: number | null;
  targetSelectionContext?: TargetResolutionSelectionContext;
}

interface ResolutionInteractionStatusParams {
  kind: ResolutionSelectionContext["kind"];
  phase: "selecting" | "executing";
  selectedTargetCount?: number;
}

function buildInlineReference(
  label: string,
  card: LorcanaCardSnapshot | null,
  prefix: string,
  suffix: string,
): GuidanceInlineReference {
  return {
    label,
    card,
    prefix,
    suffix,
  };
}

function getPrimaryTextEntry(
  sourceCard?: LorcanaCardSnapshot | null,
  abilityIndex?: number | null,
): { title: string; description?: string } | null {
  if (typeof abilityIndex === "number" && abilityIndex >= 0) {
    const indexedEntry = sourceCard?.textEntries?.[abilityIndex];
    if (
      indexedEntry &&
      (indexedEntry.title.trim().length > 0 || (indexedEntry.description?.trim().length ?? 0) > 0)
    ) {
      return indexedEntry;
    }

    return null;
  }

  if ((sourceCard?.textEntries?.length ?? 0) !== 1) {
    return null;
  }

  return (
    sourceCard?.textEntries?.find(
      (entry) => entry.title.trim().length > 0 || (entry.description?.trim().length ?? 0) > 0,
    ) ?? null
  );
}

function getIndexedEffectTitle(
  sourceCard?: LorcanaCardSnapshot | null,
  abilityIndex?: number | null,
): string {
  if (typeof abilityIndex !== "number" || abilityIndex < 0) {
    return "";
  }

  return sourceCard?.textEntries?.[abilityIndex]?.title?.trim() ?? "";
}

function getDefaultResolutionReferenceLabel(
  sourceCard?: LorcanaCardSnapshot | null,
  abilityIndex?: number | null,
): string | null {
  const cardLabel = sourceCard?.label?.trim() ?? "";
  if (!cardLabel) {
    return null;
  }

  const indexedTitle = getIndexedEffectTitle(sourceCard, abilityIndex);
  if (indexedTitle) {
    return `${cardLabel}: ${indexedTitle}`;
  }

  const titledTextEntry =
    typeof abilityIndex === "number" && abilityIndex >= 0
      ? null
      : (sourceCard?.textEntries?.length ?? 0) === 1
        ? sourceCard?.textEntries?.find((entry) => entry.title.trim().length > 0)
        : null;
  const title = titledTextEntry?.title.trim() ?? "";

  if (title) {
    return `${cardLabel}: ${title}`;
  }

  return cardLabel;
}

function combineResolutionReferenceLabel(
  sourceCard?: LorcanaCardSnapshot | null,
  effectTitle?: string | null,
): string | null {
  const cardLabel = sourceCard?.label?.trim() ?? "";
  const title = effectTitle?.trim() ?? "";

  if (cardLabel && title) {
    return `${cardLabel}: ${title}`;
  }

  if (title) {
    return title;
  }

  return cardLabel || null;
}

function getResolvedReferenceLabel(params: BuildResolutionCopyBundleParams): string | null {
  const resolvedEffectTitle =
    params.effectTitle?.trim() || getIndexedEffectTitle(params.sourceCard, params.abilityIndex);

  return (
    params.explicitReferenceLabel ??
    (resolvedEffectTitle
      ? combineResolutionReferenceLabel(params.sourceCard, resolvedEffectTitle)
      : null) ??
    getDefaultResolutionReferenceLabel(params.sourceCard, params.abilityIndex)
  );
}

function getOptionalPendingEffectDetail(
  sourceCard?: LorcanaCardSnapshot | null,
  abilityIndex?: number | null,
): string | null {
  const primaryTextEntry = getPrimaryTextEntry(sourceCard, abilityIndex);
  const title = primaryTextEntry?.title.trim();
  const description = primaryTextEntry?.description?.trim();

  if (title && description) {
    return `Resolve optional effect from ${sourceCard?.label ?? "this card"}: ${title}. ${description}`;
  }

  if (description) {
    return `Resolve optional effect from ${sourceCard?.label ?? "this card"}: ${description}`;
  }

  const cardText = sourceCard?.text?.trim();
  if (cardText) {
    return `Resolve optional effect from ${sourceCard?.label ?? "this card"}: ${cardText}`;
  }

  return null;
}

function getPendingEffectSubtitle(kind?: string): string {
  switch (kind) {
    case "optional-selection":
      return "Optional effect";
    case "target-selection":
      return "Target selection required";
    case "choice-selection":
      return "Choose an effect";
    case "discard-choice":
      return "Discard choice required";
    case "name-card-selection":
      return "Card name required";
    case "scry-selection":
      return "Scry ordering required";
    default:
      return "Pending resolution";
  }
}

function getPendingEffectDetail(params: BuildResolutionCopyBundleParams): string {
  const referenceLabel = getResolvedReferenceLabel(params);

  switch (params.kind) {
    case "optional-selection":
      return (
        getOptionalPendingEffectDetail(params.sourceCard, params.abilityIndex) ??
        "This effect can be accepted or declined directly from the simulator."
      );
    case "target-selection":
      return referenceLabel
        ? `Select the required target or player for ${referenceLabel}.`
        : "Select the required target or player before resolving this effect.";
    case "choice-selection":
      return referenceLabel
        ? `Choose how ${referenceLabel} resolves.`
        : "Choose a branch before resolving this effect.";
    case "discard-choice":
      return referenceLabel
        ? `Choose the cards to discard for ${referenceLabel}.`
        : "Choose the cards to discard before resolving this effect.";
    case "name-card-selection":
      return referenceLabel
        ? `Name a card before resolving ${referenceLabel}.`
        : "Name a card before resolving this effect.";
    case "scry-selection":
      return referenceLabel
        ? `Arrange the revealed cards to finish resolving ${referenceLabel}.`
        : "Arrange the revealed cards to finish resolving this scry effect.";
    default:
      return "This effect is queued and waiting for additional input.";
  }
}

function buildPromptContent(
  params: BuildResolutionCopyBundleParams,
): Pick<ResolutionCopyBundle, "promptMessage" | "promptInlineReference"> {
  const referenceLabel = getResolvedReferenceLabel(params);
  const sourceCard = params.sourceCard ?? null;

  if (!referenceLabel) {
    return {
      promptMessage: getPendingEffectDetail(params),
      promptInlineReference: null,
    };
  }

  if (params.kind === "target-selection" || params.kind === "discard-choice") {
    if (!params.targetSelectionContext || params.targetSelectionContext.maxSelections <= 1) {
      return {
        promptMessage: `Select the required target or player for ${referenceLabel}.`,
        promptInlineReference: buildInlineReference(
          referenceLabel,
          sourceCard,
          "Select the required target or player for ",
          ".",
        ),
      };
    }

    const rangeLabel =
      params.targetSelectionContext.minSelections === params.targetSelectionContext.maxSelections
        ? String(params.targetSelectionContext.maxSelections)
        : `${params.targetSelectionContext.minSelections}-${params.targetSelectionContext.maxSelections}`;
    const prefix = `Select ${rangeLabel} valid target${params.targetSelectionContext.maxSelections === 1 ? "" : "s"} for `;

    return {
      promptMessage: `${prefix}${referenceLabel}.`,
      promptInlineReference: buildInlineReference(referenceLabel, sourceCard, prefix, "."),
    };
  }

  if (params.kind === "choice-selection") {
    return {
      promptMessage: referenceLabel
        ? `Choose an effect for ${referenceLabel}.`
        : "Choose an effect to resolve.",
      promptInlineReference: referenceLabel
        ? buildInlineReference(referenceLabel, sourceCard, "Choose an effect for ", ".")
        : null,
    };
  }

  if (params.kind === "optional-selection") {
    const primaryTextEntry = getPrimaryTextEntry(params.sourceCard, params.abilityIndex);
    const cardLabel = params.sourceCard?.label?.trim() ?? "";
    const title = primaryTextEntry?.title.trim() ?? "";
    const description = primaryTextEntry?.description?.trim() ?? "";

    if (cardLabel && title && description) {
      return {
        promptMessage: `Resolve optional effect from ${cardLabel}: ${title}. ${description}`,
        promptInlineReference: buildInlineReference(
          `${cardLabel}: ${title}.`,
          sourceCard,
          "Resolve optional effect from ",
          ` ${description}`,
        ),
      };
    }

    return {
      promptMessage: `Accept or decline ${referenceLabel} directly from the simulator.`,
      promptInlineReference: buildInlineReference(
        referenceLabel,
        sourceCard,
        "Accept or decline ",
        " directly from the simulator.",
      ),
    };
  }

  if (params.kind === "name-card-selection") {
    return {
      promptMessage: `Name a card before resolving ${referenceLabel}.`,
      promptInlineReference: buildInlineReference(
        referenceLabel,
        sourceCard,
        "Name a card before resolving ",
        ".",
      ),
    };
  }

  if (params.kind === "scry-selection") {
    return {
      promptMessage: `Arrange the revealed cards to finish resolving ${referenceLabel}.`,
      promptInlineReference: buildInlineReference(
        referenceLabel,
        sourceCard,
        "Arrange the revealed cards to finish resolving ",
        ".",
      ),
    };
  }

  return {
    promptMessage: getPendingEffectDetail(params),
    promptInlineReference: null,
  };
}

function buildSessionStatusMessage(params: BuildResolutionCopyBundleParams): string {
  const referenceLabel = getResolvedReferenceLabel(params);

  if (!referenceLabel) {
    return params.kind === "target-selection" || params.kind === "discard-choice"
      ? `Select target${params.targetSelectionContext?.maxSelections === 1 ? "" : "s"} for this effect.`
      : params.kind === "choice-selection"
        ? "Choose how this effect resolves."
        : params.kind === "optional-selection"
          ? "Choose whether to resolve this optional effect."
          : params.kind === "name-card-selection"
            ? "Name a card to continue resolving this effect."
            : params.kind === "scry-selection"
              ? "Arrange the revealed cards to finish resolving this effect."
              : "Finish choosing how this effect resolves.";
  }

  if (params.kind === "target-selection" || params.kind === "discard-choice") {
    return `Select target${params.targetSelectionContext?.maxSelections === 1 ? "" : "s"} for ${referenceLabel}.`;
  }

  if (params.kind === "choice-selection") {
    return `Choose how ${referenceLabel} resolves.`;
  }

  if (params.kind === "optional-selection") {
    return `Choose whether to resolve ${referenceLabel}.`;
  }

  if (params.kind === "name-card-selection") {
    return `Name a card to continue resolving ${referenceLabel}.`;
  }

  if (params.kind === "scry-selection") {
    return `Arrange the revealed cards to finish resolving ${referenceLabel}.`;
  }

  return "Finish choosing how this effect resolves.";
}

export function buildResolutionCopyBundle(
  params: BuildResolutionCopyBundleParams,
): ResolutionCopyBundle {
  const referenceLabel = getResolvedReferenceLabel(params);
  const promptContent = buildPromptContent(params);

  return {
    referenceLabel,
    subtitle: getPendingEffectSubtitle(params.kind),
    detailMessage: getPendingEffectDetail(params),
    promptMessage: promptContent.promptMessage,
    promptInlineReference: promptContent.promptInlineReference,
    sessionStatusMessage: buildSessionStatusMessage(params),
    optionalContinuationLabel: referenceLabel
      ? `Resolve optional effect from ${referenceLabel}`
      : null,
  };
}

export function getResolutionInteractionStatusMessage(
  params: ResolutionInteractionStatusParams,
): string {
  if (params.phase === "executing") {
    return "Executing...";
  }

  if (params.kind === "target-selection" || params.kind === "discard-choice") {
    return params.selectedTargetCount && params.selectedTargetCount > 0
      ? `Selecting targets (${params.selectedTargetCount} selected)...`
      : "Selecting targets...";
  }

  if (params.kind === "choice-selection") {
    return "Choosing resolution option...";
  }

  if (params.kind === "optional-selection") {
    return "Deciding whether to resolve...";
  }

  if (params.kind === "name-card-selection") {
    return "Naming a card...";
  }

  if (params.kind === "scry-selection") {
    return "Arranging revealed cards...";
  }

  return "Resolving...";
}
