import { m } from "$lib/i18n/messages.js";
import type {
  AvailableMovesSelectionState,
  ExecutableMovePresentationCategoryId,
  LorcanaCardSnapshot,
} from "@/features/simulator/model/contracts.js";
import {
  assignCardHotkeys,
  FIXED_MOVE_CATEGORY_HOTKEYS,
  HAND_CARD_HOTKEYS,
  OPPONENT_CARD_HOTKEYS,
  PLAY_CARD_HOTKEYS,
  type SimulatorHotkeyDescriptor,
} from "@/features/simulator/hotkeys/hotkey-bindings.js";

interface MoveCategorySummaryLike {
  categoryId: ExecutableMovePresentationCategoryId;
  categoryLabel: string;
}

interface PendingDirectMove {
  id: string;
  label: string;
  categoryId: "pass-turn" | "undo" | "quest-all";
  execute: () => void;
}

interface SimulatorHotkeyRegistryArgs {
  moveCategorySummaries: readonly MoveCategorySummaryLike[];
  selectionState: AvailableMovesSelectionState | null;
  pendingDirectMove: PendingDirectMove | null;
  opponentPlayCards: readonly LorcanaCardSnapshot[];
  ownedPlayCards: readonly LorcanaCardSnapshot[];
  ownedHandCards: readonly LorcanaCardSnapshot[];
  canBack: boolean;
  canCancel: boolean;
  canConfirm: boolean;
  openCommandPalette: () => void;
  cancel: () => void;
  back: () => void;
  confirm: () => void;
  runMoveCategory: (categoryId: ExecutableMovePresentationCategoryId) => void;
  inspectCard: (card: LorcanaCardSnapshot) => void;
  selectCard: (cardId: string) => void;
}

function isSelectableCardState(selectionState: AvailableMovesSelectionState | null): boolean {
  if (!selectionState) {
    return false;
  }

  return (
    selectionState.mode === "action" ||
    selectionState.mode === "resolution-target" ||
    selectionState.mode === "resolution-scry"
  );
}

export function buildSimulatorHotkeyDescriptors(
  args: SimulatorHotkeyRegistryArgs,
): SimulatorHotkeyDescriptor[] {
  const descriptors: SimulatorHotkeyDescriptor[] = [
    {
      id: "global-open-command-palette",
      hotkey: "Mod+K",
      label: m["sim.hotkeys.open"]({}),
      kind: "global",
      enabled: true,
      execute: args.openCommandPalette,
    },
    {
      id: "global-cancel",
      hotkey: "Escape",
      label: m["sim.actions.cancel"]({}),
      kind: "global",
      enabled: args.canCancel || Boolean(args.pendingDirectMove),
      execute: args.cancel,
    },
    {
      id: "global-back",
      hotkey: "Backspace",
      label: m["sim.actions.back"]({}),
      kind: "global",
      enabled: args.canBack,
      execute: args.back,
    },
    {
      id: "global-confirm",
      hotkey: "Enter",
      label: args.pendingDirectMove
        ? m["sim.actions.confirmMoveLabel"]({ label: args.pendingDirectMove.label })
        : m["sim.actions.confirm"]({}),
      kind: "global",
      enabled: args.canConfirm || Boolean(args.pendingDirectMove),
      execute: args.confirm,
    },
  ];

  const availableCategoryIds = new Set(
    args.moveCategorySummaries.map((summary) => summary.categoryId),
  );
  const passTurnSummary = args.moveCategorySummaries.find(
    (summary) => summary.categoryId === "pass-turn",
  );

  descriptors.push({
    id: "move:pass-turn",
    hotkey: "Space",
    label: passTurnSummary?.categoryLabel ?? m["sim.actions.label.passTurn"]({}),
    kind: "move",
    categoryId: "pass-turn",
    enabled: availableCategoryIds.has("pass-turn"),
    execute: () => args.runMoveCategory("pass-turn"),
  });

  for (const { categoryId, hotkey } of FIXED_MOVE_CATEGORY_HOTKEYS) {
    const summary = args.moveCategorySummaries.find(
      (candidate) => candidate.categoryId === categoryId,
    );
    descriptors.push({
      id: `move:${categoryId}`,
      hotkey,
      label: summary?.categoryLabel ?? getFallbackMoveCategoryLabel(categoryId),
      kind: "move",
      categoryId,
      enabled: availableCategoryIds.has(categoryId),
      execute: () => args.runMoveCategory(categoryId),
    });
  }

  const selectionActive = isSelectableCardState(args.selectionState);
  const cardSelectionZone = selectionActive
    ? getSelectionZone(
        args.selectionState,
        args.opponentPlayCards,
        args.ownedPlayCards,
        args.ownedHandCards,
      )
    : null;

  for (const binding of assignCardHotkeys(args.opponentPlayCards, OPPONENT_CARD_HOTKEYS)) {
    const enabled = selectionActive ? cardSelectionZone === "opponent-play" : true;
    descriptors.push({
      id: `card:opponent:${binding.card.cardId}`,
      hotkey: binding.hotkey,
      label: binding.card.label,
      kind: "card",
      cardId: binding.card.cardId,
      cardZone: "opponent-play",
      enabled,
      execute: () =>
        selectionActive ? args.selectCard(binding.card.cardId) : args.inspectCard(binding.card),
    });
  }

  for (const binding of assignCardHotkeys(args.ownedPlayCards, PLAY_CARD_HOTKEYS)) {
    const enabled = selectionActive ? cardSelectionZone === "your-play" : true;
    descriptors.push({
      id: `card:play:${binding.card.cardId}`,
      hotkey: binding.hotkey,
      label: binding.card.label,
      kind: "card",
      cardId: binding.card.cardId,
      cardZone: "your-play",
      enabled,
      execute: () =>
        selectionActive ? args.selectCard(binding.card.cardId) : args.inspectCard(binding.card),
    });
  }

  for (const binding of assignCardHotkeys(args.ownedHandCards, HAND_CARD_HOTKEYS)) {
    const enabled = selectionActive ? cardSelectionZone === "your-hand" : true;
    descriptors.push({
      id: `card:hand:${binding.card.cardId}`,
      hotkey: binding.hotkey,
      label: binding.card.label,
      kind: "card",
      cardId: binding.card.cardId,
      cardZone: "your-hand",
      enabled,
      execute: () =>
        selectionActive ? args.selectCard(binding.card.cardId) : args.inspectCard(binding.card),
    });
  }

  return descriptors;
}

function getSelectionZone(
  selectionState: AvailableMovesSelectionState | null,
  opponentPlayCards: readonly LorcanaCardSnapshot[],
  ownedPlayCards: readonly LorcanaCardSnapshot[],
  ownedHandCards: readonly LorcanaCardSnapshot[],
): "opponent-play" | "your-play" | "your-hand" | null {
  if (!selectionState) {
    return null;
  }

  const selectedEntry = selectionState.entries.find(
    (entry) => entry.kind === "card" && typeof entry.cardId === "string" && entry.disabled !== true,
  );

  if (!selectedEntry || selectedEntry.kind !== "card") {
    return null;
  }

  if (ownedHandCards.some((card) => card.cardId === selectedEntry.cardId)) {
    return "your-hand";
  }

  if (ownedPlayCards.some((card) => card.cardId === selectedEntry.cardId)) {
    return "your-play";
  }

  if (opponentPlayCards.some((card) => card.cardId === selectedEntry.cardId)) {
    return "opponent-play";
  }

  return null;
}

function getFallbackMoveCategoryLabel(categoryId: ExecutableMovePresentationCategoryId): string {
  switch (categoryId) {
    case "activate-ability":
      return m["sim.actions.label.activateAbility"]({});
    case "challenge":
      return m["sim.actions.label.challenge"]({});
    case "ink-card":
      return m["sim.actions.label.inkCard"]({});
    case "move-to-location":
      return m["sim.actions.label.moveToLocation"]({});
    case "play-card":
      return m["sim.actions.label.playCard"]({});
    case "quest":
      return m["sim.actions.label.quest"]({});
    case "quest-all":
      return m["sim.actions.label.questAll"]({});
    case "shift-card":
      return m["sim.actions.label.shiftCard"]({});
    case "sing-card":
      return m["sim.actions.label.singCard"]({});
    case "undo":
      return m["sim.actions.label.undo"]({});
    default:
      return categoryId;
  }
}
