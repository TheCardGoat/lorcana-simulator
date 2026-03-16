import type { MatchState, RuntimeCardDeriver } from "#core";
import type { LorcanaCard, LorcanaCardDefinition } from "@tcg/lorcana-types";
import type { CardInstanceId, LorcanaCardMeta, LorcanaG } from "../../types";
import { createRuntimeCardDerivedMethods } from "./runtime-card-derived-methods";
import type { LorcanaRuntimeCardDerivedMethods } from "./runtime-card-derived-methods";

export const INKWELL_CANDIDATE_QUERY_DSL = {
  selector: "chosen",
  count: 1,
  owner: "you",
  zones: ["hand"],
} as const;

export {
  canInkThisTurn,
  getAdditionalTurnActionInkAllowance,
  getTurnActionInkLimit,
} from "./turn-action-ink";
export type { TurnActionInkState as TurnActionInkContext } from "./turn-action-ink";

export function createLorcanaRuntimeCardDeriver(): RuntimeCardDeriver<
  LorcanaG,
  LorcanaCard,
  LorcanaCardMeta,
  LorcanaRuntimeCardDerivedMethods
> {
  return ({ card, state, actorPlayerId, staticResources }) =>
    createRuntimeCardDerivedMethods({
      card,
      state: state,
      actorPlayerId,
      getDefinitionByInstanceId: (
        instanceId: CardInstanceId,
      ): LorcanaCardDefinition | undefined => {
        const definitionId = staticResources.instances.get(instanceId)?.definitionId;
        return definitionId ? staticResources.cards.get(definitionId) : undefined;
      },
    });
}
export type { LorcanaRuntimeCardDerivedMethods } from "./runtime-card-derived-methods";
