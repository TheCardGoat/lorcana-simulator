import { m } from "$lib/i18n/messages.js";
import type {
  CardActionCategoryId,
  CardActionView,
  ExecutableMoveEntry,
  LorcanaCardSnapshot,
  LorcanaPlayerSide,
} from "@/features/simulator/model/contracts.js";

const CARD_ACTION_ORDER: readonly CardActionCategoryId[] = [
  "play-card",
  "shift-card",
  "sing-card",
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
    case "shift-card":
    case "sing-card":
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
    case "play-card":
    case "shift-card": {
      const targets = (move.params as { targets?: unknown }).targets;
      return Array.isArray(targets) && typeof targets[0] === "string" ? targets[0] : null;
    }
    case "sing-card": {
      const singer = (move.params as { singer?: unknown }).singer;
      return typeof singer === "string" ? singer : null;
    }
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
    if (
      typeof card.shiftInkCost === "number" &&
      Number.isFinite(card.shiftInkCost) &&
      typeof card.shiftPlayCost === "number" &&
      Number.isFinite(card.shiftPlayCost)
    ) {
      return card.shiftPlayCost === card.shiftInkCost
        ? `${card.shiftInkCost} ink`
        : `Pay ${card.shiftPlayCost} ink (${card.shiftInkCost} base)`;
    }

    if (typeof card.shiftInkCost === "number" && Number.isFinite(card.shiftInkCost)) {
      return `${card.shiftInkCost} ink`;
    }

    return "Shift";
  }

  if (params.cost === "sing") {
    return "Sing";
  }

  if (params.cost === "singTogether") {
    return "Sing Together";
  }

  if (typeof card.playCost === "number") {
    return `${card.playCost} ink`;
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
    categoryId === "play-card" || categoryId === "shift-card"
      ? getPlayActionDetail(card, moves[0]!)
      : undefined;
  const interaction =
    categoryId === "challenge" || categoryId === "move-to-location"
      ? "expand-on-click"
      : "execute-or-select";

  return {
    id: `${categoryId}:${card.cardId}`,
    cardId: card.cardId,
    categoryId,
    label,
    ...(detail ? { detail } : {}),
    interaction,
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
            : categoryId === "shift-card"
              ? m["sim.actions.label.shiftCard"]({})
              : categoryId === "ink-card"
                ? m["sim.actions.label.inkCard"]({})
                : m["sim.actions.label.activateAbility"]({});

  return {
    id: `disabled:${categoryId}:${card.cardId}`,
    cardId: card.cardId,
    categoryId,
    label,
    interaction: "execute-or-select",
    enabled: false,
    reason,
    moves: [],
  };
}

function buildDeferredEnabledAction(
  card: LorcanaCardSnapshot,
  categoryId: Extract<CardActionCategoryId, "challenge" | "move-to-location">,
): CardActionView {
  return {
    id: `${categoryId}:${card.cardId}`,
    cardId: card.cardId,
    categoryId,
    label:
      categoryId === "challenge"
        ? m["sim.actions.label.challenge"]({})
        : m["sim.actions.label.moveToLocation"]({}),
    interaction: "expand-on-click",
    enabled: true,
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

function getShiftBlockedReason(_card: LorcanaCardSnapshot): string {
  return "This card cannot be shifted right now.";
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
  movableToLocationCardIds: string[];
}): CardActionView[] {
  const { card, executableMoves, ownerSide, challengeReadyCardIds, movableToLocationCardIds } =
    options;
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
      categoryId !== "shift-card" &&
      categoryId !== "sing-card" &&
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

    if (
      categoryId === "shift-card" &&
      card.zoneId === "hand" &&
      typeof card.shiftInkCost === "number"
    ) {
      actions.push(buildBlockedAction(card, categoryId, getShiftBlockedReason(card)));
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
        challengeReadyCardIds.includes(card.cardId)
          ? buildDeferredEnabledAction(card, categoryId)
          : buildBlockedAction(card, categoryId, getChallengeBlockedReason(card)),
      );
      continue;
    }

    if (categoryId === "move-to-location") {
      actions.push(
        movableToLocationCardIds.includes(card.cardId)
          ? buildDeferredEnabledAction(card, categoryId)
          : buildBlockedAction(card, categoryId, getMoveBlockedReason(card)),
      );
    }
  }

  return actions;
}
