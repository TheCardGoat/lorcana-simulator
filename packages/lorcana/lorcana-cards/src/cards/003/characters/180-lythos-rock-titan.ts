import type { CharacterCard } from "@tcg/lorcana-types";

export const lythosRockTitan: CharacterCard = {
  id: "Hi2",
  canonicalId: "ci_Hi2",
  reprints: ["set3-180"],
  cardType: "character",
  name: "Lythos",
  version: "Rock Titan",
  i18n: {
    en: {
      name: "Lythos",
      version: "Rock Titan",
      text: [
        {
          title: "Resist +2",
        },
        {
          title: "STONE SKIN",
          description: "{E} — Chosen character gains Resist +2 this turn.",
        },
      ],
    },
    de: {
      name: "Granitos",
      version: "Stein Titan",
      text: "Robust +2 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.) STEINHAUT — Ein Charakter deiner Wahl erhält in diesem Zuges Robust +2.",
    },
    fr: {
      name: "Lythos",
      version: "Titan de pierre",
      text: "Résistance +2 PEAU DE PIERRE — Choisissez un personnage, il gagne Résistance +2 pour le reste de ce tour.",
    },
    it: {
      name: "Lythos",
      version: "Titano di Roccia",
      text: "Resistere +2 PELLE DI PIETRA — Un personaggio a tua scelta ottiene Resistere +2 per questo turno.",
    },
  },
  inkType: ["steel"],
  franchise: "Hercules",
  set: "003",
  cardNumber: 180,
  rarity: "uncommon",
  cost: 4,
  strength: 4,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_03d2c58be83e4132a95c060de2b00cbe",
    tcgPlayer: 537620,
  },
  text: [
    {
      title: "Resist +2",
    },
    {
      title: "STONE SKIN",
      description: "{E} — Chosen character gains Resist +2 this turn.",
    },
  ],
  classifications: ["Storyborn", "Titan"],
  missingTests: true,
  abilities: [
    {
      id: "ae9-1",
      keyword: "Resist",
      text: "Resist +2",
      type: "keyword",
      value: 2,
    },
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Resist",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
        value: 2,
      },
      id: "ae9-2",
      text: "STONE SKIN {E} — Chosen character gains Resist +2 this turn.",
      type: "activated",
    },
  ],
};
