import type { CharacterCard } from "@tcg/lorcana-types";

export const robinHoodEyeForDetail: CharacterCard = {
  id: "JTC",
  canonicalId: "ci_JTC",
  reprints: ["set7-170"],
  cardType: "character",
  name: "Robin Hood",
  version: "Eye for Detail",
  i18n: {
    en: {
      name: "Robin Hood",
      version: "Eye for Detail",
      text: "Support",
    },
    de: {
      name: "Robin Hood",
      version: "Auge fürs Detail",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Robin des Bois",
      version: "À l’œil affûté",
      text: "Soutien",
    },
    it: {
      name: "Robin Hood",
      version: "Attento ai Dettagli",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "007",
  cardNumber: 170,
  rarity: "common",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_35c7b95d00c14614857dcb98e4fb99e1",
    tcgPlayer: 618712,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "193-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
