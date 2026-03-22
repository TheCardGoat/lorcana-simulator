import { describe, expect, it } from "bun:test";

import { LorcanaMultiplayerTestEngine, createMockAction, createMockCharacter } from "./testing";

const questableCharacter = createMockCharacter({
  id: "am-questable",
  name: "Questable Character",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
});

const freshCharacter = createMockCharacter({
  id: "am-fresh",
  name: "Fresh Character",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

const opponentCharacter = createMockCharacter({
  id: "am-opponent",
  name: "Opponent Character",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const handCharacter = createMockCharacter({
  id: "am-hand",
  name: "Hand Character",
  cost: 2,
  strength: 1,
  willpower: 2,
  lore: 1,
});

const evasiveDefender = createMockCharacter({
  id: "am-evasive-defender",
  name: "Evasive Defender",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
  abilities: [
    {
      id: "am-evasive-defender-kw",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
  ],
});

const evasiveAttacker = createMockCharacter({
  id: "am-evasive-attacker",
  name: "Evasive Attacker",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 1,
  abilities: [
    {
      id: "am-evasive-attacker-kw",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
  ],
});

const nonEvasiveAttacker = createMockCharacter({
  id: "am-non-evasive-attacker",
  name: "Non-Evasive Attacker",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const targetedAction = createMockAction({
  id: "am-targeted-action",
  name: "Targeted Action",
  cost: 2,
  text: "Deal 3 damage to chosen character.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "deal-damage",
        amount: 3,
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
});

const playerTargetAction = createMockAction({
  id: "am-player-target-action",
  name: "Player Target Action",
  cost: 2,
  text: "Chosen player gains 1 lore.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "gain-lore",
        amount: 1,
        target: "CHOSEN_PLAYER",
      },
    },
  ],
});

const multiTargetAction = createMockAction({
  id: "am-multi-target-action",
  name: "Multi Target Action",
  cost: 2,
  text: "Exert 2 chosen opposing characters.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "exert",
        target: {
          selector: "chosen",
          count: 2,
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
});

const wardedOpponent = createMockCharacter({
  id: "am-warded-opponent",
  name: "Warded Opponent",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  abilities: [
    {
      id: "am-warded-opponent-ward",
      keyword: "Ward",
      text: "Ward",
      type: "keyword",
    },
  ],
});

describe("LorcanaEngineBase.getAvailableMoves", () => {
  it("returns quest move with questable characters in play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [questableCharacter],
        deck: 1,
        inkwell: 3,
      },
      {
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const questMove = moves.find((m) => m.moveId === "quest");

    expect(questMove).toBeDefined();
    expect(questMove!.selectableCardIds.length).toBe(1);
  });

  it("does not return quest for fresh (drying) characters", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: freshCharacter, isDrying: true }],
        deck: 1,
        inkwell: 3,
      },
      {
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const questMove = moves.find((m) => m.moveId === "quest");

    expect(questMove).toBeUndefined();
  });

  it("returns challenge move with valid attackers", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [questableCharacter],
        deck: 1,
        inkwell: 3,
      },
      {
        play: [{ card: opponentCharacter, exerted: true }],
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const challengeMove = moves.find((m) => m.moveId === "challenge");

    expect(challengeMove).toBeDefined();
    expect(challengeMove!.selectableCardIds.length).toBe(1);
  });

  it("returns putCardIntoInkwell for inkable hand cards", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [handCharacter],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const inkMove = moves.find((m) => m.moveId === "putCardIntoInkwell");

    expect(inkMove).toBeDefined();
    expect(inkMove!.selectableCardIds.length).toBe(1);
  });

  it("excludes non-Evasive attacker when only Evasive defenders exist", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [nonEvasiveAttacker],
        deck: 1,
        inkwell: 3,
      },
      {
        play: [{ card: evasiveDefender, exerted: true }],
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const challengeMove = moves.find((m) => m.moveId === "challenge");

    // Non-Evasive attacker should not be able to challenge an Evasive defender
    expect(challengeMove).toBeUndefined();
  });

  it("includes Evasive attacker when Evasive defenders exist", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [evasiveAttacker],
        deck: 1,
        inkwell: 3,
      },
      {
        play: [{ card: evasiveDefender, exerted: true }],
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const challengeMove = moves.find((m) => m.moveId === "challenge");

    // Evasive attacker should be able to challenge an Evasive defender
    expect(challengeMove).toBeDefined();
    expect(challengeMove!.selectableCardIds.length).toBe(1);
  });

  it("returns passTurn when available", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
        inkwell: 3,
      },
      {
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const passTurnMove = moves.find((m) => m.moveId === "passTurn");

    expect(passTurnMove).toBeDefined();
    expect(passTurnMove!.selectableCardIds).toEqual([]);
  });
});

describe("LorcanaEngineBase.getMoveOptions", () => {
  it("returns valid defenders for challenge", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [questableCharacter],
        deck: 1,
        inkwell: 3,
      },
      {
        play: [{ card: opponentCharacter, exerted: true }],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const challengeMove = p1.getAvailableMoves().find((m) => m.moveId === "challenge");
    expect(challengeMove).toBeDefined();

    const attackerId = challengeMove!.selectableCardIds[0];
    const options = p1.getMoveOptions("challenge", attackerId);

    expect(options.length).toBe(1);
    expect(options[0].kind).toBe("card");
  });

  it("filters out Evasive defenders for non-Evasive attackers", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [nonEvasiveAttacker],
        deck: 1,
        inkwell: 3,
      },
      {
        play: [
          { card: opponentCharacter, exerted: true },
          { card: evasiveDefender, exerted: true },
        ],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const challengeMove = p1.getAvailableMoves().find((m) => m.moveId === "challenge");
    expect(challengeMove).toBeDefined();

    const attackerId = challengeMove!.selectableCardIds[0];
    const options = p1.getMoveOptions("challenge", attackerId);

    // Should only see the non-Evasive opponent, not the Evasive one
    expect(options.length).toBe(1);
  });

  it("returns valid board-card targets for single-target playCard actions", () => {
    const extraOpponent = createMockCharacter({
      id: "am-opponent-extra",
      name: "Opponent Extra",
      cost: 2,
      strength: 1,
      willpower: 2,
      lore: 1,
    });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [targetedAction],
        inkwell: targetedAction.cost,
        deck: 1,
      },
      {
        play: [opponentCharacter, extraOpponent],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const playMove = p1.getAvailableMoves().find((move) => move.moveId === "playCard");
    expect(playMove).toBeDefined();

    const options = p1.getMoveOptions("playCard", playMove!.selectableCardIds[0]);

    expect(options).toHaveLength(2);
    expect(options.every((option) => option.kind === "card")).toBe(true);
  });

  it("excludes illegal Ward targets from single-target playCard shortcuts", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [targetedAction],
        inkwell: targetedAction.cost,
        deck: 1,
      },
      {
        play: [opponentCharacter, wardedOpponent],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const playMove = p1.getAvailableMoves().find((move) => move.moveId === "playCard");
    expect(playMove).toBeDefined();

    const options = p1.getMoveOptions("playCard", playMove!.selectableCardIds[0]);

    expect(options).toHaveLength(1);
    expect(options[0]?.kind).toBe("card");
  });

  it("falls back to no playCard shortcut targets when none are legal", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [targetedAction],
        inkwell: targetedAction.cost,
        deck: 1,
      },
      {
        play: [wardedOpponent],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const playMove = p1.getAvailableMoves().find((move) => move.moveId === "playCard");
    expect(playMove).toBeDefined();

    const cardId = playMove!.selectableCardIds[0];
    expect(p1.getMoveOptions("playCard", cardId)).toEqual([]);
    expect(p1.hasTargetedPlayCardPreview(cardId)).toBe(true);
  });

  it("does not expose playCard shortcut targets for player-target actions", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [playerTargetAction],
        inkwell: playerTargetAction.cost,
        deck: 1,
      },
      {
        play: [opponentCharacter],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const playMove = p1.getAvailableMoves().find((move) => move.moveId === "playCard");
    expect(playMove).toBeDefined();

    expect(p1.getMoveOptions("playCard", playMove!.selectableCardIds[0])).toEqual([]);
  });

  it("does not expose playCard shortcut targets for multi-target actions", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [multiTargetAction],
        inkwell: multiTargetAction.cost,
        deck: 1,
      },
      {
        play: [opponentCharacter, wardedOpponent],
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const playMove = p1.getAvailableMoves().find((move) => move.moveId === "playCard");
    expect(playMove).toBeDefined();

    expect(p1.getMoveOptions("playCard", playMove!.selectableCardIds[0])).toEqual([]);
  });

  it("returns empty array for quest (no second selection)", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [questableCharacter],
        deck: 1,
        inkwell: 3,
      },
      {
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const questMove = p1.getAvailableMoves().find((m) => m.moveId === "quest");
    expect(questMove).toBeDefined();

    const cardId = questMove!.selectableCardIds[0];
    const options = p1.getMoveOptions("quest", cardId);

    expect(options).toEqual([]);
  });
});
