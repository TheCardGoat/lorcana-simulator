import type { CharacterCard } from "@tcg/lorcana-types";

export const chiefTuiRespectedLeader: CharacterCard = {
  id: "DmB",
  canonicalId: "ci_DmB",
  reprints: ["set1-143"],
  cardType: "character",
  name: "Chief Tui",
  version: "Respected Leader",
  i18n: {
    en: {
      name: "Chief Tui",
      version: "Respected Leader",
      text: "Support",
    },
    de: {
      name: "Tui",
      version: "Respektierter Anführer",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "TUI",
      version: "Chef respecté",
      text: "Soutien",
    },
    it: {
      name: "Capo Tui",
      version: "Leader Rispettato",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "001",
  cardNumber: 143,
  rarity: "uncommon",
  cost: 7,
  strength: 3,
  willpower: 6,
  lore: 3,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_2bd7564121d5445ab350345c91a45ef4",
    tcgPlayer: 508819,
  },
  text: "Support",
  classifications: ["Storyborn", "Mentor", "King"],
  abilities: [
    {
      id: "qai-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
