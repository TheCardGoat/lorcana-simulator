import type { CharacterCard } from "@tcg/lorcana-types";

export const perditaOnTheLookout: CharacterCard = {
  id: "MrJ",
  canonicalId: "ci_MrJ",
  reprints: ["set8-014"],
  cardType: "character",
  name: "Perdita",
  version: "On the Lookout",
  i18n: {
    en: {
      name: "Perdita",
      version: "On the Lookout",
      text: [
        {
          title: "KEEPING WATCH",
          description: "While you have a Puppy character in play, this character gets +1 {W}.",
        },
      ],
    },
    de: {
      name: "Perdi",
      version: "Auf der Lauer",
      text: [
        {
          title: "HÄLT WACHE",
          description:
            "Solange du mindestens einen Welpen im Spiel hast, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Perdita",
      version: "Aux aguets",
      text: [
        {
          title: "MONTER LA GARDE",
          description: "Tant que vous avez un personnage Chiot en jeu, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Peggy",
      version: "Di Vedetta",
      text: [
        {
          title: "TENERE D'OCCHIO",
          description: "Mentre hai in gioco un personaggio Cucciolo, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "008",
  cardNumber: 14,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_c033341068524d02a75e3ff4d9c9f3e8",
    tcgPlayer: 631358,
  },
  text: [
    {
      title: "KEEPING WATCH",
      description: "While you have a Puppy character in play, this character gets +1 {W}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "willpower",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1uw-1",
      text: "KEEPING WATCH While you have a Puppy character in play, this character gets +1 {W}.",
      type: "action",
    },
  ],
};
