import { describe, expect, it } from "bun:test";
import type { ActionCard } from "@tcg/lorcana-types";
import {
  johnSilverAlienPirate,
  simbaProtectiveCub,
  stealFromTheRich,
} from "../../lorcana-cards/src/cards/001";
import { mauiHalfshark } from "../../lorcana-cards/src/cards/006";
import { donKarnageAirPirateLeader } from "../../lorcana-cards/src/cards/008";
import { createCardI18n } from "./card-i18n";
import {
  LorcanaMultiplayerTestEngine,
  PLAYER_ONE,
  PLAYER_TWO,
  createMockCharacter,
} from "./testing";

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

const quester = createMockCharacter({
  id: "auto-resolve-quester",
  name: "Auto Resolve Quester",
  cost: 2,
  lore: 1,
});

const optionalQuestWatcher = createMockCharacter({
  id: "optional-quest-watcher",
  name: "Optional Quest Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "optional-quest-watcher-1",
      name: "Optional Quest Watcher",
      text: "Whenever one of your characters quests, you may gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "quest",
        on: "YOUR_CHARACTERS",
        timing: "whenever",
      },
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "gain-lore",
        },
        type: "optional",
      },
    },
  ],
});

const opponentActionWatcher = createMockCharacter({
  id: "opponent-action-watcher",
  name: "Opponent Action Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "opponent-action-watcher-1",
      name: "Opponent Action Watcher",
      text: "Whenever an opponent plays an action, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "opponent",
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

const targetedActionWatcher = createMockCharacter({
  id: "targeted-action-watcher",
  name: "Targeted Action Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "targeted-action-watcher-1",
      name: "Targeted Action Watcher",
      text: "Whenever you play an action, exert chosen character.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        target: "CHOSEN_CHARACTER",
        type: "exert",
      },
    },
  ],
});

const optionalTargetedActionWatcher = createMockCharacter({
  id: "optional-targeted-action-watcher",
  name: "Optional Targeted Action Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "optional-targeted-action-watcher-1",
      name: "Optional Targeted Action Watcher",
      text: "Whenever you play an action, you may exert chosen character.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        type: "optional",
        chooser: "CONTROLLER",
        effect: {
          type: "exert",
          target: "CHOSEN_CHARACTER",
        },
      },
    },
  ],
});

const upToTargetedActionWatcher = createMockCharacter({
  id: "up-to-targeted-action-watcher",
  name: "Up To Targeted Action Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "up-to-targeted-action-watcher-1",
      name: "Up To Targeted Action Watcher",
      text: "Whenever you play an action, exert up to 1 chosen character.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      effect: {
        type: "exert",
        target: {
          selector: "chosen",
          count: { upTo: 1 },
          owner: "opponent",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
});

const conditionalActionWatcher = createMockCharacter({
  id: "conditional-action-watcher",
  name: "Conditional Action Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "conditional-action-watcher-1",
      name: "Conditional Action Watcher",
      text: "Whenever you play an action, gain 1 lore if you still have 3 cards in hand.",
      type: "triggered",
      trigger: {
        event: "play",
        on: {
          cardType: "action",
          controller: "you",
        },
        timing: "whenever",
      },
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["hand"],
        },
        comparison: {
          operator: "gte",
          value: 3,
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

const readyWatcher = createMockCharacter({
  id: "ready-watcher",
  name: "Ready Watcher",
  cost: 2,
  lore: 1,
  abilities: [
    {
      id: "ready-watcher-1",
      name: "Ready Watcher",
      text: "Whenever you ready this character, gain 1 lore.",
      type: "triggered",
      trigger: {
        event: "ready",
        on: "SELF",
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

const optionalAction = createMockActionCard({
  id: "optional-action",
  name: "Optional Action",
  cost: 1,
  text: "You may gain 1 lore.",
  abilities: [
    {
      type: "action",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "gain-lore",
        },
        type: "optional",
      },
    },
  ],
});

const simpleAction = createMockActionCard({
  id: "simple-action",
  name: "Simple Action",
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

describe("LorcanaEngineBase bag auto-resolution", () => {
  it("auto-resolves a single mandatory no-target triggered bag effect", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stealFromTheRich],
      inkwell: stealFromTheRich.cost,
      play: [mauiHalfshark, quester],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(stealFromTheRich)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(1);
  });

  it("keeps the triggered bag effect manual when action auto-resolution is explicitly disabled", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stealFromTheRich],
      inkwell: stealFromTheRich.cost,
      play: [mauiHalfshark],
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(stealFromTheRich, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
  });

  it("preserves suppression through suspended action resolution", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [optionalAction],
      inkwell: optionalAction.cost,
      play: [mauiHalfshark],
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(optionalAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    expect(
      testEngine.asPlayerOne().resolveNextPending({
        resolveOptional: false,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(0);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

    const actionId = testEngine.findCardInstanceId(optionalAction, "discard", PLAYER_ONE);
    expect(
      testEngine
        .getServerEngine()
        .getRuntime()
        .getGameLog()
        .find(
          (entry) =>
            entry.defaultMessage?.key === "lorcana.effect.resolve.optionalSelection.rejected",
        )?.defaultMessage,
    ).toMatchObject({
      key: "lorcana.effect.resolve.optionalSelection.rejected",
      values: {
        playerId: PLAYER_ONE,
        sourceCardId: actionId,
      },
    });
  });

  it("does not auto-resolve when multiple same-player mandatory no-target bag effects are pending", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stealFromTheRich],
      inkwell: stealFromTheRich.cost,
      play: [mauiHalfshark, mauiHalfshark],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(stealFromTheRich)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);
  });

  it("auto-resolves the last mandatory no-target bag effect after user resolves one of two", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [stealFromTheRich],
      inkwell: stealFromTheRich.cost,
      play: [mauiHalfshark, mauiHalfshark],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().playCard(stealFromTheRich)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(2);
  });

  it("authoritative turn flow auto-resolves a single mandatory no-target triggered bag effect for the next resolver", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        deck: 1,
      },
      {
        deck: 1,
        play: [{ card: readyWatcher, exerted: true }],
      },
    );

    expect(testEngine.asServer().passTurn(PLAYER_ONE)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getBagCount()).toBe(0);
    expect(testEngine.asPlayerTwo().getLore(PLAYER_TWO)).toBe(1);
  });

  it("keeps mandatory targeted triggers manual", () => {
    const target = createMockCharacter({
      id: "targeted-action-victim",
      name: "Targeted Action Victim",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [simpleAction],
        inkwell: simpleAction.cost,
        play: [targetedActionWatcher],
        deck: 2,
      },
      {
        play: [target],
        deck: 2,
      },
    );

    const targetId = testEngine.findCardInstanceId(target, "play", PLAYER_TWO);

    expect(
      testEngine.asPlayerOne().playCard(simpleAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        targets: [targetId],
      }),
    ).toBeSuccessfulCommand();

    const watcherId = testEngine.findCardInstanceId(targetedActionWatcher, "play", PLAYER_ONE);
    const resolveEntry = testEngine
      .getServerEngine()
      .getRuntime()
      .getGameLog()
      .find((entry) => entry.defaultMessage?.key === "lorcana.bag.resolve.completed.targets.named");
    expect(resolveEntry?.defaultMessage).toMatchObject({
      key: "lorcana.bag.resolve.completed.targets.named",
      values: {
        playerId: PLAYER_ONE,
        sourceId: watcherId,
        abilityName: "Targeted Action Watcher",
        targets: [targetId],
      },
    });
  });

  it("keeps optional no-target triggers manual", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      play: [quester, optionalQuestWatcher],
      deck: 2,
    });

    expect(testEngine.asPlayerOne().quest(quester)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore);

    expect(
      testEngine.asPlayerOne().resolveBag(testEngine.asPlayerOne().getBagEffects()[0]!.id, {
        resolveOptional: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(quester.lore + 1);

    const watcherId = testEngine.findCardInstanceId(optionalQuestWatcher, "play", PLAYER_ONE);
    expect(
      testEngine
        .getServerEngine()
        .getRuntime()
        .getGameLog()
        .find((entry) => entry.defaultMessage?.key === "lorcana.bag.resolve.completed.named")
        ?.defaultMessage,
    ).toMatchObject({
      key: "lorcana.bag.resolve.completed.named",
      values: {
        playerId: PLAYER_ONE,
        sourceId: watcherId,
        abilityName: "Optional Quest Watcher",
      },
    });
  });

  it("resolving optional targeted bag effect creates a pending effect for target selection", () => {
    const target = createMockCharacter({
      id: "optional-targeted-victim",
      name: "Optional Targeted Victim",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const targetId = target.id;
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [simpleAction],
        inkwell: simpleAction.cost,
        play: [optionalTargetedActionWatcher],
        deck: 2,
      },
      {
        play: [target],
        deck: 2,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(simpleAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    // Accepting the optional executes the bag immediately; the exert effect suspends
    // and creates a pending effect for target selection.
    expect(
      testEngine.asPlayerOne().resolveNextBag({
        resolveOptional: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);

    // Resolve the pending target selection.
    const resolvedTarget = testEngine.findCardInstanceId(target, "play", PLAYER_TWO);
    expect(
      testEngine.asPlayerOne().resolveNextPending({ targets: [resolvedTarget] }),
    ).toBeSuccessfulCommand();
    expect(testEngine.isExerted(target)).toBe(true);
  });

  it("accepts optional targeted bag resolutions when explicit targets are provided", () => {
    const target = createMockCharacter({
      id: "optional-targeted-victim-2",
      name: "Optional Targeted Victim 2",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [simpleAction],
        inkwell: simpleAction.cost,
        play: [optionalTargetedActionWatcher],
        deck: 2,
      },
      {
        play: [target],
        deck: 2,
      },
    );
    const targetId = testEngine.findCardInstanceId(target, "play", PLAYER_TWO);

    expect(
      testEngine.asPlayerOne().playCard(simpleAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();

    expect(
      testEngine.asPlayerOne().resolveNextBag({
        resolveOptional: true,
        targets: [targetId],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.isExerted(target)).toBe(true);
  });

  it("allows declining optional targeted bag effects without providing targets", () => {
    const target = createMockCharacter({
      id: "optional-targeted-decline-victim",
      name: "Optional Targeted Decline Victim",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [simpleAction],
        inkwell: simpleAction.cost,
        play: [optionalTargetedActionWatcher],
        deck: 2,
      },
      {
        play: [target],
        deck: 2,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(simpleAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);

    expect(
      testEngine.asPlayerOne().resolveNextBag({
        resolveOptional: false,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.isExerted(target)).toBe(false);
  });

  it("allows zero-target bag effects to defer selection until the pending choice", () => {
    const target = createMockCharacter({
      id: "up-to-targeted-victim",
      name: "Up To Targeted Victim",
      cost: 2,
      strength: 2,
      willpower: 2,
      lore: 1,
    });
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [simpleAction],
        inkwell: simpleAction.cost,
        play: [upToTargetedActionWatcher],
        deck: 2,
      },
      {
        play: [target],
        deck: 2,
      },
    );

    expect(
      testEngine.asPlayerOne().playCard(simpleAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();

    expect(testEngine.asPlayerOne().resolveNextBag()).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getPendingEffects()).toHaveLength(1);
    expect(testEngine.asPlayerOne().resolveNextPending({ targets: [] })).toBeSuccessfulCommand();
    expect(testEngine.isExerted(target)).toBe(false);
  });

  it("auto-resolves a remaining deterministic bag effect after a manual bag resolution", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [stealFromTheRich],
        inkwell: stealFromTheRich.cost,
        play: [mauiHalfshark, donKarnageAirPirateLeader],
        deck: 2,
      },
      {
        play: [simbaProtectiveCub],
        deck: 2,
      },
    );

    const simbaId = testEngine.findCardInstanceId(simbaProtectiveCub, "play", PLAYER_TWO);

    expect(testEngine.asPlayerOne().playCard(stealFromTheRich)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(2);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(0);

    const donBag = testEngine
      .asPlayerOne()
      .getBagEffects()
      .find(
        (bagEffect) =>
          bagEffect.sourceId ===
          testEngine.findCardInstanceId(donKarnageAirPirateLeader, "play", PLAYER_ONE),
      );
    expect(donBag).toBeDefined();

    expect(
      testEngine.asPlayerOne().resolveBag(donBag!.id, {
        targets: [simbaId],
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(1);
  });

  it("does not auto-resolve bag effects controlled by another player", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture(
      {
        hand: [stealFromTheRich],
        inkwell: stealFromTheRich.cost,
        deck: 2,
      },
      {
        play: [opponentActionWatcher],
        deck: 2,
      },
    );

    expect(testEngine.asPlayerOne().playCard(stealFromTheRich)).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getBagCount()).toBe(1);
    expect(testEngine.asPlayerTwo().getLore(PLAYER_TWO)).toBe(0);

    expect(
      testEngine.asPlayerTwo().resolveBag(testEngine.asPlayerTwo().getBagEffects()[0]!.id),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerTwo().getLore(PLAYER_TWO)).toBe(1);

    const watcherId = testEngine.findCardInstanceId(opponentActionWatcher, "play", PLAYER_TWO);
    expect(
      testEngine
        .getServerEngine()
        .getRuntime()
        .getGameLog()
        .find((entry) => entry.defaultMessage?.key === "lorcana.bag.resolve.completed.named")
        ?.defaultMessage,
    ).toMatchObject({
      key: "lorcana.bag.resolve.completed.named",
      values: {
        playerId: PLAYER_TWO,
        sourceId: watcherId,
        abilityName: "Opponent Action Watcher",
      },
    });
  });

  it("does not queue bag effects when their trigger condition fails", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [simpleAction],
      inkwell: simpleAction.cost,
      play: [conditionalActionWatcher],
      deck: 2,
    });

    expect(
      testEngine.asPlayerOne().playCard(simpleAction, {
        preventAutoResolveTriggeredEffects: true,
      }),
    ).toBeSuccessfulCommand();
    expect(testEngine.asPlayerOne().getLore(PLAYER_ONE)).toBe(1);
    expect(testEngine.asPlayerOne().getBagCount()).toBe(0);

    const watcherId = testEngine.findCardInstanceId(conditionalActionWatcher, "play", PLAYER_ONE);
    expect(
      testEngine
        .getServerEngine()
        .getRuntime()
        .getGameLog()
        .find((entry) => entry.defaultMessage?.key === "lorcana.bag.resolve.skipped.named")
        ?.defaultMessage,
    ).toBeUndefined();
    expect(watcherId).toBeDefined();
  });
});
