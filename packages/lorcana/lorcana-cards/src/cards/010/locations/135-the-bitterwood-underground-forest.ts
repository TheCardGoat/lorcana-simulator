import type { LocationCard } from "@tcg/lorcana-types";

export const theBitterwoodUndergroundForest: LocationCard = {
  id: "XY0",
  canonicalId: "ci_XY0",
  reprints: ["set10-135"],
  cardType: "location",
  name: "The Bitterwood",
  version: "Underground Forest",
  i18n: {
    en: {
      name: "The Bitterwood",
      version: "Underground Forest",
      text: [
        {
          title: "GATHER RESOURCES",
          description:
            "Once during your turn, whenever you move a character with 5 {S} or more here, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Der Bitterwald",
      version: "Unterirdischer Wald",
      text: [
        {
          title: "RESSOURCEN SAMMELN",
          description:
            "Einmal während deines Zuges, wenn einer deiner Charaktere mit 5 oder mehr an diesen Ort bewegt wird, darfst du 1 Karte ziehen.",
        },
      ],
    },
    fr: {
      name: "Le Bois-Amer",
      version: "Forêt souterraine",
      text: [
        {
          title: "RASSEMBLER DES RESSOURCES",
          description:
            "Une fois durant votre tour, lorsque vous déplacez sur ce lieu un personnage ayant 5 ou plus, vous pouvez piocher une carte.",
        },
      ],
    },
    it: {
      name: "Il Bosco Amaro",
      version: "Foresta Sotterranea",
      text: [
        {
          title: "RACCOGLIERE RISORSE",
          description:
            "Una volta durante il tuo turno, ogni volta che sposti un personaggio con 5 o superiore in questo luogo, puoi pescare una carta.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lorcana",
  set: "010",
  cardNumber: 135,
  rarity: "rare",
  cost: 4,
  willpower: 7,
  moveCost: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d694639a68614bcc8d3a482c1f5c5da1",
    tcgPlayer: 658882,
  },
  text: [
    {
      title: "GATHER RESOURCES",
      description:
        "Once during your turn, whenever you move a character with 5 {S} or more here, you may draw a card.",
    },
  ],
  abilities: [
    {
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      id: "g5d-1",
      name: "GATHER RESOURCES Once",
      text: "GATHER RESOURCES Once during your turn, whenever you move a character with 5 {S} or more here, you may draw a card.",
      trigger: {
        event: "move",
        on: {
          cardType: "character",
          controller: "you",
          filters: [
            {
              type: "strength-comparison",
              comparison: "greater-or-equal",
              value: 5,
            },
            {
              type: "at-location",
              location: "this",
            },
          ],
        },
        restrictions: [
          {
            type: "during-turn",
            whose: "your",
          },
          {
            type: "first-time-each-turn",
          },
        ],
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
