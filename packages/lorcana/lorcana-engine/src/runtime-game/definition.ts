/**
 * Lorcana Runtime Game Definition
 *
 * MatchRuntimeConfig for the Lorcana engine.
 */

import type { Draft } from "immer";
import type { BoardSetupContext, PacketAnimationContext, PlayerId } from "#core";
import {
  filterMatchView,
  type FilteredMatchView,
  type MatchRuntimeConfig,
  type MatchState,
} from "#core";
import { createInitialLorcanaG } from "../types";
import { lorcanaRuntimeZones } from "../zones";
import { lorcanaRuntimeMoves } from "../runtime-moves";
import { createLorcanaRuntimeCardDeriver } from "../runtime-moves/state/runtime-card-derived";
import { lorcanaRuntimeFlow } from "../flow/runtime-flow-config";
import { projectLorcanaBoardView } from "./project-board";
import { deriveLorcanaPacketAnimations } from "./lorcanaPacketAnimations";

const DECK_ZONE_ID = "deck" as const;
/**
 * Lorcana runtime game configuration
 */
export const lorcanaRuntimeConfig: MatchRuntimeConfig = {
  name: "Disney Lorcana TCG",

  setup: ({ players }) => {
    if (players.length !== 2) {
      throw new Error("Lorcana requires exactly 2 players");
    }

    return createInitialLorcanaG(players[0].id as PlayerId, players[1].id as PlayerId);
  },

  boardSetup: (draft: Draft<MatchState>, ctx: BoardSetupContext) => {
    const { players, staticResources, random } = ctx;
    if (typeof staticResources.instances.entries !== "function") {
      return;
    }

    const deckCards = draft.ctx.zones.private.zoneCards[DECK_ZONE_ID] ?? [];
    for (const player of players) {
      const instanceIds: string[] = [];
      for (const record of staticResources.instances.entries()) {
        if (record.ownerID === player.id) {
          instanceIds.push(record.instanceId);
        }
      }
      const shuffledIds = random.shuffle([...instanceIds]);
      for (let i = 0; i < shuffledIds.length; i++) {
        const cardId = shuffledIds[i];
        deckCards.push(cardId);
        draft.ctx.zones.private.cardIndex[cardId] = {
          zoneKey: DECK_ZONE_ID,
          index: deckCards.length - 1,
          ownerID: player.id as PlayerId,
          controllerID: player.id as PlayerId,
        };
      }
    }

    const summary = draft.ctx.zones.public.zoneSummaries[DECK_ZONE_ID];
    if (summary) {
      summary.revision = 1;
      summary.count = deckCards.length;
    }
  },

  moves: lorcanaRuntimeMoves,
  flow: lorcanaRuntimeFlow,
  zones: lorcanaRuntimeZones,

  // This filters MatchState removing private information from it
  playerView: (state, roleCtx) => {
    // playerView only affects filtered/client-facing state snapshots.
    // Authoritative server projections are built from full state directly.
    return filterMatchView(state, roleCtx);
  },

  // This return ALL the data the UI needs to render the board.
  projectBoard: (state, roleCtx, staticResources, projectionCtx) => {
    return projectLorcanaBoardView(
      state,
      roleCtx,
      staticResources,
      projectionCtx,
    ) as unknown as FilteredMatchView;
  },

  derivePacketAnimations: (context: PacketAnimationContext) => {
    return deriveLorcanaPacketAnimations(context);
  },

  // deriveRuntimeCard powers runtime card query APIs (cards.get/require) and derived methods.
  // It does not alter the raw EngineBoardProjection builder output.
  deriveRuntimeCard: createLorcanaRuntimeCardDeriver(),
};
