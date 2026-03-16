import type { ActionCard } from "@tcg/lorcana-types";

export const freezeTheVine: ActionCard = {
  id: "DI6",
  canonicalId: "ci_LB6",
  reprints: ["set11-096"],
  cardType: "action",
  name: "Freeze the Vine",
  i18n: {
    en: {
      name: "Freeze the Vine",
      text: "Banish all locations. Draw 2 cards, then choose and discard a card.",
    },
    de: {
      name: "Gefrier die Ranke",
      text: "Verbanne alle Orte. Ziehe 2 Karten. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
    },
    fr: {
      name: "Geler la Plante",
      text: "Bannissez tous les lieux. Piochez 2 cartes, puis défaussez une carte.",
    },
    it: {
      name: "Congelare il Viticcio",
      text: "Esilia tutti i luoghi. Pesca 2 carte, poi scegli e scarta una carta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Frozen",
  set: "011",
  cardNumber: 96,
  rarity: "rare",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_d0659baf8fad4748ae9abf7260279d8c",
    tcgPlayer: 675395,
  },
  text: "Banish all locations. Draw 2 cards, then choose and discard a card.",
  abilities: [
    {
      type: "action",
      text: "Banish all locations. Draw 2 cards, then choose and discard a card.",
      effect: {
        type: "sequence",
        steps: [
          {
            type: "banish",
            target: {
              selector: "all",
              count: "all",
              owner: "any",
              zones: ["play"],
              cardTypes: ["location"],
            },
          },
          {
            type: "draw",
            amount: 2,
            target: "CONTROLLER",
          },
          {
            type: "discard",
            amount: 1,
            chosen: true,
            from: "hand",
            target: "CONTROLLER",
          },
        ],
      },
    },
  ],
};
