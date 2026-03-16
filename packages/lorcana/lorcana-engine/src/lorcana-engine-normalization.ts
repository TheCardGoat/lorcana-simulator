import type { CardInstanceId, PlayerId } from "#core";
import type { LorcanaRuntimeMoveInputs, LorcanaRuntimeMoveParams } from "./types";

export type PlayCardCostInput = "standard" | "free" | PlayCardCostObject;

/**
 * Convenience type for playCard cost parameter in client mode.
 */
type PlayCardCostObject =
  | { cost: "standard"; amount?: number; targets?: CardInstanceId[] }
  | { cost: "free"; amount?: number; targets?: CardInstanceId[] }
  | { cost: "shift"; shiftTarget: CardInstanceId; amount?: number; targets?: CardInstanceId[] }
  | {
      cost: "sing";
      singer: CardInstanceId;
      amount?: number;
      targets?: CardInstanceId[];
    }
  | {
      cost: "singTogether";
      singers: CardInstanceId[];
      amount?: number;
      targets?: CardInstanceId[];
    };

type PlayCardMoveParams = LorcanaRuntimeMoveParams["playCard"];
type NormalizedPlayCardOptions = {
  targets?: CardInstanceId[];
  playerTargets?: PlayerId | PlayerId[];
  amount?: number;
  namedCard?: string;
  resolveOptional?: boolean;
  choiceIndex?: number;
  destinations?: PlayCardMoveParams["destinations"];
  preventAutoResolveTriggeredEffects?: boolean;
};

type NormalizedPlayCardFields = Pick<
  PlayCardMoveParams,
  | "targets"
  | "playerTargets"
  | "amount"
  | "namedCard"
  | "resolveOptional"
  | "choiceIndex"
  | "destinations"
  | "preventAutoResolveTriggeredEffects"
>;

export function normalizeMoveRequestId(moveId: string): keyof LorcanaRuntimeMoveInputs & string {
  if (moveId === "putACardIntoTheInkwell") {
    return "putCardIntoInkwell";
  }
  if (moveId === "chooseFirstPlayer" || moveId === "chooseFirtPlayer") {
    return "chooseWhoGoesFirst";
  }
  if (moveId === "mulligan") {
    return "alterHand";
  }

  return moveId as keyof LorcanaRuntimeMoveInputs & string;
}

export function normalizePlayCardCost(
  cardId: CardInstanceId,
  cost: PlayCardCostInput,
  options?: NormalizedPlayCardOptions,
): PlayCardMoveParams {
  const actionResolutionFields: Partial<NormalizedPlayCardFields> = {};

  if (options?.targets) {
    actionResolutionFields.targets = options.targets;
  }
  if (options?.playerTargets) {
    actionResolutionFields.playerTargets = options.playerTargets;
  }
  if (typeof options?.amount === "number") {
    actionResolutionFields.amount = options.amount;
  }
  if (typeof options?.namedCard === "string" && options.namedCard.trim().length > 0) {
    actionResolutionFields.namedCard = options.namedCard.trim();
  }
  if (typeof options?.resolveOptional === "boolean") {
    actionResolutionFields.resolveOptional = options.resolveOptional;
  }
  if (typeof options?.choiceIndex === "number") {
    actionResolutionFields.choiceIndex = options.choiceIndex;
  }
  if (Array.isArray(options?.destinations) && options.destinations.length > 0) {
    actionResolutionFields.destinations = options.destinations;
  }
  if (typeof options?.preventAutoResolveTriggeredEffects === "boolean") {
    actionResolutionFields.preventAutoResolveTriggeredEffects =
      options.preventAutoResolveTriggeredEffects;
  }

  if (cost === "standard") {
    return {
      cardId,
      cost: "standard",
      ...actionResolutionFields,
    };
  }

  if (cost === "free") {
    return {
      cardId,
      cost: "free",
      ...actionResolutionFields,
    };
  }

  switch (cost.cost) {
    case "standard":
      return {
        cardId,
        cost: "standard",
        ...actionResolutionFields,
      };
    case "free":
      return {
        cardId,
        cost: "free",
        ...actionResolutionFields,
      };
    case "shift":
      return {
        cardId,
        cost: "shift",
        shiftTarget: cost.shiftTarget,
        ...actionResolutionFields,
      };
    case "sing":
      return {
        cardId,
        cost: "sing",
        singer: cost.singer,
        ...actionResolutionFields,
      };
    case "singTogether":
      return {
        cardId,
        cost: "singTogether",
        singers: cost.singers,
        ...actionResolutionFields,
      };
  }
}
