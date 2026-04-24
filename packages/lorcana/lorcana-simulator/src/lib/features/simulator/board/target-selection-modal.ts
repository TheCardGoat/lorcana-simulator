import type { ResolutionTargetAvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

const TARGET_ZONE_LABELS = {
  deck: "Deck",
  hand: "Hand",
  play: "Play",
  inkwell: "Inkwell",
  discard: "Discard",
  limbo: "Limbo",
} as const;

/**
 * CardTargetDialog policy (see TabletopBoard `dialogTargetState` / `shouldAutoOpenTargetSelectionModal`):
 *
 * - **Modal + auto-open** when targets live in zones that aren't individually clickable on the
 *   board (deck, inkwell, limbo, discard) or when choosing players.
 * - **No modal** for `play`- or `hand`-zone targets — both are rendered as clickable cards on
 *   the chooser's own screen, and clicks are routed through `assignResolutionTargetSelection`.
 *   (`hand` always refers to the chooser's own hand in Lorcana — you can't be asked to pick a
 *   specific card from an opponent's hand.)
 * - Optional effects merged to target-selection with `originatesFromOptional` use the same modal
 *   rules; Cancel / decline still sends `resolveOptional: false` via presenter logic.
 */
const ZONES_USING_CARD_TARGET_MODAL = ["discard", "deck", "inkwell", "limbo"] as const;

function selectionUsesCardTargetModal(
  selectionState: ResolutionTargetAvailableMovesSelectionState,
): boolean {
  if (selectionState.candidatePlayerIds.length > 0) {
    return true;
  }

  return ZONES_USING_CARD_TARGET_MODAL.some((zone) => selectionState.allowedZones.includes(zone));
}

export function shouldUseTargetSelectionModal(
  selectionState: ResolutionTargetAvailableMovesSelectionState | null | undefined,
): boolean {
  return Boolean(
    selectionState &&
    selectionState.categoryId !== "alter-hand" &&
    selectionUsesCardTargetModal(selectionState),
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
