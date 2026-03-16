import type { CharacterCard } from "@tcg/lorcana-types";

export const kaaSuspiciousSerpent: CharacterCard = {
  id: "88q",
  canonicalId: "ci_88q",
  reprints: ["set10-072"],
  cardType: "character",
  name: "Kaa",
  version: "Suspicious Serpent",
  i18n: {
    en: {
      name: "Kaa",
      version: "Suspicious Serpent",
      text: "Ward",
    },
    de: {
      name: "Kaa",
      version: "Suspekte Schlange",
      text: "Behütet",
    },
    fr: {
      name: "Kaa",
      version: "Serpent suspicieux",
      text: "Hors d'atteinte",
    },
    it: {
      name: "Kaa",
      version: "Serpente Sospettoso",
      text: "Protetto",
    },
  },
  inkType: ["emerald"],
  franchise: "Jungle Book",
  set: "010",
  cardNumber: 72,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f4468086528c47d289a18c4681699d76",
    tcgPlayer: 660038,
  },
  text: "Ward",
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      id: "xkn-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
