import type { CharacterCard } from "@tcg/lorcana-types";

export const baymaxLowBattery: CharacterCard = {
  id: "7jV",
  canonicalId: "ci_7jV",
  reprints: ["set7-087"],
  cardType: "character",
  name: "Baymax",
  version: "Low Battery",
  i18n: {
    en: {
      name: "Baymax",
      version: "Low Battery",
      text: [
        {
          title: "SHHHHH",
          description: "This character enters play exerted.",
        },
      ],
    },
    de: {
      name: "Baymax",
      version: "Niedriger Akkustand",
      text: [
        {
          title: "SCHHHHH",
          description: "Dieser Charakter kommt erschöpft ins Spiel.",
        },
      ],
    },
    fr: {
      name: "Baymax",
      version: "Batterie faible",
      text: [
        {
          title: "PSSSHH",
          description: "Ce personnage entre en jeu épuisé.",
        },
      ],
    },
    it: {
      name: "Baymax",
      version: "Batteria Scarica",
      text: [
        {
          title: "SHHHHH",
          description: "Questo personaggio entra in gioco impegnato.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Big Hero 6",
  set: "007",
  cardNumber: 87,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_adb8a67a679f4e2199a7dc7a9c7a98a1",
    tcgPlayer: 619453,
  },
  text: [
    {
      title: "SHHHHH",
      description: "This character enters play exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Robot"],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "10p-1",
      name: "SHHHHH",
      text: "SHHHHH This character enters play exerted.",
      type: "static",
    },
  ],
};
