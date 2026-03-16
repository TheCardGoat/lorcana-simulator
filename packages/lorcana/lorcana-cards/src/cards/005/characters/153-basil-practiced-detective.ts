import type { CharacterCard } from "@tcg/lorcana-types";

export const basilPracticedDetective: CharacterCard = {
  id: "F8I",
  canonicalId: "ci_F8I",
  reprints: ["set5-153"],
  cardType: "character",
  name: "Basil",
  version: "Practiced Detective",
  i18n: {
    en: {
      name: "Basil",
      version: "Practiced Detective",
      text: "Support",
    },
    de: {
      name: "Basil",
      version: "Geübter Detektiv",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Basil",
      version: "Détective chevronné",
      text: "Soutien",
    },
    it: {
      name: "Basil",
      version: "Detective Esperto",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Great Mouse Detective",
  set: "005",
  cardNumber: 153,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_b73a800e9b434141b154bd521d55d14c",
    tcgPlayer: 559713,
  },
  text: "Support",
  classifications: ["Storyborn", "Hero", "Detective"],
  abilities: [
    {
      id: "jeb-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
