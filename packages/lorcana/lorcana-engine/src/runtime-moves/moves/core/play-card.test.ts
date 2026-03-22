import { describe, expect, it } from "bun:test";
import type { ActionCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../../../card-i18n";
import { LorcanaMultiplayerTestEngine, PLAYER_ONE, createMockCharacter } from "../../../testing";

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
    cardNumber: 901,
  };
}

const conditionalExertCharacter = createMockCharacter({
  id: "conditional-exert-character",
  name: "Conditional Exert Character",
  cost: 3,
  strength: 3,
  willpower: 4,
  lore: 2,
  abilities: [
    {
      id: "conditional-exert-character-1",
      text: "This character enters play exerted unless you have Chip in play.",
      type: "static",
      condition: {
        type: "not",
        condition: {
          controller: "you",
          name: "Chip",
          type: "has-named-character",
        },
      },
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
    },
  ],
});

const chipCharacter = createMockCharacter({
  id: "conditional-exert-chip",
  name: "Chip",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
});

describe("playCard logging", () => {
  it("respects conditional enters-play-exerted static abilities", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [conditionalExertCharacter],
      inkwell: conditionalExertCharacter.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(conditionalExertCharacter).success).toBe(true);
    expect(engine.asPlayerOne().isExerted(conditionalExertCharacter)).toBe(true);
  });

  it("skips conditional enters-play-exerted when the named character is already in play", () => {
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [conditionalExertCharacter],
      inkwell: conditionalExertCharacter.cost,
      play: [chipCharacter],
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(conditionalExertCharacter).success).toBe(true);
    expect(engine.asPlayerOne().isExerted(conditionalExertCharacter)).toBe(false);
  });

  it("emits a localized play card log entry for characters", () => {
    const card = createMockCharacter({
      id: "play-log-character",
      name: "Play Log Character",
      cost: 2,
      strength: 2,
      willpower: 3,
      lore: 1,
    });
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [card],
      inkwell: card.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(card).success).toBe(true);

    const cardId = engine.findCardInstanceId(card, "play", PLAYER_ONE);
    const playEntry = engine
      .getServerEngine()
      .getRuntime()
      .getGameLog()
      .find((entry) => entry.defaultMessage?.key === "lorcana.move.playCard");
    expect(playEntry?.defaultMessage).toMatchObject({
      key: "lorcana.move.playCard",
      values: {
        playerId: PLAYER_ONE,
        cardId,
      },
    });
  });

  it("emits a localized play card log entry for actions before effect resolution continues", () => {
    const actionCard = createMockActionCard({
      id: "play-log-action",
      name: "Play Log Action",
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
    const engine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [actionCard],
      inkwell: actionCard.cost,
      deck: 2,
    });

    expect(engine.asPlayerOne().playCard(actionCard).success).toBe(true);

    const playEntry = engine
      .getServerEngine()
      .getRuntime()
      .getGameLog()
      .find((entry) => entry.defaultMessage?.key === "lorcana.move.playCard");
    expect(playEntry?.defaultMessage).toMatchObject({
      key: "lorcana.move.playCard",
      values: {
        playerId: PLAYER_ONE,
      },
    });
  });
});
