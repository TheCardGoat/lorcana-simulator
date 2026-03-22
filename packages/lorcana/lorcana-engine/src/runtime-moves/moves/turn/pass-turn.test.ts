import { afterEach, describe, expect, it } from "bun:test";
import type { CardInstanceId, PlayerId } from "#core";
import type { LorcanaRuntimeMoveInputs, LorcanaRuntimeMoveParams } from "../../../types";
import {
  CANONICAL_PLAYER_ONE,
  CANONICAL_PLAYER_TWO,
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
} from "../../../testing";

const PLAYER_ONE = CANONICAL_PLAYER_ONE as PlayerId;
const PLAYER_TWO = CANONICAL_PLAYER_TWO as PlayerId;

function findInstanceInZone(
  engine: LorcanaMultiplayerTestEngine,
  zone: string,
  playerId: string,
  definitionId: string,
): CardInstanceId {
  const match = engine
    .getCardInstanceIdsInZone(zone, playerId)
    .find((cardId) => engine.getCardDefinitionId(cardId) === definitionId);
  if (!match) {
    throw new Error(`Expected instance for '${definitionId}' in ${zone}:${playerId}`);
  }
  return match as CardInstanceId;
}

function executeMoveAsJudge<K extends keyof LorcanaRuntimeMoveInputs & string>(
  engine: LorcanaMultiplayerTestEngine,
  moveId: K,
  args: LorcanaRuntimeMoveParams[K],
  _playerId: string = PLAYER_ONE,
) {
  const serverEngine = engine.getServerEngine();
  return serverEngine.engine.executeMove(moveId, { args } as LorcanaRuntimeMoveInputs[K]);
}

function executeMoveAsPlayer<K extends keyof LorcanaRuntimeMoveInputs & string>(
  engine: LorcanaMultiplayerTestEngine,
  moveId: K,
  args: LorcanaRuntimeMoveParams[K],
  _playerId: string = PLAYER_ONE,
) {
  return engine
    .getServerEngine()
    .engine.executeMove(moveId, { args } as LorcanaRuntimeMoveInputs[K]);
}

function expectFailureCode(
  result: { success: boolean; errorCode?: string; code?: string },
  expectedCode: string,
): void {
  expect(result.success).toBe(false);
  if ("errorCode" in result && typeof result.errorCode === "string") {
    expect(result.errorCode).toBe(expectedCode);
    return;
  }
  if ("code" in result && typeof result.code === "string") {
    expect(result.code).toBe(expectedCode);
    return;
  }

  throw new Error(`Expected failure code '${expectedCode}', but no failure code was found`);
}

describe("passTurn", () => {
  let engine: LorcanaMultiplayerTestEngine;

  afterEach(() => {
    engine?.dispose();
  });

  it("advances turn/priority and emits TURN_STARTED and turnPassed events", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 1 }, { deck: 1 });

    expect(engine.getTurnNumber()).toBe(1);
    expect(engine.getCurrentPhase()).toBe("main");
    expect(engine.getActivePlayer()).toBe(PLAYER_ONE);

    const baselineEventCount = engine.getPublishedGameEvents().length;
    const result = engine.asLorcanaPlayerOne().passTurn();
    expect(result.success).toBe(true);

    expect(engine.getTurnNumber()).toBe(2);
    expect(engine.getCurrentPhase()).toBe("main");
    expect(engine.getActivePlayer()).toBe(PLAYER_TWO);

    const eventsDuringPass = engine.getPublishedGameEvents().slice(baselineEventCount);
    const turnStarted = eventsDuringPass.find(
      ({ event }) =>
        event.kind === "TURN_STARTED" &&
        event.playerId === PLAYER_TWO &&
        event.turn === 2 &&
        event.phase === "beginning",
    );
    const turnPassed = eventsDuringPass.find(
      ({ event }) =>
        event.kind === "CUSTOM" &&
        event.customType === "turnPassed" &&
        event.data?.previousPlayer === PLAYER_ONE &&
        event.data?.newPlayer === PLAYER_TWO,
    );

    expect(turnStarted).toBeDefined();
    expect(turnPassed).toBeDefined();
    expect(
      engine
        .getServerEngine()
        .getRuntime()
        .getGameLog()
        .some(
          (entry) =>
            entry.defaultMessage?.key === "lorcana.move.passTurn" &&
            entry.defaultMessage.values?.playerId === PLAYER_ONE,
        ),
    ).toBe(true);
  });

  it("updates projected turn ownership after passing from the opening turn", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { deck: 10 },
      { deck: 10 },
      { skipPreGame: false },
    );

    expect(engine.asLorcanaPlayerOne().chooseFirstPlayer(PLAYER_ONE).success).toBe(true);
    expect(engine.asLorcanaPlayerOne().mulligan([]).success).toBe(true);
    expect(engine.asLorcanaPlayerTwo().mulligan([]).success).toBe(true);

    const openingBoard = engine.asServer().getBoard();
    expect(openingBoard.turnNumber).toBe(1);
    expect(openingBoard.turnPlayer).toBe(PLAYER_ONE);
    expect(openingBoard.priorityPlayer).toBe(PLAYER_ONE);

    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);

    const boardAfterPass = engine.asServer().getBoard();
    expect(boardAfterPass.turnNumber).toBe(2);
    expect(boardAfterPass.turnPlayer).toBe(PLAYER_TWO);
    expect(boardAfterPass.priorityPlayer).toBe(PLAYER_TWO);
  });

  it("defaults omitted deck fixtures to 10 stub cards", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({}, {});

    expect(engine.asServer().getCardsInZone("deck", PLAYER_ONE).count).toBe(10);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_TWO).count).toBe(10);

    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);

    expect(engine.asServer().getCardsInZone("deck", PLAYER_ONE).count).toBe(10);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_TWO).count).toBe(9);
    expect(engine.asServer().isGameOver()).toBe(false);
  });

  it("draws a card for the next player at the start of their turn but skips the opening player's first draw", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 1 }, { deck: 2 });

    expect(engine.asServer().getCardsInZone("hand", PLAYER_ONE).count).toBe(0);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_ONE).count).toBe(1);
    expect(engine.asServer().getCardsInZone("hand", PLAYER_TWO).count).toBe(0);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_TWO).count).toBe(2);

    expect(engine.asLorcanaPlayerOne().passTurn().success).toBe(true);

    expect(engine.asServer().getCardsInZone("hand", PLAYER_ONE).count).toBe(0);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_ONE).count).toBe(1);
    expect(engine.asServer().getCardsInZone("hand", PLAYER_TWO).count).toBe(1);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_TWO).count).toBe(1);
  });

  it("ends the game when the active player passes turn with an empty deck", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 0 }, { deck: 1 });

    const result = engine.asLorcanaPlayerOne().passTurn();

    expect(result.success).toBe(true);
    expect(engine.asServer().isGameOver()).toBe(true);
    expect(engine.asServer().getWinner()).toBe(PLAYER_TWO);
    expect(engine.asServer().getCurrentPhase()).toBe("main");
    expect(engine.asServer().getTurnNumber()).toBe(1);
  });

  it("preserves an explicit empty deck fixture", () => {
    engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 0 }, { deck: 0 });

    expect(engine.asServer().getCardsInZone("deck", PLAYER_ONE).count).toBe(0);
    expect(engine.asServer().getCardsInZone("deck", PLAYER_TWO).count).toBe(0);
  });

  it("rejects forced passTurn intent when Reckless challenge is available", () => {
    const recklessAttacker = createMockCharacter({
      id: "reckless-attacker-judge-block",
      name: "Reckless Attacker",
      cost: 2,
      abilities: [{ id: "reckless", type: "keyword", keyword: "Reckless", text: "Reckless" }],
    });
    const defender = createMockCharacter({
      id: "reckless-defender-judge-block",
      name: "Defender",
      cost: 2,
    });

    engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { play: [recklessAttacker], deck: 0 },
      { play: [defender], deck: 0 },
    );

    const defenderId = findInstanceInZone(engine, "play", PLAYER_TWO, defender.id);
    const exertResult = executeMoveAsJudge(engine, "manualExertCard", { cardId: defenderId });
    expect(exertResult.success).toBe(true);

    const result = executeMoveAsPlayer(engine, "passTurn", {});

    expectFailureCode(result, "PASS_TURN_RECKLESS_CHALLENGE_REQUIRED");
  });
});
