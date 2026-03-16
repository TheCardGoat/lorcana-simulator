import type { CharacterCard } from "@tcg/lorcana-types";

export const feliciaAlwaysHungry: CharacterCard = {
  id: "Wz0",
  canonicalId: "ci_Wz0",
  reprints: ["set2-107"],
  cardType: "character",
  name: "Felicia",
  version: "Always Hungry",
  i18n: {
    en: {
      name: "Felicia",
      version: "Always Hungry",
      text: "Reckless",
    },
    de: {
      name: "Felizita",
      version: "Immer hungrig",
      text: "Impulsiv",
    },
    fr: {
      name: "Félicia",
      version: "Toujours affamée",
      text: "Combattant",
    },
    it: {
      name: "Felicia",
      version: "Always Hungry",
      text: [
        {
          title: "Reckless",
          description: "(This character can't quest and must challenge each turn if able.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 107,
  rarity: "common",
  cost: 1,
  strength: 3,
  willpower: 1,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_5898c1f57f914c70880a9a3fee5a4962",
    tcgPlayer: 527755,
  },
  text: "Reckless",
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "7iz-1",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
