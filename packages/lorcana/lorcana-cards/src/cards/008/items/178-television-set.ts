import type { ItemCard } from "@tcg/lorcana-types";
import { televisionSetI18n } from "./178-television-set.i18n";

export const televisionSet: ItemCard = {
  id: "I9h",
  canonicalId: "ci_I9h",
  reprints: ["set8-178"],
  cardType: "item",
  name: "Television Set",
  inkType: ["sapphire"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 178,
  rarity: "common",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_133af5231e8e4e3798381e8a03b4ae09",
    tcgPlayer: 631686,
  },
  text: [
    {
      title: "IS IT ON YET?",
      description:
        "{E}, 1 {I} — Look at the top card of your deck. If it's a Puppy character card, you may reveal it and put it into your hand. Otherwise, put it on the bottom of your deck.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        type: "sequence",
        steps: [
          {
            type: "reveal-top-card",
            target: "CONTROLLER",
          },
          {
            type: "conditional",
            condition: {
              type: "target-query",
              query: {
                selector: "all",
                reference: "revealed-first",
                cardType: "character",
                filters: [
                  {
                    type: "has-classification",
                    classification: "Puppy",
                  },
                ],
              },
              comparison: {
                operator: "gte",
                value: 1,
              },
            },
            then: {
              type: "optional",
              chooser: "CONTROLLER",
              effect: {
                type: "put-in-hand",
                source: "revealed",
                target: "CONTROLLER",
              },
            },
            else: {
              type: "put-on-bottom",
              target: {
                selector: "chosen",
                count: 1,
                reference: "revealed-first",
              },
            },
          },
        ],
      },
      id: "pbp-1",
      name: "IS IT ON YET?",
      text: "IS IT ON YET? {E}, 1 {I} —  Look at the top card of your deck. If it's a Puppy character card, you may reveal it and put it into your hand. Otherwise, put it on the bottom of your deck.",
      type: "activated",
    },
  ],
  i18n: televisionSetI18n,
};
