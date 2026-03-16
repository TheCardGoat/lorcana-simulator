import type { CharacterCard } from "@tcg/lorcana-types";

export const painUnderworldImp: CharacterCard = {
  id: "qfi",
  canonicalId: "ci_qfi",
  reprints: ["set2-086"],
  cardType: "character",
  name: "Pain",
  version: "Underworld Imp",
  i18n: {
    en: {
      name: "Pain",
      version: "Underworld Imp",
      text: [
        {
          title: "COMING, YOUR MOST LUGUBRIOUSNESS",
          description: "While this character has 5 {S} or more, he gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Pech",
      version: "Schelm der Unterwelt",
      text: [
        {
          title: "ICH KOMME, EURE DÜSTERE VERBROCHENHEIT",
          description: "Solange dieser Charakter 5 oder mehr hat, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Peine",
      version: "Diablotin des Enfers",
      text: [
        {
          title: "JE VIENS, VOTRE LUGUBRE NOIRCEUR",
          description: "Tant que ce personnage a au moins 5, il gagne +2.",
        },
      ],
    },
    it: {
      name: "Pain",
      version: "Underworld Imp",
      text: [
        {
          title: "COMING, YOUR MOST LUGUBRIOUSNESS",
          description: "While this character has 5 or more, he gets +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "002",
  cardNumber: 86,
  rarity: "uncommon",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_756eca11fdec48c2bc3b4f427b151b6e",
    tcgPlayer: 527748,
  },
  text: [
    {
      title: "COMING, YOUR MOST LUGUBRIOUSNESS",
      description: "While this character has 5 {S} or more, he gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  missingTests: true,
  abilities: [
    {
      id: "8up-1",
      name: "COMING, YOUR MOST LUGUBRIOUSNESS",
      text: "COMING, YOUR MOST LUGUBRIOUSNESS While this character has 5 {S} or more, he gets +2 {L}.",
      type: "static",
      condition: {
        type: "stat-threshold",
        stat: "strength",
        value: 5,
        comparison: "greater-or-equal",
        target: "SELF",
      },
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
    },
  ],
};
