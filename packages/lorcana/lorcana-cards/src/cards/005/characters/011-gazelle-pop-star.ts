import type { CharacterCard } from "@tcg/lorcana-types";

export const gazellePopStar: CharacterCard = {
  id: "5Ov",
  canonicalId: "ci_5Ov",
  reprints: ["set5-011"],
  cardType: "character",
  name: "Gazelle",
  version: "Pop Star",
  i18n: {
    en: {
      name: "Gazelle",
      version: "Pop Star",
      text: "Singer 5",
    },
    de: {
      name: "Gazelle",
      version: "Popstar",
      text: [
        {
          title: "Singen 5",
          description: "(Die Kosten dieses Charakters gelten als 5 für das Singen von Liedern.)",
        },
      ],
    },
    fr: {
      name: "Gazelle",
      version: "Pop star",
      text: "Mélomane 5 (Ce personnage est considéré comme ayant un coût de 5 pour chanter des chansons.)",
    },
    it: {
      name: "Gazelle",
      version: "Pop Star",
      text: "Melodioso 5",
    },
  },
  inkType: ["amber"],
  franchise: "Zootropolis",
  set: "005",
  cardNumber: 11,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_12426744b21049a39b01acf3d93e4311",
    tcgPlayer: 561947,
  },
  text: "Singer 5",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "g80-1",
      keyword: "Singer",
      type: "keyword",
      value: 5,
      text: "Singer 5",
    },
  ],
};
