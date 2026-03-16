import type { CharacterCard } from "@tcg/lorcana-types";

export const generalLiHeadOfTheImperialArmy: CharacterCard = {
  id: "KF3",
  canonicalId: "ci_KF3",
  reprints: ["set8-187"],
  cardType: "character",
  name: "General Li",
  version: "Head of the Imperial Army",
  i18n: {
    en: {
      name: "General Li",
      version: "Head of the Imperial Army",
      text: "Resist +1",
    },
    de: {
      name: "General Li",
      version: "Oberhaupt der kaiserlichen Armee",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Général Li",
      version: "À la tête de l'armée impériale",
      text: "Résistance +1",
    },
    it: {
      name: "Generale Li",
      version: "Comandante dell'Esercito Imperiale",
      text: "Resistere +1",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "008",
  cardNumber: 187,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_a0a9f2ad02684ebd877ed697c7ce1188",
    tcgPlayer: 631473,
  },
  text: "Resist +1",
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      id: "iiq-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
};
