import type { CharacterCard } from "@tcg/lorcana-types";

export const ladyElegantSpaniel: CharacterCard = {
  id: "8jF",
  canonicalId: "ci_8jF",
  reprints: ["set7-100"],
  cardType: "character",
  name: "Lady",
  version: "Elegant Spaniel",
  i18n: {
    en: {
      name: "Lady",
      version: "Elegant Spaniel",
      text: [
        {
          title: "A DOG'S LIFE",
          description:
            "While you have a character named Tramp in play, this character gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "Susi",
      version: "Elegante Spaniel",
      text: [
        {
          title: "EIN HUNDELEBEN",
          description:
            "Solange du mindestens einen Strolch-Charakter im Spiel hast, erhält dieser Charakter +1.",
        },
      ],
    },
    fr: {
      name: "Lady",
      version: "Épagneule élégante",
      text: [
        {
          title: "LES DROITS DU CITOYEN CHIEN",
          description:
            "Tant que vous avez un personnage Clochard en jeu, ce personnage-ci gagne +1.",
        },
      ],
    },
    it: {
      name: "Lilli",
      version: "Elegante Cocker",
      text: [
        {
          title: "LA VITA D'UN CANE",
          description:
            "Mentre hai in gioco un personaggio chiamato Biagio, questo personaggio riceve +1.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 100,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_923b464195ae4552b00f557378bc77a3",
    tcgPlayer: 618161,
  },
  text: [
    {
      title: "A DOG'S LIFE",
      description: "While you have a character named Tramp in play, this character gets +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "14v-1",
      text: "A DOG'S LIFE While you have a character named Tramp in play, this character gets +1 {L}.",
      type: "action",
    },
  ],
};
