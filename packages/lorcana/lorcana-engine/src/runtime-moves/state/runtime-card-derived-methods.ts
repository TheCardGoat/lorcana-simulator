import type { CardInstanceId, MatchState, PlayerId, RuntimeCardWithDefinition } from "#core";
import { type LorcanaCard } from "@tcg/lorcana-types";
import type { LorcanaCardDefinition, LorcanaCardMeta, LorcanaG } from "../../types";
import { projectLorcanaCardDerived } from "../../projection/card-derived";
import type { TurnActionInkState } from "./turn-action-ink";

type RuntimeLorcanaCard = RuntimeCardWithDefinition<LorcanaCard, LorcanaCardMeta>;
export type TurnActionInkContext = TurnActionInkState;

export type LorcanaRuntimeCardDerivedMethods = {
  canBePutInInkwell(): boolean;
  getStrength(): number;
  getLore(): number;
  getWillpower(): number;
  hasSupport(): boolean;
  hasReckless(): boolean;
  hasRush(): boolean;
  hasQuestRestriction(): boolean;
  getFullName(): string;
  getKeywords(): string[];
};

export function createRuntimeCardDerivedMethods(args: {
  card: RuntimeLorcanaCard;
  state: MatchState<LorcanaG>;
  actorPlayerId?: string;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): LorcanaRuntimeCardDerivedMethods {
  const { card, state, actorPlayerId, getDefinitionByInstanceId } = args;

  const getProjectedDerived = () =>
    projectLorcanaCardDerived({
      definition: card.definition,
      meta: card.meta,
      state,
      cardInstanceId: card.instanceId as CardInstanceId,
      ownerID: card.ownerID as PlayerId,
      controllerID: card.controllerID as PlayerId,
      zoneID: card.zoneID,
      actorPlayerId: actorPlayerId as PlayerId | undefined,
      getDefinitionByInstanceId,
    });

  return {
    canBePutInInkwell: () => getProjectedDerived().canBePutInInkwell || false,
    getStrength: () => getProjectedDerived().strength ?? 0,
    getLore: () => getProjectedDerived().lore ?? 0,
    getWillpower: () => getProjectedDerived().willpower ?? 0,
    hasSupport: () => getProjectedDerived().hasSupport || false,
    hasReckless: () => getProjectedDerived().hasReckless || false,
    hasRush: () => getProjectedDerived().hasRush || false,
    hasQuestRestriction: () => getProjectedDerived().hasQuestRestriction || false,
    getFullName: () => getProjectedDerived().fullName || "",
    getKeywords: () => getProjectedDerived().keywords || [],
  };
}
