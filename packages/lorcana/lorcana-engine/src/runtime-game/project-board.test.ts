import { describe, expect, it } from "bun:test";
import type { PlayerId } from "#core";
import type { ActionCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../card-i18n";
import {
  CANONICAL_PLAYER_ONE,
  CANONICAL_PLAYER_TWO,
  LorcanaMultiplayerTestEngine,
  createMockCharacter,
} from "../testing";

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
    cardNumber: 778,
  };
}

const suspendedAction = createMockActionCard({
  id: "suspended-action",
  name: "Suspended Action",
  cost: 2,
  text: "You may draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        chooser: "CONTROLLER",
        type: "optional",
        effect: {
          type: "draw",
          target: "CONTROLLER",
          amount: 1,
        },
      },
    },
  ],
});

const projectedFriendlyTarget = createMockCharacter({
  id: "projected-friendly-target",
  name: "Projected Friendly Target",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const projectedQuestWatcher = createMockCharacter({
  id: "projected-sequence-quest-watcher",
  name: "Projected Sequence Quest Watcher",
  cost: 3,
  lore: 1,
  abilities: [
    {
      id: "projected-sequence-quest-watcher-1",
      type: "triggered",
      name: "Choose Two Characters",
      text: "Whenever this character quests, chosen opposing character gets -2 {S} this turn and chosen character gets +2 {S} this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "modify-stat",
            stat: "strength",
            modifier: -2,
            duration: "this-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
          {
            type: "modify-stat",
            stat: "strength",
            modifier: 2,
            duration: "this-turn",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        ],
      },
    },
  ],
});

const projectedOpponent = createMockCharacter({
  id: "projected-opponent",
  name: "Projected Opponent",
  cost: 2,
  strength: 3,
  willpower: 3,
  lore: 1,
});

const projectedRecklessSource = createMockCharacter({
  id: "projected-reckless-source",
  name: "Projected Reckless Source",
  cost: 3,
  strength: 4,
  willpower: 4,
  lore: 1,
  abilities: [
    {
      id: "projected-reckless",
      type: "keyword",
      keyword: "Reckless",
      text: "Reckless",
    },
  ],
});

const projectedWeakerTarget = createMockCharacter({
  id: "projected-weaker-target",
  name: "Projected Weaker Target",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
});

const projectedStrongerTarget = createMockCharacter({
  id: "projected-stronger-target",
  name: "Projected Stronger Target",
  cost: 5,
  strength: 6,
  willpower: 6,
  lore: 2,
});

const projectedParentComparisonAction = createMockActionCard({
  id: "projected-parent-comparison-action",
  name: "Projected Parent Comparison Action",
  cost: 3,
  text: "Banish one of your Reckless characters to banish a weaker chosen character.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["character"],
              filter: [
                {
                  type: "has-keyword",
                  keyword: "Reckless",
                },
              ],
            },
          },
          {
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
              requireDifferentTargets: true,
              filter: [
                {
                  type: "strength-comparison",
                  comparison: "less",
                  value: "target",
                  compareWithParentsTarget: true,
                },
              ],
            },
          },
        ],
      },
    },
  ],
});

const chosenOpponentChoiceAction = createMockActionCard({
  id: "chosen-opponent-choice-action",
  name: "Chosen Opponent Choice Action",
  cost: 3,
  text: "Chosen opponent chooses yes or no.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        chooser: "CHOSEN_PLAYER",
        options: [
          {
            type: "gain-lore",
            amount: 3,
            target: "CONTROLLER",
          },
          {
            type: "put-on-bottom",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
          },
        ],
      },
    },
  ],
});

describe("projectLorcanaBoardView", () => {
  it("uses otp-based turn calculation when skip-pre-game fixtures set otp to player one", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({ deck: 10 }, { deck: 10 });

    try {
      const openingBoard = testEngine.asServer().getBoard();
      // Skip-to-main sets otp = player_one, turn = 1
      // Turn 1 is OTP's first main-game turn → turnPlayer = player_one
      expect(openingBoard.openingTurnPlayer).toBe(CANONICAL_PLAYER_ONE);
      expect(openingBoard.priorityPlayer).toBe(CANONICAL_PLAYER_ONE);
      expect(openingBoard.turnPlayer).toBe(CANONICAL_PLAYER_ONE);

      expect(testEngine.asLorcanaPlayerOne().passTurn().success).toBe(true);

      const nextBoard = testEngine.asServer().getBoard();
      expect(nextBoard.priorityPlayer).toBe(CANONICAL_PLAYER_TWO);
      // After pass: turn 2, otp=player_one, offset 1 -> player_two's turn
      expect(nextBoard.turnPlayer).toBe(CANONICAL_PLAYER_TWO);
    } finally {
      testEngine.dispose();
    }
  });

  it("tracks turn ownership correctly from opening turn zero through subsequent pass turns", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      { deck: 10 },
      { deck: 10 },
      { skipPreGame: false },
    );

    try {
      expect(testEngine.asLorcanaPlayerOne().chooseFirstPlayer(CANONICAL_PLAYER_ONE).success).toBe(
        true,
      );
      expect(testEngine.asLorcanaPlayerOne().mulligan([]).success).toBe(true);
      expect(testEngine.asLorcanaPlayerTwo().mulligan([]).success).toBe(true);

      const openingBoard = testEngine.asServer().getBoard();
      expect(openingBoard.turnNumber).toBe(1);
      expect(openingBoard.turnPlayer).toBe(CANONICAL_PLAYER_ONE);
      expect(openingBoard.openingTurnPlayer).toBe(CANONICAL_PLAYER_ONE);

      expect(testEngine.asLorcanaPlayerOne().passTurn().success).toBe(true);

      const firstPassedBoard = testEngine.asServer().getBoard();
      expect(firstPassedBoard.turnNumber).toBe(2);
      expect(firstPassedBoard.turnPlayer).toBe(CANONICAL_PLAYER_TWO);
      expect(firstPassedBoard.priorityPlayer).toBe(CANONICAL_PLAYER_TWO);

      expect(testEngine.asLorcanaPlayerTwo().passTurn().success).toBe(true);

      const secondPassedBoard = testEngine.asServer().getBoard();
      expect(secondPassedBoard.turnNumber).toBe(3);
      expect(secondPassedBoard.turnPlayer).toBe(CANONICAL_PLAYER_ONE);
      expect(secondPassedBoard.priorityPlayer).toBe(CANONICAL_PLAYER_ONE);
    } finally {
      testEngine.dispose();
    }
  });

  it("projects runtime-filtered follow-up targets for parent-comparison sequences", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [projectedParentComparisonAction],
        inkwell: projectedParentComparisonAction.cost,
        play: [projectedRecklessSource],
      },
      {
        play: [projectedWeakerTarget, projectedStrongerTarget],
      },
    );

    try {
      expect(
        testEngine.asPlayerOne().playCard(projectedParentComparisonAction, {
          targets: [projectedRecklessSource],
        }),
      ).toBeSuccessfulCommand();

      const [pendingEffect] = testEngine.asPlayerOne().getPendingEffects();
      const weakerTargetId = testEngine.findCardInstanceId(
        projectedWeakerTarget,
        "play",
        CANONICAL_PLAYER_TWO,
      );
      expect(pendingEffect?.selectionContext).toMatchObject({ kind: "target-selection" });
      expect(pendingEffect?.selectionContext?.kind).toBe("target-selection");
      if (pendingEffect?.selectionContext?.kind !== "target-selection") {
        throw new Error("Expected a target-selection prompt");
      }
      expect(pendingEffect.selectionContext.cardCandidateIds).toEqual([weakerTargetId]);

      expect(
        testEngine.asPlayerOne().resolveNextPending({
          targets: [projectedWeakerTarget],
        }),
      ).toBeSuccessfulCommand();

      expect(testEngine.asPlayerOne().getCardZone(projectedRecklessSource)).toBe("discard");
      expect(testEngine.asPlayerTwo().getCardZone(projectedWeakerTarget)).toBe("discard");
      expect(testEngine.asPlayerTwo().getCardZone(projectedStrongerTarget)).toBe("play");
    } finally {
      testEngine.dispose();
    }
  });

  it("includes suspended action cards from limbo in projected card snapshots", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [suspendedAction],
      inkwell: suspendedAction.cost,
      deck: 3,
    });

    expect(testEngine.asPlayerOne().playCard(suspendedAction)).toBeSuccessfulCommand();

    const playerOneBoard = testEngine.asPlayerOne().getBoard();
    const playerTwoBoard = testEngine.asPlayerTwo().getBoard();
    const pendingEffect = playerOneBoard.pendingEffects[0];

    expect(pendingEffect?.sourceId).toBeDefined();
    const sourceId = pendingEffect?.sourceId;
    expect(sourceId).toBeDefined();
    if (!sourceId) {
      return;
    }

    expect(playerOneBoard.cards[sourceId]).toMatchObject({
      id: sourceId,
      zone: "limbo",
    });
    expect(playerTwoBoard.cards[sourceId]).toMatchObject({
      id: sourceId,
      zone: "limbo",
    });
  });

  it("requires explicit targets for multi-step chosen-target sequences and resolves once all targets are provided", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [projectedQuestWatcher, projectedFriendlyTarget],
        deck: 1,
      },
      {
        play: [projectedOpponent],
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().quest(projectedQuestWatcher)).toBeSuccessfulCommand();

    const playerOneBoard = testEngine.asPlayerOne().getBoard();
    const bagEffect = playerOneBoard.bagEffects[0];
    const friendlyId = testEngine.findCardInstanceId(projectedFriendlyTarget, "play", "player_one");
    const opposingId = testEngine.findCardInstanceId(projectedOpponent, "play", "player_two");

    expect(bagEffect).toBeDefined();
    expect(bagEffect?.selectionContext).toMatchObject({
      kind: "target-selection",
      minSelections: 1,
      maxSelections: 1,
      chooserId: "player_one",
      ordered: false,
    });
    if (!bagEffect?.selectionContext || bagEffect.selectionContext.kind !== "target-selection") {
      throw new Error("Expected a target-selection bag context");
    }
    expect(bagEffect.selectionContext.targetDsl).toHaveLength(1);
    expect(bagEffect.selectionContext.cardCandidateIds).toContain(opposingId);
    expect(bagEffect.selectionContext.cardCandidateIds).not.toContain(friendlyId);

    expect(
      testEngine.asPlayerOne().resolveBag(bagEffect.id, {
        targets: [opposingId, friendlyId],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getCard(projectedOpponent)?.strength).toBe(
      projectedOpponent.strength - 2,
    );
    expect(testEngine.asPlayerOne().getCard(projectedFriendlyTarget)?.strength).toBe(
      projectedFriendlyTarget.strength + 2,
    );
    expect(testEngine.asPlayerOne().getBoard().pendingEffects).toEqual([]);
  });

  it("opens a follow-up target prompt after a chosen player selects a branch with card targets", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [chosenOpponentChoiceAction],
        inkwell: chosenOpponentChoiceAction.cost,
        deck: 1,
      },
      {
        play: [projectedOpponent],
        deck: 1,
      },
    );

    expect(
      testEngine
        .asPlayerOne()
        .playCardForPlayer(chosenOpponentChoiceAction, CANONICAL_PLAYER_TWO as PlayerId),
    ).toBeSuccessfulCommand();

    const choicePrompt = testEngine.asPlayerTwo().getBoard().pendingEffects[0];
    expect(choicePrompt?.selectionContext).toMatchObject({
      kind: "choice-selection",
      chooserId: CANONICAL_PLAYER_TWO,
    });

    expect(testEngine.asPlayerTwo().resolveNextPending({ choiceIndex: 1 })).toBeSuccessfulCommand();

    const targetPrompt = testEngine.asPlayerTwo().getBoard().pendingEffects[0];
    const opponentId = testEngine.findCardInstanceId(
      projectedOpponent,
      "play",
      CANONICAL_PLAYER_TWO,
    );

    expect(targetPrompt?.selectionContext).toMatchObject({
      kind: "target-selection",
      chooserId: CANONICAL_PLAYER_TWO,
      minSelections: 1,
      maxSelections: 1,
    });
    if (
      !targetPrompt?.selectionContext ||
      targetPrompt.selectionContext.kind !== "target-selection"
    ) {
      throw new Error("Expected a follow-up target-selection prompt");
    }
    expect(targetPrompt.selectionContext.cardCandidateIds).toContain(opponentId);

    expect(
      testEngine.asPlayerTwo().resolveNextPending({ targets: [projectedOpponent] }),
    ).toBeSuccessfulCommand();
    expect(
      testEngine.getAuthoritativeState().ctx.zones.private.cardIndex[opponentId]?.zoneKey,
    ).toBe("deck:player_two");
  });
});
