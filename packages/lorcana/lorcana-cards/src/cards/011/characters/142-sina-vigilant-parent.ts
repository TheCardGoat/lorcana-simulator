import type { CharacterCard } from "@tcg/lorcana-types";

export const sinaVigilantParent: CharacterCard = {
  id: "KYV",
  canonicalId: "ci_KYV",
  reprints: ["set11-142"],
  cardType: "character",
  name: "Sina",
  version: "Vigilant Parent",
  i18n: {
    en: {
      name: "Sina",
      version: "Vigilant Parent",
      text: [
        {
          title: "Alert",
          description: "(This character can challenge as if they had Evasive.)",
        },
      ],
    },
    de: {
      name: "Sina",
      version: "Wachsames Elternteil",
      text: [
        {
          title: "Alarmiert",
          description: "(Dieser Charakter kann herausfordern, als hätte er Wendig.)",
        },
      ],
    },
    fr: {
      name: "Sina",
      version: "Parent vigilant",
      text: "Agilité (Ce personnage peut défier comme s'il était Insaisissable.)",
    },
    it: {
      name: "Sina",
      version: "Genitrice Attenta",
      text: [
        {
          title: "Vigile",
          description: "(Questo personaggio può sfidare come se avesse Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Moana",
  set: "011",
  cardNumber: 142,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6f3a637fc61e4ad084fc878c55ff543c",
    tcgPlayer: 673739,
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
      id: "1bt-1",
      keyword: "Alert",
      type: "keyword",
      text: "Alert",
    },
  ],
};
