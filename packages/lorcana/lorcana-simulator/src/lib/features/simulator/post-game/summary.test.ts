import { describe, expect, it } from "bun:test";
import type { LorcanaProjectedBoardView } from "@tcg/lorcana-engine";
import type {
  MoveLogEntrySnapshot,
  SimulatorSerializedObject,
} from "@/features/simulator/model/contracts.js";
import {
  createCardSnapshot,
  createLogEntry,
} from "@/features/simulator-devtools/test-data/factories.js";
import { buildPostGameSummary } from "./summary.js";

function createBoard(): LorcanaProjectedBoardView {
  return {
    gameID: "game-1",
    matchID: "match-1",
    stateID: 12,
    playerOrder: ["player_one", "player_two"],
    turnPlayer: "player_two",
    priorityPlayer: "player_two",
    turnNumber: 6,
    pendingMulligan: [],
    status: "finished",
    winner: "player_two",
    reason: "Player One conceded the game.",
    timerView: {
      state: "stopped",
      players: {},
    },
    players: {
      player_one: {
        lore: 7,
        hand: ["hand-1", "hand-2", "hand-3"],
        play: ["card-ariel", "card-location"],
        inkwell: ["ink-1", "ink-2", "ink-3", "ink-4"],
        discard: ["discard-1"],
        deckCount: 42,
        handCount: 3,
      },
      player_two: {
        lore: 12,
        hand: ["opp-hand-1", "opp-hand-2"],
        play: ["card-mickey"],
        inkwell: ["opp-ink-1", "opp-ink-2", "opp-ink-3"],
        discard: ["opp-discard-1", "opp-discard-2"],
        deckCount: 39,
        handCount: 2,
      },
    },
    cards: {
      "card-ariel": {
        ownerId: "player_one",
        zone: "play",
        fullName: "Ariel - On Human Legs",
        cardType: "character",
        exerted: false,
        lore: 2,
        hidden: false,
      },
      "card-location": {
        ownerId: "player_one",
        zone: "play",
        fullName: "Motunui - Island Paradise",
        cardType: "location",
        exerted: true,
        lore: 0,
        hidden: false,
      },
      "card-mickey": {
        ownerId: "player_two",
        zone: "play",
        fullName: "Mickey Mouse - Detective",
        cardType: "character",
        exerted: true,
        lore: 1,
        hidden: false,
      },
      "ink-1": { hidden: false, exerted: false },
      "ink-2": { hidden: false, exerted: false },
      "ink-3": { hidden: false, exerted: true },
      "ink-4": { hidden: false, exerted: true },
      "opp-ink-1": { hidden: false, exerted: false },
      "opp-ink-2": { hidden: false, exerted: false },
      "opp-ink-3": { hidden: false, exerted: true },
    },
    activeEffects: [],
    pendingEffects: [],
    bagEffects: [],
  } as unknown as LorcanaProjectedBoardView;
}

function createTypedLogEntry(
  moveId: MoveLogEntrySnapshot["moveId"],
  key: string,
  values: SimulatorSerializedObject,
  options: Partial<MoveLogEntrySnapshot> = {},
): MoveLogEntrySnapshot {
  return createLogEntry(options.title ?? key, {
    moveId,
    actorSide: options.actorSide ?? "playerOne",
    turnNumber: options.turnNumber ?? 1,
    ...options,
    typedLogEntry: {
      type: key,
      values,
      visibility: { mode: "PUBLIC" },
      category: "action",
    } as import("@tcg/lorcana-engine").LorcanaGameLogEntry,
    playerId: options.actorSide === "playerTwo" ? "player_two" : "player_one",
    params: values,
  });
}

describe("buildPostGameSummary", () => {
  it("parses the full log into counters, highlights, spotlights, and forensics", () => {
    const ariel = createCardSnapshot("playerOne", "play", {
      id: "card-ariel",
      name: "Ariel - On Human Legs",
      loreValue: 2,
      readyState: "ready",
    });
    const mickey = createCardSnapshot("playerTwo", "play", {
      id: "card-mickey",
      name: "Mickey Mouse - Detective",
      loreValue: 1,
      readyState: "exerted",
    });
    const motunui = createCardSnapshot("playerOne", "play", {
      id: "card-location",
      name: "Motunui - Island Paradise",
      type: "location",
      loreValue: 0,
      readyState: "exerted",
    });

    const entries: MoveLogEntrySnapshot[] = [
      createTypedLogEntry("chooseWhoGoesFirst", "lorcana.setup.firstPlayerChosen", {
        chooser: "player_one",
        chosen: "player_two",
      }),
      createTypedLogEntry("alterHand", "lorcana.setup.mulligan.count", {
        playerId: "player_one",
        count: 2,
      }),
      createTypedLogEntry(
        "playCard",
        "lorcana.move.playCard",
        {
          playerId: "player_one",
          cardId: "card-ariel",
        },
        {
          turnNumber: 2,
        },
      ),
      createTypedLogEntry(
        "putCardIntoInkwell",
        "lorcana.card.inked",
        {
          playerId: "player_one",
          cardId: "card-ariel",
        },
        {
          turnNumber: 2,
        },
      ),
      createTypedLogEntry(
        "quest",
        "lorcana.move.quest",
        {
          playerId: "player_one",
          cardId: "card-ariel",
          loreGained: 2,
        },
        {
          turnNumber: 3,
        },
      ),
      createTypedLogEntry(
        "challenge",
        "lorcana.move.challenge",
        {
          playerId: "player_one",
          attackerId: "card-ariel",
          defenderId: "card-mickey",
        },
        {
          turnNumber: 4,
        },
      ),
      createTypedLogEntry(
        "moveCharacterToLocation",
        "lorcana.move.moveCharacterToLocation",
        {
          playerId: "player_one",
          characterId: "card-ariel",
          locationId: "card-location",
        },
        {
          turnNumber: 4,
        },
      ),
      createTypedLogEntry(
        "activateAbility",
        "lorcana.ability.activated.named",
        {
          playerId: "player_one",
          cardId: "card-ariel",
          abilityName: "Singer 5",
        },
        {
          turnNumber: 5,
        },
      ),
      createTypedLogEntry(
        "resolveEffect",
        "lorcana.effect.resolve.targetSelection",
        {
          playerId: "player_one",
          sourceCardId: "card-ariel",
          targets: ["card-mickey", "card-location"],
          abilityName: "Singer 5",
        },
        {
          turnNumber: 5,
        },
      ),
      createTypedLogEntry("passTurn", "lorcana.move.passTurn", {
        playerId: "player_one",
      }),
      createTypedLogEntry("concede", "lorcana.move.concede", {
        playerId: "player_one",
      }),
      createLogEntry("Judge note", {
        moveId: "passTurn",
        actorSide: "playerTwo",
        turnNumber: 6,
      }),
    ];

    const summary = buildPostGameSummary({
      board: createBoard(),
      entries,
      viewerSide: "playerOne",
    });

    expect(summary.totalLogEntries).toBe(entries.length);
    expect(summary.forensics).toHaveLength(entries.length);
    expect(summary.outcome.winnerSide).toBe("playerTwo");
    expect(summary.outcome.viewerResult).toBe("defeat");
    expect(summary.players.playerOne.availableInk).toBe(2);
    expect(summary.players.playerOne.readyCount).toBe(1);
    expect(summary.players.playerOne.exertedCount).toBe(1);

    expect(summary.countersBySide.playerOne.cardsPlayed).toBe(1);
    expect(summary.countersBySide.playerOne.inked).toBe(1);
    expect(summary.countersBySide.playerOne.quests).toBe(1);
    expect(summary.countersBySide.playerOne.challengeInitiations).toBe(1);
    expect(summary.countersBySide.playerOne.movesToLocations).toBe(1);
    expect(summary.countersBySide.playerOne.abilityActivations).toBe(1);
    expect(summary.countersBySide.playerOne.effectResolutions).toBe(1);
    expect(summary.countersBySide.playerOne.passes).toBe(1);
    expect(summary.countersBySide.playerOne.concedes).toBe(1);

    expect(summary.topLoreContributors[0]?.label).toBe("Ariel - On Human Legs");
    expect(summary.topLoreContributors[0]?.value).toBe(2);
    expect(summary.mostPlayedCards[0]?.label).toBe("Ariel - On Human Legs");
    expect(summary.mostInvolvedChallengeCards[0]?.label).toBe("Ariel - On Human Legs");
    expect(summary.mostTriggeredAbilities.some((spotlight) => spotlight.label === "Singer 5")).toBe(
      true,
    );

    expect(summary.highlights.some((highlight) => highlight.title === "Match slipped away")).toBe(
      true,
    );
    expect(
      summary.highlights.some((highlight) => highlight.title === "The game ended by concession"),
    ).toBe(true);

    expect(summary.forensics[0]?.typedMessages).toHaveLength(1);
    expect(summary.forensics[0]?.typedMessages[0]?.text.length).toBeGreaterThan(0);
    expect(summary.forensics.at(-1)?.typedMessages).toHaveLength(0);
    expect(summary.forensics.at(-1)?.text.length).toBeGreaterThan(0);
  });
});
