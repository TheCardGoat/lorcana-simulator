import type { CharacterCard } from "@tcg/lorcana-types";

export const kakamoraBoardingParty: CharacterCard = {
  id: "w0G",
  canonicalId: "ci_w0G",
  reprints: ["set6-104"],
  cardType: "character",
  name: "Kakamora",
  version: "Boarding Party",
  i18n: {
    en: {
      name: "Kakamora",
      version: "Boarding Party",
      text: "Rush",
    },
    de: {
      name: "Kokomora",
      version: "Entermannschaft",
      text: "Rasant",
    },
    fr: {
      name: "Kakamora",
      version: "Groupe d'abordage",
      text: "Charge",
    },
    it: {
      name: "Kakamora",
      version: "Banda d'Arrembaggio",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Moana",
  set: "006",
  cardNumber: 104,
  rarity: "uncommon",
  cost: 4,
  strength: 5,
  willpower: 2,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_c71e324054e14edfa3df845b31689f31",
    tcgPlayer: 578187,
  },
  text: "Rush",
  classifications: ["Storyborn", "Pirate"],
  abilities: [
    {
      id: "7k1-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
