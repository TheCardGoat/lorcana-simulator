import type { PacketAnimation, PacketAnimationContext } from "#core";
import type { LorcanaBoardZoneId, LorcanaCardMeta, LorcanaG } from "../types";
import type { LorcanaCardDefinition } from "@tcg/lorcana-types";

const BOARD_CENTER_ANCHOR_ID = "board:center";

function parseZoneId(zoneId?: string): LorcanaBoardZoneId | null {
  const baseZoneId = zoneId?.split(":")[0];
  switch (baseZoneId) {
    case "hand":
    case "play":
    case "inkwell":
    case "discard":
      return baseZoneId;
    default:
      return null;
  }
}

function resolvePlayVariant(
  definition?: LorcanaCardDefinition,
): LorcanaBoardMoveAnimationVariant | null {
  switch (definition?.cardType) {
    case "character":
      return "play-character";
    case "item":
      return "play-item";
    case "location":
      return "play-location";
    case "action":
      return "play-action";
    default:
      return null;
  }
}

function getCardIdFromArgs(args: object): string | null {
  if (!("cardId" in args) || typeof args.cardId !== "string") {
    return null;
  }

  return args.cardId;
}

function resolveActorSide(context: PacketAnimationContext): "playerOne" | "playerTwo" | null {
  const playerIds = context.nextState.ctx.playerIds;
  if (playerIds[0] === context.playerId) {
    return "playerOne";
  }
  if (playerIds[1] === context.playerId) {
    return "playerTwo";
  }
  return null;
}

function getPlayerLore(state: { G: LorcanaG }, playerId: string): number {
  return Number(state.G.lore[playerId as keyof typeof state.G.lore] ?? 0);
}

function findCardZone(
  state: { ctx: { zones: { private: { zoneCards: Record<string, string[]> } } } },
  cardId: string,
  ownerId: string,
): LorcanaBoardZoneId | null {
  for (const zone of ["hand", "play", "inkwell", "discard"] as const) {
    const key = `${zone}:${ownerId}`;
    const cards = state.ctx.zones.private.zoneCards[key];
    if (Array.isArray(cards) && cards.includes(cardId)) {
      return zone;
    }
  }
  return null;
}

export type LorcanaBoardMoveAnimationVariant =
  | "ink-faceDown"
  | "ink-faceUp"
  | "move-to-location"
  | "play-character"
  | "play-item"
  | "play-location"
  | "play-action";

type CardActionPlayerAnimationPayload = {
  cardId: string;
  player: string;
};

type LorcanaBoardMoveAnimationPayload = {
  actorPlayerId: string;
  actorSide: "playerOne" | "playerTwo";
  cardId: string;
  destinationZoneId: LorcanaBoardZoneId;
  impactAt: "destination" | "via";
  renderFace: "faceUp" | "faceDown";
  sourceZoneId: LorcanaBoardZoneId;
  variant: LorcanaBoardMoveAnimationVariant;
  viaAnchorId?: typeof BOARD_CENTER_ANCHOR_ID;
};

export type LorcanaQuestAnimationPayload = {
  actorPlayerId: string;
  actorSide: "playerOne" | "playerTwo";
  cardId: string;
  loreGained: number;
};

export type LorcanaChallengeAnimationPayload = {
  actorSide: "playerOne" | "playerTwo";
  attackerId: string;
  defenderId: string;
  defenderKind: "character" | "location";
  attackerDamageDealt: number;
  defenderDamageDealt: number;
  attackerWouldBeBanished: boolean;
  defenderWouldBeBanished: boolean;
};

export type LorcanaTurnChangeAnimationPayload = {
  previousPlayerId: string;
  nextPlayerId: string;
  nextPlayerSide: "playerOne" | "playerTwo";
  turnNumber: number;
};

export type LorcanaConcedeAnimationPayload = {
  concedingPlayerId: string;
  concedingSide: "playerOne" | "playerTwo";
};

export type LorcanaCardEffectAnimationPayload = {
  actorSide: "playerOne" | "playerTwo";
  cardId: string;
  effectKind: "activate-ability" | "sing" | "resolve-effect";
};

export type LorcanaMulliganAnimationPayload = {
  actorSide: "playerOne" | "playerTwo";
  mulliganCount: number;
};

type LorcanaPacketAnimationPayloads = {
  "lorcana.boardMove": LorcanaBoardMoveAnimationPayload;
  "lorcana.cardEffect": LorcanaCardEffectAnimationPayload;
  "lorcana.challenge": LorcanaChallengeAnimationPayload;
  "lorcana.concede": LorcanaConcedeAnimationPayload;
  "lorcana.mulligan": LorcanaMulliganAnimationPayload;
  "lorcana.quest": LorcanaQuestAnimationPayload;
  "lorcana.turnChange": LorcanaTurnChangeAnimationPayload;
  "play.action": CardActionPlayerAnimationPayload;
};

export type LorcanaPacketAnimation = {
  [TKind in keyof LorcanaPacketAnimationPayloads]: PacketAnimation<
    TKind,
    LorcanaPacketAnimationPayloads[TKind]
  >;
}[keyof LorcanaPacketAnimationPayloads];

export function deriveLorcanaPacketAnimations(
  context: PacketAnimationContext,
): readonly LorcanaPacketAnimation[] {
  const { command, staticResources } = context;

  if (
    !staticResources ||
    !command.input ||
    command.input.args === null ||
    typeof command.input.args !== "object"
  ) {
    return [];
  }

  if (command.move === "challenge") {
    const actorSide = resolveActorSide(context);
    const args = command.input.args as { attackerId?: string; defenderId?: string };
    const attackerId = typeof args.attackerId === "string" ? args.attackerId : null;
    const defenderId = typeof args.defenderId === "string" ? args.defenderId : null;

    if (!actorSide || !attackerId || !defenderId) {
      return [];
    }

    const defenderInstance = staticResources.instances.get(defenderId);
    const defenderDef = defenderInstance
      ? (staticResources.cards.get(defenderInstance.definitionId) as
          | LorcanaCardDefinition
          | undefined)
      : undefined;
    const defenderKind: "character" | "location" =
      defenderDef?.cardType === "location" ? "location" : "character";

    const previousCardMeta = context.previousState.ctx.zones.private.cardMeta;
    const nextCardMeta = context.nextState.ctx.zones.private.cardMeta;
    const previousZoneCards = context.previousState.ctx.zones.private.zoneCards;
    const nextZoneCards = context.nextState.ctx.zones.private.zoneCards;

    const attackerInstance = staticResources.instances.get(attackerId);
    const attackerDef = attackerInstance
      ? (staticResources.cards.get(attackerInstance.definitionId) as
          | LorcanaCardDefinition
          | undefined)
      : undefined;

    const previousAttackerMeta = previousCardMeta[attackerId] as LorcanaCardMeta | undefined;
    const nextAttackerMeta = nextCardMeta[attackerId] as LorcanaCardMeta | undefined;
    const previousDefenderMeta = previousCardMeta[defenderId] as LorcanaCardMeta | undefined;
    const nextDefenderMeta = nextCardMeta[defenderId] as LorcanaCardMeta | undefined;

    // Compute damage dealt by looking at the damage delta.
    // When a card is banished, its damage may be reset in nextState, so we fall
    // back to the card's strength as the damage dealt.
    const defenderDamageDelta =
      (nextDefenderMeta?.damage ?? 0) - (previousDefenderMeta?.damage ?? 0);
    const attackerDamageDealt =
      defenderDamageDelta > 0 ? defenderDamageDelta : (attackerDef?.strength ?? 0);
    const attackerDamageDelta =
      defenderKind === "character"
        ? (nextAttackerMeta?.damage ?? 0) - (previousAttackerMeta?.damage ?? 0)
        : 0;
    const defenderDamageDealt =
      defenderKind === "character"
        ? attackerDamageDelta > 0
          ? attackerDamageDelta
          : (defenderDef?.strength ?? 0)
        : 0;

    const attackerOwner = attackerInstance?.ownerID;
    const defenderOwner = defenderInstance?.ownerID;

    const isInDiscard = (cardId: string, ownerId: string | undefined): boolean => {
      if (!ownerId) return false;
      const discardKey = `discard:${ownerId}`;
      const nextDiscard = nextZoneCards[discardKey];
      const previousDiscard = previousZoneCards[discardKey];
      return (
        Array.isArray(nextDiscard) &&
        nextDiscard.includes(cardId) &&
        (!Array.isArray(previousDiscard) || !previousDiscard.includes(cardId))
      );
    };

    const attackerWouldBeBanished = isInDiscard(attackerId, attackerOwner);
    const defenderWouldBeBanished = isInDiscard(defenderId, defenderOwner);

    return [
      {
        id: `${command.commandID}:challenge:${attackerId}:${defenderId}`,
        kind: "lorcana.challenge",
        payload: {
          actorSide,
          attackerId,
          defenderId,
          defenderKind,
          attackerDamageDealt: Math.max(0, attackerDamageDealt),
          defenderDamageDealt: Math.max(0, defenderDamageDealt),
          attackerWouldBeBanished,
          defenderWouldBeBanished,
        },
      },
    ];
  }

  if (command.move === "quest") {
    const cardId = getCardIdFromArgs(command.input.args);
    const actorSide = resolveActorSide(context);
    if (!cardId || !actorSide) {
      return [];
    }

    const loreGained =
      getPlayerLore(context.nextState, context.playerId) -
      getPlayerLore(context.previousState, context.playerId);

    return [
      {
        id: `${command.commandID}:quest:${cardId}`,
        kind: "lorcana.quest",
        payload: {
          actorPlayerId: context.playerId,
          actorSide,
          cardId,
          loreGained: Math.max(0, loreGained),
        },
      },
    ];
  }

  if (command.move === "questWithAll") {
    const actorSide = resolveActorSide(context);
    if (!actorSide) {
      return [];
    }

    const previousCardMeta = context.previousState.ctx.zones.private.cardMeta;
    const nextCardMeta = context.nextState.ctx.zones.private.cardMeta;
    const animations: LorcanaPacketAnimation[] = [];

    for (const [cardId, nextMeta] of Object.entries(nextCardMeta)) {
      const previousMeta = previousCardMeta[cardId] as LorcanaCardMeta | undefined;
      if (
        (nextMeta as LorcanaCardMeta | undefined)?.state === "exerted" &&
        previousMeta?.state !== "exerted"
      ) {
        const instanceRecord = staticResources.instances.get(cardId);
        const cardDef = instanceRecord
          ? staticResources.cards.get(instanceRecord.definitionId)
          : undefined;
        const loreValue = (cardDef as LorcanaCardDefinition | undefined)?.lore ?? 0;

        animations.push({
          id: `${command.commandID}:quest:${cardId}`,
          kind: "lorcana.quest",
          payload: {
            actorPlayerId: context.playerId,
            actorSide,
            cardId,
            loreGained: loreValue,
          },
        });
      }
    }

    return animations;
  }

  if (command.move === "putCardIntoInkwell") {
    const cardId = getCardIdFromArgs(command.input.args);
    const actorSide = resolveActorSide(context);
    if (!cardId || !actorSide) {
      return [];
    }

    const cardInstanceRecord = staticResources.instances.get(cardId);
    if (!cardInstanceRecord) {
      return [];
    }

    const nextCardMeta = context.nextState.ctx.zones.private.cardMeta;
    const meta = nextCardMeta[cardId] as LorcanaCardMeta | undefined;
    const renderFace: "faceUp" | "faceDown" = meta?.faceDown === false ? "faceUp" : "faceDown";
    const sourceZoneId =
      findCardZone(context.previousState, cardId, cardInstanceRecord.ownerID) ?? "hand";

    return [
      {
        id: `${command.commandID}:ink:${cardId}`,
        kind: "lorcana.boardMove",
        payload: {
          actorPlayerId: context.playerId,
          actorSide,
          cardId,
          destinationZoneId: "inkwell",
          impactAt: "destination",
          renderFace,
          sourceZoneId,
          variant: renderFace === "faceUp" ? "ink-faceUp" : "ink-faceDown",
        },
      },
    ];
  }

  if (command.move === "playCard") {
    const cardPlayedId = getCardIdFromArgs(command.input.args);

    if (!cardPlayedId) {
      return [];
    }

    const cardInstanceRecord = staticResources.instances.get(cardPlayedId);
    const cardDefinition = staticResources.cards.get(cardInstanceRecord?.definitionId || "");
    const actorSide = resolveActorSide(context);

    if (!cardInstanceRecord || !actorSide) {
      return [];
    }

    const variant = resolvePlayVariant(cardDefinition as LorcanaCardDefinition);
    if (!variant) {
      return [];
    }

    const animations: LorcanaPacketAnimation[] = [];
    const destinationZoneId: LorcanaBoardZoneId = variant === "play-action" ? "discard" : "play";

    animations.push({
      id: `${command.commandID}:play:${cardPlayedId}`,
      kind: "lorcana.boardMove",
      payload: {
        actorPlayerId: context.playerId,
        actorSide,
        cardId: cardPlayedId,
        destinationZoneId,
        impactAt: "via",
        renderFace: "faceUp",
        sourceZoneId: "hand",
        variant,
        viaAnchorId: BOARD_CENTER_ANCHOR_ID,
      },
    });

    // Keep play.action packet for action card spell effect overlay
    if (variant === "play-action") {
      animations.push({
        id: `${command.commandID}:play-action-effect:${cardPlayedId}`,
        kind: "play.action",
        payload: {
          cardId: cardInstanceRecord.definitionId,
          player: cardInstanceRecord.ownerID,
        },
      });
    }

    return animations;
  }

  if (command.move === "moveCharacterToLocation") {
    const args = command.input.args as { characterId?: string; locationId?: string };
    const characterId = typeof args.characterId === "string" ? args.characterId : null;
    const locationId = typeof args.locationId === "string" ? args.locationId : null;
    const actorSide = resolveActorSide(context);
    if (!characterId || !locationId || !actorSide) {
      return [];
    }

    return [
      {
        id: `${command.commandID}:move-to-location:${characterId}`,
        kind: "lorcana.boardMove",
        payload: {
          actorPlayerId: context.playerId,
          actorSide,
          cardId: characterId,
          destinationZoneId: "play",
          impactAt: "destination",
          renderFace: "faceUp",
          sourceZoneId: "play",
          variant: "move-to-location",
        },
      },
    ];
  }

  if (command.move === "passTurn") {
    const playerIds = context.nextState.ctx.playerIds;
    const previousPlayerId = context.playerId;
    const nextPlayerId = playerIds[0] === previousPlayerId ? playerIds[1] : playerIds[0];
    const nextPlayerSide: "playerOne" | "playerTwo" =
      playerIds[0] === nextPlayerId ? "playerOne" : "playerTwo";
    const turnNumber = context.nextState.ctx.status?.turn ?? 0;

    return [
      {
        id: `${command.commandID}:turnChange`,
        kind: "lorcana.turnChange",
        payload: {
          previousPlayerId,
          nextPlayerId,
          nextPlayerSide,
          turnNumber,
        },
      },
    ];
  }

  if (command.move === "concede") {
    const actorSide = resolveActorSide(context);
    if (!actorSide) {
      return [];
    }

    return [
      {
        id: `${command.commandID}:concede`,
        kind: "lorcana.concede",
        payload: {
          concedingPlayerId: context.playerId,
          concedingSide: actorSide,
        },
      },
    ];
  }

  if (command.move === "activateAbility") {
    const cardId = getCardIdFromArgs(command.input.args);
    const actorSide = resolveActorSide(context);
    if (!cardId || !actorSide) {
      return [];
    }

    return [
      {
        id: `${command.commandID}:cardEffect:${cardId}`,
        kind: "lorcana.cardEffect",
        payload: {
          actorSide,
          cardId,
          effectKind: "activate-ability",
        },
      },
    ];
  }

  if (command.move === "resolveBag") {
    const args = command.input.args as { bagId?: string };
    const actorSide = resolveActorSide(context);
    if (!actorSide || typeof args.bagId !== "string") {
      return [];
    }

    const bagItems = context.previousState.G.triggeredAbilities?.bag?.items;
    const bagItem = Array.isArray(bagItems)
      ? bagItems.find((item: { id?: string }) => item.id === args.bagId)
      : undefined;
    const sourceId =
      bagItem && typeof bagItem === "object" && "sourceId" in bagItem
        ? (bagItem as { sourceId?: string }).sourceId
        : undefined;

    if (typeof sourceId !== "string") {
      return [];
    }

    return [
      {
        id: `${command.commandID}:cardEffect:${sourceId}`,
        kind: "lorcana.cardEffect",
        payload: {
          actorSide,
          cardId: sourceId,
          effectKind: "resolve-effect",
        },
      },
    ];
  }

  if (command.move === "resolveEffect") {
    const args = command.input.args as { effectId?: string };
    const actorSide = resolveActorSide(context);
    if (!actorSide || typeof args.effectId !== "string") {
      return [];
    }

    const pendingEffects = context.previousState.G.pendingEffects;
    const effect = Array.isArray(pendingEffects)
      ? pendingEffects.find((e: { id?: string }) => e.id === args.effectId)
      : undefined;
    const sourceId =
      effect && typeof effect === "object" && "sourceId" in effect
        ? (effect as { sourceId?: string }).sourceId
        : undefined;

    if (typeof sourceId !== "string") {
      return [];
    }

    return [
      {
        id: `${command.commandID}:cardEffect:${sourceId}`,
        kind: "lorcana.cardEffect",
        payload: {
          actorSide,
          cardId: sourceId,
          effectKind: "resolve-effect",
        },
      },
    ];
  }

  if (command.move === "alterHand") {
    const actorSide = resolveActorSide(context);
    if (!actorSide) {
      return [];
    }

    const args = command.input.args as { cardsToMulligan?: string[] };
    const mulliganCount = Array.isArray(args.cardsToMulligan) ? args.cardsToMulligan.length : 0;

    return [
      {
        id: `${command.commandID}:mulligan`,
        kind: "lorcana.mulligan",
        payload: {
          actorSide,
          mulliganCount,
        },
      },
    ];
  }

  if (command.move === "sing") {
    const args = command.input.args as { singerId?: string; songId?: string };
    const singerId = typeof args.singerId === "string" ? args.singerId : null;
    const songId = typeof args.songId === "string" ? args.songId : null;
    const actorSide = resolveActorSide(context);
    if (!singerId || !songId || !actorSide) {
      return [];
    }

    return [
      {
        id: `${command.commandID}:cardEffect:${singerId}`,
        kind: "lorcana.cardEffect",
        payload: {
          actorSide,
          cardId: singerId,
          effectKind: "sing",
        },
      },
      {
        id: `${command.commandID}:play:${songId}`,
        kind: "lorcana.boardMove",
        payload: {
          actorPlayerId: context.playerId,
          actorSide,
          cardId: songId,
          destinationZoneId: "discard",
          impactAt: "via",
          renderFace: "faceUp",
          sourceZoneId: "hand",
          variant: "play-action",
          viaAnchorId: BOARD_CENTER_ANCHOR_ID,
        },
      },
    ];
  }

  if (command.move === "singTogether") {
    const args = command.input.args as { singerIds?: string[]; songId?: string };
    const singerIds = Array.isArray(args.singerIds) ? args.singerIds : [];
    const songId = typeof args.songId === "string" ? args.songId : null;
    const actorSide = resolveActorSide(context);
    if (singerIds.length === 0 || !songId || !actorSide) {
      return [];
    }

    const animations: LorcanaPacketAnimation[] = singerIds
      .filter((id): id is string => typeof id === "string")
      .map((singerId) => ({
        id: `${command.commandID}:cardEffect:${singerId}`,
        kind: "lorcana.cardEffect" as const,
        payload: {
          actorSide,
          cardId: singerId,
          effectKind: "sing" as const,
        },
      }));

    animations.push({
      id: `${command.commandID}:play:${songId}`,
      kind: "lorcana.boardMove",
      payload: {
        actorPlayerId: context.playerId,
        actorSide,
        cardId: songId,
        destinationZoneId: "discard",
        impactAt: "via",
        renderFace: "faceUp",
        sourceZoneId: "hand",
        variant: "play-action",
        viaAnchorId: BOARD_CENTER_ANCHOR_ID,
      },
    });

    return animations;
  }

  return [];
}
