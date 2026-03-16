import type { ItemCard } from "@tcg/lorcana-types";

export const eyeOfTheFates: ItemCard = {
  id: "xSb",
  canonicalId: "ci_xSb",
  reprints: ["set1-167"],
  cardType: "item",
  name: "Eye of the Fates",
  i18n: {
    en: {
      name: "Eye of the Fates",
      text: [
        {
          title: "SEE THE FUTURE",
          description: "{E} — Chosen character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Auge der Moiren",
      text: [
        {
          title: "DIE ZUKUNFT OFFENBAREN",
          description: "— Gib einem Charakter deiner Wahl in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "ŒIL DES MOIRES",
      text: [
        {
          title: "VOIR L'AVENIR",
          description: "— Choisissez un personnage, il gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Eye of the Fates",
      text: [
        {
          title: "SEE THE FUTURE",
          description: "— Chosen character gets +1 this turn.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 167,
  rarity: "uncommon",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_2c6eae027003403c832a8463afbb6ec0",
    tcgPlayer: 508825,
  },
  text: [
    {
      title: "SEE THE FUTURE",
      description: "{E} — Chosen character gets +1 {L} this turn.",
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
        stat: "lore",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1mp-1",
      name: "SEE THE FUTURE",
      text: "SEE THE FUTURE {E} — Chosen character gets +1 {L} this turn.",
      type: "activated",
    },
  ],
};
