import type { CharacterCard } from "@tcg/lorcana-types";

export const boltDownButNotOut: CharacterCard = {
  id: "9Ny",
  canonicalId: "ci_9Ny",
  reprints: ["set8-029"],
  cardType: "character",
  name: "Bolt",
  version: "Down but Not Out",
  i18n: {
    en: {
      name: "Bolt",
      version: "Down but Not Out",
      text: [
        {
          title: "NONE OF YOUR POWERS ARE WORKING",
          description: "This character enters play exerted.",
        },
      ],
    },
    de: {
      name: "Bolt",
      version: "Am Boden, aber nicht am Ende",
      text: [
        {
          title: "DEINE SUPERKRÄFTE FUNKTIONIEREN NICHT",
          description: "Dieser Charakter kommt erschöpft ins Spiel.",
        },
      ],
    },
    fr: {
      name: "Volt",
      version: "Abattu mais pas vaincu",
      text: [
        {
          title: "TOUS TES POUVOIRS ONT DISPARU",
          description: "Ce personnage entre en jeu épuisé.",
        },
      ],
    },
    it: {
      name: "Bolt",
      version: "Abbattuto ma Non Sconfitto",
      text: [
        {
          title: "I TUOI POTERI NON FUNZIONANO",
          description: "Questo personaggio entra in gioco impegnato.",
        },
      ],
    },
  },
  inkType: ["amber", "steel"],
  franchise: "Bolt",
  set: "008",
  cardNumber: 29,
  rarity: "rare",
  cost: 3,
  strength: 0,
  willpower: 4,
  lore: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_2571eeb8c4914f82863610ee7c92535a",
    tcgPlayer: 631371,
  },
  text: [
    {
      title: "NONE OF YOUR POWERS ARE WORKING",
      description: "This character enters play exerted.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        restriction: "enters-play-exerted",
        target: "SELF",
        type: "restriction",
      },
      id: "1q7-1",
      name: "NONE OF YOUR POWERS ARE WORKING",
      text: "NONE OF YOUR POWERS ARE WORKING This character enters play exerted.",
      type: "static",
    },
  ],
};
