/**
 * Lorcana Runtime Move Parameters
 *
 * Type-safe move parameters for the new MatchRuntime architecture.
 * Each move has explicit parameters that are passed via CommandEnvelope.
 */

import type {
  CardInstanceId,
  MoveDefinition,
  MoveInput,
  PlayerId,
  PlayerTargetDSL,
  ZoneId,
} from "#core";
import type { LorcanaG } from "./runtime-state";
import type { LorcanaCard } from "@tcg/lorcana-types";
import type { LorcanaTargetDSL } from "../targeting";
import type { Amount } from "@tcg/lorcana-types";

import type { LorcanaRuntimeCardDerivedMethods } from "../runtime-moves";
import type { ActionResolutionInput } from "../runtime-moves/resolution/action-effects/types";
import type { DynamicAmountEventSnapshot } from "./domain-events";

/**
 * Play Card Cost Types - Discriminated Union
 *
 * `playerTargets` is intentionally included for forward compatibility with future runtime
 * support for player-targeted effects. The current runtime consumes player targets through
 * `targets` (mixed with card instance ids). When the runtime is updated to consume
 * `playerTargets` directly, clients can migrate to the new field without breaking changes.
 * See: https://github.com/TheCardGoat/the-card-goat-online/pull/228#discussion_r2894733960
 */
export interface PlayCardActionResolutionInput {
  targets?: CardInstanceId | CardInstanceId[];
  /** @internal Reserved for future runtime support. Currently consumed via `targets`. */
  playerTargets?: PlayerId | PlayerId[];
  amount?: Amount;
  namedCard?: string;
  resolveOptional?: boolean;
  choiceIndex?: number;
  preventAutoResolveTriggeredEffects?: boolean;
  destinations?: {
    zone: string;
    cards: CardInstanceId | CardInstanceId[];
  }[];
  eventSnapshot?: DynamicAmountEventSnapshot;
}

export type PlayCardCost =
  | { cost: "standard" }
  | { cost: "shift"; shiftTarget: CardInstanceId }
  | { cost: "sing"; singer: CardInstanceId }
  | { cost: "singTogether"; singers: CardInstanceId[] }
  | { cost: "free" };

/**
 * Lorcana Move Parameters
 *
 * Each property corresponds to a move in the runtime config.
 * Parameters are passed as `args` in the CommandEnvelope.
 */
export interface LorcanaRuntimeMoveParams {
  // ===== Setup Moves =====
  chooseWhoGoesFirst: { playerId: PlayerId };
  alterHand: { playerId: PlayerId; cardsToMulligan: CardInstanceId[] };

  // ===== Resource Moves =====
  putCardIntoInkwell: { cardId: CardInstanceId };

  // ===== Core Game Moves =====
  playCard: { cardId: CardInstanceId } & PlayCardCost & PlayCardActionResolutionInput;
  quest: { cardId: CardInstanceId };
  questWithAll: Record<string, never>;
  challenge: { attackerId: CardInstanceId; defenderId: CardInstanceId };

  // ===== Song Moves =====
  sing: { singerId: CardInstanceId; songId: CardInstanceId };
  singTogether: { singerIds: CardInstanceId[]; songId: CardInstanceId };

  // ===== Location Moves =====
  moveCharacterToLocation: { characterId: CardInstanceId; locationId: CardInstanceId };

  // ===== Ability Moves =====
  activateAbility: {
    cardId: CardInstanceId;
    abilityIndex?: number;
    abilityText?: string;
    targets?: CardInstanceId[];
    choiceIndex?: number;
    costs?: {
      banishCharacters?: CardInstanceId[];
      banishItems?: CardInstanceId[];
      exertCharacters?: CardInstanceId[];
      discardCards?: CardInstanceId[];
    };
  };

  // ===== Effect Resolution =====
  resolveBag: { bagId: string; params?: Partial<ActionResolutionInput> };
  resolveEffect: { effectId: string; params: unknown };

  // ===== Standard Moves =====
  passTurn: Record<string, never>;
  concede: { playerId: PlayerId };

  // ===== Debug/Manual Moves =====
  manualMoveCard: {
    cardId: CardInstanceId;
    targetZoneId: ZoneId;
    position?: "top" | "bottom" | number;
  };
  manualExertCard: { cardId: CardInstanceId };
  manualReadyCard: { cardId: CardInstanceId };
  manualDryCard: { cardId: CardInstanceId };
  manualSetDamage: { cardId: CardInstanceId; damage: number };
  manualSetLore: { playerId: PlayerId; amount: number };
  manualShuffleDeck: { playerId: PlayerId };
  manualPassTurn: Record<string, never>;
}

export type LorcanaMoveTargetDSL = LorcanaTargetDSL | PlayerTargetDSL;

export type LorcanaRuntimeMoveInputs = {
  [K in keyof LorcanaRuntimeMoveParams]: MoveInput<LorcanaRuntimeMoveParams[K]>;
};

export type LorcanaMoveDefinition<T extends keyof LorcanaRuntimeMoveInputs> = MoveDefinition<
  LorcanaG,
  LorcanaCard,
  LorcanaRuntimeMoveInputs[T],
  LorcanaMoveTargetDSL,
  LorcanaRuntimeCardDerivedMethods
>;
