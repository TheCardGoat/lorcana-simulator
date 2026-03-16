import type { CharacterCard } from "@tcg/lorcana-types";

export const pascalGardenChameleon: CharacterCard = {
  id: "CD3",
  canonicalId: "ci_CD3",
  reprints: ["set7-019"],
  cardType: "character",
  name: "Pascal",
  version: "Garden Chameleon",
  i18n: {
    en: {
      name: "Pascal",
      version: "Garden Chameleon",
      text: "Evasive",
    },
    de: {
      name: "Pascal",
      version: "Gartenchamäleon",
      text: "Wendig",
    },
    fr: {
      name: "Pascal",
      version: "Caméléon de jardin",
      text: "Insaisissable",
    },
    it: {
      name: "Pascal",
      version: "Camaleonte da Giardino",
      text: "Sfuggente",
    },
  },
  inkType: ["amber", "amethyst"],
  franchise: "Tangled",
  set: "007",
  cardNumber: 19,
  rarity: "uncommon",
  cost: 4,
  strength: 3,
  willpower: 3,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_b2dd259955af479c8816391e13d4e16d",
    tcgPlayer: 618129,
  },
  text: "Evasive",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1oz-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
