import type { CharacterCard } from "@tcg/lorcana-types";

export const rayaGuidanceSeeker: CharacterCard = {
  id: "dsU",
  canonicalId: "ci_dsU",
  reprints: ["set7-186"],
  cardType: "character",
  name: "Raya",
  version: "Guidance Seeker",
  i18n: {
    en: {
      name: "Raya",
      version: "Guidance Seeker",
      text: [
        {
          title: "A GREATER PURPOSE",
          description:
            "During your turn, whenever a card is put into your inkwell, this character gains Resist +1 until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Raya",
      version: "Sucht nach Führung",
      text: [
        {
          title: "EIN GRÖSSERER ZWECK",
          description:
            "Jedes Mal während deines Zuges, wenn eine Karte in deinen Tintenvorrat gelegt wird, erhält dieser Charakter bis zu Beginn deines nächsten Zuges Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Raya",
      version: "À la recherche de conseils",
      text: [
        {
          title: "UNE CAUSE PLUS GRANDE",
          description:
            "Durant votre tour, chaque fois qu'une carte est placée dans votre réserve d'encre, ce personnage gagne Résistance +1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Raya",
      version: "In Cerca di una Guida",
      text: [
        {
          title: "UNO SCOPO PIÙ GRANDE",
          description:
            "Durante il tuo turno, ogni volta che una carta viene aggiunta al tuo calamaio, questo personaggio ottiene Resistere +1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Raya and the Last Dragon",
  set: "007",
  cardNumber: 186,
  rarity: "rare",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0ab7da34efae4501b26ae156eb69755c",
    tcgPlayer: 619513,
  },
  text: [
    {
      title: "A GREATER PURPOSE",
      description:
        "During your turn, whenever a card is put into your inkwell, this character gains Resist +1 until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "1id-1",
      name: "A GREATER PURPOSE",
      text: "A GREATER PURPOSE During your turn, whenever a card is put into your inkwell, this character gains Resist +1 until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
