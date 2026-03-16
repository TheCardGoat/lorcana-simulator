import type { CharacterCard } from "@tcg/lorcana-types";

export const wasabiAlwaysPrepared: CharacterCard = {
  id: "PYV",
  canonicalId: "ci_PYV",
  reprints: ["set8-158"],
  cardType: "character",
  name: "Wasabi",
  version: "Always Prepared",
  i18n: {
    en: {
      name: "Wasabi",
      version: "Always Prepared",
      text: "Support",
    },
    de: {
      name: "Wasabi",
      version: "Auf alles vorbereitet",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Wasabi",
      version: "Toujours prêt",
      text: "Soutien",
    },
    it: {
      name: "Wasabi",
      version: "Sempre Pronto",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Big Hero 6",
  set: "008",
  cardNumber: 158,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_d23689ec2d064f2c957ff6751e0a3c38",
    tcgPlayer: 631456,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero", "Inventor"],
  abilities: [
    {
      id: "aik-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
