/**
 * MatchRuntime Zone API Factories
 *
 * Factory functions for creating zone-related runtime API objects.
 */

import type { TCGCtx } from "./types";
import type { ZoneQueryAPI, ZoneRef } from "./zone-operations";
import type { CardQueryAPI } from "./card-runtime";
import type { BaseCardDefinition } from "./card-contracts";
import type { ZoneRegistry } from "./zone-registry";
import { resolveZoneIdFromRegistry } from "./zone-registry";

// =============================================================================
// Zone Operations (Read-only for validation)
// =============================================================================

export function createZoneQueryAPI(
  state: { ctx: Pick<TCGCtx, "zones"> },
  cardsApi: CardQueryAPI,
  zoneRegistry: ZoneRegistry,
): ZoneQueryAPI {
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
    return resolveZoneIdFromRegistry(zone, zoneRegistry, state.ctx.zones.private.cardIndex);
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
      return zoneRegistry[zoneId]?.ordered ?? true;
    },
    isOwnerScoped: (zone) => {
      const zoneId = resolveZoneId(zone);
      return zoneRegistry[zoneId]?.ownerScoped ?? false;
    },
    getVisibility: (zone) => {
      const zoneId = resolveZoneId(zone);
      return zoneRegistry[zoneId]?.visibility ?? "private";
    },
  };
}
