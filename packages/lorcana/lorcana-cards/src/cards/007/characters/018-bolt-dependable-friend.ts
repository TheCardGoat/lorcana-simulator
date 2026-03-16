import type { CharacterCard } from "@tcg/lorcana-types";

export const boltDependableFriend: CharacterCard = {
  id: "XZV",
  canonicalId: "ci_XZV",
  reprints: ["set7-018"],
  cardType: "character",
  name: "Bolt",
  version: "Dependable Friend",
  i18n: {
    en: {
      name: "Bolt",
      version: "Dependable Friend",
      text: "Support",
    },
    de: {
      name: "Bolt",
      version: "Verlässlicher Freund",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Volt",
      version: "Ami digne de confiance",
      text: "Soutien",
    },
    it: {
      name: "Bolt",
      version: "Amico Fidato",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Bolt",
  set: "007",
  cardNumber: 18,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9b70e9c76a6643c69167b3f081530ae9",
    tcgPlayer: 618157,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "j9c-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
