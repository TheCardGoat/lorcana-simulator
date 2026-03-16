import type { LocationCard } from "@tcg/lorcana-types";

export const thebesTheBigOlive: LocationCard = {
  id: "SOw",
  canonicalId: "ci_SOw",
  reprints: ["set4-204"],
  cardType: "location",
  name: "Thebes",
  version: "The Big Olive",
  i18n: {
    en: {
      name: "Thebes",
      version: "The Big Olive",
      text: [
        {
          title: "IF YOU CAN MAKE IT HERE...",
          description:
            "During your turn, whenever a character banishes another character in a challenge while here, gain 2 lore.",
        },
      ],
    },
    de: {
      name: "Theben",
      version: "Theben erleben und sterben",
      text: [
        {
          title: "WENN DU'S IN THEBEN SCHAFFST,...",
          description:
            "Jedes Mal, wenn einer deiner Charakter, an diesem Ort, in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 2 Legenden.",
        },
      ],
    },
    fr: {
      name: "Thèbes",
      version: "Le Joyau de la Grèce",
      text: [
        {
          title: "SI TU Y ARRIVES MAINTENANT...",
          description:
            "Chaque fois qu'un personnage sur ce lieu en bannit un autre via un défi durant votre tour, gagnez 2 éclats de Lore.",
        },
      ],
    },
    it: {
      name: "Tebe",
      version: "La Grande Oliva",
      text: [
        {
          title: "SE CE LA FAI QUI...",
          description:
            "Durante il tuo turno, ogni volta che un personaggio esilia un altro personaggio in una sfida mentre si trova in questo luogo, ottieni 2 leggenda.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 204,
  rarity: "common",
  cost: 2,
  willpower: 7,
  moveCost: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_d30e4b994223457c8b38bc696aa91e06",
    tcgPlayer: 549295,
  },
  text: [
    {
      title: "IF YOU CAN MAKE IT HERE...",
      description:
        "During your turn, whenever a character banishes another character in a challenge while here, gain 2 lore.",
    },
  ],
  abilities: [
    {
      effect: {
        amount: 2,
        type: "gain-lore",
      },
      id: "niw-1",
      text: "IF YOU CAN MAKE IT HERE... During your turn, whenever a character banishes another character in a challenge while here, gain 2 lore.",
      trigger: {
        event: "banish-in-challenge",
        on: "CHARACTERS_HERE",
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
