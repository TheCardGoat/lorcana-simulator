import type { ItemCard } from "@tcg/lorcana-types";

export const longboat: ItemCard = {
  id: "LxE",
  canonicalId: "ci_LxE",
  reprints: ["set6-132"],
  cardType: "item",
  name: "Longboat",
  i18n: {
    en: {
      name: "Longboat",
      text: [
        {
          title: "TAKE IT FOR A SPIN 2",
          description:
            "{I} — Chosen character of yours gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Langboot",
      text: [
        {
          title: "EINE SPRITZTOUR MACHEN 2",
          description:
            "— Wähle einen deiner Charaktere. Dieser erhält bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Chaloupe",
      text: [
        {
          title: "FAIRE UN TOUR 2",
          description:
            "— Choisissez l'un de vos personnages qui gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Scialuppa",
      text: [
        {
          title: "USCIRE PER UN GIRETTO 2",
          description:
            "— Un tuo personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 132,
  rarity: "uncommon",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_3f429b4816d0421cb951261fa3552a95",
    tcgPlayer: 592009,
  },
  text: [
    {
      title: "TAKE IT FOR A SPIN 2",
      description:
        "{I} — Chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
  abilities: [
    {
      cost: {
        ink: 2,
      },
      effect: {
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "you",
          selector: "chosen",
          zones: ["play"],
        },
        duration: "until-start-of-next-turn",
        type: "gain-keyword",
      },
      id: "1wi-1",
      name: "TAKE IT FOR A SPIN",
      text: "TAKE IT FOR A SPIN 2 {I} — Chosen character of yours gains Evasive until the start of your next turn.",
      type: "activated",
    },
  ],
};
