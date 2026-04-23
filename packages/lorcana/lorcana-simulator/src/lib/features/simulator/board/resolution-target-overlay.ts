import type { AvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

// Effects whose slot structure doesn't map cleanly to picking cards on the
// board — source→destination for `move-damage`, character→location for
// `move-to-location`. Everything else (deal-damage, exert, banish, …) is a
// single-slot-per-pick prompt that the board handles inline.
const OVERLAY_EFFECT_TYPES = new Set<string>(["move-damage", "move-to-location"]);

export function shouldUseResolutionTargetOverlay(
  selectionState: AvailableMovesSelectionState | null | undefined,
): boolean {
  return Boolean(
    selectionState?.mode === "resolution-target" &&
    selectionState.effectType &&
    OVERLAY_EFFECT_TYPES.has(selectionState.effectType) &&
    selectionState.slots.length > 0,
  );
}
