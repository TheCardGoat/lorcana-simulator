import type { CharacterCard } from "@tcg/lorcana-types";

export const ratiganCriminalMastermind: CharacterCard = {
  id: "yTi",
  canonicalId: "ci_yTi",
  reprints: ["set2-091"],
  cardType: "character",
  name: "Ratigan",
  version: "Criminal Mastermind",
  i18n: {
    en: {
      name: "Ratigan",
      version: "Criminal Mastermind",
      text: "Evasive",
    },
    de: {
      name: "Rattenzahn",
      version: "Kriminelles Genie",
      text: "Wendig",
    },
    fr: {
      name: "Ratigan",
      version: "Génie du crime",
      text: "Insaisissable",
    },
    it: {
      name: "Ratigan",
      version: "Criminal Mastermind",
      text: [
        {
          title: "Evasive",
          description: "(Only characters with Evasive can challenge this character.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 91,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_9dcde646049c4c889034da24e175f7f8",
    tcgPlayer: 527750,
  },
  text: "Evasive",
  classifications: ["Dreamborn", "Villain"],
  abilities: [
    {
      id: "952-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
