import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";

import CardHoverCardContent from "@/design-system/simulator/cards/CardHoverCardContent.svelte";
import { createCardSnapshot } from "@/features/simulator-devtools/test-data/factories.js";
import type { CardActionView } from "@/features/simulator/model/contracts.js";

describe("CardHoverCardContent", () => {
  it("renders hover-card actions alongside card abilities", () => {
    const card = {
      ...createCardSnapshot("playerOne", "play", {
        id: "goofy",
        name: "Goofy - Musketeer",
        type: "character",
        loreValue: 2,
      }),
      textEntries: [{ title: "{E} Pay Attention", description: "Draw a card." }],
    };
    const actions: CardActionView[] = [
      {
        id: "quest:goofy",
        cardId: card.cardId,
        categoryId: "quest",
        label: "Quest for 2 lore",
        enabled: true,
        moves: [],
      },
      {
        id: "disabled:challenge:goofy",
        cardId: card.cardId,
        categoryId: "challenge",
        label: "Challenge",
        enabled: false,
        reason: "No legal challenge targets right now.",
        moves: [],
      },
    ];

    const { body } = render(CardHoverCardContent, {
      props: {
        card,
        actions,
      },
    });

    expect(body).toContain("Pay Attention");
    expect(body).toContain("Quest for 2 lore");
    expect(body).toContain("Challenge");
    expect(body).toContain("No legal challenge targets right now.");
    expect(body).toContain("rules-entry--action");
    expect(body).toContain("rules-entry--action-disabled");
  });

  it("renders a contextual invalid-target message when provided", () => {
    const card = createCardSnapshot("playerTwo", "play", {
      id: "alma",
      name: "Alma Madrigal - Accepting Grandmother",
      type: "character",
    });

    const { body } = render(CardHoverCardContent, {
      props: {
        card,
        contextMessage: "Another Bodyguard must be challenged first.",
      },
    });

    expect(body).toContain("Unavailable");
    expect(body).toContain("Another Bodyguard must be challenged first.");
    expect(body).toContain("context-banner");
  });
});
