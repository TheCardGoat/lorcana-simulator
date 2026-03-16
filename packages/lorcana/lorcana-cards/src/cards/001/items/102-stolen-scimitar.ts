import type { ItemCard } from "@tcg/lorcana-types";

export const stolenScimitar: ItemCard = {
  id: "EDv",
  canonicalId: "ci_EDv",
  reprints: ["set1-102"],
  cardType: "item",
  name: "Stolen Scimitar",
  i18n: {
    en: {
      name: "Stolen Scimitar",
      text: [
        {
          title: "SLASH",
          description:
            "{E} — Chosen character gets +1 {S} this turn. If a character named Aladdin is chosen, he gets +2 {S} instead.",
        },
      ],
    },
    de: {
      name: "Gestohlener Säbel",
      text: [
        {
          title: "HIEB",
          description:
            "— Gib einem Charakter deiner Wahl in diesem Zug +1. Wählst du einen Aladdin-Charakter, dann gib ihm stattdessen +2.",
        },
      ],
    },
    fr: {
      name: "CIMETERRE VOLÉ",
      text: [
        {
          title: "SLASH!",
          description:
            "— Choisissez un personnage, il gagne +1 pour le reste de ce tour. S'il s'agit d'un personnage Aladdin, il gagne +2 à la place.",
        },
      ],
    },
    it: {
      name: "Stolen Scimitar",
      text: [
        {
          title: "SLASH",
          description:
            "— Chosen character gets +1 this turn. If a character named Aladdin is chosen, he gets +2 instead.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 102,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a86ebded73ba41e2ab58fcebfd30eeb0",
    tcgPlayer: 507262,
  },
  text: [
    {
      title: "SLASH",
      description:
        "{E} — Chosen character gets +1 {S} this turn. If a character named Aladdin is chosen, he gets +2 {S} instead.",
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
        selfReplacement: {
          condition: {
            type: "selected-target-name",
            name: "Aladdin",
          },
          value: 2,
        },
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "17q-1",
      name: "SLASH",
      text: "SLASH {E} — Chosen character gets +1 {S} this turn. If a character named Aladdin is chosen, he gets +2 {S} instead.",
      type: "activated",
    },
  ],
};
