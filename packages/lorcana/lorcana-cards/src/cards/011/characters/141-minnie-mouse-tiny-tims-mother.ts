import type { CharacterCard } from "@tcg/lorcana-types";

export const minnieMouseTinyTimsMother: CharacterCard = {
  id: "4Kj",
  canonicalId: "ci_4Kj",
  reprints: ["set11-141"],
  cardType: "character",
  name: "Minnie Mouse",
  version: "Tiny Tim's Mother",
  i18n: {
    en: {
      name: "Minnie Mouse",
      version: "Tiny Tim's Mother",
      text: "Support",
    },
    de: {
      name: "Minnie Maus",
      version: "Mutter des kleinen Tim",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Minnie",
      version: "Mère de Tiny Tim",
      text: "Soutien",
    },
    it: {
      name: "Minni",
      version: "Mamma del Piccolo Tim",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Mickey's Christmas Carol",
  set: "011",
  cardNumber: 141,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_33f12c74df68498cb444d6a493be67ef",
    tcgPlayer: 676221,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "8ol-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
