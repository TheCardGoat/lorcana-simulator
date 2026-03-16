import type { CharacterCard } from "@tcg/lorcana-types";

export const denahiImpatientHunter: CharacterCard = {
  id: "OYJ",
  canonicalId: "ci_OYJ",
  reprints: ["set7-124"],
  cardType: "character",
  name: "Denahi",
  version: "Impatient Hunter",
  i18n: {
    en: {
      name: "Denahi",
      version: "Impatient Hunter",
      text: [
        {
          title: "Reckless",
        },
        {
          title: "Resist +2",
        },
      ],
    },
    de: {
      name: "Denahi",
      version: "Ungeduldiger Jäger",
      text: "Impulsiv Robust +2 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.)",
    },
    fr: {
      name: "Denahi",
      version: "Chasseur impatient",
      text: "Combattant Résistance +2",
    },
    it: {
      name: "Denahi",
      version: "Cacciatore Impaziente",
      text: "Attaccabrighe Resistere +2",
    },
  },
  inkType: ["ruby", "steel"],
  franchise: "Brother Bear",
  set: "007",
  cardNumber: 124,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_b91e58cc0277450595a28974cf70c180",
    tcgPlayer: 618144,
  },
  text: [
    {
      title: "Reckless",
    },
    {
      title: "Resist +2",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      id: "8xy-1",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
    {
      id: "8xy-2",
      keyword: "Resist",
      type: "keyword",
      value: 2,
      text: "Resist +2",
    },
  ],
};
