import type { CharacterCard } from "@tcg/lorcana-types";

export const jetsamUrsulasSpy: CharacterCard = {
  id: "0Bx",
  canonicalId: "ci_0Bx",
  reprints: ["set1-046"],
  cardType: "character",
  name: "Jetsam",
  version: "Ursula’s Spy",
  i18n: {
    en: {
      name: "Jetsam",
      version: "Ursula’s Spy",
      text: "Evasive SINISTER SLITHER Your characters named Flotsam gain Evasive.",
    },
    de: {
      name: "Meerschaum",
      version: "Ursulas Spion",
      text: "Wendig FIES UND GLITSCHIG Deine Abschaum-Charaktere erhalten Wendig.",
    },
    fr: {
      name: "JETSAM",
      version: "Espion d'Ursula",
      text: "Insaisissable SINISTRE ONDULATION Vos personnages Flotsam gagnent Insaisissable.",
    },
    it: {
      name: "Jetsam",
      version: "Ursula’s Spy",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) SINISTER SLITHER Your characters named Flotsam gain Evasive.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Little Mermaid",
  set: "001",
  cardNumber: 46,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_3725a62bd3aa40a086ad041a84a910d3",
    tcgPlayer: 503317,
  },
  text: "Evasive SINISTER SLITHER Your characters named Flotsam gain Evasive.",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "cdv-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        duration: "this-turn",
        keyword: "Evasive",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
      },
      id: "cdv-2",
      name: "SINISTER SLITHER",
      text: "SINISTER SLITHER Your characters named Flotsam gain Evasive.",
      type: "static",
    },
  ],
};
