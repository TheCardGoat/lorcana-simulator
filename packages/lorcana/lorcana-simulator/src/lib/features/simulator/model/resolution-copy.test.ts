import { describe, expect, it } from "bun:test";
import type {
  CardInstanceId,
  PlayerId,
  TargetResolutionSelectionContext,
} from "@tcg/lorcana-engine";

import {
  buildResolutionCopyBundle,
  getResolutionInteractionStatusMessage,
} from "./resolution-copy.js";
import type { LorcanaCardSnapshot } from "./contracts.js";

function asCardId(value: string): CardInstanceId {
  return value as CardInstanceId;
}

function asPlayerId(value: string): PlayerId {
  return value as PlayerId;
}

function createCardSnapshot(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: overrides.cardId ?? "card-1",
    definitionId: overrides.definitionId ?? "card-1",
    isMasked: overrides.isMasked ?? false,
    label: overrides.label ?? "Goofy - Musketeer",
    ownerId: overrides.ownerId ?? "player-1",
    ownerSide: overrides.ownerSide ?? "playerOne",
    zoneId: overrides.zoneId ?? "play",
    facePresentation: overrides.facePresentation ?? "faceUp",
    cardType: overrides.cardType ?? "character",
    textEntries: overrides.textEntries ?? [],
    ...overrides,
  };
}

function createTargetSelectionContext(
  overrides: Partial<TargetResolutionSelectionContext> = {},
): TargetResolutionSelectionContext {
  return {
    origin: "pending-effect",
    requestId: "effect-1",
    kind: "target-selection",
    sourceCardId: asCardId("source-1"),
    chooserId: asPlayerId("player-1"),
    currentSelection: {},
    submitField: "targets",
    targetDsl: [],
    cardCandidateIds: [asCardId("target-1")],
    playerCandidateIds: [],
    allowedZones: ["play"],
    minSelections: 1,
    maxSelections: 1,
    ordered: false,
    autoRejected: false,
    ...overrides,
  };
}

describe("resolution-copy", () => {
  it("builds rich optional-effect copy when title and description are available", () => {
    const sourceCard = createCardSnapshot({
      label: "Mulan - Disguised Soldier",
      textEntries: [
        {
          title: "WHERE DO I SIGN IN?",
          description:
            "When you play this character, you may draw a card, then choose and discard a card.",
        },
      ],
    });

    const copy = buildResolutionCopyBundle({
      kind: "optional-selection",
      sourceCard,
    });

    expect(copy.referenceLabel).toBe("Mulan - Disguised Soldier: WHERE DO I SIGN IN?");
    expect(copy.detailMessage).toBe(
      "Resolve optional effect from Mulan - Disguised Soldier: WHERE DO I SIGN IN?. When you play this character, you may draw a card, then choose and discard a card.",
    );
    expect(copy.promptMessage).toBe(copy.detailMessage);
    expect(copy.promptInlineReference).toEqual({
      label: "Mulan - Disguised Soldier: WHERE DO I SIGN IN?.",
      card: sourceCard,
      prefix: "Resolve optional effect from ",
      suffix: " When you play this character, you may draw a card, then choose and discard a card.",
    });
  });

  it("falls back to description-only optional copy when no title is present", () => {
    const sourceCard = createCardSnapshot({
      label: "Ariel - Adventurous Collector",
      textEntries: [
        {
          title: "",
          description: "You may draw a card.",
        },
      ],
    });

    const copy = buildResolutionCopyBundle({
      kind: "optional-selection",
      sourceCard,
    });

    expect(copy.detailMessage).toBe(
      "Resolve optional effect from Ariel - Adventurous Collector: You may draw a card.",
    );
    expect(copy.promptMessage).toBe(
      "Accept or decline Ariel - Adventurous Collector directly from the simulator.",
    );
  });

  it("uses explicit effect titles for single-target target-selection prompts", () => {
    const sourceCard = createCardSnapshot({
      label: "Jasmine - Resourceful Infiltrator",
    });

    const copy = buildResolutionCopyBundle({
      kind: "target-selection",
      sourceCard,
      effectTitle: "JUST WHAT YOU NEED",
      targetSelectionContext: createTargetSelectionContext(),
    });

    expect(copy.referenceLabel).toBe("Jasmine - Resourceful Infiltrator: JUST WHAT YOU NEED");
    expect(copy.promptMessage).toBe(
      "Select the required target or player for Jasmine - Resourceful Infiltrator: JUST WHAT YOU NEED.",
    );
  });

  it("uses abilityIndex to resolve localized target-selection prompts", () => {
    const sourceCard = createCardSnapshot({
      label: "Jasmine - Resourceful Infiltrator",
      textEntries: [
        {
          title: "JUST WHAT YOU NEED",
          description:
            "When you play this character, you may give another chosen character Resist +1 until the start of your next turn.",
        },
        {
          title: "",
          description: "Ward",
        },
      ],
    });

    const copy = buildResolutionCopyBundle({
      kind: "target-selection",
      sourceCard,
      abilityIndex: 0,
      targetSelectionContext: createTargetSelectionContext(),
    });

    expect(copy.referenceLabel).toBe("Jasmine - Resourceful Infiltrator: JUST WHAT YOU NEED");
    expect(copy.promptMessage).toBe(
      "Select the required target or player for Jasmine - Resourceful Infiltrator: JUST WHAT YOU NEED.",
    );
    expect(copy.detailMessage).toBe(copy.promptMessage);
  });

  it("falls back to a single-entry card title when abilityIndex is unavailable", () => {
    const sourceCard = createCardSnapshot({
      label: "Jasmine - Resourceful Infiltrator",
      textEntries: [
        {
          title: "JUST WHAT YOU NEED",
          description:
            "When you play this character, you may give another chosen character Resist +1 until the start of your next turn.",
        },
      ],
    });

    const copy = buildResolutionCopyBundle({
      kind: "target-selection",
      sourceCard,
      targetSelectionContext: createTargetSelectionContext(),
    });

    expect(copy.referenceLabel).toBe("Jasmine - Resourceful Infiltrator: JUST WHAT YOU NEED");
    expect(copy.promptMessage).toBe(
      "Select the required target or player for Jasmine - Resourceful Infiltrator: JUST WHAT YOU NEED.",
    );
  });

  it("avoids guessing a title from multi-entry cards when abilityIndex is unavailable", () => {
    const sourceCard = createCardSnapshot({
      label: "Jasmine - Resourceful Infiltrator",
      textEntries: [
        {
          title: "JUST WHAT YOU NEED",
          description:
            "When you play this character, you may give another chosen character Resist +1 until the start of your next turn.",
        },
        {
          title: "",
          description: "Ward",
        },
      ],
    });

    const copy = buildResolutionCopyBundle({
      kind: "target-selection",
      sourceCard,
      targetSelectionContext: createTargetSelectionContext(),
    });

    expect(copy.referenceLabel).toBe("Jasmine - Resourceful Infiltrator");
    expect(copy.promptMessage).toBe(
      "Select the required target or player for Jasmine - Resourceful Infiltrator.",
    );
  });

  it("keeps multi-target prompts more specific", () => {
    const copy = buildResolutionCopyBundle({
      kind: "target-selection",
      sourceCard: createCardSnapshot({ label: "Twin Fire", cardType: "action" }),
      targetSelectionContext: createTargetSelectionContext({
        minSelections: 1,
        maxSelections: 2,
      }),
    });

    expect(copy.promptMessage).toBe("Select 1-2 valid targets for Twin Fire.");
  });

  it("covers choice, name-card, and scry flows", () => {
    const sourceCard = createCardSnapshot({
      label: "Yzma - On Edge",
      textEntries: [
        {
          title: "WHY DO WE EVEN HAVE THAT LEVER?",
          description: "Choose one.",
        },
      ],
    });

    expect(
      buildResolutionCopyBundle({
        kind: "choice-selection",
        sourceCard,
      }).promptMessage,
    ).toBe("Choose an effect for Yzma - On Edge: WHY DO WE EVEN HAVE THAT LEVER?.");
    expect(
      buildResolutionCopyBundle({
        kind: "name-card-selection",
        sourceCard,
      }).promptMessage,
    ).toBe("Name a card before resolving Yzma - On Edge: WHY DO WE EVEN HAVE THAT LEVER?.");
    expect(
      buildResolutionCopyBundle({
        kind: "scry-selection",
        sourceCard,
      }).promptMessage,
    ).toBe(
      "Arrange the revealed cards to finish resolving Yzma - On Edge: WHY DO WE EVEN HAVE THAT LEVER?.",
    );
  });

  it("uses generic copy when card context is unavailable", () => {
    const copy = buildResolutionCopyBundle({
      kind: "target-selection",
      sourceCard: null,
      targetSelectionContext: createTargetSelectionContext(),
    });

    expect(copy.referenceLabel).toBeNull();
    expect(copy.promptMessage).toBe(
      "Select the required target or player before resolving this effect.",
    );
    expect(copy.sessionStatusMessage).toBe("Select target for this effect.");
  });

  it("reports dynamic interaction status consistently", () => {
    expect(
      getResolutionInteractionStatusMessage({
        kind: "target-selection",
        phase: "selecting",
        selectedTargetCount: 2,
      }),
    ).toBe("Selecting targets (2 selected)...");
    expect(
      getResolutionInteractionStatusMessage({
        kind: "optional-selection",
        phase: "selecting",
      }),
    ).toBe("Deciding whether to resolve...");
    expect(
      getResolutionInteractionStatusMessage({
        kind: "scry-selection",
        phase: "executing",
      }),
    ).toBe("Executing...");
  });
});
