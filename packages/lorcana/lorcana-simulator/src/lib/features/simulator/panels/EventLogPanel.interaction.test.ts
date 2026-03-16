import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";

import EventLogPanel from "@/features/simulator/panels/EventLogPanel.svelte";
import {
  createCharacterCard,
  createLogEntry,
} from "@/features/simulator-devtools/test-data/factories.js";

describe("EventLogPanel interactions", () => {
  it("renders inline card tokens as labeled buttons", () => {
    const card = createCharacterCard("playerOne", "inkwell", {
      id: "hover-card",
      name: "Stitch - Carefree Surfer",
      inkType: ["emerald"],
    });

    const entry = createLogEntry("legacy", {
      actorSide: "playerOne",
      moveId: "putCardIntoInkwell",
      rawLogRegistry: {
        move: {
          moveId: "putCardIntoInkwell",
          params: { cardId: card.cardId },
          playerId: "player_one",
          timestamp: 123,
        },
        relatedLogEntries: [
          {
            sourceEventSeqs: [1],
            defaultMessage: {
              key: "lorcana.card.inked",
              values: {
                playerId: "player_one",
                cardId: card.cardId,
              },
            },
          },
        ],
        cardReferences: [card],
      },
      turnNumber: 2,
    });

    const { body } = render(EventLogPanel, {
      props: {
        entries: [entry],
        viewerSide: "playerOne",
      },
    });

    expect(body).toContain("<button");
    expect(body).toContain(card.label);
  });
});
