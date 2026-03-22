import type { RuntimeCardDeriver } from "#core";
import type { LorcanaCardDefinition } from "@tcg/lorcana-types";
import type { CardInstanceId, LorcanaCardMeta, LorcanaG } from "../../types";
import type { LorcanaCardDerived } from "../../types/projected-board";
import { projectLorcanaCardDerived } from "../../projection/card-derived";
import type { PlayerId } from "#core";

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

export function createLorcanaRuntimeCardDeriver(): RuntimeCardDeriver {
  return ({ card, state, actorPlayerId, staticResources }) => {
    const projected = projectLorcanaCardDerived({
      definition: card.definition,
      meta: card.meta,
      state,
      cardInstanceId: card.instanceId as CardInstanceId,
      ownerID: card.ownerID as PlayerId,
      controllerID: card.controllerID as PlayerId,
      zoneID: card.zoneID,
      actorPlayerId: actorPlayerId as PlayerId | undefined,
      getDefinitionByInstanceId: (
        instanceId: CardInstanceId,
      ): LorcanaCardDefinition | undefined => {
        const definitionId = staticResources.instances.get(instanceId)?.definitionId;
        return definitionId ? staticResources.cards.get(definitionId) : undefined;
      },
    });

    // Apply defaults to produce required LorcanaCardDerived (all fields present)
    return {
      strength: projected.strength ?? 0,
      willpower: projected.willpower ?? 0,
      lore: projected.lore ?? 0,
      playCost: projected.playCost ?? 0,
      moveCost: projected.moveCost ?? 0,
      damage: projected.damage ?? 0,
      exerted: projected.exerted ?? false,
      drying: projected.drying ?? false,
      canBePutInInkwell: projected.canBePutInInkwell ?? false,
      hasSupport: projected.hasSupport ?? false,
      hasRush: projected.hasRush ?? false,
      hasReckless: projected.hasReckless ?? false,
      hasEvasive: projected.hasEvasive ?? false,
      hasQuestRestriction: projected.hasQuestRestriction ?? false,
      fullName: projected.fullName ?? "",
      keywords: projected.keywords ?? [],
      keywordValues: projected.keywordValues ?? {},
      classifications: projected.classifications ?? [],
      temporaryAbilities: projected.temporaryAbilities ?? {},
      temporaryAbilityStarts: projected.temporaryAbilityStarts ?? {},
      temporaryRestrictions: projected.temporaryRestrictions ?? {},
      temporaryRestrictionStarts: projected.temporaryRestrictionStarts ?? {},
    };
  };
}
