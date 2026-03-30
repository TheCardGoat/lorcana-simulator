// .agents/skills/lorcana-rules/SKILL.md
// .agents/skills/lorcana-rules/indexes/by-topic/turn-actions.md

import type {
  CardInstanceId,
  MoveEnumerationContext,
  MoveInput,
  MoveValidationContext,
  PlayerId,
  RuntimeValidationResult,
} from "#core";
import type { LorcanaCard } from "@tcg/lorcana-types";
import {
  createLorcanaLogProjection,
  type LorcanaG,
  type LorcanaMoveDefinition,
} from "../../../types";
import { normalizeTargetDescriptor, resolveCandidateTargets } from "../../../targeting/runtime";
import { hasKeyword } from "../../../card-utils";
import { createProjectionState, getEffectiveLore } from "../../../rules/derived-state";
import {
  hasStaticSelfRestriction,
  hasStaticCardRestriction,
  hasOpponentStaticPlayRestriction,
} from "../../rules/static-ability-utils";
import {
  hasTemporaryKeyword,
  hasTemporaryLostKeyword,
  hasTemporaryPlayerRestriction,
  hasTemporaryRestriction,
} from "../../effects/temporary-effects";
import {
  EFFECT_PENDING_ERROR_CODE,
  hasPendingActionEffectResolution,
} from "../../resolution/action-effects/pending-action-effects";
import { getOrBuildMoveRegistry } from "../../rules/move-registry-cache";
import type { PlayCardExecutionContext } from "../../resolution/action-effects/types";
import { validateExertCost } from "../../rules/play-card-rules";
import {
  emitTriggeredLorcanaEvent,
  flushTriggeredEventsToBag,
  hasPendingBagItems,
} from "../../effects/triggered-abilities";

const QUEST_TARGET_DSL = {
  selector: "chosen",
  count: 1,
  owner: "you",
  zones: ["play"],
  cardTypes: ["character"],
} as const;

function getCardDefinitionFromContext(
  ctx: {
    cards: {
      getDefinition: (cardId: string) => unknown;
    };
  },
  cardId: string,
): LorcanaCard | undefined {
  return ctx.cards.getDefinition(cardId) as LorcanaCard | undefined;
}

type QuestValidationReadContext = Pick<
  MoveValidationContext<MoveInput>,
  "G" | "framework" | "cards"
>;

type QuestEnumerationReadContext = Pick<MoveEnumerationContext, "G" | "framework" | "cards">;

type QuestReadableContext =
  | QuestValidationReadContext
  | QuestEnumerationReadContext
  | PlayCardExecutionContext;

function validateQuestCard(
  ctx: QuestReadableContext,
  cardId: CardInstanceId,
): RuntimeValidationResult {
  const registry = getOrBuildMoveRegistry(ctx);

  if (hasPendingActionEffectResolution(ctx)) {
    return {
      valid: false,
      error: "Cannot quest while an action effect is pending",
      errorCode: EFFECT_PENDING_ERROR_CODE,
    };
  }

  if (hasPendingBagItems(ctx)) {
    return {
      valid: false,
      error: "Cannot quest while bag effects are pending",
      errorCode: "BAG_PENDING",
    };
  }

  const currentPlayer = ctx.framework.state.currentPlayer!;

  const playCards = ctx.framework.zones.getCards({ zone: "play", playerId: currentPlayer });
  if (!playCards.includes(cardId)) {
    return { valid: false, error: "Character not in play", errorCode: "NOT_IN_PLAY" };
  }

  const cardDef = getCardDefinitionFromContext(ctx, cardId);
  if (cardDef && cardDef.cardType !== "character") {
    return { valid: false, error: "Only characters can quest", errorCode: "NOT_A_CHARACTER" };
  }

  if (ctx.G.turnMetadata.charactersQuesting.includes(cardId)) {
    return {
      valid: false,
      error: "Character already quested this turn",
      errorCode: "ALREADY_QUESTED",
    };
  }

  const questMeta = ctx.cards.require(cardId).meta;
  const exertValidation = validateExertCost(questMeta, cardDef?.cardType);
  if (!exertValidation.valid) {
    return exertValidation;
  }

  const currentTurn = ctx.framework.state.status.turn ?? 1;
  const hasTemporaryRecklessLoss = hasTemporaryLostKeyword(questMeta, currentTurn, "Reckless");
  const hasReckless =
    ((cardDef ? hasKeyword(cardDef, "Reckless") : false) && !hasTemporaryRecklessLoss) ||
    hasTemporaryKeyword(questMeta, currentTurn, "Reckless");
  if (hasReckless) {
    return {
      valid: false,
      error: "Character has Reckless and cannot quest",
      errorCode: "RECKLESS_CANT_QUEST",
    };
  }
  if (
    hasTemporaryRestriction(questMeta, currentTurn, "cant-quest", {
      isSourceInPlay: (sourceId) => {
        const zoneKey = ctx.framework.zones.getCardZone(sourceId);
        return typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"));
      },
    })
  ) {
    return {
      valid: false,
      error: "Character cannot quest due to an active restriction",
      errorCode: "CANT_QUEST_RESTRICTED",
    };
  }

  if (
    hasStaticSelfRestriction({
      state: ctx.framework.state,
      cardId,
      restriction: "cant-quest",
      getDefinitionByInstanceId: (instanceId) =>
        getCardDefinitionFromContext(ctx, instanceId) as LorcanaCard | undefined,
    })
  ) {
    return {
      valid: false,
      error: "Character cannot quest due to a static restriction",
      errorCode: "CANT_QUEST_RESTRICTED",
    };
  }

  if (
    hasStaticCardRestriction({
      state: ctx.framework.state,
      cardId,
      restriction: "cant-quest",
      registry,
    })
  ) {
    return {
      valid: false,
      error: "Character cannot quest due to a static restriction from another card",
      errorCode: "CANT_QUEST_RESTRICTED",
    };
  }

  return { valid: true };
}

function isPlayerBlockedFromGainingLore(
  ctx: PlayCardExecutionContext,
  playerId: PlayerId,
): boolean {
  const staticAbilityState = {
    priority: ctx.framework.state.priority,
    status: ctx.framework.state.status,
    _zonesPrivate: ctx.framework.state._zonesPrivate,
    _zonesPublic: ctx.framework.state._zonesPublic,
    G: ctx.G,
  };
  const registry = getOrBuildMoveRegistry(ctx);

  if (
    hasTemporaryPlayerRestriction(
      ctx.G.temporaryPlayerRestrictions,
      playerId,
      ctx.framework.state.status.turn ?? 1,
      "cant-gain-lore",
    )
  ) {
    return true;
  }

  return hasOpponentStaticPlayRestriction({
    state: staticAbilityState,
    playerId,
    restriction: "cant-gain-lore",
    registry,
  });
}

function executeQuestCard(ctx: PlayCardExecutionContext, cardId: CardInstanceId): number {
  const currentPlayer = ctx.framework.state.currentPlayer!;
  const registry = getOrBuildMoveRegistry(ctx);

  ctx.cards.patchMeta(cardId, { state: "exerted" });

  const loreValue = getEffectiveLore(
    ctx.cards.getDefinition(cardId) as any,
    createProjectionState(ctx.framework.state, ctx.G),
    cardId,
    (id) => ctx.cards.getDefinition(id) as any,
    registry,
  );

  const blocked = isPlayerBlockedFromGainingLore(ctx, currentPlayer as PlayerId);
  const effectiveLoreGain = blocked ? 0 : loreValue;

  const previousLore = Number(ctx.G.lore[currentPlayer as PlayerId] ?? 0);
  ctx.G.lore[currentPlayer as PlayerId] = previousLore + effectiveLoreGain;
  ctx.G.turnMetadata.charactersQuesting.push(cardId);

  emitTriggeredLorcanaEvent(
    ctx,
    "quested",
    {
      playerId: currentPlayer,
      cardId,
      loreGained: loreValue,
    },
    [
      {
        event: "quest",
        playerId: currentPlayer,
        subjectCardId: cardId,
      },
      {
        event: "exert",
        playerId: currentPlayer,
        subjectCardId: cardId,
      },
      ...(loreValue > 0
        ? [
            {
              event: "gain-lore" as const,
              playerId: currentPlayer as PlayerId,
              triggerSourceCardId: cardId,
              eventSnapshot: {
                triggerAmount: loreValue,
              },
            },
          ]
        : []),
    ],
  );
  flushTriggeredEventsToBag(ctx);

  return loreValue;
}

function getQuestableCharacterIds(ctx: QuestReadableContext): CardInstanceId[] {
  const currentPlayer = ctx.framework.state.currentPlayer!;
  const playCards = ctx.framework.zones.getCards({
    zone: "play",
    playerId: currentPlayer,
  }) as CardInstanceId[];

  return playCards.filter((cardId) => validateQuestCard(ctx, cardId).valid);
}

/**
 * Quest with a character
 */
export const quest: LorcanaMoveDefinition<"quest"> = {
  validate: (ctx): RuntimeValidationResult => {
    const { cardId } = ctx.args;
    if (ctx.validationMode === "preflight" && cardId == null) {
      return { valid: true };
    }
    return validateQuestCard(ctx, cardId as CardInstanceId);
  },

  execute: (ctx) => {
    const cardId = ctx.args.cardId as CardInstanceId;
    const loreGained = executeQuestCard(ctx, cardId);
    ctx.framework.log(
      createLorcanaLogProjection(
        "lorcana.move.quest",
        {
          playerId: ctx.framework.state.currentPlayer!,
          cardId,
          loreGained,
        },
        { mode: "PUBLIC" },
        "action",
      ),
    );
  },

  available: (ctx) => {
    if (hasPendingActionEffectResolution(ctx)) {
      return false;
    }

    if (hasPendingBagItems(ctx)) {
      return false;
    }

    const registry = getOrBuildMoveRegistry(ctx);
    const descriptor = normalizeTargetDescriptor(QUEST_TARGET_DSL);
    const candidates = resolveCandidateTargets(ctx, descriptor, {
      controllerId: ctx.playerId as PlayerId,
      // Must not have quested this turn
      extraPredicate: (cardId) => {
        const cardDef = getCardDefinitionFromContext(ctx, cardId);

        if (ctx.G.turnMetadata.charactersQuesting.includes(cardId as CardInstanceId)) {
          return false;
        }

        // Must not be exerted; must not be drying (cardMeta)
        const meta = ctx.cards.require(cardId).meta;
        if (meta?.state === "exerted") {
          return false;
        }
        if (meta?.isDrying) {
          return false;
        }
        const currentTurn = ctx.framework.state.status.turn ?? 1;
        const hasTemporaryRecklessLoss = hasTemporaryLostKeyword(meta, currentTurn, "Reckless");
        if (
          ((cardDef ? hasKeyword(cardDef, "Reckless") : false) && !hasTemporaryRecklessLoss) ||
          hasTemporaryKeyword(meta, currentTurn, "Reckless")
        ) {
          return false;
        }
        if (
          hasTemporaryRestriction(meta, currentTurn, "cant-quest", {
            isSourceInPlay: (sourceId) => {
              const zoneKey = ctx.framework.zones.getCardZone(sourceId);
              return (
                typeof zoneKey === "string" && (zoneKey === "play" || zoneKey.startsWith("play:"))
              );
            },
          })
        ) {
          return false;
        }
        if (
          hasStaticSelfRestriction({
            state: ctx.framework.state,
            cardId: cardId as CardInstanceId,
            restriction: "cant-quest",
            getDefinitionByInstanceId: (instanceId) =>
              getCardDefinitionFromContext(ctx, instanceId) as LorcanaCard | undefined,
          })
        ) {
          return false;
        }

        if (
          hasStaticCardRestriction({
            state: ctx.framework.state,
            cardId: cardId as CardInstanceId,
            restriction: "cant-quest",
            registry,
          })
        ) {
          return false;
        }

        return true;
      },
    });

    return candidates.length > 0;
  },
};

export const questWithAll: LorcanaMoveDefinition<"questWithAll"> = {
  validate: (ctx): RuntimeValidationResult => {
    if (hasPendingActionEffectResolution(ctx)) {
      return {
        valid: false,
        error: "Cannot quest while an action effect is pending",
        errorCode: EFFECT_PENDING_ERROR_CODE,
      };
    }

    if (hasPendingBagItems(ctx)) {
      return {
        valid: false,
        error: "Cannot quest while bag effects are pending",
        errorCode: "BAG_PENDING",
      };
    }

    if (getQuestableCharacterIds(ctx).length === 0) {
      return {
        valid: false,
        error: "No eligible characters can quest",
        errorCode: "NO_ELIGIBLE_QUESTERS",
      };
    }

    return { valid: true };
  },

  execute: (ctx) => {
    const cardIds = getQuestableCharacterIds(ctx);
    let loreGained = 0;

    for (const cardId of cardIds) {
      loreGained += executeQuestCard(ctx, cardId);
    }

    ctx.framework.log(
      createLorcanaLogProjection(
        "lorcana.move.questWithAll",
        {
          playerId: ctx.framework.state.currentPlayer!,
          cardIds,
          loreGained,
          count: cardIds.length,
        },
        { mode: "PUBLIC" },
        "action",
      ),
    );
  },

  available: (ctx) => {
    if (hasPendingActionEffectResolution(ctx)) {
      return false;
    }

    if (hasPendingBagItems(ctx)) {
      return false;
    }

    if (getQuestableCharacterIds(ctx).length === 0) {
      return false;
    }

    return true;
  },
};
