import { describe, expect, it } from "bun:test";

import { buildCardActionViews } from "./card-action-presenter.js";
import type { ExecutableMoveEntry, LorcanaCardSnapshot } from "./contracts.js";

function createCard(overrides: Partial<LorcanaCardSnapshot> = {}): LorcanaCardSnapshot {
  return {
    cardId: "card-1",
    definitionId: "def-1",
    isMasked: false,
    label: "Moana - Determined Explorer",
    ownerId: "player_one",
    ownerSide: "playerOne",
    zoneId: "play",
    cardType: "character",
    loreValue: 2,
    facePresentation: "faceUp",
    ...overrides,
  };
}

function createMove(move: ExecutableMoveEntry): ExecutableMoveEntry {
  return move;
}

describe("buildCardActionViews", () => {
  it("preserves quest lore detail without surfacing eager target counts", () => {
    const card = createCard();
    const questMove = createMove({
      id: "quest:card-1",
      label: "Quest with Moana",
      moveId: "quest",
      params: { cardId: card.cardId },
      presentation: {
        kind: "targeted",
        categoryId: "quest",
        categoryLabel: "Quest",
        optionLabel: card.label,
      },
    });

    const actions = buildCardActionViews({
      card,
      executableMoves: [questMove],
      ownerSide: "playerOne",
      challengeReadyCardIds: [card.cardId],
      movableToLocationCardIds: [card.cardId],
    });

    expect(actions).toEqual([
      {
        id: `quest:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "quest",
        label: "Quest for 2 lore",
        interaction: "execute-or-select",
        enabled: true,
        moves: [questMove],
      },
      {
        id: `challenge:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "challenge",
        label: "Challenge",
        interaction: "expand-on-click",
        enabled: true,
        moves: [],
      },
      {
        id: `move-to-location:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "move-to-location",
        label: "Move to Location",
        interaction: "expand-on-click",
        enabled: true,
        moves: [],
      },
    ]);
  });

  it("keeps activate-ability aggregated while leaving deferred actions empty", () => {
    const card = createCard({
      textEntries: [{ title: "{E} Encore", description: "Draw a card." }],
    });
    const abilityMove = createMove({
      id: "activateAbility:card-1:0",
      label: "Moana - Determined Explorer: {E} Encore",
      moveId: "activateAbility",
      params: { cardId: card.cardId, abilityIndex: 0 },
      presentation: {
        kind: "targeted",
        categoryId: "activate-ability",
        categoryLabel: "Activate Ability",
        optionLabel: "Moana - Determined Explorer: {E} Encore",
      },
    });

    const actions = buildCardActionViews({
      card,
      executableMoves: [abilityMove],
      ownerSide: "playerOne",
      challengeReadyCardIds: [],
      movableToLocationCardIds: [],
    });

    expect(actions.at(-1)).toEqual({
      id: `activate-ability:${card.cardId}`,
      cardId: card.cardId,
      categoryId: "activate-ability",
      label: "Activate Ability",
      interaction: "execute-or-select",
      enabled: true,
      moves: [abilityMove],
    });
    expect(actions.some((action) => action.detail?.includes("target"))).toBe(false);
    expect(actions.some((action) => action.detail?.includes("location"))).toBe(false);
  });
});
