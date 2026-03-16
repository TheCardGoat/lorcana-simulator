import { describe, expect, it } from "bun:test";
import type { ActionCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../../card-i18n";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
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
});
