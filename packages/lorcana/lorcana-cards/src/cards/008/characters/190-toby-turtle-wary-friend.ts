import type { CharacterCard } from "@tcg/lorcana-types";

export const tobyTurtleWaryFriend: CharacterCard = {
  id: "Qqa",
  canonicalId: "ci_hVZ",
  reprints: ["set8-190"],
  cardType: "character",
  name: "Toby Turtle",
  version: "Wary Friend",
  i18n: {
    en: {
      name: "Toby Turtle",
      version: "Wary Friend",
      text: [
        {
          title: "HARD SHELL",
          description: "While this character is exerted, he gains Resist +1.",
        },
      ],
    },
    de: {
      name: "Toby Schildkröte",
      version: "Vorsichtiger Freund",
      text: [
        {
          title: "HARTE SCHALE",
          description:
            "Solange dieser Charakter erschöpft ist, erhält er Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Toby la Tortue",
      version: "Ami prudent",
      text: [
        {
          title: "CARAPACE SOLIDE",
          description: "Tant que ce personnage est épuisé, il gagne Résistance +1.",
        },
      ],
    },
    it: {
      name: "Tobia",
      version: "Amico Prudente",
      text: [
        {
          title: "GUSCIO DURO",
          description: "Mentre questo personaggio è impegnato, ottiene Resistere +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Robin Hood",
  set: "008",
  cardNumber: 190,
  rarity: "common",
  cost: 2,
  strength: 0,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0de5fd56ffa5426c854d2123b28a61c1",
    tcgPlayer: 631772,
  },
  text: [
    {
      title: "HARD SHELL",
      description: "While this character is exerted, he gains Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "1le-1",
      text: "HARD SHELL While this character is exerted, he gains Resist +1.",
      type: "static",
    },
  ],
};
