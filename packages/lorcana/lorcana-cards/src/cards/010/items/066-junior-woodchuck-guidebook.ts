import type { ItemCard } from "@tcg/lorcana-types";

export const juniorWoodchuckGuidebook: ItemCard = {
  id: "kZV",
  canonicalId: "ci_kZV",
  reprints: ["set10-066"],
  cardType: "item",
  name: "Junior Woodchuck Guidebook",
  i18n: {
    en: {
      name: "Junior Woodchuck Guidebook",
      text: [
        {
          title: "THE BOOK KNOWS EVERYTHING",
          description: "{E}, 1 {I}, Banish this item — Draw 2 cards.",
        },
      ],
    },
    de: {
      name: "Das schlaue Buch",
      text: [
        {
          title: "DAS BUCH WEISS ALLES, 1,",
          description: "Verbanne diesen Gegenstand — Ziehe 2 Karten.",
        },
      ],
    },
    fr: {
      name: "Le Manuel des Castors Juniors",
      text: [
        {
          title: "CE MANUEL SAIT ABSOLUMENT TOUT, 1,",
          description: "Bannissez cet objet — Piochez 2 cartes.",
        },
      ],
    },
    it: {
      name: "Manuale delle Giovani Marmotte",
      text: [
        {
          title: "IL MANUALE SA SEMPRE TUTTO, 1,",
          description: "esilia questo oggetto — Pesca 2 carte.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Ducktales",
  set: "010",
  cardNumber: 66,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_531cdf5a74f047b29e6129e583b12aa3",
    tcgPlayer: 659448,
  },
  text: [
    {
      title: "THE BOOK KNOWS EVERYTHING",
      description: "{E}, 1 {I}, Banish this item — Draw 2 cards.",
    },
  ],
  abilities: [
    {
      id: "ebe-1",
      cost: {
        exert: true,
        ink: 1,
        banishSelf: true,
      },
      effect: {
        amount: 2,
        target: "CONTROLLER",
        type: "draw",
      },
      name: "THE BOOK KNOWS EVERYTHING",
      type: "activated",
      text: "THE BOOK KNOWS EVERYTHING {E}, 1 {I}, Banish this item — Draw 2 cards.",
    },
  ],
};
