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
    selectedTargetLabels: [],
    minimumSelections: 1,
    maximumSelections: 1,
    ...overrides,
  };
}

describe("target selection modal helpers", () => {
  it("uses the modal only for discard-target sessions", () => {
    expect(shouldUseTargetSelectionModal(createSelectionState())).toBe(true);
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: ["hand"],
        }),
      ),
    ).toBe(false);
    expect(
      shouldUseTargetSelectionModal(
        createSelectionState({
          allowedZones: ["play"],
        }),
      ),
    ).toBe(false);
  });

  it("auto-opens only for a new session key", () => {
    expect(shouldAutoOpenTargetSelectionModal("resolution:1", null)).toBe(true);
    expect(shouldAutoOpenTargetSelectionModal("resolution:1", "resolution:1")).toBe(false);
    expect(shouldAutoOpenTargetSelectionModal(null, "resolution:1")).toBe(false);
  });

  it("uses a zone-specific title for discard-only targets", () => {
    expect(getTargetSelectionModalTitle(createSelectionState())).toBe("Discard targets");
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
