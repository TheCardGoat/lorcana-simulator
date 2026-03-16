import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseTrueFriend: CharacterCard = {
  id: "TK7",
  canonicalId: "ci_wSP",
  reprints: ["set1-012", "set9-013"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "True Friend",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "True Friend",
    },
    de: {
      name: "Micky Maus",
      version: "Wahrer Freund",
    },
    fr: {
      name: "MICKEY MOUSE",
      version: "Véritable ami",
    },
    it: {
      name: "Topolino",
      version: "Vero Amico",
    },
  },
  inkType: ["amber"],
  set: "009",
  cardNumber: 13,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 2,
  inkable: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_da34abc7da464b338103666b1ca3d0f8",
    tcgPlayer: 649962,
  },
  classifications: ["Storyborn", "Hero"],
};
