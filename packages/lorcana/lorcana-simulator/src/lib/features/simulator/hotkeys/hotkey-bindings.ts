import { formatForDisplay } from "@tanstack/svelte-hotkeys";
import type {
  ExecutableMovePresentationCategoryId,
  LorcanaCardSnapshot,
} from "@/features/simulator/model/contracts.js";

export const OPPONENT_CARD_HOTKEYS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"] as const;
export const PLAY_CARD_HOTKEYS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"] as const;
export const HAND_CARD_HOTKEYS = ["Z", "X", "C", "V", "B", "N", "M"] as const;

export const FIXED_MOVE_CATEGORY_HOTKEYS = [
  { categoryId: "ink-card", hotkey: "1" },
  { categoryId: "play-card", hotkey: "2" },
  { categoryId: "shift-card", hotkey: "3" },
  { categoryId: "sing-card", hotkey: "4" },
  { categoryId: "quest", hotkey: "5" },
  { categoryId: "quest-all", hotkey: "6" },
  { categoryId: "challenge", hotkey: "7" },
  { categoryId: "activate-ability", hotkey: "8" },
  { categoryId: "move-to-location", hotkey: "9" },
  { categoryId: "undo", hotkey: "0" },
] as const satisfies ReadonlyArray<{
  categoryId: ExecutableMovePresentationCategoryId;
  hotkey: string;
}>;

export type SimulatorHotkeyKind = "global" | "move" | "card";
export type SimulatorHotkeyCardZone = "opponent-play" | "your-play" | "your-hand";

export interface SimulatorHotkeyDescriptor {
  id: string;
  hotkey: string;
  label: string;
  kind: SimulatorHotkeyKind;
  enabled: boolean;
  execute: () => void;
  cardId?: string;
  categoryId?: ExecutableMovePresentationCategoryId;
  cardZone?: SimulatorHotkeyCardZone;
}

export interface SimulatorCardHotkeyBinding {
  hotkey: string;
  card: LorcanaCardSnapshot;
}

export function getFixedMoveCategoryHotkey(
  categoryId: ExecutableMovePresentationCategoryId,
): string | null {
  return (
    FIXED_MOVE_CATEGORY_HOTKEYS.find((entry) => entry.categoryId === categoryId)?.hotkey ?? null
  );
}

export function getFormattedHotkeyParts(hotkey: string): string[] {
  const formatted = formatForDisplay(hotkey);
  if (formatted.includes(" + ")) {
    return formatted.split(" + ");
  }

  return [formatted];
}

export function assignCardHotkeys(
  cards: readonly LorcanaCardSnapshot[],
  hotkeys: readonly string[],
): SimulatorCardHotkeyBinding[] {
  return hotkeys.flatMap((hotkey, index) => {
    const card = cards[index];
    return card ? [{ hotkey, card }] : [];
  });
}
