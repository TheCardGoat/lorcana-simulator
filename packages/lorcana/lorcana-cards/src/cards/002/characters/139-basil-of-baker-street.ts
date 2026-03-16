import type { CharacterCard } from "@tcg/lorcana-types";

export const basilOfBakerStreet: CharacterCard = {
  id: "sCa",
  canonicalId: "ci_sCa",
  reprints: ["set2-139"],
  cardType: "character",
  name: "Basil",
  version: "Of Baker Street",
  i18n: {
    en: {
      name: "Basil",
      version: "Of Baker Street",
      text: "Support",
    },
    de: {
      name: "Basil",
      version: "Aus der Baker Street",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Basil",
      version: "De Baker Street",
      text: "Soutien",
    },
    it: {
      name: "Basil",
      version: "Di Baker Street",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 139,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_e820659ebe3f4a2fa154ffae96da8bde",
    tcgPlayer: 525239,
  },
  text: "Support",
  classifications: ["Dreamborn", "Hero", "Detective"],
  abilities: [
    {
      id: "1xt-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
