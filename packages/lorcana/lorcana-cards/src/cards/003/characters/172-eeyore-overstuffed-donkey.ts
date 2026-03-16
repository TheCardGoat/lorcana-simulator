import type { CharacterCard } from "@tcg/lorcana-types";

export const eeyoreOverstuffedDonkey: CharacterCard = {
  id: "7qS",
  canonicalId: "ci_n7U",
  reprints: ["set3-172", "set9-183"],
  cardType: "character",
  name: "Eeyore",
  version: "Overstuffed Donkey",
  i18n: {
    en: {
      name: "Eeyore",
      version: "Overstuffed Donkey",
      text: "Resist +1",
    },
    de: {
      name: "I-Aah",
      version: "Trübsinniger Esel",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Bourriquet",
      version: "Âne trop rembourré",
      text: "Résistance +1",
    },
    it: {
      name: "Ih-Oh",
      version: "Asinello Molto Imbottito",
      text: "Resistere +1",
    },
  },
  inkType: ["steel"],
  franchise: "Winnie the Pooh",
  set: "003",
  cardNumber: 172,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_214cf74b7c2e445282009e4d227b2519",
    tcgPlayer: 650116,
  },
  text: "Resist +1",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "16o-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
};
