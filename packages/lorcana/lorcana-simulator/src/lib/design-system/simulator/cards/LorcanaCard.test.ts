import { beforeEach, describe, expect, it, mock } from "bun:test";
import { render } from "svelte/server";
import type { CardActionView, LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";

let mockLayoutMode: "desktop" | "mobile" = "mobile";
let mockInspectedCard: LorcanaCardSnapshot | null = null;
let mockActions: CardActionView[] = [];

const handleCardActionClick = mock(() => true);
const closeCardInspect = mock(() => {});
const openGlobalPreview = mock(() => {});

mock.module("@/features/simulator/model/layout-mode.svelte.js", () => ({
  SimulatorLayoutModeObserver: class SimulatorLayoutModeObserver {
    get current() {
      return mockLayoutMode;
    }

    get isCompact() {
      return mockLayoutMode !== "desktop";
    }
  },
}));

mock.module("@/features/simulator/context/card-interaction-context.svelte.js", () => ({
  useCardInteractionContext: () => ({
    handleHover: () => {},
    handleLeave: () => {},
    handleSelect: () => {},
    handleContextMenu: () => {},
  }),
}));

mock.module("@/features/simulator/context/simulator-card-context.svelte.js", () => ({
  useSimulatorCardContext: () => ({
    inspectedCard: mockInspectedCard,
    closeCardInspect,
    openGlobalPreview,
  }),
  maybeUseSimulatorCardContext: () => ({
    previewCard: null,
    setExternalPreviewCard: () => {},
  }),
}));

mock.module("@/features/simulator/context/game-context.svelte.js", () => ({
  useLorcanaGameContext: () => ({
    ownerSide: () => "playerOne",
    pregamePhase: () => null,
    canActInPregame: () => false,
    challengeReadyCardIds: () => [],
    selectedMulliganCardIds: () => [],
  }),
  useLorcanaSidebarPresenter: () => ({
    actionSelectionSession: null,
    cardPreviewMode: "immediate",
    getActionSessionCardReason: () => null,
    getCardActionViews: () => mockActions,
    handleCardActionClick,
  }),
  maybeUseLorcanaBoardPresenter: () => null,
}));

function createCardSnapshot(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: "card-1",
    definitionId: "def-card-1",
    facePresentation: "faceUp",
    isMasked: false,
    label: "Bruno Madrigal - Out of the Shadows",
    ownerId: "player-one",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType: "character",
    cost: 5,
    inkType: ["amethyst"],
    classifications: ["Storyborn", "Ally", "Madrigal"],
    strength: 4,
    willpower: 5,
    loreValue: 2,
    damage: 0,
    readyState: "ready",
    textEntries: [
      {
        title: "Evasive",
      },
      {
        title: "IT WAS YOU",
        description: "Choose and discard a card.",
      },
    ],
    ...overrides,
  };
}

describe("LorcanaCard", () => {
  beforeEach(() => {
    mockLayoutMode = "mobile";
    mockInspectedCard = null;
    mockActions = [];
    handleCardActionClick.mockClear();
    closeCardInspect.mockClear();
    openGlobalPreview.mockClear();
  });

  it("does not render a mobile preview when the card is not inspected", async () => {
    mockLayoutMode = "mobile";
    mockInspectedCard = null;

    const { default: LorcanaCard } = await import("./LorcanaCard.svelte");
    const { body } = render(LorcanaCard, {
      props: {
        card: createCardSnapshot(),
      },
    });

    expect(body).not.toContain('data-slot="popover-content"');
    expect(body).toContain('data-card-id="card-1"');
  });

  it("renders desktop hover-card wrappers without requiring simulator provider state", async () => {
    mockLayoutMode = "desktop";
    mockInspectedCard = createCardSnapshot();

    const { default: LorcanaCard } = await import("./LorcanaCard.svelte");
    const { body } = render(LorcanaCard, {
      props: {
        card: createCardSnapshot(),
      },
    });

    expect(body).toContain('data-slot="hover-card-trigger"');
    expect(body).not.toContain('data-slot="popover-content"');
  });
});
