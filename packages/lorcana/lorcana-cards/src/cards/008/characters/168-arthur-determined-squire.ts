import type { CharacterCard } from "@tcg/lorcana-types";

export const arthurDeterminedSquire: CharacterCard = {
  id: "LcR",
  canonicalId: "ci_LcR",
  reprints: ["set8-168"],
  cardType: "character",
  name: "Arthur",
  version: "Determined Squire",
  i18n: {
    en: {
      name: "Arthur",
      version: "Determined Squire",
      text: [
        {
          title: "NO MORE BOOKS",
          description: "Skip your turn's Draw step.",
        },
      ],
    },
    de: {
      name: "Arthur",
      version: "Entschlossener Knappe",
      text: [
        {
          title: "KEINE BÜCHER MEHR",
          description: 'Überspringe den Schritt "Ziehen" in deinem Zug.',
        },
      ],
    },
    fr: {
      name: "Arthur",
      version: "Écuyer déterminé",
      text: [
        {
          title: "FINI LES LIVRES",
          description: "Passez l'étape Piocher au début de votre tour.",
        },
      ],
    },
    it: {
      name: "Artù",
      version: "Scudiero Determinato",
      text: [
        {
          title: "BASTA CON I LIBRI",
          description: "Salta il passaggio di Pesca del tuo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire", "steel"],
  franchise: "Sword in the Stone",
  set: "008",
  cardNumber: 168,
  rarity: "uncommon",
  cost: 4,
  strength: 6,
  willpower: 6,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_c79a6e612467451ca809ce7ed1a9889f",
    tcgPlayer: 631763,
  },
  text: [
    {
      title: "NO MORE BOOKS",
      description: "Skip your turn's Draw step.",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      effect: {
        restriction: "skip-draw-step",
        target: "CONTROLLER",
        type: "restriction",
      },
      type: "static",
    },
  ],
};
