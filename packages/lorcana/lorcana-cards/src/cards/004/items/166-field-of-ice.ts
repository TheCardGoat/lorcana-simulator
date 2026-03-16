import type { ItemCard } from "@tcg/lorcana-types";

export const fieldOfIce: ItemCard = {
  id: "DSK",
  canonicalId: "ci_DSK",
  reprints: ["set4-166"],
  cardType: "item",
  name: "Field of Ice",
  i18n: {
    en: {
      name: "Field of Ice",
      text: [
        {
          title: "ICY DEFENSE",
          description:
            "Whenever you play a character, they gain Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Eisfläche",
      text: [
        {
          title: "EISIGE VERTEIDIGUNG",
          description:
            "Jedes Mal, wenn du einen Charakter ausspielst, erhält er bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der dem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Champ de Glace",
      text: [
        {
          title: "DÉFENSE GLACÉE",
          description:
            "Chaque fois que vous jouez un personnage, il gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Distesa di Ghiaccio",
      text: [
        {
          title: "DIFESA GLACIALE",
          description:
            "Ogni volta che giochi un personaggio, ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 166,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_e8595996603e4e3ab8d772a573e75f5b",
    tcgPlayer: 548594,
  },
  text: [
    {
      title: "ICY DEFENSE",
      description:
        "Whenever you play a character, they gain Resist +1 until the start of your next turn.",
    },
  ],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
        value: 1,
      },
      id: "1kk-1",
      name: "ICY DEFENSE",
      text: "ICY DEFENSE Whenever you play a character, they gain Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "character",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
