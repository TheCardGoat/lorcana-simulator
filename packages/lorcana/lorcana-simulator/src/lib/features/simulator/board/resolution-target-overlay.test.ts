import { describe, expect, it } from "bun:test";

import { shouldUseResolutionTargetOverlay } from "./resolution-target-overlay.js";
import type { AvailableMovesSelectionState } from "@/features/simulator/model/contracts.js";

describe("shouldUseResolutionTargetOverlay", () => {
  it("uses the board overlay for move-damage target prompts", () => {
    const state: AvailableMovesSelectionState = {
      mode: "resolution-target",
      sourceCardId: "source",
      categoryId: "unknown",
      categoryLabel: "Resolve effect",
      title: "Effect",
      message: "Choose the character to move damage from.",
      canBack: false,
      canCancel: true,
      canConfirm: false,
      entries: [],
      effectType: "move-damage",
      candidateEntries: [],
      activeSlotIndex: 0,
      slots: [
        {
          id: "slot-1",
          label: "Move damage from",
          cardType: "character",
          targetId: null,
          targetLabel: null,
          targetCardId: null,
          locked: false,
        },
        {
          id: "slot-2",
          label: "Move damage to",
          cardType: "character",
          targetId: null,
          targetLabel: null,
          targetCardId: null,
          locked: false,
        },
      ],
      selectedTargetLabels: [],
      minimumSelections: 2,
      maximumSelections: 2,
    };

    expect(shouldUseResolutionTargetOverlay(state)).toBe(true);
  });

  it("keeps generic target prompts on the legacy dialog", () => {
    const state: AvailableMovesSelectionState = {
      mode: "resolution-target",
      sourceCardId: null,
      categoryId: "unknown",
      categoryLabel: "Resolve effect",
      title: "Effect",
      message: "Select the required target or player before resolving this effect.",
      canBack: false,
      canCancel: true,
      canConfirm: false,
      entries: [],
      effectType: null,
      candidateEntries: [],
      activeSlotIndex: null,
      slots: [],
      selectedTargetLabels: [],
      minimumSelections: 1,
      maximumSelections: 1,
    };

    expect(shouldUseResolutionTargetOverlay(state)).toBe(false);
  });
});
