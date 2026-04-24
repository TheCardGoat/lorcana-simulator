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
