import type { CharacterCard } from "@tcg/lorcana-types";

export const rhinoOnesixteenthWolf: CharacterCard = {
  id: "dQB",
  canonicalId: "ci_dQB",
  reprints: ["set8-015"],
  cardType: "character",
  name: "Rhino",
  version: "One-Sixteenth Wolf",
  i18n: {
    en: {
      name: "Rhino",
      version: "One-Sixteenth Wolf",
      text: [
        {
          title: "TINY HOWL",
          description:
            "When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Dino",
      version: "Ein Sechzehntel Wolf",
      text: [
        {
          title: "LEISES JAULEN",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein gegnerischer Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -1.",
        },
      ],
    },
    fr: {
      name: "Rhino",
      version: "Un seizième de loup",
      text: [
        {
          title: "MINI HURLEMENT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -1 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Rhino",
      version: "Un Sedicesimo di Lupo",
      text: [
        {
          title: "MINI ULULATO",
          description:
            "Quando giochi questo personaggio, un personaggio avversario a tua scelta riceve -1 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 15,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2a18b29a3b7a4034b98a6207ec515377",
    tcgPlayer: 631359,
  },
  text: [
    {
      title: "TINY HOWL",
      description:
        "When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        modifier: -1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1bm-1",
      name: "TINY HOWL",
      text: "TINY HOWL When you play this character, chosen opposing character gets -1 {S} until the start of your next turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
