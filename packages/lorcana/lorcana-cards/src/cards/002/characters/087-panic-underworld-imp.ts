import type { CharacterCard } from "@tcg/lorcana-types";

export const panicUnderworldImp: CharacterCard = {
  id: "Ixv",
  canonicalId: "ci_Ixv",
  reprints: ["set2-087"],
  cardType: "character",
  name: "Panic",
  version: "Underworld Imp",
  i18n: {
    en: {
      name: "Panic",
      version: "Underworld Imp",
      text: [
        {
          title: "I CAN HANDLE IT",
          description:
            "When you play this character, chosen character gets +2 {S} this turn. If the chosen character is named Pain, he gets +4 {S} instead.",
        },
      ],
    },
    de: {
      name: "Schwefel",
      version: "Schelm der Unterwelt",
      text: [
        {
          title: "ALLES IM GRÜNEN BEREICH",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem Charakter deiner Wahl in diesem Zug +2. Wählst du einen Pech-Charakter, gib ihm in diesem Zug stattdessen +4.",
        },
      ],
    },
    fr: {
      name: "Panique",
      version: "Diablotin des Enfers",
      text: [
        {
          title: "ÇA VA ALLER",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage, il gagne +2 pour le reste de ce tour. Si c'est un personnage Peine, il gagne +4 à la place.",
        },
      ],
    },
    it: {
      name: "Panic",
      version: "Underworld Imp",
      text: [
        {
          title: "I CAN HANDLE IT",
          description:
            "When you play this character, chosen character gets +2 this turn. If the chosen character is named Pain, he gets +4 instead.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "002",
  cardNumber: 87,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_995ce4bea35048d3b53f224ba4fc7664",
    tcgPlayer: 519492,
  },
  text: [
    {
      title: "I CAN HANDLE IT",
      description:
        "When you play this character, chosen character gets +2 {S} this turn. If the chosen character is named Pain, he gets +4 {S} instead.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      effect: {
        condition: {
          expression: "the chosen character is named Pain",
          type: "if",
        },
        then: {
          modifier: 4,
          stat: "strength",
          target: "CHOSEN_CHARACTER",
          type: "modify-stat",
        },
        type: "conditional",
      },
      id: "1yg-1",
      name: "I CAN HANDLE IT",
      text: "I CAN HANDLE IT When you play this character, chosen character gets +2 {S} this turn. If the chosen character is named Pain, he gets +4 {S} instead.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
