import type { CharacterCard } from "@tcg/lorcana-types";

export const hydrosIceTitan: CharacterCard = {
  id: "vgI",
  canonicalId: "ci_vgI",
  reprints: ["set3-039"],
  cardType: "character",
  name: "Hydros",
  version: "Ice Titan",
  i18n: {
    en: {
      name: "Hydros",
      version: "Ice Titan",
      text: [
        {
          title: "BLIZZARD",
          description: "{E} — Exert chosen character.",
        },
      ],
    },
    de: {
      name: "Polaros",
      version: "Eis Titan",
      text: [
        {
          title: "BLIZZARD",
          description: "— Erschöpfe einen Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Hydros",
      version: "Titan de glace",
      text: [
        {
          title: "BLIZZARD",
          description: "— Choisissez un personnage et épuisez-le.",
        },
      ],
    },
    it: {
      name: "Hydros",
      version: "Titano di Ghiaccio",
      text: [
        {
          title: "TORMENTA",
          description: "— Impegna un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 39,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fabf6b8091ab49a1b2dccff0b1bb66ab",
    tcgPlayer: 537614,
  },
  text: [
    {
      title: "BLIZZARD",
      description: "{E} — Exert chosen character.",
    },
  ],
  classifications: ["Storyborn", "Titan"],
  abilities: [
    {
      id: "vgI-1",
      name: "BLIZZARD",
      text: "BLIZZARD {E} — Exert chosen character.",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "exert",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
        },
      },
    },
  ],
};
