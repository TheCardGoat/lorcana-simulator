import type { ItemCard } from "@tcg/lorcana-types";

export const iceBlock: ItemCard = {
  id: "uYP",
  canonicalId: "ci_uYP",
  reprints: ["set4-168"],
  cardType: "item",
  name: "Ice Block",
  i18n: {
    en: {
      name: "Ice Block",
      text: [
        {
          title: "CHILLY LABOR",
          description: "{E} — Chosen character gets -1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Eisklotz",
      text: [
        {
          title: "KÜHLES ARBEITEN",
          description: "— Gib einem Charakter deiner Wahl in diesem Zug -1.",
        },
      ],
    },
    fr: {
      name: "Bloc de Glace",
      text: [
        {
          title: "TRAVAIL GLACIAL",
          description: "— Choisissez un personnage qui subit -1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Blocco di Ghiaccio",
      text: [
        {
          title: "LAVORO DA BRIVIDI",
          description: "— Un personaggio a tua scelta riceve -1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 168,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_53adf0c7c527414ab222421a8b5e4ef3",
    tcgPlayer: 550615,
  },
  text: [
    {
      title: "CHILLY LABOR",
      description: "{E} — Chosen character gets -1 {S} this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        modifier: -1,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "ssh-1",
      name: "CHILLY LABOR",
      text: "CHILLY LABOR {E} — Chosen character gets -1 {S} this turn.",
      type: "activated",
    },
  ],
};
