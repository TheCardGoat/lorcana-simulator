import type { CharacterCard } from "@tcg/lorcana-types";

export const magicBroomTheBigSweeper: CharacterCard = {
  id: "W8m",
  canonicalId: "ci_W8m",
  reprints: ["set3-046"],
  cardType: "character",
  name: "Magic Broom",
  version: "The Big Sweeper",
  i18n: {
    en: {
      name: "Magic Broom",
      version: "The Big Sweeper",
      text: [
        {
          title: "CLEAN SWEEP",
          description: "While this character is at a location, it gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Zauberbesen",
      version: "Der große Feger",
      text: [
        {
          title: "SAUBERER FEGER",
          description: "Solange dieser Charakter an einem Ort ist, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Balais magiques",
      version: "Le grand nettoyeur",
      text: [
        {
          title: "NETTOYEUR DE GRANDES SURFACES",
          description: "Tant que ce personnage se trouve sur un lieu, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Scopa Magica",
      version: "Il Grande Spazzino",
      text: [
        {
          title: "PULIZIA PROFONDA",
          description: "Mentre questo personaggio si trova in un luogo, riceve +2.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Fantasia",
  set: "003",
  cardNumber: 46,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_5bb1d62852d74227a37ae937c075eef0",
    tcgPlayer: 539071,
  },
  text: [
    {
      title: "CLEAN SWEEP",
      description: "While this character is at a location, it gets +2 {S}.",
    },
  ],
  classifications: ["Dreamborn", "Broom"],
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "xj7-1",
      text: "CLEAN SWEEP While this character is at a location, it gets +2 {S}.",
      type: "static",
    },
  ],
};
