import type { TargetResolutionSelectionContext } from "@tcg/lorcana-engine";
import type {
  AvailableMovesSelectionEntry,
  LorcanaCardSnapshot,
  ResolutionTargetSelectionSlotState,
} from "@/features/simulator/model/contracts.js";

export type SupportedResolutionTargetEffectType = "move-damage" | "move-to-location";

type CardSnapshotMap = Record<string, LorcanaCardSnapshot>;

type ResolutionTargetPromptState = {
  effectType: SupportedResolutionTargetEffectType;
  candidateEntries: AvailableMovesSelectionEntry[];
  activeSlotIndex: number | null;
  slots: ResolutionTargetSelectionSlotState[];
};

const SLOT_LABELS: Record<
  SupportedResolutionTargetEffectType,
  readonly [
    ResolutionTargetSelectionSlotState["label"],
    ResolutionTargetSelectionSlotState["label"],
  ]
> = {
  "move-damage": ["Move damage from", "Move damage to"],
  "move-to-location": ["Character to move", "Move to location"],
};

const SLOT_CARD_TYPES: Record<
  SupportedResolutionTargetEffectType,
  readonly [
    ResolutionTargetSelectionSlotState["cardType"],
    ResolutionTargetSelectionSlotState["cardType"],
  ]
> = {
  "move-damage": ["character", "character"],
  "move-to-location": ["character", "location"],
};

function buildSelectedLabel(
  targetId: string | null,
  context: TargetResolutionSelectionContext,
  cardSnapshotsById: CardSnapshotMap,
): string | null {
  if (!targetId) {
    return null;
  }

  const card = cardSnapshotsById[targetId] ?? null;
  if (card) {
    return card.label;
  }

  if (context.playerCandidateIds.some((candidateId) => String(candidateId) === String(targetId))) {
    return targetId;
  }

  return targetId;
}

function buildSlotStates(
  effectType: SupportedResolutionTargetEffectType,
  selectedTargets: readonly string[],
  preselectedTargetCount: number,
  context: TargetResolutionSelectionContext,
  cardSnapshotsById: CardSnapshotMap,
): ResolutionTargetSelectionSlotState[] {
  const labels = SLOT_LABELS[effectType];
  const cardTypes = SLOT_CARD_TYPES[effectType];

  return labels.map((label, index) => {
    const targetId = selectedTargets[index] ?? null;
    const card = targetId ? (cardSnapshotsById[targetId] ?? null) : null;

    return {
      id: `${effectType}:slot:${index}`,
      label,
      cardType: cardTypes[index],
      targetId,
      targetLabel: buildSelectedLabel(targetId, context, cardSnapshotsById),
      targetCardId: card?.cardId ?? (card ? null : targetId),
      locked: index < preselectedTargetCount,
    };
  });
}

function getDefaultActiveSlotIndex(
  slots: readonly ResolutionTargetSelectionSlotState[],
): number | null {
  const unfilledEditableSlot = slots.findIndex((slot) => !slot.locked && !slot.targetId);
  if (unfilledEditableSlot >= 0) {
    return unfilledEditableSlot;
  }

  const lastEditableSlot = [...slots].reverse().find((slot) => !slot.locked);
  if (!lastEditableSlot) {
    return null;
  }

  return slots.findIndex((slot) => slot.id === lastEditableSlot.id);
}

function buildCandidateEntriesForSlot(params: {
  effectType: SupportedResolutionTargetEffectType;
  slotIndex: number;
  slots: readonly ResolutionTargetSelectionSlotState[];
  entries: readonly AvailableMovesSelectionEntry[];
  cardSnapshotsById: CardSnapshotMap;
}): AvailableMovesSelectionEntry[] {
  const { effectType, slotIndex, slots, entries, cardSnapshotsById } = params;
  const slot = slots[slotIndex];
  if (!slot) {
    return [];
  }

  return entries.filter((entry) => {
    if (entry.kind !== "card" || !entry.cardId) {
      return false;
    }

    const card = cardSnapshotsById[entry.cardId] ?? null;
    if (!card || card.cardType !== slot.cardType) {
      return false;
    }

    if (
      effectType === "move-damage" &&
      slotIndex === 1 &&
      slots[0]?.targetId &&
      entry.cardId === slots[0].targetId
    ) {
      return false;
    }

    return true;
  });
}

export function isSupportedResolutionTargetEffectType(
  effectType: string | null | undefined,
): effectType is SupportedResolutionTargetEffectType {
  return effectType === "move-damage" || effectType === "move-to-location";
}

export function buildResolutionTargetPromptState(params: {
  effectType: SupportedResolutionTargetEffectType | null;
  context: TargetResolutionSelectionContext;
  entries: readonly AvailableMovesSelectionEntry[];
  selectedTargets: readonly string[];
  cardSnapshotsById: CardSnapshotMap;
  preferredActiveSlotIndex?: number | null;
}): ResolutionTargetPromptState | null {
  const {
    effectType,
    context,
    entries,
    selectedTargets,
    cardSnapshotsById,
    preferredActiveSlotIndex,
  } = params;
  if (!effectType || context.playerCandidateIds.length > 0) {
    return null;
  }

  const preselectedTargetCount = context.currentSelection.targets?.length ?? 0;
  const slots = buildSlotStates(
    effectType,
    selectedTargets,
    preselectedTargetCount,
    context,
    cardSnapshotsById,
  );
  const activeSlotIndex =
    typeof preferredActiveSlotIndex === "number" &&
    preferredActiveSlotIndex >= 0 &&
    preferredActiveSlotIndex < slots.length &&
    !slots[preferredActiveSlotIndex]?.locked
      ? preferredActiveSlotIndex
      : getDefaultActiveSlotIndex(slots);
  const candidateEntries =
    activeSlotIndex === null
      ? []
      : buildCandidateEntriesForSlot({
          effectType,
          slotIndex: activeSlotIndex,
          slots,
          entries,
          cardSnapshotsById,
        });

  return {
    effectType,
    candidateEntries,
    activeSlotIndex,
    slots,
  };
}

export function getResolutionTargetPromptMessage(
  effectType: SupportedResolutionTargetEffectType | null,
  activeSlotIndex: number | null,
): string | null {
  if (effectType === "move-damage") {
    if (activeSlotIndex === 0) {
      return "Choose the character to move damage from.";
    }

    if (activeSlotIndex === 1) {
      return "Choose the character to move damage to.";
    }
  }

  if (effectType === "move-to-location") {
    if (activeSlotIndex === 0) {
      return "Choose the character to move.";
    }

    if (activeSlotIndex === 1) {
      return "Choose the location to move to.";
    }
  }

  return null;
}
