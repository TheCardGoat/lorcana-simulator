import type { CharacterCard } from "@tcg/lorcana-types";

export const floraGoodFairy: CharacterCard = {
  id: "ZS7",
  canonicalId: "ci_ZS7",
  reprints: ["set5-075"],
  cardType: "character",
  name: "Flora",
  version: "Good Fairy",
  i18n: {
    en: {
      name: "Flora",
      version: "Good Fairy",
      text: [
        {
          title: "FIDDLE FADDLE",
          description: "While being challenged, this character gets +2 {S}.",
        },
      ],
    },
    de: {
      name: "Flora",
      version: "Gute Fee",
      text: [
        {
          title: "HAB ICH EINE WUT!",
          description: "Während dieser Charakter herausgefordert wird, erhält er +2.",
        },
      ],
    },
    fr: {
      name: "Flora",
      version: "Bonne fée",
      text: [
        {
          title: "CELA NE RIME À RIEN",
          description: "Lorsqu'il est défié, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Flora",
      version: "Buona Fata",
      text: [
        {
          title: "RIDICOLAGGINE",
          description: "Mentre viene sfidato, questo personaggio riceve +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Sleeping Beauty",
  set: "005",
  cardNumber: 75,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b72fb20c7b664b749e55de43aae47b3c",
    tcgPlayer: 560641,
  },
  text: [
    {
      title: "FIDDLE FADDLE",
      description: "While being challenged, this character gets +2 {S}.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      effect: {
        modifier: 2,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      id: "awe-1",
      text: "FIDDLE FADDLE While being challenged, this character gets +2 {S}.",
      type: "action",
    },
  ],
};
