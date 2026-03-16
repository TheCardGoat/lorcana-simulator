import type { CharacterCard } from "@tcg/lorcana-types";

export const pegasusFlyingSteed: CharacterCard = {
  id: "iG3",
  canonicalId: "ci_iG3",
  reprints: ["set4-120"],
  cardType: "character",
  name: "Pegasus",
  version: "Flying Steed",
  i18n: {
    en: {
      name: "Pegasus",
      version: "Flying Steed",
      text: "Evasive",
    },
    de: {
      name: "Pegasus",
      version: "Fliegendes Ross",
      text: "Wendig",
    },
    fr: {
      name: "Pégase",
      version: "Destrier volant",
      text: "Insaisissable",
    },
    it: {
      name: "Pegaso",
      version: "Destriero Volante",
      text: "Sfuggente",
    },
  },
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "004",
  cardNumber: 120,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_42751c368c5545afbfc23be49ae65519",
    tcgPlayer: 550597,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "dxe-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
