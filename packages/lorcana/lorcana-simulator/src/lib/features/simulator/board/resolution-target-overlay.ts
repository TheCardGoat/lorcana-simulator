import type { AvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

export function shouldUseResolutionTargetOverlay(
  selectionState: AvailableMovesSelectionState | null | undefined,
): boolean {
  return Boolean(
    selectionState?.mode === "resolution-target" &&
    selectionState.effectType &&
    selectionState.slots.length > 0,
  );
}
