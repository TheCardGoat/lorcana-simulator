import type { CharacterCard } from "@tcg/lorcana-types";

export const annaMakingSnowPlans: CharacterCard = {
  id: "BGp",
  canonicalId: "ci_BGp",
  reprints: ["set10-139"],
  cardType: "character",
  name: "Anna",
  version: "Making Snow Plans",
  i18n: {
    en: {
      name: "Anna",
      version: "Making Snow Plans",
      text: "Support",
    },
    de: {
      name: "Anna",
      version: "Macht Pläne für den Schnee",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Anna",
      version: "Planifie son hiver",
      text: "Soutien",
    },
    it: {
      name: "Anna",
      version: "Organizzatrice di Attività Nevose",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "010",
  cardNumber: 139,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_13a02a2c79fa4493bc8a593d5fb1bd98",
    tcgPlayer: 659424,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero", "Queen"],
  abilities: [
    {
      id: "9zf-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
