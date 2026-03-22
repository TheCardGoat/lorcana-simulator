import { describe, expect, it } from "bun:test";
import {
  type CardInstanceId,
  type ChallengePreviewResult,
  type LorcanaEngineBase,
  type LorcanaProjectedBoardView,
  createEmptyMatchStaticResources,
  createPlayerId,
} from "@tcg/lorcana-engine";

import { LorcanaGameContext } from "@/features/simulator/context/game-context.svelte.js";
import type { MoveLogEntrySnapshot } from "@/features/simulator/model/contracts.js";
import { createLogEntry } from "@/features/simulator-devtools/test-data/factories.js";

interface TestEngine {
  engine: LorcanaEngineBase["engine"];
  staticResources: LorcanaEngineBase["staticResources"];
  getBoard: () => LorcanaProjectedBoardView;
  getClientPlayerId: () => string | undefined;
  enumerateMoves: () => [];
  canUndo?: (playerId?: string) => boolean;
  getMoveLog?: () => MoveLogEntrySnapshot[];
  previewChallenge?: (attackerId: string, defenderId: string) => ChallengePreviewResult | null;
}

interface MutableTestEngine extends TestEngine {
  setBoard: (nextBoard: LorcanaProjectedBoardView) => void;
  setMoveLogEntries: (nextMoveLogEntries: MoveLogEntrySnapshot[]) => void;
}

function toEngine(engine: TestEngine): LorcanaEngineBase {
  return Object.assign(Object.create(null), engine) as LorcanaEngineBase;
}

function createBoard(stateID: number): LorcanaProjectedBoardView {
  const playerOne = createPlayerId("player_one");
  const playerTwo = createPlayerId("player_two");

  return {
    gameID: "game-1",
    matchID: "match-1",
    stateID,
    gameSegment: "main",
    phase: "mainPhase",
    playerOrder: [playerOne, playerTwo],
    priorityPlayer: playerOne,
    turnPlayer: playerOne,
    turnNumber: 1,
    openingTurnPlayer: playerOne,
    pendingMulligan: [],
    choosingFirstPlayer: null,
    status: "playing",
    winner: null,
    reason: null,
    timerView: {
      serverTimestamp: 0,
      players: {},
    },
    cards: {},
    players: {
      player_one: {
        canAddCardToInkwell: false,
        lore: 5,
        deckCount: 50,
        handCount: 7,
        hand: [],
        play: [],
        inkwell: [],
        discard: [],
      },
      player_two: {
        canAddCardToInkwell: false,
        lore: 3,
        deckCount: 50,
        handCount: 7,
        hand: [],
        play: [],
        inkwell: [],
        discard: [],
      },
    },
    activeEffects: [],
    bagEffects: [],
    pendingEffects: [],
  };
}

function createEngine(options?: {
  board?: LorcanaProjectedBoardView;
  moveLogEntries?: MoveLogEntrySnapshot[];
}): MutableTestEngine {
  let board = options?.board ?? createBoard(1);
  let moveLogEntries = options?.moveLogEntries ?? [];

  return {
    engine: Object.create(null) as LorcanaEngineBase["engine"],
    staticResources: createEmptyMatchStaticResources(),
    getBoard: () => board,
    getClientPlayerId: () => "player_one",
    enumerateMoves: () => [],
    getAvailableMoves: () => [],
    getMoveOptions: () => [],
    validateMove: () => ({ success: true }),
    getMoveLog: () => moveLogEntries,
    previewChallenge: () => null,
    setBoard(nextBoard: LorcanaProjectedBoardView) {
      board = nextBoard;
    },
    setMoveLogEntries(nextMoveLogEntries: MoveLogEntrySnapshot[]) {
      moveLogEntries = nextMoveLogEntries;
    },
  } as MutableTestEngine;
}

describe("lorcana game context", () => {
  const attackerId = "attacker-1" as CardInstanceId;
  const defenderId = "defender-1" as CardInstanceId;

  it("populates move log entries from the engine snapshot refresh", () => {
    const initialEntries = [createLogEntry("Played Stitch")];
    const engine = createEngine({ moveLogEntries: initialEntries });

    const context = new LorcanaGameContext(toEngine(engine));

    expect(context.moveLogEntries()).toEqual(initialEntries);
  });

  it("updates move log entries when the engine state changes", () => {
    const initialEntries = [createLogEntry("Played Stitch")];
    const updatedEntries = [createLogEntry("Quested with Ariel"), createLogEntry("Passed turn")];
    const engine = createEngine({
      board: createBoard(10),
      moveLogEntries: initialEntries,
    });

    const context = new LorcanaGameContext(toEngine(engine));

    engine.setBoard(createBoard(11));
    engine.setMoveLogEntries(updatedEntries);
    context.handleLocaleChanged();

    expect(context.moveLogEntries()).toEqual(updatedEntries);
  });

  it("reads move log entries from the supplied read model when the engine does not expose them", () => {
    const entries = [createLogEntry("Moved to the inkwell")];
    const engine = createEngine();
    const { getMoveLog: _unusedGetMoveLog, ...engineWithoutMoveLog } = engine;

    const context = new LorcanaGameContext(toEngine(engineWithoutMoveLog), {
      getMoveLog: () => entries,
    });

    expect(context.moveLogEntries()).toEqual(entries);
  });

  it("passes challenge previews through from the engine", () => {
    const preview: ChallengePreviewResult = {
      attackerId,
      defenderId,
      defenderKind: "character",
      attackerCurrentDamage: 1,
      defenderCurrentDamage: 2,
      attackerNextDamage: 4,
      defenderNextDamage: 5,
      attackerWillpower: 4,
      defenderWillpower: 5,
      attackerDamageDealt: 3,
      defenderDamageDealt: 3,
      attackerWouldBeBanished: true,
      defenderWouldBeBanished: true,
    };
    const engine = createEngine({
      board: createBoard(5),
    });
    engine.previewChallenge = (attackerId, defenderId) =>
      attackerId === "attacker-1" && defenderId === "defender-1" ? preview : null;

    const context = new LorcanaGameContext(toEngine(engine));

    expect(context.previewChallenge("attacker-1", "defender-1")).toEqual(preview);
    expect(context.previewChallenge("attacker-1", "missing")).toBeNull();
  });

  it("resolves player visual settings from owner ids and seat mapping", () => {
    const context = new LorcanaGameContext(toEngine(createEngine()), undefined, {
      player_one: { cardBack: "white", playmat: "elsa" },
      player_two: { cardBack: "yellow", playmat: "mulan" },
    });

    expect(context.getPlayerVisualSettingsByOwnerId("player_one")).toMatchObject({
      cardBack: {
        id: "white",
      },
      playmat: {
        id: "elsa",
      },
    });
    expect(context.getPlayerVisualSettings("playerOne")).toMatchObject({
      cardBack: {
        id: "white",
      },
      playmat: {
        id: "elsa",
      },
    });
    expect(context.getPlayerVisualSettings("playerTwo")).toMatchObject({
      cardBack: {
        id: "yellow",
      },
      playmat: {
        id: "mulan",
      },
    });
  });
});
