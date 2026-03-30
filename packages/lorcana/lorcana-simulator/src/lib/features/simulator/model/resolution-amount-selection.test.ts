import { describe, expect, it } from "bun:test";
import { buildResolutionAmountSelectionState } from "./resolution-amount-selection";

describe("resolution amount selection", () => {
  it("defaults remove-damage selections to the chosen target's damage", () => {
    const selection = buildResolutionAmountSelectionState({
      payload: {
        effect: {
          type: "remove-damage",
          amount: 3,
          upTo: true,
        },
      },
      selectedTargets: ["card-1"],
      cardSnapshotsById: {
        "card-1": {
          cardId: "card-1",
          definitionId: "card-1",
          facePresentation: "faceUp",
          isMasked: false,
          label: "Damaged Ally",
          ownerId: "player-one",
          ownerSide: "playerOne",
          zoneId: "play",
          damage: 2,
        },
      },
    });

    expect(selection).toEqual({
      label: "Damage to remove",
      min: 0,
      max: 2,
      value: 2,
    });
  });

  it("clamps move-damage selections to the chosen source's damage", () => {
    const selection = buildResolutionAmountSelectionState({
      payload: {
        effect: {
          type: "move-damage",
          amount: 3,
          upTo: true,
        },
      },
      selectedTargets: ["card-1", "card-2"],
      currentAmount: 3,
      cardSnapshotsById: {
        "card-1": {
          cardId: "card-1",
          definitionId: "card-1",
          facePresentation: "faceUp",
          isMasked: false,
          label: "Source",
          ownerId: "player-one",
          ownerSide: "playerOne",
          zoneId: "play",
          damage: 1,
        },
        "card-2": {
          cardId: "card-2",
          definitionId: "card-2",
          facePresentation: "faceUp",
          isMasked: false,
          label: "Destination",
          ownerId: "player-two",
          ownerSide: "playerTwo",
          zoneId: "play",
          damage: 0,
        },
      },
    });

    expect(selection).toEqual({
      label: "Damage to move",
      min: 0,
      max: 1,
      value: 1,
    });
  });

  it("ignores fixed move-damage effects", () => {
    expect(
      buildResolutionAmountSelectionState({
        payload: {
          effect: {
            type: "move-damage",
            amount: 1,
          },
        },
        selectedTargets: ["card-1"],
        cardSnapshotsById: {},
      }),
    ).toBeNull();
  });
});
