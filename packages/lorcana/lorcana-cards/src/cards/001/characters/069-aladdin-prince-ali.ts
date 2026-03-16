import type { CharacterCard } from "@tcg/lorcana-types";

export const aladdinPrinceAli: CharacterCard = {
  id: "QEo",
  canonicalId: "ci_D8z",
  reprints: ["set1-069", "set9-092"],
  cardType: "character",
  name: "Aladdin",
  version: "Prince Ali",
  i18n: {
    en: {
      name: "Aladdin",
      version: "Prince Ali",
      text: "Ward",
    },
    de: {
      name: "Aladdin",
      version: "Prinz Ali",
      text: "Behütet",
    },
    fr: {
      name: "Aladdin",
      version: "Prince Ali",
      text: "Hors d'atteinte",
    },
    it: {
      name: "Aladdin",
      version: "Prince Ali",
      text: [
        {
          title: "Ward",
          description: "(Opponents can't choose this character except to challenge.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 69,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_24ef95291e2f4379983568b7c01974ff",
    tcgPlayer: 650031,
  },
  text: "Ward",
  classifications: ["Storyborn", "Hero", "Prince"],
  abilities: [
    {
      id: "820-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
