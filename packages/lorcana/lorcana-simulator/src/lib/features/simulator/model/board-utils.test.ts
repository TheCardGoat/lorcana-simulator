import { describe, expect, it } from "bun:test";
import type { MatchStaticResources } from "@tcg/lorcana-engine";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";

import { buildCardSnapshotMap, mergeSupplementalScryCardSnapshots } from "./board-utils.js";
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
      cost: 1,
      playCost: 1,
      isMasked: false,
      facePresentation: "faceUp",
      set: "TFC",
      cardNumber: "65",
    });
  });
});

describe("buildCardSnapshotMap", () => {
  it("threads shift cost metadata into simulator card snapshots", () => {
    const board = {
      stateID: 7,
      cards: {
        "shift-1": {
          id: "shift-1",
          ownerId: "player_one",
          zone: "hand",
          definitionId: "001-173",
          playCost: 6,
          shiftInkCost: 4,
          shiftPlayCost: 3,
          keywords: ["Shift"],
        },
      },
      players: {
        player_one: {
          hand: ["shift-1"],
          play: [],
          inkwell: [],
          discard: [],
          deckCount: 0,
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
      pendingEffects: [],
      bagEffects: [],
    } as unknown as LorcanaProjectedBoardView;

    const staticResources = {
      instances: new Map([
        [
          "shift-1",
          {
            instanceId: "shift-1",
            definitionId: "001-173",
            ownerID: "player_one",
          },
        ],
      ]),
      cards: new Map([
        [
          "001-173",
          {
            id: "001-173",
            name: "Stitch",
            version: "Rock Star",
            cardNumber: 173,
            set: "001",
            cardType: "character",
            cost: 6,
            inkType: ["amber"],
            inkable: true,
            rarity: "super_rare",
            strength: 3,
            willpower: 5,
            lore: 3,
            classifications: ["Floodborn", "Hero", "Alien"],
            text: "Shift 4",
          },
        ],
      ]),
    } as unknown as MatchStaticResources;

    const snapshots = buildCardSnapshotMap(board, staticResources);

    expect(snapshots["shift-1"]).toMatchObject({
      cardId: "shift-1",
      cost: 6,
      playCost: 6,
      shiftInkCost: 4,
      shiftPlayCost: 3,
      zoneId: "hand",
      ownerSide: "playerOne",
    });
  });

  it("threads discounted projected play cost into simulator card snapshots", () => {
    const board = {
      stateID: 8,
      cards: {
        "discount-1": {
          id: "discount-1",
          ownerId: "player_one",
          zone: "hand",
          definitionId: "001-050",
          playCost: 3,
        },
      },
      players: {
        player_one: {
          hand: ["discount-1"],
          play: [],
          inkwell: [],
          discard: [],
          deckCount: 0,
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
      pendingEffects: [],
      bagEffects: [],
    } as unknown as LorcanaProjectedBoardView;

    const staticResources = {
      instances: new Map([
        [
          "discount-1",
          {
            instanceId: "discount-1",
            definitionId: "001-050",
            ownerID: "player_one",
          },
        ],
      ]),
      cards: new Map([
        [
          "001-050",
          {
            id: "001-050",
            name: "Lantern Bearer",
            cardNumber: 50,
            set: "001",
            cardType: "character",
            cost: 4,
            inkType: ["amber"],
            inkable: true,
            rarity: "common",
            strength: 2,
            willpower: 2,
            lore: 1,
            classifications: ["Dreamborn"],
            text: "",
          },
        ],
      ]),
    } as unknown as MatchStaticResources;

    const snapshots = buildCardSnapshotMap(board, staticResources);

    expect(snapshots["discount-1"]).toMatchObject({
      cardId: "discount-1",
      cost: 4,
      playCost: 3,
      zoneId: "hand",
      ownerSide: "playerOne",
    });
  });
});
