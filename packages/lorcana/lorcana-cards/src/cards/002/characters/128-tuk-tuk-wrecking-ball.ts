import type { CharacterCard } from "@tcg/lorcana-types";

export const tukTukWreckingBall: CharacterCard = {
  id: "xpC",
  canonicalId: "ci_xpC",
  reprints: ["set2-128"],
  cardType: "character",
  name: "Tuk Tuk",
  version: "Wrecking Ball",
  i18n: {
    en: {
      name: "Tuk Tuk",
      version: "Wrecking Ball",
      text: "Reckless",
    },
    de: {
      name: "Tuktuk",
      version: "Abrisskugel",
      text: "Impulsiv",
    },
    fr: {
      name: "Tuk Tuk",
      version: "Boule de démolition",
      text: "Combattant",
    },
    it: {
      name: "Tuk Tuk",
      version: "Wrecking Ball",
      text: [
        {
          title: "Reckless",
          description: "(This character can't quest and must challenge each turn if able.)",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 128,
  rarity: "rare",
  cost: 4,
  strength: 4,
  willpower: 5,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_afce8f318b6d4d68a9ff9ccb5a616655",
    tcgPlayer: 527759,
  },
  text: "Reckless",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1or-1",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
