import type { CharacterCard } from "@tcg/lorcana-types";

export const olafTrustingCompanion: CharacterCard = {
  id: "QcK",
  canonicalId: "ci_QcK",
  reprints: ["set4-150"],
  cardType: "character",
  name: "Olaf",
  version: "Trusting Companion",
  i18n: {
    en: {
      name: "Olaf",
      version: "Trusting Companion",
      text: "Support",
    },
    de: {
      name: "Olaf",
      version: "Vertrauensvoller Begleiter",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Olaf",
      version: "Compagnon confiant",
      text: [
        {
          title: "Soutien",
          description:
            "(Lorsque vous envoyez ce personnage à l'aventure, vous pouvez ajouter sa à celle d'un autre personnage au choix pour le reste de ce tour.)",
        },
      ],
    },
    it: {
      name: "Olaf",
      version: "Compagno Fiducioso",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Frozen",
  set: "004",
  cardNumber: 150,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d7ce71c1b8814223bb8f1d9ed75cdfb6",
    tcgPlayer: 550609,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1ki-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
