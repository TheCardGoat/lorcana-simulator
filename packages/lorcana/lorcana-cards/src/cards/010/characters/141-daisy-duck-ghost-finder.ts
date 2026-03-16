import type { CharacterCard } from "@tcg/lorcana-types";

export const daisyDuckGhostFinder: CharacterCard = {
  id: "IZj",
  canonicalId: "ci_2P5",
  reprints: ["set10-141"],
  cardType: "character",
  name: "Daisy Duck",
  version: "Ghost Finder",
  i18n: {
    en: {
      name: "Daisy Duck",
      version: "Ghost Finder",
      text: "Support",
    },
    de: {
      name: "Daisy Duck",
      version: "Geistersucherin",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Daisy",
      version: "Traqueuse de fantômes",
      text: "Soutien",
    },
    it: {
      name: "Paperina",
      version: "Cercatrice di Fantasmi",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  set: "010",
  cardNumber: 141,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8076e7de5c3a4681b8a91629932092e5",
    tcgPlayer: 660363,
  },
  text: "Support",
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      id: "1m1-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
