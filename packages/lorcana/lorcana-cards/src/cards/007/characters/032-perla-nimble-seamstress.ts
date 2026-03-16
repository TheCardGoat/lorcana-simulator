import type { CharacterCard } from "@tcg/lorcana-types";

export const perlaNimbleSeamstress: CharacterCard = {
  id: "D8H",
  canonicalId: "ci_D8H",
  reprints: ["set7-032"],
  cardType: "character",
  name: "Perla",
  version: "Nimble Seamstress",
  i18n: {
    en: {
      name: "Perla",
      version: "Nimble Seamstress",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "Support",
        },
      ],
    },
    de: {
      name: "Perla",
      version: "Flinke Näherin",
      text: "Wendig Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Perla",
      version: "Couturière agile",
      text: "Insaisissable Soutien",
    },
    it: {
      name: "Perla",
      version: "Agile Sarta",
      text: "Sfuggente Aiutante",
    },
  },
  inkType: ["amber", "emerald"],
  franchise: "Cinderella",
  set: "007",
  cardNumber: 32,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fd0e022a8b8c4171a610ffe0a440d8be",
    tcgPlayer: 618131,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "Support",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "wjh-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "wjh-2",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
