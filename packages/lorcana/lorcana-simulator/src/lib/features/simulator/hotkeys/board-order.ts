import type {
  LorcanaCardSnapshot,
  LorcanaTableSeat,
} from "@/features/simulator/model/contracts.js";

export interface OrderedPlayZoneEntryAssociation {
  clusterId: string;
  role: "location" | "occupant";
  clusterSize: number;
  isClusterStart: boolean;
  isClusterEnd: boolean;
}

export interface OrderedPlayZoneEntry {
  card: LorcanaCardSnapshot;
  association?: OrderedPlayZoneEntryAssociation;
}

export function buildOrderedPlayZoneEntries(
  cards: readonly LorcanaCardSnapshot[],
  seat: LorcanaTableSeat,
): OrderedPlayZoneEntry[] {
  const locationIds = new Set(
    cards.filter((card) => card.cardType === "location").map((card) => card.cardId),
  );
  const occupantsByLocation = new Map<string, LorcanaCardSnapshot[]>();
  const orderedEntries: OrderedPlayZoneEntry[] = [];
  const standaloneEntries: OrderedPlayZoneEntry[] = [];
  const locationClusterEntries: OrderedPlayZoneEntry[] = [];

  for (const card of cards) {
    if (
      card.cardType !== "character" ||
      !card.atLocationId ||
      !locationIds.has(card.atLocationId)
    ) {
      continue;
    }

    const occupants = occupantsByLocation.get(card.atLocationId) ?? [];
    occupants.push(card);
    occupantsByLocation.set(card.atLocationId, occupants);
  }

  for (const card of cards) {
    if (card.cardType === "location") {
      const occupants = occupantsByLocation.get(card.cardId) ?? [];
      const clusterSize = 1 + occupants.length;
      const clusterEntries: OrderedPlayZoneEntry[] = [
        {
          card,
          association: {
            clusterId: card.cardId,
            role: "location",
            clusterSize,
            isClusterStart: true,
            isClusterEnd: occupants.length === 0,
          },
        },
        ...occupants.map((occupant, occupantIndex) => ({
          card: occupant,
          association: {
            clusterId: card.cardId,
            role: "occupant" as const,
            clusterSize,
            isClusterStart: false,
            isClusterEnd: occupantIndex === occupants.length - 1,
          },
        })),
      ];

      if (seat === "bottom") {
        locationClusterEntries.push(...clusterEntries);
      } else {
        orderedEntries.push(...clusterEntries);
      }
      continue;
    }

    if (card.cardType === "character" && card.atLocationId && locationIds.has(card.atLocationId)) {
      continue;
    }

    const nextEntry = { card };
    if (seat === "bottom") {
      standaloneEntries.push(nextEntry);
    } else {
      orderedEntries.push(nextEntry);
    }
  }

  if (seat !== "bottom") {
    return orderedEntries;
  }

  return [...standaloneEntries, ...locationClusterEntries];
}

export function getOrderedPlayZoneCards(
  cards: readonly LorcanaCardSnapshot[],
  seat: LorcanaTableSeat,
): LorcanaCardSnapshot[] {
  return buildOrderedPlayZoneEntries(cards, seat).map((entry) => entry.card);
}
