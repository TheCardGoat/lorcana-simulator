import type { CharacterCard } from "@tcg/lorcana-types";

export const benEccentricRobot: CharacterCard = {
  id: "bXM",
  canonicalId: "ci_bXM",
  reprints: ["set6-137"],
  cardType: "character",
  name: "B.E.N.",
  version: "Eccentric Robot",
  i18n: {
    en: {
      name: "B.E.N.",
      version: "Eccentric Robot",
      text: "Support",
    },
    de: {
      name: "B.E.N.",
      version: "Exzentrischer Roboter",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "B.E.N.",
      version: "Robot excentrique",
      text: "Soutien",
    },
    it: {
      name: "B.E.N.",
      version: "Robot Eccentrico",
      text: "Aiutante",
    },
  },
  inkType: ["sapphire"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 137,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_7dd1be4d36094e6a9429298fb6a2d7df",
    tcgPlayer: 592999,
  },
  text: "Support",
  classifications: ["Storyborn", "Ally", "Robot", "Pirate"],
  abilities: [
    {
      id: "1b2-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
