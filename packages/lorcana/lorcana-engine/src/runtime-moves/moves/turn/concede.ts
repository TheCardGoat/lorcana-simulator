// .agents/skills/lorcana-rules/SKILL.md
// .agents/skills/lorcana-rules/indexes/by-topic/turn-actions.md

import type { PlayerId, RuntimeValidationResult } from "#core";
import { createLorcanaLogMessage, type LorcanaMoveDefinition } from "../../../types";

/**
 * Concede the game
 */
export const concede: LorcanaMoveDefinition<"concede"> = {
  validate: (ctx): RuntimeValidationResult => {
    const { playerId } = ctx.args;

    const players = Object.keys(ctx.G.lore) as PlayerId[];
    if (!players.includes(playerId as PlayerId)) {
      return { valid: false, error: "Invalid player", errorCode: "INVALID_PLAYER" };
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const { playerId } = ctx.args;
    ctx.framework.log({
      category: "action",
      visibility: { mode: "PUBLIC" },
      defaultMessage: createLorcanaLogMessage("lorcana.move.concede", {
        playerId: playerId as PlayerId,
      }),
    });

    // Determine winner (other player)
    const players = Object.keys(ctx.G.lore) as PlayerId[];
    const winner = players.find((p) => p !== playerId);

    ctx.framework.events.endGame({
      winner,
      reason: `${playerId} conceded`,
    });
  },

  available: () => true,
};
