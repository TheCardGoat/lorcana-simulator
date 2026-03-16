import type { CharacterCard } from "@tcg/lorcana-types";

export const cardSoldiersFullDeck: CharacterCard = {
  id: "V2r",
  canonicalId: "ci_lN7",
  reprints: ["set2-105", "set9-122"],
  cardType: "character",
  name: "Card Soldiers",
  version: "Full Deck",
  i18n: {
    en: {
      name: "Card Soldiers",
      version: "Full Deck",
    },
    de: {
      name: "Kartensoldaten",
      version: "Ganzer Stapel",
    },
    fr: {
      name: "Gardes cartes",
      version: "Jeu complet",
    },
    it: {
      name: "Carte Soldato",
      version: "Mazzo Completo",
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 105,
  rarity: "uncommon",
  cost: 5,
  strength: 5,
  willpower: 5,
  lore: 2,
  inkable: true,
  vanilla: true,
  externalIds: {
    lorcast: "crd_9da81e46cc0d47c186f220e4007b0fd4",
    tcgPlayer: 650057,
  },
  classifications: ["Storyborn", "Ally"],
};
