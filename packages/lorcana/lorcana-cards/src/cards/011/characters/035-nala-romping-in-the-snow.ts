import type { CharacterCard } from "@tcg/lorcana-types";

export const nalaRompingInTheSnow: CharacterCard = {
  id: "C3q",
  canonicalId: "ci_C3q",
  reprints: ["set11-035"],
  cardType: "character",
  name: "Nala",
  version: "Romping in the Snow",
  i18n: {
    en: {
      name: "Nala",
      version: "Romping in the Snow",
      text: [
        {
          title: "PLAYFUL SLIDE",
          description:
            "When you play this character, chosen character of yours gains Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Nala",
      version: "Tollt im Schnee",
      text: [
        {
          title: "VERSPIELTES RUTSCHEN",
          description:
            "Wenn du diesen Charakter ausspielst, wähle einen deiner Charaktere. Jener erhält bis zu Beginn deines nächsten Zuges Wendig.",
        },
      ],
    },
    fr: {
      name: "Nala",
      version: "Gambade dans la neige",
      text: [
        {
          title: "GLISSADE AMUSANTE",
          description:
            "Lorsque vous jouez ce personnage, choisissez l'un de vos personnages qui gagne Insaisissable jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Nala",
      version: "Che Gioca nella Neve",
      text: [
        {
          title: "SCIVOLATA GIOCOSA",
          description:
            "Quando giochi questo personaggio, un tuo personaggio a tua scelta ottiene Sfuggente fino all'inizio del tuo prossimo turno. (Solo altri personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lion King",
  set: "011",
  cardNumber: 35,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c86496abfa1c4cc9a138143a845e15ce",
    tcgPlayer: 674840,
  },
  text: [
    {
      title: "PLAYFUL SLIDE",
      description:
        "When you play this character, chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "leo-1",
      effect: {
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      name: "PLAYFUL SLIDE",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "PLAYFUL SLIDE When you play this character, chosen character of yours gains Evasive until the start of your next turn.",
    },
  ],
};
