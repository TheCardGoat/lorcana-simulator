import type { Component } from "svelte";
import {
  Droplets,
  Flag,
  Hand,
  Layers,
  MapPinned,
  Music4,
  OctagonX,
  Repeat2,
  Sparkles,
  Swords,
  Zap,
} from "@lucide/svelte";
import type {
  CardActionCategoryId,
  ExecutableMovePresentationCategoryId,
} from "@/features/simulator/model/contracts.js";

export type SimulatorActionIconComponent = Component<{ class?: string }>;

const moveCategoryIconById = {
  "activate-ability": Zap,
  "alter-hand": Repeat2,
  "choose-first-player": Hand,
  challenge: Swords,
  concede: OctagonX,
  "ink-card": Droplets,
  "keep-hand": Hand,
  "move-to-location": MapPinned,
  "pass-turn": Flag,
  "play-card": Sparkles,
  quest: Flag,
  "quest-all": Layers,
  "shift-card": Sparkles,
  "sing-card": Music4,
  undo: Repeat2,
  unknown: Sparkles,
} satisfies Record<ExecutableMovePresentationCategoryId, SimulatorActionIconComponent>;

export function getMoveCategoryIcon(
  categoryId: ExecutableMovePresentationCategoryId,
): SimulatorActionIconComponent {
  return moveCategoryIconById[categoryId] ?? Sparkles;
}

export function getCardActionCategoryIcon(
  categoryId: CardActionCategoryId,
): SimulatorActionIconComponent {
  return getMoveCategoryIcon(categoryId);
}
