import type { CharacterCard } from "@tcg/lorcana-types";

export const moanaBornLeader: CharacterCard = {
  id: "xR2",
  canonicalId: "ci_xR2",
  reprints: ["set3-116"],
  cardType: "character",
  name: "Moana",
  version: "Born Leader",
  i18n: {
    en: {
      name: "Moana",
      version: "Born Leader",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "WELCOME TO MY BOAT",
          description:
            "Whenever this character quests while at a location, ready all other characters here. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Vaiana",
      version: "Geborene Anführerin",
      text: "Gestaltwandel 3 WILLKOMMEN AUF MEINEM BOOT Jedes Mal, wenn dieser Charakter an einem Ort erkundet, mache alle deine anderen Charaktere an diesem Ort bereit. Sie können in diesem Zug nicht mehr erkunden.",
    },
    fr: {
      name: "Vaiana",
      version: "Cheffe née",
      text: "Alter 3 BIENVENUE SUR MON BATEAU Chaque fois que ce personnage est envoyé à l'aventure depuis un lieu, redressez tous les autres personnages qui s'y trouvent. Ils ne peuvent pas être envoyés à l'aventure pour le reste de ce tour.",
    },
    it: {
      name: "Vaiana",
      version: "Leader Nata",
      text: "Trasformazione 3 BENVENUTO SULLA MIA BARCA Ogni volta che questo personaggio va all'avventura mentre si trova in un luogo, prepara tutti gli altri personaggi in quel luogo. Non possono andare all'avventura per il resto di questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "003",
  cardNumber: 116,
  rarity: "rare",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d506a2271c444d7f9c2becae74535475",
    tcgPlayer: 532861,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "WELCOME TO MY BOAT",
      description:
        "Whenever this character quests while at a location, ready all other characters here. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Floodborn", "Hero", "Princess", "Captain"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "cku-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            target: {
              selector: "all",
              count: "all",
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
      id: "cku-2",
      name: "WELCOME TO MY BOAT",
      text: "WELCOME TO MY BOAT Whenever this character quests while at a location, ready all other characters here. They can't quest for the rest of this turn.",
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
