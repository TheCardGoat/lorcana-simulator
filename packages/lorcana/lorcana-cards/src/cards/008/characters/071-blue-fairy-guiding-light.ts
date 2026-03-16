import type { CharacterCard } from "@tcg/lorcana-types";

export const blueFairyGuidingLight: CharacterCard = {
  id: "IbB",
  canonicalId: "ci_IbB",
  reprints: ["set8-071"],
  cardType: "character",
  name: "Blue Fairy",
  version: "Guiding Light",
  i18n: {
    en: {
      name: "Blue Fairy",
      version: "Guiding Light",
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
      name: "Die Blaue Fee",
      version: "Leitendes Licht",
      text: "Wendig Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "La Fée Bleue",
      version: "Guide spirituelle",
      text: "Insaisissable Soutien",
    },
    it: {
      name: "Fata Turchina",
      version: "Luce Guida",
      text: "Sfuggente Aiutante",
    },
  },
  inkType: ["amethyst", "sapphire"],
  franchise: "Pinocchio",
  set: "008",
  cardNumber: 71,
  rarity: "uncommon",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b36358ea2e404178ab14c1815fce6bb5",
    tcgPlayer: 631398,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "Support",
    },
  ],
  classifications: ["Storyborn", "Ally", "Fairy"],
  abilities: [
    {
      id: "1iq-1",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
    {
      id: "1iq-2",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
