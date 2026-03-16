import type { ItemCard } from "@tcg/lorcana-types";

export const rubyChromicon: ItemCard = {
  id: "RCb",
  canonicalId: "ci_RCb",
  reprints: ["set5-134"],
  cardType: "item",
  name: "Ruby Chromicon",
  i18n: {
    en: {
      name: "Ruby Chromicon",
      text: [
        {
          title: "RUBY LIGHT",
          description: "{E} — Chosen character gets +1 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Rubin Chromikon",
      text: [
        {
          title: "RUBINFARBENES LICHT",
          description: "— Gib einem Charakter deiner Wahl in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Chromicône de Rubis",
      text: [
        {
          title: "LUEUR DE RUBIS",
          description: "— Choisissez un personnage qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Cromicon di Rubino",
      text: [
        {
          title: "LUCE DI RUBINO",
          description: "— Un personaggio a tua scelta riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Lorcana",
  set: "005",
  cardNumber: 134,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_414acca972834b90bd464855d69b79cf",
    tcgPlayer: 560100,
  },
  text: [
    {
      title: "RUBY LIGHT",
      description: "{E} — Chosen character gets +1 {S} this turn.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1tf-1",
      name: "RUBY LIGHT",
      text: "RUBY LIGHT {E} — Chosen character gets +1 {S} this turn.",
      type: "activated",
    },
  ],
};
