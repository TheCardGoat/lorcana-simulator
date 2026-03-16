import type { CharacterCard } from "@tcg/lorcana-types";

export const copperOnTheScent: CharacterCard = {
  id: "5td",
  canonicalId: "ci_5td",
  reprints: ["set11-107"],
  cardType: "character",
  name: "Copper",
  version: "On the Scent",
  i18n: {
    en: {
      name: "Copper",
      version: "On the Scent",
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
      name: "Capper",
      version: "Auf der Spur",
      text: "Rasant Impulsiv",
    },
    fr: {
      name: "Rouky",
      version: "Sur une piste",
      text: "Charge Combattant",
    },
    it: {
      name: "Toby",
      version: "Sulle Tracce",
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
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 107,
  rarity: "uncommon",
  cost: 6,
  strength: 8,
  willpower: 5,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_f5ec9aa34cb2438fb19806535e9ffcc5",
    tcgPlayer: 675496,
  },
  text: [
    {
      title: "Rush",
    },
    {
      title: "Reckless",
    },
  ],
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "17g-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
    {
      id: "17g-2",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
