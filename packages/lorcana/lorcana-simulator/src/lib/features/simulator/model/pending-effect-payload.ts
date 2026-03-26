import type {
  EnginePendingEffectProjection,
  ResolutionSelectionRevealedCard,
} from "@tcg/lorcana-engine";
import type { CardFilter, ScryCardOrdering } from "@tcg/lorcana-types";
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

function getFilterArray(record: Record<string, unknown> | null, key: string): CardFilter[] {
  const value = record?.[key];
  if (Array.isArray(value)) {
    return value.filter((entry): entry is CardFilter =>
      Boolean(entry && typeof entry === "object" && !Array.isArray(entry)),
    );
  }

  if (value && typeof value === "object") {
    return [value as CardFilter];
  }

  return [];
}

export interface PendingEffectPayloadMeta {
  kind?: string;
  sourceId?: string;
  sourceCardId?: string;
  effectType?: string;
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
  label?: string;
  filters: readonly CardFilter[];
  playFilters: readonly CardFilter[];
  ordering?: ScryCardOrdering;
  reveal: boolean;
  exclusiveGroup?: string;
  cost?: "free" | "reduced";
  entersExerted?: boolean;
  grantsRush?: boolean;
  banishAtEndOfTurn?: boolean;
  exerted?: boolean;
  facedown?: boolean;
}

export interface ScryPendingEffectView {
  effectId: string;
  chooserId: string;
  sourceCardId: string | null;
  sourceCard: LorcanaCardSnapshot | null;
  amount: number;
  revealedCardIds: string[];
  revealedCards: ResolutionSelectionRevealedCard[];
  destinationRules: ScryDestinationRuleView[];
}

export function getPendingEffectPayloadMeta(payload: unknown): PendingEffectPayloadMeta {
  const payloadRecord = asRecord(payload);
  const effectRecord = asRecord(payloadRecord?.effect);
  return {
    kind: getRecordString(payloadRecord, "kind"),
    sourceId: getRecordString(payloadRecord, "sourceId"),
    sourceCardId: getRecordString(payloadRecord, "sourceCardId"),
    effectType: getRecordString(effectRecord, "type"),
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
  pendingEffect: EnginePendingEffectProjection,
  cardSnapshotsById: CardSnapshotMap,
): ScryPendingEffectView | null {
  const selectionContext = asRecord(
    (
      pendingEffect as EnginePendingEffectProjection & {
        selectionContext?: unknown;
      }
    ).selectionContext ?? null,
  );
  if (getRecordString(selectionContext, "kind") === "scry-selection") {
    const chooserId = getRecordString(selectionContext, "chooserId");
    const sourceCardId =
      getRecordString(selectionContext, "sourceCardId") ?? pendingEffect.sourceId;
    const amount = getRecordNumber(selectionContext, "amount");
    const revealedCardIds = getStringArray(selectionContext, "revealedCardIds");
    const destinationRules = Array.isArray(selectionContext?.destinationRules)
      ? selectionContext.destinationRules
          .map((entry) => asRecord(entry))
          .filter((entry): entry is Record<string, unknown> => entry !== null)
          .map<ScryDestinationRuleView | null>((entry, index) => {
            const zone = getRecordString(entry, "zone");
            if (!zone) {
              return null;
            }

            return {
              id: getRecordString(entry, "id") ?? `${pendingEffect.id}:${zone}:${index}`,
              zone,
              min: getRecordNumber(entry, "min") ?? 0,
              max: getRecordNumber(entry, "max") ?? null,
              remainder: entry.remainder === true,
              label: getRecordString(entry, "label"),
              filters: getFilterArray(entry, "filters"),
              playFilters: getFilterArray(entry, "playFilters"),
              ordering: getRecordString(entry, "ordering") as ScryCardOrdering | undefined,
              reveal: entry.reveal === true,
              exclusiveGroup: getRecordString(entry, "exclusiveGroup"),
              cost: getRecordString(entry, "cost") as "free" | "reduced" | undefined,
              entersExerted:
                typeof entry.entersExerted === "boolean" ? entry.entersExerted : undefined,
              grantsRush: typeof entry.grantsRush === "boolean" ? entry.grantsRush : undefined,
              banishAtEndOfTurn:
                typeof entry.banishAtEndOfTurn === "boolean" ? entry.banishAtEndOfTurn : undefined,
              exerted: typeof entry.exerted === "boolean" ? entry.exerted : undefined,
              facedown: typeof entry.facedown === "boolean" ? entry.facedown : undefined,
            };
          })
          .filter((entry): entry is ScryDestinationRuleView => entry !== null)
      : [];

    if (!chooserId || !amount || revealedCardIds.length === 0 || destinationRules.length === 0) {
      return null;
    }

    const revealedCardRecords = Array.isArray(selectionContext?.revealedCards)
      ? selectionContext.revealedCards
          .map((entry) => asRecord(entry))
          .filter((entry): entry is Record<string, unknown> => entry !== null)
      : [];
    const revealedCards = revealedCardIds.map<ResolutionSelectionRevealedCard | null>(
      (cardId, index) => {
        const record = revealedCardRecords[index] ?? null;
        const snapshot = cardSnapshotsById[cardId] ?? null;
        const label = getRecordString(record, "label") ?? snapshot?.label;
        if (!label) {
          return null;
        }

        const cardType = getRecordString(record, "cardType");
        const actionSubtype = getRecordString(record, "actionSubtype");
        const cost = getRecordNumber(record, "cost");
        const classifications = getStringArray(record, "classifications");

        return {
          cardId: cardId as ResolutionSelectionRevealedCard["cardId"],
          label,
          cardType:
            cardType === "character" ||
            cardType === "action" ||
            cardType === "item" ||
            cardType === "location"
              ? cardType
              : snapshot?.cardType,
          actionSubtype: actionSubtype ?? snapshot?.actionSubtype,
          cost: cost ?? snapshot?.cost,
          classifications: classifications.length > 0 ? classifications : snapshot?.classifications,
        };
      },
    );
    if (revealedCards.some((card) => card === null)) {
      return null;
    }

    return {
      effectId: pendingEffect.id,
      chooserId,
      sourceCardId: sourceCardId ?? null,
      sourceCard: sourceCardId ? (cardSnapshotsById[sourceCardId] ?? null) : null,
      amount,
      revealedCardIds,
      revealedCards: revealedCards.filter(
        (card): card is ResolutionSelectionRevealedCard => card !== null,
      ),
      destinationRules,
    };
  }

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
        label: getRecordString(entry, "label"),
        filters: getFilterArray(entry, "filters"),
        playFilters: getFilterArray(entry, "playFilters"),
        ordering: getRecordString(entry, "ordering") as ScryCardOrdering | undefined,
        reveal: entry.reveal === true,
        exclusiveGroup: getRecordString(entry, "exclusiveGroup"),
        cost: getRecordString(entry, "cost") as "free" | "reduced" | undefined,
        entersExerted: typeof entry.entersExerted === "boolean" ? entry.entersExerted : undefined,
        grantsRush: typeof entry.grantsRush === "boolean" ? entry.grantsRush : undefined,
        banishAtEndOfTurn:
          typeof entry.banishAtEndOfTurn === "boolean" ? entry.banishAtEndOfTurn : undefined,
        exerted: typeof entry.exerted === "boolean" ? entry.exerted : undefined,
        facedown: typeof entry.facedown === "boolean" ? entry.facedown : undefined,
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

  const revealedCards = revealedCardIds.map<ResolutionSelectionRevealedCard | null>((cardId) => {
    const snapshot = cardSnapshotsById[cardId] ?? null;
    if (!snapshot) {
      return null;
    }

    return {
      cardId: cardId as ResolutionSelectionRevealedCard["cardId"],
      label: snapshot.label,
      cardType: snapshot.cardType,
      actionSubtype: snapshot.actionSubtype,
      cost: snapshot.cost,
      classifications: snapshot.classifications,
    };
  });
  if (revealedCards.some((card) => card === null)) {
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
    revealedCards: revealedCards.filter(
      (card): card is ResolutionSelectionRevealedCard => card !== null,
    ),
    destinationRules,
  };
}
