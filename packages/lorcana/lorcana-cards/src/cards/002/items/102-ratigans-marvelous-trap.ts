import type { ItemCard } from "@tcg/lorcana-types";

export const ratigansMarvelousTrap: ItemCard = {
  id: "Faq",
  canonicalId: "ci_Faq",
  reprints: ["set2-102"],
  cardType: "item",
  name: "Ratigan's Marvelous Trap",
  i18n: {
    en: {
      name: "Ratigan's Marvelous Trap",
      text: [
        {
          title: "SNAP!",
        },
        {
          title: "BOOM!",
        },
        {
          title: "TWANG!",
          description: "Banish this item — Each opponent loses 2 lore.",
        },
      ],
    },
    de: {
      name: "Rattenzahns fabelhafte Falle",
      text: [
        {
          title: "SCHNAPP!",
        },
        {
          title: "BUMS!",
        },
        {
          title: "BOING!",
          description:
            "Verbanne diesen Gegenstand — Alle gegnerischen Mitspielenden verlieren je 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Piège génial de Ratigan",
      text: [
        {
          title: "ZAP!",
        },
        {
          title: "BOUM!",
        },
        {
          title: "TWING!",
          description: "Bannissez cet objet — Chaque adversaire perd 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Ratigan's Marvelous Trap",
      text: [
        {
          title: "SNAP!",
        },
        {
          title: "BOOM!",
        },
        {
          title: "TWANG!",
          description: "Banish this item — Each opponent loses 2 lore.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 102,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_99154bf3bafd47f6ae3736da4cd5424f",
    tcgPlayer: 527245,
  },
  text: [
    {
      title: "SNAP!",
    },
    {
      title: "BOOM!",
    },
    {
      title: "TWANG!",
      description: "Banish this item — Each opponent loses 2 lore.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        amount: 2,
        target: "EACH_OPPONENT",
        type: "lose-lore",
      },
      id: "1wo-1",
      name: "SNAP! BOOM! TWANG!",
      text: "SNAP! BOOM! TWANG! Banish this item — Each opponent loses 2 lore.",
      type: "activated",
    },
  ],
};
