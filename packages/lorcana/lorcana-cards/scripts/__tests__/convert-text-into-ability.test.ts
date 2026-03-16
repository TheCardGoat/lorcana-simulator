import { describe, expect, it } from "bun:test";
import type { ActionCard, Effect } from "@tcg/lorcana-types";
import { allCards } from "../../src/cards/cards";
import {
  parseActionEffect,
  safeParseActionAbilities,
  safeParseActionEffect,
} from "../convert-text-into-ability/index";
import {
  parseCardTarget,
  parseCharacterTarget,
  parseItemTarget,
  parseLocationTarget,
  parsePlayerTarget,
} from "../convert-text-into-ability/target";

const chosenCharacterTarget = {
  selector: "chosen",
  count: 1,
  owner: "any",
  zones: ["play"],
  cardTypes: ["character"],
} as const;

function getActionCardByName(name: string): ActionCard {
  const card = allCards.find(
    (candidate): candidate is ActionCard =>
      candidate.cardType === "action" &&
      candidate.name === name &&
      typeof candidate.text === "string" &&
      Array.isArray(candidate.abilities) &&
      candidate.abilities.length > 0,
  );

  if (!card) {
    throw new Error(`Expected action card fixture "${name}" to exist`);
  }

  return card;
}

describe("convert-text-into-ability parser", () => {
  const fixtures: Array<{ text: string; expected: Effect }> = [
    {
      text: "If a character was banished this turn, draw 2 cards.",
      expected: {
        type: "conditional",
        condition: {
          type: "turn-metric",
          metric: "banished-characters",
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "draw",
          amount: 2,
          target: "CONTROLLER",
        },
      },
    },
    {
      text: "Chosen character can't be challenged until the start of your next turn.",
      expected: {
        type: "restriction",
        restriction: "cant-be-challenged",
        target: chosenCharacterTarget,
        duration: "until-start-of-next-turn",
      },
    },
    {
      text: "Each opponent loses lore equal to the damage on chosen character of yours, to a maximum of 4 lore each. Draw a card.",
      expected: {
        type: "sequence",
        steps: [
          {
            type: "for-each",
            counter: {
              type: "damage-on-target",
            },
            target: "CHOSEN_CHARACTER_OF_YOURS",
            maximum: 4,
            effect: {
              type: "lose-lore",
              amount: 1,
              target: "EACH_OPPONENT",
            },
          },
          {
            type: "draw",
            amount: 1,
            target: "CONTROLLER",
          },
        ],
      },
    },
    {
      text: "Chosen character of yours gains Resist +2 until the start of your next turn. (Damage dealt to them is reduced by 2.)",
      expected: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 2,
        duration: "until-start-of-next-turn",
        target: chosenCharacterTarget,
      },
    },
    {
      text: "Remove all damage from chosen character of yours. Draw a card for each 1 damage removed this way.",
      expected: {
        type: "sequence",
        steps: [
          {
            type: "remove-damage",
            amount: 99,
            target: "CHOSEN_CHARACTER_OF_YOURS",
          },
          {
            type: "draw",
            amount: {
              type: "for-each",
              counter: {
                type: "damage-removed",
              },
            },
            target: "CONTROLLER",
          },
        ],
      },
    },
    {
      text: "Banish all characters.",
      expected: {
        type: "banish",
        target: "ALL_CHARACTERS",
      },
    },
    {
      text: "Each opponent chooses and discards a card. If you have a character with Evasive in play, gain 1 lore.",
      expected: {
        type: "sequence",
        steps: [
          {
            type: "discard",
            amount: 1,
            chosen: true,
            target: "EACH_OPPONENT",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                owner: "you",
                zones: ["play"],
                cardType: "character",
                filters: [
                  {
                    type: "has-keyword",
                    keyword: "Evasive",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "gain-lore",
              amount: 1,
              target: "CONTROLLER",
            },
          },
        ],
      },
    },
    {
      text: "Draw 2 cards, then choose and discard a card.",
      expected: {
        type: "sequence",
        steps: [
          {
            type: "draw",
            amount: 2,
            target: "CONTROLLER",
          },
          {
            type: "discard",
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
          },
        ],
      },
    },
    {
      text: "You pay 2 {I} less for the next character you play this turn. Draw a card.",
      expected: {
        type: "sequence",
        steps: [
          {
            type: "cost-reduction",
            amount: 2,
            cardType: "character",
            duration: "next-play-this-turn",
            target: "CONTROLLER",
          },
          {
            type: "draw",
            amount: 1,
            target: "CONTROLLER",
          },
        ],
      },
    },
    {
      text: "Whenever one of your characters quests this turn, each opponent loses 1 lore.",
      expected: {
        type: "grant-ability",
        target: "YOUR_CHARACTERS",
        duration: "this-turn",
        ability: {
          type: "lose-lore-when-questing",
          amount: 1,
          target: "EACH_OPPONENT",
        },
      },
    },
    {
      text: "Each player reveals the top card of their deck. Draw a card for each different ink type of cards revealed this way.",
      expected: {
        type: "sequence",
        steps: [
          {
            type: "reveal-top-card",
            target: "EACH_PLAYER",
          },
          {
            type: "count",
            what: "distinct-revealed-ink-types",
          },
          {
            type: "draw",
            amount: {
              type: "trigger-amount",
            },
            target: "CONTROLLER",
          },
        ],
      },
    },
  ];

  for (const fixture of fixtures) {
    it(`parses: ${fixture.text}`, () => {
      expect(parseActionEffect(fixture.text)).toEqual(fixture.expected);
    });
  }

  it("parses common atomic actions", () => {
    expect(parseActionEffect("Draw a card.")).toEqual({
      type: "draw",
      amount: 1,
      target: "CONTROLLER",
    });

    expect(parseActionEffect("Each player draws 2 cards.")).toEqual({
      type: "draw",
      amount: 2,
      target: "EACH_PLAYER",
    });

    expect(parseActionEffect("Gain 1 lore.")).toEqual({
      type: "gain-lore",
      amount: 1,
      target: "CONTROLLER",
    });
  });

  it("expands direct player target matching", () => {
    expect(parsePlayerTarget("your opponent")).toEqual({
      consumed: "your opponent",
      target: "OPPONENT",
    });

    expect(parsePlayerTarget("that player")).toEqual({
      consumed: "that player",
      target: "THAT_PLAYER",
    });
  });

  it("expands direct character target matching", () => {
    expect(parseCharacterTarget("your chosen character")).toEqual({
      consumed: "your chosen character",
      target: "YOUR_CHOSEN_CHARACTER",
    });

    expect(parseCharacterTarget("chosen opposing damaged character")).toEqual({
      consumed: "chosen opposing damaged character",
      target: "CHOSEN_OPPOSING_DAMAGED_CHARACTER",
    });

    expect(parseCharacterTarget("opposing evasive characters")).toEqual({
      consumed: "opposing evasive characters",
      target: "OPPOSING_EVASIVE_CHARACTERS",
    });
  });

  it("expands direct item and location target matching", () => {
    expect(parseItemTarget("your items")).toEqual({
      consumed: "your items",
      target: {
        selector: "all",
        count: "all",
        owner: "you",
        zones: ["play"],
        cardTypes: ["item"],
      },
    });

    expect(parseLocationTarget("each location")).toEqual({
      consumed: "each location",
      target: {
        selector: "all",
        count: "all",
        owner: "any",
        zones: ["play"],
        cardTypes: ["location"],
      },
    });
  });

  it("keeps mixed card-target regex matching intact", () => {
    expect(parseCardTarget("chosen character, item, or location")).toEqual({
      consumed: "chosen character, item, or location",
      target: "CHOSEN_CHARACTER_ITEM_OR_LOCATION",
    });
  });

  it("parses plural keyword gain targets explicitly", () => {
    expect(
      safeParseActionEffect("Your characters gain Resist +2 until the start of your next turn."),
    ).toEqual({
      success: true,
      effect: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 2,
        duration: "until-start-of-next-turn",
        target: "YOUR_CHARACTERS",
      },
    });
  });

  it("normalizes direct action targets in parsed abilities", () => {
    const parsed = safeParseActionAbilities("Each opponent chooses and discards a card.");

    expect(parsed).toEqual({
      success: true,
      abilities: [
        {
          type: "action",
          effect: {
            type: "discard",
            amount: 1,
            chosen: true,
            target: {
              selector: "each-opponent",
            },
          },
        },
      ],
    });
  });

  it("reuses the prior chosen target for follow-up restrictions", () => {
    expect(
      parseActionEffect("Ready chosen character. They can't quest for the rest of this turn."),
    ).toEqual({
      type: "sequence",
      steps: [
        {
          type: "ready",
          target: "CHOSEN_CHARACTER",
        },
        {
          type: "restriction",
          restriction: "cant-quest",
          duration: "this-turn",
          target: "CHOSEN_CHARACTER",
        },
      ],
    });
  });

  it("parses next-turn keyword durations separately from the keyword", () => {
    expect(parseActionEffect("Chosen character gains Reckless during their next turn.")).toEqual({
      type: "gain-keyword",
      keyword: "Reckless",
      duration: "their-next-turn",
      value: undefined,
      target: {
        selector: "chosen",
        count: 1,
        owner: "any",
        zones: ["play"],
        cardTypes: ["character"],
      },
    });
  });

  it("rejects unsupported shapes explicitly", () => {
    expect(safeParseActionEffect("Choose one: Draw a card or banish all characters.")).toEqual({
      success: false,
      error: 'Unsupported atomic effect: "Choose one: Draw a card or banish all characters."',
    });
  });

  it("matches canonical effects for targeted real action cards", () => {
    const exactMatchCards = [
      "Four Dozen Eggs",
      "Royal Tantrum",
      "Ever as Before",
      "Remember Who You Are",
      "Time to Go!",
    ] as const;

    for (const cardName of exactMatchCards) {
      const card = getActionCardByName(cardName);
      expect(parseActionEffect(card.text)).toEqual(card.abilities[0].effect);
    }
  });
});
