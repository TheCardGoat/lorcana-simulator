/**
 * MatchRuntime Zone API Factories
 *
 * Factory functions for creating zone-related runtime API objects.
 */

import type { MatchState } from "./types";
import type { ZoneQueryAPI, ZoneRef } from "./zone-operations";
import type { CardQueryAPI } from "./card-runtime";
import type { BaseCardDefinition } from "./card-contracts";

// =============================================================================
// Zone Operations (Read-only for validation)
// =============================================================================

export function createZoneQueryAPI(state: MatchState, cardsApi: CardQueryAPI): ZoneQueryAPI {
  const getFallbackCardView = (cardId: string) => {
    const indexEntry = state.ctx.zones.private.cardIndex[cardId];
    return (
      cardsApi.get(cardId) ?? {
        instanceId: cardId,
        definitionId: cardId,
        definition: undefined as unknown as BaseCardDefinition,
        ownerID: (indexEntry?.ownerID ?? "unknown") as string,
        controllerID: (indexEntry?.controllerID ?? indexEntry?.ownerID ?? "unknown") as string,
        zoneID: indexEntry?.zoneKey,
        zoneIndex: indexEntry?.index,
        meta: state.ctx.zones.private.cardMeta[cardId] || {},
      }
    );
  };

  function resolveZoneId(zone: ZoneRef): string {
    const zoneId = zone.zone;

    if (zoneId.includes(":")) {
      if (zone.playerId && !zoneId.endsWith(`:${zone.playerId}`)) {
        throw new Error(`Zone player mismatch for ${zoneId}`);
      }
      if (!state.ctx.zones.zoneDefs[zoneId]) {
        throw new Error(`Unknown zone: ${zoneId}`);
      }
      return zoneId;
    }

    if (zone.playerId) {
      const scopedZoneId = `${zoneId}:${zone.playerId}`;
      if (state.ctx.zones.zoneDefs[scopedZoneId]) {
        return scopedZoneId;
      }
    }

    const unscopedZoneDef = state.ctx.zones.zoneDefs[zoneId];
    if (!unscopedZoneDef) {
      throw new Error(`Unknown zone: ${zoneId}`);
    }
    if (unscopedZoneDef.ownerScoped) {
      if (!zone.playerId) {
        throw new Error(`Owner-scoped zone requires player id: ${zoneId}`);
      }

      const hasPlayerCards = Object.values(state.ctx.zones.private.cardIndex).some((entry) => {
        return entry?.ownerID === zone.playerId || entry?.controllerID === zone.playerId;
      });
      if (!hasPlayerCards) {
        throw new Error(`Unknown zone: ${zoneId}`);
      }

      return zoneId;
    }

    return zoneId;
  }

  return {
    search: (zone, predicate) => {
      const zoneId = resolveZoneId(zone);
      const cards = state.ctx.zones.private.zoneCards[zoneId] || [];
      return cards.filter((cardId) => predicate(getFallbackCardView(cardId)));
    },
    searchAndPick: (zone, count: number, predicate) => {
      const zoneId = resolveZoneId(zone);
      let cards = [...(state.ctx.zones.private.zoneCards[zoneId] || [])];
      if (predicate) {
        cards = cards.filter((cardId) => predicate(getFallbackCardView(cardId)));
      }
      return cards.slice(0, count);
    },
    lookAt: () => [],
    lookAtTop: () => [],
    lookAtBottom: () => [],
    getCards: (zone) => {
      const zoneId = resolveZoneId(zone);
      return state.ctx.zones.private.zoneCards[zoneId] || [];
    },
    getCardCount: (zone) => {
      const zoneId = resolveZoneId(zone);
      return state.ctx.zones.public.zoneSummaries[zoneId]?.count || 0;
    },
    getTopCard: (zone) => {
      const zoneId = resolveZoneId(zone);
      const cards = state.ctx.zones.private.zoneCards[zoneId] || [];
      return cards.length > 0 ? cards[cards.length - 1] : undefined;
    },
    getBottomCard: (zone) => {
      const zoneId = resolveZoneId(zone);
      const cards = state.ctx.zones.private.zoneCards[zoneId] || [];
      return cards.length > 0 ? cards[0] : undefined;
    },
    getCardZone: (cardId) => state.ctx.zones.private.cardIndex[cardId]?.zoneKey,
    getCardOwner: (cardId) => state.ctx.zones.private.cardIndex[cardId]?.ownerID,
    getCardController: (cardId) => state.ctx.zones.private.cardIndex[cardId]?.controllerID,
    isOrdered: (zone) => {
      const zoneId = resolveZoneId(zone);
      return state.ctx.zones.zoneDefs[zoneId]?.ordered ?? true;
    },
    isOwnerScoped: (zone) => {
      const zoneId = resolveZoneId(zone);
      return state.ctx.zones.zoneDefs[zoneId]?.ownerScoped ?? false;
    },
    getVisibility: (zone) => {
      const zoneId = resolveZoneId(zone);
      return state.ctx.zones.zoneDefs[zoneId]?.visibility ?? "private";
    },
  };
}
