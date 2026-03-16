import type { CardInstanceId, RuntimeCardWithDefinition } from "#core";
import type {
  LorcanaCard,
  LorcanaCardDefinition,
  LorcanaCardMeta,
  LorcanaMatchState,
} from "./types";
import { createRuntimeCardDerivedMethods } from "./runtime-moves/state/runtime-card-derived-methods";
import type { LorcanaRuntimeCardDerivedMethods } from "./runtime-moves/state/runtime-card-derived-methods";

/**
 * Build a runtime card view for a Lorcana card instance.
 *
 * **Note:** The `meta` property is captured at creation time and will not reflect
 * subsequent changes to card metadata. If you need live metadata updates,
 * call the getter functions directly (e.g., `hasSupport()`, `hasRush()`) or
 * create a new view object.
 */
export function buildLorcanaRuntimeCardView(args: {
  cardInstanceId: CardInstanceId;
  definition: LorcanaCardDefinition;
  definitionId: string;
  ownerID: string;
  controllerID: string;
  zoneID?: string;
  zoneIndex?: number;
  getState: () => LorcanaMatchState;
  actorPlayerId?: string;
  getDefinitionByInstanceId?: (cardId: CardInstanceId) => LorcanaCardDefinition | undefined;
}): RuntimeCardWithDefinition<LorcanaCard, LorcanaCardMeta, LorcanaRuntimeCardDerivedMethods> {
  const {
    cardInstanceId,
    definition,
    definitionId,
    ownerID,
    controllerID,
    zoneID,
    zoneIndex,
    getState,
    actorPlayerId,
    getDefinitionByInstanceId,
  } = args;

  const getCurrentMeta = (): LorcanaCardMeta =>
    (getState().ctx?.zones?.private?.cardMeta?.[cardInstanceId] as LorcanaCardMeta) ?? {};
  const getCurrentCard = (): RuntimeCardWithDefinition<LorcanaCard, LorcanaCardMeta> => ({
    instanceId: cardInstanceId,
    definitionId,
    definition: definition as LorcanaCard,
    ownerID,
    controllerID,
    zoneID,
    zoneIndex,
    meta: getCurrentMeta(),
  });
  const getDerived = () =>
    createRuntimeCardDerivedMethods({
      card: getCurrentCard(),
      state: getState(),
      actorPlayerId,
      getDefinitionByInstanceId,
    });

  return {
    instanceId: cardInstanceId,
    definitionId,
    definition: definition as LorcanaCard,
    ownerID,
    controllerID,
    zoneID,
    zoneIndex,
    meta: getCurrentMeta(),
    canBePutInInkwell: () => getDerived().canBePutInInkwell(),
    getStrength: () => getDerived().getStrength(),
    getLore: () => getDerived().getLore(),
    getWillpower: () => getDerived().getWillpower(),
    hasSupport: () => getDerived().hasSupport(),
    hasReckless: () => getDerived().hasReckless(),
    hasRush: () => getDerived().hasRush(),
    hasQuestRestriction: () => getDerived().hasQuestRestriction(),
    getFullName: () => getDerived().getFullName(),
    getKeywords: () => getDerived().getKeywords(),
  };
}
