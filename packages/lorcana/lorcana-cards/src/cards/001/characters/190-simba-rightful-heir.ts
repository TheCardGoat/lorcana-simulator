import type { CharacterCard } from "@tcg/lorcana-types";

export const simbaRightfulHeir: CharacterCard = {
  id: "XnN",
  canonicalId: "ci_XnN",
  reprints: ["set1-190"],
  cardType: "character",
  name: "Simba",
  version: "Rightful Heir",
  i18n: {
    en: {
      name: "Simba",
      version: "Rightful Heir",
      text: [
        {
          title: "I KNOW WHAT I HAVE TO DO",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you gain 1 lore.",
        },
      ],
    },
    de: {
      name: "Simba",
      version: "Rechtmäßiger Thronfolger",
      text: [
        {
          title: "ICH WEISS, WAS MEINE PFLICHT IST",
          description:
            "Jedes Mal, wenn dieser Charakter in deinem Zug durch eine Herausforderung einen anderen Charakter verbannt, sammelst du 1 Legende.",
        },
      ],
    },
    fr: {
      name: "SIMBA",
      version: "Héritier légitime",
      text: [
        {
          title: "JE SAIS CE QUE JE DOIS FAIRE",
          description:
            "Lorsque ce personnage en bannit un autre via un défi durant votre tour, vous gagnez 1 éclat de Lore.",
        },
      ],
    },
    it: {
      name: "Simba",
      version: "Rightful Heir",
      text: [
        {
          title: "I KNOW WHAT I HAVE TO DO",
          description:
            "During your turn, whenever this character banishes another character in a challenge, you gain 1 lore.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 190,
  rarity: "uncommon",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: false,
  missingImplementation: true,
  externalIds: {
    lorcast: "crd_b2976a87410e4dd5a753e7f871c2b6fc",
    tcgPlayer: 508941,
  },
  text: [
    {
      title: "I KNOW WHAT I HAVE TO DO",
      description:
        "During your turn, whenever this character banishes another character in a challenge, you gain 1 lore.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      effect: {
        amount: 1,
        type: "gain-lore",
      },
      id: "ac0-1",
      text: "**I KNOW WHAT I HAVE TO DO** During your turn, whenever this character banishes another character in a challenge, you gain 1 lore.",
      type: "action",
    },
  ],
};
