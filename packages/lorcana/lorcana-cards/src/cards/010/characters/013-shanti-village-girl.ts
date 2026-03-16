import type { CharacterCard } from "@tcg/lorcana-types";

export const shantiVillageGirl: CharacterCard = {
  id: "x4v",
  canonicalId: "ci_x4v",
  reprints: ["set10-013"],
  cardType: "character",
  name: "Shanti",
  version: "Village Girl",
  i18n: {
    en: {
      name: "Shanti",
      version: "Village Girl",
      text: "Singer 5",
    },
    de: {
      name: "Shanti",
      version: "Dorfmädchen",
      text: [
        {
          title: "Singen 5",
          description: "(Die Kosten dieses Charakters gelten als 5 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Shanti",
      version: "Fille du village",
      text: "Mélomane 5 (Ce personnage est considéré comme ayant un coût de 5 pour chanter des chansons.)",
    },
    it: {
      name: "Shanti",
      version: "Ragazza del Villaggio",
      text: "Melodioso 5",
    },
  },
  inkType: ["amber"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 13,
  rarity: "common",
  cost: 3,
  strength: 0,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_656fee63050e47b8aa6d9c9a732ca5a6",
    tcgPlayer: 659179,
  },
  text: "Singer 5",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      keyword: "Singer",
      type: "keyword",
      value: 5,
      text: "Singer 5",
    },
  ],
};
