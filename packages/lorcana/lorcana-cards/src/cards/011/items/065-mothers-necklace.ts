import type { ItemCard } from "@tcg/lorcana-types";

export const mothersNecklace: ItemCard = {
  id: "3F4",
  canonicalId: "ci_3F4",
  reprints: ["set11-065"],
  cardType: "item",
  name: "Mother's Necklace",
  i18n: {
    en: {
      name: "Mother's Necklace",
      text: [
        {
          title: "PRECIOUS GIFT",
          description:
            "At the end of your turn, if none of your characters challenged this turn, chosen character of yours gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Mutters Halskette",
      text: [
        {
          title: "KOSTBARES GESCHENK",
          description:
            "Am Ende deines Zuges, falls in diesem Zug keiner deiner Charaktere herausgefordert hat, wähle einen deiner Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Collier de la mère",
      text: [
        {
          title: "UN CADEAU PRÉCIEUX À",
          description:
            "la fin de votre tour, si aucun de vos personnages n'a défié ce tour-ci, choisissez l'un de vos personnages qui gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Collana Materna",
      text: [
        {
          title: "DONO PREZIOSO",
          description:
            "Alla fine del tuo turno, se nessuno dei tuoi personaggi ha sfidato in questo turno, un tuo personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 65,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_f91b39cb2d4a47f984e9e5114216e75b",
    tcgPlayer: 675300,
  },
  text: [
    {
      title: "PRECIOUS GIFT",
      description:
        "At the end of your turn, if none of your characters challenged this turn, chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
  abilities: [
    {
      id: "1ag-1",
      name: "PRECIOUS GIFT",
      type: "triggered",
      trigger: {
        event: "end-turn",
        on: "YOU",
        timing: "at",
      },
      effect: {
        condition: {
          type: "turn-metric",
          metric: "challenges-by-player",
          comparison: {
            operator: "eq",
            value: 0,
          },
          playerScope: "you",
        },
        then: {
          keyword: "Evasive",
          target: {
            cardTypes: ["character"],
            count: 1,
            owner: "you",
            selector: "chosen",
            zones: ["play"],
          },
          type: "gain-keyword",
          duration: "until-start-of-next-turn",
        },
        type: "conditional",
      },
      text: "PRECIOUS GIFT At the end of your turn, if none of your characters challenged this turn, chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
};
