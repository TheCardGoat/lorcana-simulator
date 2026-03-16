import type { CharacterCard } from "@tcg/lorcana-types";

export const stitchLittleTrickster: CharacterCard = {
  id: "Yiv",
  canonicalId: "ci_Yiv",
  reprints: ["set6-026"],
  cardType: "character",
  name: "Stitch",
  version: "Little Trickster",
  i18n: {
    en: {
      name: "Stitch",
      version: "Little Trickster",
      text: [
        {
          title: "NEED A HAND? 1",
          description: "{I} — This character gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Stitch",
      version: "Kleiner Scherzbold",
      text: [
        {
          title: "HELFENDE HAND 1",
          description: "— Dieser Charakter erhält in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Stitch",
      version: "Petit farceur",
      text: [
        {
          title: "BESOIN D'UN COUP DE MAIN? 1",
          description: "— Ce personnage gagne +1 pour le reste du tour.",
        },
      ],
    },
    it: {
      name: "Stitch",
      version: "Piccolo Imbroglione",
      text: [
        {
          title: "SERVE UNA MANO? 1",
          description: "— Questo personaggio riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 26,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_91292f4ca0684baf9ed9715bf7caa07a",
    tcgPlayer: 592007,
  },
  text: [
    {
      title: "NEED A HAND? 1",
      description: "{I} — This character gets +1 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Alien"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "kka-1",
      text: "NEED A HAND? 1 {I} - This character gets +1 {S} this turn.",
      type: "action",
    },
  ],
};
