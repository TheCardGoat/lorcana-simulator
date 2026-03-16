import type { LocationCard } from "@tcg/lorcana-types";

export const bellesHouseMauricesWorkshopEnchanted: LocationCard = {
  id: "h8f",
  canonicalId: "ci_6N3",
  reprints: ["set3-168"],
  cardType: "location",
  name: "Belle's House",
  version: "Maurice's Workshop",
  i18n: {
    en: {
      name: "Belle's House",
      version: "Maurice's Workshop",
      text: [
        {
          title: "LABORATORY",
          description: "If you have a character here, you pay 1 {I} less to play items.",
        },
      ],
    },
    de: {
      name: "Belles Zuhause",
      version: "Maurices Werkstatt",
      text: [
        {
          title: "LABORATORIUM",
          description:
            "Solange du mindestens einen Charakter an diesem Ort hast, zahlst du 1 weniger, um Gegenstände auszuspielen.",
        },
      ],
    },
    fr: {
      name: "La maison de Belle",
      version: "Atelier de Maurice",
      text: [
        {
          title: "LABORATOIRE",
          description:
            "Tant que vous avez au moins un personnage sur ce lieu, les objets vous coûtent 1 de moins.",
        },
      ],
    },
    it: {
      name: "Casa di Belle",
      version: "Officina di Maurice",
      text: [
        {
          title: "LABORATORIO",
          description:
            "Mentre hai uno o più personaggi in questo luogo, paga 1 in meno per giocare gli oggetti.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Beauty and the Beast",
  set: "003",
  cardNumber: 219,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 1,
  willpower: 6,
  moveCost: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_c9f08696c3cd44bf96e2a149bb3cfb12",
    tcgPlayer: 539169,
  },
  text: [
    {
      title: "LABORATORY",
      description: "If you have a character here, you pay 1 {I} less to play items.",
    },
  ],
  abilities: [
    {
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          owner: "you",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "same-location-as-source",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        amount: 1,
        cardType: "item",
        type: "cost-reduction",
      },
      type: "static",
    },
  ],
};
