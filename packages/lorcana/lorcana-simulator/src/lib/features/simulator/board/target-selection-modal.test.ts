import { describe, expect, it } from "bun:test";

import {
  getTargetSelectionModalTitle,
  shouldAutoOpenTargetSelectionModal,
  shouldUseTargetSelectionModal,
} from "./target-selection-modal.js";
import type { ResolutionTargetAvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

function createSelectionState(
  overrides: Partial<ResolutionTargetAvailableMovesSelectionState> = {},
): ResolutionTargetAvailableMovesSelectionState {
  return {
    mode: "resolution-target",
    sessionKey: "resolution:test",
    sourceCardId: "source-card",
    categoryId: "unknown",
    categoryLabel: "Resolve effect",
    title: "Resolve effect",
    message: "Select a valid target for this effect.",
    canBack: false,
    canCancel: true,
    canConfirm: false,
    entries: [],
    effectType: null,
    target: null,
    allowedZones: ["discard"],
    candidateCardIds: [],
    candidatePlayerIds: [],
    viewerSide: "playerOne",
    candidateEntries: [],
    activeSlotIndex: null,
    slots: [],
    amountSelection: null,
    selectedTargetLabels: [],
    minimumSelections: 1,
    maximumSelections: 1,
    ...overrides,
  };
}

describe("target selection modal helpers", () => {
  it("uses the modal for discard-target sessions", () => {
    expect(shouldUseTargetSelectionModal(createSelectionState())).toBe(true);
  });

  it("uses the modal for player-target sessions", () => {
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: [],
          candidatePlayerIds: ["player_one", "player_two"],
        }),
      ),
    ).toBe(true);
  });

  it("uses the modal for deck and inkwell targets", () => {
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: ["deck"],
        }),
      ),
    ).toBe(true);
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: ["inkwell"],
        }),
      ),
    ).toBe(true);
  });

  it("skips the modal for play-zone-only card targets", () => {
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: ["play"],
        }),
      ),
    ).toBe(false);
  });

  it("skips the modal for hand-zone targets (chooser's own hand is clickable inline)", () => {
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: ["hand"],
        }),
      ),
    ).toBe(false);
  });

  it("auto-opens only for a new session key", () => {
    expect(shouldAutoOpenTargetSelectionModal("resolution:1", null)).toBe(true);
    expect(shouldAutoOpenTargetSelectionModal("resolution:1", "resolution:1")).toBe(false);
    expect(shouldAutoOpenTargetSelectionModal(null, "resolution:1")).toBe(false);
  });

  it("uses a zone-specific title for single-zone non-play targets", () => {
    expect(getTargetSelectionModalTitle(createSelectionState())).toBe("Discard targets");
    expect(
      getTargetSelectionModalTitle(
        createSelectionState({
          allowedZones: ["deck"],
        }),
      ),
    ).toBe("Deck targets");
  });

  it("keeps the generic title for play-zone targets", () => {
    expect(
      getTargetSelectionModalTitle(
        createSelectionState({
          title: "Pending effect",
          allowedZones: ["play"],
        }),
      ),
    ).toBe("Pending effect");
  });
});
