import type {
  LorcanaCardSnapshot,
  ResolutionAmountSelectionState,
} from "@/features/simulator/model/contracts.js";

type CardSnapshotMap = Record<string, LorcanaCardSnapshot>;

type SupportedAmountSelectionEffectType = "move-damage" | "remove-damage";

type EffectAmountSelectionMeta = {
  type: SupportedAmountSelectionEffectType;
  amount: number;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

function getRecordString(record: Record<string, unknown> | null, key: string): string | undefined {
  const value = record?.[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function getRecordNumber(record: Record<string, unknown> | null, key: string): number | undefined {
  const value = record?.[key];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function getEffectAmountSelectionMeta(payload: unknown): EffectAmountSelectionMeta | null {
  const payloadRecord = asRecord(payload);
  const effectRecord = asRecord(payloadRecord?.effect);
  const effectType = getRecordString(effectRecord, "type");
  const amount = getRecordNumber(effectRecord, "amount");

  if (
    (effectType !== "remove-damage" && effectType !== "move-damage") ||
    effectRecord?.upTo !== true ||
    amount === undefined ||
    amount < 0
  ) {
    return null;
  }

  return {
    type: effectType,
    amount: Math.floor(amount),
  };
}

function getCardDamage(cardSnapshotsById: CardSnapshotMap, cardId: string | undefined): number {
  if (!cardId) {
    return 0;
  }

  const damage = cardSnapshotsById[cardId]?.damage ?? 0;
  return typeof damage === "number" && Number.isFinite(damage) && damage > 0
    ? Math.floor(damage)
    : 0;
}

function getTargetAwareMaxAmount(params: {
  meta: EffectAmountSelectionMeta;
  selectedTargets: readonly string[];
  cardSnapshotsById: CardSnapshotMap;
}): number {
  const { meta, selectedTargets, cardSnapshotsById } = params;
  const selectedCardTargets = selectedTargets.filter((targetId) =>
    Boolean(cardSnapshotsById[targetId]),
  );

  if (meta.type === "move-damage") {
    const sourceCardId = selectedCardTargets[0];
    return sourceCardId
      ? Math.min(meta.amount, getCardDamage(cardSnapshotsById, sourceCardId))
      : meta.amount;
  }

  if (selectedCardTargets.length !== 1) {
    return meta.amount;
  }

  const selectedCardId = selectedCardTargets[0];
  if (!selectedCardId) {
    return meta.amount;
  }

  return Math.min(meta.amount, getCardDamage(cardSnapshotsById, selectedCardId));
}

export function buildResolutionAmountSelectionState(params: {
  payload: unknown;
  selectedTargets: readonly string[];
  currentAmount?: number | null;
  cardSnapshotsById: CardSnapshotMap;
}): ResolutionAmountSelectionState | null {
  const meta = getEffectAmountSelectionMeta(params.payload);
  if (!meta) {
    return null;
  }

  const max = Math.max(
    0,
    getTargetAwareMaxAmount({
      meta,
      selectedTargets: params.selectedTargets,
      cardSnapshotsById: params.cardSnapshotsById,
    }),
  );
  const value =
    typeof params.currentAmount === "number" && Number.isFinite(params.currentAmount)
      ? clamp(Math.floor(params.currentAmount), 0, max)
      : max;

  return {
    label: meta.type === "remove-damage" ? "Damage to remove" : "Damage to move",
    min: 0,
    max,
    value,
  };
}
