import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinSelfappointedMentor: CharacterCard = {
  id: "m4N",
  canonicalId: "ci_m4N",
  reprints: ["set1-153"],
  cardType: "character",
  name: "Merlin",
  version: "Self-Appointed Mentor",
  i18n: {
    en: {
      name: "Merlin",
      version: "Self-Appointed Mentor",
      text: "Support",
    },
    de: {
      name: "Merlin",
      version: "Selbsternannter Mentor",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "MERLIN",
      version: "Mentor autoproclamé",
      text: "Soutien",
    },
    it: {
      name: "Merlin",
      version: "Self-Appointed Mentor",
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
  franchise: "Sword in the Stone",
  set: "001",
  cardNumber: 153,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_47e91685dd1f4021908561ca134dfe94",
    tcgPlayer: 503354,
  },
  text: "Support",
  classifications: ["Dreamborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      id: "uii-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
