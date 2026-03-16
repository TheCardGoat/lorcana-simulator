import type { ItemCard } from "@tcg/lorcana-types";

export const magicMirror: ItemCard = {
  id: "7cO",
  canonicalId: "ci_dDL",
  reprints: ["set1-066", "set9-065"],
  cardType: "item",
  name: "Magic Mirror",
  i18n: {
    en: {
      name: "Magic Mirror",
      text: [
        {
          title: "SPEAK!",
          description: "{E}, 4 {I} — Draw a card.",
        },
      ],
    },
    de: {
      name: "Wunderspiegel",
      text: [
        {
          title: "SPRICH!, 4",
          description: "— Ziehe 1 Karte.",
        },
      ],
    },
    fr: {
      name: "MIROIR MAGIQUE",
      text: [
        {
          title: "PARLE!, 4",
          description: "— Piochez une carte.",
        },
      ],
    },
    it: {
      name: "Magic Mirror",
      text: [
        {
          title: "SPEAK!, 4",
          description: "— Draw a card.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Snow White",
  set: "001",
  cardNumber: 66,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_d0073192de544630825d3b25614fcd12",
    tcgPlayer: 650008,
  },
  text: [
    {
      title: "SPEAK!",
      description: "{E}, 4 {I} — Draw a card.",
    },
  ],
  abilities: [
    {
      id: "6c3-1",
      cost: {
        exert: true,
        ink: 4,
      },
      effect: {
        amount: 1,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "SPEAK!",
      type: "activated",
      text: "SPEAK! {E}, 4 {I} — Draw a card.",
    },
  ],
};
