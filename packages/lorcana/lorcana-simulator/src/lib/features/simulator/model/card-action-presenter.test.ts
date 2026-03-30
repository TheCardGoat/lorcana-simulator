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

  it("keeps bodyguard play-state variants grouped under one play action", () => {
    const card = createCard({
      zoneId: "hand",
      label: "Bodyguard Ally",
      playCost: 3,
      keywords: ["Bodyguard"],
    });
    const readyMove = createMove({
      id: "playCard:card-1:ready",
      label: "Play Ready (Bodyguard Ally)",
      moveId: "playCard",
      params: { cardId: card.cardId },
      presentation: {
        kind: "targeted",
        categoryId: "play-card",
        categoryLabel: "Play",
        optionLabel: "Play Ready",
      },
    });
    const exertedMove = createMove({
      id: "playCard:card-1:exerted",
      label: "Play Exerted (Bodyguard Ally)",
      moveId: "playCard",
      params: { cardId: card.cardId, resolveOptional: true },
      presentation: {
        kind: "targeted",
        categoryId: "play-card",
        categoryLabel: "Play",
        optionLabel: "Play Exerted",
      },
    });

    const actions = buildCardActionViews({
      card,
      executableMoves: [readyMove, exertedMove],
      ownerSide: "playerOne",
      challengeReadyCardIds: [],
      movableToLocationCardIds: [],
    });

    expect(actions[0]).toEqual({
      id: `play-card:${card.cardId}`,
      cardId: card.cardId,
      categoryId: "play-card",
      label: "Play",
      detail: "3 ink",
      interaction: "execute-or-select",
      enabled: true,
      moves: [readyMove, exertedMove],
    });
  });

  it("shows discounted payable cost for a normal play action", () => {
    const card = createCard({
      zoneId: "hand",
      cost: 4,
      playCost: 3,
    });
    const playMove = createMove({
      id: "playCard:card-1",
      label: "Play Moana - Determined Explorer",
      moveId: "playCard",
      params: { cardId: card.cardId },
      presentation: {
        kind: "targeted",
        categoryId: "play-card",
        categoryLabel: "Play",
        optionLabel: card.label,
      },
    });

    const actions = buildCardActionViews({
      card,
      executableMoves: [playMove],
      ownerSide: "playerOne",
      challengeReadyCardIds: [],
      movableToLocationCardIds: [],
    });

    expect(actions[0]).toEqual({
      id: `play-card:${card.cardId}`,
      cardId: card.cardId,
      categoryId: "play-card",
      label: "Play",
      detail: "3 ink",
      interaction: "execute-or-select",
      enabled: true,
      moves: [playMove],
    });
  });

  it("shows a disabled shift action for hand cards with Shift when no legal shift move exists", () => {
    const card = createCard({
      zoneId: "hand",
      label: "Stitch - Rock Star",
      shiftInkCost: 4,
      shiftPlayCost: 4,
    });

    const actions = buildCardActionViews({
      card,
      executableMoves: [],
      ownerSide: "playerOne",
      challengeReadyCardIds: [],
      movableToLocationCardIds: [],
    });

    expect(actions).toEqual([
      {
        id: `disabled:play-card:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "play-card",
        label: "Play",
        interaction: "execute-or-select",
        enabled: false,
        reason: "This card cannot be played right now.",
        moves: [],
      },
      {
        id: `disabled:shift-card:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "shift-card",
        label: "Shift",
        interaction: "execute-or-select",
        enabled: false,
        reason: "This card cannot be shifted right now.",
        moves: [],
      },
      {
        id: `disabled:ink-card:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "ink-card",
        label: "Ink",
        interaction: "execute-or-select",
        enabled: false,
        reason: "This card cannot be inked right now.",
        moves: [],
      },
    ]);
  });

  it("shows an enabled shift action with discounted payable cost detail", () => {
    const card = createCard({
      zoneId: "hand",
      label: "Stitch - Rock Star",
      shiftInkCost: 4,
      shiftPlayCost: 3,
    });
    const shiftMove = createMove({
      id: "shiftCard:card-1:target-1",
      label: "Shift onto Stitch - Naughty Experiment",
      moveId: "playCard",
      params: { cardId: card.cardId, cost: "shift", targets: ["target-1"] },
      presentation: {
        kind: "targeted",
        categoryId: "shift-card",
        categoryLabel: "Shift",
        optionLabel: "Shift onto Stitch - Naughty Experiment",
      },
    });

    const actions = buildCardActionViews({
      card,
      executableMoves: [shiftMove],
      ownerSide: "playerOne",
      challengeReadyCardIds: [],
      movableToLocationCardIds: [],
    });

    expect(actions).toEqual([
      {
        id: `disabled:play-card:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "play-card",
        label: "Play",
        interaction: "execute-or-select",
        enabled: false,
        reason: "This card cannot be played right now.",
        moves: [],
      },
      {
        id: `shift-card:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "shift-card",
        label: "Shift",
        detail: "Pay 3 ink (4 base)",
        interaction: "execute-or-select",
        enabled: true,
        moves: [shiftMove],
      },
      {
        id: `disabled:ink-card:${card.cardId}`,
        cardId: card.cardId,
        categoryId: "ink-card",
        label: "Ink",
        interaction: "execute-or-select",
        enabled: false,
        reason: "This card cannot be inked right now.",
        moves: [],
      },
    ]);
  });
});
