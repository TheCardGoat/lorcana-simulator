import type { CharacterCard } from "@tcg/lorcana-types";

export const lingSnowWarrior: CharacterCard = {
  id: "09Z",
  canonicalId: "ci_09Z",
  reprints: ["set11-075"],
  cardType: "character",
  name: "Ling",
  version: "Snow Warrior",
  i18n: {
    en: {
      name: "Ling",
      version: "Snow Warrior",
      text: [
        {
          title: "BUILDING MUSCLES 1",
          description: "{I} — Chosen character gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Ling",
      version: "Schneekrieger",
      text: [
        {
          title: "MUSKELN AUFBAUEN 1",
          description: "— Ein Charakter deiner Wahl erhält in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Ling",
      version: "Guerrier des neiges",
      text: [
        {
          title: "PRENDRE DU MUSCLE 1",
          description: "— Choisissez un personnage qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Ling",
      version: "Guerriero delle Nevi",
      text: [
        {
          title: "METTERE SU MUSCOLI 1",
          description: "— Un personaggio a tua scelta riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Mulan",
  set: "011",
  cardNumber: 75,
  rarity: "rare",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_00eb4b66a7f945adaa15ca341179bbf7",
    tcgPlayer: 675389,
  },
  text: [
    {
      title: "BUILDING MUSCLES 1",
      description: "{I} — Chosen character gets +1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "bl8-1",
      cost: {
        exert: true,
      },
      effect: {
        modifier: 1,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
        duration: "this-turn",
      },
      type: "activated",
      text: "BUILDING MUSCLES 1 {I} — Chosen character gets +1 {S} this turn.",
    },
  ],
};
