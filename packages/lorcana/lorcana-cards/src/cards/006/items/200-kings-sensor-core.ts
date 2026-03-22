import type { ItemCard } from "@tcg/lorcana-types";
import { kingsSensorCoreI18n } from "./200-kings-sensor-core.i18n";

export const kingsSensorCore: ItemCard = {
  id: "SdR",
  canonicalId: "ci_SdR",
  reprints: ["set6-200"],
  cardType: "item",
  name: "King's Sensor Core",
  inkType: ["steel"],
  franchise: "Lorcana",
  set: "006",
  cardNumber: 200,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_4d8747b6f80e4bc5a39ace7edc6df9da",
    tcgPlayer: 592022,
  },
  text: [
    {
      title: "SYMBOL OF ROYALTY",
      description: "Your Prince and King characters gain Resist +1.",
    },
    {
      title: "ROYAL SEARCH",
      description:
        "{E}, 2 {I} — Reveal the top card of your deck. If it's a Prince or King character card, you may put that card into your hand. Otherwise, put it on the top of your deck.",
    },
  ],
  abilities: [
    {
      id: "1jp-1",
      name: "SYMBOL OF ROYALTY",
      type: "static",
      effect: {
        type: "gain-keyword",
        keyword: "Resist",
        value: 1,
        target: {
          selector: "all",
          count: "all",
          owner: "you",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "or",
              filters: [
                {
                  type: "has-classification",
                  classification: "Prince",
                },
                {
                  type: "has-classification",
                  classification: "King",
                },
              ],
            },
          ],
        },
      },
      text: "SYMBOL OF ROYALTY Your Prince and King characters gain Resist +1.",
    },
    {
      id: "1jp-2",
      name: "ROYAL SEARCH",
      type: "activated",
      cost: {
        exert: true,
        ink: 2,
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
                    type: "or",
                    filters: [
                      {
                        type: "has-classification",
                        classification: "Prince",
                      },
                      {
                        type: "has-classification",
                        classification: "King",
                      },
                    ],
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
              type: "put-on-top",
              source: "revealed",
            },
          },
        ],
      },
      text: "ROYAL SEARCH {E}, 2 {I} — Reveal the top card of your deck. If it's a Prince or King character card, you may put that card into your hand. Otherwise, put it on the top of your deck.",
    },
  ],
  i18n: kingsSensorCoreI18n,
};
