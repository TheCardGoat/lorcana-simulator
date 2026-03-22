import type { CardInstanceId, RuntimeCardWithDefinition } from "#core";
import type { LorcanaCard, LorcanaCardDefinition } from "@tcg/lorcana-types";
import type { LorcanaCardMeta } from "./runtime-state";
import type { LorcanaCardDerived } from "./projected-board";

export type LorcanaStaticCard = LorcanaCardDefinition;

export type LorcanaRuntimeCard = RuntimeCardWithDefinition;

export type LorcanaDynamicCard = LorcanaRuntimeCard;
export type CardInput = CardInstanceId | LorcanaRuntimeCard | LorcanaStaticCard;

export function cardRef(card: CardInput): CardInput {
  return card;
}
