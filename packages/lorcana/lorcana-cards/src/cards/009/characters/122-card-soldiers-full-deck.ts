import type { CharacterCard } from "@tcg/lorcana-types";
import { cardSoldiersFullDeckI18n } from "./122-card-soldiers-full-deck.i18n";

export const cardSoldiersFullDeck: CharacterCard = {
  id: "ToP",
  canonicalId: "ci_lN7",
  reprints: ["set2-105", "set9-122"],
  cardType: "character",
  name: "Card Soldiers",
  version: "Full Deck",
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "009",
  cardNumber: 122,
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
  i18n: cardSoldiersFullDeckI18n,
};
