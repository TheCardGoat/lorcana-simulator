import type { CharacterCard } from "@tcg/lorcana-types";

export const mrBigShrewdTycoon: CharacterCard = {
  id: "05m",
  canonicalId: "ci_05m",
  reprints: ["set6-174"],
  cardType: "character",
  name: "Mr. Big",
  version: "Shrewd Tycoon",
  i18n: {
    en: {
      name: "Mr. Big",
      version: "Shrewd Tycoon",
      text: [
        {
          title: "REPUTATION",
          description: "This character can't be challenged by characters with 2 {S} or more.",
        },
      ],
    },
    de: {
      name: "Mr. Big",
      version: "Raffinierter Geschäftsmann",
      text: [
        {
          title: "REPUTATION",
          description: "Charaktere mit 2 oder mehr können diesen Charakter nicht herausfordern.",
        },
      ],
    },
    fr: {
      name: "Mister Big",
      version: "Magnat avisé",
      text: [
        {
          title: "RÉPUTATION",
          description: "Ce personnage ne peut pas être défié par des personnages avec 2 ou plus.",
        },
      ],
    },
    it: {
      name: "Mr. Big",
      version: "Scaltro Magnate",
      text: [
        {
          title: "REPUTAZIONE",
          description: "Questo personaggio non può essere sfidato da personaggi con 2 o superiore.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Zootropolis",
  set: "006",
  cardNumber: 174,
  rarity: "rare",
  cost: 4,
  strength: 1,
  willpower: 1,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_0b5dcdce945a404395b6c65a894ecf6d",
    tcgPlayer: 593029,
  },
  text: [
    {
      title: "REPUTATION",
      description: "This character can't be challenged by characters with 2 {S} or more.",
    },
  ],
  classifications: ["Storyborn"],
  abilities: [
    {
      effect: {
        restriction: "cant-be-challenged",
        target: "SELF",
        type: "restriction",
      },
      id: "1lm-1",
      name: "REPUTATION",
      text: "REPUTATION This character can't be challenged by characters with 2 {S} or more.",
      type: "static",
    },
  ],
};
