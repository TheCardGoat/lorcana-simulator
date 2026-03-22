import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";
import type { LorcanaProjectedBoardView, PlayerId } from "@tcg/lorcana-engine";
import { createEmptyMatchStaticResources } from "@tcg/lorcana-engine";
import type { LorcanaEngineBase } from "@tcg/lorcana-engine";

import VisualSettingsRenderHarness from "./VisualSettingsRenderHarness.svelte";
import type { LorcanaPlayerSettingsMap } from "@/features/simulator/model/player-visual-settings.js";

function asPlayerId(value: string): PlayerId {
  return value as PlayerId;
}

function createBoard(): LorcanaProjectedBoardView {
  const playerOneId = asPlayerId("player-one");
  const playerTwoId = asPlayerId("player-two");

  return {
    activeEffects: [],
    bagEffects: [],
    cards: {},
    choosingFirstPlayer: null,
    gameID: "game-1",
    matchID: "match-1",
    openingTurnPlayer: playerOneId,
    pendingEffects: [],
    pendingMulligan: [],
    phase: "mainPhase",
    playerOrder: [playerOneId, playerTwoId],
    players: {
      [playerOneId]: {
        canAddCardToInkwell: false,
        deckCount: 10,
        discard: [],
        hand: [],
        handCount: 3,
        inkwell: ["hidden-ink-one"],
        lore: 0,
        play: [],
      },
      [playerTwoId]: {
        canAddCardToInkwell: false,
        deckCount: 12,
        discard: [],
        hand: [],
        handCount: 2,
        inkwell: ["hidden-ink-two"],
        lore: 0,
        play: [],
      },
    },
    priorityPlayer: playerOneId,
    reason: null,
    stateID: 1,
    status: "playing",
    step: null,
    timerView: {
      players: {},
      serverTimestamp: 0,
    },
    turnNumber: 1,
    turnPlayer: playerOneId,
    winner: null,
  };
}
function createEngine(board: LorcanaProjectedBoardView): LorcanaEngineBase {
  return {
    engine: Object.create(null) as LorcanaEngineBase["engine"],
    staticResources: createEmptyMatchStaticResources(),
    getBoard: () => board,
    getClientPlayerId: () => "player-two",
    enumerateMoves: () => [],
    getAvailableMoves: () => [],
    getMoveOptions: () => [],
    validateMove: () => ({ success: true }),
  } as unknown as LorcanaEngineBase;
}

describe("visual settings render integration", () => {
  it("renders seat playmats using the owner settings for each side", () => {
    const playerSettings: LorcanaPlayerSettingsMap = {
      "player-one": { playmat: "elsa" },
      "player-two": { playmat: "mulan" },
    };

    const { body } = render(VisualSettingsRenderHarness, {
      props: {
        engine: createEngine(createBoard()),
        playerSettings,
      },
    });

    expect(body).toContain('data-playmat-id="elsa"');
    expect(body).toContain(
      'data-playmat-src="https://r2.tcg.online/public/lorcana/simulator/playmats/elsa_bg.webp"',
    );
    expect(body).toContain('data-playmat-id="mulan"');
    expect(body).toContain(
      'data-playmat-src="https://r2.tcg.online/public/lorcana/simulator/playmats/mulan.webp"',
    );
  });

  it("renders masked hand, deck, and inkwell card backs from the owning player settings", () => {
    const playerSettings: LorcanaPlayerSettingsMap = {
      "player-one": { cardBack: "white" },
      "player-two": { cardBack: "yellow" },
    };

    const { body } = render(VisualSettingsRenderHarness, {
      props: {
        engine: createEngine(createBoard()),
        playerSettings,
      },
    });

    expect(body).toContain('data-owner-id="player-one"');
    expect(body).toContain(
      "https://r2.tcg.online/public/lorcana/simulator/card-back/back-white-square.webp",
    );
    expect(body).toContain('data-owner-id="player-two"');
    expect(body).toContain(
      "https://r2.tcg.online/public/lorcana/simulator/card-back/back-yellow-square.webp",
    );
  });
});
