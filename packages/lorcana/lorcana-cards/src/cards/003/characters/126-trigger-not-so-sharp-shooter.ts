import type { CharacterCard } from "@tcg/lorcana-types";

export const triggerNotsosharpShooter: CharacterCard = {
  id: "7rS",
  canonicalId: "ci_7rS",
  reprints: ["set3-126"],
  cardType: "character",
  name: "Trigger",
  version: "Not-So-Sharp Shooter",
  i18n: {
    en: {
      name: "Trigger",
      version: "Not-So-Sharp Shooter",
      text: [
        {
          title: "OLD BETSY",
          description: "Your characters named Nutsy get +1 {L}.",
        },
      ],
    },
    de: {
      name: "Trigger",
      version: "Unscharfschütze",
      text: [
        {
          title: "ALTE BETSY",
          description: "Deine Nutsy-Charaktere erhalten +1.",
        },
      ],
    },
    fr: {
      name: "Pendard",
      version: "Tireur pas si précis que ça",
      text: [
        {
          title: "MA VIEILLE BERTA",
          description: "Vos personnages Niquedouille gagnent +1.",
        },
      ],
    },
    it: {
      name: "Crucco",
      version: "Tiratore non Tanto Scelto",
      text: [
        {
          title: "VECCHIA BETSY I",
          description: "tuoi personaggi chiamati Tonto ricevono +1.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 126,
  rarity: "uncommon",
  cost: 2,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_89a33b4b36de4c2a97042cd58ca0e6e5",
    tcgPlayer: 539092,
  },
  text: [
    {
      title: "OLD BETSY",
      description: "Your characters named Nutsy get +1 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "YOUR_CHARACTERS",
        type: "modify-stat",
      },
      id: "125-1",
      text: "OLD BETSY Your characters named Nutsy get +1 {L}.",
      type: "action",
    },
  ],
};
