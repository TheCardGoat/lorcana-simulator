import type { CharacterCard } from "@tcg/lorcana-types";

export const louieChillNephew: CharacterCard = {
  id: "US6",
  canonicalId: "ci_VS6",
  reprints: ["set3-149", "set9-140"],
  cardType: "character",
  name: "Louie",
  version: "Chill Nephew",
  i18n: {
    en: {
      name: "Louie",
      version: "Chill Nephew",
      text: "Support",
    },
    de: {
      name: "Track Duck",
      version: "Entspannter Neffe",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Loulou",
      version: "Neveu cool",
      text: "Soutien",
    },
    it: {
      name: "Qua",
      version: "Nipote Tranquillo",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "009",
  cardNumber: 140,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f81fa2c1489a44eab54bd8e0528cc202",
    tcgPlayer: 650075,
  },
  text: "Support",
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "1ac-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
