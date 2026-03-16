import type { ItemCard } from "@tcg/lorcana-types";

export const sunglasses: ItemCard = {
  id: "5mj",
  canonicalId: "ci_5mj",
  reprints: ["set6-202"],
  cardType: "item",
  name: "Sunglasses",
  i18n: {
    en: {
      name: "Sunglasses",
      text: [
        {
          title: "SPYCRAFT",
          description: "{E} — Draw a card, then choose and discard a card.",
        },
      ],
    },
    de: {
      name: "Sonnenbrille",
      text: [
        {
          title: "SPIONAGETECHNIK",
          description: "— Ziehe 1 Karte. Wähle danach 1 Karte aus deiner Hand und wirf sie ab.",
        },
      ],
    },
    fr: {
      name: "Lunettes de soleil",
      text: [
        {
          title: "ESPIONNAGE",
          description: "— Piochez une carte, puis défaussez une carte.",
        },
      ],
    },
    it: {
      name: "Occhiali da Sole",
      text: [
        {
          title: "GADGET DA SPIONAGGIO",
          description: "— Pesca una carta, poi scegli e scarta una carta.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 202,
  rarity: "common",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_2ae2d2f7e846489a802db83587a26fc3",
    tcgPlayer: 587753,
  },
  text: [
    {
      title: "SPYCRAFT",
      description: "{E} — Draw a card, then choose and discard a card.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        steps: [
          {
            amount: 1,
            target: "CONTROLLER",
            type: "draw",
          },
          {
            amount: 1,
            chosen: true,
            target: "CONTROLLER",
            type: "discard",
          },
        ],
        type: "sequence",
      },
      id: "18a-1",
      name: "SPYCRAFT",
      text: "SPYCRAFT {E} — Draw a card, then choose and discard a card.",
      type: "activated",
    },
  ],
};
