import type { CardTarget, CharacterTarget, TargetZone } from "../abilities/target-types";

export type ComparisonOperator =
  | "eq"
  | "ne"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "equal"
  | "not-equal"
  | "greater"
  | "greater-than"
  | "more-than"
  | "greater-or-equal"
  | "or-more"
  | "less"
  | "less-than"
  | "less-or-equal"
  | "or-less";

export type FilterSubject = "card" | "player";

export type CardStatus = "damaged" | "undamaged" | "exerted" | "ready" | "dry";

export interface StatusFilterExpr {
  type: "status";
  status: CardStatus;
}

export interface DamagedFilterExpr {
  type: "damaged";
}

export interface UndamagedFilterExpr {
  type: "undamaged";
}

export interface ExertedFilterExpr {
  type: "exerted";
}

export interface ReadyFilterExpr {
  type: "ready";
}

export interface DryFilterExpr {
  type: "dry";
}

export interface KeywordFilterExpr {
  type: "keyword";
  keyword: string;
}

export interface HasKeywordFilterExpr {
  type: "has-keyword";
  keyword: string;
}

export interface ClassificationFilterExpr {
  type: "classification";
  classification: string;
}

export interface HasClassificationFilterExpr {
  type: "has-classification";
  classification: string;
}

export interface InkableFilterExpr {
  type: "inkable";
  value: boolean;
}

export interface InkTypeFilterExpr {
  type: "ink-type";
  inkType: string;
}

export type NameFilterExpr = { type: "name"; equals: string } | { type: "name"; contains: string };

export interface HasNameFilterExpr {
  type: "has-name";
  name: string;
}

export interface CardTypeFilterExpr {
  type: "card-type";
  value?: "character" | "item" | "location" | "action" | "song";
  cardType?: "character" | "item" | "location" | "action" | "song";
}

export interface NotCardTypeFilterExpr {
  type: "not-card-type";
  cardType: "character" | "item" | "location" | "action";
}

export interface ChosenCardCostMaxCostConstraint {
  type: "chosen-card-cost";
  offset?: number;
}

export interface CardSelectionFilter {
  cardType?: "character" | "item" | "location" | "action" | "song" | "floodborn";
  notCardType?: "character" | "item" | "location" | "action" | "song" | "floodborn";
  maxCost?: number | "chosen-card-cost" | ChosenCardCostMaxCostConstraint;
  classification?: string;
  name?: string;
  sameNameAsSource?: boolean;
  sameNameAsChosenCard?: boolean;
  sameInstanceAsSource?: boolean;
  excludeChosenCard?: boolean;
}

export interface SongFilterExpr {
  type: "song";
}

export interface FloodbornFilterExpr {
  type: "floodborn";
}

export type RelativeComparisonValue = {
  compareWithParentsTarget: true;
  value: "target";
};

export type NumericComparisonValue =
  | {
      compareWithParentsTarget?: never;
      value: number;
    }
  | RelativeComparisonValue;

type NumericFilterExprBase = NumericComparisonValue & {
  comparison: ComparisonOperator;
};

export type StrengthFilterExpr = NumericFilterExprBase & {
  type: "strength";
  ignoreBonuses?: boolean;
};

export type StrengthComparisonFilterExpr = NumericFilterExprBase & {
  type: "strength-comparison";
  ignoreBonuses?: boolean;
};

export type WillpowerFilterExpr = NumericFilterExprBase & {
  type: "willpower";
};

export type WillpowerComparisonFilterExpr = NumericFilterExprBase & {
  type: "willpower-comparison";
};

export type CostFilterExpr = NumericFilterExprBase & {
  type: "cost";
};

export type CostComparisonFilterExpr = NumericFilterExprBase & {
  type: "cost-comparison";
};

export type LoreFilterExpr = NumericFilterExprBase & {
  type: "lore";
};

export type LoreComparisonFilterExpr = NumericFilterExprBase & {
  type: "lore-comparison";
};

export type LoreValueFilterExpr = NumericFilterExprBase & {
  type: "lore-value";
};

export type MoveCostFilterExpr = NumericFilterExprBase & {
  type: "move-cost";
};

export type CardsUnderFilterExpr = NumericFilterExprBase & {
  type: "cards-under";
};

export interface AtLocationFilterExpr {
  type: "at-location";
  location?: string;
  locationName?: string;
}

export interface SameLocationAsSourceFilterExpr {
  type: "same-location-as-source";
}

export interface SourceFilterExpr {
  type: "source";
  ref: "self" | "other" | "trigger-source";
}

export interface ChallengeRoleFilterExpr {
  type: "challenge-role";
  role: "attacker" | "defender";
}

export interface ZoneFilterExpr {
  type: "zone";
  zone: TargetZone | readonly TargetZone[];
}

export interface OwnerFilterExpr {
  type: "owner";
  owner: "you" | "opponent" | "any";
}

export interface ChallengedThisTurnFilterExpr {
  type: "challenged-this-turn";
}

export interface NamedCardFilterExpr {
  type: "named-card";
}

export interface UnderParentFilterExpr {
  type: "under-parent";
  owner?: "you" | "opponent" | "any";
  cardTypes?: readonly ("character" | "item" | "location" | "action")[];
}

export interface PlayerLoreFilterExpr {
  type: "lore";
  comparison: ComparisonOperator;
  value: number;
}

export interface CurrentTurnPlayerFilterExpr {
  type: "current-turn-player";
  value: boolean;
}

export interface ZoneCountRankPlayerFilterExpr {
  type: "zone-count-rank";
  zone: TargetZone;
  rank?: "highest";
  ties?: "all";
  minCount?: number;
}

type CardOnlyFilterExpr =
  | StatusFilterExpr
  | DamagedFilterExpr
  | UndamagedFilterExpr
  | ExertedFilterExpr
  | ReadyFilterExpr
  | DryFilterExpr
  | KeywordFilterExpr
  | HasKeywordFilterExpr
  | ClassificationFilterExpr
  | HasClassificationFilterExpr
  | InkableFilterExpr
  | InkTypeFilterExpr
  | NameFilterExpr
  | HasNameFilterExpr
  | CardTypeFilterExpr
  | NotCardTypeFilterExpr
  | SongFilterExpr
  | FloodbornFilterExpr
  | StrengthFilterExpr
  | StrengthComparisonFilterExpr
  | WillpowerFilterExpr
  | WillpowerComparisonFilterExpr
  | CostFilterExpr
  | CostComparisonFilterExpr
  | LoreFilterExpr
  | LoreComparisonFilterExpr
  | LoreValueFilterExpr
  | MoveCostFilterExpr
  | CardsUnderFilterExpr
  | AtLocationFilterExpr
  | SameLocationAsSourceFilterExpr
  | SourceFilterExpr
  | ChallengeRoleFilterExpr
  | ZoneFilterExpr
  | OwnerFilterExpr
  | ChallengedThisTurnFilterExpr
  | NamedCardFilterExpr
  | UnderParentFilterExpr;

type PlayerOnlyFilterExpr =
  | PlayerLoreFilterExpr
  | CurrentTurnPlayerFilterExpr
  | ZoneCountRankPlayerFilterExpr;

export interface AndFilterExpr<Subject extends FilterSubject> {
  type: "and";
  filters: readonly FilterExpr<Subject>[];
}

export interface OrFilterExpr<Subject extends FilterSubject> {
  type: "or";
  filters: readonly FilterExpr<Subject>[];
}

export interface NotFilterExpr<Subject extends FilterSubject> {
  type: "not";
  filter: FilterExpr<Subject>;
}

export type FilterExpr<Subject extends FilterSubject = FilterSubject> =
  | AndFilterExpr<Subject>
  | OrFilterExpr<Subject>
  | NotFilterExpr<Subject>
  | (Subject extends "card" ? CardOnlyFilterExpr : never)
  | (Subject extends "player" ? PlayerOnlyFilterExpr : never);

export type CardFilter = FilterExpr<"card">;
export type PlayerFilter = FilterExpr<"player">;

export type AmountRef =
  | "all"
  | "full"
  | "DISCARDED_COUNT"
  | "DISCARDED_CARD_LORE"
  | "RETURNED_CARD_COST"
  | "DAMAGE_DEALT"
  | "OPPONENTS_DAMAGED_CHARACTER_COUNT"
  | "X"
  | "DAMAGE_REMOVED"
  | "HAND"
  | "TARGET_COST"
  | "TARGET_STRENGTH"
  | "TARGET_WILLPOWER";

export type ForEachCounterType =
  | "characters"
  | "damaged-characters"
  | "items"
  | "locations"
  | "cards-in-hand"
  | "cards-in-discard"
  | "cards-in-inkwell-over-limit"
  | "damage-on-self"
  | "damage-on-target"
  | "last-effect-target-count"
  | "cards-under-self"
  | "exerted-characters"
  | "characters-that-sang";

export type TargetAttributeKey = "strength" | "lore" | "damage" | "cost";

export type SourceAttributeKey =
  | "strength"
  | "lore"
  | "damage"
  | "chars-at-location"
  | "cards-under-them"
  /** Lore value of the location this character is currently at */
  | "location-lore";

export type TriggerTargetAttributeKey =
  | "cards-under-count-before-banish"
  | "strength-before-banish";

export type TargetLocationAttributeKey = "lore";

export type CountController = "you" | "opponent" | "opponents";

export type VariableAmountOperand = number | VariableAmount;

export type VariableAmount =
  | { type: "target-attribute"; attribute: TargetAttributeKey }
  | { type: "source-attribute"; attribute: SourceAttributeKey }
  | { type: "trigger-target-attribute"; attribute: TriggerTargetAttributeKey }
  | { type: "target-location-attribute"; attribute: TargetLocationAttributeKey }
  | {
      type: "filtered-count";
      filters: readonly CardFilter[];
      excludeSelf?: boolean;
      multiplier?: number;
      owner?: "you" | "opponent" | "any";
      zones?: readonly TargetZone[];
      cardType?: "character" | "item" | "location" | "action";
      cardTypes?: readonly ("character" | "item" | "location" | "action")[];
    }
  | {
      type: "difference";
      left: VariableAmountOperand;
      right: VariableAmountOperand;
      invert?: boolean;
    }
  | {
      type: "reducer";
      reducer: "damage";
      filters: readonly CardFilter[];
      excludeSelf?: boolean;
      owner?: "you" | "opponent" | "any";
      zones?: readonly TargetZone[];
      cardType?: "character" | "item" | "location" | "action";
      cardTypes?: readonly ("character" | "item" | "location" | "action")[];
    }
  | {
      type: "clamp";
      value: VariableAmountOperand;
      max: VariableAmountOperand;
      min?: VariableAmountOperand;
    }
  | { type: "trigger-amount" }
  | { type: "damage-on-target" }
  | { type: "damage-on-self" }
  | { type: "last-effect-target-count" }
  | {
      type: "cards-in-hand";
      controller: CountController;
      modifier?: number;
    }
  | { type: "characters-in-play"; controller: CountController }
  | { type: "items-in-play"; controller: "you" | "opponent" | "opponents" }
  | { type: "cards-in-discard"; controller: "you" | "opponent" | "opponents" }
  | { type: "lore"; controller: "you" | "opponent" | "opponents" }
  | { type: "strength-of"; target: CharacterTarget }
  | { type: "willpower-of"; target: CharacterTarget }
  | { type: "lore-value-of"; target: CharacterTarget }
  | { type: "cost-of"; target: CardTarget }
  | { type: "cards-under-self" }
  | { type: "location-lore-from-character"; target: CharacterTarget }
  | {
      type: "classification-character-count";
      classification: string;
      controller: "you" | "opponent" | "opponents";
      excludeSelf?: boolean;
    }
  | {
      type: "name-character-count";
      name: string;
      controller: "you" | "opponent" | "opponents";
      excludeSelf?: boolean;
    }
  | { type: "locations-in-play"; controller: "you" | "opponent" | "opponents" }
  // Turn-metric based amounts (read from turn metadata counters)
  | {
      type: "turn-metric";
      metric: "banished-in-challenge-count";
      owner: "you" | "opponent";
      multiplier?: number;
    }
  | {
      type: "for-each";
      counter: ForEachCounterType | { type: string; controller?: string };
      count?: number | VariableAmount;
      modifier?: number;
    }
  | { type: "count"; what?: string; controller?: string; of?: string }
  | { type: "VARIABLE" }
  | { type: "lore-lost" }
  | { type: "stat"; stat?: string; target?: string };

export type AmountExpr = number | AmountRef | VariableAmount;
export type Amount = AmountExpr;
export type AmountString = AmountRef;

export function isVariableAmount(amount: AmountExpr): amount is VariableAmount {
  return typeof amount === "object";
}

export type EffectDuration =
  | "this-turn"
  | "until-start-of-next-turn"
  | "until-end-of-turn"
  | "permanent"
  | "while-condition"
  | "next-play-this-turn"
  | "next-turn"
  | "their-next-turn"
  | "while-in-play"
  | { type: string };
