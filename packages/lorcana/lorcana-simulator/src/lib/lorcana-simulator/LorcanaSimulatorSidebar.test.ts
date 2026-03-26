import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";

import EventLogPanel from "@/features/simulator/panels/EventLogPanel.svelte";
import {
  createCharacterCard,
  createLogEntry,
} from "@/features/simulator-devtools/test-data/factories.js";

describe("EventLogPanel", () => {
  it("renders the empty log state when no entries exist", () => {
    const { body } = render(EventLogPanel, {
      props: {
        entries: [],
      },
    });

    expect(body).toContain("No moves recorded yet.");
  });

  it("renders typed engine-backed rows with player chips and card tokens", () => {
    const inkedCard = createCharacterCard("playerOne", "inkwell", {
      id: "card-1",
      name: "Mickey Mouse - Brave Little Tailor",
      inkType: ["sapphire"],
    });

    const entry = createLogEntry("inked card", {
      actorSide: "playerOne",
      moveId: "putCardIntoInkwell",
      typedLogEntry: {
        type: "lorcana.card.inked",
        values: {
          playerId: "player_one",
          cardId: inkedCard.cardId,
        },
        visibility: { mode: "PUBLIC" },
        category: "action",
      } as import("@tcg/lorcana-engine").LorcanaGameLogEntry,
      playerId: "player_one",
      params: { cardId: inkedCard.cardId },
      turnNumber: 2,
    });

    const resolveCard = (cardId: string) => {
      if (cardId === inkedCard.cardId) return inkedCard;
      return null;
    };

    const { body } = render(EventLogPanel, {
      props: {
        entries: [entry],
        viewerSide: "playerOne",
        resolveCard,
      },
    });

    expect(body).toContain("Event Log");
    expect(body).toContain("Turn 2");
    expect(body).toContain("You");
    expect(body).toContain("into the inkwell");
    expect(body).toContain("Mickey Mouse - Brave Little Tailor");
  });

  it("renders raw log payloads when debug mode is enabled", () => {
    const entry = createLogEntry("Played Stitch", {
      moveId: "playCard",
      playerId: "player_one",
      params: { cardId: "card-1" },
      turnNumber: 3,
    });

    const eventLog = render(EventLogPanel, {
      props: {
        showRawLogRegistryJson: true,
        entries: [entry],
      },
    });

    expect(eventLog.body).toContain('"moveId": "playCard"');
    expect(eventLog.body).toContain('"turnNumber": 3');
  });

  it("shows turn separators when visible entries span multiple turns", () => {
    const olderTurn = createLogEntry("Older turn", {
      id: "older-turn",
      turnNumber: 4,
      moveId: "passTurn",
    });
    const newerTurn = createLogEntry("Newer turn", {
      id: "newer-turn",
      turnNumber: 5,
      moveId: "passTurn",
    });
    const hiddenTurn = createLogEntry("Hidden turn", {
      id: "hidden-turn",
      turnNumber: 3,
      moveId: "passTurn",
    });

    const { body } = render(EventLogPanel, {
      props: {
        entries: [hiddenTurn, olderTurn, newerTurn],
      },
    });

    expect(body).toContain("Turn 5");
    expect(body).toContain("Turn 4");
    expect(body).not.toContain("Turn 3");
  });
});
