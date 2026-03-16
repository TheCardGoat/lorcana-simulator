/**
 * Setup Moves for Lorcana Runtime
 *
 * Game initialization moves for the MatchRuntime architecture.
 */

import { type CardInstanceId, type PlayerId, type RuntimeValidationResult } from "#core";
import { createLorcanaLogMessage, type LorcanaMoveDefinition } from "../../../types";

function enumerateCardSelections(cards: readonly CardInstanceId[]): CardInstanceId[][] {
  const selections: CardInstanceId[][] = [[]];

  for (const cardId of cards) {
    const currentLength = selections.length;
    for (let index = 0; index < currentLength; index += 1) {
      selections.push([...selections[index]!, cardId]);
    }
  }

  return selections;
}

/**
 * Alter hand (mulligan)
 */
export const alterHand: LorcanaMoveDefinition<"alterHand"> = {
  validate: (ctx): RuntimeValidationResult => {
    const { playerId } = ctx.args;
    const cardsToMulligan = ctx.args.cardsToMulligan ?? [];

    if (!ctx.framework.state.playerIds.includes(playerId as PlayerId)) {
      return { valid: false, error: "Invalid player", errorCode: "INVALID_PLAYER" };
    }

    const pendingMulligan = ctx.framework.state.ctx.status.pendingMulligan ?? [];
    if (!pendingMulligan.includes(playerId as PlayerId)) {
      return {
        valid: false,
        error: "Player has already made a mulligan decision",
        errorCode: "MULLIGAN_ALREADY_DONE",
      };
    }

    // Validate cards are in hand
    const handCards = ctx.framework.zones.getCards({ zone: "hand", playerId });
    for (const cardId of cardsToMulligan) {
      if (!handCards.includes(cardId)) {
        return { valid: false, error: `Card ${cardId} not in hand`, errorCode: "CARD_NOT_IN_HAND" };
      }
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const { framework } = ctx;
    const { playerId } = ctx.args;
    const cardsToMulligan = ctx.args.cardsToMulligan ?? [];
    const deckZone = { zone: "deck", playerId };

    for (const cardId of cardsToMulligan) {
      ctx.framework.zones.moveCard(cardId, deckZone, { index: 0 });
    }

    const drawn = ctx.framework.zones.drawCards({
      from: { zone: "deck", playerId },
      to: { zone: "hand", playerId },
      count: cardsToMulligan.length,
    });

    framework.logPublicWithOverrides({
      category: "action",
      defaultMessage: createLorcanaLogMessage("lorcana.setup.mulligan.count", {
        playerId,
        count: cardsToMulligan.length,
      }),
      overrides: {
        [playerId]: createLorcanaLogMessage("lorcana.setup.mulligan.detail", {
          playerId,
          count: cardsToMulligan.length,
          mulliganed: cardsToMulligan as CardInstanceId[],
          drawn: drawn as CardInstanceId[],
        }),
      },
    });

    const pendingMulligan = (ctx.framework.state.ctx.status.pendingMulligan ?? []) as PlayerId[];
    const nextPending = pendingMulligan.filter((id) => id !== playerId);

    ctx.framework.status.patch({
      pendingMulligan: nextPending,
    });

    if (nextPending.length > 0) {
      ctx.framework.priority.openWindow(nextPending[0]);
    } else {
      // All players have mulliganed, lorcanaRuntimeFlow will transition to the next Segment
      framework.log({
        category: "action",
        visibility: { mode: "PUBLIC" },
        defaultMessage: createLorcanaLogMessage("lorcana.setup.done"),
      });
    }
  },

  available: (ctx) => {
    const handZoneId = `hand:${ctx.playerId}`;
    const handCards = ctx.framework.state.ctx.zones.private.zoneCards[handZoneId] || [];
    const allHandCards = handCards as CardInstanceId[];
    return enumerateCardSelections(allHandCards).length > 0;
  },
};
