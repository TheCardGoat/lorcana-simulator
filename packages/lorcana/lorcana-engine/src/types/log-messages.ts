/**
 * Lorcana Log Message Contracts
 *
 * Central registry of log keys, payload typing, and translation keys.
 * Add new log keys here first so type-checking enforces translation coverage.
 */

import type { CardInstanceId, LogMessage, LogValue, PlayerId } from "#core";

export interface FirstPlayerChosenLogValues {
  chooser: PlayerId;
  chosen: PlayerId;
}

export interface SetupMulliganCountLogValues {
  playerId: PlayerId;
  count: number;
}

export interface SetupMulliganDetailLogValues {
  playerId: PlayerId;
  count: number;
  mulliganed: CardInstanceId[];
  drawn: CardInstanceId[];
}

export interface SetupDoneLogValues {}

export interface AbilityActivatedLogValues {
  playerId: PlayerId;
  cardId: CardInstanceId;
}

export interface NamedAbilityActivatedLogValues extends AbilityActivatedLogValues {
  abilityName: string;
}

export interface CardInkedLogValues {
  playerId: PlayerId;
  cardId: CardInstanceId;
}

export interface ScryCountLogValues {
  playerId: PlayerId;
  count: number;
}

export interface ScryDetailLogValues {
  playerId: PlayerId;
  count: number;
  lookedAt: CardInstanceId[];
}

export interface PlayCardLogValues {
  playerId: PlayerId;
  cardId: CardInstanceId;
}

export interface QuestLogValues {
  playerId: PlayerId;
  cardId: CardInstanceId;
  loreGained: number;
}

export interface QuestWithAllLogValues {
  playerId: PlayerId;
  cardIds: CardInstanceId[];
  loreGained: number;
  count: number;
}

export interface ChallengeLogValues {
  playerId: PlayerId;
  attackerId: CardInstanceId;
  defenderId: CardInstanceId;
}

export interface MoveCharacterToLocationLogValues {
  playerId: PlayerId;
  characterId: CardInstanceId;
  locationId: CardInstanceId;
}

export interface PassTurnLogValues {
  playerId: PlayerId;
}

export interface ConcedeLogValues {
  playerId: PlayerId;
}

export type LogTargetId = CardInstanceId | PlayerId;

export interface ResolveBagCompletedLogValues {
  playerId: PlayerId;
  sourceId: CardInstanceId;
}

export interface ResolveBagCompletedNamedLogValues extends ResolveBagCompletedLogValues {
  abilityName: string;
}

export interface ResolveBagCompletedTargetsLogValues extends ResolveBagCompletedLogValues {
  targets: LogTargetId[];
}

export interface ResolveBagCompletedTargetsNamedLogValues extends ResolveBagCompletedTargetsLogValues {
  abilityName: string;
}

export interface ResolveBagSkippedLogValues extends ResolveBagCompletedLogValues {}

export interface ResolveBagSkippedNamedLogValues extends ResolveBagCompletedNamedLogValues {}

export interface ResolveBagPendingLogValues extends ResolveBagCompletedLogValues {}

export interface ResolveBagPendingNamedLogValues extends ResolveBagCompletedNamedLogValues {}

export interface ResolveDiscardChoiceLogValues {
  playerId: PlayerId;
  sourceCardId: CardInstanceId;
  targets: LogTargetId[];
}

export interface ResolveTargetSelectionLogValues extends ResolveDiscardChoiceLogValues {}

export interface ResolveChoiceSelectionLogValues {
  playerId: PlayerId;
  sourceCardId: CardInstanceId;
  choiceIndex: number;
}

export interface ResolveOptionalSelectionLogValues {
  playerId: PlayerId;
  sourceCardId: CardInstanceId;
}

export interface ResolveNameCardSelectionLogValues {
  playerId: PlayerId;
  sourceCardId: CardInstanceId;
  namedCard: string;
}

export interface ResolveScrySelectionLogValues {
  playerId: PlayerId;
  sourceCardId: CardInstanceId;
}

export interface LorcanaLogMessageMap {
  "lorcana.setup.firstPlayerChosen": FirstPlayerChosenLogValues;
  "lorcana.setup.mulligan.count": SetupMulliganCountLogValues;
  "lorcana.setup.mulligan.detail": SetupMulliganDetailLogValues;
  "lorcana.setup.done": SetupDoneLogValues;
  "lorcana.ability.activated": AbilityActivatedLogValues;
  "lorcana.ability.activated.named": NamedAbilityActivatedLogValues;
  "lorcana.card.inked": CardInkedLogValues;
  "lorcana.scry.count": ScryCountLogValues;
  "lorcana.scry.detail": ScryDetailLogValues;
  "lorcana.move.playCard": PlayCardLogValues;
  "lorcana.move.quest": QuestLogValues;
  "lorcana.move.questWithAll": QuestWithAllLogValues;
  "lorcana.move.challenge": ChallengeLogValues;
  "lorcana.move.moveCharacterToLocation": MoveCharacterToLocationLogValues;
  "lorcana.move.passTurn": PassTurnLogValues;
  "lorcana.move.concede": ConcedeLogValues;
  "lorcana.bag.resolve.completed": ResolveBagCompletedLogValues;
  "lorcana.bag.resolve.completed.named": ResolveBagCompletedNamedLogValues;
  "lorcana.bag.resolve.completed.targets": ResolveBagCompletedTargetsLogValues;
  "lorcana.bag.resolve.completed.targets.named": ResolveBagCompletedTargetsNamedLogValues;
  "lorcana.bag.resolve.skipped": ResolveBagSkippedLogValues;
  "lorcana.bag.resolve.skipped.named": ResolveBagSkippedNamedLogValues;
  "lorcana.bag.resolve.pending": ResolveBagPendingLogValues;
  "lorcana.bag.resolve.pending.named": ResolveBagPendingNamedLogValues;
  "lorcana.effect.resolve.discardChoice": ResolveDiscardChoiceLogValues;
  "lorcana.effect.resolve.targetSelection": ResolveTargetSelectionLogValues;
  "lorcana.effect.resolve.choiceSelection": ResolveChoiceSelectionLogValues;
  "lorcana.effect.resolve.optionalSelection.accepted": ResolveOptionalSelectionLogValues;
  "lorcana.effect.resolve.optionalSelection.rejected": ResolveOptionalSelectionLogValues;
  "lorcana.effect.resolve.nameCardSelection": ResolveNameCardSelectionLogValues;
  "lorcana.effect.resolve.scrySelection": ResolveScrySelectionLogValues;
}

export type LorcanaLogMessageKey = keyof LorcanaLogMessageMap & string;

export type LorcanaLogMessage<TKey extends LorcanaLogMessageKey = LorcanaLogMessageKey> =
  TKey extends LorcanaLogMessageKey
    ? {
        key: TKey;
        values: LorcanaLogMessageMap[TKey];
      }
    : never;

export type LorcanaParaglideMessageKey = `lorcana.${string}`;

export const LORCANA_LOG_TRANSLATION_KEYS = {
  "lorcana.setup.firstPlayerChosen": "lorcana.setup.firstPlayerChosen",
  "lorcana.setup.mulligan.count": "lorcana.setup.mulligan.count",
  "lorcana.setup.mulligan.detail": "lorcana.setup.mulligan.detail",
  "lorcana.setup.done": "lorcana.setup.done",
  "lorcana.ability.activated": "lorcana.ability.activated",
  "lorcana.ability.activated.named": "lorcana.ability.activated.named",
  "lorcana.card.inked": "lorcana.card.inked",
  "lorcana.scry.count": "lorcana.scry.count",
  "lorcana.scry.detail": "lorcana.scry.detail",
  "lorcana.move.playCard": "lorcana.move.playCard",
  "lorcana.move.quest": "lorcana.move.quest",
  "lorcana.move.questWithAll": "lorcana.move.questWithAll",
  "lorcana.move.challenge": "lorcana.move.challenge",
  "lorcana.move.moveCharacterToLocation": "lorcana.move.moveCharacterToLocation",
  "lorcana.move.passTurn": "lorcana.move.passTurn",
  "lorcana.move.concede": "lorcana.move.concede",
  "lorcana.bag.resolve.completed": "lorcana.bag.resolve.completed",
  "lorcana.bag.resolve.completed.named": "lorcana.bag.resolve.completed.named",
  "lorcana.bag.resolve.completed.targets": "lorcana.bag.resolve.completed.targets",
  "lorcana.bag.resolve.completed.targets.named": "lorcana.bag.resolve.completed.targets.named",
  "lorcana.bag.resolve.skipped": "lorcana.bag.resolve.skipped",
  "lorcana.bag.resolve.skipped.named": "lorcana.bag.resolve.skipped.named",
  "lorcana.bag.resolve.pending": "lorcana.bag.resolve.pending",
  "lorcana.bag.resolve.pending.named": "lorcana.bag.resolve.pending.named",
  "lorcana.effect.resolve.discardChoice": "lorcana.effect.resolve.discardChoice",
  "lorcana.effect.resolve.targetSelection": "lorcana.effect.resolve.targetSelection",
  "lorcana.effect.resolve.choiceSelection": "lorcana.effect.resolve.choiceSelection",
  "lorcana.effect.resolve.optionalSelection.accepted":
    "lorcana.effect.resolve.optionalSelection.accepted",
  "lorcana.effect.resolve.optionalSelection.rejected":
    "lorcana.effect.resolve.optionalSelection.rejected",
  "lorcana.effect.resolve.nameCardSelection": "lorcana.effect.resolve.nameCardSelection",
  "lorcana.effect.resolve.scrySelection": "lorcana.effect.resolve.scrySelection",
} as const satisfies Record<LorcanaLogMessageKey, LorcanaParaglideMessageKey>;

export const LORCANA_LOG_TRANSLATION_VALUE_KEYS = {
  "lorcana.setup.firstPlayerChosen": ["chosen"],
  "lorcana.setup.mulligan.count": ["count"],
  "lorcana.setup.mulligan.detail": ["count", "mulliganed", "drawn"],
  "lorcana.setup.done": [],
  "lorcana.ability.activated": ["cardId"],
  "lorcana.ability.activated.named": ["cardId", "abilityName"],
  "lorcana.card.inked": ["cardId"],
  "lorcana.scry.count": ["count"],
  "lorcana.scry.detail": ["count", "lookedAt"],
  "lorcana.move.playCard": ["cardId"],
  "lorcana.move.quest": ["cardId", "loreGained"],
  "lorcana.move.questWithAll": ["count", "cardIds", "loreGained"],
  "lorcana.move.challenge": ["attackerId", "defenderId"],
  "lorcana.move.moveCharacterToLocation": ["characterId", "locationId"],
  "lorcana.move.passTurn": [],
  "lorcana.move.concede": [],
  "lorcana.bag.resolve.completed": ["sourceId"],
  "lorcana.bag.resolve.completed.named": ["sourceId", "abilityName"],
  "lorcana.bag.resolve.completed.targets": ["sourceId", "targets"],
  "lorcana.bag.resolve.completed.targets.named": ["sourceId", "abilityName", "targets"],
  "lorcana.bag.resolve.skipped": ["sourceId"],
  "lorcana.bag.resolve.skipped.named": ["sourceId", "abilityName"],
  "lorcana.bag.resolve.pending": ["sourceId"],
  "lorcana.bag.resolve.pending.named": ["sourceId", "abilityName"],
  "lorcana.effect.resolve.discardChoice": ["sourceCardId", "targets"],
  "lorcana.effect.resolve.targetSelection": ["sourceCardId", "targets"],
  "lorcana.effect.resolve.choiceSelection": ["sourceCardId", "choiceIndex"],
  "lorcana.effect.resolve.optionalSelection.accepted": ["sourceCardId"],
  "lorcana.effect.resolve.optionalSelection.rejected": ["sourceCardId"],
  "lorcana.effect.resolve.nameCardSelection": ["sourceCardId", "namedCard"],
  "lorcana.effect.resolve.scrySelection": ["sourceCardId"],
} as const satisfies {
  [K in LorcanaLogMessageKey]: readonly (keyof LorcanaLogMessageMap[K] & string)[];
};

export function createLorcanaLogMessage(key: "lorcana.setup.done"): LogMessage;
export function createLorcanaLogMessage<
  TKey extends Exclude<LorcanaLogMessageKey, "lorcana.setup.done">,
>(key: TKey, values: LorcanaLogMessageMap[TKey]): LogMessage;
export function createLorcanaLogMessage(
  key: LorcanaLogMessageKey,
  values?: LorcanaLogMessageMap[LorcanaLogMessageKey],
): LogMessage {
  return { key, values: (values ?? {}) as Record<string, LogValue> };
}
