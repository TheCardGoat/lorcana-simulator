import { m } from "$lib/paraglide/messages.js";
import type {
  CardActionCategoryId,
  CardActionView,
  ExecutableMoveEntry,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
} from "@/features/simulator/model/contracts.js";

const CARD_ACTION_ORDER: readonly CardActionCategoryId[] = [
  "play-card",
  "ink-card",
  "quest",
  "challenge",
  "move-to-location",
  "activate-ability",
] as const;

function getSourceCardId(move: ExecutableMoveEntry): string | null {
  switch (move.presentation.categoryId) {
    case "ink-card":
    case "play-card":
    case "quest":
    case "activate-ability": {
      const cardId = (move.params as { cardId?: unknown }).cardId;
      return typeof cardId === "string" ? cardId : null;
    }
    case "challenge": {
      const attackerId = (move.params as { attackerId?: unknown }).attackerId;
      return typeof attackerId === "string" ? attackerId : null;
    }
    case "move-to-location": {
      const characterId = (move.params as { characterId?: unknown }).characterId;
      return typeof characterId === "string" ? characterId : null;
    }
    default:
      return null;
  }
}

function getTargetCardId(move: ExecutableMoveEntry): string | null {
  switch (move.presentation.categoryId) {
    case "challenge": {
      const defenderId = (move.params as { defenderId?: unknown }).defenderId;
      return typeof defenderId === "string" ? defenderId : null;
    }
    case "move-to-location": {
      const locationId = (move.params as { locationId?: unknown }).locationId;
      return typeof locationId === "string" ? locationId : null;
    }
    default:
      return null;
  }
}

function getPlayActionDetail(
  card: LorcanaCardSnapshot,
  move: ExecutableMoveEntry,
): string | undefined {
  const params = move.params as {
    amount?: unknown;
    cost?: unknown;
  };

  if (typeof params.amount === "number" && Number.isFinite(params.amount)) {
    return `${params.amount} ink`;
  }

  if (params.cost === "free") {
    return "Free";
  }

  if (params.cost === "shift") {
    return "Shift";
  }

  if (params.cost === "sing") {
    return "Sing";
  }

  if (params.cost === "singTogether") {
    return "Sing Together";
  }

  if (typeof card.cost === "number") {
    return `${card.cost} ink`;
  }

  return undefined;
}

function buildEnabledCategoryAction(
  card: LorcanaCardSnapshot,
  categoryId: CardActionCategoryId,
  moves: ExecutableMoveEntry[],
): CardActionView {
  const label =
    categoryId === "quest" && typeof card.loreValue === "number"
      ? `${m["sim.actions.label.quest"]({})} for ${card.loreValue} lore`
      : (moves[0]?.presentation.categoryLabel ?? categoryId);
  const detail =
    categoryId === "play-card"
      ? getPlayActionDetail(card, moves[0]!)
      : categoryId === "challenge"
        ? `${moves.length} target${moves.length === 1 ? "" : "s"}`
        : categoryId === "move-to-location"
          ? `${moves.length} location${moves.length === 1 ? "" : "s"}`
          : categoryId === "activate-ability"
            ? `${moves.length} abilit${moves.length === 1 ? "y" : "ies"}`
            : undefined;

  return {
    id: `${categoryId}:${card.cardId}`,
    cardId: card.cardId,
    categoryId,
    label,
    ...(detail ? { detail } : {}),
    enabled: true,
    moves,
  };
}

function buildBlockedAction(
  card: LorcanaCardSnapshot,
  categoryId: CardActionCategoryId,
  reason: string,
): CardActionView {
  const label =
    categoryId === "quest" && typeof card.loreValue === "number"
      ? `${m["sim.actions.label.quest"]({})} for ${card.loreValue} lore`
      : categoryId === "challenge"
        ? m["sim.actions.label.challenge"]({})
        : categoryId === "move-to-location"
          ? m["sim.actions.label.moveToLocation"]({})
          : categoryId === "play-card"
            ? m["sim.actions.label.playCard"]({})
            : categoryId === "ink-card"
              ? m["sim.actions.label.inkCard"]({})
              : m["sim.actions.label.activateAbility"]({});

  return {
    id: `disabled:${categoryId}:${card.cardId}`,
    cardId: card.cardId,
    categoryId,
    label,
    enabled: false,
    reason,
    moves: [],
  };
}

function getQuestBlockedReason(card: LorcanaCardSnapshot): string {
  if (card.isDrying) {
    return m["sim.card.tags.freshInk.tooltip"]({});
  }
  if (card.readyState === "exerted") {
    return "This character is exerted.";
  }
  if (card.hasQuestRestriction) {
    return m["sim.card.tags.cantQuest.tooltip"]({});
  }
  return "This character cannot quest right now.";
}

function getChallengeBlockedReason(card: LorcanaCardSnapshot): string {
  if (card.isDrying) {
    return m["sim.card.tags.freshInk.tooltip"]({});
  }
  if (card.readyState === "exerted") {
    return "This character is exerted.";
  }
  return "No legal challenge targets right now.";
}

function getMoveBlockedReason(card: LorcanaCardSnapshot): string {
  if (card.readyState === "exerted") {
    return "This character is exerted.";
  }
  return "No legal locations to move to right now.";
}

export function getCardActionSourceCardId(move: ExecutableMoveEntry): string | null {
  return getSourceCardId(move);
}

export function getCardActionTargetCardId(move: ExecutableMoveEntry): string | null {
  return getTargetCardId(move);
}

export function buildCardActionViews(options: {
  card: LorcanaCardSnapshot;
  executableMoves: ExecutableMoveEntry[];
  ownerSide: LorcanaPlayerSide | null;
  challengeReadyCardIds: string[];
}): CardActionView[] {
  const { card, executableMoves, ownerSide, challengeReadyCardIds } = options;
  if (!ownerSide || card.ownerSide !== ownerSide) {
    return [];
  }

  const cardMoves = executableMoves.filter((move) => getSourceCardId(move) === card.cardId);
  const groupedMoves = new Map<CardActionCategoryId, ExecutableMoveEntry[]>();

  for (const move of cardMoves) {
    const categoryId = move.presentation.categoryId;
    if (
      categoryId !== "activate-ability" &&
      categoryId !== "challenge" &&
      categoryId !== "ink-card" &&
      categoryId !== "move-to-location" &&
      categoryId !== "play-card" &&
      categoryId !== "quest"
    ) {
      continue;
    }

    const existing = groupedMoves.get(categoryId);
    if (existing) {
      existing.push(move);
      continue;
    }

    groupedMoves.set(categoryId, [move]);
  }

  const actions: CardActionView[] = [];
  for (const categoryId of CARD_ACTION_ORDER) {
    const moves = groupedMoves.get(categoryId) ?? [];

    if (moves.length > 0) {
      actions.push(buildEnabledCategoryAction(card, categoryId, moves));
      continue;
    }

    if (categoryId === "play-card" && card.zoneId === "hand") {
      actions.push(buildBlockedAction(card, categoryId, "This card cannot be played right now."));
      continue;
    }

    if (categoryId === "ink-card" && card.zoneId === "hand" && card.inkable !== false) {
      actions.push(buildBlockedAction(card, categoryId, "This card cannot be inked right now."));
      continue;
    }

    if (card.zoneId !== "play" || card.cardType !== "character") {
      continue;
    }

    if (categoryId === "quest") {
      actions.push(buildBlockedAction(card, categoryId, getQuestBlockedReason(card)));
      continue;
    }

    if (categoryId === "challenge") {
      actions.push(
        buildBlockedAction(
          card,
          categoryId,
          challengeReadyCardIds.includes(card.cardId)
            ? "Select this character to challenge."
            : getChallengeBlockedReason(card),
        ),
      );
      continue;
    }

    if (categoryId === "move-to-location") {
      actions.push(buildBlockedAction(card, categoryId, getMoveBlockedReason(card)));
    }
  }

  return actions;
}
