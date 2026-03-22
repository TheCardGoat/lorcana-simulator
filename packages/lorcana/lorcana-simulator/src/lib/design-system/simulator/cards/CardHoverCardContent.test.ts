import { describe, expect, it } from "bun:test";
import { render } from "svelte/server";
import CardHoverCardContentTestHost from "./CardHoverCardContent.test-host.svelte";
import type { CardActionView, LorcanaCardSnapshot } from "@/features/simulator/model/contracts.js";

function createCardSnapshot(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: "card-1",
    definitionId: "def-card-1",
    facePresentation: "faceUp",
    isMasked: false,
    label: "Donald Duck - Musketeer",
    ownerId: "player-one",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType: "character",
    cost: 5,
    inkType: ["amber"],
    classifications: ["Dreamborn", "Hero", "Musketeer"],
    strength: 3,
    willpower: 6,
    loreValue: 1,
    damage: 0,
    readyState: "exerted",
    textEntries: [
      {
        title: "Bodyguard",
      },
      {
        title: "AND TWO FOR TEA!",
        description:
          "When you play this character, you may remove up to 2 damage from each of your Musketeer characters.",
      },
    ],
    ...overrides,
  };
}

function createAction(
  overrides: Partial<CardActionView> &
    Pick<CardActionView, "id" | "cardId" | "categoryId" | "label" | "enabled">,
): CardActionView {
  return {
    detail: undefined,
    moves: [],
    ...overrides,
  };
}

describe("CardHoverCardContent", () => {
  it("renders non-ability actions as horizontal chips instead of rules entries", () => {
    const { body } = render(CardHoverCardContentTestHost, {
      props: {
        card: createCardSnapshot(),
        actions: [
          createAction({
            id: "quest:card-1",
            cardId: "card-1",
            categoryId: "quest",
            label: "Quest for 1 lore",
            enabled: false,
            reason: "This character is exerted.",
          }),
          createAction({
            id: "challenge:card-1",
            cardId: "card-1",
            categoryId: "challenge",
            label: "Challenge",
            detail: "3 targets",
            enabled: true,
          }),
          createAction({
            id: "move-to-location:card-1",
            cardId: "card-1",
            categoryId: "move-to-location",
            label: "Move to location",
            detail: "2 locations",
            enabled: true,
          }),
        ],
      },
    });

    expect(body).toContain('data-testid="card-hover-action-chip-section"');
    expect(body).toContain('data-testid="card-hover-action-chip-quest"');
    expect(body).toContain('data-testid="card-hover-action-chip-challenge"');
    expect(body).toContain('data-testid="card-hover-action-chip-move-to-location"');
    expect(body).toContain('data-action-icon="quest"');
    expect(body).toContain('data-action-icon="challenge"');
    expect(body).toContain('data-action-icon="move-to-location"');
    expect(body).toContain("This character is exerted.");
    expect(body).not.toContain('class="ability-title">Challenge</span>');
    expect(body).not.toContain('class="ability-title">Move to location</span>');
  });
});
