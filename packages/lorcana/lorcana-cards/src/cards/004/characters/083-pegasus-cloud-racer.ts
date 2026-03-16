import type { CharacterCard } from "@tcg/lorcana-types";

export const pegasusCloudRacer: CharacterCard = {
  id: "nia",
  canonicalId: "ci_nia",
  reprints: ["set4-083"],
  cardType: "character",
  name: "Pegasus",
  version: "Cloud Racer",
  i18n: {
    en: {
      name: "Pegasus",
      version: "Cloud Racer",
      text: [
        {
          title: "Shift 3",
        },
        {
          title: "Evasive",
        },
        {
          title: "HOP ON!",
          description:
            "When you play this character, if you used Shift to play him, your characters gain Evasive until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Pegasus",
      version: "Wolkenflitzer",
      text: "Gestaltwandel 3 Wendig SPRING AUF! Falls du Gestaltwandel benutzt hast, um diesen Charakter auszuspielen, erhalten deine Charaktere bis zu Beginn deines nächsten Zuges Wendig.",
    },
    fr: {
      name: "Pégase",
      version: "Fait la course aux nuages",
      text: "Alter 3 Insaisissable EN SELLE! Si vous jouez ce personnage en utilisant sa capacité Alter, vos personnages gagnent Insaisissable jusqu'au début de votre prochain tour.",
    },
    it: {
      name: "Pegaso",
      version: "Calcanuvole",
      text: "Trasformazione 3 Sfuggente SALTA SU! Quando giochi questo personaggio, se hai usato Trasformazione per giocarlo, i tuoi personaggi ottengono Sfuggente fino all'inizio del tuo prossimo turno.",
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 83,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_618b8dca0fe24706aae51c2c75736dd9",
    tcgPlayer: 549387,
  },
  text: [
    {
      title: "Shift 3",
    },
    {
      title: "Evasive",
    },
    {
      title: "HOP ON!",
      description:
        "When you play this character, if you used Shift to play him, your characters gain Evasive until the start of your next turn.",
    },
  ],
  classifications: ["Floodborn", "Ally"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "1b8-1",
      keyword: "Shift",
      text: "Shift 3",
      type: "keyword",
    },
    {
      id: "1b8-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          expression: "you used Shift to play him",
          type: "if",
        },
        then: {
          keyword: "Evasive",
          target: "YOUR_CHARACTERS",
          type: "gain-keyword",
        },
        type: "conditional",
      },
      id: "1b8-3",
      name: "HOP ON!",
      text: "HOP ON! When you play this character, if you used Shift to play him, your characters gain Evasive until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
