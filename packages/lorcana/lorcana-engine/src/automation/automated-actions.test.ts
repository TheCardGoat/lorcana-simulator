import { describe, expect, it } from "bun:test";
import type { CardInstanceId } from "#core";
import type {
  ActionCard,
  ActivatedAbilityDefinition,
  Effect,
  ItemCard,
  LocationCard,
  LorcanaCardDefinition,
} from "@tcg/lorcana-types";
import { createCardI18n } from "../card-i18n";
import type {
  BagEffectEntry,
  CardPlayedPayload,
  LorcanaMatchState,
  PendingActionEffect,
} from "../types";
import type { AutomatedActionDecisionTrace } from "./types";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
  createMockSong,
} from "../testing";

import { resolveServerCurrentActor } from "./actor-resolution";
import { boardControlLoreRaceAutomatedActionStrategy } from "./default-strategy";
import { takeAutomatedActionWithAdapter } from "./planner";

function createMockActionCard(params: {
  id: string;
  name: string;
  cost: number;
  text: string;
  inkable?: boolean;
  abilities: ActionCard["abilities"];
}): ActionCard {
  return {
    id: params.id,
    canonicalId: `ci_${params.id}`,
    cardType: "action",
    name: params.name,
    cost: params.cost,
    inkType: ["amber"],
    inkable: params.inkable ?? true,
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
    cardNumber: 701,
  };
}

function createMockItem(params: {
  id: string;
  name: string;
  cost: number;
  abilities?: ItemCard["abilities"];
}): ItemCard {
  return {
    id: params.id,
    canonicalId: `ci_${params.id}`,
    cardType: "item",
    name: params.name,
    cost: params.cost,
    inkType: ["amber"],
    inkable: true,
    set: "TST",
    rarity: "common",
    abilities: params.abilities ?? [],
    i18n: createCardI18n(params.name),
    cardNumber: 702,
  };
}

function createMockLocation(params: {
  id: string;
  name: string;
  cost: number;
  willpower: number;
  moveCost?: number;
  lore?: number;
}): LocationCard {
  return {
    id: params.id,
    canonicalId: `ci_${params.id}`,
    cardType: "location",
    name: params.name,
    cost: params.cost,
    moveCost: params.moveCost ?? 1,
    willpower: params.willpower,
    lore: params.lore ?? 0,
    inkType: ["amber"],
    inkable: true,
    set: "TST",
    rarity: "common",
    abilities: [],
    i18n: createCardI18n(params.name),
    cardNumber: 703,
  };
}

function getCardPlayedPayload(args: {
  playerId: typeof PLAYER_ONE | typeof PLAYER_TWO;
  cardId: string;
  cardType: CardPlayedPayload["cardType"];
}): CardPlayedPayload {
  return {
    playerId: args.playerId,
    cardId: args.cardId as CardPlayedPayload["cardId"],
    cardType: args.cardType,
    costType: "standard",
  };
}

function getDefinitionByInstanceId(
  engine: LorcanaMultiplayerTestEngine,
  cardId: string,
): LorcanaCardDefinition | undefined {
  const definitionId = engine.asServer().staticResources.instances.get(cardId)?.definitionId;
  return definitionId ? engine.asServer().staticResources.cards.get(definitionId) : undefined;
}

function loadMutatedState(
  engine: LorcanaMultiplayerTestEngine,
  mutate: (state: LorcanaMatchState) => void,
): void {
  const state = structuredClone(engine.asServer().getState()) as LorcanaMatchState;
  mutate(state);
  engine.loadState(state);
}

function setPendingActionChoice(
  state: LorcanaMatchState,
  effectId: string,
  playerId: typeof PLAYER_ONE | typeof PLAYER_TWO,
): void {
  state.ctx.priority.pendingChoice = {
    type: "action-effect",
    playerID: playerId,
    requestID: effectId,
  };
}

function createQuestAdapter(args: {
  executionResults: Array<
    ReturnType<typeof createFailureResult> | ReturnType<typeof createSuccessResult>
  >;
  passTurnResult?: ReturnType<typeof createFailureResult> | ReturnType<typeof createSuccessResult>;
  concedeResult?: ReturnType<typeof createFailureResult> | ReturnType<typeof createSuccessResult>;
}) {
  const questers = [
    createMockCharacter({ id: "stub-quester-1", name: "Stub Quester 1", cost: 2, lore: 2 }),
    createMockCharacter({ id: "stub-quester-2", name: "Stub Quester 2", cost: 2, lore: 1 }),
    createMockCharacter({ id: "stub-quester-3", name: "Stub Quester 3", cost: 2, lore: 1 }),
  ];
  const engine = LorcanaMultiplayerTestEngine.createWithFixture({
    play: questers.map((card) => ({ card, isDrying: false })),
    deck: 1,
  });
  const player = engine.asPlayerOne();
  const board = player.getBoard();
  const state = engine.asServer().getState();
  let executionIndex = 0;

  return {
    actorId: PLAYER_ONE,
    availableMoveIds: ["quest"],
    board,
    concede: () => args.concedeResult ?? createFailureResult("Concede failed", "CONCEDE_FAILED"),
    createErrorResult: createFailureResult,
    executeCandidate: () => {
      const result =
        args.executionResults[executionIndex] ??
        createFailureResult("Unexpected execution", "UNEXPECTED_EXECUTION");
      executionIndex += 1;
      return result;
    },
    getDefinitionByInstanceId: (cardId: string) => getDefinitionByInstanceId(engine, cardId),
    passTurn: () => args.passTurnResult ?? createSuccessResult(),
    previewChallenge: () => null,
    state,
    staticResources: engine.asServer().staticResources,
    validateCandidate: () => ({ valid: true }),
  };
}

function createFailureResult(error: string, errorCode = "FAILED") {
  return {
    success: false as const,
    error,
    errorCode,
    currentStateID: 0,
  };
}

function createSuccessResult() {
  return {
    success: true as const,
    stateID: 0,
    state: structuredClone(
      LorcanaMultiplayerTestEngine.createWithFixture({ deck: 1 }, { deck: 1 })
        .asServer()
        .getState(),
    ) as LorcanaMatchState,
    patches: [],
    gameEvents: [],
    logEntries: [],
    processedCommand: {
      commandID: "test-command",
      move: "test-move",
    },
    animations: [],
    undoable: false,
  };
}

describe("automated actions", () => {
  it("ranks choose-first-player candidates to choose self first", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [createMockCharacter({ id: "pregame-hand", name: "Pregame Hand", cost: 2 })],
        deck: 1,
      },
      {
        deck: 1,
      },
      { skipPreGame: false },
    );

    const result = engine.asPlayerOne().enumerateAutomatedActions();

    expect(result.actorId).toBe(PLAYER_ONE);
    expect(result.candidates[0]).toMatchObject({
      family: "chooseWhoGoesFirst",
      firstPlayerId: PLAYER_ONE,
    });
  });

  it("builds keep-all, structural, and full mulligan candidates in deterministic order", () => {
    const keeperOne = createMockCharacter({ id: "keeper-one", name: "Keeper One", cost: 1 });
    const keeperTwo = createMockCharacter({ id: "keeper-two", name: "Keeper Two", cost: 2 });
    const expensiveInkable = createMockCharacter({
      id: "expensive-inkable",
      name: "Expensive Inkable",
      cost: 7,
    });
    const expensiveNonInkable = {
      ...createMockCharacter({
        id: "expensive-non-inkable",
        name: "Expensive Non-Inkable",
        cost: 6,
      }),
      inkable: false,
    };
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [keeperOne, keeperTwo, expensiveInkable, expensiveNonInkable],
        deck: 1,
      },
      {
        deck: 1,
      },
      { skipPreGame: false },
    );

    loadMutatedState(engine, (state) => {
      state.ctx.status.choosingFirstPlayer = undefined;
      state.ctx.status.pendingMulligan = [PLAYER_ONE, PLAYER_TWO];
      state.ctx.status.phase = "alterHand";
      state.ctx.status.step = "";
    });

    const mulliganCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "alterHand");

    expect(mulliganCandidates.map((candidate) => candidate.plan)).toEqual([
      "keep-all",
      "structural-mulligan",
      "full-mulligan",
    ]);
    expect(mulliganCandidates[1]).toMatchObject({
      family: "alterHand",
      cardsToMulligan: expect.arrayContaining([
        engine.asPlayerOne().getCard(expensiveInkable).id,
        engine.asPlayerOne().getCard(expensiveNonInkable).id,
      ]),
    });
  });

  it("enumerates resolveBag candidates from the active bag", () => {
    const source = createMockCharacter({ id: "bag-source", name: "Bag Source", cost: 2 });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: source, isDrying: false }],
      deck: 1,
    });
    const sourceId = engine.asPlayerOne().getCard(source).id as CardInstanceId;

    loadMutatedState(engine, (state) => {
      state.G.triggeredAbilities.bag.items = [
        {
          id: "bag:automation:1",
          type: "bag-effect",
          kind: "triggered-ability",
          abilityId: "bag-ability-1",
          abilityKey: "bag-ability-1",
          controllerId: PLAYER_ONE,
          chooserId: PLAYER_ONE,
          sourceId,
          cardPlayed: getCardPlayedPayload({
            playerId: PLAYER_ONE,
            cardId: sourceId,
            cardType: "character",
          }),
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "gain-lore",
          } satisfies Effect,
          occurrenceIndex: 0,
          resolutionInput: {},
        } satisfies BagEffectEntry,
      ];
    });

    const bagCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "resolveBag");

    expect(bagCandidates).toHaveLength(1);
    expect(bagCandidates[0]).toMatchObject({
      family: "resolveBag",
      bagId: "bag:automation:1",
    });
  });

  it("keeps a resolveBag candidate with empty targets when no valid candidates exist — effect fizzles", () => {
    const source = createMockCharacter({
      id: "bag-empty-source",
      name: "Bag Empty Source",
      cost: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: source, isDrying: false }],
      deck: 1,
    });
    const sourceId = engine.asPlayerOne().getCard(source).id as CardInstanceId;

    loadMutatedState(engine, (state) => {
      state.G.triggeredAbilities.bag.items = [
        {
          id: "bag:automation:empty-targets",
          type: "bag-effect",
          kind: "triggered-ability",
          abilityId: "bag-ability-empty-targets",
          abilityKey: "bag-ability-empty-targets",
          controllerId: PLAYER_ONE,
          chooserId: PLAYER_ONE,
          sourceId,
          cardPlayed: getCardPlayedPayload({
            playerId: PLAYER_ONE,
            cardId: sourceId,
            cardType: "character",
          }),
          effect: {
            type: "ready",
            target: "CHOSEN_EXERTED_CHARACTER",
          } satisfies Effect,
          occurrenceIndex: 0,
          resolutionInput: {},
        } satisfies BagEffectEntry,
      ];
    });

    const bagCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "resolveBag");

    // When no valid targets exist, the fizzle path is valid — automation enumerates an empty-target candidate
    expect(bagCandidates).toEqual([
      expect.objectContaining({
        family: "resolveBag",
        bagId: "bag:automation:empty-targets",
      }),
    ]);
  });

  it("enumerates resolveEffect candidates for optional pending effects", () => {
    const source = createMockCharacter({ id: "pending-source", name: "Pending Source", cost: 2 });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: source, isDrying: false }],
      deck: 2,
    });
    const sourceId = engine.asPlayerOne().getCard(source).id as CardInstanceId;

    loadMutatedState(engine, (state) => {
      state.G.pendingEffects = [
        {
          id: "pending:automation:1",
          type: "action-effect",
          kind: "optional-selection",
          sourceId,
          sourceCardId: sourceId,
          controllerId: PLAYER_ONE,
          chooserId: PLAYER_ONE,
          cardPlayed: getCardPlayedPayload({
            playerId: PLAYER_ONE,
            cardId: sourceId,
            cardType: "character",
          }),
          effect: {
            chooser: "CONTROLLER",
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            type: "optional",
          } satisfies Effect,
          resolutionInput: {},
        } satisfies PendingActionEffect,
      ];
      setPendingActionChoice(state, "pending:automation:1", PLAYER_ONE);
    });

    const resolveEffectCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "resolveEffect");

    expect(resolveEffectCandidates).toEqual([
      {
        family: "resolveEffect",
        effectId: "pending:automation:1",
        resolveOptional: false,
      },
      {
        family: "resolveEffect",
        effectId: "pending:automation:1",
        resolveOptional: true,
      },
    ]);
  });

  it("reports unsupported scry-selection pending effects without resolveEffect candidates", () => {
    const source = createMockCharacter({ id: "scry-source", name: "Scry Source", cost: 2 });
    const revealedOne = createMockCharacter({
      id: "revealed-one",
      name: "Revealed One",
      cost: 1,
    });
    const revealedTwo = createMockCharacter({
      id: "revealed-two",
      name: "Revealed Two",
      cost: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: source, isDrying: false }],
      deck: [revealedOne, revealedTwo],
    });
    const sourceId = engine.asPlayerOne().getCard(source).id as CardInstanceId;
    const revealedCardIds = [revealedOne, revealedTwo].map(
      (card) => engine.asPlayerOne().getCard(card).id as CardInstanceId,
    );

    loadMutatedState(engine, (state) => {
      state.G.pendingEffects = [
        {
          id: "pending:scry:1",
          type: "action-effect",
          kind: "scry-selection",
          sourceId,
          sourceCardId: sourceId,
          controllerId: PLAYER_ONE,
          chooserId: PLAYER_ONE,
          cardPlayed: getCardPlayedPayload({
            playerId: PLAYER_ONE,
            cardId: sourceId,
            cardType: "character",
          }),
          effect: {
            type: "scry",
            amount: 2,
          } satisfies Effect,
          resolutionInput: {},
          selectionContext: {
            amount: 2,
            chooserId: PLAYER_ONE,
            currentSelection: {},
            destinationRules: [
              {
                id: "hand",
                max: 1,
                min: 0,
                remainder: false,
                zone: "hand",
              },
              {
                id: "deck-bottom",
                max: null,
                min: 0,
                remainder: true,
                zone: "deck-bottom",
              },
            ],
            kind: "scry-selection",
            origin: "pending-effect",
            requestId: "pending:scry:1",
            revealedCardIds,
            sourceCardId: sourceId,
            submitField: "destinations",
          },
        } satisfies PendingActionEffect,
      ];
      setPendingActionChoice(state, "pending:scry:1", PLAYER_ONE);
    });

    const result = engine.asPlayerOne().enumerateAutomatedActions();

    expect(result.candidates.some((candidate) => candidate.family === "resolveEffect")).toBe(false);
    expect(result.unsupportedSkips).toContainEqual(
      expect.objectContaining({
        effectId: "pending:scry:1",
        family: "resolveEffect",
        kind: "unsupported-shape",
      }),
    );
  });

  it("emits overflow diagnostics when target pools exceed the search cap", () => {
    const source = createMockCharacter({
      id: "overflow-source",
      name: "Overflow Source",
      cost: 2,
      abilities: [
        {
          id: "overflow-source-ability",
          name: "READY TARGET",
          type: "activated",
          cost: {},
          effect: { type: "ready", target: "CHOSEN_CHARACTER" },
          text: "READY TARGET - Ready chosen character.",
        } satisfies ActivatedAbilityDefinition,
      ],
    });
    const extraTargets = Array.from({ length: 9 }, (_, index) =>
      createMockCharacter({
        id: `overflow-target-${index + 1}`,
        name: `Overflow Target ${index + 1}`,
        cost: 2,
      }),
    );
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        { card: source, isDrying: false },
        ...extraTargets.map((card) => ({ card, exerted: true, isDrying: false })),
      ],
      deck: 1,
    });

    const result = engine.asPlayerOne().enumerateAutomatedActions();

    expect(
      result.diagnostics.some(
        (diagnostic) =>
          diagnostic.kind === "overflow-skip" &&
          diagnostic.family === "activateAbility" &&
          diagnostic.cap === 8,
      ),
    ).toBe(true);
    expect(result.candidates.some((candidate) => candidate.family === "activateAbility")).toBe(
      false,
    );
  });

  it("ranks inkwell candidates by lower cost then lower lore", () => {
    const expensiveLowLore = createMockCharacter({
      id: "expensive-low-lore",
      name: "Expensive Low Lore",
      cost: 6,
      lore: 0,
    });
    const expensiveHighLore = createMockCharacter({
      id: "expensive-high-lore",
      name: "Expensive High Lore",
      cost: 6,
      lore: 2,
    });
    const cheapCard = createMockCharacter({
      id: "cheap-card",
      name: "Cheap Card",
      cost: 2,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [expensiveHighLore, cheapCard, expensiveLowLore],
      deck: 1,
    });

    const inkCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "putCardIntoInkwell");

    expect(inkCandidates.map((candidate) => candidate.cardId)).toEqual([
      engine.asPlayerOne().getCard(cheapCard).id,
      engine.asPlayerOne().getCard(expensiveLowLore).id,
      engine.asPlayerOne().getCard(expensiveHighLore).id,
    ]);
  });

  it("ranks play-card candidates by higher cost then higher lore", () => {
    const expensiveHighLore = createMockCharacter({
      id: "expensive-high-lore-play",
      name: "Expensive High Lore Play",
      cost: 6,
      lore: 2,
    });
    const expensiveLowLore = createMockCharacter({
      id: "expensive-low-lore-play",
      name: "Expensive Low Lore Play",
      cost: 6,
      lore: 0,
    });
    const cheapHighLore = createMockCharacter({
      id: "cheap-high-lore-play",
      name: "Cheap High Lore Play",
      cost: 2,
      lore: 3,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [cheapHighLore, expensiveLowLore, expensiveHighLore],
      inkwell: 6,
      deck: 1,
    });

    const playCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "playCard");

    expect(playCandidates.map((candidate) => candidate.cardId)).toEqual([
      engine.asPlayerOne().getCard(expensiveHighLore).id,
      engine.asPlayerOne().getCard(expensiveLowLore).id,
      engine.asPlayerOne().getCard(cheapHighLore).id,
    ]);
  });

  it("enumerates play-card cost modes including standard, shift, sing, and singTogether", () => {
    const shiftBase = createMockCharacter({
      id: "shift-base",
      name: "Shifting Hero",
      cost: 2,
    });
    const shiftCard = createMockCharacter({
      id: "shift-card",
      name: "Shifting Hero",
      cost: 6,
      abilities: [
        {
          id: "shift-card-keyword",
          type: "keyword",
          keyword: "Shift",
          cost: { ink: 2 },
          text: "Shift 2",
        },
      ],
    });
    const singerFive = createMockCharacter({ id: "singer-five", name: "Singer Five", cost: 5 });
    const singerThree = createMockCharacter({ id: "singer-three", name: "Singer Three", cost: 3 });
    const singerTwo = createMockCharacter({ id: "singer-two", name: "Singer Two", cost: 2 });
    const song = createMockSong({
      id: "automation-song",
      name: "Automation Song",
      cost: 5,
      text: "Sing Together 5. Draw a card.",
      abilities: [
        {
          id: "automation-song-sing-together",
          type: "keyword",
          keyword: "SingTogether",
          value: 5,
          text: "Sing Together 5",
        },
        {
          id: "automation-song-effect",
          type: "action",
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          text: "Draw a card.",
        },
      ],
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [shiftCard, song],
      inkwell: 6,
      play: [
        { card: shiftBase, isDrying: false },
        { card: singerFive, isDrying: false },
        { card: singerThree, isDrying: false },
        { card: singerTwo, isDrying: false },
      ],
      deck: 2,
    });

    const playCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "playCard");
    const shiftCardId = engine.asPlayerOne().getCard(shiftCard).id;
    const shiftBaseId = engine.asPlayerOne().getCard(shiftBase).id;
    const songId = engine.asPlayerOne().getCard(song).id;
    const singerFiveId = engine.asPlayerOne().getCard(singerFive).id;
    const singerThreeId = engine.asPlayerOne().getCard(singerThree).id;
    const singerTwoId = engine.asPlayerOne().getCard(singerTwo).id;

    expect(
      playCandidates.some(
        (candidate) =>
          candidate.family === "playCard" &&
          candidate.cardId === shiftCardId &&
          typeof candidate.cost === "object" &&
          candidate.cost.cost === "shift" &&
          candidate.cost.shiftTarget === shiftBaseId,
      ),
    ).toBe(true);
    expect(
      playCandidates.some(
        (candidate) =>
          candidate.family === "playCard" &&
          candidate.cardId === songId &&
          candidate.cost === "standard",
      ),
    ).toBe(true);
    expect(
      playCandidates.some(
        (candidate) =>
          candidate.family === "playCard" &&
          candidate.cardId === songId &&
          typeof candidate.cost === "object" &&
          candidate.cost.cost === "sing" &&
          candidate.cost.singer === singerFiveId,
      ),
    ).toBe(true);
    expect(
      playCandidates.some(
        (candidate) =>
          candidate.family === "playCard" &&
          candidate.cardId === songId &&
          typeof candidate.cost === "object" &&
          candidate.cost.cost === "singTogether" &&
          candidate.cost.singers.join(",") === [singerThreeId, singerTwoId].join(","),
      ),
    ).toBe(true);
  });

  it("enumerates activated abilities with concrete target selections", () => {
    const source = createMockCharacter({
      id: "ability-source",
      name: "Ability Source",
      cost: 2,
      abilities: [
        {
          id: "ready-target",
          name: "READY TARGET",
          type: "activated",
          cost: {},
          effect: { type: "ready", target: "CHOSEN_CHARACTER" },
          text: "READY TARGET - Ready chosen character.",
        } satisfies ActivatedAbilityDefinition,
      ],
    });
    const target = createMockCharacter({
      id: "ability-target",
      name: "Ability Target",
      cost: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [
        { card: source, isDrying: false },
        { card: target, exerted: true, isDrying: false },
      ],
      deck: 1,
    });

    const abilityCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "activateAbility");

    expect(abilityCandidates).toEqual([
      {
        family: "activateAbility",
        abilityIndex: 0,
        cardId: engine.asPlayerOne().getCard(source).id,
        targets: [engine.asPlayerOne().getCard(source).id],
      },
      {
        family: "activateAbility",
        abilityIndex: 0,
        cardId: engine.asPlayerOne().getCard(source).id,
        targets: [engine.asPlayerOne().getCard(target).id],
      },
    ]);
  });

  it("ranks challenge candidates by preview outcome and defender lore", () => {
    const attacker = createMockCharacter({
      id: "challenge-attacker",
      name: "Challenge Attacker",
      cost: 3,
      strength: 4,
      willpower: 5,
    });
    const highLoreDefender = createMockCharacter({
      id: "high-lore-defender",
      name: "High Lore Defender",
      cost: 2,
      strength: 2,
      willpower: 4,
      lore: 3,
    });
    const lowLoreDefender = createMockCharacter({
      id: "low-lore-defender",
      name: "Low Lore Defender",
      cost: 2,
      strength: 2,
      willpower: 4,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: attacker, isDrying: false }],
        deck: 1,
      },
      {
        play: [
          { card: highLoreDefender, exerted: true, isDrying: false },
          { card: lowLoreDefender, exerted: true, isDrying: false },
        ],
        deck: 1,
      },
    );

    const challengeCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "challenge");

    expect(challengeCandidates[0]).toMatchObject({
      family: "challenge",
      defenderId: engine.asPlayerTwo().getCard(highLoreDefender).id,
    });
  });

  it("enumerates move-to-location candidates", () => {
    const character = createMockCharacter({
      id: "location-mover",
      name: "Location Mover",
      cost: 2,
    });
    const location = createMockLocation({
      id: "automation-location",
      name: "Automation Location",
      cost: 2,
      willpower: 6,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: character, isDrying: false }, location],
      inkwell: 1,
      deck: 1,
    });

    const moveCandidates = engine
      .asPlayerOne()
      .enumerateAutomatedActions()
      .candidates.filter((candidate) => candidate.family === "moveCharacterToLocation");

    expect(moveCandidates).toEqual([
      {
        family: "moveCharacterToLocation",
        characterId: engine.asPlayerOne().getCard(character).id,
        locationId: engine.asPlayerOne().getCard(location).id,
      },
    ]);
  });

  it("resolves the current server actor from pending effects before priority", () => {
    const source = createMockCharacter({
      id: "server-pending-source",
      name: "Server Pending Source",
      cost: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
      },
      {
        play: [{ card: source, isDrying: false }],
        deck: 2,
      },
    );
    const sourceId = engine.asPlayerTwo().getCard(source).id as CardInstanceId;

    loadMutatedState(engine, (state) => {
      state.ctx.priority.holder = PLAYER_ONE;
      state.G.pendingEffects = [
        {
          id: "pending:server:1",
          type: "action-effect",
          kind: "optional-selection",
          sourceId,
          sourceCardId: sourceId,
          controllerId: PLAYER_TWO,
          chooserId: PLAYER_TWO,
          cardPlayed: getCardPlayedPayload({
            playerId: PLAYER_TWO,
            cardId: sourceId,
            cardType: "character",
          }),
          effect: {
            chooser: "CONTROLLER",
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            type: "optional",
          } satisfies Effect,
          resolutionInput: {},
        } satisfies PendingActionEffect,
      ];
      setPendingActionChoice(state, "pending:server:1", PLAYER_TWO);
    });

    const result = engine.asServer().enumerateAutomatedActionsForCurrentActor();

    expect(result.actorId).toBe(PLAYER_TWO);
    expect(result.diagnostics[0]).toMatchObject({
      kind: "actor-resolution",
      source: "pending-effect-chooser",
      actorId: PLAYER_TWO,
    });
    expect(result.candidates[0]).toMatchObject({
      family: "resolveEffect",
      effectId: "pending:server:1",
    });
  });

  it("takes automated actions through the player-one surface", () => {
    const quester = createMockCharacter({
      id: "player-one-quester",
      name: "Player One Quester",
      cost: 2,
      lore: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [{ card: quester, isDrying: false }],
      deck: 1,
    });

    const result = engine.asPlayerOne().takeAutomatedAction();

    expect(result.selectedCandidate).toMatchObject({
      family: "quest",
      cardId: engine.asPlayerOne().getCard(quester).id,
    });
    expect(result.finalResult.success).toBe(true);
    expect(engine.asPlayerOne().getLore(PLAYER_ONE)).toBe(2);
  });

  it("takes automated actions through the player-two surface", () => {
    const quester = createMockCharacter({
      id: "player-two-quester",
      name: "Player Two Quester",
      cost: 2,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
      },
      {
        play: [{ card: quester, isDrying: false }],
        deck: 1,
      },
    );

    loadMutatedState(engine, (state) => {
      state.ctx.priority.holder = PLAYER_TWO;
    });

    const result = engine.asPlayerTwo().takeAutomatedAction();

    expect(result.selectedCandidate).toMatchObject({
      family: "quest",
      cardId: engine.asPlayerTwo().getCard(quester).id,
    });
    expect(result.finalResult.success).toBe(true);
    expect(engine.asPlayerTwo().getLore(PLAYER_TWO)).toBe(1);
  });

  it("prefers challenging an exerted high-lore threat when behind on lore", () => {
    const attacker = createMockCharacter({
      id: "challenge-attacker",
      name: "Challenge Attacker",
      cost: 3,
      strength: 3,
      willpower: 3,
      lore: 1,
    });
    const defender = createMockCharacter({
      id: "challenge-defender",
      name: "Challenge Defender",
      cost: 3,
      strength: 2,
      willpower: 2,
      lore: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: attacker, isDrying: false }],
        deck: 1,
        lore: 10,
      },
      {
        play: [{ card: defender, exerted: true, isDrying: false }],
        deck: 1,
        lore: 14,
      },
    );

    loadMutatedState(engine, (state) => {
      state.ctx.priority.holder = PLAYER_ONE;
    });

    const result = engine.asPlayerOne().takeAutomatedAction();

    expect(result.selectedCandidate).toMatchObject({
      family: "challenge",
      attackerId: engine.asPlayerOne().getCard(attacker).id,
      defenderId: engine.asPlayerTwo().getCard(defender).id,
    });
    expect(result.finalResult.success).toBe(true);
  });

  it("still prefers questing when the available quest reaches 20 lore", () => {
    const lethalQuester = createMockCharacter({
      id: "lethal-quester",
      name: "Lethal Quester",
      cost: 3,
      strength: 3,
      willpower: 3,
      lore: 2,
    });
    const defender = createMockCharacter({
      id: "lethal-defense-target",
      name: "Lethal Defense Target",
      cost: 3,
      strength: 2,
      willpower: 2,
      lore: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [{ card: lethalQuester, isDrying: false }],
        deck: 1,
        lore: 18,
      },
      {
        play: [{ card: defender, exerted: true, isDrying: false }],
        deck: 1,
        lore: 19,
      },
    );

    loadMutatedState(engine, (state) => {
      state.ctx.priority.holder = PLAYER_ONE;
    });

    const result = engine.asPlayerOne().takeAutomatedAction();

    expect(result.selectedCandidate).toMatchObject({
      family: "quest",
      cardId: engine.asPlayerOne().getCard(lethalQuester).id,
    });
    expect(result.finalResult.success).toBe(true);
    expect(engine.asPlayerOne().getLore(PLAYER_ONE)).toBe(20);
  });

  it("lets board-control-lore-race challenge a lore threat before taking a smaller quest", () => {
    const quester = createMockCharacter({
      id: "board-control-quester",
      name: "Board Control Quester",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const challenger = createMockCharacter({
      id: "board-control-challenger",
      name: "Board Control Challenger",
      cost: 3,
      strength: 3,
      willpower: 3,
      lore: 0,
    });
    const defender = createMockCharacter({
      id: "board-control-defender",
      name: "Board Control Defender",
      cost: 3,
      strength: 1,
      willpower: 1,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [
          { card: quester, isDrying: false },
          { card: challenger, isDrying: false },
        ],
        deck: 1,
        lore: 8,
      },
      {
        play: [{ card: defender, exerted: true, isDrying: false }],
        deck: 1,
        lore: 8,
      },
    );

    loadMutatedState(engine, (state) => {
      state.ctx.priority.holder = PLAYER_ONE;
    });

    const baselineState = structuredClone(engine.asServer().getState()) as LorcanaMatchState;
    const defaultResult = engine.asPlayerOne().takeAutomatedAction();

    expect(defaultResult.selectedCandidate).toMatchObject({
      family: "quest",
      cardId: engine.asPlayerOne().getCard(quester).id,
    });

    engine.loadState(baselineState);

    const boardControlResult = engine.asPlayerOne().takeAutomatedAction({
      strategy: boardControlLoreRaceAutomatedActionStrategy,
    });

    expect(boardControlResult.selectedCandidate).toMatchObject({
      family: "challenge",
      attackerId: engine.asPlayerOne().getCard(challenger).id,
      defenderId: engine.asPlayerTwo().getCard(defender).id,
    });
    expect(boardControlResult.finalResult.success).toBe(true);
  });

  it("lets board-control-lore-race spend available ink on a simple permanent play", () => {
    const efficientPermanent = createMockCharacter({
      id: "board-control-efficient-permanent",
      name: "Board Control Permanent",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const expensiveInkCard = createMockCharacter({
      id: "board-control-expensive-ink-card",
      name: "Board Control Expensive Ink Card",
      cost: 6,
      strength: 3,
      willpower: 5,
      lore: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [efficientPermanent, expensiveInkCard],
      inkwell: 2,
      deck: 1,
    });

    const result = engine.asPlayerOne().takeAutomatedAction({
      strategy: boardControlLoreRaceAutomatedActionStrategy,
    });

    expect(result.selectedCandidate).toMatchObject({
      family: "playCard",
      cardId: engine.asPlayerOne().getCard(efficientPermanent).id,
    });
    expect(result.finalResult.success).toBe(true);
  });

  it("takes automated actions through the server current-actor surface", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
      },
      {
        deck: 1,
      },
      { skipPreGame: false },
    );

    const result = engine.asServer().takeAutomatedActionForCurrentActor();

    expect(result.selectedCandidate).toMatchObject({
      family: "chooseWhoGoesFirst",
      firstPlayerId: PLAYER_ONE,
    });
    expect(result.finalResult.success).toBe(true);
  });

  it("emits ordered candidate heuristics, selection, and execution attempts to the trace sink", () => {
    const adapter = createQuestAdapter({
      executionResults: [
        createFailureResult("First quest failed", "FIRST_FAILURE"),
        createSuccessResult(),
      ],
    });
    const traces: ReturnType<typeof takeAutomatedActionWithAdapter>["executionAttempts"] = [];
    const decisionTraces: AutomatedActionDecisionTrace[] = [];

    const result = takeAutomatedActionWithAdapter(
      adapter,
      {
        traceSink: {
          push(trace) {
            decisionTraces.push(trace);
          },
        },
      },
      [
        {
          kind: "actor-resolution",
          source: "scoped-player",
          actorId: PLAYER_ONE,
          reason: "Resolved trace test actor",
        },
      ],
    );

    traces.push(...result.executionAttempts);

    expect(traces).toHaveLength(2);
    expect(decisionTraces).toHaveLength(1);
    expect(decisionTraces[0]?.orderedCandidates[0]?.heuristics).toContainEqual({
      direction: "asc",
      key: "familyOrder",
      value: 4,
    });
    expect(decisionTraces[0]?.orderedCandidates[0]?.heuristics).toContainEqual({
      direction: "desc",
      key: "printedLore",
      value: 2,
    });
    expect(decisionTraces[0]?.selectedCandidate).toMatchObject({
      family: "quest",
    });
    expect(decisionTraces[0]?.executionAttempts).toEqual([
      expect.objectContaining({
        errorCode: "FIRST_FAILURE",
        success: false,
      }),
      expect.objectContaining({
        success: true,
      }),
    ]);
    expect(decisionTraces[0]?.diagnostics).toContainEqual(
      expect.objectContaining({
        kind: "actor-resolution",
      }),
    );
  });

  it("emits fallback decisions to the trace sink when no candidate succeeds", () => {
    const decisionTraces: Array<{
      fallbackTaken?: string;
      selectedCandidate?: { family: string };
    }> = [];

    takeAutomatedActionWithAdapter(
      createQuestAdapter({
        executionResults: [
          createFailureResult("Quest failed", "FAIL_ONE"),
          createFailureResult("Quest failed", "FAIL_TWO"),
          createFailureResult("Quest failed", "FAIL_THREE"),
        ],
      }),
      {
        traceSink: {
          push(trace) {
            decisionTraces.push(trace);
          },
        },
      },
    );

    expect(decisionTraces).toHaveLength(1);
    expect(decisionTraces[0]?.fallbackTaken).toBe("passTurn");
    expect(decisionTraces[0]?.selectedCandidate).toBeUndefined();
  });
});

describe("automated action actor resolution", () => {
  it("prefers choosing-first-player before pending mulligan and priority", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { deck: 1 },
      { deck: 1 },
      { skipPreGame: false },
    );
    const state = engine.asServer().getState();

    const result = resolveServerCurrentActor({
      state,
      staticResources: engine.asServer().staticResources,
    });

    expect(result).toMatchObject({
      kind: "actor-resolution",
      source: "choosing-first-player",
      actorId: PLAYER_ONE,
    });
  });

  it("falls back to pending mulligan before priority when no earlier actor exists", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 1 }, { deck: 1 });
    loadMutatedState(engine, (state) => {
      state.ctx.status.choosingFirstPlayer = undefined;
      state.ctx.status.pendingMulligan = [PLAYER_TWO, PLAYER_ONE];
      state.ctx.priority.holder = PLAYER_ONE;
    });

    const result = resolveServerCurrentActor({
      state: engine.asServer().getState(),
      staticResources: engine.asServer().staticResources,
    });

    expect(result).toMatchObject({
      kind: "actor-resolution",
      source: "pending-mulligan",
      actorId: PLAYER_TWO,
    });
  });

  it("prefers the next pending mulligan player once setup has advanced into mulligan", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      { deck: 1 },
      { deck: 1 },
      { skipPreGame: false },
    );

    engine.asServer().takeAutomatedActionForCurrentActor();
    engine.asServer().takeAutomatedActionForCurrentActor();

    const result = resolveServerCurrentActor({
      state: engine.asServer().getState(),
      staticResources: engine.asServer().staticResources,
    });

    expect(result).toMatchObject({
      kind: "actor-resolution",
      source: "pending-mulligan",
      actorId: PLAYER_TWO,
    });
  });

  it("ignores a malformed active pending effect that has no chooser", () => {
    const source = createMockCharacter({
      id: "malformed-pending-source",
      name: "Malformed Pending Source",
      cost: 2,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
      },
      {
        play: [{ card: source, isDrying: false }],
        deck: 2,
      },
    );
    const sourceId = engine.asPlayerTwo().getCard(source).id as CardInstanceId;

    loadMutatedState(engine, (state) => {
      state.ctx.priority.holder = PLAYER_ONE;
      state.ctx.priority.pendingChoice = {
        type: "action-effect",
        playerID: PLAYER_TWO,
        requestID: "pending:malformed:1",
      };
      state.G.pendingEffects = [
        {
          id: "pending:malformed:1",
          type: "action-effect",
          kind: "optional-selection",
          sourceId,
          sourceCardId: sourceId,
          controllerId: PLAYER_TWO,
          chooserId: undefined as never,
          cardPlayed: getCardPlayedPayload({
            playerId: PLAYER_TWO,
            cardId: sourceId,
            cardType: "character",
          }),
          effect: {
            chooser: "CONTROLLER",
            effect: {
              amount: 1,
              target: "CONTROLLER",
              type: "draw",
            },
            type: "optional",
          } satisfies Effect,
          resolutionInput: {},
        } as PendingActionEffect,
      ];
    });

    const result = resolveServerCurrentActor({
      state: engine.asServer().getState(),
      staticResources: engine.asServer().staticResources,
    });

    expect(result).toMatchObject({
      kind: "actor-resolution",
      source: "priority-holder",
      actorId: PLAYER_ONE,
    });
  });
});

describe("automated action execution", () => {
  it("returns the first successful candidate", () => {
    const result = takeAutomatedActionWithAdapter(
      createQuestAdapter({
        executionResults: [createSuccessResult()],
      }),
    );

    expect(result.selectedCandidate).toMatchObject({ family: "quest" });
    expect(result.executionAttempts).toHaveLength(1);
    expect(result.finalResult.success).toBe(true);
    expect(result.fallbackTaken).toBeUndefined();
  });

  it("retries later candidates after execution failures", () => {
    const result = takeAutomatedActionWithAdapter(
      createQuestAdapter({
        executionResults: [
          createFailureResult("First failed", "FIRST_FAILED"),
          createSuccessResult(),
        ],
      }),
    );

    expect(result.executionAttempts).toHaveLength(2);
    expect(result.selectedCandidate).toMatchObject({ family: "quest" });
    expect(result.finalResult.success).toBe(true);
  });

  it("falls back to passTurn after three execution failures", () => {
    const result = takeAutomatedActionWithAdapter(
      createQuestAdapter({
        executionResults: [
          createFailureResult("First failed", "FIRST_FAILED"),
          createFailureResult("Second failed", "SECOND_FAILED"),
          createFailureResult("Third failed", "THIRD_FAILED"),
        ],
        passTurnResult: createSuccessResult(),
      }),
    );

    expect(result.executionAttempts).toHaveLength(3);
    expect(result.selectedCandidate).toBeUndefined();
    expect(result.fallbackTaken).toBe("passTurn");
    expect(result.finalResult.success).toBe(true);
  });

  it("falls back to concede when passTurn fails", () => {
    const result = takeAutomatedActionWithAdapter(
      createQuestAdapter({
        executionResults: [
          createFailureResult("First failed", "FIRST_FAILED"),
          createFailureResult("Second failed", "SECOND_FAILED"),
          createFailureResult("Third failed", "THIRD_FAILED"),
        ],
        passTurnResult: createFailureResult("Pass failed", "PASS_FAILED"),
        concedeResult: createSuccessResult(),
      }),
    );

    expect(result.fallbackTaken).toBe("concede");
    expect(result.finalResult.success).toBe(true);
  });
});
