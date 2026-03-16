import type { PacketAnimation, PacketAnimationContext } from "#core";
import type { LorcanaBoardZoneId, LorcanaG } from "../types";
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

export type LorcanaBoardMoveAnimationVariant =
  | "ink-faceDown"
  | "ink-faceUp"
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

type LorcanaPacketAnimationPayloads = {
  "lorcana.boardMove": LorcanaBoardMoveAnimationPayload;
  "play.action": CardActionPlayerAnimationPayload;
};

export type LorcanaPacketAnimation = {
  [TKind in keyof LorcanaPacketAnimationPayloads]: PacketAnimation<
    TKind,
    LorcanaPacketAnimationPayloads[TKind]
  >;
}[keyof LorcanaPacketAnimationPayloads];

export function deriveLorcanaPacketAnimations(
  context: PacketAnimationContext<LorcanaG, LorcanaCardDefinition>,
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

  if (command.move === "putCardIntoInkwell") {
    return [
      // {
      //   id: `${command.commandID}:ink:${maybeCardId}`,
      //   kind: "lorcana.boardMove",
      //   payload: {
      //     actorPlayerId: context.playerId,
      //     actorSide: nextLocation.side,
      //     cardId: maybeCardId,
      //     destinationZoneId: "inkwell",
      //     impactAt: "destination",
      //     renderFace,
      //     sourceZoneId: previousLocation?.zoneId ?? "hand",
      //     variant: renderFace === "faceUp" ? "ink-faceUp" : "ink-faceDown",
      //   },
      // },
    ];
  }

  if (command.move === "playCard") {
    const cardPlayedId = getCardIdFromArgs(command.input.args);

    if (!cardPlayedId) {
      return [];
    }

    const cardInstanceRecord = staticResources.instances.get(cardPlayedId);
    const cardDefinition = staticResources.cards.get(cardInstanceRecord?.definitionId || "");

    if (cardDefinition?.cardType === "action" && cardInstanceRecord) {
      const payload: CardActionPlayerAnimationPayload = {
        cardId: cardInstanceRecord.definitionId,
        player: cardInstanceRecord.ownerID,
      };

      return [
        {
          id: `${command.commandID}:play:${cardInstanceRecord.instanceId}`,
          kind: "play.action",
          payload,
        },
      ];
    }

    return [];
  }

  if (command.move !== "playCard") {
    return [];
  }

  return [
    // {
    //   id: `${command.commandID}:play:${maybeCardId}`,
    //   kind: "lorcana.boardMove",
    //   payload: {
    //     actorPlayerId: context.playerId,
    //     actorSide: nextLocation.side,
    //     cardId: maybeCardId,
    //     destinationZoneId: nextLocation.zoneId,
    //     impactAt: variant === "play-action" ? "via" : "destination",
    //     renderFace: "faceUp",
    //     sourceZoneId: previousLocation?.zoneId ?? "hand",
    //     variant,
    //     viaAnchorId: variant === "play-action" ? BOARD_CENTER_ANCHOR_ID : undefined,
    //   },
    // },
  ];
}
