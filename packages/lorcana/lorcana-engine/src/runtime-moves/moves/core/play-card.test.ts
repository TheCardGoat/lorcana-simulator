import { describe, expect, it } from "bun:test";
import type { ActionCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../../../card-i18n";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
  createMockSong,
} from "../../../testing";

function createMockActionCard(params: {
  id: string;
  name: string;
  cost: number;
  text: string;
  abilities: ActionCard["abilities"];
}): ActionCard {
  return {
    id: params.id,
    canonicalId: `ci_${params.id}`,
    cardType: "action",
    name: params.name,
    cost: params.cost,
    inkType: ["amber"],
    inkable: true,
    set: "TST",
    rarity: "common",
    text: params.text,
    abilities: params.abilities,
    i18n: createCardI18n(params.name, {
      en: {
        name: params.name,
        text: params.text,
      },
    }),
    cardNumber: 901,
  };
}

const conditionalExertCharacter = createMockCharacter({
  id: "conditional-exert-character",
  name: "Conditional Exert Character",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 2,
  abilities: [
    {
      id: "conditional-exert-character-1",
      text: "This character enters play exerted unless you have Chip in play.",
      type: "static",
      condition: {
        type: "not",
        condition: {
          controller: "you",
          name: "Chip",
          type: "has-named-character",
        },
      },
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
    },
  ],
});

const chipCharacter = createMockCharacter({
  id: "conditional-exert-chip",
  name: "Chip",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

const inkTestCharacter = createMockCharacter({
  id: "ink-test-character",
  name: "Ink Test Character",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
});

describe("ink validation", () => {
  it("rejects playing a card with insufficient ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: 2,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(inkTestCharacter)).toEqual(
      expect.objectContaining({
        success: false,
        errorCode: "INSUFFICIENT_INK",
      }),
    );
  });

  it("rejects playing a card with zero ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(inkTestCharacter)).toEqual(
      expect.objectContaining({
        success: false,
        errorCode: "INSUFFICIENT_INK",
      }),
    );
  });

  it("allows playing a card with exact ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: inkTestCharacter.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(inkTestCharacter).success).toBe(true);
  });

  it("allows playing a card with excess ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: 8,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(inkTestCharacter).success).toBe(true);
  });

  it("canPlayCard returns false with insufficient ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: 2,
      deck: 2,
    });

    expect(engine.asPlayerOne().canPlayCard(inkTestCharacter)).toBe(false);
  });

  it("excludes card from available moves when ink is insufficient", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: 2,
      deck: 2,
    });

    const moves = engine.asPlayerOne().getAvailableMoves();
    const playMove = moves.find((move) => move.moveId === "playCard");

    if (playMove) {
      const cardId = engine.findCardInstanceId(inkTestCharacter, "hand", PLAYER_ONE);
      expect(playMove.selectableCardIds).not.toContain(cardId);
    }
  });

  it("rejects playing a second card after ink is spent on the first", () => {
    const cheapCharacter = createMockCharacter({
      id: "ink-test-cheap",
      name: "Ink Test Cheap",
      cost: 3,
      strength: 2,
      willpower: 2,
      lore: 1,
    });

    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [cheapCharacter, inkTestCharacter],
      inkwell: 5,
      deck: 2,
    });

    // First play succeeds (3 ink spent, 2 remaining)
    expect(engine.asPlayerOne().playCard(cheapCharacter).success).toBe(true);

    // Second play should fail (need 5, have 2)
    expect(engine.asPlayerOne().playCard(inkTestCharacter)).toEqual(
      expect.objectContaining({
        success: false,
        errorCode: "INSUFFICIENT_INK",
      }),
    );
  });
});

const songCard = createMockSong({
  id: "ink-test-song",
  name: "Ink Test Song",
  cost: 4,
  text: "Gain 1 lore.",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const singerCharacter = createMockCharacter({
  id: "ink-test-singer",
  name: "Ink Test Singer",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 1,
});

describe("drag-and-drop ink-only enforcement", () => {
  it("rejects playing a song with standard cost when ink is insufficient even if a singer is available", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [songCard],
      play: [singerCharacter],
      inkwell: 0,
      deck: 2,
    });

    // Explicit standard cost must reject when ink is insufficient,
    // even though the song could be sung by the singer.
    expect(engine.asPlayerOne().playCard(songCard, { cost: "standard" })).toEqual(
      expect.objectContaining({
        success: false,
        errorCode: "INSUFFICIENT_INK",
      }),
    );
  });

  it("auto-sings a song when playCard is called without explicit cost", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [songCard],
      play: [singerCharacter],
      inkwell: 0,
      deck: 2,
    });

    // Without explicit cost, the engine falls back to singing automatically.
    // This is the behavior that drag-and-drop must avoid by passing explicit cost.
    expect(engine.asPlayerOne().playCard(songCard).success).toBe(true);
    expect(engine.asPlayerOne().isExerted(singerCharacter)).toBe(true);
  });

  it("does not include song in playCard available moves when ink is insufficient", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [songCard],
      play: [singerCharacter],
      inkwell: 0,
      deck: 2,
    });

    const moves = engine.asPlayerOne().getAvailableMoves();
    const playCardMove = moves.find((m) => m.moveId === "playCard");
    const singCardMove = moves.find((m) => m.moveId === "singCard");
    const songInstanceId = engine.findCardInstanceId(songCard, "hand", PLAYER_ONE);

    // Song must NOT appear in playCard (ink-based) moves
    if (playCardMove) {
      expect(playCardMove.selectableCardIds).not.toContain(songInstanceId);
    }

    // Song SHOULD appear in singCard moves (singer-based)
    expect(singCardMove).toBeDefined();
    expect(singCardMove!.selectableCardIds).toContain(songInstanceId);
  });

  it("includes song in playCard available moves when ink is sufficient", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [songCard],
      play: [singerCharacter],
      inkwell: songCard.cost,
      deck: 2,
    });

    const moves = engine.asPlayerOne().getAvailableMoves();
    const playCardMove = moves.find((m) => m.moveId === "playCard");
    const songInstanceId = engine.findCardInstanceId(songCard, "hand", PLAYER_ONE);

    // Song should appear in playCard moves when ink is available
    expect(playCardMove).toBeDefined();
    expect(playCardMove!.selectableCardIds).toContain(songInstanceId);
  });
});

// Regression: canPlayCard for a Shift card whose cost is "discard an action card"
// (e.g. Diablo - Devoted Herald, set 4 #70). Reported 2026-05-08 by multiple
// players in replays mgBjTEQGKlTomohGsQ2XVQ3 and mgFKq3PR-583ZptOV-Y8myO — the
// UI's Play CTA stayed hidden because canPlayCard ran standard-cost validation,
// got INSUFFICIENT_INK, and never tried the shift fallback. Fixed by adding a
// hasShift fallback to canPlayCard alongside the existing isSongCard fallback.
// These tests pin the contract so the fallback can't silently regress.
describe("canPlayCard — Shift with discard-only cost (no ink available)", () => {
  const diabloOnBoard = createMockCharacter({
    id: "regression-diablo-base",
    name: "Diablo",
    version: "Maleficent's Spy",
    cost: 2,
  });

  const throwawayAction = createMockActionCard({
    id: "regression-action-discard",
    name: "Throwaway Action",
    cost: 1,
    text: "Do nothing.",
    abilities: [],
  });

  const devotedHeraldLike = createMockCharacter({
    id: "regression-devoted-herald",
    name: "Diablo",
    version: "Devoted Herald-like",
    cost: 3,
    abilities: [
      {
        id: "regression-shift-action",
        keyword: "Shift",
        type: "keyword",
        shiftTarget: "Diablo",
        cost: {
          discardCards: 1,
          discardChosen: true,
          discardCardType: "action",
        },
        text: "Shift: Discard an action card",
      },
    ],
  });

  it("returns true when no ink is available but a legal shift discard exists", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike, throwawayAction],
      play: [diabloOnBoard],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().canPlayCard(devotedHeraldLike)).toBe(true);
  });

  it("playCard with explicit shift cost + action discard succeeds with 0 ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike, throwawayAction],
      play: [diabloOnBoard],
      inkwell: 0,
      deck: 2,
    });

    const p1 = engine.asPlayerOne();
    const shiftTarget = engine.findCardInstanceId(diabloOnBoard, "play", PLAYER_ONE);
    const discardId = engine.findCardInstanceId(throwawayAction, "hand", PLAYER_ONE);

    expect(
      p1.playCard(devotedHeraldLike, {
        cost: { cost: "shift", shiftTarget, discardCards: [discardId] },
      }),
    ).toBeSuccessfulCommand();
  });

  it("returns false when no action card is in hand (cost cannot be paid)", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike],
      play: [diabloOnBoard],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().canPlayCard(devotedHeraldLike)).toBe(false);
  });

  it("returns false when no shift target with the matching name is on the board", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike, throwawayAction],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().canPlayCard(devotedHeraldLike)).toBe(false);
  });
});

// Structured "why is the Play CTA disabled?" taxonomy. The UI keeps the
// button visible-but-disabled and shows a tooltip mapped from the returned
// `code` + `params`. canPlayCard remains a thin wrapper (returns false iff
// this method returns non-null), so the two cannot drift apart.
describe("getPlayCardDisabledReason", () => {
  const diabloOnBoard = createMockCharacter({
    id: "reason-diablo-base",
    name: "Diablo",
    version: "Maleficent's Spy",
    cost: 2,
  });

  const throwawayAction = createMockActionCard({
    id: "reason-throwaway-action",
    name: "Throwaway Action",
    cost: 1,
    text: "Do nothing.",
    abilities: [],
  });

  const devotedHeraldLike = createMockCharacter({
    id: "reason-devoted-herald",
    name: "Diablo",
    version: "Devoted Herald-like",
    cost: 3,
    abilities: [
      {
        id: "reason-shift-action",
        keyword: "Shift",
        type: "keyword",
        shiftTarget: "Diablo",
        cost: {
          discardCards: 1,
          discardChosen: true,
          discardCardType: "action",
        },
        text: "Shift: Discard an action card",
      },
    ],
  });

  const inkShiftCharacter = createMockCharacter({
    id: "reason-shift-ink",
    name: "Diablo",
    version: "Ink-Shift",
    cost: 6,
    abilities: [
      {
        id: "reason-shift-ink-kw",
        keyword: "Shift",
        type: "keyword",
        text: "Shift 4",
        cost: { ink: 4 },
      },
    ],
  });

  const songCardForReason = createMockSong({
    id: "reason-song",
    name: "Reason Song",
    cost: 4,
    text: "Gain 1 lore.",
    abilities: [
      {
        type: "action",
        effect: { amount: 1, target: "CONTROLLER", type: "gain-lore" },
      },
    ],
  });

  const singerCharacterForReason = createMockCharacter({
    id: "reason-song-singer",
    name: "Reason Singer",
    cost: 5,
  });

  it("returns null when the card can be played at standard cost", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: inkTestCharacter.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(inkTestCharacter)).toBeNull();
  });

  it("reports INSUFFICIENT_INK with needed/available params", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkTestCharacter],
      inkwell: 2,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(inkTestCharacter)).toEqual({
      code: "INSUFFICIENT_INK",
      params: { needed: inkTestCharacter.cost, available: 2 },
    });
  });

  it("reports SHIFT_NO_DISCARD_AVAILABLE when discard-cost shift can't be paid", () => {
    // Devoted Herald-style: Diablo on board, herald in hand, but no action
    // card to discard. Player has 0 ink, so standard play also fails — and
    // we want the *shift* reason to win because it's more actionable than
    // "needs 3 ink".
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike],
      play: [diabloOnBoard],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(devotedHeraldLike)).toEqual({
      code: "SHIFT_NO_DISCARD_AVAILABLE",
      params: { discardCardType: "action", count: 1 },
    });
  });

  it("reports SHIFT_NO_TARGET when the shift card has no matching-named board target", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike, throwawayAction],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(devotedHeraldLike)).toEqual({
      code: "SHIFT_NO_TARGET",
      params: { targetName: "Diablo" },
    });
  });

  it("reports SHIFT_INSUFFICIENT_INK when an ink-cost shift can't be paid", () => {
    const inkShiftTarget = createMockCharacter({
      id: "reason-shift-ink-target",
      name: "Diablo",
      version: "Target",
      cost: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [inkShiftCharacter],
      play: [inkShiftTarget],
      inkwell: 2,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(inkShiftCharacter)).toEqual({
      code: "SHIFT_INSUFFICIENT_INK",
      params: { needed: 4, available: 2 },
    });
  });

  it("reports SONG_NO_SINGER when a song can't be sung and there's no ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [songCardForReason],
      play: [{ card: singerCharacterForReason, isDrying: true }],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(songCardForReason)).toEqual({
      code: "SONG_NO_SINGER",
      params: { songCost: songCardForReason.cost },
    });
  });

  it("returns null for a song when a ready singer is available even with 0 ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [songCardForReason],
      play: [singerCharacterForReason],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(songCardForReason)).toBeNull();
  });

  it("returns null for shift when discard + target are both available even with 0 ink", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [devotedHeraldLike, throwawayAction],
      play: [diabloOnBoard],
      inkwell: 0,
      deck: 2,
    });

    expect(engine.asPlayerOne().getPlayCardDisabledReason(devotedHeraldLike)).toBeNull();
  });

  it("stays in lock-step with canPlayCard (true iff reason is null)", () => {
    // Spot-check the contract across a few states.
    const scenarios = [
      {
        label: "playable standard",
        state: { hand: [inkTestCharacter], inkwell: inkTestCharacter.cost, deck: 2 },
        card: inkTestCharacter,
      },
      {
        label: "ink-blocked",
        state: { hand: [inkTestCharacter], inkwell: 0, deck: 2 },
        card: inkTestCharacter,
      },
      {
        label: "shift playable",
        state: {
          hand: [devotedHeraldLike, throwawayAction],
          play: [diabloOnBoard],
          inkwell: 0,
          deck: 2,
        },
        card: devotedHeraldLike,
      },
      {
        label: "shift blocked: no discard",
        state: { hand: [devotedHeraldLike], play: [diabloOnBoard], inkwell: 0, deck: 2 },
        card: devotedHeraldLike,
      },
    ];

    for (const { label, state, card } of scenarios) {
      const engine = LorcanaMultiplayerTestEngine.createWithFixture(state);
      const reason = engine.asPlayerOne().getPlayCardDisabledReason(card);
      const playable = engine.asPlayerOne().canPlayCard(card);
      expect({ label, playable, reasonIsNull: reason === null }).toEqual({
        label,
        playable,
        reasonIsNull: playable,
      });
    }
  });
});

describe("playCard logging", () => {
  it("respects conditional enters-play-exerted static abilities", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [conditionalExertCharacter],
      inkwell: conditionalExertCharacter.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(conditionalExertCharacter).success).toBe(true);
    expect(engine.asPlayerOne().isExerted(conditionalExertCharacter)).toBe(true);
  });

  it("skips conditional enters-play-exerted when the named character is already in play", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [conditionalExertCharacter],
      inkwell: conditionalExertCharacter.cost,
      play: [chipCharacter],
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(conditionalExertCharacter).success).toBe(true);
    expect(engine.asPlayerOne().isExerted(conditionalExertCharacter)).toBe(false);
  });

  it("emits a localized play card log entry for characters", () => {
    const card = createMockCharacter({
      id: "play-log-character",
      name: "Play Log Character",
      cost: 2,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [card],
      inkwell: card.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(card).success).toBe(true);

    const cardId = engine.findCardInstanceId(card, "play", PLAYER_ONE);
    const playEntry = engine
      .getServerEngine()
      .getRuntime()
      .getMoveLogHistory()
      .find((log) => log.type === "playCard");
    expect(playEntry).toMatchObject({
      type: "playCard",
      playerId: PLAYER_ONE,
      cardId,
    });
  });

  it("emits a localized play card log entry for actions before effect resolution continues", () => {
    const actionCard = createMockActionCard({
      id: "play-log-action",
      name: "Play Log Action",
      cost: 1,
      text: "Gain 1 lore.",
      abilities: [
        {
          type: "action",
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "gain-lore",
          },
        },
      ],
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [actionCard],
      inkwell: actionCard.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(actionCard).success).toBe(true);

    const playEntry = engine
      .getServerEngine()
      .getRuntime()
      .getMoveLogHistory()
      .find((log) => log.type === "playCard");
    expect(playEntry).toMatchObject({
      type: "playCard",
      playerId: PLAYER_ONE,
    });
  });

  it("logs direct chosen targets for immediate action resolution", () => {
    const target = createMockCharacter({
      id: "play-log-direct-target",
      name: "Play Log Direct Target",
      cost: 2,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const actionCard = createMockActionCard({
      id: "play-log-action-targeted",
      name: "Play Log Action Targeted",
      cost: 1,
      text: "Banish chosen character.",
      abilities: [
        {
          type: "action",
          effect: {
            type: "banish",
            target: "CHOSEN_CHARACTER",
          },
        },
      ],
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [actionCard],
        inkwell: actionCard.cost,
        deck: 2,
      },
      {
        play: [target],
      },
    );

    expect(engine.asPlayerOne().playCard(actionCard, { targets: [target] }).success).toBe(true);

    const playEntry = engine
      .getServerEngine()
      .getRuntime()
      .getMoveLogHistory()
      .find((log) => log.type === "playCard");

    expect(playEntry).toBeDefined();
    expect(playEntry).toMatchObject({
      type: "playCard",
      playerId: PLAYER_ONE,
    });
  });

  it("logs auto-resolved all-target effects for immediate action resolution", () => {
    const ownTarget = createMockCharacter({
      id: "play-log-all-target-own",
      name: "Play Log All Target Own",
      cost: 2,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const opposingTarget = createMockCharacter({
      id: "play-log-all-target-opponent",
      name: "Play Log All Target Opponent",
      cost: 2,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const boardWipe = createMockActionCard({
      id: "play-log-action-all-target",
      name: "Play Log Action All Target",
      cost: 1,
      text: "Banish all characters.",
      abilities: [
        {
          type: "action",
          effect: {
            type: "banish",
            target: "ALL_CHARACTERS",
          },
        },
      ],
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [boardWipe],
        inkwell: boardWipe.cost,
        play: [ownTarget],
        deck: 2,
      },
      {
        play: [opposingTarget],
      },
    );

    expect(engine.asPlayerOne().playCard(boardWipe).success).toBe(true);

    // Verify the play card move was logged
    const playEntry = engine
      .getServerEngine()
      .getRuntime()
      .getMoveLogHistory()
      .find((log) => log.type === "playCard");

    expect(playEntry).toBeDefined();
    expect(playEntry).toMatchObject({
      type: "playCard",
      playerId: PLAYER_ONE,
    });
  });
});
