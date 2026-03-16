import { describe, expect, it } from "bun:test";
import type { ActionCard } from "@tcg/lorcana-types";
import { createCardI18n } from "../card-i18n";
import { LorcanaMultiplayerTestEngine } from "../testing";

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

const suspendedAction = createMockActionCard({
  id: "suspended-action",
  name: "Suspended Action",
  cost: 2,
  text: "You may draw a card.",
  abilities: [
    {
      type: "action",
      effect: {
        chooser: "CONTROLLER",
        type: "optional",
        effect: {
          type: "draw",
          target: "CONTROLLER",
          amount: 1,
        },
      },
    },
  ],
});

describe("projectLorcanaBoardView", () => {
  it("includes suspended action cards from limbo in projected card snapshots", () => {
    const testEngine = LorcanaMultiplayerTestEngine.createWithFixture({
      hand: [suspendedAction],
      inkwell: suspendedAction.cost,
      deck: 3,
    });

    expect(testEngine.asPlayerOne().playCard(suspendedAction)).toBeSuccessfulCommand();

    const playerOneBoard = testEngine.asPlayerOne().getBoard();
    const playerTwoBoard = testEngine.asPlayerTwo().getBoard();
    const pendingEffect = playerOneBoard.pendingEffects[0];

    expect(pendingEffect?.sourceId).toBeDefined();
    const sourceId = pendingEffect?.sourceId;
    expect(sourceId).toBeDefined();
    if (!sourceId) {
      return;
    }

    expect(playerOneBoard.cards[sourceId]).toMatchObject({
      id: sourceId,
      zone: "limbo",
    });
    expect(playerTwoBoard.cards[sourceId]).toMatchObject({
      id: sourceId,
      zone: "limbo",
    });
  });
});
