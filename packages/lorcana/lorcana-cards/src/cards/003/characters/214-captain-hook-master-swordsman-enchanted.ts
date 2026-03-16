import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookMasterSwordsmanEnchanted: CharacterCard = {
  id: "mkt",
  canonicalId: "ci_6Vd",
  reprints: ["set3-105"],
  cardType: "character",
  name: "Captain Hook",
  version: "Master Swordsman",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "Master Swordsman",
      text: [
        {
          title: "NEMESIS",
          description:
            "During your turn, whenever this character banishes another character in a challenge, ready this character. He can't quest for the rest of this turn.",
        },
        {
          title: "MAN-TO-MAN",
          description: "Characters named Peter Pan lose Evasive and can't gain Evasive.",
        },
      ],
    },
    de: {
      name: "Käpt'n Hook",
      version: "Meisterhafter Schwertkämpfer",
      text: [
        {
          title: "NEMESIS",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, mache diesen Charakter bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
        {
          title: "MANN GEGEN MANN",
          description:
            "Alle Peter-Pan-Charaktere verlieren Wendig und können Wendig nicht mehr erhalten.",
        },
      ],
    },
    fr: {
      name: "Capitaine Crochet",
      version: "Maître épéiste",
      text: [
        {
          title: "NÉMÉSIS",
          description:
            "Chaque fois que ce personnage en bannit un autre via un défi durant votre tour, redressez-le. Il ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
        {
          title: "COMBAT SINGULIER",
          description:
            "Les personnages Peter Pan perdent Insaisissable et ne peuvent pas gagner Insaisissable.",
        },
      ],
    },
    it: {
      name: "Capitan Uncino",
      version: "Maestro Spadaccino",
      text: [
        {
          title: "NEMESI",
          description:
            "Durante il tuo turno, ogni volta che questo personaggio esilia un altro personaggio in una sfida, preparalo. Non può andare all'avventura per il resto di questo turno.",
        },
        {
          title: "UOMO A UOMO I",
          description:
            "personaggi chiamati Peter Pan perdono Sfuggente e non possono ottenere Sfuggente.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "003",
  cardNumber: 214,
  rarity: "enchanted",
  specialRarity: "enchanted",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_266d7d17b42a44be9472057e4e6dd1b1",
    tcgPlayer: 539166,
  },
  text: [
    {
      title: "NEMESIS",
      description:
        "During your turn, whenever this character banishes another character in a challenge, ready this character. He can't quest for the rest of this turn.",
    },
    {
      title: "MAN-TO-MAN",
      description: "Characters named Peter Pan lose Evasive and can't gain Evasive.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Pirate", "Captain"],
  missingImplementation: true,
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "self",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "gip-1",
      name: "NEMESIS",
      text: "NEMESIS During your turn, whenever this character banishes another character in a challenge, ready this character. He can't quest for the rest of this turn.",
      trigger: {
        event: "banish",
        on: "OPPONENT_CHARACTERS",
        timing: "whenever",
      },
      type: "triggered",
    },
    {
      effect: {
        keyword: "Evasive",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "gip-2",
      text: "MAN-TO-MAN Characters named Peter Pan lose Evasive and can't gain Evasive.",
      type: "action",
    },
  ],
};
