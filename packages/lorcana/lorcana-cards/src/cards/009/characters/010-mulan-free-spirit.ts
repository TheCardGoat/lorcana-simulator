import type { CharacterCard } from "@tcg/lorcana-types";

export const mulanFreeSpirit: CharacterCard = {
  id: "E5z",
  canonicalId: "ci_Dqt",
  reprints: ["set2-015", "set9-010"],
  cardType: "character",
  name: "Mulan",
  version: "Free Spirit",
  i18n: {
    en: {
      name: "Mulan",
      version: "Free Spirit",
      text: "Support",
    },
    de: {
      name: "Mulan",
      version: "Freigeist",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Mulan",
      version: "Esprit libre",
      text: "Soutien",
    },
    it: {
      name: "Mulan",
      version: "Spirito Libero",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Mulan",
  set: "009",
  cardNumber: 10,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_a931864a0b0e42c7852e9609ea84914f",
    tcgPlayer: 649959,
  },
  text: "Support",
  classifications: ["Dreamborn", "Hero", "Princess"],
  abilities: [
    {
      id: "roa-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
