// .agents/skills/lorcana-rules/SKILL.md
// .agents/skills/lorcana-rules/indexes/by-topic/turn-actions.md

import type { CardInstanceId, PlayerId, RuntimeValidationResult } from "#core";
import { type LorcanaMoveDefinition } from "../../../types";
import { createLorcanaLogMessage } from "../../../types";
import { INKWELL_CANDIDATE_QUERY_DSL, canInkThisTurn } from "../../state/runtime-card-derived";
import {
  EFFECT_PENDING_ERROR_CODE,
  hasPendingActionEffectResolution,
} from "../../resolution/action-effects/pending-action-effects";
import {
  emitTriggeredLorcanaEvent,
  flushTriggeredEventsToBag,
  hasPendingBagItems,
} from "../../effects/triggered-abilities";

function buildTurnActionInkState(ctx: {
  G: {
    turnMetadata: { inkedThisTurn: readonly CardInstanceId[]; additionalInkwellActions?: number };
  };
  framework: {
    state: {
      ctx: {
        priority?: { holder?: string };
        zones: {
          private: {
            cardIndex: Record<string, { controllerID?: string; zoneKey?: string } | undefined>;
          };
        };
      };
    };
  };
}) {
  return {
    G: ctx.G,
    ctx: ctx.framework.state.ctx,
  };
}

/**
 * Put a card into the inkwell
 */
export const putCardIntoInkwell: LorcanaMoveDefinition<"putCardIntoInkwell"> = {
  validate: (ctx): RuntimeValidationResult => {
    if (hasPendingActionEffectResolution(ctx)) {
      return {
        valid: false,
        error: "Cannot ink cards while an action effect is pending",
        errorCode: EFFECT_PENDING_ERROR_CODE,
      };
    }

    if (hasPendingBagItems(ctx)) {
      return {
        valid: false,
        error: "Cannot ink cards while bag effects are pending",
        errorCode: "BAG_PENDING",
      };
    }

    const { cardId } = ctx.args;
    const currentPlayer = (ctx.framework.state.ctx.priority.holder ?? ctx.playerId) as PlayerId;

    // Enforce once-per-turn inkwell rule (Rule 4.3.3)
    if (
      !canInkThisTurn({
        state: buildTurnActionInkState(ctx),
        getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
      })
    ) {
      return { valid: false, error: "Already inked this turn", errorCode: "ALREADY_INKED" };
    }

    if (ctx.validationMode === "preflight" && cardId == null) {
      return { valid: true };
    }

    // Check card is in hand
    const handCards = ctx.framework.zones.getCards({ zone: "hand", playerId: currentPlayer });
    if (!handCards.includes(cardId)) {
      return { valid: false, error: "Card not in hand", errorCode: "CARD_NOT_IN_HAND" };
    }

    const runtimeCard = ctx.cards.require(cardId);
    if (!runtimeCard) {
      return {
        valid: false,
        error: "Card definition not found",
        errorCode: "CARD_DEFINITION_NOT_FOUND",
      };
    }

    if (!runtimeCard.canBePutInInkwell()) {
      return { valid: false, error: "Card is not inkable", errorCode: "NOT_INKABLE" };
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const { args, G } = ctx;
    const { cardId } = args;
    const ownerId = ctx.framework.state.ctx.priority.holder as PlayerId;
    const revealUntilStateID = (ctx.framework.state.ctx._stateID ?? 0) + 3;

    const inkwellZoneRef = { zone: "inkwell", playerId: ownerId };
    ctx.framework.zones.moveCard(cardId, inkwellZoneRef);
    ctx.cards.patchMeta(cardId, { state: "ready", publicFaceState: "faceDown" });
    ctx.framework.zones.reveal([cardId], "all", { stateID: revealUntilStateID });
    ctx.framework.log({
      category: "action",
      visibility: { mode: "PUBLIC" },
      defaultMessage: createLorcanaLogMessage("lorcana.card.inked", {
        playerId: ownerId,
        cardId: cardId as CardInstanceId,
      }),
    });

    G.turnMetadata.inkedThisTurn.push(cardId as CardInstanceId);

    emitTriggeredLorcanaEvent(
      ctx,
      "cardInked",
      {
        playerId: ownerId,
        cardId,
        from: `hand:${ownerId}`,
        to: `inkwell:${ownerId}`,
      },
      {
        event: "ink",
        playerId: ownerId,
        subjectCardId: cardId,
      },
    );
    flushTriggeredEventsToBag(ctx);
  },

  available: (ctx) => {
    if (hasPendingActionEffectResolution(ctx)) {
      return false;
    }

    if (hasPendingBagItems(ctx)) {
      return false;
    }

    // Enforce once-per-turn inkwell rule (Rule 4.3.3)
    if (
      !canInkThisTurn({
        state: buildTurnActionInkState(ctx),
        getDefinitionByInstanceId: (cardId) => ctx.cards.getDefinition(cardId),
      })
    ) {
      return false;
    }

    const queryByTarget = ctx.cards.queryTargetDsl ?? ctx.cards.queryRuntime;
    const validCardsRuntime = queryByTarget(INKWELL_CANDIDATE_QUERY_DSL).filter((card) =>
      card.canBePutInInkwell(),
    );

    return validCardsRuntime.length > 0;
  },
};
