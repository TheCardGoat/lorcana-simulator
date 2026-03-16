import type { CharacterCard } from "@tcg/lorcana-types";

export const crikeeGoodLuckCharm: CharacterCard = {
  id: "GwP",
  canonicalId: "ci_GwP",
  reprints: ["set10-142"],
  cardType: "character",
  name: "Cri-Kee",
  version: "Good Luck Charm",
  i18n: {
    en: {
      name: "Cri-Kee",
      version: "Good Luck Charm",
      text: [
        {
          title: "Alert",
          description: "(This character can challenge as if they had Evasive.)",
        },
      ],
    },
    de: {
      name: "Kriki",
      version: "Glücksbringer",
      text: [
        {
          title: "Alarmiert",
          description: "(Dieser Charakter kann herausfordern, als hätte er Wendig.)",
        },
      ],
    },
    fr: {
      name: "Cri-Kee",
      version: "Charme de chance",
      text: "Agilité (Ce personnage peut défier comme s'il avait Insaisissable.)",
    },
    it: {
      name: "Cri-Cri",
      version: "Portafortuna",
      text: [
        {
          title: "Vigile",
          description: "(Questo personaggio può sfidare come se avesse Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Mulan",
  set: "010",
  cardNumber: 142,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7b35f4aed143419a821f8426d17be7bf",
    tcgPlayer: 659454,
  },
  text: [
    {
      title: "Alert",
      description: "(This character can challenge as if they had Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1gx-1",
      keyword: "Alert",
      type: "keyword",
      text: "Alert",
    },
  ],
};
