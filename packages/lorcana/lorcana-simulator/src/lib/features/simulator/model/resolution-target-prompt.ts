import type {
  CardInstanceId,
  SlottedTargetInput,
  SlottedTargetKind,
  TargetResolutionSelectionContext,
} from "@tcg/lorcana-engine";
import { assertNeverSlottedKind } from "@tcg/lorcana-engine";
import type {
  AvailableMovesSelectionEntry,
  LorcanaCardSnapshot,
  ResolutionTargetSelectionSlotState,
} from "@/features/simulator/model/contracts.js";

export type SupportedResolutionTargetEffectType =
  | "move-damage"
  | "move-to-location"
  | "deal-damage"
  | "banish"
  | "discard"
  | "return-to-hand"
  | "ready"
  | "exert"
  | "modify-stat"
  | "gain-keyword"
  | "remove-damage";

type CardSnapshotMap = Record<string, LorcanaCardSnapshot>;

type ResolutionTargetPromptState = {
  effectType: SupportedResolutionTargetEffectType;
  candidateEntries: AvailableMovesSelectionEntry[];
  activeSlotIndex: number | null;
  slots: ResolutionTargetSelectionSlotState[];
  // Number of leading slots that are auto-resolved (e.g. from: { ref: "self" }).
  // The raw session.selectedTargets array does NOT include these slots, so callers
  // must subtract this offset when converting a visual slot index to a storage index.
  autoResolvedFromSlots: number;
};

const SLOT_LABELS: Record<SupportedResolutionTargetEffectType, readonly string[]> = {
  "move-damage": ["Move damage from", "Move damage to"],
  "move-to-location": ["Character to move", "Move to location"],
  "deal-damage": ["Deal damage to"],
  banish: ["Choose character to banish"],
  discard: ["Choose card to discard"],
  "return-to-hand": ["Choose character to return"],
  ready: ["Choose character to ready"],
  exert: ["Choose character to exert"],
  "modify-stat": ["Choose character"],
  "gain-keyword": ["Choose character"],
  "remove-damage": ["Choose character to heal"],
};

const SLOT_CARD_TYPES: Record<
  SupportedResolutionTargetEffectType,
  readonly ResolutionTargetSelectionSlotState["cardType"][]
> = {
  "move-damage": ["character", "character"],
  "move-to-location": ["character", "location"],
  "deal-damage": [null],
  banish: ["character"],
  discard: [null],
  "return-to-hand": ["character"],
  ready: ["character"],
  exert: ["character"],
  "modify-stat": ["character"],
  "gain-keyword": ["character"],
  "remove-damage": ["character"],
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
  maxSlots?: number,
): ResolutionTargetSelectionSlotState[] {
  const baseLabels = SLOT_LABELS[effectType];
  const baseCardTypes = SLOT_CARD_TYPES[effectType];
  const slotCount = Math.max(baseLabels.length, maxSlots ?? 0);

  return Array.from({ length: slotCount }, (_, index) => {
    const label = baseLabels[index] ?? baseLabels[baseLabels.length - 1];
    const cardType = baseCardTypes[index] ?? baseCardTypes[baseCardTypes.length - 1];
    const targetId = selectedTargets[index] ?? null;
    const card = targetId ? (cardSnapshotsById[targetId] ?? null) : null;

    return {
      id: `${effectType}:slot:${index}`,
      label,
      cardType,
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
  chooserId?: string;
  sourceCardId?: string;
  targetDsl?: Array<{ owner?: string }>;
}): AvailableMovesSelectionEntry[] {
  const {
    effectType,
    slotIndex,
    slots,
    entries,
    cardSnapshotsById,
    chooserId,
    sourceCardId,
    targetDsl,
  } = params;
  const slot = slots[slotIndex];
  if (!slot) {
    return [];
  }

  const slotOwner = targetDsl?.[slotIndex]?.owner;

  // `owner: "opponent"` in the target DSL is defined relative to the **effect's
  // controller** (the card that produced the resolution), NOT to whoever the
  // engine asked to make the selection. These diverge for `chosenBy: "opponent"`
  // effects like Dinky - Has the Brains or Be King Undisputed, where the
  // controller plays a card that forces the opponent to pick one of *their own*
  // characters. Using `chooserId` as the reference would filter the chooser's
  // characters out of their own candidate list (bug-02, bug-04 symptoms).
  //
  // Prefer the source card's owner. Fall back to `chooserId` only if the source
  // is not available in the snapshot map (extremely rare — surfaces pre-rebuild).
  const sourceOwnerId =
    (sourceCardId ? cardSnapshotsById[sourceCardId]?.ownerId : undefined) ?? chooserId;

  // Cards already locked into other slots should not appear as candidates for
  // this slot — prevents the same card from being selected twice in multi-slot
  // prompts (e.g. deal-damage upTo:3, move-damage source/destination).
  const otherSlotTargetIds = new Set(
    slots.flatMap((s, i) => (i !== slotIndex && s.targetId ? [s.targetId] : [])),
  );

  return entries.filter((entry) => {
    if (entry.kind !== "card" || !entry.cardId) {
      return false;
    }

    const card = cardSnapshotsById[entry.cardId] ?? null;
    if (!card) {
      return false;
    }

    // null cardType means any card type is accepted (e.g. discard from hand).
    if (slot.cardType !== null && card.cardType !== slot.cardType) {
      return false;
    }

    if (otherSlotTargetIds.has(entry.cardId)) {
      return false;
    }

    if (slotOwner === "opponent" && sourceOwnerId) {
      const isOpponentCard = card.ownerId !== sourceOwnerId;
      if (!isOpponentCard) {
        return false;
      }
    }

    return true;
  });
}

const SUPPORTED_EFFECT_TYPES = new Set<SupportedResolutionTargetEffectType>([
  "move-damage",
  "move-to-location",
  "deal-damage",
  "banish",
  "discard",
  "return-to-hand",
  "ready",
  "exert",
  "modify-stat",
  "gain-keyword",
  "remove-damage",
]);

export function isSupportedResolutionTargetEffectType(
  effectType: string | null | undefined,
): effectType is SupportedResolutionTargetEffectType {
  return (
    typeof effectType === "string" &&
    SUPPORTED_EFFECT_TYPES.has(effectType as SupportedResolutionTargetEffectType)
  );
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

  // When the "from" target is auto-resolved (e.g. move-damage with from: { ref: "self" }),
  // maxSelections will be less than the number of slots (2). In that case, pre-fill slot 0
  // with the source card and lock it so the user only picks the destination.
  const totalSlots = SLOT_LABELS[effectType].length;
  const autoResolvedFromSlots =
    effectType === "move-damage" && context.maxSelections > 0 && context.maxSelections < totalSlots
      ? totalSlots - context.maxSelections
      : 0;
  const effectiveSelectedTargets =
    autoResolvedFromSlots > 0
      ? selectedTargets[0] === context.sourceCardId
        ? [...selectedTargets]
        : [context.sourceCardId, ...selectedTargets]
      : [...selectedTargets];
  const effectivePreselectedCount = Math.max(preselectedTargetCount, autoResolvedFromSlots);

  const slots = buildSlotStates(
    effectType,
    effectiveSelectedTargets,
    effectivePreselectedCount,
    context,
    cardSnapshotsById,
    context.maxSelections > 0 ? context.maxSelections : undefined,
  );
  const activeSlotIndex =
    typeof preferredActiveSlotIndex === "number" &&
    preferredActiveSlotIndex >= 0 &&
    preferredActiveSlotIndex < slots.length &&
    !slots[preferredActiveSlotIndex]?.locked
      ? preferredActiveSlotIndex
      : getDefaultActiveSlotIndex(slots);

  // When early slots are auto-resolved, the targetDsl entries correspond to the
  // user-selectable slots (the later ones). Offset the DSL index so the owner
  // filter applies to the correct slot.
  const rawTargetDsl = context.targetDsl as Array<{ owner?: string }> | undefined;
  const adjustedTargetDsl =
    autoResolvedFromSlots > 0 && rawTargetDsl
      ? Array.from({ length: autoResolvedFromSlots }, () => ({}) as { owner?: string }).concat(
          rawTargetDsl,
        )
      : rawTargetDsl;

  const candidateEntries =
    activeSlotIndex === null
      ? []
      : buildCandidateEntriesForSlot({
          effectType,
          slotIndex: activeSlotIndex,
          slots,
          entries,
          cardSnapshotsById,
          chooserId: context.chooserId,
          sourceCardId: context.sourceCardId,
          targetDsl: adjustedTargetDsl,
        });

  return {
    effectType,
    candidateEntries,
    activeSlotIndex,
    slots,
    autoResolvedFromSlots,
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

  if (effectType === "deal-damage" && typeof activeSlotIndex === "number") {
    return "Choose the character to deal damage to.";
  }

  if (effectType === "banish" && activeSlotIndex === 0) {
    return "Choose the character to banish.";
  }

  if (effectType === "discard" && typeof activeSlotIndex === "number") {
    return "Choose a card to discard.";
  }

  if (effectType === "return-to-hand" && activeSlotIndex === 0) {
    return "Choose the character to return to its player's hand.";
  }

  if (effectType === "ready" && activeSlotIndex === 0) {
    return "Choose the character to ready.";
  }

  if (effectType === "exert" && activeSlotIndex === 0) {
    return "Choose the character to exert.";
  }

  if (effectType === "modify-stat" && activeSlotIndex === 0) {
    return "Choose the character.";
  }

  if (effectType === "gain-keyword" && activeSlotIndex === 0) {
    return "Choose the character.";
  }

  if (effectType === "remove-damage" && activeSlotIndex === 0) {
    return "Choose the character to remove damage from.";
  }

  return null;
}

/**
 * Assemble a `SlottedTargetInput` for the given kind from the flat positional
 * selection state the simulator maintains. Exhaustiveness is enforced: adding
 * a new variant to `SlottedTargetInput` without extending this switch is a
 * compile error (see `assertNeverSlottedKind`).
 *
 * The caller is responsible for only invoking this when the engine asked for a
 * slotted form (i.e. `context.expectedSlottedKind` is set) and enough slots
 * have been filled (see `SLOTTED_TARGET_SLOT_KEYS` on the engine side for slot
 * counts). Under-filled cases should fall back to the flat-array path.
 */
export function buildSlottedTargetsFromSelection(
  kind: SlottedTargetKind,
  selected: readonly string[],
): SlottedTargetInput {
  const at = (index: number): CardInstanceId[] =>
    selected[index] ? [selected[index] as CardInstanceId] : [];

  switch (kind) {
    case "move-damage":
      return { kind: "move-damage", from: at(0), to: at(1) };
    case "move-to-location":
      return { kind: "move-to-location", subject: at(0), location: at(1) };
    case "shift-and-choose":
    case "banish-and-play":
      // v1 scope: these kinds have no simulator prompt yet. Throw rather than
      // silently emit an empty slotted input so misuse is loud.
      throw new Error(`slotted kind ${kind} is not wired to a UI prompt yet`);
    default:
      return assertNeverSlottedKind(kind);
  }
}
