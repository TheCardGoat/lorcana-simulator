import type { CharacterCard } from "@tcg/lorcana-types";

export const tianaWarmAndHappyEpic: CharacterCard = {
  id: "BEO",
  canonicalId: "ci_FOF",
  reprints: ["set11-005"],
  cardType: "character",
  name: "Tiana",
  version: "Warm and Happy",
  i18n: {
    en: {
      name: "Tiana",
      version: "Warm and Happy",
      text: "Support",
    },
    de: {
      name: "Tiana",
      version: "Warm und glücklich",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Tiana",
      version: "Réchauffée et heureuse",
      text: "Soutien",
    },
    it: {
      name: "Tiana",
      version: "Felice e al Calduccio",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Princess and the Frog",
  set: "011",
  cardNumber: 205,
  rarity: "common",
  specialRarity: "epic",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_801cd6ba9a3048499af41d6186fa4100",
    tcgPlayer: 677142,
  },
  text: "Support",
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "1ft-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
