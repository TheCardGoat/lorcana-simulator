import type { CharacterCard } from "@tcg/lorcana-types";

export const scarTempestuousLion: CharacterCard = {
  id: "7Y4",
  canonicalId: "ci_7Y4",
  reprints: ["set6-047"],
  cardType: "character",
  name: "Scar",
  version: "Tempestuous Lion",
  i18n: {
    en: {
      name: "Scar",
      version: "Tempestuous Lion",
      text: [
        {
          title: "Rush",
        },
        {
          title: "Challenger +3",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Temperamentvoller Löwe",
      text: "Rasant Herausfordern +3",
    },
    fr: {
      name: "Scar",
      version: "Lion tempétueux",
      text: "Charge Offensif +3",
    },
    it: {
      name: "Scar",
      version: "Leone Tempestoso",
      text: [
        {
          title: "Lesto",
          description:
            "(Questo personaggio può sfidare nel turno in cui è stato giocato.) Sfidante +3",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Lion King",
  set: "006",
  cardNumber: 47,
  rarity: "uncommon",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_6cd588941df64ee2a38738b7f7e23c6a",
    tcgPlayer: 588320,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Challenger +3",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "ug5-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "ug5-2",
      keyword: "Challenger",
      type: "keyword",
      value: 3,
      text: "Challenger +3",
    },
  ],
};
