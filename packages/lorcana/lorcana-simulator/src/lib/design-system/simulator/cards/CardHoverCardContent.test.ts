import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";
import type { CardActionView, LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";
import CardHoverCardContentTestHost from "./CardHoverCardContent.test-host.svelte";

function createCardSnapshot(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: "card-1",
    definitionId: "def-card-1",
    facePresentation: "faceUp",
    isMasked: false,
    label: "Pride Lands - Pride Rock",
    ownerId: "player-one",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType: "location",
    willpower: 7,
    baseWillpower: 7,
    loreValue: 2,
    baseLoreValue: 2,
    readyState: "ready",
    damage: 0,
    inkType: ["amber"],
    text: "",
    textEntries: [],
    ...overrides,
  };
}

describe("CardHoverCardContent", () => {
  it("shows lore for locations in hover content", () => {
    const { body } = render(CardHoverCardContentTestHost, {
      props: {
        card: createCardSnapshot(),
      },
    });

    expect(body).toContain("Location");
    expect(body).toContain('alt="Lore"');
    expect(body).toContain(">2</span>");
  });

  it.skip("renders unavailable actions inside a collapsed section by default", () => {
    const disabledAction: CardActionView = {
      id: "disabled:move-to-location:card-1",
      cardId: "card-1",
      categoryId: "move-to-location",
      label: "Move to Location",
      interaction: "execute-or-select",
      enabled: false,
      reason: "No legal locations to move to right now.",
      moves: [],
    };

    const { body } = render(CardHoverCardContentTestHost, {
      props: {
        card: createCardSnapshot({
          cardType: "character",
          label: "Jasmine - Resourceful Infiltrator",
          loreValue: 1,
        }),
        actions: [disabledAction],
      },
    });

    expect(body).toContain("Unavailable Actions");
    expect(body).toContain("1 unavailable action");
    expect(body).not.toContain("No legal locations to move to right now.");
  });

  it.skip("renders unavailable actions before enabled actions so active controls stay anchored at the bottom", () => {
    const enabledAction: CardActionView = {
      id: "enabled:ink:card-1",
      cardId: "card-1",
      categoryId: "ink-card",
      label: "Ink",
      interaction: "execute-or-select",
      enabled: true,
      moves: [],
    };

    const disabledAction: CardActionView = {
      id: "disabled:move-to-location:card-1",
      cardId: "card-1",
      categoryId: "move-to-location",
      label: "Move to Location",
      interaction: "execute-or-select",
      enabled: false,
      reason: "No legal locations to move to right now.",
      moves: [],
    };

    const { body } = render(CardHoverCardContentTestHost, {
      props: {
        card: createCardSnapshot({
          cardType: "character",
          label: "Mickey Mouse - Brave Little Tailor",
          loreValue: 4,
        }),
        actions: [enabledAction, disabledAction],
      },
    });

    const unavailableSectionIndex = body.indexOf("Unavailable Actions");
    const enabledActionChipIndex = body.indexOf('data-testid="card-hover-action-chip-ink-card"');

    expect(unavailableSectionIndex).toBeGreaterThanOrEqual(0);
    expect(enabledActionChipIndex).toBeGreaterThanOrEqual(0);
    expect(unavailableSectionIndex).toBeLessThan(enabledActionChipIndex);
  });

  it("renders discard-cost Shift entries as keyword rows", () => {
    const { body } = render(CardHoverCardContentTestHost, {
      props: {
        card: createCardSnapshot({
          cardType: "character",
          label: "Ursula - Eric's Bride",
          strength: 2,
          baseStrength: 2,
          willpower: 4,
          baseWillpower: 4,
          loreValue: 2,
          baseLoreValue: 2,
          keywords: ["Shift"],
          textEntries: [
            {
              title: "Shift: Discard a song card",
              description:
                "(You may discard a song card to play this on top of one of your characters named Ursula.)",
            },
          ],
        }),
      },
    });

    expect(body).toContain("rules-entry--keyword");
    expect(body).toContain("Shift: Discard a song card");
  });
});
