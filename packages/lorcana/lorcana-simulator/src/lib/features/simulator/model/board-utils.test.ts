import { describe, expect, it } from "bun:test";
import type { MatchStaticResources } from "@tcg/lorcana-engine";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";

import { mergeSupplementalScryCardSnapshots } from "./board-utils.js";
import type { LorcanaCardSnapshot } from "./contracts.js";

describe("mergeSupplementalScryCardSnapshots", () => {
  it("adds snapshots for revealed scry cards hidden by board projection", () => {
    const board = {
      stateID: 42,
      cards: {},
      players: {
        player_one: {
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
          deckCount: 4,
        },
        player_two: {
          hand: [],
          play: [],
          inkwell: [],
          discard: [],
          deckCount: 0,
        },
      },
      playerOrder: ["player_one", "player_two"],
      pendingEffects: [
        {
          id: "pending-scry-1",
          selectionContext: {
            kind: "scry-selection",
            revealedCardIds: ["reveal-1"],
          },
        },
      ],
      bagEffects: [],
    } as unknown as LorcanaProjectedBoardView;

    const staticResources = {
      instances: new Map([
        [
          "reveal-1",
          {
            instanceId: "reveal-1",
            definitionId: "001-001",
            ownerID: "player_one",
          },
        ],
      ]),
      cards: new Map([
        [
          "001-001",
          {
            id: "001-001",
            name: "Reflection",
            cardNumber: "65",
            set: "TFC",
            cardType: "action",
            actionSubtype: "song",
            cost: 1,
            inkType: ["amber"],
            inkable: true,
            rarity: "common",
            text: "Look at the top 3 cards of your deck.",
          },
        ],
      ]),
    } as unknown as MatchStaticResources;

    const snapshots: Record<string, LorcanaCardSnapshot> = {};

    const merged = mergeSupplementalScryCardSnapshots({
      board,
      snapshots,
      staticResources,
      authoritativeState: {
        ctx: {
          zones: {
            private: {
              cardIndex: {
                "reveal-1": {
                  zoneKey: "deck:player_one",
                  ownerID: "player_one",
                  controllerID: "player_one",
                },
              },
              cardMeta: {
                "reveal-1": {},
              },
            },
          },
        },
      },
    });

    expect(merged["reveal-1"]).toMatchObject({
      cardId: "reveal-1",
      definitionId: "001-001",
      label: "Reflection",
      ownerId: "player_one",
      ownerSide: "playerOne",
      zoneId: "deck",
      isMasked: false,
      facePresentation: "faceUp",
      set: "TFC",
      cardNumber: "65",
    });
  });
});
