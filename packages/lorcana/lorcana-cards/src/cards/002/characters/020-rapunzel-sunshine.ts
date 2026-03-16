import type { CharacterCard } from "@tcg/lorcana-types";

export const rapunzelSunshine: CharacterCard = {
  id: "W5W",
  canonicalId: "ci_Zyl",
  reprints: ["set2-020", "set9-008"],
  cardType: "character",
  name: "Rapunzel",
  version: "Sunshine",
  i18n: {
    en: {
      name: "Rapunzel",
      version: "Sunshine",
      text: [
        {
          title: "MAGIC HAIR",
          description: "{E} — Remove up to 2 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Rapunzel",
      version: "Sonnenschein",
      text: [
        {
          title: "ZAUBERHAARE",
          description: "— Entferne bis zu 2 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Raiponce",
      version: "Solaire",
      text: [
        {
          title: "CHEVEUX MAGIQUES",
          description: "— Choisissez un personnage et retirez-lui jusqu'à 2 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Rapunzel",
      version: "Raggio di Sole",
      text: [
        {
          title: "CAPELLI MAGICI",
          description: "— Rimuovi fino a 2 danni da un personaggio a tua scelta.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "002",
  cardNumber: 20,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ecef763660c74bd49ddb8930fb0ff10b",
    tcgPlayer: 649957,
  },
  text: [
    {
      title: "MAGIC HAIR",
      description: "{E} — Remove up to 2 damage from chosen character.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess"],
  missingTests: true,
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        amount: 2,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "remove-damage",
        upTo: true,
      },
      id: "zai-1",
      text: "MAGIC HAIR {E} — Remove up to 2 damage from chosen character.",
      type: "activated",
    },
  ],
};
