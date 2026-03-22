import { describe, expect, it } from "bun:test";
import type { CardInstanceId, PlayerId } from "#core";
import type { CardPlayedPayload } from "../../../types";
import type { PlayCardExecutionContext } from "./types";
import { resolveActionEffect } from "./composed-effect-resolver";

type TestCardDefinition = {
  id: string;
  cardType: "character" | "item" | "location" | "action";
  strength?: number;
  willpower?: number;
  lore?: number;
  cost?: number;
};

const PLAYER_ONE = "player-one" as PlayerId;
const PLAYER_TWO = "player-two" as PlayerId;

function createCardPlayedPayload(cardId: CardInstanceId, playerId: PlayerId): CardPlayedPayload {
  return {
    cardId,
    cardType: "action",
    costType: "free",
    playerId,
  };
}

function createResolverTestContext(args?: {
  definitions?: Record<string, TestCardDefinition>;
  zoneCards?: Record<string, CardInstanceId[]>;
  cardMeta?: Record<string, Record<string, unknown>>;
}): {
  ctx: PlayCardExecutionContext;
  state: {
    cardMeta: Record<string, Record<string, unknown>>;
    moveCalls: Array<{ cardId: CardInstanceId; zone: string; playerId: PlayerId }>;
  };
} {
  const definitions = args?.definitions ?? {};
  const zoneCards = args?.zoneCards ?? {};
  const cardMeta = args?.cardMeta ?? {};
  const cardIndex: Record<string, { ownerID: PlayerId; zoneKey: string }> = {};

  for (const [zoneKey, cards] of Object.entries(zoneCards)) {
    const [, ownerSegment] = zoneKey.split(":");
    const owner = (ownerSegment ?? PLAYER_ONE) as PlayerId;
    for (const cardId of cards) {
      cardIndex[cardId] = { ownerID: owner, zoneKey };
    }
  }

  const moveCalls: Array<{ cardId: CardInstanceId; zone: string; playerId: PlayerId }> = [];
  const getCards = ({ zone, playerId }: { zone: string; playerId: PlayerId }): CardInstanceId[] => [
    ...(zoneCards[`${zone}:${playerId}`] ?? []),
  ];
  const runtimeCtx = {
    priority: { holder: PLAYER_ONE },
    status: { turn: 1 },
    zones: {
      private: {
        cardIndex,
        cardMeta,
        zoneCards,
      },
    },
  };
  const cardsApi = {
    get: (cardId: CardInstanceId) => {
      const definition = definitions[cardId];
      if (!definition) {
        return undefined;
      }
      return {
        definition,
        meta: cardMeta[cardId] ?? {},
        getStrength: () => definition.strength ?? 0,
        getWillpower: () => definition.willpower ?? 0,
      };
    },
    require: (cardId: CardInstanceId) => {
      const definition = definitions[cardId];
      if (!definition) {
        throw new Error(`Missing card ${String(cardId)}`);
      }
      return {
        definition,
        meta: cardMeta[cardId] ?? {},
        getStrength: () => definition.strength ?? 0,
        getWillpower: () => definition.willpower ?? 0,
      };
    },
    getDefinition: (cardId: CardInstanceId) => definitions[cardId],
    getMeta: (cardId: CardInstanceId) => cardMeta[cardId],
    patchMeta: (cardId: CardInstanceId, nextMeta: Record<string, unknown>) => {
      cardMeta[cardId] = {
        ...cardMeta[cardId],
        ...nextMeta,
      };
    },
    setMeta: (cardId: CardInstanceId, nextMeta: Record<string, unknown>) => {
      cardMeta[cardId] = { ...nextMeta };
    },
    clearMeta: (cardId: CardInstanceId) => {
      delete cardMeta[cardId];
    },
    entriesMeta: () => Object.entries(cardMeta),
  };

  const ctx = {
    G: {
      lore: {
        [PLAYER_ONE]: 0,
        [PLAYER_TWO]: 0,
      },
      pendingEffects: [],
    },
    playerId: PLAYER_ONE,
    cards: cardsApi,
    framework: {
      cards: cardsApi,
      events: {
        emit: () => {},
      },
      state: {
        priority: runtimeCtx.priority as never,
        status: runtimeCtx.status as never,
        _zonesPrivate: runtimeCtx.zones?.private as never,
        playerIds: [PLAYER_ONE, PLAYER_TWO],
        turn: 1,
        currentPlayer: PLAYER_ONE,
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
      zones: {
        drawCards: () => {},
        getCards,
        reveal: () => {},
        moveCard: (cardId: CardInstanceId, to: { playerId: PlayerId; zone: string }) => {
          moveCalls.push({
            cardId,
            playerId: to.playerId,
            zone: to.zone,
          });
        },
        getCardOwner: (cardId: CardInstanceId) => cardIndex[cardId]?.ownerID,
        getCardZone: (cardId: CardInstanceId) => cardIndex[cardId]?.zoneKey,
      } as never,
    },
    events: {},
  } as unknown as PlayCardExecutionContext;

  return {
    ctx,
    state: {
      cardMeta,
      moveCalls,
    },
  };
}

describe("Retro Evolution Device runtime support", () => {
  it("plays only cards within the frozen chosen-card-cost offset", () => {
    const source = "source" as CardInstanceId;
    const playableCharacter = "playable-character" as CardInstanceId;
    const tooExpensiveCharacter = "too-expensive-character" as CardInstanceId;
    const { ctx, state } = createResolverTestContext({
      definitions: {
        [source]: { id: "source", cardType: "action" },
        [playableCharacter]: { id: "playable-character", cardType: "character", cost: 4 },
        [tooExpensiveCharacter]: {
          id: "too-expensive-character",
          cardType: "character",
          cost: 5,
        },
      },
      zoneCards: {
        [`hand:${PLAYER_ONE}`]: [playableCharacter, tooExpensiveCharacter],
      },
    });

    resolveActionEffect(
      ctx,
      createCardPlayedPayload(source, PLAYER_ONE),
      {
        type: "play-card",
        from: "hand",
        cardType: "character",
        cost: "free",
        filter: {
          maxCost: {
            type: "chosen-card-cost",
            offset: 2,
          },
        },
      },
      {
        eventSnapshot: {
          chosenCardCost: 2,
        },
        targets: [playableCharacter, tooExpensiveCharacter],
      },
    );

    expect(state.moveCalls).toEqual([
      { cardId: playableCharacter, playerId: PLAYER_ONE, zone: "play" },
    ]);
  });
});
