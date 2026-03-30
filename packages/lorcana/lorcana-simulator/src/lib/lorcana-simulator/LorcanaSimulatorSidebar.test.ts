import { beforeEach, describe, expect, it, mock } from "bun:test";
import { render } from "svelte/server";
import { readable } from "svelte/store";

import { createLogEntry } from "@/features/simulator-devtools/test-data/factories.js";
import LorcanaSimulatorSidebarRenderHarness from "./LorcanaSimulatorSidebarRenderHarness.svelte";
import type { MoveCategorySummary } from "@/features/simulator/model/contracts.js";

type SidebarPresenterStub = {
  boardSnapshot: { gameID: string } | null;
  topSide: "playerOne" | "playerTwo";
  bottomSide: "playerOne" | "playerTwo";
  hasOwnedView: boolean;
  headerPlayerData: {
    lore: number;
    deckCount: number;
    handCount: number;
    discardCount: number;
    inkwellCount: number;
    availableInk: number;
    timer?: undefined;
  } | null;
  footerPlayerData: {
    lore: number;
    deckCount: number;
    handCount: number;
    discardCount: number;
    inkwellCount: number;
    availableInk: number;
    timer?: undefined;
  } | null;
  moveLogEntries: ReturnType<typeof createLogEntry>[];
  ownerSide: "playerOne" | "playerTwo" | null;
  activeSide: "playerOne" | "playerTwo" | null;
  showRawLogRegistryJson: boolean;
  moveCategorySummaries: MoveCategorySummary[];
  canConcede: boolean;
  handleOpenPlayerSettings: () => void;
  handleMobileConcede: () => void;
};

let mockSidebarPresenter: SidebarPresenterStub;

mock.module("@/features/simulator/context/game-context.svelte.js", () => ({
  useLorcanaSidebarPresenter: () => mockSidebarPresenter,
  useLorcanaBoardPresenter: () => {
    throw new Error("Board presenter not available in sidebar SSR tests");
  },
}));

mock.module("@/features/simulator-devtools/vs-ai/context.js", () => ({
  useHumanVsAiOrchestrator: () => readable(null),
}));

function createSidebarPresenterStub(
  overrides: Partial<SidebarPresenterStub> = {},
): SidebarPresenterStub {
  return {
    boardSnapshot: { gameID: "game-1" },
    topSide: "playerTwo",
    bottomSide: "playerOne",
    hasOwnedView: true,
    headerPlayerData: {
      lore: 2,
      deckCount: 48,
      handCount: 5,
      discardCount: 1,
      inkwellCount: 3,
      availableInk: 2,
    },
    footerPlayerData: {
      lore: 7,
      deckCount: 44,
      handCount: 4,
      discardCount: 2,
      inkwellCount: 6,
      availableInk: 4,
    },
    moveLogEntries: [],
    ownerSide: "playerOne",
    activeSide: "playerOne",
    showRawLogRegistryJson: false,
    moveCategorySummaries: [],
    canConcede: false,
    handleOpenPlayerSettings: () => {},
    handleMobileConcede: () => {},
    ...overrides,
  };
}

describe("LorcanaSimulatorSidebar", () => {
  beforeEach(() => {
    mockSidebarPresenter = createSidebarPresenterStub();
  });

  it("renders player panels and move log entries in the sidebar", () => {
    mockSidebarPresenter = createSidebarPresenterStub({
      moveLogEntries: [
        createLogEntry("Played Stitch", {
          actorSide: "playerOne",
          moveId: "playCard",
          turnNumber: 3,
        }),
      ],
    });

    const { body } = render(LorcanaSimulatorSidebarRenderHarness);

    expect(body).toContain("Opponent");
    expect(body).toContain("You");
    expect(body).toContain("Event Log");
    expect(body).toContain("Played Stitch");
  });

  it("renders the empty log state when no move log entries exist", () => {
    const { body } = render(LorcanaSimulatorSidebarRenderHarness);

    expect(body).toContain("No moves recorded yet.");
  });

  it("renders raw log payloads when sidebar debug mode is enabled", () => {
    mockSidebarPresenter = createSidebarPresenterStub({
      showRawLogRegistryJson: true,
      moveLogEntries: [
        createLogEntry("Played Stitch", {
          moveId: "playCard",
          playerId: "player_one",
          params: { cardId: "card-1" },
          turnNumber: 3,
        }),
      ],
    });

    const { body } = render(LorcanaSimulatorSidebarRenderHarness);

    expect(body).toContain('"moveId": "playCard"');
    expect(body).toContain('"turnNumber": 3');
  });

  it("shows the readonly post-game lock state when actions are disabled", () => {
    const { body } = render(LorcanaSimulatorSidebarRenderHarness, {
      props: { readOnly: true },
    });

    expect(body).toContain('aria-label="Undo unavailable"');
    expect(body).toContain('aria-label="Concede unavailable"');
    expect(body).toContain("Event Log");
  });
});
