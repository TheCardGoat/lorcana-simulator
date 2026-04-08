import { describe, expect, it } from "bun:test";

import {
  LorcanaMultiplayerTestEngine,
  createMockAction,
  createMockCharacter,
  createMockSong,
} from "./testing";

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

const singerFive = createMockCharacter({
  id: "am-singer-five",
  name: "Singer Five",
  cost: 3,
  abilities: [
    {
      id: "am-singer-five-kw",
      keyword: "Singer",
      text: "Singer 5",
      type: "keyword",
      value: 5,
    },
  ],
});

const helperSinger = createMockCharacter({
  id: "am-helper-singer",
  name: "Helper Singer",
  cost: 3,
});

const voicelessSinger = createMockCharacter({
  id: "am-voiceless-singer",
  name: "Voiceless Singer",
  cost: 4,
  abilities: [
    {
      id: "am-voiceless-singer-static",
      name: "VOICELESS",
      text: "VOICELESS This character can't {E} to sing songs.",
      type: "static",
      effect: {
        type: "restriction",
        restriction: "cant-sing",
        target: "SELF",
      },
    },
  ],
});

const singTogetherSong = createMockSong({
  id: "am-sing-together-song",
  name: "Big Chorus",
  cost: 8,
  text: "Sing Together 8. Draw a card.",
  abilities: [
    {
      id: "am-sing-together-song-kw",
      keyword: "SingTogether",
      text: "Sing Together 8",
      type: "keyword",
      value: 8,
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

  it("reuses cached challenge availability for repeated calls in the same state", () => {
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
    const p1Internals = p1 as unknown as {
      _cachedChallengeAttackersStateID: number;
      getStateID(): number;
    };
    const firstMoves = p1.getAvailableMoves();
    const secondMoves = p1.getAvailableMoves();

    expect(secondMoves).toBe(firstMoves);
    expect(p1Internals._cachedChallengeAttackersStateID).toBe(p1Internals.getStateID());
    expect(
      secondMoves.find((move: (typeof secondMoves)[number]) => move.moveId === "challenge")
        ?.selectableCardIds,
    ).toEqual(
      firstMoves.find((move: (typeof firstMoves)[number]) => move.moveId === "challenge")
        ?.selectableCardIds,
    );
  });

  it("reuses cached legal move ids when enumerateMoves is called after getAvailableMoves", () => {
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
    const underlyingEngine = p1.engine as unknown as {
      enumerateMoves(): string[];
    };
    const originalEnumerateMoves = underlyingEngine.enumerateMoves.bind(underlyingEngine);
    let enumerateMoveCalls = 0;
    underlyingEngine.enumerateMoves = () => {
      enumerateMoveCalls += 1;
      return originalEnumerateMoves();
    };

    try {
      p1.getAvailableMoves();
      const legalMoves = p1.enumerateMoves();

      expect(enumerateMoveCalls).toBe(1);
      expect(legalMoves).toContain("challenge");
    } finally {
      underlyingEngine.enumerateMoves = originalEnumerateMoves;
    }
  });

  it("reuses runtime enumeration results for repeated same-state calls", () => {
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

    const clientEngine = testEngine.asPlayerOne().engine as unknown as {
      runtime: {
        enumerateMovesForPlayer(playerId: string, actorRole: string): string[];
      };
      getPlayerId(): string;
    };
    const playerId = clientEngine.getPlayerId();
    const firstMoves = clientEngine.runtime.enumerateMovesForPlayer(playerId, "player");
    const secondMoves = clientEngine.runtime.enumerateMovesForPlayer(playerId, "player");

    expect(secondMoves).toBe(firstMoves);
    expect(secondMoves).toEqual(firstMoves);
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

  it("returns singCard when a song is only playable via Sing Together", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [singTogetherSong],
        play: [singerFive, helperSinger],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const singMove = moves.find((move) => move.moveId === "singCard");

    expect(singMove).toBeDefined();
    expect(singMove?.selectableCardIds).toEqual([
      testEngine.findCardInstanceId(singTogetherSong, "hand", "player_one"),
    ]);
  });

  // Regression tests for THE-879/THE-895: alternative cost checks (sing/shift) were dead code
  // due to `!isHandCard || !isLimboCardWithPermission` always being true.
  // The bug caused `available()` to skip all alternative cost checks, so playCard was
  // reported as unavailable even when sing/shift could be used.
  it("returns singCard when a song is in hand with no ink but a ready singer in play", () => {
    const song = createMockSong({
      id: "am-regression-sing-song",
      name: "Regression Sing Song",
      cost: 5,
      text: "Draw a card.",
    });
    const singer = createMockCharacter({
      id: "am-regression-sing-singer",
      name: "Regression Singer",
      cost: 3,
      abilities: [
        {
          id: "am-regression-sing-singer-kw",
          keyword: "Singer",
          text: "Singer 5",
          type: "keyword",
          value: 5,
        },
      ],
    });

    // Player has 0 ink (cannot play song via standard) but has a ready Singer 5 in play
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [song],
        play: [singer],
        inkwell: 0,
        deck: 1,
      },
      { deck: 1 },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const singMove = moves.find((m) => m.moveId === "singCard");

    // Song should appear in singCard (regression: was missing because alternative cost check was dead code)
    expect(singMove).toBeDefined();
    expect(singMove?.selectableCardIds).toContain(
      testEngine.findCardInstanceId(song, "hand", "player_one"),
    );
  });

  it("returns shiftCard when a card is shiftable with less ink than standard cost", () => {
    // Shiftable character: cost 6, Shift 4 (shift into same name)
    const shiftableCharacter = createMockCharacter({
      id: "am-regression-shift-stitch-rs",
      name: "Stitch",
      version: "Rock Star",
      cost: 6,
      strength: 3,
      willpower: 5,
      lore: 3,
      classifications: ["Floodborn", "Hero", "Alien"],
      abilities: [
        {
          cost: { ink: 4 },
          id: "am-regression-shift-stitch-rs-kw",
          keyword: "Shift",
          text: "Shift 4 {I}",
          type: "keyword",
        },
      ],
    });
    const shiftTarget = createMockCharacter({
      id: "am-regression-shift-stitch-base",
      name: "Stitch",
      version: "Carefree Surfer",
      cost: 3,
      strength: 2,
      willpower: 3,
      lore: 1,
      classifications: ["Storyborn", "Hero", "Alien"],
    });

    // Player has 4 ink (enough for Shift 4 but not for standard cost 6)
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [shiftableCharacter],
        play: [shiftTarget],
        inkwell: 4,
        deck: 1,
      },
      { deck: 1 },
    );

    const moves = testEngine.asPlayerOne().getAvailableMoves();
    const shiftMove = moves.find((m) => m.moveId === "shiftCard");

    // Shift should appear in shiftCard (regression: was missing because alternative cost check was dead code)
    expect(shiftMove).toBeDefined();
    expect(shiftMove?.selectableCardIds).toContain(
      testEngine.findCardInstanceId(shiftableCharacter, "hand", "player_one"),
    );
  });

  it("blocks playing a second card when ink is exhausted after paying for the first", () => {
    const threeDropA = createMockCharacter({
      id: "am-three-drop-a",
      name: "Three Drop A",
      cost: 3,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const threeDropB = createMockCharacter({
      id: "am-three-drop-b",
      name: "Three Drop B",
      cost: 3,
      strength: 2,
      willpower: 3,
      lore: 1,
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [threeDropA, threeDropB],
        deck: 1,
        inkwell: 4,
      },
      {
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();

    // Player should be able to play one 3-cost card with 4 ink
    const movesBeforePlay = p1.getAvailableMoves();
    const playMoveBefore = movesBeforePlay.find((m) => m.moveId === "playCard");
    expect(playMoveBefore).toBeDefined();

    // Play the first card
    const cardAId = testEngine.findCardInstanceId(threeDropA, "hand", "player_one");
    p1.playCard(cardAId);

    // After playing a 3-cost card with 4 ink, only 1 ink remains
    // The second 3-cost card should not be playable
    const movesAfterPlay = p1.getAvailableMoves();
    const playMoveAfter = movesAfterPlay.find((m) => m.moveId === "playCard");
    const secondCardId = testEngine.findCardInstanceId(threeDropB, "hand", "player_one");

    if (playMoveAfter) {
      expect(playMoveAfter.selectableCardIds).not.toContain(secondCardId);
    }
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

  it("reuses cached challenge move options for the same attacker in the same state", () => {
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
    const attackerId = p1.getAvailableMoves().find((m) => m.moveId === "challenge")!
      .selectableCardIds[0];
    const firstOptions = p1.getMoveOptions("challenge", attackerId);
    const secondOptions = p1.getMoveOptions("challenge", attackerId);

    expect(secondOptions).toBe(firstOptions);
    expect(secondOptions).toEqual(firstOptions);
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

  it("returns a Sing Together option with only eligible singers", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [singTogetherSong],
        play: [
          singerFive,
          helperSinger,
          { card: questableCharacter, exerted: true },
          { card: freshCharacter, isDrying: true },
          voicelessSinger,
        ],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const songId = testEngine.findCardInstanceId(singTogetherSong, "hand", "player_one");
    const singerFiveId = testEngine.findCardInstanceId(singerFive, "play", "player_one");
    const helperSingerId = testEngine.findCardInstanceId(helperSinger, "play", "player_one");

    const options = p1.getMoveOptions("singCard", songId);

    expect(options).toEqual([
      {
        kind: "singTogether",
        requiredTotal: 8,
        singers: [
          { cardId: singerFiveId, value: 5 },
          { cardId: helperSingerId, value: 3 },
        ],
      },
    ]);
  });

  it("keeps singCard options limited to single singers for songs without Sing Together", () => {
    const simpleSong = createMockSong({
      id: "am-simple-song",
      name: "Simple Song",
      cost: 5,
      text: "Draw a card.",
    });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [simpleSong],
        play: [singerFive, helperSinger],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    const p1 = testEngine.asPlayerOne();
    const songId = testEngine.findCardInstanceId(simpleSong, "hand", "player_one");
    const singerFiveId = testEngine.findCardInstanceId(singerFive, "play", "player_one");

    expect(p1.getMoveOptions("singCard", songId)).toEqual([{ kind: "card", cardId: singerFiveId }]);
  });
});
