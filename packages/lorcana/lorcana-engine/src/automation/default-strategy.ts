import type { LorcanaProjectedCard } from "../types";

import type {
  AutomatedActionCandidate,
  AutomatedActionCandidateHeuristic,
  AutomatedActionCandidateSummary,
  AutomatedActionPlanningContext,
  AutomatedActionStrategy,
} from "./types";

const FAMILY_ORDER: Record<AutomatedActionCandidate["family"], number> = {
  chooseWhoGoesFirst: 0,
  alterHand: 1,
  resolveEffect: 2,
  resolveBag: 3,
  quest: 4,
  playCard: 5,
  activateAbility: 6,
  putCardIntoInkwell: 7,
  moveCharacterToLocation: 8,
  challenge: 9,
};

type DetailedCandidateSummary = AutomatedActionCandidateSummary & {
  ranking: {
    abilityComplexity?: number;
    challengeAttackerSurvives?: boolean;
    challengeAttackerLore?: number;
    challengeDefenderLore?: number;
    challengeDefenderWouldBeBanished?: boolean;
    challengeLoreSwing?: number;
    challengePriorityBoost?: boolean;
    familyOrder: number;
    inkDuplicateCount?: number;
    inkLore?: number;
    inkPrintedCost?: number;
    keepAllPreferred?: boolean;
    planOrder?: number;
    playCardComplexity?: number;
    playCardNetCost?: number;
    printedLore?: number;
    selfFirst?: boolean;
  };
};

type LoreRaceHeuristicPreferences = {
  challengePriorityMode: "default" | "board-control";
  inkPrintedCostDirection: "asc" | "desc";
  preferSimplePermanentDevelopment: boolean;
  playCardNetCostDirection: "asc" | "desc";
};

const LEGACY_LORE_RACE_HEURISTIC_PREFERENCES: LoreRaceHeuristicPreferences = {
  challengePriorityMode: "default",
  inkPrintedCostDirection: "desc",
  preferSimplePermanentDevelopment: false,
  playCardNetCostDirection: "asc",
};

const DEFAULT_LORE_RACE_HEURISTIC_PREFERENCES: LoreRaceHeuristicPreferences = {
  challengePriorityMode: "default",
  inkPrintedCostDirection: "asc",
  preferSimplePermanentDevelopment: false,
  playCardNetCostDirection: "desc",
};

const BOARD_CONTROL_LORE_RACE_HEURISTIC_PREFERENCES: LoreRaceHeuristicPreferences = {
  challengePriorityMode: "board-control",
  inkPrintedCostDirection: "asc",
  preferSimplePermanentDevelopment: true,
  playCardNetCostDirection: "desc",
};

function compareNumbersAscending(left: number, right: number): number {
  return left - right;
}

function compareNumbersDescending(left: number, right: number): number {
  return right - left;
}

function compareBooleansDescending(left: boolean, right: boolean): number {
  if (left === right) {
    return 0;
  }

  return left ? -1 : 1;
}

function createHeuristic(
  direction: AutomatedActionCandidateHeuristic["direction"],
  key: string,
  value: boolean | number | string,
): AutomatedActionCandidateHeuristic {
  return {
    direction,
    key,
    value,
  };
}

function getProjectedCard(
  context: AutomatedActionPlanningContext,
  cardId: string,
): LorcanaProjectedCard | undefined {
  return context.board.cards[cardId];
}

function getCardName(context: AutomatedActionPlanningContext, cardId: string): string {
  return getProjectedCard(context, cardId)?.fullName ?? cardId;
}

function getPrintedLore(context: AutomatedActionPlanningContext, cardId: string): number {
  return getProjectedCard(context, cardId)?.lore ?? 0;
}

function getPrintedCost(context: AutomatedActionPlanningContext, cardId: string): number {
  return getProjectedCard(context, cardId)?.playCost ?? 0;
}

function resolveOpponentId(context: AutomatedActionPlanningContext): string | undefined {
  return context.board.playerOrder.find((playerId) => playerId !== context.actorId);
}

function getPlayerLore(
  context: AutomatedActionPlanningContext,
  playerId: string | undefined,
): number {
  if (!playerId) {
    return 0;
  }

  return context.board.players[playerId]?.lore ?? 0;
}

function getQuestPotentialForPlayer(
  context: AutomatedActionPlanningContext,
  playerId: string,
): number {
  const inPlay = context.board.players[playerId]?.play ?? [];

  return inPlay.reduce((total, cardId) => {
    const card = getProjectedCard(context, String(cardId));
    if (!card) {
      return total;
    }

    const lore = card.lore ?? 0;
    const canQuest =
      lore > 0 &&
      card.exerted !== true &&
      card.drying !== true &&
      card.hasQuestRestriction !== true;

    return canQuest ? total + lore : total;
  }, 0);
}

function canActorReachLoreGoalByQuesting(context: AutomatedActionPlanningContext): boolean {
  const actorLore = getPlayerLore(context, context.actorId);
  const questPotential = getQuestPotentialForPlayer(context, context.actorId);

  return actorLore + questPotential >= 20;
}

function countCopiesInHand(
  context: AutomatedActionPlanningContext,
  actorId: string,
  cardId: string,
): number {
  const hand = context.board.players[actorId]?.hand ?? [];
  const targetCard = getProjectedCard(context, cardId);
  const targetKey = targetCard?.definitionId ?? targetCard?.fullName ?? cardId;

  return hand.reduce((count, currentCardId) => {
    const currentCard = getProjectedCard(context, String(currentCardId));
    const currentKey = currentCard?.definitionId ?? currentCard?.fullName ?? String(currentCardId);
    return currentKey === targetKey ? count + 1 : count;
  }, 0);
}

function getAvailableInkForPlayer(
  context: AutomatedActionPlanningContext,
  playerId: string,
): number {
  const inkwell = context.board.players[playerId]?.inkwell ?? [];

  return inkwell.reduce((total, cardId) => {
    const card = getProjectedCard(context, String(cardId));
    return card?.exerted === true ? total : total + 1;
  }, 0);
}

function isPermanentCardType(cardType: string | undefined): boolean {
  return cardType === "character" || cardType === "item" || cardType === "location";
}

function getProjectedCardType(card: LorcanaProjectedCard | undefined): string | undefined {
  return (card as (LorcanaProjectedCard & { cardType?: string }) | undefined)?.cardType;
}

function shouldPrioritizeChallenge(
  context: AutomatedActionPlanningContext,
  candidate: Extract<AutomatedActionCandidate, { family: "challenge" }>,
  preferences: LoreRaceHeuristicPreferences,
): boolean {
  const opponentId = resolveOpponentId(context);
  const defenderWouldBeBanished = candidate.preview?.defenderWouldBeBanished === true;

  if (!opponentId || !defenderWouldBeBanished || canActorReachLoreGoalByQuesting(context)) {
    return false;
  }

  const actorLore = getPlayerLore(context, context.actorId);
  const opponentLore = getPlayerLore(context, opponentId);
  const attackerLore = getPrintedLore(context, candidate.attackerId);
  const defenderLore = getPrintedLore(context, candidate.defenderId);
  const attackerSurvives = candidate.preview?.attackerWouldBeBanished !== true;
  const loreSwing = defenderLore - attackerLore + (attackerSurvives ? 1 : 0);

  if (defenderLore <= 0) {
    return false;
  }

  if (preferences.challengePriorityMode === "board-control") {
    const actorQuestPotential = getQuestPotentialForPlayer(context, context.actorId);
    const opponentQuestPotential = getQuestPotentialForPlayer(context, opponentId);

    return (
      opponentLore >= actorLore &&
      (defenderLore >= 1 || opponentQuestPotential - actorQuestPotential >= 2)
    );
  }

  return (
    opponentLore >= 15 ||
    (opponentLore > actorLore && defenderLore >= 2) ||
    (opponentLore - actorLore >= 4 && loreSwing >= 1) ||
    (attackerSurvives && opponentLore >= 10 && defenderLore >= 2)
  );
}

function getFamilyOrder(
  context: AutomatedActionPlanningContext,
  candidate: AutomatedActionCandidate,
  preferences: LoreRaceHeuristicPreferences,
): number {
  if (
    candidate.family === "challenge" &&
    shouldPrioritizeChallenge(context, candidate, preferences)
  ) {
    return FAMILY_ORDER.quest - 0.5;
  }

  return FAMILY_ORDER[candidate.family];
}

function getPlayCardComplexity(
  candidate: Extract<AutomatedActionCandidate, { family: "playCard" }>,
): number {
  let complexity = 0;

  if (typeof candidate.choiceIndex === "number") {
    complexity += 1;
  }
  if (typeof candidate.resolveOptional === "boolean") {
    complexity += 1;
  }
  complexity += candidate.targets?.length ?? 0;

  if (typeof candidate.cost === "object") {
    if (candidate.cost.cost === "shift" || candidate.cost.cost === "sing") {
      complexity += 1;
    }
    if (candidate.cost.cost === "singTogether") {
      complexity += candidate.cost.singers.length;
    }
  }

  return complexity;
}

function getPlayCardNetCost(
  context: AutomatedActionPlanningContext,
  candidate: Extract<AutomatedActionCandidate, { family: "playCard" }>,
): number {
  if (candidate.cost === "free") {
    return 0;
  }

  if (candidate.cost === "standard") {
    return getPrintedCost(context, candidate.cardId);
  }

  if (typeof candidate.cost === "object") {
    switch (candidate.cost.cost) {
      case "free":
      case "sing":
      case "singTogether":
        return 0;
      case "standard":
      case "shift":
        return getPrintedCost(context, candidate.cardId);
    }
  }

  return getPrintedCost(context, candidate.cardId);
}

function isSimpleDevelopmentPlay(
  context: AutomatedActionPlanningContext,
  candidate: Extract<AutomatedActionCandidate, { family: "playCard" }>,
): boolean {
  const card = getProjectedCard(context, candidate.cardId);
  if (!isPermanentCardType(getProjectedCardType(card))) {
    return false;
  }

  const netCost = getPlayCardNetCost(context, candidate);
  if (netCost <= 0 || netCost > getAvailableInkForPlayer(context, context.actorId)) {
    return false;
  }

  return getPlayCardComplexity(candidate) === 0;
}

function getAbilityComplexity(
  candidate: Extract<AutomatedActionCandidate, { family: "activateAbility" }>,
): number {
  return (
    (candidate.targets?.length ?? 0) +
    (candidate.costs?.banishCharacters?.length ?? 0) +
    (candidate.costs?.banishItems?.length ?? 0) +
    (candidate.costs?.discardCards?.length ?? 0) +
    (candidate.costs?.exertCharacters?.length ?? 0) +
    (typeof candidate.choiceIndex === "number" ? 1 : 0)
  );
}

function getStableKey(
  context: AutomatedActionPlanningContext,
  candidate: AutomatedActionCandidate,
): string {
  switch (candidate.family) {
    case "chooseWhoGoesFirst":
      return `chooseWhoGoesFirst:${candidate.firstPlayerId}`;
    case "alterHand":
      return `alterHand:${candidate.plan}:${candidate.cardsToMulligan.join(",")}`;
    case "resolveBag":
      return `resolveBag:${candidate.bagId}:${candidate.choiceIndex ?? ""}:${candidate.resolveOptional ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "resolveEffect":
      return `resolveEffect:${candidate.effectId}:${candidate.choiceIndex ?? ""}:${candidate.resolveOptional ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "putCardIntoInkwell":
      return `putCardIntoInkwell:${getCardName(context, candidate.cardId)}:${candidate.cardId}`;
    case "playCard":
      return `playCard:${getCardName(context, candidate.cardId)}:${candidate.cardId}:${typeof candidate.cost === "object" ? JSON.stringify(candidate.cost) : candidate.cost}:${candidate.choiceIndex ?? ""}:${candidate.resolveOptional ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "activateAbility":
      return `activateAbility:${getCardName(context, candidate.cardId)}:${candidate.cardId}:${candidate.abilityIndex}:${candidate.choiceIndex ?? ""}:${candidate.targets?.join(",") ?? ""}`;
    case "quest":
      return `quest:${getCardName(context, candidate.cardId)}:${candidate.cardId}`;
    case "challenge":
      return `challenge:${getCardName(context, candidate.attackerId)}:${candidate.attackerId}:${getCardName(context, candidate.defenderId)}:${candidate.defenderId}`;
    case "moveCharacterToLocation":
      return `moveCharacterToLocation:${getCardName(context, candidate.characterId)}:${candidate.characterId}:${getCardName(context, candidate.locationId)}:${candidate.locationId}`;
  }
}

function buildDetailedCandidateSummary(
  context: AutomatedActionPlanningContext,
  candidate: AutomatedActionCandidate,
  preferences: LoreRaceHeuristicPreferences,
): DetailedCandidateSummary {
  const stableKey = getStableKey(context, candidate);
  const familyOrder = getFamilyOrder(context, candidate, preferences);
  const heuristics: AutomatedActionCandidateHeuristic[] = [
    createHeuristic("asc", "familyOrder", familyOrder),
  ];
  const ranking: DetailedCandidateSummary["ranking"] = {
    familyOrder,
  };

  if (candidate.family === "chooseWhoGoesFirst") {
    const selfFirst = candidate.firstPlayerId === context.actorId;
    ranking.selfFirst = selfFirst;
    ranking.keepAllPreferred = undefined;
    heuristics.push(createHeuristic("preferTrue", "selfFirst", selfFirst));
  }

  if (candidate.family === "alterHand") {
    const hand = context.board.players[context.actorId]?.hand ?? [];
    const hasTwoInkable =
      hand.filter((cardId) => context.board.cards[String(cardId)]?.canBePutInInkwell === true)
        .length >= 2;
    const hasLowCostPlayable = hand.some(
      (cardId) => (context.board.cards[String(cardId)]?.playCost ?? Number.MAX_SAFE_INTEGER) <= 2,
    );
    const keepAllPreferred = hasTwoInkable && hasLowCostPlayable;
    const planOrder = keepAllPreferred
      ? { "keep-all": 0, "structural-mulligan": 1, "full-mulligan": 2 }
      : { "structural-mulligan": 0, "full-mulligan": 1, "keep-all": 2 };

    ranking.keepAllPreferred = keepAllPreferred;
    ranking.planOrder = planOrder[candidate.plan];
    heuristics.push(createHeuristic("preferTrue", "keepAllPreferred", keepAllPreferred));
    heuristics.push(createHeuristic("asc", "planOrder", ranking.planOrder));
  }

  if (candidate.family === "quest") {
    ranking.printedLore = getPrintedLore(context, candidate.cardId);
    heuristics.push(createHeuristic("desc", "printedLore", ranking.printedLore));
  }

  if (candidate.family === "playCard") {
    const simpleDevelopmentPlay =
      preferences.preferSimplePermanentDevelopment && isSimpleDevelopmentPlay(context, candidate);
    ranking.playCardComplexity = getPlayCardComplexity(candidate);
    ranking.playCardNetCost = getPlayCardNetCost(context, candidate);
    ranking.printedLore = getPrintedLore(context, candidate.cardId);
    heuristics.push(createHeuristic("preferTrue", "simpleDevelopmentPlay", simpleDevelopmentPlay));
    heuristics.push(createHeuristic("asc", "playCardComplexity", ranking.playCardComplexity));
    heuristics.push(
      createHeuristic(
        preferences.playCardNetCostDirection,
        "playCardNetCost",
        ranking.playCardNetCost,
      ),
    );
    heuristics.push(createHeuristic("desc", "printedLore", ranking.printedLore));
  }

  if (candidate.family === "activateAbility") {
    ranking.abilityComplexity = getAbilityComplexity(candidate);
    heuristics.push(createHeuristic("asc", "abilityComplexity", ranking.abilityComplexity));
  }

  if (candidate.family === "putCardIntoInkwell") {
    ranking.inkDuplicateCount = countCopiesInHand(context, context.actorId, candidate.cardId);
    ranking.inkPrintedCost = getPrintedCost(context, candidate.cardId);
    ranking.inkLore = getPrintedLore(context, candidate.cardId);
    heuristics.push(createHeuristic("desc", "inkDuplicateCount", ranking.inkDuplicateCount));
    heuristics.push(
      createHeuristic(
        preferences.inkPrintedCostDirection,
        "inkPrintedCost",
        ranking.inkPrintedCost,
      ),
    );
    heuristics.push(createHeuristic("asc", "inkLore", ranking.inkLore));
  }

  if (candidate.family === "challenge") {
    ranking.challengePriorityBoost = shouldPrioritizeChallenge(context, candidate, preferences);
    ranking.challengeDefenderWouldBeBanished = candidate.preview?.defenderWouldBeBanished === true;
    ranking.challengeAttackerSurvives = candidate.preview?.attackerWouldBeBanished !== true;
    ranking.challengeAttackerLore = getPrintedLore(context, candidate.attackerId);
    ranking.challengeDefenderLore = getPrintedLore(context, candidate.defenderId);
    ranking.challengeLoreSwing =
      (ranking.challengeDefenderLore ?? 0) -
      (ranking.challengeAttackerLore ?? 0) +
      (ranking.challengeAttackerSurvives ? 1 : 0);
    heuristics.push(
      createHeuristic("preferTrue", "challengePriorityBoost", ranking.challengePriorityBoost),
    );
    heuristics.push(
      createHeuristic(
        "preferTrue",
        "challengeDefenderWouldBeBanished",
        ranking.challengeDefenderWouldBeBanished,
      ),
    );
    heuristics.push(
      createHeuristic("preferTrue", "challengeAttackerSurvives", ranking.challengeAttackerSurvives),
    );
    heuristics.push(createHeuristic("desc", "challengeLoreSwing", ranking.challengeLoreSwing));
    heuristics.push(
      createHeuristic("desc", "challengeDefenderLore", ranking.challengeDefenderLore),
    );
    heuristics.push(createHeuristic("asc", "challengeAttackerLore", ranking.challengeAttackerLore));
  }

  heuristics.push(createHeuristic("asc", "stableKey", stableKey));

  return {
    candidate,
    family: candidate.family,
    heuristics,
    ranking,
    stableKey,
  };
}

function compareDetailedCandidateSummaries(
  left: DetailedCandidateSummary,
  right: DetailedCandidateSummary,
  preferences: LoreRaceHeuristicPreferences,
): number {
  const familyOrder = compareNumbersAscending(left.ranking.familyOrder, right.ranking.familyOrder);
  if (familyOrder !== 0) {
    return familyOrder;
  }

  if (left.family === "chooseWhoGoesFirst" && right.family === "chooseWhoGoesFirst") {
    const selfFirst = compareBooleansDescending(
      left.ranking.selfFirst ?? false,
      right.ranking.selfFirst ?? false,
    );
    if (selfFirst !== 0) {
      return selfFirst;
    }
  }

  if (left.family === "alterHand" && right.family === "alterHand") {
    const planOrder = compareNumbersAscending(
      left.ranking.planOrder ?? 0,
      right.ranking.planOrder ?? 0,
    );
    if (planOrder !== 0) {
      return planOrder;
    }
  }

  if (left.family === "quest" && right.family === "quest") {
    const loreOrder = compareNumbersDescending(
      left.ranking.printedLore ?? 0,
      right.ranking.printedLore ?? 0,
    );
    if (loreOrder !== 0) {
      return loreOrder;
    }
  }

  if (left.family === "playCard" && right.family === "playCard") {
    if (preferences.preferSimplePermanentDevelopment) {
      const simpleDevelopmentOrder = compareBooleansDescending(
        left.heuristics.some(
          (heuristic) => heuristic.key === "simpleDevelopmentPlay" && heuristic.value === true,
        ),
        right.heuristics.some(
          (heuristic) => heuristic.key === "simpleDevelopmentPlay" && heuristic.value === true,
        ),
      );
      if (simpleDevelopmentOrder !== 0) {
        return simpleDevelopmentOrder;
      }
    }

    const complexityOrder = compareNumbersAscending(
      left.ranking.playCardComplexity ?? 0,
      right.ranking.playCardComplexity ?? 0,
    );
    if (complexityOrder !== 0) {
      return complexityOrder;
    }

    const netCostOrder =
      preferences.playCardNetCostDirection === "asc"
        ? compareNumbersAscending(
            left.ranking.playCardNetCost ?? 0,
            right.ranking.playCardNetCost ?? 0,
          )
        : compareNumbersDescending(
            left.ranking.playCardNetCost ?? 0,
            right.ranking.playCardNetCost ?? 0,
          );
    if (netCostOrder !== 0) {
      return netCostOrder;
    }

    const loreOrder = compareNumbersDescending(
      left.ranking.printedLore ?? 0,
      right.ranking.printedLore ?? 0,
    );
    if (loreOrder !== 0) {
      return loreOrder;
    }
  }

  if (left.family === "activateAbility" && right.family === "activateAbility") {
    const complexityOrder = compareNumbersAscending(
      left.ranking.abilityComplexity ?? 0,
      right.ranking.abilityComplexity ?? 0,
    );
    if (complexityOrder !== 0) {
      return complexityOrder;
    }
  }

  if (left.family === "putCardIntoInkwell" && right.family === "putCardIntoInkwell") {
    const duplicateOrder = compareNumbersDescending(
      left.ranking.inkDuplicateCount ?? 0,
      right.ranking.inkDuplicateCount ?? 0,
    );
    if (duplicateOrder !== 0) {
      return duplicateOrder;
    }

    const costOrder =
      preferences.inkPrintedCostDirection === "desc"
        ? compareNumbersDescending(
            left.ranking.inkPrintedCost ?? 0,
            right.ranking.inkPrintedCost ?? 0,
          )
        : compareNumbersAscending(
            left.ranking.inkPrintedCost ?? 0,
            right.ranking.inkPrintedCost ?? 0,
          );
    if (costOrder !== 0) {
      return costOrder;
    }

    const loreOrder = compareNumbersAscending(
      left.ranking.inkLore ?? 0,
      right.ranking.inkLore ?? 0,
    );
    if (loreOrder !== 0) {
      return loreOrder;
    }
  }

  if (left.family === "challenge" && right.family === "challenge") {
    const priorityBoostOrder = compareBooleansDescending(
      left.ranking.challengePriorityBoost ?? false,
      right.ranking.challengePriorityBoost ?? false,
    );
    if (priorityBoostOrder !== 0) {
      return priorityBoostOrder;
    }

    const banishOrder = compareBooleansDescending(
      left.ranking.challengeDefenderWouldBeBanished ?? false,
      right.ranking.challengeDefenderWouldBeBanished ?? false,
    );
    if (banishOrder !== 0) {
      return banishOrder;
    }

    const surviveOrder = compareBooleansDescending(
      left.ranking.challengeAttackerSurvives ?? false,
      right.ranking.challengeAttackerSurvives ?? false,
    );
    if (surviveOrder !== 0) {
      return surviveOrder;
    }

    const loreSwingOrder = compareNumbersDescending(
      left.ranking.challengeLoreSwing ?? 0,
      right.ranking.challengeLoreSwing ?? 0,
    );
    if (loreSwingOrder !== 0) {
      return loreSwingOrder;
    }

    const defenderLoreOrder = compareNumbersDescending(
      left.ranking.challengeDefenderLore ?? 0,
      right.ranking.challengeDefenderLore ?? 0,
    );
    if (defenderLoreOrder !== 0) {
      return defenderLoreOrder;
    }

    const attackerLoreOrder = compareNumbersAscending(
      left.ranking.challengeAttackerLore ?? 0,
      right.ranking.challengeAttackerLore ?? 0,
    );
    if (attackerLoreOrder !== 0) {
      return attackerLoreOrder;
    }
  }

  return left.stableKey.localeCompare(right.stableKey);
}

function summarizeLoreRaceCandidates(
  context: AutomatedActionPlanningContext,
  candidates: readonly AutomatedActionCandidate[],
  preferences: LoreRaceHeuristicPreferences,
): AutomatedActionCandidateSummary[] {
  return candidates
    .map((candidate) => buildDetailedCandidateSummary(context, candidate, preferences))
    .sort((left, right) => compareDetailedCandidateSummaries(left, right, preferences));
}

export function summarizeLegacyLoreRaceCandidates(
  context: AutomatedActionPlanningContext,
  candidates: readonly AutomatedActionCandidate[],
): AutomatedActionCandidateSummary[] {
  return summarizeLoreRaceCandidates(context, candidates, LEGACY_LORE_RACE_HEURISTIC_PREFERENCES);
}

export function summarizeDefaultLoreRaceCandidates(
  context: AutomatedActionPlanningContext,
  candidates: readonly AutomatedActionCandidate[],
): AutomatedActionCandidateSummary[] {
  return summarizeLoreRaceCandidates(context, candidates, DEFAULT_LORE_RACE_HEURISTIC_PREFERENCES);
}

export function summarizeBoardControlLoreRaceCandidates(
  context: AutomatedActionPlanningContext,
  candidates: readonly AutomatedActionCandidate[],
): AutomatedActionCandidateSummary[] {
  return summarizeLoreRaceCandidates(
    context,
    candidates,
    BOARD_CONTROL_LORE_RACE_HEURISTIC_PREFERENCES,
  );
}

function createLoreRaceAutomatedActionStrategy(
  name: string,
  summarize: (
    context: AutomatedActionPlanningContext,
    candidates: readonly AutomatedActionCandidate[],
  ) => AutomatedActionCandidateSummary[],
): AutomatedActionStrategy {
  return {
    name,
    rankCandidates(context, candidates) {
      return summarize(context, candidates).map(({ candidate }) => candidate);
    },
  };
}

export const legacyLoreRaceAutomatedActionStrategy = createLoreRaceAutomatedActionStrategy(
  "legacy-lore-race",
  summarizeLegacyLoreRaceCandidates,
);

export const defaultLoreRaceAutomatedActionStrategy = createLoreRaceAutomatedActionStrategy(
  "default-lore-race",
  summarizeDefaultLoreRaceCandidates,
);

export const boardControlLoreRaceAutomatedActionStrategy = createLoreRaceAutomatedActionStrategy(
  "board-control-lore-race",
  summarizeBoardControlLoreRaceCandidates,
);
