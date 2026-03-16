import type { CharacterCard } from "@tcg/lorcana-types";

export const ursulaVanessa: CharacterCard = {
  id: "0pB",
  canonicalId: "ci_hSt",
  reprints: ["set4-025", "set9-022"],
  cardType: "character",
  name: "Ursula",
  version: "Vanessa",
  i18n: {
    en: {
      name: "Ursula",
      version: "Vanessa",
      text: "Singer 4",
    },
    de: {
      name: "Ursula",
      version: "Vanessa",
      text: [
        {
          title: "Singen 4",
          description: "(Die Kosten dieses Charakters gelten als 4 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Ursula",
      version: "Vanessa",
      text: "Mélomane 4 (Ce personnage est considéré comme ayant un coût de 4 pour chanter des chansons.)",
    },
    it: {
      name: "Ursula",
      version: "Vanessa",
      text: "Melodioso 4",
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "009",
  cardNumber: 22,
  rarity: "common",
  cost: 2,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_357824b1398340d8979b1ead1c7ff44f",
    tcgPlayer: 649970,
  },
  text: "Singer 4",
  classifications: ["Storyborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "lsj-1",
      keyword: "Singer",
      type: "keyword",
      value: 4,
      text: "Singer 4",
    },
  ],
};
