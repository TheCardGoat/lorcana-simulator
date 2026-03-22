import { describe, expect, it } from "bun:test";
import type { ActionCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../../card-i18n";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockAction,
  createMockCharacter,
} from "../../testing";

const quester = createMockCharacter({
  id: "triggered-quester",
  name: "Triggered Quester",
  cost: 2,
  lore: 1,
});

const backupQuester = createMockCharacter({
  id: "triggered-backup-quester",
  name: "Backup Quester",
  cost: 2,
  lore: 1,
});

const printedQuestWatcher = createMockCharacter({
  id: "printed-quest-watcher",
  name: "Printed Quest Watcher",
  cost: 3,
  lore: 1,
  abilities: [
    {
      id: "printed-quest-watcher-1",
      name: "Quest Watcher",
      text: "Whenever one of your characters quests, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const selfBanishedWatcher = createMockCharacter({
  id: "self-banished-watcher",
  name: "Self Banished Watcher",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  abilities: [
    {
      id: "self-banished-watcher-1",
      name: "Parting Gift",
      text: "When this character is banished, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "banish",
        on: "SELF",
        timing: "when",
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const selfInkwellWatcher = createMockCharacter({
  id: "self-inkwell-watcher",
  name: "Self Inkwell Watcher",
  cost: 3,
  lore: 1,
  abilities: [
    {
      id: "self-inkwell-watcher-1",
      name: "Ink Watcher",
      text: "Whenever a card is put into your inkwell, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "ink",
        on: "CONTROLLER",
        timing: "whenever",
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const putChosenCharacterIntoInkwell = createMockAction({
  id: "put-chosen-character-into-inkwell",
  name: "Put Chosen Character Into Inkwell",
  cost: 2,
  text: "Put chosen character into their player's inkwell facedown and exerted.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "put-into-inkwell",
        source: "chosen-character",
        target: "CHOSEN_CHARACTER",
        facedown: true,
        exerted: true,
      },
    },
  ],
});

function createFloatingQuestLoreAction(id: string, name: string, amount: number): ActionCard {
  return {
    id,
    canonicalId: `ci_${id}`,
    cardType: "action",
    name,
    cost: 1,
    inkType: ["amber"],
    inkable: true,
    set: "TST",
    rarity: "common",
    cardNumber: 1,
    text: `Whenever one of your characters quests this turn, gain ${amount} lore.`,
    i18n: createCardI18n(name, {
      en: {
        name,
        text: `Whenever one of your characters quests this turn, gain ${amount} lore.`,
      },
    }),
    abilities: [
      {
        type: "action",
        effect: {
          type: "create-triggered-ability",
          lifecycle: {
            kind: "floating",
            duration: "this-turn",
          },
          ability: {
            trigger: {
              event: "quest",
              on: "YOUR_CHARACTERS",
              timing: "whenever",
            },
            effect: {
              amount,
              target: "CONTROLLER",
              type: "gain-lore",
            },
          },
        },
      },
    ],
  };
}

function createGrantBodyguardAction(id: string, name: string): ActionCard {
  return {
    id,
    canonicalId: `ci_${id}`,
    cardType: "action",
    name,
    cost: 1,
    inkType: ["amber"],
    inkable: true,
    set: "TST",
    rarity: "common",
    cardNumber: 2,
    text: "Chosen character gains Bodyguard until the start of your next turn.",
    i18n: createCardI18n(name, {
      en: {
        name,
        text: "Chosen character gains Bodyguard until the start of your next turn.",
      },
    }),
    abilities: [
      {
        type: "action",
        effect: {
          type: "gain-keyword",
          keyword: "Bodyguard",
          duration: "until-start-of-next-turn",
          target: {
            selector: "chosen",
            count: 1,
            owner: "you",
            zones: ["play"],
            cardTypes: ["character"],
          },
        },
      },
    ],
  };
}

const floatingQuestLoreOne = createFloatingQuestLoreAction(
  "floating-quest-lore-one",
  "Floating Quest Lore One",
  1,
);

const floatingQuestLoreTwo = createFloatingQuestLoreAction(
  "floating-quest-lore-two",
  "Floating Quest Lore Two",
  2,
);

const grantTemporaryBodyguard = createGrantBodyguardAction(
  "grant-temporary-bodyguard",
  "Grant Temporary Bodyguard",
);

const oncePerTurnQuestWatcher = createMockCharacter({
  id: "once-per-turn-quest-watcher",
  name: "Once per Turn Quest Watcher",
  cost: 3,
  lore: 1,
  abilities: [
    {
      id: "once-per-turn-quest-watcher-1",
      text: "Whenever one of your characters quests, gain 1 lore. Once per turn.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
        restrictions: [{ type: "once-per-turn" }],
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const firstTimeEachTurnQuestWatcher = createMockCharacter({
  id: "first-time-quest-watcher",
  name: "First Time Quest Watcher",
  cost: 3,
  lore: 1,
  abilities: [
    {
      id: "first-time-quest-watcher-1",
      text: "The first time one of your characters quests each turn, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
        restrictions: [{ type: "first-time-each-turn" }],
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const discardQuestWatcher = createMockCharacter({
  id: "discard-quest-watcher",
  name: "Discard Quest Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "discard-quest-watcher-1",
      text: "While this is in your discard, whenever one of your characters quests, gain 1 lore.",
      type: "triggered",
      sourceZones: ["discard"],
      trigger: {
        event: "quest",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const temporaryBodyguardWatcher = createMockCharacter({
  id: "temporary-bodyguard-watcher",
  name: "Temporary Bodyguard Watcher",
  cost: 3,
  lore: 1,
  abilities: [
    {
      id: "temporary-bodyguard-watcher-1",
      text: "Whenever one of your characters with Bodyguard is banished, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "banish",
        on: {
          controller: "you",
          cardType: "character",
          hasKeyword: "Bodyguard",
        },
        timing: "whenever",
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "gain-lore",
      },
    },
  ],
});

const temporaryBodyguardTarget = createMockCharacter({
  id: "temporary-bodyguard-target",
  name: "Temporary Bodyguard Target",
  cost: 2,
  strength: 1,
  willpower: 1,
});

const lethalDefender = createMockCharacter({
  id: "temporary-bodyguard-lethal-defender",
  name: "Lethal Defender",
  cost: 3,
  strength: 3,
  willpower: 3,
});

describe("triggered abilities", () => {
  it("queues printed triggered abilities into the bag before they resolve", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [printedQuestWatcher, quester],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().quest(quester).success).toBe(true);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore + 1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });

  it("resolves self-banish printed triggers after the source leaves play", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [selfBanishedWatcher],
      deck: 1,
    });

    expect(testEngine.asServer().manualSetDamage(selfBanishedWatcher, 2)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(selfBanishedWatcher)).toBe("discard");
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });

  it("does not let a source trigger on its own move into the inkwell unless the trigger is explicitly self-referential", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [selfInkwellWatcher],
        deck: 1,
      },
      {
        hand: [putChosenCharacterIntoInkwell],
        inkwell: putChosenCharacterIntoInkwell.cost,
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerTwo().playCard(putChosenCharacterIntoInkwell, {
        targets: [selfInkwellWatcher],
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getCardZone(selfInkwellWatcher)).toBe("inkwell");
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });

  it("lets the same player choose among multiple bag effects from one event", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [floatingQuestLoreOne, floatingQuestLoreTwo],
        inkwell: 2,
        play: [quester, backupQuester],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().playCard(floatingQuestLoreOne).success).toBe(true);
    expect(testEngine.asPlayerOne().playCard(floatingQuestLoreTwo).success).toBe(true);

    const floatingQuestLoreOneId = testEngine.findCardInstanceId(
      floatingQuestLoreOne,
      "discard",
      PLAYER_ONE,
    );
    const floatingQuestLoreTwoId = testEngine.findCardInstanceId(
      floatingQuestLoreTwo,
      "discard",
      PLAYER_ONE,
    );

    expect(testEngine.asPlayerOne().quest(quester).success).toBe(true);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
    expect(testEngine.asPlayerOne().quest(backupQuester).success).toBe(false);

    const floatingQuestLoreTwoBag = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => bagEffect.sourceId === floatingQuestLoreTwoId);
    const floatingQuestLoreOneBag = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find((bagEffect) => bagEffect.sourceId === floatingQuestLoreOneId);

    expect(floatingQuestLoreTwoBag).toBeDefined();
    expect(floatingQuestLoreOneBag).toBeDefined();

    expect(testEngine.asPlayerOne().resolveBag(floatingQuestLoreTwoBag!.id).success).toBe(true);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore + 3);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_TWO)).toBe(0);
  });

  it("enforces once-per-turn triggered restrictions when bag effects resolve", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [quester, backupQuester, oncePerTurnQuestWatcher],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().quest(quester).success).toBe(true);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore + 1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    expect(testEngine.asPlayerOne().quest(backupQuester).success).toBe(true);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(
      quester.lore + backupQuester.lore + 1,
    );
  });

  it("enforces first-time-each-turn restrictions using occurrence tracking", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [quester, backupQuester, firstTimeEachTurnQuestWatcher],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().quest(quester).success).toBe(true);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore + 1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    expect(testEngine.asPlayerOne().quest(backupQuester).success).toBe(true);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(
      quester.lore + backupQuester.lore + 1,
    );
  });

  it("supports printed triggers from discard when sourceZones opt out of play-only defaults", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [quester],
        discard: [discardQuestWatcher],
        deck: 1,
      },
      {
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().quest(quester).success).toBe(true);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore + 1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });

  it("matches trigger subject keyword queries against temporary keywords", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [grantTemporaryBodyguard],
        inkwell: grantTemporaryBodyguard.cost,
        play: [temporaryBodyguardWatcher, temporaryBodyguardTarget],
        deck: 1,
      },
      {
        play: [{ card: lethalDefender, exerted: true }],
        deck: 1,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(grantTemporaryBodyguard, {
        targets: [temporaryBodyguardTarget],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.hasKeyword(temporaryBodyguardTarget, "Bodyguard")).toBe(true);

    expect(
      testEngine.asPlayerOne().challenge(temporaryBodyguardTarget, lethalDefender),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getCardZone(temporaryBodyguardTarget)).toBe("discard");
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
  });

  it("fires during-opponent-turn banish watcher twice when two allies are banished in separate moves", () => {
    const allyA = createMockCharacter({
      id: "banish-ally-a",
      name: "Ally A",
      cost: 2,
      strength: 2,
      willpower: 3,
    });
    const allyB = createMockCharacter({
      id: "banish-ally-b",
      name: "Ally B",
      cost: 2,
      strength: 2,
      willpower: 3,
    });
    const opponentBanishWatcher = createMockCharacter({
      id: "opponent-banish-watcher",
      name: "Opponent Banish Watcher",
      cost: 3,
      lore: 1,
      willpower: 4,
      abilities: [
        {
          id: "opponent-banish-watcher-1",
          name: "WATCHER",
          text: "During an opponent's turn, whenever one of your other characters is banished, gain 1 lore.",
          type: "triggered",
          trigger: {
            event: "banish",
            on: "YOUR_OTHER_CHARACTERS",
            timing: "whenever",
            restrictions: [{ type: "during-turn", whose: "opponent" }],
          },
          effect: {
            amount: 1,
            type: "gain-lore",
          },
        },
      ],
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        play: [
          opponentBanishWatcher,
          { card: allyA, isDrying: false },
          { card: allyB, isDrying: false },
        ],
      },
      {},
    );

    const loreBefore = testEngine.getLore(PLAYER_ONE);

    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();
    expect(testEngine.asServer().manualSetDamage(allyA, 10)).toBeSuccessfulCommand();
    expect(testEngine.getLore(PLAYER_ONE)).toBe(loreBefore + 1);
    expect(testEngine.asServer().manualSetDamage(allyB, 10)).toBeSuccessfulCommand();

    expect(testEngine.getLore(PLAYER_ONE)).toBe(loreBefore + 2);
  });

  it("does not queue an end-turn trigger when a comparison condition is false", () => {
    const conditionalEndTurnWatcher = createMockCharacter({
      id: "conditional-end-turn-watcher",
      name: "Conditional End Turn Watcher",
      cost: 3,
      lore: 1,
      abilities: [
        {
          id: "conditional-end-turn-watcher-1",
          name: "Keep Up",
          text: "At the end of your turn, if an opponent has more cards in their hand than you, gain 1 lore.",
          type: "triggered",
          trigger: {
            event: "end-turn",
            on: "YOU",
            timing: "at",
          },
          condition: {
            type: "comparison",
            left: {
              type: "cards-in-hand",
              controller: "opponent",
            },
            comparison: "greater-than",
            right: {
              type: "cards-in-hand",
              controller: "you",
            },
          },
          effect: {
            amount: 1,
            target: "CONTROLLER",
            type: "gain-lore",
          },
        },
      ],
    });

    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [conditionalEndTurnWatcher],
        inkwell: conditionalEndTurnWatcher.cost,
        deck: 1,
      },
      {
        hand: [],
        deck: 1,
      },
    );

    expect(testEngine.asPlayerOne().playCard(conditionalEndTurnWatcher)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().passTurn()).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
  });
});
