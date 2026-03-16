import type { CharacterCard } from "@tcg/lorcana-types";

export const beastThickskinned: CharacterCard = {
  id: "P74",
  canonicalId: "ci_P74",
  reprints: ["set4-176"],
  cardType: "character",
  name: "Beast",
  version: "Thick-Skinned",
  i18n: {
    en: {
      name: "Beast",
      version: "Thick-Skinned",
      text: "Resist +1",
    },
    de: {
      name: "Biest",
      version: "Dickhäutig",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "La Bête",
      version: "Dure à cuire",
      text: "Résistance +1",
    },
    it: {
      name: "La Bestia",
      version: "Dalla Scorza Dura",
      text: "Resistere +1",
    },
  },
  inkType: ["steel"],
  franchise: "Beauty and the Beast",
  set: "004",
  cardNumber: 176,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_aca54534108b43fcb881cb411581c618",
    tcgPlayer: 549654,
  },
  text: "Resist +1",
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "qz9-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
};
