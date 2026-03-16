import type { CharacterCard } from "@tcg/lorcana-types";

export const ruttNorthernMoose: CharacterCard = {
  id: "6Ic",
  canonicalId: "ci_6Ic",
  reprints: ["set5-004"],
  cardType: "character",
  name: "Rutt",
  version: "Northern Moose",
  i18n: {
    en: {
      name: "Rutt",
      version: "Northern Moose",
      text: "Support",
    },
    de: {
      name: "Benny",
      version: "Elch aus dem Norden",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Truc",
      version: "Élan nordique",
      text: "Soutien",
    },
    it: {
      name: "Fiocco",
      version: "Alce del Nord",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Brother Bear",
  set: "005",
  cardNumber: 4,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_db3ade6d337c4c72aad63938a16e7692",
    tcgPlayer: 560498,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "sqf-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
