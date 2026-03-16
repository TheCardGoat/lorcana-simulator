import type { CharacterCard } from "@tcg/lorcana-types";

export const flotsamUrsulasSpy: CharacterCard = {
  id: "BDi",
  canonicalId: "ci_BDi",
  reprints: ["set1-043"],
  cardType: "character",
  name: "Flotsam",
  version: "Ursula’s Spy",
  i18n: {
    en: {
      name: "Flotsam",
      version: "Ursula’s Spy",
      text: "Rush DEXTEROUS LUNGE Your characters named Jetsam gain Rush.",
    },
    de: {
      name: "Abschaum",
      version: "Ursulas Spion",
      text: "Rasant FLINK UND HINTERHÄLTIG Deine Meerschaum-Charaktere erhalten Rasant.",
    },
    fr: {
      name: "FLOTSAM",
      version: "Espion d'Ursula",
      text: "Charge COUP BAS Vos personnages Jetsam gagnent Charge.",
    },
    it: {
      name: "Flotsam",
      version: "Ursula’s Spy",
      text: [
        {
          title: "Rush",
          description:
            "(This character can challenge the turn they're played.) DEXTEROUS LUNGE Your characters named Jetsam gain Rush.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 43,
  rarity: "rare",
  cost: 5,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_e5912655e48f42a9ab863ac2337171cc",
    tcgPlayer: 503318,
  },
  text: "Rush DEXTEROUS LUNGE Your characters named Jetsam gain Rush.",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "4d0-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "4d0-2",
      name: "DEXTEROUS LUNGE",
      text: "DEXTEROUS LUNGE Your characters named Jetsam gain Rush.",
      type: "static",
    },
  ],
};
