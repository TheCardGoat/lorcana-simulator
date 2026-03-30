import { afterEach, describe, expect, it } from "bun:test";
import {
  DECK_AWARE_LORE_RACE_STRATEGY_ID,
  DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
  createPlayerId,
  type AcceptedMoveRecord,
  type CardInstanceId,
  type EngineLogRecord,
} from "@tcg/lorcana-engine";
import { steelSapphireMidrange } from "../deck-fixtures/index.js";
import {
  AutomatedMatchPlaybackController,
  createPersistedMoveLogEntries,
} from "./playback-controller.js";

const PLAYER_ONE_ID = createPlayerId("player_one");
const PLAYER_TWO_ID = createPlayerId("player_two");
const CARD_ONE_ID = "card-1" as CardInstanceId;

describe("AutomatedMatchPlaybackController strategy loading", () => {
  let controller: AutomatedMatchPlaybackController | null = null;

  afterEach(() => {
    controller?.dispose();
    controller = null;
  });

  it("upgrades supported deck colors to the matching deck-aware strategy at game start", () => {
    controller = new AutomatedMatchPlaybackController({
      playerOneDeckText: steelSapphireMidrange.cards,
      playerTwoDeckText: steelSapphireMidrange.cards,
      playerOneStrategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
      playerTwoStrategyId: DEFAULT_AUTOMATED_ACTION_STRATEGY_ID,
      seed: "playback-controller:deck-aware-loader-supported",
    });

    expect(controller.getConfig().playerOneStrategyId).toBe(DEFAULT_AUTOMATED_ACTION_STRATEGY_ID);
    expect(controller.getConfig().playerTwoStrategyId).toBe(DEFAULT_AUTOMATED_ACTION_STRATEGY_ID);
    expect(controller.getResolvedStrategyOption(PLAYER_ONE_ID)?.id).toBe(
      DECK_AWARE_LORE_RACE_STRATEGY_ID,
    );
    expect(controller.getResolvedStrategyOption(PLAYER_TWO_ID)?.id).toBe(
      DECK_AWARE_LORE_RACE_STRATEGY_ID,
    );
  });
});

describe("createPersistedMoveLogEntries", () => {
  it("preserves typed log entries for restored player history", () => {
    const acceptedMoves: AcceptedMoveRecord[] = [
      {
        actorId: "player_one",
        gameId: "game-1",
        input: { args: { playerId: "player_one", cardId: "card-1" } },
        moveId: "playCard",
        processedCommand: {
          commandID: "cmd-1",
          input: { args: { playerId: "player_one", cardId: "card-1" } },
          move: "playCard",
        },
        sourceAuthority: "client",
        stateVersion: 5,
        timestamp: 123,
        turnNumber: 2,
      },
    ];
    const engineLogs: EngineLogRecord[] = [
      {
        gameId: "game-1",
        stateVersion: 5,
        timestamp: 123,
        sourceAuthority: "client",
        log: {
          type: "playCard",
          playerId: PLAYER_ONE_ID,
          timestamp: 123,
          cardId: CARD_ONE_ID,
          inkPaid: 0,
        },
      },
    ];

    const entries = createPersistedMoveLogEntries({
      acceptedMoves,
      engineLogs,
      resolveActorSide: (actorId) => (actorId === "player_one" ? "playerOne" : undefined),
    });

    expect(entries).toHaveLength(1);
    expect(entries[0]?.typedLogEntry).toMatchObject({ type: "playCard", cardId: CARD_ONE_ID });
    expect(entries[0]?.title).not.toBe("playCard");
  });
});
