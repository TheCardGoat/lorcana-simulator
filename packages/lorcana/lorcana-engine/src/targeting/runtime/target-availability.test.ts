import { describe, expect, it } from "bun:test";
import type { CardInstanceId, PlayerId } from "#core";
import type { PlayCardExecutionContext } from "../../runtime-moves/resolution/action-effects/types";
import {
  analyzeTargetSelectionAvailability,
  analyzeTargetSelectionAvailabilityFromAnalysis,
} from "./index";

type TestCardDefinition = {
  id: string;
  cardType: "character" | "item" | "location" | "action";
  actionSubtype?: string;
  classifications?: string[];
  cost?: number;
  strength?: number;
  willpower?: number;
};

const PLAYER_ONE = "player-one" as PlayerId;
const PLAYER_TWO = "player-two" as PlayerId;

function createTestContext(args?: {
  definitions?: Record<string, TestCardDefinition>;
  zoneCards?: Record<string, CardInstanceId[]>;
  currentPlayer?: PlayerId;
}): PlayCardExecutionContext {
  const definitions = args?.definitions ?? {};
  const zoneCards = args?.zoneCards ?? {};
  const cardMeta: Record<string, Record<string, unknown>> = {};
  const cardIndex: Record<string, { ownerID: PlayerId; zoneKey: string }> = {};

  for (const [zoneKey, cards] of Object.entries(zoneCards)) {
    const [, ownerSegment] = zoneKey.split(":");
    const owner = (ownerSegment ?? PLAYER_ONE) as PlayerId;
    for (const cardId of cards) {
      cardIndex[cardId] = { ownerID: owner, zoneKey };
    }
  }

  const currentPlayer = args?.currentPlayer ?? PLAYER_ONE;
  const zonesApi = {
    getCards: ({ zone, playerId }: { zone: string; playerId: PlayerId }) => [
      ...(zoneCards[`${zone}:${playerId}`] ?? []),
    ],
    getCardOwner: (cardId: CardInstanceId) => cardIndex[cardId]?.ownerID,
    getCardController: (cardId: CardInstanceId) => cardIndex[cardId]?.ownerID,
    getCardZone: (cardId: CardInstanceId) => cardIndex[cardId]?.zoneKey,
  };
  const cardsApi = {
    get: (cardId: CardInstanceId) => ({
      definition: definitions[cardId],
      meta: cardMeta[cardId] ?? {},
    }),
    require: (cardId: CardInstanceId) => ({
      definition: definitions[cardId],
      meta: cardMeta[cardId] ?? {},
    }),
    getDefinition: (cardId: CardInstanceId) => definitions[cardId],
    patchMeta: (cardId: CardInstanceId, nextMeta: Record<string, unknown>) => {
      cardMeta[cardId] = { ...cardMeta[cardId], ...nextMeta };
    },
  };

  return {
    G: {
      lore: {
        [PLAYER_ONE]: 0,
        [PLAYER_TWO]: 0,
      },
    },
    playerId: currentPlayer,
    cards: cardsApi,
    framework: {
      cards: cardsApi,
      state: {
        priority: { holder: currentPlayer } as never,
        status: { turn: 1 } as never,
        _zonesPrivate: {
          cardIndex,
          cardMeta,
          zoneCards,
        } as never,
        playerIds: [PLAYER_ONE, PLAYER_TWO],
        turn: 1,
        currentPlayer,
        phase: undefined,
        step: undefined,
        gameSegment: undefined,
        stateID: 0,
        matchID: "test-match",
        gameID: "test-game",
        gameEnded: false,
      },
      time: {
        getRemainingTime: () => 0,
      },
      zones: zonesApi as never,
    },
  } as unknown as PlayCardExecutionContext;
}

describe("target-availability", () => {
  it("auto-rejects chosen-character effects with no legal candidates", () => {
    const source = "source" as CardInstanceId;
    const ctx = createTestContext({
      definitions: {
        [source]: { id: "source", cardType: "action" },
      },
    });

    expect(
      analyzeTargetSelectionAvailability(
        {
          type: "deal-damage",
          amount: 3,
          target: "CHOSEN_CHARACTER",
        },
        PLAYER_ONE,
        ctx,
        source,
      ),
    ).toMatchObject({
      candidateCount: 0,
      minSelections: 1,
      canSatisfyRequiredSelection: false,
      shouldAutoRejectForNoValidTargets: true,
    });
  });

  it("auto-rejects when a mandatory multi-target effect has too few candidates", () => {
    const source = "source" as CardInstanceId;
    const target = "target" as CardInstanceId;
    const ctx = createTestContext({
      definitions: {
        [source]: { id: "source", cardType: "action" },
        [target]: { id: "target", cardType: "character", strength: 2, willpower: 3 },
      },
      zoneCards: {
        [`play:${PLAYER_TWO}`]: [target],
      },
    });

    expect(
      analyzeTargetSelectionAvailability(
        {
          type: "exert",
          target: {
            selector: "chosen",
            count: 2,
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
        },
        PLAYER_ONE,
        ctx,
        source,
      ),
    ).toMatchObject({
      candidateCount: 1,
      minSelections: 2,
      canSatisfyRequiredSelection: false,
      shouldAutoRejectForNoValidTargets: true,
    });
  });

  it("auto-rejects up-to target effects when there are no candidates to choose", () => {
    const source = "source" as CardInstanceId;
    const ctx = createTestContext({
      definitions: {
        [source]: { id: "source", cardType: "action" },
      },
    });

    expect(
      analyzeTargetSelectionAvailability(
        {
          type: "exert",
          target: {
            selector: "chosen",
            count: { upTo: 1 },
            owner: "opponent",
            zones: ["play"],
            cardTypes: ["character"],
          },
        },
        PLAYER_ONE,
        ctx,
        source,
      ),
    ).toMatchObject({
      candidateCount: 0,
      minSelections: 0,
      allowsExplicitEmptyTargetSelection: true,
      shouldAutoRejectForNoValidTargets: true,
    });
  });

  it("auto-rejects discard-from-hand and put-into-inkwell source-card effects with no candidates", () => {
    const source = "source" as CardInstanceId;
    const ctx = createTestContext({
      definitions: {
        [source]: { id: "source", cardType: "action" },
      },
    });

    expect(
      analyzeTargetSelectionAvailability(
        {
          type: "discard",
          chosen: true,
          amount: 1,
          from: "hand",
          target: "OPPONENT",
        },
        PLAYER_ONE,
        ctx,
        source,
      ).shouldAutoRejectForNoValidTargets,
    ).toBe(true);

    expect(
      analyzeTargetSelectionAvailability(
        {
          type: "put-into-inkwell",
          source: "hand",
          target: "CONTROLLER",
          facedown: true,
        },
        PLAYER_ONE,
        ctx,
        source,
      ).shouldAutoRejectForNoValidTargets,
    ).toBe(true);
  });

  it("treats duplicate-allowed target requirements as satisfiable with one candidate", () => {
    const target = "target" as CardInstanceId;
    expect(
      analyzeTargetSelectionAvailabilityFromAnalysis(
        {
          type: "sequence",
          steps: [
            { type: "remove-damage", amount: 1, target: "CHOSEN_CHARACTER" },
            { type: "restriction", restriction: "cant-quest", target: "CHOSEN_CHARACTER" },
          ],
        },
        {
          targetDsl: [],
          cardCandidates: [target],
          playerCandidates: [],
          allowedZones: ["play"],
          minSelections: 2,
          maxSelections: 2,
          requiresExplicitSelection: true,
          allowsDeferredResolutionWithoutInitialSelection: false,
          allowDuplicateTargets: true,
        },
      ),
    ).toMatchObject({
      candidateCount: 1,
      canSatisfyRequiredSelection: true,
      shouldAutoRejectForNoValidTargets: false,
    });
  });
});
