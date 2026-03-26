import type { ResolutionTargetAvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

const TARGET_ZONE_LABELS = {
  deck: "Deck",
  hand: "Hand",
  play: "Play",
  inkwell: "Inkwell",
  discard: "Discard",
  limbo: "Limbo",
} as const;

export function shouldUseTargetSelectionModal(
  selectionState: ResolutionTargetAvailableMovesSelectionState | null | undefined,
): boolean {
  return Boolean(
    selectionState &&
    selectionState.categoryId !== "alter-hand" &&
    selectionState.allowedZones.includes("discard"),
  );
}

export function shouldAutoOpenTargetSelectionModal(
  sessionKey: string | null | undefined,
  lastAutoOpenedSessionKey: string | null | undefined,
): boolean {
  return Boolean(sessionKey && sessionKey !== lastAutoOpenedSessionKey);
}

export function getTargetSelectionModalTitle(
  selectionState: ResolutionTargetAvailableMovesSelectionState,
): string {
  if (selectionState.allowedZones.length === 1 && selectionState.allowedZones[0] !== "play") {
    return `${TARGET_ZONE_LABELS[selectionState.allowedZones[0]]} targets`;
  }

  return selectionState.title;
}
