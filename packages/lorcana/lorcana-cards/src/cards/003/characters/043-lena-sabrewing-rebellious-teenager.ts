import type { CharacterCard } from "@tcg/lorcana-types";

export const lenaSabrewingRebelliousTeenager: CharacterCard = {
  id: "tnp",
  canonicalId: "ci_tnp",
  reprints: ["set3-043"],
  cardType: "character",
  name: "Lena Sabrewing",
  version: "Rebellious Teenager",
  i18n: {
    en: {
      name: "Lena Sabrewing",
      version: "Rebellious Teenager",
      text: "Rush",
    },
    de: {
      name: "Lena Degenflügel",
      version: "Rebellischer Teenager",
      text: "Rasant",
    },
    fr: {
      name: "Lena de Sortilège",
      version: "Adolescente rebelle",
      text: "Charge",
    },
    it: {
      name: "Lena Sabrewing",
      version: "Adolescente Ribelle",
      text: [
        {
          title: "Lesto",
          description: "(Questo personaggio può sfidare nel turno in cui è stato giocato.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Ducktales",
  set: "003",
  cardNumber: 43,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d8f0d093ffa743e48801e90e1b98cf14",
    tcgPlayer: 538238,
  },
  text: "Rush",
  classifications: ["Storyborn", "Hero", "Sorcerer"],
  abilities: [
    {
      id: "1j4-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
};
