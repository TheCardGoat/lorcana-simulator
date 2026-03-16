import type { EnginePendingEffectProjection } from "@tcg/lorcana-engine";
import type { LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import type { CardSnapshotMap } from "./board-utils.js";

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

function getStringArray(record: Record<string, unknown> | null, key: string): string[] {
  const value = record?.[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === "string" && entry.length > 0);
}

export interface PendingEffectPayloadMeta {
  kind?: string;
  sourceId?: string;
  sourceCardId?: string;
}

export interface BagEffectPayloadMeta {
  kind?: string;
  sourceId?: string;
  sourceCardId?: string;
  effectType?: string;
}

export interface ScryDestinationRuleView {
  id: string;
  zone: string;
  min: number;
  max: number | null;
  remainder: boolean;
}

export interface ScryPendingEffectView {
  effectId: string;
  chooserId: string;
  sourceCardId: string | null;
  sourceCard: LorcanaCardSnapshot | null;
  amount: number;
  revealedCardIds: string[];
  revealedCards: LorcanaCardSnapshot[];
  destinationRules: ScryDestinationRuleView[];
}

export function getPendingEffectPayloadMeta(payload: unknown): PendingEffectPayloadMeta {
  const payloadRecord = asRecord(payload);
  return {
    kind: getRecordString(payloadRecord, "kind"),
    sourceId: getRecordString(payloadRecord, "sourceId"),
    sourceCardId: getRecordString(payloadRecord, "sourceCardId"),
  };
}

export function getBagEffectPayloadMeta(payload: unknown): BagEffectPayloadMeta {
  const payloadRecord = asRecord(payload);
  const effectRecord = asRecord(payloadRecord?.effect);

  return {
    kind: getRecordString(payloadRecord, "kind"),
    sourceId: getRecordString(payloadRecord, "sourceId"),
    sourceCardId: getRecordString(payloadRecord, "sourceCardId"),
    effectType: getRecordString(effectRecord, "type"),
  };
}

export function parseScryPendingEffect(
  pendingEffect: EnginePendingEffectProjection<unknown>,
  cardSnapshotsById: CardSnapshotMap,
): ScryPendingEffectView | null {
  const payloadRecord = asRecord(pendingEffect.payload);
  if (getRecordString(payloadRecord, "kind") !== "scry-selection") {
    return null;
  }

  const chooserId = getRecordString(payloadRecord, "chooserId");
  if (!chooserId) {
    return null;
  }

  const effectRecord = asRecord(payloadRecord?.effect);
  if (getRecordString(effectRecord, "type") !== "scry") {
    return null;
  }

  const amount = getRecordNumber(effectRecord, "amount");
  if (!amount || amount <= 0) {
    return null;
  }

  const destinationRecords = Array.isArray(effectRecord?.destinations)
    ? effectRecord.destinations
        .map((entry) => asRecord(entry))
        .filter((entry): entry is Record<string, unknown> => entry !== null)
    : [];

  const destinationRules = destinationRecords
    .map<ScryDestinationRuleView | null>((entry, index) => {
      const zone = getRecordString(entry, "zone");
      if (!zone) {
        return null;
      }

      return {
        id: `${pendingEffect.id}:${zone}:${index}`,
        zone,
        min: getRecordNumber(entry, "min") ?? 0,
        max: getRecordNumber(entry, "max") ?? null,
        remainder: entry.remainder === true,
      };
    })
    .filter((entry): entry is ScryDestinationRuleView => entry !== null);

  if (destinationRules.length === 0) {
    return null;
  }

  const resolutionInputRecord = asRecord(payloadRecord?.resolutionInput);
  const eventSnapshotRecord = asRecord(resolutionInputRecord?.eventSnapshot);
  const revealedCardIds = getStringArray(eventSnapshotRecord, "revealedCardIds");
  if (revealedCardIds.length === 0) {
    return null;
  }

  const revealedCards = revealedCardIds
    .map((cardId) => cardSnapshotsById[cardId] ?? null)
    .filter((card): card is LorcanaCardSnapshot => card !== null);
  if (revealedCards.length !== revealedCardIds.length) {
    return null;
  }

  const sourceCardId =
    pendingEffect.sourceId ??
    getRecordString(payloadRecord, "sourceCardId") ??
    getRecordString(payloadRecord, "sourceId") ??
    null;

  return {
    effectId: pendingEffect.id,
    chooserId,
    sourceCardId,
    sourceCard: sourceCardId ? (cardSnapshotsById[sourceCardId] ?? null) : null,
    amount,
    revealedCardIds,
    revealedCards,
    destinationRules,
  };
}
