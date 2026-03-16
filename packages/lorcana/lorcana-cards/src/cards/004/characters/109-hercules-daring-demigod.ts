import type { CharacterCard } from "@tcg/lorcana-types";

export const herculesDaringDemigod: CharacterCard = {
  id: "044",
  canonicalId: "ci_044",
  reprints: ["set4-109"],
  cardType: "character",
  name: "Hercules",
  version: "Daring Demigod",
  i18n: {
    en: {
      name: "Hercules",
      version: "Daring Demigod",
      text: [
        {
          title: "Rush",
        },
        {
          title: "Reckless",
        },
      ],
    },
    de: {
      name: "Hercules",
      version: "Wagemutiger Halbgott",
      text: "Rasant Impulsiv",
    },
    fr: {
      name: "Hercule",
      version: "Demi-dieu intrépide",
      text: "Charge Combattant",
    },
    it: {
      name: "Ercole",
      version: "Audace Semidio",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) Attaccabrighe",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 109,
  rarity: "uncommon",
  cost: 5,
  strength: 7,
  willpower: 3,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_90c1d84c1ab7490897021c0eb19f781c",
    tcgPlayer: 550592,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Reckless",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "1s3-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "1s3-2",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
