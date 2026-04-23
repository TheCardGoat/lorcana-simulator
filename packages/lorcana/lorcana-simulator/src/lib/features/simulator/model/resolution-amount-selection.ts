import { getUpToRule, isUpToAmount, type UpToCapContext } from "@tcg/lorcana-types";
import type { AmountExpr } from "@tcg/lorcana-types";
import type {
  LorcanaCardSnapshot,
  ResolutionAmountSelectionState,
} from "@/features/simulator/model/contracts.js";

type CardSnapshotMap = Record<string, LorcanaCardSnapshot>;

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

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

function unwrapOptionalEffect(
  effectRecord: Record<string, unknown> | null,
): Record<string, unknown> | null {
  if (!effectRecord) {
    return null;
  }
  // Unwrap optional wrappers so the inner effect type and amount are accessible
  // (e.g. "move-damage" with an up-to amount inside an optional triggered ability).
  if (getRecordString(effectRecord, "type") === "optional") {
    return asRecord(effectRecord.effect) ?? effectRecord;
  }
  return effectRecord;
}

function readUpToBaseAmount(amount: unknown): number | null {
  if (!isUpToAmount(amount as AmountExpr)) {
    return null;
  }
  const inner = (amount as { value: unknown }).value;
  return typeof inner === "number" && Number.isFinite(inner) && inner >= 0
    ? Math.floor(inner)
    : null;
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

export function buildResolutionAmountSelectionState(params: {
  payload: unknown;
  selectedTargets: readonly string[];
  currentAmount?: number | null;
  cardSnapshotsById: CardSnapshotMap;
}): ResolutionAmountSelectionState | null {
  const payloadRecord = asRecord(params.payload);
  const rawEffectRecord = asRecord(payloadRecord?.effect);
  const effectRecord = unwrapOptionalEffect(rawEffectRecord);
  const effectType = getRecordString(effectRecord, "type");
  if (!effectType) {
    return null;
  }

  const rule = getUpToRule(effectType);
  if (!rule) {
    return null;
  }

  const baseAmount = readUpToBaseAmount(effectRecord?.amount);
  if (baseAmount === null) {
    return null;
  }

  const ctx: UpToCapContext = {
    getCardDamage: (cardId) => getCardDamage(params.cardSnapshotsById, cardId),
  };

  // Keep only targets that resolve to cards we know about — player-id selections
  // for, say, "each opponent" shouldn't influence the card-damage cap.
  const selectedCardTargets = params.selectedTargets.filter((targetId) =>
    Boolean(params.cardSnapshotsById[targetId]),
  );

  const max = Math.max(
    0,
    rule.getSelectionMax({
      baseAmount,
      selectedCardTargets,
      ctx,
    }),
  );

  const value =
    typeof params.currentAmount === "number" && Number.isFinite(params.currentAmount)
      ? clamp(Math.floor(params.currentAmount), 0, max)
      : max;

  return {
    label: rule.label,
    min: 0,
    max,
    value,
  };
}
