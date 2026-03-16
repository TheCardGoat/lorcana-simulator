import type { CharacterCard } from "@tcg/lorcana-types";

export const deweyShowyNephew: CharacterCard = {
  id: "7di",
  canonicalId: "ci_V2m",
  reprints: ["set3-139", "set9-139"],
  cardType: "character",
  name: "Dewey",
  version: "Showy Nephew",
  i18n: {
    en: {
      name: "Dewey",
      version: "Showy Nephew",
      text: "Support",
    },
    de: {
      name: "Trick Duck",
      version: "Angeberischer Neffe",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Fifi",
      version: "Neveu frimeur",
      text: "Soutien",
    },
    it: {
      name: "Quo",
      version: "Nipote Appariscente",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Ducktales",
  set: "009",
  cardNumber: 139,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0367a7c71bef46c39719f0c5c0b0dc3b",
    tcgPlayer: 650074,
  },
  text: "Support",
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      id: "32f-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
