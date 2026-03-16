import type { CharacterCard } from "@tcg/lorcana-types";

export const akelaForestRunner: CharacterCard = {
  id: "iHw",
  canonicalId: "ci_iHw",
  reprints: ["set10-090"],
  cardType: "character",
  name: "Akela",
  version: "Forest Runner",
  i18n: {
    en: {
      name: "Akela",
      version: "Forest Runner",
      text: [
        {
          title: "AHEAD OF THE PACK 1",
          description: "{I} — This character gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Akela",
      version: "Waldläufer",
      text: [
        {
          title: "DEM RUDEL VORAUS 1",
          description: "— Dieser Charakter erhält in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Akela",
      version: "Court dans la forêt",
      text: [
        {
          title: "À L'AVANT DE LA MEUTE",
          description: "1 — Ce personnage gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Akela",
      version: "Corridore Silvano",
      text: [
        {
          title: "DAVANTI AL BRANCO 1",
          description: "— Questo personaggio riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 90,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_37c56a7dac1a492499e021595eda74a7",
    tcgPlayer: 659186,
  },
  text: [
    {
      title: "AHEAD OF THE PACK 1",
      description: "{I} — This character gets +1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      name: "AHEAD OF THE PACK 1",
      cost: {
        ink: 1,
      },
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "10m-1",
      text: "AHEAD OF THE PACK 1 {I} — This character gets +1 {S} this turn.",
      type: "activated",
    },
  ],
};
