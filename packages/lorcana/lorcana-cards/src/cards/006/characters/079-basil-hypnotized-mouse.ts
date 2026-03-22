import type { CharacterCard } from "@tcg/lorcana-types";
import { basilHypnotizedMouseI18n } from "./079-basil-hypnotized-mouse.i18n";

export const basilHypnotizedMouse: CharacterCard = {
  id: "Fyz",
  canonicalId: "ci_Fyz",
  reprints: ["set6-079"],
  cardType: "character",
  name: "Basil",
  version: "Hypnotized Mouse",
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "006",
  cardNumber: 79,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e2546a2e03c8442aba30fd09105e54db",
    tcgPlayer: 587197,
  },
  text: "Evasive",
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      id: "1v5-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
  i18n: basilHypnotizedMouseI18n,
};
