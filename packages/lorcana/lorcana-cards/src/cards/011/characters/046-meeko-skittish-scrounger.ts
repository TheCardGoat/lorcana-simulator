import type { CharacterCard } from "@tcg/lorcana-types";
import { meekoSkittishScroungerI18n } from "./046-meeko-skittish-scrounger.i18n";

export const meekoSkittishScrounger: CharacterCard = {
  id: "9zz",
  canonicalId: "ci_9zz",
  reprints: ["set11-046"],
  cardType: "character",
  name: "Meeko",
  version: "Skittish Scrounger",
  inkType: ["amethyst"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 46,
  rarity: "uncommon",
  cost: 1,
  strength: 1,
  willpower: 1,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5be7a45f5453485dbebcd37b436210d9",
    tcgPlayer: 674701,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "BOTTOMLESS PIT",
      description:
        "At the end of your turn, if this character is exerted, choose and discard a card or banish him.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "157-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "157-2",
      name: "BOTTOMLESS PIT",
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            reference: "source",
            filters: [
              {
                type: "exerted",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          type: "or",
          optionLabels: ["choose and discard a card", "banish him"],
          options: [
            {
              amount: 1,
              chosen: true,
              from: "hand",
              target: "CONTROLLER",
              type: "discard",
            },
            {
              target: "SELF",
              type: "banish",
            },
          ],
        },
        type: "conditional",
      },
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      type: "triggered",
      text: "BOTTOMLESS PIT At the end of your turn, if this character is exerted, choose and discard a card or banish him.",
    },
  ],
  i18n: meekoSkittishScroungerI18n,
};
