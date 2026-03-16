import type { CharacterCard } from "@tcg/lorcana-types";

export const basilHypnotizedMouse: CharacterCard = {
  id: "Fyz",
  canonicalId: "ci_Fyz",
  reprints: ["set6-079"],
  cardType: "character",
  name: "Basil",
  version: "Hypnotized Mouse",
  i18n: {
    en: {
      name: "Basil",
      version: "Hypnotized Mouse",
      text: "Evasive",
    },
    de: {
      name: "Basil",
      version: "Hypnotisierte Maus",
      text: "Wendig",
    },
    fr: {
      name: "Basil",
      version: "Souris hypnotisée",
      text: "Insaisissable",
    },
    it: {
      name: "Basil",
      version: "Topo Ipnotizzato",
      text: "Sfuggente",
    },
  },
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
};
