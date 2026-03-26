import { describe, expect, it, mock } from "bun:test";
import type {
  AvailableMovesSelectionState,
  ExecutableMovePresentationCategoryId,
  LorcanaCardSnapshot,
} from "@/features/simulator/model/contracts.js";
import { buildSimulatorHotkeyDescriptors } from "./simulator-hotkey-registry.js";

function createCard(
  cardId: string,
  label: string,
  zoneId: LorcanaCardSnapshot["zoneId"],
  ownerSide: LorcanaCardSnapshot["ownerSide"],
): LorcanaCardSnapshot {
  return {
    cardId,
    definitionId: `def-${cardId}`,
    isMasked: false,
    label,
    ownerId: ownerSide === "playerOne" ? "player-one" : "player-two",
    ownerSide,
    zoneId,
    cardType: zoneId === "hand" ? "action" : "character",
    facePresentation: "faceUp",
  };
}

function createActionSelectionState(cardId: string): AvailableMovesSelectionState {
  return {
    mode: "action",
    phase: "choose-target",
    categoryId: "challenge",
    categoryLabel: "Challenge",
    title: "Challenge",
    message: "Choose a target.",
    canBack: true,
    canCancel: true,
    canConfirm: false,
    sourceCardId: null,
    sourceLabel: null,
    targetCardId: null,
    targetLabel: null,
    selectedMoveId: null,
    selectedMoveLabel: null,
    entries: [
      {
        id: `card:${cardId}`,
        kind: "card",
        cardId,
        label: "Selectable card",
        selected: false,
      },
    ],
  };
}

describe("simulator-hotkey-registry", () => {
  it("builds fixed global and move descriptors with stable bindings", () => {
    const runMoveCategory = mock((_categoryId: ExecutableMovePresentationCategoryId) => {});

    const descriptors = buildSimulatorHotkeyDescriptors({
      moveCategorySummaries: [
        { categoryId: "pass-turn", categoryLabel: "Pass Turn" },
        { categoryId: "play-card", categoryLabel: "Play" },
        { categoryId: "undo", categoryLabel: "Undo" },
      ],
      selectionState: null,
      pendingDirectMove: null,
      opponentPlayCards: [],
      ownedPlayCards: [],
      ownedHandCards: [],
      canBack: false,
      canCancel: true,
      canConfirm: false,
      openCommandPalette: () => {},
      cancel: () => {},
      back: () => {},
      confirm: () => {},
      runMoveCategory,
      inspectCard: () => {},
      selectCard: () => {},
    });

    expect(descriptors.find((descriptor) => descriptor.id === "global-cancel")?.hotkey).toBe(
      "Escape",
    );
    expect(descriptors.find((descriptor) => descriptor.id === "global-confirm")?.hotkey).toBe(
      "Enter",
    );
    expect(descriptors.find((descriptor) => descriptor.id === "move:pass-turn")?.hotkey).toBe(
      "Space",
    );
    expect(descriptors.find((descriptor) => descriptor.id === "move:play-card")?.hotkey).toBe("2");
    expect(descriptors.find((descriptor) => descriptor.id === "move:undo")?.hotkey).toBe("0");

    descriptors.find((descriptor) => descriptor.id === "move:play-card")?.execute();
    expect(runMoveCategory).toHaveBeenCalledWith("play-card");
  });

  it("opens previews for owned cards when selection is inactive", () => {
    const inspectCard = mock((_card: LorcanaCardSnapshot) => {});
    const opponentPlayCard = createCard("opp-1", "Aladdin", "play", "playerTwo");
    const ownedPlayCard = createCard("play-1", "Mickey", "play", "playerOne");
    const ownedHandCard = createCard("hand-1", "Elsa", "hand", "playerOne");

    const descriptors = buildSimulatorHotkeyDescriptors({
      moveCategorySummaries: [],
      selectionState: null,
      pendingDirectMove: null,
      opponentPlayCards: [opponentPlayCard],
      ownedPlayCards: [ownedPlayCard],
      ownedHandCards: [ownedHandCard],
      canBack: false,
      canCancel: false,
      canConfirm: false,
      openCommandPalette: () => {},
      cancel: () => {},
      back: () => {},
      confirm: () => {},
      runMoveCategory: () => {},
      inspectCard,
      selectCard: () => {},
    });

    expect(descriptors.find((descriptor) => descriptor.id === "card:opponent:opp-1")?.enabled).toBe(
      true,
    );
    expect(descriptors.find((descriptor) => descriptor.id === "card:play:play-1")?.enabled).toBe(
      true,
    );
    expect(descriptors.find((descriptor) => descriptor.id === "card:hand:hand-1")?.enabled).toBe(
      true,
    );

    descriptors.find((descriptor) => descriptor.id === "card:opponent:opp-1")?.execute();
    descriptors.find((descriptor) => descriptor.id === "card:play:play-1")?.execute();
    descriptors.find((descriptor) => descriptor.id === "card:hand:hand-1")?.execute();

    expect(inspectCard).toHaveBeenCalledTimes(3);
    expect(inspectCard).toHaveBeenNthCalledWith(1, opponentPlayCard);
    expect(inspectCard).toHaveBeenNthCalledWith(2, ownedPlayCard);
    expect(inspectCard).toHaveBeenNthCalledWith(3, ownedHandCard);
  });

  it("uses card hotkeys for selection instead of previews when selection is active", () => {
    const inspectCard = mock((_card: LorcanaCardSnapshot) => {});
    const selectCard = mock((_cardId: string) => {});
    const opponentPlayCard = createCard("opp-1", "Aladdin", "play", "playerTwo");
    const ownedPlayCard = createCard("play-1", "Mickey", "play", "playerOne");

    const descriptors = buildSimulatorHotkeyDescriptors({
      moveCategorySummaries: [],
      selectionState: createActionSelectionState("opp-1"),
      pendingDirectMove: null,
      opponentPlayCards: [opponentPlayCard],
      ownedPlayCards: [ownedPlayCard],
      ownedHandCards: [],
      canBack: true,
      canCancel: true,
      canConfirm: false,
      openCommandPalette: () => {},
      cancel: () => {},
      back: () => {},
      confirm: () => {},
      runMoveCategory: () => {},
      inspectCard,
      selectCard,
    });

    const opponentDescriptor = descriptors.find(
      (descriptor) => descriptor.id === "card:opponent:opp-1",
    );
    const ownedPlayDescriptor = descriptors.find(
      (descriptor) => descriptor.id === "card:play:play-1",
    );

    expect(opponentDescriptor?.enabled).toBe(true);
    expect(ownedPlayDescriptor?.enabled).toBe(false);

    opponentDescriptor?.execute();
    ownedPlayDescriptor?.execute();

    expect(selectCard).toHaveBeenCalledTimes(2);
    expect(selectCard).toHaveBeenNthCalledWith(1, "opp-1");
    expect(selectCard).toHaveBeenNthCalledWith(2, "play-1");
    expect(inspectCard).not.toHaveBeenCalled();
  });

  it("shows pending direct move label on confirm", () => {
    const descriptors = buildSimulatorHotkeyDescriptors({
      moveCategorySummaries: [{ categoryId: "undo", categoryLabel: "Undo" }],
      selectionState: null,
      pendingDirectMove: {
        id: "undo:1",
        label: "Undo last move",
        categoryId: "undo",
        execute: () => {},
      },
      opponentPlayCards: [],
      ownedPlayCards: [],
      ownedHandCards: [],
      canBack: false,
      canCancel: true,
      canConfirm: true,
      openCommandPalette: () => {},
      cancel: () => {},
      back: () => {},
      confirm: () => {},
      runMoveCategory: () => {},
      inspectCard: () => {},
      selectCard: () => {},
    });

    expect(descriptors.find((descriptor) => descriptor.id === "global-confirm")?.label).toContain(
      "Undo last move",
    );
  });
});
