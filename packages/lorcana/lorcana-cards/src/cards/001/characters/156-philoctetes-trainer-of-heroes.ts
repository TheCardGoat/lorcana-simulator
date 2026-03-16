import type { CharacterCard } from "@tcg/lorcana-types";

export const philoctetesTrainerOfHeroes: CharacterCard = {
  id: "BXf",
  canonicalId: "ci_BXf",
  reprints: ["set1-156"],
  cardType: "character",
  name: "Philoctetes",
  version: "Trainer of Heroes",
  i18n: {
    en: {
      name: "Philoctetes",
      version: "Trainer of Heroes",
      text: "Support",
    },
    de: {
      name: "Phil",
      version: "Trainer der Helden",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "PHILOCTÈTE",
      version: "Entraineur de héros",
      text: "Soutien",
    },
    it: {
      name: "Philoctetes",
      version: "Trainer of Heroes",
      text: [
        {
          title: "Support",
          description:
            "(Whenever this character quests, you may add their to another chosen character's this turn.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 156,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 1,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_3d8ce215614244a483a06d6ecf99c2e2",
    tcgPlayer: 508875,
  },
  text: "Support",
  classifications: ["Storyborn", "Mentor"],
  abilities: [
    {
      id: "1g8-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
