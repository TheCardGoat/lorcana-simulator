import type { CharacterCard } from "@tcg/lorcana-types";

export const liloJuniorCakeDecorator: CharacterCard = {
  id: "s1Y",
  canonicalId: "ci_s1Y",
  reprints: ["set5-008"],
  cardType: "character",
  name: "Lilo",
  version: "Junior Cake Decorator",
  i18n: {
    en: {
      name: "Lilo",
      version: "Junior Cake Decorator",
      text: "Support",
    },
    de: {
      name: "Lilo",
      version: "Junior-Konditorin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Lilo",
      version: "Décoratrice de gâteau junior",
      text: "Soutien",
    },
    it: {
      name: "Lilo",
      version: "Decoratrice di Torte Apprendista",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Lilo and Stitch",
  set: "005",
  cardNumber: 8,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_907793ab7fb44dd38c58f0dc1172a7d6",
    tcgPlayer: 561596,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "183-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
