import type { CharacterCard } from "@tcg/lorcana-types";

export const trustyLoyalBloodhound: CharacterCard = {
  id: "zUf",
  canonicalId: "ci_zUf",
  reprints: ["set7-006"],
  cardType: "character",
  name: "Trusty",
  version: "Loyal Bloodhound",
  i18n: {
    en: {
      name: "Trusty",
      version: "Loyal Bloodhound",
      text: "Support",
    },
    de: {
      name: "Pluto, der Spürhund",
      version: "Loyaler Bluthund",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "César",
      version: "Fidèle limier",
      text: "Soutien",
    },
    it: {
      name: "Fido",
      version: "Segugio Leale",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "Lady and the Tramp",
  set: "007",
  cardNumber: 6,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ea6328bcbfc440899e5ecf6e16dbd5f0",
    tcgPlayer: 619409,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "oyt-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
